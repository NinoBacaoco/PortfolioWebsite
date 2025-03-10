import { useEffect, forwardRef } from 'react';
import '../styles/Projects.css';
import ProjectImageFallback from './ProjectImageFallback';

// Import the real project images
import thumbnail from '../assets/projects/thumbnail.png';
import spotselectLogin from '../assets/projects/spotselectLogin.png';

const Projects = forwardRef(({ isInView }, ref) => {
  // Initialize animations when component comes into view
  useEffect(() => {
    if (isInView && ref.current) {
      const titleElement = ref.current.querySelector('.section-title');
      const categoryTitles = ref.current.querySelectorAll('.category-title');
      const projectCards = ref.current.querySelectorAll('.project-card');
      
      // Reset and restart animations for section title
      if (titleElement) {
        // Force reset of title animation
        titleElement.style.animation = 'none';
        titleElement.style.opacity = '0';
        titleElement.style.transform = 'translateY(20px)';
        void titleElement.offsetWidth; // Force reflow
        titleElement.style.animation = 'fadeInUp 0.8s ease-out forwards';
        
        // Add and remove a class to force the underline animation to restart
        titleElement.classList.remove('animate-underline');
        void titleElement.offsetWidth; // Force reflow
        titleElement.classList.add('animate-underline');
      }
      
      // Animate category titles (translation + underline, no fade)
      if (categoryTitles.length) {
        categoryTitles.forEach((title, index) => {
          // Remove animation classes
          title.classList.remove('animate');
          title.classList.remove('animate-underline');
          
          // Reset initial state
          title.style.opacity = '1'; // Ensure always visible
          
          // Force reflow
          void title.offsetWidth;
          
          // Animate the title first (translation)
          setTimeout(() => {
            title.classList.add('animate');
            
            // Then animate the underline after the title moves into place
            setTimeout(() => {
              title.classList.add('animate-underline');
            }, 300);
          }, 900 + (index * 300));
        });
      }
      
      // Animate project cards with staggered delay
      if (projectCards.length) {
        projectCards.forEach((card, index) => {
          // Remove animation class first
          card.classList.remove('animate');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          // Force reflow
          void card.offsetWidth;
          
          // Add animation class with staggered delay
          setTimeout(() => {
            card.classList.add('animate');
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 1500 + (index * 150));
        });
      }
    }
  }, [isInView]);

  return (
    <section 
      className="projects-section parallax-section" 
      ref={ref} 
      id="projects"
    >
      <div className="parallax-bg projects-bg"></div>
      <div className="section-content">
        <div className="section-header">
          <div className="big-number">01</div>
          <h2 className="section-title">My <span className="highlight">Projects</span></h2>
        </div>
        
        {/* Academic Projects */}
        <div className="projects-category">
          <h3 className="category-title">Academic Projects</h3>
           <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <img src={thumbnail} alt="Portfolio Website" />
              </div>
              <div className="project-content">
                <h3>Portfolio Website</h3>
                <p>Modern responsive portfolio with React, featuring smooth animations and a dark theme.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>CSS</span>
                  <span>Vite</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn-link">Live Demo</a>
                  <a href="#" className="btn-link">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image">
                <img src={spotselectLogin} alt="Task Management App" />
              </div>
              <div className="project-content">
                <h3>Task Management App</h3>
                <p>Full-stack task manager with authentication, task categories, and collaborative features.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn-link">Live Demo</a>
                  <a href="#" className="btn-link">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              {/* For this card, we'll use the fallback since we only have 2 images */}
              <ProjectImageFallback 
                title="Weather Dashboard"
                color1="#fb5607"
                color2="#ffbe0b"
              />
              <div className="project-content">
                <h3>Weather Dashboard</h3>
                <p>Interactive weather app with real-time data, forecast visualization, and location search.</p>
                <div className="project-tech">
                  <span>JavaScript</span>
                  <span>OpenWeather API</span>
                  <span>Chart.js</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn-link">Live Demo</a>
                  <a href="#" className="btn-link">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Personal Projects */}
        <div className="projects-category">
          <h3 className="category-title">Personal Projects</h3>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <img src={thumbnail} alt="Portfolio Website" />
              </div>
              <div className="project-content">
                <h3>Portfolio Website</h3>
                <p>Modern responsive portfolio with React, featuring smooth animations and a dark theme.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>CSS</span>
                  <span>Vite</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn-link">Live Demo</a>
                  <a href="#" className="btn-link">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image">
                <img src={spotselectLogin} alt="Task Management App" />
              </div>
              <div className="project-content">
                <h3>Task Management App</h3>
                <p>Full-stack task manager with authentication, task categories, and collaborative features.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn-link">Live Demo</a>
                  <a href="#" className="btn-link">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              {/* For this card, we'll use the fallback since we only have 2 images */}
              <ProjectImageFallback 
                title="Weather Dashboard"
                color1="#fb5607"
                color2="#ffbe0b"
              />
              <div className="project-content">
                <h3>Weather Dashboard</h3>
                <p>Interactive weather app with real-time data, forecast visualization, and location search.</p>
                <div className="project-tech">
                  <span>JavaScript</span>
                  <span>OpenWeather API</span>
                  <span>Chart.js</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn-link">Live Demo</a>
                  <a href="#" className="btn-link">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Projects; 