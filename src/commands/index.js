"use strict";

var product = require("./product");
var offer = require("./offer");
var basket = require("./basket");

module.exports = function (productsDb, offersDb, customerBasket) {
  return {
    product: product.bind(null, productsDb),
    offer: offer.bind(null, offersDb, productsDb),
    basket: basket.bind(null, customerBasket)
  };
};
