from flask import Flask
from flask import render_template
import requests
import json
app=Flask(__name__)
@app.route('/')
def Home():
    return "Backend Working"
if __name__=='__main__':
    app.run()