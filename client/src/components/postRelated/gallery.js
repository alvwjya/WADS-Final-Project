import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Gallery() {

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('http://www.omdbapi.com/?apikey=a3e014fb&s=transformers');
        const items = await data.json();
        console.log(items.Search);
        setItems(items.Search);
    }


    return (
        <div>
            <div className="row">
                {items.map(item => (
                    <div className="col-sm-2">
                        <div className="card bg-dark text-white" >
                            <img src={item.Poster} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h6 className="card-title" key={item.imdbID}>
                                    {item.Title}</h6>
                                <a href={`/gallery/${item.imdbID}`} className="stretched-link"></a>
                                <div className="container ml-2 mr-2">

                                    <div className="row">
                                        <div className="col-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
                                            <p><small>10k</small></p>
                                        </div>
                                        <div className="col-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            <p><small>5k</small></p>
                                        </div>
                                        <div className="col-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            <p><small>1.5k</small></p>
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


export default Gallery;