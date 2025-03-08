import axios from "axios";
const UPDATE_URL = "http://localhost:8080/updateproductbyid";
const DELETE_BY_ID_URL = "http://localhost:8080/deleteproductbyid";
export const getProducts = async () => {
    const response = await fetch("http://localhost:8080/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }
    return response.json();
  };
  
  export const saveProduct = async (product) => {
    const response = await fetch("http://localhost:8080/addproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to save product.");
    }
  };
  
  export const deleteAllProducts = async () => {
    const response = await fetch("http://localhost:8080/deleteallproducts", {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete all products.");
    }
  };
  // Function to delete a product by ID
  export const handleDelete = async (id, setProducts) => {
    try {
      await axios.delete(`${DELETE_BY_ID_URL}/${id}`);
      alert("Product deleted successfully!");
      setProducts((prevProducts) => prevProducts.filter((product) => product.prodId !== id));
    } catch (error) {
      //console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Function to update a product by ID
export const handleUpdate = async (id, setProducts) => {
  const updatedName = prompt("Enter new product name:");
  if (!updatedName) return;

  try {
    const response = await axios.put(`${UPDATE_URL}/${id}`, { prodName: updatedName });
    alert("Product updated successfully!");
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.prodId === id ? { ...product, prodName: updatedName } : product
      )
    );
  } catch (error) {
    //console.error("Error updating product:", error);
    alert("Failed to update product.");
  }
};