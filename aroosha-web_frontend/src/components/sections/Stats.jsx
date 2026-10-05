// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Code2 } from "lucide-react";
// import {
//   SiReact,
//   SiNodedotjs,
//   SiMongodb,
//   SiTailwindcss,
//   SiTypescript,
//   SiNextdotjs,
//   SiDocker,
//   SiAmazonaws,
//   SiPostgresql,
// } from "react-icons/si";

// const leftOrgs = [
//   "Startups",
//   "E-commerce Brands",
//   "SaaS Products",
//   "Enterprise Apps",
//   "Web Platforms",
// ];

// const rightOrgs = [
//   "Mobile Apps",
//   "Admin Dashboards",
//   "REST APIs",
//   "Cloud Solutions",
//   "Custom CRMs",
// ];

// const marqueeLogos = [
//   { name: "React", Icon: SiReact, color: "#61DAFB" },
//   { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
//   { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
//   { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
//   { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
//   { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
//   { name: "Docker", Icon: SiDocker, color: "#2496ED" },
//   { name: "AWS", Icon: SiAmazonaws, color: "#FF9900" },
//   { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
// ];

// export default function TrustedSection() {
//   const networkRef = useRef(null);
//   const centerRef = useRef(null);
//   const leftRefs = useRef([]);
//   const rightRefs = useRef([]);

//   const [lines, setLines] = useState([]);
//   const [dots, setDots] = useState([]);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setVisible(entry.isIntersecting);
//       },
//       { threshold: 0.15 }
//     );

//     if (networkRef.current) {
//       observer.observe(networkRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const calcLines = () => {
//     const wrap = networkRef.current;
//     const center = centerRef.current;

//     if (!wrap || !center) return;

//     const wRect = wrap.getBoundingClientRect();
//     const cRect = center.getBoundingClientRect();

//     const cx = cRect.left + cRect.width / 2 - wRect.left;
//     const cy = cRect.top + cRect.height / 2 - wRect.top;

//     const newLines = [];
//     const newDots = [];

//     leftRefs.current.forEach((node) => {
//       if (!node) return;
//       const r = node.getBoundingClientRect();
//       const nx = r.right - wRect.left;
//       const ny = r.top + r.height / 2 - wRect.top;
//       newLines.push({ x1: nx, y1: ny, x2: cx, y2: cy });
//       newDots.push({ cx: nx, cy: ny });
//     });

//     rightRefs.current.forEach((node) => {
//       if (!node) return;
//       const r = node.getBoundingClientRect();
//       const nx = r.left - wRect.left;
//       const ny = r.top + r.height / 2 - wRect.top;
//       newLines.push({ x1: nx, y1: ny, x2: cx, y2: cy });
//       newDots.push({ cx: nx, cy: ny });
//     });

//     setLines(newLines);
//     setDots(newDots);
//   };

//   useEffect(() => {
//     const t1 = setTimeout(calcLines, 100);
//     const t2 = setTimeout(calcLines, 600);
//     window.addEventListener("resize", calcLines);
//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//       window.removeEventListener("resize", calcLines);
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//         html {
//           scroll-behavior: smooth;
//         }

//         @keyframes dash {
//           to {
//             stroke-dashoffset: -22;
//           }
//         }

//         @keyframes pulse {
//           0% {
//             transform: translate(-50%, -50%) scale(1);
//             opacity: 0.6;
//           }

//           100% {
//             transform: translate(-50%, -50%) scale(2.2);
//             opacity: 0;
//           }
//         }

//         @keyframes fadeL {
//           from {
//             opacity: 0;
//             transform: translateX(-16px);
//           }

//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes fadeR {
//           from {
//             opacity: 0;
//             transform: translateX(16px);
//           }

//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes ticker {
//           from {
//             transform: translateX(0);
//           }

//           to {
//             transform: translateX(-50%);
//           }
//         }

//         .ts-root {
//           font-family: "Inter", sans-serif;
//         }

