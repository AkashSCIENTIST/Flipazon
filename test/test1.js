const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;

describe("Basic Server Test", () => {
  it("Successfull response from root of server", (done) => {
    axios
      .get("http://localhost:8001/")
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Successfull response from user router", (done) => {
    axios
      .get("http://localhost:8001/user")
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Successfull response from products router", (done) => {
    axios
      .get("http://localhost:8001/product")
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Successfull response from comments router", (done) => {
    axios
      .get("http://localhost:8001/comment")
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Successfull response from cart router", (done) => {
    axios
      .get("http://localhost:8001/cart")
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Successfull response from bill router", (done) => {
    axios
      .get("http://localhost:8001/bill")
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Testing on router that does not exist", (done) => {
    axios
      .get("http://localhost:8001/dummy")
      .then((res) => {
        console.log(res.status);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
