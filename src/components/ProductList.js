import React, { useState, useEffect } from "react";
//import { handleDelete, handleUpdate } from "./productService"; // Import functions
import { handleDelete,handleUpdate } from "../service/productService";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/products") // Fetch products
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h3 className="text-center mb-4">Product List</h3>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product.prodId} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.prodName}</h5>
                  <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                  <p className="card-text text-muted">
                    Created: {new Date(product.creationDate).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {product.isActive ? "Active" : "Inactive"}
                  </p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleUpdate(product.prodId, setProducts)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.prodId, setProducts)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No products available</p>
      )}
    </div>
  );
};
export default ProductList;
