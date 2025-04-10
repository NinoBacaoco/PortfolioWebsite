import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Firefly from './components/Firefly'
import DailyUIDesigns from './components/DailyUIDesigns'
import Loader from './components/Loader'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showDailyUI, setShowDailyUI] = useState(false)
  const [loading, setLoading] = useState(true)
  
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
  
  // Add loading state management
  useEffect(() => {
    // Simulate loading time to ensure assets are loaded
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Initialize section visibility and handle scroll events to update the active section
  useEffect(() => {
    // Get the hash from URL or default to home
    const hash = window.location.hash.replace('#', '')
    
    // Check if we should show the DailyUI designs page
    if (hash === 'dailyui') {
      setShowDailyUI(true)
      return
    } else {
      setShowDailyUI(false)
    }
    
    const initialSection = hash && ['home', 'projects', 'about', 'contact'].includes(hash)
      ? hash
      : 'home'
    
    // Set the initial active section
    setActiveSection(initialSection)
    
    // Add scroll event listener to update the active section based on scroll position
    const handleScroll = () => {
      // Get the current scroll position plus a small offset for better UX
      const scrollPosition = window.scrollY + 200;
      
      // Calculate the bottom of viewport
      const viewportBottom = window.scrollY + window.innerHeight;
      
      // Get the elements for all sections
      const homeSection = homeRef.current;
      const projectsSection = projectsRef.current;
      const aboutSection = aboutRef.current;
      const contactSection = contactRef.current;
      
      // Helper function to check if a section is in view
      const isSectionInView = (section) => {
        if (!section) return false;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Consider a section in view if:
        // 1. The top of the section is above the bottom of the viewport, AND
        // 2. The bottom of the section is below the top of the viewport (plus offset for better UX)
        // 3. Give priority to the section that occupies most of the viewport
        return sectionTop < viewportBottom && sectionBottom > scrollPosition;
      };
      
      // Determine which section is currently most in view
      if (isSectionInView(contactSection)) {
        setActiveSection('contact');
      } else if (isSectionInView(aboutSection)) {
        setActiveSection('about');
      } else if (isSectionInView(projectsSection)) {
        setActiveSection('projects');
      } else if (isSectionInView(homeSection)) {
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
      
      // Check if we should show the DailyUI designs page
      if (hash === 'dailyui') {
        setShowDailyUI(true)
        return
      } else if (showDailyUI) {
        // If we were showing DailyUI but now we're not,
        // ensure we set the active section to 'projects'
        setShowDailyUI(false)
        setActiveSection('projects')
        
        // Scroll to the projects section
        if (projectsRef?.current) {
          window.scrollTo({
            top: projectsRef.current.offsetTop,
            behavior: 'auto'
          })
        }
        return
      } else {
        setShowDailyUI(false)
      }
      
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
  }, [showDailyUI]) // Add showDailyUI as a dependency

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
      {loading ? (
        <Loader />
      ) : (
        <>
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
          
          {/* Show either the main portfolio or DailyUI designs page */}
          {showDailyUI ? (
            <DailyUIDesigns />
          ) : (
            <>
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
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
