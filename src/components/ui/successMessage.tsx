import React, { useState, useEffect } from 'react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="success-message" 
      style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 9999, 
      }} 
    >
      {show && <p>{message}</p>} 
    </div>
  );
};

export default SuccessMessage;