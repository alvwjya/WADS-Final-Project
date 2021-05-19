import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import './newPost.css';
const { CLOUD_URI } = require('../../keys')



const NewPost = () => {


    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [tag, setTag] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (url) {
            fetch("/newpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    tag,
                    caption,
                    photo: url

                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        history.push("/")
                    }
                }).catch(err => {
                    console.log(err)
                });
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "redgram-cloud");
        data.append("cloud_name", "redgram");

        fetch(CLOUD_URI, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(data => {
                setUrl(data.secure_url)
            })
            .catch(err => { console.log(err) });





    }

    return (
        <div className="fill-window">
            <div className="container-sm ">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card flex-row my-5 bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title text-center">New Post</h5>
                                <div className="form-label-group">
                                    <input type="text" id="inputTitle"
                                        value={title} onChange={(e) => setTitle(e.target.value)}
                                        className="form-control" placeholder="Give title to your post..." />
                                    <label htmlFor="inputTitle">Give title to your post...</label>
                                </div>
                                <div className="form-label-group">
                                    <input type="text" id="inputTag"
                                        value={tag} onChange={(e) => setTag(e.target.value)}
                                        className="form-control" placeholder="Add Tag" />
                                    <label htmlFor="inputTag">Add Tag</label>
                                </div>
                                <div className="form-label-group">
                                    <textarea type="text" className="form-control"
                                        value={caption} onChange={(e) => setCaption(e.target.value)}
                                        placeholder="Write a caption..." rows="3"></textarea>
                                </div>
                                <div className="form-label-group"> Choose Photo
                                <input type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="file-field input-field" placeholder="Add photo" id="uploadImage" />
                                </div>


                                <div className="d-flex justify-content-center">

                                    <button className="btn btn-lg btn-outline-primary"
                                        onClick={() => postDetails()}
                                    >Post</button>
                                    <button id="jeng" className="btn btn-lg btn-outline-primary">Test</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    
}







export default NewPost;