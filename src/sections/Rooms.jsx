import { useState } from "react";
import { rooms } from "../data/rooms.js";
import RoomImage from "../components/RoomImage.jsx";

const includedEssentials = [
  "Daily Hot Breakfast Buffet Included",
  "High-Speed Wi-Fi (100+ Mbps)",
  "Access to Indoor & Kids Swimming Pool",
  "Free Secure Self-Parking with EV Charging",
  "24-Hour Front Desk & Daily Housekeeping",
  "Complimentary Manager's Evening Reception",
];

export default function Rooms() {
  // Track active photo index per room card by slug
  const [activePhotoMap, setActivePhotoMap] = useState({});

  const handleSelectPhoto = (roomSlug, photoIndex) => {
    setActivePhotoMap((prev) => ({ ...prev, [roomSlug]: photoIndex }));
  };

  const handleBookRoom = (roomSlug) => {
    window.dispatchEvent(new CustomEvent("pumerai:open-booking", { detail: { room: roomSlug } }));
  };

  return (
    <section className="section rooms-section" id="rooms" aria-labelledby="rooms-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ACCOMMODATION &bull; HONNAVAR</span>
            </div>
            <h2 id="rooms-heading" className="section-title">
              Thoughtful spaces for <br />
              <span className="title-italic">rest &amp; renewal.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              40 meticulously appointed guestrooms positioned along NH-66 in Honnavar across seven distinct categories.
              Designed with quiet acoustic insulation, refined coastal materials, and modern conveniences.
            </p>
            <div className="direct-booking-pill">
              <span className="pill-check">&#x2713;</span>
              <span>Best Rate Guarantee: Book direct &amp; save 10% + free breakfast</span>
            </div>
          </div>
        </header>

        {/* Real Room Selection Grid (All 7 Categories) */}
        <div className="rooms-grid">
          {rooms.map((room) => {
            const activeIndex = activePhotoMap[room.slug] || 0;
            const currentPhotoSrc = room.galleryPhotos[activeIndex] || room.coverImage;
            const currentFallbackSrc = (room.fallbackGallery && room.fallbackGallery[activeIndex]) || room.fallbackImage;

            return (
              <article className="room-card" key={room.slug} id={room.slug} data-reveal>
                {/* Multi-Photo Carousel / Switcher */}
                <div className="room-media-box">
                  <figure className="room-main-figure">
                    <RoomImage
                      src={currentPhotoSrc}
                      fallback={currentFallbackSrc}
                      alt={`${room.name} at Hotel Pumerai Honnavar`}
                      loading="lazy"
                      className="room-main-image"
                    />
                    <div className="room-badge-top">
                      <span className="room-size-badge">{room.size}</span>
                      <span className="room-sleeps-badge">{room.occupancy}</span>
                    </div>
                  </figure>

                  {/* Thumbnail Row */}
                  <div className="room-thumbnails-strip" aria-label={`Photos of ${room.name}`}>
                    {room.galleryPhotos.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPhoto(room.slug, idx)}
                        className={`room-thumb-btn ${idx === activeIndex ? "is-active" : ""}`}
                        aria-label={`View photo ${idx + 1} of ${room.name}`}
                      >
                        <RoomImage
                          src={photo}
                          fallback={(room.fallbackGallery && room.fallbackGallery[idx]) || room.fallbackImage}
                          alt=""
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Room Info & Details */}
                <div className="room-card-content">
                  <div className="room-header-meta">
                    <span className="room-tagline">{room.tagline}</span>
                    <h3 className="room-name">{room.name}</h3>
                  </div>

                  {/* Key Specifications Pill Row */}
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
                      <span className="spec-label">CAPACITY</span>
                      <span className="spec-value">{room.occupancy}</span>
                    </div>
                  </div>

                  <p className="room-description">{room.shortDescription || room.fullDescription}</p>

                  {/* Feature Highlights */}
                  <div className="room-features-box">
                    <span className="features-title">Room Inclusions:</span>
                    <ul className="room-features-list">
                      {room.highlights.slice(0, 5).map((feat) => (
                        <li key={feat} className="feature-item">
                          <span className="feature-bullet">&bull;</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking CTA Row */}
                  <div className="room-pricing-cta-row" style={{ justifyContent: "flex-end" }}>
                    <a
                      href={`https://wa.me/919845423223?text=${encodeURIComponent(
                        `Hello Hotel Pumerai, I would like to inquire about booking the ${room.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-whatsapp-instant"
                      style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}
                      aria-label={`Book ${room.name} on WhatsApp`}
                    >
                      BOOK ON WHATSAPP
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Property Room Standard Guarantee */}
        <div className="room-standards-banner" data-reveal>
          <div className="standards-header">
            <span className="standards-tag">PROPERTY STANDARD &bull; HOTEL PUMERAI</span>
            <h4 className="standards-title">Every room booking always includes:</h4>
          </div>
          <div className="standards-grid">
            {includedEssentials.map((item) => (
              <div className="standard-pill" key={item}>
                <span className="standard-check">&#x2713;</span>
                <span className="standard-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
