import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Importing the Sidebar we made

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Auth Check: If no token, kick user to login
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Prevent flickering while checking user
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F5F1EE]">
      {/* 2. The Sidebar (Fixed Left) */}
      <Sidebar />
      
      <main className="flex-1 ml-64 pt-28 px-8 md:px-12 pb-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1e4a42]">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              This is your personal dashboard.
            </p>
          </div>

          {/* Account Details Card (Matches your screenshot) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-8">
            <h2 className="text-xl font-bold text-[#1e4a42] mb-6">
              Account Details
            </h2>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
                <span className="font-bold text-gray-800 w-20">Name:</span>
                <span className="text-gray-600 font-medium">{user.name}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
                <span className="font-bold text-gray-800 w-20">Email:</span>
                <span className="text-gray-600 font-medium">{user.email}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;