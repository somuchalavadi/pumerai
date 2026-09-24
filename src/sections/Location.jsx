const transitDistances = [
  {
    name: "Kasarkod Eco Beach & Boardwalk",
    distance: "~5 km",
    time: "8 min drive",
    desc: "Pristine Blue Flag certified beach with golden sand, casuarina groves & coastal promenade.",
    type: "Beach",
  },
  {
    name: "Sharavati River Backwaters & Boating",
    distance: "~2.8 km",
    time: "5 min drive",
    desc: "Scenic river cruises, mangrove trails, and tranquil sunset boat safaris.",
    type: "Nature",
  },
  {
    name: "Honnavar Railway Station (HNA)",
    distance: "~3.5 km",
    time: "9 min drive",
    desc: "Convenient Konkan Railway junction connecting Mumbai, Goa, Mangalore & Bangalore.",
    type: "Transit",
  },
  {
    name: "Honnavar KSRTC Central Bus Stand",
    distance: "~2.5 km",
    time: "6 min drive",
    desc: "Frequent intercity coastal and interstate bus transit.",
    type: "Transit",
  },
  {
    name: "Historic Mirjan Fort",
    distance: "~18 km",
    time: "22 min drive",
    desc: "16th-century laterite stone citadel known for its moats and tranquil coastal history.",
    type: "Heritage",
  },
  {
    name: "Murudeshwar Temple & Beach",
    distance: "~26 km",
    time: "35 min drive",
    desc: "Home to the world's second-tallest Shiva statue and Arabian Sea viewpoints.",
    type: "Temple",
  },
  {
    name: "Idagunji Mahaganapati Temple",
    distance: "~16 km",
    time: "20 min drive",
    desc: "Famed 1500-year-old pilgrimage shrine dedicated to Lord Ganesha.",
    type: "Temple",
  },
  {
    name: "Gokarna (Om Beach & Kudle)",
    distance: "~48 km",
    time: "55 min drive",
    desc: "Renowned coastal temple town and rugged beach trekking landscapes.",
    type: "Day Trip",
  },
];

const hotelPolicies = [
  { label: "CHECK-IN TIME", value: "From 1:00 PM (24-hr front desk welcomes late arrivals)" },
  { label: "CHECK-OUT TIME", value: "Until 11:00 AM (Late checkout subject to availability)" },
  { label: "POOL HOURS", value: "6:30 AM – 7:00 PM daily (Indoor & children's pool)" },
  { label: "SMOKING POLICY", value: "100% Smoke-free rooms; designated outdoor smoking areas only" },
  { label: "PET POLICY", value: "Pets are not accommodated to ensure allergy-free environments" },
  { label: "PARKING & EV", value: "Complimentary secured private self-parking + EV charging stations" },
  { label: "FRONT DESK", value: "24-hour manned reception, security & luggage assistance" },
  { label: "CANCELLATION", value: "Free cancellation up to 24 hours prior to check-in for direct bookings" },
];

