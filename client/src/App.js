import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link } from 'react-router-dom';
import newPost from './components/newPost/newPost';
import signIn from './components/credential/signIn';
import signUp from './components/credential/signUp';
import postDetail from './components/postDetail/postDetail';
import Gallery from './components/postDetail/gallery';


function App() {


    return (

        <div className="App bg-secondary">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/newpost" exact component={newPost} />
                <Route path='/signin' exact component={signIn} />
                <Route path='/signup' exact component={signUp} />
                <Route path='/gallery/:id' component={postDetail} />
            </Switch>
        </div>





    );
}

const Home = () => (


    <div className="bg-secondary">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse_target" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand mx-auto">
                <img src='redgram_logo.png' height="30" />
            </a>
            <div className="collapse navbar-collapse" id="collapse_target">

                <Link to='/newpost'>
                    <button className="btn btn-success ml-2 mt-1 mb-1" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 20 20">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                New Post
            </button>
                </Link>


                <form className="mx-auto d-inline w-50 mt-1 mb-1">
                    <div className="input-group">
                        <input type="text" className="form-control border border-right-0" placeholder="Images, #tags, @users" id="seachInput" />
                        <span className="input-group-append">
                            <button className="btn bg-transparent border border-left-0" type="button" id="searchButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-search" viewBox="0 0 16 20">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </span>
                    </div>

                </form>

            </div>

            <ul className="navbar-nav  ml-2 mr-2">
                <li className="form-inline">
                    <Link to='signin'>
                        <button className="btn btn-outline-light mr-2 mt-1 mb-1" >Sign In</button>
                    </Link>
                    <Link to='signup'>
                        <button className="btn btn-primary mt-1 mb-1" >Sign Up</button>
                    </Link>
                </li>
            </ul>
        </nav>

        <Gallery />
    </div>


);



export default App;