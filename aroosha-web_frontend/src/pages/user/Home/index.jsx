// src/pages/user/Home.jsx
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

import Hero from "../../../components/sections/Hero";
import WhyChooseUs from "../../../components/sections/WhyChooseUs";       // 🆕
import AboutPreview from "../../../components/sections/AboutPreview";
import Stats from "../../../components/sections/Stats";
import ServicesPreview from "../../../components/sections/ServicesPreview";
import Process from "../../../components/sections/Process";               // 🆕
import Clients from "../../../components/sections/Clients";
import Testimonials from "../../../components/sections/Testimonials";     // 🆕
import TechStack from "../../../components/sections/TechStack";
import FAQ from "../../../components/sections/FAQ";                       // 🆕
import CTABanner from "../../../components/sections/CTABanner";           // 🆕
import CareersPreview from "../../../components/sections/CareersPreview";
import ContactPreview from "../../../components/sections/ContactPreview";

export default function Home() {
  return (
    <>
      <Navbar />

   <main>
  {/* 1. Hero — hook */}
  <Hero />

  {/* 2. Why Choose Us — credibility */}
  <WhyChooseUs />

  {/* 3. About Preview — story */}
  <AboutPreview />

  {/* 4. Stats — proof */}
  <Stats />

  {/* 5. Services Preview — offerings */}
  <ServicesPreview />

  {/* 6. Process — how we work */}
  <Process />

  {/* 7. Clients — trust logos */}
  {/* <Clients /> */}

  {/* 8. Testimonials — social proof */}
  <Testimonials />

  {/* 9. Tech Stack — expertise */}
  <TechStack />

  
  {/* 12. Careers Preview — talent */}
  <CareersPreview />


  {/* 10. FAQ — objection handling */}
  <FAQ />

  {/* 11. CTA Banner — conversion */}
  {/* <CTABanner /> */}

  {/* 12. Careers Preview — talent */}
  {/* <CareersPreview /> */}

  {/* 13. Contact Preview — final push */}
  <ContactPreview />
</main>

      <Footer />
    </>
  );
}