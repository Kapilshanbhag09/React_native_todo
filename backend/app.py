from flask import Flask
from flask import render_template
import requests
import json
import pymongo
from flask_cors import CORS
app=Flask(__name__)
CORS(app)
#cors = CORS(app, resource={r"/*":{  "origins":"*"}})
@app.route('/')
def Home():
    return "Backend Working"
@app.route('/database/<databasename>',methods=["GET"])
def Database(databasename):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    mydb = myclient['Todo_React_Native']
    return databasename

#Signup verification
@app.route('/signup/<username>/<password>',methods=["GET"])
def Signup(username,password):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient['Todo_React_Native']
    collection=db["user_credentials"]
    usernameflag=int(0)
    for i in collection.find({"username":str(username)}):
        if str(username)==i["username"]:
            usernameflag=int(1)
    if usernameflag==1:
        return json.dumps("Username Exists")
    else:
        collection.insert_one({'username':username,'password':password})
        return json.dumps("User created")

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


#List Fetch
@app.route('/listfetch/<username>')
def Listfetch(username):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient['Todo_React_Native']
    collection=db[username+'_tasklist']
    tasklist=[]
    docs=collection.find({})
    for i in docs:
        tasklist.append(i['listname'])
    if(len(tasklist)==0):
        return "No List found"
    else:
        return json.dumps(tasklist)
#Tasks fetch
@app.route('/tasksfetch/<username>/<listname>')
def Taskfetch(username,listname):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient[username+'_taskdb']
    collection=db[listname]
    taskslist=[]
    docs=collection.find({})
    for i in docs:
        taskslist.append([i['taskname'],i['status']])
    if(len(taskslist)==0):
        return "No Task found"
    else:
        return json.dumps(taskslist)
#Add List
@app.route('/addlist/<username>/<listname>')
def AddList(username,listname):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient['Todo_React_Native']
    collection=db[username+'_tasklist']
    collection.insert({'listname':listname})
    return "Inserted"

#Delete List
@app.route('/deletelist/<username>/<listname>')
def DeleteList(username,listname):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient['Todo_React_Native']
    collection=db[username+'_tasklist']
    myquery = { "listname": listname }
    collection.delete_one(myquery)
    db2=myclient[username+"_taskdb"]
    col2=db2[listname]
    col2.drop()
    return "Deleted"
#Task completed
@app.route('/taskcompleted/<username>/<listname>/<taskname>')
def Taskcompleted(username,listname,taskname):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient[username+'_taskdb']
    collection=db[listname]
    taskname.replace("%20"," ")
    myquery = { "taskname": taskname }
    newvalues = { "$set": { "status": "complete" } }
    collection.update_one(myquery, newvalues)
    return "Added to completed"

#Task Not Completed
@app.route('/tasknotcompleted/<username>/<listname>/<taskname>')
def TaskNotcompleted(username,listname,taskname):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient[username+'_taskdb']
    collection=db[listname]
    taskname.replace("%20"," ")
    myquery = { "taskname": taskname }
    newvalues = { "$set": { "status": "incomplete" } }
    collection.update_one(myquery, newvalues)
    return "Added to Incomplete"

#Add Task
@app.route('/addtask/<username>/<listname>/<taskname>')
def Addtask(username,listname,taskname):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient[username+'_taskdb']
    collection=db[listname]
    taskname.replace("%20"," ")
    collection.insert({'taskname':taskname,'status':'incomplete'})
    return "Task Inserted"



#Task Deletion
@app.route('/deletetask/<username>/<listname>/<taskname>')
def Deletetask(username,listname,taskname):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient[username+'_taskdb']
    collection=db[listname]
    taskname.replace("%20"," ")
    myquery = { "taskname": taskname }
    collection.delete_one(myquery)
    return "Task deleted"

#Edit Task
@app.route('/edittask/<username>/<listname>/<fromtask>/<totask>')
def Edittask(username,listname,fromtask,totask):
    myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db=myclient[username+'_taskdb']
    collection=db[listname]
    fromtask.replace("%20"," ")
    totask.replace("%20"," ")
    myquery = { "taskname": fromtask }
    newvalues = { "$set": { "taskname": totask } }
    collection.update_one(myquery, newvalues)
    return "Task Edited"
if __name__=='__main__':
    app.run()