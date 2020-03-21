from flask import Flask, request, abort, Response, redirect, jsonify
from flask_cors import CORS, cross_origin
from datetime import datetime
import sqlite3
import uuid
import boto3
from .config import AID, KEY, DATABASE_FILE
from .db import *
import re

from .config import AID, KEY, DATABASE_FILE
app = Flask(__name__)

CORS(app, origin="*" if app.debug else "un-chain.us")

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


@app.route("/user/create", methods=["POST", "GET"])
@cross_origin()
def user_create():
    payload = request.get_json(force=True)

    phone, roomHash = payload.get("phone"), payload.get("room")
    room = Room.get(hash=roomHash)
    if not phone or not roomHash or not room:
        abort(400)

    # todo: check phone number
    cleaned_phone = re.sub('[^\\d+]', '', phone)

    user = User.create(phone=cleaned_phone, room=room)
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
    user = User.get(hash=user_hash)
    if not user:
        abort(404)
    return jsonify({"hash": user_hash, "phone": user["phone"],
                    "room": user["room"]})


@app.route("/user/<user_hash>/call", methods=["POST", "GET"])
@cross_origin()
def call_user(user_hash):
    user = User.get(hash=user_hash)
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
    return jsonify({"room_hash": room_uuid})


def do_create_room():
    room = Room.create()
    return room.hash


# for debugging
@app.route("/smslog")
def get_smslog():
    with open("smslog.txt", "r") as f:
        return Response(f.read(), mimetype="text/plain")
