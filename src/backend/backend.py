#!/usr/bin/env python3
from flask import Flask, escape, request, abort, Response
from datetime import datetime
import sqlite3 
import uuid
import json

from config import *
app = Flask(__name__)
db=sqlite3.connect(DATABASE_FILE)



import boto3
def do_send_sms(num,text):
    client = boto3.client("sns", aws_access_key_id=AID,
            aws_secret_access_key=KEY, region_name="eu-central-1") 
    if not num.startswith("+49"): return
    client.publish(PhoneNumber=num, Message=text)

def do_send_sms_debug(num,text):
    with open("smslog.txt","a") as f:
        f.write(f"[{datetime.now()}] SMS to {num}: {text}\n")
    return True

# comment line below to send real sms
do_send_sms = do_send_sms_debug
    

users={}
rooms={}

@app.route("/user/create",methods=["POST"])
def user_create():
    phone = request.form.get("phone",None)
    room = request.form.get("room",None)
    if not phone or not room:
        abort(400)

    # todo: check if room exists

    user_hash=uuid.uuid1()
    status="waiting"
    users[user_hash]={ "phone":phone,"room":room, "status": status }
    return json.dumps({"hash": str(user_hash)})

@app.route("/user/<user_hash>")
def get_user(user_hash):
    user_uuid=uuid.UUID(user_hash)
    user = users.get(user_uuid,None)
    if not user: abort(404)
    status = "status"
    return json.dumps({"hash": user_hash, "phone": user["phone"], "room":
        user["room"]})

@app.route("/user/<user_hash>/call")
def call_user(user_hash):
    user_uuid=uuid.UUID(user_hash)
    user = users.get(user_uuid,None)
    notify_text = "Hello, you have been called"
    if not user: abort(404)
    if do_send_sms(user["phone"], notify_text ):
        return json.dumps({"success":"sent"})
    else: 
        return json.dumps({"success":"smserror"})


@app.route("/room/create")
def create_room():
    room_uuid=uuid.uuid1()
    rooms[room_uuid]={"created": datetime.now()}
    return json.dumps({"room_hash": str(room_uuid)})

# for debugging

@app.route("/smslog")
def get_smslog():
    with open("smslog.txt","r") as f:
        return Response(f.read(), mimetype="text/plain")
#old mockup client

@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return '''
    <html>
    <head>
     <meta http-equiv="refresh" content="0; url=/register_client">
     </head>
    <body>
    </body>
    </html>
    '''

time=None

global name,arzt,tel,appTime


@app.route('/register_client')
def register_client():
    global name,arzt,tel,appTime
  
    name=request.args.get("name", None)
    arzt=request.args.get("arzt", None)
    tel=request.args.get("tel", None)
    appTime=request.args.get("time", None)

    if not name:
        return '''
        <html>
        <body>
        Als neuen Patienten bei einer Praxis anmelden:
        <form method=GET action=/register_client>
        Name: 
        <input type="text" id="name" name="name" value="Herr Meier"><br>
        Telefonnummer (mit Vorwahl +49!): 
        <input type="text" name="tel" value="123456"><br>
        Praxis/Arzt: 
        <input type="text" name="arzt" value="Dr. Moser"><br>
        Termin (Uhrzeit):
        <input type="text" name="time" value="13:00"><br>
            <input type='submit'>
        </form>
        </body>
        </html>
        ''';
    clients.append({"name":name, "tel":tel, "arzt":arzt, "appTime":appTime, "called":False})
    clientid=len(clients)-1
    global time
    time=datetime.now()
    return f'''<html><head>
     <meta http-equiv="refresh" content="0; url=/wait?id={clientid}">
     </head></html>'''

@app.route('/wait')
def wait():
    idd = int(request.args.get('id', None))
    t2 = datetime.now()
    dt=t2-time
    url=''
    if clients[idd]["called"]:
        waitstr="Sie wurden aufgerufen."
    else:
        waitstr="Sie warten."
    return f'''
    <html>
    <head>
     <meta http-equiv="refresh" content="2; url=/wait?id={idd}">
     </head>
     {waitstr}<br><br>
    Name: %s <br>
    Arzt: %s <br>
    Rückruftelefonnummer (mit Vorwahl +49!): %s<br>
    Ihre Aufrufaddresse ist: <a href=/call?id={idd} target=_blank>call</a> %s <br> (bitte an die Sprechstundenhilfe weitergeben)
    Ihr vereinbarter Termin war um %s Uhr <br>
    Bisherige Wartezeit: %d s <br>
    </body>
    </html>''' % (name, arzt, tel, appTime, url, dt.seconds)
    #% (name, url, 5)

@app.route('/call')
def call():
    idd=int(request.args.get('id',None))
    return f'''
    <html>
    <body>
    In Ihrem Wartezimmer wartet:
    
    <br><br>
    Name: {clients[idd]["name"]} <br>
    Vereinbarter Termin: {clients[idd]["appTime"]} <br>
    Arzt: {clients[idd]["arzt"]} <br>
    Telefonnnummer (Patient): {clients[idd]["tel"]} <br>
    <form method=get action=/do_call>
    <input type=hidden name=id value={idd}>
    <br>
    Sende Aufruf-SMS <input type=checkbox name="sms" value="1"><br>
    <input type=submit text="Aufrufen">
    </form>
    </body>
    </html>
    '''

@app.route('/do_call')
def do_call():
    idd = int(request.args.get('id',None))
    if idd==None: return 'Error: not a waiting patient'
    name=clients[idd]['name']
    arzt=clients[idd]['arzt']
    tel=clients[idd]['tel']
    clients[idd]['called']=True
    do_sms=int(request.args.get("sms","0"))
    if do_sms==1:
        send_sms(tel, f"Sie wurden von {arzt} aufgerufen")
    return f'calling {name}'

if __name__ == "__main__":
    app.run(host="0.0.0.0")
