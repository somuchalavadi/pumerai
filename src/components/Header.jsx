import { useEffect, useState } from "react";
import LogoMark from "./LogoMark.jsx";

const navItems = [
  { label: "Home", route: "/" },
  { label: "Rooms", route: "/rooms" },
  { label: "Dining", route: "/dining" },
  { label: "Bar & Lounge", route: "/bar-lounge" },
  { label: "Gallery", route: "/gallery" },
  { label: "Location", route: "/location" },
  { label: "Contact", route: "/contact" },
];

export default function Header({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleNavigate = (event, item) => {
    event.preventDefault();
    setIsOpen(false);

    if (item.route === currentPath) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    onNavigate(item);
  };

  const handleOpenBooking = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("pumerai:open-booking"));
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        {/* Brand Logo & Name */}
        <a
          className="brand"
          href="/"
          onClick={(event) => handleNavigate(event, { route: "/" })}
          aria-label="Hotel Pumerai Home"
        >
          <LogoMark src="/Untitled%20design%20(22)_result.webp" />
          <div className="brand-text-wrap">
            <span className="brand-text">HOTEL PUMERAI</span>
            <span className="brand-sub">Honnavar &bull; NH-66</span>
          </div>
        </a>

        {/* Desktop Navigation: Home | Rooms | Dining | Gallery | Location | Contact */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = item.route === currentPath;
            return (
              <a
                key={item.route}
                href={item.route}
                className={isActive ? "is-active" : ""}
                onClick={(event) => handleNavigate(event, item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Header Right Group: Book Now CTA & Mobile Hamburger */}
        <div className="header-right-group">
          <button
            type="button"
            className="button-primary header-book-btn"
            onClick={handleOpenBooking}
            aria-label="Book Now at Hotel Pumerai"
          >
            BOOK NOW
          </button>

          {/* Minimal Mobile Hamburger Button (44x44px tap target) */}
          <button
            className={`menu-toggle ${isOpen ? "is-active" : ""}`}
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="bar-top" />
            <span className="bar-mid" />
            <span className="bar-bot" />
          </button>
        </div>
      </div>

      {/* Lightweight Mobile Drawer (Minimal, no mega-menus) */}
      <div
        className={`mobile-nav-drawer ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="mobile-drawer-backdrop" onClick={() => setIsOpen(false)} />
        <div className="mobile-drawer-body">
          <div className="mobile-drawer-header">
            <span className="drawer-title">Hotel Pumerai &bull; Menu</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              &times;
            </button>
          </div>

          <nav className="mobile-drawer-nav" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = item.route === currentPath;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={(e) => handleNavigate(e, item)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mobile-drawer-actions">
            <button
              type="button"
              className="button-primary mobile-drawer-book-btn"
              onClick={handleOpenBooking}
            >
              BOOK NOW
            </button>

            <div className="mobile-drawer-contact">
              <a href="tel:+919845423223" className="drawer-contact-item">
                <span className="label">Reservations:</span>
                <span className="val">+91 98454 23223</span>
              </a>
              <a
                href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability"
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-contact-item"
              >
                <span className="label">WhatsApp:</span>
                <span className="val">Instant Chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
