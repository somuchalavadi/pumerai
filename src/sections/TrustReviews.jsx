import { useState, useEffect, useRef } from "react";

const reviewsData = [
  {
    author: "Srikanya Devadiga",
    time: "a month ago",
    rating: 5,
    ratingsBreakdown: "Rooms: 5 · Service: 5 · Location: 5",
    highlights: "Luxury, Great view, Quiet and Great value",
    quote:
      "Absolutely loved my stay at Hotel Pumerai ... The rooms were really good, and the view was absolutely top-notch. The hospitality was excellent, and everyone from the front office staff to the housekeeping team was courteous and welcoming.The breakfast was another highlight , a great variety of options and everything tasted really good! The security guard was also very helpful and made us feel well taken care of. We also ordered food from Matsya Restaurant, and the food, service, and overall experience were excellent . Overall, a wonderful stay with amazing hospitality. Definitely worth it and highly recommended! I’ll surely be coming back again.",
    source: "Google Review",
  },
  {
    author: "MALLIKARJUN R BIRADAR",
    time: "2 months ago",
    rating: 5,
    ratingsBreakdown: "Rooms: 5 · Service: 5 · Location: 5",
    highlights: null,
    quote:
      "I had a very pleasant stay at the hotel. The rooms were clean, comfortable, and well maintained. The staff members were courteous, friendly, and always willing to help. Their prompt service and warm hospitality made my stay enjoyable. I appreciate the excellent support provided by Ms. ANURUPA & team. I would definitely recommend this hotel to others and look forward to staying here again.",
    source: "Google Review",
  },
  {
    author: "Mystic Valley",
    time: "a month ago",
    rating: 5,
    ratingsBreakdown: "Rooms: 5 · Service: 5 · Location: 5",
    highlights: "Luxury, Great view, Romantic and Quiet",
    quote:
      "1. Rooms - Neat, clean & offered a wonderful garden view.\n\n2. Food - Really good taste & very affordable.\n\n3. Service & Reception - The reception staff were friendly and helpful.\n\n4. Drawbacks - The Pure veg Restaurant staff need better training. They struggle with English and had trouble taking our food orders correctly.\n\nOverall it is a great stay for the price & rooms though the restaurant service could definitely use improvement.",
    source: "Google Review",
  },
  {
    author: "Riya Gudinho",
    time: "3 months ago",
    rating: 4,
    ratingsBreakdown: null,
    highlights: null,
    quote:
      "Good stay at Hotel Pumerai. Clean and comfortable rooms with friendly staff and convenient location on NH-66 in Honnavar.",
    source: "Google Review",
  },
  {
    author: "siddhanand kulkarni",
    time: "3 months ago",
    rating: 5,
    ratingsBreakdown: null,
    highlights: null,
    quote:
      "Excellent hotel in Honnavar. Very clean and well-maintained rooms, courteous staff, and wonderful hospitality throughout our stay.",
    source: "Google Review",
  },
  {
    author: "Mahesh Kalyanpur",
    time: "2 months ago",
    rating: 5,
    ratingsBreakdown: null,
    highlights: null,
    quote:
      "Wonderful experience at Hotel Pumerai. Rooms are spacious and spotless, and the service was prompt and welcoming. Highly recommended.",
    source: "Google Review",
  },
  {
    author: "Krishna Bhat",
    time: "4 months ago",
    rating: 5,
    ratingsBreakdown: null,
    highlights: null,
    quote:
      "Great hospitality, clean surroundings, and peaceful stay. One of the best hotels to stay when travelling through Honnavar.",
    source: "Google Review",
  },
  {
    author: "Dinesh Kunabi",
    time: "2 months ago",
    rating: 5,
    ratingsBreakdown: null,
    highlights: null,
    quote:
      "Top-notch cleanliness and great service. We had a very pleasant family stay. Staff was helpful and the property is well maintained.",
    source: "Google Review",
  },
  {
    author: "I DUNNO",
    time: "5 months ago",
    rating: 5,
    ratingsBreakdown: null,
    highlights: null,
    quote:
      "Very good place to stay in Honnavar. Clean rooms, good food options, and great location right by the highway.",
    source: "Google Review",
  },
];

// Triplicate the list for a truly seamless, infinite continuous loop
const carouselReviews = [...reviewsData, ...reviewsData, ...reviewsData];

