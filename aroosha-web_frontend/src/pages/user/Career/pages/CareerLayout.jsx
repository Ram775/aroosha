// // src/pages/user/Career/pages/CareerLayout.jsx
// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { isJobApplied } from "../../../../utils/appliedJobs";
// import {
//   Briefcase,
//   MapPin,
//   Building2,
//   Search,
//   Loader2,
//   TrendingUp,
//   ArrowRight,
//   ChevronDown,
//   Clock,
//   CheckCircle2,
//   Calendar,
//   Layers,
//   Award,
// } from "lucide-react";
// import { getPublicJobs, toArray } from "../../../../api/careerApi";
// import EmptyPositions from "./EmptyPositions";

// export default function CareerLayout() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [expandedJobId, setExpandedJobId] = useState(null); // 🔹 sirf ek card open

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await getPublicJobs();
//         setJobs(toArray(data));
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//         setError("Unable to load jobs. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const locations = useMemo(() => {
//     const set = new Set(jobs.map((j) => j.location).filter(Boolean));
//     return ["all", ...Array.from(set)];
//   }, [jobs]);

//   const filteredJobs = useMemo(() => {
//     let filtered = jobs;
//     if (searchTerm) {
//       const s = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (j) =>
//           j.title?.toLowerCase().includes(s) ||
//           j.designation?.toLowerCase().includes(s) ||
//           j.location?.toLowerCase().includes(s)
//       );
//     }
//     if (locationFilter !== "all") {
//       filtered = filtered.filter((j) => j.location === locationFilter);
//     }
//     return filtered;
//   }, [jobs, searchTerm, locationFilter]);

//   const stats = useMemo(
//     () => ({
//       totalJobs: jobs.length,
//       uniqueLocations: new Set(jobs.map((j) => j.location).filter(Boolean)).size,
//       uniqueDepts: new Set(jobs.map((j) => j.department_id).filter(Boolean))
//         .size,
//     }),
//     [jobs]
//   );

//   const handleToggleExpand = (jobId) => {
//     setExpandedJobId((prev) => (prev === jobId ? null : jobId));
//   };

//   const handleApply = (jobId) => {
//     navigate(`/careers/job/${jobId}/apply`);
//   };

//   return (
//     <div className="min-h-screen bg-body text-text-body overflow-x-hidden">
//       {/* ════════════════════════════════
//           HERO SECTION
//       ════════════════════════════════ */}
//       <section className="relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center text-center px-6 py-20 bg-body">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600"
//             alt="careers"
//             className="w-full h-full object-cover scale-105 opacity-10"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
//         </div>

//         <div className="absolute inset-0 overflow-hidden">
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

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6"
//         >
//           <TrendingUp size={12} />
//           {stats.totalJobs} open position{stats.totalJobs !== 1 ? "s" : ""}
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="relative z-10 text-heading font-bold tracking-[1px] text-[clamp(2.7rem,6vw,4.5rem)] mb-4"
//         >
//           Build your{" "}
//           <span className="text-primary font-[Playfair_Display] italic font-medium">
//             career
//           </span>{" "}
//           with us
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="relative z-10 text-[15px] text-muted max-w-[720px] leading-8"
//         >
//           Explore opportunities across departments. Find the role that
//           matches your skills and passion.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.45, duration: 0.6 }}
//           className="relative z-10 mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xl"
//         >
//           <div className="relative flex-1">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
//             />
//             <input
//               type="text"
//               placeholder="Search jobs by title or location..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border text-heading placeholder:text-muted focus:outline-none focus:border-primary transition-all text-sm"
//             />
//           </div>
//         </motion.div>
//       </section>

//       {/* ════════════════════════════════
//           JOBS SECTION
//       ════════════════════════════════ */}
//       <section className="relative max-w-5xl mx-auto px-6 py-20">
//         <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center max-w-2xl mx-auto mb-16"
//         >
//           <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-semibold mb-3">
//             Open Roles
//           </p>
//           <h2 className="text-3xl md:text-[2.4rem] font-black leading-tight tracking-tight text-heading">
//             Latest{" "}
//             <span className="text-primary font-[Playfair_Display] italic font-medium">
//               Openings
//             </span>
//           </h2>
//           <p className="mt-4 text-muted text-sm leading-7 max-w-xl mx-auto">
//             {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}{" "}
//             found — click a role to see full details.
//           </p>
//           <div className="mt-7 flex items-center justify-center gap-3">
//             <div className="h-px w-14 bg-border" />
//             <div className="w-2 h-2 rounded-full bg-primary" />
//             <div className="h-px w-14 bg-border" />
//           </div>
//         </motion.div>

