package com.ecommerce.catalog_api.controller;

import com.ecommerce.catalog_api.model.Category;
import com.ecommerce.catalog_api.model.Product;
import com.ecommerce.catalog_api.repository.CategoryRepository;
import com.ecommerce.catalog_api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        
        // Check if data already exists
        if (categoryRepository.count() == 0) {
            System.out.println("=================================");
            System.out.println("LOADING SAMPLE DATA...");
            System.out.println("=================================");
            
            // Create Electronics category
            Category electronics = new Category("Electronics", "Electronic devices and gadgets");
            categoryRepository.save(electronics);
            
            // Create Books category
            Category books = new Category("Books", "All kinds of books");
            categoryRepository.save(books);
            
            // Create Clothing category
            Category clothing = new Category("Clothing", "Fashion and apparel");
            categoryRepository.save(clothing);
            
            // Create products for Electronics
            Product laptop = new Product("Gaming Laptop", 
                "High performance gaming laptop with RTX 3060 graphics, 16GB RAM, 512GB SSD", 
                new BigDecimal("999.99"), 10);
            laptop.setCategory(electronics);
            productRepository.save(laptop);
            
            Product phone = new Product("Smartphone Pro", 
                "Latest model with 5G, 128GB storage, amazing camera", 
                new BigDecimal("699.99"), 20);
            phone.setCategory(electronics);
            productRepository.save(phone);
            
            Product headphones = new Product("Wireless Headphones", 
                "Noise cancelling bluetooth headphones, 30hr battery life", 
                new BigDecimal("199.99"), 15);
            headphones.setCategory(electronics);
            productRepository.save(headphones);
            
            // Create products for Books
            Product book1 = new Product("Spring Boot in Action", 
                "Learn Spring Boot from scratch with practical examples", 
                new BigDecimal("39.99"), 50);
            book1.setCategory(books);
            productRepository.save(book1);
            
            Product book2 = new Product("Java Programming", 
                "Complete guide to Java programming for beginners", 
                new BigDecimal("29.99"), 30);
            book2.setCategory(books);
            productRepository.save(book2);
            
            // Create products for Clothing
            Product shirt = new Product("Casual T-Shirt", 
                "100% cotton, comfortable fit, available in multiple colors", 
                new BigDecimal("19.99"), 100);
            shirt.setCategory(clothing);
            productRepository.save(shirt);
            
            Product jeans = new Product("Denim Jeans", 
                "Classic blue denim, slim fit, durable material", 
                new BigDecimal("49.99"), 60);
            jeans.setCategory(clothing);
            productRepository.save(jeans);
            
            System.out.println("=================================");
            System.out.println("✅ SAMPLE DATA LOADED SUCCESSFULLY!");
            System.out.println("=================================");
            System.out.println("Categories: Electronics, Books, Clothing");
            System.out.println("Products: 6 products added");
            System.out.println("=================================");
        } else {
            System.out.println("📦 Data already exists, skipping sample data loading");
        }
    }
}