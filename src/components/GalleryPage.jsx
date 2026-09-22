function GalleryPage() {
  return (
    <main className="page-shell">
      <section className="gallery-coming-page" aria-labelledby="gallery-title">
        <div className="section-container text-center">
          <div className="editorial-tag justify-center">
            <span className="accent-pip" />
            <span>VISUAL ARCHIVE</span>
          </div>
          <h1 id="gallery-title" className="gallery-page-title">
            The gallery is <br />
            <span className="title-italic">coming together.</span>
          </h1>
          <div className="brass-rule-small mx-auto" />
          <p className="gallery-page-copy">
            A visual story of Pumerai, Honnavar and the coast is being prepared.
          </p>
          <div className="gallery-back-home">
            <a href="/" className="button-secondary">
              &larr; BACK TO HOME
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GalleryPage;
