import { editorialFrames } from "../utils/frames.js";

const whyThemes = [
  {
    title: "CONNECTED",
    description: "Positioned directly along NH-66 near Ramateertha Cross for effortless coastal transit.",
  },
  {
    title: "CONTEMPORARY",
    description: "Modern rooms, clean architecture, and thoughtfully designed common spaces.",
  },
  {
    title: "RELAXED",
    description: "Glass-edge swimming pool, wellness facilities, dining, and serene rooms.",
  },
  {
    title: "COASTAL",
    description: "A convenient base for exploring Honnavar, backwaters, and the wider Uttara Kannada region.",
  },
];

const policies = [
  { label: "CHECK-IN", value: "1:00 PM" },
  { label: "CHECK-OUT", value: "11:00 AM" },
  { label: "SMOKING", value: "Smoke-free indoor policy" },
  { label: "PETS", value: "Pets are not accommodated" },
  { label: "PARKING", value: "Private parking" },
  { label: "RECEPTION", value: "24-hour reception" },
];

function Location({ onNavigate }) {
  const handleExploreCoast = (event) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate({ route: "/contact" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="section location-section" id="location">
      <div className="section-container">
        {/* On The Coastal Road */}
        <div className="location-feature-grid" data-reveal>
          <div className="location-text-col">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>LOCATION &amp; TRANSIT</span>
            </div>
            <h2 className="section-title">
              On the coastal <br />
              <span className="title-italic">road of Honnavar.</span>
            </h2>
            <div className="brass-rule-small" />
            <p className="lead-paragraph">
              Located on National Highway 66 near Ramateertha Cross, Pumerai is positioned
              for easy road access while keeping the coastal landscapes and backwaters of
              Uttara Kannada within reach.
            </p>

            <div className="address-highlight-box">
              <span className="address-label">ADDRESS</span>
              <p className="address-full">
                NH-66, near Ramateertha Cross,
                <br />
                Honnavar, Karnataka 581334, India
              </p>
            </div>

            <div className="transit-list">
              <span className="transit-heading">ACCESSIBILITY</span>
              <ul>
                <li>
                  <span className="transit-dot" />
                  <span>Approximately 2.5 km from Honnavar Bus Stand</span>
                </li>
                <li>
                  <span className="transit-dot" />
                  <span>Approximately 3 km from Honnavar Railway Station</span>
                </li>
                <li>
                  <span className="transit-dot" />
                  <span>Nearby: Sridevi Multispeciality Hospital</span>
                </li>
                <li>
                  <span className="transit-dot" />
                  <span>Nearby: Honnavar&apos;s coastal attractions, beaches &amp; backwaters</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="location-media-col">
            <figure className="figure-inner">
              <img
                src={editorialFrames.coast}
                alt="Scenic coast of Honnavar Uttara Kannada near Hotel Pumerai"
                loading="lazy"
              />
            </figure>
            <div className="coast-banner">
              <span className="coast-tag">DISCOVER HONNAVAR</span>
              <h3 className="coast-heading">Explore Karnataka&apos;s Western Coast</h3>
              <p className="coast-copy">
                Honnavar offers a serene coastal escape shaped by Sharavathi backwaters,
                golden beaches, and lush Western Ghats hinterland.
              </p>
              <a
                href="/contact"
                className="button-secondary"
                onClick={handleExploreCoast}
              >
                EXPLORE THE COAST
              </a>
            </div>
          </div>
        </div>

        {/* Why Pumerai Section */}
        <div className="why-pumerai-block" data-reveal>
          <div className="why-header">
            <span className="editorial-tag">WHY PUMERAI</span>
            <h3 className="why-title">A composed balance along NH-66</h3>
          </div>
          <div className="why-grid">
            {whyThemes.map((item) => (
              <div className="why-card" key={item.title}>
                <span className="why-accent">&mdash;</span>
                <h4 className="why-card-title">{item.title}</h4>
                <p className="why-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Information & Policies */}
        <div className="hotel-info-block" data-reveal>
          <div className="info-header">
            <span className="editorial-tag">STAY INFORMATION</span>
            <h3 className="info-title">Hotel Information &amp; Policies</h3>
          </div>
          <div className="policies-grid">
            {policies.map((p) => (
              <div className="policy-item" key={p.label}>
                <span className="policy-label">{p.label}</span>
                <span className="policy-val">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
