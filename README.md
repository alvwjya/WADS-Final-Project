# Redgram
A new social media platform made using Service Oriented Architecture for Web Application and Development final project.

![topLanguage](https://img.shields.io/github/languages/top/alviancode/WADS-Final-Project)
![commit](https://img.shields.io/github/last-commit/alviancode/WADS-Final-Project)
![license](https://img.shields.io/github/license/alviancode/WADS-Final-Project)

![image](https://github.com/alviancode/WADS-Final-Project/blob/master/preview/preview.png?raw=true)

## Team Member and Contribution
- Alvian Wijaya : Making the Frontend and connecting it to the backend.
- Christy Natalia Jusman : Making the Backend espacially the authentication.
- Davin Pratama Chandra : Making the Backend espacially the database models.

## Use Case Diagram
![image](https://github.com/alviancode/WADS-Final-Project/blob/master/preview/useCaseDiagram.png?raw=true)

## Features
- User can login or create new account (Sign Up).
- User can create new post.
- User can like/dislike other's posts.
- User can show posts from one user.
- User can give comment to a post.
- User can search other user or tag.

## System Architecture
![image](https://github.com/alviancode/WADS-Final-Project/blob/master/preview/systemArchitecture.jpg?raw=true)


## Description
### Frontend
The frontend is created using `React` and also `Bootstrap`.

## Backend
The backend of this project is built using `Express` responsible for user authentication using JSON Web Token (JWT) and other logic of the application.

## Installation
To run this web application, make sure that you have installed `Node.jS`. To install `Node.js` you can download it from [Node.js' Site](https://nodejs.org/en/download/) and install it according to your platform.

### Frontend
This service is built using `create-react-app`. To run it, first you have to install all the dependencies using `npm install`. Aftter that, run `npm start` to start the server. The default port for the server is at port `3000`. To check it, you can open your browser and go to `localhost:3000`.

### Backend
To run this service, you need to create environment variable file `.env`. The environment variable should have the spesified variable
```
MONGODB_URI = [Your MongoDB URI]
JWT_SECRET = [Some random string]
```
- `MONGODB_URI` is the link of your MongoDB database. You can use MongoDB Atlas or install MongoDB directly to your machine.
- `JWT_SECRET` is some random string used to create the token. It does not have specific minimum length or other criteria.

To run it, first you need to run
```
npm install
npm start
```
The server will run at port `4000`. To check if you sucessfuly connect with MongoDB, make sure it output `Server is running on port:  4000` to the terminal. You can change the port of the server by go to `app.js` and change
```
const port = process.env.PORT || <YOUR PORT>
```


## Technologies Used
This project is made possible using
- Node.js : JavaScript runtime.
- React : Library used to build the frontend.
- MongoDB Atlas : Remote MongoDB database to store all the necesary data.

## Demo
To try redgram, you can go to: https://redgram-wads.herokuapp.com/

