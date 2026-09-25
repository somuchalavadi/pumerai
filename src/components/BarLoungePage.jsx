import { useState } from "react";
import { venuesData } from "../data/dining.js";

export default function BarLoungePage({ onNavigate }) {
  const [activeMenuVenue, setActiveMenuVenue] = useState(null);
  const madiraVenue = venuesData.find((v) => v.id === "madira") || venuesData[2];

  const handleOpenMenu = (venue) => {
    setActiveMenuVenue(venue);
  };

  const handleCloseMenu = () => {
    setActiveMenuVenue(null);
  };

  const whatsappInquiryUrl = `https://wa.me/919845423223?text=${encodeURIComponent(
    "Hi Hotel Pumerai! I would like to inquire about table reservations and offerings at Madira Bar & Lounge."
  )}`;

  return (
    <main className="page-shell bar-lounge-page-shell">
      {/* Page Hero Banner: Minimal 1-line intro */}
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>BAR &amp; LOUNGE &bull; HONNĀVAR</span>
          </div>
          <h1 className="page-main-heading">
            Madira Bar &amp; Lounge
          </h1>
          <p className="page-main-desc">
            Fine spirits, coastal mocktails, finger bites and coffee at Hotel Pumerai, Honnāvar.
          </p>
        </div>
      </div>

      {/* Actual Bar & Lounge Content */}
      <section className="section bar-lounge-detail-section" id="madira-details" aria-label="Madira Bar & Lounge Details">
        <div className="section-container">
          <div className="dining-venues-grid">
            <article className="venue-card" id={madiraVenue.id} data-reveal>
              <div className="venue-media-container">
                <figure className="venue-figure">
                  <img
                    src={madiraVenue.image}
                    alt={madiraVenue.alt}
                    loading="lazy"
                    className="venue-img"
                  />
                  <figcaption className="venue-badge-pill">
                    <span className="badge-dot" />
                    <span>{madiraVenue.hours}</span>
                  </figcaption>
                </figure>
              </div>

              <div className="venue-info-container">
                <div className="venue-meta-header">
                  <span className="venue-eyebrow">FINE SPIRITS, COASTAL MOCKTAILS, FINGER BITES &amp; COFFEE</span>
                  <h2 className="venue-title">{madiraVenue.name}</h2>
                  <p className="venue-subtitle">{madiraVenue.subtitle}</p>
                </div>

                <div className="brass-rule-small" />

                <p className="venue-desc">{madiraVenue.description}</p>

                <div className="venue-timing-box">
                  <span className="timing-label">OPENING HOURS:</span>
                  <span className="timing-value">{madiraVenue.hours}</span>
                </div>

                {/* Signature Drinks / Dishes */}
                <div className="venue-signatures">
                  <span className="signatures-header">SIGNATURE HIGHLIGHTS:</span>
                  <ul className="signatures-list">
                    {madiraVenue.signatureDishes.map((dish) => (
                      <li key={dish.name} className="signature-dish-item">
                        <strong className="dish-name">{dish.name}</strong>
                        <span className="dish-desc">{dish.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Row */}
                <div className="venue-action-row" style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    type="button"
                    className="button-primary open-menu-btn"
                    onClick={() => handleOpenMenu(madiraVenue)}
                  >
                    VIEW CURATED MENU
                  </button>
                  <a
                    href="tel:+919845423223"
                    className="button-whatsapp-instant"
                    style={{ textDecoration: "none" }}
                  >
                    RESERVE A TABLE
                  </a>
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => {
                      const el = document.getElementById("madira-details");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    LOUNGE DETAILS
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Interactive Menu Modal */}
      {activeMenuVenue && (
        <div
          className="menu-modal-overlay is-open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bar-menu-modal-title"
          onClick={handleCloseMenu}
        >
          <div className="menu-modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="menu-modal-header">
              <div>
                <span className="modal-venue-eyebrow">BAR &amp; LOUNGE SELECTIONS</span>
                <h3 id="bar-menu-modal-title" className="modal-venue-title">
                  {activeMenuVenue.name}
                </h3>
                <p className="modal-venue-hours">
                  {activeMenuVenue.hours} &bull; {activeMenuVenue.subtitle}
                </p>
              </div>
              <button
                type="button"
                className="close-modal-btn"
                onClick={handleCloseMenu}
                aria-label="Close menu modal"
              >
                &times;
              </button>
            </header>

            <div className="menu-modal-body">
              {activeMenuVenue.menuCategories.map((cat) => (
                <div className="menu-category-block" key={cat.title}>
                  <h4 className="category-title">{cat.title}</h4>
                  <div className="menu-items-list">
                    {cat.items.map((item) => (
                      <div className="menu-item-row" key={item.name}>
                        <div className="item-text">
                          <span className="item-name">{item.name}</span>
                          {item.note && <span className="item-note">{item.note}</span>}
                        </div>
                        <div className="item-price-leader" />
                        <span className="item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <footer className="menu-modal-footer">
              <span className="menu-taxes-note">
                * Prices exclusive of applicable GST. Domestic &amp; imported beverage service governed by local regulations.
              </span>
              <button type="button" className="button-primary" onClick={handleCloseMenu}>
                CLOSE MENU
              </button>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}
