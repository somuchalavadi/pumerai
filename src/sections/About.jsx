import { editorialFrames } from "../utils/frames.js";

const keyFacts = [
  { label: "PROPERTY RATING", value: "3-Star Boutique Hotel" },
  { label: "GUEST ROOMS", value: "40 Contemporary Rooms" },
  { label: "DINING ON-SITE", value: "2 Restaurants + Bar & Café" },
  { label: "SWIMMING POOL", value: "Indoor + Kids Splash Pool" },
  { label: "CONNECTIVITY", value: "Free 100+ Mbps WiFi" },
  { label: "BEACH PROXIMITY", value: "~5 km to Kasarkod Eco Beach" },
  { label: "RIVER PROXIMITY", value: "~2.8 km to Sharavati River" },
  { label: "GUEST RATING", value: "10/10 \"Exceptional\" Score" },
];

export default function About() {
  const handleOpenBooking = () => {
    window.dispatchEvent(new CustomEvent("pumerai:open-booking"));
  };

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="about-content-wrapper">
          <div className="about-text-block" data-reveal>
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ABOUT HOTEL PUMERAI &bull; HONNAVAR</span>
            </div>
            <h2 id="about-heading" className="section-title">
              A place to arrive.
              <br />
              <span className="title-italic">A place to explore.</span>
            </h2>
            <div className="brass-rule-small" />

            {/* Geo-targeted Intro Paragraph (for humans & AI retrieval) */}
            <p className="lead-paragraph">
              Hotel Pumerai is a 3-star boutique hotel on NH-66 near Ramateertha Cross in Honnavar,
              Uttara Kannada, Karnataka. Perfectly located just ~5 km from the golden sands of Kasarkod Eco Beach
              and ~2.8 km from the serene waters of the Sharavati River, Pumerai blends modern highway connectivity
              with coastal tranquility.
            </p>

            <p className="body-paragraph">
              Featuring 40 thoughtfully designed guestrooms, an indoor glass-edge swimming pool with a children&apos;s
              splash area (open 6:30 AM–7:00 PM), two on-site restaurants—Matsya (coastal seafood) and Madhura (pure vegetarian)—plus
              the Madira bar and lounge, free 100+ Mbps WiFi, and secure self-parking with EV charging, our property provides
              the ideal stopover and vacation haven along Karnataka&apos;s western coast.
            </p>

            {/* Factual Highlights Grid */}
            <div className="about-facts-grid">
              {keyFacts.map((fact) => (
                <div className="fact-item" key={fact.label}>
                  <span className="fact-label">{fact.label}</span>
                  <strong className="fact-val">{fact.value}</strong>
                </div>
              ))}
            </div>

            <div className="about-actions-row">
              <button
                type="button"
                className="button-primary"
                onClick={handleOpenBooking}
              >
                CHECK AVAILABILITY
              </button>
              <a href="#rooms" className="button-secondary">
                EXPLORE ACCOMMODATION
              </a>
            </div>
          </div>

          <figure className="editorial-figure about-figure" data-reveal>
            <div className="figure-inner">
              <img
                src={editorialFrames.arrival}
                alt="Hotel Pumerai architectural entrance portico on NH-66 Honnavar Karnataka"
                loading="lazy"
              />
            </div>
            <figcaption className="editorial-caption">
              <span>01 &mdash; NH-66 ARRIVAL</span>
              <span>Near Ramateertha Cross, Honnavar</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
