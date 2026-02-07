import React from 'react'
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { MdWbSunny, MdCloud, MdOutlineAcUnit } from "react-icons/md";
import { GoAlertFill, GoCheckCircleFill } from "react-icons/go";
import {
  IoClose,
  IoCameraOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import default_img from "../assets/default.png";
const AyurPantry = () => {
  const [result, setResult] = useState({
    severity: "",
    verdict_text: "Analyze items for Ayurvedic insights",
    analysis: null,
  });

  const [weather] = useState({ temp: 28, condition: "Sunny" });
  const [previewImage, setPreviewImage] = useState(default_img);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState("image");
  const [textInput, setTextInput] = useState("");

  const uploadRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleAnalysis = async (payload, isFormData = false) => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5001/analyze`, payload, {
        headers: {
          "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        },
        timeout: 60000,
      });
      setResult({
        analysis: res.data.analysis,
        verdict_text: res.data.analysis?.conclusion || "Analysis complete",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (temp) => {
    if (temp > 25)
      return <MdWbSunny className="text-yellow-400 drop-shadow-2xl text-5xl md:text-6xl" />;
    if (temp > 15)
      return <MdCloud className="text-blue-200 drop-shadow-2xl text-5xl md:text-6xl" />;
    return <MdOutlineAcUnit className="text-cyan-200 drop-shadow-2xl text-5xl md:text-6xl" />;
  };

  return (
    <div className="min-h-screen bg-[#FFE4BB] flex flex-col items-center font-poppins pb-10">
      <header className="relative flex items-center justify-center bg-[#286459] h-14 w-[94%] max-w-7xl rounded-full px-6 mt-6 shadow-xl z-20">
        <h1 className="text-base md:text-lg text-white font-bold tracking-[0.2em] uppercase italic">
          Ayur Pantry
        </h1>
      </header>

      <main className="w-full max-w-7xl px-4 sm:px-6 md:px-10 mt-10">
        <div className="w-full bg-[#122b27]/85 backdrop-blur-3xl rounded-[3rem] p-6 md:p-12 border border-white/10 shadow-2xl outline outline-1 outline-white/5 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
       
            <section className="lg:col-span-4 flex flex-col">
              <div className="bg-[#2a4d45]/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 flex flex-col h-full shadow-lg">
                <h2 className="text-white font-bold text-xl mb-8 tracking-tight border-b border-white/10 pb-4">Inventory</h2>

                <div className="flex p-1.5 bg-black/20 rounded-2xl mb-8">
                  <button
                    onClick={() => setInputMode("image")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all tracking-widest ${inputMode === "image" ? "bg-white text-[#122b27] shadow-md" : "text-white/40 hover:text-white/70"}`}
                  >IMAGE MODE</button>
                  <button
                    onClick={() => setInputMode("text")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all tracking-widest ${inputMode === "text" ? "bg-white text-[#122b27] shadow-md" : "text-white/40 hover:text-white/70"}`}
                  >TEXT LIST</button>
                </div>

                <div className="flex-grow flex flex-col justify-center">
                  {inputMode === "image" ? (
                    <div className="space-y-6">
                      <div className="relative group aspect-square rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
                        <img src={previewImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Preview" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setCameraOpen(true)} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/15 text-white py-4 rounded-2xl border border-white/10 transition-all font-bold text-[11px] uppercase tracking-widest">
                          <IoCameraOutline size={18} /> Camera
                        </button>
                        <button onClick={() => uploadRef.current.click()} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/15 text-white py-4 rounded-2xl border border-white/10 transition-all font-bold text-[11px] uppercase tracking-widest">
                          <IoCloudUploadOutline size={18} /> Upload
                        </button>
                      </div>
                    </div>
                  ) : (
                    <textarea
                      className="w-full h-full min-h-[300px] bg-black/20 border border-white/10 rounded-2xl p-6 text-white text-sm outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/20 resize-none font-light leading-relaxed scrollbar-hide"
                      placeholder="Enter items e.g. Turmeric, Ginger..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                  )}
                </div>

                {inputMode === "text" && (
                  <button onClick={() => handleAnalysis({ text: textInput })} className="w-full mt-6 bg-[#FFE4BB] text-[#122b27] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl">
                    {loading ? "Analyzing..." : "Analyze Items"}
                  </button>
                )}
              </div>
            </section>

            <section className="lg:col-span-8 flex flex-col gap-8 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
               
                <div className="bg-[#2a4d45]/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 flex justify-between items-center shadow-xl h-full">
                  <div>
                    <p className="text-[#FFE4BB]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Local Climate</p>
                    <h3 className="text-white text-6xl md:text-7xl font-black tracking-tighter leading-none">{weather.temp}°C</h3>
                    <div className="mt-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                      <p className="text-white/80 font-bold text-xs uppercase tracking-widest">{weather.condition}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 shadow-inner">
                    {getWeatherIcon(weather.temp)}
                  </div>
                </div>

           
                <div className="bg-gradient-to-br from-[#122b27] to-[#081a18] rounded-[2.5rem] p-10 flex flex-col justify-center border border-white/10 shadow-xl">
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20 shadow-sm"><GoCheckCircleFill className="text-green-400 text-xl" /></div>
                      <div>
                        <span className="text-white font-black text-[10px] uppercase tracking-widest block mb-1">Favor</span>
                        <p className="text-white/50 text-xs leading-relaxed font-medium">Warm, cooked grains and digestive spices.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 shadow-sm"><GoAlertFill className="text-red-400 text-xl" /></div>
                      <div>
                        <span className="text-white font-black text-[10px] uppercase tracking-widest block mb-1">Limit</span>
                        <p className="text-white/50 text-xs leading-relaxed font-medium">Iced drinks and heavy, cold dairy products.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="bg-[#FFFFC7]/90 backdrop-blur-lg rounded-[3rem] p-10 md:p-12 border border-white/10 flex-grow shadow-2xl relative overflow-hidden flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                  <div className="space-y-2">
                    <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.4em] block">Analysis Core</span>
                    <h3 className="text-black text-4xl md:text-5xl font-bold leading-tight tracking-tight uppercase italic">{result.analysis?.name || "Seasonal Infusion"}</h3>
                  </div>
                  <div className="bg-black text-white px-8 py-4 rounded-3xl font-black text-[11px] tracking-widest shadow-2xl">
                    SAFETY: {result.analysis?.overall_safety_score || "0.0"} / 5.0
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-grow">
                  <div className="space-y-6 flex flex-col justify-center">
                    <div className="bg-black/5 p-8 rounded-[2rem] border-l-4 border-green-600/50">
                      <h4 className="text-black/50 text-[10px] uppercase tracking-widest font-black mb-4">Therapeutic Impact</h4>
                      <p className="text-black/70 text-sm leading-relaxed font-medium">{result.analysis?.pros?.[0] || "Optimizes metabolic fire (Agni) based on environmental data."}</p>
                    </div>
                    <div className="bg-black/5 p-8 rounded-[2rem] border-l-4 border-red-600/50">
                      <h4 className="text-black/50 text-[10px] uppercase tracking-widest font-black mb-4">Cautions</h4>
                      <p className="text-black/70 text-sm leading-relaxed font-medium">{result.analysis?.cons?.[0] || "Avoid if experiencing pitta-related inflammation."}</p>
                    </div>
                  </div>
                  <div className="bg-white/40 p-10 rounded-[2.5rem] border border-black/5 flex flex-col justify-center shadow-inner relative">
                    <h4 className="text-black/30 font-black text-[10px] uppercase tracking-[0.3em] mb-6">Preparation Protocol</h4>
                    <p className="text-black text-[15px] italic leading-relaxed font-medium">
                      "{result.analysis?.conclusion || "Initiate a scan to generate a precise Ayurvedic protocol tailored to your unique biology and current surroundings."}"
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      
      <input type="file" ref={uploadRef} hidden onChange={(e) => {
          const file = e.target.files[0];
          const fd = new FormData();
          fd.append("image", file);
          setPreviewImage(URL.createObjectURL(file));
          handleAnalysis(fd, true);
        }}
      />

   
      {cameraOpen && (
        <div className="fixed inset-0 bg-[#071311]/98 backdrop-blur-2xl z-50 flex items-center justify-center p-6">
          <div className="bg-white/5 border border-white/10 rounded-[4rem] p-4 max-w-md w-full overflow-hidden shadow-2xl">
            <video ref={videoRef} autoPlay playsInline className="w-full aspect-square object-cover rounded-[3.5rem]" onLoadedMetadata={() => videoRef.current.play()} />
            <div className="flex gap-4 p-8">
              <button onClick={() => {
                  const canvas = canvasRef.current;
                  canvas.width = videoRef.current.videoWidth;
                  canvas.height = videoRef.current.videoHeight;
                  canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
                  canvas.toBlob((blob) => {
                    const file = new File([blob], "img.jpg", { type: "image/jpeg" });
                    const fd = new FormData(); fd.append("image", file);
                    setPreviewImage(URL.createObjectURL(file));
                    handleAnalysis(fd, true);
                    setCameraOpen(false);
                  });
                }} className="flex-1 bg-white text-[#122b27] py-5 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95"
              >Capture</button>
              <button onClick={() => setCameraOpen(false)} className="bg-white/10 text-white px-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-all"><IoClose size={28} /></button>
            </div>
            <canvas ref={canvasRef} hidden />
          </div>
        </div>
      )}
    </div>
  );
};

export default AyurPantry



