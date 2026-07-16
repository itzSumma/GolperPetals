"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Flowers" },
      { href: "/bouquet-builder", label: "Bouquet Builder" },
      { href: "/instant-bouquets", label: "Instant Bouquets" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping Info" },
    ],
  },
];

export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-red-100 bg-white pt-16 pb-8">
      <div className="absolute inset-0 bg-[radial-gradient(#fecdd3_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-20" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <Link href="/" className="text-3xl font-extrabold text-red-600 tracking-tighter">
              Golper<span className="text-rose-700 text-3xl hover:text-black/45 transition-colors">Petals</span>
            </Link>
            <p className="text-gray-800 leading-relaxed max-w-xs text-md font-medium hover:text-black/45 transition-colors">
              Even when life keeps you busy, your love deserves to be felt. Create a bouquet that carries your heart, and let every bloom say what words cannot.
            </p>
            
            <div className="mt-6 overflow-hidden border-t border-red-100 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-900">
                  Owner
                </p>
                <p className="mt-1 text-lg font-semibold italic text-rose-600">
                  Sharmin Sultana Summa
                </p>
              </motion.div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-md font-black text-gray-900 uppercase tracking-widest mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-red-100 pt-8">
          <p className="text-base text-zinc-500 font-medium">
            © {currentYear} GolperPetals. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-base text-zinc-500 hover:text-red-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-base text-zinc-500 hover:text-red-600 transition-colors font-medium">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
