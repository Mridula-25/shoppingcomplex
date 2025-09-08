import React from 'react'
import styles from "./productGallery.module.css";
import ProductView from './productView';

const ProductGallery = ({ products, onUpdate, onDelete }) => {
    return (
        <>
            <section className={styles["main-card--container"]}>{
                products.map((curElem) => {
                    return (
                        <ProductView product={curElem} onUpdate={onUpdate} onDelete={onDelete} />
                    );
                })}
            </section>
        </>
    );
};

export default ProductGallery;