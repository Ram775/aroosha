// src/components/sections/WhyChooseUs.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "ISO & NASSCOM Certified",
    desc: "Officially certified IT company with government-recognized standards.",
    color: "#F97316",
  },
  {
    icon: Award,
    title: "450+ Projects Delivered",
    desc: "Successfully completed projects across government and private sectors.",
    color: "#EC4899",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Skilled developers, designers and consultants with years of experience.",
    color: "#8B5CF6",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock assistance to keep your business running smoothly.",
    color: "#06B6D4",
  },
];

const stats = [
  { value: 450, suffix: "+", label: "Projects Delivered", icon: Briefcase },
  { value: 9, suffix: "+", label: "Years Experience", icon: TrendingUp },
  { value: 50, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: CheckCircle2 },
];

/* ════════════════════════════════
   INFINITE COUNTER HOOK
   (har 4 sec me dobara chalta hai)
════════════════════════════════ */
function useInfiniteCounter(target, isInView) {
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrame;
    let startTime;
    const duration = 1800;
    const pauseBetween = 2500; // 2.5 sec pause phir dobara

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
        // Pause, phir dobara start karo (0 se)
        setTimeout(() => {
          setCount(0);
          setCycle((c) => c + 1);
        }, pauseBetween);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, cycle]);

  return count;
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 md:pb-14"
      style={{ background: "var(--color-bg-muted)" }}
    >
      {/* Central Glow — GLOBAL */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] pointer-events-none"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse, var(--color-primary-pale) 0%, transparent 75%)",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "18%", left: "8%", size: 5, delay: 0, duration: 9 },
          { top: "72%", left: "14%", size: 4, delay: 1.2, duration: 11 },
          { top: "28%", left: "88%", size: 6, delay: 0.6, duration: 10 },
          { top: "78%", left: "82%", size: 4, delay: 1.8, duration: 12 },
          { top: "48%", left: "5%", size: 3, delay: 2.2, duration: 8 },
          { top: "12%", left: "58%", size: 5, delay: 0.9, duration: 13 },
        ].map((p, i) => (
          <motion.span
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background:
                "radial-gradient(circle, var(--color-primary) 0%, transparent 100%)",
              boxShadow: "0 0 10px var(--color-primary-pale)",
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 12, -8, 0],
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

      {/* Dots Grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.10, 0.22, 0.10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 z-10">
        {/* ============ HEADER ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          {/* Badge */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] mb-2"
            style={{
              background: "var(--color-primary-pale)",
              border: "1.5px solid var(--color-primary-light)",
              color: "var(--color-primary-dark)",
              boxShadow: "0 4px 20px var(--color-primary-pale)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Sparkles size={11} />
            Why Choose Us
          </motion.div>

          {/* Heading — Playfair Display italic */}
          <h2
            className="font-semibold leading-[1.2] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-3xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading, #1a1a1a)",
            }}
          >
            Built on Trust.{" "}
            <span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #F97316, #C2410C, #F97316)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              Proven by Results.
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="mt-2 text-xs sm:text-sm leading-6 max-w-md sm:max-w-xl mx-auto"
            style={{
              color: "var(--color-text-muted, #6B7280)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            We deliver excellence through certified processes, expert teams, and
            a commitment to your success.
          </p>

          {/* Divider */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3">
            <div
              className="h-px w-8 sm:w-12"
              style={{ background: "var(--color-border)" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            <div
              className="h-px w-8 sm:w-12"
              style={{ background: "var(--color-border)" }}
            />
          </div>
        </motion.div>

        {/* ============ FEATURES GRID ============ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {features.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl p-4 sm:p-5 border transition-all duration-500 overflow-hidden"
                style={{
                  background: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "0 8px 30px var(--color-shadow)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = f.color;
                  e.currentTarget.style.boxShadow = `0 16px 50px ${f.color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px var(--color-shadow)";
                }}
              >
                <div
                  className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: f.color }}
                />

                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${f.color}20, transparent 70%)`,
                  }}
                />

                <div
                  className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)`,
                    boxShadow: `0 6px 18px ${f.color}40`,
                  }}
                >
                  <IconComponent
                    size={18}
                    className="text-white sm:w-5 sm:h-5"
                  />
                </div>

                <h3
                  className="text-sm sm:text-base font-bold mb-1.5 relative z-10"
                  style={{
                    color: "var(--color-text-heading)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {f.title}
                </h3>

                <p
                  className="text-[11px] sm:text-xs leading-5 sm:leading-6 relative z-10"
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ============ STATS ROW ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-2xl p-4 sm:p-5 md:p-6 border overflow-hidden"
          style={{
            background: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
            boxShadow: "0 12px 40px var(--color-shadow)",
          }}
        >
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, var(--color-primary-pale), transparent 70%)",
            }}
          />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, i) => {
              const StatIcon = s.icon;
              return (
                <StatItem
                  key={i}
                  stat={s}
                  index={i}
                  isInView={isInView}
                  Icon={StatIcon}
                />
              );
            })}
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
   STAT ITEM — Infinite Counter
════════════════════════════════ */
function StatItem({ stat, index, isInView, Icon }) {
  const count = useInfiniteCounter(stat.value, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.1 }}
      className="text-center"
    >
      <div
        className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-2"
        style={{
          background: "var(--color-primary-pale)",
          color: "var(--color-primary)",
        }}
      >
        <Icon size={15} className="sm:w-4 sm:h-4" />
      </div>

      <p
        className="text-xl sm:text-2xl md:text-3xl font-black mb-1 tabular-nums"
        style={{
          color: "var(--color-primary)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {count}
        {stat.suffix}
      </p>

      <p
        className="text-[9px] sm:text-[10px] uppercase tracking-wider font-medium"
        style={{
          color: "var(--color-text-muted)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}