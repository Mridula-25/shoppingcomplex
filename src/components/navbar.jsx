import React from 'react';
import './navbar.css';

const Navbar = ({ filterItem }) => {
    return (
        <nav className="navbar">
            <div className="btn-group">
                <button className="btn-group__item" onClick={() => filterItem("all")}>All</button>
                <button className="btn-group__item" onClick={() => filterItem("men's clothing")}>men's clothing</button>
                <button className="btn-group__item" onClick={() => filterItem("jewelery")}>jewelery</button>
                <button className="btn-group__item" onClick={() => filterItem("electronics")}>electronics</button>
                <button className="btn-group__item" onClick={() => filterItem("women's clothing")}>women's clothing</button>
            </div>
        </nav>
    );
};

export default Navbar;