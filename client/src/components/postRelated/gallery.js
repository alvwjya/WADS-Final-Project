import React, { useEffect, useState } from 'react';

export function Gallery(link) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {

        //const data = await fetch('http://www.omdbapi.com/?apikey=a3e014fb&s=transformers');
        const data = await fetch(link, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        });
        const items = await data.json();
        console.log(items.posts);
        setItems(items.posts);
    }

    function calculateScore(likes, dislikes) {
        return likes - dislikes;
    }

    return (

        <div className="container-md">
            <div className="row mt-5">
                {items.map(item => (
                    <div className="col-md-3" key={item._id}>
                        <div className="card bg-dark text-white mb-2" >
                            <img src={item.photo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-title"><small><strong>
                                    {item.title} </strong></small></p>
                                <a href={`/post/${item._id}`} className="stretched-link"></a>
                                <div className="d-flex justify-content-around">
                                    <div className="d-flex flex-row">
                                        <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
                                        <p><small>{calculateScore(item.likes.length, item.dislikes.length)}</small></p>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        <p><small>Comments</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>



        </div>
    );

}


export default Gallery;