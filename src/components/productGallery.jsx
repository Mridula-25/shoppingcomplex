import React from 'react'
import "./productGallery.css";
import ProductView from './productView';
import Loader from './loader';

const ProductGallery = ({ products, onDelete }) => {
    console.log(products)
    return (
        <>
            <section className='main-card--container'>{
                products.map((curElem) => {
                    return (
                        <ProductView product={curElem} onDelete={onDelete} />
                    );
                })}
            </section>
        </>
    );
};

export default ProductGallery;