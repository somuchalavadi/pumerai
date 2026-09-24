import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookingBar from "./components/BookingBar.jsx";
import MobileQuickActions from "./components/MobileQuickActions.jsx";
import RoomsPage from "./components/RoomsPage.jsx";
import DiningPage from "./components/DiningPage.jsx";
import GalleryPage from "./components/GalleryPage.jsx";
import LocationPage from "./components/LocationPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import BarLoungePage from "./components/BarLoungePage.jsx";
import SEOHead from "./components/SEOHead.jsx";
import HeroSequence from "./sections/HeroSequence.jsx";
import About from "./sections/About.jsx";
import RoomsPreview from "./sections/RoomsPreview.jsx";
import OffersBanner from "./sections/OffersBanner.jsx";
import AmenitiesGrid from "./sections/AmenitiesGrid.jsx";
import Dining from "./sections/Dining.jsx";
import TrustReviews from "./sections/TrustReviews.jsx";
import GallerySection from "./sections/GallerySection.jsx";
import Location from "./sections/Location.jsx";
import FAQ from "./sections/FAQ.jsx";
import WebsiteLoader from "./components/WebsiteLoader.jsx";
import { useSectionReveals } from "./hooks/useSectionReveals.js";

const routes = new Set(["/", "/rooms", "/dining", "/bar-lounge", "/gallery", "/location", "/contact"]);

function normalizePath(path) {
  return routes.has(path) ? path : "/";
}

function HomePage({ onNavigate }) {
  return (
    <main id="main-content">
      <HeroSequence onNavigate={onNavigate} />
      <BookingBar isHomeSection={true} />
      <About />
      <RoomsPreview onNavigate={onNavigate} />
      <OffersBanner />
      <AmenitiesGrid />
      <Dining />
      <TrustReviews />
      <GallerySection />
      <Location />
      <FAQ />
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
    if (path === "/") {
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
      return;
    }

    // For subpages (/rooms, /dining, /gallery, /location, /contact)
    if (pendingSection) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(pendingSection);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
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
    path === "/rooms" ? (
      <RoomsPage />
    ) : path === "/dining" ? (
      <DiningPage onNavigate={navigate} />
    ) : path === "/bar-lounge" ? (
      <BarLoungePage onNavigate={navigate} />
    ) : path === "/gallery" ? (
      <GalleryPage />
    ) : path === "/location" ? (
      <LocationPage />
    ) : path === "/contact" ? (
      <ContactPage />
    ) : (
      <HomePage onNavigate={navigate} />
    );

  return (
    <>
      <WebsiteLoader />
      <SEOHead path={path} />
      <div className="site-wrapper">
        <Header currentPath={path} onNavigate={navigate} />
        {path !== "/" && <BookingBar />}
        {page}
        <Footer onNavigate={navigate} />
        <MobileQuickActions />
      </div>
    </>
  );
}

export default App;
