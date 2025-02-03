import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details using findProductById()
    this.product = await this.dataSource.findProductById(this.productId);

    if (this.product) {
      // Render product details
      this.renderProductDetails();

      // Add event listener to "Add to Cart" button after rendering
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } else {
      console.error("Product not found.");
    }
  }

  addToCart() {
    // Save product data to localStorage
    setLocalStorage("so-cart", this.product);
    console.log("Product added to cart:", this.product);
  }

  renderProductDetails() {
    const productContainer = document.getElementById("productDetails");
    if (!productContainer) {
      console.error("Product details container not found.");
      return;
    }

    // Inject product details into the HTML
    productContainer.innerHTML = `
      <div class="product-container">
        <h2>${this.product.Name}</h2>
        <img src="${this.product.Image}" alt="${this.product.Name}" class="product-image"/>
        <p class="product-description">${this.product.Description}</p>
        <p class="product-price">Price: $${this.product.Price}</p>
        <button id="addToCart" class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;
  }
}
