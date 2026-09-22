import LogoMark from "./LogoMark.jsx";

const navigation = [
  { label: "HOME", route: "/", section: "home" },
  { label: "ABOUT", route: "/", section: "about" },
  { label: "ROOMS", route: "/", section: "rooms" },
  { label: "GALLERY", route: "/gallery" },
  { label: "CONTACT", route: "/contact" },
];

function Footer({ onNavigate }) {
  const handleNavigate = (event, item) => {
    event.preventDefault();
    onNavigate(item);
  };

  return (
    <footer className="site-footer">
      <a className="footer-brand" href="/" onClick={(event) => handleNavigate(event, navigation[0])}>
        <LogoMark />
      </a>
      <nav aria-label="Footer navigation">
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
      <p className="footer-copy">© 2026 Pumerai Hotel. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
