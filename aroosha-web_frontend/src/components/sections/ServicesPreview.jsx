// src/components/sections/ServicesPreview.jsx
import { useState, useEffect } from "react";
import {
  Layers, Globe, Smartphone, Code2,
  Cloud, ShieldCheck, Wrench, Settings2, Rocket, TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { id: "A", title: "Website Development", desc: "Custom websites, e-commerce, and CMS solutions built for performance.", Icon: Globe, color: "#84cc16", tag: "CUSTOM" },
  { id: "B", title: "Mobile App Development", desc: "Native iOS & Android apps with cross-platform frameworks.", Icon: Smartphone, color: "#f59e0b", tag: "iOS · ANDROID" },
  { id: "C", title: "Software Development", desc: "Desktop apps, SaaS products, and business automation systems.", Icon: Code2, color: "#ef4444", tag: "DESKTOP · SaaS" },
  { id: "D", title: "Cloud Services", desc: "Cloud migration, infrastructure as code, and managed hosting.", Icon: Cloud, color: "#8b5cf6", tag: "CLOUD · IaC" },
  { id: "E", title: "IT Consulting", desc: "Technology strategy, architecture, and compliance advisory.", Icon: ShieldCheck, color: "#06b6d4", tag: "STRATEGY" },
  { id: "F", title: "AMC & IT Support", desc: "Annual maintenance, helpdesk, and hardware support.", Icon: Wrench, color: "#ec4899", tag: "24/7" },
  { id: "G", title: "ERP & CRM Solutions", desc: "Implementation, workflow automation, and data migration.", Icon: Settings2, color: "#10b981", tag: "ERP · CRM" },
  { id: "H", title: "Digital Transformation", desc: "Process modernization, automation, and cloud strategy.", Icon: Rocket, color: "#f97316", tag: "AUTOMATE" },
  { id: "I", title: "SEO & Blogging Services", desc: "On-page & off-page SEO, content strategy, and audits.", Icon: TrendingUp, color: "#3b82f6", tag: "SEO · CONTENT" },
];

const NETWORK_NODES = [
  { top: "8%",  left: "12%", delay: "0s" },
  { top: "15%", left: "45%", delay: "1.5s" },
  { top: "10%", left: "78%", delay: "3s" },
  { top: "28%", left: "25%", delay: "2s" },
  { top: "32%", left: "60%", delay: "4.5s" },
  { top: "40%", left: "88%", delay: "1s" },
  { top: "55%", left: "8%",  delay: "3.5s" },
  { top: "62%", left: "42%", delay: "0.5s" },
  { top: "70%", left: "72%", delay: "2.5s" },
  { top: "82%", left: "18%", delay: "4s" },
  { top: "88%", left: "55%", delay: "1.8s" },
  { top: "78%", left: "92%", delay: "3.2s" },
];

const NETWORK_LINES = [
  { x1: "12%", y1: "8%",  x2: "45%", y2: "15%" },
  { x1: "45%", y1: "15%", x2: "78%", y2: "10%" },
  { x1: "25%", y1: "28%", x2: "60%", y2: "32%" },
  { x1: "60%", y1: "32%", x2: "88%", y2: "40%" },
  { x1: "8%",  y1: "55%", x2: "42%", y2: "62%" },
  { x1: "42%", y1: "62%", x2: "72%", y2: "70%" },
  { x1: "18%", y1: "82%", x2: "55%", y2: "88%" },
  { x1: "55%", y1: "88%", x2: "92%", y2: "78%" },
  { x1: "12%", y1: "8%",  x2: "25%", y2: "28%" },
  { x1: "78%", y1: "10%", x2: "88%", y2: "40%" },
  { x1: "8%",  y1: "55%", x2: "18%", y2: "82%" },
  { x1: "72%", y1: "70%", x2: "92%", y2: "78%" },
];

