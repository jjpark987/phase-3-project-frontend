import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ randomId, onUpdateRandomId }) {
    return (
        <nav>
            <NavLink to='/' activeclassname='active'>Home</NavLink>
            <NavLink to='/cities' activeclassname='active'>City List</NavLink>
            <NavLink to={`/cities/${randomId}/posts`} activeclassname='active' onClick={onUpdateRandomId}>Random City</NavLink>
        </nav>
    )
}

export default NavBar;
