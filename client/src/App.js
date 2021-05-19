import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link, BrowserRouter, useHistory } from 'react-router-dom';
import NewPost from './components/postRelated/newPost';
import SignIn from './components/credential/signIn';
import SignUp from './components/credential/signUp';
import postDetail from './components/postRelated/postDetail';
import { Gallery } from './components/postRelated/gallery';
import profile from './components/profilePage/profilePage';
import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { reducer, initialState } from './reducer/userReducer'
export const UserContext = createContext();




const Routing = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "USER", payload: user })
            history.push('/');
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
            <Route path='/gallery/:id' component={postDetail} />
            <Route path='/profile' component={profile} />
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
            {navbar()}
            {Gallery("/allpost")}
        </div>


    );
}

function navbar() {
    return (

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
                <div className="container-fluid">


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
                            <Link to='profile'>
                                <button className="btn btn-outline-success mt-1 mb-1" >Profile</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

    );
}



export default App;
