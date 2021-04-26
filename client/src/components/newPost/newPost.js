import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as reactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';



const newPost = () => {
    return (

        <div>
            <div className="float-left">
            <Link to='/'>
                        <button className="btn btn-outline-light ml-5 mt-3" >Back to Home</button>
                    </Link>
            </div>
            <h1>New POST</h1>
        </div>

    );
}

export default newPost;