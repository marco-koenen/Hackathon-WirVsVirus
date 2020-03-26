from flask import Flask, request, Response, jsonify
from flask_cors import CORS, cross_origin
from .sms import *
import peewee
from .db import * # Import after app is defined
from .validphone import is_valid_phone_number, cleaned_number
from datetime import datetime

app = Flask(__name__)
app.config.from_pyfile('config.py')

if "APP_CONFIG_FILE" in os.environ:
    app.config.from_envvar("APP_CONFIG_FILE")

print("#####################")
print("# APP CONFIGURATION #")
print("#####################")
for k in app.config:
    print(f"{k}={app.config[k]}")

CORS(app, origin=app.config["CORS_ORIGIN"])


def log_otp_usage(otp, room_hash, fail=False):
    logentry = f"[{datetime.now()}] OTP '{otp}' unlock: room '{room_hash}'"
    if fail:
        logentry += " INCORRECT OTP"
    print(logentry)
    with open("otplog.txt", "a") as f:
        f.write(logentry+"\n")


def is_valid_otp(otp):
    otp_instance = OTP.get_or_none(otp=otp)
    if not otp_instance:
        return False
    print("otp", otp_instance, otp_instance.otp, otp_instance.label, otp_instance.used)

    return not otp_instance.used


def deactivate_otp(otp):
    otp_instance = OTP.get_or_none(otp=otp)
    otp_instance.used = True
    opt_instance.save()


@app.route("/user/create", methods=["POST", "GET"])
@cross_origin()
def user_create():
    payload = request.get_json(force=True)

    phone, room_hash = payload.get("phone"), payload.get("room")
    if not phone or not room_hash:
        return jsonify(success="invalid-request")

    room = Room.get_or_none(hash=room_hash)
    if not room:
        print("Room not found: %s" % room_hash)
        return jsonify(success="invalid-room")

    # todo: verify phone number
    cleaned_phone = cleaned_number(phone)
    if not is_valid_phone_number(phone):
        return jsonify(success="invalid-phone")

    user = User.create(phone=cleaned_phone, room=room)

    return jsonify(user_hash=str(user.hash), success="created")


@app.route("/user/<user_hash>")
@cross_origin()
def get_user(user_hash):
    user = User.get_or_none(hash=user_hash)
    if not user:
        return jsonify(status="userinvalid")

    if user.called:
        status = "called"
    else:
        status = "waiting"

    return jsonify({"hash": user_hash, "phone": user.phone,
                    "status": status,
                    "time_created": str(user.time_created)})


@app.route("/user/<user_hash>/call", methods=["POST", "GET"])
@cross_origin()
def call_user(user_hash):
    user = User.get_or_none(hash=user_hash)

    if not user:
        return jsonify(success="usererror")


    try:
        json = request.get_json(force=True)

    except:
        return jsonify(success="jsonerror")

    notify_text = json.get("notify_text", app.config["DEFAULT_NOTIFY_TEXT"])

    req_room_hash = json.get("room_hash", None)
    user_room_hash = User.room.hash
    if not req_room_hash == user_room_hash:
        return jsonify(success="roominvalid")

    if not user.room.sms_activated:
        return jsonify(success="notactivated")


    if do_send_sms(user.phone, notify_text):
        return jsonify(success="sent")
    else:
        return jsonify(success="smserror")


@app.route("/room/create", methods=["POST", "GET"])
@cross_origin()
def create_room():
    room_uuid = do_create_room()
    return jsonify(room_hash=room_uuid)


def do_create_room():
    room = Room.create()
    return room.hash

@app.route("/room/<room_hash>/activate", methods=["POST"])
def activate_room(room_hash):
    room = Room.get_or_none(hash=room_hash)

    if not room:
        return jsonify(success="invalidroom")

    json = request.get_json(force=True)
    otp = json["otp"]
    if not is_valid_otp(otp):
        log_otp_usage(otp, room_hash, fail=True)
        return jsonify(success="invalidotp")

    # should deactivate otp after use here
    log_otp_usage(otp, room_hash)
    #deactivate_otp(otp)

    room.sms_activated = True
    room.save()

    return jsonify(success="activated")


@app.route("/room/<room_hash>/activated")
def is_room_activated(room_hash):
    room = Room.get_or_none(hash=room_hash)

    if not room:
        return jsonify(success="invalidroom")

    if (room.sms_activated):
        return jsonify(activated="True")

    return jsonify(activated="False")


# for debugging
import flask_httpauth
from werkzeug.security import generate_password_hash, check_password_hash
auth = flask_httpauth.HTTPBasicAuth()
password_hash = generate_password_hash(app.config["DEBUG_PASSWORD"])

@auth.verify_password
def verify_password(username, password):
    print(request.remote_addr)
    if username == '' and request.remote_addr == '127.0.0.1':
        return True
    return (username == app.config["DEBUG_USER"]) and \
             check_password_hash(password_hash, password)

@app.route("/smslog")
@auth.login_required
def get_smslog():
    with open("smslog.txt", "r") as f:
        return Response(f.read(), mimetype="text/plain")


@app.route("/room/<room_hash>/activate_debug", methods=["GET"])
@auth.login_required
def activate_room_debug(room_hash):
    room = Room.get_or_none(hash=room_hash)

    if not room:
        return jsonify(success="invalidroom")

    activate = bool(int(request.args.get("activate", "1")))

    room.sms_activated = activate
    room.save()
    if activate:
        return jsonify(success="activated")
    else:
        return jsonify(success="deactivated")

@app.route("/otp/list")
@auth.login_required
def list_otps():
    otps = OTP.select()
    otp_list = [{"otp": o.otp, "label": o.label} for o in otps if not o.used]
    return jsonify(otp_list)


@app.route("/otp/create")
@auth.login_required
def create_otp():
    label = request.args.get("label","")
    new_otp = OTP.create(label=label)
    new_otp.save()
    return jsonify(str(new_otp))

@app.route("/otp/<otp>/disable")
@auth.login_required
def disable_otp(otp):
    otp = OTP.get_or_none(otp=otp)
    if not otp:
        return "success"
    otp.used = True
    otp.save()
    return "success"

@app.route("/otplog")
@auth.login_required
def get_otplog():
    with open("otplog.txt", "r") as f:
        return Response(f.read(), mimetype="text/plain")



