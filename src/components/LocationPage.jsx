import Location from "../sections/Location.jsx";

export default function LocationPage() {
  return (
    <main className="page-shell location-page-shell">
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>NH-66 HONNAVAR &bull; TRANSIT &bull; LOCAL ATTRACTIONS</span>
          </div>
          <h1 className="page-main-heading">
            Location &amp; Discover <br />
            <span className="title-italic">Honnavar, Karnataka</span>
          </h1>
          <p className="page-main-desc">
            Hotel Pumerai is situated directly on National Highway 66 near Ramateertha Cross in Honnavar,
            Uttara Kannada, Karnataka. Minutes from Kasarkod Eco Beach, Sharavati River backwaters, and Konkan Railway junction.
          </p>
        </div>
      </div>
      <Location isStandalonePage={true} />
    </main>
  );
}
