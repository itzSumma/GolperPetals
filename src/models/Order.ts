import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    bouquetId: { type: String, required: true },
    bouquetName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
