"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthUser, getCurrentUser, logoutUser } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => router.push("/login"));
  }, [router]);

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  if (!user) {
    return (
      <section className="w-full rounded-[28px] border border-rose-100 bg-white p-8 text-center shadow-2xl shadow-rose-100/80">
        <p className="font-semibold text-gray-700">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-[28px] border border-rose-100 bg-white p-8 shadow-2xl shadow-rose-100/80">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-500">
        Profile
      </p>
      <h1 className="mt-3 text-4xl font-black text-rose-950">{user.name}</h1>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        This profile was loaded through the protected JWT endpoint.
      </p>

      <dl className="mt-8 space-y-4 rounded-3xl bg-rose-50 p-5">
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            User ID
          </dt>
          <dd className="mt-1 break-all font-semibold text-gray-900">{user.id}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            Email
          </dt>
          <dd className="mt-1 font-semibold text-gray-900">{user.email}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          className="flex-1 rounded-2xl bg-rose-600 px-4 py-3 text-center font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700"
          href="/dashboard"
        >
          Dashboard
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
