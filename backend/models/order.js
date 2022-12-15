const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        status: {
                    type: String,
                    enum: ["under review", "reviewed", "accepted", "rejected"],
                    default: "under review"
                },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        salesId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reviewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },
    { timestamps: true }
);



module.exports = mongoose.model("Order", orderSchema);
