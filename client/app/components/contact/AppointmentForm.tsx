import { ChevronDown } from "lucide-react";

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
            <label htmlFor="date" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 transition-colors focus:border-mano-primary focus:outline-none"
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
