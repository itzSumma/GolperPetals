import mongoose, { Schema } from "mongoose";

const FlowerSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    meaning: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    occasionTags: [{ type: String, required: true }],
    origin: { type: String, enum: ["Local", "Imported"], default: "Local" },
    color: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    reviews: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export const Flower =
  mongoose.models.Flower || mongoose.model("Flower", FlowerSchema);
