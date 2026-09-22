import LogoMark from "./LogoMark.jsx";

const navigation = [
  { label: "HOME", route: "/", section: "home" },
  { label: "ABOUT", route: "/", section: "about" },
  { label: "ROOMS", route: "/", section: "rooms" },
  { label: "EXPERIENCE", route: "/", section: "experience" },
  { label: "DINING", route: "/", section: "dining" },
  { label: "GALLERY", route: "/gallery" },
  { label: "CONTACT", route: "/contact" },
];

function Footer({ onNavigate }) {
  const handleNavigate = (event, item) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-brand">
          <a
            className="footer-brand"
            href="/"
            onClick={(event) => handleNavigate(event, navigation[0])}
            aria-label="Hotel Pumerai Home"
          >
            <LogoMark />
            <span className="footer-brand-title">HOTEL PUMERAI</span>
          </a>
          <p className="footer-tagline">
            Contemporary hospitality on the coastal road of Honnavar.
          </p>
        </div>

        <div className="footer-brass-divider" />

        <div className="footer-main-grid">
          <nav className="footer-nav" aria-label="Footer navigation">
            <span className="footer-section-label">EXPLORE</span>
            <div className="footer-nav-links">
              {navigation.map((item) => (
                <a
                  key={`${item.route}-${item.section || item.label}`}
                  href={item.section ? `/#${item.section}` : item.route}
                  className="footer-nav-link"
                  onClick={(event) => handleNavigate(event, item)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="footer-contact-block">
            <span className="footer-section-label">RESERVATIONS &amp; ENQUIRIES</span>
            <div className="footer-contact-items">
              <a href="tel:+919845423223" className="footer-contact-link">
                <span className="link-label">Direct:</span> +91 98454 23223
              </a>
              <a href="tel:+918387221221" className="footer-contact-link">
                <span className="link-label">Front Desk:</span> 08387-221221
              </a>
              <a href="mailto:reservation@hotelpumerai.com" className="footer-contact-link">
                <span className="link-label">Email:</span> reservation@hotelpumerai.com
              </a>
              <p className="footer-address">
                NH-66, near Ramateertha Cross,
                <br />
                Honnavar, Karnataka 581334, India
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copy">&copy; 2026 Hotel Pumerai. All rights reserved.</p>
          <span className="footer-subtext">Karnataka Coastal Hospitality &bull; NH-66</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
