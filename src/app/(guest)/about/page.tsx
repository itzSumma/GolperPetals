export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <section className="mx-auto max-w-5xl">
        <p className="font-bold uppercase tracking-[0.3em] text-rose-500">
          About Us
        </p>
        <h1 className="mt-4 text-5xl font-black leading-tight text-rose-950">
          Handcrafted flowers, fresh stories, meaningful gifting.
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            "Our mission is to make gifting feel personal, thoughtful, and fresh every single time.",
            "We import premium flowers from international suppliers for luxury arrangements.",
            "We collect fresh flowers daily from trusted local farms across Bangladesh.",
            "Every bouquet is handcrafted with care and delivered fresh with a focus on quality.",
          ].map((item) => (
            <div className="rounded-3xl bg-rose-50 p-7" key={item}>
              <p className="text-lg font-semibold leading-8 text-rose-950">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
