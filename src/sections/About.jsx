import { editorialFrames } from "../utils/frames.js";

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-kicker" data-reveal>
        ABOUT
      </div>
      <div className="about-grid">
        <div className="section-copy" data-reveal>
          <h2>A quieter way to stay</h2>
          <p>
            Pumerai is imagined as a place to step away from the pace of everyday life.
            Spaces are considered, materials are understated, and every detail is intended
            to make a stay feel effortless.
          </p>
        </div>
        <figure className="editorial-image about-image" data-reveal>
          <img src={editorialFrames.lobby} alt="Pumerai reception lobby with warm lighting" />
        </figure>
      </div>
    </section>
  );
}

export default About;