//         .ts-card {
//           background: rgba(255,255,255,0.55);
//           backdrop-filter: blur(12px);
//           -webkit-backdrop-filter: blur(12px);
//           border: 1px solid rgba(255,255,255,0.75);
//           border-radius: 12px;
//           padding: 12px 26px;
//           font-size: 13.5px;
//           font-weight: 500;
//           color: var(--color-text-body);
//           white-space: nowrap;
//           text-align: center;
//           box-shadow: 0 2px 10px var(--color-shadow);
//           transition: 0.35s;
//            box-shadow: 0 6px 20px var(--color-shadow-primary);
//         }

//         .ts-card:hover {
//           box-shadow: 0 6px 20px var(--color-shadow-primary);
//           transform: scale(1.03);
//         }

//         .fl {
//           opacity: 0;
//           animation: fadeL 0.45s ease forwards;
//         }

//         .fr {
//           opacity: 0;
//           animation: fadeR 0.45s ease forwards;
//         }

//         .pulse-ring {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 112px;
//           height: 112px;
//           border-radius: 50%;
//           border: 1.5px solid var(--color-primary);
//           animation: pulse 2.4s ease-out infinite;
//           pointer-events: none;
//           opacity: 0.4;
//         }

//         .ticker-track {
//           display: flex;
//           width: max-content;
//           animation: ticker 30s linear infinite;
//         }

//         .ticker-track:hover {
//           animation-play-state: paused;
//         }

//         .smooth-show {
//           opacity: 0;
//           transform: translateY(60px);
//           transition: all 0.9s ease;
//         }

//         .smooth-show.active {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         @media (max-width: 1024px) {
//           .ts-network {
//             height: 500px !important;
//           }
//         }

//         @media (max-width: 768px) {

//           .ts-network {
//             height: auto !important;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 28px;
//           }

//           .ts-side {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             right: auto !important;
//             transform: none !important;
//             width: 100%;
//             align-items: center;
//           }

//           .ts-center {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             transform: none !important;
//             margin: 10px 0;
//           }

//           .ts-svg {
//             display: none;
//           }

//           .ts-card {
//             width: 100%;
//             max-width: 280px;
//             font-size: 13px;
//             padding: 11px 18px;
//           }

//           .ticker-logo img {
//             height: 42px !important;
//             max-width: 90px !important;
//           }

//           .ticker-logo span {
//             font-size: 12px !important;
//           }
//         }

//       `}</style>

//       <div
//         className={`ts-root smooth-show ${visible ? "active" : ""}`}
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           background: "var(--color-bg-muted)",
//         }}
//       >

//         {/* BLOBS */}
//         <div
//           style={{
//             position: "absolute",
//             top: -80,
//             left: -100,
//             width: "clamp(220px,30vw,380px)",
//             height: "clamp(220px,30vw,380px)",
//             borderRadius: "50%",
//             background: "radial-gradient(circle, var(--color-primary)/15 0%, transparent 70%)",
//             filter: "blur(55px)",
//           }}
//         />

//         <div
//           style={{
//             position: "absolute",
//             top: 10,
//             right: -80,
//             width: "clamp(220px,26vw,320px)",
//             height: "clamp(220px,26vw,320px)",
//             borderRadius: "50%",
//             background: "radial-gradient(circle, var(--color-primary-light)/15 0%, transparent 70%)",
//             filter: "blur(50px)",
//           }}
//         />

//         {/* WATERMARK */}

//         <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20">
//           <motion.div
//             animate={{ x: [-30, 30, -30] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <span
//               className="text-[30px] sm:text-[60px] md:text-[110px] font-bold tracking-widest whitespace-nowrap"
//               style={{ color: 'var(--color-text-heading)', opacity: 0.08 }}
//             >
//               Our Tech Stack
//             </span>
//           </motion.div>
//         </div>

//         {/* CONTENT */}
//         <div
//           style={{
//             position: "relative",
//             zIndex: 1,
//             padding: "52px 16px 48px",
//           }}
//         >

//           {/* HEADER */}
//           <div style={{ textAlign: "center", marginBottom: 48 }}>

//             <p
//               style={{
//                 fontSize: 11,
//                 letterSpacing: "0.18em",
//                 textTransform: "uppercase",
//                 color: "var(--color-text-muted)",
//                 marginBottom: 10,
//               }}
//             >
//               Our Tech Stack
//             </p>

