"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface InstantBouquet {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  includedFlowers: string[];
}

export default function InstantBouquetsPage() {
  const [bouquets, setBouquets] = useState<InstantBouquet[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/instant-bouquets")
      .then((response) => response.json())
      .then((data) => setBouquets(Array.isArray(data) ? data : []));
  }, []);

  async function purchaseBouquet(bouquetId: string) {
    setStatus("Saving your order...");
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bouquetId }),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || "Please login before purchasing.");
      return;
    }

    setStatus("Order saved to your dashboard.");
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <section className="mx-auto max-w-7xl">
        <p className="font-bold uppercase tracking-[0.3em] text-rose-500">
          Instant Bouquets
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black text-rose-950">
          Ready-made bouquets for fast, meaningful gifting.
        </h1>
        {status ? (
          <p className="mt-6 rounded-2xl bg-rose-50 p-4 font-semibold text-rose-700">
            {status}
          </p>
        ) : null}

        <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {bouquets.map((bouquet) => (
            <article
              className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-lg shadow-rose-100"
              key={bouquet._id}
            >
              <div className="relative h-56">
                <Image
                  alt={bouquet.name}
                  className="object-cover"
                  fill
                  src={bouquet.image}
                  sizes="(max-width:768px)100vw,25vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-black text-rose-950">
                  {bouquet.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {bouquet.description}
                </p>
                <p className="mt-4 text-2xl font-black text-rose-600">
                  Tk {bouquet.price}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {bouquet.includedFlowers.map((flower) => (
                    <span
                      className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700"
                      key={flower}
                    >
                      {flower}
                    </span>
                  ))}
                </div>
                <button
                  className="mt-5 w-full rounded-2xl bg-rose-600 px-4 py-3 font-bold text-white transition hover:bg-rose-700"
                  type="button"
                  onClick={() => purchaseBouquet(bouquet._id)}
                >
                  Purchase Instantly
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
