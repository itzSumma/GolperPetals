"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const bannerData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=718&auto=format&fit=crop",
      title: "Some feelings",
      subtitle: "deserve more than words.",
      description: "Turn your love into a bouquet and let every petal whisper what your heart has been waiting to say.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1586799958784-8687bc5d659f?q=80&w=1170&auto=format&fit=crop",
      title: "Because every",
      subtitle: "love story deserves flowers.",
      description: "Celebrate every smile, every apology, every reunion, and every unforgettable moment with blooms that speak from the heart.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1486102515046-44130769cb25?q=80&w=735&auto=format&fit=crop",
      title: "Every bouquet",
      subtitle: "carries a piece of your heart.",
      description: "Whether it's love, gratitude, or missing someone, express it beautifully with flowers and a heartfelt note.",
    },
  ];

  const products = [
    { id: 1, name: "Velvet Red Roses", price: "$45", image: "https://images.unsplash.com/photo-1764160647304-6ab4dcd82d63?q=80&w=880&auto=format&fit=crop" },
    { id: 2, name: "Crimson Tulips", price: "$50", image: "https://images.unsplash.com/photo-1683303489207-959d0160089e?q=80&w=687&auto=format&fit=crop" },
    { id: 3, name: "Ruby Lily Bouquet", price: "$65", image: "https://images.unsplash.com/photo-1685307298280-a6655309a0bf?q=80&w=706&auto=format&fit=crop" },
    { id: 4, name: "Royal Orchid Stems", price: "$75", image: "https://images.unsplash.com/photo-1534885320675-b08aa131cc5e?q=80&w=735&auto=format&fit=crop" },
    { id: 5, name: "Golden Sunflower Set", price: "$55", image: "https://images.unsplash.com/photo-1618667066353-06982fc2ea72?q=80&w=687&auto=format&fit=crop" },
    { id: 6, name: "Pure White Peonies", price: "$85", image: "https://images.unsplash.com/photo-1622290638053-94ecd31fe6c7?q=80&w=1074&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-rose-50/30 [perspective:1000px]">
      {/* Hero Banner Section */}
      <section className="relative h-[700px] overflow-hidden">
        <Swiper modules={[Autoplay, EffectFade]} effect="fade" loop speed={1500} autoplay={{ delay: 5000, disableOnInteraction: false }} onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} className="h-full">
          {bannerData.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeInOut" }} className="relative h-full w-full">
                <Image src={item.image} alt="Banner" fill priority className="object-cover brightness-[0.45]" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-white">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }}>
              <h1 className="max-w-5xl text-6xl font-black leading-tight">{bannerData[activeIndex].title} <span className="block text-red-300">{bannerData[activeIndex].subtitle}</span></h1>
              <p className="mt-8 max-w-3xl text-xl text-gray-100">{bannerData[activeIndex].description}</p>
              <button className="mt-10 rounded-full bg-red-600 px-8 py-4 text-lg font-semibold transition hover:bg-red-700">Create Your Bouquet</button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full relative">
        <div className="absolute top-10 left-5 text-5xl opacity-40 animate-bounce">🌸</div>
        <div className="absolute top-20 right-10 text-4xl opacity-30">🌹</div>
        <div className="absolute bottom-40 left-10 text-6xl opacity-30">💐</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-40 animate-pulse">🌷</div>

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-black text-red-950">Signature Blooms</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {products.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -12, scale: 1.03, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.8 }}
              className="group overflow-hidden rounded-[32px] border border-red-100 bg-gradient-to-b from-white to-red-50/50 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-[0_25px_60px_rgba(220,38,38,0.18)]"
            >
              <div className="relative h-80 overflow-hidden rounded-t-[32px]">
                <Image src={item.image} alt={item.name} fill className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" sizes="(max-width:768px)100vw,33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
              <div className="p-7 transition-all duration-500">
                <h3 className="text-2xl font-bold text-[#5A1E26] transition-colors duration-300 group-hover:text-red-700">{item.name}</h3>
                <p className="mt-2 text-2xl font-black text-rose-600 transition-transform duration-300 group-hover:scale-105">{item.price}</p>
                <button className="mt-6 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 py-3 font-semibold text-white transition-all duration-500 hover:scale-[1.02] hover:from-red-600 hover:to-rose-600 hover:shadow-xl hover:shadow-red-300/40">View Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA Section */}
     <section className="bg-rose-700 py-20 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-white">
      Every Gift Begins with a Story
    </h2>

    <p className="mt-6 text-lg text-red-100 leading-relaxed">
      Celebrate love, gratitude, birthdays, anniversaries, and every special
      moment with handcrafted bouquets designed to express what words cannot.
    </p>

    <button className="mt-10 rounded-full bg-white/40 px-8 py-4 font-semibold text-red-900 transition hover:bg-red-500 text-white ">
      Explore All Bouquets
    </button>
  </div>
</section>
    </div>
  );
}