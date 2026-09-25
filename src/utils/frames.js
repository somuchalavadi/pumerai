export const FRAME_COUNT = 240;

export function framePath(frameNumber) {
  const safeNumber = Math.max(1, Math.min(FRAME_COUNT, Math.round(frameNumber)));
  return `/frames/pumerai_${String(safeNumber).padStart(4, "0")}.webp`;
}

const heroFrameModules = import.meta.glob("../../frames/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});

export const HERO_FRAME_PATHS = Object.entries(heroFrameModules)
  .map(([path, source]) => {
    const match = path.match(/(\d+)(?=\.jpg$)/i);
    return { frameNumber: match ? Number(match[1]) : Number.NaN, source };
  })
  .filter(({ frameNumber }) => Number.isFinite(frameNumber))
  .sort((first, second) => first.frameNumber - second.frameNumber)
  .map(({ source }) => source);

export const HERO_FRAME_COUNT = HERO_FRAME_PATHS.length;

export function heroFramePath(frameNumber) {
  const frameIndex = Math.max(0, Math.min(HERO_FRAME_COUNT - 1, Math.round(frameNumber) - 1));
  return HERO_FRAME_PATHS[frameIndex];
}

export const editorialFrames = {
  exteriorWide: framePath(1),
  arrival: framePath(64),
  pool: framePath(96),
  lobby: framePath(120),
  dining: framePath(142),
  matsya: framePath(142),
  madhura: framePath(136),
  madira: framePath(148),
  detail: framePath(154),
  passage: framePath(178),
  roomOne: framePath(198),
  roomTwo: framePath(206),
  roomThree: framePath(218),
  roomFour: framePath(232),
  coast: framePath(32),
  scenic: framePath(48),
};

// Multi-photo sets for Rooms & Rates selection grid
export const roomPhotoSets = {
  comfortGarden: [
    { src: framePath(198), alt: "Comfort Room Garden View king bed with crisp white linens and warm teak accents" },
    { src: framePath(194), alt: "Comfort Room Garden View spacious work desk and ambient lighting" },
    { src: framePath(202), alt: "Comfort Room en-suite bathroom with walk-in rain shower and vanity" },
    { src: framePath(204), alt: "Comfort Room garden outlook through sound-insulated panoramic windows" },
  ],
  deluxePool: [
    { src: framePath(206), alt: "Deluxe Pool View Room king bed with private balcony seating" },
    { src: framePath(208), alt: "Deluxe Room private balcony overlooking the glass-edge swimming pool" },
    { src: framePath(212), alt: "Deluxe Room lounge seating nook and 50-inch smart TV setup" },
    { src: framePath(214), alt: "Deluxe Room luxury bathroom with stone finishes and premium toiletries" },
  ],
  executiveSuite: [
    { src: framePath(218), alt: "Executive Family Suite master bedroom with plush king bed and custom millwork" },
    { src: framePath(220), alt: "Executive Suite separate living lounge with comfortable sofa bed and dining table" },
    { src: framePath(224), alt: "Executive Suite dressing area, bespoke wardrobe, and safety locker" },
    { src: framePath(226), alt: "Executive Suite dual vanity bathroom with glass-enclosed rain shower" },
  ],
  heritageSuite: [
    { src: framePath(232), alt: "Premium Heritage Suite master suite with Karavali artisanal wood elements" },
    { src: framePath(228), alt: "Heritage Suite expansive living room with coastal views" },
    { src: framePath(236), alt: "Heritage Suite deep soaking bath tub and walk-in rain shower" },
    { src: framePath(240), alt: "Heritage Suite sunset twilight ambiance and private terrace" },
  ],
};

// Curated Lightbox Gallery Images
export const galleryItems = [
  {
    id: 1,
    category: "exterior",
    categoryLabel: "Exterior",
    title: "Hotel Pumerai NH-66 Entrance",
    src: framePath(1),
    alt: "Hotel Pumerai architectural facade and entry driveway on NH-66 Honnavar",
    caption: "Modern boutique facade positioned seamlessly along the coastal highway of Honnavar.",
  },
  {
    id: 2,
    category: "pool",
    categoryLabel: "Pool",
    title: "Signature Glass-Edge Swimming Pool",
    src: framePath(96),
    alt: "Hotel Pumerai glass-edge swimming pool with sun loungers and deck",
    caption: "Temperature-balanced swimming pool open daily from 6:30 AM to 7:00 PM.",
  },
  {
    id: 3,
    category: "rooms",
    categoryLabel: "Rooms",
    title: "Comfort Room Garden View",
    src: framePath(198),
    alt: "Comfort Room Garden View at Hotel Pumerai Honnavar",
    caption: "315 sq ft of serene comfort with courtyard garden outlook.",
  },
  {
    id: 4,
    category: "dining",
    categoryLabel: "Dining",
    title: "Matsya Multicuisine Restaurant",
    src: framePath(142),
    alt: "Matsya Multicuisine Restaurant dining room at Hotel Pumerai",
    caption: "Coastal Karavali seafood, North Indian, and continental delights.",
  },
  {
    id: 5,
    category: "rooms",
    categoryLabel: "Rooms",
    title: "Deluxe Pool View Room",
    src: framePath(206),
    alt: "Deluxe Pool View Room with private glass balcony at Hotel Pumerai",
    caption: "400 sq ft room featuring direct pool outlook and private balcony.",
  },
  {
    id: 6,
    category: "pool",
    categoryLabel: "Pool",
    title: "Children's Pool & Sun Deck",
    src: framePath(102),
    alt: "Children's shallow pool and poolside loungers at Hotel Pumerai",
    caption: "Safe, shallow splash pool for children adjoining the main pool.",
  },
  {
    id: 7,
    category: "dining",
    categoryLabel: "Dining",
    title: "Madhura Pure Veg Restaurant",
    src: framePath(136),
    alt: "Madhura Pure Vegetarian Restaurant interior at Hotel Pumerai Honnavar",
    caption: "Dedicated pure vegetarian South Indian breakfast and authentic Karavali thalis.",
  },
  {
    id: 8,
    category: "exterior",
    categoryLabel: "Exterior",
    title: "Arrival Courtyard & Portico",
    src: framePath(64),
    alt: "Hotel Pumerai arrival portico and secure guest parking",
    caption: "Wide paved arrival courtyard with free self-parking and EV charging.",
  },
  {
    id: 9,
    category: "rooms",
    categoryLabel: "Rooms",
    title: "Executive Family Suite",
    src: framePath(218),
    alt: "Executive Family Suite master bedroom and lounge at Hotel Pumerai",
    caption: "520 sq ft suite with separate living room, ideal for family travel.",
  },
  {
    id: 10,
    category: "dining",
    categoryLabel: "Dining",
    title: "Madira Bar & Evening Lounge",
    src: framePath(148),
    alt: "Madira Bar and Lounge at Hotel Pumerai Honnavar",
    caption: "Sophisticated evening retreat for craft mocktails, spirits, and appetizers.",
  },
  {
    id: 11,
    category: "exterior",
    categoryLabel: "Exterior",
    title: "Coastal Honnavar & Backwaters",
    src: framePath(32),
    alt: "Sharavati River backwaters and coastal panorama near Hotel Pumerai Honnavar",
    caption: "Located ~2.8 km from Sharavati River backwaters and ~5 km from Kasarkod Beach.",
  },
  {
    id: 12,
    category: "rooms",
    categoryLabel: "Rooms",
    title: "Premium Heritage Suite",
    src: framePath(232),
    alt: "Premium Heritage Suite with luxury bathroom at Hotel Pumerai",
    caption: "480 sq ft luxury suite with handcrafted regional wood finishes and soaking tub.",
  },
];
