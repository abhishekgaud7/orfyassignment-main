const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },

    type: {
      type: String,
      required: [true, "Product type is required"]
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"]
    },

    mrp: {
      type: Number,
      required: [true, "MRP is required"],
      min: [0, "MRP cannot be negative"]
    },

    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: [0, "Selling price cannot be negative"]
    },

    brand: {
      type: String,
      trim: true
    },

    returnEligible: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes"
    },

    isPublished: {
      type: Boolean,
      default: false
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
