import React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Dumbbell,
  Heart,
  Microscope,
  ShieldCheck,
  Zap,
} from "lucide-react";

type ServiceItem = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  link: string;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Orthopedic Rehab",
    desc: "Specialized recovery for bone, joint, and muscle surgeries or injuries.",
    icon: Activity,
    link: "/services",
  },
  {
    title: "Sports Injury Clinic",
    desc: "Rapid recovery programs for athletes to return to their peak performance.",
    icon: Dumbbell,
    link: "/services",
  },
  {
    title: "Neurological Physio",
    desc: "Focused care for stroke, Parkinson's, and other nerve-related conditions.",
    icon: Zap,
    link: "/services",
  },
  {
    title: "Geriatric Care",
    desc: "Improve mobility and quality of life for the elderly through gentle therapy.",
    icon: Heart,
    link: "/services",
  },
  {
    title: "Post-Op Recovery",
    desc: "Personalized programs to ensure safe and fast healing after surgery.",
    icon: ShieldCheck,
    link: "/services",
  },
  {
    title: "Pain Management",
    desc: "Advanced techniques to relieve chronic back, neck, and joint pain.",
    icon: Microscope,
    link: "/services",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50" aria-label="Specialized care services">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-0.5 bg-clinic-primary" aria-hidden="true" />
              <span className="text-clinic-primary font-black uppercase tracking-[0.2em] text-[12px]">
                Our Specialized Care
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] text-slate-950 tracking-tight">
              Recovery Solutions
              <br />
              <span className="italic text-clinic-accent">Tailored To Your Journey</span>
            </h1>
          </div>

          <Link
            href="/contact"
            className="group text-clinic-primary font-black flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-widest text-sm"
          >
            Book Appointment <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service) => (
            <Link key={service.title} href={service.link} className="group block h-full">
              <article className="bg-white p-12 rounded-[3.5rem] shadow-[0_10px_30px_-15px_rgba(22,169,174,0.1)] border border-clinic-pale/20 h-full flex flex-col justify-between hover:shadow-[0_40px_80px_-20px_rgba(22,169,174,0.15)] hover:border-clinic-primary transition-all duration-700 hover:-translate-y-3 relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <div className="w-20 h-20 bg-cyan-50 text-clinic-primary rounded-[1.75rem] flex items-center justify-center group-hover:bg-clinic-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-10">
                    <service.icon size={36} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-clinic-grey text-lg leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-between group-hover:text-clinic-primary transition-colors">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-clinic-grey group-hover:text-clinic-primary transition-colors">
                    Learn More
                  </span>
                  <div className="w-12 h-12 rounded-full border border-clinic-pale flex items-center justify-center group-hover:bg-clinic-primary group-hover:text-white group-hover:border-clinic-primary transition-all duration-500">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;