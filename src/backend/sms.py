import boto3
from .config import AID, KEY
from datetime import datetime

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

