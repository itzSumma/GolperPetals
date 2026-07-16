"use client";
import { useEffect, useState } from "react";
import FlowerCard from "@/components/FlowerCard";

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
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("All");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/flowers")
      .then((res) => res.json())
      .then((data) => {
        setFlowers(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredFlowers = flowers.filter((flower) => {
    const matchesSearch = [flower.name, flower.description, flower.color]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesOrigin = origin === "All" || flower.origin === origin;

    return matchesSearch && matchesOrigin;
  });

  async function buyFlower(flower: Flower) {
    setStatus(`Saving ${flower.name} to your custom bouquets...`);

    try {
      const response = await fetch("/api/custom-bouquets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flowers: [
            {
              flowerId: flower._id,
              name: flower.name,
              quantity: 1,
            },
          ],
          wrapping: "Classic kraft wrap",
          message: "",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Please login before buying.");
        return;
      }

      setStatus(`${flower.name} added to your dashboard.`);
    } catch {
      setStatus("Could not complete buy now. Please try again.");
    }
  }

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

        <div className="mb-10 grid gap-4 rounded-3xl bg-white p-5 shadow-lg shadow-rose-100 md:grid-cols-[1fr_220px]">
          <input
            className="rounded-2xl border border-rose-100 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            placeholder="Search by name, color, or description..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="rounded-2xl border border-rose-100 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
          >
            <option>All</option>
            <option>Local</option>
            <option>Imported</option>
          </select>
        </div>

        {status ? (
          <p className="mb-8 rounded-2xl bg-white p-4 text-center font-semibold text-rose-700 shadow-sm">
            {status}
          </p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlowers.map((flower: Flower) => (
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
              onBuy={() => buyFlower(flower)}
            />
          ))}
        </div>

        {filteredFlowers.length === 0 ? (
          <p className="mt-12 text-center text-lg font-semibold text-gray-600">
            No flowers matched your search.
          </p>
        ) : null}
      </div>
    </div>
  );
}
