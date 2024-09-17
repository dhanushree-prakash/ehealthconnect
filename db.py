from pymongo import MongoClient

# Replace the URI string with your MongoDB deployment's connection string.
uri = 'mongodb://localhost:27017'
client = MongoClient(uri)

def get_database():
    return client['eHealthConnect']

from db import get_database

def main():
    db = get_database()
    collection = db['patients']
    patient = collection.find_one({'name': 'John Doe'})
    print(patient)

if __name__ == '__main__':
    main()
