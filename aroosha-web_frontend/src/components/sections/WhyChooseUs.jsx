// src/components/sections/WhyChooseUs.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Award,
  Heart,
} from "lucide-react";

// ✅ About image import
import aboutImg from "../../assets/images/about.png";

const features = [
  {
    icon: Sparkles,
    title: "Innovative Solutions",
    desc: "Cutting-edge technology combined with creative thinking to deliver next-gen digital products.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Agile development process that ensures your project launches on time, every time.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security and 99.9% uptime, so your business never stops.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "70+ in-house specialists with deep expertise across design, development, and marketing.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    desc: "Built to grow with your business — from startup to enterprise scale, seamlessly.",
  },
  {
    icon: Award,
    title: "Award Winning",
    desc: "Recognized for excellence in digital innovation and customer satisfaction.",
  },
];

const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 70, suffix: "+", label: "In-House Experts" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Industries Served" },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-body pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 md:pb-14"
    >
      {/* Decorative bg blobs */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "15%", left: "8%", size: 4, delay: 0, duration: 9 },
          { top: "75%", left: "15%", size: 3, delay: 1.2, duration: 11 },
          { top: "25%", left: "90%", size: 5, delay: 0.6, duration: 10 },
          { top: "80%", left: "85%", size: 3, delay: 1.8, duration: 12 },
          { top: "50%", left: "5%", size: 4, delay: 2.2, duration: 8 },
          { top: "10%", left: "60%", size: 3, delay: 0.9, duration: 13 },
        ].map((p, i) => (
          <motion.span
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: "var(--color-primary)",
              boxShadow: "0 0 10px var(--color-primary-pale)",
            }}
            animate={{
              y: [0, -22, 0],
              x: [0, 10, -6, 0],
              opacity: [0.3, 1, 0.5, 0.3],
              scale: [0.9, 1.3, 1, 0.9],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          {/* Badge */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] mb-2"
            style={{
              background: "var(--color-primary-pale)",
              border:
                "1px solid var(--color-primary-light, rgba(249,115,22,0.3))",
              color: "var(--color-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Heart size={10} />
            Why Choose Us
          </motion.div>

          {/* Heading — chhota */}
          <h2
            className="font-semibold leading-[1.2] tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading, #1a1a1a)",
            }}
          >
            What Makes Us{" "}
            <span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #F97316, #C2410C, #F97316)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              Different
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="mt-2 text-[11px] sm:text-xs leading-5 sm:leading-6 max-w-md sm:max-w-xl mx-auto"
            style={{
              color: "var(--color-text-muted, #6B7280)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            We combine creativity, technology, and strategy to deliver digital
            experiences that actually drive results.
          </p>

          {/* Divider */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-px w-8 sm:w-12 origin-right"
              style={{ background: "var(--color-border, #f1e7dd)" }}
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-px w-8 sm:w-12 origin-left"
              style={{ background: "var(--color-border, #f1e7dd)" }}
            />
          </div>
        </motion.div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-5 mb-8 sm:mb-10">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* ════════════════════════════════
            STATS ROW — Stacked Card + Image + Numbers
        ════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* ✅ BACKGROUND DECORATION — card ke peeche */}
          <div className="absolute inset-0 -z-10">
            {/* Back card 1 — rotated + offset */}
            <div
              className="absolute inset-0 rounded-3xl -translate-x-3 -translate-y-3 rotate-[-2deg]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.02))",
                border: "1px solid rgba(249,115,22,0.2)",
              }}
            />

            {/* Back card 2 — rotated + offset */}
            <div
              className="absolute inset-0 rounded-3xl -translate-x-1.5 -translate-y-1.5 rotate-[-1deg]"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />

            {/* Glow behind card */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(249,115,22,0.1))",
              }}
            />
          </div>

          {/* ✅ MAIN CARD */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "var(--color-bg-card)",
              border: "1.5px solid var(--color-border)",
              boxShadow:
                "0 20px 60px rgba(249, 115, 22, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] z-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
              }}
            />

            {/* ✅ Image section */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">
              {/* Fallback gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #F97316 0%, #C2410C 100%)",
                }}
              />

              {/* Image with zoom animation */}
              <motion.img
                src={aboutImg}
                alt="Aroosha team"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-full h-full object-cover z-10"
                onError={(e) => {
                  e.target.style.opacity = 0;
                }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-20 pointer-events-none" />

              {/* Top-left badge */}
              <div className="absolute top-4 left-4 z-30">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[9px] sm:text-[10px] font-semibold text-white uppercase tracking-wider"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Aroosha
                </span>
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-1.5"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Our Numbers
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm sm:text-base md:text-lg font-semibold text-white leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                  }}
                >
                  Milestones that define our journey
                </motion.p>
              </div>
            </div>

            {/* ✅ Stats section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
              {stats.map((stat, i) => (
                <StatItem
                  key={stat.label}
                  stat={stat}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
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

/* ════════════════════════════════
   FEATURE CARD
════════════════════════════════ */
function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-[var(--color-primary)]/40 hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute -top-16 -right-16 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon with float + rotate */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 3, 0, -3, 0] }}
        transition={{
          y: {
            duration: 3 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 5 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[var(--color-primary-pale)] flex items-center justify-center mb-3 shadow-sm group-hover:bg-[var(--color-primary)] transition-colors duration-300"
      >
        <Icon
          size={16}
          className="text-[var(--color-primary)] group-hover:text-white transition-colors duration-300 sm:w-[18px] sm:h-[18px]"
        />
      </motion.div>

      <h3
        className="text-xs sm:text-sm md:text-base font-bold leading-snug mb-1.5 transition-colors duration-300"
        style={{
          color: "var(--color-text-heading, #1a1a1a)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {feature.title}
      </h3>

      <p
        className="text-[10px] sm:text-[11px] md:text-xs leading-5"
        style={{
          color: "var(--color-text-muted, #6B7280)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {feature.desc}
      </p>

      <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </motion.div>
  );
}

/* ════════════════════════════════
   STAT ITEM — INFINITE COUNTER
════════════════════════════════ */
function StatItem({ stat, index, isInView }) {
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const increment = stat.value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);

        // ✅ 3 sec pause ke baad dobara start
        setTimeout(() => {
          setCount(0);
          setCycle((c) => c + 1);
        }, 3000);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, stat.value, cycle]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      className="relative text-center py-1 sm:py-2"
    >
      {index > 0 && (
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-[var(--color-border)]" />
      )}

      <div
        className="text-xl sm:text-2xl md:text-3xl font-black mb-1 tabular-nums"
        style={{
          color: "var(--color-primary)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {count}
        {stat.suffix}
      </div>

      <div
        className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider font-semibold"
        style={{
          color: "var(--color-text-muted, #6B7280)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}