import { Link } from "react-router-dom";
import React, { useState } from "react";
import './../App.css'
import AddProductModal from "./AddProductModal";
import ProductTable from "./ProductTable";
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSaveProduct = (newProduct) => {
    console.log("New Product Data:", newProduct);
    // You can send this data to your backend or update the UI
  };

  return (
    <div className="container text-center mt-5">
     <div className="sideBar sidebar">
     <ul>
            <li><a href="#home">🏠 Home</a></li>
            <li><a href="#about">📖 About</a></li>
            <li><a href="#" onClick={() => setShowModal(true)}>💼 Add Product</a></li>
            <li><a href="#contact">📞 Contact</a></li>
        </ul>
            </div>
      <Link to="/" className="btn btn-danger mt-3">Logout</Link>
      <AddProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveProduct}
      />
      <ProductTable></ProductTable>
    </div>
  );
};

export default Dashboard;
