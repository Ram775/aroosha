// src/components/sections/TechnologySection.jsx
import React, { useEffect, useState } from "react";
import {
  Cloud,
  ClipboardList,
  ShieldCheck,
  Bot,
  Network,
} from "lucide-react";

const techStack = [
  {
    title: "Cloud Data Server",
    desc: "High-availability storage and analytics for large-scale applications.",
    icon: <Cloud size={26} strokeWidth={1.8} />,
  },
  {
    title: "Project Management",
    desc: "Seamlessly connecting diverse technology platforms.",
    icon: <ClipboardList size={26} strokeWidth={1.8} />,
  },
  {
    title: "Data Security",
    desc: "Ensuring data integrity and compliance.",
    icon: <ShieldCheck size={26} strokeWidth={1.8} />,
  },
  {
    title: "AI & Automation",
    desc: "Smart automation for workflows.",
    icon: <Bot size={26} strokeWidth={1.8} />,
  },
  {
    title: "Network Infrastructure",
    desc: "Optimized secure data transfer systems.",
    icon: <Network size={26} strokeWidth={1.8} />,
  },
];

export default function TechnologySection() {
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotate = setInterval(() => {
      setRotation((p) => p + 0.15);
    }, 16);
    return () => clearInterval(rotate);
  }, []);

  useEffect(() => {
    const auto = setInterval(() => {
      setActive((p) => (p + 1) % techStack.length);
    }, 3500);
    return () => clearInterval(auto);
  }, []);

  const size = "clamp(260px, 70vw, 380px)";
  const radius = "clamp(90px, 25vw, 140px)";

  return (
    <section className="relative bg-muted py-20 px-4 md:px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-14 max-w-3xl">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">
            Technology stack
          </p>

          <div className="w-full h-[1px] bg-[var(--color-border)] mb-8"></div>

          {/* ✅ Heading — sirf font SIZE chota kiya */}
          <h2 className="text-[20px] md:text-[30px] font-bold text-heading leading-[1.15]">
            <span className="block">Our engineers apprehend your</span>

            <span className="italic text-primary font-[Playfair_Display] font-semibold">
              business requirements
            </span>{" "}
            and help

            <span className="block">
              you choose the right technology.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full border border-dashed border-gray-500"
              style={{
                width: size,
                height: size,
                transform: `rotate(${rotation}deg)`,
              }}
            />

            <div
              className="absolute rounded-full border border-gray-300"
              style={{
                width: `calc(${size} - 110px)`,
                height: `calc(${size} - 110px)`,
                transform: `rotate(-${rotation}deg)`,
              }}
            />

            <div className="absolute w-[140px] h-[140px] rounded-full bg-primary/90 blur-[80px]" />

            <div className="relative" style={{ width: size, height: size }}>
              {techStack.map((item, i) => {
                const angle = (i / techStack.length) * 360 + rotation;
                const isActive = i === active;

                return (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    className="absolute top-1/2 left-1/2 cursor-pointer"
                    style={{
                      transform: `
                        rotate(${angle}deg)
                        translate(${radius})
                        rotate(-${angle}deg)
                      `,
                    }}
                  >
                    <div
                      className={`w-[90px] h-[90px] rounded-full bg-card border shadow-md flex flex-col items-center justify-center text-center px-2 transition-all duration-300 ${
                        isActive
                          ? "border-primary scale-110"
                          : "border-[var(--color-border)]"
                      }`}
                    >
                      <div className="text-primary mb-1">{item.icon}</div>

                      <p className="text-[10px] font-medium leading-4 text-heading">
                        {item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-card rounded-[24px] border border-[var(--color-border)] shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-primary-light to-primary-pale"></div>

            <h3 className="text-[20px] font-semibold text-primary mb-4">
              {techStack[active].title}
            </h3>

            <p className="text-[13px] leading-7 text-body mb-8">
              {techStack[active].desc}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted p-5 rounded-xl border border-[var(--color-border)]">
                <h4 className="font-semibold mb-2 text-[15px] text-heading">
                  Scalable Systems
                </h4>
                <p className="text-[12px] text-muted">
                  Future-ready infrastructure for enterprise workflows.
                </p>
              </div>

              <div className="bg-muted p-5 rounded-xl border border-[var(--color-border)]">
                <h4 className="font-semibold mb-2 text-[15px] text-heading">
                  Smart Solutions
                </h4>
                <p className="text-[12px] text-muted">
                  Intelligent automation with secure architecture.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {techStack.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-3 rounded-full text-[12px] border transition ${
                i === active
                  ? "bg-primary text-white border-primary"
                  : "bg-card border-[var(--color-border)] text-body"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}