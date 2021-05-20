import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App'
import './postDetail.css'

function PostDetail({ match }) {

    const [item, setItem] = useState([]);
    const [username, setUsername] = useState([]);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    useEffect(() => {
        fetchItem();
        //console.log(match);
    }, [item]);


    const fetchItem = async () => {
        const fetchItem = await fetch('/postdetail',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    "p": match.params.id
                }
            });
        const item = await fetchItem.json();
        setItem(item.post);
        setUsername(item.post.username)
        setLikes(item.post.likes.length)
        setDislikes(item.post.dislikes.length)
        //console.log(likes);
    }
    
    function likePost(id) {
        fetch('/like', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = (item => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                })
                setItem(newData);
            }).catch(err => {
                console.log(err);
            });
    }


    function dislikePost(id) {
        fetch('/dislike', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = (item => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                })
                setItem(newData);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <div>
                {NavBar()}
            </div>
            <div className="container-md mt-5 bg-secondary  pb-5">
                <div className="d-flex flex-column bg-dark pt-3 mb-4 pb-3">

                    <div className="d-flex justify-content-start">
                        <h3 className="ml-2 text-light"><strong>{item.title}</strong></h3>
                    </div>
                    <div className="d-flex justify-content-start ml-3">
                        <a href="#" className="link text-success"><strong>{username.username}</strong></a>
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <img src={item.photo} className="setSize" />
                </div>
                <div className="d-flex justify-content-center">
                    <div className="d-flex p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                            <rect className="btn" x="0" y="0" width="15" height="15" onClick={() => { likePost(item._id) }}></rect>
                        </svg>
                        <text>{likes}</text>
                    </div>
                    <div className="d-flex p-2 ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                            <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z" />
                            <rect className="btn" x="0" y="0" width="15" height="15" onClick={() => { dislikePost(item._id) }}></rect>
                        </svg>
                        <text>{dislikes}</text>
                    </div>

                </div>

            </div>
        </div>
    );
}


function NavBar() {
    const { state, dispatch } = useContext(UserContext);

    function refreshPage() {
        window.location.reload(true);
    }

    return (

        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            <div className="container-fluid">


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse_target" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand mx-auto">
                    <img src='https://res.cloudinary.com/redgram/image/upload/v1621519082/Untitled-2_mbkmnv.png' height="30" />
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
                            <button className="btn btn-outline-light mt-1 mb-1 mr-3" >Profile</button>
                        </Link>
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


export default PostDetail;