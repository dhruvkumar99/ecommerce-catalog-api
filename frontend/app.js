const API_URL = 'http://localhost:8080/api';
let token = localStorage.getItem('token');
let currentUser = localStorage.getItem('username');

// Check authentication on load
if (token) {
    document.getElementById('authLinks').style.display = 'none';
    document.getElementById('userInfo').style.display = 'inline-block';
    document.getElementById('username').textContent = currentUser || 'User';
}

// Navigation
function showHome() {
    hideAllPages();
    document.getElementById('homePage').classList.add('active');
}

function showProducts() {
    hideAllPages();
    document.getElementById('productsPage').classList.add('active');
    loadProducts();
}

function showCategories() {
    hideAllPages();
    document.getElementById('categoriesPage').classList.add('active');
    loadCategories();
}

function showLogin() {
    hideAllPages();
    document.getElementById('loginPage').classList.add('active');
}

function showRegister() {
    hideAllPages();
    document.getElementById('registerPage').classList.add('active');
}

function showCategoryDetail(categoryId, categoryName) {
    hideAllPages();
    document.getElementById('categoryDetailPage').classList.add('active');
    document.getElementById('categoryName').textContent = categoryName;
    loadCategoryProducts(categoryId);
}

function showProductDetail(productId) {
    hideAllPages();
    document.getElementById('productDetailPage').classList.add('active');
    loadProductDetail(productId);
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

// API Calls
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        displayProducts(products.content || products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function loadCategoryProducts(categoryId) {
    try {
        const response = await fetch(`${API_URL}/products/category/${categoryId}`);
        const products = await response.json();
        displayProducts(products.content || products, 'categoryProducts');
    } catch (error) {
        console.error('Error loading category products:', error);
    }
}

async function loadProductDetail(productId) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        const product = await response.json();
        displayProductDetail(product);
    } catch (error) {
        console.error('Error loading product detail:', error);
    }
}

async function searchProducts() {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        loadProducts();
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/products/search?q=${query}`);
        const products = await response.json();
        displayProducts(products.content || products);
    } catch (error) {
        console.error('Error searching products:', error);
    }
}

// Display Functions
function displayProducts(products, containerId = 'productsContainer') {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (!products || products.length === 0) {
        container.innerHTML = '<p>No products found</p>';
        return;
    }
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => showProductDetail(product.id);
        
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description.substring(0, 50)}${product.description.length > 50 ? '...' : ''}</p>
            <div class="price">$${product.price}</div>
            <div class="stock">In Stock: ${product.stockQuantity}</div>
        `;
        
        container.appendChild(card);
    });
}

function displayCategories(categories) {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';
    
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => showCategoryDetail(category.id, category.name);
        
        card.innerHTML = `
            <h3>${category.name}</h3>
            <p>${category.description || 'No description'}</p>
        `;
        
        container.appendChild(card);
    });
}

function displayProductDetail(product) {
    const container = document.getElementById('productDetail');
    container.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
        <div class="stock">In Stock: ${product.stockQuantity}</div>
        <p><strong>Category:</strong> ${product.category ? product.category.name : 'N/A'}</p>
        <p><strong>Added:</strong> ${new Date(product.createdAt).toLocaleDateString()}</p>
    `;
}

// Authentication
async function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            token = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            
            document.getElementById('authLinks').style.display = 'none';
            document.getElementById('userInfo').style.display = 'inline-block';
            document.getElementById('username').textContent = username;
            
            showHome();
        } else {
            document.getElementById('loginError').textContent = data.message || 'Login failed';
        }
    } catch (error) {
        document.getElementById('loginError').textContent = 'Error connecting to server';
    }
}

async function register(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const fullName = document.getElementById('regFullName').value;
    const password = document.getElementById('regPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, fullName, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful! Please login.');
            showLogin();
        } else {
            document.getElementById('registerError').textContent = data.message || 'Registration failed';
        }
    } catch (error) {
        document.getElementById('registerError').textContent = 'Error connecting to server';
    }
}

function logout() {
    token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    document.getElementById('authLinks').style.display = 'inline-block';
    document.getElementById('userInfo').style.display = 'none';
    
    showHome();
}

// Initialize
showHome();