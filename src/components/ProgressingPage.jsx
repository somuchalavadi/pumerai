function ProgressingPage({ title }) {
  return (
    <main className="page-shell">
      <section className="progressing-page" aria-labelledby={`${title.toLowerCase()}-title`}>
        <p>{title}</p>
        <h1 id={`${title.toLowerCase()}-title`}>Progressing</h1>
        <span>A new chapter of Pumerai is being prepared.</span>
      </section>
    </main>
  );
}

export default ProgressingPage;
