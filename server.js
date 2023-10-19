const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const formData = require("express-form-data");
const dotenv = require("dotenv");
var cors = require("cors");
var multer = require("multer");
var forms = multer();
const PORT = 8001;
let print = console.log;

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

// const user_router = require("./routes/user");
// const products_router = require("./routes/products");
// const comments_router = require("./routes/comments");
// const cart_router = require("./routes/cart");
// const bill_router = require("./routes/bill");

dotenv.config();
const app = express();
app.use(cors());
// app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("works");
});

// app.use("/user", user_router);
// app.use("/product", products_router);
// app.use("/comment", comments_router);
// app.use("/cart", cart_router);
// app.use("/bill", bill_router);

app.use("/pg", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    print(results);
    if (error) {
      res.status(500).json({});
    } else {
      res.status(200).json(results.rows);
    }
  });
});

app.use((req, res) => {
  console.log("Null");
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} http://localhost:${PORT}`);
});
