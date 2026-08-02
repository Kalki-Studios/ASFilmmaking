import { useState, useRef, useEffect, useCallback } from 'react';

const frames = [
  { id: 1, cat: 'HALDI',     title: 'Golden Hands',       img: '/haldi.png' },
  { id: 2, cat: 'MEHENDI',   title: 'Ink Before the Vows', img: '/mehendi.png' },
  { id: 3, cat: 'BARAAT',    title: 'The Arrival',         img: '/baraat.png' },
  { id: 4, cat: 'PHERAS',    title: 'Seven Steps',         img: '/pheras.png' },
  { id: 5, cat: 'RECEPTION', title: 'Dance Floor',         img: '/reception.png' },
  { id: 6, cat: 'RECEPTION', title: 'String Lights',       img: '/reception.png' },
  { id: 7, cat: 'PORTRAITS', title: 'Just Us Two',         img: '/portraits.png' },
  { id: 8, cat: 'PORTRAITS', title: 'The Groom',           img: '/portraits.png' },
  { id: 9, cat: 'HALDI',     title: 'Turmeric Trail',      img: '/haldi.png' },
  { id:10, cat: 'MEHENDI',   title: 'The Bride Sits',      img: '/mehendi.png' },
  { id:11, cat: 'BARAAT',    title: 'Dhol Beats',          img: '/baraat.png' },
  { id:12, cat: 'PHERAS',    title: 'The Quiet Vow',       img: '/pheras.png' },
];

// Generate a sufficient number of sprocket holes for any scroll width
const SPROCKET_COUNT = 150;

// Old 35mm projector clicking sound synth
const createProjectorSound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  const ctx = new AudioContext();
  
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  let timerID;
  let isPlaying = false;
  let nextTickTime = ctx.currentTime;

  const scheduleTick = () => {
    while (nextTickTime < ctx.currentTime + 0.1) {
      if (isPlaying) {
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2500;
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, nextTickTime);
        gain.gain.linearRampToValueAtTime(0.015, nextTickTime + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.001, nextTickTime + 0.025);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(nextTickTime);
      }
      nextTickTime += 0.06; // tick speed
    }
    timerID = requestAnimationFrame(scheduleTick);
  };

  return {
    start: () => {
      if (ctx.state === 'suspended') ctx.resume();
      if (!isPlaying) {
        isPlaying = true;
        nextTickTime = ctx.currentTime + 0.05;
        if (!timerID) scheduleTick();
      }
    },
    stop: () => { isPlaying = false; },
    cleanup: () => {
      isPlaying = false;
      cancelAnimationFrame(timerID);
      try { ctx.close(); } catch(e){}
    },
    get isPlaying() { return isPlaying; }
  };
};

