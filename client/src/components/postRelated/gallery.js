import React, { useEffect, useState } from 'react';

export function Gallery(link) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, [items]);

    const fetchItems = async () => {

        //const data = await fetch('http://www.omdbapi.com/?apikey=a3e014fb&s=transformers');
        const data = await fetch(link, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        });
        const items = await data.json();
        //console.log(items.posts);
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
                            <img src={item.photo} className="card-img-top" />
                            <div className="card-body">
                                <p className="card-title"><small><strong>
                                    {item.title} </strong></small></p>
                                <a href={`/post/${item._id}`} className="stretched-link"></a>
                                <div className="d-flex justify-content-around">
                                    <div className="d-flex flex-row">
                                        <div className="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
                                            <p className="ml-1"><small>{calculateScore(item.likes.length, item.dislikes.length)}</small></p>
                                        </div>
                                            

                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            <p className="ml-1"><small>{item.comments.length}</small></p>
                                        </div>
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

//<svg className="vertical-center" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>

/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-end" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
<path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/>
</svg>*/
export default Gallery;