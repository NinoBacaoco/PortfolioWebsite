import React, { useEffect } from 'react';
import '../styles/Loader.css';

const Loader = () => {
  // Hide the footer when loader is displayed
  useEffect(() => {
    // Keep footer hidden when loader is active (already hidden by default in HTML)
    const footer = document.getElementById('site-footer');
    
    // Show footer again when component unmounts (loading completes)
    return () => {
      if (footer) {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          footer.style.display = 'block';
        }, 100);
      }
    };
  }, []);

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
