import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Firefly from './components/Firefly'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Add refs for each section to enable scrolling
  const homeRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  
  // Handle mouse movement for cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  // Initialize section visibility and handle scroll events to update the active section
  useEffect(() => {
    // Get the hash from URL or default to home
    const hash = window.location.hash.replace('#', '')
    const initialSection = hash && ['home', 'projects', 'about', 'contact'].includes(hash)
      ? hash
      : 'home'
    
    // Set the initial active section
    setActiveSection(initialSection)
    
    // Add scroll event listener to update the active section based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Adding offset for better detection
      
      // Get positions of all sections
      const homePosition = homeRef.current?.offsetTop || 0;
      const projectsPosition = projectsRef.current?.offsetTop || 0;
      const aboutPosition = aboutRef.current?.offsetTop || 0;
      const contactPosition = contactRef.current?.offsetTop || 0;
      
      // Determine which section is currently in view
      if (scrollPosition >= contactPosition) {
        setActiveSection('contact');
      } else if (scrollPosition >= aboutPosition) {
        setActiveSection('about');
      } else if (scrollPosition >= projectsPosition) {
        setActiveSection('projects');
      } else {
        setActiveSection('home');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Scroll to the initial section if there's a hash in the URL
    if (hash) {
      const sectionRef = {
        'home': homeRef,
        'projects': projectsRef,
        'about': aboutRef,
        'contact': contactRef
      }[hash];
      
      if (sectionRef?.current) {
        window.scrollTo({
          top: sectionRef.current.offsetTop,
          behavior: 'auto'
        });
      }
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  
  // Handle hash changes in URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && ['home', 'projects', 'about', 'contact'].includes(hash)) {
        setActiveSection(hash)
        
        const sectionRef = {
          'home': homeRef,
          'projects': projectsRef,
          'about': aboutRef,
          'contact': contactRef
        }[hash];
        
        if (sectionRef?.current) {
          window.scrollTo({
            top: sectionRef.current.offsetTop,
            behavior: 'auto'
          });
        }
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  // Function to handle section changes when navigation links are clicked
  const handleSectionChange = (sectionName) => {
    // Update the active section
    setActiveSection(sectionName)
    
    // Update the URL hash
    window.history.pushState(null, null, `#${sectionName}`)
    
    // Get the corresponding ref and scroll to it
    const sectionRef = {
      'home': homeRef,
      'projects': projectsRef,
      'about': aboutRef,
      'contact': contactRef
    }[sectionName];
    
    if (sectionRef?.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: 'auto'
      });
    }
  }

  return (
    <div className="portfolio">
      {/* Light effect that follows cursor */}
      <div 
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>
      
      {/* Firefly animation with fixed positioning */}
      <Firefly count={15} />
      
      {/* Portfolio Navigation */}
      <Navigation 
        activeSection={activeSection} 
        handleSectionChange={handleSectionChange} 
      />
      
      {/* Main content - all sections are now part of one continuous scroll */}
      <main>
        <Home ref={homeRef} isInView={activeSection === 'home'} />
        <Projects ref={projectsRef} isInView={activeSection === 'projects'} />
        <About ref={aboutRef} isInView={activeSection === 'about'} />
        <Contact ref={contactRef} isInView={activeSection === 'contact'} />
      </main>
    </div>
  )
}

export default App
