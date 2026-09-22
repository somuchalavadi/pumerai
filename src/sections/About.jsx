import { editorialFrames } from "../utils/frames.js";

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-container">
        <div className="about-content-wrapper">
          <div className="about-text-block" data-reveal>
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ABOUT HOTEL PUMERAI</span>
            </div>
            <h2 className="section-title">
              A place to arrive.
              <br />
              <span className="title-italic">A place to explore.</span>
            </h2>
            <div className="brass-rule-small" />
            <p className="lead-paragraph">
              Set along NH-66 near Ramateertha Cross in Honnavar, Hotel Pumerai offers a
              contemporary stay for travellers discovering Karnataka&apos;s western coast.
            </p>
            <p className="body-paragraph">
              With modern rooms, thoughtful facilities, dining experiences, and a
              resort-style swimming pool, Pumerai brings together the ease of a
              well-connected highway location with the comfort of a destination hotel.
            </p>
            <div className="location-badge">
              <span className="badge-marker">NH-66</span>
              <span className="badge-sep">/</span>
              <span className="badge-text">Honnavar, Karnataka</span>
            </div>
          </div>

          <figure className="editorial-figure about-figure" data-reveal>
            <div className="figure-inner">
              <img
                src={editorialFrames.arrival}
                alt="Hotel Pumerai architectural entrance and facade on NH-66"
                loading="lazy"
              />
            </div>
            <figcaption className="editorial-caption">
              <span>01 &mdash; ARCHITECTURE</span>
              <span>NH-66 Arrival &amp; Courtyard</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default About;
