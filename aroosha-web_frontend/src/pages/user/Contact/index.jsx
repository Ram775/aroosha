// src/pages/user/Contact/ContactPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// ✅ LOCAL IMAGES — hero background ke liye
import aboutImg from "../../../assets/images/about.png";
import about01Img from "../../../assets/images/about01.png";
import about02Img from "../../../assets/images/about02.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Hero background images
  const heroImages = [aboutImg, about01Img, about02Img];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(i);
  }, [heroImages.length]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = "Enter a valid email.";
    if (!formData.subject.trim()) e.subject = "Subject is required.";
    if (!formData.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(
      "Your message has been sent! We'll get back to you within 24 hours."
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSuccess(""), 5000);
  };

  return (
    <div className="overflow-x-hidden">
      {/* ════════════════════════════════
          HERO SECTION — with changing images
      ════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-14 sm:py-20 bg-body">
        {/* ✅ Background images — change hote rehte hain */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={heroImages[heroIndex]}
              alt="contact"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.1, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.error("❌ Hero image failed:", heroImages[heroIndex]);
                e.target.style.opacity = 0;
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
        </div>

        {/* Animated Rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                width: `${260 + i * 70}px`,
                height: `${260 + i * 70}px`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        {/* ✅ Heading — Playfair Display italic */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-3 sm:mb-4 leading-[1.15]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            color: "var(--color-text-heading)",
          }}
        >
          Get in{" "}
          <span
            className="font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Touch
          </span>
        </motion.h1>

        {/* Subtext */}
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
          Whether you have a project idea, business inquiry, or just want to say
          hello, our team is always ready to connect with you.
        </motion.p>
      </section>

      {/* ════════════════════════════════
          CONTACT SECTION
      ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-body text-text-body py-16 sm:py-24">
        {/* Soft bg blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ── SECTION HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-16"
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-3"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Get In Touch
            </p>

            {/* ✅ Heading — Playfair Display italic */}
            <h2
              className="font-semibold leading-[1.2] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[30px]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "var(--color-text-heading)",
              }}
            >
              Let's Build Something —{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Amazing Together
              </span>
            </h2>

            <p
              className="mt-3 text-xs sm:text-sm leading-6 sm:leading-7 max-w-xl mx-auto"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Whether you have a project idea, business inquiry, or just want to
              say hello, our team is always ready to connect with you.
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <div
                className="h-px w-8 sm:w-12"
                style={{ background: "var(--color-border)" }}
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
              <div
                className="h-px w-8 sm:w-12"
                style={{ background: "var(--color-border)" }}
              />
            </div>
          </motion.div>

          {/* ── MAIN GRID ── */}
          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-8 sm:gap-12 items-start">
            {/* ── LEFT: INFO ── */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-7 sm:space-y-10 self-center lg:pl-6 lg:-translate-y-12"
            >
              {[
                { label: "Email Address", value: "info@netbeanssystems.com" },
                { label: "Phone Number", value: "+91 98765 43210" },
                { label: "Office Location", value: "Hyderabad, India" },
                { label: "Working Hours", value: "Monday – Friday / 9AM – 6PM" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                  className="group cursor-default"
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-1 transition-colors duration-300 group-hover:text-primary"
                    style={{
                      color: "var(--color-text-muted)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.label}
                  </p>
                  <h3
                    className="text-sm sm:text-[15px] font-semibold"
                    style={{
                      color: "var(--color-text-heading)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {item.value}
                  </h3>
                  <div
                    className="mt-2 h-px w-10 transition-all duration-300 group-hover:w-20"
                    style={{ background: "var(--color-border)" }}
                  />
                </motion.div>
              ))}

              {/* Social Icons */}
              <div className="pt-3">
                <p
                  className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { Icon: FaFacebookF, color: "#1877F2", bg: "#1877F212" },
                    { Icon: FaInstagram, color: "#E4405F", bg: "#E4405F12" },
                    { Icon: FaLinkedinIn, color: "#0A66C2", bg: "#0A66C212" },
                    { Icon: FaTwitter, color: "#1DA1F2", bg: "#1DA1F212" },
                  ].map(({ Icon, color, bg }, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shadow-sm transition-all"
                      style={{
                        color,
                        background: bg,
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── CENTER: GOLDEN VERTICAL LINE ── */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden lg:block self-stretch origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--color-primary), var(--color-primary-light), var(--color-primary), transparent)",
                width: "1px",
              }}
            />

            {/* ── RIGHT: FORM ── */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-7 flex items-start gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium shadow-sm"
                  style={{
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    background: "rgba(16, 185, 129, 0.1)",
                    color: "#059669",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                  <span>{success}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7" noValidate>
                <FormField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="e.g. John Doe"
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="e.g. john@example.com"
                  required
                />

                <FormField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder="e.g. Project inquiry"
                  required
                />

                {/* Message */}
                <div>
                  <label
                    className="text-[10px] font-semibold tracking-[0.25em] uppercase"
                    style={{
                      color: "var(--color-text-muted)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    className={`w-full bg-transparent border-0 border-b py-3 outline-none transition-all resize-none text-xs sm:text-sm ${
                      errors.message
                        ? "border-red-400 focus:border-red-500"
                        : "focus:border-primary"
                    }`}
                    style={{
                      color: "var(--color-text-heading)",
                      borderColor: errors.message
                        ? undefined
                        : "var(--color-border)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-white text-xs sm:text-sm font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
                    boxShadow:
                      "0 10px 30px -8px var(--color-primary), 0 6px 20px rgba(249,115,22,0.3)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>Send Message →</>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// FormField
// ============================================================
function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
}) {
  return (
    <div>
      <label
        className="text-[10px] font-semibold tracking-[0.25em] uppercase"
        style={{
          color: "var(--color-text-muted)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent border-0 border-b py-3 outline-none transition-all text-xs sm:text-sm ${
          error
            ? "border-red-400 focus:border-red-500"
            : "focus:border-primary"
        }`}
        style={{
          color: "var(--color-text-heading)",
          borderColor: error ? undefined : "var(--color-border)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}