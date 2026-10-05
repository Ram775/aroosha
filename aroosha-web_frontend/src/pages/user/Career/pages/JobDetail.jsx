// // // src/pages/user/Career/pages/JobDetail.jsx
// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { isJobApplied } from "../../../../utils/appliedJobs";
// // import {
// //   Briefcase,
// //   MapPin,
// //   Clock,
// //   Building2,
// //   Award,
// //   ArrowLeft,
// //   Loader2,
// //   ArrowRight,
// //   CheckCircle2,
// // } from "lucide-react";
// // import { getPublicJobById } from "../../../../api/careerApi";

// // export default function JobDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [job, setJob] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [hasApplied, setHasApplied] = useState(false);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const jobId = Number(id);
// //       if (!jobId || isNaN(jobId)) {
// //         setError("Invalid job ID.");
// //         setLoading(false);
// //         return;
// //       }

// //       setLoading(true);
// //       setError("");

// //       try {
// //         const jobData = await getPublicJobById(jobId);
// //         const actualJob = jobData?.data || jobData?.result || jobData;

// //         if (!actualJob || !actualJob.id) {
// //           setError("Job not found.");
// //           setJob(null);
// //         } else {
// //           setJob(actualJob);
// //           setHasApplied(isJobApplied(actualJob.id));
// //         }
// //       } catch (err) {
// //         console.error("Error fetching job:", err);
// //         setError(
// //           err.response?.data?.detail ||
// //             err.message ||
// //             "Job not found or no longer available."
// //         );
// //         setJob(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) fetchData();
// //   }, [id]);

// //   const handleApply = () => {
// //     navigate(`/careers/job/${job.id}/apply`);
// //   };

// //   // LOADING
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-body)]">
// //         <div className="flex flex-col items-center gap-3">
// //           <Loader2
// //             size={40}
// //             className="animate-spin text-[var(--color-primary)]"
// //           />
// //           <p className="text-sm text-[var(--color-text-muted)]">
// //             Loading job details...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ERROR
// //   if (error || !job) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-body)] px-4">
// //         <div className="text-center max-w-md">
// //           <div className="inline-flex p-4 rounded-full bg-red-50 mb-4">
// //             <Briefcase size={28} className="text-red-500" />
// //           </div>
// //           <h1 className="text-xl font-bold text-[var(--color-text-heading)]">
// //             Job not found
// //           </h1>
// //           <p className="text-sm text-[var(--color-text-muted)] mt-2">
// //             {error || "This position may have been closed or removed."}
// //           </p>
// //           <button
// //             onClick={() => navigate("/careers")}
// //             className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-all"
// //           >
// //             <ArrowLeft size={14} />
// //             Back to all jobs
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // RENDER
// //   return (
// //     <div className="min-h-screen bg-[var(--color-bg-body)]">
// //       {/* TOP NAV */}
// //       <div className="bg-[var(--color-bg-card)] border-b border-[var(--color-border)]">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
// //           <button
// //             onClick={() => navigate("/careers")}
// //             className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
// //           >
// //             <ArrowLeft size={14} />
// //             Back to all jobs
// //           </button>
// //         </div>
// //       </div>

// //       {/* HERO */}
// //       <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0E27] via-[#1a1f4a] to-[#2d1b5e] text-white">
// //         <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />
// //         <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />

// //         <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
// //           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[11px] font-medium text-cyan-200 mb-4">
// //             {hasApplied ? (
// //               <>
// //                 <CheckCircle2 size={12} />
// //                 Already Applied
// //               </>
// //             ) : (
// //               <>
// //                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
// //                 Actively Hiring
// //               </>
// //             )}
// //           </div>

// //           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
// //             {job.title}
// //           </h1>
// //           <p className="mt-2 text-base text-gray-300">{job.designation}</p>

