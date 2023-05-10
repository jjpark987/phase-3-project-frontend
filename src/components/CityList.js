import React, { useEffect, useState } from "react";
import City from "./City";

function CityList() {
    const [cities, setCities] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/cities")
        .then(r => r.json())
        .then(d => setCities(d))
        .catch(e => console.log(e))
    }, [])

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
