"use strict";

let utils = require("./utils");

module.exports = {
  Basket: Basket
};

function Basket(productsDb, offersDb) {
  this._productsDb = productsDb;
  this._offersDb = offersDb;
  this._products = {};
}

Basket.prototype.add = function (productId, quantity) {
  let product = this._productsDb.get(productId);
  if (!product) {
    throw new Error("The product is missing");
  }

  this._products[productId] = (this._products[productId] || 0) + quantity;

  return this;
};

Basket.prototype.update = function (productId, newQuantity) {
  let product = this._productsDb.get(productId);
  if (!product) {
    throw new Error("The product is missing");
  }

  this._products[productId] = newQuantity;

  return this;
};

Basket.prototype.remove = function (productId) {
  delete this._products[productId];

  return this;
};

Basket.prototype.getTotalCost = function () {
  let cost = 0;
  for (let productId in this._products) {
    if (this._products.hasOwnProperty(productId)) {
      cost += this._productsDb.get(productId).getPrice() * this._products[productId];
    }
  }

  let discount = this._offersDb.calculateBasketDiscount(this._products);

  return utils.round(cost - discount);
};
