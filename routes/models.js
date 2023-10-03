const mongoose = require("mongoose");

// Set the connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Set the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/ecommerce";
// const mongoURL = "mongodb+srv://20i306:12345@cluster0.wgpx6ki.mongodb.net/ecommerce";
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
  address: {
    type: [
      {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (value) {
            // Ensure unique addresses by converting to lowercase and removing letter spacing
            const formattedValue = value.toLowerCase().replace(/\s/g, "");

            // Find other user documents with the same formatted address
            return mongoose.models.User.findOne({
              _id: { $ne: this._id },
              addresses: formattedValue,
            }).then((user) => !user); // Return true if no other user with the same address found
          },
          message: "Address must be unique.",
        },
      },
    ],
    default: [],
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

// Define a static method to check if a user is an admin
userSchema.statics.isAdminUser = function (userId, callback) {
  this.findOne({ userId }, (err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      return callback(null, false); // User not found
    }
    callback(null, user.isAdmin);
  });
};

// Define a static method to check if a user exists by userId and password
userSchema.statics.userExists = function (userId, password, callback) {
  this.findOne({ userId, password }, (err, user) => {
    if (err) {
      return callback(err);
    }
    callback(null, !!user); // Pass true if user exists, false otherwise
  });
};

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
      min: 0,
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
productSchema.pre("remove", async function (next) {
  const productId = this._id;
  // Cascade delete child documents from the Cart collection
  await Cart.deleteMany({ productId });
  next();
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

const billSchema = new mongoose.Schema({
  deliveryAddress: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  content: [
    {
      price: {
        type: Number,
        required: true,
      },
      productId: {
        type: String,
        ref: "product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      taxPercentage: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = { User, Comment, Product, Cart, Bill };
