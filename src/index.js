"use strict";

/* eslint-disable no-console, no-process-exit */

let readline = require("readline");

let products = require("./products");
let offers = require("./offers");
let basket = require("./basket");

let productsDb = new products.Products();
let offersDb = new offers.Offers();
let customerBasket = new basket.Basket(productsDb, offersDb);

let commands = require("./commands")(productsDb, offersDb, customerBasket);

let helpMessage = `Welcome to the interactive customer basket application. The available commands are:

  - "product add <id> <name> <price>" - Add a product
  - "product update <id> <new-name> <new-price>" - Update a product
  - "product get <id>" - List the product details
  - "product remove <id>" - Remove a product

  - "offer add <id> <name>" - Create an offer
  - "offer include <id> <product-id> <quantity>" - Include a product in an offer
  - "offer discount percentage <id> <product-id> <percentage>" - Set a discount percentage for a product included in the offer
  - "offer discount value <id> <product-id> <value>" - Set a discount value for a product included in the offer
  - "offer remove <id>" - Remove an offer

  - "basket add <product-id> <quantity>" - Add a product in the basket
  - "basket update <product-id> <new-quantity>" - Update the quantity for a product
  - "basket remove <product-id>" - Remove a product from the basket
  - "basket cost" - Print the basket cost

  - "help" - Print the help message
  - "exit" - Exit the application

`;

console.log(helpMessage);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on("line", function (line) {
  parseCommand(line);
});

function parseCommand(line) {
  let lineParts = line.split(" ");
  if (line === "" || lineParts.length === 0) {
    return;
  }

  switch (lineParts[0]) {
    case "product":
      commands.product(lineParts);
      break;
    case "offer":
      commands.offer(lineParts);
      break;
    case "basket":
      commands.basket(lineParts);
      break;
    case "help":
      console.log(helpMessage);
      break;
    case "exit":
      process.exit();
      break;
    default:
      console.log("Invalid command, try again!");
  }
}
