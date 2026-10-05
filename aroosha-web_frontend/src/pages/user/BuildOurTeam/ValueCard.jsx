import { motion } from "framer-motion";

export default function ValueCard({ icon, title, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: false }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-heading mb-2">{title}</h3>
      <p className="text-sm text-muted leading-6">{desc}</p>
    </motion.div>
  );
}