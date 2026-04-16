import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc]">
      <Navbar />
      {/* - w-full: melebar penuh
          - px-6 md:px-10: padding kiri-kanan agar isi dashboard tidak nempel layar
          - py-10: padding atas-bawah
      */}
      <main className="w-full px-6 md:px-10 py-10">
        <div className="w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;