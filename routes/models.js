const mongoose = require("mongoose");

// Set the connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Set the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/ecommerce";

// Connect to MongoDB
mongoose
  .connect(mongoURL, options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    default: () => Math.random().toString(36).substr(2, 9), // Generate unique random ID
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
userSchema.set("primaryKey", "userId");
const User = mongoose.model("User", userSchema);

// Define Comment schema
const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    unique: true,
    required: true,
    default: () => Math.random().toString(36).substr(2, 9),
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  productId: {
    type: String,
    ref: "Product",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});
commentSchema.set("primaryKey", "commentId");
commentSchema.index({ productId: 1, userId: 1 }, { unique: true });
const Comment = mongoose.model("Comment", commentSchema);

// Define Product schema
const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required: true,
      default: () => Math.random().toString(36).substr(2, 9), // Generate unique random product ID
    },
    productName: {
      type: String,
      default: "base64-encoded-image-string",
      required: true,
      index: "text", // Enable full-text search on productName
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      index: "text", // Enable full-text search on vendor
    },
    vendor: {
      type: String,
      required: true,
      index: "text", // Enable full-text search on vendor
    },
    taxPercentage: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: "text",
    },
    tags: [
      {
        type: String,
        index: "text",
      },
    ],
    // comments: [commentSchema], // Embed the commentSchema within the productSchema
    numOfReviews: {
      type: Number,
      default: 0,
    },
    numOfStars: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  // {
  //   _id: false, // Disable the default '_id' field
  // },
);
productSchema.set("primaryKey", "productId");
productSchema.index({
  productName: "text",
  vendor: "text",
  tags: "text",
});
const Product = mongoose.model("Product", productSchema);

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    default: "Admin",
  },
  productName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
});

// Set the primary key
cartSchema.index({ productId: 1, userId: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { User, Comment, Product, Cart };
