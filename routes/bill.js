var express = require("express");
const mongoose = require("mongoose");
var app = express.Router();
var models = require("./models");
var Bill = models.Bill;
var User = models.User;
var Product = models.Product;
var Cart = models.Cart;

app.get("/", (req, res) => {
  const query = req.query.q;
  res.send("works");
});

app.post("/new", async (req, res) => {
  console.log("new bill triggered");
  let errstr = "";
  try {
    const {
      selectedOption,
      selectedAddress,
      newAddress,
      userId,
      totalAmount,
      content,
    } = req.body;

    console.log(req.body);

    const session = await mongoose.startSession();
    session.startTransaction();

    const bulkUpdateOperations = content.map(
      ({ price, productName, productId, qty, taxPercentage }) => ({
        updateOne: {
          filter: { productId },
          update: { $inc: { quantity: -qty } },
        },
      }),
    );

    console.log(bulkUpdateOperations);

    Product.bulkWrite(bulkUpdateOperations)
      .then((e) => {
        errstr += "bulkwrite ";
        console.log(e);
        // Product.save();
        //   .then(async () => {
        errstr += "bulksave ";

        if (selectedOption === "useNewAddress") {
          User.findOne({ userId }).then(async (user) => {
            if (!user) {
              throw new Error("User not found");
            }

            user.address.push(newAddress);
            user
              .save()
              .then(() => {
                errstr += "user address saved ";
              })
              .catch(() => {
                session.abortTransaction();
                session.endSession();
                mongoose.connection.close();
                console.log(error);
                res.status(500).json({ error: error, msg: errstr });
              });
          });
        }

        const bill = new Bill({
          deliveryAddress:
            selectedOption === "useNewAddress" ? newAddress : selectedAddress,
          totalAmount,
          userId,
          content,
        });

        bill
          .save()
          .then(async () => {
            errstr += "bill save";
            Cart.deleteMany({ userId })
              .then(() => {
                errstr += "cart delete many";
                session.commitTransaction();
                console.log(errstr);
                res.status(200).json({ msg: "saved" });
              })
              .catch(() => {
                session.abortTransaction();
                session.endSession();
                mongoose.connection.close();
                console.log(error);
                res.status(500).json({ error: error, msg: errstr });
              });
          })
          .catch((error) => {
            session.abortTransaction();
            session.endSession();
            mongoose.connection.close();
            console.log(error);
            res.status(500).json({ error: error, msg: errstr });
          });
        //   })
        //   .catch((error) => {
        //     session.abortTransaction();
        //     session.endSession();
        //     mongoose.connection.close();
        //     console.log(error);
        //     res.status(500).json({ error: error, msg: errstr });
        //   });
      })
      .catch((error) => {
        session.abortTransaction();
        session.endSession();
        mongoose.connection.close();
        console.log(error);
        res.status(500).json({ error: error, msg: errstr });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, msg: errstr });
  }
});

module.exports = app;
