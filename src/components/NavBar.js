import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ randomId, onUpdateRandomId }) {
    return (
        <nav>
            <NavLink 
                id='home-nav'
                to='/' 
                style={{ textDecoration: 'none' }}
            >
                Home
            </NavLink>
            <NavLink 
                id='city-list-nav'
                to='/cities' 
                style={{ textDecoration: 'none' }}
            >
                City List
            </NavLink>
            <NavLink 
                id='random-city-nav'
                to={`/cities/${randomId}/posts`} 
                className='random-city'
                style={{ textDecoration: 'none' }} 
                onClick={onUpdateRandomId}
            >
                Random City
            </NavLink>
        </nav>
    )
}

export default NavBar;
