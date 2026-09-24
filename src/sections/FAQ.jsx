import { useState } from "react";

export const faqList = [
  {
    q: "What are the check-in and check-out times at Hotel Pumerai?",
    a: "Standard check-in begins at 1:00 PM, and check-out is until 11:00 AM. Because Hotel Pumerai is located directly along NH-66, our front desk is staffed 24 hours a day, so late arrivals and early morning departures are seamlessly accommodated. Early check-in or late check-out can be requested subject to availability.",
  },
  {
    q: "What are the swimming pool hours, and is there a children's pool?",
    a: "Our signature glass-edge swimming pool and adjoining children's splash pool are open daily from 6:30 AM to 7:00 PM for all registered hotel guests. Pool towels and sun loungers are provided complimentary at the pool deck.",
  },
  {
    q: "How far is Hotel Pumerai from Kasarkod Beach and Sharavati River?",
    a: "Hotel Pumerai is located approximately 5 km (~8 minutes drive) from Kasarkod Eco Beach (Karnataka's pristine Blue Flag certified beach) and approximately 2.8 km (~5 minutes drive) from the Sharavati River backwaters and boat cruise jetty in Honnavar.",
  },
  {
    q: "Is breakfast included in the room rate?",
    a: "Yes, all direct bookings made through our website, phone desk (+91 98454 23223), or WhatsApp include a complimentary daily hot breakfast buffet served at our on-site restaurants from 7:00 AM to 10:30 AM.",
  },
  {
    q: "What is the pet policy at Hotel Pumerai?",
    a: "To maintain hypoallergenic standards, quiet comfort, and strict sanitation for all guests, pets are not accommodated at Hotel Pumerai.",
  },
  {
    q: "What is the smoking policy on the property?",
    a: "Hotel Pumerai is a 100% smoke-free indoor hotel. All 40 guestrooms, bathrooms, dining halls, and indoor corridors are strictly smoke-free. Designated ventilated outdoor smoking gazebos are provided in the courtyard.",
  },
  {
    q: "Is parking available, and do you have EV charging stations?",
    a: "Yes. We offer complimentary private self-parking on premises with round-the-clock security and CCTV monitoring. We also provide dedicated EV charging bays on-site for electric car road trippers travelling on NH-66.",
  },
  {
    q: "What is the cancellation policy for room bookings?",
    a: "For direct bookings made on our site or through our front desk, we offer free cancellation up to 24 hours prior to your scheduled check-in time (1:00 PM). Cancellations made within 24 hours of arrival are subject to a one-night fee.",
  },
  {
    q: "How do I reach Hotel Pumerai from Honnavar Railway Station?",
    a: "Hotel Pumerai is approximately 3.5 km (~9 minutes drive) from Honnavar Railway Station (HNA) via the main NH-66 highway. Station taxis and auto-rickshaws are readily available outside the station, or you can call our 24-hr front desk for directions.",
  },
  {
    q: "Is Hotel Pumerai a good hotel to stay near Mirjan Fort and Murudeshwar?",
    a: "Yes. Hotel Pumerai on NH-66 serves as the ideal midway base: historic Mirjan Fort is just 18 km north (~22 minutes drive), while Murudeshwar Temple & Beach is 26 km south (~35 minutes drive), making it effortless to explore the entire coastal circuit.",
  },
];

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
              <span>FREQUENTLY ASKED QUESTIONS &bull; AEO READY</span>
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
                  <span className="faq-q-number">0{index + 1}</span>
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
