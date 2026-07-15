"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthUser, getCurrentUser, getStoredUser, logoutUser } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [status, setStatus] = useState("Loading your account...");

  useEffect(() => {
    getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);
        setStatus("");
      })
      .catch(() => {
        setStatus("Please login to open your dashboard.");
        router.push("/login");
      });
  }, [router]);

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  if (!user) {
    return (
      <section className="w-full rounded-[28px] border border-rose-100 bg-white p-8 text-center shadow-2xl shadow-rose-100/80">
        <p className="font-semibold text-gray-700">{status}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-[28px] border border-rose-100 bg-white p-8 shadow-2xl shadow-rose-100/80">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-500">
        Account dashboard
      </p>
      <h1 className="mt-3 text-4xl font-black text-rose-950">
        Hi, {user.name}
      </h1>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        Your JWT session is active. You can now keep account features behind a
        protected route.
      </p>

      <div className="mt-8 space-y-4 rounded-3xl bg-rose-50 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            Email
          </p>
          <p className="mt-1 font-semibold text-gray-900">{user.email}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            Member since
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
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
