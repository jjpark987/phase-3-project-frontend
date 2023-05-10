import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink to='/' activeclassname='active'>Home</NavLink>
            <NavLink to='/cities' activeclassname='active'>CityList</NavLink>
        </nav>
    )
}

export default NavBar;
