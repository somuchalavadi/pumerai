import { rooms } from "../data/rooms.js";
import RoomImage from "../components/RoomImage.jsx";

export default function RoomsPreview({ onNavigate }) {
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

  return (
    <section className="section rooms-preview-section" id="rooms" aria-labelledby="rooms-preview-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ACCOMMODATION &bull; 7 ROOM TYPES</span>
            </div>
            <h2 id="rooms-preview-heading" className="section-title">
              Our rooms <br />
              <span className="title-italic">&amp; private retreats.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              40 quiet, sound-insulated guestrooms along NH-66 Honnavar.
              From garden-view rooms and pool balconies to spacious family suites, every space is planned for rest and renewal.
            </p>
            <div className="preview-all-action">
              <a
                href="/rooms"
                className="button-secondary"
                onClick={handleViewAllRooms}
                aria-label="View all seven rooms on dedicated rooms page"
              >
                <span>VIEW ALL 7 ROOMS &amp; RATES &rarr;</span>
              </a>
            </div>
          </div>
        </header>

        {/* Compact 7-Room Preview Teaser Cards */}
        <div className="rooms-preview-grid" data-reveal>
          {rooms.map((room) => (
            <a
              key={room.slug}
              href={`/rooms#${room.slug}`}
              className="room-preview-card"
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
    </section>
  );
}
