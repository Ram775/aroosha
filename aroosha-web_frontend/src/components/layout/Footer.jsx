import React from "react";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const socialIcons = [
  { Icon: FaInstagram, link: "https://instagram.com", label: "Instagram", color: "#E1306C" },
  { Icon: FaLinkedinIn, link: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
  { Icon: FaFacebookF, link: "https://facebook.com", label: "Facebook", color: "#1877F2" },
  { Icon: FaTwitter, link: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Glow effect - Global CSS se */}
      <div className="footer-glow" />

      <div className="max-w-7xl mx-auto px-[6%] pt-14 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <h1 className="text-2xl font-bold text-white">Aroosha Tech</h1>
          <p className="text-sm text-gray-400 mt-1.5">
            Crafting digital experiences that inspire & perform.
          </p>
        </motion.div>

        <div className="border-b border-white/10 my-7" />

        <div className="grid md:grid-cols-4 gap-12 pb-14">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="footer-heading">Location</h3>
            <p className="text-base font-semibold text-white">Bhopal, India</p>
            <p className="text-xs text-gray-500 mt-1.5">
              {new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
            <div className="footer-available-badge">
              <p className="text-xs text-primary font-semibold tracking-wide">● Available for projects</p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="list-none flex flex-col gap-2.5">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Careers", path: "/careers" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="footer-link"
                >
                  <span className="text-primary text-xs">✦</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="footer-heading">Explore</h3>
            <ul className="list-none flex flex-col gap-2.5">
              {[
                { name: "Services", path: "/services" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Work with us", path: "/careers" },
                { name: "Sitemap", path: "/sitemap" },
              ].map((item) => (
                <li
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="footer-link"
                >
                  <span className="text-primary text-xs">✦</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="footer-heading">Contact</h3>
            <p className="text-sm text-gray-400 leading-7 mb-3.5">
              STPI Technology Park IT Park Near RGPV
              <br />
              Bhopal, Madhya Pradesh 462038
            </p>
            <p className="text-sm text-gray-400 mb-1.5">
              Call: <span className="text-white font-semibold">+91-8989969819</span>
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Email: <span className="text-white font-semibold">netbeanssystems@gmail.com</span>
            </p>

            <p className="text-xs text-gray-500 tracking-[2px] uppercase font-semibold mb-3">
              Follow for more
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              {socialIcons.map(({ Icon, link, label, color }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="footer-social-icon"
                  style={{
                    border: `1px solid ${color}55`,
                    background: `${color}12`,
                    color: color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                    e.currentTarget.style.boxShadow = "0 0 14px var(--color-shadow-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = `${color}55`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
              <div className="w-px h-7 bg-white/10 shrink-0 mx-0.5" />
            </div>

            <p className="text-xs text-gray-500 leading-6 mt-3">
              Stay connected — updates on our latest projects & insights.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-5 pb-7 flex flex-wrap justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2026 <span className="text-primary font-semibold">Aroosha Tech</span>. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="footer-back-top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}