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