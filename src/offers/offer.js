"use strict";

let utils = require("../utils");

module.exports = {
  Offer: Offer
};

function Offer(productsDb, id) {
  this._productsDb = productsDb;
  this._id = id;

  this._products = {};
  this._discounts = {};
}

Offer.prototype.getId = function () {
  return this._id;
};

Offer.prototype.include = function (productId, quantity) {
  let product = this._productsDb.get(productId);
  if (!product) {
    throw new Error("The product to include in the offer is missing");
  }

  if (typeof quantity !== "number" || quantity <= 0) {
    throw new Error("The included quantity in the offer is invalid");
  }

  this._products[productId] = quantity;

  return this;
};

Offer.prototype.setPercentageDiscountToProduct = function (productId, percentage) {
  let product = this._productsDb.get(productId);
  if (!product) {
    throw new Error("The product to discount in the offer is missing");
  }

  if (!this._products[productId]) {
    throw new Error("The discount cannot be applied to a product not found in the offer");
  }

  if (typeof percentage !== "number" || percentage <= 0 || percentage > 1) {
    throw new Error("The discount percentage is invalid");
  }

  this._discounts[productId] = utils.round(product.getPrice() * percentage);

  return this;
};

Offer.prototype.setPriceDiscountToProduct = function (productId, value) {
  let product = this._productsDb.get(productId);
  if (!product) {
    throw new Error("The product to discount in the offer is missing");
  }

  if (!this._products[productId]) {
    throw new Error("The discount cannot be applied to a product not found in the offer");
  }

  if (typeof value !== "number" || value <= 0) {
    throw new Error("The discount value is invalid");
  }

  if (product.getPrice() * this._products[productId] < value) {
    throw new Error("This discount value cannot exceed the products value");
  }

  this._discounts[productId] = value;

  return this;
};

Offer.prototype.calculateBasketDiscount = function (basketProducts) {
  if (!this.canBeApplied(basketProducts)) {
    return {
      discount: 0,
      products: basketProducts
    };
  }

  let resultedBasket = {
    discount: 0,
    products: {}
  };

  for (let productId in basketProducts) {
    if (basketProducts.hasOwnProperty(productId)) {
      resultedBasket.products[productId] = basketProducts[productId];
    }
  }

  while (this.canBeApplied(resultedBasket.products)) {
    for (let productId in this._products) {
      if (this._products.hasOwnProperty(productId)) {
        resultedBasket.products[productId] -= this._products[productId];
      }
    }
    for (let productId in this._discounts) {
      if (this._discounts.hasOwnProperty(productId)) {
        resultedBasket.discount += this._discounts[productId];
      }
    }
  }

  resultedBasket.discount = utils.round(resultedBasket.discount);

  return resultedBasket;
};

Offer.prototype.canBeApplied = function (basketProducts) {
  for (let productId in this._products) {
    if (!basketProducts[productId] || basketProducts[productId] < this._products[productId]) {
      return false;
    }
  }

  return true;
};