//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
//           >
//             {error}
//           </motion.div>
//         )}

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2 size={40} className="animate-spin text-primary" />
//             <p className="mt-3 text-sm text-muted">Loading opportunities...</p>
//           </div>
//         ) : filteredJobs.length === 0 ? (
//           <EmptyPositions
//             onClear={() => {
//               setSearchTerm("");
//               setLocationFilter("all");
//             }}
//           />
//         ) : (
//           /* ── JOB CARDS — click to expand (sirf ek open) ── */
//           <div className="flex flex-col gap-4">
//             {filteredJobs.map((job, i) => {
//               const isExpanded = expandedJobId === job.id;
//               const applied = isJobApplied(job.id);

//               return (
//                 <motion.article
//                   key={job.id}
//                   initial={{ opacity: 0, y: 24 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.05, duration: 0.5 }}
//                   className={`group relative bg-card border rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ${
//                     isExpanded
//                       ? "border-primary/50 shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
//                       : "border-border hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
//                   }`}
//                 >
//                   {/* Left accent bar */}
//                   <div
//                     className={`absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-primary transition-opacity duration-300 ${
//                       isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
//                     }`}
//                   />

//                   {/* ══════════════════════════════
//                       CLICKABLE HEADER (with chevron)
//                   ══════════════════════════════ */}
//                   <button
//                     onClick={() => handleToggleExpand(job.id)}
//                     className="w-full text-left p-5 md:p-6"
//                   >
//                     <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-wrap items-center gap-2 mb-3">
//                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-pale text-primary text-[11px] font-semibold uppercase tracking-wider">
//                             <Building2 size={11} />
//                             {job.department_name || `Dept #${job.department_id}`}
//                           </span>
//                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-body border border-border text-muted text-[11px] font-semibold uppercase tracking-wider">
//                             <Briefcase size={11} />
//                             {job.job_type_name || `Type #${job.job_type_id}`}
//                           </span>
//                           {applied && (
//                             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold uppercase tracking-wider">
//                               <CheckCircle2 size={11} />
//                               Applied
//                             </span>
//                           )}
//                         </div>

//                         <h3 className="text-base md:text-lg font-bold text-heading leading-snug group-hover:text-primary transition-colors duration-300">
//                           {job.title || job.designation || "Untitled Position"}
//                         </h3>

//                         <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
//                           {job.location && (
//                             <span className="inline-flex items-center gap-1.5">
//                               <MapPin size={14} className="text-primary" />
//                               {job.location}
//                             </span>
//                           )}
//                           {job.experience_required && (
//                             <span className="inline-flex items-center gap-1.5">
//                               <Award size={14} className="text-primary" />
//                               {job.experience_required}
//                             </span>
//                           )}
//                           {job.created_at && (
//                             <span className="inline-flex items-center gap-1.5">
//                               <Calendar size={14} className="text-primary" />
//                               Posted{" "}
//                               {new Date(job.created_at).toLocaleDateString(
//                                 "en-IN",
//                                 {
//                                   day: "numeric",
//                                   month: "short",
//                                   year: "numeric",
//                                 }
//                               )}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Chevron toggle */}
//                       <div className="shrink-0 flex items-center gap-3 md:pl-6 md:border-l md:border-border">
//                         <span className="text-xs font-semibold text-primary">
//                           {isExpanded ? "Hide details" : "View details"}
//                         </span>
//                         <motion.div
//                           animate={{ rotate: isExpanded ? 180 : 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="p-2 rounded-full bg-primary-pale"
//                         >
//                           <ChevronDown size={16} className="text-primary" />
//                         </motion.div>
//                       </div>
//                     </div>
//                   </button>

