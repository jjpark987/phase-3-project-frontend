import React, { useState } from "react";
import City from "./City";
import { useNavigate } from "react-router-dom";

function CityList({ allCities }) {
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
        <div id='city-list' className='component'>
            <button className='add-btn' onClick={() => navigate('/cities/new')}>Add City</button>
            <form>
                <label htmlFor='search-city' className='form-label'>Search city: </label>
                <input 
                    id='search-city' 
                    placeholder='ex. New York'
                    value={searchCity}
                    onChange={updateSearchCity}
                />
                <label htmlFor='sort-cities' className='form-label'>Sort by: </label>
                <select 
                    id='sort-cities'
                    value={sortBy}
                    onChange={updateSortBy}
                >
                    <option value='population'>Population</option>
                    <option value='name'>City (A-Z)</option>
                    <option value='country'>Country (A-Z)</option>
                </select>
            </form>
            <div className='container'>
                {allCities
                    .sort((a, b) => sortFn(a, b))
                    .filter(city => filterFn(city))
                    .map(city => (
                        <City key={city.id} city={city} />
                ))}
            </div>
        </div>
    )
}

export default CityList;
