import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Firefly from "./components/Firefly";
import DailyUIDesigns from "./components/DailyUIDesigns";
import Loader from "./components/Loader";

function FullSite() {
  const [activeSection, setActiveSection] = useState("home");
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "");

    const validPath = ["home", "projects", "about", "contact"].includes(path)
      ? path
      : "home";
    setActiveSection(validPath);

    const sectionRef = {
      home: homeRef,
      projects: projectsRef,
      about: aboutRef,
      contact: contactRef,
    }[validPath];

    if (sectionRef?.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: "auto",
      });
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const viewportBottom = window.scrollY + window.innerHeight;

      const isSectionInView = (section) => {
        if (!section) return false;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        return top < viewportBottom && bottom > scrollPosition;
      };

      let newActiveSection = activeSection;

      if (isSectionInView(contactRef.current)) {
        newActiveSection = "contact";
      } else if (isSectionInView(aboutRef.current)) {
        newActiveSection = "about";
      } else if (isSectionInView(projectsRef.current)) {
        newActiveSection = "projects";
      } else if (isSectionInView(homeRef.current)) {
        newActiveSection = "home";
      }

      // Always use /home instead of blank root path
      const currentPath =
        window.location.pathname === "/"
          ? "home"
          : window.location.pathname.replace("/", "");

      if (newActiveSection !== currentPath) {
        setActiveSection(newActiveSection);
        window.history.replaceState(null, "", `/${newActiveSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const navigate = useNavigate();

  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
    navigate(`/${sectionName}`);

    const sectionRef = {
      home: homeRef,
      projects: projectsRef,
      about: aboutRef,
      contact: contactRef,
    }[sectionName];

    if (sectionRef?.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: "auto",
      });
    }
  };

  return (
    <>
      <Navigation
        activeSection={activeSection}
        handleSectionChange={handleSectionChange}
      />

      <main>
        <Home ref={homeRef} isInView={activeSection === "home"} />
        <Projects ref={projectsRef} isInView={activeSection === "projects"} />
        <About ref={aboutRef} isInView={activeSection === "about"} />
        <Contact ref={contactRef} isInView={activeSection === "contact"} />
      </main>
    </>
  );
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="cursor-glow"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
            }}
          ></div>

          <Firefly count={15} />

          {/* Routing */}
          <Routes>
            <Route path="/" element={<FullSite />} />
            <Route path="/home" element={<FullSite />} />
            <Route path="/projects" element={<FullSite />} />
            <Route path="/about" element={<FullSite />} />
            <Route path="/contact" element={<FullSite />} />
            <Route path="/projects/dailyui" element={<DailyUIDesigns />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
