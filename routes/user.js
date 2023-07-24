var express = require("express");
var app = express.Router();
var models = require("./models");
var User = models.User;

app.post("/new", async (req, res) => {
  try {
    const body = req.body;
    new User(body)
      .save()
      .then(() => {
        res.status(200).send(body);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    User.find({ email, password })
      .then((users) => {
        if (users.length == 0) {
          res.status(200).send({});
        } else {
          res.status(200).send({ userId: users[0].userId, isAdmin : users[0].isAdmin });
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/:userid", async (req, res) => {
  const userId = req.params.userid;
  User.find({ userId })
    .then((users) => {
      if (users.length == 0) {
        res.status(200).send({});
      } else {
        res.status(200).send(users[0]);
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
      res.status(500).json({ error: error.message });
    });
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/newaddress", async (req, res) => {
  try {
    const { userId, newAddress } = req.body;
    User.findById(userId).then((user) => {
      if (!user) {
        throw new Error("User not found");
      }

      user.addresses.push(newAddress);
      user
        .save()
        .then(() => {
          res.status(200).send({ mag: "Address Saved" });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
