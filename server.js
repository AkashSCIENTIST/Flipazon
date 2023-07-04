const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const formData = require("express-form-data");
const dotenv = require("dotenv");
var cors = require("cors");
const PORT = 8001;

// const user_router = require("./routes/user");
const products_router = require("./routes/products");
const comments_router = require("./routes/comments");
const cart_router = require("./routes/cart");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("works");
});

// app.use("/user", user_router);
app.use("/product", products_router);
app.use("/comment", comments_router);
app.use("/cart", cart_router);
console.log("Products Router added");

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} http://localhost:${PORT}`);
});
