# E-Commerce Product Catalog API

A full-stack e-commerce application built with Spring Boot, JWT authentication, and MySQL.

## 🚀 Features

- **User Authentication**: Register/Login with JWT tokens
- **Product Catalog**: Browse products with 7 sample items
- **Categories**: Electronics, Books, Clothing (3 categories)
- **Search**: Search products by name or description
- **Frontend**: Simple UI to demonstrate API functionality

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Security, JWT, JPA/Hibernate
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Tools**: Maven, Git, Postman

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/search?q={query}` | Search products |
| GET | `/api/categories` | Get all categories |

## 🏃 How to Run

### Prerequisites
- Java 17
- MySQL (password: chill)
- Maven

### Setup
1. Clone the repository
2. Create MySQL database: `ecomdb`
3. Update `application.properties` with your MySQL credentials
4. Run: `mvn spring-boot:run`
5. Open frontend: `frontend/index.html` in browser

## 📸 Sample Data

- **Categories**: Electronics, Books, Clothing
- **Products**: 7 products including laptops, phones, books, clothing

## 📝 License

MIT
