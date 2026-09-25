import { useState, useEffect, useRef } from "react";
import { rooms } from "../data/rooms.js";
import RoomImage from "../components/RoomImage.jsx";

export default function RoomsPreview({ onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(null);

  // Responsive visible count: Desktop 3, Tablet 2, Mobile 1
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(3);
      } else if (width >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, rooms.length - visibleCount);

  // Keep index in valid bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 40) {
        handleNext();
      } else if (diff < -40) {
        handlePrev();
      }
      touchStartX.current = null;
    }
  };

  const handleRoomClick = (e, slug) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate({ route: "/rooms", section: slug });
    } else {
      window.location.href = `/rooms#${slug}`;
    }
  };

  const handleViewAllRooms = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate({ route: "/rooms" });
    } else {
      window.location.href = "/rooms";
    }
  };

  const gapPx = visibleCount === 3 ? 24 : visibleCount === 2 ? 16 : 12;

  return (
    <section className="section rooms-preview-section" id="rooms" aria-labelledby="rooms-preview-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>Accommodation • 7 Room Types</span>
            </div>
            <h2 id="rooms-preview-heading" className="section-title rooms-preview-main-title">
              <span className="rooms-title-primary">Our rooms</span>
              <span className="title-italic rooms-title-secondary">&amp; private retreats.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              40 quiet, sound-insulated guestrooms along NH-66 Honnavar.
              From garden-view rooms and pool balconies to spacious family suites, every space is planned for rest and renewal.
            </p>
            <div className="preview-all-action">
              <div className="rooms-slider-controls" aria-label="Room preview carousel controls">
                <button
                  type="button"
                  className="slider-nav-btn slider-prev-btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous rooms"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="slider-nav-btn slider-next-btn"
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next rooms"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
              <a
                href="/rooms"
                className="button-secondary"
                onClick={handleViewAllRooms}
                aria-label="View all seven rooms on dedicated rooms page"
              >
                <span>VIEW ALL 7 ROOM TYPES &rarr;</span>
              </a>
            </div>
          </div>
        </header>

        {/* Responsive 7-Room Preview Slider (Desktop 3, Tablet 2, Mobile 1) */}
        <div
          className="rooms-carousel-wrapper"
          data-reveal
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="rooms-carousel-track"
            style={{
              transform: `translateX(calc(-${currentIndex} * ((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount} + ${gapPx}px)))`,
              gap: `${gapPx}px`,
            }}
          >
            {rooms.map((room) => (
              <a
                key={room.slug}
                href={`/rooms#${room.slug}`}
                className="room-preview-card room-carousel-card"
                style={{
                  flex: `0 0 calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`,
                }}
                onClick={(e) => handleRoomClick(e, room.slug)}
                aria-label={`View details for ${room.name}`}
              >
                <figure className="room-preview-figure">
                  <RoomImage
                    src={room.coverImage}
                    fallback={room.fallbackImage}
                    alt={`${room.name} preview at Hotel Pumerai Honnavar`}
                    className="room-preview-img"
                    loading="lazy"
                  />
                  <div className="room-preview-badge">
                    <span>{room.size}</span>
                    <span className="badge-dot">&bull;</span>
                    <span>{room.occupancy}</span>
                  </div>
                </figure>

                <div className="room-preview-content">
                  <h3 className="room-preview-title">{room.name}</h3>
                  <span className="room-preview-link-text">
                    <span>View Details</span>
                    <span className="arrow-icon">&rarr;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Swipe Indicators */}
        <div className="rooms-carousel-dots" aria-hidden="true">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`carousel-dot ${dotIdx === currentIndex ? "is-active" : ""}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
