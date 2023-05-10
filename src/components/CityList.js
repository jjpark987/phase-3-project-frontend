import React, { useEffect, useState } from "react";
import City from "./City";

function CityList({ onSelectCity }) {
    const [cities, setCities] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/cities")
        .then(r => r.json())
        .then(d => setCities(d))
    }, [])

    return (
        <div id='city-list'>
            <h1>CityList</h1>
            {cities.map(city => (
                <City 
                    key={city.id} 
                    city={city}
                    onSelectCity={onSelectCity}
                />
            ))}
        </div>
    )
}

export default CityList;
