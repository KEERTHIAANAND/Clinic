"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";

// ─── Component ────────────────────────────────────────────────────────────────

const FloatingContact: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-150 flex items-center justify-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ping ring – visible only when collapsed */}
      {!hovered && (
        <div
          className="absolute inset-0 rounded-full bg-clinic-primary animate-ping opacity-20 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <a
        href={PHONE_HREF}
        aria-label={`Call us at ${PHONE_DISPLAY} for injury help`}
        className={[
          "flex items-center gap-4 bg-white",
          "shadow-[0_20px_50px_-12px_rgba(22,169,174,0.3)]",
          "border border-clinic-pale/30 rounded-full",
          "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "overflow-hidden h-16 md:h-20 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-clinic-primary focus-visible:ring-offset-2",
          hovered
            ? "px-5 w-70 md:w-80"
            : "px-0 w-16 md:w-20",
        ].join(" ")}
      >
        {/* Icon bubble */}
        <div
          aria-hidden="true"
          className={[
            "shrink-0 flex items-center justify-center rounded-full",
            "transition-all duration-500",
            hovered
              ? "bg-clinic-bg text-clinic-primary p-3"
              : "bg-clinic-primary text-white w-full h-full",
          ].join(" ")}
        >
          <Phone
            size={hovered ? 28 : 24}
            strokeWidth={2.5}
            className={!hovered ? "animate-pulse" : undefined}
          />
        </div>

        {/* Text */}
        <div
          aria-hidden={!hovered}
          className={[
            "flex flex-col whitespace-nowrap",
            "transition-all duration-500 delay-75",
            hovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4 pointer-events-none",
          ].join(" ")}
        >
          <span className="text-slate-900 font-black text-base md:text-lg tracking-tight leading-none">
            Call For Injury Help
          </span>
          <span className="text-clinic-grey text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mt-1">
            Expert Rehab Support
          </span>
          <span className="text-clinic-primary text-xs font-bold mt-0.5">
            {PHONE_DISPLAY}
          </span>
        </div>
      </a>
    </div>
  );
};

export default FloatingContact;
