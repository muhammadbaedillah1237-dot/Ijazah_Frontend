import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import bgLogin from "../assets/img/background.jpg";
import logoUika from "../assets/img/Logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (username === "admin" && password === "admin123") {
        const userData = { username, role: "admin", name: "Administrator" };
        await login(userData, "mock-token-123");
        navigate(from, { replace: true });
      } else {
        setError("Username atau password salah");
      }
    } catch (err) {
      setError("Terjadi kesalahan teknis. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-6 overflow-hidden">
      
      {/* ✅ Background */}
      <img
        src={bgLogin}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ✅ Overlay - Sedikit lebih gelap agar card menonjol */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* ✅ Card - Dikecilkan max-widthnya agar proporsional di HP */}
      <div className="
        relative w-full max-w-[360px] 
        bg-white
        rounded-[28px]
        shadow-[0_15px_40px_rgba(0,0,0,0.25)]
        p-7 sm:p-9
        flex flex-col
      ">

        {/* Logo Section - Logo Diperbesar, Jarak diatur ulang */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mb-3 transition-transform hover:scale-105">
            <img
              src={logoUika}
              alt="Logo UIKA"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-[17px] sm:text-xl font-bold text-gray-800 text-center leading-tight">
            Universitas Ibn Khaldun Bogor
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-400 font-bold mt-1 uppercase tracking-[0.1em] text-center">
            Verifikasi & Akses Ijazah Digital
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username */}
          <div className="space-y-1">
            <label className="block text-[13px] font-bold text-gray-600 ml-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="
                w-full px-4 py-2.5
                rounded-xl bg-gray-50 border border-gray-100
                text-gray-900 text-sm
                placeholder:text-gray-300
                focus:ring-2 focus:ring-teal-600/10
                focus:border-[#0d6b5e]
                focus:outline-none transition-all
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-[13px] font-bold text-gray-600 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="
                w-full px-4 py-2.5
                rounded-xl bg-gray-50 border border-gray-100
                text-gray-900 text-sm
                placeholder:text-gray-300
                focus:ring-2 focus:ring-teal-600/10
                focus:border-[#0d6b5e]
                focus:outline-none transition-all
              "
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-500 py-2 px-3 rounded-lg text-[11px] font-semibold border border-red-100 text-center">
              {error}
            </div>
          )}

          {/* Button Masuk */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#0d6b5e] hover:bg-[#0a5248]
              text-white font-bold py-3
              rounded-xl shadow-md active:scale-[0.97]
              transition-all duration-200 text-sm
              mt-2
            "
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;