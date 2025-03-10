import { useState, useEffect, useRef } from 'react';
import '../styles/Firefly.css';

const Firefly = ({ count = 15 }) => {
  const containerRef = useRef(null);
  const [fireflies, setFireflies] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFirefly, setDraggedFirefly] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Initialize fireflies
  useEffect(() => {
    // Use viewport dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    setViewportSize({ width, height });
    
    // Create initial fireflies with better positioning
    const initialFireflies = Array.from({ length: count }, (_, i) => {
      // Adjust size for mobile
      const sizeFactor = isMobile ? 0.8 : 1;
      const size = (Math.random() * 5 + 5) * sizeFactor;
      
      // Create fireflies with better distribution
      return {
        id: i,
        // Distribute evenly across the full viewport 
        x: Math.random() * (width - size),
        y: Math.random() * (height - size),
        size: size,
        opacity: Math.random() * 0.5 + 0.3,
        hovered: false,
        pulse: Math.random() * 2 + 1,
        direction: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      };
    });
    
    setFireflies(initialFireflies);
    
    // Animation loop for subtle movement
    let animationFrameId;
    let lastTime = 0;
    
    const animate = (currentTime) => {
      if (lastTime === 0) {
        lastTime = currentTime;
      }
      
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime > 30) { // Limit updates for performance
        lastTime = currentTime;
        
        setFireflies(prev => prev.map(firefly => {
          // Don't animate fireflies that are being dragged or hovered
          if (firefly.id === draggedFirefly?.id || firefly.hovered) return firefly;
          
          // Update position with gentle floating movement
          let newX = firefly.x + firefly.direction.x * firefly.pulse;
          let newY = firefly.y + firefly.direction.y * firefly.pulse;
          
          // Bounce off viewport edges
          if (newX < 0 || newX > viewportSize.width - firefly.size) {
            firefly.direction.x *= -1;
            newX = firefly.x + firefly.direction.x;
          }
          
          if (newY < 0 || newY > viewportSize.height - firefly.size) {
            firefly.direction.y *= -1;
            newY = firefly.y + firefly.direction.y;
          }
          
          // Occasionally change direction slightly
          if (Math.random() < 0.01) {
            firefly.direction.x += (Math.random() - 0.5) * 0.1;
            firefly.direction.y += (Math.random() - 0.5) * 0.1;
            
            // Normalize to avoid getting too fast
            const magnitude = Math.sqrt(
              firefly.direction.x * firefly.direction.x + 
              firefly.direction.y * firefly.direction.y
            );
            
            if (magnitude > 0.6) {
              firefly.direction.x = (firefly.direction.x / magnitude) * 0.6;
              firefly.direction.y = (firefly.direction.y / magnitude) * 0.6;
            }
          }
          
          return {
            ...firefly,
            x: newX,
            y: newY
          };
        }));
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Clean up animation
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, isMobile]);

  // Enhanced resize handler to handle zooming and mobile screens
  useEffect(() => {
    const handleResize = () => {
      // Update viewport size and mobile state
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newIsMobile = width <= 768;
      
      // Update state 
      setViewportSize({ width, height });
      setIsMobile(newIsMobile);
      
      // Reposition fireflies to ensure they stay within the viewport
      setFireflies(prev => {
        // On major size changes (like orientation), reposition more randomly
        if (Math.abs(width - viewportSize.width) > 100 || Math.abs(height - viewportSize.height) > 100) {
          return prev.map(firefly => {
            // For significant changes, redistribute more randomly
            return {
              ...firefly,
              x: Math.random() * (width - firefly.size),
              y: Math.random() * (height - firefly.size)
            };
          });
        }
        
        // For minor changes, maintain relative positions
        return prev.map(firefly => {
          // Calculate position as a percentage of the viewport
          const percentX = firefly.x / (viewportSize.width || 1);
          const percentY = firefly.y / (viewportSize.height || 1);
          
          // Apply percentage to the new viewport size
          return {
            ...firefly,
            x: Math.min(percentX * width, width - firefly.size),
            y: Math.min(percentY * height, height - firefly.size)
          };
        });
      });
    };

    // Handle events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [viewportSize, isMobile]);

  // Handle mouse down for dragging
  const handleMouseDown = (e, id) => {
    e.preventDefault();
    const firefly = fireflies.find(f => f.id === id);
    if (!firefly) return;
    
    // Calculate offset between mouse position and firefly position
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    // Store the offset and set dragging state
    setDragOffset({ x: offsetX, y: offsetY });
    setDraggedFirefly(firefly);
    setIsDragging(true);
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging || !draggedFirefly) return;
    
    // Calculate new position 
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    // Ensure it stays within bounds
    const boundedX = Math.max(0, Math.min(viewportSize.width - draggedFirefly.size, x));
    const boundedY = Math.max(0, Math.min(viewportSize.height - draggedFirefly.size, y));
    
    setFireflies(prev => prev.map(firefly => 
      firefly.id === draggedFirefly.id 
        ? { ...firefly, x: boundedX, y: boundedY }
        : firefly
    ));
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedFirefly(null);
  };

  // Handle hover effects
  const handleMouseEnter = (id) => {
    setFireflies(prev => prev.map(firefly => 
      firefly.id === id 
        ? { ...firefly, hovered: true }
        : firefly
    ));
  };

  const handleMouseLeave = (id) => {
    setFireflies(prev => prev.map(firefly => 
      firefly.id === id 
        ? { ...firefly, hovered: false }
        : firefly
    ));
  };

  // Add global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="firefly-container" ref={containerRef}>
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className={`firefly ${firefly.hovered ? 'hovered' : ''} ${firefly.id === draggedFirefly?.id ? 'dragging' : ''}`}
          style={{
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            left: `${firefly.x}px`,
            top: `${firefly.y}px`,
            opacity: firefly.opacity,
            '--pulse-duration': `${firefly.pulse}s`,
          }}
          onMouseDown={(e) => handleMouseDown(e, firefly.id)}
          onMouseEnter={() => handleMouseEnter(firefly.id)}
          onMouseLeave={() => handleMouseLeave(firefly.id)}
        >
          <div className="glow"></div>
        </div>
      ))}
    </div>
  );
};

export default Firefly; 