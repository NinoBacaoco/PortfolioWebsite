import { useEffect, useState } from 'react';
import '../styles/Navigation.css';

function Navigation({ activeSection, handleSectionChange }) {
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  
  // Threshold for when to start/complete transition
  const START_TRANSITION = 100;  // Start transition after this many pixels
  const END_TRANSITION = 400;    // Complete transition at this scroll position

  useEffect(() => {
    // Check if we're on tablet or mobile
    const checkTabletOrMobile = () => {
      setIsTabletOrMobile(window.innerWidth <= 992);
    };
    
    // Initial check
    checkTabletOrMobile();
    
    // Handle scroll events for smooth transition to sticky
    const handleScroll = () => {
      // Skip transition logic on tablet/mobile
      if (isTabletOrMobile) {
        return;
      }
      
      // Current scroll position
      const scrollY = window.scrollY;
      
      // Fully sticky when we reach END_TRANSITION
      if (scrollY >= END_TRANSITION) {
        setIsSticky(true);
        setScrollProgress(1); // 100% progress
      } 
      // Begin transition after START_TRANSITION
      else if (scrollY > START_TRANSITION) {
        setIsSticky(false);
        // Calculate transition progress (0 to 1)
        const progress = (scrollY - START_TRANSITION) / (END_TRANSITION - START_TRANSITION);
        setScrollProgress(Math.min(Math.max(progress, 0), 1)); // Clamp between 0 and 1
      } 
      // Not sticky at all when at the top
      else {
        setIsSticky(false);
        setScrollProgress(0); // 0% progress
      }
    };

    // Force navigation to be visible on component mount
    const forceNavVisibility = () => {
      const navElement = document.querySelector('.portfolio-nav');
      if (navElement) {
        // Set important styles directly
        navElement.style.setProperty('display', 'block', 'important');
        navElement.style.setProperty('opacity', '1', 'important');
        navElement.style.setProperty('visibility', 'visible', 'important');
      }
    };
    
    // Initial visibility force
    forceNavVisibility();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      checkTabletOrMobile();
      forceNavVisibility();
    });
    
    // Call handleScroll once to set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('resize', checkTabletOrMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTabletOrMobile]);

  // Calculate smooth transition styles
  const getNavStyle = () => {
    // Don't apply special positioning on tablet/mobile
    if (isTabletOrMobile) {
      return {};
    }
    
    // For desktop only
    if (isSticky) {
      // Fully sticky
      return {
        top: '15px', 
        transform: 'none'
      };
    } else if (scrollProgress > 0) {
      // During transition - calculate intermediate positions
      const topPercent = 50 - (scrollProgress * 35); // Move from 50% to 15px
      const translateY = -50 + (scrollProgress * 50); // From -50% to 0
      
      // If we're close to sticky, use px instead of % for smoother transition to final position
      if (scrollProgress > 0.9) {
        const finalTop = 15; // px
        const top = ((1 - (1 - scrollProgress) * 10) * finalTop) + 'px';
        
        return {
          top: top,
          transform: `translateY(${translateY}%)`,
          backgroundColor: `rgba(20, 20, 25, ${0.5 + (scrollProgress * 0.35)})`,
          borderColor: `rgba(157, 78, 221, ${0.2 + (scrollProgress * 0.1)})`
        };
      }
      
      return {
        top: `${topPercent}%`,
        transform: `translateY(${translateY}%)`,
        backgroundColor: `rgba(20, 20, 25, ${0.5 + (scrollProgress * 0.35)})`,
        borderColor: `rgba(157, 78, 221, ${0.2 + (scrollProgress * 0.1)})`
      };
    } else {
      // Default centered position
      return {};
    }
  };

  return (
    <nav 
      className={`portfolio-nav ${isSticky && !isTabletOrMobile ? 'sticky' : ''}`} 
      style={getNavStyle()}
      aria-label="Portfolio sections"
    >
      <div className="portfolio-nav-title">#contents</div>
      <ul>
        <li className={activeSection === 'home' ? 'active' : ''}>
          <button onClick={() => handleSectionChange('home')} aria-label="Navigate to Home section">/home</button>
        </li>
        <li className={activeSection === 'projects' ? 'active' : ''}>
          <button onClick={() => handleSectionChange('projects')} aria-label="Navigate to Projects section">/projects</button>
        </li>
        <li className={activeSection === 'about' ? 'active' : ''}>
          <button onClick={() => handleSectionChange('about')} aria-label="Navigate to About section">/about</button>
        </li>
        <li className={activeSection === 'contact' ? 'active' : ''}>
          <button onClick={() => handleSectionChange('contact')} aria-label="Navigate to Contact section">/contact</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation; 