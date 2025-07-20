import { useEffect, forwardRef } from "react";
import "../styles/Home.css";
import profile from "../assets/projects/nino-profile.png";

const Home = forwardRef(({ isInView }, ref) => {
  useEffect(() => {
    if (isInView && ref.current) {
      const nameElement = ref.current.querySelector(".name");
      const underlineElement = ref.current.querySelector(".glowing-underline");
      const titleElement = ref.current.querySelector(".title");
      const roleElement = ref.current.querySelector(".role");
      const headerYearElement = ref.current.querySelector(".header-year");
      const resumeContainerElement =
        ref.current.querySelector(".resume-container");
      const profileImgElement = ref.current.querySelector(".profile-photo");
      const heroLeftElement = ref.current.querySelector(".hero-left");

      [
        heroLeftElement,
        headerYearElement,
        titleElement,
        roleElement,
        nameElement,
        underlineElement,
        resumeContainerElement,
        profileImgElement,
      ].forEach((el) => {
        if (el) {
          el.style.animation = "none";
          el.style.opacity = "0";
          if (el === profileImgElement) {
            el.style.transform = "scale(1.3) translateY(40px)";
          } else if (el === heroLeftElement) {
            el.style.transform = "translateX(-40px)";
          } else if (el !== underlineElement) {
            el.style.transform = "translateY(20px)";
          } else {
            el.style.width = "0";
          }
          void el.offsetWidth;
        }
      });

      setTimeout(() => {
        if (heroLeftElement) {
          heroLeftElement.style.animation =
            "fadeInUpFrame 1s ease-out forwards";
        }
      }, 100);

      setTimeout(() => {
        if (headerYearElement) {
          headerYearElement.style.animation = "fadeInUp 0.6s ease-out forwards";
          headerYearElement.style.opacity = "1";
          headerYearElement.style.transform = "translateY(0)";
        }
      }, 200);

      setTimeout(() => {
        if (titleElement) {
          titleElement.style.animation = "fadeInUp 0.7s ease-out forwards";
          titleElement.style.opacity = "1";
          titleElement.style.transform = "translateY(0)";
        }
      }, 350);

      setTimeout(() => {
        if (nameElement) {
          nameElement.style.animation = "fadeInUp 0.7s ease-out forwards";
          nameElement.style.opacity = "1";
          nameElement.style.transform = "translateY(0)";
        }
      }, 500);

      setTimeout(() => {
        if (underlineElement) {
          underlineElement.style.animation =
            "expandWidthName 0.6s ease-out forwards";
        }
      }, 650);

      setTimeout(() => {
        if (roleElement) {
          roleElement.style.animation = "fadeInUp 0.7s ease-out forwards";
          roleElement.style.opacity = "1";
          roleElement.style.transform = "translateY(0)";
        }
      }, 800);

      setTimeout(() => {
        if (resumeContainerElement) {
          resumeContainerElement.style.animation =
            "fadeInUp 0.7s ease-out forwards";
          resumeContainerElement.style.opacity = "1";
          resumeContainerElement.style.transform = "translateY(0)";
        }
      }, 950);

      setTimeout(() => {
        if (profileImgElement) {
          profileImgElement.style.animation =
            "fadeInUpImage 1s ease-out forwards";
        }
      }, 1100);
    }
  }, [isInView]);

  return (
    <section className="home-section" ref={ref} id="home">
      <div className="home-bg"></div>
      <div className="section-content home-container">
        <div className="main-content hero-card">
          <div className="hero-left">
            <div className="profile-photo-wrapper">
              <img src={profile} alt="Niño Bacaoco" className="profile-photo" />
            </div>
          </div>

          <div className="hero-right">
            <div className="role">
              Personal Assistant <span className="separator">•</span> Frontend
              Developer
            </div>

            <div className="name-block">
              <div className="name-wrapper">
                <h1 className="name" data-text="Niño Bacaoco">
                  Niño Bacaoco
                </h1>
                <div className="glowing-underline"></div>
              </div>
            </div>

            <div className="resume-container">
              <a
                href="https://drive.google.com/file/d/1kebBdMnKkguOKnS2EThtLvJbPn2DyqgS/view?usp=sharing"
                className="resume-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW RESUME
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Home;
