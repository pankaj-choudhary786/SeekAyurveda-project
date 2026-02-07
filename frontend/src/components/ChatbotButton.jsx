import { useState, useEffect } from "react";
import chatbotLogo from "../assets/seekAyurveda_logo.png";
import { IoClose } from "react-icons/io5";

const ChatbotButton = ({ forceOpen, setForceOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const botOpen = setForceOpen !== undefined ? forceOpen : internalOpen;
  const setBotOpen =
    setForceOpen !== undefined ? setForceOpen : setInternalOpen;

  useEffect(() => {
    if (botOpen) {
      document.body.style.overflow = "hidden";
      if (document.documentElement.hasAttribute("data-lenis-prevent")) {
        document.documentElement.setAttribute("data-lenis-prevent", "true");
      }
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.removeAttribute("data-lenis-prevent");
    }
  }, [botOpen]);

  return (
    <>
      <button
        onClick={() => setBotOpen((prev) => !prev)}
        className={`fixed right-2 z-90 bottom-4 lg:bottom-6 rounded-full bg-[#1e4a42]/80 backdrop-blur-xl shadow-xl hover:scale-110 transition-all duration-500 ${botOpen ? "p-2 md:p-3" : "p-0.5"}`}
      >
        {botOpen ? (
          <IoClose className="text-3xl text-white" />
        ) : (
          <img src={chatbotLogo} alt="ChatbotLogo" className="h-9 md:h-12" />
        )}
      </button>

      {botOpen && (
        <>
          <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md  transition-all duration-500"
            onClick={() => setBotOpen(false)}
          />

          <div className="fixed z-80 inset-0 md:inset-auto md:bottom-15 md:right-17 md:h-[80%] md:w-[55%] flex items-center justify-center pointer-events-none">
            <div
              className="
                relative w-full h-full md:w-full md:h-full pointer-events-auto
                rounded-none md:rounded-2xl
                p-[1.5px]
                bg-[linear-gradient(90deg,#b0be64,#22d3ee,#a855f7,#b0be64)]
                bg-[length:300%_300%]
                animate-[borderMove_6s_linear_infinite]
              "
            >
              <div className="w-full h-full bg-white/60 backdrop-blur-xl border border-white/30 rounded-none md:rounded-2xl overflow-hidden">
                <iframe
                  src="https://cdn.botpress.cloud/webchat/v3.5/shareable.html?configUrl=https://files.bpcontent.cloud/2026/01/28/14/20260128142105-UIX5R4TM.json"
                  title="AyurSathi"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatbotButton;
