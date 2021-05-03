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
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    mydb = myclient['Todo_React_Native']
    print(mydb)
    print("New line")
    print(mydb.list_collection_names())
    print(myclient.list_database_names())
    return databasename

#Signup verification
@app.route('/signup/<username>/<password>',methods=["GET"])
def Signup(username,password):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient['Todo_React_Native']
    collection=db["user_credentials"]
    usernameflag=int(0)
    for i in collection.find({"username":username}):
        if username==i["username"]:
            usernameflag=int(1)
    if usernameflag==1:
        return "Username Exists"
    else:
        collection.insert_one({'username':username,'password':password})
        return "Document Created with username "+username

#Login Verification
@app.route('/login_verify/<username>/<password>',methods=["GET"])
def Login(username,password):
    login_username_flag=int(0)
    login_password=''
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient['Todo_React_Native']
    collection=db["user_credentials"]
    for i in collection.find({"username":username}):
        if username==i["username"]:
            login_username_flag=int(1)
            login_password=i["password"]
    if login_username_flag==1:
        if login_password==password:
            return "Verified"
        else:
            return "Invalid Password"
    else:
        return "User could not be found"
    return "Document Created with username "+username


if __name__=='__main__':
    app.run()