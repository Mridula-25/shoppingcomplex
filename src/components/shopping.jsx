import React, { useState, useEffect } from "react";
import ProductGallery from "./productGallery";
import Navbar from "./navbar";
import { getAllProducts, deleteProduct } from "../Api";
import ProductForm from "./productForm"

const Shopping = () => {

  const [filtered_products, setFilteredProducts] = useState([]);
  const [all_products, setAllProducts] = useState([]);

  const [show_add_form, setShowAddForm] = useState(false);

  const fetchProducts = async () => {
    const products = await getAllProducts();
    setFilteredProducts(products.data);
    setAllProducts(products.data);
  }


  useEffect(() => {
    fetchProducts();
  }, []); //means run only once(when page loads)

  // filter products based on category
  const filterItem = async (category) => {
    const products = await getAllProducts();
    if (category === "all") {
      setFilteredProducts(products.data); //reset to all API data
    } else {
      const updatedList = products.data.filter((curElem) => {
        return curElem.category === category;
      });
      setFilteredProducts(updatedList);
    }
  };

  // delete product
  const handleDeleteProduct = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {

        const updated_all_products = all_products.filter((curElem) => {
          return curElem.id !== id;
        });
        setAllProducts(updated_all_products);
        const updated_filtered_products = filtered_products.filter((curElem) => {
          return curElem.id !== id;
        });
        setFilteredProducts(updated_filtered_products);
      }

    } catch (error) {
      console.log(error);
    }
    return true;
  }


  // add product
  const handleAddProduct = () => {
    setShowAddForm(true);
  }

  const handleOnSave = () => {
    setShowAddForm(false);
  }

  const handleOnCancel = () => {
    setShowAddForm(false);
  }

  return (
    <>
      <Navbar filterItem={filterItem} />
      {show_add_form && (
        <div className="modal">
          <ProductForm onSave={handleOnSave} onCancel={handleOnCancel} />
        </div>
      )}
      <ProductGallery products={filtered_products} onDelete={handleDeleteProduct} />
      <button className="add-btn" onClick={handleAddProduct}>
        +
      </button>
    </>
  );
};

export default Shopping;