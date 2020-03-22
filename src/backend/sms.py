import boto3
from flask import current_app as app
from datetime import datetime
from .validphone import is_valid_phone_number, cleaned_number
import requests


def do_send_sms_aws(num, text):
    client = boto3.client("sns", aws_access_key_id=app.config["AWS_ACCESS_KEY_ID"],
                          aws_secret_access_key=app.config["AWS_SECRET_ACCESS_KEY"],
                          region_name="eu-central-1")
    cleaned_num = cleaned_number(num)
    if not is_valid_phone_number(cleaned_num):
        return False
    response = client.publish(PhoneNumber=f"+{cleaned_num}", Message=text)
    return 'MessageId' in response


# documentation: https://www.spryng.be/en/developers/http-api/
def do_send_sms_spryng(num, text):
    """
    Send an SMS via Spryng REST API
    Arguments:
       num -- Phone number (string, intl. numeric, e.g. "491701111111")
       text -- text message string, maximum 160 characters for one SMS
    """
    cleaned_num = cleaned_number(num)
    if not is_valid_phone_number(cleaned_num):
        return False

    if not text:
        return False

    if len(text) > app.config["MAX_SMS_LENGTH"]:
        return False

    print("preparing spryng call")

    url = app.config["SPRYNG_API_URL"]
    token = app.config["SPRYNG_API_BEARER_TOKEN"]
    spryng_headers = {
                "Accept": "application/json",
                "Authorization": f"Bearer {token}",
                # according to doc needed, but is automatic from request
                # "Content-type": "application/json"
            }

    spryng_request = {
                "body": text,
                "encoding": "auto",
                "originator": app.config["SPRYNG_MSG_ORIGINATOR"],
                "recipients": [num],
                "route": app.config["SPRYNG_API_ROUTE"],
                # "scheduled_at": "now" #optional, default: "now"
            }
    print("spryng request", url, spryng_request, spryng_headers)
    response = requests.post(url, headers=spryng_headers, json=spryng_request)
    print("spryng response", response)

    rj = response.json()
    print("spryng response json content", rj)

    if not response.ok:
        return False

    #success = rj["status"] in ["scheduled", "pending", "delivered"]
    # could also be "failed"
    success = True
    #assume success, FIXME!

    return success


def do_send_sms_debug(num, text):
    with open("smslog.txt", "a") as f:
        f.write(f"[{datetime.now()}] SMS to {num}: {text}\n")
    return True


def do_send_sms(*args, **kwargs):
    if app.config["SEND_SMS"] == "AWS":
        return do_send_sms_aws(*args, **kwargs)
    if app.config["SEND_SMS"] == "SPRYNG":
        return do_send_sms_spryng(*args, **kwargs)

    return do_send_sms_debug(*args, **kwargs)
