import { useEffect, forwardRef, useState } from "react";
import "../styles/Projects.css";
import ProjectImageFallback from "./ProjectImageFallback";

// Import the real project images
import thumbnail from "../assets/projects/thumbnail.png";
import spotselectLogin from "../assets/projects/spotselectLogin.png";

const Projects = forwardRef(({ isInView }, ref) => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (cardId) => {
    setExpandedCards((prev) => {
      const newState = {
        ...prev,
        [cardId]: !prev[cardId],
      };

      // If we're expanding the card, scroll it into view
      if (newState[cardId]) {
        setTimeout(() => {
          const cardElement = document.getElementById(`project-${cardId}`);
          if (cardElement) {
            cardElement.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }, 100); // Small delay to ensure the content has expanded
      }

      return newState;
    });
  };

  // Initialize animations when component comes into view
  useEffect(() => {
    if (isInView && ref.current) {
      const titleElement = ref.current.querySelector(".section-title");
      const categoryTitles = ref.current.querySelectorAll(".category-title");
      const projectCards = ref.current.querySelectorAll(".project-card");

      // Reset and restart animations for section title
      if (titleElement) {
        // Force reset of title animation
        titleElement.style.animation = "none";
        titleElement.style.opacity = "0";
        titleElement.style.transform = "translateY(20px)";
        void titleElement.offsetWidth; // Force reflow
        titleElement.style.animation = "fadeInUp 0.8s ease-out forwards";

        // Add and remove a class to force the underline animation to restart
        titleElement.classList.remove("animate-underline");
        void titleElement.offsetWidth; // Force reflow
        titleElement.classList.add("animate-underline");
      }

      // Animate category titles (translation + underline, no fade)
      if (categoryTitles.length) {
        categoryTitles.forEach((title, index) => {
          // Remove animation classes
          title.classList.remove("animate");
          title.classList.remove("animate-underline");

          // Reset initial state
          title.style.opacity = "1"; // Ensure always visible

          // Force reflow
          void title.offsetWidth;

          // Animate the title first (translation)
          setTimeout(() => {
            title.classList.add("animate");

            // Then animate the underline after the title moves into place
            setTimeout(() => {
              title.classList.add("animate-underline");
            }, 300);
          }, 900 + index * 300);
        });
      }

      // Animate project cards with staggered delay
      if (projectCards.length) {
        projectCards.forEach((card, index) => {
          // Remove animation class first
          card.classList.remove("animate");
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";

          // Force reflow
          void card.offsetWidth;

          // Add animation class with staggered delay
          setTimeout(() => {
            card.classList.add("animate");
            card.style.transition =
              "opacity 0.6s ease-out, transform 0.6s ease-out";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 1500 + index * 150);
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
          <h2 className="section-title">
            My <span className="highlight">Projects</span>
          </h2>
        </div>

        {/* Academic Projects */}
        <div className="projects-category">
          <h3 className="category-title">Academic Projects</h3>
          <div className="projects-grid">
            <div className="project-card" id="project-academic-1" >
              <div className="project-image">
                <img src={thumbnail} alt="Portfolio Website" />
              </div>
              <div
                className={`project-content ${
                  expandedCards["academic-1"] ? "expanded" : ""
                }`}
              >
                <h3>
                  PORTFOREADY{" "}
                  <span className="subheading">
                    Student Portfolio & Job Matching Platform
                  </span>
                </h3>
                <div className="project-summary">
                  <div className="project-role">
                    <span className="role-label">Role:</span>
                    <span className="role-value">UI/UX Designer</span>
                  </div>
                  <div className="project-objective">
                    <span className="objective-label">Objective:</span>
                    <p className="objective-value">
                      Enhancing the job search experience for students through
                      an intuitive and user-friendly portfolio platform.
                    </p>
                  </div>
                  <div className="project-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      <li>
                        Designed wireframes and interactive prototypes to
                        optimize user experience.
                      </li>
                      <li>
                        Conducted user research to understand student needs and
                        pain points in job searching.
                      </li>
                      <li>
                        Conducted usability testing and iterated designs based
                        on feedback for improved user experience.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="project-sections">
                  <div className="project-tech">
                    <span>React</span>
                    <span>CSS</span>
                    <span>Vite</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn-link">
                      Live Demo
                    </a>
                    <a href="#" className="btn-link">
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="see-more-container">
                  <button
                    className="see-more-btn"
                    onClick={() => toggleCard("academic-1")}
                  >
                    {expandedCards["academic-1"] ? "See Less" : "See More"}
                    <span className="icon">▼</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="project-card" id="project-academic-2">
              <div className="project-image">
                <img src={spotselectLogin} alt="Portfolio Website" />
              </div>
              <div
                className={`project-content ${
                  expandedCards["academic-2"] ? "expanded" : ""
                }`}
              >
                <h3>
                  SPOTSELECT{" "}
                  <span className="subheading">
                    Incubatee Application Review and Selection Process
                  </span>
                </h3>
                <div className="project-summary">
                  <div className="project-role">
                    <span className="role-label">Role:</span>
                    <span className="role-value">UI/UX Designer</span>
                    <span className="role-value">Frontend Developer</span>
                  </div>
                  <div className="project-objective">
                    <span className="objective-label">Objective:</span>
                    <p className="objective-value">
                      Streamlining the evaluation and selection process for
                      startup incubation.
                    </p>
                  </div>
                  <div className="project-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      <li>Designed wireframes and prototypes.</li>
                      <li>
                        Developed frontend components using Thymeleaf, HTML5,
                        Tailwind CSS, Bootstrap and JavaScript.
                      </li>
                      <li>
                        Collaborated with the backend team for seamless data
                        integration.
                      </li>
                      <li>
                        Conducted usability testing; refined based on feedback.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="project-sections">
                  <div className="project-tech">
                    <span>React</span>
                    <span>CSS</span>
                    <span>Vite</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn-link">
                      Live Demo
                    </a>
                    <a href="#" className="btn-link">
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="see-more-container">
                  <button
                    className="see-more-btn"
                    onClick={() => toggleCard("academic-2")}
                  >
                    {expandedCards["academic-2"] ? "See Less" : "See More"}
                    <span className="icon">▼</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Projects */}
        <div className="projects-category">
          <h3 className="category-title">Personal Projects</h3>
          <div className="projects-grid">
            <div className="project-card" id="project-personal-1">
              <div className="project-image">
                <img src={thumbnail} alt="Portfolio Website" />
              </div>
              <div
                className={`project-content ${
                  expandedCards["personal-1"] ? "expanded" : ""
                }`}
              >
                <h3>
                  PORTFOLIO WEBSITE{" "}
                  <span className="subheading">
                    Personal Developer Portfolio
                  </span>
                </h3>
                <div className="project-summary">
                  <div className="project-role">
                    <span className="role-label">Role:</span>
                    <span className="role-value">Frontend Developer</span>
                  </div>
                  <div className="project-objective">
                    <span className="objective-label">Objective:</span>
                    <p className="objective-value">
                      Creating an interactive portfolio to showcase my skills
                      and projects.
                    </p>
                  </div>
                  <div className="project-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      <li>
                        Designed and implemented responsive UI using React and
                        CSS animations.
                      </li>
                      <li>
                        Created interactive elements and smooth transitions for
                        enhanced user experience.
                      </li>
                      <li>Optimized performance and accessibility.</li>
                    </ul>
                  </div>
                </div>
                <div className="project-sections">
                  <div className="project-tech">
                    <span>React</span>
                    <span>CSS</span>
                    <span>Vite</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn-link">
                      Live Demo
                    </a>
                    <a href="#" className="btn-link">
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="see-more-container">
                  <button
                    className="see-more-btn"
                    onClick={() => toggleCard("personal-1")}
                  >
                    {expandedCards["personal-1"] ? "See Less" : "See More"}
                    <span className="icon">▼</span>
                  </button>
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
