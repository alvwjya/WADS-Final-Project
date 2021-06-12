import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signUp.css';
import { useHistory } from 'react-router-dom';

//https://jsfiddle.net/StartBootstrap/1nu8g6e5

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    const postData = () => {
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirmPassword
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert(data.message);
                    history.push("/signin")
                }
            }).catch(err => {
                console.log(err)
                alert("Oops! Something went wrong.");
            })
    }

    return (
        <div className="signUp">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5 bg-dark text-white">
                            <div className="card-img-left d-none d-md-flex">

                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-3">
                                    <img src='https://res.cloudinary.com/redgram/image/upload/v1621665209/Untitled-2_c9icpj.png' height="80" />
                                </div>
                                <div className="form-label-group">
                                    <input type="text" id="inputUserame"
                                        value={username} onChange={(e) => setUsername(e.target.value)}
                                        className="form-control" placeholder="Username" />
                                    <label htmlFor="inputUserame">Username</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="email" id="inputEmail"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="form-control" placeholder="Email address" required />
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="form-control" placeholder="Password" required />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputConfirmPassword"
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="form-control" placeholder="Confirm Password" required />
                                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button className="btn  btn-lg btn-outline-light text-uppercase form-btn"
                                        onClick={() => postData()}>Sign up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;