import boto3
from flask import current_app as app
from datetime import datetime
from .validphone import *

def do_send_sms_real(num, text):
    client = boto3.client("sns", aws_access_key_id=app.config["AWS_ACCESS_KEY_ID"],
                          aws_secret_access_key=app.config["AWS_SECRET_ACCESS_KEY"],
                          region_name="eu-central-1")
    if not num.startswith("+49"):
        return False
    response = client.publish(PhoneNumber=num, Message=text)
    return 'MessageId' in response


def do_send_sms_debug(num, text):
    with open("smslog.txt", "a") as f:
        f.write(f"[{datetime.now()}] SMS to {num}: {text}\n")
    return True


def do_send_sms(*args, **kwargs):
    if app.config["SEND_SMS"]:
        return do_send_sms_real(*args, **kwargs)
    else:
        return do_send_sms_debug(*args, **kwargs)
