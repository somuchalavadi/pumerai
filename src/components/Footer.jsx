import LogoMark from "./LogoMark.jsx";

const navLinks = [
  { label: "Home", route: "/" },
  { label: "Rooms & Suites", route: "/rooms" },
  { label: "Dining & Menus", route: "/dining" },
  { label: "Amenities & Pool", route: "/", section: "amenities" },
  { label: "Visual Gallery", route: "/gallery" },
  { label: "Location & Transit", route: "/location" },
  { label: "Guest Reviews", route: "/", section: "reviews" },
  { label: "Direct Offers", route: "/", section: "offers" },
  { label: "FAQ & Policies", route: "/", section: "faq" },
  { label: "Contact Front Desk", route: "/contact" },
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
        {/* Top Brand Banner */}
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
              40 contemporary guestrooms, glass-edge swimming pool, and authentic Karavali dining.
            </p>
          </div>

          <div className="footer-badges-group">
            <div className="footer-score-pill">
              <span className="badge-rating-val">10/10</span>
              <span className="badge-rating-text">EXCEPTIONAL &bull; GOOGLE STAYS</span>
            </div>
            <button
              type="button"
              className="button-primary footer-book-btn"
              onClick={handleOpenBooking}
            >
              BOOK DIRECT &amp; SAVE 10%
            </button>
          </div>
        </div>

        <div className="footer-brass-divider" />

        {/* Main 4-Column Footer Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Explore Navigation */}
          <nav className="footer-col" aria-label="Footer navigation links">
            <h4 className="footer-col-title">EXPLORE PUMERAI</h4>
            <div className="footer-nav-links">
              {navLinks.map((item) => (
                <a
                  key={`${item.route}-${item.section || item.label}`}
                  href={item.section ? `/#${item.section}` : item.route}
                  className="footer-nav-link"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Col 2: Full Contact Block with semantic <address> */}
          <div className="footer-col">
            <h4 className="footer-col-title">RESERVATIONS &amp; CONTACT</h4>
            <address className="footer-contact-block">
              <div className="footer-contact-item">
                <span className="contact-label">DIRECT RESERVATIONS</span>
                <a href="tel:+919845423223" className="contact-link phone-link">
                  +91 98454 23223
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">HOTEL FRONT DESK (24/7)</span>
                <a href="tel:+918387221221" className="contact-link">
                  08387-221221
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">WHATSAPP INSTANT CHAT</span>
                <a
                  href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link whatsapp-footer-link"
                >
                  +91 98454 23223 (Click to Chat)
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">EMAIL RESERVATIONS</span>
                <a href="mailto:reservation@hotelpumerai.com" className="contact-link">
                  reservation@hotelpumerai.com
                </a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label">PROPERTY ADDRESS</span>
                <p className="contact-address-text">
                  Hotel Pumerai, NH-66, near Ramateertha Cross,
                  <br />
                  Honnavar, Uttara Kannada,
                  <br />
                  Karnataka 581334, India
                </p>
              </div>
            </address>
          </div>

          {/* Col 3: Location Thumbnail & Deep Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">LOCATION &amp; DIRECTIONS</h4>
            <div className="footer-map-card">
              <a
                href={officialGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="map-thumbnail-link"
                aria-label="Get Directions to Hotel Pumerai on Google Maps"
              >
                <div className="map-thumb-preview">
                  <div className="map-pin-pulse">
                    <span className="pin-dot" />
                    <span className="pin-ring" />
                  </div>
                  <div className="map-thumb-overlay">
                    <span className="map-btn-text">GET DIRECTIONS ON GOOGLE MAPS &rarr;</span>
                  </div>
                </div>
              </a>
              <ul className="footer-distances-list">
                <li>&bull; ~5 km from Kasarkod Eco Beach</li>
                <li>&bull; ~2.8 km from Sharavati River</li>
                <li>&bull; ~3.5 km from Honnavar Station</li>
              </ul>
              <a
                href={officialGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
                style={{ fontSize: "0.7rem", padding: "8px 12px", textAlign: "center", marginTop: "4px" }}
              >
                📍 Open Google Maps App
              </a>
            </div>
          </div>

          {/* Col 4: Verified Stays & Travel OTA Partners */}
          <div className="footer-col">
            <h4 className="footer-col-title">VERIFIED REPUTATION</h4>
            <p className="footer-partner-copy">
              Ranked 10/10 &ldquo;Exceptional&rdquo; across major hospitality networks.
              Book directly on this site for our lowest price guarantee, free breakfast, and flexible cancellation.
            </p>
            <div className="footer-trust-chips">
              <span className="trust-chip">&#x2713; Google Business Verified</span>
              <span className="trust-chip">&#x2713; Booking.com 10/10 Score</span>
              <span className="trust-chip">&#x2713; Best Rate Direct Guarantee</span>
              <span className="trust-chip">&#x2713; 24-Hour Secured Parking</span>
            </div>
          </div>
        </div>

        <div className="footer-brass-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copy">
            &copy; 2026 Hotel Pumerai. All rights reserved. &bull; NH-66, near Ramateertha Cross, Honnavar, Karnataka 581334
          </p>
          <div className="footer-legal-links">
            <a href="/" onClick={(e) => handleNavClick(e, { route: "/", section: "location" })}>Privacy &amp; Policies</a>
            <span className="legal-dot">&bull;</span>
            <a href="/" onClick={(e) => handleNavClick(e, { route: "/", section: "faq" })}>Cancellation Terms</a>
            <span className="legal-dot">&bull;</span>
            <a href="/contact" onClick={(e) => handleNavClick(e, { route: "/contact" })}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
