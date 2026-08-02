
export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div>
          <a href="#top" className="nav-logo">
            <img src="/logo.svg" alt="AS Filmmaking Logo" className="nav-logo-image" />
            <span className="nav-logo-text">
              <span style={{ color: 'var(--gold-bright)' }}>AS</span>Filmmaking
            </span>
          </a>
          <p className="footer-tagline">We capture the moments.</p>
        </div>

        <div className="footer-links">
          <a href="#stories">Stories</a>
          <a href="#studio">Studio</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="https://instagram.com/asfilmmaking.in" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#contact">Contact</a>
        </div>

        <span className="footer-credit">
          © {new Date().getFullYear()} AS Filmmaking by Aniket
          <span className="footer-signature">Designed by Kalki Studios</span>
        </span>
      </div>
    </footer>
  );
}