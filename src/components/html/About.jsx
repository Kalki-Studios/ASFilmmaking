import AnimatedNum from './AnimatedNum';

export default function About() {
  return (
    <section id="studio">
      <div className="container about-grid">
        <div className="about-copy reveal">
          <span className="eyebrow">The Studio</span>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', marginBottom:'1.5rem' }}>
            By Aniket.<br />
            <em style={{ fontStyle:'italic', color:'var(--gold-bright)' }}>For the moments that matter.</em>
          </h2>
          <p>AS Filmmaking is a wedding photography and film studio built around one idea — moments don't repeat, so they need to be shot right the first time.</p>
          <p>Run by Aniket, the studio covers weddings the way a film crew covers a set: a shot list, a story arc, and an edit that plays back like it actually felt in the room. Not staged. Not over-posed. Just yours, on record.</p>
          <p>From haldi mornings to reception nights, every frame is chosen to be watched again — not scrolled past once.</p>

          <div className="about-stats">
            <div className="about-stat">
              <b><AnimatedNum end={97} suffix="+" /></b>
              <span>Stories Told</span>
            </div>
            <div className="about-stat">
              <b><AnimatedNum end={1.3} suffix="K" decimals={1} /></b>
              <span>Followers</span>
            </div>
            <div className="about-stat">
              <b><AnimatedNum end={5} suffix="★" /></b>
              <span>Client Rating</span>
            </div>
          </div>
        </div>

        <div className="about-frame reveal">
          <img
            src="https://picsum.photos/seed/asfilmmaking-portrait-bw/900/1100"
            alt="Behind the scenes — Aniket at work during a wedding shoot"
            loading="lazy"
          />
          <span className="about-frame-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '0.4rem', position: 'relative', top: '-1px' }}>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            Aniket — Behind the Lens
          </span>
        </div>
      </div>
    </section>
  );
}