"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/flower-guide", label: "Flower Guide" },
  { href: "/bouquet-builder", label: "Bouquet Builder" },
  { href: "/instant-bouquets", label: "Instant Bouquets" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname: string = usePathname();

  function toggleMenu(): void {
    setIsOpen((prev) => !prev);
  }

  function closeMenu(): void {
    setIsOpen(false);
  }

  function renderLink({ href, label }: NavLink, onClick?: () => void) {
    const isActive: boolean = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={`px-4 py-2 text-base font-semibold transition-all duration-500 ease-in-out hover:scale-105 ${
          isActive
            ? "text-red-600 border-b-2 border-red-600"
            : "text-red-900 hover:text-red-600"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="shrink-0 text-3xl font-extrabold tracking-tighter text-rose-700">
          Golper<span className="text-3xl text-red-600">Petals</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => renderLink(link))}
          <Link href="/login">
            <Button className="ml-3 bg-red-600 px-5 py-5 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-lg">
              Sign In
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-2 xl:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-8 bg-red-700 transition-all ${isOpen ? "translate-y-2.5 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-8 bg-red-700 transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-8 bg-red-700 transition-all ${isOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="animate-in slide-in-from-top-5 border-t border-red-100 bg-white xl:hidden">
          <nav className="flex flex-col gap-2 p-6">
            {navLinks.map((link) => renderLink(link, closeMenu))}
            <Link href="/login" onClick={closeMenu} className="mt-4">
              <Button className="w-full bg-red-600 text-white text-lg font-bold py-6">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