//             <h2 className="text-[clamp(20px,3vw,34px)] font-bold text-heading leading-[1.25]">
//               Built with
//               <span className="ml-1 font-[Playfair_Display] italic font-medium text-primary">
//                 modern, reliable technologies
//               </span>
//             </h2>

//           </div>

//           {/* NETWORK */}
//           <div
//             ref={networkRef}
//             className="ts-network"
//             style={{
//               position: "relative",
//               width: "100%",
//               height: 360,
//             }}
//           >

//             {/* SVG */}
//             <svg
//               className="ts-svg"
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//                 zIndex: 0,
//                 pointerEvents: "none",
//               }}
//             >
//               {lines.map((l, i) => (
//                 <line
//                   key={i}
//                   x1={l.x1}
//                   y1={l.y1}
//                   x2={l.x2}
//                   y2={l.y2}
//                   stroke="var(--color-primary)"
//                   strokeWidth="1.3"
//                   opacity="0.5"
//                   strokeDasharray="6 5"
//                   style={{
//                     animation: "dash 1.6s linear infinite",
//                     animationDelay: `${i * 0.13}s`,
//                   }}
//                 />
//               ))}

//               {dots.map((d, i) => (
//                 <circle key={i} cx={d.cx} cy={d.cy} r="4" fill="var(--color-primary)" />
//               ))}
//             </svg>

//             {/* LEFT */}
//             <div
//               className="ts-side"
//               style={{
//                 position: "absolute",
//                 left: "8%",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//                 zIndex: 2,
//               }}
//             >
//               {leftOrgs.map((name, i) => (
//                 <div
//                   key={i}
//                   ref={(el) => (leftRefs.current[i] = el)}
//                   className="ts-card fl"
//                   style={{
//                     animationDelay: `${0.08 + i * 0.09}s`,
//                   }}
//                 >
//                   {name}
//                 </div>
//               ))}
//             </div>

//             {/* CENTER */}
//             <div
//               className="ts-center"
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%,-50%)",
//                 zIndex: 2,
//               }}
//             >
//               <div
//                 ref={centerRef}
//                 style={{
//                   position: "relative",
//                   width: 112,
//                   height: 112,
//                   borderRadius: "50%",
//                   background: "linear-gradient(145deg, var(--color-primary), var(--color-primary-dark))",
//                   boxShadow: "0 8px 40px var(--color-shadow-primary)",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >

//                 <div className="pulse-ring" style={{ animationDelay: "0s" }} />
//                 <div className="pulse-ring" style={{ animationDelay: "1.2s" }} />

//                 <Code2
//                   size={44}
//                   color="#fff"
//                   style={{ marginBottom: 4 }}
//                 />

//                 <span
//                   style={{
//                     fontSize: 9,
//                     fontWeight: 700,
//                     color: "#fff",
//                     letterSpacing: "0.12em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Trusted
//                 </span>

//               </div>
//             </div>

//             {/* RIGHT */}
//             <div
//               className="ts-side"
//               style={{
//                 position: "absolute",
//                 right: "8%",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//                 zIndex: 2,
//               }}
//             >
//               {rightOrgs.map((name, i) => (
//                 <div
//                   key={i}
//                   ref={(el) => (rightRefs.current[i] = el)}
//                   className="ts-card fr"
//                   style={{
//                     animationDelay: `${0.1 + i * 0.09}s`,
//                   }}
//                 >
//                   {name}
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>

//         {/* MARQUEE */}
//         <div
//           style={{
//             background: "var(--color-bg-card)",
//             borderTop: "1px solid var(--color-border)",
//             padding: "16px 0",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >

//           <div className="ticker-track">

//             {[...marqueeLogos, ...marqueeLogos].map((org, i) => {
//               const Icon = org.Icon;
//               return (
//                 <div
//                   key={i}
//                   className="ticker-logo"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 12,
//                     padding: "0 22px",
//                     borderRight: "1px solid var(--color-border)",
//                   }}
//                 >

//                   <Icon size={40} color={org.color} style={{ flexShrink: 0 }} />

