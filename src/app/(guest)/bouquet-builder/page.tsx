"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

interface Flower {
  _id: string;
  name: string;
  image: string;
  price: number;
  color: string;
}

const wrappings = [
  "Classic kraft wrap",
  "Blush pink satin",
  "Premium white paper",
  "Festive jute ribbon",
];

export default function BouquetBuilderPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [wrapping, setWrapping] = useState(wrappings[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/flowers")
      .then((response) => response.json())
      .then((data) => setFlowers(Array.isArray(data) ? data : []));
  }, []);

  const selectedFlowers = useMemo(
    () =>
      flowers
        .map((flower) => ({
          flowerId: flower._id,
          name: flower.name,
          quantity: quantities[flower._id] || 0,
          price: flower.price,
        }))
        .filter((flower) => flower.quantity > 0),
    [flowers, quantities]
  );

  const total = selectedFlowers.reduce(
    (sum, flower) => sum + flower.price * flower.quantity,
    0
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving your custom bouquet...");

    const response = await fetch("/api/custom-bouquets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flowers: selectedFlowers,
        wrapping,
        message,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || "Please login before saving your bouquet.");
      return;
    }

    setStatus("Custom bouquet saved to your dashboard.");
    setQuantities({});
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-rose-50/40 px-6 py-16">
      <form className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]" onSubmit={handleSubmit}>
        <section>
          <p className="font-bold uppercase tracking-[0.3em] text-rose-500">
            Build Your Bouquet
          </p>
          <h1 className="mt-4 text-5xl font-black text-rose-950">
            Design a bouquet that says exactly what you mean.
          </h1>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {flowers.map((flower) => (
              <article
                className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-rose-100"
                key={flower._id}
              >
                <div className="relative h-52">
                  <Image
                    alt={flower.name}
                    className="object-cover"
                    fill
                    src={flower.image}
                    sizes="(max-width:768px)100vw,33vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-black text-rose-950">
                    {flower.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-rose-600">
                    {flower.color} - Tk {flower.price}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      className="h-10 w-10 rounded-full bg-rose-100 font-black text-rose-700"
                      type="button"
                      onClick={() =>
                        setQuantities((current) => ({
                          ...current,
                          [flower._id]: Math.max((current[flower._id] || 0) - 1, 0),
                        }))
                      }
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-black">
                      {quantities[flower._id] || 0}
                    </span>
                    <button
                      className="h-10 w-10 rounded-full bg-rose-600 font-black text-white"
                      type="button"
                      onClick={() =>
                        setQuantities((current) => ({
                          ...current,
                          [flower._id]: (current[flower._id] || 0) + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-xl shadow-rose-100 lg:sticky lg:top-28">
          <h2 className="text-2xl font-black text-rose-950">Live Preview</h2>
          <div className="mt-5 space-y-3">
            {selectedFlowers.length ? (
              selectedFlowers.map((flower) => (
                <div className="flex justify-between text-sm" key={flower.flowerId}>
                  <span className="font-semibold text-gray-700">
                    {flower.name} x{flower.quantity}
                  </span>
                  <span className="font-bold text-rose-700">
                    Tk {flower.price * flower.quantity}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">Select flowers to begin.</p>
            )}
          </div>

          <label className="mt-6 block text-sm font-bold text-gray-800">
            Wrapping
            <select
              className="mt-2 w-full rounded-2xl border border-rose-100 px-4 py-3"
              value={wrapping}
              onChange={(event) => setWrapping(event.target.value)}
            >
              {wrappings.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="mt-5 block text-sm font-bold text-gray-800">
            Personalized message
            <textarea
              className="mt-2 min-h-28 w-full rounded-2xl border border-rose-100 px-4 py-3"
              placeholder="Write a short message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          <div className="mt-6 flex items-center justify-between border-t border-rose-100 pt-5">
            <span className="font-bold text-gray-700">Estimated total</span>
            <span className="text-2xl font-black text-rose-700">Tk {total}</span>
          </div>

          {status ? (
            <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">
              {status}
            </p>
          ) : null}

          <button
            className="mt-5 w-full rounded-2xl bg-rose-600 px-5 py-4 font-black text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700"
            type="submit"
          >
            Submit Custom Bouquet
          </button>
        </aside>
      </form>
    </div>
  );
}
