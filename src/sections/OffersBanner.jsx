export default function OffersBanner() {
  const handleOpenBooking = () => {
    window.dispatchEvent(new CustomEvent("pumerai:open-booking"));
  };

  return (
    <section className="offers-banner-section" aria-label="Direct Booking Privileges & Guarantee">
      <div className="section-container">
        <div className="offers-banner-card" data-reveal>
          <div className="offers-banner-badge">
            <span className="badge-shield">&#x2713;</span>
            <span>BEST RATE GUARANTEE</span>
          </div>

          <div className="offers-content-grid">
            <div className="offers-text-col">
              <h3 className="offers-heading">
                Book direct with Hotel Pumerai <br />
                <span className="title-italic">and save 10% on every stay.</span>
              </h3>
              <p className="offers-subcopy">
                Avoid third-party booking commissions. When reserving directly through our website,
                WhatsApp, or phone desk, enjoy guaranteed lowest rates plus exclusive perks not available on OTAs.
              </p>

              <div className="offers-perks-row">
                <div className="offer-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>10% Instant Discount vs OTAs</span>
                </div>
                <div className="offer-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>Free Daily Breakfast Buffet</span>
                </div>
                <div className="offer-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>Free 24-Hour Cancellation</span>
                </div>
                <div className="offer-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>Priority Room View Assignment</span>
                </div>
                <div className="offer-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>Free Manager&apos;s Evening Reception</span>
                </div>
              </div>
            </div>

            <div className="offers-cta-col">
              <div className="cta-box-card">
                <span className="cta-box-label">DIRECT BOOKING PROMO</span>
                <span className="cta-box-price">SAVE 10% TODAY</span>
                <p className="cta-box-note">Applied automatically on website &amp; WhatsApp</p>

                <button
                  type="button"
                  className="button-primary offers-claim-btn"
                  onClick={handleOpenBooking}
                  aria-label="Claim Direct Booking Offer and Check Availability"
                >
                  CHECK AVAILABILITY &amp; SAVE
                </button>

                <a
                  href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20to%20book%20direct%20and%20claim%20the%2010%25%20direct%20booking%20discount."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-claim-link"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Or WhatsApp us to Claim (+91 98454 23223)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
