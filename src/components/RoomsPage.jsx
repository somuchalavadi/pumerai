import { useState, useEffect } from "react";
import { rooms } from "../data/rooms.js";
import RoomImage from "./RoomImage.jsx";
import PageHeader from "./PageHeader.jsx";

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDateString() {
  return formatLocalDate(new Date());
}

function getOffsetDateString(baseDateStr, offsetDays = 1) {
  let d;
  if (baseDateStr && typeof baseDateStr === "string") {
    const parts = baseDateStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      d = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      d = new Date();
    }
  } else {
    d = new Date();
  }
  d.setDate(d.getDate() + offsetDays);
  return formatLocalDate(d);
}

export default function RoomsPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState({});
  const [expandedDetails, setExpandedDetails] = useState({});
  const [bookingRoom, setBookingRoom] = useState(null);
  const [popupCheckIn, setPopupCheckIn] = useState(() => getTodayDateString());
  const [popupCheckOut, setPopupCheckOut] = useState(() => getOffsetDateString(getTodayDateString(), 1));
  const [popupGuests, setPopupGuests] = useState("2 Adults");

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

  const handleStartBooking = (room) => {
    setBookingRoom(room);
    const today = getTodayDateString();
    setPopupCheckIn(today);
    setPopupCheckOut(getOffsetDateString(today, 1));
    setPopupGuests("2 Adults");
  };

  const handlePopupCheckInChange = (e) => {
    const newIn = e.target.value;
    if (!newIn) return;
    const today = getTodayDateString();
    const effectiveIn = newIn < today ? today : newIn;
    setPopupCheckIn(effectiveIn);
    if (popupCheckOut <= effectiveIn) {
      setPopupCheckOut(getOffsetDateString(effectiveIn, 1));
    }
  };

  const handlePopupCheckOutChange = (e) => {
    const newOut = e.target.value;
    if (!newOut) return;
    const minOut = getOffsetDateString(popupCheckIn, 1);
    if (newOut < minOut) {
      setPopupCheckOut(minOut);
    } else {
      setPopupCheckOut(newOut);
    }
  };

  const handleContinueBooking = (e) => {
    e.preventDefault();
    if (!bookingRoom) return;

    const selectedRoomSlug = bookingRoom.slug;
    const checkIn = popupCheckIn;
    const checkOut = popupCheckOut;
    const guests = popupGuests;

    // Close popup
    setBookingRoom(null);

    // Open existing Pumerai booking flow with selected room, dates, and guests
    window.dispatchEvent(
      new CustomEvent("pumerai:open-booking", {
        detail: {
          room: selectedRoomSlug,
          checkIn,
          checkOut,
          guests,
          step: "request",
        },
      })
    );
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

                    {/* Clean expandable information */}
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
                        {isExpanded ? "Show Less Details ↑" : "View Full Details ↓"}
                      </button>

                      {/* Booking CTA Button: Opens Date & Guest Selection First */}
                      <button
                        type="button"
                        onClick={() => handleStartBooking(room)}
                        className="button-whatsapp-instant room-whatsapp-btn"
                        aria-label={`Book ${room.name} on WhatsApp`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        <span>BOOK ON WHATSAPP</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Small Date & Guest Selection Popup for Room Booking */}
      {bookingRoom && (
        <div className="room-booking-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="room-popup-title">
          <div className="room-booking-popup-backdrop" onClick={() => setBookingRoom(null)} />
          <div className="room-booking-popup-box">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setBookingRoom(null)}
              aria-label="Close date and guest selection"
            >
              &times;
            </button>

            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>HOTEL PUMERAI &bull; DIRECT RESERVATION</span>
            </div>

            <h3 id="room-popup-title" className="room-popup-title">
              Select Dates &amp; Guests
            </h3>

            <p className="room-popup-room-badge">
              Room Selected: <strong>{bookingRoom.name}</strong>
            </p>

            <form onSubmit={handleContinueBooking} className="room-popup-form">
              <div className="room-popup-grid-2">
                <div className="form-group">
                  <label htmlFor="popup-checkin">Check-In Date *</label>
                  <input
                    id="popup-checkin"
                    type="date"
                    min={getTodayDateString()}
                    value={popupCheckIn}
                    onChange={handlePopupCheckInChange}
                    required
                    className="modal-form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="popup-checkout">Check-Out Date *</label>
                  <input
                    id="popup-checkout"
                    type="date"
                    min={getOffsetDateString(popupCheckIn, 1)}
                    value={popupCheckOut}
                    onChange={handlePopupCheckOutChange}
                    required
                    className="modal-form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="popup-guests">Number of Guests *</label>
                <select
                  id="popup-guests"
                  value={popupGuests}
                  onChange={(e) => setPopupGuests(e.target.value)}
                  className="modal-form-input modal-form-select"
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="3 Adults">3 Adults</option>
                  <option value="4+ Family">4+ Family</option>
                </select>
              </div>

              <div className="room-popup-actions">
                <button type="submit" className="button-primary room-popup-submit-btn">
                  <span>CONTINUE</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
