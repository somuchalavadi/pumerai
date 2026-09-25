import { useState } from "react";
import { venuesData } from "../data/dining.js";
import PageHeader from "./PageHeader.jsx";

export default function BarLoungePage({ onNavigate }) {
  const [activeMenuVenue, setActiveMenuVenue] = useState(null);
  const madiraVenue = venuesData.find((v) => v.id === "madira") || venuesData[2];

  const handleOpenMenu = (venue) => {
    setActiveMenuVenue(venue);
  };

  const handleCloseMenu = () => {
    setActiveMenuVenue(null);
  };

  return (
    <main className="page-shell bar-lounge-page-shell">
      {/* Standardized Compact Internal Page Header */}
      <PageHeader
        eyebrow="BAR & LOUNGE • HONNĀVAR"
        title="Madira Bar & Lounge"
        description="Fine spirits, coastal mocktails, finger bites and coffee at Hotel Pumerai, Honnāvar."
        id="madira-page-heading"
      />

      {/* Main Bar & Lounge Section — Restored to Natural Internal Page Style */}
      <section
        className="section bar-lounge-detail-section"
        id="madira-details"
        aria-labelledby="madira-page-heading"
      >
        <div className="section-container">
          {/* Natural 2-column editorial overview (no outer card border, no dark box) */}
          <div className="bar-lounge-content-wrapper">
            <div className="bar-lounge-text-col" data-reveal>
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>FINE SPIRITS, COASTAL MOCKTAILS, FINGER BITES &amp; COFFEE</span>
              </div>
              <h2 className="section-title">
                MADIRA BAR &amp; <br />
                <span className="title-italic">LOUNGE</span>
              </h2>
              <div className="brass-rule-small" />

              <p className="lead-paragraph">
                An intimate, stylish evening retreat for hotel guests and highway stopover travellers.
                Unwind over premium spirits, artisanal mocktails made with local wild kokum, gourmet
                coffee, and savory appetizers.
              </p>

              <div className="lounge-timing-box">
                <span className="timing-label">OPENING HOURS:</span>
                <span className="timing-val">11:00 AM – 11:00 PM Daily</span>
              </div>

              {/* Action Buttons Row */}
              <div className="venue-action-row">
                <button
                  type="button"
                  className="button-primary open-menu-btn"
                  onClick={() => handleOpenMenu(madiraVenue)}
                  aria-label="View Curated Menu for Madira Bar & Lounge"
                >
                  <span>VIEW CURATED MENU</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <a
                  href="tel:+919845423223"
                  className="button-secondary table-reserve-btn"
                  aria-label="Reserve a table at Madira Bar & Lounge"
                >
                  RESERVE A TABLE
                </a>

                <button
                  type="button"
                  className="button-ghost lounge-details-btn"
                  onClick={() => {
                    const el = document.getElementById("signature-highlights");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  LOUNGE DETAILS
                </button>
              </div>
            </div>

            <div className="bar-lounge-media-col" data-reveal>
              <figure className="editorial-figure lounge-editorial-figure">
                <div className="figure-inner">
                  <img
                    src={madiraVenue.image}
                    alt={madiraVenue.alt}
                    loading="lazy"
                  />
                </div>
                <figcaption className="editorial-caption">
                  <span>Madira Bar &amp; Lounge</span>
                  <span>11:00 AM – 11:00 PM Daily</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Signature Highlights Grid */}
          <div className="bar-lounge-signatures" id="signature-highlights" data-reveal>
            <div className="signatures-header-row">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>SIGNATURE HIGHLIGHTS</span>
              </div>
              <h3 className="signatures-heading">Curated Drinks &amp; Coastal Appetizers</h3>
              <div className="brass-rule-small" />
            </div>

            <div className="lounge-dishes-grid">
              {madiraVenue.signatureDishes.map((dish) => (
                <div className="lounge-dish-card" key={dish.name}>
                  <div className="dish-name-row">
                    <span className="dish-bullet">&mdash;</span>
                    <strong className="dish-title">{dish.name}</strong>
                  </div>
                  <p className="dish-summary">{dish.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Restaurant Menu Modal — matching Dining.jsx */}
      {activeMenuVenue && (
        <div className="menu-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="menu-venue-title">
          <div className="menu-modal-backdrop" onClick={handleCloseMenu} />
          <div className="menu-modal-card">
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseMenu}
              aria-label="Close bar and lounge menu"
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
                * All items prepared fresh to order. Domestic &amp; imported beverage service governed by local regulations. Taxes extra as applicable.
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
    </main>
  );
}
