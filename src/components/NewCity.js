import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCity({ onUpdateCities }) {
    const [newCity, setNewCity] = useState({
        name: '',
        country: '',
        population: '',
        image: ''
    })
    const navigate = useNavigate()

    function updateNewCity(e) {
        setNewCity({ ...newCity, [e.target.name]: e.target.value })
    }

    function submitNewCity(e) {
        e.preventDefault()
        fetch('http://localhost:9292/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newCity.name,
                country: newCity.country,
                population: newCity.population,
                image: newCity.image
            })
        })
        .then(r => r.json())
        .then(d => {
            onUpdateCities('post', d)
            navigate('/cities')
        })
        .catch(e => console.log(e))
    }

    return (
        <div id='new-city'>
            <h1>New City</h1>
            <form id='new-city-form' name='submit' onSubmit={submitNewCity}>
                <label htmlFor='name'>City: </label>
                <input 
                    id='name' 
                    name='name'
                    required
                    value={newCity.name}
                    onChange={updateNewCity}
                />
                <label htmlFor='country'>Country: </label>
                <input
                    id='country'
                    name='country'
                    required
                    value={newCity.country}
                    onChange={updateNewCity}
                />
                <label htmlFor='population'>Population: </label>
                <input 
                    id='population'
                    name='population'
                    required
                    value={newCity.population}
                    onChange={updateNewCity}
                />
                <label htmlFor='image'>Image URL: </label>
                <input
                    id='image'
                    name='image'
                    required
                    value={newCity.image}
                    onChange={updateNewCity}
                />
                <button id='submit-new-city-btn' >Submit City</button>
            </form>
        </div>
    )
}

export default NewCity;
