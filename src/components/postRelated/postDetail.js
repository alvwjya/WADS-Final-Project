import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App'
import './postDetail.css'
import { dimensions } from '../dimensions'

function PostDetail({ match }) {
    const history = useHistory();

    const { state, dispatch } = useContext(UserContext);

    const [item, setItem] = useState({});
    const [username, setUsername] = useState([]);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [comments, setComments] = useState([]);
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
        setLikes(item.post.likes)
        setDislikes(item.post.dislikes)
        //console.log((likeCheck()));
        setComments(item.post.comments);
        //setCommentUser(item.post.comments.username.username)
        //console.log(item.post.comments);
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


    function dislikePost(postId) {
        fetch('/dislike', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId
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

    const makeComment = (comment, postId) => {
        fetch('/comment', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                comment
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = (item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setItem(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    function deletePost(postid) {
        fetch(`/deletepost/${postid}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = (item => {
                    return item._id !== result._id
                })
                setItem(newData)
            })
        history.push('/');
    }

    function deleteComment(commentId) {
        fetch(`/deletecomment/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
                "p": match.params.id
            }
        }).then(res => res.json())

    }


    return (
        <div>
            {NavBar()}
            <div className="container-md mt-5 bg-color pb-5 text-light">
                <div className="d-flex flex-column bg-color pt-3 mb-4 pb-3 border-secondary border-bottom">
                    <div className="d-flex justify-content-between ml-2 mr-2 mt-2">
                        <h3 className=" text-light"><strong>{item.title}</strong></h3>
                        {username._id === JSON.parse(localStorage.getItem("user"))._id
                            &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                <rect className="btn" x="0" y="0" width="20" height="20" onClick={() => { deletePost(item._id) }}></rect>
                            </svg>
                        }

                    </div>
                    <div className="d-flex justify-content-between ml-2 mr-2">
                        <div className="d-flex flex-column">
                            <a href={`/profile/${username._id}`} className="streched-link text-success"><strong>{username.username}</strong></a>
                            <text className="text-secondary"><small>{item.date}</small></text>
                        </div>
                        <div>
                            <text className="text-light">#</text>
                            <a href={`/tag/${item.tag}`} className="streched-link text-light">{item.tag}</a>
                        </div>

                    </div>

                </div>
                <div className="d-flex justify-content-center mb-3">
                    {dimensions(item.photo).width > dimensions(item.photo).height
                        ?
                        <img src={item.photo} style={{ width: "800px" }}
                            className=" img-fluid" />
                        :
                        <img src={item.photo} style={{
                            height: "600px"
                        }}
                            className=" img-fluid" />
                    }

                </div>
                <div className="d-flex justify-content-center border-secondary border-bottom">
                    <div className="d-flex justify-content-center w-75">
                        <div className="w-75">{item.caption}</div>
                        <div className="d-flex flex-row w-25">
                            <div className="d-flex p-2 mr-3 ">
                                {likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                                    ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="lightgrey" className="bi bi-hand-thumbs-up-fill invert" viewBox="0 0 16 16">
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                        <rect className="btn" x="0" y="0" width="15" height="15" onClick={() => { likePost(item._id) }}></rect>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="lightgrey" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                        <rect className="btn" x="0" y="0" width="15" height="15" onClick={() => { likePost(item._id) }}></rect>
                                    </svg>
                                }
                                <text>{likes.length}</text>
                            </div>
                            <div className="d-flex p-2 ml-3">

                                {dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="lightgrey" className="bi bi-hand-thumbs-down-fill invert" viewBox="0 0 16 16">
                                        <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                                        <rect className="btn" x="0" y="0" width="15" height="15" onClick={() => { dislikePost(item._id) }}></rect>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="lightgrey" className="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                                        <rect className="btn" x="0" y="0" width="15" height="15" onClick={() => { dislikePost(item._id) }}></rect>
                                    </svg>

                                }
                                <text>{dislikes.length}</text>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pt-5">
                    <div className="d-flex justify-content-center w-75">
                        <form className="w-100" onSubmit={(e) => {
                            e.preventDefault()
                            makeComment(e.target[0].value, item._id)
                        }}>
                            <div className="form-label-group">
                            <input type="text" placeholder="add a comment..." className="w-100" id="inputComment"/>
                                    <label htmlFor="inputComment">add a comment...</label>
                                </div>
                            
                        </form>
                    </div>
                </div>
                <div className="d-flex justify-content-center pt-4">
                    <div className="d-flex justify-content-center pt-3 flex-column w-75">
                        {
                            comments.map(record => {
                                if (record.username._id === JSON.parse(localStorage.getItem("user"))._id) {
                                    return (
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-column text-light pb-3">
                                                <a href={`/profile/${record.username._id}`} className="streched-link text-light"><strong>{record.username.username}</strong></a>
                                                <text>{record.comment}</text>
                                            </div>
                                            <div className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                    <rect className="btn" x="0" y="0" width="20" height="20" onClick={() => {
                                                        deleteComment(record._id)
                                                    }}></rect>
                                                </svg>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (

                                        <div className="d-flex flex-column text-light pb-3 w-75">
                                            <a href={`/profile/${record.username._id}`} className="streched-link text-light"><strong>{record.username.username}</strong></a>
                                            <text>{record.comment}</text>
                                        </div>


                                    )
                                }

                            })
                        }
                        {/*comments.username === JSON.parse(localStorage.getItem("user"))._id
                            &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                <rect className="btn" x="0" y="0" width="20" height="20" onClick={() => { deletePost(item._id) }}></rect>
                            </svg>*/
                        }
                    </div>
                </div>
            </div>
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
            </div>
        </nav>

    );
}


export default PostDetail;