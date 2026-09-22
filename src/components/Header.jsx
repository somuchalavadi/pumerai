import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
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

function Header({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const handleNavigate = (event, item) => {
    event.preventDefault();
    setIsOpen(false);

    if (item.route === "/" && currentPath === "/") {
      const target = document.getElementById(item.section || "home");
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
      return;
    }

    onNavigate(item);
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <a
          className="brand"
          href="/"
          onClick={(event) => handleNavigate(event, navigation[0])}
          aria-label="Hotel Pumerai Home"
        >
          <LogoMark />
          <span className="brand-text">HOTEL PUMERAI</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive =
              (item.route === currentPath && !item.section) ||
              (currentPath === "/" && item.route === "/" && item.section === "home");
            return (
              <a
                key={`${item.route}-${item.section || item.label}`}
                href={item.section ? `/#${item.section}` : item.route}
                className={isActive ? "is-active" : ""}
                onClick={(event) => handleNavigate(event, item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
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

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`mobile-nav-overlay ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="mobile-nav-backdrop" onClick={() => setIsOpen(false)} />
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <span className="mobile-brand-tag">HOTEL PUMERAI &bull; HONNAVAR</span>
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            {navigation.map((item, idx) => (
              <a
                key={`${item.route}-${item.section || item.label}`}
                href={item.section ? `/#${item.section}` : item.route}
                className="mobile-nav-item"
                style={{ animationDelay: `${idx * 45}ms` }}
                onClick={(event) => handleNavigate(event, item)}
              >
                <span className="mobile-nav-index">0{idx + 1}</span>
                <span className="mobile-nav-label">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mobile-nav-footer">
            <div className="mobile-contact-line">
              <span className="label">RESERVATIONS:</span>
              <a href="tel:+919845423223">+91 98454 23223</a>
            </div>
            <div className="mobile-location-line">
              <span>NH-66, near Ramateertha Cross, Honnavar</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
