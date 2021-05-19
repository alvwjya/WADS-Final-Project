import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signIn.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App'

//https://startbootstrap.com/snippets/login
//https://jsfiddle.net/e0tbqp9L/1/

const SignIn = () => {
    const { state, dispatch } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    const postData = () => {
        fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user });
                    history.push("/");
                }
            }).catch(err => {
                console.log(err)
            });
    }

    return (
        <div className='signIn fill-window'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5 bg-dark text-white">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-5">
                                    <img src='redgram_logo.png' height="80" />
                                </div>
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="form-control" placeholder="Email address" />
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="form-control" placeholder="Password" />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                                <div className="d-flex justify-content-center flex-column">
                                    <button className="btn btn-lg btn-outline-light text-uppercase form-btn"
                                        onClick={() => postData()}>Sign in</button>
                                    <Link to='signup' className = "text-center mt-3 text-white">Don't have an account?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignIn;