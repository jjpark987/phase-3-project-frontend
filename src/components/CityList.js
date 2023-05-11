import React from "react";
import City from "./City";

function CityList({ cities }) {
    return (
        <div id='city-list'>
            <h1>CityList</h1>
            {cities.map(city => (
                <City key={city.id} city={city} />
            ))}
        </div>
    )
}

export default CityList;
