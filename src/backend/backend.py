from flask import Flask, request, abort, Response, redirect, jsonify
from flask_cors import CORS, cross_origin
from datetime import datetime
from .db import *
from .sms import *
import re

app = Flask(__name__)

print(app.debug)
CORS(app, origin="*" if app.debug else "un-chain.us")
#CORS(app)

default_notify_text = "Sie wurden aufgerufen."


@app.route("/user/create", methods=["POST", "GET"])
@cross_origin()
def user_create():
    payload = request.get_json(force=True)

    phone, roomHash = payload.get("phone"), payload.get("room")
    try:
        room = Room.get(hash=roomHash)
    except:
        print("Room not found: %s" % roomHash)
        abort(404)
    if not phone or not roomHash or not room:
        abort(400)

    cleaned_phone = re.sub('[^\\d+]', '', phone)

    user = User.create(phone=cleaned_phone, room=room)
    # todo: verify phone number

    hostname_debug = "localhost"
    hostname_prod = "un-chain.us"
    hostname = hostname_prod

    check_url = f"http://{hostname}/#{user.hash}"
    user_welcome_text = f"Sie wurden in die Warteschlange aufgenommen. Den aktuellen Status finden sie unter {check_url}."

    do_send_sms(phone, user_welcome_text)
    return jsonify(user_hash=str(user.hash))


@app.route("/user/<user_hash>")
@cross_origin()
def get_user(user_hash):
    user = User.get(hash=user_hash)
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
    try:
        user = User.get(hash=user_hash)
    except:
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
@app.route("/smslog")
def get_smslog():
    with open("smslog.txt", "r") as f:
        return Response(f.read(), mimetype="text/plain")
