import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/DailyUIDesigns.css";
import ProjectImageFallback from "./ProjectImageFallback";
import ImageModal from "./ImageModal";

// Import design thumbnails
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
import dailyui30 from "../assets/images/30.png";

const DailyUIDesigns = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getDesignImage = (index) => {
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
    return designImages[index] || dailyui1;
  };

  const getDesignLinks = (day) => {
    const designLinks = {
      1: {
        figmaFile: "https://figma.fun/JGVBrf",
        figmaPrototype: "https://figma.fun/BsAfMR",
      },
      2: {
        figmaFile: "https://figma.fun/py1tVZ",
        figmaPrototype: "https://figma.fun/6pjiNB",
      },
      3: {
        figmaFile: "https://figma.fun/TINHMi",
        figmaPrototype: "https://figma.fun/5DCw42",
      },
      4: {
        figmaFile: "https://figma.fun/98KCHS",
        figmaPrototype: "https://figma.fun/JNNkMN",
      },
      5: {
        figmaFile: "https://figma.fun/0Cv8PZ",
        figmaPrototype: "https://figma.fun/aiyslM",
      },
      6: {
        figmaFile: "https://figma.fun/NSA2H8",
        figmaPrototype: "https://figma.fun/Cgu54U",
      },
      7: {
        figmaFile: "https://figma.fun/R5vYJc",
        figmaPrototype: "https://figma.fun/X9DK3y",
      },
      8: {
        figmaFile: "https://figma.fun/rbgmea",
        figmaPrototype: "https://figma.fun/xZD8tq",
      },
      9: {
        figmaFile: "https://figma.fun/LNsSu8",
        figmaPrototype: "https://figma.fun/A6oP0V",
      },
      10: {
        figmaFile: "https://figma.fun/Y0w6x7",
        figmaPrototype: "https://figma.fun/XeXWyd",
      },
      11: {
        figmaFile: "https://figma.fun/JC5Svg",
        figmaPrototype: "https://figma.fun/9cDqzK",
      },
      12: {
        figmaFile: "https://figma.fun/OwUrfW",
        figmaPrototype: "https://figma.fun/6Wu2yM",
      },
      13: {
        figmaFile: "https://figma.fun/LMKDwc",
        figmaPrototype: "https://figma.fun/8hmJMY",
      },
      14: {
        figmaFile: "https://figma.fun/4OGu6r",
        figmaPrototype: "https://figma.fun/IDNJLM",
      },
      15: {
        figmaFile: "https://figma.fun/BoI3HK",
        figmaPrototype: "https://figma.fun/C8Ah2V",
      },
      16: {
        figmaFile: "https://figma.fun/dDMM2K",
        figmaPrototype: "https://figma.fun/JbmOWh",
      },
      17: {
        figmaFile: "https://figma.fun/6ABQHs",
        figmaPrototype: "https://figma.fun/6Yr5bG",
      },
      18: {
        figmaFile: "https://figma.fun/tAPBeq",
        figmaPrototype: "https://figma.fun/GhyIWN",
      },
      19: {
        figmaFile: "https://figma.fun/8IwTeY",
        figmaPrototype: "https://figma.fun/SQlvBP",
      },
      20: {
        figmaFile: "https://figma.fun/hcEW1y",
        figmaPrototype: "https://figma.fun/AkRvvr",
      },
      21: {
        figmaFile: "https://figma.fun/10VfEU",
        figmaPrototype: "https://figma.fun/8FhiGf",
      },
      22: {
        figmaFile: "https://figma.fun/Mlr6W6",
        figmaPrototype: "https://figma.fun/Cjmek5",
      },
      23: {
        figmaFile: "https://figma.fun/Qjn1Yi",
        figmaPrototype: "https://figma.fun/v3jeFj",
      },
      24: {
        figmaFile: "https://figma.fun/P3FzOe",
        figmaPrototype: "https://figma.fun/Lt0Djx",
      },
      25: {
        figmaFile: "https://figma.fun/8vGgw4",
        figmaPrototype: "https://figma.fun/pyMyfo",
      },
      26: {
        figmaFile: "https://figma.fun/0WWr4n",
        figmaPrototype: "https://figma.fun/SdyZn6",
      },
      27: {
        figmaFile: "https://figma.fun/G9fdO5",
        figmaPrototype: "https://figma.fun/Fb3CAT",
      },
      28: {
        figmaFile: "https://figma.fun/41ZCSR",
        figmaPrototype: "https://figma.fun/RJ1N6w",
      },
      29: {
        figmaFile: "https://figma.fun/96jL3V",
        figmaPrototype: "https://figma.fun/qxlTYn",
      },
      30: {
        figmaFile: "https://figma.fun/brmAro",
        figmaPrototype: "https://figma.fun/dIMv4Z",
      },
    };
    return (
      designLinks[day] || {
        figmaFile: `https://figma.com/file/design-${day}`,
        figmaPrototype: `https://figma.com/proto/proto-${day}`,
      }
    );
  };

  const designs = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const designLinks = getDesignLinks(day);
    return {
      id: day,
      title: getDescriptionForDay(day).split(" - ")[0],
      description: getDescriptionForDay(day).split(" - ")[1] || "",
      figmaFileLink: designLinks.figmaFile,
      figmaPrototypeLink: designLinks.figmaPrototype,
      image: getDesignImage(day),
    };
  });

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBackClick = () => {
    navigate("/projects");
  };

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    const cards = document.querySelectorAll(".design-card");
    cards.forEach((card, index) => {
      card.classList.remove("animate", "visible");
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      void card.offsetWidth;
      setTimeout(() => {
        card.classList.add("animate");
        card.style.transition =
          "opacity 0.6s ease-out, transform 0.6s ease-out";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 300 + index * 100);
    });
    return () => setIsVisible(false);
  }, []);

  return (
    <>
      <section className={`daily-ui-section ${isVisible ? "visible" : ""}`}>
        <div className="daily-ui-header">
          <button onClick={handleBackClick} className="back-button">
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>&lt;</span>{" "}
            Back to Projects
          </button>
          <h1>DailyUI Challenge Designs</h1>
          <p className="designs-subtitle">
            A collection of 30 design challenges completed over 3 weeks
          </p>
        </div>

        <div className="designs-grid">
          {designs.map((design) => (
            <div
              key={design.id}
              className="design-card"
              id={`design-${design.id}`}
            >
              <div
                onClick={() => openModal(design.image)}
                className="design-image clickable-image"
              >
                {design.image ? (
                  <img src={design.image} alt={design.title} />
                ) : (
                  <ProjectImageFallback text={design.title} />
                )}
              </div>
              <div className="design-content">
                <h3>{design.title}</h3>
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

        {modalOpen && selectedImage && (
          <ImageModal
            isOpen={modalOpen}
            imageUrl={selectedImage}
            onClose={closeModal}
          />
        )}
      </section>

      {/* ✅ Floating Scroll-to-Top Button OUTSIDE the section */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button show"
          aria-label="Scroll to Top"
        >
          ↑
        </button>
      )}
    </>
  );
};

function getDescriptionForDay(day) {
  const descriptions = {
    1: "Sign Up Page - Duolingo mobile sign-up recreation",
    2: "Credit Card Checkout - Duolingo mobile checkout recreation",
    3: "Landing Page - Pinterest web layout recreation",
    4: "Calculator - Simple mobile calculator redesign",
    5: "App Icon - Valorant logo recreation",
    6: "User Profile - Steam profile page recreation",
    7: "Settings - PayPal settings page redesign",
    8: "404 Page - Duolingo web 404 page recreation",
    9: "Music Player - Basic music player UI",
    10: "Social Share - Simple share button UI",
    11: "Flash Message - Minimal alert component",
    12: "E-Commerce Shop - Redragon product page recreation",
    13: "Direct Messaging - Steam messaging UI recreation",
    14: "Countdown Timer - Pomofocus timer UI recreation",
    15: "On/Off Switch - Sun/night toggle switch",
    16: "Pop-Up Overlay - Glossier web modal recreation",
    17: "Purchase Receipt - SHEIN mobile receipt recreation",
    18: "Analytics Chart - Duolingo/Gmail parallax chart recreation",
    19: "Leaderboard - Duolingo mobile leaderboard redesign",
    20: "Location Tracker - Mobile tracker with direction animation",
    21: "Home Monitoring Dashboard - Neobrutalist web dashboard",
    22: "Search Interface - Custom filterable search UI",
    23: "Onboarding Experience - Simple step-by-step onboarding",
    24: "Boarding Pass - Minimal mobile boarding pass",
    25: "TV App Interface - Web TV layout recreation",
    26: "Subscribe Form - Gradient glassmorphism form",
    27: "Dropdown Menu - Steam profile dropdown recreation",
    28: "Contact Form - Glassy gradient contact form",
    29: "Map Design - Cyber-themed dark world map",
    30: "Pricing - Cloud storage pricing table",
  };
  return (
    descriptions[day] ||
    "UI Design - A creative UI design solution for a daily challenge."
  );
}

export default DailyUIDesigns;
