// src/pages/user/Services/index.jsx
import { Routes, Route } from "react-router-dom";
import ServiceLayout from "./ServiceLayout";
import ServicesIndex from "./pages/index";
import CategoryServices from "./ServicesCategory/index";
import ServiceDetails from "./pages/ServiceDetails";

export default function ServicesPage() {
  return (
    <Routes>
      <Route path="/" element={<ServiceLayout />}>
        {/* /services → Categories grid */}
        <Route index element={<ServicesIndex />} />

        {/* /services/s/:svcId → Service detail */}
        <Route path="s/:svcId" element={<ServiceDetails />} />

        {/* /services/:catId → Category services */}
        <Route path=":catId" element={<CategoryServices />} />
      </Route>
    </Routes>
  );
}