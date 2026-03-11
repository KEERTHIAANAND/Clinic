"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Activity } from "lucide-react";

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
        <Link href="/" className="flex items-center gap-3 group" aria-label="Mano Rehabilitation Centre – home">
          <div className="bg-clinic-primary p-2 rounded-xl text-white group-hover:rotate-[10deg] transition-transform duration-300">
            <Activity size={28} />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`text-2xl font-black tracking-tighter ${textColor}`}>
              Mano<span className="text-clinic-primary">Rehab</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-clinic-primary/60">
              Physio Centre
            </span>
          </div>
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
          <div className="flex items-center gap-3">
            <div className="bg-clinic-primary p-2 rounded-xl text-white">
              <Activity size={22} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              Mano<span className="text-clinic-primary">Rehab</span>
            </span>
          </div>
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
