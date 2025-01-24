import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { setLocalStorage, getParams } from './utils.mjs';

// Get the product ID from the URL
const productId = getParams('product');

// Initialize the data source for the "tents" category
const dataSource = new ProductData('tents');

// Create an instance of ProductDetails, passing the productId and dataSource
const product = new ProductDetails(productId, dataSource);

// Initialize the ProductDetails instance
product.init();

// Original add to cart functionality
function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// Updated add to cart event handler for ProductDetails
async function addToCartHandler(e) {
  // Use product's productId to find the product details
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Add listener to the "Add to Cart" button
document.getElementById("addToCart").addEventListener("click", addToCartHandler);
