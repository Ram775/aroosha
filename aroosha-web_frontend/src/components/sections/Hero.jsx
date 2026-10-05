// src/components/home/Hero.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroVideo from "../../assets/videos/hero5.mp4";

export default function Hero() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  // ✅ 4 sec baad text
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* ═══════════════════════════════════════ */}
      {/* 🎬 VIDEO                                 */}
      {/* ═══════════════════════════════════════ */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          imageRendering: "high-quality",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* ═══════════════════════════════════════ */}
      {/* 📝 TEXT — 4 sec baad                    */}
      {/* ═══════════════════════════════════════ */}
      <div
        className={`
          relative z-10 h-full flex flex-col 
          items-center justify-center 
          text-center px-6
          transition-all duration-1000 ease-out
          ${
            showText
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }
        `}
      >
        {/* ✅ BUTTONS — Scroll indicator ke thoda upar */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full flex flex-col items-center justify-center gap-3 sm:flex-row px-6">
           <button
    onClick={() => navigate("/services")}
    className="btn-primary"
  >
    Explore Services →
  </button>

          <button
    onClick={() => navigate("/contact")}
    className="btn-secondary"
  >
    Contact Us
  </button>
        </div>
      </div>

      {/* Scroll indicator */}
      {showText && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] font-medium tracking-[2px] text-white/60">
            SCROLL TO EXPLORE
          </span>
          <div className="h-8 w-[1px] bg-white/60 animate-pulse" />
        </div>
      )}
    </section>
  );
}