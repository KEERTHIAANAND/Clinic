import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const SERVICES = [
  "Orthopedic Rehab",
  "Sports Injury",
  "Geriatric Care",
  "Post-Op Recovery",
  "Neurological Physio",
] as const;

const SOCIAL_LINKS = [
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com", label: "GitHub" },
] as const;

const HOURS = [
  { day: "Mon – Fri", time: "8:00 AM – 8:00 PM", highlight: false },
  { day: "Saturday", time: "9:00 AM – 4:00 PM", highlight: false },
  { day: "Sunday", time: "Emergency Only", highlight: true },
] as const;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-clinic-dark text-white pt-24 pb-12 overflow-hidden relative">
      {/* Top divider gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* ── Brand column ── */}
          <div className="space-y-6">
            <Link href="/" aria-label="Mano Rehabilitation Centre – home">
              <Image
                src="/manoclinicbgrm.png"
                alt="Mano Rehabilitation Centre"
                width={180}
                height={60}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Restoring movement and improving quality of life through expert-led
              physical rehabilitation and personalised care.
            </p>

            <div className="flex space-x-4 pt-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-clinic-primary hover:text-white hover:border-clinic-primary transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Services column ── */}
          <div>
            <h4 className="text-xl font-bold mb-8 tracking-tight text-white">
              Our Services
            </h4>
            <ul className="space-y-4" role="list">
              {SERVICES.map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-clinic-pale text-lg font-medium transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-clinic-primary mr-0 group-hover:mr-3 transition-all duration-300 shrink-0" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h4 className="text-xl font-bold mb-8 tracking-tight text-white">
              Reach Us
            </h4>
            <ul className="space-y-6" role="list">
              <li className="flex items-start gap-4">
                <MapPin className="text-clinic-primary shrink-0 mt-0.5" size={20} aria-hidden="true" />
                <address className="text-slate-400 font-medium not-italic">
                  456 Recovery Road, Central District,<br />New York 10001
                </address>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-clinic-primary shrink-0" size={20} aria-hidden="true" />
                <a
                  href="tel:+11234567890"
                  className="text-slate-400 font-medium hover:text-clinic-pale transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-clinic-primary shrink-0" size={20} aria-hidden="true" />
                <a
                  href="mailto:contact@manophysio.com"
                  className="text-slate-400 font-medium hover:text-clinic-pale transition-colors"
                >
                  contact@manophysio.com
                </a>
              </li>
            </ul>
          </div>

          {/* ── Hours column ── */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold tracking-tight text-white">
              Clinic Hours
            </h4>
            <div className="space-y-3 bg-white/5 p-6 rounded-3xl border border-white/5">
              {HOURS.map(({ day, time, highlight }) => (
                <div key={day} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    {day}
                  </span>
                  <span
                    className={`font-bold ${
                      highlight
                        ? "text-rose-400 uppercase tracking-widest text-[10px]"
                        : "text-clinic-pale"
                    }`}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-medium tracking-tight text-sm">
            © {currentYear} Mano Rehabilitation Centre. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex space-x-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
