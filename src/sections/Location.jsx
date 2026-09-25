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
    name: "Apsarakonda Waterfalls & Hillock",
    distance: "~8 km",
    time: "12 min drive",
    desc: "Coastal freshwater waterfall, serene lagoon, and cliff-top Arabian Sea sunset view.",
    type: "Nature",
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
    desc: "Home to the world's second-tallest Shiva statue, Raja Gopura, and Arabian Sea viewpoints.",
    type: "Temple",
  },
  {
    name: "Bhatkal Heritage Coast",
    distance: "~38 km",
    time: "45 min drive",
    desc: "Historic coastal port along NH-66 with heritage architecture and tranquil shores.",
    type: "Coastal Town",
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
    desc: "Renowned coastal temple town and rugged beach trekking landscapes in Uttara Kannada.",
    type: "Day Trip",
  },
  {
    name: "Sirsi & Western Ghats",
    distance: "~68 km",
    time: "1 hr 30 min drive",
    desc: "Gateway to Sahyadri rainforests, spice plantations, and waterfalls accessible via NH-69.",
    type: "Eco Tourism",
  },
  {
    name: "Karwar & Kali River Estuary",
    distance: "~90 km",
    time: "1 hr 45 min drive",
    desc: "Uttara Kannada district headquarters, Tagore Beach, and scenic coastal highway transit.",
    type: "District Base",
  },
  {
    name: "Honnavar KSRTC Central Bus Stand",
    distance: "~2.5 km",
    time: "6 min drive",
    desc: "Frequent intercity coastal and interstate bus transit.",
    type: "Transit",
  },
];

const hotelPolicies = [
  { label: "Check-in Time", value: "From 1:00 PM (24-hr front desk welcomes late arrivals)" },
  { label: "Check-out Time", value: "Until 11:00 AM (Late checkout subject to availability)" },
  { label: "Pool Hours", value: "6:30 AM – 7:00 PM daily (Indoor & children's pool)" },
  { label: "Smoking Policy", value: "100% Smoke-free rooms; designated outdoor smoking areas only" },
  { label: "Pet Policy", value: "Pets are not accommodated to ensure allergy-free environments" },
  { label: "Parking & EV", value: "Complimentary secured private self-parking + EV charging stations" },
  { label: "Front Desk", value: "24-hour manned reception, security & luggage assistance" },
  { label: "Cancellation", value: "Free cancellation up to 24 hours prior to check-in for direct bookings" },
];

function getCategoryIcon(type) {
  switch (type) {
    case "Beach":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12c3-1.5 6-1.5 9 0s6 1.5 9 0" />
          <path d="M2 17c3-1.5 6-1.5 9 0s6 1.5 9 0" />
        </svg>
      );
    case "Nature":
    case "Eco Tourism":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "Transit":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="3" width="16" height="13" rx="2" />
          <path d="m4 11 16 0" />
          <path d="m8 16-2 3" />
          <path d="m16 16 2 3" />
        </svg>
      );
    case "Heritage":
    case "Temple":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 21h18" />
          <path d="M5 21V10l7-5 7 5v11" />
          <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
        </svg>
      );
    case "Day Trip":
    case "Coastal Town":
    case "District Base":
    default:
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
  }
}

export default function Location({ isStandalonePage = false }) {
  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";

  return (
    <section className="section location-section" id="location" aria-labelledby="location-heading">
      <div className="section-container">
        {/* Section Header (homepage only; standalone location page uses its own single hero intro) */}
        {!isStandalonePage && (
          <header className="section-header-split" data-reveal>
            <div className="header-meta">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>Location &amp; Directions &bull; NH-66</span>
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
                Gokarna, Murudeshwar, Bhatkal, and Mangalore, our hotel serves as a comfortable, premium accommodation
                base for exploring coastal Karnataka, Kasarkod Eco Beach, and the Sharavati River backwaters.
              </p>
            </div>
          </header>
        )}

        {/* Embedded Map & Address Card Block */}
        <div className="location-map-row" data-reveal>
          {/* Map Column */}
          <div className="map-embed-container">
            <iframe
              title="Hotel Pumerai Honnavar Official Location on Google Maps"
              src="https://maps.google.com/maps?q=Hotel+Pumerai,+NH-66,+Ramateertha+Cross,+Honnavar,+Karnataka+581334&amp;hl=en&amp;z=15&amp;output=embed"
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
                Open in Maps
              </a>
            </div>
          </div>

          {/* Address & Highway Transit Box */}
          <div className="address-details-card">
            <div className="address-header">
              <span className="address-tag">Official Property Address</span>
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
                <span className="quick-label">Reservations Phone</span>
                <a href="tel:+919845423223" className="quick-val highlight">+91 98454 23223</a>
              </div>
              <div className="quick-item">
                <span className="quick-label">Hotel Front Desk</span>
                <a href="tel:+918387221221" className="quick-val">08387-221221</a>
              </div>
              <div className="quick-item">
                <span className="quick-label">WhatsApp Concierge</span>
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
                <span className="quick-label">Email Inquiries</span>
                <a href="mailto:reservation@hotelpumerai.com" className="quick-val">reservation@hotelpumerai.com</a>
              </div>
            </div>

            <div className="highway-note-box">
              <span className="highway-badge">NH-66 Direct Access</span>
              <p className="highway-text">
                Situated right off the main highway with wide ingress/egress. No narrow village roads or steep inclines.
              </p>
              <div style={{ marginTop: "10px" }}>
                <a
                  href={officialGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                  style={{ fontSize: "0.75rem", padding: "8px 14px", width: "100%", textAlign: "center" }}
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
              <span>Nearby Landmarks &amp; Transit Times</span>
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
                  <span className="landmark-type-tag">
                    <span className="landmark-type-icon">{getCategoryIcon(item.type)}</span>
                    <span>{item.type}</span>
                  </span>
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
            <span className="policies-tag">Essential Policies</span>
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
