"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type AppointmentFormProps = {
  className?: string;
};

type FormValues = {
  name: string;
  email: string;
  date: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  date: "",
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ className = "" }) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const todayISO = useMemo(() => {
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return localTime.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    if (status !== "success") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStatus("idle");
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [status]);

  const setField = (field: keyof FormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrorMessage(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAllFilled = values.name.trim() && values.email.trim() && values.date.trim();

    if (!isAllFilled) {
      return;
    }

    if (values.date < todayISO) {
      setErrorMessage("Please choose today or a future date.");
      return;
    }

    setErrorMessage(null);
    setStatus("success");
    setValues(INITIAL_VALUES);
  };

  return (
    <div className={`w-full lg:w-2/3 ${className}`.trim()}>
      <div className="rounded-[2.5rem] border border-mano-pale/20 bg-white p-6 shadow-2xl shadow-mano-pale/30 sm:p-8 md:p-10 lg:rounded-[3rem] lg:p-12">
        {status === "success" ? (
          <div
            className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-200 bg-emerald-50/70 text-center"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden="true" />
            <p className="text-lg font-bold text-emerald-700 sm:text-xl">
              Appointment booked successfully
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 sm:mb-8">Request Appointment</h2>

            <form className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-7" onSubmit={handleSubmit}>
              <div className="min-w-0 space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={values.name}
                  onChange={(event) => setField("name", event.target.value)}
                  className="w-full rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 text-slate-700 transition-colors focus:border-mano-primary focus:outline-none"
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
                  required
                  value={values.email}
                  onChange={(event) => setField("email", event.target.value)}
                  className="w-full rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 text-slate-700 transition-colors focus:border-mano-primary focus:outline-none"
                />
              </div>

              <div className="min-w-0 space-y-2 md:col-span-2">
                <label htmlFor="date" className="text-sm font-bold uppercase tracking-wider text-mano-grey">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  min={todayISO}
                  value={values.date}
                  onChange={(event) => setField("date", event.target.value)}
                  className="w-full rounded-xl border border-mano-pale bg-mano-bg/50 px-4 py-3 text-slate-700 transition-colors focus:border-mano-primary focus:outline-none"
                />
                {errorMessage && (
                  <p className="text-sm font-semibold text-red-600" role="alert">
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 rounded-2xl bg-mano-primary py-4 text-base font-bold text-white shadow-xl shadow-mano-primary/30 transition-all hover:bg-mano-accent md:col-span-2 md:mt-3 md:py-5 md:text-lg"
              >
                Send Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;