import { useState, useEffect } from "react";
import { rooms } from "../data/rooms.js";
import RoomImage from "./RoomImage.jsx";
import PageHeader from "./PageHeader.jsx";

export default function RoomsPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState({});
  const [expandedDetails, setExpandedDetails] = useState({});

  // Scroll to anchor if URL contains hash (e.g. /rooms#family-suite-room)
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, []);

  const handleSelectPhoto = (slug, index) => {
    setActivePhotoIndex((prev) => ({ ...prev, [slug]: index }));
  };

  const toggleDetails = (slug) => {
    setExpandedDetails((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <main className="page-shell rooms-page-shell">
      {/* Standardized Compact Internal Page Header */}
      <PageHeader
        eyebrow="ACCOMMODATION • HONNĀVAR"
        title="Rooms & Suites at"
        italicTitle="Hotel Pumerai Honnavar"
        description="Explore our collection of contemporary rooms and suites in Honnāvar."
        id="rooms-page-heading"
      />

      {/* Complete Rooms Grid: All 7 Categories */}
      <section className="section rooms-full-listing-section">
        <div className="section-container">
          <div className="rooms-grid">
            {rooms.map((room) => {
              const photoIdx = activePhotoIndex[room.slug] || 0;
              const isExpanded = !!expandedDetails[room.slug];
              const currentPhotoSrc = room.galleryPhotos[photoIdx];
              const currentFallbackSrc = room.fallbackGallery[photoIdx] || room.fallbackImage;

              return (
                <article
                  className="room-card room-card-full"
                  id={room.slug}
                  key={room.slug}
                  data-reveal
                >
                  {/* Photo Switcher Box */}
                  <div className="room-media-box">
                    <figure className="room-main-figure">
                      <RoomImage
                        src={currentPhotoSrc}
                        fallback={currentFallbackSrc}
                        alt={`${room.name} at Hotel Pumerai Honnavar`}
                        className="room-main-image"
                        loading="lazy"
                      />
                    </figure>

                    {/* Thumbnail Selector Strip */}
                    <div
                      className="room-thumbnails-strip"
                      aria-label={`Photo gallery for ${room.name}`}
                    >
                      {room.galleryPhotos.map((photo, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectPhoto(room.slug, idx)}
                          className={`room-thumb-btn ${idx === photoIdx ? "is-active" : ""}`}
                          aria-label={`View photo ${idx + 1} of ${room.name}`}
                        >
                          <RoomImage
                            src={photo}
                            fallback={room.fallbackGallery[idx] || room.fallbackImage}
                            alt=""
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Details & Actions */}
                  <div className="room-card-content">
                    <div className="room-header-meta">
                      <span className="room-tagline">{room.tagline || "ACCOMMODATION • HONNAVAR"}</span>
                      <h2 className="room-name">
                        {room.name}
                      </h2>
                    </div>

                    {/* Specifications Row: Bed | Size | Occupancy */}
                    <div className="room-specs-row">
                      <span className="spec-pill">{room.bedType}</span>
                      <span className="spec-divider" aria-hidden="true">&bull;</span>
                      <span className="spec-pill">{room.size}</span>
                      <span className="spec-divider" aria-hidden="true">&bull;</span>
                      <span className="spec-pill">{room.occupancy}</span>
                    </div>

                    {/* Descriptions */}
                    <p className="room-description">{room.shortDescription}</p>

                    {isExpanded && (
                      <div className="room-full-description-panel">
                        <p className="room-detailed-text">{room.fullDescription}</p>
                      </div>
                    )}

                    {/* Inclusions Highlights */}
                    <div className="room-features-box">
                      <span className="features-title">Highlights &amp; Amenities:</span>
                      <ul className="room-features-list">
                        {(isExpanded ? room.highlights : room.highlights.slice(0, 3)).map((item) => (
                          <li key={item} className="feature-item">
                            <span className="feature-bullet">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="room-card-bottom-actions">
                      <button
                        type="button"
                        className="room-details-toggle-btn"
                        onClick={() => toggleDetails(room.slug)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Show Less Details ↑" : "View Full Details & Amenities ↓"}
                      </button>

                      {/* Booking CTA Button */}
                      <a
                        href={`https://wa.me/919845423223?text=${encodeURIComponent(
                          `Hello Hotel Pumerai, I would like to inquire about booking the ${room.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-whatsapp-instant room-whatsapp-btn"
                        aria-label={`Book ${room.name} on WhatsApp`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        <span>BOOK ON WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
