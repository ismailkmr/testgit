
import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import './../App.css'

const AddProductModal = ({ show, handleClose, handleSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSaveProduct = (newProduct) => {
    fetch("http://localhost:5001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((savedProduct) => {
        setProducts([...products, savedProduct]); // Update state
      })
      .catch((err) => console.error("Error saving product:", err));
      console.log(newProduct)
  };

  const onSubmit = (data) => {
    console.log(data)
    handleSave(data); // Pass the form data to the parent component
    reset(); // Reset form after submission
    handleClose(); // Close modal after submission
    handleSaveProduct(data)
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
        {show && <div className="modal-backdrop"></div>}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Product</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Product Name */}
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  {...register("name", { required: "Product Name is required" })}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least $1" },
                  })}
                />
                {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className={`form-select ${errors.category ? "is-invalid" : ""}`}
                  {...register("category", { required: "Category is required" })}
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
              </div>

              {/* Stock Quantity */}
              <div className="mb-3">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                  {...register("stock", {
                    required: "Stock Quantity is required",
                    min: { value: 0, message: "Stock cannot be negative" },
                  })}
                />
                {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
              </div>

              {/* Buttons */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
