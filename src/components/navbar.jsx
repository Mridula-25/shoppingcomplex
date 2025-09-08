import React, { useState } from 'react';
import styles from './navbar.module.css';

const Navbar = ({ searchItem, filterItem }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        searchItem(query);
        setQuery("");
    };
    return (
        <nav className={styles["navbar"]}>
            <div className={styles["search-container"]}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles["search-input"]}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button className={styles["search-btn"]} onClick={handleSearch} >
                    <svg focusable="false" className={styles['svg-search']} xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path></svg>
                </button>
            </div>
            <div className={styles["btn-group"]}>
                <button className={styles["btn-group__item"]} onClick={() => filterItem("all")}>All</button>
                <button className={styles["btn-group__item"]} onClick={() => filterItem("men's clothing")}>men's clothing</button>
                <button className={styles["btn-group__item"]} onClick={() => filterItem("jewelery")}>jewelery</button>
                <button className={styles["btn-group__item"]} onClick={() => filterItem("electronics")}>electronics</button>
                <button className={styles["btn-group__item"]} onClick={() => filterItem("women's clothing")}>women's clothing</button>
            </div>
        </nav>
    );
};

export default Navbar;