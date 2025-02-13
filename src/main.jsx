import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // Create this later
import ProductTable from "./components/ProductTable";
import ProductPage from "./components/ProductPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/addnew" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
