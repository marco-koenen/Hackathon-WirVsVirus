from flask import Flask, request, abort, Response, redirect, jsonify
from flask_cors import CORS, cross_origin
from datetime import datetime
from .sms import *
import re
import peewee
from .db import * # Import after app is defined

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

default_notify_text = "Sie wurden aufgerufen."


@app.route("/user/create", methods=["POST", "GET"])
@cross_origin()
def user_create():
    payload = request.get_json(force=True)

    phone, room_hash = payload.get("phone"), payload.get("room")
    if not phone or not room_hash:
        abort(400)

    room = Room.get_or_none(hash=room_hash)
    if not room:
        print("Room not found: %s" % room_hash)
        abort(404)

    # todo: verify phone number
    cleaned_phone = re.sub('[^\\d+]', '', phone)

    user = User.create(phone=cleaned_phone, room=room)

    return jsonify(user_hash=str(user.hash))


@app.route("/user/<user_hash>")
@cross_origin()
def get_user(user_hash):
    user = User.get_or_none(hash=user_hash)
    if not user:
        return jsonify({"status": "error"})

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
        abort(404)

    try:
        json = request.get_json(force=True)
        notify_text = json.get("notify_text", default_notify_text)
        print("custom:", notify_text)
    except:
        notify_text = default_notify_text

    if do_send_sms(user.phone, notify_text):
        return jsonify({"success": "sent"})
    else:
        return jsonify({"success": "smserror"})


@app.route("/room/create", methods=["POST", "GET"])
@cross_origin()
def create_room():
    room_uuid = do_create_room()
    return jsonify({"room_hash": room_uuid})


def do_create_room():
    room = Room.create()
    return room.hash


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
