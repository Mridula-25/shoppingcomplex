import React, { useState } from 'react'
import Loader from './loader';
import styles from "./productView.module.css";

const ProductView = ({ product, onUpdate, onDelete }) => {

  const [loading, setLoading] = useState(false);
  const handleOnDelete = async (id) => {
    setLoading(true);
    await onDelete(id);
    setLoading(false);
  }

  return (
    <div className={styles["card-container"]} key={product.id}>
      <div className={styles["card"]}>
        {loading && (
          <Loader />
        )}

        <div className={styles["card-body"]}>
          <h2 className={styles["card-title"]}>{product.title}</h2>
          <div className={`${styles["card-description"]} ${styles["subtle"]}`}>{product.description}</div>
          <div className={styles["card-read"]}>more</div>
        </div>


        <div className={styles["card-rating"]}>
          <div className={styles["card-price"]}>₹{product.price}</div>
          <div className={styles["card-rating"]}>⭐{product.rating.rate}</div>
          <div className={styles["subtle"]} >{product.rating.count}</div>
        </div>

        {console.log(product.image)}
        <img src={product.image} alt="images" className={styles["card-media"]} />

        <div className={styles["card-actions"]}>
          <button onClick={() => onUpdate(product)}>Edit</button>
          <button onClick={() => handleOnDelete(product.id)}>Delete</button>
          <button className={styles["order-btn"]}>Order Now</button>
        </div>


      </div>
    </div>
  );
};

export default ProductView;