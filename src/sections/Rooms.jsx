import { editorialFrames } from "../utils/frames.js";

const rooms = [
  {
    name: "Deluxe Room",
    image: editorialFrames.roomOne,
    description: "A calm room shaped for unhurried mornings and easy evenings.",
  },
  {
    name: "Premium Room",
    image: editorialFrames.roomTwo,
    description: "Warm finishes and a little more room to settle into the stay.",
  },
  {
    name: "Pumerai Suite",
    image: editorialFrames.roomThree,
    description: "A more expansive setting with a composed, residential feeling.",
  },
  {
    name: "Signature Suite",
    image: editorialFrames.roomFour,
    description: "The most generous expression of the Pumerai way of staying.",
  },
];

function Rooms() {
  return (
    <section className="section rooms-section" id="rooms">
      <div className="split-heading" data-reveal>
        <span>ROOMS</span>
        <h2>Spaces for deep rest</h2>
      </div>
      <div className="rooms-layout">
        {rooms.map((room, index) => (
          <article className="room-card" key={room.name} data-reveal>
            <figure>
              <img src={room.image} alt={`${room.name} at Pumerai Hotel`} />
            </figure>
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <a href="/contact">Enquire</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Rooms;
