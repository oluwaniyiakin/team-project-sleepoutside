import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    document.querySelector('#subtotal').textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal(zip) {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    document.querySelector('#shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector('#tax').textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector('#total').textContent = `$${this.orderTotal.toFixed(2)}`;
  }
}
