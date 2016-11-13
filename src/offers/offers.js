"use strict";

let Offer = require("./offer").Offer;

module.exports = {
  Offers: Offers
};

function Offers() {
  this._offers = {};
}

Offers.prototype.add = function (offer) {
  if (!(offer instanceof Offer)) {
    throw new Error("The 'offer' parameter has an invalid type");
  }
  this._offers[offer.getId()] = offer;

  return this;
};

Offers.prototype.get = function (offerId) {
  return this._offers[offerId];
};

Offers.prototype.update = function (offerId, newOffer) {
  if (!(newOffer instanceof Offer)) {
    throw new Error("The 'newOffer' parameter has an invalid type");
  }
  if (offerId !== newOffer.getId()) {
    throw new Error("The offer ids do not match");
  }

  this._offers[offerId] = newOffer;

  return this;
};

Offers.prototype.remove = function (offerId) {
  delete this._offers[offerId];

  return this;
};

Offers.prototype.calculateBasketDiscount = function (basketProducts) {
  let discount = 0;
  let remainingProducts = basketProducts;

  for (let offerId in this._offers) {
    if (this._offers.hasOwnProperty(offerId)) {
      let result = this._offers[offerId].calculateBasketDiscount(remainingProducts);
      discount += result.discount;
      remainingProducts = result.products;
    }
  }

  return discount;
};
