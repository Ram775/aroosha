// src/components/ui/AnimatedCursor.jsx
import { useEffect, useState } from "react";

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Mouse move
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Click
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hover on buttons/links
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* ✅ Main Cursor Dot */}
      <div
        className={`
          pointer-events-none fixed z-[9999] 
          rounded-full bg-orange-500 
          transition-transform duration-75 ease-out
          ${isClicking ? "scale-75" : isHovering ? "scale-150" : "scale-100"}
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "12px",
          height: "12px",
          transform: `translate(-50%, -50%)`,
        }}
      />

      {/* ✅ Outer Ring — Cursor ke saath move karega */}
      <div
        className={`
          pointer-events-none fixed z-[9998] 
          rounded-full border-2 border-orange-500/60
          transition-all duration-300 ease-out
          ${isClicking ? "scale-90" : isHovering ? "scale-125" : "scale-100"}
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? "60px" : "40px",
          height: isHovering ? "60px" : "40px",
          transform: `translate(-50%, -50%)`,
          opacity: isHovering ? 0.9 : 0.5,
        }}
      />

      {/* ✅ Glow Effect — Cursor ke aage peeche */}
      <div
        className="
          pointer-events-none fixed z-[9997] 
          rounded-full 
          bg-orange-500/20 blur-2xl
          transition-all duration-500 ease-out
        "
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "80px",
          height: "80px",
          transform: `translate(-50%, -50%)`,
        }}
      />
    </>
  );
}