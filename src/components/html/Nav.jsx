import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = document.querySelectorAll('section, header');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="siteNav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          <span className="nav-logo-badge">AS</span>
          <span className="nav-logo-text"><span>AS</span>Filmmaking</span>
        </a>
        <button 
          className={`nav-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu" 
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <a href="#stories" className={activeSection === 'stories' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Stories</a>
          <a href="#studio" className={activeSection === 'studio' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Studio</a>
          <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" className={activeSection === 'work' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Check Availability</a>
        </div>
      </div>
    </nav>
  );
}
