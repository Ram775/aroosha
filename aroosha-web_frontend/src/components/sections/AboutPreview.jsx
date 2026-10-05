// src/components/about/WhoWeAre.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ✅ LOCAL IMAGES
import aboutImg from "../../assets/images/about03.png";
import about01Img from "../../assets/images/about04.png";
import about02Img from "../../assets/images/about02.png";

export default function WhoWeAre() {
  // ✅ LOCAL IMAGES array
  const images = [aboutImg, about01Img, about02Img];

  // ✅ FIX: index state add kiya (ye missing tha)
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(i);
  }, [images.length]);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--color-bg-muted)",
        color: "var(--color-text-body)",
      }}
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary-light/20 blur-[120px] rounded-full"></div>

      {/* AROOSHA WATERMARK */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <motion.div
          animate={{ x: [-30, 30, -30] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-[42px] sm:text-[60px] md:text-[110px] font-bold tracking-widest"
            style={{ color: "var(--color-text-heading)", opacity: 0.08 }}
          >
            AROOSHA
          </span>
        </motion.div>
      </div>

      {/* WAVE */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <motion.svg
          viewBox="0 0 1440 200"
          className="w-[160%] md:w-[120%] -left-[30%] md:-left-[10%] relative drop-shadow-md"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <path
            fill="var(--color-bg-body)"
            d="M0,80C240,160,480,0,720,40C960,80,1200,160,1440,120V0H0Z"
          />
        </motion.svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20">
        {/* HEADER (UPAR) */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-20">
            <p
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Who We Are
            </p>

            <h2
              className="mt-2 leading-[1.2] tracking-tight font-semibold text-lg sm:text-xl md:text-2xl lg:text-[30px]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "var(--color-text-heading)",
              }}
            >
              The Innovation Engine —{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                of India
              </span>
            </h2>

            <p
              className="mt-3 text-xs sm:text-sm"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Netbeans Systems Private Limited delivers secure, scalable, and
              high-performance digital solutions.
            </p>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center relative">
          {/* DIVIDER */}
          <div
            className="hidden md:block absolute left-[48%] top-0 h-full w-[1.5px] opacity-70"
            style={{ background: "var(--color-border)" }}
          ></div>

          {/* ============================================
              LEFT — STACKED CARD + IMAGE
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: false, amount: 0.2 }}
            className="relative flex flex-col items-center"
          >
            <div className="absolute -top-14 md:-right-8 right-0 w-[180px] md:w-[260px] h-[180px] md:h-[260px] bg-primary/40 blur-2xl rounded-full"></div>

            {/* ✅ CIRCLE — CHOTA + PEECHE + RIGHT */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-12 md:-top-16 right-0 md:-right-7 w-[170px] md:w-[230px] h-[170px] md:h-[230px] rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center z-0 pointer-events-none"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>

                <text
                  fill="var(--color-text-heading)"
                  fontSize="10"
                  letterSpacing="3"
                >
                  <textPath href="#circlePath">
                    Innovation • Performance • Scalability • Security • Web Dev
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* STACKED CARD */}
            <div className="relative w-full max-w-[460px] mt-4 z-10">
              {/* BACK CARD 1 */}
              <div
                className="absolute inset-0 rounded-[40px] md:rounded-[50px] -translate-x-3 -translate-y-3 sm:-translate-x-4 sm:-translate-y-4 rotate-[-3deg]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))",
                  border: "1px solid rgba(249,115,22,0.25)",
                }}
              />

              {/* BACK CARD 2 */}
              <div
                className="absolute inset-0 rounded-[40px] md:rounded-[50px] -translate-x-1.5 -translate-y-1.5 sm:-translate-x-2 sm:-translate-y-2 rotate-[-1.5deg]"
                style={{
                  background: "var(--color-bg-card, #ffffff)",
                  border: "1px solid var(--color-border, #f1e7dd)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
              />

              {/* FRONT CARD */}
              <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-[40px] md:rounded-[50px] overflow-hidden shadow-2xl">
<div className="absolute inset-0 rounded-[40px] md:rounded-[50px] bg-gradient-to-r from-primary to-primary-light"></div>

               <div className="absolute inset-[2px] rounded-[38px] md:rounded-[48px] overflow-hidden bg-[var(--color-bg-card)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={index}
                      src={images[index]}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt={`Aroosha ${index + 1}`}
                      onError={(e) => {
                        console.error("❌ Failed:", images[index]);
                        e.target.style.opacity = 0;
                      }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: i === index ? "20px" : "6px",
                          height: "6px",
                          background:
                            i === index
                              ? "var(--color-primary)"
                              : "rgba(255,255,255,0.5)",
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Number */}
                  <div
                    className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-bold text-white"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </div>

                  {/* Progress */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
                    <motion.div
                      key={index}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="h-full"
                      style={{
                        background: "linear-gradient(90deg, #F97316, #C2410C)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* TECH watermark */}
            <div className="mt-8 pointer-events-none">
              <motion.div
                animate={{ x: [30, -30, 30] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative text-center"
              >
                <span className="text-[45px] sm:text-[60px] md:text-[90px] font-bold text-primary/30 tracking-wider">
                  TECH
                </span>

                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                />

                <motion.div
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-light to-transparent"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ============================================
              RIGHT — Text content
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: false, amount: 0.2 }}
            className="md:-mt-24 lg:-mt-32"
          >
            <p
              className="text-[10px] sm:text-xs mb-2 tracking-[0.2em] uppercase"
              style={{
                color: "var(--color-primary)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Who We Are
            </p>

            {/* NAYA HEADING */}
            <h2
              className="mt-2 leading-[1.2] tracking-tight font-semibold text-lg sm:text-xl md:text-2xl lg:text-[30px]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "var(--color-text-heading)",
              }}
            >
              Building Digital{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Excellence Since 2016
              </span>
            </h2>

            {/* NAYA SUBTEXT */}
            <p
              className="mb-4 mt-4 text-xs sm:text-sm leading-6 sm:leading-7"
              style={{
                color: "var(--color-text-body)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              From startups to enterprises — we help organizations build
              digital products that are secure, scalable, and built to last.
            </p>

            <p
              className="mb-4 text-xs sm:text-sm leading-6 sm:leading-7"
              style={{
                color: "var(--color-text-body)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              For the past{" "}
              <b style={{ color: "var(--color-primary)" }}>9+ years</b>, we
              have been transforming ambitious ideas into reliable, scalable,
              and high-performance digital solutions.
            </p>

            <p
              className="mb-6 text-xs sm:text-sm leading-6 sm:leading-7"
              style={{
                color: "var(--color-text-body)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              We empower government organizations, enterprises, and healthcare
              institutions.
            </p>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-2 gap-4 text-xs sm:text-sm mb-6 sm:mb-8"
            >
              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  9+
                </h3>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  Years Experience
                </p>
              </div>

              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  500+
                </h3>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  Projects Delivered
                </p>
              </div>

              <div
                style={{
                  color: "var(--color-text-body)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                24/7 Dedicated Support
              </div>

              <div
                style={{
                  color: "var(--color-text-body)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Enterprise-grade Security
              </div>

              <div
                className="col-span-2 font-semibold"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Cutting-edge & Innovative Solutions
              </div>
            </motion.div>

            {/* EXTRA CONTENT */}
            <div
              className="text-xs sm:text-sm space-y-3 sm:space-y-4"
              style={{
                color: "var(--color-text-body)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              <p>
                Our commitment to excellence ensures every project meets the
                highest standards.
              </p>

              <p>
                Trusted by leading organizations such as Bridge & Roof,
                Directorate of Income Tax, IIM Jammu, ESDS, AIIMS Bhopal, IIT
                Roorkee, CSIR - AMPRI, CSIR - NBRI, and NHDC.
              </p>

              <p>
                At Netbeans Systems, we don't just deliver technology—we create
                solutions that transform how organizations operate.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}