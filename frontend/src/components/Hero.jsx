import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/heroImage.jpeg";

const Hero = () => {
  return (
    <div className="flex mt-17 justify-center h-[88vh] font-sans">
      <div className="relative w-full h-[88vh] md:h-[91vh] lg:h-[88vh] mx-1 my-3 md:mx-3 rounded-4xl overflow-hidden border border-white/10 shadow-2xl bg-black z-[10]">
        <img
          src={heroImg}
          alt="heroImg"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
 
        <div className="absolute inset-0 backdrop-blur-[1px] z-10 pointer-events-none" />
 
        <div className="relative z-30 h-full flex flex-col items-center justify-center px-6">
          <div className="relative w-full max-w-4xl">
            <svg
              viewBox="0 0 800 180"
              className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,199,0.4)]"
            >
              <defs>
                <clipPath id="textClip">
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontFamily: "'Sacramento', cursive",
                      fontSize: "120px",
                    }}
                  >
                    seekAyurveda
                  </text>
                </clipPath>
              </defs>
 
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                fill="#FFFFC7"
                clipPath="url(#textClip)"
              />
 
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="#FFFFC7"
                strokeWidth="1" 
                strokeOpacity="0.4" 
                style={{
                  fontFamily: "'Sacramento', cursive",
                  fontSize: "120px",
                }}
              >
                seekAyurveda
              </text>
            </svg>

            <div className="flex justify-center -mt-6">
              <svg width="60%" height="20" viewBox="0 0 400 20">
                <motion.path
                  d="M10,10 Q200,20 390,10"
                  stroke="#7aa89b"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 3 }}
                />
              </svg>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="text-white text-[10px] sm:text-base md:text-base tracking-[0.3em] uppercase mt-4 mb-10"
          >
            Ancient Science • Modern Life
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="font-bold px-5 py-2 md:py-3 text-md md:text-lg bg-[#FFFFC7] text-[#286459] rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all z-30 absolute left-5 bottom-5"
          >
            Explore Our Prakriti
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
