import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import LogoMark from "./LogoMark.jsx";

const navigation = [
  { label: "HOME", route: "/", section: "home" },
  { label: "ABOUT", route: "/", section: "about" },
  { label: "ROOMS", route: "/", section: "rooms" },
  { label: "GALLERY", route: "/gallery" },
  { label: "CONTACT", route: "/contact" },
];

function Header({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
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
      <a className="brand" href="/" onClick={(event) => handleNavigate(event, navigation[0])}>
        <LogoMark />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a
            key={`${item.route}-${item.section || item.label}`}
            href={item.section ? `/#${item.section}` : item.route}
            onClick={(event) => handleNavigate(event, item)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-nav ${isOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a
              key={`${item.route}-${item.section || item.label}`}
              href={item.section ? `/#${item.section}` : item.route}
              onClick={(event) => handleNavigate(event, item)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
