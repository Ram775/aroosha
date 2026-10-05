import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ValueCard from "../ValueCard";
import PerkCard from "../PerkCard";

const values = [
  { icon: "🚀", title: "Innovation First", desc: "We embrace new ideas and modern technology to solve real problems." },
  { icon: "🤝", title: "Ownership", desc: "Every team member owns their work and takes pride in the outcome." },
  { icon: "🌱", title: "Growth Mindset", desc: "We invest in learning, mentorship, and continuous improvement." },
  { icon: "💬", title: "Open Collaboration", desc: "Ideas flow freely across teams — no silos, no hierarchy barriers." },
];

const perks = [
  { icon: "🏥", title: "Health Insurance" },
  { icon: "⏰", title: "Flexible Hours" },
  { icon: "📚", title: "Learning Budget" },
  { icon: "🏡", title: "Hybrid Work Options" },
  { icon: "🎉", title: "Team Outings" },
  { icon: "💻", title: "Latest Equipment" },
];

export default function BuildOurTeam() {
  const navigate = useNavigate();

  return (
    <div className="bg-body text-heading overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[320px] flex flex-col justify-center items-center text-center px-6 py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-black/50 to-primary/15" />
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-white font-extrabold text-[clamp(2.2rem,5vw,3.8rem)] mb-4"
        >
          Build Something{" "}
          <span className="text-primary font-[Playfair_Display] italic font-medium">Great</span>{" "}
          With Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-gray-300 text-[15px] max-w-[640px] leading-8"
        >
          At Aroosha, we're not just building products — we're building a team that thrives on curiosity, ownership, and impact.
        </motion.p>
      </section>

      {/* VALUES */}
      <section className="py-24 px-[6%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[3px] text-muted mb-3">Our Values</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-heading">
              What Drives{" "}
              <span className="font-[Playfair_Display] italic font-medium text-primary">Us</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <ValueCard key={v.title} {...v} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="bg-muted py-24 px-[6%]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[3px] text-muted mb-3">Perks & Benefits</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-heading">
              Life at{" "}
              <span className="font-[Playfair_Display] italic font-medium text-primary">Aroosha</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((p) => (
              <PerkCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-bg-dark py-24 px-[6%] text-center overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(var(--color-primary-rgb), 0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="relative"
        >
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white mb-4">
            Ready to Join{" "}
            <span className="font-[Playfair_Display] italic font-medium text-primary">Us?</span>
          </h2>
          <p className="text-muted max-w-[500px] mx-auto leading-8 mb-10">
            Explore our open positions and take the next step in your career.
          </p>
          <button onClick={() => navigate("/career/jobs")} className="btn-primary">
            See Open Positions →
          </button>
        </motion.div>
      </section>
    </div>
  );
}