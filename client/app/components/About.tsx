import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

const STATS = [
  { label: "Medical Professionals", value: "150+" },
  { label: "Patients Treated", value: "27K+" },
  { label: "Emergency Available", value: "24/7" },
  { label: "Years Serving", value: "20+" },
] as const;

const FEATURES = [
  "Holistic Patient-First Approach",
  "State-of-the-art Medical Lab",
  "Experienced Specialty Doctors",
  "Community Health Initiatives",
] as const;

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative group">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-4/5 md:aspect-square relative">
              <Image
                src="https://cdn.prod.website-files.com/68835c95b96643953b32a647/6883b7190761b721ff5c6298_pexels-tima-miroshnichenko-5452209.avif"
                alt="Doctor consulting a patient"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Play clinic introduction video"
                  className="bg-white/90 backdrop-blur p-6 rounded-full text-mano-primary shadow-2xl hover:bg-white transition-all transform hover:scale-110"
                >
                  <Play size={32} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-slate-900" />
                <span className="text-slate-900 uppercase tracking-widest font-bold text-sm">
                  About Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Delivering <span className="font-span text-mano-primary">Medical Excellence</span> With A Personal Touch
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                At Alevia, we&apos;ve been providing compassionate, patient-centered care since 2005.
                From general health check-ups to specialized treatments, our experienced medical team
                is committed to delivering high-quality services in a welcoming environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-start space-x-3">
                  <CheckCircle2 className="text-mano-primary shrink-0" size={24} />
                  <p className="font-medium text-slate-700">{feature}</p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link
                href="/about-us"
                className="inline-flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all"
              >
                <span>Meet Our Team</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-50 p-8 rounded-3xl text-center space-y-2 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <h3 className="text-4xl font-bold text-mano-primary">{stat.value}</h3>
              <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
