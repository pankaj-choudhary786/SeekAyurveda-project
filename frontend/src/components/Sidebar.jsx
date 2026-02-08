import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Newspaper, 
  LogOut,
  User,
  LayoutDashboard
} from "lucide-react";

const Sidebar = () => {
  const [servicesOpen, setServicesOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User", role: "User" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-[#3A6258] flex flex-col justify-between border-r border-white/10 font-sans min-h-[calc(100vh-72px)]">
      {/* Navigation Links */}
      <div className="px-4 pt-8 pb-4 flex flex-col gap-2">
        
        {/* Dashboard */}
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
            ${isActive("/dashboard") ? "bg-[#EBE9DE] text-[#3A6258]" : "text-white hover:bg-white/10"}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-lg font-medium">Dashboard</span>
        </Link>

        {/* AyurSaathi */}
        <Link 
          to="/ayursaathi" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
            ${isActive("/ayursaathi") ? "bg-[#EBE9DE] text-[#3A6258]" : "text-white hover:bg-white/10"}`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-lg font-medium">AyurSaathi</span>
        </Link>

        {/* Services Section */}
        <div className="mt-2">
          <button 
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <span className="text-lg font-medium">Services</span>
            </div>
            {servicesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {servicesOpen && (
            <div className="flex flex-col gap-1 mt-1 ml-6 border-l border-white/20 pl-4">
              {[
                { name: "Ayur-Pantry", path: "/ayur-pantry" },
                { name: "Health Tracker", path: "/health-tracker" },
                { name: "Safety Scanner", path: "/safety-scanner" },
                { name: "Vaidya Locator", path: "/vaidya-locator" },
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`block px-3 py-2 rounded-lg text-md transition-all
                    ${isActive(item.path) 
                      ? "text-[#FFE4BB] font-bold bg-white/5" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* News Hub */}
        <Link 
          to="/news-hub" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mt-2
            ${isActive("/news-hub") ? "bg-[#EBE9DE] text-[#3A6258]" : "text-white hover:bg-white/10"}`}
        >
          <Newspaper className="w-5 h-5" />
          <span className="text-lg font-medium">News Hub</span>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="p-4 mb-6">
        <div className="bg-[#F2F0E9] rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-white">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-[#1e1e1e] font-bold text-sm truncate">{user.name}</h4>
              <p className="text-gray-500 text-xs font-medium">User</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors text-sm font-bold"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;