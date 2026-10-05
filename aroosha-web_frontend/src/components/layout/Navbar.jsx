// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useAdmin } from "../../auth/AdminContext";
import logoAroosha from "../../assets/images/logoAroosha.png";
import { getPublicCategories } from "../../api/serviceCategoryApi"; // ✅ API Import

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // ✅ Dynamic Categories State
  const [servicesLinks, setServicesLinks] = useState([
    { name: "All Services", path: "/services" },
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const servicesRef = useRef(null);
  const profileRef = useRef(null);

  const { admin, logout, isAuthenticated } = useAdmin();

  // ✅ API se Categories Fetch Karein
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getPublicCategories();
        console.log("📥 Public categories:", categories);

        // Sirf active categories filter karein
        const activeCategories = categories.filter(
          (cat) => cat.is_active !== false
        );

        // Display order ke hisaab se sort karein
        activeCategories.sort(
          (a, b) => (a.display_order || 0) - (b.display_order || 0)
        );

        // Navbar links mein convert karein (ID use kar rahe hain)
        const dynamicLinks = activeCategories.map((cat) => ({
          name: cat.name,
          path: `/services/${cat.id}`,
        }));

        // "All Services" ko sabse upar rakhein
        setServicesLinks([
          { name: "All Services", path: "/services" },
          ...dynamicLinks,
        ]);
      } catch (err) {
        console.error("❌ Categories fetch error:", err);
        setServicesLinks([{ name: "All Services", path: "/services" }]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target))
        setServicesOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", end: true },
    { name: "About", path: "/about" },
  ];

  const isServicesActive = location.pathname.startsWith("/services");
  const isCareerActive = location.pathname.startsWith("/careers");

  const roleLabel =
    admin?.role === "admin"
      ? "Administrator"
      : admin?.role === "editor"
      ? "Editor"
      : admin?.role || "User";

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-white/70 dark:bg-gray-900/70 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="w-{230px} mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 h-20">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <img
            src={logoAroosha}
            alt="Aroosha Logo"
            className="h-45 w-45 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `transition text-sm lg:text-base ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-muted dark:text-gray-300 hover:text-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Services Dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => setServicesOpen((prev) => !prev)}
              className={`flex items-center gap-1 transition text-sm lg:text-base ${
                isServicesActive
                  ? "font-semibold text-primary"
                  : "text-muted dark:text-gray-300 hover:text-primary"
              }`}
            >
              Services
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl border border-border bg-card shadow-lg overflow-hidden transition-all duration-200 origin-top ${
                servicesOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {servicesLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setServicesOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm transition ${
                      isActive
                        ? "text-primary font-semibold bg-primary/10"
                        : "text-body hover:bg-muted hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Career */}
          <NavLink
            to="/careers"
            className={() =>
              `transition text-sm lg:text-base ${
                isCareerActive
                  ? "font-semibold text-primary"
                  : "text-muted dark:text-gray-300 hover:text-primary"
              }`
            }
          >
            Career
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition text-sm lg:text-base ${
                isActive
                  ? "font-semibold text-primary"
                  : "text-muted dark:text-gray-300 hover:text-primary"
              }`
            }
          >
            Contact
          </NavLink>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun size={18} className="text-muted" />
            ) : (
              <Moon size={18} className="text-muted" />
            )}
          </button>

          {/* Profile Section */}
          {isAuthenticated && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-200"
              >
                <img
                  src={
                    admin?.avatar ||
                    "https://ui-avatars.com/api/?name=Admin&background=1D9E75&color=fff&size=32"
                  }
                  alt={admin?.name || "Profile"}
                  className="w-7 h-7 rounded-full"
                />
                <span className="text-sm font-medium text-heading hidden lg:block">
                  {admin?.name || "User"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute right-0 top-full mt-3 w-56 rounded-xl border border-border bg-card shadow-lg overflow-hidden transition-all duration-200 origin-top ${
                  profileOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-heading">
                    {admin?.name}
                  </p>
                  <p className="text-xs text-muted">{admin?.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {roleLabel}
                  </span>
                </div>
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-body hover:bg-muted hover:text-primary transition-colors"
                >
                  <Settings size={16} />
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted dark:text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="flex flex-col items-start gap-5 py-6 px-6 shadow-md"
          style={{ background: "var(--color-bg-card, #ffffff)" }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `w-full text-left transition text-sm ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-muted dark:text-gray-300 hover:text-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Services */}
          <div className="flex flex-col items-start w-full">
            <button
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className={`w-full flex items-center justify-start gap-1 text-left transition text-sm ${
                isServicesActive
                  ? "font-semibold text-primary"
                  : "text-muted dark:text-gray-300"
              }`}
            >
              Services
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`flex flex-col items-start w-full overflow-hidden transition-all duration-300 ${
                mobileServicesOpen
                  ? "max-h-96 opacity-100 mt-3"
                  : "max-h-0 opacity-0"
              }`}
            >
              {servicesLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setMobileServicesOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `w-full text-left py-2 pl-3 text-sm transition ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted dark:text-gray-300 hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Career */}
          <NavLink
            to="/careers"
            onClick={() => setOpen(false)}
            className={() =>
              `w-full text-left transition text-sm ${
                isCareerActive
                  ? "font-semibold text-primary"
                  : "text-muted dark:text-gray-300 hover:text-primary"
              }`
            }
          >
            Career
          </NavLink>

          {/* Mobile Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `w-full text-left transition text-sm ${
                isActive
                  ? "font-semibold text-primary"
                  : "text-muted dark:text-gray-300 hover:text-primary"
              }`
            }
          >
            Contact
          </NavLink>

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-sm text-muted dark:text-gray-300 hover:text-primary transition"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* Mobile Profile Section */}
          {isAuthenticated && (
            <>
              <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-xl w-full">
                <img
                  src={
                    admin?.avatar ||
                    "https://ui-avatars.com/api/?name=Admin&background=1D9E75&color=fff&size=32"
                  }
                  alt={admin?.name || "Profile"}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-heading">
                    {admin?.name}
                  </p>
                  <p className="text-xs text-muted">{admin?.email}</p>
                </div>
              </div>
              <NavLink
                to="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="w-full text-left text-sm text-primary hover:underline"
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}