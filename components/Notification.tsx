
import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-amber-400 flex items-center space-x-2">
        <span className="text-xl">✨</span>
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
