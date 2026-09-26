import { useState, useEffect, useCallback, useRef } from "react";
import { galleryItems, galleryCategories } from "../data/gallery.js";
import RoomImage from "../components/RoomImage.jsx";

export default function GallerySection({ isStandalonePage = false, onNavigate }) {
  // Standalone Page States
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Homepage Slider States
  const baseCount = galleryItems.length;
  // 3 duplicate cycles for seamless, endless looping
  const slides = [...galleryItems, ...galleryItems, ...galleryItems];
  const [currentIndex, setCurrentIndex] = useState(baseCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const viewportRef = useRef(null);
  const touchStartX = useRef(null);

  // Measure viewport width for pixel-precise translate calculations
  useEffect(() => {
    if (isStandalonePage || !viewportRef.current) return;

    const updateWidth = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };

    updateWidth();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setViewportWidth(entry.contentRect.width);
        }
      }
    });

    ro.observe(viewportRef.current);
    window.addEventListener("resize", updateWidth);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [isStandalonePage]);

  // Autoplay interval
  useEffect(() => {
    if (isStandalonePage || isPaused || lightboxIndex !== null) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3200);

    return () => clearInterval(timer);
  }, [isStandalonePage, isPaused, lightboxIndex]);

  // Infinite loop wrapping on transition end
  const handleTransitionEnd = () => {
    if (currentIndex >= baseCount * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - baseCount);
    } else if (currentIndex < baseCount) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + baseCount);
    }
  };

  // Restore transition after instantaneous index wrap
  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Touch swipe support on mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 35) {
        handleNextSlide();
      } else if (diff < -35) {
        handlePrevSlide();
      }
      touchStartX.current = null;
    }
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Responsive calculations: Desktop = 4 visible, Mobile/Tablet = 3 visible
  const getVisibleCount = (width) => {
    if (width >= 1024) return 4;
    return 3;
  };

  const getGap = (width) => {
    if (width >= 1024) return 16;
    if (width >= 768) return 12;
    if (width <= 360) return 6;
    return 8;
  };

  let trackStyle = {};
  if (viewportWidth > 0) {
    const visibleCount = getVisibleCount(viewportWidth);
    const gap = getGap(viewportWidth);
    const slideWidth = (viewportWidth - (visibleCount - 1) * gap) / visibleCount;
    const step = slideWidth + gap;
    const translateX = -1 * currentIndex * step;

    trackStyle = {
      transform: `translate3d(${translateX}px, 0, 0)`,
      transition: isTransitioning ? "transform 650ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
    };
  } else {
    trackStyle = {
      transform: `translate3d(calc(-1 * ${currentIndex} * (100% + var(--gallery-gap)) / var(--visible-items)), 0, 0)`,
      transition: isTransitioning ? "transform 650ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
    };
  }

  // Lightbox handlers
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
    const items = isStandalonePage ? filteredItems : galleryItems;
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  }, [isStandalonePage, filteredItems]);

  const handleNext = useCallback(() => {
    const items = isStandalonePage ? filteredItems : galleryItems;
    setLightboxIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  }, [isStandalonePage, filteredItems]);

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

  const currentLightboxItem = lightboxIndex !== null
    ? (isStandalonePage ? filteredItems[lightboxIndex] : galleryItems[lightboxIndex])
    : null;

  return (
    <section className={`section gallery-section ${isStandalonePage ? "gallery-page-view" : ""}`} id="gallery" aria-labelledby="gallery-heading">
      <div className="section-container">
        {/* Section Header (Homepage only; standalone gallery page uses its own single hero intro) */}
        {!isStandalonePage && (
          <header className="section-header-split" data-reveal>
            <div className="header-meta">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>Visual Archive &bull; Hotel Pumerai</span>
              </div>
              <h2 id="gallery-heading" className="section-title">
                Moments of calm <br />
                <span className="title-italic">&amp; coastal warmth.</span>
              </h2>
            </div>
            <div className="header-summary-block">
              <p className="header-summary">
                Explore authentic photographs of Hotel Pumerai. From our garden view rooms and glass-edge swimming pool
                to our coastal restaurants and the lush landscapes of Honnavar.
              </p>
              <div className="gallery-slider-actions">
                <div className="gallery-nav-arrows" aria-label="Gallery slider controls">
                  <button
                    type="button"
                    className="gallery-nav-arrow prev"
                    onClick={handlePrevSlide}
                    aria-label="Previous gallery photo"
                  >
                    &#8249;
                  </button>
                  <button
                    type="button"
                    className="gallery-nav-arrow next"
                    onClick={handleNextSlide}
                    aria-label="Next gallery photo"
                  >
                    &#8250;
                  </button>
                </div>
                <a
                  href="/gallery"
                  className="button-secondary"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate({ route: "/gallery" });
                    }
                  }}
                  aria-label="Explore full photo gallery"
                >
                  <span>VIEW FULL GALLERY &rarr;</span>
                </a>
              </div>
            </div>
          </header>
        )}

        {/* HOMEPAGE: Horizontal Image Slider */}
        {!isStandalonePage ? (
          <div className="homepage-gallery-slider-wrapper" data-reveal>
            <div
              className="gallery-slider-viewport"
              ref={viewportRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="gallery-slider-track"
                style={trackStyle}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((item, idx) => (
                  <div className="gallery-slide-item" key={`slide-${item.id}-${idx}`}>
                    <figure
                      className="gallery-slide-figure"
                      onClick={() => handleOpenLightbox(idx % baseCount)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpenLightbox(idx % baseCount)}
                      aria-label={`View photo: ${item.title}`}
                    >
                      <RoomImage
                        src={item.src}
                        fallback={item.fallback}
                        alt={item.alt}
                        loading="lazy"
                        className="gallery-slide-img"
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STANDALONE GALLERY PAGE: Exact existing category tabs & grid */
          <>
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
                  </figure>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label={currentLightboxItem.title}>
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
                src={currentLightboxItem.src}
                fallback={currentLightboxItem.fallback}
                alt={currentLightboxItem.alt}
                className="lightbox-full-image"
              />
              <figcaption className="lightbox-caption">
                <div className="lightbox-caption-top">
                  <span className="lightbox-cat-badge">{currentLightboxItem.categoryLabel}</span>
                  <span className="lightbox-counter">
                    {lightboxIndex + 1} / {(isStandalonePage ? filteredItems : galleryItems).length}
                  </span>
                </div>
                <h3 className="lightbox-image-title">{currentLightboxItem.title}</h3>
                <p className="lightbox-image-copy">{currentLightboxItem.caption}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </section>
  );
}
