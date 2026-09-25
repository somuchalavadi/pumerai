import { useState } from "react";

const reviewsData = [
  {
    author: "Srikanya Devadiga",
    time: "a month ago",
    rating: 5,
    ratingsBreakdown: "Rooms: 5 · Service: 5 · Location: 5",
    highlights: "Luxury, Great view, Quiet and Great value",
    quote:
      "Absolutely loved my stay at Hotel Pumerai ... The rooms were really good, and the view was absolutely top-notch. The hospitality was excellent, and everyone from the front office staff to the housekeeping team was courteous and welcoming.The breakfast was another highlight , a great variety of options and everything tasted really good! The security guard was also very helpful and made us feel well taken care of. We also ordered food from Mastya Restaurant, and the food, service, and overall experience were excellent . Overall, a wonderful stay with amazing hospitality. Definitely worth it and highly recommended! I’ll surely be coming back again.",
    source: "Google Review",
  },
  {
    author: "MALLIKARJUN R BIRADAR",
    time: "2 months ago",
    rating: 5,
    ratingsBreakdown: "Rooms: 5 · Service: 5 · Location: 5",
    highlights: null,
    quote:
      "I had a very pleasant stay at the hotel. The rooms were clean, comfortable, and well maintained. The staff members were courteous, friendly, and always willing to help. Their prompt service and warm hospitality made my stay enjoyable. I appreciate the excellent support provided by the Ms. ANURUPA & team. I would definitely recommend this hotel to others and look forward to staying here again.",
    source: "Google Review",
  },
  {
    author: "Mystic Valley",
    time: "a month ago",
    rating: 5,
    ratingsBreakdown: "Rooms: 5 · Service: 5 · Location: 5",
    highlights: "Luxury, Great view, Romantic and Quiet",
    quote:
      "1. Rooms- Neat, clean & offered a wonderful garden view.\n\n2. Food - Really good taste & very affordable.\n\n3. Service & Reception- The reception staff were friendly and helpful.\n\n4. Drawbacks- The Pure veg Resturent female restaurant staff need better training. They struggle with English and had trouble taking our food orders correctly.\n\nOverall it is a great stay for the price & rooms though the restaurant service could definitely use improvement.",
    source: "Google Review",
  },
];

export default function TrustReviews() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (idx) => {
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="section reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>GUEST EXPERIENCES &bull; GOOGLE REVIEWS</span>
            </div>
            <h2 id="reviews-heading" className="section-title">
              Loved by travellers <br />
              <span className="title-italic">on Karnataka&apos;s coast.</span>
            </h2>
          </div>
          <p className="header-summary">
            From highway stopovers along NH-66 to family beach vacations in Honnāvar,
            here is what genuine guests share on Google Reviews about their stay at Hotel Pumerai.
          </p>
        </header>

        {/* Big Overall Rating Card */}
        <div className="rating-overview-card" data-reveal>
          <div className="overview-score-box">
            <span className="overview-number">4.7</span>
            <div className="overview-grade-col">
              <div className="stars-row" aria-label="4.7 out of 5 stars" style={{ fontSize: "1.1rem" }}>
                ★★★★★
              </div>
              <span className="overview-grade">4.7 / 5</span>
              <span className="overview-source">Based on 237 Google reviews</span>
            </div>
          </div>

          <div className="overview-pillars">
            <div className="pillar-item">
              <span className="pillar-score">4.9 / 5</span>
              <span className="pillar-label">Rooms</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-score">4.8 / 5</span>
              <span className="pillar-label">Service</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-score">4.8 / 5</span>
              <span className="pillar-label">Location</span>
            </div>
          </div>
        </div>

        {/* 3 Real Guest Quotes Grid */}
        <div className="reviews-cards-grid" data-reveal>
          {reviewsData.map((rev, idx) => {
            const isExpanded = expandedCards[idx];
            const isLong = rev.quote.length > 250;
            return (
              <article className="review-card" key={rev.author}>
                <div>
                  <div className="review-card-top">
                    <div className="stars-row" aria-label="5 out of 5 stars">
                      ★★★★★
                    </div>
                    <span className="review-rating-tag">5 / 5</span>
                  </div>

                  {rev.ratingsBreakdown && (
                    <div
                      className="review-breakdown-row"
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-umber)",
                        marginBottom: "6px",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {rev.ratingsBreakdown}
                    </div>
                  )}

                  {rev.highlights && (
                    <div
                      className="review-highlights-row"
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--accent-champagne)",
                        marginBottom: "12px",
                        fontStyle: "italic",
                      }}
                    >
                      Hotel highlights: {rev.highlights}
                    </div>
                  )}

                  <div className="review-quote-text" style={{ whiteSpace: "pre-line" }}>
                    {isExpanded || !isLong ? rev.quote : `${rev.quote.slice(0, 230)}...`}
                  </div>

                  {isLong && (
                    <button
                      type="button"
                      className="review-expand-btn"
                      onClick={() => toggleExpand(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent-gold)",
                        fontSize: "0.76rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "0 0 14px 0",
                        display: "inline-block",
                        fontFamily: "inherit",
                      }}
                    >
                      {isExpanded ? "Read less ↑" : "Read more ↓"}
                    </button>
                  )}
                </div>

                <div className="review-author-box">
                  <div className="author-avatar" aria-hidden="true">
                    {rev.author[0]}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{rev.author}</span>
                    <span className="author-loc">{rev.time} &bull; {rev.source}</span>
                    <span className="author-verified">&#x2713; Verified Google Review</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
