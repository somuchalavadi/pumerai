import { useState } from "react";
import { editorialFrames } from "../utils/frames.js";

const venuesData = [
  {
    id: "matsya",
    name: "MATSYA MULTICUISINE RESTAURANT",
    subtitle: "Coastal Karavali Seafood, North Indian & Continental",
    hours: "7:00 AM – 10:30 PM Daily",
    mealTimes: "Breakfast: 7:00–10:30 AM · Lunch: 12:30–3:30 PM · Dinner: 7:00–10:30 PM",
    image: editorialFrames.matsya,
    alt: "Matsya Multicuisine Restaurant dining room at Hotel Pumerai Honnavar",
    description:
      "Matsya brings the rich coastal bounty of Uttara Kannada to your plate. From morning breakfast spreads to fresh daily catch prepared in authentic Karavali spices, tandoori grills, and pan-Asian favorites.",
    signatureDishes: [
      { name: "Honnavar Karavali Fish Curry", desc: "Fresh local catch slow-simmered in freshly grated coconut, Byadagi chilli, and tangy wild kokum." },
      { name: "Prawns Ghee Roast", desc: "Plump Arabian Sea prawns tossed in deeply aromatic Karavali red masala and pure country ghee." },
      { name: "Butter Garlic Mud Crab", desc: "Sweet, succulent local crab meat tossed in crushed garlic, herbs, and lemon butter." },
      { name: "Murgh Malai Kebab", desc: "Tender chicken morsels marinated in cardamom cream, roasted in the clay tandoor." },
    ],
    menuCategories: [
      {
        title: "Coastal Specialties",
        items: [
          { name: "Surmai / Pomfret Rava Fry", price: "₹380", note: "Semolina-crusted golden pan fry" },
          { name: "Honnavar Prawns Curry & Steamed Rice", price: "₹420", note: "Traditional coastal coconut broth" },
          { name: "Crab Sukka", price: "₹450", note: "Dry-roasted crab in grated coconut & spices" },
          { name: "Squid Butter Pepper", price: "₹360", note: "Fresh rings tossed with crushed black pepper" },
        ],
      },
      {
        title: "Tandoori & Grills",
        items: [
          { name: "Murgh Tikka Angara", price: "₹340", note: "Clay oven roasted spiced chicken" },
          { name: "Paneer Malai Tikka", price: "₹310", note: "Cream cheese marinated cottage cheese" },
          { name: "Tandoori Pomfret", price: "₹460", note: "Whole fish marinated in ajwain & mustard oil" },
        ],
      },
      {
        title: "Main Course & Biryanis",
        items: [
          { name: "Matsya Special Sea Food Biryani", price: "₹390", note: "Aromatic basmati layered with fish & prawns" },
          { name: "Butter Chicken Masala", price: "₹360", note: "Rich velvety tomato-cashew makhani gravy" },
          { name: "Dal Tadka & Steamed Jeera Rice", price: "₹240", note: "Yellow lentils tempered with cumin & garlic" },
        ],
      },
    ],
  },
  {
    id: "madhura",
    name: "MADHURA VEG RESTAURANT",
    subtitle: "100% Pure Vegetarian South Indian & Coastal Satvik",
    hours: "6:30 AM – 10:00 PM Daily",
    mealTimes: "All-Day Dining · Breakfast: 6:30–11:00 AM · Pure Veg Kitchen",
    image: editorialFrames.madhura,
    alt: "Madhura Pure Vegetarian Restaurant at Hotel Pumerai Honnavar",
    description:
      "A dedicated pure vegetarian sanctuary honoring Karnataka's rich vegetarian culinary heritage. Experience crisp golden dosas, delicate neer dosas, elaborate noon thalis, and freshly ground filter coffee.",
    signatureDishes: [
      { name: "Crispy Benne Masala Dosa", desc: "Traditional butter-roasted fermented crepe folded with spiced potato mash, served with trio of chutneys." },
      { name: "Mangalorean Neer Dosa", desc: "Feather-light steamed rice crepes paired with mildly spiced coconut vegetable kurma." },
      { name: "Special Karavali Veg Thali", desc: "Wholesome midday banquet featuring seasonal local curries, rasam, kootu, papad, and payasam." },
      { name: "Degree Filter Kaapi", desc: "Freshly brewed South Indian chicory blend with frothy whole milk in brass davarah." },
    ],
    menuCategories: [
      {
        title: "Morning Tiffins (6:30 AM – 11:30 AM)",
        items: [
          { name: "Ghee Roast Masala Dosa", price: "₹120", note: "Crispy butter dosa with spiced potato" },
          { name: "Neer Dosa with Veg Kurma (4 pcs)", price: "₹130", note: "Silky coastal rice crepes" },
          { name: "Steamed Idli & Vada Combo", price: "₹95", note: "Served with sambar and fresh coconut chutney" },
          { name: "Rava Onion Dosa", price: "₹130", note: "Crispy semolina crepe studded with green chilies" },
        ],
      },
      {
        title: "Meals & Curries (12:00 PM – 10:00 PM)",
        items: [
          { name: "Special Karavali Veg Meals (Thali)", price: "₹180", note: "Unlimited rice, rasam, sambar, 2 curries, sweet" },
          { name: "Paneer Butter Masala", price: "₹260", note: "Cottage cheese in rich buttery gravy" },
          { name: "Kaju Curry", price: "₹290", note: "Cashew nuts simmered in fragrant gravy" },
          { name: "Bisi Bele Bath", price: "₹140", note: "Karnataka spicy rice-lentil stew with boondi" },
        ],
      },
      {
        title: "Beverages & Desserts",
        items: [
          { name: "Traditional Filter Kaapi", price: "₹45", note: "Brewed in classic brass davarah" },
          { name: "Fresh Tender Coconut Payasam", price: "₹90", note: "Sweet cardamom-spiced dessert" },
          { name: "Salted / Sweet Coastal Buttermilk", price: "₹50", note: "Tempered with ginger, curry leaves & mustard" },
        ],
      },
    ],
  },
  {
    id: "madira",
    name: "MADIRA BAR & LOUNGE",
    subtitle: "Fine Spirits, Coastal Mocktails, Finger Bites & Coffee",
    hours: "11:00 AM – 11:00 PM Daily",
    mealTimes: "Lounge & Evening Cocktails · Coffee & Espresso Bar",
    image: editorialFrames.madira,
    alt: "Madira Bar and Lounge at Hotel Pumerai Honnavar",
    description:
      "An intimate, stylish evening retreat for hotel guests and highway stopover travellers. Unwind over premium spirits, artisanal mocktails made with local wild kokum, gourmet coffee, and savory appetizers.",
    signatureDishes: [
      { name: "Kokum Spiced Mist", desc: "Wild forest kokum, muddled mint, black salt, and sparkling soda." },
      { name: "Honnavar Pepper Calamari", desc: "Flash-fried tender squid tossed with cracked Tellicherry black pepper and curry leaf." },
      { name: "Spicy Paneer Tikka Cubes", desc: "Marinated cottage cheese charred over charcoal with mint-coriander emulsion." },
      { name: "Artisan Double Espresso", desc: "Single-origin Arabica roast extracted fresh from our espresso machine." },
    ],
    menuCategories: [
      {
        title: "Beverages & Cocktails",
        items: [
          { name: "Wild Kokum Coastal Cooler", price: "₹140", note: "Native kokum, roasted cumin, lime, sparkling soda" },
          { name: "Blue Lagoon Curacao Mocktail", price: "₹160", note: "Citrus, blue curacao syrup, sparkling lemonade" },
          { name: "Fresh Watermelon Basil Sparkler", price: "₹140", note: "Freshly pressed watermelon with sweet basil" },
          { name: "Curated Domestic & Imported Spirits", price: "A La Carte", note: "Ask server for full bar catalog" },
        ],
      },
      {
        title: "Lounge Appetizers & Small Plates",
        items: [
          { name: "Ghee Roast Chicken Wings", price: "₹310", note: "Tossed in fiery Byadagi masala" },
          { name: "Crispy Corn & Water Chestnut", price: "₹240", note: "Wok-tossed with scallions and mild chili" },
          { name: "Chicken 65", price: "₹280", note: "South Indian spiced crispy chicken bites" },
        ],
      },
    ],
  },
];

