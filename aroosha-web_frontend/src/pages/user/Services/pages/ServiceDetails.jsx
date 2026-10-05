// src/pages/user/Services/pages/ServiceDetails.jsx
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, CheckCircle2, Sparkles } from "lucide-react";

export default function ServiceDetails() {
  const { svcId } = useParams();
  const navigate = useNavigate();

  const context = useOutletContext() || {};
  const services = context.services || [];
  const categories = context.categories || [];

  // ✅ Service dhundho (service id se)
  const service = services.find((s) => String(s.id) === String(svcId));

  // ✅ Category name nikalo
  const category = service
    ? categories.find((c) => String(c.id) === String(service.category_id))
    : null;

  // ═══════ NOT FOUND ═══════
  if (!service) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      >
        <div className="inline-flex p-4 rounded-2xl bg-red-50 mb-4">
          <Briefcase size={28} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-heading">Service not found</h3>
        <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
          The service you're looking for doesn't exist.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/services")}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-md"
        >
          <ArrowLeft size={14} />
          Back to All Services
        </motion.button>
      </motion.div>
    );
  }

  // ═══════ DETAIL ═══════
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        whileHover={{ x: -3 }}
        onClick={() =>
          service.category_id
            ? navigate(`/services/${service.category_id}`)
            : navigate("/services")
        }
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        {category ? `Back to ${category.name}` : "Back to All Services"}
      </motion.button>

      <div className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-primary)]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-start gap-5 mb-8">
            <motion.div
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="w-16 h-16 rounded-2xl bg-[var(--color-primary-pale)] flex items-center justify-center text-3xl shrink-0 shadow-sm overflow-hidden"
            >
              {service.icon_url ? (
                <img
                  src={service.icon_url}
                  alt={service.title}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                "✦"
              )}
            </motion.div>
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[var(--color-primary-pale)] text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                <Sparkles size={10} />
                {category?.name || "Service"}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-heading leading-tight">
                {service.title}
              </h1>
              {service.slug && (
                <p className="text-xs text-muted mt-1.5">/{service.slug}</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm md:text-base text-muted leading-7 whitespace-pre-line">
              {service.description ||
                `We offer comprehensive ${service.title} services tailored to your business needs.`}
            </p>
          </div>

          <div className="pt-8 border-t border-[var(--color-border)]">
            <h3 className="text-xs font-bold text-heading mb-5 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[var(--color-primary)]" />
              What you get
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Expert team of professionals",
                "Custom solutions for your business",
                "Fast turnaround time",
                "Ongoing support & maintenance",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-bg-body)] border border-[var(--color-border)]"
                >
                  <CheckCircle2
                    size={16}
                    className="text-[var(--color-primary)] mt-0.5 shrink-0"
                  />
                  <span className="text-sm text-muted">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-lg shadow-[var(--color-primary)]/20"
            >
              Get a Quote
              <ArrowLeft size={14} className="rotate-180" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                service.category_id
                  ? navigate(`/services/${service.category_id}`)
                  : navigate("/services")
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-border)] text-heading text-sm font-semibold hover:border-primary hover:text-primary transition-all"
            >
              Explore More
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}