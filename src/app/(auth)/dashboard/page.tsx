"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface CustomBouquet {
  _id: string;
  flowers: { name: string; quantity: number }[];
  wrapping: string;
  message?: string;
  createdAt: string;
}

interface Order {
  _id: string;
  bouquetName: string;
  price: number;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [customBouquets, setCustomBouquets] = useState<CustomBouquet[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, router, session]);

  useEffect(() => {
    if (!session) {
      return;
    }

    Promise.all([
      fetch("/api/custom-bouquets").then((response) => response.json()),
      fetch("/api/orders").then((response) => response.json()),
    ]).then(([bouquets, orderHistory]) => {
      setCustomBouquets(Array.isArray(bouquets) ? bouquets : []);
      setOrders(Array.isArray(orderHistory) ? orderHistory : []);
    });
  }, [session]);

  function handleLogout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  }

  if (isPending || !session) {
    return (
      <section className="w-full rounded-[28px] border border-rose-100 bg-white p-8 text-center shadow-2xl shadow-rose-100/80">
        <p className="font-semibold text-gray-700">Loading your account...</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-[28px] border border-rose-100 bg-white p-8 shadow-2xl shadow-rose-100/80">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-500">
        Account dashboard
      </p>
      <h1 className="mt-3 text-4xl font-black text-rose-950">
        Hi, {session.user.name}
      </h1>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        Your session is active. Your custom bouquets and instant orders appear
        here.
      </p>

      <div className="mt-8 space-y-4 rounded-3xl bg-rose-50 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            Email
          </p>
          <p className="mt-1 font-semibold text-gray-900">{session.user.email}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            Member since
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {new Date(session.user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        <div className="rounded-3xl border border-rose-100 p-5">
          <h2 className="text-xl font-black text-rose-950">My Custom Bouquets</h2>
          <div className="mt-4 space-y-3">
            {customBouquets.length ? (
              customBouquets.map((bouquet) => (
                <div key={bouquet._id} className="rounded-2xl bg-rose-50 p-4">
                  <p className="font-bold text-gray-900">{bouquet.wrapping}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {bouquet.flowers
                      .map((flower) => `${flower.name} x${flower.quantity}`)
                      .join(", ")}
                  </p>
                  {bouquet.message ? (
                    <p className="mt-2 text-sm italic text-rose-700">
                      &quot;{bouquet.message}&quot;
                    </p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No custom bouquets yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-rose-100 p-5">
          <h2 className="text-xl font-black text-rose-950">My Instant Orders</h2>
          <div className="mt-4 space-y-3">
            {orders.length ? (
              orders.map((order) => (
                <div key={order._id} className="rounded-2xl bg-rose-50 p-4">
                  <p className="font-bold text-gray-900">{order.bouquetName}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Tk {order.price} ordered on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No instant orders yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          className="flex-1 rounded-2xl bg-rose-600 px-4 py-3 text-center font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700"
          href="/profile"
        >
          View profile
        </Link>
        <button
          className="flex-1 rounded-2xl border border-rose-200 px-4 py-3 font-bold text-rose-700 transition hover:bg-rose-50"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}
