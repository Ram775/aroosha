import { useState, useEffect, useCallback, useRef } from "react";
import { getTimeLeft } from "../api/sessionApi";

export default function useSessionTimer({
  onExpire,
  onWarning,
  warningSeconds = 120,
} = {}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isWarning, setIsWarning] = useState(false);

  const onExpireRef = useRef(onExpire);
  const onWarningRef = useRef(onWarning);
  const hasWarnedRef = useRef(false); // ✅ side-effect ko updater se bahar track karne ke liye

  useEffect(() => {
    onExpireRef.current = onExpire;
    onWarningRef.current = onWarning;
  }, [onExpire, onWarning]);

  const calculateTimeLeft = useCallback(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return null;
    return getTimeLeft(token);
  }, []);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();

      if (remaining === null || remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        if (onExpireRef.current) onExpireRef.current();
        return;
      }

      setTimeLeft(remaining);

      // ✅ side-effect ab yahan, interval callback ke andar — setState updater ke bahar
      if (remaining <= warningSeconds && !hasWarnedRef.current) {
        hasWarnedRef.current = true;
        setIsWarning(true);
        if (onWarningRef.current) onWarningRef.current();
      } else if (remaining > warningSeconds && hasWarnedRef.current) {
        hasWarnedRef.current = false;
        setIsWarning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft, warningSeconds]);

  const resetTimer = useCallback(() => {
    hasWarnedRef.current = false; // ✅ reset pe flag bhi clear karein
    setIsWarning(false);
    setTimeLeft(calculateTimeLeft());
  }, [calculateTimeLeft]);

  return { timeLeft, isWarning, resetTimer };
}