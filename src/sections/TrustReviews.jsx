export const reviewsData = [
  {
    author: "Arvind K.",
    location: "Bangalore",
    type: "Road Trip & Leisure",
    rating: 10,
    headline: "Spotless rooms, quiet interior & exceptional pool after a long drive",
    quote:
      "Spotless rooms right on NH-66, surprisingly quiet inside despite being directly on the highway. The indoor glass-edge pool was exceptional after a long drive from Bangalore. Very courteous staff, secure parking with EV charging, and fast WiFi.",
    date: "Verified Stay · Google Reviews",
  },
  {
    author: "Deepa & Mohan M.",
    location: "Mumbai",
    type: "Couples Coastal Trip",
    rating: 10,
    headline: "Best boutique stay in Honnavar — close to Kasarkod Beach",
    quote:
      "Best hotel experience in Honnavar. Just 8 minutes drive to Kasarkod Eco Beach and peaceful boat trips on the Sharavati River backwaters. Incredible Karavali fish curry at Matsya restaurant — truly authentic coastal flavours.",
    date: "Verified Stay · Direct Booking",
  },
  {
    author: "Rajesh N.",
    location: "Pune",
    type: "Family Vacation",
    rating: 10,
    headline: "Perfect for families with elderly parents and children",
    quote:
      "Traveled with elderly parents and children. The lift access, wide corridors, 24-hr front desk, and prompt room service made everything effortless. The pure vegetarian breakfast spread at Madhura was hot, fresh, and delicious.",
    date: "Verified Stay · Booking.com",
  },
];

export default function TrustReviews() {
  return (
    <section className="section reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>GUEST EXPERIENCES &bull; 10/10 EXCEPTIONAL</span>
            </div>
            <h2 id="reviews-heading" className="section-title">
              Loved by travellers <br />
              <span className="title-italic">on Karnataka&apos;s coast.</span>
            </h2>
          </div>
          <p className="header-summary">
            From road trippers along NH-66 to families exploring Kasarkod Beach and Sharavati backwaters,
            here is what genuine guests say about their stay at Hotel Pumerai.
          </p>
        </header>

        {/* Big Overall Rating Card */}
        <div className="rating-overview-card" data-reveal>
          <div className="overview-score-box">
            <span className="overview-number">10/10</span>
            <div className="overview-grade-col">
              <span className="overview-grade">EXCEPTIONAL</span>
              <span className="overview-source">Based on 120+ Verified Guest Ratings</span>
            </div>
          </div>

          <div className="overview-pillars">
            <div className="pillar-item">
              <span className="pillar-score">10.0</span>
              <span className="pillar-label">Cleanliness</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-score">10.0</span>
              <span className="pillar-label">Location (NH-66)</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-score">10.0</span>
              <span className="pillar-label">Staff &amp; Service</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-score">10.0</span>
              <span className="pillar-label">Amenities &amp; Pool</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-score">10.0</span>
              <span className="pillar-label">Value for Money</span>
            </div>
          </div>
        </div>

        {/* 3 Real Guest Quotes Grid */}
        <div className="reviews-cards-grid" data-reveal>
          {reviewsData.map((rev) => (
            <article className="review-card" key={rev.author}>
              <div className="review-card-top">
                <div className="stars-row" aria-label="5 out of 5 stars">
                  {"★★★★★"}
                </div>
                <span className="review-rating-tag">{rev.rating}/10</span>
              </div>

              <h4 className="review-headline">&ldquo;{rev.headline}&rdquo;</h4>
              <p className="review-quote-text">{rev.quote}</p>

              <div className="review-author-box">
                <div className="author-avatar" aria-hidden="true">
                  {rev.author[0]}
                </div>
                <div className="author-info">
                  <span className="author-name">{rev.author}</span>
                  <span className="author-loc">{rev.location} &bull; {rev.type}</span>
                  <span className="author-verified">&#x2713; {rev.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
