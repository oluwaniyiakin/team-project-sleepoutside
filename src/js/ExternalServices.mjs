export default class ExternalServices {
  async getData(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Bad Response");
    }
    return await response.json();
  }

  async checkout(order) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    };
    const response = await fetch('http://wdd330-backend.onrender.com/checkout', options);
    if (!response.ok) {
      throw new Error("Checkout failed");
    }
    return await response.json();
  }

  async findProductById(endpoint, id) {
    const products = await this.getData(endpoint);
    return products.find((item) => item.Id === id);
  }
}
