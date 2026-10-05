// src/auth/AdminSignup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Building2,
  Phone
} from "lucide-react";
import { useAdmin } from "./AdminContext";

export default function AdminSignup() {
  const navigate = useNavigate();
  const { signup } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Must contain uppercase, lowercase and number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // ✅ Demo Signup - Success
    const result = await signup(formData.name, formData.email, formData.password, formData.phone, formData.company);
    
    if (result.success) {
      setSuccess("✅ Admin account created successfully! Redirecting to dashboard...");
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } else {
      setErrors({ general: result.error });
    }
    setLoading(false);
  };

  // ✅ Password Strength
  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[!@#$%^&*]/.test(pwd)) score++;
    const strengths = [
      { score: 0, label: "Very Weak", color: "bg-red-500" },
      { score: 2, label: "Weak", color: "bg-orange-500" },
      { score: 3, label: "Fair", color: "bg-yellow-500" },
      { score: 4, label: "Good", color: "bg-blue-500" },
      { score: 5, label: "Strong", color: "bg-green-500" },
      { score: 6, label: "Very Strong", color: "bg-green-600" },
    ];
    const strength = strengths.reduce((prev, curr) => score >= curr.score ? curr : prev);
    return { score, ...strength };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-body px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Admin Badge */}
      <div className="absolute top-6 right-6 z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
          <Shield size={16} className="text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Admin Signup</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/90 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 shadow-2xl shadow-primary/20">
          
          {/* Brand */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/40 relative"
            >
              <span className="text-4xl font-bold text-white">A</span>
              <div className="absolute -top-2 -right-2 bg-primary-light text-primary-dark text-[8px] font-bold px-2 py-0.5 rounded-full border border-primary/30">
                ADMIN
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold text-heading">Create Admin Account</h1>
            <p className="text-muted text-sm mt-1">Register as an administrator</p>
          </div>

          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl text-sm mb-6"
            >
              <CheckCircle size={18} className="flex-shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}

          {/* General Error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm mb-6"
            >
              {errors.general}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-heading mb-1.5 block">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-200 ${errors.name ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                    errors.name ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-heading mb-1.5 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-200 ${errors.email ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                  }`}
                  placeholder="admin@company.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold text-heading mb-1.5 block">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-200 ${errors.phone ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                    errors.phone ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                  }`}
                  placeholder="+91 98765 43210"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="text-sm font-semibold text-heading mb-1.5 block">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-200 ${errors.company ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, company: e.target.value }));
                    if (errors.company) setErrors(prev => ({ ...prev, company: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                    errors.company ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                  }`}
                  placeholder="Your Company Name"
                />
              </div>
              {errors.company && <p className="text-red-500 text-xs mt-1.5">{errors.company}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-heading mb-1.5 block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-200 ${errors.password ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, password: e.target.value }));
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                    errors.password ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${passwordStrength.color}`} style={{ width: `${(passwordStrength.score / 6) * 100}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted">{passwordStrength.label}</span>
                  </div>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-heading mb-1.5 block">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-200 ${errors.confirmPassword ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" }));
                  }}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                    errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 text-sm text-muted cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }));
                    if (errors.acceptTerms) setErrors(prev => ({ ...prev, acceptTerms: "" }));
                  }}
                  className={`mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/30 focus:ring-2 transition-all cursor-pointer ${errors.acceptTerms ? "border-red-500" : ""}`}
                />
                <span className="group-hover:text-heading transition-colors">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.acceptTerms && <p className="text-red-500 text-xs mt-1.5">{errors.acceptTerms}</p>}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? "bg-primary/70 cursor-not-allowed" : "bg-gradient-to-r from-primary to-primary-dark hover:shadow-2xl hover:shadow-primary/50 shadow-lg shadow-primary/30"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Admin Account...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Create Admin Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-4 text-muted">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link to="/admin/login" className="text-primary font-semibold hover:underline transition-colors">
              Login to Admin Panel
            </Link>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted border-t border-border pt-4">
            <Shield size={14} className="text-primary" />
            <span>🔒 Secure Admin Portal • 256-bit encryption</span>
          </div>

          {/* Back to Site */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-muted hover:text-primary transition-colors">
              ← Back to Aroosha Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}