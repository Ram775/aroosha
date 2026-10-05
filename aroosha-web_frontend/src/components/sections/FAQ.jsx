// src/components/sections/FAQ.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What services does Aroosha offer?",
    a: "We offer end-to-end digital services including web development, mobile app development, custom e-commerce solutions, digital marketing, graphic design, and enterprise ERP/CRM systems. Every solution is tailored to your business needs.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex platforms may take 2-4 months. We provide detailed timelines after understanding your requirements.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Absolutely! All our projects include post-launch support. We also offer ongoing maintenance packages that include updates, monitoring, security patches, and continuous improvements.",
  },
  {
    q: "What is your pricing model?",
    a: "We offer flexible pricing — fixed-price for well-defined projects and hourly/monthly retainers for ongoing work. Contact us for a customized quote based on your specific needs.",
  },
  {
    q: "Which industries do you specialize in?",
    a: "We've worked across 25+ industries including e-commerce, healthcare, finance, education, real estate, government, and SaaS. Our diverse experience helps us adapt quickly to any domain.",
  },
  {
    q: "How do we get started?",
    a: "Simply reach out via our contact form or call us. We'll schedule a free consultation to understand your goals, then provide a detailed proposal with timeline and pricing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section className="relative overflow-hidden bg-body pt-16 sm:pt-20 md:pt-24 pb-20 md:pb-28">
      {/* Glow blobs — GLOBAL */}
      <div
        className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 blur-[120px] rounded-full pointer-events-none"
        style={{ background: "var(--color-primary-pale)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 blur-[120px] rounded-full pointer-events-none"
        style={{ background: "var(--color-primary-pale)" }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* ============================================
            HEADER — LEFT ALIGNED
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 sm:mb-10 text-left"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] mb-3"
            style={{
              background: "var(--color-primary-pale)",
              border: "1px solid var(--color-primary-light)",
              color: "var(--color-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <HelpCircle size={11} />
            FAQ
          </div>

          {/* Heading — Playfair Display italic, chhota */}
          <h2
            className="font-semibold leading-[1.2] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[30px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading, #1a1a1a)",
            }}
          >
            Frequently Asked{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Questions
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="mt-2 text-xs sm:text-sm leading-6 max-w-md sm:max-w-xl"
            style={{
              color: "var(--color-text-muted, #6B7280)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Got questions? We've got answers. If you don't find what you're
            looking for, feel free to contact us.
          </p>

          {/* Divider — left aligned */}
          <div className="mt-3 sm:mt-4 flex items-center gap-3 justify-start">
            <div
              className="h-px w-10 sm:w-14"
              style={{ background: "var(--color-border)" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            <div
              className="h-px w-10 sm:w-14"
              style={{ background: "var(--color-border)" }}
            />
          </div>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="rounded-2xl overflow-hidden transition-all duration-300 border"
              style={{
                background: "var(--color-bg-card)",
                borderColor:
                  openIndex === i
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                boxShadow:
                  openIndex === i
                    ? "0 8px 30px var(--color-shadow)"
                    : "0 4px 16px var(--color-shadow)",
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left group"
              >
                {/* Plus/Minus icon — LEFT SIDE */}
                <span
                  className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5"
                  style={{
                    background:
                      openIndex === i
                        ? "var(--color-primary)"
                        : "var(--color-primary-pale)",
                    color:
                      openIndex === i
                        ? "#ffffff"
                        : "var(--color-primary)",
                  }}
                >
                  {openIndex === i ? (
                    <Minus size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </span>

                {/* Question — LEFT ALIGNED */}
                <span
                  className="flex-1 text-sm sm:text-base font-semibold transition-colors duration-300 text-left"
                  style={{
                    color:
                      openIndex === i
                        ? "var(--color-primary)"
                        : "var(--color-text-heading)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {faq.q}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pl-14 sm:pl-[72px]">
                      <p
                        className="text-xs sm:text-sm leading-6 sm:leading-7 text-left"
                        style={{
                          color: "var(--color-text-muted)",
                          fontFamily: "'Inter', system-ui, sans-serif",
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}