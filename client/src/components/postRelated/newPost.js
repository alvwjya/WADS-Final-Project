import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import './newPost.css';
const { CLOUD_URI, UPLOAD_PRESET } = require('../../keys')


// This is the function to create new post.
const NewPost = () => {
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [tag, setTag] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // this is to fetch to the backend.
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
                    // If backend return an error, it will show an alert.
                    if (data.error) {
                        alert(data.error);
                    } else {
                        // If backend return code 200, it will redirect to the home page.
                        history.push("/")
                    }
                }).catch(err => {
                    console.log(err)
                });
        }
    }, [url])

    // This is the function for uploading the image to Cloudinary.
    const postDetails = () => {
        setButtonDisabled(true);
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

    // This is the function to check the image size and also format.
    function uploadChecker(data) {
        // This is all the supported format.
        const format = ["png", "jpg", "jpeg", "gif"]
        console.log(format.includes(data.type.split('/')[1]))

        // This is to check the size of the image, the image shiuld be less than 3MB.
        if (data.size < 3145728) {

            if (format.includes(data.type.split('/')[1])) {
                setImage(data)

                // This is to check whether the user input a valid tag.
                if (title.length < 1 || tag.length < 1 || tag.includes("#") || tag.includes("@")) {
                    setButtonDisabled(true);
                } else {
                    setButtonDisabled(false);
                }
            } else {
                setButtonDisabled(true);
            }
        }
        else {
            // This is to show an alert if the image size is too large.
            alert("File to large")
            setButtonDisabled(true);
        }
    }

    // This is the 'HTML' part of the new post page.
    return (
        <div className="container-sm pt-4">
            <Link to="/">
                <button type="button" className="btn btn-outline-danger btn-lg">Cancel</button>
            </Link>

            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-style flex-row my-5 bg-dark text-white">
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

                            <div className="d-flex flex-column"> Choose Photo
                                <input type="file" accept=".png,.jpg,.jpeg,.gif"
                                    onChange={(e) => uploadChecker(e.target.files[0])
                                        //setImage(e.target.files[0])
                                    }
                                    className="file-field input-field" placeholder="Add photo" id="uploadImage" />
                                <div className="text-danger"><small>*maximum file size 3MB</small></div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <div className="d-flex flex-column">
                                    <div className="text-warning"><small>Make sure to fill title and tag first.</small></div>
                                    <button className="btn btn-lg btn-outline-light" disabled={buttonDisabled}
                                        onClick={() => postDetails()}
                                    >Post</button>
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