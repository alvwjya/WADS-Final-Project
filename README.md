# Redgram
A new social media platform made using Service Oriented Architecture for Web Application and Development final project.

![topLanguage](https://img.shields.io/github/languages/top/alviancode/WADS-Final-Project)
![commit](https://img.shields.io/github/last-commit/alviancode/WADS-Final-Project)
![license](https://img.shields.io/github/license/alviancode/WADS-Final-Project)

<p align="center">
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/RedgramPoster.png" height="600">
</p>

## Team Member and Contribution
### GROUP 5
- Alvian Wijaya/ 2301891595 : Making the Frontend and connecting it to the backend.
- Christy Natalia Jusman/ 2301890365 : Making the Backend especially the database models.
- Davin Pratama Chandra/ 2301891090 : Making the Backend especially the authentication.
<br>(please change the branch so the progress can be seen)

## Use Case Diagram
<p align="center">
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/useCaseDiagram.png" height="600">
</p>

## Preview
<p align="center">
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/preview.png">
</p>

## Features
- Users can login or create new account (Sign Up).
- Users can create new post.
- Users can like/dislike other's posts.
- Users can show posts from one user.
- Users can give comments to a post.
- Users can search other user or tag.

## System Architecture
<p align="center">
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/systemArchitecture.jpg" height="400">
</p>

## Database Model
Because we are using MongoDB for this project, here are some examples of our database models

### ERD
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/ERD.jpg" width="400">

### Post Database Structure
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/Post's%20Structure.png" width="600">

### User Database Structure
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/Users'%20Structure.png" width="600">

## Description
### Frontend
The frontend is created using `React` and also `Bootstrap`.

## Backend
The backend of this project is built using `Express` responsible for user authentication using JSON Web Token (JWT) and other logic of the application.

## Installation
To run this web application, make sure that you have installed `Node.jS`. To install `Node.js` you can download it from [Node.js' Site](https://nodejs.org/en/download/) and install it according to your platform.

### Frontend
This service is built using `create-react-app`. To run it, first you have to install all the dependencies using `npm install`.

After that, go to `newPost.js` and change

```
const postDetails = () => {
        setButtonDisabled(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "<YOUR_UPLOAD_PRESET>");
        data.append("cloud_name", "<YOU_CLOUD_NAME>");

        fetch(CLOUD_URI, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(data => {
                setUrl(data.secure_url)
            })
            .catch(err => { console.log(err) });
    }
```

Next, go to `keys.js` and change
```
CLOUD_URI:"<CLOUDINARY_URL>"
```

After that, run `npm start` to start the server. The default port for the server is at port `3000`. To check it, you can open your browser and go to `localhost:3000`.

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
- Cloudinary : Used to store all necessary images.

## API Endpoints
<p align="center">
<img src="https://raw.githubusercontent.com/alviancode/WADS-Final-Project/master/preview/API%20Endpoints.png" width="500">
</p>

## Instruction
1. Go to [Redgram](https://redgram-wads.herokuapp.com/) website.
2. You can sign in with your email.
3. If you don't have an account yet, you can signup.
4. When signing up, make sure to input valid email format and use password with minimum length of six characters.
5. After you login, you can see the home page of Redgram.
6. To search a user, use `@<USERNAME>` in the search bar. To search a tag, use `#<TAG>` in the search bar.
7. You can create new post by clicking `New Post` button.
8. Make sure to input your post title and tag first before selecting an image.
9. The accepted image formats are `.png`,`.jpg`,`.jpeg`, and `.gif`.
10. You can click `upload` button to publish the new post.
11. To give comment, like, or dislike, you can click a post on the home page.
12. To log out, you can click the `Sign Out` button at the top right corner.

## Demo
To try redgram, you can go to: https://redgram-wads.herokuapp.com/
