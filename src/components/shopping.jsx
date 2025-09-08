import React, { useState, useEffect } from "react";
import ProductGallery from "./productGallery";
import Navbar from "./navbar";
import { getAllProducts, deleteProduct, updateProduct, addNewProduct } from "../Api";
import ProductForm from "./productForm"
import styles from "./shopping.module.css";

const Shopping = () => {

  const [filtered_products, setFilteredProducts] = useState([]);
  const [all_products, setAllProducts] = useState([]);
  const [product_update, setProductUpdate] = useState();
  const [category, setCategory] = useState("all");

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
  const filterItem = async (category, products = all_products) => {
    console.log(category);
    setCategory(category);
    if (category === "all") {
      setFilteredProducts(products); //reset to all API data
    } else {
      const updatedList = products.filter((curElem) => {
        return curElem.category === category;
      });
      setFilteredProducts(updatedList);
    }
  };

  // search item 
  const searchItem = (query) => {
    const updatedList = all_products.filter((curElem) => {
      return curElem.title.toLowerCase().includes(query) || 
        curElem.description.toLowerCase().includes(query) ||
        curElem.category.toLowerCase().includes(query);
    });
    setFilteredProducts(updatedList);
  }

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

  const handleOnSave = async (product) => {
    if (product_update) {
      try {
        const res = await updateProduct(product);
        console.log(res);
        if (res.status === 200) {
          const updated_all_products = all_products.map((p) => {
            if (p.id === product.id) {
              return {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image instanceof File ? URL.createObjectURL(product.image) : product.image,
                rating: product.rating
              };
            } else {
              return p;
            }
          })
          console.log(updated_all_products);
          setAllProducts(() => {
            return updated_all_products;
          });
          filterItem(category, updated_all_products);
        }

      } catch (error) {

      }
    } else {
      try {
        const res = await addNewProduct(product);
        if (res.status === 201) {
          const new_product = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: URL.createObjectURL(product.image),
            rating: product.rating,
          }
          const updated_all_products = [...all_products, new_product];
          setAllProducts(() => {
            return updated_all_products;
          });
          filterItem(category, updated_all_products);
        }
      } catch (error) {

      }

    }
    // setShowAddForm(false);
  }

  const handleOnCancel = () => {
    setProductUpdate(null);
    setShowAddForm(false);
  }

  const handleOnUpdate = (product) => {
    setProductUpdate(product);
    setShowAddForm(true);
  }

  return (
    <>
      <Navbar searchItem={searchItem} filterItem={filterItem} />
      {show_add_form && (
        <ProductForm product={product_update} onSave={handleOnSave} onCancel={handleOnCancel} />
      )}
      <ProductGallery products={filtered_products} onUpdate={handleOnUpdate} onDelete={handleDeleteProduct} />
      <button className={styles["add-btn"]} onClick={handleAddProduct}>
        +
      </button>
    </>
  );
};

export default Shopping;