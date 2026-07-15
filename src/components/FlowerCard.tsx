"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface FlowerCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: string | number;
    image: string;
    origin: "Local" | "Imported"; // দেশি না ইমপোর্টেড চেক করার জন্য
    rating: number;
    reviews: number;
    color: string;
  };
}

export default function FlowerCard({ item }: FlowerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.8 }}
      className="group overflow-hidden rounded-[32px] border border-red-100 bg-gradient-to-b from-white to-red-50/50 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-[0_25px_60px_rgba(220,38,38,0.18)]"
    >
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden rounded-t-[32px]">
        {/* Badge: New & Origin */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">New</span>
          <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-md ${item.origin === 'Local' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
            {item.origin}
          </span>
        </div>

        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" 
          sizes="(max-width:768px)100vw,33vw" 
        />
      </div>

      {/* Info Section */}
      <div className="p-7 transition-all duration-500">
        <h3 className="text-2xl font-bold text-[#5A1E26]">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <span className="text-lg">🌿</span> {item.origin === 'Local' ? 'Fresh Today' : 'Premium Imported'}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-lg">⭐</span> {item.rating} ({item.reviews} Reviews)
          </p>
          <p className="font-medium">Color: <span className="font-bold">{item.color}</span></p>
        </div>

        <p className="mt-5 text-2xl font-black text-rose-600">৳{item.price} / Stem</p>
        
        <button className="mt-6 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 py-3 font-semibold text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-300/40">
          View Details
        </button>
      </div>
    </motion.div>
  );
}