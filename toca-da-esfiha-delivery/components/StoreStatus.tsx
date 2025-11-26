import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { OPEN_HOUR, CLOSE_HOUR, CLOSE_MINUTE } from '../constants';

const StoreStatus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpenTime, setNextOpenTime] = useState('');

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const isAfterOpen = currentHour > OPEN_HOUR || (currentHour === OPEN_HOUR && currentMinute >= 0);
      const isBeforeClose = currentHour < CLOSE_HOUR || (currentHour === CLOSE_HOUR && currentMinute <= CLOSE_MINUTE);

      if (isAfterOpen && isBeforeClose) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setNextOpenTime(`${OPEN_HOUR}:00`);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  if (isOpen) {
    return (
      <div className="bg-brand-green text-white text-sm font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-md">
        <Clock size={16} />
        <span>Aberto agora! Faça seu pedido 😋</span>
      </div>
    );
  }

  return (
    <div className="bg-brand-800 text-white text-sm font-medium py-2 px-4 text-center flex items-center justify-center gap-2 shadow-md">
      <AlertCircle size={16} />
      <span>Fechado no momento. Abrimos às {nextOpenTime}</span>
    </div>
  );
};

export default StoreStatus;