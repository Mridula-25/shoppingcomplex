import axios from "axios";

const product_api = axios.create({
    baseURL : "https://fakestoreapi.com",
})

// add new product
export const addNewProduct = (product) => {
    return product_api.post("/products", product);
}

// get all products
export const getAllProducts = () => {
    return product_api.get("/products");
}

// update selected product details
export const updateProduct = (product) => {
    return product_api.put(`/products/${product.id}`, product);
}

// delete selected product
export const deleteProduct = (id) => {
    return product_api.delete(`/products/${id}`);
}