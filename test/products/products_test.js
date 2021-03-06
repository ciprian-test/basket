"use strict";

let expect = require("chai").expect;

let products = require("../../src/products");

describe("Products", () => {
  it("should throw an error for invalid 'add' parameters", () => {
    let fn = function (product) {
      let productsDb = new products.Products();
      productsDb.add(product);
    };

    expect(fn).to.throw(/invalid/);
    expect(fn.bind(null, "")).to.throw(/invalid/);
    expect(fn.bind(null, {})).to.throw(/invalid/);
    expect(fn.bind(null, [])).to.throw(/invalid/);
  });

  it("should throw an error for invalid 'update' parameters", () => {
    let fn = function (product, productId) {
      let productsDb = new products.Products();
      productsDb.update(productId, product);
    };

    expect(fn.bind(null, undefined)).to.throw(/invalid/);
    expect(fn.bind(null, "")).to.throw(/invalid/);
    expect(fn.bind(null, {})).to.throw(/invalid/);
    expect(fn.bind(null, [])).to.throw(/invalid/);

    let butter = new products.Product({ id: 1, name: "Butter", price: 0.80 });
    expect(fn.bind(null, butter, 2)).to.throw(/not match/);
  });

  it("should return the correct added product", () => {
    let productsDb = new products.Products();

    let butter = new products.Product({ id: 1, name: "Butter", price: 0.80 });
    let result = productsDb.add(butter);

    expect(result).to.equal(productsDb);
    expect(productsDb.get(butter.getId())).to.equal(butter);
  });

  it("should return undefined when the product cannot be found", () => {
    let productsDb = new products.Products();
    expect(productsDb.get(1)).to.be.undefined;
  });

  it("should correctly update a product", () => {
    let productsDb = new products.Products();

    let butter = new products.Product({ id: 1, name: "Butter", price: 0.80 });
    let result = productsDb.add(butter);

    expect(result).to.equal(productsDb);
    expect(productsDb.get(butter.getId())).to.equal(butter);

    let unsaltedButter = new products.Product({ id: butter.getId(), name: "Unsalted butter", price: 1.90 });
    result = productsDb.update(butter.getId(), unsaltedButter);

    expect(result).to.equal(productsDb);
    expect(productsDb.get(butter.getId())).to.equal(unsaltedButter);
  });

  it("should correctly remove a product", () => {
    let productsDb = new products.Products();

    let butter = new products.Product({ id: 1, name: "Butter", price: 0.80 });
    let result = productsDb.add(butter);

    expect(result).to.equal(productsDb);
    expect(productsDb.get(butter.getId())).to.equal(butter);

    result = productsDb.remove(butter.getId());

    expect(result).to.equal(productsDb);
    expect(productsDb.get(butter.getId())).to.be.undefined;
  });

  it("should not fail when removing a missing product", () => {
    let productsDb = new products.Products();
    let result = productsDb.remove(1);

    expect(result).to.equal(productsDb);
  });
});
