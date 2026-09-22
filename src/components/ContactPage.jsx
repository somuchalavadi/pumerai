function ContactPage() {
  return (
    <main className="page-shell">
      <section className="contact-page-section" aria-labelledby="contact-page-heading">
        <div className="section-container">
          <div className="contact-page-card" data-reveal>
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>RESERVATIONS &amp; LOCATION</span>
            </div>
            <h1 id="contact-page-heading" className="contact-page-title">
              Hotel Pumerai
            </h1>
            <p className="contact-page-subtitle">
              NH-66, near Ramateertha Cross, Honnavar, Karnataka 581334, India
            </p>
            <div className="brass-rule-small" />

            <div className="contact-channels-grid">
              <div className="channel-box">
                <span className="channel-label">PHONE RESERVATIONS</span>
                <div className="channel-links">
                  <a href="tel:+919845423223" className="channel-link primary-phone">
                    +91 98454 23223
                  </a>
                  <a href="tel:+918387221221" className="channel-link secondary-phone">
                    08387-221221
                  </a>
                </div>
              </div>

              <div className="channel-box">
                <span className="channel-label">EMAIL RESERVATIONS</span>
                <div className="channel-links">
                  <a
                    href="mailto:reservation@hotelpumerai.com"
                    className="channel-link email-link"
                  >
                    reservation@hotelpumerai.com
                  </a>
                </div>
              </div>

              <div className="channel-box">
                <span className="channel-label">POSTAL ADDRESS</span>
                <p className="channel-address">
                  Hotel Pumerai
                  <br />
                  NH-66, near Ramateertha Cross,
                  <br />
                  Honnavar, Karnataka 581334, India
                </p>
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="contact-actions-row">
              <a href="tel:+919845423223" className="button-primary call-btn">
                CALL FOR RESERVATIONS
              </a>
              <a
                href="mailto:reservation@hotelpumerai.com"
                className="button-secondary email-btn"
              >
                EMAIL RESERVATIONS
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
