import { useEffect, forwardRef } from 'react';
import '../styles/Home.css';

const Home = forwardRef(({ isInView }, ref) => {
  // Initialize animations when component comes into view
  useEffect(() => {
    if (isInView && ref.current) {
      const nameElement = ref.current.querySelector('.name');
      const underlineElement = ref.current.querySelector('.glowing-underline');
      const titleElement = ref.current.querySelector('.title');
      const roleElement = ref.current.querySelector('.role');
      const headerYearElement = ref.current.querySelector('.header-year');
      const resumeContainerElement = ref.current.querySelector('.resume-container');
      
      // Reset all animations first
      [headerYearElement, titleElement, roleElement, nameElement, underlineElement, resumeContainerElement].forEach(el => {
        if (el) {
          el.style.animation = 'none';
          el.style.opacity = '0';
          if (el !== underlineElement) {
            el.style.transform = 'translateY(20px)';
          } else {
            el.style.width = '0';
          }
          void el.offsetWidth; // Force reflow
        }
      });
      
      // Apply animations with consistent timing pattern
      if (headerYearElement) {
        headerYearElement.style.animation = 'fadeInUp 0.6s ease-out forwards';
        headerYearElement.style.opacity = '1';
        headerYearElement.style.transform = 'translateY(0)';
      }
      
      setTimeout(() => {
        if (titleElement) {
          titleElement.style.animation = 'fadeInUp 0.7s ease-out forwards';
          titleElement.style.opacity = '1';
          titleElement.style.transform = 'translateY(0)';
        }
      }, 150);
      
      setTimeout(() => {
        if (nameElement) {
          nameElement.style.animation = 'fadeInUp 0.7s ease-out forwards';
          nameElement.style.opacity = '1';
          nameElement.style.transform = 'translateY(0)';
        }
      }, 300);
      
      setTimeout(() => {
        if (underlineElement) {
          underlineElement.style.animation = 'expandWidthName 0.6s ease-out forwards';
        }
      }, 500);
      
      setTimeout(() => {
        if (roleElement) {
          roleElement.style.animation = 'fadeInUp 0.7s ease-out forwards';
          roleElement.style.opacity = '1';
          roleElement.style.transform = 'translateY(0)';
        }
      }, 650);
      
      setTimeout(() => {
        if (resumeContainerElement) {
          resumeContainerElement.style.animation = 'fadeInUp 0.7s ease-out forwards';
          resumeContainerElement.style.opacity = '1';
          resumeContainerElement.style.transform = 'translateY(0)';
        }
      }, 800);
    }
  }, [isInView]);

  return (
    <section 
      className="home-section" 
      ref={ref} 
      id="home"
    >
      <div className="home-bg"></div>
      <div className="section-content home-container">
        <div className="main-content">
          <div className="header-year">2025</div>
          <h2 className="title">PORTFOLIO</h2>
          
          <div className="role">
            <span>UI/UX DESIGN</span>
            <span className="separator">•</span>
            <span>FRONTEND DEVELOPER</span>
          </div>
          
          <div className="name-block">
            <div className="name-wrapper">
              <h1 className="name" data-text="JOHN DOE">Niño Bacaoco</h1>
              <div className="glowing-underline"></div>
            </div>
          </div>
          
          <div className="resume-container">
            <a href="https://drive.google.com/file/d/1bHMeYmKxJsTsp-_iGhvpLqN_OW6wRL9y/view?usp=sharing" className="resume-btn" target="_blank" rel="noopener noreferrer">VIEW RESUME</a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Home; 