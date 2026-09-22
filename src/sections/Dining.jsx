import { editorialFrames } from "../utils/frames.js";

const venues = [
  {
    name: "MATSYA MULTICUISINE RESTAURANT",
    cuisine: "Coastal Seafood, Karavali, North Indian & Chinese",
    image: editorialFrames.dining,
    description:
      "A multicuisine dining experience featuring coastal seafood, Karavali-inspired preparations, North Indian dishes, and Chinese favourites.",
    atmosphere: "Spacious indoor dining with coastal hospitality",
    tag: "Multicuisine & Coastal",
  },
  {
    name: "MADHURA VEG RESTAURANT",
    cuisine: "Pure Vegetarian South Indian Favourites",
    image: editorialFrames.madhura,
    description:
      "A dedicated vegetarian dining space serving South Indian favourites, including dosas, thalis, and vegetarian snacks.",
    atmosphere: "Warm, family-friendly setting with traditional flavours",
    tag: "Pure Vegetarian",
  },
  {
    name: "MADIRA BAR & LOUNGE",
    cuisine: "Spirits, Signature Mocktails & Finger Food",
    image: editorialFrames.madira,
    description:
      "A relaxed bar and lounge offering domestic and international spirits, signature mocktails, and finger food.",
    atmosphere: "Understated evening lounge for conversation and unwind",
    tag: "Bar & Lounge",
  },
];

function Dining() {
  return (
    <section className="section dining-section" id="dining">
      <div className="section-container">
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>CULINARY JOURNEYS</span>
            </div>
            <h2 className="section-title">
              Dining at <br />
              <span className="title-italic">Hotel Pumerai.</span>
            </h2>
          </div>
          <p className="header-summary">
            From coastal flavours to familiar favourites, Pumerai brings together multiple
            dining experiences under one roof.
          </p>
        </header>

        <div className="dining-cards-stack">
          {venues.map((venue, index) => (
            <article className="dining-card" key={venue.name} data-reveal>
              <div className="dining-media">
                <figure className="figure-inner">
                  <img
                    src={venue.image}
                    alt={`${venue.name} at Hotel Pumerai Honnavar`}
                    loading="lazy"
                  />
                </figure>
                <div className="dining-pill">
                  <span>0{index + 1}</span>
                  <span className="pill-dot">/</span>
                  <span>{venue.tag}</span>
                </div>
              </div>

              <div className="dining-info">
                <div className="dining-cuisine-label">{venue.cuisine}</div>
                <h3 className="dining-name">{venue.name}</h3>
                <p className="dining-desc">{venue.description}</p>
                <div className="dining-meta-box">
                  <span className="meta-icon">&#x2014;</span>
                  <span className="meta-text">{venue.atmosphere}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dining;
