var express = require("express");
var app = express.Router();
var models = require("./models");
var Cart = models.Cart;

app.post("/add", (req, res) => {
  try {
    const received = req.body;

    Cart.findOneAndUpdate(
      { productId: received.productId, userId: received.userId },
      { $inc: { qty: received.qty ?? 1 }, productName: received.productName }, // Increment qty by 1
      { upsert: true, new: true }, // Create a new entry if it doesn't exist
    )
      .then(() => {
        console.log("product saved");
        res.status(200).send(received);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/remove", async (req, res) => {
  const received = req.body;
  Cart.findOneAndDelete({
    productId: received.productId,
    userId: received.userId,
  })
    .then(() => {
      console.log("product saved");
      res.status(200).send({});
    })
    .catch((err) => console.log(err));
});

app.get("/:userid", (req, res) => {
  // Cart.find({ userId : req.params.userid })
  //   .then((cartItems) => {
  //     res.status(200).send(cartItems);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });

  Cart.aggregate([
    {
      $match: {
        userId: { $eq: req.params.userid },
      },
    },
    {
      $lookup: {
        from: "products", // Collection name of the User model
        localField: "productId",
        foreignField: "productId",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        userId: 1,
        productId: 1,
        qty: 1,
        price: "$product.price",
        productName: "$product.productName",
        image: "$product.image",
        taxPercentage: "$product.taxPercentage",
      },
    },
  ])
    .then((cartItems) => {
      res.status(200).send(cartItems);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/modifyqty", async (req, res) => {
  let received = req.body;
  let { productId, userId, qty } = req.body;
  Cart.findOneAndUpdate({ productId, userId }, { qty: qty })
    .then(() => {
      console.log("product saved");
      res.status(200).send(received);
    })
    .catch((err) => console.log(err));
});

module.exports = app;
