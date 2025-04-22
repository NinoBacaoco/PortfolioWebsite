import { useEffect, forwardRef } from 'react';
import '../styles/Contact.css';

// SVG Icons as components
const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="social-svg">
    <path d="M12.345,6.236c-0.218-0.606-0.438-1.217-0.442-1.225c-0.105-0.235-0.348-0.383-0.604-0.357	c-0.162,0.013-3.995,0.343-6.451,2.318C3.564,8.158,1,15.092,1,21.087c0,0.106,0.027,0.209,0.08,0.301	c1.771,3.11,6.599,3.924,7.699,3.959c0.007,0.001,0.013,0.001,0.019,0.001c0.194,0,0.376-0.093,0.492-0.25l1.19-1.612	c-1.966-0.299-2.321-0.689-2.404-0.75c-0.444-0.327-0.772-0.785-0.374-1.363c0.306-0.449,0.948-0.597,1.44-0.344	C9.646,21.264,10.995,22.02,15,22c3.977-0.012,5.723-0.845,5.748-0.863c0.668-0.301,1.189-0.177,1.514,0.269	c0.387,0.607,0.111,1.018-0.331,1.344c-0.083,0.061-0.284,0.232-2.396,0.732l1.175,1.615c0.115,0.158,0.298,0.25,0.492,0.25	c0.007,0,0.013,0,0.019-0.001c1.101-0.035,5.929-0.849,7.699-3.959c0.053-0.092,0.08-0.195,0.08-0.301	c0-5.994-2.564-12.928-3.88-14.14c-2.424-1.948-6.257-2.278-6.419-2.292c-0.256-0.022-0.499,0.123-0.604,0.357	c-0.004,0.008-0.218,0.629-0.425,1.228C17.672,6.239,16.041,6,15,6S12.345,6.236,12.345,6.236z M11,19c-1.105,0-2-1.333-2-2.979	s0.895-2.979,2-2.979c1.109-0.165,1.976,1.333,2,2.979C13,17.667,12.105,19,11,19z M19,19c-1.105,0-2-1.342-2-2.997	s0.895-2.997,2-2.997s2,1.342,2,2.997S20.105,19,19,19z"></path>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="social-svg">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="social-svg">
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
  </svg>
);

const Contact = forwardRef(({ isInView }, ref) => {
  // Initialize animations when component comes into view
  useEffect(() => {
    if (isInView && ref.current) {
      const titleElement = ref.current.querySelector('.section-title');
      const contactInfo = ref.current.querySelector('.contact-info');
      const contactItems = ref.current.querySelectorAll('.contact-item');
      const socialLinks = ref.current.querySelectorAll('.social-icon');
      
      // Reset and restart animations
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

      // Animate contact info container
      if (contactInfo) {
        contactInfo.classList.remove('animate');
        void contactInfo.offsetWidth; // Force reflow
        setTimeout(() => {
          contactInfo.classList.add('animate');
        }, 700);
      }
      
      // Animate contact items with staggered delay
      if (contactItems.length) {
        contactItems.forEach((item, index) => {
          item.classList.remove('animate');
          void item.offsetWidth; // Force reflow
          setTimeout(() => {
            item.classList.add('animate');
          }, 900 + (index * 150));
        });
      }
      
      // Animate social icons with staggered delay
      if (socialLinks.length) {
        socialLinks.forEach((icon, index) => {
          icon.classList.remove('animate');
          void icon.offsetWidth; // Force reflow
          setTimeout(() => {
            icon.classList.add('animate');
          }, 1200 + (index * 100));
        });
      }
    }
  }, [isInView]);

  return (
    <section 
      className="contact-section" 
      ref={ref} 
      id="contact"
    >
      <div className="section-content">
        <div className="section-header">
          <div className="big-number">03</div>
          <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-header">
              <h3>Let's Connect</h3>
              <p>Feel free to reach out through any of these channels</p>
            </div>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <p>nino.bacaoco@gmail.com</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <p>+64 9955145147</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <p>Cebu City, Philippines</p>
              </div>
            </div>
            
            <div className="social-container">
              <h3>Follow Me</h3>
              <div className="social-grid">
                <a href="https://discord.com/users/748453728180371496" target="_blank" className="social-icon" title="Discord">
                  <DiscordIcon />
                </a>
                <a href="https://github.com/NinoBacaoco" target="_blank" className="social-icon" title="GitHub">
                  <GitHubIcon />
                </a>
                <a href="https://www.linkedin.com/in/ni%C3%B1o-bacaoco-28600a294/" target="_blank" className="social-icon" title="LinkedIn">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact; 