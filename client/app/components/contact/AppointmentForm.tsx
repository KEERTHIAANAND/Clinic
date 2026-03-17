import { ChevronDown } from "lucide-react";
import { SERVICE_CATALOG } from "@/app/data/services";

const AppointmentForm: React.FC = () => {
  return (
    <div className="lg:w-2/3">
      <div className="rounded-[3rem] border border-mano-pale/20 bg-white p-10 shadow-2xl shadow-mano-pale/30 md:p-16">
        <h2 className="mb-10 text-3xl font-bold text-slate-900">Request Appointment</h2>
        <form className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="min-w-0 space-y-2">
            <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 transition-colors focus:border-mano-primary focus:outline-none"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 transition-colors focus:border-mano-primary focus:outline-none"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <label htmlFor="service" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
              Service Needed
            </label>
            <div className="relative">
              <select
                id="service"
                className="h-11 w-full appearance-none rounded-xl border-2 border-[#16a9ae]/40 bg-white px-3 pr-12 text-sm font-semibold text-[#64748b] transition-all focus:border-[#16a9ae] focus:ring-3 focus:ring-[#16a9ae]/20 focus:outline-none md:h-12 md:px-4 md:text-base"
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
              <div className="pointer-events-none absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#16a9ae]">
                <ChevronDown size={16} className="text-white" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="min-w-0 space-y-2">
            <label htmlFor="date" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 transition-colors focus:border-mano-primary focus:outline-none"
            />
          </div>
          <div className="min-w-0 space-y-2 md:col-span-2">
            <label htmlFor="condition" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
              Describe Your Condition
            </label>
            <textarea
              id="condition"
              placeholder="e.g., knee pain when running..."
              rows={4}
              className="w-full resize-none rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 transition-colors focus:border-mano-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 rounded-2xl bg-mano-primary py-4 text-base font-bold text-white shadow-xl shadow-mano-primary/30 transition-all hover:bg-mano-accent md:col-span-2 md:py-5 md:text-lg"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
