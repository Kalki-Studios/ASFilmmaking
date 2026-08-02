
export default function Contact() {
  return (
    <section className="contact" id="contact">
      {/* Bokeh background dots */}
      <div className="contact-bokeh" aria-hidden="true">
        {[
          { w:200, h:200, l:'10%', t:'20%', dur:'14s', delay:'0s',  op:.07 },
          { w:120, h:120, l:'70%', t:'60%', dur:'10s', delay:'2s',  op:.09 },
          { w:160, h:160, l:'40%', t:'10%', dur:'12s', delay:'5s',  op:.06 },
          { w:80,  h:80,  l:'85%', t:'30%', dur:'9s',  delay:'1s',  op:.11 },
          { w:240, h:240, l:'5%',  t:'65%', dur:'16s', delay:'4s',  op:.05 },
        ].map((b, i) => (
          <span
            key={i}
            className="bokeh-dot"
            style={{
              width: b.w, height: b.h, left: b.l, top: b.t,
              '--dur': b.dur, '--delay': b.delay, '--op': b.op,
            }}
          />
        ))}
      </div>

      <div className="container">
        <span className="eyebrow" style={{ justifyContent:'center', display:'flex' }}>Let's Talk Dates</span>
        <h2 className="contact-gradient-text">Ready when you are.</h2>
        <p>
          Send your wedding date and city on WhatsApp — Aniket usually replies
          within a day with availability and packages.
        </p>
        <div className="contact-actions">
          <a
            href="https://wa.me/919999999999?text=Hi%20Aniket%2C%20I%27d%20love%20to%20know%20more%20about%20your%20wedding%20photography%20packages"
            className="btn whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49"/>
            </svg>
            Message on WhatsApp
          </a>
          <a href="tel:+919999999999" className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92"/>
            </svg>
            Call the Studio
          </a>
          <a
            href="https://instagram.com/asfilmmaking.in"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
            </svg>
            View on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}