from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client['seveninarow']
users_collection = db['users']

def create_user(username, password):
    if users_collection.find_one({"username": username}):
        return None
    users_collection.insert_one({"username": username, "password": password})
    return {"username": username}

def find_user(username):
    return users_collection.find_one({"username": username})
