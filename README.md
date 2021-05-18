# Todo React Native App
A Todo app where users can signup or login, make list and add tasks. Users can also edit or delete the task and also delete the list. It is built with React Native in frontend, Flask in backend and also MongoDb as the database.

## Images

<div align="center">
<img width="200" alt="todo" src="https://user-images.githubusercontent.com/56125734/118708511-7295d200-b839-11eb-9de0-482c26856da5.PNG" hspace="25"><img width="200" alt="todo" src="https://user-images.githubusercontent.com/56125734/118708643-978a4500-b839-11eb-908a-6789bd7a337b.PNG">
</div>
<br>
<div align="center">
<img width="200" alt="todo" src="https://user-images.githubusercontent.com/56125734/118708716-af61c900-b839-11eb-967a-bd20a45a6a65.PNG" hspace="25"><img width="200" alt="todo" src="https://user-images.githubusercontent.com/56125734/118708781-c7d1e380-b839-11eb-94e9-8eee1b6251ee.PNG">
</div>

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

## Video Demonstration of the app

https://user-images.githubusercontent.com/56125734/118708322-36627180-b839-11eb-90b8-a80da0935e44.mov

