import React from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { SERVICE_CATALOG } from "../data/services";

const ContactPage: React.FC = () => {
  return (
    <main className="pt-24">
      <section className="bg-mano-bg py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3 space-y-12">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-mano-dark">Contact Mano</h1>
                <p className="text-lg text-mano-grey">
                  Ready to start your journey back to full health? Contact our specialists today.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="bg-mano-primary text-white p-4 rounded-2xl shadow-lg shadow-mano-primary/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-mano-grey text-sm uppercase tracking-widest font-bold">Call Us</p>
                    <p className="text-xl font-bold text-slate-900">123-456-7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-mano-primary text-white p-4 rounded-2xl shadow-lg shadow-mano-primary/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-mano-grey text-sm uppercase tracking-widest font-bold">Email</p>
                    <p className="text-xl font-bold text-slate-900">info@manophysio.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-mano-primary text-white p-4 rounded-2xl shadow-lg shadow-mano-primary/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-mano-grey text-sm uppercase tracking-widest font-bold">Location</p>
                    <p className="text-xl font-bold text-slate-900">456 Recovery Road, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-mano-pale/30 border border-mano-pale/20">
                <h2 className="text-3xl font-bold mb-10 text-slate-900">Request Appointment</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 min-w-0">
                    <label htmlFor="name" className="text-sm font-bold text-mano-grey uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-mano-bg/50 border border-mano-pale rounded-xl px-4 py-3 focus:outline-none focus:border-mano-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <label htmlFor="email" className="text-sm font-bold text-mano-grey uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-mano-bg/50 border border-mano-pale rounded-xl px-4 py-3 focus:outline-none focus:border-mano-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <label htmlFor="service" className="text-sm font-bold text-mano-grey uppercase tracking-wider">
                      Service Needed
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        className="w-full h-11 md:h-12 appearance-none bg-white border-2 border-[#16a9ae]/40 rounded-xl px-3 md:px-4 pr-12 text-sm md:text-base text-[#64748b] font-semibold focus:outline-none focus:border-[#16a9ae] focus:ring-3 focus:ring-[#16a9ae]/20 transition-all"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {SERVICE_CATALOG.map((service) => (
                          <option key={service.key} value={service.key}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-[#16a9ae] flex items-center justify-center">
                        <ChevronDown
                          size={16}
                          className="text-white"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 min-w-0">
                    <label htmlFor="date" className="text-sm font-bold text-mano-grey uppercase tracking-wider">
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full bg-mano-bg/50 border border-mano-pale rounded-xl px-4 py-3 focus:outline-none focus:border-mano-primary transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2 min-w-0">
                    <label htmlFor="condition" className="text-sm font-bold text-mano-grey uppercase tracking-wider">
                      Describe Your Condition
                    </label>
                    <textarea
                      id="condition"
                      placeholder="e.g., knee pain when running..."
                      rows={4}
                      className="w-full bg-mano-bg/50 border border-mano-pale rounded-xl px-4 py-3 focus:outline-none focus:border-mano-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="md:col-span-2 bg-mano-primary text-white py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-mano-accent transition-all shadow-xl shadow-mano-primary/30 mt-4"
                  >
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
