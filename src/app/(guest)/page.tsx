"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useState } from "react";
import FlowerCard from "@/components/FlowerCard";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const bannerData = [
    { id: 1, image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=718&auto=format&fit=crop", title: "Some feelings", subtitle: "deserve more than words.", description: "Turn your love into a bouquet and let every petal whisper what your heart has been waiting to say." },
    { id: 2, image: "https://images.unsplash.com/photo-1586799958784-8687bc5d659f?q=80&w=1170&auto=format&fit=crop", title: "Because every", subtitle: "love story deserves flowers.", description: "Celebrate every smile, every apology, every reunion, and every unforgettable moment with blooms that speak from the heart." },
    { id: 3, image: "https://images.unsplash.com/photo-1486102515046-44130769cb25?q=80&w=735&auto=format&fit=crop", title: "Every bouquet", subtitle: "carries a piece of your heart.", description: "Whether it's love, gratitude, or missing someone, express it beautifully with flowers and a heartfelt note." },
  ];

  const products = [
    { id: "1", name: "Velvet Red Roses", description: "Classic red roses arranged for timeless romantic moments.", price: "$45", image: "https://images.unsplash.com/photo-1764160647304-6ab4dcd82d63?q=80&w=880&auto=format&fit=crop", origin: "Local" as const, rating: 4.8, reviews: 128, color: "Red" },
    { id: "2", name: "Crimson Tulips", description: "Elegant tulips with a bold crimson finish and graceful stems.", price: "$50", image: "https://images.unsplash.com/photo-1683303489207-959d0160089e?q=80&w=687&auto=format&fit=crop", origin: "Imported" as const, rating: 4.7, reviews: 86, color: "Crimson" },
    { id: "3", name: "Ruby Lily Bouquet", description: "Rich lily blooms designed for celebrations and heartfelt gifts.", price: "$65", image: "https://images.unsplash.com/photo-1685307298280-a6655309a0bf?q=80&w=706&auto=format&fit=crop", origin: "Imported" as const, rating: 4.6, reviews: 73, color: "Ruby" },
    { id: "4", name: "Royal Orchid Stems", description: "Premium orchid stems with a polished, luxurious look.", price: "$75", image: "https://images.unsplash.com/photo-1534885320675-b08aa131cc5e?q=80&w=735&auto=format&fit=crop", origin: "Imported" as const, rating: 4.9, reviews: 59, color: "Purple" },
    { id: "5", name: "Golden Sunflower Set", description: "Bright sunflowers that bring warmth to any room.", price: "$55", image: "https://images.unsplash.com/photo-1618667066353-06982fc2ea72?q=80&w=687&auto=format&fit=crop", origin: "Local" as const, rating: 4.9, reviews: 214, color: "Yellow" },
    { id: "6", name: "Pure White Peonies", description: "Soft white peonies for refined bouquets and gentle occasions.", price: "$85", image: "https://images.unsplash.com/photo-1622290638053-94ecd31fe6c7?q=80&w=1074&auto=format&fit=crop", origin: "Local" as const, rating: 4.8, reviews: 96, color: "White" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-rose-50/30">
      <section className="relative h-[560px] overflow-hidden md:h-[650px] lg:h-[700px]">
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
              <h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{bannerData[activeIndex].title} <span className="block text-red-300">{bannerData[activeIndex].subtitle}</span></h1>
              <p className="mt-6 max-w-3xl text-base text-gray-100 sm:text-lg lg:text-xl">{bannerData[activeIndex].description}</p>
              <button className="mt-8 rounded-full bg-red-600 px-6 py-3 text-base font-semibold transition hover:bg-red-700 sm:px-8 sm:py-4 sm:text-lg">Create Your Bouquet</button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto w-full relative">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-black text-red-950">Signature Blooms</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {products.map((item) => (
            <FlowerCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-rose-700 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white">Every Gift Begins with a Story</h2>
          <p className="mt-6 text-lg text-red-100 leading-relaxed">Celebrate love, gratitude, birthdays, anniversaries, and every special moment with handcrafted bouquets designed to express what words cannot.</p>
          <button className="mt-10 rounded-full bg-white/40 px-8 py-4 font-semibold text-white transition hover:bg-red-500">Explore All Bouquets</button>
        </div>
      </section>
    </div>
  );
}
