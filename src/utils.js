"use strict";

module.exports = {
  round: round
};

function round(value) {
  let parsed = parseFloat(value);

  if (!isNaN(parsed)) {
    return parseFloat(parsed.toFixed(2));
  }

  return value;
}
