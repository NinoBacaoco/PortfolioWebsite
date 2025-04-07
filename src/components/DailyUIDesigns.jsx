import { useState, useEffect } from "react";
import "../styles/DailyUIDesigns.css";
import ProjectImageFallback from "./ProjectImageFallback";

// Import design thumbnails for DailyUI challenges
// Replace these with actual design thumbnails
import dailyui1 from "../assets/projects/dailyuithumbnail.png"; // Placeholder - update with actual design thumbnails
import dailyui2 from "../assets/projects/dailyuithumbnail.png"; // Placeholder 
import dailyui3 from "../assets/projects/dailyuithumbnail.png"; // Placeholder

// You can replace this with actual design thumbnails when available
const DailyUIDesigns = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Get the design images
  const getDesignImage = (index) => {
    // This is a placeholder - update with actual thumbnails
    const designImages = {
      1: dailyui1,
      2: dailyui2,
      3: dailyui3,
      // Add more as you have them
    };
    
    return designImages[index] || dailyui1; // Fallback to first image
  };
  
  // Create an array of 30 design objects with customizable link texts
  const designs = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: getDescriptionForDay(i + 1).split(' - ')[0], // Get just the title part
    description: getDescriptionForDay(i + 1).split(' - ')[1] || '', // Get the description part
    // You would replace these placeholder URLs with actual design URLs
    figmaFileLink: `https://figma.fun/design-${i + 1}`, // Update with actual Figma short links
    figmaPrototypeLink: `https://figma.fun/proto-${i + 1}`, // Update with actual Figma short links
    // Image for the design
    image: getDesignImage(i + 1)
  }));
  
  // Back button handler - returns to projects section
  const handleBackClick = () => {
    // Navigate to projects section
    window.location.hash = 'projects';
    
    // Force scroll to the projects section after a small delay to allow hash change to process
    setTimeout(() => {
      const projectsElement = document.getElementById('projects');
      if (projectsElement) {
        projectsElement.scrollIntoView({ behavior: 'auto' });
      }
    }, 50);
  };
  
  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);
    
    // Scroll to top of the page when component mounts
    window.scrollTo(0, 0);
    
    // Apply staggered animations to cards
    const cards = document.querySelectorAll('.design-card');
    
    if (cards.length) {
      cards.forEach((card, index) => {
        // First remove any existing animation classes
        card.classList.remove('animate', 'visible');
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        
        // Force reflow
        void card.offsetWidth;
        
        // Apply animation with staggered delay
        setTimeout(() => {
          card.classList.add('animate');
          card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 300 + index * 100); // Slightly faster delay than Projects for better UX
      });
    }
    
    // Clean up
    return () => {
      setIsVisible(false);
    };
  }, []);
  
  return (
    <section className={`daily-ui-section ${isVisible ? 'visible' : ''}`}>
      <div className="daily-ui-header">
        <button onClick={handleBackClick} className="back-button"  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>&lt;</span> Back to Projects

        </button>
        <h1>DailyUI Challenge Designs  </h1>
        <p className="designs-subtitle">A collection of 30 design challenges completed over 3 weeks</p>
      </div>
      
      <div className="designs-grid">
        {designs.map((design) => (
          <div 
            key={design.id} 
            className="design-card" 
            id={`design-${design.id}`}
          >
            <div className="design-image">
              {design.image ? (
                <img src={design.image} alt={design.title} />
              ) : (
                <ProjectImageFallback text={design.title} />
              )}
            </div>
            <div className="design-content">
              <h3>
                {design.title}
                {/* <span className="design-subheading">#{design.id}</span> */}
              </h3>
              <div className="project-summary">
                <p>{design.description}</p>
              </div>
              <div className="design-links">
                <a
                  href={design.figmaFileLink}
                  className="btn-link"
                  target="_blank"
                >
                  View File
                </a>
                <a
                  href={design.figmaPrototypeLink}
                  className="btn-link"
                  target="_blank"
                >
                  View Prototype
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Helper function to provide descriptions for each design day
function getDescriptionForDay(day) {
  const descriptions = {
    1: "Sign Up Form - A clean, user-friendly sign-up interface.",
    2: "Credit Card Checkout - Streamlined payment processing flow.",
    3: "Landing Page - Captivating first impression for a digital product.",
    4: "Calculator - A modern, functional calculator interface.",
    5: "App Icon - Distinctive, memorable icon design.",
    6: "User Profile - Intuitive profile view with key information.",
    7: "Settings Page - Well-organized settings with clear categories.",
    8: "404 Page - Creative error page that guides users back.",
    9: "Music Player - Sleek audio control interface.",
    10: "Social Share - Easy content sharing functionality.",
    11: "Flash Message - Subtle, informative notifications.",
    12: "E-Commerce Shop - Product browsing and selection interface.",
    13: "Direct Messaging - Private communication design.",
    14: "Countdown Timer - Engaging timer with visual feedback.",
    15: "On/Off Switch - Simple yet effective toggle control.",
    16: "Pop-Up Overlay - Non-intrusive modal design.",
    17: "Email Receipt - Clear transaction confirmation layout.",
    18: "Analytics Chart - Data visualization that tells a story.",
    19: "Leaderboard - Competition standings with clear hierarchy.",
    20: "Location Tracker - Map interface with position indicators.",
    21: "Home Monitoring Dashboard - IoT control center design.",
    22: "Search Interface - Efficient content discovery tool.",
    23: "Onboarding Experience - Smooth introduction to a new app.",
    24: "Boarding Pass - Digital ticket with essential travel info.",
    25: "TV App Interface - Remote-friendly navigation design.",
    26: "Subscribe Form - Engaging newsletter sign-up.",
    27: "Dropdown Menu - Organized option selection component.",
    28: "Contact Form - User-friendly communication channel.",
    29: "Pricing Table - Clear presentation of service tiers.",
    30: "Confirmation Dialog - Verification step before important actions."
  };
  
  return descriptions[day] || "UI Design - A creative UI design solution for a daily challenge.";
}

export default DailyUIDesigns;