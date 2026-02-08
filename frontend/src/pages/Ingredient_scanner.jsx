import { MdMenu } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

import Button from "../components/Button";
import critical from "../assets/critical.png";
import default_img from "../assets/default.png";

const IngredientScanner = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const [result, setResult] = useState({
    severity: "",
    verdict_text: "Scan a product to see analysis",
    better_alternative: "",
    dosha_summary: {},
    harmful_ingredients: [],
    analysis: null,
  });

  const [previewImage, setPreviewImage] = useState(default_img);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState("image");
  const [textInput, setTextInput] = useState("");

  const uploadRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
 
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => { 
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
      // Camera stream cleanup (if component unmounts while camera is on)
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((t) => t.stop());
      }
    };
  }, [previewImage]);

  const sendText = async (text) => {
    if (!text || loading || text.trim().length < 3) return;

    setLoading(true);
    setPreviewImage(default_img);

    setResult((prev) => ({
      ...prev,
      verdict_text: "Analyzing ingredients...",
      analysis: null,
    }));

    try {
      const res = await axios.post(
        `${API_URL}/analyze`,
        { text: text.trim() },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 60000,
        },
      );

      console.log("Backend response:", res.data);
      processResponse(res.data);
    } catch (err) {
      console.error("Scan failed:", err);
      setResult((prev) => ({
        ...prev,
        verdict_text: err.response?.data?.error || "Failed to analyze text.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const processResponse = (data) => {
    // 1. Error Handling
    if (data?.error) {
      setResult({
        severity: "",
        verdict_text: data.error + (data.details ? ` (${data.details})` : ""),
        better_alternative: "",
        dosha_summary: {},
        harmful_ingredients: [],
        analysis: null,
      });
      setLoading(false);
      return;
    }

    const analysis = data?.analysis;

    if (!analysis) {
      setResult({
        severity: "",
        verdict_text: "No analysis returned from server. Please try again.",
        better_alternative: "",
        dosha_summary: {},
        harmful_ingredients: [],
        analysis: null,
      });
      setLoading(false);
      return;
    }

    // 2. Calculate Severity and Verdict
    const overallRating = analysis.overall_rating || "unknown";
    let severity = "";
    let verdict_text = "No issues detected.";

    if (overallRating === "avoid") {
      severity = "danger";
      verdict_text = "DANGEROUS INGREDIENTS DETECTED. AVOID THIS PRODUCT.";
    } else if (overallRating === "caution") {
      severity = "moderate";
      verdict_text =
        "Use with caution. Consult an Ayurvedic practitioner before consumption.";
    } else if (overallRating === "normal") {
      severity = "moderate";
      verdict_text = "Generally safe but use in moderation.";
    } else {
      severity = "safe";
      verdict_text =
        "Generally safe for consumption. Follow recommended dosage.";
    }

    // Override verdict if specific warnings exist
    if (Array.isArray(analysis.warnings) && analysis.warnings.length > 0) {
      const danger = analysis.warnings.find((w) => w.type === "danger");
      const caution = analysis.warnings.find((w) => w.type === "caution");
      if (danger) {
        verdict_text = danger.message;
      } else if (caution) {
        verdict_text = caution.message;
      }
    }

    // 3. Calculate Better Alternative (Fixed Ghost State Logic)
    let better_alternative = "";

    // Check global recommendations first
    if (Array.isArray(analysis.recommendations)) {
      const altRec = analysis.recommendations.find(
        (r) => r.type === "alternatives",
      );
      if (altRec) {
        better_alternative = altRec.message;
      }
    }

    // If no global recommendation, check individual ingredients
    // (Consolidated logic from your original code to prevent overwriting)
    if (!better_alternative && analysis.identified_ingredients?.length > 0) {
      better_alternative =
        analysis.identified_ingredients[0].alternatives || "";
    }

    // 4. Harmful Ingredients Mapping
    const harmful_ingredients = (analysis.identified_ingredients || [])
      .filter(
        (i) => i.safety_rating === "avoid" || i.safety_rating === "caution",
      )
      .map((i) => ({
        name: i.matched_name,
        effect:
          i.toxicity_notes ||
          (Array.isArray(i.contraindications)
            ? i.contraindications.join(", ")
            : i.contraindications) ||
          "Use with caution. Consult an Ayurvedic practitioner.",
        safety_rating: i.safety_rating,
        safety_score: i.safety_score,
        contraindications: i.contraindications,
        benefits: i.benefits,
      }));

    // 5. Final State Update
    setResult({
      severity,
      verdict_text,
      better_alternative,
      dosha_summary: {}, // Kept empty as per original functionality
      harmful_ingredients,
      analysis,
    });
  };

  const sendImage = async (file) => {
    if (!file || loading) return;

    setLoading(true);
    const url = URL.createObjectURL(file);
    setPreviewImage(url);

    if (uploadRef.current) {
      uploadRef.current.value = "";
    }

    setResult((prev) => ({
      ...prev,
      verdict_text: "Analyzing image...",
      analysis: null,
    }));

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Updated to use the variable URL
      const res = await axios.post(`${API_URL}/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      console.log("Backend response:", res.data);
      processResponse(res.data);
    } catch (err) {
      console.error("Scan failed:", err);
      setResult((prev) => ({
        ...prev,
        verdict_text:
          err.response?.data?.error ||
          "Connection error. Ensure backend is running.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async () => {
    try {
      setCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setCameraOpen(false);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        const tracks = video.srcObject.getTracks();
        tracks.forEach((t) => t.stop());
        setCameraOpen(false);
        sendImage(file);
      },
      "image/jpeg",
      0.95,
    );
  };

  const closeCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream && stream instanceof MediaStream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    setCameraOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFE4BB] flex flex-col items-center pt-15">
      <header className="relative flex items-center justify-center bg-[#286459] h-12 sm:h-14 w-[94%] max-w-7xl rounded-full px-5 mt-4 shadow-sm z-20">
        <button
          aria-label="Open menu"
          className="absolute z-20 left-4 bg-[#859E7E]/70 p-1.5 rounded-xl hover:bg-[#859E7E]/90 transition-colors"
          onClick={() => setChatOpen((prev) => !prev)}
        >
          {chatOpen ? (
            <IoClose className="text-white text-2xl sm:text-3xl" />
          ) : (
            <MdMenu className="text-white text-2xl sm:text-3xl" />
          )}
        </button>
        <br />
        <br />
        <br />
        <h1 className="text-lg lg:text-xl empty- text-white poppins font-semibold tracking-wide">
          Product Scanner
        </h1>

        {chatOpen && (
          <div className="absolute top-13 sm:top-14 md:top-15 left-0 rounded-2xl bg-[#859E7E] flex flex-col items-center gap-4 py-3 z-0 px-20 inter text-lg font-semibold">
            <p className="text-black/60 hover:text-black">See Recent Chats</p>
            <p className="text-black/60 hover:text-black">See Recent Chats</p>
            <p className="text-black/60 hover:text-black">See Recent Chats</p>
            <p className="text-black/60 hover:text-black">See Recent Chats</p>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="w-[94%] max-w-7xl my-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:min-h-[620px]">
        {/* LEFT */}
        <section className="flex flex-col h-full gap-4">
          <h2 className="poppins font-bold text-3xl lg:text-4xl px-2 lg:mt-5">
            Scan The <br />
            <span className="text-[#286459]">Ingredients</span>
          </h2>

          {/* Input Mode Tabs */}
          <div className="flex gap-2 border-b-2 border-[#286459]/30">
            <button
              onClick={() => setInputMode("image")}
              className={`px-4 py-2 font-semibold transition-colors ${
                inputMode === "image"
                  ? "text-[#286459] border-b-2 border-[#286459] -mb-[2px]"
                  : "text-gray-600 hover:text-[#286459]"
              }`}
            >
              Image
            </button>
            <button
              onClick={() => setInputMode("text")}
              className={`px-4 py-2 font-semibold transition-colors ${
                inputMode === "text"
                  ? "text-[#286459] border-b-2 border-[#286459] -mb-[2px]"
                  : "text-gray-600 hover:text-[#286459]"
              }`}
            >
              Text
            </button>
          </div>

          {inputMode === "image" ? (
            <>
              <div className="bg-[#286459]/95 shadow-md p-2 max-h-[500px] flex items-center justify-center rounded-4xl">
                <img
                  src={previewImage}
                  alt="Product"
                  className="h-full w-full object-cover rounded-3xl"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Button onClick={openCamera} disabled={loading}>
                  {loading ? "Processing..." : "Click Image"}
                </Button>
                <Button
                  onClick={() => uploadRef.current.click()}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Upload Image"}
                </Button>
              </div>

              <input
                ref={uploadRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => sendImage(e.target.files[0])}
              />
            </>
          ) : (
            <>
              <div className="bg-[#FFE4BB] border border-[#286459]/30 rounded-xl p-4">
                <label className="block text-sm font-semibold mb-2 text-[#286459]">
                  Paste or type ingredient list:
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Example: Ardraka, Brahmi, Tulasi, Haritaki..."
                  className="w-full h-48 p-3 border border-[#286459]/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#286459]"
                  disabled={loading}
                />
                <p className="text-xs text-gray-600 mt-2">
                  Separate ingredients with commas, semicolons, or new lines
                </p>
              </div>
              <Button
                onClick={() => sendText(textInput)}
                disabled={loading || textInput.trim().length < 3}
              >
                {loading ? "Analyzing..." : "Analyze Ingredients"}
              </Button>
            </>
          )}
        </section>

        {/* RIGHT SECTION - SYNOPSIS */}
        <section className="bg-[#286459]/20 border border-[#286459]/60 rounded-3xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm h-full max-h-[750px]">
          <h2 className="poppins text-2xl lg:text-3xl font-bold text-center">
            Synopsis
          </h2>

          <div className="flex flex-col gap-4 flex-1 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-4">
              <div
                className={`border rounded-xl p-4 text-sm sm:text-base leading-relaxed lg:w-[100%] flex flex-col justify-center min-h-[120px] ${
                  result.analysis?.identified_ingredients?.some(
                    (ing) =>
                      ing.safety_rating === "caution" ||
                      ing.safety_rating === "avoid",
                  )
                    ? "bg-red-100 border-red-400"
                    : "bg-[#FFE4BB] border-[#286459]/30"
                }`}
              >
                {result.analysis?.identified_ingredients?.some(
                  (ing) =>
                    ing.safety_rating === "caution" ||
                    ing.safety_rating === "avoid",
                ) ? (
                  <div className="overflow-y-auto max-h-[100px]">
                    <h3 className="text-red-700 font-bold flex items-center gap-2 mb-2">
                      <GoAlertFill className="shrink-0" /> ATTENTION REQUIRED:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.identified_ingredients
                        .filter(
                          (ing) =>
                            ing.safety_rating === "caution" ||
                            ing.safety_rating === "avoid",
                        )
                        .map((ing, idx) => (
                          <span
                            key={idx}
                            className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm"
                          >
                            {ing.matched_name} (
                            {ing.safety_rating.toUpperCase()})
                          </span>
                        ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-black/60 italic text-center">
                    {result.analysis
                      ? "✅ All ingredients are safe"
                      : "Scan a product to see analysis"}
                  </p>
                )}
              </div>
            </div>

            <div
              className={`${result.severity === "danger" || result.analysis?.identified_ingredients?.some((ing) => ing.safety_rating === "caution") ? "bg-[#BA161C]" : "bg-[#286459]"} rounded-xl flex items-center gap-3 px-4 py-2`}
            >
              <GoAlertFill className="text-lg bg-white text-[#BA161C] rounded p-1" />
              <p className="text-white text-xs sm:text-sm font-semibold uppercase">
                {result.verdict_text || "Awaiting Scan..."}
              </p>
            </div>

            {/* SCROLLABLE INGREDIENT LIST */}
            <div className="bg-[#FFE4BB] border border-[#286459]/30 rounded-xl p-4 text-xs sm:text-sm leading-relaxed overflow-y-auto flex-1 scrollbar-hide">
              {result.analysis?.identified_ingredients?.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#286459] border-b border-[#286459]/20 pb-1">
                    Detected Components (
                    {result.analysis.identified_ingredients.length})
                  </h3>
                  {result.analysis.identified_ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${
                        ing.safety_rating === "avoid" ||
                        ing.safety_rating === "caution"
                          ? "bg-red-50 border-red-300"
                          : "bg-green-50 border-green-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-[#286459]">
                          {ing.matched_name}
                        </strong>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ing.safety_rating === "avoid" ||
                            ing.safety_rating === "caution"
                              ? "bg-red-600 text-white"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {ing.safety_rating}
                        </span>
                      </div>
                      {(ing.toxicity_notes ||
                        ing.safety_rating === "caution") && (
                        <p className="text-red-700 text-[11px] font-bold mb-1">
                          ⚠️{" "}
                          {ing.toxicity_notes ||
                            "Use with caution: consult a practitioner for dosage."}
                        </p>
                      )}
                      <p className="text-[11px] text-gray-700">
                        {ing.benefits}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 mt-10">
                  Waiting for data...
                </p>
              )}
            </div>

            {result.analysis && (
              <div className="mt-auto border-t-4 border-[#286459] pt-3 bg-[#FFE4BB] rounded-b-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#286459]">
                    Final Recommendation
                  </h3>
                  <div className="bg-[#286459] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Score: {result.analysis.overall_safety_score} / 5.0
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg text-xs font-medium shadow-sm ${
                    result.severity === "danger" ||
                    result.analysis?.overall_safety_score < 4
                      ? "bg-[#BA161C] text-white"
                      : "bg-[#286459] text-white"
                  }`}
                >
                  {result.analysis.conclusion}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      {cameraOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-[#FFE4BB] p-4 rounded-2xl flex flex-col items-center gap-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-72 h-72 object-cover rounded-xl"
            />
            <div className="flex gap-4">
              <button
                onClick={captureImage}
                className="px-4 py-2 bg-[#286459] text-white rounded-lg"
                disabled={loading}
              >
                Capture
              </button>
              <button
                onClick={closeCamera}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
            <canvas ref={canvasRef} hidden />
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientScanner;
