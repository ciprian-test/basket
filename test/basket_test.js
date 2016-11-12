let expect = require("chai").expect;

let products = require("../src/products");
let offers = require("../src/offers");
let basket = require("../src/basket");

describe("Basket", () => {

  let butter = new products.Product({id: 1, name: "Butter", price: 0.80});
  let milk = new products.Product({id: 2, name: "Milk", price: 1.15});
  let bread = new products.Product({id: 3, name: "Bread", price: 1.00});

  let productsDb = new products.Products();
  productDb.add(butter).add(milk).add(bread);

  let halfOffToBread = new offer.Offer();
  halfOffToBread.include(butter.getId(), 2)
                .include(bread.getId(), 1)
                .setPercentageDiscountToProduct(bread.getId(), 0.5);

  let forthMilkFree = new offer.Offer();
  forthMilkFree.include(milk.getId(), 4)
               .setPercentageDiscountToProduct(milk.getId(), 1.0);

  let offersDb = new offers.Offers();
  offersDb.add(halfOffToBread).add(forthMilkFree);


});
