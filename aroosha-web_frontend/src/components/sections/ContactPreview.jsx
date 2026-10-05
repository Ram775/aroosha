// src/components/sections/ContactPreview.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ContactPreview() {
  const navigate = useNavigate();

  return (
    <section
      className="relative overflow-hidden pt-12 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28"
      style={{ background: "var(--color-bg-body)" }}
    >
      {/* ============================================
          🎬 ANIMATION LAYER
          ============================================ */}

      {/* 1. Rotating Rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
            transition={{
              duration: 30 + i * 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{
              width: `${180 + i * 80}px`,
              height: `${180 + i * 80}px`,
              borderRadius: `${45 + i * 3}% ${55 - i * 3}% ${50 + i * 2}% ${
                50 - i * 2
              }% / ${50 - i * 2}% ${50 + i * 2}% ${55 - i * 3}% ${
                45 + i * 3
              }%`,
              border: "1.5px dashed",
              borderColor: `rgba(249, 115, 22, ${0.55 - i * 0.08})`,
            }}
          />
        ))}
      </div>

      {/* 2. Pulsing Central Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[240px] sm:h-[300px] md:h-[340px] pointer-events-none"
        animate={{
          opacity: [0.55, 1, 0.55],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(ellipse, rgba(249, 115, 22, 0.45) 0%, rgba(249, 115, 22, 0.18) 45%, transparent 75%)",
        }}
      />

      {/* 3. Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "22%", left: "12%", size: 10, delay: 0, duration: 8 },
          { top: "70%", left: "18%", size: 8, delay: 1, duration: 10 },
          { top: "28%", left: "82%", size: 12, delay: 0.5, duration: 9 },
          { top: "75%", left: "78%", size: 9, delay: 1.5, duration: 11 },
          { top: "50%", left: "8%", size: 7, delay: 2, duration: 7 },
          { top: "15%", left: "58%", size: 11, delay: 0.8, duration: 12 },
        ].map((orb, i) => (
          <motion.span
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              top: orb.top,
              left: orb.left,
              width: orb.size,
              height: orb.size,
              background:
                "radial-gradient(circle, rgba(249, 115, 22, 1) 0%, rgba(249, 115, 22, 0.5) 60%, rgba(249, 115, 22, 0.1) 100%)",
              boxShadow:
                "0 0 14px rgba(249, 115, 22, 0.7), 0 0 28px rgba(249, 115, 22, 0.35)",
            }}
            animate={{
              y: [0, -28, 0],
              x: [0, 12, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 4. Breathing Grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.05, 0.10, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(249, 115, 22, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ============================================
          📝 CONTENT
          ============================================ */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10 mb-10">
        {/* ✅ UPAR LEFT SIDE TEXT — thoda aur upar + left */}
             <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-8 sm:mb-10"
        >
          {/* Small label */}
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get In Touch
          </p>

          {/* Divider */}
          <div className="w-full max-w-[280px] h-[1px] bg-[var(--color-border)] mb-6"></div>

          {/* Heading — Playfair Display italic, chhota */}
          <h2
            className="text-[20px] md:text-[30px] font-semibold leading-[1.15] tracking-tight max-w-xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading)",
            }}
          >
            Have a project in mind?{" "}
            <span className="text-primary font-bold">
              Let's talk about it.
            </span>
          </h2>
        </motion.div>

        {/* ============================================
            EXISTING CENTER CONTENT
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] mb-4 sm:mb-6"
            style={{
              background: "var(--color-primary-pale)",
              border: "1.5px solid var(--color-primary-light)",
              color: "var(--color-primary-dark)",
              boxShadow: "0 4px 20px rgba(249, 115, 22, 0.25)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Sparkles size={11} />
            Ready to Get Started?
          </motion.div>

          {/* Heading — Playfair Display italic, chhota */}
          <h2
            className="leading-[1.2] tracking-tight mb-3 sm:mb-5 font-semibold text-lg sm:text-xl md:text-2xl lg:text-[30px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading, #1a1a1a)",
            }}
          >
            Let's Build Something{" "}
            <span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #F97316, #C2410C, #F97316)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              Amazing Together
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="text-xs sm:text-sm leading-6 sm:leading-7 max-w-md sm:max-w-xl mx-auto mb-4 sm:mb-6"
            style={{
              color: "var(--color-text-muted, #6B7280)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            From concept to launch, we're here to transform your ideas into
            powerful digital experiences. Let's talk about your project.
          </p>

          {/* Extra text */}
          <p
            className="text-[11px] sm:text-xs leading-5 sm:leading-6 max-w-md sm:max-w-lg mx-auto mb-6 sm:mb-8"
            style={{
              color: "var(--color-text-muted, #6B7280)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            From small startups to large enterprises — we build solutions
            that scale with your business and grow with your vision.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all group/btn"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                boxShadow: "0 12px 40px rgba(249, 115, 22, 0.5)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Start Your Project
              <ArrowRight
                size={15}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/services")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
              style={{
                border: "1.5px solid var(--color-primary)",
                color: "var(--color-primary-dark)",
                background: "var(--color-bg-card)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Explore Services
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs">
            {["Free Consultation", "24/7 Support", "NDA Protected"].map(
              (item, i) => (
                <motion.span
                  key={i}
                  className="inline-flex items-center gap-2 font-medium"
                  style={{
                    color: "var(--color-text-body, #4B5563)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                  animate={{ opacity: [0.75, 1, 0.75] }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span
                    className="font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ✓
                  </span>
                  {item}
                </motion.span>
              )
            )}
          </div>

          {/* Bottom text */}
          <p
            className="mt-6 sm:mt-8 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase"
            style={{
              color: "var(--color-text-muted, #6B7280)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Trusted by 450+ businesses worldwide
          </p>
        </motion.div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}