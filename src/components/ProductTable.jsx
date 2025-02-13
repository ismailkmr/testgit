import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);const itemsPerPage = 4;
  const [totalPages, setTotalPages] = useState(Math.ceil(products.length / itemsPerPage));
  
  var totalPages2 = Math.ceil(products.length / itemsPerPage);
  const [category, setCategory] = useState("");
  useEffect(() => {
    // totalPages=
    setTotalPages(3)
    setProducts((prevProducts) => [...prevProducts, products]);
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
    console.log(products)
  }, []);

  const deleteProduct = (id) => {
    fetch(`http://localhost:5001/products/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((err) => console.error("Error deleting product:", err));
  };
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
  })

  const filteredProducts = products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&  // ✅ Use optional chaining (?.)
      (category === "" || product.category === category)
    );    
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="container text-center mt-5 ml-5">
      <h2>Welcome to the Dashboard!</h2>
      <Link to="/" className="btn btn-danger mt-3">Logout</Link>
      <div className="container mt-4">
        <h2 className="text-center"><h5>Product List</h5></h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
        </select>
       

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th onClick={() => handleSort("name")}>Name</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td><img src={product.image} width="100px"></img></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.stock ? "In Stock" : "Out of Stock"}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "10px" }}>
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      </div>    
      </div>
  );
};

export default ProductTable;
