package com.example.ecommerce.controller;
import java.io.IOException;


import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.service.ProductService;


@CrossOrigin(origins = "*")
@RestController
public class ProdcutController {
	    @Autowired
	    ProductService service;
	    @GetMapping("/products")
	    public List<Product> getproducts() {
	        return service.getProducts();
	    }

	    @PostMapping(value = "/addproduct", consumes = "multipart/form-data")
	    public ResponseEntity<?> addProduct( @RequestPart  Product product, 
	    		@RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
	        try {
	        	if (imageFile == null) {
	                return new ResponseEntity<>("No image file received", HttpStatus.BAD_REQUEST);
	            }
	            Product savedProduct = service.addProduct(product, imageFile);
	            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    @GetMapping("/products/{id}")
	    public Optional<Product> getproducts(@PathVariable int id) {
	        return service.getProductById(id);
	    }
	    @DeleteMapping("/deleteallproducts")
	    public ResponseEntity<String> deleteAllProducts() {
	        service.deleteAllProducts();
	        return ResponseEntity.ok("All products deleted successfully.");
	    }
	    @PutMapping("/updateproductbyid/{id}")
	    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart Product product,  @RequestPart(value = "imageFile", required = false) MultipartFile image) {

	        Product product1 = null;
	        try {
	            product1 = service.updateProduct(id, product, image);
	        } catch (IOException e) {
	            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
	        }
	        if (product1 != null) {
	            return new ResponseEntity<>("updated", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
	        }


	    }

	    @DeleteMapping("/deleteproductbyid/{id}")
	    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
	        service.deleteProduct(id);
	        return ResponseEntity.ok("Product deleted successfully");
	    }
	    @GetMapping("/products/search")
	    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
	        List<Product> products = service.searchProducts(keyword);
	        System.out.println("searching with " + keyword);
	        return new ResponseEntity<>(products, HttpStatus.OK);
	    }

}
