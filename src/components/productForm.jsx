import React, { useState, useEffect } from "react";
import styles from "./productForm.module.css";
import Loader from "./loader";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState({ rate: "", count: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setRating({
        rate: product.rating?.rate || "",
        count: product.rating?.count || "",
      });
      if (product.image) setPreview(product.image);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      id: product?.id || Date.now(),
      title,
      price,
      description,
      category,
      image: image || product?.image || null,
      rating,
    };
    setLoading(true);
    await onSave(newProduct);
    setLoading(false);
    onCancel();
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-card"]}>
        {loading && (<Loader/>)}
        <form onSubmit={handleSubmit} className={styles["product-form"]}>
          <h2 className={styles["card-title"]}>{product ? "Edit Product" : "Add Product"}</h2>

          <input
            type="text"
            placeholder="Product Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles["form-select"]}
            required>
            <option value="">Select Category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>

          <div className={styles["rating-inputs"]}>
            <input
              type="number"
              placeholder="Rating (0-5)"
              value={rating.rate}
              onChange={(e) => setRating({ ...rating, rate: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Review Count"
              value={rating.count}
              onChange={(e) => setRating({ ...rating, count: e.target.value })}
              required
            />
          </div>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && <img src={preview} alt="Preview" className={styles["preview-image"]} />}

          <div className={styles["card-actions"]}>
            <button type="submit" className={`${styles["btn"]} ${styles["btn-blue"]}`} onClick={handleSubmit}>
              {product ? "Update" : "Add"}
            </button>
            <button type="button" className={`${styles["btn"]} ${styles["btn-red"]}`} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
