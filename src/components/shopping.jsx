import React, {useState, useEffect} from "react";
import "./style.css";
import MenuCard from "./menuCard";
import axios from "axios";



 
const Shopping = () => {
  const [menuData, setMenuData] = useState([]);
  const [wholeData, setWholeData] =useState([]);

  useEffect (() => {
  axios
  .get('https://fakestoreapi.com/products')
  .then(response => {
    // if (wholeData.length === 0) {
      setMenuData(response.data); //load data
    // }
      setWholeData(response.data); // keep a copy for filtering
  
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    setWholeData([]); // safe fallback
    } );
  }, [] ); //means run only once(when page loads)

    const filterItem = (category) => {
      if (category === "all") {
        setMenuData(wholeData); //reset to all API data
        } else {
        const updatedList = wholeData.filter((curElem) => {
          return curElem.category === category; 
        });
        setMenuData(updatedList);
      }
    };
        return (
          <>
            <nav className="navbar">
                <div className="btn-group">
                   <button  className="btn-group__item" onClick={ () => filterItem("all")}>All</button>
                   <button  className="btn-group__item" onClick={ () => filterItem("men's clothing")}>men's clothing</button>
                   <button  className="btn-group__item" onClick={ () => filterItem("jewelery")}>jewelery</button>
                   <button  className="btn-group__item" onClick={ () => filterItem("electronics")}>electronics</button>
                   <button  className="btn-group__item" onClick={ () => filterItem("women's clothing")}>women's clothing</button>
                </div>
            </nav>
        <MenuCard  menuData={menuData}/>
          </>
            );
};

export default Shopping;