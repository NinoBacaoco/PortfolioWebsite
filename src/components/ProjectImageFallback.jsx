import React from 'react';

// Component to create fallback project images with gradients
const ProjectImageFallback = ({ 
  title = 'Project Image', 
  color1 = '#9d4edd', 
  color2 = '#ff9900',
  height = '200px'
}) => {
  const bgGradient = `linear-gradient(135deg, ${color1}, ${color2})`;
  
  // Create a pattern overlay similar to the JavaScript version
  const patternStyle = {
    backgroundImage: `
      radial-gradient(rgba(0, 0, 0, 0.1) 15%, transparent 16%), 
      radial-gradient(rgba(0, 0, 0, 0.1) 15%, transparent 16%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px'
  };
  
  return (
    <div 
      className="project-image-fallback" 
      style={{ 
        background: bgGradient,
        height: height,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }}
    >
      {/* Pattern overlay with zoom effect */}
      <div style={{
        ...patternStyle,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5,
        transition: 'transform 0.5s ease-out'
      }} className="pattern-overlay" />
      
      {/* Background with zoom effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: bgGradient,
        transform: 'scale(1)',
        transition: 'transform 0.5s ease-out',
        zIndex: 0
      }} className="bg-zoom" />
      
      {/* Text display */}
      <h3 style={{
        color: 'white',
        margin: 0,
        padding: '20px',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        zIndex: 2,
        transition: 'transform 0.3s ease'
      }}>
        {title}
      </h3>
      
      {/* Gradient overlay at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        background: 'linear-gradient(to top, rgba(30, 30, 30, 0.9), transparent)',
        zIndex: 1
      }} />
    </div>
  );
};

export default ProjectImageFallback; 