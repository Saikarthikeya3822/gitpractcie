package com.example.ecommerce;

import com.example.ecommerce.model.Product;
//import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

//import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
}
