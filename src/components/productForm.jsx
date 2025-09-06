import React, { useState, useEffect } from "react";
import './productForm.css';

const ProductForm = ({ product, onSave, onCancel }) => {
    // Initialize form state (use product if editing)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState({ rate: "", count: "" });
    const [image, setImage] = useState("");

    // Populate form if editing
    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || "");
            setRating({
                rate: product.rating?.rate || "",
                count: product.rating?.count || "",
            });
            setImage(product.image || "");
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare product object
        const newProduct = {
            id: product?.id || Date.now(),
            name,
            description,
            price,
            rating: {
                rate: rating.rate,
                count: rating.count,
            },
            image,
        };
        onSave(newProduct); // call parent save function
        // Reset form (optional)
        setName("");
        setDescription("");
        setPrice("");
        setRating({ rate: "", count: "" });
        setImage("");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="product-form">
                <h2>{product ? "Edit Product" : "Add Product"}</h2>

                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <label>Rating:</label>
                <div className="rating-inputs">
                    <input
                        type="number"
                        placeholder="Rate"
                        value={rating.rate}
                        onChange={(e) => setRating({ ...rating, rate: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Count"
                        value={rating.count}
                        onChange={(e) => setRating({ ...rating, count: e.target.value })}
                        required
                    />
                </div>


                <label>Image URL:</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />

                <div className="form-buttons">
                    <button type="submit">{product ? "Update" : "Add"}</button>
                    {onCancel && (
                        <button type="button" onClick={onCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
