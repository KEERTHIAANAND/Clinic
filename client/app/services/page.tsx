import React from "react";
import Services from "../components/Services";

const ServicesPage: React.FC = () => {
  return (
    <main className="pt-24">
      <section className="bg-mano-primary py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Medical Specialties</h1>
          <p className="text-xl text-mano-pale max-w-2xl mx-auto">
            Comprehensive care solutions designed for your unique health journey.
          </p>
        </div>
      </section>
      <Services />
    </main>
  );
};

export default ServicesPage;