import re

# no leading double zeros/plus
phone_prefix_country = {"de": "49"}

# according to:
# https://www.google.com/search?q=handynummer+g%C3%BCltige+vorwahlen+deutschland
# no leading zero
phone_prefix_provider = \
    {"de":
        {
            "1511": "telekom", "1512": "telekom", "1514": "telekom",
            "1515": "telekom", "1516": "telekom", "1517": "telekom",
            "160": "telekom", "170": "telekom", "171": "telekom",
            "175": "telekom", "1520": "vodaphone", "1522": "vodaphone",
            "1523": "vodaphone", "1525": "vodaphone", "162": "vodaphone",
            "172": "vodaphone", "173": "vodaphone", "174": "vodaphone",
            "1570": "eplus", "1573": "eplus", "1575": "eplus",
            "1577": "eplus", "1578": "eplus", "163": "eplus",
            "177": "eplus", "178": "eplus", "1560": "o2",
            "176": "o2", "179": "o2"
        }
     }

# admissible lengths with provider prefix and one leading zero
phone_length_country = \
    {
            "de": [11, 12]
    }


def cleaned_number(num):
    num_digitsonly = re.sub(r'^\number*', '', num)
    num_cleaned = re.sub(r'^\+', '', num_digitsonly)
    num_cleaned2 = re.sub(r'^0*', '', num_cleaned)
    return num_cleaned2


def check_validity_phone(num, country="de"):
    """
    Check if num has the correct format of a mobile number.
    Arguments:
      num: string, phone number starting with country prefix
           without leading zeros or +
    """
    cleaned_num = cleaned_number(num)
    # Country prefix
    if not cleaned_num.startswith(phone_prefix_country[country]):
        return "invalid-country"

    remainder_country = cleaned_num[len(phone_prefix_country[country]):]

    # Prefix
    if True not in [remainder_country.startswith(prefix)
                    for prefix in phone_prefix_provider[country]]:
        return "invalid-network"

    # Länge zwischen 11 und 12 Ziffern (incl Vorwahl mit 0)
    if len(remainder_country)+1 not in phone_length_country[country]:
        return "invalid-length"

    return "valid"


def is_valid_phone_number(num, country="de"):
    return check_validity_phone(num, country) == "valid"


