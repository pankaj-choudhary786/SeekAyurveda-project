import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import logo from "../assets/seekAyurveda_logo.png";
import { IoClose } from "react-icons/io5";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 flex justify-center ${
        scrolled ? "bg-[#1e4a42]/95 backdrop-blur-md shadow-lg py-2" : "bg-[#1e4a42] py-3"
      }`}
    >
      <div className="w-[92%] max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Seek Ayurveda Logo" 
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain group-hover:scale-102 transition-transform" 
          />
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Seek <span className="text-[#FFE4BB]">Ayurveda</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors hover:text-[#FFE4BB] ${
                    location.pathname === link.path ? "text-[#FFE4BB]" : "text-white/90"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FFE4BB] rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="bg-white/10 ring ring-white/30 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md hover:bg-[#1e4a42]/50 transition-all active:scale-95"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </nav>

        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <IoClose /> : <MdMenu />}
        </button>
      </div>

      <div 
        className={`fixed inset-0 top-0 left-0 h-screen w-full bg-[#1e4a42] transform transition-transform duration-500 ease-in-out z-[-1] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-2xl font-semibold text-white active:text-[#FFE4BB]"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            className="mt-4 bg-[#FFE4BB] text-[#1e4a42] py-2.5 rounded-xl font-bold text-xl hover:scale-101 transition-all duration-300 ease-in-out"
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
          >
            Get Started
          </button>
          
          <div className="mt-auto mb-10 text-center">
            <p className="text-white/40 text-sm">© 2026 Seek Ayurveda. All rights reserved.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
