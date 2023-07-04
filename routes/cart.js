var express = require("express");
var app = express.Router();
var models = require("./models");
var Cart = models.Cart;

app.post("/add", (req, res) => {
  try {
    const received = req.body;

    
    Cart.findOneAndUpdate(
      { productId: received.productId, userId: received.userId },
      { $inc: { qty: received.qty ?? 1 }, productName : received.productName }, // Increment qty by 1
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

app.get("/:userid", (req, res) => {
    Cart.find({ userId : req.params.userid })
      .then((cartItems) => {
        res.status(200).send(cartItems);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
})

module.exports = app;