// //           <div className="mt-6 flex flex-wrap gap-2">
// //             <HeroPill icon={MapPin} label={job.location || "Remote"} />
// //             <HeroPill icon={Building2} label={`Dept #${job.department_id}`} />
// //             <HeroPill icon={Award} label={`Type #${job.job_type_id}`} />
// //             <HeroPill
// //               icon={Clock}
// //               label={job.experience_required || "Not specified"}
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* CONTENT */}
// //       <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           <div className="lg:col-span-2 space-y-6">
// //             <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
// //               <h2 className="text-base md:text-lg font-semibold text-[var(--color-text-heading)] flex items-center gap-2 mb-4">
// //                 <Briefcase size={18} className="text-[var(--color-primary)]" />
// //                 Job Description
// //               </h2>
// //               <div className="text-sm text-[var(--color-text-heading)] opacity-80 whitespace-pre-wrap leading-relaxed">
// //                 {job.description || "No description provided."}
// //               </div>
// //             </div>

// //             <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
// //               <h2 className="text-base md:text-lg font-semibold text-[var(--color-text-heading)] mb-4">
// //                 What you'll need
// //               </h2>
// //               <ul className="space-y-2 text-sm text-[var(--color-text-heading)] opacity-80">
// //                 <BulletItem
// //                   text={`Experience: ${
// //                     job.experience_required || "Not specified"
// //                   }`}
// //                 />
// //                 <BulletItem text={`Location: ${job.location || "Remote"}`} />
// //                 <BulletItem text={`Department: Dept #${job.department_id}`} />
// //                 <BulletItem text={`Job Type: Type #${job.job_type_id}`} />
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="lg:col-span-1">
// //             <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 lg:sticky lg:top-6">
// //               <h3 className="text-sm font-semibold text-[var(--color-text-heading)] mb-4">
// //                 Job Summary
// //               </h3>

// //               <div className="space-y-3 text-sm">
// //                 <SummaryRow label="Location" value={job.location || "Remote"} />
// //                 <SummaryRow
// //                   label="Department"
// //                   value={`Dept #${job.department_id}`}
// //                 />
// //                 <SummaryRow
// //                   label="Job Type"
// //                   value={`Type #${job.job_type_id}`}
// //                 />
// //                 <SummaryRow
// //                   label="Experience"
// //                   value={job.experience_required || "Not specified"}
// //                 />
// //                 <SummaryRow
// //                   label="Posted"
// //                   value={
// //                     job.created_at
// //                       ? new Date(job.created_at).toLocaleDateString("en-IN", {
// //                           day: "numeric",
// //                           month: "short",
// //                           year: "numeric",
// //                         })
// //                       : "N/A"
// //                   }
// //                 />
// //               </div>

// //               {hasApplied ? (
// //                 <>
// //                   <div className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed">
// //                     <CheckCircle2 size={16} />
// //                     Already Applied
// //                   </div>
// //                   <p className="text-[11px] text-gray-400 text-center mt-3">
// //                     You have already applied for this position
// //                   </p>
// //                 </>
// //               ) : (
// //                 <>
// //                   <button
// //                     onClick={handleApply}
// //                     className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-all shadow-sm hover:shadow-md"
// //                   >
// //                     Apply Now
// //                     <ArrowRight size={14} />
// //                   </button>
// //                   <p className="text-[11px] text-[var(--color-text-muted)] text-center mt-3">
// //                     Takes less than 5 minutes to apply
// //                   </p>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // // Small components
// // function HeroPill({ icon: Icon, label }) {
// //   return (
// //     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white">
// //       <Icon size={12} />
// //       {label}
// //     </span>
// //   );
// // }

// // function BulletItem({ text }) {
// //   return (
// //     <li className="flex items-start gap-2">
// //       <CheckCircle2
// //         size={14}
// //         className="text-[var(--color-primary)] mt-0.5 shrink-0"
// //       />
// //       <span>{text}</span>
// //     </li>
// //   );
// // }

// // function SummaryRow({ label, value }) {
// //   return (
// //     <div className="flex justify-between gap-3 pb-2 border-b border-[var(--color-border)] last:border-b-0 last:pb-0">
// //       <span className="text-[var(--color-text-muted)] text-xs">{label}</span>
// //       <span className="text-[var(--color-text-heading)] text-xs font-medium text-right truncate">
// //         {value}
// //       </span>
// //     </div>
// //   );
// // }











