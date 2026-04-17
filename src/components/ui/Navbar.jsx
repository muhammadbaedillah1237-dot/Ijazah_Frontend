import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/img/Logo.jpg";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-semibold transition ${
      isActive ? "text-[#27AE60]" : "text-gray-500"
    }`;

  const activeLine = ({ isActive }) =>
    isActive
      ? "after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[3px] after:bg-[#27AE60]"
      : "";

  return (
    <div className="w-full bg-white shadow px-6 py-3 flex items-center justify-between">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 select-none cursor-default">
        <img src={logo} alt="Logo UIKA" className="w-12 h-12 object-contain" />
        <div className="leading-tight">
          <div className="text-black font-semibold text-sm">Universitas</div>
          <div className="text-[#0D6360] font-bold text-sm">
            Ibn Khaldun Bogor
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex gap-7">
        <NavLink to="/dashboard" className={(p) => linkClass(p) + " " + activeLine(p)}>
          Dashboard
        </NavLink>

        <NavLink to="/template" className={(p) => linkClass(p) + " " + activeLine(p)}>
          Template
        </NavLink>

        <NavLink to="/data-mahasiswa" className={(p) => linkClass(p) + " " + activeLine(p)}>
          Data Mahasiswa
        </NavLink>
<NavLink to="/daftar-unit" className={(p) => linkClass(p) + " " + activeLine(p)}>
          Daftar Unit
        </NavLink>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-gray-500"
        >
          Manajemen User
        </button>
      </div>

      {/* PROFILE */}
      <div className="relative flex items-center gap-3">
        
        <div className="text-right leading-tight">
          <div className="text-sm font-semibold text-gray-800">Admin</div>
          <div className="text-xs text-gray-500">Sistem</div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer hover:bg-gray-100"
        >
          <FiUser size={20} />
        </div>

        {open && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-32 py-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;