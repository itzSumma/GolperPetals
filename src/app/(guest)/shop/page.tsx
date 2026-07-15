"use client";
import { useEffect, useState } from "react";
import FlowerCard from "@/components/FlowerCard";

// ডাটা টাইপ ডিফাইন করলাম (এটি আপনি types/index.ts এ রাখতে পারেন)
interface Flower {
  _id: string;
  name: string;
  description: string;
  price: string | number;
  image: string;
  origin: "Local" | "Imported";
  rating: number;
  reviews: number;
  color: string;
}

export default function ShopPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:5000/flowers")
      .then((res) => res.json())
      .then((data) => {
        setFlowers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching flowers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-bold animate-pulse text-red-600">Loading Floral Delights...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50/30 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-red-950">Our Flower Collection</h1>
          <p className="mt-4 text-lg text-gray-600">Handpicked blooms for every special moment</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flowers.map((flower: Flower) => (
            <FlowerCard 
              key={flower._id} 
              item={{
                id: flower._id,
                name: flower.name,
                description: flower.description,
                price: flower.price,
                image: flower.image,
                origin: flower.origin,
                rating: flower.rating,
                reviews: flower.reviews,
                color: flower.color
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}