// // src/pages/user/Career/pages/JobDetail.jsx
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { isJobApplied } from "../../../../utils/appliedJobs";
// import {
//   Briefcase,
//   MapPin,
//   Clock,
//   Building2,
//   Award,
//   ArrowLeft,
//   Loader2,
//   ArrowRight,
//   CheckCircle2,
// } from "lucide-react";
// import { getPublicJobById } from "../../../../api/careerApi";

// export default function JobDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [hasApplied, setHasApplied] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const jobId = Number(id);
//       if (!jobId || isNaN(jobId)) {
//         setError("Invalid job ID.");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const jobData = await getPublicJobById(jobId);
//         const actualJob = jobData?.data || jobData?.result || jobData;

//         if (!actualJob || !actualJob.id) {
//           setError("Job not found.");
//           setJob(null);
//         } else {
//           setJob(actualJob);
//           setHasApplied(isJobApplied(actualJob.id));
//         }
//       } catch (err) {
//         console.error("Error fetching job:", err);
//         setError(
//           err.response?.data?.detail ||
//             err.message ||
//             "Job not found or no longer available."
//         );
//         setJob(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchData();
//   }, [id]);

//   const handleApply = () => {
//     navigate(`/careers/job/${job.id}/apply`);
//   };

//   // LOADING
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-body">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 size={40} className="animate-spin text-primary" />
//           <p className="text-sm text-muted">Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   // ERROR
//   if (error || !job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-body px-4">
//         <div className="text-center max-w-md">
//           <div className="inline-flex p-4 rounded-full bg-red-50 mb-4">
//             <Briefcase size={28} className="text-red-500" />
//           </div>
//           <h1 className="text-xl font-bold text-heading">Job not found</h1>
//           <p className="text-sm text-muted mt-2">
//             {error || "This position may have been closed or removed."}
//           </p>
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

//   return (
//     <div className="min-h-screen bg-body text-text-body overflow-x-hidden">
//       {/* ════════════════════════════════
//           TOP NAV
//       ════════════════════════════════ */}
//       <div className="bg-[var(--color-bg-card)] border-b border-[var(--color-border)]">
//         <div className="max-w-5xl mx-auto px-6 py-3">
//           <button
//             onClick={() => navigate("/careers")}
//             className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
//           >
//             <ArrowLeft size={14} />
//             Back to all jobs
//           </button>
//         </div>
//       </div>

//       {/* ════════════════════════════════
//           HERO SECTION
//       ════════════════════════════════ */}
//       <section className="relative overflow-hidden min-h-[340px] flex items-center justify-center bg-black">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600"
//             alt="job"
//             className="w-full h-full object-cover scale-105"
//           />
//           <div className="absolute inset-0 bg-black/80" />
//           <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-black/40 to-primary/20" />
//         </div>

//         {/* Animated rings */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(8)].map((_, i) => (
//             <motion.div
//               key={i}
//               animate={{ rotate: [0, 360] }}
//               transition={{
//                 duration: 20 + i * 2,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               className="absolute top-1/2 left-1/2 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] border border-primary/10"
//               style={{
//                 width: `${260 + i * 70}px`,
//                 height: `${260 + i * 70}px`,
//                 transform: "translate(-50%,-50%)",
//               }}
//             />
//           ))}
//         </div>

//         {/* Floating dots */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <motion.span
//               key={i}
//               animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
//               transition={{ duration: 4 + i, repeat: Infinity }}
//               className="absolute w-2 h-2 rounded-full bg-primary/40"
//               style={{
//                 top: `${8 + ((i * 41) % 78)}%`,
//                 left: `${4 + ((i * 27) % 88)}%`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[11px] font-medium text-primary-light mb-4"
//           >
//             {hasApplied ? (
//               <>
//                 <CheckCircle2 size={12} />
//                 Already Applied
//               </>
//             ) : (
//               <>
//                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                 Actively Hiring
//               </>
//             )}
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className="text-white font-bold text-[clamp(1.75rem,4vw,3rem)] leading-tight tracking-tight"
//           >
//             {job.title}
//           </motion.h1>

