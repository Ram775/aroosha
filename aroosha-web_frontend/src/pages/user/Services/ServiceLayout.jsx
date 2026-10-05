// src/pages/user/Services/ServiceLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Layers, Loader2 } from "lucide-react";
import { getPublicCategories, toArray } from "../../../api/serviceCategoryApi";
import { getPublicServices } from "../../../api/servicesApi";
import ServiceSidebarItem from "./ServiceSidebarItem";

export default function ServiceLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ PUBLIC API — categories + services
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catsData, svcsData] = await Promise.all([
          getPublicCategories().catch(() => []),
          getPublicServices().catch(() => []),
        ]);

        const catList = toArray(catsData);
        catList.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

        const svcList = toArray(svcsData);
        svcList.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

        setCategories(catList);
        setServices(svcList);
      } catch (err) {
        console.error("Error fetching data:", err);
        setCategories([]);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-body text-text-body overflow-hidden">
      {/* HERO — same as before */}
      <section className="relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center text-center px-6 py-20 bg-body">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600"
            alt="Services"
            className="w-full h-full object-cover scale-105 opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18 + i * 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] border border-primary/10"
              style={{
                width: `${300 + i * 80}px`,
                height: `${300 + i * 80}px`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-heading font-bold tracking-[1px] text-[clamp(2.7rem,6vw,4.5rem)] mb-4"
        >
          Our{" "}
          <span className="text-primary font-[Playfair_Display] italic font-medium">
            Services
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 text-[15px] text-muted max-w-[720px] leading-8"
        >
          Innovative digital solutions tailored to your business needs.
          Explore our expertise and find the perfect fit.
        </motion.p>
      </section>

      {/* MAIN */}
      <section className="relative max-w-6xl mx-auto px-6 py-14">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="lg:hidden mb-5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-heading text-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm"
          >
            <Menu size={16} />
            Browse Categories
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* SIDEBAR (Desktop) */}
          <aside className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--color-border)]">
                <div className="p-2.5 rounded-xl bg-[var(--color-primary-pale)]">
                  <Layers size={16} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-heading leading-tight">
                    Categories
                  </h3>
                  <p className="text-[10px] text-muted uppercase tracking-wider">
                    Browse Services
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center py-10">
                  <Loader2 size={24} className="animate-spin text-primary" />
                  <p className="mt-3 text-xs text-muted">Loading...</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted">No categories available</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <ServiceSidebarItem
                    icon="🏠"
                    name="All Services"
                    active={location.pathname === "/services"}
                    onClick={() => navigate("/services")}
                  />
                  {categories.map((cat) => {
                    const path = `/services/${cat.id}`;
                    return (
                      <ServiceSidebarItem
                        key={cat.id}
                        icon="✦"
                        name={cat.name}
                        active={location.pathname === path}
                        onClick={() => navigate(path)}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          </aside>

          {/* CONTENT */}
          <main className="min-w-0">
            <Outlet context={{ categories, services }} />
          </main>
        </div>
      </section>

      {/* SIDEBAR (Mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-72 max-w-[85vw] h-full bg-[var(--color-bg-card)] p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[var(--color-primary-pale)]">
                    <Layers size={16} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-heading leading-tight">
                      Categories
                    </h3>
                    <p className="text-[10px] text-muted uppercase tracking-wider">
                      Browse Services
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-muted hover:bg-muted transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center py-10">
                  <Loader2 size={24} className="animate-spin text-primary" />
                  <p className="mt-3 text-xs text-muted">Loading...</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <ServiceSidebarItem
                    icon="🏠"
                    name="All Services"
                    active={location.pathname === "/services"}
                    onClick={() => navigate("/services")}
                  />
                  {categories.map((cat) => {
                    const path = `/services/${cat.id}`;
                    return (
                      <ServiceSidebarItem
                        key={cat.id}
                        icon="✦"
                        name={cat.name}
                        active={location.pathname === path}
                        onClick={() => navigate(path)}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}