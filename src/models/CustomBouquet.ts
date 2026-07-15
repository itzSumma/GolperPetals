import mongoose, { Schema } from "mongoose";

const CustomBouquetSchema = new Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    flowers: [
      {
        flowerId: String,
        name: String,
        quantity: Number,
      },
    ],
    wrapping: { type: String, required: true },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

export const CustomBouquet =
  mongoose.models.CustomBouquet ||
  mongoose.model("CustomBouquet", CustomBouquetSchema);
