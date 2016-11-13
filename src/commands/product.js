"use strict";

let products = require("../products");

module.exports = runCommand;

function runCommand(productsDb, lineParts) {
  if (lineParts.length < 2) {
    console.log("Invalid 'product' command");
    return;
  }

  switch (lineParts[1]) {
    case "add":
      addProduct(productsDb, lineParts);
      break;
    case "update":
      updateProduct(productsDb, lineParts);
      break;
    case "get":
      getProduct(productsDb, lineParts);
      break;
    case "remove":
      removeProduct(productsDb, lineParts);
      break;
    default:
      console.log("Invalid 'product' command");
  }
}

function addProduct(productsDb, lineParts) {
  if (lineParts.length !== 5) {
    console.log("Invalid 'product add' command");
    return;
  }

  try {
    let product = new products.Product({ id: lineParts[2], name: lineParts[3], price: parseFloat(lineParts[4]) });
    productsDb.add(product);
  } catch (e) {
    console.log(e);
  }
}

function updateProduct(productsDb, lineParts) {
  if (lineParts.length !== 5) {
    console.log("Invalid 'product update' command");
    return;
  }

  try {
    let updatedProduct = new products.Product({ id: lineParts[2], name: lineParts[3], price: parseFloat(lineParts[4]) });
    productsDb.update(lineParts[2], updatedProduct);
  } catch (e) {
    console.log(e);
  }
}

function getProduct(productsDb, lineParts) {
  if (lineParts.length !== 3) {
    console.log("Invalid 'product get' command");
    return;
  }

  try {
    let product = productsDb.get(lineParts[2]);
    if (product) {
      console.log(`Product details: id = ${product.getId()}, name = ${product.getName()}, price = ${product.getPrice()}`);
    } else {
      console.log("Product with the specified id was not found");
    }
  } catch (e) {
    console.log(e);
  }
}

function removeProduct(productsDb, lineParts) {
  if (lineParts.length !== 3) {
    console.log("Invalid 'product remove' command");
    return;
  }

  try {
    productsDb.remove(lineParts[2]);
  } catch (e) {
    console.log(e);
  }
}
