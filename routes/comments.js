var express = require("express");
var models = require("./models");
var Comment = models.Comment;
const PORT = process.env.PORT || 3000;
var app = express.Router();

app.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  Comment.find({ productId })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => res.err(err));
});

app.post("/add", (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;
  const starRating = req.body.starRating;
  const review = req.body.review;
  const body = { userId, productId, starRating, review };
  console.log(body);

  Comment.findOneAndUpdate(
    { userId, productId },
    { userId, productId, starRating, review },
    { upsert: true, new: true },
  )
    .then(() => {
      console.log("comment saved");
      res.status(200).send(body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.post("/edit", (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;
  const stars = req.body.stars;
  const review = req.body.review;
});

module.exports = app;
