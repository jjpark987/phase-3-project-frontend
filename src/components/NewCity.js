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
            onUpdateCities('post city', d)
            navigate('/cities')
        })
        .catch(e => console.log(e))
    }

    return (
        <div id='new-city' className='component'>
            <h1>New City</h1>
            <form className='form' onSubmit={submitNewCity}>
                <label htmlFor='new-city-name'>City: </label>
                <input 
                    id='new-city-name' 
                    className='form-element input'
                    name='name'
                    required
                    placeholder='ex. Paris'
                    value={newCity.name}
                    onChange={updateNewCity}
                />
                <label htmlFor='new-city-country'>Country: </label>
                <input
                    id='new-city-country'
                    className='form-element input'
                    name='country'
                    required
                    placeholder='ex. France'
                    value={newCity.country}
                    onChange={updateNewCity}
                />
                <label htmlFor='new-city-population'>Population: </label>
                <input 
                    id='new-city-population'
                    className='form-element input'
                    name='population'
                    required
                    placeholder='ex. 2100000'
                    value={newCity.population}
                    onChange={updateNewCity}
                />
                <label htmlFor='image'>Image URL: </label>
                <input
                    id='image'
                    className='form-element input'
                    name='image'
                    required
                    placeholder='ex. https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg'
                    value={newCity.image}
                    onChange={updateNewCity}
                />
                <button className='btn'>Submit City</button>
            </form>
        </div>
    )
}

export default NewCity;
