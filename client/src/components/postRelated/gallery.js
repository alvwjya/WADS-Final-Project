import React, { useEffect, useState } from 'react';

export function Gallery(link) {

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        //const data = await fetch('http://www.omdbapi.com/?apikey=a3e014fb&s=transformers');
        const data = await fetch(link);
        const items = await data.json();
        console.log(items.Search);
        setItems(items.Search);
    }


    return (
        <div className="container-md">
            <div className="row mt-5">
                {items.map(item => (
                    <div className="col-md-3">
                        <div className="card bg-dark text-white mb-2" >
                            <img src={item.Poster} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-title" key={item.imdbID}><small><strong>
                                    {item.Title} </strong></small></p>
                                <a href={`/gallery/${item.imdbID}`} className="stretched-link"></a>

                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row">
                                        <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
                                        <p><small>10k</small></p>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        <p><small>5k</small></p>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bababa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        <p><small>1.5k</small></p>
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