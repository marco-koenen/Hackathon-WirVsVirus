from peewee import *
import os
import logging
from datetime import datetime
from playhouse.migrate import SqliteMigrator
from .activationOTP import generate_otp

db = SqliteDatabase('app.sqlite3')

def random_hash():
    return os.urandom(16).hex()


class BaseModel(Model):
    class Meta:
        database = db


class Room(BaseModel):
    id = AutoField()
    hash = FixedCharField(32, null=False, unique=True, default=random_hash)
    sms_activated = BooleanField(null=False, default=lambda: False)


class User(BaseModel):
    id = AutoField()
    hash = FixedCharField(32, null=False, unique=True, default=random_hash)
    phone = CharField(null=False)
    room = ForeignKeyField(Room, backref='users', on_delete='CASCADE', null=False)
    called = BooleanField(null=False, default=lambda: False)
    time_created = DateTimeField(default=datetime.now)


class OTP(BaseModel):
    id = AutoField()
    otp = FixedCharField(6, null=False, unique=True, default=generate_otp)
    used = BooleanField(null=False, default=lambda: False)
    label = FixedCharField(256, default=lambda: "")


db.create_tables(models=[User, Room, OTP])

