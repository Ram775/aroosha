// src/components/ui/ServicesInfographic.jsx
import { useState, useEffect } from "react";
import {
  ArrowLeft, ArrowUpRight, ExternalLink, Sparkles,
  Pause, Play, Layers, Globe, Smartphone, Code2,
  Cloud, ShieldCheck, Wrench, Settings2, Rocket, TrendingUp,
} from "lucide-react";

const services = [
  {
    id: "A",
    title: "Website Development",
    desc: "Custom websites, e-commerce, and CMS solutions built for performance.",
    Icon: Globe,
    color: "#84cc16",
    tag: "CUSTOM",
  },
  {
    id: "B",
    title: "Mobile App Development",
    desc: "Native iOS & Android apps with cross-platform frameworks.",
    Icon: Smartphone,
    color: "#f59e0b",
    tag: "iOS · ANDROID",
  },
  {
    id: "C",
    title: "Software Development",
    desc: "Desktop apps, SaaS products, and business automation systems.",
    Icon: Code2,
    color: "#ef4444",
    tag: "DESKTOP · SaaS",
  },
  {
    id: "D",
    title: "Cloud Services",
    desc: "Cloud migration, infrastructure as code, and managed hosting.",
    Icon: Cloud,
    color: "#8b5cf6",
    tag: "CLOUD · IaC",
  },
  {
    id: "E",
    title: "IT Consulting",
    desc: "Technology strategy, architecture, and compliance advisory.",
    Icon: ShieldCheck,
    color: "#06b6d4",
    tag: "STRATEGY",
  },
  {
    id: "F",
    title: "AMC & IT Support",
    desc: "Annual maintenance, helpdesk, and hardware support.",
    Icon: Wrench,
    color: "#ec4899",
    tag: "24/7",
  },
  {
    id: "G",
    title: "ERP & CRM Solutions",
    desc: "Implementation, workflow automation, and data migration.",
    Icon: Settings2,
    color: "#10b981",
    tag: "ERP · CRM",
  },
  {
    id: "H",
    title: "Digital Transformation",
    desc: "Process modernization, automation, and cloud strategy.",
    Icon: Rocket,
    color: "#f97316",
    tag: "AUTOMATE",
  },
  {
    id: "I",
    title: "SEO & Blogging Services",
    desc: "On-page & off-page SEO, content strategy, and audits.",
    Icon: TrendingUp,
    color: "#3b82f6",
    tag: "SEO · CONTENT",
  },
];

const NETWORK_NODES = [
  { top: "6%",  left: "8%",  delay: "0s" },
  { top: "12%", left: "32%", delay: "1.2s" },
  { top: "8%",  left: "58%", delay: "2.4s" },
  { top: "15%", left: "85%", delay: "3.6s" },
  { top: "28%", left: "18%", delay: "0.6s" },
  { top: "32%", left: "48%", delay: "1.8s" },
  { top: "26%", left: "76%", delay: "3s" },
  { top: "45%", left: "5%",  delay: "2.1s" },
  { top: "48%", left: "38%", delay: "0.9s" },
  { top: "42%", left: "68%", delay: "2.7s" },
  { top: "58%", left: "22%", delay: "1.5s" },
  { top: "62%", left: "52%", delay: "3.3s" },
  { top: "68%", left: "82%", delay: "0.3s" },
  { top: "78%", left: "12%", delay: "2.4s" },
  { top: "82%", left: "44%", delay: "1.2s" },
  { top: "88%", left: "72%", delay: "3.6s" },
  { top: "92%", left: "28%", delay: "0.9s" },
  { top: "85%", left: "92%", delay: "2.1s" },
];

const NETWORK_LINES = [
  { x1: "8%",  y1: "6%",  x2: "32%", y2: "12%" },
  { x1: "32%", y1: "12%", x2: "58%", y2: "8%" },
  { x1: "58%", y1: "8%",  x2: "85%", y2: "15%" },
  { x1: "18%", y1: "28%", x2: "48%", y2: "32%" },
  { x1: "48%", y1: "32%", x2: "76%", y2: "26%" },
  { x1: "5%",  y1: "45%", x2: "38%", y2: "48%" },
  { x1: "38%", y1: "48%", x2: "68%", y2: "42%" },
  { x1: "22%", y1: "58%", x2: "52%", y2: "62%" },
  { x1: "52%", y1: "62%", x2: "82%", y2: "68%" },
  { x1: "12%", y1: "78%", x2: "44%", y2: "82%" },
  { x1: "44%", y1: "82%", x2: "72%", y2: "88%" },
  { x1: "28%", y1: "92%", x2: "72%", y2: "88%" },
  { x1: "8%",  y1: "6%",  x2: "18%", y2: "28%" },
  { x1: "85%", y1: "15%", x2: "76%", y2: "26%" },
  { x1: "5%",  y1: "45%", x2: "12%", y2: "78%" },
  { x1: "82%", y1: "68%", x2: "92%", y2: "85%" },
  { x1: "32%", y1: "12%", x2: "48%", y2: "32%" },
  { x1: "58%", y1: "8%",  x2: "68%", y2: "42%" },
];

