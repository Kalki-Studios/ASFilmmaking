import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from './components/html/Nav';
import Hero from './components/html/Hero';
import DirectorCut from './components/html/DirectorCut';
import About from './components/html/About';
import Services from './components/html/Services';
import Portfolio from './components/html/Portfolio';
import Highlights from './components/html/Highlights';
import Testimonial from './components/html/Testimonial';
import Contact from './components/html/Contact';
import Footer from './components/html/Footer';
import WhatsAppFab from './components/html/WhatsAppFab';
import Scene3D from './components/canvas/Scene3D';
import SplashScreen from './components/html/SplashScreen';

gsap.registerPlugin(ScrollTrigger);

const ambientTracks = [
  'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3', 
  'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3', 
  'https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3', 
  'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3', 
  'https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3', 
  'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3', 
];

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const globalAudioRef = useRef(null);
  // Page Navigation Flash Logic
  useEffect(() => {
    const handleHashChange = () => {
      document.body.classList.add('navigating');
      setTimeout(() => {
        document.body.classList.remove('navigating');
      }, 100);
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Also intercept anchor clicks to trigger immediately
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.hash && link.hash.startsWith('#') && link.pathname === window.location.pathname) {
         handleHashChange();
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Global smooth scroll/GSAP setup if needed
  useEffect(() => {
    // Reveal animations for general HTML sections (GSAP)
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray('.section-head, .about-copy, .testimonial blockquote').forEach(el => {
        gsap.fromTo(el, {opacity: 0, y: 26}, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        });
      });
    });

    // IntersectionObserver for .reveal elements
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(el => observer.observe(el));

    return () => {
      mm.revert();
      observer.disconnect();
    };
  }, []);

  // Global Audio Event Listener
  useEffect(() => {
    const handleChangeAmbient = (e) => {
      if (!globalAudioRef.current) return;
      const index = e.detail.index;
      const a = globalAudioRef.current;
      const newSrc = ambientTracks[index];
      if (a.src !== newSrc) {
        a.src = newSrc;
      }
      a.volume = 0.40;
      a.play().catch(err => console.warn('Global audio blocked:', err));
    };

    window.addEventListener('change-ambient', handleChangeAmbient);
    return () => window.removeEventListener('change-ambient', handleChangeAmbient);
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    if (globalAudioRef.current) {
      globalAudioRef.current.src = ambientTracks[0];
      globalAudioRef.current.volume = 0.40;
      globalAudioRef.current.play().catch(e => console.warn('Initial play blocked:', e));
    }
  };

  return (
    <>
      <audio ref={globalAudioRef} loop preload="none" />
      
      {!hasEntered && (
        <SplashScreen tracks={ambientTracks} onEnter={handleEnter} />
      )}
      
      <div className="grain"></div>
      
      {/* 3D Canvas fixed in background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay Content */}
      <div className="overlay-container">
        <Nav />
        <main>
          <Hero />
          <DirectorCut />
          <About />
          <Services />
          <Portfolio />
          <Highlights />
          <Testimonial />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </>
  );
}

export default App;
