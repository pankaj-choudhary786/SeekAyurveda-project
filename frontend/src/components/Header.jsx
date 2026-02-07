import { MdMenu } from "react-icons/md";
import { useState } from "react";
import logo from "../assets/seekAyurveda_logo.png";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full flex justify-center bg-[#286459]/95 p-1">
      <div className="w-[90%] flex items-center justify-between h-14">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Seek Ayurveda Logo" className="h-12 w-12" />
          <span className="text-xl sm:text-2xl font-semibold text-[#FFE4BB] poppins">
            Seek Ayurveda
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-white poppins">
          <a href="/" className="hover:text-[#FFE4BB] transition">
            Home
          </a>
          <a href="/about" className="hover:text-[#FFE4BB] transition">
            About Us
          </a>
          <a href="/contact" className="hover:text-[#FFE4BB] transition">
            Contact Us
          </a>

          <button className="bg-[#FFE4BB] text-[#286459] px-4 py-1.5 rounded-full font-semibold hover:bg-[#f5d9a6] transition">
            Login
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block text-white transition-transform duration-300 ease-in-out ${open ? "rotate-90" : "rotate-0"}`}
          >
            {!open ? <MdMenu /> : <IoClose />}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-14 w-full bg-[#286459] flex flex-col items-center gap-5 py-6 md:hidden z-10 text-xl inter font-medium">
          <a
            href="/"
            className="text-white hover:text-[#FFE4BB]"
            onClick={() => setOpen(false)}
          >
            Home
          </a>
          <a
            href="/about"
            className="text-white hover:text-[#FFE4BB]"
            onClick={() => setOpen(false)}
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-white hover:text-[#FFE4BB]"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </a>

          <a
            href="/login"
            className="text-white hover:text-[#FFE4BB]"
            onClick={() => setOpen(false)}
          >
            Login
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
