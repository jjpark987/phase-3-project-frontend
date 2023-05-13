import React from "react";
import { Link } from "react-router-dom";

function City({ city, onUpdateCities }) {
    function deleteCity(city) {
        fetch(`http://localhost:9292/cities/${city.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(r => r.json())
        .then(d => onUpdateCities('delete', d))
        .catch(e => console.log(e))
    }

    return (
        <div id='city-item'>
            <Link to={`/cities/${city.id}/posts`}>
                <img src={city.image} alt="city" />
                <h3>{city.name}, {city.country}</h3>
            </Link>
            <p>Pop: {parseInt(city.population).toLocaleString()}</p>
            <button id='delete-city-btn' name='delete' onClick={() => deleteCity(city)}>Delete City</button>
        </div>
    )
}

export default City;
