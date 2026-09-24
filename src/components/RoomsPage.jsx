import { useState, useEffect } from "react";
import { rooms } from "../data/rooms.js";
import RoomImage from "./RoomImage.jsx";

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

  const handleBookRoom = (roomSlug) => {
    window.dispatchEvent(
      new CustomEvent("pumerai:open-booking", { detail: { room: roomSlug } })
    );
  };

  return (
    <main className="page-shell rooms-page-shell">
      {/* Rooms Page Hero Banner */}
      <section className="page-hero-banner" aria-labelledby="rooms-page-heading">
        <div className="section-container">
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>ACCOMMODATION &bull; HONNĀVAR</span>
          </div>
          <h1 id="rooms-page-heading" className="page-main-heading">
            Rooms &amp; Suites at <br />
            <span className="title-italic">Hotel Pumerai Honnavar</span>
          </h1>
          <p className="page-main-desc">
            Explore our collection of contemporary rooms and suites in Honnāvar.
          </p>
        </div>
      </section>

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
                      <div className="room-badge-top">
                        <span className="room-size-badge">{room.size}</span>
                        <span className="room-sleeps-badge">{room.occupancy}</span>
                      </div>
                    </figure>

                    {/* Thumbnail Selector Strip (cover.jpg, 1.jpg, 2.jpg, 3.jpg) */}
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
                      <span className="room-tagline">{room.tagline}</span>
                      <h2 className="room-name" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                        {room.name}
                      </h2>
                    </div>

                    {/* Specifications Row */}
                    <div className="room-specs-row">
                      <div className="spec-item">
                        <span className="spec-label">BED TYPE</span>
                        <span className="spec-value">{room.bedType}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">ROOM SIZE</span>
                        <span className="spec-value">{room.size}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">MAX OCCUPANCY</span>
                        <span className="spec-value">{room.occupancy}</span>
                      </div>
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
                      <span className="features-title">Room Highlights &amp; Inclusions:</span>
                      <ul className="room-features-list">
                        {(isExpanded ? room.highlights : room.highlights.slice(0, 4)).map((item) => (
                          <li key={item} className="feature-item">
                            <span className="feature-bullet">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="room-details-toggle-btn"
                      onClick={() => toggleDetails(room.slug)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Show Less Details ↑" : "View Full Details & Amenities ↓"}
                    </button>

                    {/* Pricing & CTA Row */}
                    <div className="room-pricing-cta-row">
                      <div className="room-price-block">
                        <span className="price-prefix">From</span>
                        <div className="price-amount-wrap">
                          <span className="price-currency">₹</span>
                          <span className="price-number">
                            {room.startingPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="price-period">/ night</span>
                        </div>
                        <span className="price-note">Direct rate &bull; Free breakfast</span>
                      </div>

                      <div className="room-action-buttons">
                        <button
                          type="button"
                          className="button-primary room-book-btn"
                          onClick={() => handleBookRoom(room.slug)}
                          aria-label={`Book ${room.name} directly`}
                        >
                          BOOK THIS ROOM
                        </button>
                      </div>
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
