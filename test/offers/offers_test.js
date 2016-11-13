"use strict";

let expect = require("chai").expect;

let offers = require("../../src/offers");

describe("Offers", () => {

  it("should throw an error for invalid 'add' parameters", () => {
    let fn = function (offer) {
      let offersDb = new offers.Offers();
      offersDb.add(offer);
    };

    expect(fn).to.throw(/invalid/);
    expect(fn.bind(null, "")).to.throw(/invalid/);
    expect(fn.bind(null, {})).to.throw(/invalid/);
    expect(fn.bind(null, new Array())).to.throw(/invalid/);
  });

  it("should throw an error for invalid 'update' parameters", () => {
    let fn = function (offer, offerId) {
      let offersDb = new offers.Offers();
      offersDb.update(offerId, offer);
    };

    expect(fn.bind(null, undefined)).to.throw(/invalid/);
    expect(fn.bind(null, "")).to.throw(/invalid/);
    expect(fn.bind(null, {})).to.throw(/invalid/);
    expect(fn.bind(null, new Array())).to.throw(/invalid/);

    let offer1 = new offers.Offer({}, 1);
    expect(fn.bind(null, offer1, 2)).to.throw(/not match/);
  });

  it("should return the correct added order", () => {
    let offersDb = new offers.Offers();

    let offer1 = new offers.Offer({}, 1);
    let result = offersDb.add(offer1);

    expect(result).to.equal(offersDb);
    expect(offersDb.get(offer1.getId())).to.equal(offer1);
  });

  it("should return undefined when the offer cannot be found", () => {
    let offersDb = new offers.Offers();
    expect(offersDb.get(1)).to.be.undefined;
  });

  it("should correctly update an offer", () => {
    let offersDb = new offers.Offers();

    let offer1 = new offers.Offer({}, 1);
    let result = offersDb.add(offer1);

    expect(result).to.equal(offersDb);
    expect(offersDb.get(offer1.getId())).to.equal(offer1);

    let offer2 = new offers.Offer({}, offer1.getId());
    result = offersDb.update(offer1.getId(), offer2);

    expect(result).to.equal(offersDb);
    expect(offersDb.get(offer1.getId())).to.equal(offer2);
  });

  it("should correctly remove an offer", () => {
    let offersDb = new offers.Offers();

    let offer1 = new offers.Offer({}, 1);
    let result = offersDb.add(offer1);

    expect(result).to.equal(offersDb);
    expect(offersDb.get(offer1.getId())).to.equal(offer1);

    result = offersDb.remove(offer1.getId());

    expect(result).to.equal(offersDb);
    expect(offersDb.get(offer1.getId())).to.be.undefined;
  });

  it("should not fail when removing a missing offer", () => {
    let offersDb = new offers.Offers();
    let result = offersDb.remove(1);

    expect(result).to.equal(offersDb);
  });
});
