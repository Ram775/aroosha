import React, { useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import useSessionTimer from "../../../hooks/useSessionTimer";
import { formatTime } from "../../../api/sessionApi";

export default function SessionTimer({ onWarning, onExpire, resetKey, logout }) {
  const handleExpire = () => {
    if (logout) logout();
    if (onExpire) onExpire();
  };

  const handleWarning = () => {
    if (onWarning) onWarning();
  };

  const { timeLeft, isWarning, resetTimer } = useSessionTimer({
    onExpire: handleExpire,
    onWarning: handleWarning,
warningSeconds: 120, 
  });

  useEffect(() => {
    if (resetKey !== undefined && resetKey > 0) {
      resetTimer();
    }
  }, [resetKey, resetTimer]);

  if (timeLeft === null) return null;

  return (
    <div
      className={`
        hidden sm:flex items-center gap-2 
        px-3 py-1.5 rounded-full 
        text-xs font-medium 
        transition-all duration-300
        ${
          isWarning
            ? "bg-red-500/10 text-red-500 border border-red-500/30 animate-pulse"
            : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
        }
      `}
      title={`Session expires in ${formatTime(timeLeft)}`}
    >
      {isWarning ? <AlertTriangle size={14} /> : <Clock size={14} />}
      <span className="font-mono">{formatTime(timeLeft)}</span>
    </div>
  );
}