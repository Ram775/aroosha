// src/components/sections/CTABanner.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-dark)] py-20 md:py-24">
      {/* Animated rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 22 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] border border-primary/10"
            style={{
              width: `${300 + i * 90}px`,
              height: `${300 + i * 90}px`,
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}
      </div>

      {/* Golden glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(var(--color-primary-rgb, 245,158,11), 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] font-semibold text-primary uppercase tracking-[0.25em] mb-5">
            <Sparkles size={11} />
            Ready to Get Started?
          </div>

          <h2 className="text-3xl md:text-[2.8rem] font-black leading-tight tracking-tight text-white mb-5">
            Let's Build Something{" "}
            <span className="text-primary font-[Playfair_Display] italic font-medium">
              Amazing Together
            </span>
          </h2>

          <p className="text-sm md:text-base text-gray-400 leading-7 max-w-xl mx-auto mb-9">
            From concept to launch, we're here to transform your ideas into
            powerful digital experiences. Let's talk about your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-lg shadow-[var(--color-primary)]/30 group/btn"
            >
              Start Your Project
              <ArrowRight
                size={16}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Explore Services
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}