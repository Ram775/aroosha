import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ServiceCard({ 
  icon, 
  title, 
  items = [], 
  tags = [], 
  color = "#1D9E75", 
  colorLight = "rgba(29,158,117,0.11)",
  link = "/services",
  delay = 0,
  index = 0
}) {
  const navigate = useNavigate();

  const col = index % 3;
  const dirClass = col === 0 ? "card-from-left" : col === 2 ? "card-from-right" : "card-from-bottom";

  return (
    <div
      className={`card-wrapper ${dirClass}`}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div
        onClick={() => navigate(link)}
        className="svc-card relative h-[305px] cursor-pointer overflow-hidden rounded-[20px] bg-card shadow-[0_2px_14px_var(--color-shadow)] transition-transform duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_38px_var(--color-shadow-primary)]"
        style={{
          background: `linear-gradient(155deg, #fff 55%, ${colorLight} 100%)`,
        }}
      >
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center pt-7">
          <span className="text-[36px] leading-none">{icon}</span>
          <p className="mt-3 px-3 text-center text-sm font-bold text-heading">
            {title}
          </p>

          <ul className="mt-2 w-full list-none px-4">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 py-[2.5px] text-[11.5px] text-text-body"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Wave background */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-[2] h-11 w-full overflow-hidden">
          <svg
            className="h-11 w-[200%] wave-slow"
            viewBox="0 0 800 44"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,22 C100,44 200,0 300,22 C400,44 500,0 600,22 C700,44 800,0 900,22 C1000,44 1100,0 1200,22 V44 H0Z"
              fill={`${color}2e`}
            />
          </svg>
        </div>

        {/* Liquid fill on hover */}
        <div className="liquid-fill pointer-events-none absolute bottom-0 left-0 z-[3] w-full overflow-hidden transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
          <svg
            className="absolute left-0 top-[-2px] h-11 w-[200%] wave-slow"
            style={{ animationDuration: '5s' }}
            viewBox="0 0 800 44"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,22 C100,44 200,0 300,22 C400,44 500,0 600,22 C700,44 800,0 900,22 C1000,44 1100,0 1200,22 V44 H0Z"
              fill={color}
            />
          </svg>

          <div
            className="absolute inset-x-0 bottom-0 top-10"
            style={{ background: color }}
          />

          <div className="liquid-content absolute inset-x-0 top-11 bottom-0 flex flex-col items-center justify-center gap-2">
            <p className="liquid-title text-center text-[15px] font-normal text-black">
              {title}
            </p>

            <div className="liquid-tags flex gap-3">
              {tags.map((t, ti) => (
                <span
                  key={ti}
                  className="text-[10px] font-normal uppercase tracking-[0.08em] text-black border-b-2 border-black/40 pb-[2px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}