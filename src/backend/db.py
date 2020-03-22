from peewee import *
import os
import logging
from datetime import datetime

db = SqliteDatabase('app.sqlite3')

def random_hash():
    return os.urandom(16).hex()


class BaseModel(Model):
    class Meta:
        database = db



class Room(BaseModel):
    id = AutoField()
    hash = FixedCharField(32, null=False, unique=True, default=random_hash)


class User(BaseModel):
    id = AutoField()
    hash = FixedCharField(32, null=False, unique=True, default=random_hash)
    phone = CharField(null=False)
    room = ForeignKeyField(Room, backref='users', on_delete='CASCADE', null=False)
    called = BooleanField(null=False, default=lambda: False)
    time_created = DateTimeField(default=datetime.now)


db.create_tables(models=[User, Room])

