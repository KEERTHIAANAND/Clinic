"use client";

import { usePathname } from "next/navigation";
import { FloatingContact, Footer, Navbar } from "./index";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingContact />}
    </>
  );
}