//                   <span
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 500,
//                       color: "var(--color-text-body)",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     {org.name}
//                   </span>

//                   <span
//                     style={{
//                       width: 6,
//                       height: 6,
//                       borderRadius: "50%",
//                       background: "var(--color-primary)",
//                       flexShrink: 0,
//                       marginLeft: 6,
//                     }}
//                   />

//                 </div>
//               );
//             })}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiDocker,
  SiFirebase,
  SiPostgresql,
} from "react-icons/si";

const leftOrgs = [
  "Startups",
  "E-commerce Brands",
  "SaaS Products",
  "Enterprise Apps",
  "Web Platforms",
];

const rightOrgs = [
  "Mobile Apps",
  "Admin Dashboards",
  "REST APIs",
  "Cloud Solutions",
  "Custom CRMs",
];

const marqueeLogos = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
];

export default function TrustedSection() {
  const networkRef = useRef(null);
  const centerRef = useRef(null);
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  const [lines, setLines] = useState([]);
  const [dots, setDots] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (networkRef.current) {
      observer.observe(networkRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const calcLines = () => {
    const wrap = networkRef.current;
    const center = centerRef.current;

    if (!wrap || !center) return;

    const wRect = wrap.getBoundingClientRect();
    const cRect = center.getBoundingClientRect();

    const cx = cRect.left + cRect.width / 2 - wRect.left;
    const cy = cRect.top + cRect.height / 2 - wRect.top;

    const newLines = [];
    const newDots = [];

    leftRefs.current.forEach((node) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      const nx = r.right - wRect.left;
      const ny = r.top + r.height / 2 - wRect.top;
      newLines.push({ x1: nx, y1: ny, x2: cx, y2: cy });
      newDots.push({ cx: nx, cy: ny });
    });

    rightRefs.current.forEach((node) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      const nx = r.left - wRect.left;
      const ny = r.top + r.height / 2 - wRect.top;
      newLines.push({ x1: nx, y1: ny, x2: cx, y2: cy });
      newDots.push({ cx: nx, cy: ny });
    });

    setLines(newLines);
    setDots(newDots);
  };

  useEffect(() => {
    const t1 = setTimeout(calcLines, 100);
    const t2 = setTimeout(calcLines, 600);
    window.addEventListener("resize", calcLines);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", calcLines);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        html {
          scroll-behavior: smooth;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -22;
          }
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }

          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }

        @keyframes fadeL {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeR {
          from {
            opacity: 0;
            transform: translateX(16px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .ts-root {
          font-family: "Inter", sans-serif;
        }

        .ts-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.75);
          border-radius: 12px;
          padding: 12px 26px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-text-body);
          white-space: nowrap;
          text-align: center;
          box-shadow: 0 2px 10px var(--color-shadow);
          transition: 0.35s;
           box-shadow: 0 6px 20px var(--color-shadow-primary);
        }

        .ts-card:hover {
          box-shadow: 0 6px 20px var(--color-shadow-primary);
          transform: scale(1.03);
        }

        .fl {
          opacity: 0;
          animation: fadeL 0.45s ease forwards;
        }

        .fr {
          opacity: 0;
          animation: fadeR 0.45s ease forwards;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 112px;
          height: 112px;
          border-radius: 50%;
          border: 1.5px solid var(--color-primary);
          animation: pulse 2.4s ease-out infinite;
          pointer-events: none;
          opacity: 0.4;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 30s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        .smooth-show {
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.9s ease;
        }

        .smooth-show.active {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 1024px) {
          .ts-network {
            height: 500px !important;
          }
        }

        @media (max-width: 768px) {

          .ts-network {
            height: auto !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 28px;
          }

          .ts-side {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            width: 100%;
            align-items: center;
          }

          .ts-center {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            margin: 10px 0;
          }

          .ts-svg {
            display: none;
          }

          .ts-card {
            width: 100%;
            max-width: 280px;
            font-size: 13px;
            padding: 11px 18px;
          }

          .ticker-logo img {
            height: 42px !important;
            max-width: 90px !important;
          }

          .ticker-logo span {
            font-size: 12px !important;
          }
        }

      `}</style>

      <div
        className={`ts-root smooth-show ${visible ? "active" : ""}`}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--color-bg-muted)",
        }}
      >

        {/* BLOBS */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -100,
            width: "clamp(220px,30vw,380px)",
            height: "clamp(220px,30vw,380px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--color-primary)/15 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 10,
            right: -80,
            width: "clamp(220px,26vw,320px)",
            height: "clamp(220px,26vw,320px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--color-primary-light)/15 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* WATERMARK */}

        <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <motion.div
            animate={{ x: [-30, 30, -30] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="text-[30px] sm:text-[60px] md:text-[110px] font-bold tracking-widest whitespace-nowrap"
              style={{ color: 'var(--color-text-heading)', opacity: 0.08 }}
            >
              Our Tech Stack
            </span>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "52px 16px 48px",
          }}
        >

          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>

            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: 10,
              }}
            >
              Our Tech Stack
            </p>

            <h2 className="text-[clamp(20px,3vw,34px)] font-bold text-heading leading-[1.25]">
              Built with
              <span className="ml-1 font-[Playfair_Display] italic font-medium text-primary">
                modern, reliable technologies
              </span>
            </h2>

          </div>

          {/* NETWORK */}
          <div
            ref={networkRef}
            className="ts-network"
            style={{
              position: "relative",
              width: "100%",
              height: 360,
            }}
          >

            {/* SVG */}
            <svg
              className="ts-svg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              {lines.map((l, i) => (
                <line
                  key={i}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="var(--color-primary)"
                  strokeWidth="1.3"
                  opacity="0.5"
                  strokeDasharray="6 5"
                  style={{
                    animation: "dash 1.6s linear infinite",
                    animationDelay: `${i * 0.13}s`,
                  }}
                />
              ))}

              {dots.map((d, i) => (
                <circle key={i} cx={d.cx} cy={d.cy} r="4" fill="var(--color-primary)" />
              ))}
            </svg>

            {/* LEFT */}
            <div
              className="ts-side"
              style={{
                position: "absolute",
                left: "8%",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                zIndex: 2,
              }}
            >
              {leftOrgs.map((name, i) => (
                <div
                  key={i}
                  ref={(el) => (leftRefs.current[i] = el)}
                  className="ts-card fl"
                  style={{
                    animationDelay: `${0.08 + i * 0.09}s`,
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* CENTER */}
            <div
              className="ts-center"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 2,
              }}
            >
              <div
                ref={centerRef}
                style={{
                  position: "relative",
                  width: 112,
                  height: 112,
                  borderRadius: "50%",
                  background: "linear-gradient(145deg, var(--color-primary), var(--color-primary-dark))",
                  boxShadow: "0 8px 40px var(--color-shadow-primary)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >

                <div className="pulse-ring" style={{ animationDelay: "0s" }} />
                <div className="pulse-ring" style={{ animationDelay: "1.2s" }} />

                <Code2
                  size={44}
                  color="#fff"
                  style={{ marginBottom: 4 }}
                />

                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Trusted
                </span>

              </div>
            </div>

            {/* RIGHT */}
            <div
              className="ts-side"
              style={{
                position: "absolute",
                right: "8%",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                zIndex: 2,
              }}
            >
              {rightOrgs.map((name, i) => (
                <div
                  key={i}
                  ref={(el) => (rightRefs.current[i] = el)}
                  className="ts-card fr"
                  style={{
                    animationDelay: `${0.1 + i * 0.09}s`,
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* MARQUEE */}
        <div
          style={{
            background: "var(--color-bg-card)",
            borderTop: "1px solid var(--color-border)",
            padding: "16px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >

          <div className="ticker-track">

            {[...marqueeLogos, ...marqueeLogos].map((org, i) => {
              const Icon = org.Icon;
              return (
                <div
                  key={i}
                  className="ticker-logo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "0 22px",
                    borderRight: "1px solid var(--color-border)",
                  }}
                >

                  <Icon size={40} color={org.color} style={{ flexShrink: 0 }} />

                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--color-text-body)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {org.name}
                  </span>

                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--color-primary)",
                      flexShrink: 0,
                      marginLeft: 6,
                    }}
                  />

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </>
  );
}