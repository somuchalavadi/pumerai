import { useState, useEffect, useCallback } from "react";
import { galleryItems, galleryCategories } from "../data/gallery.js";
import RoomImage from "../components/RoomImage.jsx";

export default function GallerySection({ isStandalonePage = false }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className={`section gallery-section ${isStandalonePage ? "gallery-page-view" : ""}`} id="gallery" aria-labelledby="gallery-heading">
      <div className="section-container">
        {/* Section Header (homepage only; standalone gallery page uses its own single hero intro) */}
        {!isStandalonePage && (
          <header className="section-header-split" data-reveal>
            <div className="header-meta">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>VISUAL ARCHIVE &bull; HOTEL PUMERAI</span>
              </div>
              <h2 id="gallery-heading" className="section-title">
                Moments of calm <br />
                <span className="title-italic">&amp; coastal warmth.</span>
              </h2>
            </div>
            <p className="header-summary">
              Explore authentic photographs of Hotel Pumerai. From our garden view rooms and glass-edge swimming pool
              to our coastal restaurants and the lush landscapes of Honnavar.
            </p>
          </header>
        )}

        {/* Category Tabs: Pool / Exterior / Dining / Lobby / Rooms */}
        <div className="gallery-tabs-row" data-reveal role="tablist" aria-label="Gallery category filters">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`gallery-tab-btn ${activeCategory === cat.id ? "is-active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              {activeCategory === cat.id && <span className="tab-active-indicator" />}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-photos-grid" data-reveal>
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className="gallery-photo-card"
              onClick={() => handleOpenLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpenLightbox(idx)}
              aria-label={`View photo: ${item.title}`}
            >
              <figure className="gallery-figure">
                <RoomImage
                  src={item.src}
                  fallback={item.fallback}
                  alt={item.alt}
                  loading="lazy"
                  className="gallery-image"
                />
                <div className="gallery-card-overlay">
                  <span className="overlay-category">{item.categoryLabel}</span>
                  <h4 className="overlay-title">{item.title}</h4>
                  <span className="overlay-zoom-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </div>
              </figure>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label={currentItem.title}>
          <div className="lightbox-backdrop" onClick={handleCloseLightbox} />

          <button
            type="button"
            className="lightbox-close-btn"
            onClick={handleCloseLightbox}
            aria-label="Close photo preview (Escape)"
          >
            &times;
          </button>

          <button
            type="button"
            className="lightbox-nav-btn lightbox-prev"
            onClick={handlePrev}
            aria-label="Previous image (Left arrow)"
          >
            &#8249;
          </button>

          <button
            type="button"
            className="lightbox-nav-btn lightbox-next"
            onClick={handleNext}
            aria-label="Next image (Right arrow)"
          >
            &#8250;
          </button>

          <div className="lightbox-content-box">
            <figure className="lightbox-figure">
              <RoomImage
                src={currentItem.src}
                fallback={currentItem.fallback}
                alt={currentItem.alt}
                className="lightbox-full-image"
              />
              <figcaption className="lightbox-caption">
                <div className="lightbox-caption-top">
                  <span className="lightbox-cat-badge">{currentItem.categoryLabel}</span>
                  <span className="lightbox-counter">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </span>
                </div>
                <h3 className="lightbox-image-title">{currentItem.title}</h3>
                <p className="lightbox-image-copy">{currentItem.caption}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </section>
  );
}
