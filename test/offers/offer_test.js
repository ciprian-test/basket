"use strict";

let expect = require("chai").expect;

let offers = require("../../src/offers");
let products = require("../../src/products");

describe("Offer", () => {

  let productsDb = new products.Products();
  let butter = new products.Product({id: 2, name: "Butter", price: 0.80});
  let milk = new products.Product({id: 3, name: "Milk", price: 1.15});
  productsDb.add(butter).add(milk);

  it("should throw an error when including an invalid product", () => {
    var fn = function (productId, quantity) {
      let offer = new offers.Offer(productsDb, 1);
      offer.include(productId, quantity);
    };

    expect(fn.bind(null, 1, 1)).to.throw(/missing/);
    expect(fn.bind(null, 2, 0)).to.throw(/invalid/);
  });

  it("should throw an error when setting an invalid percentage discount", () => {
    var fn = function (productId, percentage) {
      let offer = new offers.Offer(productsDb, 1);
      offer.include(2, 1);
      offer.setPercentageDiscountToProduct(productId, percentage);
    };

    expect(fn.bind(null, 1, 1)).to.throw(/missing/);
    expect(fn.bind(null, 3, 1)).to.throw(/not found/);
    expect(fn.bind(null, 2, -1)).to.throw(/invalid/);
    expect(fn.bind(null, 2, 2)).to.throw(/invalid/);
    expect(fn.bind(null, 2, 0.5)).to.not.throw(Error);
  });

  it("should throw an error when setting an invalid value discount", () => {
    var fn = function (productId, value) {
      let offer = new offers.Offer(productsDb, 1);
      offer.include(2, 5);
      offer.setPriceDiscountToProduct(productId, value);
    };

    expect(fn.bind(null, 1, 1)).to.throw(/missing/);
    expect(fn.bind(null, 3, 1)).to.throw(/not found/);
    expect(fn.bind(null, 2, -1)).to.throw(/invalid/);
    expect(fn.bind(null, 2, 0)).to.throw(/invalid/);
    expect(fn.bind(null, 2, 10)).to.throw(/exceed/);
    expect(fn.bind(null, 2, 0.5)).to.not.throw(Error);
  });

  it("should calculate correctly the basket discount", () => {
    let offer = new offers.Offer(productsDb, 1);
    offer.include(2, 2).setPriceDiscountToProduct(2, 0.3);

    let offerDiscount = offer.calculateBasketDiscount({3: 4});
    expect(offerDiscount.discount).to.equal(0);
    expect(offerDiscount.products).to.deep.equal({3: 4});

    offerDiscount = offer.calculateBasketDiscount({2: 1});
    expect(offerDiscount.discount).to.equal(0);
    expect(offerDiscount.products).to.deep.equal({2: 1});

    offerDiscount = offer.calculateBasketDiscount({2: 2});
    expect(offerDiscount.discount).to.equal(0.3);
    expect(offerDiscount.products).to.deep.equal({2: 0});

    offerDiscount = offer.calculateBasketDiscount({2: 3});
    expect(offerDiscount.discount).to.equal(0.3);
    expect(offerDiscount.products).to.deep.equal({2: 1});

    offerDiscount = offer.calculateBasketDiscount({2: 20});
    expect(offerDiscount.discount).to.equal(3);
    expect(offerDiscount.products).to.deep.equal({2: 0});

    offerDiscount = offer.calculateBasketDiscount({2: 20, 3: 4});
    expect(offerDiscount.discount).to.equal(3);
    expect(offerDiscount.products).to.deep.equal({2: 0, 3: 4});
  });
});
