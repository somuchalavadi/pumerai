import LogoMark from "./LogoMark.jsx";

const exploreLinks = [
  { label: "Rooms", route: "/rooms" },
  { label: "Dining", route: "/dining" },
  { label: "Gallery", route: "/gallery" },
  { label: "Location", route: "/location" },
  { label: "FAQ", route: "/faq" },
];

export default function Footer({ onNavigate }) {
  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(item);
    } else {
      window.location.href = item.section ? `/#${item.section}` : item.route;
    }
  };

  const handleOpenBooking = () => {
    window.dispatchEvent(new CustomEvent("pumerai:open-booking"));
  };

  return (
    <footer className="site-footer" id="footer" aria-label="Site Footer">
      <div className="footer-container">
        {/* Top Brand & Primary WhatsApp CTA */}
        <div className="footer-top-brand">
          <div className="footer-brand-lockup">
            <a
              href="/"
              className="footer-brand-link"
              onClick={(e) => handleNavClick(e, { route: "/", section: "home" })}
              aria-label="Hotel Pumerai Home"
            >
              <LogoMark />
              <span className="footer-brand-title">HOTEL PUMERAI</span>
            </a>
            <p className="footer-tagline">
              A 3-star boutique hotel on NH-66 near Ramateertha Cross, Honnavar, Karnataka 581334.
            </p>
          </div>

          <div className="footer-cta-wrap">
            <button
              type="button"
              className="button-primary footer-book-btn"
              onClick={handleOpenBooking}
            >
              BOOK ON WHATSAPP
            </button>
          </div>
        </div>

        <div className="footer-brass-divider" />

        {/* Main 3-Column Footer Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Explore Navigation */}
          <nav className="footer-col" aria-label="Footer navigation links">
            <h4 className="footer-col-title">Explore</h4>
            <div className="footer-nav-links">
              {exploreLinks.map((item) => (
                <a
                  key={item.route}
                  href={item.route}
                  className="footer-nav-link"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Col 2: Contact Information */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <address className="footer-contact-block">
              <div className="footer-contact-item">
                <span className="contact-label">Direct Reservations</span>
                <a href="tel:+919845423223" className="contact-link">
                  +91 98454 23223
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">Hotel Front Desk (24/7)</span>
                <a href="tel:+918387221221" className="contact-link">
                  08387-221221
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">WhatsApp</span>
                <a
                  href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  +91 98454 23223
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">Email</span>
                <a href="mailto:reservation@hotelpumerai.com" className="contact-link">
                  reservation@hotelpumerai.com
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">Address</span>
                <a
                  href={officialGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link contact-address-link"
                >
                  Hotel Pumerai, NH-66, near Ramateertha Cross, Honnavar 581334
                </a>
              </div>
            </address>
          </div>

          {/* Col 3: Location Context & Transit */}
          <div className="footer-col">
            <h4 className="footer-col-title">Location</h4>
            <div className="footer-location-block">
              <p className="footer-location-context">
                Hotel Pumerai, NH-66, near Ramateertha Cross,
                <br />
                Honnavar, Uttara Kannada, Karnataka 581334
              </p>
              <a
                href={officialGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-directions-link"
                aria-label="Get Directions to Hotel Pumerai on Google Maps"
              >
                Get Directions &rarr;
              </a>
              <ul className="footer-distances-list">
                <li>&bull; ~5 km from Kasarkod Eco Beach</li>
                <li>&bull; ~2.8 km from Sharavati River (~3.5 km from Station)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-brass-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-info">
            <p className="footer-copy">
              &copy; 2026 Hotel Pumerai. All rights reserved. &bull; NH-66, near Ramateertha Cross, Honnavar, Karnataka 581334
            </p>
            <p className="footer-credit">
              Designed &amp; Developed by{" "}
              <a
                href="https://dishanwebwing.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-credit-link"
              >
                Dishan Web Wings
              </a>
            </p>
          </div>
          <div className="footer-legal-links">
            <a href="/location" onClick={(e) => handleNavClick(e, { route: "/location" })}>Privacy &amp; Policies</a>
            <span className="legal-dot">&bull;</span>
            <a href="/faq" onClick={(e) => handleNavClick(e, { route: "/faq" })}>Cancellation &amp; FAQ</a>
            <span className="legal-dot">&bull;</span>
            <a href="/contact" onClick={(e) => handleNavClick(e, { route: "/contact" })}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
