// src/components/careers/CareersPreview.jsx
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ArrowRight,
  Code2,
  Smartphone,
  Palette,
  Megaphone,
  Lightbulb,
  Sprout,
  Users,
} from "lucide-react";

export default function CareersPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const circles = [
    {
      id: "web",
      label: "Web Dev",
      icon: Code2,
      color: "#3B82F6",
      glow: "rgba(59, 130, 246, 0.45)",
      x: "8%",
      y: "18%",
      size: 90,
      depth: 0.03,
    },
    {
      id: "app",
      label: "Mobile App",
      icon: Smartphone,
      color: "#F97316",
      glow: "rgba(249, 115, 22, 0.5)",
      x: "80%",
      y: "14%",
      size: 105,
      depth: 0.05,
    },
    {
      id: "design",
      label: "Design",
      icon: Palette,
      color: "#EC4899",
      glow: "rgba(236, 72, 153, 0.45)",
      x: "84%",
      y: "68%",
      size: 85,
      depth: 0.04,
    },
    {
      id: "marketing",
      label: "Marketing",
      icon: Megaphone,
      color: "#10B981",
      glow: "rgba(16, 185, 129, 0.45)",
      x: "10%",
      y: "70%",
      size: 95,
      depth: 0.06,
    },
  ];

  const perks = [
    {
      icon: Lightbulb,
      label: "Innovation First",
      desc: "We encourage fresh ideas and creative thinking.",
      color: "#F59E0B",
    },
    {
      icon: Sprout,
      label: "Growth Culture",
      desc: "Continuous learning with mentorship support.",
      color: "#10B981",
    },
    {
      icon: Users,
      label: "Team Spirit",
      desc: "Collaborative environment where everyone wins.",
      color: "#3B82F6",
    },
  ];

  const headingLine1 = ["Build", "Your"];
  const headingLine2 = ["Career"];
  const headingLine3 = ["With", "Us"];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 flex items-center min-h-[600px] sm:min-h-[650px] md:min-h-[700px]"
      style={{
        background:
          "linear-gradient(180deg, #FFF8F1 0%, #FFFFFF 55%, #FFF8F1 100%)",
      }}
    >
      {/* BACKGROUND LAYERS */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] sm:h-[500px] pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.05) 50%, transparent 75%)",
        }}
      />

      <motion.div
        className="absolute -top-32 -left-32 w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full pointer-events-none blur-3xl"
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "rgba(249, 115, 22, 0.18)" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full pointer-events-none blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.12, 1] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        style={{ background: "rgba(249, 115, 22, 0.15)" }}
      />

      {/* CURSOR-FOLLOW CIRCLES */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {circles.map((c, i) => {
          const Icon = c.icon;
          const isActive = i === activeIdx;
          const isHovered = i === hoveredIdx;

          return (
            <motion.button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="absolute rounded-full flex flex-col items-center justify-center cursor-pointer pointer-events-auto backdrop-blur-md"
              style={{
                left: c.x,
                top: c.y,
                width: c.size,
                height: c.size,
                background: isActive
                  ? `radial-gradient(circle at 30% 30%, ${c.color}, ${c.color}cc)`
                  : `radial-gradient(circle at 30% 30%, ${c.color}33, ${c.color}11)`,
                border: `1.5px solid ${isActive ? c.color : c.color + "66"}`,
                boxShadow: isActive
                  ? `0 0 40px ${c.glow}, 0 0 80px ${c.glow}`
                  : isHovered
                  ? `0 0 30px ${c.glow}`
                  : `0 0 20px ${c.color}22`,
                transition:
                  "background 0.5s ease, box-shadow 0.4s ease, border 0.4s ease",
              }}
              animate={{
                x: (springX.get() - 500) * c.depth,
                y: (springY.get() - 400) * c.depth,
              }}
              whileHover={{ scale: isActive ? 1.2 : 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col items-center justify-center w-full h-full"
                animate={{
                  y: [0, -10, 0, 8, 0],
                  rotate: [0, 4, 0, -4, 0],
                }}
                transition={{
                  y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                  rotate: {
                    duration: 9 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Icon
                  size={isActive ? 24 : 20}
                  style={{
                    color: isActive ? "#fff" : c.color,
                    transition: "all 0.4s ease",
                  }}
                />
                <span
                  className="text-[9px] font-bold mt-1 tracking-wider uppercase"
                  style={{
                    color: isActive ? "#fff" : c.color,
                    transition: "all 0.4s ease",
                  }}
                >
                  {c.label}
                </span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="relative max-w-3xl mx-auto text-center z-10">
        {/* ✅ Heading — sirf size chhota kiya */}
        <h2
          className="leading-[1.2] tracking-tight mb-4 sm:mb-5 max-w-2xl mx-auto font-semibold text-lg sm:text-xl md:text-2xl lg:text-[30px]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            color: "#1a1a1a",
          }}
        >
          {headingLine1.map((word, i) => (
            <motion.span
              key={`l1-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="inline-block mr-1.5 sm:mr-2"
            >
              {word}
            </motion.span>
          ))}
          {headingLine2.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mr-1.5 sm:mr-2 font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #F97316, #C2410C, #F97316)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              {word}
            </motion.span>
          ))}
          {headingLine3.map((word, i) => (
            <motion.span
              key={`l3-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
              className="inline-block mr-1.5 sm:mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xs sm:text-sm leading-6 sm:leading-7 max-w-md sm:max-w-lg mx-auto mb-10 sm:mb-12"
          style={{
            color: "#6B7280",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontStyle: "normal",
          }}
        >
          Join our growing team and build amazing digital products. We're
          looking for passionate people who love to create.
        </motion.p>

        {/* PERKS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-12 max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto">
          {perks.map((perk, i) => {
            const PerkIcon = perk.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.55 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl p-4 sm:p-5 text-left overflow-hidden group/perk"
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #f1e7dd",
                  boxShadow: "0 8px 24px rgba(249, 115, 22, 0.06)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${perk.color}, ${perk.color}66)`,
                  }}
                />

                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover/perk:opacity-40 transition-opacity duration-500"
                  style={{ background: perk.color }}
                />

                <div
                  className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover/perk:scale-110"
                  style={{
                    background: `${perk.color}15`,
                    border: `1px solid ${perk.color}30`,
                  }}
                >
                  <PerkIcon
                    size={20}
                    style={{ color: perk.color }}
                    strokeWidth={2.2}
                  />
                </div>

                <h3
                  className="relative text-sm sm:text-base font-bold mb-1"
                  style={{
                    color: "#1a1a1a",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {perk.label}
                </h3>

                <p
                  className="relative text-[11px] sm:text-xs leading-relaxed"
                  style={{
                    color: "#6B7280",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {perk.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all group/btn no-underline"
            style={{
              background: "linear-gradient(135deg, #F97316, #C2410C)",
              boxShadow: "0 10px 30px rgba(249,115,22,0.35)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            <Briefcase size={14} />
            View Openings
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Email */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-4 sm:mt-5 text-[10px] sm:text-[11px]"
          style={{
            color: "#9CA3AF",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontStyle: "normal",
          }}
        >
          Or email us at{" "}
          <a
            href="mailto:careers@aroosha.com"
            className="font-semibold no-underline transition-colors"
            style={{ color: "#F97316" }}
          >
            careers@aroosha.com
          </a>
        </motion.p>
      </div>

      {/* MOBILE CIRCLES ROW */}
      <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 lg:hidden flex justify-center gap-2.5 sm:gap-3 px-4 z-20">
        {circles.map((c, i) => {
          const Icon = c.icon;
          const isActive = i === activeIdx;
          return (
            <motion.button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{
                background: isActive
                  ? `radial-gradient(circle at 30% 30%, ${c.color}, ${c.color}cc)`
                  : `radial-gradient(circle at 30% 30%, ${c.color}33, ${c.color}11)`,
                border: `1.5px solid ${isActive ? c.color : c.color + "66"}`,
                boxShadow: isActive ? `0 0 24px ${c.glow}` : "none",
              }}
              animate={{
                y: [0, -6, 0, 5, 0],
                scale: isActive ? 1.15 : 1,
              }}
              transition={{
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={c.label}
            >
              <Icon size={16} style={{ color: isActive ? "#fff" : c.color }} />
            </motion.button>
          );
        })}
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}