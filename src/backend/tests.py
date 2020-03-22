#!/usr/bin/env python3
import unittest
import requests
import subprocess
import time

HOST = "http://localhost:5000"
HASH_SIZE = 32

example_phone = "123456789"


def get_new_room_hash():
    res = requests.post(f"{HOST}/room/create")
    return res.json().get("room_hash")


def get_new_user_hash():
    room_hash = get_new_room_hash()
    phone = example_phone
    res = requests.post(f"{HOST}/user/create",
                        json={"room": room_hash, "phone": phone})

    return res.json().get("user_hash")


class TestBackendAPICalls(unittest.TestCase):
    def test_api_create_room(self):
        self.create_ = """
           Test /room/create
        """
        res = requests.post(f"{HOST}/room/create")
        res_json = res.json()
        assert(res_json)
        room_hash = res_json.get("room_hash")
        assert(len(room_hash) == HASH_SIZE)
        print(res_json)

    def test_api_create_user(self):
        """
           Test /user/create
        """
        room_hash = get_new_room_hash()
        phone = "987654321"
        res = requests.post(f"{HOST}/user/create",
                            json={"room": room_hash, "phone": phone})
        res_json = res.json()
        assert(res_json)
        user_hash = res_json["user_hash"]
        assert(len(user_hash) == HASH_SIZE)
        print(res_json)

    def test_api_query_user(self):
        """
           Test /user/<hash> """
        user_hash = get_new_user_hash()
        res = requests.get(f"{HOST}/user/{user_hash}")
        assert(res.ok)
        assert(res.json()['phone'] == example_phone)
        print(res.json())

    def test_api_user_call(self):
        """
           Test /user/<hash>/call
        """
        user_hash = get_new_user_hash()
        res = requests.get(f"{HOST}/user/{user_hash}/call")
        assert res.ok, "Error during API call" 

        json=res.json()
        print(json)
        assert json['success']=='sent', "Error sending SMS" 

    def test_api_user_call_custom_text(self):
        """
           Test /user/<hash>/call with custom text
        """
        user_hash = get_new_user_hash()
        res = requests.get(f"{HOST}/user/{user_hash}/call", json={"notify_text":
            "Sie wurden von Dr. Maier aufgerufen."})
        assert(res.ok)

        json=res.json()
        print(json)
        assert json['success']=='sent', "Error sending SMS" 


class TestPhoneNumberVerifier(unittest.TestCase):

    def test_is_valid_phone_number(self):
        from validphone import is_valid_phone_number, check_validity_phone
        validfmt_num = ['491707528531', '4915112732853']
        invalidfmt_num_country = ['11707528531', '4215112732853']
        invalidfmt_num_provider = ['49892356439']
        invalidfmt_num_length = ['49170343266', '49170436876389']
        inval_num = invalidfmt_num_country \
            + invalidfmt_num_provider + invalidfmt_num_length

        valid_numbers_tested = [is_valid_phone_number(n) for n in validfmt_num]
        invalid_numbers_tested = [is_valid_phone_number(n) for n in inval_num]
        print(valid_numbers_tested, invalid_numbers_tested)

        assert (False not in valid_numbers_tested)
        assert True not in invalid_numbers_tested

        valid_num_results = {n: check_validity_phone(n) for n in validfmt_num}
        invalid_num_results = {n: check_validity_phone(n) for n in inval_num}
        print(valid_num_results, '\n', invalid_num_results)


if __name__ == '__main__':
    subprocess.Popen("./debug_app")
    time.sleep(2)
    unittest.main()
