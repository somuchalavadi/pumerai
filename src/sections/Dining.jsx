import { useState } from "react";
import { venuesData } from "../data/dining.js";

export default function Dining({ sectionId = "dining", headingId = "dining-heading", isStandalonePage = false, onNavigate }) {
  const [activeMenuVenue, setActiveMenuVenue] = useState(null);
  const restaurantVenues = venuesData;

  const handleOpenMenu = (venue) => {
    setActiveMenuVenue(venue);
  };

  const handleCloseMenu = () => {
    setActiveMenuVenue(null);
  };

  return (
    <section className="section dining-section" id={sectionId} aria-labelledby={headingId}>
      <div className="section-container">
        {/* Section Header (homepage only; standalone dining page uses its own single hero intro) */}
        {!isStandalonePage && (
          <header className="section-header-split" data-reveal>
            <div className="header-meta">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>ON-SITE RESTAURANTS &bull; HOTEL PUMERAI</span>
              </div>
              <h2 id={headingId} className="section-title">
                Coastal culinary <br />
                <span className="title-italic">journeys on NH-66.</span>
              </h2>
            </div>
            <p className="header-summary">
              Hotel Pumerai houses two distinctive on-site restaurants: Matsya for coastal Karavali seafood
              and North Indian cuisine, and Madhura for authentic pure vegetarian specialties.
            </p>
          </header>
        )}

        {/* Venues Grid */}
        <div className="dining-venues-grid">
          {restaurantVenues.map((venue) => (
            <article className="venue-card" key={venue.id} data-reveal>
              <div className="venue-media-container">
                <figure className="venue-figure">
                  <img src={venue.image} alt={venue.alt} loading="lazy" className="venue-image" />
                </figure>
                <div className="venue-hours-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{venue.hours}</span>
                </div>
              </div>

              <div className="venue-details-body">
                <div className="venue-header-row">
                  <span className="venue-cuisine-tag">{venue.subtitle}</span>
                  <h3 className="venue-title">{venue.name}</h3>
                </div>

                <p className="venue-desc">{venue.description}</p>

                <div className="signature-dishes-block">
                  <span className="dishes-heading">SIGNATURE DISHES &amp; HIGHLIGHTS:</span>
                  <div className="dishes-list">
                    {venue.signatureDishes.map((dish) => (
                      <div className="dish-item" key={dish.name}>
                        <div className="dish-name-row">
                          <span className="dish-bullet">&mdash;</span>
                          <strong className="dish-title">{dish.name}:</strong>
                        </div>
                        <p className="dish-summary">{dish.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="venue-cta-row">
                  <button
                    type="button"
                    className="button-primary menu-view-btn"
                    onClick={() => handleOpenMenu(venue)}
                    aria-label={`View Curated Menu for ${venue.name}`}
                  >
                    <span>VIEW CURATED MENU</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <a
                    href="tel:+919845423223"
                    className="button-secondary table-reserve-btn"
                    aria-label={`Reserve table at ${venue.name}`}
                  >
                    RESERVE A TABLE
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Restaurant Menu Modal */}
      {activeMenuVenue && (
        <div className="menu-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="menu-venue-title">
          <div className="menu-modal-backdrop" onClick={handleCloseMenu} />
          <div className="menu-modal-card">
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseMenu}
              aria-label="Close restaurant menu"
            >
              &times;
            </button>

            <div className="menu-modal-header">
              <span className="menu-tagline">{activeMenuVenue.subtitle}</span>
              <h3 id="menu-venue-title" className="menu-modal-title">
                {activeMenuVenue.name}
              </h3>
              <p className="menu-hours-text">
                Operating Hours: {activeMenuVenue.hours} &bull; {activeMenuVenue.mealTimes}
              </p>
              <div className="brass-rule-small" />
            </div>

            <div className="menu-categories-stack">
              {activeMenuVenue.menuCategories.map((cat) => (
                <div className="menu-category-section" key={cat.title}>
                  <h4 className="category-section-title">{cat.title}</h4>
                  <div className="category-items-grid">
                    {cat.items.map((item) => (
                      <div className="menu-row-item" key={item.name}>
                        <div className="menu-row-top">
                          <span className="item-name">{item.name}</span>
                          <span className="item-dots" />
                          <span className="item-price">{item.price}</span>
                        </div>
                        {item.note && <span className="item-note">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="menu-modal-footer">
              <p className="menu-note">
                * All items prepared fresh to order. Seasonal seafood rates subject to daily catch availability. Taxes extra as applicable.
              </p>
              <div className="menu-footer-actions">
                <a
                  href={`https://wa.me/919845423223?text=${encodeURIComponent(`Hi Hotel Pumerai, I'd like to reserve a table at ${activeMenuVenue.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-whatsapp-instant"
                >
                  Reserve on WhatsApp
                </a>
                <button type="button" className="button-secondary" onClick={handleCloseMenu}>
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
