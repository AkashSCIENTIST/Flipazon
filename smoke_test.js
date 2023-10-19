const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;

describe("Smoke test", () => {
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
  it("Test For Authenticated User", (done) => {
    let email = "spakash182@gmail.com";
    let password = "abc";
    axios
      .post("http://localhost:8001/user/login", { email, password })
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal({});
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Test For Unauthenticated User", (done) => {
    let email = "spakash182@gmail.com";
    let password = "12345";
    axios
      .post("http://localhost:8001/user/login", { email, password })
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal({});
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Get user details", () => {
    let email = "spakash182@gmail.com";
    let password = "12345";
    axios
      .get("http://localhost:8001/user/gaev9eub3")
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal({});
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
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