//           {job.designation && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.25, duration: 0.6 }}
//               className="mt-2 text-base text-gray-300 max-w-xl leading-7"
//             >
//               {job.designation}
//             </motion.p>
//           )}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="mt-6 flex flex-wrap gap-2"
//           >
//             <HeroPill icon={MapPin} label={job.location || "Remote"} />
//             <HeroPill
//               icon={Building2}
//               label={job.department_name || `Dept #${job.department_id}`}
//             />
//             <HeroPill
//               icon={Award}
//               label={job.job_type_name || `Type #${job.job_type_id}`}
//             />
//             <HeroPill
//               icon={Clock}
//               label={job.experience_required || "Not specified"}
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* ════════════════════════════════
//           CONTENT SECTION
//       ════════════════════════════════ */}
//       <section className="relative max-w-5xl mx-auto px-6 py-16">
//         {/* Soft bg blobs */}
//         <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT CONTENT */}
//           <div className="lg:col-span-2 space-y-6">
           

//             {/* What you'll need */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
//             >
//               <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[var(--color-border)]">
//                 <div className="p-2 rounded-xl bg-[var(--color-primary-pale)]">
//                   <CheckCircle2
//                     size={16}
//                     className="text-[var(--color-primary)]"
//                   />
//                 </div>
//                 <h2 className="text-base md:text-lg font-bold text-heading">
//                   What you'll need
//                 </h2>
//               </div>
//               <ul className="space-y-3 text-sm text-muted">
//                 <BulletItem
//                   text={`Experience: ${
//                     job.experience_required || "Not specified"
//                   }`}
//                 />
//                 <BulletItem text={`Location: ${job.location || "Remote"}`} />
//                 <BulletItem
//                   text={`Department: ${
//                     job.department_name || `Dept #${job.department_id}`
//                   }`}
//                 />
//                 <BulletItem
//                   text={`Job Type: ${
//                     job.job_type_name || `Type #${job.job_type_id}`
//                   }`}
//                 />
//               </ul>
//             </motion.div>


//              {/* Job Description */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
//             >
//               <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[var(--color-border)]">
//                 <div className="p-2 rounded-xl bg-[var(--color-primary-pale)]">
//                   <Briefcase size={16} className="text-[var(--color-primary)]" />
//                 </div>
//                 <h2 className="text-base md:text-lg font-bold text-heading">
//                   Job Description
//                 </h2>
//               </div>
//               <div className="text-sm text-muted whitespace-pre-wrap leading-7">
//                 {job.description || "No description provided."}
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT SIDEBAR */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//               className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:sticky lg:top-6"
//             >
//               <h3 className="text-sm font-bold text-heading mb-5 uppercase tracking-wider">
//                 Job Summary
//               </h3>

//               <div className="space-y-3 text-sm">
//                 <SummaryRow label="Location" value={job.location || "Remote"} />
//                 <SummaryRow
//                   label="Department"
//                   value={job.department_name || `Dept #${job.department_id}`}
//                 />
//                 <SummaryRow
//                   label="Job Type"
//                   value={job.job_type_name || `Type #${job.job_type_id}`}
//                 />
//                 <SummaryRow
//                   label="Experience"
//                   value={job.experience_required || "Not specified"}
//                 />
//                 <SummaryRow
//                   label="Posted"
//                   value={
//                     job.created_at
//                       ? new Date(job.created_at).toLocaleDateString("en-IN", {
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })
//                       : "N/A"
//                   }
//                 />
//               </div>

