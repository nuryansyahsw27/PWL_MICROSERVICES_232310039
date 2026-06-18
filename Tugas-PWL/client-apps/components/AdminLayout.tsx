"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={
          setMobileOpen
        }
      />

      <div className="lg:ml-64">

        <Navbar
          setMobileOpen={
            setMobileOpen
          }
        />

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}