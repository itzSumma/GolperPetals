const collectionAreas = [
  "Savar",
  "Jessore",
  "Jashore Flower Farms",
  "Godkhali",
  "Rajshahi",
  "Naogaon",
  "Gazipur",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-rose-50/40 px-6 py-20">
      <section className="mx-auto max-w-6xl">
        <p className="font-bold uppercase tracking-[0.3em] text-rose-500">
          Contact
        </p>
        <h1 className="mt-4 text-5xl font-black text-rose-950">
          Talk to GolperPetals.
        </h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-lg shadow-rose-100">
            <dl className="space-y-6">
              <div>
                <dt className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
                  Address
                </dt>
                <dd className="mt-2 font-semibold text-gray-800">
                  Gulshan Flower Market, Dhaka, Bangladesh
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
                  Phone
                </dt>
                <dd className="mt-2 font-semibold text-gray-800">
                  +880 1711-000000
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
                  Email
                </dt>
                <dd className="mt-2 font-semibold text-gray-800">
                  hello@golperpetals.com
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
                  Business Hours
                </dt>
                <dd className="mt-2 font-semibold text-gray-800">
                  Saturday to Thursday, 9:00 AM - 9:00 PM
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg shadow-rose-100">
            <h2 className="text-2xl font-black text-rose-950">
              Fresh flower collection areas
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {collectionAreas.map((area) => (
                <span
                  className="rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700"
                  key={area}
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-8 flex h-72 items-center justify-center rounded-3xl border border-dashed border-rose-200 bg-rose-50 text-center text-sm font-semibold text-rose-700">
              Google Map can be embedded here when the shop map URL is ready.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
