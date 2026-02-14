import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader${!visible ? ' hidden' : ''}`}>
      <div className="preloader-spinner"></div>
    </div>
  );
};

export default Preloader;
