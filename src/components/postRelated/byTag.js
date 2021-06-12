import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Link, useParams } from 'react-router-dom'
import { Gallery } from './gallery';


const Tag = () => {
    const { query } = useParams();
    return (
        <div>
            {NavBar()}
            {Gallery(`/search-tag/${query}`)}

        </div>

    )

}

function NavBar() {

    return (
        <div className="bg-secondary">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">

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
                </div>
            </nav>
        </div>
    );
}


export default Tag;