import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Star, ArrowRight } from "lucide-react";

const PATIENT_SEEDS = [61, 62, 63, 64];

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] bg-[#0d2222] overflow-hidden flex items-center pt-32 pb-20">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-clinic-primary/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-clinic-accent/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── Left – Copy ── */}
          <div className="space-y-12 max-w-2xl">
            <div className="space-y-8">
              {/* Eye-brow label */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-[2px] bg-clinic-primary" />
                <span className="text-clinic-primary uppercase tracking-[0.2em] font-black text-[12px]">
                  Mano Rehabilitation Centre
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-6xl md:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight">
                Restore Your <br /> Body&apos;s{" "}
                <span className="italic text-clinic-pale">Natural Flow</span>
              </h1>

              {/* Sub-heading */}
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
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
                />
              </Link>

              {/* Social proof */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center -space-x-4">
                  {PATIENT_SEEDS.map((seed) => (
                    <Image
                      key={seed}
                      src={`https://picsum.photos/seed/${seed}/100/100`}
                      width={56}
                      height={56}
                      className="rounded-full border-[4px] border-[#0d2222] object-cover ring-1 ring-white/10"
                      alt={`Recovered patient ${seed}`}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center text-clinic-pale mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                    <span className="ml-2 text-white font-black text-sm">4.9</span>
                  </div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-black">
                    500+ Recovered Patients
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right – Image ── */}
          <div className="relative lg:pl-10">
            {/* Hero image card */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10 group bg-clinic-dark">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                alt="Physiotherapy Treatment"
                width={1000}
                height={667}
                priority
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 opacity-90"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2222]/60 to-transparent" />
            </div>

            {/* Floating call-to-action card */}
            <div className="absolute -bottom-10 -left-6 md:bottom-12 md:-left-12 bg-white p-8 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(22,169,174,0.15)] z-20 flex items-center space-x-5 animate-float border border-clinic-pale/20">
              <div className="bg-clinic-bg p-4 rounded-2xl text-clinic-primary">
                <Phone size={28} />
              </div>
              <div>
                <h4 className="text-slate-950 font-black text-xl tracking-tight">
                  Call For Injury Help
                </h4>
                <p className="text-clinic-grey text-sm font-bold uppercase tracking-wider">
                  Expert Rehab Support
                </p>
              </div>
            </div>

            {/* Decorative orbit ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-white/5 rounded-full pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