//                   {/* ══════════════════════════════
//                       EXPANDED DETAILS (sirf active card)
//                   ══════════════════════════════ */}
//                   <AnimatePresence initial={false}>
//                     {isExpanded && (
//                       <motion.div
//                         key="details"
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.35, ease: "easeInOut" }}
//                         className="overflow-hidden border-t border-border"
//                       >
//                         <div className="p-6 md:p-8 space-y-8">
//                           {/* ── JOB SUMMARY ── */}
//                           <div>
//                             <div className="flex items-center gap-2 mb-3">
//                               <div className="p-1.5 rounded-lg bg-primary-pale">
//                                 <Layers size={14} className="text-primary" />
//                               </div>
//                               <h4 className="text-sm font-bold text-heading uppercase tracking-wider">
//                                 Job Summary
//                               </h4>
//                             </div>
//                             <div className="h-px w-full bg-border mb-4" />
//                             <dl className="space-y-2.5 text-sm">
//                               <div className="flex gap-2">
//                                 <dt className="text-muted w-28 shrink-0">
//                                   Type:
//                                 </dt>
//                                 <dd className="text-heading font-semibold">
//                                   {job.job_type_name ||
//                                     `Type #${job.job_type_id}`}
//                                 </dd>
//                               </div>
//                               <div className="flex gap-2">
//                                 <dt className="text-muted w-28 shrink-0">
//                                   Experience:
//                                 </dt>
//                                 <dd className="text-heading font-semibold">
//                                   {job.experience_required || "Not specified"}
//                                 </dd>
//                               </div>
//                               <div className="flex gap-2">
//                                 <dt className="text-muted w-28 shrink-0">
//                                   Location:
//                                 </dt>
//                                 <dd className="text-heading font-semibold">
//                                   {job.location || "Remote"}
//                                 </dd>
//                               </div>
//                               <div className="flex gap-2">
//                                 <dt className="text-muted w-28 shrink-0">
//                                   Posted:
//                                 </dt>
//                                 <dd className="text-heading font-semibold">
//                                   {job.created_at
//                                     ? new Date(
//                                         job.created_at
//                                       ).toLocaleDateString("en-IN", {
//                                         day: "numeric",
//                                         month: "short",
//                                         year: "numeric",
//                                       })
//                                     : "N/A"}
//                                 </dd>
//                               </div>
//                             </dl>
//                           </div>

//                           {/* ── JOB DESCRIPTION ── */}
//                           <div>
//                             <div className="flex items-center gap-2 mb-3">
//                               <div className="p-1.5 rounded-lg bg-primary-pale">
//                                 <Briefcase size={14} className="text-primary" />
//                               </div>
//                               <h4 className="text-sm font-bold text-heading uppercase tracking-wider">
//                                 Job Description
//                               </h4>
//                             </div>
//                             <p className="text-sm text-muted whitespace-pre-wrap leading-7">
//                               {job.description || "No description provided."}
//                             </p>
//                           </div>

//                           {/* ── REQUIREMENTS & ELIGIBILITY ── */}
//                           <div>
//                             <div className="flex items-center gap-2 mb-3">
//                               <div className="p-1.5 rounded-lg bg-primary-pale">
//                                 <CheckCircle2
//                                   size={14}
//                                   className="text-primary"
//                                 />
//                               </div>
//                               <h4 className="text-sm font-bold text-heading uppercase tracking-wider">
//                                 Requirements & Eligibility
//                               </h4>
//                             </div>
//                             <ul className="space-y-2.5 text-sm text-muted">
//                               <li className="flex items-start gap-2">
//                                 <CheckCircle2
//                                   size={14}
//                                   className="text-primary mt-0.5 shrink-0"
//                                 />
//                                 <span>
//                                   <strong className="text-heading font-semibold">
//                                     Experience:
//                                   </strong>{" "}
//                                   {job.experience_required || "Not specified"}
//                                 </span>
//                               </li>
//                               <li className="flex items-start gap-2">
//                                 <CheckCircle2
//                                   size={14}
//                                   className="text-primary mt-0.5 shrink-0"
//                                 />
//                                 <span>
//                                   <strong className="text-heading font-semibold">
//                                     Location:
//                                   </strong>{" "}
//                                   {job.location || "Remote"}
//                                 </span>
//                               </li>
//                               <li className="flex items-start gap-2">
//                                 <CheckCircle2
//                                   size={14}
//                                   className="text-primary mt-0.5 shrink-0"
//                                 />
//                                 <span>
//                                   <strong className="text-heading font-semibold">
//                                     Department:
//                                   </strong>{" "}
//                                   {job.department_name ||
//                                     `Dept #${job.department_id}`}
//                                 </span>
//                               </li>
//                               <li className="flex items-start gap-2">
//                                 <CheckCircle2
//                                   size={14}
//                                   className="text-primary mt-0.5 shrink-0"
//                                 />
//                                 <span>
//                                   <strong className="text-heading font-semibold">
//                                     Job Type:
//                                   </strong>{" "}
//                                   {job.job_type_name ||
//                                     `Type #${job.job_type_id}`}
//                                 </span>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>