export default function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = services[activeIndex];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % services.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  // ============================================
  // ✨ HEADING — 2 lines, global colors
  // ============================================
  const headingLine1 = ["Complete", "digital", "solutions"];
  const headingLine2 = ["built", "for", "modern", "businesses."];

  // Bich ka word jo orange highlight hoga
  const highlightWord = "solutions";

  return (
    <section
      className="relative min-h-screen w-full bg-body text-text-body px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Network bg */}
      <div className="network-bg">
        <svg className="network-svg" preserveAspectRatio="none">
          {NETWORK_LINES.map((l, i) => (
            <line key={i} className="network-line" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </svg>
        {NETWORK_NODES.map((n, i) => (
          <span key={i} className="network-node" style={{ top: n.top, left: n.left, animationDelay: n.delay }} />
        ))}
      </div>

      {/* Glow blobs — GLOBAL COLORS */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[300px] sm:h-[420px] w-[300px] sm:w-[420px] rounded-full blur-[100px] blob-float-1"
        style={{ background: "var(--color-primary-pale)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[300px] sm:h-[420px] w-[300px] sm:w-[420px] rounded-full blur-[100px] blob-float-2"
        style={{ background: "var(--color-primary-pale)" }}
      />

      {/* ============================================
          ✨ HEADING — GLOBAL COLORS
          ============================================ */}
      <div className="relative z-10 mx-auto max-w-[1200px] mb-10 sm:mb-12 md:mb-14">
        {/* Small label — GLOBAL MUTED */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', sans-serif",
            fontStyle: "normal",
          }}
        >
          Our Services
        </motion.p>

        {/* Divider — GLOBAL BORDER */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="h-px w-full max-w-[260px] sm:max-w-[400px] md:max-w-[520px] mb-4 sm:mb-5 md:mb-7 origin-left"
          style={{ background: "var(--color-border)" }}
        />

        {/* Heading — same size (chhota), global colors */}
        <h2
          className="leading-[1.3] tracking-tight max-w-[700px] font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            color: "var(--color-text-heading, #1a1a1a)",
          }}
        >
          {/* Line 1 */}
          {headingLine1.map((word, i) => {
            const isHighlight = word === highlightWord;
            return (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className={`inline-block mr-1.5 sm:mr-2 ${
                  isHighlight ? "font-bold" : ""
                }`}
                style={{
                  color: isHighlight
                    ? "var(--color-primary)" // 🌍 GLOBAL PRIMARY
                    : "inherit",
                }}
              >
                {word}
              </motion.span>
            );
          })}

          <br />

          {/* Line 2 */}
          {headingLine2.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="inline-block mr-1.5 sm:mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>
      {/* ============================================ */}

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[340px_1fr] lg:gap-8">
        {/* LEFT — Circle */}
        <div className="flex items-center justify-center relative order-1 lg:order-1">
          <div
            className="absolute h-[260px] sm:h-[300px] md:h-[340px] w-[260px] sm:w-[300px] md:w-[340px] rounded-full blur-[60px] glow-pulse"
            style={{ background: `radial-gradient(circle, ${active.color}55 0%, transparent 70%)` }}
          />
          <div
            key={activeIndex}
            className="relative flex aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] items-center justify-center rounded-full p-6 sm:p-8 text-center circle-pop"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${active.color}22 0%, transparent 60%), var(--color-bg-card)`,
              border: `1px solid ${active.color}55`,
              boxShadow: `0 0 60px ${active.color}33, inset 0 0 40px ${active.color}11`,
            }}
          >
            <div>
              <div className="mb-2 sm:mb-3 flex items-center justify-center gap-2">
                <Layers size={11} className="text-muted" />
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted">
                  Service {active.id}
                </p>
              </div>
              <div
                className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all duration-500"
                style={{ background: `${active.color}22`, color: active.color }}
              >
                <active.Icon size={22} />
              </div>
              <h2 className="mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-heading">
                {active.title}
              </h2>
              <p className="mx-auto max-w-[200px] sm:max-w-[220px] text-[11px] sm:text-xs leading-relaxed text-muted">
                {active.desc}
              </p>
              <div
                className="mt-3 sm:mt-4 inline-block rounded-full px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: `${active.color}22`, color: active.color }}
              >
                {active.tag}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Service list */}
        <div className="relative flex flex-col justify-center gap-2.5 sm:gap-3 order-2 lg:order-2">
          <svg
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-[80px] lg:block"
            viewBox="0 0 80 700"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              className="curve-path"
              d="M 10 30 Q 70 350, 10 670"
              stroke="var(--color-border)"
              strokeWidth="1.5"
            />
          </svg>

          {services.map((svc, i) => {
            const isActive = i === activeIndex;
            const SvcIcon = svc.Icon;
            return (
              <div
                key={svc.id}
                className="relative flex items-center pill-enter"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`relative z-10 mr-3 hidden h-3 w-3 shrink-0 rounded-full ring-4 ring-[var(--color-bg-body)] transition-all duration-300 lg:block ${
                    isActive ? "node-active" : ""
                  }`}
                  style={{
                    backgroundColor: svc.color,
                    color: svc.color,
                    transform: isActive ? "scale(1.6)" : "scale(1)",
                  }}
                />
                <button
                  onClick={() => setActiveIndex(i)}
                  className={`group flex w-full items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-full px-3 sm:px-5 py-2.5 sm:py-3.5 text-left transition-all duration-300 bg-card ${
                    isActive ? "shadow-lg -translate-y-0.5" : "hover:shadow-md hover:-translate-y-0.5"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(90deg, ${svc.color}22 0%, var(--color-bg-card) 90%)`
                      : undefined,
                    border: `1px solid ${isActive ? svc.color : "var(--color-border)"}`,
                    boxShadow: isActive ? `0 8px 28px ${svc.color}33` : undefined,
                  }}
                >
                  <div
                    className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 icon-tilt"
                    style={{
                      backgroundColor: isActive ? svc.color : `${svc.color}22`,
                      color: isActive ? "#ffffff" : svc.color,
                      transform: isActive ? "rotate(-6deg) scale(1.05)" : "rotate(0deg)",
                    }}
                  >
                    <SvcIcon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate text-xs sm:text-sm font-semibold transition-colors duration-300"
                      style={{ color: isActive ? svc.color : "var(--color-text-heading)" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[10px] sm:text-[11px] text-muted">
                      {svc.desc}
                    </p>
                  </div>
                  <div
                    className="shrink-0 rounded-lg px-2 py-1 text-[9px] sm:text-[10px] font-bold"
                    style={{ background: `${svc.color}22`, color: svc.color }}
                  >
                    {svc.id}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-10 flex max-w-[1200px] items-center justify-between">
        {/* existing empty area */}
      </div>
    </section>
  );
}