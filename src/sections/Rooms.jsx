import { useState } from "react";
import { roomPhotoSets } from "../utils/frames.js";

const roomsData = [
  {
    id: "comfort",
    name: "Comfort Room Garden View",
    tagline: "Serene Garden Outlook",
    size: "315 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed or 2 Twins",
    price: 2999,
    photos: roomPhotoSets.comfortGarden,
    description:
      "Contemporary sanctuary framed by tranquil courtyard garden views. Features sound-insulated architecture, a dedicated work desk, and a walk-in rain shower.",
    features: [
      "Courtyard garden view",
      "Free WiFi (100+ Mbps)",
      "43\" 4K Smart TV",
      "Split silent AC",
      "Electric tea/coffee maker",
      "Digital electronic safe",
      "Walk-in rain shower",
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe Pool View Room",
    tagline: "Private Balcony Overlooking Pool",
    size: "400 sq ft",
    occupancy: "Sleeps 3",
    bedType: "1 King Bed + Daybed",
    price: 3999,
    photos: roomPhotoSets.deluxePool,
    description:
      "Generous living space featuring a private glass balcony directly facing the signature glass-edge swimming pool. Includes an expanded seating lounge and mini refrigerator.",
    features: [
      "Private glass balcony",
      "Direct swimming pool view",
      "Expanded seating lounge",
      "50\" 4K Smart TV",
      "Mini refrigerator",
      "Luxury bath toiletries",
      "Daily mineral water",
    ],
  },
  {
    id: "suite",
    name: "Executive Family Suite",
    tagline: "Spacious Multi-Room Comfort",
    size: "520 sq ft",
    occupancy: "Sleeps 4",
    bedType: "1 King Bed + Sofa Bed",
    price: 5499,
    photos: roomPhotoSets.executiveSuite,
    description:
      "Thoughtfully arranged for family vacations along the Karnataka coast. Features an independent master bedroom, a separate living salon with sofa bed, and dual vanities.",
    features: [
      "Separate master & living rooms",
      "Accommodates up to 4 guests",
      "Dual vanity stone bathroom",
      "Walk-in rain shower",
      "Mini bar & dining nook",
      "Double wardrobe storage",
      "Pool & garden outlook",
    ],
  },
  {
    id: "heritage",
    name: "Premium Heritage Suite",
    tagline: "Elevated Karavali Luxury",
    size: "480 sq ft",
    occupancy: "Sleeps 2–3",
    bedType: "1 California King Bed",
    price: 4899,
    photos: roomPhotoSets.heritageSuite,
    description:
      "Our signature suite combining Karavali artisanal teak craftsmanship with modern luxury. Boasts a deep soaking bathtub, separate powder room, and premium espresso machine.",
    features: [
      "Deep soaking bathtub",
      "Karavali teak millwork",
      "Artisan espresso machine",
      "Separate powder lounge",
      "Panoramic coastal breeze view",
      "Upgraded organic toiletries",
      "Priority concierge service",
    ],
  },
];

const includedEssentials = [
  "Daily Hot Breakfast Buffet Included",
  "High-Speed Wi-Fi (100+ Mbps)",
  "Access to Indoor & Kids Swimming Pool",
  "Free Secure Self-Parking with EV Charging",
  "24-Hour Front Desk & Daily Housekeeping",
  "Complimentary Manager's Evening Reception",
];

export default function Rooms() {
  // Track active photo index per room card
  const [activePhotoMap, setActivePhotoMap] = useState({
    comfort: 0,
    deluxe: 0,
    suite: 0,
    heritage: 0,
  });

  const handleSelectPhoto = (roomId, photoIndex) => {
    setActivePhotoMap((prev) => ({ ...prev, [roomId]: photoIndex }));
  };

  const handleBookRoom = (roomId) => {
    window.dispatchEvent(new CustomEvent("pumerai:open-booking", { detail: { room: roomId } }));
  };

  return (
    <section className="section rooms-section" id="rooms" aria-labelledby="rooms-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ROOMS &amp; RATES &bull; HONNAVAR</span>
            </div>
            <h2 id="rooms-heading" className="section-title">
              Thoughtful spaces for <br />
              <span className="title-italic">rest &amp; renewal.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              40 meticulously appointed guestrooms positioned along NH-66 in Honnavar.
              Designed with quiet acoustic insulation, refined coastal materials, and modern conveniences.
            </p>
            <div className="direct-booking-pill">
              <span className="pill-check">&#x2713;</span>
              <span>Best Rate Guarantee: Book direct &amp; save 10% + free breakfast</span>
            </div>
          </div>
        </header>

        {/* Real Room Selection Grid */}
        <div className="rooms-grid">
          {roomsData.map((room) => {
            const activeIndex = activePhotoMap[room.id] || 0;
            const currentPhoto = room.photos[activeIndex] || room.photos[0];

            return (
              <article className="room-card" key={room.id} data-reveal>
                {/* Multi-Photo Carousel / Switcher */}
                <div className="room-media-box">
                  <figure className="room-main-figure">
                    <img
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      loading="lazy"
                      className="room-main-image"
                    />
                    <div className="room-badge-top">
                      <span className="room-size-badge">{room.size}</span>
                      <span className="room-sleeps-badge">{room.occupancy}</span>
                    </div>
                  </figure>

                  {/* Thumbnail Row (3-4 photos each) */}
                  <div className="room-thumbnails-strip" aria-label={`Photos of ${room.name}`}>
                    {room.photos.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPhoto(room.id, idx)}
                        className={`room-thumb-btn ${idx === activeIndex ? "is-active" : ""}`}
                        aria-label={`View photo ${idx + 1} of ${room.name}`}
                      >
                        <img src={photo.src} alt="" loading="lazy" />
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

                  <p className="room-description">{room.description}</p>

                  {/* Feature Highlights */}
                  <div className="room-features-box">
                    <span className="features-title">Room Inclusions:</span>
                    <ul className="room-features-list">
                      {room.features.slice(0, 5).map((feat) => (
                        <li key={feat} className="feature-item">
                          <span className="feature-bullet">&bull;</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA Row */}
                  <div className="room-pricing-cta-row">
                    <div className="room-price-block">
                      <span className="price-prefix">From</span>
                      <div className="price-amount-wrap">
                        <span className="price-currency">₹</span>
                        <span className="price-number">{room.price.toLocaleString("en-IN")}</span>
                        <span className="price-period">/ night</span>
                      </div>
                      <span className="price-note">Direct rate &bull; Free breakfast</span>
                    </div>

                    <div className="room-action-buttons">
                      <button
                        type="button"
                        className="button-primary room-book-btn"
                        onClick={() => handleBookRoom(room.id)}
                        aria-label={`Book ${room.name}`}
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
