#!/usr/bin/env python3
import unittest
import requests

host_devel = "http://dagobahsystem.no-ip.org:5000"
host_production = "http://backend.un-chain.us"
host = host_devel
HASH_SIZE = 32

example_phone = "123456789"

def get_new_room_hash():
    res = requests.post(f"{host}/room/create")
    return res.json().get("room_hash")


def get_new_user_hash():
    room_hash = get_new_room_hash()
    phone = example_phone
    res = requests.post(f"{host}/user/create",
                        json={"room": room_hash, "phone": phone})

    return res.json().get("user_hash")


class TestStringMethods(unittest.TestCase):
    def test_api_create_room(self):
        """
           Test /room/create
        """
        res = requests.post(f"{host}/room/create")
        res_json = res.json()
        assert(res_json)
        room_hash = res_json.get("room_hash")
        assert(len(room_hash) == HASH_SIZE)

    def test_api_create_user(self):
        """
           Test /user/create
        """
        room_hash = get_new_room_hash()
        phone = "987654321"
        res = requests.post(f"{host}/user/create", 
                            json={"room": room_hash, "phone": phone})
        res_json = res.json()
        assert(res_json)
        user_hash = res_json["user_hash"]
        assert(len(user_hash) == HASH_SIZE)

    def test_api_query_user(self):
        """
           Test /user/<hash>
        """
        user_hash = get_new_user_hash()
        res = requests.get(f"{host}/user/{user_hash}")
        assert(res.ok)
        assert(res.json()['phone'] == example_phone)


    def test_api_user_call(self):
        """
           Test /user/<hash>/call
        """
        user_hash = get_new_user_hash()
        res = requests.get(f"{host}/user/{user_hash}/call")
        assert(res.ok)



if __name__ == '__main__':
    unittest.main()