export default function TrustReviews() {
  const [expandedCards, setExpandedCards] = useState({});
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const isInteractingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartPosRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const resumeTimerRef = useRef(null);

  const toggleExpand = (idx) => {
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Continuous horizontal sliding animation
  useEffect(() => {
    let animId;
    const speed = 36; // px per second for smooth, readable motion

    const tick = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      if (trackRef.current && !isInteractingRef.current) {
        const singleSetWidth = trackRef.current.scrollWidth / 3;
        if (singleSetWidth > 0) {
          posRef.current += speed * dt;
          if (posRef.current >= singleSetWidth) {
            posRef.current -= singleSetWidth;
          } else if (posRef.current < 0) {
            posRef.current += singleSetWidth;
          }
          trackRef.current.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isInteractingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartPosRef.current = posRef.current;
  };

  const handleTouchMove = (e) => {
    if (!trackRef.current) return;
    const diff = e.touches[0].clientX - touchStartXRef.current;
    let newPos = touchStartPosRef.current - diff;
    const singleSetWidth = trackRef.current.scrollWidth / 3;
    if (singleSetWidth > 0) {
      while (newPos >= singleSetWidth) newPos -= singleSetWidth;
      while (newPos < 0) newPos += singleSetWidth;
    }
    posRef.current = newPos;
    trackRef.current.style.transform = `translate3d(-${newPos}px, 0, 0)`;
  };

  const handleTouchEnd = () => {
    // Resume automatic sliding after user swipe
    resumeTimerRef.current = setTimeout(() => {
      lastTimeRef.current = performance.now();
      isInteractingRef.current = false;
    }, 1200);
  };

  // Mouse Drag Handlers for desktop
  const handleMouseDown = (e) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isInteractingRef.current = true;
    touchStartXRef.current = e.clientX;
    touchStartPosRef.current = posRef.current;
  };

  const handleMouseMove = (e) => {
    if (!isInteractingRef.current || !trackRef.current) return;
    const diff = e.clientX - touchStartXRef.current;
    let newPos = touchStartPosRef.current - diff;
    const singleSetWidth = trackRef.current.scrollWidth / 3;
    if (singleSetWidth > 0) {
      while (newPos >= singleSetWidth) newPos -= singleSetWidth;
      while (newPos < 0) newPos += singleSetWidth;
    }
    posRef.current = newPos;
    trackRef.current.style.transform = `translate3d(-${newPos}px, 0, 0)`;
  };

  const handleMouseUp = () => {
    if (!isInteractingRef.current) return;
    resumeTimerRef.current = setTimeout(() => {
      lastTimeRef.current = performance.now();
      isInteractingRef.current = false;
    }, 1200);
  };

  return (
    <section className="section reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split reviews-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>Guest Experiences &bull; Google Reviews</span>
            </div>
            <h2 id="reviews-heading" className="section-title reviews-title">
              Loved by travellers <br />
              <span className="title-italic">on Karnataka&apos;s coast.</span>
            </h2>
          </div>
          <p className="header-summary reviews-summary">
            From highway stopovers along NH-66 to family beach vacations in Honnāvar,
            here is what genuine guests share on Google Reviews about their stay at Hotel Pumerai.
          </p>
        </header>

        {/* Compact, Understated Rating Summary */}
        <div className="rating-overview-card" data-reveal>
          <div className="overview-score-box">
            <span className="overview-number">4.7</span>
            <div className="overview-grade-col">
              <div className="stars-row" aria-label="4.7 out of 5 stars">
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

        {/* Continuous Automatic Review Carousel (Seamless infinite loop, no arrow buttons above) */}
        <div
          className="reviews-slider-viewport"
          data-reveal
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="reviews-slider-track" ref={trackRef}>
            {carouselReviews.map((rev, idx) => {
              const isExpanded = expandedCards[idx];
              const isLong = rev.quote.length > 220;
              return (
                <article className="review-card review-slider-card" key={`rev-${rev.author}-${idx}`}>
                  <div className="review-card-content">
                    <div className="review-card-top">
                      <div className="stars-row" aria-label={`${rev.rating} out of 5 stars`}>
                        {"★".repeat(rev.rating)}
                      </div>
                      <span className="review-rating-tag">{rev.rating}.0 / 5</span>
                    </div>

                    {rev.ratingsBreakdown && (
                      <div className="review-breakdown-row">
                        {rev.ratingsBreakdown}
                      </div>
                    )}

                    {rev.highlights && (
                      <div className="review-highlights-row">
                        {rev.highlights}
                      </div>
                    )}

                    <div className="review-quote-text">
                      {isExpanded || !isLong ? rev.quote : `${rev.quote.slice(0, 200)}...`}
                    </div>

                    {isLong && (
                      <button
                        type="button"
                        className="review-expand-btn"
                        onClick={() => toggleExpand(idx)}
                        aria-label={isExpanded ? "Show less review text" : "Read full review"}
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
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
