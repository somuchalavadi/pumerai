import Dining from "../sections/Dining.jsx";

export default function DiningPage() {
  return (
    <main className="page-shell dining-page-shell">
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>ON-SITE RESTAURANTS &bull; HOTEL PUMERAI HONNAVAR</span>
          </div>
          <h1 className="page-main-heading">
            Coastal Dining &amp; <br />
            <span className="title-italic">Culinary Journeys</span>
          </h1>
          <p className="page-main-desc">
            Hotel Pumerai houses two distinctive on-site restaurants and an evening lounge along NH-66.
            Experience authentic coastal Karavali seafood, pure vegetarian delicacies, and refreshing evening beverages.
          </p>
        </div>
      </div>
      <Dining isStandalonePage={true} />
      <Dining isStandalonePage={true} sectionId="dining-section-2" headingId="dining-heading-2" />
    </main>
  );
}
