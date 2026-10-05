// src/components/sections/Process.jsx
import { motion } from "framer-motion";
import { Search, Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discover",
    desc: "We understand your business, goals, and target audience through deep research and workshops.",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Design",
    desc: "Our designers craft intuitive, beautiful interfaces backed by user research and best practices.",
  },
  {
    num: "03",
    icon: Code,
    title: "Develop",
    desc: "Our engineers build scalable, secure, and performant solutions using modern tech stacks.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Deploy",
    desc: "We launch, monitor, and continuously improve — ensuring your product scales seamlessly.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-body py-8 sm:py-10 md:py-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-primary/5 blur-[120px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* ============================================
            HEADER — Bahut kam gap
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] mb-2"
            style={{
              background: "var(--color-primary-pale)",
              border: "1px solid var(--color-primary-light, rgba(249,115,22,0.3))",
              color: "var(--color-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Our Process
          </div>

          {/* Heading */}
          <h2
            className="font-semibold leading-[1.2] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-3xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading, #1a1a1a)",
            }}
          >
            How We{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Work
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
            A proven 4-step process that ensures your project delivers on time,
            on budget, and beyond expectations.
          </p>

          {/* Divider */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3">
            <div
              className="h-px w-8 sm:w-12"
              style={{ background: "var(--color-border, #f1e7dd)" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            <div
              className="h-px w-8 sm:w-12"
              style={{ background: "var(--color-border, #f1e7dd)" }}
            />
          </div>
        </motion.div>

        {/* ============================================
            STEPS — Tight grid
            ============================================ */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-10 xl:top-12 left-[12%] right-[12%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-4 lg:gap-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group relative text-center"
                >
                  {/* Icon + Number badge */}
                  <div className="relative inline-flex items-center justify-center mb-2.5 sm:mb-3">
                    {/* Outer dashed ring */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 25 + i * 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full border border-dashed"
                      style={{
                        borderColor: "var(--color-primary)",
                        opacity: 0.2,
                      }}
                    />

                    {/* Icon circle */}
                    <div
                      className="relative w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "var(--color-primary)",
                        boxShadow: "0 8px 24px var(--color-primary-pale)",
                      }}
                    >
                      <Icon
                        size={18}
                        className="text-white sm:w-[20px] sm:h-[20px]"
                      />
                    </div>

                    {/* Number badge */}
                    <div
                      className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--color-bg-card, #ffffff)",
                        border: "2px solid var(--color-primary)",
                      }}
                    >
                      <span
                        className="text-[8px] sm:text-[9px] font-bold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sm sm:text-base md:text-lg font-bold mb-1 transition-colors duration-300"
                    style={{
                      color: "var(--color-text-heading, #1a1a1a)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[11px] sm:text-xs md:text-sm leading-5 sm:leading-6 max-w-[220px] sm:max-w-xs mx-auto"
                    style={{
                      color: "var(--color-text-muted, #6B7280)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}