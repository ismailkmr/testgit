import React, { useState } from "react";
import AddProductModal from "./AddProductModal";

const ProductPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  const handleSaveProduct = (newProduct) => {
    console.log("New Product Data:", newProduct);
    // You can send this data to your backend or update the UI

  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Add New Product
      </button>

      <AddProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveProduct}
      />
    </div>
  );
};

export default ProductPage;
