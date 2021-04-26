import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ItemDetail({match}) {

    useEffect(() => {
        fetchItem();
        console.log(match);
    }, []);

    const [item, setItem] = useState({});

    const fetchItem = async () => {
        const fetchItem = await fetch(`http://www.omdbapi.com/?apikey=a3e014fb&i=${match.params.id}`);
        const item = await fetchItem.json();
        setItem(item);
        console.log(item);
    }


    return (

        
        <div>
            <div className="float-left">
                <Link to='/gallery'>
                    <button className="btn btn-outline-light ml-5 mt-3" >Back to Home</button>
                </Link>
                </div>


            <h1>{item.Title}</h1>
            <img src={item.Poster}/>
        </div>





    );
}

export default ItemDetail;