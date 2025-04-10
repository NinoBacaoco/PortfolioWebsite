import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="logo-loader">
        <img src="/ninoBacaocoLogo.svg" alt="Nino Bacaoco Logo" className="logo-animation" />
        <div className="logo-glow"></div>
      </div>
    </div>
  );
};

export default Loader;
