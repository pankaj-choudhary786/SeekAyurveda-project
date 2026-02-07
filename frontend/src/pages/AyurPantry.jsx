import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { MdWbSunny, MdCloud, MdOutlineAcUnit, MdLocationOn } from "react-icons/md";
import { GoAlertFill, GoCheckCircleFill, GoTrophy } from "react-icons/go";
import { IoClose, IoCameraOutline, IoCloudUploadOutline } from "react-icons/io5";
import default_img from "../assets/default.png";

const AyurPantry = () => {
  const [result, setResult] = useState({
    analysis: null,
    weather: { temp: "--", condition: "Waiting", season: "Loading", city: "Detecting..." }
  });
  const [previewImage, setPreviewImage] = useState(default_img);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState("image");
  const [textInput, setTextInput] = useState("");
  const uploadRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleAnalysis = async (imageFile = null) => {
    setLoading(true);
    const runAnalysis = async (latitude, longitude) => {
      const formData = new FormData();
      if (imageFile) formData.append('image', imageFile);
      if (textInput && inputMode === "text") formData.append('text', textInput);
      formData.append('lat', latitude);
      formData.append('lon', longitude);
      try {
        const res = await axios.post('http://localhost:5001/analyze', formData);
        setResult({ analysis: res.data.top_recipe, weather: res.data.weather_info });
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => runAnalysis(pos.coords.latitude, pos.coords.longitude),
        () => runAnalysis(26.4499, 75.8175)
      );
    } else { runAnalysis(26.4499, 75.8175); }
  };

  return (
    <div className="min-h-screen bg-[#FFE4BB] flex flex-col items-center font-poppins pb-10">
      <header className="relative flex items-center justify-center bg-[#286459] h-14 w-[94%] max-w-7xl rounded-full px-6 mt-6 shadow-xl z-20 text-white font-bold tracking-[0.2em] uppercase italic">
        Ayur Pantry AI
      </header>

      <main className="w-full max-w-7xl px-4 mt-10">
        <div className="w-full bg-[#122b27]/85 backdrop-blur-3xl rounded-[3rem] p-6 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* SCANNER SECTION */}
            <section className="lg:col-span-4 flex flex-col">
              <div className="bg-[#2a4d45]/40 rounded-[2.5rem] p-8 border border-white/10 flex flex-col h-full shadow-lg">
                <h2 className="text-white font-bold text-xl mb-8 border-b border-white/10 pb-4">Ingredients Scan</h2>
                <div className="flex p-1.5 bg-black/20 rounded-2xl mb-8">
                  <button onClick={() => setInputMode("image")} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${inputMode === "image" ? "bg-white text-[#122b27]" : "text-white/40"}`}>IMAGE MODE</button>
                  <button onClick={() => setInputMode("text")} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${inputMode === "text" ? "bg-white text-[#122b27]" : "text-white/40"}`}>TEXT LIST</button>
                </div>
                <div className="flex-grow">
                  {inputMode === "image" ? (
                    <div className="space-y-6">
                      <div className="relative aspect-square rounded-[1.5rem] overflow-hidden border border-white/10 bg-black/20">
                        <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                        {loading && <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-[10px] font-black animate-pulse">ANALYZING...</div>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setCameraOpen(true)} className="bg-white/5 text-white py-4 rounded-2xl border border-white/10 font-bold text-[11px] uppercase tracking-widest hover:bg-white/10">Camera</button>
                        <button onClick={() => uploadRef.current.click()} className="bg-white/5 text-white py-4 rounded-2xl border border-white/10 font-bold text-[11px] uppercase tracking-widest hover:bg-white/10">Upload</button>
                      </div>
                    </div>
                  ) : (
                    <textarea className="w-full h-[250px] bg-black/20 border border-white/10 rounded-2xl p-6 text-white text-sm outline-none" placeholder="Ginger, Honey, Turmeric..." value={textInput} onChange={(e) => setTextInput(e.target.value)} />
                  )}
                </div>
                <button disabled={loading} onClick={() => handleAnalysis()} className="w-full mt-6 bg-[#FFE4BB] text-[#122b27] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#ffd99d]">
                  {loading ? "Processing..." : "Find Best Match"}
                </button>
              </div>
            </section>

            {/* DATA SECTION */}
            <section className="lg:col-span-8 flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Weather Card */}
                <div className="bg-[#2a4d45]/40 rounded-[2.5rem] p-10 border border-white/10 flex justify-between items-center shadow-xl">
                  <div>
                    <p className="text-[#FFE4BB]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><MdLocationOn /> {result.weather?.city}</p>
                    <h3 className="text-white text-6xl font-black tracking-tighter">{result.weather?.temp}°C</h3>
                    <p className="text-white/80 font-bold text-xs uppercase mt-4 tracking-widest">{result.weather?.condition} • {result.weather?.season}</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-[2rem] text-6xl text-yellow-400"><MdWbSunny /></div>
                </div>

                {/* Score Card */}
                <div className="bg-[#FFE4BB] rounded-[2.5rem] p-10 flex flex-col items-center justify-center border-4 border-[#243d37] shadow-2xl">
                  <p className="text-[#243d37]/50 text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-center">COMPATIBILITY SCORE</p>
                  <h3 className="text-[#122b27] text-7xl font-black tracking-tighter">{result.analysis ? Math.round(result.analysis.score * 100) : "0"}<span className="text-2xl">%</span></h3>
                  <div className="mt-4 px-6 py-2 bg-[#243d37] text-[#FFE4BB] rounded-full text-[10px] font-black uppercase tracking-widest">Agni Balance</div>
                </div>
              </div>

              {/* Protocol Display - UPDATED FOR 3 BOXES */}
              <div className="bg-[#FFFFC7]/90 rounded-[3rem] p-10 md:p-12 border border-white/10 shadow-2xl flex-grow">
                <div className="mb-10">
                  <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">Ayurvedic Protocol</span>
                  <h3 className="text-black text-4xl font-bold uppercase italic leading-tight">{result.analysis?.title || "Waiting for Scan"}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* BOX 1: WHAT WE FOUND (THE MATCHES) */}
                  <div className="bg-black/5 p-6 rounded-[2rem] border-l-4 border-blue-600/50">
                    <h4 className="text-black/50 text-[10px] uppercase font-black mb-4 flex items-center gap-2"><GoTrophy /> Detected in Recipe</h4>
                    <p className="text-black/70 text-xs font-bold leading-relaxed">
                      {result.analysis?.have?.length > 0 ? result.analysis.have.join(", ") : "No matches detected yet."}
                    </p>
                  </div>

                  {/* BOX 2: WHY IT'S GOOD */}
                  <div className="bg-black/5 p-6 rounded-[2rem] border-l-4 border-green-600/50">
                    <h4 className="text-black/50 text-[10px] uppercase font-black mb-4 flex items-center gap-2"><GoCheckCircleFill /> Why it's good</h4>
                    <p className="text-black/70 text-xs font-medium leading-relaxed">
                      {result.analysis ? `Corrects imbalances for ${result.weather.season}.` : "Scan to see impact."}
                    </p>
                  </div>

                  {/* BOX 3: MISSING */}
                  <div className="bg-black/5 p-6 rounded-[2rem] border-l-4 border-red-600/50">
                    <h4 className="text-black/50 text-[10px] uppercase font-black mb-4 flex items-center gap-2"><GoAlertFill /> Missing Items</h4>
                    <p className="text-black/70 text-xs font-medium leading-relaxed">
                      {result.analysis?.missing?.length > 0 ? result.analysis.missing.join(", ") : "All items found!"}
                    </p>
                  </div>
                </div>

                {/* Preparation Steps Box */}
                <div className="bg-white/40 p-10 mt-8 rounded-[2.5rem] border border-black/5">
                  <h4 className="text-black/30 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Preparation Protocol</h4>
                  <p className="text-black text-[15px] italic leading-relaxed font-medium">
                    {result.analysis?.method || "Please scan your pantry to unlock tailored steps."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <input type="file" ref={uploadRef} hidden accept="image/*" onChange={(e) => {
        if (!e.target.files[0]) return;
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        handleAnalysis(e.target.files[0]);
      }} />

      {cameraOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6">
          <div className="bg-white/5 border border-white/10 rounded-[4rem] p-4 max-w-md w-full relative">
            <video ref={videoRef} autoPlay playsInline className="w-full aspect-square object-cover rounded-[3.5rem]" />
            <div className="flex gap-4 p-8">
              <button onClick={() => {
                const canvas = document.createElement("canvas");
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
                canvas.toBlob((blob) => {
                  setPreviewImage(URL.createObjectURL(blob));
                  handleAnalysis(blob);
                  setCameraOpen(false);
                }, "image/jpeg", 0.95);
              }} className="flex-1 bg-white text-[#122b27] py-5 rounded-3xl font-black uppercase text-xs tracking-widest">Capture & Scan</button>
              <button onClick={() => setCameraOpen(false)} className="bg-white/10 text-white px-8 rounded-3xl border border-white/10 flex items-center justify-center"><IoClose size={28} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AyurPantry;
