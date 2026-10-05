// src/routes/UserRoutes.jsx
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

// ============================================================
// 📌 USER PAGES
// ============================================================
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import BuildOurTeam from "../pages/user/BuildOurTeam/pages";
import FAQPage from "../pages/user/FAQ";

// ============================================================
// 📌 SERVICES
// ============================================================
import ServiceLayout from "../pages/user/Services/ServiceLayout";
import ServicesIndex from "../pages/user/Services/pages/index";
import CategoryServices from "../pages/user/ServicesCategory/index";
import ServiceDetails from "../pages/user/Services/pages/ServiceDetails";

// ============================================================
// 📌 CAREER
// ============================================================
import { CareerLayout, JobDetail, ApplyForm } from "../pages/user/Career";

// ============================================================
// 📌 INLINE 404 PAGE (koi file import nahi)
// ============================================================
function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-[clamp(5rem,15vw,9rem)] font-black text-primary leading-none">
          404
        </h1>
        <h2 className="text-2xl font-bold text-heading mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-muted mb-6">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-all"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        {/* Home */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* SERVICES */}
        <Route path="services" element={<ServiceLayout />}>
          <Route index element={<ServicesIndex />} />
          <Route path="s/:svcId" element={<ServiceDetails />} />
          <Route path=":catId" element={<CategoryServices />} />
        </Route>

        {/* Career */}
        <Route path="careers" element={<CareerLayout />} />
        <Route path="careers/job/:id" element={<JobDetail />} />
        <Route path="careers/job/:id/apply" element={<ApplyForm />} />

        {/* Other Pages */}
        <Route path="build-our-team" element={<BuildOurTeam />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<Contact />} />

        {/* 404 — inline */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}