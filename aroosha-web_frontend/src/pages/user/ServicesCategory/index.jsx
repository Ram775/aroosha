// src/pages/user/Services/ServicesCategory/index.jsx
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, ArrowRight, Sparkles } from "lucide-react";

export default function CategoryServices() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const context = useOutletContext() || {};
  const categories = context.categories || [];
  const services = context.services || [];

  const category = categories.find((c) => String(c.id) === String(catId));
  const categoryServices = services.filter(
    (s) => String(s.category_id) === String(catId)
  );

  // ═══════ NOT FOUND ═══════
  if (!category) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      >
        <div className="inline-flex p-4 rounded-2xl bg-red-50 mb-4">
          <Package size={28} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-heading">Category not found</h3>
        <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
          The category you're looking for doesn't exist.
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

  // ═══════ LIST ═══════
  return (
    <div>
      <motion.button
        whileHover={{ x: -3 }}
        onClick={() => navigate("/services")}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Back to All Services
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-pale)] border border-[var(--color-border)] text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-[0.2em] mb-4">
          <Sparkles size={11} />
          Category
        </div>
        <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-heading">
          {category.name}
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted leading-7 max-w-xl">
          {categoryServices.length} service
          {categoryServices.length !== 1 ? "s" : ""} available in this category.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px w-16 bg-[var(--color-border)]" />
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="h-px w-16 bg-[var(--color-border)]" />
        </div>
      </motion.div>

      {categoryServices.length === 0 ? (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="inline-flex p-4 rounded-2xl bg-[var(--color-primary-pale)] mb-4">
            <Package size={28} className="text-[var(--color-primary)]" />
          </div>
          <h3 className="text-base font-bold text-heading">No services yet</h3>
          <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
            We're adding services to this category soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categoryServices.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/services/s/${service.id}`)}
              className="group relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 text-left shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-[var(--color-primary)]/40 hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-primary)]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-2xl bg-[var(--color-primary-pale)] flex items-center justify-center shrink-0 shadow-sm overflow-hidden"
                >
                  {service.icon_url ? (
                    <img
                      src={service.icon_url}
                      alt={service.title}
                      className="w-full h-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="text-2xl">✦</span>
                  )}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-bold text-heading leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm text-muted leading-6 line-clamp-3">
                      {service.description}
                    </p>
                  )}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}