# Todo React Native App
A Todo app where users can signup or login, make list and add tasks. Users can also edit or delete the task and also delete the list. It is built with React Native in frontend, Flask in backend and also MongoDb as the database.
## Steps to Install in your System
* Make sure you have following things in your systems: Node Js, Python,Flask, Ngrok, Mongodb.
* Also make sure you have installed Expo app in your Phone.
* Clone my repository.
* Open Command Shell and install dependencies by using command npm install package or yarn add package.
* Install all the dependencies specified in package.json.

## Steps to Run in your System
* Open two Command shell from the folder, one for Frontend and second for Backend.
* In first Command shell enter command npm start or yarn start.
```bash
npm start
```
or
```bash
yarn start
```
* You will get a tab open in browser displaying QR code.
* In second command shell enter following command.
```bash
cd backend
python app.py
```
* Start MongoDb server.
* Open ngrok terminal and enter followint command.
```bash
ngrok http 5000
```
* 5000 is the port number where the Flask app i.e Backend Running.
* Then copy ngrok url and replace every backend_url in all javascript by ngrok url.
* This is important step because expo gives an error when it send request to app running on same server i.e 127.0.0.1 in our case.
* Open the broweser and scan the QR code with your Phone.
* And your app will start running on Phone.
