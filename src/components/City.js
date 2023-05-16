import React from "react";
import { Link } from "react-router-dom";

function City({ city }) {
    return (
        <div id='city-item'>
            <Link to={`/cities/${city.id}/posts`}>
                <img src={city.image} alt="city" />
                <h3>{city.name}, {city.country}</h3>
            </Link>
            <p>Pop: {parseInt(city.population).toLocaleString()}</p>
        </div>
    )
}

export default City;
