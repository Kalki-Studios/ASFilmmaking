
export default function Hero() {
  const headingWords = ["We", "capture", "the", "moments."];

  return (
    <header className="hero" id="top">
      {/* Cinematic Frame Overlay */}
      <div className="hero-frame" aria-hidden="true"></div>
      {/* Floating bokeh particles */}
      <div className="hero-particles" aria-hidden="true">
        {[
          { w:120, h:120, l:'8%',  t:'20%', dur:'9s',  delay:'0s',  op:.18 },
          { w:60,  h:60,  l:'72%', t:'35%', dur:'12s', delay:'2s',  op:.12 },
          { w:90,  h:90,  l:'55%', t:'65%', dur:'10s', delay:'4s',  op:.15 },
          { w:40,  h:40,  l:'22%', t:'55%', dur:'14s', delay:'1s',  op:.10 },
          { w:150, h:150, l:'80%', t:'15%', dur:'11s', delay:'3s',  op:.08 },
          { w:50,  h:50,  l:'40%', t:'80%', dur:'8s',  delay:'5.5s',op:.20 },
        ].map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              width: p.w, height: p.h,
              left: p.l, top: p.t,
              background: `radial-gradient(circle, rgba(201,161,91,0.6) 0%, transparent 70%)`,
              '--dur': p.dur, '--delay': p.delay, '--max-op': p.op,
            }}
          />
        ))}
      </div>

      {/* 3D scene handles the deep background */}
      <div className="container hero-content">
        <div className="hero-eyebrow-line">
          <span className="eyebrow" style={{ margin: 0 }}>Wedding Photography &amp; Cinematic Films</span>
        </div>
        
        <h1 className="stagger-reveal-h1">
          {headingWords.map((word, i) => (
            <span key={i} className="reveal-word" style={{ animationDelay: `${i * 0.08 + 0.3}s` }}>
              {word === 'moments.' ? <em>{word}</em> : word}
              {i === 1 && <br />}
            </span>
          ))}
        </h1>
        
        <p className="hero-sub reveal-clip">
          Cinematic wedding stories by AS Filmmaking — Haldi to reception,
          shot to be watched again, years later, exactly as it felt.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary shimmer-btn">
            <span>View Our Work</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </header>
  );
}