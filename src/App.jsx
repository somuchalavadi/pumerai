import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import GalleryPage from "./components/GalleryPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import HeroSequence from "./sections/HeroSequence.jsx";
import About from "./sections/About.jsx";
import Rooms from "./sections/Rooms.jsx";
import Experience from "./sections/Experience.jsx";
import Dining from "./sections/Dining.jsx";
import Location from "./sections/Location.jsx";
import { useSectionReveals } from "./hooks/useSectionReveals.js";

const routes = new Set(["/", "/gallery", "/contact"]);

function normalizePath(path) {
  return routes.has(path) ? path : "/";
}

function HomePage({ onNavigate }) {
  return (
    <main>
      <HeroSequence onNavigate={onNavigate} />
      <About />
      <Rooms onNavigate={onNavigate} />
      <Experience />
      <Dining />
      <Location onNavigate={onNavigate} />
    </main>
  );
}

function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [pendingSection, setPendingSection] = useState(null);
  useSectionReveals();

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
      setPendingSection(null);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (path !== "/") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const sectionId = pendingSection || "home";
    window.requestAnimationFrame(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({
          behavior: pendingSection ? "smooth" : "auto",
          block: "start",
        });
      }
    });
  }, [path, pendingSection]);

  const navigate = ({ route, section }) => {
    const nextPath = normalizePath(route);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setPath(nextPath);
    setPendingSection(section || null);
  };

  const page =
    path === "/gallery" ? (
      <GalleryPage />
    ) : path === "/contact" ? (
      <ContactPage />
    ) : (
      <HomePage onNavigate={navigate} />
    );

  return (
    <div className="site-wrapper">
      <Header currentPath={path} onNavigate={navigate} />
      {page}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
