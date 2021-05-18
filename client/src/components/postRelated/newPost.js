import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as reactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';



const newPost = () => {

    return (
        <div className="container-sm">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card flex-row my-5 bg-dark text-white">
                        <div className="card-body">
                            <h5 className="card-title text-center">New Post</h5>

                            <div className="form-label-group">
                                <input type="text" id="inputTitle" className="form-control" placeholder="Give title to your post..." required autofocus />
                                <label for="inputTitle">Give title to your post...</label>
                            </div>

                            <div className="form-label-group">
                                <input type="text" id="inputTag" className="form-control" placeholder="Add Tags" required />
                                <label for="inputTag">Add Tags</label>
                            </div>

                            <div className="form-label-group">
                                <textarea type="text" id="inputDesc" className="form-control" placeholder="Add a description" rows = "3"></textarea>
                                
                            </div>

                            <div className="form-label-group"> Choose Photo
                                <input type="file" className="file-field input-field" placeholder="Add photo" id="uploadImage" />
                            </div>


                            <div className="d-flex justify-content-center">

                                <button className="btn btn-lg btn-outline-primary " type="submit">Post</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (




        <div>
            <div className="float-left">
                <Link to='/'>
                    <button className="btn btn-outline-light ml-5 mt-3" >Back to Home</button>
                </Link>
            </div>
            <h1>New POST</h1>
            <div className="container-sm">
                <div className="card-body">
                    <div className="form-group">
                        <div className="d-flex flex-column">
                            <input type="text" placeholder="Give title to your post..." id="postTitleField" />
                            <input type="text" placeholder="Add a description" id="postDescField" />
                            <label className="form-label" for="uploadImage">Default file input example</label>
                            <input type="file" className="form-control-file" placeholder="Add photo" id="uploadImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default newPost;