// src/pages/AboutUs.jsx
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FaBuilding,
  FaRobot,
  FaMobileScreenButton,
  FaCloud,
} from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { MdOutlineAccountBalance } from "react-icons/md";

// ✅ LOCAL IMAGES
import aboutImg from "../../../assets/images/about.png";
import about01Img from "../../../assets/images/about01.png";
import about02Img from "../../../assets/images/about02.png";

export default function AboutUs() {
  const navigate = useNavigate();
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);

  // ✅ Image slider state
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const heroImages = [aboutImg, about01Img, about02Img];

  useEffect(() => {
    const i = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(i);
  }, [heroImages.length]);

  const milestones = [
    {
      year: "2023",
      num: "1",
      text: `In 2023, Aroosha started building its presence through impactful digital projects and creative business solutions.

- Delivered projects for reputed institutions  
- Built strong client relationships  
- Expanded industry experience`,
    },
    {
      year: "2024",
      num: "2",
      text: `In 2024, Aroosha expanded its services with a focus on scalable digital products and modern user experiences.

- Introduced advanced digital solutions  
- Improved service quality & reliability  
- Expanded global client reach`,
    },
    {
      year: "2025",
      num: "3",
      text: `In 2025, Aroosha focused on innovation, AI-driven technologies, and building stronger global partnerships.

- Expanded AI & automation services  
- Strengthened international collaborations  
- Delivered next-generation solutions`,
    },
    {
      year: "2026",
      num: "4",
      text: `In 2026, Aroosha continued accelerating growth by delivering smart, scalable, and future-ready digital experiences.

- Focused on innovation-driven development  
- Enhanced enterprise-level solutions  
- Improved performance & scalability`,
    },
  ];

  const whyUs = [
    "We design attractive & innovative apps",
    "Entire Development takes place in-house",
    "100% in-house experts",
    "Full-service development agency",
    "Transparent reports",
    "Infinitely scalable",
    "Easy Communication",
    "Provides Customized Solutions",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(false);
          setTimeout(() => {
            setStartCount(true);
          }, 100);
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const cases = [
    {
      icon: <FaBuilding />,
      title: "Enterprise Web Platform Transformation",
      desc: "Developed a scalable enterprise web platform that improved performance, automated workflows, and enhanced customer engagement across business operations.",
      tag: "Enterprise",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    },
    {
      icon: <FaRobot />,
      title: "AI-Driven Business Intelligence",
      desc: "Implemented AI-powered analytics and automation systems to support real-time decision making, forecasting, and operational efficiency.",
      tag: "AI / ML",
      img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800",
    },
    {
      icon: <FaMobileScreenButton />,
      title: "Mobile App for Customer Engagement",
      desc: "Built a high-performance mobile application enabling seamless user interaction, improved retention, and better service accessibility.",
      tag: "Mobile",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Migration & Modernization",
      desc: "Migrated legacy systems to a secure cloud infrastructure, improving scalability, uptime, and operational reliability for enterprise clients.",
      tag: "Cloud",
      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800",
    },
    {
      icon: <HiOutlineShoppingCart />,
      title: "E-commerce Platform Development",
      desc: "Designed a full-scale e-commerce platform with integrated payments, analytics, and automation to increase conversions and customer satisfaction.",
      tag: "E-commerce",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
    },
    {
      icon: <MdOutlineAccountBalance />,
      title: "Government Digital Transformation",
      desc: "Delivered secure digital platforms for public sector workflows, enabling transparency, faster processing, and centralized data management.",
      tag: "Gov-Tech",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
    },
  ];

  function Counter({ end, suffix = "+" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  }

  return (
    <div className="bg-body min-h-screen text-heading overflow-hidden">
      {/* ============================================
          HERO — with animated image slider
          ============================================ */}
      <section className="relative overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 bg-body">
        {/* ✅ Background image slider with animation */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroImgIndex}
              src={heroImages[heroImgIndex]}
              alt="about"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.12, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
        </div>

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 18 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-1/2 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] border border-primary/10"
              style={{
                width: `${300 + i * 80}px`,
                height: `${300 + i * 80}px`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: "20%", left: "10%", size: 5, delay: 0 },
            { top: "70%", left: "20%", size: 4, delay: 1 },
            { top: "30%", left: "85%", size: 6, delay: 0.5 },
            { top: "75%", left: "80%", size: 4, delay: 1.5 },
          ].map((p, i) => (
            <motion.span
              key={`hp-${i}`}
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
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.9, 1.3, 0.9],
              }}
              transition={{
                duration: 5 + i,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-3"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            color: "var(--color-text-heading)",
          }}
        >
          About{" "}
          <span className="font-bold" style={{ color: "var(--color-primary)" }}>
            Aroosha
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 text-xs sm:text-sm max-w-[600px] leading-6 sm:leading-7"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Building innovative digital experiences with creativity, technology,
          and scalable solutions for modern businesses.
        </motion.p>
      </section>

      {/* ============================================
          OUR STORY
          ============================================ */}
      <section className="px-4 sm:px-6 md:px-[6%] pt-14 sm:pt-20 max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] sm:text-[11px] tracking-[3px] uppercase font-medium"
                style={{
                  color: "var(--color-text-muted)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Our Story
              </span>
              <div
                className="w-7 h-[1px]"
                style={{ background: "var(--color-border)" }}
              />
            </div>

            <div className="flex gap-4 mb-6">
              <div
                className="w-1 rounded-full shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-primary), var(--color-primary-light, #FBBF24))",
                }}
              />
              <h2
                className="font-semibold leading-[1.25] text-base sm:text-lg md:text-xl lg:text-2xl"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  color: "var(--color-text-heading)",
                }}
              >
                Your Vision Our Expertise Your Success Get Noticed Generate{" "}
                <span
                  className="font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Leads Dominate.
                </span>
              </h2>
            </div>

            <p
              className="text-[11px] sm:text-xs leading-6 sm:leading-7 mb-3"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              We are a young and creative company and we offer you fresh
              business ideas.
            </p>

            <p
              className="text-[11px] sm:text-xs leading-6 sm:leading-7"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Bring to the table win-win survival strategies to ensure
              proactive domination. We focus on delivering scalable digital
              solutions, improving user experience, and helping businesses
              achieve consistent growth through smart technology and creative
              execution.
            </p>
          </motion.div>

          {/* ✅ RIGHT — Images with unique hover animation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {[
              {
                src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
                mt: 0,
              },
              {
                src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600",
                mt: 40,
              },
            ].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 relative group"
                style={{
                  marginTop:
                    typeof window !== "undefined" && window.innerWidth > 640
                      ? img.mt
                      : 0,
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden aspect-[3/4] relative"
                  style={{
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* ✅ Zoom + grayscale animation on hover */}
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale-[60%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* ✅ Orange glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(249,115,22,0.4), transparent 60%)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div
          className="h-px w-full my-6"
          style={{ background: "var(--color-border)" }}
        ></div>

        {/* ============================================
            SECOND ROW — Image + Stats
            ============================================ */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center mt-12 sm:mt-16 pb-14 sm:pb-20">
          {/* ✅ IMAGE with unique animation */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
            className="group"
          >
            <div
              className="rounded-[20px] overflow-hidden aspect-[4/3] relative"
              style={{
                border: "1px solid var(--color-border)",
                boxShadow:
                  "0 20px 60px rgba(249, 115, 22, 0.1), 0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900"
                alt="Team"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale-[35%] group-hover:grayscale-0"
              />

              {/* ✅ Orange overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249,115,22,0.3), transparent 70%)",
                }}
              />

              {/* ✅ Floating badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  ● Our Team
                </span>
              </div>
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h2
              className="font-semibold leading-[1.25] text-base sm:text-lg md:text-xl lg:text-2xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "var(--color-text-heading)",
              }}
            >
              Turning Your Vision Into{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Powerful Digital Success
              </span>{" "}
              That Helps You Grow & Stand Out
            </h2>
            <p
              className="text-[11px] sm:text-xs leading-6 sm:leading-7 mb-6"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              We are committed to delivering high-quality solutions with a
              focus on innovation.
            </p>

            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 mb-6 rounded-xl overflow-hidden"
              style={{
                border: "1px solid var(--color-border)",
                boxShadow:
                  "0 14px 40px rgba(249, 115, 22, 0.1), 0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              {[
                { num: "200+", label: "Projects Delivered" },
                { num: "70+", label: "In-House Specialists" },
                { num: "3+", label: "Years of Experience" },
                { num: "25+", label: "Industries Served" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative text-center py-4 sm:py-5 px-2 sm:px-3"
                  style={{
                    background:
                      i % 2 === 0
                        ? "var(--color-bg-muted, #f8f4f0)"
                        : "var(--color-bg-card)",
                  }}
                >
                  {i % 2 !== 0 && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[1px]"
                      style={{ background: "var(--color-border)" }}
                    />
                  )}
                  {i >= 2 && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] md:hidden"
                      style={{ background: "var(--color-border)" }}
                    />
                  )}

                  <div
                    className="text-xl sm:text-2xl font-black mb-1 tabular-nums"
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {startCount && <Counter end={parseInt(s.num)} suffix="+" />}
                  </div>
                  <div
                    className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold"
                    style={{
                      color: "var(--color-text-muted)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <p
              className="text-[10px] sm:text-[11px] tracking-[2px] uppercase"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Trusted • Creative • Result Driven
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          JOURNEY
          ============================================ */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6 md:px-[6%]"
        style={{ background: "var(--color-bg-muted)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2
              className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "var(--color-text-heading)",
              }}
            >
              Milestones and Growth{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Through the Years
              </span>
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block"
              style={{ background: "var(--color-primary)" }}
            />
            <div
              className="absolute left-5 top-0 bottom-0 w-[2px] md:hidden"
              style={{ background: "var(--color-primary)" }}
            />

            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: false, amount: 0.25 }}
                  className="relative grid md:grid-cols-[1fr_56px_1fr] items-center mb-10 sm:mb-14"
                >
                  <div
                    className={`hidden md:block ${
                      isLeft ? "text-right pr-7" : "invisible"
                    }`}
                  >
                    <div
                      className="text-base sm:text-lg font-bold mb-1"
                      style={{
                        color: "var(--color-primary)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {m.year}
                    </div>
                    <div
                      className="text-[11px] sm:text-xs leading-6 max-w-[320px] ml-auto whitespace-pre-line"
                      style={{
                        color: "var(--color-text-body)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {m.text}
                    </div>
                  </div>

                  <div className="relative flex justify-center md:justify-center justify-start">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold z-10"
                      style={{
                        background:
                          i % 2 === 0
                            ? "var(--color-primary)"
                            : "var(--color-bg-card, #fff)",
                        border: "2px solid var(--color-primary)",
                        color:
                          i % 2 === 0 ? "#fff" : "var(--color-primary)",
                        boxShadow:
                          "0 0 0 4px rgba(249, 115, 22, 0.15), 0 4px 12px rgba(249, 115, 22, 0.3)",
                      }}
                    >
                      {m.num}
                    </motion.div>
                  </div>

                  <div
                    className={`md:block ${
                      !isLeft ? "pl-7" : "invisible md:block"
                    }`}
                  >
                    <div
                      className="text-base sm:text-lg font-bold mb-1 md:block hidden"
                      style={{
                        color: "var(--color-primary)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {m.year}
                    </div>
                    <div
                      className="text-[11px] sm:text-xs leading-6 max-w-[320px] whitespace-pre-line md:block hidden"
                      style={{
                        color: "var(--color-text-body)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {m.text}
                    </div>
                  </div>

                  <div className="md:hidden pl-16 -mt-10">
                    <div
                      className="text-base font-bold mb-1"
                      style={{
                        color: "var(--color-primary)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {m.year}
                    </div>
                    <div
                      className="text-[11px] leading-6 whitespace-pre-line"
                      style={{
                        color: "var(--color-text-body)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div
        className="h-px w-full max-w-[900px] mx-auto"
        style={{ background: "var(--color-border)" }}
      ></div>

      {/* ============================================
          WHY US
          ============================================ */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6 md:px-[6%]"
        style={{ background: "var(--color-bg-card)" }}
      >
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h2
              className="font-semibold leading-[1.25] text-base sm:text-lg md:text-xl lg:text-2xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "var(--color-text-heading)",
              }}
            >
              Why Work{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                With Aroosha?
              </span>
            </h2>
            <p
              className="text-[11px] sm:text-xs leading-6 sm:leading-7 mb-6"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Making ideas come to life in a better way.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
              {whyUs.map((w, i) => (
                <motion.div
                  key={w}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-medium transition-all"
                  style={{
                    background:
                      i % 2 === 0
                        ? "var(--color-primary-pale, rgba(249,115,22,0.1))"
                        : "var(--color-bg-card)",
                    border:
                      i % 2 === 0
                        ? "1px solid var(--color-primary-light, rgba(249,115,22,0.3))"
                        : "1px solid var(--color-border)",
                    color:
                      i % 2 === 0
                        ? "var(--color-primary)"
                        : "var(--color-text-body)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  ✦ {w}
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all group/btn"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
                boxShadow: "0 10px 30px rgba(249,115,22,0.35)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Join Our Team →
            </motion.button>
          </motion.div>

          {/* ✅ Image with unique animation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
            className="relative group"
          >
            <div
              className="rounded-3xl overflow-hidden aspect-[4/3]"
              style={{
                border: "1px solid var(--color-border)",
                boxShadow:
                  "0 20px 60px rgba(249, 115, 22, 0.1), 0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900"
                alt="team"
                className="w-full h-full object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>

            {/* ✅ Floating stat badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 px-4 py-3 rounded-2xl backdrop-blur-md z-10"
              style={{
                background: "var(--color-primary)",
                boxShadow: "0 10px 30px rgba(249,115,22,0.5)",
              }}
            >
              <p
                className="text-lg sm:text-xl font-black text-white leading-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                9+
              </p>
              <p
                className="text-[9px] uppercase tracking-wider text-white/80 font-semibold mt-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Years
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          CASE STUDIES — Cards with image + unique animation
          ============================================ */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6 md:px-[6%]"
        style={{ background: "var(--color-bg-muted)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "var(--color-text-heading)",
              }}
            >
              Driving{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Digital Transformations
              </span>{" "}
              Across Industries
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="relative rounded-[18px] overflow-hidden group"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow:
                    "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(249, 115, 22, 0.15), 0 8px 24px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)";
                }}
              >
                {/* ✅ Image section with unique animation */}
                <div className="relative w-full h-[140px] sm:h-[160px] overflow-hidden">
                  {/* Fallback gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #F97316 0%, #C2410C 100%)",
                    }}
                  />

                  {/* Image with zoom on hover */}
                  <img
                    src={c.img}
                    alt={c.title}
                    className="relative w-full h-full object-cover z-10 transition-all duration-700 group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20 pointer-events-none" />

                  {/* ✅ Icon badge (bottom-left of image) */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-3 left-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg backdrop-blur-md"
                    style={{
                      background: "rgba(249, 115, 22, 0.95)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)",
                    }}
                  >
                    {c.icon}
                  </motion.div>

                  {/* ✅ Tag badge (top-right of image) */}
                  <div className="absolute top-3 right-3 z-30">
                    <span
                      className="px-2.5 py-1 rounded-full backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>
                </div>

                {/* ✅ Content section */}
                <div className="p-4 sm:p-5">
                  <h4
                    className="font-bold text-sm sm:text-[15px] mb-2 leading-6 relative z-10 group-hover:text-primary transition-colors duration-300"
                    style={{
                      color: "var(--color-text-heading)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {c.title}
                  </h4>
                  <p
                    className="text-[11px] sm:text-xs leading-6 relative z-10"
                    style={{
                      color: "var(--color-text-muted)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {c.desc}
                  </p>
                </div>

                {/* ✅ Bottom progress line on hover */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary), transparent)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          BOTTOM CTA
          ============================================ */}
      <section
        className="relative py-14 sm:py-20 px-4 sm:px-6 text-center overflow-hidden"
        style={{ background: "var(--color-bg-card)" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.13) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="relative"
        >
          <h2
            className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading)",
            }}
          >
            Ready to{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Build Something Great?
            </span>
          </h2>
          <p
            className="text-[11px] sm:text-xs max-w-[480px] mx-auto mb-6 sm:mb-8"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Let's transform your vision into a powerful digital product.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all group/btn"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
              boxShadow: "0 12px 40px rgba(249,115,22,0.5)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Get In Touch →
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}