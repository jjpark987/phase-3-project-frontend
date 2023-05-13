import React, { useState } from "react";
import City from "./City";
import { useNavigate } from "react-router-dom";

function CityList({ cities, onUpdateCities }) {
    const [searchCity, setSearchCity] = useState('')
    const [sortBy, setSortBy] = useState('population')
    const navigate = useNavigate()
    const filterFn = city => city.name.toLowerCase().includes(searchCity.toLowerCase())
    const sortFn = (a, b) => sortBy === 'population' ? b[sortBy] - a[sortBy] : a[sortBy].localeCompare(b[sortBy])

    function updateSearchCity(e) {
        setSearchCity(e.target.value)
    }

    function updateSortBy(e) {
        setSortBy(e.target.value)
    }

    return (
        <div id='city-list'>
            <button id='add-city-btn' onClick={() => navigate('/cities/new')}>Add City</button>
            <form id='search-sort-cities-form'>
                <label htmlFor='search-city'>Search city: </label>
                <input 
                    id='search-city' 
                    placeholder='ex. New York'
                    value={searchCity}
                    onChange={updateSearchCity}
                />
                <label htmlFor='sort-cities'>Sort by: </label>
                <select 
                    id='sort-cities'
                    value={sortBy}
                    onChange={updateSortBy}
                >
                    <option value='population'>population</option>
                    <option value='name'>city</option>
                    <option value='country'>country</option>
                </select>
            </form>
            <div id='city-container'>
                {cities.sort((a, b) => sortFn(a, b)).filter(city => filterFn(city)).map(city => (
                    <City key={city.id} city={city} onUpdateCities={onUpdateCities} />
                ))}
            </div>
        </div>
    )
}

export default CityList;
