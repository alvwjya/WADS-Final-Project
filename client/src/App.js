import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link, BrowserRouter, useHistory } from 'react-router-dom';
import NewPost from './components/postRelated/newPost';
import Tag from './components/postRelated/byTag';
import SignIn from './components/credential/signIn';
import SignUp from './components/credential/signUp';
import postDetail from './components/postRelated/postDetail';
import { Gallery } from './components/postRelated/gallery';
import UserProfile from './components/profilePage/UserProfile';
import React, { useState, useEffect, createContext, useReducer, useContext } from 'react';
import { reducer, initialState } from './reducer/userReducer'
export const UserContext = createContext();




const Routing = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "USER", payload: user })
            //history.push('/');
        } else {
            history.push('/signin');
        }
    }, [])

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/newpost" exact component={NewPost} />
            <Route path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/post/:id' component={postDetail} />
            <Route path='/profile/:id' component={UserProfile} />
            <Route path='/tag/:query' component={Tag} />
        </Switch>
    )
}


function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (

        <UserContext.Provider value={{ state, dispatch }}>
            <div>
                <BrowserRouter>
                    <Routing />
                </BrowserRouter>
            </div>
        </UserContext.Provider>
    );
}


function Home() {
    return (
        <div>
            {NavBar()}
            {Gallery("/allpost")}
        </div>


    );
}

function NavBar() {
    const { state, dispatch } = useContext(UserContext)


    function refreshPage() {
        window.location.reload(true);
    }

    function fetchUsers(query) {

        if (query.charAt(0) == "#") {
            var newQuery = query.split("#")[1];
            fetch(`/search-tag/${newQuery}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(results => {
                    console.log(results.posts)
                    //setUserDetails(results.user[0]._id)
                    //console.log(newQuery)
                    if (results.posts.length > 0) {
                        const { href } = window.location;
                        window.location.href = `/tag/${newQuery}`;
                    }
                    else {
                        alert("Tag not found");
                    }
                })

        } else if (query.charAt(0) == "@") {
            var newQuery = query.split("@")[1];
            fetch('/search-users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: newQuery
                })
            }).then(res => res.json())
                .then(results => {
                    console.log(results.user.length)
                    //setUserDetails(results.user[0]._id)
                    if (results.user.length > 0) {
                        const { href } = window.location;
                        window.location.href = `/profile/${results.user[0]._id}`;

                    }
                    else {
                        alert("User not found");
                    }
                })
        }
    }



    function showProfile() {
        const { href } = window.location;
        window.location.href = `/profile/${JSON.parse(localStorage.getItem("user"))._id}`;

    }

    return (

        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            <div className="container-fluid">


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse_target" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand mx-auto">
                    <img src='https://res.cloudinary.com/redgram/image/upload/v1621665209/Untitled-2_c9icpj.png' height="30" />
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


                    <form className="mx-auto d-inline w-50 mt-1 mb-1"
                        onSubmit={(e) => {
                            e.preventDefault()
                            fetchUsers(e.target[0].value)
                        }}>
                        <input type="text" className="form-control" placeholder="#tags, @users" />
                    </form>
                </div>
                <ul className="navbar-nav  ml-2 mr-2">
                    <li className="form-inline">
                        <button onClick={() =>{
                            showProfile();
                        }}
                        className="btn btn-outline-light mt-1 mb-1 mr-3" >Profile</button>
                        <button className="btn btn-outline-danger mt-1 mb-1"
                            onClick={() => {
                                localStorage.clear();
                                dispatch({ type: "CLEAR" });
                                refreshPage();
                            }}
                        >Sign Out</button>
                    </li>
                </ul>
            </div>
        </nav>

    );
}



export default App;
