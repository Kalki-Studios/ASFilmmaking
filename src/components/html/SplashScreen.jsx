import { useState, useEffect } from 'react';

export default function SplashScreen({ onEnter, tracks }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let loaded = 0;
    let hasReadyFired = false;
    
    const checkReady = () => {
      if (!hasReadyFired && loaded >= tracks.length) {
        hasReadyFired = true;
        setIsReady(true);
      }
    };

    // Preload audio files
    tracks.forEach((src) => {
      const audio = new Audio();
      audio.preload = 'auto';
      
      const onCanPlay = () => {
        loaded++;
        setLoadedCount(loaded);
        checkReady();
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
      };
      
      const onError = () => {
        // Even if it errors, we count it so we don't block forever
        loaded++;
        setLoadedCount(loaded);
        checkReady();
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
      };

      audio.addEventListener('canplaythrough', onCanPlay);
      audio.addEventListener('error', onError);
      
      // Assign src to trigger load
      audio.src = src;
      audio.load();
    });

    // Fallback: If 5 seconds pass and we're not ready (e.g. mobile Safari blocking auto-preloads), force ready.
    const timeout = setTimeout(() => {
      if (!hasReadyFired) {
        hasReadyFired = true;
        setIsReady(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [tracks]);

  const handleEnter = () => {
    setFading(true);
    // Wait for CSS fade out animation
    setTimeout(() => {
      onEnter();
    }, 800); // 800ms fade transition
  };

  const progressPercent = Math.min(100, Math.round((loadedCount / tracks.length) * 100));

  return (
    <div className={`splash-screen ${fading ? 'fade-out' : ''}`}>
      <div className="grain"></div>
      <div className="splash-content">
        <div className="splash-logo">
          <img src="/logo.svg" alt="ASFilmmaking" style={{ width: '80px', marginBottom: '1.5rem' }} />
        </div>
        
        <h1 className="splash-title">ASFilmmaking</h1>
        <p className="splash-subtitle">For the moments that matter.</p>
        
        <div className="splash-loader-container">
          {!isReady ? (
            <>
              <div className="film-loader"></div>
              <span className="splash-loading-text">Loading Experience {progressPercent}%</span>
            </>
          ) : (
            <button className="splash-enter-btn" onClick={handleEnter}>
              Enter Studio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
