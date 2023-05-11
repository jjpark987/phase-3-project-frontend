import React, { useState } from "react";
import City from "./City";

function CityList({ cities }) {
    const [sortBy, setSortBy] = useState('population')
    const [searchCity, setSearchCity] = useState('')

    const sortFn = (a, b) => sortBy === 'population' ? b[sortBy] - a[sortBy] : a[sortBy].localeCompare(b[sortBy])
    const filterFn = city => city.name.toLowerCase().includes(searchCity.toLowerCase())

    function updateSortBy(e) {
        setSortBy(e.target.value)
    }

    function updateSearchCity(e) {
        setSearchCity(e.target.value)
    }

    return (
        <div id='city-list'>
            <div id='sort-search-cities'>
                <label htmlFor='sort-cities'>Sort by: </label>
                <select 
                    id='sort-cities'
                    value={sortBy}
                    onChange={updateSortBy}
                >
                    <option value='population'>Population</option>
                    <option value='name'>City</option>
                    <option value='country'>Country</option>
                </select>
                <form id='search-city-form'>
                    <label htmlFor='search-city'>Search city: </label>
                    <input 
                        id='search-city' 
                        placeholder='ex. New York'
                        value={searchCity}
                        onChange={updateSearchCity}
                    />
                </form>
            </div>
            <div id='city-container'>
                {cities.sort((a, b) => sortFn(a, b)).filter(city => filterFn(city)).map(city => (
                    <City key={city.id} city={city} />
                ))}
            </div>
        </div>
    )
}

export default CityList;
