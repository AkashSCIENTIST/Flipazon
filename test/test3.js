const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;

describe("Product Router Test", async () => {
  it("Search Test 1", (done) => {
    let q = "rich dad";
    axios
      .get(`http://localhost:8001/product/search?q=${q}`)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal([]);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Search Test 2", (done) => {
    let q = "gift";
    axios
      .get(`http://localhost:8001/product/search?q=${q}`)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal([]);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Get Product Details", (done) => {
    let id = "mh1w9csub";
    axios
      .get(`http://localhost:8001/product/get/${id}`)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal([]);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Get Product Details", (done) => {
    let id = "mh1w9csuc";
    axios
      .get(`http://localhost:8001/product/get/${id}`)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal([]);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
