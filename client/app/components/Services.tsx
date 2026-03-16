import React from "react";
import {
  Activity,
  Dumbbell,
  Zap,
  Heart,
  ShieldCheck,
  Microscope,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const Services: React.FC = () => {
  const services = [
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

  return (
    <section className="py-32 bg-mano-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-[2px] bg-mano-primary"></div>
              <span className="text-mano-primary font-black uppercase tracking-[0.2em] text-[12px]">
                Our Specialized Care
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] text-slate-950">
              <span className="font-span">Recovery Solutions</span> <br />
              Tailored To Your Journey
            </h2>
          </div>
          <Link
            href="/services"
            className="group text-mano-primary font-black flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-widest text-sm"
          >
            All Therapy Options <ArrowUpRight size={22} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <Link key={idx} href={service.link} className="group block h-full">
              <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_10px_30px_-15px_rgba(22,169,174,0.1)] border border-mano-pale/20 h-full flex flex-col justify-between hover:shadow-[0_40px_80px_-20px_rgba(22,169,174,0.15)] hover:border-mano-primary transition-all duration-700 hover:-translate-y-3 relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <div className="w-20 h-20 bg-mano-bg text-mano-primary rounded-[1.75rem] flex items-center justify-center group-hover:bg-mano-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-[10deg]">
                    <service.icon size={36} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-mano-grey text-lg leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between group-hover:text-mano-primary transition-colors">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-mano-grey group-hover:text-mano-primary transition-colors">
                    Learn More
                  </span>
                  <div className="w-12 h-12 rounded-full border border-mano-pale flex items-center justify-center group-hover:bg-mano-primary group-hover:text-white group-hover:border-mano-primary transition-all duration-500">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;