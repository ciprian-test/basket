"use strict";

module.exports = runCommand;

function runCommand(customerBasket, lineParts) {
  if (lineParts.length < 2) {
    console.log("Invalid 'basket' command");
    return;
  }

  switch (lineParts[1]) {
    case "add":
      addProduct(customerBasket, lineParts);
      break;
    case "update":
      updateProduct(customerBasket, lineParts);
      break;
    case "remove":
      removeProduct(customerBasket, lineParts);
      break;
    case "cost":
      getCost(customerBasket, lineParts);
      break;

    default:
      console.log("Invalid 'basket' command");
  }
}

function addProduct(customerBasket, lineParts) {
  if (lineParts.length !== 4) {
    console.log("Invalid 'basket add' command");
    return;
  }

  try {
    customerBasket.add(lineParts[2], parseInt(lineParts[3]));
  } catch (e) {
    console.log(e);
  }
}

function updateProduct(customerBasket, lineParts) {
  if (lineParts.length !== 4) {
    console.log("Invalid 'basket update' command");
    return;
  }

  try {
    customerBasket.update(lineParts[2], parseInt(lineParts[3]));
  } catch (e) {
    console.log(e);
  }
}

function removeProduct(customerBasket, lineParts) {
  if (lineParts.length !== 3) {
    console.log("Invalid 'basket remove' command");
    return;
  }

  try {
    customerBasket.remove(lineParts[2]);
  } catch (e) {
    console.log(e);
  }
}

function getCost(customerBasket, lineParts) {
  if (lineParts.length !== 2) {
    console.log("Invalid 'basket cost' command");
    return;
  }

  try {
    console.log(`The basket cost is: ${customerBasket.getTotalCost()}`);
  } catch (e) {
    console.log(e);
  }
}
