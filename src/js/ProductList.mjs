// ProductList.mjs

// Function to generate the HTML for a product card
function productCardTemplate(product) {
    return `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
      </div>
    `;
  }
  
  // Class to handle product listing
  class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    // Initialize the product listing
    init() {
      this.getData();
    }
  
    // Fetch data and render the list of products
    async getData() {
      try {
        const response = await fetch(this.dataSource);
        const products = await response.json();
        const filteredProducts = this.filterProducts(products);
        this.renderList(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    // Render the list of products
    renderList(products) {
      const htmlStrings = products.map(product => productCardTemplate(product));
      this.listElement.innerHTML = htmlStrings.join('');
    }
  
    // Filter products, here we show the first 4
    filterProducts(products) {
      return products.slice(0, 4); // Show only the first 4 products
    }
  }
  
  export default ProductListing;
  