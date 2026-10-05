// src/components/ui/SectionHeader.jsx
import { motion } from "framer-motion";

export default function SectionHeader({ 
  title, 
  subtitle, 
  tag, 
  align = "center",
  className = "" 
}) {
  const alignments = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${alignments[align]} ${className}`}
    >
      {tag && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted font-semibold mb-2">
          {tag}
        </p>
      )}
      <h2 className="text-[clamp(26px,4vw,42px)] font-bold text-heading">
        {title}
        {subtitle && (
          <span className="ml-1 font-[Playfair_Display] italic font-medium text-primary">
            {subtitle}
          </span>
        )}
      </h2>
    </motion.div>
  );
}