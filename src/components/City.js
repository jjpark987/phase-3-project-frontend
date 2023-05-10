import React from "react";
import { Link } from "react-router-dom";

function City({ city }) {
    return (
        <div id='city'>
            <Link to={`/cities/${city.id}/posts`}>
                <img src={city.image} alt="city" />
            </Link>
            <Link to={`/cities/${city.id}/posts`}>
                <h3>{city.name}</h3>
            </Link>
            <p>{city.population}</p>
            <p>{city.country}</p>
        </div>
    )
}

export default City;
