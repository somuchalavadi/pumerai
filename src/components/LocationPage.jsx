import Location from "../sections/Location.jsx";

export default function LocationPage() {
  return (
    <main className="page-shell location-page-shell">
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>LOCATION &bull; HONNĀVAR</span>
          </div>
          <h1 className="page-main-heading">
            Location &amp; Discover <br />
            <span className="title-italic">Honnāvar, Karnataka</span>
          </h1>
          <p className="page-main-desc">
            On NH-66, near Kasarkod Beach, Sharavathi backwaters and Honnāvar.
          </p>
        </div>
      </div>
      <Location isStandalonePage={true} />
    </main>
  );
}
