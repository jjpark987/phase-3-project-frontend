import React from "react";
import { Link } from "react-router-dom";

function City({ city, onSelectCity }) {
    return (
        <div id='city'>
            <Link 
                to={`/cities/${city.id}/posts`} 
                onClick={() => onSelectCity(city)}
            >
                <h3>{city.name}</h3>
            </Link>
            <Link 
                to={`/cities/${city.id}/posts`} 
                onClick={() => onSelectCity(city)}
            >
                <img src={city.image} alt="random city" />
            </Link>
            <p>{city.population}</p>
            <p>{city.country}</p>
        </div>
    )
}

export default City;