//                         {/* ── FOOTER LINE — Apply ── */}
//                         <div className="px-6 md:px-8 py-5 bg-body/60 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                           <div className="flex items-center gap-2 text-xs text-muted">
//                             <Clock
//                               size={13}
//                               className="text-primary shrink-0"
//                             />
//                             <span>
//                               Ready to take the next step? Submit your
//                               application now.
//                             </span>
//                           </div>

//                           {applied ? (
//                             <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-muted text-sm font-semibold cursor-not-allowed w-full sm:w-auto">
//                               <CheckCircle2 size={16} />
//                               Already Applied
//                             </div>
//                           ) : (
//                             <motion.button
//                               whileHover={{ scale: 1.02 }}
//                               whileTap={{ scale: 0.98 }}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleApply(job.id);
//                               }}
//                               className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 w-full sm:w-auto group/apply"
//                             >
//                               Apply Now
//                               <ArrowRight
//                                 size={15}
//                                 className="transition-transform group-hover/apply:translate-x-1"
//                               />
//                             </motion.button>
//                           )}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.article>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       {/* ════════════════════════════════
//           CTA SECTION
//       ════════════════════════════════ */}
//       <section className="relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
//           <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
//         </div>

//         <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-16">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="max-w-xl"
//             >
//               <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
//                 Still Searching?
//               </p>
//               <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
//                 Don't see a role that{" "}
//                 <span className="text-primary font-[Playfair_Display] italic font-medium">
//                   fits?
//                 </span>
//               </h2>
//               <p className="mt-3 text-sm text-gray-400 leading-7">
//                 Send us your resume anyway. We're always looking for talented
//                 people to join our team — your next opportunity might just be
//                 one message away.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.15 }}
//               className="shrink-0"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => navigate("/contact")}
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 group/cta"
//               >
//                 Get in touch
//                 <ArrowRight
//                   size={16}
//                   className="transition-transform group-hover/cta:translate-x-1"
//                 />
//               </motion.button>
//             </motion.div>
//           </div>

//           <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
//             <p className="text-xs text-gray-500">
//               © {new Date().getFullYear()} NetBeans Systems. All rights reserved.
//             </p>
//             <p className="text-xs text-gray-500 italic font-[Playfair_Display]">
//               Building careers that inspire &amp; perform.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


