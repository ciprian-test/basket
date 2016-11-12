"use strict";

module.exports = {
  Offer: Offer
};

function Offer(products) {
  this._products = products;
}

Offer.prototype.include = function (productId, quantity) {
  
};

Offer.prototype.setPercentageDiscountToProduct = function (productId, percentage) {
  
};

Offer.prototype.setPriceDiscountToProduct = function (productId, value) {
  
};

Offer.prototype.applyToBasket = function (basket) {
  
};
