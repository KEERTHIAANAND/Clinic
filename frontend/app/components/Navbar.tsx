"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about-us" },
  { name: "Services", path: "/services" },
  { name: "Insights", path: "/blog" },
  { name: "Contact", path: "/contact" },
] as const;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isHomeDark = pathname === "/" && !scrolled;
  const textColor = isHomeDark ? "text-white" : "text-slate-900";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm py-4"
          : "bg-transparent py-8"
      }`}
      aria-label="Primary navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center" aria-label="Mano Rehabilitation Centre – home">
          <Image
            src="/manoclinicbgrm.png"
            alt="Mano Rehabilitation Centre"
            width={240}
            height={80}
            priority
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled ? "h-8" : "h-10"
            } ${isHomeDark ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center space-x-10" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-clinic-primary ${
                  pathname === link.path ? "text-clinic-primary" : textColor
                }`}
                aria-current={pathname === link.path ? "page" : undefined}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="bg-clinic-primary text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-clinic-accent transition-all duration-300 shadow-xl shadow-clinic-primary/20 active:scale-95"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <Menu className={textColor} size={28} />
        </button>
      </div>

      {/* Mobile menu – full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`lg:hidden fixed inset-0 bg-clinic-dark z-[110] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Overlay header */}
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/manoclinicbgrm.png"
              alt="Mano Rehabilitation Centre"
              width={200}
              height={500}
              className="h-50 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="text-white" size={32} />
          </button>
        </div>

        {/* Overlay links */}
        <nav className="p-8 space-y-8" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block text-3xl font-bold transition-colors hover:text-clinic-primary ${
                pathname === link.path ? "text-clinic-primary" : "text-white"
              }`}
              aria-current={pathname === link.path ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            className="block w-full bg-clinic-primary text-white text-center py-5 rounded-2xl text-xl font-bold hover:bg-clinic-accent transition-colors duration-300 active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Get Help Now
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
