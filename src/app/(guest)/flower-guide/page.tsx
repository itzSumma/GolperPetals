import Image from "next/image";
import { seedFlowers } from "@/data/seed";

const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Valentine's Day",
  "Graduation",
  "Congratulations",
  "Apology",
  "Sympathy",
  "Mother's Day",
  "Friendship",
];

export default function FlowerGuidePage() {
  return (
    <div className="min-h-screen bg-rose-50/40 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-bold uppercase tracking-[0.3em] text-rose-500">
          Flower Guide
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black text-rose-950">
          Choose the perfect flower for every feeling.
        </h1>

        <div className="mt-10 flex flex-wrap gap-3">
          {occasions.map((occasion) => (
            <span
              className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-bold text-rose-700"
              key={occasion}
            >
              {occasion}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {seedFlowers.map((flower) => (
            <article
              className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-lg shadow-rose-100/70"
              key={flower.name}
            >
              <div className="relative h-64">
                <Image
                  alt={flower.name}
                  className="object-cover"
                  fill
                  src={flower.image}
                  sizes="(max-width:768px)100vw,33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black text-rose-950">
                  {flower.name}
                </h2>
                <p className="mt-2 font-semibold text-rose-600">
                  {flower.meaning}
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {flower.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {flower.occasionTags.map((tag) => (
                    <span
                      className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
