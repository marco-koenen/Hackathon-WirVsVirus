#########
# Default (development) values
# overwrite in instance/config.py
#########

CORS_ORIGIN = "*"
HOSTNAME = "localhost"
SEND_SMS = "DEBUG" # options: "AWS", "SPRYNG", "DEBUG" (default)
 
# API keys for AWS
AWS_ACCESS_KEY_ID = ""
AWS_SECRET_ACCESS_KEY = ""

SPRYNG_API_URL = ""
SPRYNG_API_BEARER_TOKEN = ""
SPRYNG_API_ROUTE = "business"
SPRYNG_MSG_ORIGINATOR = "PatientPgr" # Max 11 Chars, or 14 digits

MAX_SMS_LENGTH = 160 # longer SMS are split automatically

DEBUG_USER="debuguser"
DEBUG_PASSWORD="random"

DEFAULT_NOTIFY_TEXT = "Sie wurden aufgerufen."
