"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
  };

  return (
    <main className="h-screen bg-linear-to-br from-slate-100 via-gray-100 to-zinc-200 p-4 overflow-hidden">
      <div className="flex h-full items-center justify-center">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Login</h1>
            <p className="mt-2 text-sm text-slate-600">Access the admin dashboard</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/15"
                suppressHydrationWarning
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 pr-20 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/15"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-1.5 right-1.5 rounded-lg px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                  suppressHydrationWarning
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-70"
              suppressHydrationWarning
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
