import { useState } from "react";
import { faqList } from "../data/faqs.js";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 id="faq-heading" className="section-title">
              Clear answers for <br />
              <span className="title-italic">a seamless stay.</span>
            </h2>
          </div>
          <p className="header-summary">
            Everything you need to know about check-in, pool timings, Kasarkod Beach proximity,
            dining, and amenities at Hotel Pumerai in Honnavar.
          </p>
        </header>

        {/* Accessible Accordion Stack */}
        <div className="faq-accordion-stack" data-reveal>
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-q-${index}`;
            const panelId = `faq-a-${index}`;
            const formattedNumber = String(index + 1).padStart(2, "0");

            return (
              <div className={`faq-item ${isOpen ? "is-expanded" : ""}`} key={item.q}>
                <button
                  type="button"
                  id={headingId}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(index)}
                >
                  <span className="faq-q-number">{formattedNumber}</span>
                  <span className="faq-q-divider" aria-hidden="true">|</span>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon-indicator" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`faq-answer-panel ${isOpen ? "is-open" : ""}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Further Assistance Banner */}
        <div className="faq-help-box" data-reveal>
          <div className="help-text">
            <span className="help-title">Have an unanswered question?</span>
            <span className="help-sub">Our 24-hour Honnavar front desk is here to assist you anytime.</span>
          </div>
          <div className="help-actions">
            <a href="tel:+919845423223" className="button-primary">
              CALL +91 98454 23223
            </a>
            <a
              href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20have%20a%20question%20regarding%20my%20stay."
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
