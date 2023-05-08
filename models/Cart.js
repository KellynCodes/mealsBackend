const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: {
          type: String,
          unique: true,
          required: true,
        },
        productPrice: { type: Number, required: true },
        productTitle: { type: String, required: true },
        productImg: { type: String, required: true },
        productDesc: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
