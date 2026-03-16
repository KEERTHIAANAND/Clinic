import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, Target, ThumbsUp } from "lucide-react";

const REASONS = [
  {
    title: "Evidence-Based Therapy",
    desc: "We use the latest medical research to design your specific treatment plan.",
    icon: Award,
    isPrimary: true,
  },
  {
    title: "Individualized Attention",
    desc: "One-on-one sessions with certified physiotherapists focused on your goals.",
    icon: Target,
    isPrimary: false,
  },
  {
    title: "Modern Rehab Equipment",
    desc: "State-of-the-art facility equipped with the latest healing technologies.",
    icon: ThumbsUp,
    isPrimary: false,
  },
] as const;

const WhyUs: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-0.5 bg-mano-primary" />
                <span className="text-mano-primary font-black uppercase tracking-[0.2em] text-[12px]">
                  Why Choose Mano
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-950">
                Healing People, <br />
                <span className="font-span text-mano-primary">Restoring Movement,</span> <br />Changing Lives
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {REASONS.map((item) => (
                <div
                  key={item.title}
                  className={`group p-8 md:p-10 rounded-[2.5rem] flex items-center gap-8 transition-all duration-500 border ${
                    item.isPrimary
                      ? "bg-mano-primary text-white border-mano-primary shadow-2xl shadow-mano-primary/20"
                      : "bg-white text-slate-900 border-mano-pale/30 hover:border-mano-primary hover:shadow-xl hover:shadow-mano-bg"
                  }`}
                >
                  <div
                    className={`p-5 rounded-2xl shrink-0 transition-transform duration-500 group-hover:scale-110 ${
                      item.isPrimary ? "bg-white/15" : "bg-mano-bg text-mano-primary"
                    }`}
                  >
                    <item.icon size={36} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold tracking-tight">{item.title}</h4>
                    <p
                      className={`text-lg leading-relaxed font-medium ${
                        item.isPrimary ? "text-mano-pale" : "text-mano-grey"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about-us"
              className="inline-flex items-center space-x-3 bg-mano-dark text-white px-10 py-5 rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              <span>Our Recovery Mission</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="lg:w-full order-1 lg:order-2">
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl group border border-mano-pale p-3 bg-white">
              <div className="rounded-[3.25rem] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000"
                  alt="Physical therapy session"
                  width={1000}
                  height={750}
                  className="w-full h-auto transition-transform duration-1500 group-hover:scale-110"
                />
              </div>
              <div className="absolute top-12 left-12 bg-mano-primary/80 backdrop-blur-xl px-8 py-5 rounded-4xl border border-white/20 hidden md:block shadow-2xl">
                <p className="text-white font-black text-xl tracking-tight">Voted #1 Clinic 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
