import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { Link, useParams } from 'react-router-dom';
import { Gallery } from '../postRelated/gallery';


// This is the function to show the profile page.
const Profile = () => {
    const [userProfile, setProfile] = useState([]);
    const [length, setLength] = useState([]);

    const { state, dispatch } = useContext(UserContext);
    const { id } = useParams();
    //console.log(id)

    // This is used to fetch the user detail from backend.
    useEffect(() => {
        // This call '/user/: user ID' API.
        fetch(`/user/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                //console.log(result)
                //console.log(result)
                setProfile(result.user)
                setLength(result.posts.length)
            })
    }, []);

    return (
        <div>
            {NavBar()}
            <div className="d-flex flex-row pt-5 pb-5 justify-content-around text-white bg-dark">
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://i.pinimg.com/564x/17/96/f8/1796f83967cc3cc047ad58fe0e18fe62.jpg" />
                </div>
                <div className="d-flex flex-column align-self-center">
                    <h1><strong>{userProfile.username}</strong></h1>
                    <div className="row ml-2">
                        <h5 className="mr-2">{length}</h5>
                        <h5>Posts</h5>
                    </div>
                </div>
            </div>
            {Gallery(`/user/${id}`)}
        </div>
    );
}


// This is the navigation bar function.
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
                });

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
        } else {
            alert("Make sure you use @ to search user or # to search tag");
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse_target" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand mx-auto" href="/">
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
            </div>
        </nav>
    );
}


export default Profile;
