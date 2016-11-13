"use strict";

let expect = require("chai").expect;

let products = require("../src/products");
let offers = require("../src/offers");
let basket = require("../src/basket");

describe("Basket", () => {
  let butter = new products.Product({ id: 1, name: "Butter", price: 0.80 });
  let milk = new products.Product({ id: 2, name: "Milk", price: 1.15 });
  let bread = new products.Product({ id: 3, name: "Bread", price: 1.00 });

  let productsDb = new products.Products();
  productsDb.add(butter).add(milk).add(bread);

  let halfOffToBread = new offers.Offer(productsDb, 1);
  halfOffToBread.include(butter.getId(), 2)
                .include(bread.getId(), 1)
                .setPercentageDiscountToProduct(bread.getId(), 0.5);

  let forthMilkFree = new offers.Offer(productsDb, 2);
  forthMilkFree.include(milk.getId(), 4)
               .setPercentageDiscountToProduct(milk.getId(), 1.0);

  let offersDb = new offers.Offers();
  offersDb.add(halfOffToBread).add(forthMilkFree);

  it("should correctly get the basket cost for an empty basket", () => {
    let customerBasket = new basket.Basket(productsDb, offersDb);
    expect(customerBasket.getTotalCost()).to.equal(0.0);
  });

  it("should correctly get the basket cost for single product basket", () => {
    let customerBasket = new basket.Basket(productsDb, offersDb);
    customerBasket.add(butter.getId(), 1);
    expect(customerBasket.getTotalCost()).to.equal(0.8);

    customerBasket.remove(butter.getId()).add(milk.getId(), 1);
    expect(customerBasket.getTotalCost()).to.equal(1.15);

    customerBasket.remove(milk.getId()).add(bread.getId(), 1);
    expect(customerBasket.getTotalCost()).to.equal(1);
  });

  it("should correctly get the basket cost for basket with each product once", () => {
    let customerBasket = new basket.Basket(productsDb, offersDb);
    customerBasket.add(butter.getId(), 1)
                  .add(milk.getId(), 1)
                  .add(bread.getId(), 1);
    expect(customerBasket.getTotalCost()).to.equal(2.95);
  });

  it("should correctly get the basket cost for basket with each product multiple times", () => {
    let customerBasket = new basket.Basket(productsDb, offersDb);
    customerBasket.add(butter.getId(), 1)
                  .add(milk.getId(), 2)
                  .add(bread.getId(), 3);
    expect(customerBasket.getTotalCost()).to.equal(6.1);
  });

  it("should correctly apply the 'half off to bread' offer", () => {
    let customerBasket = new basket.Basket(productsDb, offersDb);
    customerBasket.add(butter.getId(), 2)
                  .add(bread.getId(), 2);
    expect(customerBasket.getTotalCost()).to.equal(3.1);
  });

  it("should correctly apply the 'forth milk free' offer", () => {
    let customerBasket = new basket.Basket(productsDb, offersDb);
    customerBasket.add(milk.getId(), 4);
    expect(customerBasket.getTotalCost()).to.equal(3.45);
  });

  it("should correctly apply multiple offers", () => {
    let customerBasket = new basket.Basket(productsDb, offersDb);
    customerBasket.add(butter.getId(), 2)
                  .add(milk.getId(), 8)
                  .add(bread.getId(), 1);
    expect(customerBasket.getTotalCost()).to.equal(9.0);
  });
});