// src/pages/user/Career/pages/CareerLayout.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { isJobApplied } from "../../../../utils/appliedJobs";
import {
  Briefcase,
  MapPin,
  Building2,
  Search,
  Loader2,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import { getPublicJobs, toArray } from "../../../../api/careerApi";
import EmptyPositions from "./EmptyPositions";

// ✅ LOCAL IMAGES — hero background ke liye
import aboutImg from "../../../../assets/images/about.png";
import about01Img from "../../../../assets/images/about01.png";
import about02Img from "../../../../assets/images/about02.png";

export default function CareerLayout() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [expandedJobId, setExpandedJobId] = useState(null);

  // ✅ Hero background images (About jaisa)
  const heroImages = [aboutImg, about01Img, about02Img];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(i);
  }, [heroImages.length]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPublicJobs();
        setJobs(toArray(data));
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Unable to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const locations = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.title?.toLowerCase().includes(s) ||
          j.designation?.toLowerCase().includes(s) ||
          j.location?.toLowerCase().includes(s)
      );
    }
    if (locationFilter !== "all") {
      filtered = filtered.filter((j) => j.location === locationFilter);
    }
    return filtered;
  }, [jobs, searchTerm, locationFilter]);

  const stats = useMemo(
    () => ({
      totalJobs: jobs.length,
      uniqueLocations: new Set(jobs.map((j) => j.location).filter(Boolean)).size,
      uniqueDepts: new Set(jobs.map((j) => j.department_id).filter(Boolean))
        .size,
    }),
    [jobs]
  );

  const handleToggleExpand = (jobId) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  const handleApply = (jobId) => {
    navigate(`/careers/job/${jobId}/apply`);
  };

  return (
    <div className="min-h-screen bg-body text-text-body overflow-x-hidden">
      {/* ════════════════════════════════
          HERO SECTION — with changing images
      ════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20 bg-body">
        {/* ✅ Background images — change hote rehte hain */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={heroImages[heroIndex]}
              alt="careers"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.12, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.error("❌ Hero image failed:", heroImages[heroIndex]);
                e.target.style.opacity = 0;
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-body/60 to-primary/10" />
        </div>

        {/* Animated rings */}
        <div className="absolute inset-0 overflow-hidden">
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

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 sm:mb-6"
          style={{
            background: "var(--color-primary-pale)",
            border:
              "1px solid var(--color-primary-light, rgba(249,115,22,0.3))",
            color: "var(--color-primary)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <TrendingUp size={11} />
          {stats.totalJobs} open position{stats.totalJobs !== 1 ? "s" : ""}
        </motion.div>

        {/* ✅ Heading — Playfair Display italic */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-3 sm:mb-4 leading-[1.15]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            color: "var(--color-text-heading)",
          }}
        >
          Build your{" "}
          <span
            className="font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            career
          </span>{" "}
          with us
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 text-xs sm:text-sm max-w-[600px] leading-6 sm:leading-7"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Explore opportunities across departments. Find the role that matches
          your skills and passion.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="relative z-10 mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xl"
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search jobs by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition-all focus:outline-none focus:border-primary"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-heading)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════
          JOBS SECTION
      ════════════════════════════════ */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-16"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-3"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Open Roles
          </p>
          <h2
            className="font-semibold leading-[1.2] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[30px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-text-heading)",
            }}
          >
            Latest{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Openings
            </span>
          </h2>
          <p
            className="mt-3 text-xs sm:text-sm leading-6 sm:leading-7 max-w-xl mx-auto"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
            — click a role to see full details.
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

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl text-sm"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#dc2626",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2
              size={36}
              className="animate-spin"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="mt-3 text-xs sm:text-sm"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Loading opportunities...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <EmptyPositions
            onClear={() => {
              setSearchTerm("");
              setLocationFilter("all");
            }}
          />
        ) : (
          /* ── JOB CARDS ── */
          <div className="flex flex-col gap-4">
            {filteredJobs.map((job, i) => {
              const isExpanded = expandedJobId === job.id;
              const applied = isJobApplied(job.id);

              return (
                <motion.article
                  key={job.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "var(--color-bg-card)",
                    border: `1px solid ${
                      isExpanded
                        ? "var(--color-primary)"
                        : "var(--color-border)"
                    }`,
                    boxShadow: isExpanded
                      ? "0 20px 60px rgba(249, 115, 22, 0.15), 0 8px 24px rgba(0,0,0,0.08)"
                      : "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full transition-opacity duration-300"
                    style={{
                      background: "var(--color-primary)",
                      opacity: isExpanded ? 1 : 0,
                    }}
                  />

                  <button
                    onClick={() => handleToggleExpand(job.id)}
                    className="w-full text-left p-4 sm:p-5 md:p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 md:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
                            style={{
                              background:
                                "var(--color-primary-pale, rgba(249,115,22,0.1))",
                              color: "var(--color-primary)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            <Building2 size={11} />
                            {job.department_name || `Dept #${job.department_id}`}
                          </span>
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
                            style={{
                              background: "var(--color-bg-body)",
                              border: "1px solid var(--color-border)",
                              color: "var(--color-text-muted)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            <Briefcase size={11} />
                            {job.job_type_name || `Type #${job.job_type_id}`}
                          </span>
                          {applied && (
                            <span
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
                              style={{
                                background: "rgba(16, 185, 129, 0.1)",
                                color: "#059669",
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              <CheckCircle2 size={11} />
                              Applied
                            </span>
                          )}
                        </div>

                        <h3
                          className="text-sm sm:text-base md:text-lg font-bold leading-snug transition-colors duration-300"
                          style={{
                            color: isExpanded
                              ? "var(--color-primary)"
                              : "var(--color-text-heading)",
                            fontFamily: "'Inter', system-ui, sans-serif",
                          }}
                        >
                          {job.title || job.designation || "Untitled Position"}
                        </h3>

                        <div
                          className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs"
                          style={{
                            color: "var(--color-text-muted)",
                            fontFamily: "'Inter', system-ui, sans-serif",
                          }}
                        >
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin
                                size={13}
                                style={{ color: "var(--color-primary)" }}
                              />
                              {job.location}
                            </span>
                          )}
                          {job.experience_required && (
                            <span className="inline-flex items-center gap-1.5">
                              <Award
                                size={13}
                                style={{ color: "var(--color-primary)" }}
                              />
                              {job.experience_required}
                            </span>
                          )}
                          {job.created_at && (
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar
                                size={13}
                                style={{ color: "var(--color-primary)" }}
                              />
                              Posted{" "}
                              {new Date(job.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className="shrink-0 flex items-center gap-3 md:pl-6 md:border-l"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <span
                          className="text-[11px] sm:text-xs font-semibold"
                          style={{
                            color: "var(--color-primary)",
                            fontFamily: "'Inter', system-ui, sans-serif",
                          }}
                        >
                          {isExpanded ? "Hide details" : "View details"}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 rounded-full"
                          style={{
                            background:
                              "var(--color-primary-pale, rgba(249,115,22,0.1))",
                          }}
                        >
                          <ChevronDown
                            size={14}
                            style={{ color: "var(--color-primary)" }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden border-t"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                          {/* Job Summary */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className="p-1.5 rounded-lg"
                                style={{
                                  background:
                                    "var(--color-primary-pale, rgba(249,115,22,0.1))",
                                }}
                              >
                                <Layers
                                  size={13}
                                  style={{ color: "var(--color-primary)" }}
                                />
                              </div>
                              <h4
                                className="text-xs sm:text-sm font-bold uppercase tracking-wider"
                                style={{
                                  color: "var(--color-text-heading)",
                                  fontFamily:
                                    "'Inter', system-ui, sans-serif",
                                }}
                              >
                                Job Summary
                              </h4>
                            </div>
                            <div
                              className="h-px w-full mb-4"
                              style={{ background: "var(--color-border)" }}
                            />
                            <dl className="space-y-2 text-[11px] sm:text-sm">
                              {[
                                {
                                  label: "Type:",
                                  value:
                                    job.job_type_name ||
                                    `Type #${job.job_type_id}`,
                                },
                                {
                                  label: "Experience:",
                                  value:
                                    job.experience_required ||
                                    "Not specified",
                                },
                                {
                                  label: "Location:",
                                  value: job.location || "Remote",
                                },
                                {
                                  label: "Posted:",
                                  value: job.created_at
                                    ? new Date(
                                        job.created_at
                                      ).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : "N/A",
                                },
                              ].map((item, idx) => (
                                <div key={idx} className="flex gap-2">
                                  <dt
                                    className="w-24 sm:w-28 shrink-0"
                                    style={{
                                      color: "var(--color-text-muted)",
                                      fontFamily:
                                        "'Inter', system-ui, sans-serif",
                                    }}
                                  >
                                    {item.label}
                                  </dt>
                                  <dd
                                    className="font-semibold"
                                    style={{
                                      color: "var(--color-text-heading)",
                                      fontFamily:
                                        "'Inter', system-ui, sans-serif",
                                    }}
                                  >
                                    {item.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>

                          {/* Job Description */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className="p-1.5 rounded-lg"
                                style={{
                                  background:
                                    "var(--color-primary-pale, rgba(249,115,22,0.1))",
                                }}
                              >
                                <Briefcase
                                  size={13}
                                  style={{ color: "var(--color-primary)" }}
                                />
                              </div>
                              <h4
                                className="text-xs sm:text-sm font-bold uppercase tracking-wider"
                                style={{
                                  color: "var(--color-text-heading)",
                                  fontFamily:
                                    "'Inter', system-ui, sans-serif",
                                }}
                              >
                                Job Description
                              </h4>
                            </div>
                            <p
                              className="text-[11px] sm:text-sm whitespace-pre-wrap leading-6 sm:leading-7"
                              style={{
                                color: "var(--color-text-muted)",
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }}
                            >
                              {job.description || "No description provided."}
                            </p>
                          </div>

                          {/* Requirements */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className="p-1.5 rounded-lg"
                                style={{
                                  background:
                                    "var(--color-primary-pale, rgba(249,115,22,0.1))",
                                }}
                              >
                                <CheckCircle2
                                  size={13}
                                  style={{ color: "var(--color-primary)" }}
                                />
                              </div>
                              <h4
                                className="text-xs sm:text-sm font-bold uppercase tracking-wider"
                                style={{
                                  color: "var(--color-text-heading)",
                                  fontFamily:
                                    "'Inter', system-ui, sans-serif",
                                }}
                              >
                                Requirements & Eligibility
                              </h4>
                            </div>
                            <ul
                              className="space-y-2 text-[11px] sm:text-sm"
                              style={{
                                color: "var(--color-text-muted)",
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }}
                            >
                              {[
                                {
                                  label: "Experience:",
                                  value:
                                    job.experience_required ||
                                    "Not specified",
                                },
                                {
                                  label: "Location:",
                                  value: job.location || "Remote",
                                },
                                {
                                  label: "Department:",
                                  value:
                                    job.department_name ||
                                    `Dept #${job.department_id}`,
                                },
                                {
                                  label: "Job Type:",
                                  value:
                                    job.job_type_name ||
                                    `Type #${job.job_type_id}`,
                                },
                              ].map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle2
                                    size={13}
                                    className="mt-0.5 shrink-0"
                                    style={{ color: "var(--color-primary)" }}
                                  />
                                  <span>
                                    <strong
                                      className="font-semibold"
                                      style={{
                                        color: "var(--color-text-heading)",
                                      }}
                                    >
                                      {item.label}
                                    </strong>{" "}
                                    {item.value}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Footer — Apply */}
                        <div
                          className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t"
                          style={{
                            background: "var(--color-bg-body)",
                            borderColor: "var(--color-border)",
                          }}
                        >
                          <div
                            className="flex items-center gap-2 text-[11px] sm:text-xs"
                            style={{
                              color: "var(--color-text-muted)",
                              fontFamily: "'Inter', system-ui, sans-serif",
                            }}
                          >
                            <Clock
                              size={13}
                              className="shrink-0"
                              style={{ color: "var(--color-primary)" }}
                            />
                            <span>
                              Ready to take the next step? Submit your
                              application now.
                            </span>
                          </div>

                          {applied ? (
                            <div
                              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold cursor-not-allowed w-full sm:w-auto"
                              style={{
                                background: "var(--color-bg-card)",
                                border: "1px solid var(--color-border)",
                                color: "var(--color-text-muted)",
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }}
                            >
                              <CheckCircle2 size={15} />
                              Already Applied
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApply(job.id);
                              }}
                              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-white text-[11px] sm:text-sm font-semibold transition-all w-full sm:w-auto group/apply"
                              style={{
                                background:
                                  "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
                                boxShadow:
                                  "0 10px 30px rgba(249,115,22,0.35)",
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }}
                            >
                              Apply Now
                              <ArrowRight
                                size={14}
                                className="transition-transform group-hover/apply:translate-x-1"
                              />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      {/* ════════════════════════════════
          CTA SECTION
      ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <p
                className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-3"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Still Searching?
              </p>
              <h2
                className="font-semibold leading-[1.2] text-lg sm:text-xl md:text-2xl lg:text-3xl"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  color: "#ffffff",
                }}
              >
                Don't see a role that{" "}
                <span
                  className="font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  fits?
                </span>
              </h2>
              <p
                className="mt-3 text-[11px] sm:text-sm leading-6 sm:leading-7"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Send us your resume anyway. We're always looking for talented
                people to join our team — your next opportunity might just be
                one message away.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="shrink-0"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white text-[11px] sm:text-sm font-semibold transition-all group/cta"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
                  boxShadow: "0 10px 30px rgba(249,115,22,0.4)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Get in touch
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover/cta:translate-x-1"
                />
              </motion.button>
            </motion.div>
          </div>

          <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
            <p
              className="text-[10px] sm:text-xs"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              © {new Date().getFullYear()} NetBeans Systems. All rights reserved.
            </p>
            <p
              className="text-[10px] sm:text-xs italic"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Building careers that inspire &amp; perform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}