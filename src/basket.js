"use strict";

module.exports = {
  Basket: Basket
};

function Basket(products, offers) {
  this._products = products;
  this._offers = offers;
}

Basket.prototype.add = function (productId, quantity) {
  
};

Basket.prototype.update = function (productId, newQuantity) {
  
};

Basket.prototype.remove = function (productId) {
  
};

Basket.prototype.getTotalCost = function () {
  
};
