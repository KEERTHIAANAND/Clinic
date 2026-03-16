import React from "react";
import About from "../components/About";
import WhyUs from "../components/WhyUs";

const CORE_VALUES = [
  {
    title: "Compassion",
    desc: "Treating every patient with kindness, respect, and emotional support.",
  },
  {
    title: "Excellence",
    desc: "Striving for the highest quality in medical diagnostics and treatments.",
  },
  {
    title: "Innovation",
    desc: "Utilizing modern technology to improve patient outcomes and comfort.",
  },
] as const;

const AboutUsPage: React.FC = () => {
  return (
    <main className="pt-24">
      <section className="bg-slate-950 py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Our Medical Care</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Dedicated to improving community health through accessible, high-quality, and compassionate medical services.
          </p>
        </div>
      </section>

      <About />
      <WhyUs />

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {CORE_VALUES.map((value) => (
              <article key={value.title} className="bg-white p-12 rounded-[2.5rem] shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-mano-primary">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
