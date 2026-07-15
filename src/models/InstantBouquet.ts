import mongoose, { Schema } from "mongoose";

const InstantBouquetSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    includedFlowers: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const InstantBouquet =
  mongoose.models.InstantBouquet ||
  mongoose.model("InstantBouquet", InstantBouquetSchema);
