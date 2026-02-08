import { MdMenu, MdDashboard, MdLogout } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/seekAyurveda_logo.png";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // 1. Use State for user
  
  const navigate = useNavigate();
  const location = useLocation(); // 2. Get current location
  const dropdownRef = useRef(null);

  // 3. THIS IS THE FIX: Re-check user every time 'location' changes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/");
    // We don't even need window.reload() anymore because the useEffect above will catch the change!
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex justify-center ${
        scrolled ? "bg-[#1e4a42]/95 backdrop-blur-md shadow-lg py-2" : "bg-[#1e4a42] py-3"
      }`}
    >
      <div className="w-[92%] max-w-7xl flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Seek Ayurveda Logo" 
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Seek <span className="text-[#FFE4BB]">Ayurveda</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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
                </Link>
              </li>
            ))}
          </ul>

          {/* === LOGIC: SHOW PROFILE IF USER EXISTS, ELSE LOGIN === */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/10 ring-1 ring-white/30 pl-3 pr-4 py-2 rounded-full hover:bg-[#1e4a42]/80 transition-all focus:outline-none"
              >
                <FaUserCircle className="text-[#FFE4BB] text-xl" />
                <span className="text-white font-medium text-sm max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold uppercase">Signed in as</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <MdDashboard className="text-lg" /> Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <MdLogout className="text-lg" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-white/10 ring ring-white/30 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-[#1e4a42]/50 transition-all"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <IoClose /> : <MdMenu />}
        </button>
      </div>
      
      {/* Mobile Menu Content (Hidden by default) */}
      <div 
        className={`fixed inset-0 top-0 left-0 h-screen w-full bg-[#1e4a42] transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 gap-6">
           {/* Mobile User Info */}
           {user && (
            <div className="flex items-center gap-4 pb-6 border-b border-white/10">
              <div className="h-12 w-12 rounded-full bg-[#FFE4BB] flex items-center justify-center text-[#1e4a42] text-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{user.name}</p>
                <p className="text-white/60 text-sm">{user.email}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-2xl font-semibold text-white/90 hover:text-[#FFE4BB] transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 text-xl font-semibold text-white/90 hover:text-[#FFE4BB] transition-colors"
                onClick={() => setOpen(false)}
              >
                <MdDashboard /> Dashboard
              </Link>
              <button
                className="flex items-center gap-3 text-xl font-semibold text-red-400 hover:text-red-300 transition-colors mt-auto mb-8"
                onClick={handleLogout}
              >
                <MdLogout /> Logout
              </button>
            </>
          ) : (
            <button
              className="mt-8 bg-[#FFE4BB] text-[#1e4a42] w-full py-3.5 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;