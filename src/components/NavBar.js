import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar({ cities }) {
    const [randomId, setRandomId] = useState(Math.ceil(Math.random() * 10))

    function randomCityId() {
        const random_id = Math.ceil(Math.random() * cities.length)
        setRandomId(() => random_id)
    }

    return (
        <nav>
            <NavLink to='/' activeclassname='active'>Home</NavLink>
            <NavLink to='/cities' activeclassname='active'>City List</NavLink>
            <NavLink to={`/cities/${randomId}`} activeclassname='active' onClick={randomCityId}>Random City</NavLink>
        </nav>
    )
}

export default NavBar;
