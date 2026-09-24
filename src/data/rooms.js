import { editorialFrames, framePath } from "../utils/frames.js";

/**
 * Single Source of Truth for all Hotel Pumerai Room Types.
 * Every room card, preview teaser, and dedicated /rooms page pulls from this file.
 *
 * Folder convention: /public/rooms/[slug]/
 * Predictable photo files: cover.jpg, 1.jpg, 2.jpg, 3.jpg
 * Built-in fallbackImage ensures flawless display before photos are manually dropped in.
 */
export const rooms = [
  {
    slug: "club-room-with-balcony",
    name: "Club Room with Balcony",
    folder: "/rooms/club-room-with-balcony/",
    coverImage: "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
    fallbackImage: editorialFrames.roomTwo, // frame 206
    galleryPhotos: [
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_43 PM_result.webp",
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_48 PM_result.webp",
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 25, 2026, 01_08_21 AM_result.webp",
    ],
    fallbackGallery: [
      framePath(206),
      framePath(208),
      framePath(212),
      framePath(214),
    ],
    tagline: "Private Glass Balcony & Pool Outlook",
    shortDescription:
      "Refined contemporary room featuring a private glass balcony directly facing the swimming pool and lush coastal greenery.",
    fullDescription:
      "The Club Room with Balcony is designed for guests seeking an elevated sense of outdoor connection. Step onto your private glass balcony to take in gentle coastal breezes and views over the glass-edge swimming pool. Inside, enjoy an expanded seating lounge, a plush king bed with high-thread-count linens, a 50-inch 4K Smart TV, and a stone bathroom with a walk-in rain shower.",
    size: "380 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 3799,
    highlights: [
      "Private glass balcony with pool outlook",
      "Expanded seating lounge",
      "50\" 4K Smart TV with OTT streaming",
      "High-speed WiFi (100+ Mbps)",
      "Walk-in rain shower with organic amenities",
      "Mini refrigerator & tea/coffee maker",
      "Digital electronic safety locker",
    ],
  },
  {
    slug: "club-room",
    name: "Club Room",
    folder: "/rooms/club-room/",
    coverImage: "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_39 PM_result.webp",
    fallbackImage: editorialFrames.roomThree, // frame 218
    galleryPhotos: [
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_39 PM_result.webp",
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_46 PM_result.webp",
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_52 PM_result.webp",
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_58 PM_result.webp",
    ],
    fallbackGallery: [
      framePath(218),
      framePath(220),
      framePath(224),
      framePath(226),
    ],
    tagline: "Generous Contemporary Living",
    shortDescription:
      "Spacious room designed for quiet comfort with rich teak details, dedicated work station, and premium bathroom amenities.",
    fullDescription:
      "Our Club Room balances generous space with minimalist tranquility. Finished with warm wood millwork and soft earth tones, this room features a restful king bed, an ergonomic work desk with high-speed connectivity, and an en-suite bathroom with luxury toiletries. Ideal for business and extended holiday stays alike.",
    size: "340 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 3299,
    highlights: [
      "Courtyard garden orientation",
      "Ergonomic work desk & chair",
      "43\" 4K Smart TV",
      "Free 100+ Mbps high-speed WiFi",
      "Split silent air conditioning",
      "Electric kettle with premium tea selection",
      "Electronic safe deposit box",
    ],
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    folder: "/rooms/deluxe-room/",
    coverImage: "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
    fallbackImage: editorialFrames.roomOne, // frame 198
    galleryPhotos: [
      "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
      "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_43 PM_result.webp",
      "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_48 PM_result.webp",
      "/rooms/deluxe-room/ChatGPT Image Sep 25, 2026, 01_08_21 AM_result.webp",
    ],
    fallbackGallery: [
      framePath(198),
      framePath(194),
      framePath(202),
      framePath(204),
    ],
    tagline: "Essential Coastal Calm",
    shortDescription:
      "Comfortable and restful accommodation with modern finishes, ideal for coastal stopovers and road trippers on NH-66.",
    fullDescription:
      "The Deluxe Room offers a serene haven after a day of driving or exploring Honnavar's beaches. Built with sound-insulated glass and acoustic separation from the highway, it guarantees an uninterrupted night's rest. Complete with a comfortable king bed, crisp linens, daily housekeeping, and hot rain shower.",
    size: "300 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 2799,
    highlights: [
      "Sound-insulated panoramic windows",
      "King size mattress with plush duvet",
      "43\" Smart TV",
      "High-speed WiFi (100+ Mbps)",
      "Daily complimentary mineral water",
      "Split air conditioning",
      "En-suite rain shower",
    ],
  },
  {
    slug: "family-suite-room",
    name: "Family Suite Room",
    folder: "/rooms/family-suite-room/",
    coverImage: "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_34 AM_result.webp",
    fallbackImage: framePath(220),
    galleryPhotos: [
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_34 AM_result.webp",
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_40 AM_result.webp",
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_43 AM_result.webp",
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_46 AM_result.webp",
    ],
    fallbackGallery: [
      framePath(220),
      framePath(218),
      framePath(224),
      framePath(226),
    ],
    tagline: "Two-Room Suite for Families",
    shortDescription:
      "Expansive multi-room suite featuring an independent master bedroom and separate living salon with sofa bed for 4 guests.",
    fullDescription:
      "Tailored for families vacationing along the Karnataka coast, the Family Suite Room offers the luxury of separate spaces. The private master bedroom features a plush king bed, while the living lounge includes a comfortable queen pull-out sofa bed, dining table, and second TV. Includes a dual-vanity stone bathroom, mini fridge, and ample storage.",
    size: "520 sq ft",
    occupancy: "Sleeps 4",
    bedType: "1 King Bed + 1 Queen Sofa Bed",
    startingPrice: 5499,
    highlights: [
      "Independent master bedroom & living salon",
      "Sleeps up to 4 guests comfortably",
      "Dual vanity stone bathroom",
      "Two 43\" Smart TVs",
      "Mini refrigerator & dining table",
      "Spacious double wardrobe with safe",
      "Complimentary breakfast buffet included",
    ],
  },
  {
    slug: "premium-room",
    name: "Premium Room",
    folder: "/rooms/premium-room/",
    coverImage: "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_35 AM_result.webp",
    fallbackImage: framePath(194),
    galleryPhotos: [
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_35 AM_result.webp",
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_42 AM_result.webp",
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_46 AM_result.webp",
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_04_00 AM_result.webp",
    ],
    fallbackGallery: [
      framePath(194),
      framePath(198),
      framePath(202),
      framePath(204),
    ],
    tagline: "Garden View Tranquility",
    shortDescription:
      "Modern designer room featuring warm teak accents, garden views, and dependable conveniences along NH-66.",
    fullDescription:
      "The Premium Room combines minimalist coastal aesthetics with high practical comfort. Designed with large picture windows overlooking the landscaped courtyard garden, this room features bespoke wooden headboards, custom reading sconces, high-speed WiFi, and an invigorating en-suite walk-in rain shower.",
    size: "320 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 2999,
    highlights: [
      "Courtyard garden outlook",
      "High-speed WiFi (100+ Mbps)",
      "43\" 4K Smart TV",
      "Split silent air conditioning",
      "Electric tea/coffee maker",
      "Electronic laptop safe",
      "Walk-in rain shower",
    ],
  },
  {
    slug: "premium-twin-room",
    name: "Premium Twin Room",
    folder: "/rooms/premium-twin-room/",
    coverImage: "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_30 AM_result.webp",
    fallbackImage: framePath(204),
    galleryPhotos: [
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_30 AM_result.webp",
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_35 AM_result.webp",
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_37 AM_result.webp",
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_40 AM_result.webp",
    ],
    fallbackGallery: [
      framePath(204),
      framePath(198),
      framePath(202),
      framePath(194),
    ],
    tagline: "Two Twin Beds for Flexible Stays",
    shortDescription:
      "Convenient twin-bed configuration tailored for colleagues, friends, or family traveling together along the coast.",
    fullDescription:
      "The Premium Twin Room features two separate twin beds outfitted with supportive orthopaedic mattresses and crisp cotton linens. Perfect for road trip companions or colleagues visiting Uttara Kannada, this room includes dedicated bedside charging stations, an executive work desk, and a modern glass-enclosed bathroom.",
    size: "320 sq ft",
    occupancy: "Sleeps 2",
    bedType: "2 Twin Beds",
    startingPrice: 2999,
    highlights: [
      "Two comfortable twin beds",
      "Dual bedside reading lights & charging points",
      "High-speed WiFi (100+ Mbps)",
      "43\" 4K Smart TV",
      "En-suite walk-in rain shower",
      "Split silent air conditioning",
      "Digital electronic safe",
    ],
  },
  {
    slug: "suite-room",
    name: "Suite Room",
    folder: "/rooms/suite-room/",
    coverImage: "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_20 AM_result.webp",
    fallbackImage: editorialFrames.roomFour, // frame 232
    galleryPhotos: [
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_20 AM_result.webp",
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_23 AM_result.webp",
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_26 AM_result.webp",
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_28 AM_result.webp",
    ],
    fallbackGallery: [
      framePath(232),
      framePath(228),
      framePath(236),
      framePath(240),
    ],
    tagline: "Karavali Teak Artisanship & Soaking Tub",
    shortDescription:
      "Luxury executive suite with separate seating salon, bespoke Karavali wood millwork, and deep soaking bathtub.",
    fullDescription:
      "Our premier Suite Room celebrates the regional coastal architectural heritage of Karavali with hand-finished teak wood elements and elevated modern luxury. Features an expansive California King bed, a separate powder lounge, a deep soaking bathtub alongside a rain shower, and an artisan espresso machine for leisurely mornings.",
    size: "460 sq ft",
    occupancy: "Sleeps 2–3",
    bedType: "1 California King Bed",
    startingPrice: 4899,
    highlights: [
      "Deep soaking bathtub & walk-in rain shower",
      "Karavali artisanal teak millwork",
      "Separate powder and seating lounge",
      "Artisan espresso capsule machine",
      "Panoramic coastal breeze view",
      "Upgraded organic toiletries",
      "Priority check-in & concierge service",
    ],
  },
];

/**
 * Helper to get a room by slug.
 */
export function getRoomBySlug(slug) {
  return rooms.find((r) => r.slug === slug) || null;
}

/**
 * Safe image source handler that falls back if custom cover.jpg is not yet added.
 */
export function getRoomPhotoSrc(room, photoIndex = 0) {
  // If the user drops images into /public/rooms/[slug]/, those will resolve.
  // We can return the path, with the fallback available on error.
  const custom = room.galleryPhotos && room.galleryPhotos[photoIndex];
  const fallback = (room.fallbackGallery && room.fallbackGallery[photoIndex]) || room.fallbackImage;
  return { custom, fallback };
}
