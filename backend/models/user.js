const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    roles: {
      type: [
        {
          type: String,
          enum: ["customer", "reviewer", "sales"],
          default: "customer"
        }
      ]
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);
