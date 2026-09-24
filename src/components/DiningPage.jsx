import Dining from "../sections/Dining.jsx";

export default function DiningPage({ onNavigate }) {
  return (
    <main className="page-shell dining-page-shell">
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>DINING &bull; HONNĀVAR</span>
          </div>
          <h1 className="page-main-heading">
            Coastal Dining &amp; <br />
            <span className="title-italic">Culinary Journeys</span>
          </h1>
          <p className="page-main-desc">
            Coastal flavours, fresh local ingredients and relaxed dining at Hotel Pumerai.
          </p>
        </div>
      </div>
      <Dining isStandalonePage={true} onNavigate={onNavigate} />
    </main>
  );
}
