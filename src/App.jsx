import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProgressingPage from "./components/ProgressingPage.jsx";
import HeroSequence from "./sections/HeroSequence.jsx";
import About from "./sections/About.jsx";
import Rooms from "./sections/Rooms.jsx";
import { useSectionReveals } from "./hooks/useSectionReveals.js";

const routes = new Set(["/", "/gallery", "/contact"]);

function normalizePath(path) {
  return routes.has(path) ? path : "/";
}

function HomePage() {
  return (
    <main>
      <HeroSequence />
      <About />
      <Rooms />
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
      <ProgressingPage title="Gallery" />
    ) : path === "/contact" ? (
      <ProgressingPage title="Contact" />
    ) : (
      <HomePage />
    );

  return (
    <>
      <Header currentPath={path} onNavigate={navigate} />
      {page}
      <Footer onNavigate={navigate} />
    </>
  );
}

export default App;