//               {hasApplied ? (
//                 <>
//                   <div className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-bg-body)] border border-[var(--color-border)] text-muted text-sm font-semibold cursor-not-allowed">
//                     <CheckCircle2 size={16} />
//                     Already Applied
//                   </div>
//                   <p className="text-[11px] text-muted text-center mt-3">
//                     You have already applied for this position
//                   </p>
//                 </>
//               ) : (
//                 <>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleApply}
//                     className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-md hover:shadow-lg group/btn"
//                   >
//                     Apply Now
//                     <ArrowRight
//                       size={14}
//                       className="transition-transform group-hover/btn:translate-x-1"
//                     />
//                   </motion.button>
//                   <p className="text-[11px] text-muted text-center mt-3">
//                     Takes less than 5 minutes to apply
//                   </p>
//                 </>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// // ============================================================
// // Small components
// // ============================================================
// function HeroPill({ icon: Icon, label }) {
//   return (
//     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white">
//       <Icon size={12} />
//       {label}
//     </span>
//   );
// }

// function BulletItem({ text }) {
//   return (
//     <li className="flex items-start gap-2">
//       <CheckCircle2
//         size={14}
//         className="text-[var(--color-primary)] mt-0.5 shrink-0"
//       />
//       <span>{text}</span>
//     </li>
//   );
// }

// function SummaryRow({ label, value }) {
//   return (
//     <div className="flex justify-between gap-3 pb-2 border-b border-[var(--color-border)] last:border-b-0 last:pb-0">
//       <span className="text-muted text-xs">{label}</span>
//       <span className="text-heading text-xs font-semibold text-right truncate">
//         {value}
//       </span>
//     </div>
//   );




