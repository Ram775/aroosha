import { motion } from "framer-motion";

export default function Clients() {
  const clients = [
    { name: "AIIMS Bhopal", initials: "AB", color: "#EC4899" },
    { name: "Bridge & Roof", initials: "BR", color: "#8B5CF6" },
    { name: "CSIR - AMPRI", initials: "CA", color: "#06B6D4" },
    { name: "Income Tax", initials: "IT", color: "#F59E0B" },
    { name: "DRDO", initials: "DR", color: "#EF4444" },
    { name: "ESDS", initials: "ES", color: "#10B981" },
    { name: "IIM Jammu", initials: "IJ", color: "#3B82F6" },
    { name: "IIT Roorkee", initials: "IR", color: "#8B5CF6" },
    { name: "NHDC", initials: "NH", color: "#14B8A6" },
    { name: "BHEL", initials: "BH", color: "#F97316" },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 px-6"
      style={{ background: "var(--color-bg-body)" }}
    >
      {/* Soft glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse, rgba(249, 115, 22, 0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* ============ HEADER (compact) ============ */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block text-[10px] font-semibold tracking-[3px] uppercase mb-3 px-3 py-1 rounded-full"
            style={{
              color: "var(--color-primary)",
              background: "var(--color-primary-pale)",
            }}
          >
            Our Clients
          </motion.span>

          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "var(--color-text-heading)" }}
          >
            Trusted by{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
              }}
            >
              Leading Organizations
            </span>
          </h2>

          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Serving prestigious government institutions and enterprises across
            India
          </p>
        </motion.div>

        {/* ============ CLIENTS GRID (compact) ============ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-4 border transition-all duration-400 cursor-pointer"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
                boxShadow: "0 2px 10px var(--color-shadow)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = client.color;
                e.currentTarget.style.boxShadow = `0 12px 28px ${client.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow =
                  "0 2px 10px var(--color-shadow)";
              }}
            >
              {/* Colored top accent */}
              <div
                className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: client.color }}
              />

              {/* Initials Avatar */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-white mb-2.5 transition-transform duration-400 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${client.color}, ${client.color}cc)`,
                    boxShadow: `0 6px 18px ${client.color}40`,
                  }}
                >
                  {client.initials}
                </div>

                {/* Name */}
                <p
                  className="text-xs font-semibold leading-tight transition-colors duration-300"
                  style={{ color: "var(--color-text-heading)" }}
                >
                  {client.name}
                </p>
              </div>

              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${client.color}25, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ============ BOTTOM STAT ============ */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: "450+", label: "Projects Delivered" },
            { value: "9+", label: "Years Experience" },
            { value: "50+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p
                className="text-xl md:text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-[10px] uppercase tracking-wider mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}