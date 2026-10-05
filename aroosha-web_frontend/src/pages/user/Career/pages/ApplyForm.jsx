// // src/pages/user/Career/pages/ApplyForm.jsx
// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   Briefcase,
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   MapPin,
//   Award,
//   Building2,
//   Clock,
//   FileText,
//   Upload,
//   X,
//   TrendingUp,
// } from "lucide-react";
// import { getPublicJobById, submitApplication } from "../../../../api/careerApi";
// import { markJobApplied } from "../../../../utils/appliedJobs";

// export default function ApplyForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [resumeFile, setResumeFile] = useState(null);

//   const [formData, setFormData] = useState({
//     applicant_name: "",
//     email: "",
//     phone: "",
//     experience: "",
//   });

//   // ============================================================
//   // 📌 FETCH JOB DETAILS
//   // ============================================================
//   useEffect(() => {
//     const fetchData = async () => {
//       const jobId = Number(id);
//       if (!jobId || isNaN(jobId)) {
//         setError("Invalid job ID.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const jobData = await getPublicJobById(jobId);
//         const actualJob = jobData?.data || jobData?.result || jobData;

//         if (!actualJob || !actualJob.id) {
//           setError("Job not found.");
//           setJob(null);
//         } else {
//           setJob(actualJob);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load job details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchData();
//   }, [id]);