export default function Dining({ sectionId = "dining", headingId = "dining-heading" }) {
  const [activeMenuVenue, setActiveMenuVenue] = useState(null);

  const handleOpenMenu = (venue) => {
    setActiveMenuVenue(venue);
  };

  const handleCloseMenu = () => {
    setActiveMenuVenue(null);
  };

  return (
    <section className="section dining-section" id={sectionId} aria-labelledby={headingId}>
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ON-SITE RESTAURANTS &bull; HOTEL PUMERAI</span>
            </div>
            <h2 id={headingId} className="section-title">
              Coastal culinary <br />
              <span className="title-italic">journeys on NH-66.</span>
            </h2>
          </div>
          <p className="header-summary">
            Hotel Pumerai houses two distinctive on-site restaurants and an evening lounge.
            Whether craving fresh Karavali seafood, pure vegetarian delicacies, or a quiet evening cocktail,
            our kitchens emphasize fresh local sourcing and coastal hospitality.
          </p>
        </header>

        {/* Venues Grid */}
        <div className="dining-venues-grid">
          {venuesData.map((venue) => (
            <article className="venue-card" key={venue.id} data-reveal>
              <div className="venue-media-container">
                <figure className="venue-figure">
                  <img src={venue.image} alt={venue.alt} loading="lazy" className="venue-image" />
                </figure>
                <div className="venue-hours-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{venue.hours}</span>
                </div>
              </div>

              <div className="venue-details-body">
                <div className="venue-header-row">
                  <span className="venue-cuisine-tag">{venue.subtitle}</span>
                  <h3 className="venue-title">{venue.name}</h3>
                </div>

                <p className="venue-desc">{venue.description}</p>

                <div className="signature-dishes-block">
                  <span className="dishes-heading">SIGNATURE DISHES &amp; HIGHLIGHTS:</span>
                  <div className="dishes-list">
                    {venue.signatureDishes.map((dish) => (
                      <div className="dish-item" key={dish.name}>
                        <div className="dish-name-row">
                          <span className="dish-bullet">&mdash;</span>
                          <strong className="dish-title">{dish.name}:</strong>
                        </div>
                        <p className="dish-summary">{dish.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="venue-cta-row">
                  <button
                    type="button"
                    className="button-primary menu-view-btn"
                    onClick={() => handleOpenMenu(venue)}
                    aria-label={`View Curated Menu for ${venue.name}`}
                  >
                    <span>VIEW CURATED MENU</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <a
                    href="tel:+919845423223"
                    className="button-secondary table-reserve-btn"
                    aria-label={`Reserve table at ${venue.name}`}
                  >
                    RESERVE A TABLE
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Restaurant Menu Modal */}
      {activeMenuVenue && (
        <div className="menu-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="menu-venue-title">
          <div className="menu-modal-backdrop" onClick={handleCloseMenu} />
          <div className="menu-modal-card">
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseMenu}
              aria-label="Close restaurant menu"
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
                * All items prepared fresh to order. Seasonal seafood rates subject to daily catch availability. Taxes extra as applicable.
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
    </section>
  );
}
