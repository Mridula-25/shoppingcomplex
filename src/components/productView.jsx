import React, { useState } from 'react'
import { deleteProduct } from '../Api';
import Loader from './loader';

const ProductView = ({ product, onDelete }) => {

  const [loading, setLoading] = useState(false);
  const handleOnDelete = async (id) => {
    setLoading(true);
    const res = await onDelete(id);
    setLoading(false);
  }


  return (
    <div className="card-container" key={product.id}>
      <div className="card">
        {loading && (
          <Loader />
        )}

        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <div className="card-description subtle">{product.description}</div>
          <div className="card-read">more</div>
        </div>


        <div className="card-rating">
          <div className="card-price">₹{product.price}</div>
          <div className='card-rating'>⭐{product.rating.rate}</div>
          <div className="subtle" >{product.rating.count}</div>
        </div>


        <img src={product.image} alt="images" className="card-media" />

        <div className="card-actions">
          <button>Edit</button>
          <button onClick={() => handleOnDelete(product.id)}>Delete</button>
          <button className="order-btn">Order Now</button>
        </div>


      </div>
    </div>
  );
};

export default ProductView;