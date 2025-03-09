import { useState, useEffect, useRef } from 'react';
import '../styles/Firefly.css';

const Firefly = ({ count = 15 }) => {
  const containerRef = useRef(null);
  const [fireflies, setFireflies] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFirefly, setDraggedFirefly] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Initialize fireflies
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();
      
      // Create initial fireflies with better positioning
      const initialFireflies = Array.from({ length: count }, (_, i) => {
        const size = Math.random() * 5 + 5;
        return {
          id: i,
          // Make sure they start within bounds accounting for their size
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
            
            // Bounce off edges
            if (newX < 0 || newX > width - firefly.size) {
              firefly.direction.x *= -1;
              newX = firefly.x + firefly.direction.x;
            }
            
            if (newY < 0 || newY > height - firefly.size) {
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
    }
  }, [count]);

  // Handle window resize to keep fireflies inside container
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const { width, height } = container.getBoundingClientRect();
        
        setFireflies(prev => prev.map(firefly => ({
          ...firefly,
          x: Math.min(firefly.x, width - firefly.size),
          y: Math.min(firefly.y, height - firefly.size)
        })));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse handlers for dragging
  const handleMouseDown = (e, id) => {
    e.preventDefault();
    const firefly = fireflies.find(f => f.id === id);
    if (!firefly) return;
    
    // Calculate offset between mouse position and firefly position
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - firefly.x;
    const offsetY = e.clientY - rect.top - firefly.y;
    
    // Store the offset and set dragging state
    setDragOffset({ x: offsetX, y: offsetY });
    setDraggedFirefly(firefly);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !draggedFirefly || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Calculate new position by subtracting the initial offset
    // This ensures the firefly moves exactly with the mouse without jumping
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    // Ensure it stays within bounds
    const boundedX = Math.max(0, Math.min(rect.width - draggedFirefly.size, x));
    const boundedY = Math.max(0, Math.min(rect.height - draggedFirefly.size, y));
    
    setFireflies(prev => prev.map(firefly => 
      firefly.id === draggedFirefly.id 
        ? { ...firefly, x: boundedX, y: boundedY }
        : firefly
    ));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedFirefly(null);
  };

  // Handle mouse enter/leave for hover effect
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

  useEffect(() => {
    // Add global event listeners when dragging
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Separate useEffect for animation to prevent recreation when drag state changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
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
          
          // Bounce off edges
          if (newX < 0 || newX > width - firefly.size) {
            firefly.direction.x *= -1;
            newX = firefly.x + firefly.direction.x;
          }
          
          if (newY < 0 || newY > height - firefly.size) {
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
  }, [draggedFirefly]);

  return (
    <div 
      className="firefly-container" 
      ref={containerRef}
    >
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className={`firefly ${firefly.hovered ? 'hovered' : ''} ${draggedFirefly?.id === firefly.id ? 'dragging' : ''}`}
          style={{
            left: `${firefly.x}px`,
            top: `${firefly.y}px`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            opacity: firefly.opacity,
            animationDuration: `${firefly.pulse}s`
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