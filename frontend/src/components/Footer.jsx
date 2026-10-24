export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">AS<span className="logo-dot">.</span></div>
          <p className="footer-text">
            Designed &amp; Built by <span className="gradient-text">Anurag Sharma</span>
          </p>
          <p className="footer-copy">© {new Date().getFullYear()} Anurag Sharma. All rights reserved.</p>
        </div>
      </div>
      <div className="footer-glow"></div>
    </footer>
  );
}
