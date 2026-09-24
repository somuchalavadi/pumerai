import GallerySection from "../sections/GallerySection.jsx";

export default function GalleryPage() {
  return (
    <main className="page-shell gallery-page-shell">
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>PHOTOGRAPHY &bull; HOTEL PUMERAI HONNAVAR</span>
          </div>
          <h1 className="page-main-heading">
            Visual Archive &amp; <br />
            <span className="title-italic">Property Gallery</span>
          </h1>
          <p className="page-main-desc">
            Explore authentic photography of our 40 contemporary guestrooms, glass-edge swimming pool,
            on-site coastal dining, and our serene location along NH-66 near Ramateertha Cross.
          </p>
        </div>
      </div>
      <GallerySection isStandalonePage={true} />
    </main>
  );
}
