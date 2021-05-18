import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as reactBootStrap from 'react-bootstrap';
import './signUp.css';
import { Link, useHistory } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast'

//https://jsfiddle.net/StartBootstrap/1nu8g6e5
//First



function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    const postData = () => {
        fetch("http://localhost:4000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else{
                    alert(data.message);
                    history.push("/signin")
                }
            })
    }

    return (
        <div className="signUp">
            <div className="float-left">
                <Link to='/'>
                    <button className="btn btn-outline-light ml-5 mt-3" >Back to Home</button>
                </Link>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">

                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign Up</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserame"
                                            value={username} onChange={(e) => setUsername(e.target.value)}
                                            className="form-control" placeholder="Username" required autofocus />
                                        <label for="inputUserame">Username</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="email" id="inputEmail"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            className="form-control" placeholder="Email address" required />
                                        <label for="inputEmail">Email address</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword"
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            className="form-control" placeholder="Password" required />
                                        <label for="inputPassword">Password</label>
                                    </div>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                        onClick={() => postData()}
                                        type="submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;