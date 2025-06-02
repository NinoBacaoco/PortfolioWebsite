import { useEffect, forwardRef } from "react";
import "../styles/About.css";

const About = forwardRef(({ isInView }, ref) => {
  // Initialize animations when component comes into view
  useEffect(() => {
    if (isInView && ref.current) {
      const titleElement = ref.current.querySelector(".section-title");
      const textElements = ref.current.querySelectorAll(
        ".about-text p, .about-text h3"
      );
      const skillCards = ref.current.querySelectorAll(".skill-card");

      // Reset and restart animations
      if (titleElement) {
        // Force reset of title animation
        titleElement.style.animation = "none";
        titleElement.style.opacity = "0";
        titleElement.style.transform = "translateY(20px)";
        void titleElement.offsetWidth; // Force reflow
        titleElement.style.animation = "fadeInUp 0.8s ease-out forwards";
        titleElement.style.opacity = "1";
        titleElement.style.transform = "translateY(0)";

        // Add and remove a class to force the underline animation to restart
        titleElement.classList.remove("animate-underline");
        void titleElement.offsetWidth; // Force reflow
        titleElement.classList.add("animate-underline");
      }

      // Animate text elements with staggered delay
      if (textElements.length) {
        textElements.forEach((element, index) => {
          // Remove animation class first
          element.classList.remove("animate");

          // Force reflow
          void element.offsetWidth;

          // Add animation class with staggered delay
          setTimeout(() => {
            element.classList.add("animate");
          }, 700 + index * 200);
        });
      }

      // Animate skill cards with staggered delay
      if (skillCards.length) {
        skillCards.forEach((card, index) => {
          // Remove animation class first
          card.classList.remove("animate");

          // Force reflow
          void card.offsetWidth;

          // Add animation class with staggered delay
          setTimeout(() => {
            card.classList.add("animate");
          }, 1200 + index * 100);
        });
      }
    }
  }, [isInView]);

  return (
    <section className="about-section" ref={ref} id="about">
      <div className="about-bg"></div>
      <div className="section-content">
        <div className="section-header">
          <div className="big-number">02</div>
          <h2 className="section-title">
            About <span className="highlight">Me</span>
          </h2>
        </div>

        <div className="about-content">
          <div className="about-text">
          {/* <p>
  Hello! I’m <span class="highlight-role">Niño Bacaoco</span>, a 
  <span class="highlight-role"> front-end developer</span> and 
  <span class="highlight-role"> UI/UX designer</span> focused on building 
  <span class="highlight-action"> clean</span>, 
  <span class="highlight-action"> user-centered</span>, and 
  <span class="highlight-action"> accessible</span> web interfaces.
</p>

<p>
  I turn <span class="highlight-impact">ideas into intuitive designs</span> through 
  <span class="highlight-action"> wireframing</span>, 
  <span class="highlight-action"> prototyping</span>, and 
  <span class="highlight-action"> usability testing</span>, helping brands deliver 
  <span class="highlight-impact"> high-quality</span>, 
  <span class="highlight-impact"> responsive</span> digital solutions that 
  <span class="highlight-impact"> work and convert</span>.
</p> */}
<p>Hi! I'm <strong>Niño Bacaoco</strong> — a <span class="role-emphasis">front-end developer</span> and <span class="role-emphasis">UI/UX designer</span> focused on creating <span class="keyword-emphasis">clean</span>, <span class="keyword-emphasis">responsive</span>, and <span class="keyword-emphasis">user-centered</span> digital experiences.</p>

<p>I specialize in transforming ideas into intuitive interfaces using <span class="keyword-emphasis">wireframing</span>, <span class="keyword-emphasis">prototyping</span>, and <span class="keyword-emphasis">usability testing</span>. My goal? To help build websites that don't just look good — they <span class="shine-emphasis">work</span> and <span class="shine-emphasis">convert</span>.</p>
            <h3>My Skills</h3>

            <div className="skills-container">
              <div className="skill-card">UI/UX Design</div>
              <div className="skill-card">Wireframing</div>
              <div className="skill-card">Prototyping</div>
              <div className="skill-card">Usability Testing</div>
              <div className="skill-card">React</div>
              <div className="skill-card">Typescript</div>
              <div className="skill-card">JavaScript</div>
              <div className="skill-card">HTML</div>
              <div className="skill-card">CSS/SASS</div>
              <div className="skill-card">Tailwind CSS</div>
              <div className="skill-card">Bootstrap</div>
              <div className="skill-card">Figma</div>
              <div className="skill-card">Responsive Design</div>
              <div className="skill-card">Accessibility</div>
              <div className="skill-card">Node.js</div>
              <div className="skill-card">PostgreSQL</div>
              <div className="skill-card">MySQL</div>
              <div className="skill-card">Canva</div>
              <div className="skill-card">Microsoft Office</div>
              <div className="skill-card">Illustrator</div>
              <div className="skill-card">60 wpm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
