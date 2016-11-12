"use strict";

let Product = require("./product").Product;

module.exports = {
  Products: Products
};

function Products() {
  this._products = {};
}

Products.prototype.add = function (product) {
  if (!(product instanceof Product)) {
    throw new Error("The 'product' parameter has an invalid type");
  }
  this._products[product.getId()] = product;

  return this;
};

Products.prototype.get = function (productId) {
  return this._products[productId];
};

Products.prototype.update = function (productId, newProduct) {
  if (!(newProduct instanceof Product)) {
    throw new Error("The 'newProduct' parameter has an invalid type");
  }
  if (productId !== newProduct.getId()) {
    throw new Error("The product ids do not match");
  }

  this._products[productId] = newProduct;

  return this;
};

Products.prototype.remove = function (productId) {
  delete this._products[productId];

  return this;
};
