import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Star, ArrowRight } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PATIENT_SEEDS = [61, 62, 63, 64] as const;

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=1000",
  alt: "Physiotherapist providing hands-on rehabilitation treatment",
  width: 1000,
  height: 1250, // 4:5 portrait ratio
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-[80vh] bg-[#0d2222] overflow-hidden flex items-center pt-28 pb-16"
      aria-label="Hero – Mano Rehabilitation Centre"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-clinic-primary/10 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-clinic-accent/5 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left – Copy ── */}
          <div className="space-y-10 max-w-2xl">
            <div className="space-y-6">

              {/* Eye-brow label */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-[2px] bg-clinic-primary" aria-hidden="true" />
                <span className="text-clinic-primary uppercase tracking-[0.2em] font-black text-[12px]">
                  Mano Rehabilitation Centre
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-[5rem] font-bold text-white leading-[1.05] tracking-tight">
                Restore Your <br /> Body&apos;s{" "}
                <span className="italic text-clinic-pale">Natural Flow</span>
              </h1>

              {/* Sub-copy */}
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                Expert physiotherapy and rehabilitation services designed to
                heal injuries, reduce pain, and improve mobility for a
                healthier life.
              </p>
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link
                href="/contact"
                className="group w-full sm:w-auto bg-clinic-primary text-white px-10 py-5 rounded-full font-bold flex items-center justify-center space-x-3 hover:bg-clinic-accent transition-all duration-300 shadow-2xl shadow-clinic-primary/20 active:scale-95"
              >
                <span>Book Free Consult</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                />
              </Link>

              {/* Social proof */}
              <div className="flex items-center space-x-4" aria-label="Rated 4.9 by 500+ recovered patients">
                <div className="flex items-center -space-x-4" aria-hidden="true">
                  {PATIENT_SEEDS.map((seed) => (
                    <Image
                      key={seed}
                      src={`https://picsum.photos/seed/${seed}/100/100`}
                      width={48}
                      height={48}
                      className="rounded-full border-[3px] border-[#0d2222] object-cover ring-1 ring-white/10"
                      alt=""
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center text-clinic-pale mb-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                    <span className="ml-2 text-white font-black text-xs">4.9</span>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black whitespace-nowrap">
                    500+ Recovered Patients
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right – Image ── */}
          <div className="relative">
            {/* Hero image card – portrait 4:5, max-constrained */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10 group bg-clinic-dark aspect-[4/5] max-h-[580px] w-full max-w-[480px] ml-auto">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                priority
                className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-[2000ms] opacity-90"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0d2222]/60 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            
            {/* Decorative orbit ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-white/5 rounded-full pointer-events-none"
              aria-hidden="true"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
