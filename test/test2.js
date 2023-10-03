const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;

describe("User Router Test", async () => {
  it("Test For Authenticated User", (done) => {
    let email = "spakash182@gmail.com";
    let password = "abc";
    axios
      .post("http://localhost:8001/user/login", { email, password })
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.not.deep.equal({});
        done()
      })
      .catch((err) => {
        done(err)
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
        done()
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
        done()
      })
      .catch((err) => {
        done(err);
      });
  });
});
