export default function PageHeader({
  eyebrow,
  title,
  italicTitle,
  description,
  id = "page-heading",
}) {
  return (
    <header className="page-header-compact" aria-labelledby={id}>
      <div className="section-container">
        {eyebrow && (
          <div className="editorial-tag page-header-eyebrow">
            <span className="accent-pip" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 id={id} className="page-header-title">
          {title}
          {italicTitle && (
            <>
              {" "}
              <span className="title-italic">{italicTitle}</span>
            </>
          )}
        </h1>
        {description && <p className="page-header-desc">{description}</p>}
      </div>
    </header>
  );
}
