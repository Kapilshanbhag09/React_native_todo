from flask import Flask
from flask import render_template
import requests
import json
import pymongo
app=Flask(__name__)
@app.route('/')
def Home():
    return "Backend Working"
@app.route('/database/<databasename>',methods=["GET"])
def Database(databasename):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false")
    mydb = myclient['test']
    print(mydb)
    print("New line")
    print(mydb.list_collection_names())
    return databasename
if __name__=='__main__':
    app.run()