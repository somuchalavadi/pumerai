import { useState } from "react";
import PageHeader from "./PageHeader.jsx";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";
  const whatsappDirectUrl = `https://wa.me/919845423223?text=${encodeURIComponent(
    "Hi Hotel Pumerai! I would like to contact your front desk regarding a room reservation or inquiry."
  )}`;

  return (
    <main className="page-shell contact-page-shell">
      <PageHeader
        eyebrow="CONTACT • HONNĀVAR"
        title="Contact Hotel Pumerai"
        description="Reach Hotel Pumerai for reservations, enquiries and local travel assistance."
        id="contact-page-heading"
      />

      <section className="section contact-details-section">
        <div className="section-container">
          <div className="contact-main-grid">
            {/* Left Column: Contact Channels & NAP */}
            <div className="contact-info-col">
              <div className="contact-card-box">
                <span className="card-mini-tag">DIRECT COMMUNICATIONS</span>
                <h3 className="card-box-title">Get in Touch</h3>
                <div className="brass-rule-small" />

                <div className="contact-methods-stack">
                  <div className="method-item">
                    <span className="method-label">DIRECT RESERVATIONS LINE</span>
                    <a href="tel:+919845423223" className="method-val primary-link">
                      +91 98454 23223
                    </a>
                    <span className="method-note">Available 24 hours daily</span>
                  </div>

                  <div className="method-item">
                    <span className="method-label">HOTEL FRONT DESK / LANDLINE</span>
                    <a href="tel:+918387221221" className="method-val">
                      08387-221221
                    </a>
                    <span className="method-note">Front desk &amp; room service</span>
                  </div>

                  <div className="method-item">
                    <span className="method-label">WHATSAPP CHAT CONCIERGE</span>
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="method-val whatsapp-link"
                    >
                      +91 98454 23223 (Click to Chat)
                    </a>
                    <span className="method-note">Instant assistance &amp; rate confirmation</span>
                  </div>

                  <div className="method-item">
                    <span className="method-label">EMAIL RESERVATIONS</span>
                    <a href="mailto:reservation@hotelpumerai.com" className="method-val">
                      reservation@hotelpumerai.com
                    </a>
                  </div>

                  <div className="method-item">
                    <span className="method-label">POSTAL NAP ADDRESS</span>
                    <address className="method-address">
                      Hotel Pumerai
                      <br />
                      NH-66, near Ramateertha Cross,
                      <br />
                      Honnavar, Uttara Kannada,
                      <br />
                      Karnataka 581334, India
                    </address>
                  </div>
                </div>

                <div className="contact-instant-actions">
                  <a href={officialGoogleMapsLink} target="_blank" rel="noopener noreferrer" className="button-primary">
                    📍 Get Directions on Google Maps
                  </a>
                  <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="button-whatsapp-instant">
                    Message on WhatsApp
                  </a>
                  <a href="tel:+919845423223" className="button-call-instant">
                    Call +91 98454 23223
                  </a>
                </div>
              </div>

              {/* Transit Distances Summary */}
              <div className="transit-mini-summary">
                <h4 className="transit-summary-title">Distances from Hotel Pumerai:</h4>
                <ul className="transit-mini-list">
                  <li><strong>Kasarkod Eco Beach:</strong> ~5 km (~8 mins drive)</li>
                  <li><strong>Sharavati River Backwaters:</strong> ~2.8 km (~5 mins drive)</li>
                  <li><strong>Honnavar Railway Station:</strong> ~3.5 km (~9 mins drive)</li>
                  <li><strong>Mirjan Fort:</strong> ~18 km (~22 mins drive)</li>
                  <li><strong>Murudeshwar Temple:</strong> ~26 km (~35 mins drive)</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Contact & Booking Inquiry Form */}
            <div className="contact-form-col">
              <div className="form-wrapper-box">
                <span className="card-mini-tag">SEND AN INQUIRY</span>
                <h3 className="form-box-title">Direct Reservation Request</h3>
                <p className="form-box-desc">
                  Fill in your details below for personalized room inquiries, group bookings, or special requests.
                  Our team confirms within 15 minutes.
                </p>

                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="contact-actual-form">
                    <div className="form-group">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Anand Rao"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="modal-form-input"
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="contact-phone">Phone / WhatsApp *</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="+91 98450 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="modal-form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="you@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="modal-form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message">Inquiry Details / Travel Dates *</label>
                      <textarea
                        id="contact-message"
                        rows="4"
                        required
                        placeholder="Please specify your intended check-in/out dates, room type preference, or any special questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="modal-form-input modal-form-textarea"
                      />
                    </div>

                    <button type="submit" className="button-primary submit-contact-btn">
                      SEND INQUIRY NOW
                    </button>
                    <p className="form-secure-note">
                      🔒 Your contact information is never shared. Direct booking discount is automatically applied.
                    </p>
                  </form>
                ) : (
                  <div className="contact-success-state">
                    <div className="success-icon">&#x2713;</div>
                    <h4 className="success-heading">Message Sent Successfully!</h4>
                    <p className="success-copy">
                      Thank you, <strong>{name}</strong>. Our front desk at NH-66 Honnavar will contact you shortly
                      at <strong>{phone}</strong> with room availability and the 10% direct booking benefit.
                    </p>
                    <div className="success-actions">
                      <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="button-whatsapp-instant">
                        Send Instant WhatsApp Note
                      </a>
                      <button type="button" className="button-secondary" onClick={() => setFormSubmitted(false)}>
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Embedded Official Map in Contact Page */}
              <div className="contact-page-map-box">
                <iframe
                  title="Hotel Pumerai Honnavar Official Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d74.446001!3d14.2904652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc3b0078713aef:0xc5291d53eacaf9a1!5e0!3m2!1sen!2sin!4v0"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="contact-map-iframe"
                />
                <div className="contact-map-action">
                  <a
                    href={officialGoogleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary contact-map-btn"
                  >
                    📍 Get Driving Directions (Open Google Maps)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
