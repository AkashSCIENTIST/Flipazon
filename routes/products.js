var express = require("express");
var app = express.Router();
var models = require("./models");
var Product = models.Product;

app.get("/", (req, res) => {
  const query = req.query.q;
  res.send("works");
});

app.post("/new", (req, res) => {
  try {
    const received = req.body;
    const body = {
      productName: received.productName,
      price: received.productPrice,
      quantity: received.productQuantity,
      vendor: received.vendor ?? "Flipazon",
      taxPercentage: received.taxPercentage ?? 9,
      category: received.category ?? "No Category",
      tags: received.tags ?? [],
      image: received.image ?? "base64-encoded-image-string",
      description: received.productDescription,
    };
    // console.log(body);
    new Product(body)
      .save()
      .then(() => {
        console.log("product saved");
        res.status(200).send(body);
      })
      .catch((err) => console.log(err));
    // res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/get/:productId", (req, res) => {
  const productId = req.params.productId;
  Product.find({ productId })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.err(err));
});

app.post("/edit", (req, res) => {
  const productId = req.body.productId;
  const deatils = req.body.deatils;
});

app.post("/addquantity", (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  Product.findOneAndUpdate({ productId }, { $inc: { quantity: quantity } })
    .then(() => res.send("OK"))
    .catch((err) => res.err(err));
});

app.post("/reducequantity", (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  Product.findOneAndUpdate({ productId }, { $inc: { quantity: -1 * quantity } })
    .then(() => res.send("OK"))
    .catch((err) => res.err(err));
});

app.get("/search", (req, res) => {
  let search = req.query.q;
  console.log(search);
  const regex = new RegExp(search, "i");
  Product.find({
    $or: [
      { productName: { $regex: regex } },
      { vendor: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.err(err);
    });
});

module.exports = app;
