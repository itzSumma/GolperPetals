import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen bg-[#fff7f8] lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden overflow-hidden bg-rose-950 lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1400&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/95 via-rose-900/65 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link className="text-2xl font-black tracking-wide" href="/">
            GolperPetals
          </Link>
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-rose-200">
              Secure account
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight">
              Every bouquet starts with a trusted profile.
            </h1>
            <p className="mt-6 text-lg leading-8 text-rose-50/90">
              Sign in to keep your floral story, orders, and favorite blooms in
              one calm place.
            </p>
          </div>
          <p className="text-sm text-rose-100/80">
            Protected with password hashing and JWT sessions.
          </p>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
