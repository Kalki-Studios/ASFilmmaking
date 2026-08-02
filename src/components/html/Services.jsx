
const services = [
  {
    icon: '📷',
    tag: 'PHOTOGRAPHY',
    title: 'Wedding Day Coverage',
    desc: 'Full-day candid and traditional coverage, from the first getting-ready shot to the last dance on the reception floor.',
  },
  {
    icon: '🎬',
    tag: 'FILM',
    title: 'Wedding Films & Teasers',
    desc: "A same-week cinematic teaser, plus the full-length film for the moments the teaser can't hold.",
  },
  {
    icon: '🌅',
    tag: 'PRE-WEDDING',
    title: 'Pre-Wedding Shoots',
    desc: 'A location shoot before the wedding — your choice of setting, shot like the opening scene of your story.',
  },
  {
    icon: '🌸',
    tag: 'CEREMONIES',
    title: 'Haldi & Mehendi Coverage',
    desc: 'The smaller ceremonies get full attention too — this is where the real, unscripted joy usually lives.',
  },
];

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--void-soft)' }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">What We Shoot</span>
          <h2>Coverage, not just a photographer.</h2>
          <p>Every package is built to tell the full story — not just the ceremony, but all the quiet, unscripted moments around it.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={s.tag}>
              <span className="service-card-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="service-icon" role="img" aria-hidden="true">{s.icon}</span>
              <span className="tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}