export default function Location() {
  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";

  return (
    <section className="section location-section" id="location" aria-labelledby="location-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>LOCATION &amp; GETTING HERE &bull; NH-66</span>
            </div>
            <h2 id="location-heading" className="section-title">
              On the coastal <br />
              <span className="title-italic">road of Honnavar.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Hotel Pumerai is situated directly on National Highway 66 near Ramateertha Cross in Honnavar,
              Uttara Kannada, Karnataka. Perfectly positioned for effortless vehicular transit between Goa,
              Gokarna, Murudeshwar, and Mangalore, while serving as the premier base for exploring Kasarkod Beach
              and the Sharavati River backwaters.
            </p>
          </div>
        </header>

        {/* Embedded Map & Address Card Block */}
        <div className="location-map-row" data-reveal>
          {/* Map Column */}
          <div className="map-embed-container">
            <iframe
              title="Hotel Pumerai Honnavar Official Location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d74.446001!3d14.2904652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc3b0078713aef:0xc5291d53eacaf9a1!5e0!3m2!1sen!2sin!4v0"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-iframe"
            />
            {/* Quick Deep Link Overlay for Mobile */}
            <div className="map-deep-link-bar">
              <a
                href={officialGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary map-directions-btn"
                aria-label="Get Directions to Hotel Pumerai on Google Maps"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span>GET DIRECTIONS</span>
              </a>
              <a
                href={officialGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary map-apple-btn"
                aria-label="Open in Google Maps App"
              >
                OPEN IN MAPS APP
              </a>
            </div>
          </div>

          {/* Address & Highway Transit Box */}
          <div className="address-details-card">
            <div className="address-header">
              <span className="address-tag">OFFICIAL PROPERTY NAP</span>
              <h3 className="address-title">Hotel Pumerai</h3>
              <address className="address-body">
                NH-66, near Ramateertha Cross,
                <br />
                Honnavar, Uttara Kannada,
                <br />
                Karnataka 581334, India
              </address>
            </div>

            <div className="brass-rule-small" />

            <div className="contact-quick-list">
              <div className="quick-item">
                <span className="quick-label">RESERVATIONS PHONE</span>
                <a href="tel:+919845423223" className="quick-val highlight">+91 98454 23223</a>
              </div>
              <div className="quick-item">
                <span className="quick-label">HOTEL FRONT DESK</span>
                <a href="tel:+918387221221" className="quick-val">08387-221221</a>
              </div>
              <div className="quick-item">
                <span className="quick-label">WHATSAPP CONCIERGE</span>
                <a
                  href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20directions%20and%20booking%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-val whatsapp-link"
                >
                  Click to Chat on WhatsApp
                </a>
              </div>
              <div className="quick-item">
                <span className="quick-label">EMAIL INQUIRIES</span>
                <a href="mailto:reservation@hotelpumerai.com" className="quick-val">reservation@hotelpumerai.com</a>
              </div>
            </div>

            <div className="highway-note-box">
              <span className="highway-badge">NH-66 DIRECT ACCESS</span>
              <p className="highway-text">
                Situated right off the main highway with wide ingress/egress. No narrow village roads or steep inclines.
              </p>
              <div style={{ marginTop: "10px" }}>
                <a
                  href={officialGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                  style={{ fontSize: "0.72rem", padding: "8px 14px", width: "100%", textAlign: "center" }}
                >
                  📍 Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Distance Callouts & Nearby Landmarks */}
        <div className="transit-landmarks-block" data-reveal>
          <div className="landmarks-header">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>NEARBY LANDMARKS &amp; TRANSIT TIMES</span>
            </div>
            <h3 className="landmarks-title">Proximity to Key Coastal Attractions</h3>
            <p className="landmarks-subtitle">
              All distances measured directly from Hotel Pumerai on NH-66 Honnavar.
            </p>
          </div>

          <div className="landmarks-grid">
            {transitDistances.map((item) => (
              <div className="landmark-card" key={item.name}>
                <div className="landmark-card-top">
                  <span className="landmark-type-tag">{item.type}</span>
                  <div className="landmark-time-badge">
                    <span className="badge-dist">{item.distance}</span>
                    <span className="badge-sep">&bull;</span>
                    <span className="badge-time">{item.time}</span>
                  </div>
                </div>
                <h4 className="landmark-name">{item.name}</h4>
                <p className="landmark-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stay Information & Hotel Policies */}
        <div className="policies-summary-card" data-reveal>
          <div className="policies-header">
            <span className="policies-tag">ESSENTIAL POLICIES</span>
            <h3 className="policies-title">Stay Information &amp; Hotel Policies</h3>
          </div>
          <div className="policies-two-col-grid">
            {hotelPolicies.map((p) => (
              <div className="policy-row-item" key={p.label}>
                <span className="policy-row-label">{p.label}</span>
                <span className="policy-row-val">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