export default function Portfolio() {
  const [developed, setDeveloped] = useState(new Set());
  const [lightbox, setLightbox] = useState(null);
  const stripRef = useRef(null);
  const wrapRef = useRef(null);

  // Auto-scroll and projector state
  const projectorRef = useRef(null);
  const autoScrollRaf = useRef(null);
  const isHoveredRef = useRef(false);
  const isInViewRef = useRef(false);

  // Drag-to-scroll state
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  /* ---- Auto-develop first frame on mount ---- */
  useEffect(() => {
    const timer = setTimeout(() => setDeveloped(new Set([1])), 600);
    return () => clearTimeout(timer);
  }, []);

  /* ---- Auto-Scroll & Projector Sound ---- */
  useEffect(() => {
    // Init audio on first interaction to bypass autoplay restrictions
    const initAudio = () => {
      if (!projectorRef.current) {
        projectorRef.current = createProjectorSound();
      }
      window.removeEventListener('click', initAudio);
      window.removeEventListener('pointerdown', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('pointerdown', initAudio);
    window.addEventListener('keydown', initAudio);

    let lastTime = performance.now();
    
    // Intersection observer to pause when off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isInViewRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.1 });

    if (wrapRef.current) {
      observer.observe(wrapRef.current);
    }
    
    const scrollLoop = (time) => {
      const dt = time - lastTime;
      lastTime = time;

      const wrap = wrapRef.current;
      const strip = stripRef.current;
      if (wrap) {
        const canScroll = Math.ceil(wrap.scrollLeft + wrap.clientWidth) < wrap.scrollWidth;
        const shouldScroll = !drag.current.active && !isHoveredRef.current && canScroll && isInViewRef.current;

        if (shouldScroll) {
          // scroll at roughly 45px per second
          wrap.scrollLeft += (45 * dt) / 1000;
          if (projectorRef.current && !projectorRef.current.isPlaying) {
            projectorRef.current.start();
          }
        } else {
          if (projectorRef.current && projectorRef.current.isPlaying) {
            projectorRef.current.stop();
          }
        }

        // Auto-develop frames that reach the center
        if (strip) {
          const wrapCenter = wrap.getBoundingClientRect().left + wrap.clientWidth / 2;
          const undevelopedFrames = strip.querySelectorAll('.filmstrip-frame.undeveloped');
          undevelopedFrames.forEach(frameEl => {
            const rect = frameEl.getBoundingClientRect();
            const frameCenter = rect.left + rect.width / 2;
            if (Math.abs(frameCenter - wrapCenter) < 150) {
              const id = Number(frameEl.dataset.frameId);
              if (id) {
                setDeveloped(prev => {
                  if (prev.has(id)) return prev;
                  return new Set([...prev, id]);
                });
              }
            }
          });
        }
      }
      autoScrollRaf.current = requestAnimationFrame(scrollLoop);
    };
    autoScrollRaf.current = requestAnimationFrame(scrollLoop);

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('pointerdown', initAudio);
      window.removeEventListener('keydown', initAudio);
      cancelAnimationFrame(autoScrollRaf.current);
      if (projectorRef.current) projectorRef.current.cleanup();
      observer.disconnect();
    };
  }, []);

  /* ---- Drag / swipe handlers ---- */
  const onPointerDown = useCallback((e) => {
    drag.current.active = true;
    drag.current.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    drag.current.scrollLeft = wrapRef.current.scrollLeft;
    wrapRef.current.style.cursor = 'grabbing';
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const walk = (drag.current.startX - x) * 1.2;
    wrapRef.current.scrollLeft = drag.current.scrollLeft + walk;
  }, []);

  const onPointerUp = useCallback(() => {
    drag.current.active = false;
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab';
  }, []);

  /* ---- Develop a frame (darkroom reveal) ---- */
  const developFrame = (id) => {
    if (developed.has(id)) {
      // If already developed, open lightbox
      const frame = frames.find(f => f.id === id);
      setLightbox(frame);
    } else {
      setDeveloped(prev => new Set([...prev, id]));
    }
  };

  /* ---- Close lightbox on backdrop click or Escape ---- */
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const developedCount = developed.size;

  return (
    <>
      <section className="filmstrip-section" id="work">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">The Contact Sheet</span>
            <h2>A few frames from the archive.</h2>
            <p>Drag the film strip. Tap an undeveloped frame to watch it emerge from the darkroom. Tap again to open full frame.</p>
          </div>

          <div className="filmstrip-hint" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 12H3M3 12l6-6M3 12l6 6"/>
            </svg>
            <span>Drag to explore</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 12h18M18 12l-6-6M18 12l-6 6"/>
            </svg>
          </div>
        </div>

        <div
          ref={wrapRef}
          className="filmstrip-wrap"
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          onMouseEnter={() => isHoveredRef.current = true}
          onMouseLeave={() => { isHoveredRef.current = false; drag.current.active = false; if(wrapRef.current) wrapRef.current.style.cursor = 'grab'; }}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {/* Sprocket holes — top */}
          <div className="sprocket-row top" aria-hidden="true">
            {Array.from({ length: SPROCKET_COUNT }).map((_, i) => (
              <span key={i} className="sprocket-hole" />
            ))}
          </div>

          <div className="filmstrip" ref={stripRef}>
            {frames.map((frame, fi) => {
              const isDeveloped = developed.has(frame.id);
              return (
                <div
                  key={frame.id}
                  data-frame-id={frame.id}
                  className={`filmstrip-frame ${isDeveloped ? 'developed' : 'undeveloped'}`}
                  onClick={() => developFrame(frame.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && developFrame(frame.id)}
                  aria-label={isDeveloped ? `Open ${frame.title}` : `Develop frame: ${frame.title}`}
                >
                  {/* Film frame number markings (35mm authentic look) */}
                  <span className="frame-number top" aria-hidden="true">
                    <span className="fn-num">{String(fi + 31)}</span>
                    <span className="fn-brand">FURA RAJI</span>
                  </span>
                  <span className="frame-number bottom" aria-hidden="true">
                    <span className="fn-num">{String(fi + 31)}A</span>
                    <span className="fn-brand"></span>
                    <span className="fn-num-next">{String(fi + 32)}A</span>
                  </span>

                  <img src={frame.img} alt={frame.title} loading="lazy" draggable="false" />

                  {/* Darkroom develop overlay */}
                  <div className="frame-develop" aria-hidden="true" />
                  <div className="frame-ripple" aria-hidden="true" />

                  {/* Undeveloped state hint */}
                  {!isDeveloped && (
                    <div className="undeveloped-label" aria-hidden="true">
                      <span>🎞️</span>
                      <span className="tap-hint">Tap to Develop</span>
                    </div>
                  )}

                  {/* Developed state — caption + expand button */}
                  {isDeveloped && (
                    <>
                      <div className="frame-caption">
                        <span>{frame.cat}</span>
                        <b>{frame.title}</b>
                      </div>
                      <div className="frame-play-btn" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sprocket holes — bottom */}
          <div className="sprocket-row bottom" aria-hidden="true">
            {Array.from({ length: SPROCKET_COUNT }).map((_, i) => (
              <span key={i} className="sprocket-hole" />
            ))}
          </div>
        </div>

        {/* Develop counter */}
        <div className="container">
          <p className="develop-counter">
            <b style={{ borderBottom: '1px solid rgba(201,161,91,0.2)' }}>{developedCount}</b> / {frames.length} frames developed
            {developedCount === frames.length && (
              <span style={{ 
                color: 'var(--gold-bright)', 
                marginLeft: '0.8rem',
                animation: 'pulseHint 2s ease-in-out infinite' 
              }}>
                ✦ Roll Complete ✦
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`lightbox-overlay ${lightbox ? 'open' : ''}`}
        onClick={() => setLightbox(null)}
        role="dialog"
        aria-modal="true"
        aria-label={lightbox ? `Photo: ${lightbox.title}` : ''}
      >
        {lightbox && (
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
            <img src={lightbox.img} alt={lightbox.title} />
            <div className="lightbox-meta">
              <span>{lightbox.cat}</span>
              <b>{lightbox.title}</b>
            </div>
          </div>
        )}
      </div>
    </>
  );
}