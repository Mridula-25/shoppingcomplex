import React from 'react'

const menuCard = ({menuData}) => {
    // console.log(menuData);
  return (
    <>
       <section className='main-card--container'>
         {menuData.map((curElem) =>{
            return(
            <div className="card-container" key={curElem.id}> 
             <div className="card">
             <div className="card-body">
              <span className="card-number card-circle subtle">{curElem.id}</span>
              <span className="card-author subtle">{curElem.name}</span> 
              <h2 className="card-title">{curElem.name}</h2>
              
              
              <div className="card-description subtle">{curElem.description}</div>
              <div className="card-read">Read</div>
            </div>

            
                 <div className="card-rating">
                      <div className="card-price">₹{curElem.price}</div>
                      <div className='card-rating'>⭐{curElem.rating.rate}</div>
                      <div className="subtle" >{curElem.rating.count}</div>
                      </div>
                

                     <img src={curElem.image} alt="images" className="card-media" />

                     <div className="btn">
                      <button>Edit</button>
                      <button>Delete</button>
                     </div>

                    <span className="card-tag subtle">Order Now</span>
                </div>
           </div>
           );
         })}
         </section>
    </>
  );
  };



export default menuCard;