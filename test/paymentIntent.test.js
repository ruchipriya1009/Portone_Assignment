import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import { describe } from "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Payment Intent Validation Tests", () => {
  it("should return an error for empty data in body", (done) => {
    chai
      .request(app)
      .post("/api/v1/create_intent")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("errors");
        done();
      });
  });

  it("should return an error for missing amount", (done) => {
    chai
      .request(app)
      .post("/api/v1/create_intent")
      .send({
        currency: "usd",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("errors");
        done();
      });
  });

  it("should return an error for missing currency", (done) => {
    chai
      .request(app)
      .post("/api/v1/create_intent")
      .send({
        amount: 1000,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("errors");
        done();
      });
  });

  it("should return an error for amount with string data type", (done) => {
    chai
      .request(app)
      .post("/api/v1/create_intent")
      .send({
        amount: "one thousand",
        currency: "usd",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("errors");
        done();
      });
  });

  it("should return an error for currency string greater than length 3", (done) => {
    chai
      .request(app)
      .post("/api/v1/create_intent")
      .send({
        amount: 1000,
        currency: "usdollar",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("errors");
        done();
      });
  });

  it("should create a payment intent for valid input", (done) => {
    chai
      .request(app)
      .post("/api/v1/create_intent")
      .send({
        amount: 1000,
        currency: "usd",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("id");
        done();
      });
  });
});
