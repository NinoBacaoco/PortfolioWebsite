import { useEffect, forwardRef } from "react";
import "../styles/Services.css";

const Services = forwardRef(({ isInView }, ref) => {
  useEffect(() => {
    if (isInView && ref.current) {
      const titleElement = ref.current.querySelector(".section-title");
      const serviceBlocks = ref.current.querySelectorAll(".service-card");

      if (titleElement) {
        titleElement.style.animation = "none";
        titleElement.style.opacity = "0";
        titleElement.style.transform = "translateY(20px)";
        void titleElement.offsetWidth;
        titleElement.style.animation = "fadeInUp 0.8s ease-out forwards";
        titleElement.style.opacity = "1";
        titleElement.style.transform = "translateY(0)";
        titleElement.classList.remove("animate-underline");
        void titleElement.offsetWidth;
        titleElement.classList.add("animate-underline");
      }

      if (serviceBlocks.length) {
        serviceBlocks.forEach((block, index) => {
          block.classList.remove("animate");
          void block.offsetWidth;
          setTimeout(() => {
            block.classList.add("animate");
          }, 500 + index * 150);
        });
      }
    }
  }, [isInView]);

  return (
    <section className="services-section " ref={ref} id="services">
      <div className="section-content">
        <div className="section-header">
          {/* <div className="big-number">03</div> */}
          <h2 className="section-title">
            What Can I
            <span className="highlight">
              <br></br> Do For You?
            </span>
          </h2>
        </div>

        {/* <p className="services-intro">
          All-Around Virtual Assistant | WordPress Web Design | Admin & Creative
          <br />
          <strong>$7.00/hr</strong>
          <br />
          <br />
          Need a tech-savvy VA who can jump between admin tasks, light design
          work, and website updates — without constant supervision? Want someone
          who’s quick to learn and easy to work with? ✅ That’s what I bring to
          the table.
        </p> */}

        <div className="services-grid">
          <div className="service-card">
            <h3 className="service-title">🤝 Virtual Assistant Support</h3>
            <ul className="service-description">
              <li>Data Entry and File Management</li>
              <li>Internet Research and Lead Sourcing</li>
              <li>Email and Calendar Management</li>
              <li>Google Docs, Sheets, Slides & MS Office Tasks</li>
              <li>Typing (60 WPM) and Light Copywriting</li>
              <li>Proofreading and Document Formatting</li>
            </ul>
          </div>

          <div className="service-card">
            <h3 className="service-title">🖥 WordPress Tasks</h3>
            <ul className="service-description">
              <li>Uploading and editing website content</li>
              <li>Page creation with Elementor or block editors</li>
              <li>HTML & CSS adjustments</li>
              <li>Blog formatting and post scheduling</li>
              <li>Plugin installs and basic config</li>
              <li>Consistent layout and cleanup</li>
            </ul>
          </div>

          <div className="service-card">
            <h3 className="service-title">🎞 Creative Support & Editing</h3>
            <ul className="service-description">
              <li>Basic video editing (CapCut, Canva)</li>
              <li>Captions and text overlays</li>
              <li>Content resizing for social media</li>
              <li>Visual support for blogs and pages</li>
            </ul>
          </div>

          <div className="service-card">
            <h3 className="service-title">📱 Social Media Management</h3>
            <ul className="service-description">
              <li>Content scheduling and captions</li>
              <li>Graphic design for posts/stories</li>
              <li>Page monitoring and engagement</li>
              <li>Short-form video editing (Reels, Shorts)</li>
            </ul>
          </div>

          <div className="service-card">
            <h3 className="service-title">📩 Email Marketing & Setup</h3>
            <ul className="service-description">
              <li>Sending newsletters and campaigns</li>
              <li>Forms and automation setup</li>
              <li>Landing page creation</li>
            </ul>
          </div>

          <div className="service-card">
            <h3 className="service-title">🗂️ Project & Team Support</h3>
            <ul className="service-description">
              <li>Task tracking and SOPs</li>
              <li>Notion, Trello, or GSuite dashboards</li>
            </ul>
          </div>

          <div className="service-card">
            <h3 className="service-title">🧠 Other Tasks</h3>
            <ul className="service-description">
              <li>YouTube channel support</li>
              <li>Client onboarding assistance</li>
              <li>Admin for coaches, creators & course sellers</li>
            </ul>
          </div>

          <div className="service-card">
            <h3 className="service-title">⚒️ Tools I Use</h3>
            <ul className="service-description">
              <li>Google Workspace, MS Office, Trello, Notion</li>
              <li>WordPress, Wix, Elementor, HTML & CSS, Figma</li>
              <li>Canva, CapCut, ChatGPT, Calendly, GDocs & Slides</li>
            </ul>
          </div>
        </div>

        {/* <div className="services-outro">
          <p>
            ✅ Let’s work together! I’m fast to adapt, follow instructions well,
            and keep communication clear and reliable.
          </p>
          <p>
            🟢 Think we’re a good fit? Drop me a message and let’s schedule a
            quick discovery call.
          </p>
        </div> */}
      </div>
    </section>
  );
});

export default Services;
