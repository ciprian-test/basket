"use strict";

let expect = require("chai").expect;

let products = require("../../src/products");

describe("Product", () => {

  it("should throw an error for invalid parameters", () => {
    var fn = function (productData) {
      return new products.Product(productData);
    };

    expect(fn.bind(null, undefined)).to.throw(/missing/);
    expect(fn.bind(null, "")).to.throw(/missing/);
    expect(fn.bind(null, {name: "Butter", price: 0.80})).to.throw(/id/);
    expect(fn.bind(null, {id: 1, price: 0.80})).to.throw(/name/);
    expect(fn.bind(null, {id: 1, name: "Butter"})).to.throw(/price/);
    expect(fn.bind(null, {id: 1, name: "Butter", price: "false"})).to.throw(/invalid/);
    expect(fn.bind(null, {id: 1, name: "Butter", price: -1})).to.throw(/positive/);
  });

  it("should return the correct product details", () => {
    let butter = new products.Product({id: 1, name: "Butter", price: 0.80});

    expect(butter.getId()).to.equal(1);
    expect(butter.getName()).to.equal("Butter");
    expect(butter.getPrice()).to.equal(0.8);
  });
});
