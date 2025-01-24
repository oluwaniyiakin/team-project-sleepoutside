// Import the product data (tents.json) and the ProductData class
import productData from './data/tents.json';  // Importing the JSON data
import ProductData from './ProductData.mjs';  // Assuming the ProductData class is in ProductData.mjs

// Create an instance of the ProductData class with the imported JSON data
const productInstance = new ProductData(productData);

// Use the ProductData instance to get all product details
const products = productInstance.getAllProducts();

// Example: Render product details or log them to the console
console.log(products);  // Logs all the products from the imported data

// Optionally, you can display the product details in the DOM
function displayProducts(products) {
    const productContainer = document.getElementById('product-list'); // Assuming you have an HTML element with this id
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;
        productContainer.appendChild(productElement);
    });
}

// Call the function to display the products on the webpage
displayProducts(products);
// main.js

import ProductListing from './ProductList.mjs'; // Import the ProductListing class

// Select the element where the products will be displayed
const listElement = document.querySelector('#product-list');

// Create a new ProductListing instance and initialize it
const productList = new ProductListing('Tents', './data/tents.json', listElement);
productList.init();
import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();
