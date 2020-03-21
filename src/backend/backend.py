#!/usr/bin/env python3
from flask import Flask, request, abort, Response, redirect, jsonify
from flask_cors import CORS, cross_origin

from datetime import datetime
import sqlite3
import uuid
import json

import boto3

from .config import AID, KEY, DATABASE_FILE
app = Flask(__name__)
CORS(app)
db = sqlite3.connect(DATABASE_FILE)


def do_send_sms_real(num, text):
    client = boto3.client("sns", aws_access_key_id=AID,
                          aws_secret_access_key=KEY,
                          region_name="eu-central-1")
    if not num.startswith("+49"):
        return
    client.publish(PhoneNumber=num, Message=text)
    

def do_send_sms_debug(num, text):
    with open("smslog.txt", "a") as f:
        f.write(f"[{datetime.now()}] SMS to {num}: {text}\n")
    return True


# use dummy sms send or real API
do_send_sms = do_send_sms_debug

users = {}
rooms = {}


@app.route("/user/create", methods=["POST", "GET"])
@cross_origin()
def user_create():
    payload = request.get_json(force=True)

    phone, room = payload.get("phone"), payload.get("room")
    if not phone or not room:
        abort(400)

    # todo: check if room exists

    user_hash = uuid.uuid1()
    status = "waiting"
    users[user_hash] = {"phone": phone, "room": room, "status": status}

    # todo: verify phone number

    hostname_debug = "localhost"
    hostname = hostname_debug

    check_url = f"http://{hostname}/#{str(user_hash)}"
    user_welcome_text = f"Sie wurden in die Warteschlange aufgenommen. Den aktuellen Status finden sie unter {check_url}."

    do_send_sms(phone, user_welcome_text)
    return jsonify(user_hash=str(user_hash))


@app.route("/user/<user_hash>")
@cross_origin()
def get_user(user_hash):
    user_uuid = uuid.UUID(user_hash)
    user = users.get(user_uuid, None)
    if not user:
        abort(404)
    return jsonify({"hash": user_hash, "phone": user["phone"],
                    "room": user["room"]})


@app.route("/user/<user_hash>/call", methods=["POST", "GET"])
@cross_origin()
def call_user(user_hash):
    user_uuid = uuid.UUID(user_hash)
    user = users.get(user_uuid, None)
    notify_text = "Hello, you have been called"
    if not user:
        abort(404)

    if do_send_sms(user["phone"], notify_text):
        return jsonify({"success": "sent"})
    else:
        return jsonify({"success": "smserror"})


@app.route("/room/create", methods=["POST", "GET"])
@cross_origin()
def create_room():
    room_uuid = do_create_room()
    return jsonify({"room_hash": str(room_uuid)})


def do_create_room():
    room_uuid = uuid.uuid1()
    rooms[room_uuid] = {"created": datetime.now()}
    return room_uuid


@app.route("/room/<room_hash>/list_users")
@cross_origin()
def get_room_users(room_hash):
    users_in_room = [hash for hash,user in users.items() if user["room"] == room_hash]
    return jsonify(users_in_room)

# for debugging
@app.route("/smslog")
def get_smslog():
    with open("smslog.txt", "r") as f:
        return Response(f.read(), mimetype="text/plain")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
