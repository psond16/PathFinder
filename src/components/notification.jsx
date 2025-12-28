
import { useEffect } from "react";

export default function Notification({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in">
      {message}
    </div>
  );
}
