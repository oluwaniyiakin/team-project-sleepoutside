export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.dataSource = dataSource;
      this.product = null;
    }
  
    // Initialize product details
    async init() {
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails();
      this.setupAddToCartButton();
    }
  
    // Dynamically render product details
    renderProductDetails() {
      const productHTML = `
        <h1>${this.product.name}</h1>
        <p>${this.product.description}</p>
        <p>Price: $${this.product.price}</p>
        <button id="addToCart" data-id="${this.product.id}">Add to Cart</button>
      `;
      document.getElementById('productDetails').innerHTML = productHTML;
    }
  
    // Set up the "Add to Cart" button functionality
    setupAddToCartButton() {
      document.getElementById("addToCart").addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        this.addToCart(productId);
      });
    }
  
    // Add product to cart (functionality can be enhanced)
    addToCart(productId) {
      this.dataSource.findProductById(productId).then(product => {
        console.log('Product added to cart:', product);
        // Assuming setLocalStorage is imported and properly handling storage
        setLocalStorage("so-cart", product);
      });
    }
  }
  