//   // ============================================================
//   // 📌 HANDLERS
//   // ============================================================
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (fieldErrors[field]) {
//       setFieldErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       setFieldErrors((prev) => ({
//         ...prev,
//         resume: "File size must be less than 5 MB",
//       }));
//       return;
//     }

//     const allowed = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     if (!allowed.includes(file.type)) {
//       setFieldErrors((prev) => ({
//         ...prev,
//         resume: "Only PDF, DOC, or DOCX files are allowed",
//       }));
//       return;
//     }

//     setResumeFile(file);
//     setFieldErrors((prev) => ({ ...prev, resume: "" }));
//   };

//   const removeFile = () => {
//     setResumeFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // ============================================================
//   // 📌 VALIDATION
//   // ============================================================
//   const validateForm = () => {
//     const errors = {};

//     if (!formData.applicant_name.trim()) {
//       errors.applicant_name = "Full name is required";
//     } else if (formData.applicant_name.trim().length < 2) {
//       errors.applicant_name = "Name must be at least 2 characters";
//     } else if (formData.applicant_name.trim().length > 100) {
//       errors.applicant_name = "Name must be less than 100 characters";
//     } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.applicant_name.trim())) {
//       errors.applicant_name = "Name can only contain letters, spaces, and .'-";
//     }

//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
//       errors.email = "Enter a valid email address";
//     } else if (formData.email.trim().length > 100) {
//       errors.email = "Email must be less than 100 characters";
//     }

//     if (formData.phone?.trim()) {
//       const cleaned = formData.phone.replace(/[\s\-()]/g, "");
//       if (!/^\+?\d{7,15}$/.test(cleaned)) {
//         errors.phone = "Enter a valid phone number (7-15 digits)";
//       }
//     }

//     if (formData.experience?.trim() && formData.experience.trim().length > 50) {
//       errors.experience = "Experience must be less than 50 characters";
//     }

//     if (!resumeFile) {
//       errors.resume = "Please upload your resume";
//     }

//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // ============================================================
//   // 📌 SUBMIT
//   // ============================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!validateForm()) {
//       setError("Please fix the errors above and try again.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const payload = {
//         job_id: Number(id),
//         applicant_name: formData.applicant_name.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone?.trim() || "",
//         experience: formData.experience?.trim() || "",
//         resume: resumeFile,
//       };

//       const result = await submitApplication(payload);
//       console.log("Application response:", result);

//       markJobApplied(id);

//       setSuccess(
//         "🎉 Application submitted successfully! We will review your profile and get back to you soon."
//       );

//       setFormData({
//         applicant_name: "",
//         email: "",
//         phone: "",
//         experience: "",
//       });
//       setResumeFile(null);
//       setFieldErrors({});

//       setTimeout(() => {
//         navigate("/careers");
//       }, 3000);
//     } catch (err) {
//       console.error("Submission error:", err);

//       if (err.response?.status === 401) {
//         setError("Session expired. Please try again.");
//       } else if (err.response?.status === 422) {
//         const detail = err.response?.data?.detail;
//         if (Array.isArray(detail)) {
//           const fieldMap = {};
//           detail.forEach((e) => {
//             const field = e.loc?.[e.loc.length - 1];
//             if (field) fieldMap[field] = e.msg;
//           });
//           setFieldErrors((prev) => ({ ...prev, ...fieldMap }));
//           setError("Please check the highlighted fields and try again.");
//         } else {
//           setError("Validation error. Please check your inputs.");
//         }
//       } else if (err.response?.status === 400) {
//         setError(err.response?.data?.detail || "Invalid data submitted.");
//       } else if (err.response?.status === 409) {
//         setError("You have already applied for this position.");
//       } else {
//         setError(
//           err.response?.data?.detail ||
//             "Failed to submit application. Please try again later."
//         );
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ============================================================
//   // 📌 LOADING
//   // ============================================================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-body">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 size={40} className="animate-spin text-primary" />
//           <p className="text-sm text-muted">Loading application form...</p>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // 📌 ERROR
//   // ============================================================
//   if (error && !job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-body px-4">
//         <div className="text-center max-w-md">
//           <div className="inline-flex p-4 rounded-full bg-red-50 mb-4">
//             <Briefcase size={28} className="text-red-500" />
//           </div>
//           <h1 className="text-xl font-bold text-heading">Job not found</h1>
//           <p className="text-sm text-muted mt-2">{error}</p>
//           <button
//             onClick={() => navigate("/careers")}
//             className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-md"
//           >
//             <ArrowLeft size={14} />
//             Back to all jobs
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // 📌 RENDER
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-body text-text-body overflow-x-hidden">
//       {/* ════════════════════════════════
//           TOP NAV
//       ════════════════════════════════ */}
//       <div className="bg-[var(--color-bg-card)] border-b border-[var(--color-border)]">
//         <div className="max-w-5xl mx-auto px-6 py-3">
//           <button
//             onClick={() => navigate(`/careers/job/${id}`)}
//             className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
//           >
//             <ArrowLeft size={14} />
//             Back to job details
//           </button>
//         </div>
//       </div>

//       {/* ════════════════════════════════
//           HERO SECTION — Career page jaisa
//       ════════════════════════════════ */}
//       <section className="relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center text-center px-6 py-20 bg-body">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600"
//             alt="apply"
//             className="w-full h-full object-cover scale-105 opacity-10"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
//         </div>

//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(10)].map((_, i) => (
//             <motion.div
//               key={i}
//               animate={{ rotate: [0, 360] }}
//               transition={{
//                 duration: 18 + i * 2,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               className="absolute top-1/2 left-1/2 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] border border-primary/10"
//               style={{
//                 width: `${300 + i * 80}px`,
//                 height: `${300 + i * 80}px`,
//                 transform: "translate(-50%,-50%)",
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 max-w-3xl mx-auto w-full">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6"
//           >
//             <TrendingUp size={12} />
//             Applying for
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className="text-heading font-bold tracking-[1px] text-[clamp(2rem,5vw,3.5rem)] mb-4 leading-tight"
//           >
//             {job?.title || "Position"}{" "}
//             <span className="text-primary font-[Playfair_Display] italic font-medium">
//               Application
//             </span>
//           </motion.h1>

//           {job?.designation && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.25, duration: 0.6 }}
//               className="text-[15px] text-muted max-w-[720px] mx-auto leading-8 mb-6"
//             >
//               {job.designation}
//             </motion.p>
//           )}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="mt-2 flex flex-wrap gap-2 justify-center"
//           >
//             <Pill icon={MapPin} label={job?.location || "Remote"} />
//             <Pill
//               icon={Building2}
//               label={job?.department_name || `Dept #${job?.department_id}`}
//             />
//             <Pill
//               icon={Award}
//               label={job?.job_type_name || `Type #${job?.job_type_id}`}
//             />
//             <Pill
//               icon={Clock}
//               label={job?.experience_required || "Not specified"}
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* ════════════════════════════════
//           FORM SECTION
//       ════════════════════════════════ */}
//       <section className="relative max-w-3xl mx-auto px-6 py-14">
//         <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

//         {/* SECTION HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-2xl mx-auto mb-10"
//         >
//           <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-semibold mb-3">
//             Application Form
//           </p>
//           <h2 className="text-3xl md:text-[2.2rem] font-black leading-tight tracking-tight text-heading">
//             Your{" "}
//             <span className="text-primary font-[Playfair_Display] italic font-medium">
//               Application
//             </span>
//           </h2>
//           <p className="mt-4 text-muted text-sm leading-7 max-w-xl mx-auto">
//             Fill out the form below to apply for this position. All fields
//             marked with <span className="text-red-500">*</span> are required.
//           </p>
//           <div className="mt-6 flex items-center justify-center gap-3">
//             <div className="h-px w-14 bg-[var(--color-border)]" />
//             <div className="w-2 h-2 rounded-full bg-primary" />
//             <div className="h-px w-14 bg-[var(--color-border)]" />
//           </div>
//         </motion.div>

//         {/* SUCCESS */}
//         {success && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-5 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm flex items-start gap-2 rounded-xl shadow-sm"
//           >
//             <CheckCircle size={18} className="shrink-0 mt-0.5" />
//             <span className="font-medium">{success}</span>
//           </motion.div>
//         )}

//         {/* ERROR */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-start gap-2 rounded-xl shadow-sm"
//           >
//             <AlertCircle size={18} className="shrink-0 mt-0.5" />
//             <span className="font-medium">{error}</span>
//           </motion.div>
//         )}

//         {/* ════════════════════════════════
//             FORM CARD — premium shadow
//         ════════════════════════════════ */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.20)] transition-shadow duration-500"
//         >
//           {/* Top accent bar */}
//           <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary via-primary/60 to-transparent" />

//           <form
//             onSubmit={handleSubmit}
//             className="p-6 md:p-10 space-y-6"
//             noValidate
//           >
//             {/* Full Name */}
//             <FormField
//               label="Full Name"
//               required
//               error={fieldErrors.applicant_name}
//             >
//               <input
//                 type="text"
//                 value={formData.applicant_name}
//                 onChange={(e) => handleChange("applicant_name", e.target.value)}
//                 placeholder="e.g. John Doe"
//                 disabled={submitting}
//                 maxLength={100}
//                 className={`w-full px-4 py-3.5 rounded-xl bg-body text-[15px] text-heading placeholder:text-muted/70 border transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:shadow-lg disabled:opacity-60 ${
//                   fieldErrors.applicant_name
//                     ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
//                     : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
//                 }`}
//               />
//             </FormField>

//             {/* Email */}
//             <FormField
//               label="Email Address"
//               required
//               error={fieldErrors.email}
//             >
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="e.g. john@example.com"
//                 disabled={submitting}
//                 maxLength={100}
//                 className={`w-full px-4 py-3.5 rounded-xl bg-body text-[15px] text-heading placeholder:text-muted/70 border transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:shadow-lg disabled:opacity-60 ${
//                   fieldErrors.email
//                     ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
//                     : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
//                 }`}
//               />
//             </FormField>

//             {/* Phone */}
//             <FormField
//               label="Phone Number"
//               error={fieldErrors.phone}
//               hint="Optional — include country code (e.g. +91)"
//             >
//               <input
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//                 placeholder="e.g. +91 98765 43210"
//                 disabled={submitting}
//                 maxLength={20}
//                 className={`w-full px-4 py-3.5 rounded-xl bg-body text-[15px] text-heading placeholder:text-muted/70 border transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:shadow-lg disabled:opacity-60 ${
//                   fieldErrors.phone
//                     ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
//                     : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
//                 }`}
//               />
//             </FormField>

//             {/* Experience */}
//             <FormField
//               label="Total Experience"
//               error={fieldErrors.experience}
//               hint="Optional — e.g. 3 years, 6 months"
//             >
//               <input
//                 type="text"
//                 value={formData.experience}
//                 onChange={(e) => handleChange("experience", e.target.value)}
//                 placeholder="e.g. 3 years"
//                 disabled={submitting}
//                 maxLength={50}
//                 className={`w-full px-4 py-3.5 rounded-xl bg-body text-[15px] text-heading placeholder:text-muted/70 border transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:shadow-lg disabled:opacity-60 ${
//                   fieldErrors.experience
//                     ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
//                     : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
//                 }`}
//               />
//             </FormField>

//             {/* Resume */}
//             <div>
//               <label className="block text-xs font-semibold text-heading mb-2 uppercase tracking-wider">
//                 Resume <span className="text-red-500">*</span>
//               </label>

//               {!resumeFile ? (
//                 <motion.button
//                   type="button"
//                   whileHover={{ scale: 1.005 }}
//                   whileTap={{ scale: 0.995 }}
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={submitting}
//                   className={`w-full flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed transition-all duration-200 ${
//                     fieldErrors.resume
//                       ? "border-red-400 bg-red-50/50"
//                       : "border-[var(--color-border)] hover:border-[var(--color-primary)]/60 hover:bg-primary/5 hover:shadow-lg"
//                   } ${
//                     submitting
//                       ? "opacity-50 cursor-not-allowed"
//                       : "cursor-pointer"
//                   }`}
//                 >
//                   <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm">
//                     <Upload size={22} className="text-primary" />
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm font-semibold text-heading">
//                       Click to upload resume
//                     </p>
//                     <p className="text-xs text-muted mt-1">
//                       PDF, DOC, or DOCX — max 5 MB
//                     </p>
//                   </div>
//                 </motion.button>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center gap-3 p-4 rounded-2xl border border-[var(--color-border)] bg-body shadow-sm"
//                 >
//                   <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 shrink-0">
//                     <FileText size={18} className="text-emerald-600" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-semibold text-heading truncate">
//                       {resumeFile.name}
//                     </p>
//                     <p className="text-xs text-muted mt-0.5">
//                       {(resumeFile.size / 1024).toFixed(1)} KB
//                     </p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={removeFile}
//                     disabled={submitting}
//                     className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-all shrink-0 disabled:opacity-50"
//                     title="Remove file"
//                   >
//                     <X size={16} />
//                   </button>
//                 </motion.div>
//               )}

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                 onChange={handleFileChange}
//                 disabled={submitting}
//                 className="hidden"
//               />

//               {fieldErrors.resume && (
//                 <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
//                   <AlertCircle size={12} /> {fieldErrors.resume}
//                 </p>
//               )}
//             </div>

//             {/* Submit buttons */}
//             <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//                 type="submit"
//                 disabled={submitting}
//                 className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_10px_30px_-8px_var(--color-primary)] hover:shadow-[0_15px_40px_-8px_var(--color-primary)] disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {submitting ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle size={16} />
//                     Submit Application
//                   </>
//                 )}
//               </motion.button>
//               <button
//                 type="button"
//                 onClick={() => navigate(`/careers/job/${id}`)}
//                 disabled={submitting}
//                 className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-transparent border border-[var(--color-border)] text-heading text-sm font-semibold hover:border-[var(--color-primary)] hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-60"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </section>
//     </div>
//   );
// }

// // ============================================================
// // Small components
// // ============================================================
// function Pill({ icon: Icon, label }) {
//   return (
//     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-pale border border-primary/20 text-xs font-medium text-primary">
//       <Icon size={12} />
//       {label}
//     </span>
//   );
// }

// function FormField({ label, required, error, hint, children }) {
//   return (
//     <div>
//       <label className="block text-xs font-semibold text-heading mb-2 uppercase tracking-wider">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       {children}
//       {hint && !error && (
//         <p className="mt-2 text-xs text-muted/80">{hint}</p>
//       )}
//       {error && (
//         <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
//           <AlertCircle size={12} /> {error}
//         </p>
//       )}
//     </div>
//   );
// }


// src/pages/user/Career/pages/ApplyForm.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Loader2,
  CheckCircle,
  AlertCircle,
  MapPin,
  Award,
  Building2,
  Clock,
  FileText,
  Upload,
  X,
  TrendingUp,
} from "lucide-react";
import { getPublicJobById, submitApplication } from "../../../../api/careerApi";
import { markJobApplied } from "../../../../utils/appliedJobs";

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    applicant_name: "",
    email: "",
    phone: "",
    experience: "",
  });

  // 📌 FETCH JOB DETAILS — SAME
  useEffect(() => {
    const fetchData = async () => {
      const jobId = Number(id);
      if (!jobId || isNaN(jobId)) {
        setError("Invalid job ID.");
        setLoading(false);
        return;
      }

      try {
        const jobData = await getPublicJobById(jobId);
        const actualJob = jobData?.data || jobData?.result || jobData;

        if (!actualJob || !actualJob.id) {
          setError("Job not found.");
          setJob(null);
        } else {
          setJob(actualJob);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  // 📌 HANDLERS — SAME
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((prev) => ({
        ...prev,
        resume: "File size must be less than 5 MB",
      }));
      return;
    }

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setFieldErrors((prev) => ({
        ...prev,
        resume: "Only PDF, DOC, or DOCX files are allowed",
      }));
      return;
    }

    setResumeFile(file);
    setFieldErrors((prev) => ({ ...prev, resume: "" }));
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 📌 VALIDATION — SAME
  const validateForm = () => {
    const errors = {};

    if (!formData.applicant_name.trim()) {
      errors.applicant_name = "Full name is required";
    } else if (formData.applicant_name.trim().length < 2) {
      errors.applicant_name = "Name must be at least 2 characters";
    } else if (formData.applicant_name.trim().length > 100) {
      errors.applicant_name = "Name must be less than 100 characters";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.applicant_name.trim())) {
      errors.applicant_name = "Name can only contain letters, spaces, and .'-";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      errors.email = "Enter a valid email address";
    } else if (formData.email.trim().length > 100) {
      errors.email = "Email must be less than 100 characters";
    }

    if (formData.phone?.trim()) {
      const cleaned = formData.phone.replace(/[\s\-()]/g, "");
      if (!/^\+?\d{7,15}$/.test(cleaned)) {
        errors.phone = "Enter a valid phone number (7-15 digits)";
      }
    }

    if (formData.experience?.trim() && formData.experience.trim().length > 50) {
      errors.experience = "Experience must be less than 50 characters";
    }

    if (!resumeFile) {
      errors.resume = "Please upload your resume";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 📌 SUBMIT — SAME
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setError("Please fix the errors above and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        job_id: Number(id),
        applicant_name: formData.applicant_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || "",
        experience: formData.experience?.trim() || "",
        resume: resumeFile,
      };

      const result = await submitApplication(payload);
      console.log("Application response:", result);

      markJobApplied(id);

      setSuccess(
        "🎉 Application submitted successfully! We will review your profile and get back to you soon."
      );

      setFormData({
        applicant_name: "",
        email: "",
        phone: "",
        experience: "",
      });
      setResumeFile(null);
      setFieldErrors({});

      setTimeout(() => {
        navigate("/careers");
      }, 3000);
    } catch (err) {
      console.error("Submission error:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please try again.");
      } else if (err.response?.status === 422) {
        const detail = err.response?.data?.detail;
        if (Array.isArray(detail)) {
          const fieldMap = {};
          detail.forEach((e) => {
            const field = e.loc?.[e.loc.length - 1];
            if (field) fieldMap[field] = e.msg;
          });
          setFieldErrors((prev) => ({ ...prev, ...fieldMap }));
          setError("Please check the highlighted fields and try again.");
        } else {
          setError("Validation error. Please check your inputs.");
        }
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.detail || "Invalid data submitted.");
      } else if (err.response?.status === 409) {
        setError("You have already applied for this position.");
      } else {
        setError(
          err.response?.data?.detail ||
            "Failed to submit application. Please try again later."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 📌 LOADING — SAME
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={36}
            className="animate-spin"
            style={{ color: "var(--color-primary)" }}
          />
          <p
            className="text-xs sm:text-sm"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Loading application form...
          </p>
        </div>
      </div>
    );
  }

  // 📌 ERROR — SAME
  if (error && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex p-4 rounded-full bg-red-50 mb-4">
            <Briefcase size={26} className="text-red-500" />
          </div>
          <h1
            className="font-semibold text-lg sm:text-xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading)",
            }}
          >
            Job not found
          </h1>
          <p
            className="text-xs sm:text-sm mt-2"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {error}
          </p>
          <button
            onClick={() => navigate("/careers")}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
              boxShadow: "0 10px 30px rgba(249,115,22,0.35)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            <ArrowLeft size={14} />
            Back to all jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-body text-text-body overflow-x-hidden">
      {/* TOP NAV */}
      <div
        className="border-b"
        style={{
          background: "var(--color-bg-card)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <button
            onClick={() => navigate(`/careers/job/${id}`)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm transition-colors hover:opacity-80"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            <ArrowLeft size={14} />
            Back to job details
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20 bg-body">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600"
            alt="apply"
            className="w-full h-full object-cover scale-105 opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 18 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-1/2 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] border border-primary/10"
              style={{
                width: `${300 + i * 80}px`,
                height: `${300 + i * 80}px`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 sm:mb-6"
            style={{
              background: "var(--color-primary-pale)",
              border:
                "1px solid var(--color-primary-light, rgba(249,115,22,0.3))",
              color: "var(--color-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <TrendingUp size={11} />
            Applying for
          </motion.div>

          {/* ✅ HEADING — Playfair Display italic */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-3 sm:mb-4 leading-[1.15]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading)",
            }}
          >
            {job?.title || "Position"}{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Application
            </span>
          </motion.h1>

          {job?.designation && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-xs sm:text-sm max-w-[600px] mx-auto leading-6 sm:leading-7 mb-6"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {job.designation}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-2 flex flex-wrap gap-2 justify-center"
          >
            <Pill icon={MapPin} label={job?.location || "Remote"} />
            <Pill
              icon={Building2}
              label={job?.department_name || `Dept #${job?.department_id}`}
            />
            <Pill
              icon={Award}
              label={job?.job_type_name || `Type #${job?.job_type_id}`}
            />
            <Pill
              icon={Clock}
              label={job?.experience_required || "Not specified"}
            />
          </motion.div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-3"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Application Form
          </p>

          {/* ✅ SECTION HEADING — Playfair Display italic */}
          <h2
            className="font-semibold leading-[1.2] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[30px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading)",
            }}
          >
            Your{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Application
            </span>
          </h2>

          <p
            className="mt-3 text-xs sm:text-sm leading-6 sm:leading-7 max-w-xl mx-auto"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Fill out the form below to apply for this position. All fields
            marked with <span className="text-red-500">*</span> are required.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <div
              className="h-px w-8 sm:w-12"
              style={{ background: "var(--color-border)" }}
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            <div
              className="h-px w-8 sm:w-12"
              style={{ background: "var(--color-border)" }}
            />
          </div>
        </motion.div>

        {/* SUCCESS — SAME */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-4 text-xs sm:text-sm flex items-start gap-2 rounded-xl shadow-sm"
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              borderLeft: "4px solid #10b981",
              color: "#059669",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            <CheckCircle size={17} className="shrink-0 mt-0.5" />
            <span className="font-medium">{success}</span>
          </motion.div>
        )}

        {/* ERROR — SAME */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-4 text-xs sm:text-sm flex items-start gap-2 rounded-xl shadow-sm"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              borderLeft: "4px solid #ef4444",
              color: "#dc2626",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            <AlertCircle size={17} className="shrink-0 mt-0.5" />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl transition-shadow duration-500"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            boxShadow:
              "0 20px 60px -15px rgba(249, 115, 22, 0.15), 0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary), transparent)",
            }}
          />

          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 md:p-10 space-y-5 sm:space-y-6"
            noValidate
          >
            {/* Full Name */}
            <FormField
              label="Full Name"
              required
              error={fieldErrors.applicant_name}
            >
              <input
                type="text"
                value={formData.applicant_name}
                onChange={(e) =>
                  handleChange("applicant_name", e.target.value)
                }
                placeholder="e.g. John Doe"
                disabled={submitting}
                maxLength={100}
                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-200 focus:outline-none disabled:opacity-60`}
                style={{
                  background: "var(--color-bg-body)",
                  color: "var(--color-text-heading)",
                  border: fieldErrors.applicant_name
                    ? "1px solid #ef4444"
                    : "1px solid var(--color-border)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              />
            </FormField>

            {/* Email */}
            <FormField label="Email Address" required error={fieldErrors.email}>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="e.g. john@example.com"
                disabled={submitting}
                maxLength={100}
                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-200 focus:outline-none disabled:opacity-60`}
                style={{
                  background: "var(--color-bg-body)",
                  color: "var(--color-text-heading)",
                  border: fieldErrors.email
                    ? "1px solid #ef4444"
                    : "1px solid var(--color-border)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              />
            </FormField>

            {/* Phone */}
            <FormField
              label="Phone Number"
              error={fieldErrors.phone}
              hint="Optional — include country code (e.g. +91)"
            >
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="e.g. +91 98765 43210"
                disabled={submitting}
                maxLength={20}
                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-200 focus:outline-none disabled:opacity-60`}
                style={{
                  background: "var(--color-bg-body)",
                  color: "var(--color-text-heading)",
                  border: fieldErrors.phone
                    ? "1px solid #ef4444"
                    : "1px solid var(--color-border)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              />
            </FormField>

            {/* Experience */}
            <FormField
              label="Total Experience"
              error={fieldErrors.experience}
              hint="Optional — e.g. 3 years, 6 months"
            >
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                placeholder="e.g. 3 years"
                disabled={submitting}
                maxLength={50}
                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-200 focus:outline-none disabled:opacity-60`}
                style={{
                  background: "var(--color-bg-body)",
                  color: "var(--color-text-heading)",
                  border: fieldErrors.experience
                    ? "1px solid #ef4444"
                    : "1px solid var(--color-border)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              />
            </FormField>

            {/* Resume — SAME */}
            <div>
              <label
                className="block text-[10px] sm:text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{
                  color: "var(--color-text-heading)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Resume <span className="text-red-500">*</span>
              </label>

              {!resumeFile ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={submitting}
                  className={`w-full flex flex-col items-center justify-center gap-3 py-8 sm:py-10 rounded-2xl border-2 border-dashed transition-all duration-200 ${
                    submitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  style={{
                    borderColor: fieldErrors.resume
                      ? "#ef4444"
                      : "var(--color-border)",
                    background: fieldErrors.resume
                      ? "rgba(239, 68, 68, 0.05)"
                      : "transparent",
                  }}
                >
                  <div
                    className="p-3 sm:p-3.5 rounded-2xl"
                    style={{
                      background:
                        "var(--color-primary-pale, rgba(249,115,22,0.1))",
                      border:
                        "1px solid var(--color-primary-light, rgba(249,115,22,0.3))",
                    }}
                  >
                    <Upload
                      size={20}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div className="text-center">
                    <p
                      className="text-xs sm:text-sm font-semibold"
                      style={{
                        color: "var(--color-text-heading)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      Click to upload resume
                    </p>
                    <p
                      className="text-[10px] sm:text-xs mt-1"
                      style={{
                        color: "var(--color-text-muted)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      PDF, DOC, or DOCX — max 5 MB
                    </p>
                  </div>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg-body)",
                  }}
                >
                  <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 shrink-0">
                    <FileText size={16} className="text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs sm:text-sm font-semibold truncate"
                      style={{
                        color: "var(--color-text-heading)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {resumeFile.name}
                    </p>
                    <p
                      className="text-[10px] sm:text-xs mt-0.5"
                      style={{
                        color: "var(--color-text-muted)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {(resumeFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    disabled={submitting}
                    className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-all shrink-0 disabled:opacity-50"
                    title="Remove file"
                  >
                    <X size={15} />
                  </button>
                </motion.div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                disabled={submitting}
                className="hidden"
              />

              {fieldErrors.resume && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.resume}
                </p>
              )}
            </div>

            {/* Submit buttons */}
            <div
              className="pt-5 sm:pt-6 flex flex-col sm:flex-row gap-3"
              style={{
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-xl text-white text-xs sm:text-sm font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
                  boxShadow: "0 10px 30px rgba(249,115,22,0.35)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={15} />
                    Submit Application
                  </>
                )}
              </motion.button>
              <button
                type="button"
                onClick={() => navigate(`/careers/job/${id}`)}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold transition-all disabled:opacity-60"
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-heading)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

// ============================================================
// Small components
// ============================================================
function Pill({ icon: Icon, label }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium"
      style={{
        background: "var(--color-primary-pale, rgba(249,115,22,0.1))",
        border:
          "1px solid var(--color-primary-light, rgba(249,115,22,0.3))",
        color: "var(--color-primary)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}

function FormField({ label, required, error, hint, children }) {
  return (
    <div>
      <label
        className="block text-[10px] sm:text-xs font-semibold mb-2 uppercase tracking-wider"
        style={{
          color: "var(--color-text-heading)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p
          className="mt-2 text-[10px] sm:text-xs"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {hint}
        </p>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}