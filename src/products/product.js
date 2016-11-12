"use strict";

module.exports = {
  Product: Product
};

function Product(productData) {
  let error = validate(productData);
  if (error) {
    throw error;
  }

  this._product = productData;
}

Product.prototype.getId = function () {
  return this._product.id;
};

Product.prototype.getName = function () {
  return this._product.name;
};

Product.prototype.getPrice = function () {
  return this._product.price;
};

function validate(productData) {
  if (!productData) {
    return new Error("The product data is missing");
  }

  let requiredFields = ["id", "name", "price"];
  for (let i = 0; i < requiredFields.length; i++) {
    if (!productData[requiredFields[i]]) {
      return new Error(`The product parameter '${requiredFields[i]}' is required`);
    }
  }

  if (typeof productData.price !== "number") {
    return new Error("The 'price' parameter is invalid");
  }

  if (productData.price <= 0) {
    return new Error("The product 'price' parameter has to be a positive number");
  }
}
