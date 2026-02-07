import logo from "../assets/seekAyurveda_logo.png";
import {
  FaRegCopyright,
  FaFacebookSquare,
  FaYoutube,
  FaInstagram,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { IoLogoLinkedin, IoMdArrowDropdown } from "react-icons/io";

const Footer = () => {
  const services = [
    { id: 1, title: "Ingredient Scanner", link: "/scanner" },
    { id: 2, title: "Dosha Analysis", link: "/dosha" },
    { id: 3, title: "Food Risk Detection", link: "/risk" },
    { id: 4, title: "Ayurvedic Alternatives", link: "/alternatives" },
  ];

  return (
    <footer className="bg-[#1e4a42] text-white pt-12 pb-6 px-6 md:px-12 w-full font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center gap-3">
            <img
              src={logo}
              alt="Seek Ayurveda Logo"
              className="h-15 md:h-12 w-auto"
            />
            <div className="text-3xl font-bold tracking-tight">
              Seek <span className="text-[#FFE4BB]">Ayurveda</span>
            </div>
          </div>
          <p className="text-[#FFE4BB]/80 text-sm md:text-base italic text-center leading-relaxed">
            “Decode Food. Restore Balance. Live Ayurveda.”
          </p>
          <div className="flex gap-4 text-xl pt-2">
            <FaFacebookSquare className="cursor-pointer hover:text-[#FFE4BB] transition-colors" />
            <FaYoutube className="cursor-pointer hover:text-[#FFE4BB] transition-colors" />
            <FaInstagram className="cursor-pointer hover:text-[#FFE4BB] transition-colors" />
            <IoLogoLinkedin className="cursor-pointer hover:text-[#FFE4BB] transition-colors" />
            <FaSquareXTwitter className="cursor-pointer hover:text-[#FFE4BB] transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0 px-0 md:px-10">
          <div className="flex flex-col items-center md:items-center">
            <div className="w-fit text-left">
              <h4 className="text-[#FFE4BB] font-semibold mb-4 uppercase text-md tracking-widest">
                Company
              </h4>
              <ul className="space-y-2 text-sm md:text-xs lg:text-md text-gray-200">
                <li className="hover:text-[#FFE4BB] cursor-pointer transition-all">
                  Home
                </li>
                <li className="hover:text-[#FFE4BB] cursor-pointer transition-all">
                  About Us
                </li>
                <li className="hover:text-[#FFE4BB] cursor-pointer transition-all">
                  Our Process
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-center">
            <div className="w-fit text-left">
              <h4 className="text-[#FFE4BB] font-semibold mb-4 uppercase text-md tracking-widest">
                Features
              </h4>
              <ul className="space-y-2 text-sm md:text-xs lg:text-md text-gray-200">
                {services.map((s) => (
                  <li
                    key={s.id}
                    className="hover:text-[#FFE4BB] cursor-pointer transition-all"
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <h4 className="text-[#FFE4BB] font-semibold uppercase text-md tracking-widest text-center md:text-left">
            Contact Support
          </h4>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm w-[90%] md:w-full">
            <ul className="space-y-4 text-sm md:text-xs">
              <li className="flex items-center gap-4 group cursor-pointer">
                <span className="bg-[#FFE4BB] text-[#1e4a42] rounded-lg p-1 group-hover:bg-white transition-colors">
                  <BsFillTelephoneFill />
                </span>
                <span className="group-hover:underline">+91 9xxxx xxxxx</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <span className="bg-[#FFE4BB] text-[#1e4a42] rounded-lg p-1 group-hover:bg-white transition-colors">
                  <SiGmail />
                </span>
                <span className="group-hover:underline lg:text-sm">
                  support@seekAyurveda.in
                </span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <span className="bg-[#FFE4BB] text-[#1e4a42] rounded-lg p-1 group-hover:bg-white transition-colors">
                  <FaMapMarkedAlt />
                </span>
                <span className="group-hover:underline">
                  Kota, Rajasthan, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-[#FFE4BB]/60 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <FaRegCopyright />
          <span>2026 Seek Ayurveda | All rights reserved</span>
        </div>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
