import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Aniket didn't just photograph our wedding — he made us forget the camera was even there. Every frame feels like we're reliving the day.",
    name: 'Priya & Rahul',
    detail: 'Wedding — Nagpur, 2025',
  },
  {
    quote: "The haldi reel he sent us the next morning had all of us in tears. The editing, the music, the colours — it was everything. Absolutely worth it.",
    name: 'Sneha & Karan',
    detail: 'Haldi + Wedding — Pune, 2025',
  },
  {
    quote: "We got so many compliments on our pre-wedding shoot. Aniket has an eye for the real moments — never over-posed, always natural.",
    name: 'Divya & Aditya',
    detail: 'Pre-Wedding + Reception — Raipur, 2024',
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonial">
      <div className="container">
        <span className="eyebrow" style={{ justifyContent:'center', display:'flex' }}>Client Stories</span>
        <span className="mark" aria-hidden="true">"</span>

        <div className="testimonial-carousel" aria-live="polite" aria-label="Client testimonials">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-slide ${i === active ? 'active' : ''}`}
              aria-hidden={i !== active}
            >
              <blockquote className="serif-quote">{t.quote}</blockquote>
              <cite>
                <b className="cite-name">— {t.name}</b>
                <span style={{ display:'block', fontSize:'.7rem', marginTop:'.3rem', letterSpacing:'.08em' }}>
                  {t.detail}
                </span>
              </cite>
            </div>
          ))}
        </div>

        <div className="testimonial-dots" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}