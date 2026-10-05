// src/pages/user/FAQ/index.jsx
import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  MessageCircleQuestion,
  Mail,
} from "lucide-react";

// ============================================================
// 📌 STATIC FAQ DATA
// ============================================================
const FAQS = [
  {
    id: 1,
    category: "General",
    question: "What services does NetBeans Systems provide?",
    answer:
      "We provide web development, mobile app development, UI/UX design, cloud solutions, and IT consulting services tailored to your business needs.",
  },
  {
    id: 2,
    category: "General",
    question: "How can I contact your support team?",
    answer:
      "You can reach us via email at info@netbeanssystems.com, call us at +91 98765 43210, or fill out the contact form on our website. We respond within 24 hours.",
  },
  {
    id: 3,
    category: "General",
    question: "What industries do you serve?",
    answer:
      "We serve a wide range of industries including healthcare, e-commerce, education, finance, real estate, logistics, and SaaS startups.",
  },
  {
    id: 4,
    category: "General",
    question: "Where is your company located?",
    answer:
      "Our head office is in Hyderabad, India. We work with clients globally and also offer remote collaboration for international projects.",
  },
  {
    id: 5,
    category: "Pricing",
    question: "How much does a typical project cost?",
    answer:
      "Project cost depends on scope, complexity, and timeline. We offer flexible pricing models — fixed price, hourly, and dedicated team. Contact us for a free quote.",
  },
  {
    id: 6,
    category: "Pricing",
    question: "Do you offer custom packages for startups?",
    answer:
      "Yes! We have special startup-friendly packages with flexible payment terms and MVP development options to help you launch faster within budget.",
  },
  {
    id: 7,
    category: "Pricing",
    question: "What are your payment terms?",
    answer:
      "We typically follow a milestone-based payment model — 30% advance, 40% on mid-delivery, and 30% on final delivery. Custom terms are available for long-term projects.",
  },
  {
    id: 8,
    category: "Process",
    question: "What is your typical project timeline?",
    answer:
      "A small project takes 2–4 weeks, medium 1–3 months, and large enterprise projects 3–6 months. We share a detailed timeline during the discovery phase.",
  },
  {
    id: 9,
    category: "Process",
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes, we offer ongoing maintenance, bug fixes, feature updates, and 24/7 monitoring packages to keep your product running smoothly after launch.",
  },
  {
    id: 10,
    category: "Process",
    question: "How do you handle project communication?",
    answer:
      "We use tools like Slack, Zoom, and project management platforms like Jira or Trello. You get regular updates, sprint reviews, and a dedicated point of contact.",
  },
  {
    id: 11,
    category: "Technical",
    question: "Which technologies do you work with?",
    answer:
      "We work with React, Next.js, Node.js, Python, Django, Flutter, React Native, AWS, Azure, PostgreSQL, MongoDB, and more modern tech stacks.",
  },
  {
    id: 12,
    category: "Technical",
    question: "Will I own the source code of my project?",
    answer:
      "Absolutely. Once the project is delivered and payment is complete, you receive full ownership of the source code and all related assets.",
  },
  {
    id: 13,
    category: "Technical",
    question: "Do you provide API integration services?",
    answer:
      "Yes, we integrate third-party APIs like payment gateways (Razorpay, Stripe), CRMs, ERPs, SMS/email services, and custom REST or GraphQL APIs.",
  },
  {
    id: 14,
    category: "Support",
    question: "What kind of support do you offer after delivery?",
    answer:
      "We offer email, chat, and phone support. For enterprise clients, we also provide dedicated account managers and SLA-based response times.",
  },
  {
    id: 15,
    category: "Support",
    question: "Do you offer training for our internal team?",
    answer:
      "Yes, we provide documentation, video walkthroughs, and live training sessions to help your team manage and use the delivered product confidently.",
  },
];

// Category colors
const CATEGORY_COLORS = {
  General: "bg-blue-50 text-blue-700 border-blue-200",
  Pricing: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Process: "bg-amber-50 text-amber-700 border-amber-200",
  Technical: "bg-violet-50 text-violet-700 border-violet-200",
  Support: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function UserFAQ() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const categories = ["all", ...new Set(FAQS.map((f) => f.category))];

  const filteredFaqs =
    categoryFilter === "all"
      ? FAQS
      : FAQS.filter((f) => f.category === categoryFilter);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-body text-text-body overflow-x-hidden">
      {/* ════════════════════════════════
          HERO SECTION
      ════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[340px] flex flex-col items-center justify-center text-center px-6 py-20 bg-body">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600"
            alt="faq"
            className="w-full h-full object-cover scale-105 opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
        </div>

        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
          <HelpCircle size={12} />
          Frequently Asked Questions
        </div>

        <h1 className="relative z-10 text-heading font-bold tracking-[1px] text-[clamp(2.5rem,6vw,4rem)] mb-4">
          Got{" "}
          <span className="text-primary font-[Playfair_Display] italic font-medium">
            Questions?
          </span>
        </h1>

        <p className="relative z-10 text-[15px] text-muted max-w-[680px] leading-8">
          Find answers to the most common questions about our services,
          pricing, process, and support. Can't find what you need? Reach out
          to us anytime.
        </p>
      </section>

      {/* ════════════════════════════════
          MAIN FAQ SECTION
      ════════════════════════════════ */}
      <section className="relative max-w-4xl mx-auto px-6 py-16">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                categoryFilter === c
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-muted hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-center text-xs text-muted mb-8">
          Showing{" "}
          <span className="text-heading font-semibold">
            {filteredFaqs.length}
          </span>{" "}
          of {FAQS.length} questions
        </p>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`group bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "border-primary/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                    : "border-border hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                }`}
                style={{
                  animation: `fadeSlideIn 0.4s ease-out ${i * 0.04}s both`,
                }}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-start gap-4 p-5 md:p-6 text-left"
                >
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MessageCircleQuestion
                      size={18}
                      className="text-primary"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${
                          CATEGORY_COLORS[faq.category] ||
                          "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-heading leading-snug group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-2 rounded-lg bg-primary-pale shrink-0">
                    <ChevronDown
                      size={16}
                      className={`text-primary transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                {/* Answer — smooth expand */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1 border-t border-border ml-14">
                      <p className="text-sm text-muted leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ════════════════════════════════
            BOTTOM CTA
        ════════════════════════════════ */}
        <div className="mt-16">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-card to-primary/5 border border-border rounded-2xl p-8 md:p-10 text-center">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                <Mail size={22} className="text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-heading mb-2">
                Still have{" "}
                <span className="text-primary font-[Playfair_Display] italic font-medium">
                  questions?
                </span>
              </h3>
              <p className="text-sm text-muted max-w-md mx-auto mb-6 leading-7">
                Can't find what you're looking for? Our team is here to help
                — reach out and we'll get back to you within 24 hours.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 group/cta"
              >
                Contact Us
                <span className="transition-transform group-hover/cta:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Keyframe */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}