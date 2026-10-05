// src/auth/AdminForgotPassword.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, Shield, Loader2, Eye, EyeOff } from "lucide-react";
import { useAdmin } from "./AdminContext";

export default function AdminForgotPassword() {
  const { forgotPassword, resetPassword } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password

  const validateEmail = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!newPassword) newErrors.newPassword = "Password is required";
    else if (newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";
    else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = "Must contain uppercase, lowercase and number";
    }
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!otp) newErrors.otp = "OTP is required";
    else if (otp.length !== 6) newErrors.otp = "OTP must be 6 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = await forgotPassword(email);
    if (result.success) {
      setStep(2);
      setSuccess("✅ OTP sent to your email! Please check your inbox.");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (!validatePassword()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otp === "123456") {
      const result = await resetPassword(email, newPassword);
      if (result.success) {
        setSuccess("✅ Password reset successfully! Redirecting to login...");
        setStep(3);
        setTimeout(() => navigate("/admin/login"), 1500);
      } else {
        setError(result.error);
      }
    } else {
      setError("❌ Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = await forgotPassword(email);
    if (result.success) {
      setSuccess("✅ New OTP sent to your email!");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-body px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-6 right-6 z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
          <Shield size={16} className="text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Admin Portal</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/90 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 shadow-2xl shadow-primary/20">
          
          <Link to="/admin/login" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6 text-sm">
            <ArrowLeft size={16} /> Back to Login
          </Link>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30"
            >
              <Mail className="text-white" size={28} />
            </motion.div>
            <h1 className="text-2xl font-bold text-heading">Reset Admin Password</h1>
            <p className="text-muted text-sm mt-1">
              {step === 1 && "Enter your admin email to reset password"}
              {step === 2 && "Enter the OTP sent to your email"}
              {step === 3 && "Password reset successful!"}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  s === step ? "bg-primary text-white" : 
                  s < step ? "bg-green-500 text-white" : 
                  "bg-muted text-muted"
                }`}>
                  {s < step ? <CheckCircle size={16} /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-0.5 mx-1 transition-all duration-300 ${
                    s < step ? "bg-green-500" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

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

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">
                  Admin Email <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${errors.email ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({});
                      if (error) setError("");
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="admin@company.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                <p className="text-xs text-muted">
                  <span className="font-semibold text-primary">Note:</span> Demo OTP will be sent to your email
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading ? "bg-primary/70 cursor-not-allowed" : "bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/40 shadow-lg shadow-primary/30"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </motion.button>
            </form>
          )}

          {/* Step 2: OTP + New Password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">
                  Enter OTP <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${errors.otp ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      if (errors.otp) setErrors({});
                      if (error) setError("");
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                      errors.otp ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                </div>
                {errors.otp && <p className="text-red-500 text-xs mt-1.5">{errors.otp}</p>}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-xs text-primary hover:underline mt-2 transition-colors"
                >
                  Resend OTP
                </button>
              </div>

              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${errors.newPassword ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPassword) setErrors({});
                      if (error) setError("");
                    }}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                      errors.newPassword ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="New password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1.5">{errors.newPassword}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className={`relative transition-all duration-200 ${errors.confirmPassword ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({});
                      if (error) setError("");
                    }}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-body text-heading placeholder:text-muted focus:outline-none transition-all duration-200 ${
                      errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="Confirm new password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword}</p>}
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                <p className="text-xs text-muted">
                  <span className="font-semibold text-primary">Demo OTP:</span> Use <span className="font-bold text-primary">123456</span> as OTP
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading ? "bg-primary/70 cursor-not-allowed" : "bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/40 shadow-lg shadow-primary/30"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </motion.button>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle size={40} className="text-green-500" />
              </motion.div>
              <h2 className="text-xl font-bold text-heading mb-2">Password Reset Successful!</h2>
              <p className="text-muted text-sm">You can now login with your new password.</p>
              <Link to="/admin/login" className="btn-primary mt-6 inline-block">
                Go to Login
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted border-t border-border pt-4">
            <Shield size={14} className="text-primary" />
            <span>🔒 Secure Admin Portal • 256-bit encryption</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}