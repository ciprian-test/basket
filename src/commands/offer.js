"use strict";

let offers = require("../offers");

module.exports = runCommand;

function runCommand(offersDb, productsDb, lineParts) {
  if (lineParts.length < 2) {
    console.log("Invalid 'offer' command");
    return;
  }

  switch (lineParts[1]) {
    case "add":
      addOffer(offersDb, productsDb, lineParts);
      break;
    case "include":
      includeInOffer(offersDb, lineParts);
      break;
    case "discount":
      setDiscount(offersDb, lineParts);
      break;
    case "remove":
      removeOffer(offersDb, lineParts);
      break;
    default:
      console.log("Invalid 'offer' command");
  }
}

function addOffer(offersDb, productsDb, lineParts) {
  if (lineParts.length !== 4) {
    console.log("Invalid 'offer add' command");
    return;
  }

  try {
    let offer = new offers.Offer(productsDb, lineParts[2], lineParts[3]);
    offersDb.add(offer);
  } catch (e) {
    console.log(e);
  }
}

function includeInOffer(offersDb, lineParts) {
  if (lineParts.length !== 5) {
    console.log("Invalid 'offer include' command");
    return;
  }

  try {
    let offer = offersDb.get(lineParts[2]);
    if (!offer) {
      console.log("Offer with the specified id was not found");
      return;
    }

    offer.include(lineParts[3], parseInt(lineParts[4]));
  } catch (e) {
    console.log(e);
  }
}

function setDiscount(offersDb, lineParts) {
  if (lineParts.length !== 6) {
    console.log("Invalid 'offer discount' command");
    return;
  }

  try {
    let offer = offersDb.get(lineParts[3]);
    if (!offer) {
      console.log("Offer with the specified id was not found");
      return;
    }

    if (lineParts[2] === "percentage") {
      offer.setPercentageDiscountToProduct(lineParts[4], parseFloat(lineParts[5]));
    } else if (lineParts[2] === "value") {
      offer.setPriceDiscountToProduct(lineParts[4], parseFloat(lineParts[5]));
    } else {
      console.log("Invalid 'offer discount' type command");
    }
  } catch (e) {
    console.log(e);
  }
}

function removeOffer(offersDb, lineParts) {
  if (lineParts.length !== 3) {
    console.log("Invalid 'offer remove' command");
    return;
  }

  try {
    offersDb.remove(lineParts[2]);
  } catch (e) {
    console.log(e);
  }
}
