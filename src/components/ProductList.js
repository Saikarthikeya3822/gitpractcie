import React from "react";

const ProductList = ({ products, loading, error }) => {
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