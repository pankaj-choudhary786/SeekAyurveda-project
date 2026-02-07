import React, { useState } from "react";
import {
  MdDashboard,
  MdOutlineQrCodeScanner,
  MdHealthAndSafety,
  MdSoupKitchen,
  MdLocationOn,
  MdSettings,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard size={24} /> },
    { name: "Scanner", icon: <MdOutlineQrCodeScanner size={24} /> },
    { name: "Health", icon: <MdHealthAndSafety size={24} /> },
    { name: "Pantry", icon: <MdSoupKitchen size={24} /> },
    { name: "Locator", icon: <MdLocationOn size={24} /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-[#286459] flex flex-col items-center py-8 text-white transition-all duration-300 w-16 md:w-[100px] z-50 border-r border-white/10">
      {/* Logo Section */}
      <div className="mt-15 mb-10 p-2 bg-white/10 rounded-2xl">
        <div className="w-8 h-8 bg-[#FFE4BB] rounded-lg rotate-45 flex items-center justify-center">
          <div className="w-4 h-4 bg-[#286459] rounded-sm -rotate-45" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-8 flex-grow">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex flex-col items-center gap-1 group transition-all ${
              active === item.name
                ? "text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-all ${
                active === item.name
                  ? "bg-white/20 shadow-lg"
                  : "bg-transparent"
              }`}
            >
              {item.icon}
            </div>
            {/* Label: Hidden on mobile, visible and professional on md+ */}
            <span className="hidden md:block text-[10px] font-black uppercase tracking-tighter">
              {item.name}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-3 mt-5">
        <button className="text-white/40 hover:text-white transition-colors">
          <MdSettings size={24} />
        </button>
        <button className="text-red-400 hover:text-red-300 transition-colors">
          <MdLogout size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
