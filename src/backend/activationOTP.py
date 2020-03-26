from random import SystemRandom
random = SystemRandom()


def generate_otp():
    return "%06d" % random.randint(0, 999999)


