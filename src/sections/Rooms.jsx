import { editorialFrames } from "../utils/frames.js";

const roomCategories = [
  {
    category: "STANDARD / SUPERIOR ROOMS",
    size: "Approx. 180–270 sq. ft.",
    image: editorialFrames.roomOne,
    description:
      "Comfortable contemporary rooms designed for an effortless stay, with views toward the landscaped garden areas.",
    features: [
      "Workspace desk",
      "Flat-screen smart TV",
      "Split air conditioning",
      "High-speed Wi-Fi",
      "Electric kettle",
      "Safety deposit box",
    ],
  },
  {
    category: "DELUXE / CLUB ROOMS",
    size: "Approx. 400 sq. ft.",
    image: editorialFrames.roomTwo,
    description:
      "More generous spaces with additional seating and glass balconies overlooking the outdoor swimming pool.",
    features: [
      "Expanded seating area",
      "Private glass balcony",
      "Pool outlook",
      "Modern room essentials",
    ],
  },
  {
    category: "SUITES",
    size: "Approx. 240–500 sq. ft.",
    image: editorialFrames.roomThree,
    description:
      "Spacious suites designed with a separate sitting/living area and an elevated sense of comfort.",
    features: [
      "Separate sitting / lounge area",
      "Premium walk-in rain shower",
      "Upgraded vanity toiletries",
      "Bespoke storage & wardrobe",
    ],
  },
];

const essentials = [
  "High-speed Wi-Fi",
  "Smart TV",
  "Air conditioning",
  "Electric kettle",
  "Safety deposit box",
  "Mini refrigerator in select room categories",
];

function Rooms({ onNavigate }) {
  const handleEnquire = (event) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate({ route: "/contact" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="section rooms-section" id="rooms">
      <div className="section-container">
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ACCOMMODATION</span>
            </div>
            <h2 className="section-title">
              Thoughtful spaces for <br />
              <span className="title-italic">rest &amp; renewal.</span>
            </h2>
          </div>
          <p className="header-summary">
            Designed for travellers moving along Karnataka&apos;s western coast, each room
            balances contemporary calm with practical ease.
          </p>
        </header>

        <div className="rooms-stack">
          {roomCategories.map((room, index) => (
            <article className="room-item" key={room.category} data-reveal>
              <div className="room-media">
                <figure className="figure-inner">
                  <img
                    src={room.image}
                    alt={`${room.category} at Hotel Pumerai Honnavar`}
                    loading="lazy"
                  />
                </figure>
                <div className="room-index-pill">
                  <span>0{index + 1}</span>
                  <span className="pill-dot">/</span>
                  <span>{room.size}</span>
                </div>
              </div>

              <div className="room-details">
                <div className="room-meta-tag">{room.size}</div>
                <h3 className="room-name">{room.category}</h3>
                <p className="room-description">{room.description}</p>

                <div className="room-features-list">
                  <span className="features-label">Room Highlights:</span>
                  <ul>
                    {room.features.map((item) => (
                      <li key={item}>
                        <span className="bullet-brass">&mdash;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="room-cta-row">
                  <a
                    href="/contact"
                    className="button-primary"
                    onClick={handleEnquire}
                  >
                    EXPLORE ROOMS
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Room Essentials Subsection */}
        <div className="room-essentials-card" data-reveal>
          <div className="essentials-header">
            <span className="essentials-eyebrow">PROPERTY STANDARD</span>
            <h3 className="essentials-title">Room Essentials</h3>
            <div className="brass-rule-small" />
          </div>
          <div className="essentials-grid">
            {essentials.map((item) => (
              <div className="essential-pill" key={item}>
                <span className="essential-check">&#x2713;</span>
                <span className="essential-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rooms;
