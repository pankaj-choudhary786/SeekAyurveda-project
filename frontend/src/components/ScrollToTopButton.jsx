import React, { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import lenis from "../lenis.js";

const ScrollToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    lenis.scrollTo(0, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  };
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
          fixed right-2 z-60
          bottom-15 md:bottom-20 lg:bottom-23
          p-2 md:p-3 rounded-full
          bg-black/70 backdrop-blur-xl shadow-xl text-white text-2xl md:text-3xl
          transition-all duration-300
          hover:scale-110
          ${
            showScroll
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 pointer-events-none"
          }
        `}
    >
      <BsArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
