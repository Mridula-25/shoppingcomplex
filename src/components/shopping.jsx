import React, {useState} from "react";
import "./style.css";
import Menu from "./menuApi";
import MenuCard from "./menuCard";
 
const Shopping = () => {
  const [menuData, setMenuData] = useState(Menu);

    const filterItem = (category) => {
      if (category === "all") {
        setMenuData(Menu);
      } else {
        const updatedList = Menu.filter((curElem) => {
          return curElem.category === category; 
        });
        setMenuData(updatedList);
      }
    };
    return (
        <>
        <nav className="navbar">
          <div className="btn-group">
            <button  className="btn-group__item" onClick={() => filterItem("all")}>All</button>
             <button  className="btn-group__item" onClick={() => filterItem("men's clothing")}>men's clothing</button>
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