// src/pages/user/Career/pages/JobDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { isJobApplied } from "../../../../utils/appliedJobs";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Award,
  ArrowLeft,
  Loader2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getPublicJobById } from "../../../../api/careerApi";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jobId = Number(id);
      if (!jobId || isNaN(jobId)) {
        setError("Invalid job ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const jobData = await getPublicJobById(jobId);
        const actualJob = jobData?.data || jobData?.result || jobData;

        if (!actualJob || !actualJob.id) {
          setError("Job not found.");
          setJob(null);
        } else {
          setJob(actualJob);
          setHasApplied(isJobApplied(actualJob.id));
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(
          err.response?.data?.detail ||
            err.message ||
            "Job not found or no longer available."
        );
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleApply = () => {
    navigate(`/careers/job/${job.id}/apply`);
  };

  // LOADING
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
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  // ERROR
  if (error || !job) {
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
            {error || "This position may have been closed or removed."}
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
            onClick={() => navigate("/careers")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm transition-colors hover:opacity-80"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            <ArrowLeft size={14} />
            Back to all jobs
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[300px] sm:min-h-[340px] flex items-center justify-center bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600"
            alt="job"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-black/40 to-primary/20" />
        </div>

        {/* Animated rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-1/2 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] border border-primary/10"
              style={{
                width: `${260 + i * 70}px`,
                height: `${260 + i * 70}px`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        {/* Floating dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
              style={{
                top: `${8 + ((i * 41) % 78)}%`,
                left: `${4 + ((i * 27) % 88)}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-4"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "var(--color-primary-light, #FBBF24)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {hasApplied ? (
              <>
                <CheckCircle2 size={11} />
                Already Applied
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Actively Hiring
              </>
            )}
          </motion.div>

          {/* ✅ Heading — Playfair Display italic */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-semibold tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[42px] leading-[1.15] mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "#ffffff",
            }}
          >
            {job.title}
          </motion.h1>

          {job.designation && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-xs sm:text-sm max-w-xl leading-6 sm:leading-7"
              style={{
                color: "rgba(255,255,255,0.7)",
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
            className="mt-4 sm:mt-6 flex flex-wrap gap-2"
          >
            <HeroPill icon={MapPin} label={job.location || "Remote"} />
            <HeroPill
              icon={Building2}
              label={job.department_name || `Dept #${job.department_id}`}
            />
            <HeroPill
              icon={Award}
              label={job.job_type_name || `Type #${job.job_type_id}`}
            />
            <HeroPill
              icon={Clock}
              label={job.experience_required || "Not specified"}
            />
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {/* What you'll need */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl p-5 sm:p-6 md:p-8"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-4 pb-4 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background:
                      "var(--color-primary-pale, rgba(249,115,22,0.1))",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                {/* ✅ Heading — Playfair Display italic */}
                <h2
                  className="text-sm sm:text-base md:text-lg font-semibold"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    color: "var(--color-text-heading)",
                  }}
                >
                  What you'll need
                </h2>
              </div>
              <ul
                className="space-y-3 text-xs sm:text-sm"
                style={{
                  color: "var(--color-text-muted)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                <BulletItem
                  text={`Experience: ${
                    job.experience_required || "Not specified"
                  }`}
                />
                <BulletItem text={`Location: ${job.location || "Remote"}`} />
                <BulletItem
                  text={`Department: ${
                    job.department_name || `Dept #${job.department_id}`
                  }`}
                />
                <BulletItem
                  text={`Job Type: ${
                    job.job_type_name || `Type #${job.job_type_id}`
                  }`}
                />
              </ul>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-5 sm:p-6 md:p-8"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-4 pb-4 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background:
                      "var(--color-primary-pale, rgba(249,115,22,0.1))",
                  }}
                >
                  <Briefcase
                    size={15}
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                {/* ✅ Heading — Playfair Display italic */}
                <h2
                  className="text-sm sm:text-base md:text-lg font-semibold"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    color: "var(--color-text-heading)",
                  }}
                >
                  Job Description
                </h2>
              </div>
              <div
                className="text-xs sm:text-sm whitespace-pre-wrap leading-6 sm:leading-7"
                style={{
                  color: "var(--color-text-muted)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                {job.description || "No description provided."}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl p-5 sm:p-6 lg:sticky lg:top-6"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* ✅ Heading — Playfair Display italic */}
              <h3
                className="text-xs sm:text-sm font-bold mb-4 uppercase tracking-wider"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  color: "var(--color-text-heading)",
                }}
              >
                Job Summary
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <SummaryRow
                  label="Location"
                  value={job.location || "Remote"}
                />
                <SummaryRow
                  label="Department"
                  value={job.department_name || `Dept #${job.department_id}`}
                />
                <SummaryRow
                  label="Job Type"
                  value={job.job_type_name || `Type #${job.job_type_id}`}
                />
                <SummaryRow
                  label="Experience"
                  value={job.experience_required || "Not specified"}
                />
                <SummaryRow
                  label="Posted"
                  value={
                    job.created_at
                      ? new Date(job.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"
                  }
                />
              </div>

              {hasApplied ? (
                <>
                  <div
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-not-allowed"
                    style={{
                      background: "var(--color-bg-body)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-muted)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    <CheckCircle2 size={15} />
                    Already Applied
                  </div>
                  <p
                    className="text-[10px] sm:text-[11px] text-center mt-3"
                    style={{
                      color: "var(--color-text-muted)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    You have already applied for this position
                  </p>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApply}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all group/btn"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
                      boxShadow: "0 10px 30px rgba(249,115,22,0.35)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    Apply Now
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </motion.button>
                  <p
                    className="text-[10px] sm:text-[11px] text-center mt-3"
                    style={{
                      color: "var(--color-text-muted)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    Takes less than 5 minutes to apply
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Small components
// ============================================================
function HeroPill({ icon: Icon, label }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium"
      style={{
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}

function BulletItem({ text }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2
        size={13}
        className="mt-0.5 shrink-0"
        style={{ color: "var(--color-primary)" }}
      />
      <span>{text}</span>
    </li>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div
      className="flex justify-between gap-3 pb-2 border-b last:border-b-0 last:pb-0"
      style={{ borderColor: "var(--color-border)" }}
    >
      <span
        className="text-[10px] sm:text-xs"
        style={{
          color: "var(--color-text-muted)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {label}
      </span>
      <span
        className="text-[10px] sm:text-xs font-semibold text-right truncate"
        style={{
          color: "var(--color-text-heading)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {value}
      </span>
    </div>
  );
}