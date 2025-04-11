import { useEffect, forwardRef, useState } from "react";
import "../styles/Projects.css";
import ProjectImageFallback from "./ProjectImageFallback";

// Import the real project images
import dailyuithumbnail from "../assets/projects/dailyuithumbnail.png";
import thumbnail from "../assets/projects/thumbnail.png";
import spotselectLogin from "../assets/projects/spotselectLogin.png";
import illustrationWorkAtSymph from "../assets/projects/illustrationWorkAtSymph.png";
import appGenSpaceDashboard from "../assets/projects/appGenSpaceDashboard.png";

const Projects = forwardRef(({ isInView }, ref) => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (cardId) => {
    setExpandedCards((prev) => {
      const isExpanding = !prev[cardId]; // Check if we're expanding or collapsing
      const newState = {
        ...prev,
        [cardId]: isExpanding,
      };

      // Different scroll behavior based on whether expanding or collapsing
      setTimeout(() => {
        const cardElement = document.getElementById(`project-${cardId}`);
        if (cardElement) {
          if (isExpanding) {
            // When expanding, scroll to the h3 heading
            const headingElement = cardElement.querySelector('h3');
            if (headingElement) {
              headingElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            } else {
              // Fallback to card
              cardElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          } else {
            // When collapsing, scroll to the project image
            const imageElement = cardElement.querySelector('.project-image');
            if (imageElement) {
              imageElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            } else {
              // Fallback to card
              cardElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        }
      }, 150); // Small delay to ensure the DOM has updated

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
            <div className="project-card" id="project-academic-1">
              <div className="project-image">
                <img src={thumbnail} alt="Portfolio Website" />
              </div>
              <div
                className={`project-content ${
                  expandedCards["academic-1"] ? "expanded" : ""
                }`}
              >
                <h3>
                  PORTFOREADY
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
                    <span>Figma</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://figma.fun/ElO8Es"
                      className="btn-link"
                      target="_blank"
                    >
                      View File
                    </a>
                    <a
                      href="https://figma.fun/RR5aaX"
                      className="btn-link"
                      target="_blank"
                    >
                      View Prototype
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
                    <span>JavaScript</span>
                    <span>Thymeleaf</span>
                    <span>HTML/CSS</span>
                    <span>TailwindCSS</span>
                    <span>Bootstrap</span>
                    <span>Figma</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://figma.fun/Vv556d"
                      className="btn-link"
                      target="_blank"
                    >
                      View File
                    </a>
                    <a
                      href="https://figma.fun/WFZFNT"
                      className="btn-link"
                      target="_blank"
                    >
                      View Prototype
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

        {/* Internship Projects */}
        <div className="projects-category">
          <h3 className="category-title">
            Internship Projects<span className="company-name">@Symph Inc.</span>
          </h3>
          <div className="projects-grid">
            <div className="project-card" id="project-internship-1">
              <div className="project-image">
                <img
                  src={dailyuithumbnail}
                  alt="DailyUI Challenges Thumbnail"
                />
              </div>
              <div
                className={`project-content ${
                  expandedCards["internship-1"] ? "expanded" : ""
                }`}
              >
                <h3>
                  DailyUI Challenges{" "}
                  <span className="subheading">3-Week Design Bootcamp</span>
                </h3>
                <div className="project-summary">
                  <div className="project-role">
                    <span className="role-label">Role:</span>
                    <span className="role-value">UI/UX Designer</span>
                  </div>
                  <div className="project-objective">
                    <span className="objective-label">Objective:</span>
                    <p className="objective-value">
                      In this 3-week bootcamp, I re/designed mobile and web
                      interfaces in Figma, focusing on creating interactive
                      prototypes and applying UI/UX design principles.{" "}
                    </p>
                  </div>
                  <div className="project-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      <li>
                        Designed and created web and mobile interfaces in Figma.
                      </li>
                      <li>
                        Developed interactive prototypes to demonstrate user
                        flows and interactions.
                      </li>
                      <li>
                        Focused on enhancing design usability and creating
                        intuitive user experiences.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="project-sections">
                  <div className="project-tech">
                    <span>Figma</span>
                  </div>
                  <div className="project-links">
                    <a 
                      href="#dailyui" 
                      className="btn-link"
                      onClick={(e) => {
                        e.preventDefault();
                        history.pushState(null, null, '#dailyui');
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                      }}
                    >
                      View All Designs
                    </a>
                  </div>
                </div>
                <div className="see-more-container">
                  <button
                    className="see-more-btn"
                    onClick={() => toggleCard("internship-1")}
                  >
                    {expandedCards["internship-1"] ? "See Less" : "See More"}
                    <span className="icon">▼</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="project-card" id="project-internship-2">
              <div className="project-image">
                <img
                  src={illustrationWorkAtSymph}
                  alt="Illustration Work At Symph"
                />
              </div>
              <div
                className={`project-content ${
                  expandedCards["internship-2"] ? "expanded" : ""
                }`}
              >
                <h3>
                  Illustration Design
                  <span className="subheading">
                    Assisted in Creating Illustration Design
                  </span>
                </h3>
                <div className="project-summary">
                  <div className="project-role">
                    <span className="role-label">Role:</span>
                    <span className="role-value">Designer</span>
                  </div>
                  <div className="project-objective">
                    <span className="objective-label">Objective:</span>
                    <p className="objective-value">
                      I assisted in creating a landscape illustration for a
                      webpage interface, focusing on designing background and
                      environmental elements to enhance the user experience.
                    </p>
                  </div>
                  <div className="project-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      <li>
                        Designed a landscape-style illustration for the webpage
                        interface using Adobe Illustrator.
                      </li>
                      <li>
                        Created visual assets for mockups, ensuring seamless
                        integration with the design.
                      </li>
                      <li>
                        Maintained visual consistency and usability to enhance
                        the webpage's aesthetics.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="project-sections">
                  <div className="project-tech">
                    <span>Figma</span>
                    <span>Adobe Illustrator</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://figma.fun/lsR5Ej"
                      className="btn-link"
                      target="_blank"
                    >
                      View Illustration
                    </a>
                  </div>
                </div>
                <div className="see-more-container">
                  <button
                    className="see-more-btn"
                    onClick={() => toggleCard("internship-2")}
                  >
                    {expandedCards["internship-2"] ? "See Less" : "See More"}
                    <span className="icon">▼</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="project-card" id="project-internship-3">
              <div className="project-image">
                <img src={appGenSpaceDashboard} alt="Interface Redesign" />
              </div>
              <div
                className={`project-content ${
                  expandedCards["internship-3"] ? "expanded" : ""
                }`}
              >
                <h3>
                  AppGen Space Interface Redesign
                  <span className="subheading">
                    Dashboard Interface Redesign
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
                      Redesigned the AppGen Space interface, focusing on
                      lo-fi/hi-fi designs, prototyping, and improving the
                      dashboard.
                    </p>
                  </div>
                  <div className="project-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      <li>
                        Redesigned the AppGen Space interface with both lo-fi
                        and hi-fi mockups.
                      </li>
                      <li>
                        Created interactive prototypes to demonstrate the flow
                        and user interactions within the app.
                      </li>
                      <li>
                        Focused primarily on the dashboard interface, ensuring
                        it was intuitive and visually appealing.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="project-sections">
                  <div className="project-tech">
                    <span>Figma</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://figma.fun/3COMr2"
                      className="btn-link"
                      target="_blank"
                    >
                      View File
                    </a>
                    <a
                      href="https://figma.fun/0Gv7CP"
                      className="btn-link"
                      target="_blank"
                    >
                      View Prototype
                    </a>
                  </div>
                </div>
                <div className="see-more-container">
                  <button
                    className="see-more-btn"
                    onClick={() => toggleCard("internship-3")}
                  >
                    {expandedCards["internship-3"] ? "See Less" : "See More"}
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
