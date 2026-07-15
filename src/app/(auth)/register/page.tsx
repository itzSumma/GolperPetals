"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {hidden ? (
        <>
          <path d="M3 3l18 18" strokeLinecap="round" />
          <path d="M10.6 10.7a2 2 0 002.7 2.7" strokeLinecap="round" />
          <path d="M9.8 5.2A9.8 9.8 0 0112 5c5 0 8.4 4.1 9.4 5.6a2.5 2.5 0 010 2.8 15.2 15.2 0 01-2.2 2.6" strokeLinecap="round" />
          <path d="M6.6 6.7a15.5 15.5 0 00-4 3.9 2.5 2.5 0 000 2.8C3.6 14.9 7 19 12 19a9.7 9.7 0 004.1-.9" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M2.6 10.6C3.6 9.1 7 5 12 5s8.4 4.1 9.4 5.6a2.5 2.5 0 010 2.8C20.4 14.9 17 19 12 19s-8.4-4.1-9.4-5.6a2.5 2.5 0 010-2.8z" />
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        </>
      )}
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = useMemo(() => {
    if (password.length >= 10) {
      return "Strong";
    }

    if (password.length >= 8) {
      return "Good";
    }

    return "Too short";
  }, [password]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (signUpError) {
        throw new Error(signUpError.message || "Registration failed");
      }

      setMessage("Account created. Taking you to login...");
      setTimeout(() => router.push("/login"), 900);
    } catch (registerError) {
      setError(
        registerError instanceof Error ? registerError.message : "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full rounded-[28px] border border-rose-100 bg-white p-7 shadow-2xl shadow-rose-100/80 sm:p-9">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-500">
          Start fresh
        </p>
        <h1 className="mt-3 text-4xl font-black text-rose-950">
          Create Account
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Register once, then login securely with a managed Better Auth session.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-semibold text-gray-800" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3 text-gray-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-800" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3 text-gray-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100"
            placeholder="itzsumma11@gmail.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label
              className="text-sm font-semibold text-gray-800"
              htmlFor="password"
            >
              Password
            </label>
            <span className="text-xs font-bold text-rose-600">
              {password ? passwordStrength : "At least 8 characters"}
            </span>
          </div>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100"
              placeholder="Create a password"
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 transition hover:bg-rose-100 hover:text-rose-700"
              type="button"
              onClick={() => setShowPassword((current) => !current)}
            >
              <EyeIcon hidden={showPassword} />
            </button>
          </div>
        </div>

        {error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-rose-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating account..." : "Register account"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-gray-600">
        Already registered?{" "}
        <Link className="font-bold text-rose-700 hover:text-rose-900" href="/login">
          Login
        </Link>
      </p>
    </section>
  );
}
