import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAssessment from "./UserAssessment";
import Sidebar from "../components/Sidebar"; // Adjust path if needed
import { Book, Send, Activity, Smile, Frown } from "lucide-react";

const HealthTracker = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [moodScore, setMoodScore] = useState(7);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  // === 1. AUTHENTICATION CHECK ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If user is NOT logged in, redirect immediately to login page
      navigate("/login");
    }
  }, [navigate]);

  const weeklyData = [
    { day: "M", score: 6 },
    { day: "T", score: 8 },
    { day: "W", score: 5 },
    { day: "T", score: 7 },
    { day: "F", score: 4 },
    { day: "S", score: 8 },
    { day: "S", score: 9 },
  ];

  const getPoints = () => {
    const width = 100;
    const height = 60;
    const gap = width / (weeklyData.length - 1);
    return weeklyData
      .map((d, i) => {
        const x = i * gap;
        const y = height - (d.score / 10) * height;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="flex min-h-screen bg-[#FFE4BB]">
      {/* === 2. SIDEBAR INTEGRATION === */}
      <Sidebar />

      {/* Main Content Wrapper - Added ml-64 to push content right of sidebar */}
      <main className="flex-1 ml-64 flex flex-col items-center pt-8 pb-8 px-6 lg:px-12">
        {/* Header */}
        <header className="mt-20 relative flex items-center justify-between bg-[#286459] h-14 w-full max-w-7xl rounded-full px-5 mb-8 shadow-sm z-20 shrink-0">
          <h1 className="text-lg lg:text-xl text-white poppins font-semibold tracking-wide">
            Health Tracker
          </h1>
          <button
            onClick={() => setShowAssessment(true)}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
          >
            <span className="hidden sm:inline">Take Assessment</span>
            <span className="sm:hidden">Assess</span>
            <Book size={18} />
          </button>
        </header>

        {/* Dashboard Grid */}
        <section className="w-full flex justify-center grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl min-h-[600px]">
            {/* Mood Trends Chart */}
            <div className="w-full rounded-xl bg-white/40 backdrop-blur-md border border-white/50 p-6 flex flex-col shadow-sm min-h-[350px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#286459] font-bold text-lg flex items-center gap-2">
                  <Activity size={20} /> Mood Trends
                </h2>
                <span className="text-xs font-medium bg-[#286459]/10 text-[#286459] px-2 py-1 rounded-full">
                  Last 7 Days
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-end relative pb-6 px-2 min-h-[200px]">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 z-0 pb-6">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="border-b border-black w-full h-full"
                    ></div>
                  ))}
                </div>

                <svg
                  viewBox="0 0 100 60"
                  className="w-full h-full overflow-visible z-10"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#286459" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#286459" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#gradient)"
                    points={`0,60 ${getPoints()} 100,60`}
                  />
                  <polyline
                    fill="none"
                    stroke="#286459"
                    strokeWidth="2"
                    points={getPoints()}
                    vectorEffect="non-scaling-stroke"
                  />
                  {weeklyData.map((d, i) => (
                    <circle
                      key={i}
                      cx={(i * 100) / (weeklyData.length - 1)}
                      cy={60 - (d.score / 10) * 60}
                      r="1.5"
                      fill="#fff"
                      stroke="#286459"
                      strokeWidth="1"
                      className="hover:r-2 transition-all"
                    />
                  ))}
                </svg>

                <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
                  {weeklyData.map((d, i) => (
                    <span key={i}>{d.day}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-[#FFE4BB]/50 rounded-lg text-xs text-[#286459] text-center">
                Your average mood is <strong>7.1/10</strong> this week. Keep it
                up!
              </div>
            </div>

            {/* Daily Check-in */}
            <div className="w-full rounded-xl bg-white/40 backdrop-blur-md border border-white/50 p-6 flex flex-col shadow-sm h-full">
              <h2 className="text-[#286459] font-bold text-lg mb-1">
                Daily Check-in
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                How are you feeling right now?
              </p>

              <div className="flex-1 flex flex-col gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <Frown
                      className={`transition-colors ${moodScore < 4 ? "text-red-500" : "text-gray-400"}`}
                      size={24}
                    />
                    <span className="text-3xl font-bold text-[#286459]">
                      {moodScore}
                    </span>
                    <Smile
                      className={`transition-colors ${moodScore > 7 ? "text-green-600" : "text-gray-400"}`}
                      size={24}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodScore}
                    onChange={(e) => setMoodScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#286459]"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Stressed</span>
                    <span>Neutral</span>
                    <span>Happy</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#286459] block mb-2">
                    Feeling...
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Anxious", "Calm", "Tired", "Energetic", "Focused"].map(
                      (tag) => (
                        <button
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs border border-[#286459]/30 hover:bg-[#286459] hover:text-white transition-colors text-[#286459]"
                        >
                          {tag}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex-1 min-h-[100px]">
                  <label className="text-xs font-semibold text-[#286459] block mb-2">
                    Notes
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Anything on your mind? (Sleep quality, diet, etc.)"
                    className="w-full h-full bg-white/50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#286459] resize-none"
                  />
                </div>
              </div>

              <button className="mt-4 w-full bg-[#286459] hover:bg-[#205047] text-white py-3 rounded-xl font-semibold shadow-md flex justify-center items-center gap-2 transition-all active:scale-95">
                <span>Log Entry</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </section>

        {showAssessment && (
          <UserAssessment onClose={() => setShowAssessment(false)} />
        )}
      </main>
    </div>
  );
};

export default HealthTracker;
