import { useState, useEffect } from "react";
import "../styles/DailyUIDesigns.css";
import ProjectImageFallback from "./ProjectImageFallback";

// Import design thumbnails for DailyUI challenges
// Replace these with actual design thumbnails
import dailyui1 from "../assets/images/1.png";  
import dailyui2 from "../assets/images/2.png";
import dailyui3 from "../assets/images/3.png";
import dailyui4 from "../assets/images/4.png";
import dailyui5 from "../assets/images/5.png";
import dailyui6 from "../assets/images/6.png";
import dailyui7 from "../assets/images/7.png";
import dailyui8 from "../assets/images/8.png";
import dailyui9 from "../assets/images/9.png";
import dailyui10 from "../assets/images/10.png";
import dailyui11 from "../assets/images/11.png";
import dailyui12 from "../assets/images/12.png";
import dailyui13 from "../assets/images/13.png";
import dailyui14 from "../assets/images/14.png";
import dailyui15 from "../assets/images/15.png";
import dailyui16 from "../assets/images/16.png";
import dailyui17 from "../assets/images/17.png";
import dailyui18 from "../assets/images/18.png";
import dailyui19 from "../assets/images/19.png";
import dailyui20 from "../assets/images/20.png";
import dailyui21 from "../assets/images/21.png";
import dailyui22 from "../assets/images/22.png";
import dailyui23 from "../assets/images/23.png";
import dailyui24 from "../assets/images/24.png";
import dailyui25 from "../assets/images/25.png";
import dailyui26 from "../assets/images/26.png";
import dailyui27 from "../assets/images/27.png";
import dailyui28 from "../assets/images/28.png";
import dailyui29 from "../assets/images/29.png";
import dailyui30 from "../assets/images/29.png";

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
      4: dailyui4,
      5: dailyui5,
      6: dailyui6,
      7: dailyui7,
      8: dailyui8,
      9: dailyui9,
      10: dailyui10,
      11: dailyui11,
      12: dailyui12,
      13: dailyui13,
      14: dailyui14,
      15: dailyui15,
      16: dailyui16,
      17: dailyui17,
      18: dailyui18,
      19: dailyui19,
      20: dailyui20,
      21: dailyui21,
      22: dailyui22,
      23: dailyui23,
      24: dailyui24,
      25: dailyui25,
      26: dailyui26,
      27: dailyui27,
      28: dailyui28,
      29: dailyui29,
      30: dailyui30,
    };
    
    return designImages[index] || dailyui1; // Fallback to first image
  };
  
  // Function to get unique links for each design
  const getDesignLinks = (day) => {
    // Object containing the unique links for each design
    const designLinks = {
      1: {
        figmaFile: "https://figma.fun/JGVBrf",
        figmaPrototype: "https://figma.fun/BsAfMR"
      },
      2: {
        figmaFile: "https://figma.fun/py1tVZ",
        figmaPrototype: "https://figma.fun/6pjiNB"
      },
      3: {
        figmaFile: "https://figma.fun/TINHMi",
        figmaPrototype: "https://figma.fun/5DCw42"
      },
      4: {
        figmaFile: "https://figma.fun/98KCHS",
        figmaPrototype: "https://figma.fun/JNNkMN"
      },
      5: {
        figmaFile: "https://figma.fun/0Cv8PZ",
        figmaPrototype: "https://figma.fun/aiyslM"
      },
      6: {
        figmaFile: "https://figma.fun/NSA2H8",
        figmaPrototype: "https://figma.fun/Cgu54U"
      },
      7: {
        figmaFile: "https://figma.fun/R5vYJc",
        figmaPrototype: "https://figma.fun/X9DK3y"
      },
      8: {
        figmaFile: "https://figma.fun/rbgmea",
        figmaPrototype: "https://figma.fun/xZD8tq"
      },
      9: {
        figmaFile: "https://figma.fun/LNsSu8",
        figmaPrototype: "https://figma.fun/A6oP0V"
      },
      10: {
        figmaFile: "https://figma.fun/Y0w6x7",
        figmaPrototype: "https://figma.fun/XeXWyd"
      },
      11: {
        figmaFile: "https://figma.fun/JC5Svg",
        figmaPrototype: "https://figma.fun/9cDqzK"
      },
      12: {
        figmaFile: "https://figma.fun/OwUrfW",
        figmaPrototype: "https://figma.fun/6Wu2yM"
      },
      13: {
        figmaFile: "https://figma.fun/LMKDwc",
        figmaPrototype: "https://figma.fun/8hmJMY"
      },
      14: {
        figmaFile: "https://figma.fun/4OGu6r",
        figmaPrototype: "https://figma.fun/IDNJLM"
      },
      15: {
        figmaFile: "https://figma.fun/BoI3HK",
        figmaPrototype: "https://figma.fun/C8Ah2V"
      },
      16: {
        figmaFile: "https://figma.fun/dDMM2K",
        figmaPrototype: "https://figma.fun/JbmOWh"
      },
      17: {
        figmaFile: "https://figma.fun/6ABQHs",
        figmaPrototype: "https://figma.fun/6Yr5bG"
      },
      18: {
        figmaFile: "https://figma.fun/tAPBeq",
        figmaPrototype: "https://figma.fun/GhyIWN"
      },
      19: {
        figmaFile: "https://figma.fun/8IwTeY",
        figmaPrototype: "https://figma.fun/SQlvBP"
      },
      20: {
        figmaFile: "https://figma.fun/hcEW1y",
        figmaPrototype: "https://figma.fun/AkRvvr"
      },
      21: {
        figmaFile: "https://figma.fun/10VfEU",
        figmaPrototype: "https://figma.fun/8FhiGf"
      },
      22: {
        figmaFile: "https://figma.fun/Mlr6W6",
        figmaPrototype: "https://figma.fun/Cjmek5"
      },
      23: {
        figmaFile: "https://figma.fun/Qjn1Yi",
        figmaPrototype: "https://figma.fun/v3jeFj"
      },
      24: {
        figmaFile: "https://figma.fun/P3FzOe",
        figmaPrototype: "https://figma.fun/Lt0Djx"
      },
      25: {
        figmaFile: "https://figma.fun/8vGgw4",
        figmaPrototype: "https://figma.fun/pyMyfo"
      },
      26: {
        figmaFile: "https://figma.fun/0WWr4n",
        figmaPrototype: "https://figma.fun/SdyZn6"
      },
      27: {
        figmaFile: "https://figma.fun/G9fdO5",
        figmaPrototype: "https://figma.fun/Fb3CAT"
      },
      28: {
        figmaFile: "https://figma.fun/41ZCSR",
        figmaPrototype: "https://figma.fun/RJ1N6w"
      },
      29: {
        figmaFile: "https://figma.fun/96jL3V",
        figmaPrototype: "https://figma.fun/qxlTYn"
      },
      30: {
        figmaFile: "https://figma.fun/Y0w6x7",
        figmaPrototype: "https://figma.fun/XeXWyd"
      },
    };
    
    // Return the specific links or fallback to generic ones if not defined
    return designLinks[day] || {
      figmaFile: `https://figma.com/file/design-${day}`,
      figmaPrototype: `https://figma.com/proto/proto-${day}`
    };
  };
  
  // Create an array of 30 design objects with customizable link texts
  const designs = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const designLinks = getDesignLinks(day);
    
    return {
      id: day,
      title: getDescriptionForDay(day).split(' - ')[0], // Get just the title part
      description: getDescriptionForDay(day).split(' - ')[1] || '', // Get the description part
      // Use unique links for each design
      figmaFileLink: designLinks.figmaFile,
      figmaPrototypeLink: designLinks.figmaPrototype,
      // Image for the design
      image: getDesignImage(day)
    };
  });
  
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
        <h1>DailyUI Challenge Designs</h1>
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
                  rel="noopener noreferrer"
                >
                  View File
                </a>
                <a
                  href={design.figmaPrototypeLink}
                  className="btn-link"
                  target="_blank"
                  rel="noopener noreferrer"
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
    1: "Sign Up Page - lorem ipsum",
    2: "Credit Card Checkout - lorem ipsum",
    3: "Landing Page - lorem ipsum",
    4: "Calculator - lorem ipsum",
    5: "App Icon - lorem ipsum",
    6: "User Profile - lorem ipsum",
    7: "Settings - lorem ipsum",
    8: "404 Page - lorem ipsum",
    9: "Music Player - lorem ipsum",
    10: "Social Share - lorem ipsum",
    11: "Flash Message - lorem ipsum",
    12: "E-Commerce Shop - lorem ipsum",
    13: "Direct Messaging - lorem ipsum",
    14: "Countdown Timer - lorem ipsum",
    15: "On/Off Switch - lorem ipsum",
    16: "Pop-Up Overlay - lorem ipsum",
    17: "Purchase Receipt - lorem ipsum",
    18: "Analytics Chart - lorem ipsum",
    19: "Leaderboard - lorem ipsum",
    20: "Location Tracker - lorem ipsum",
    21: "Home Monitoring Dashboard - lorem ipsum",
    22: "Search Interface - lorem ipsum",
    23: "Onboarding Experience - lorem ipsum",
    24: "Boarding Pass - lorem ipsum",
    25: "TV App Interface - lorem ipsum",
    26: "Subscribe Form - lorem ipsum",
    27: "Dropdown Menu - lorem ipsum",
    28: "Contact Form - lorem ipsum",
    29: "Map Design - lorem ipsum",
    30: "Pricing - lorem ipsum"
  };
  
  return descriptions[day] || "UI Design - A creative UI design solution for a daily challenge.";
}

export default DailyUIDesigns;