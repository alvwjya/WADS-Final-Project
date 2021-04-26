import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as reactBootStrap from 'react-bootstrap';
import './signUp.css';
import {Link} from 'react-router-dom';

//https://jsfiddle.net/StartBootstrap/1nu8g6e5
//First



const signUp = () => {
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
                                <h5 className="card-title text-center">Register</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserame" className="form-control" placeholder="Username" required autofocus />
                                        <label for="inputUserame">Username</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                                        <label for="inputEmail">Email address</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                        <label for="inputPassword">Password</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required />
                                        <label for="inputConfirmPassword">Confirm password</label>
                                    </div>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default signUp;