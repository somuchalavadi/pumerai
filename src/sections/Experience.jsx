import { editorialFrames } from "../utils/frames.js";

const amenities = [
  {
    title: "GLASS-EDGE SWIMMING POOL",
    description:
      "An outdoor glass-edge swimming pool designed as one of the property's signature leisure spaces.",
    tag: "Signature Leisure",
    isTeal: true,
  },
  {
    title: "CHILDREN'S SPLASH AREA",
    description: "A separate shallow splash zone designed for younger guests.",
    tag: "Family",
  },
  {
    title: "WELLNESS",
    description:
      "On-site wellness facilities including therapeutic massage services and yoga sessions.",
    tag: "Rejuvenation",
  },
  {
    title: "BUSINESS & EVENTS",
    description:
      "Business facilities and indoor meeting / banquet spaces for gatherings and events.",
    tag: "Gatherings",
  },
  {
    title: "24-HOUR RECEPTION",
    description: "Reception services available around the clock.",
    tag: "Front Desk",
  },
  {
    title: "PRIVATE PARKING",
    description: "Secure private parking for guests arriving by road.",
    tag: "Highway Access",
  },
  {
    title: "EV CHARGING",
    description: "Dedicated EV charging facilities for electric vehicle travellers.",
    tag: "Mobility",
  },
  {
    title: "POWER BACKUP",
    description: "24-hour power backup.",
    tag: "Reliability",
  },
  {
    title: "ELEVATOR",
    description: "Lift access for convenient movement throughout the property.",
    tag: "Accessibility",
  },
];

function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="section-container">
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>FACILITIES &amp; LEISURE</span>
            </div>
            <h2 className="section-title">
              More than <br />
              <span className="title-italic">a quiet stay.</span>
            </h2>
          </div>
          <p className="header-summary">
            Thoughtfully planned for coastal stopovers and weekend getaways, blending
            open-air resort spaces with dependable modern amenities.
          </p>
        </header>

        {/* Featured Pool Showcase with subtle Dusty Teal highlight */}
        <div className="featured-amenity-block pool-highlight" data-reveal>
          <figure className="figure-inner">
            <img
              src={editorialFrames.pool}
              alt="Hotel Pumerai signature glass-edge swimming pool"
              loading="lazy"
            />
          </figure>
          <div className="featured-amenity-content">
            <span className="teal-badge">SIGNATURE AMENITY &bull; DUSTY TEAL RETREAT</span>
            <h3 className="featured-amenity-title">Glass-Edge Swimming Pool</h3>
            <p className="featured-amenity-desc">
              An outdoor glass-edge swimming pool designed as one of the property&apos;s
              signature leisure spaces, framed by coastal greenery and sky.
            </p>
          </div>
        </div>

        {/* Editorial Amenities Grid */}
        <div className="amenities-editorial-grid">
          {amenities.map((item, idx) => (
            <article
              key={item.title}
              className={`amenity-item ${item.isTeal ? "amenity-teal" : ""}`}
              data-reveal
            >
              <div className="amenity-top-row">
                <span className="amenity-number">0{idx + 1}</span>
                <span className="amenity-tag">{item.tag}</span>
              </div>
              <h3 className="amenity-heading">{item.title}</h3>
              <p className="amenity-text">{item.description}</p>
              <div className="amenity-rule" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