export default function ServicesInfographic() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = services[activeIndex];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % services.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative min-h-screen w-full bg-body text-text-body px-4 py-10 sm:px-8 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Network background */}
      <div className="network-bg">
        <svg className="network-svg" preserveAspectRatio="none">
          {NETWORK_LINES.map((l, i) => (
            <line
              key={i}
              className="network-line"
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </svg>

        {NETWORK_NODES.map((n, i) => (
          <span
            key={i}
            className="network-node"
            style={{
              top: n.top,
              left: n.left,
              animationDelay: n.delay,
            }}
          />
        ))}
      </div>

      {/* Top bar */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <button className="back-arrow flex h-11 w-11 items-center justify-center rounded-xl bg-card border border-border text-heading">
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Sparkles size={14} className="text-primary" />
            <span>Our Services</span>
          </div>

          <button
            onClick={() => setPaused((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-card border border-border text-heading hover:border-primary transition"
            title={paused ? "Play" : "Pause"}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        {/* LEFT: Circle */}
        <div className="flex items-center justify-center relative">
          <div
            className="absolute h-[340px] w-[340px] rounded-full blur-[60px] transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${active.color}55 0%, transparent 70%)`,
            }}
          />

          <div
            key={activeIndex}
            className="relative flex aspect-square w-full max-w-[340px] items-center justify-center rounded-full p-8 text-center transition-all duration-700"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, ${active.color}22 0%, transparent 60%),
                var(--color-bg-card)
              `,
              border: `1px solid ${active.color}66`,
              boxShadow: `0 0 60px ${active.color}33, inset 0 0 40px ${active.color}11`,
              animation: "circlePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div>
              <div className="mb-3 flex items-center justify-center gap-2">
                <Layers size={12} className="text-muted" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  Service {active.id}
                </p>
              </div>

              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500"
                style={{
                  background: `${active.color}22`,
                  color: active.color,
                }}
              >
                <active.Icon size={26} />
              </div>

              <h2 className="mb-4 text-2xl font-bold leading-tight text-heading">
                {active.title}
              </h2>
              <p className="mx-auto max-w-[220px] text-xs leading-relaxed text-muted">
                {active.desc}
              </p>

              <div
                className="mt-4 inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  background: `${active.color}22`,
                  color: active.color,
                }}
              >
                {active.tag}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Pills */}
        <div className="relative flex flex-col justify-center gap-3">
          {services.map((svc, i) => {
            const isActive = i === activeIndex;
            const SvcIcon = svc.Icon;

            return (
              <div
                key={svc.id}
                className="relative flex items-center"
                style={{
                  animation: `pillEnter 0.5s ease-out ${i * 0.06}s both`,
                }}
              >
                <div
                  className="relative z-10 mr-3 hidden h-3 w-3 shrink-0 rounded-full ring-4 ring-[var(--color-bg-body)] transition-all duration-300 lg:block"
                  style={{
                    backgroundColor: svc.color,
                    transform: isActive ? "scale(1.7)" : "scale(1)",
                    boxShadow: isActive ? `0 0 12px ${svc.color}` : "none",
                  }}
                />

                <button
                  onClick={() => setActiveIndex(i)}
                  className={`group flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left transition-all duration-300 bg-card ${
                    isActive
                      ? "shadow-lg -translate-y-0.5"
                      : "hover:shadow-md hover:-translate-y-0.5"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(90deg, ${svc.color}22 0%, var(--color-bg-card) 90%)`
                      : undefined,
                    border: `1px solid ${
                      isActive ? svc.color : "var(--color-border)"
                    }`,
                    boxShadow: isActive ? `0 8px 28px ${svc.color}33` : undefined,
                  }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-all duration-500"
                    style={{
                      backgroundColor: isActive ? svc.color : `${svc.color}22`,
                      color: isActive ? "#ffffff" : svc.color,
                      transform: isActive
                        ? "rotate(-8deg) scale(1.08)"
                        : "rotate(0deg) scale(1)",
                    }}
                  >
                    <SvcIcon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate text-sm font-semibold transition-colors duration-300"
                      style={{
                        color: isActive
                          ? svc.color
                          : "var(--color-text-heading)",
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">
                      {svc.desc}
                    </p>
                  </div>

                  <div
                    className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold transition-all duration-300"
                    style={{
                      background: `${svc.color}22`,
                      color: svc.color,
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {svc.id}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto mt-10 flex max-w-[1200px] items-center justify-between">
        <button className="btn-primary inline-flex items-center gap-2">
          <ArrowUpRight size={14} />
          Visit site
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-card border border-border text-heading hover:border-primary transition">
          <ExternalLink size={16} />
        </button>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes circlePop {
          0%   { opacity: 0; transform: scale(0.85); }
          60%  { transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pillEnter {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}