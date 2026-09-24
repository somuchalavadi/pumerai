import { faqList } from "../data/faqs.js";
import { rooms } from "../data/rooms.js";

export const siteConfig = {
  name: "Hotel Pumerai",
  alternateNames: ["Hotel Pumerai Honnavar", "Hotel Pumerai Honnāvar"],
  siteUrl: "https://hotelpumerai.com",
  phone: "+919845423223",
  formattedPhone: "+91 98454 23223",
  landline: "08387-221221",
  email: "reservation@hotelpumerai.com",
  logo: "https://hotelpumerai.com/pumerai%20logo.png",
  ogImage: "https://hotelpumerai.com/frames/frame_0001.webp",
  address: {
    streetAddress: "NH-66, near Ramateertha Cross",
    addressLocality: "Honnavar",
    addressRegion: "Karnataka",
    postalCode: "581334",
    addressCountry: "IN",
  },
  geo: {
    latitude: 14.2904652,
    longitude: 74.446001,
  },
  checkinTime: "13:00",
  checkoutTime: "11:00",
  priceRange: "₹2499 - ₹4999",
  starRating: "3",
};

export const routesMeta = {
  "/": {
    title: "Hotel Pumerai | Boutique Hotel in Honnāvar, Karnataka",
    description:
      "Hotel Pumerai is a 3-star boutique hotel on NH-66 in Honnāvar, Uttara Kannada. Contemporary rooms, indoor pool, coastal dining, and easy access to Kasarkod Beach, Murudeshwar & Bhatkal.",
    canonical: "https://hotelpumerai.com/",
    breadcrumbs: [{ name: "Home", url: "https://hotelpumerai.com/" }],
  },
  "/rooms": {
    title: "Rooms & Suites in Honnāvar | Hotel Pumerai",
    description:
      "Explore contemporary rooms and suites at Hotel Pumerai in Honnāvar, Karnataka. 7 room categories with king beds, high-speed Wi-Fi, air conditioning, and complimentary breakfast along NH-66.",
    canonical: "https://hotelpumerai.com/rooms",
    breadcrumbs: [
      { name: "Home", url: "https://hotelpumerai.com/" },
      { name: "Rooms & Suites", url: "https://hotelpumerai.com/rooms" },
    ],
  },
  "/dining": {
    title: "Dining & Restaurants in Honnāvar | Hotel Pumerai",
    description:
      "Discover coastal dining at Hotel Pumerai in Honnāvar. Featuring Matsya Multi-Cuisine Restaurant for fresh Karavali seafood and Madhura Pure Veg Restaurant for authentic South Indian dishes.",
    canonical: "https://hotelpumerai.com/dining",
    breadcrumbs: [
      { name: "Home", url: "https://hotelpumerai.com/" },
      { name: "Dining & Restaurants", url: "https://hotelpumerai.com/dining" },
    ],
  },
  "/bar-lounge": {
    title: "Madira Bar & Lounge | Hotel Pumerai, Honnāvar",
    description:
      "Unwind at Madira Bar & Lounge at Hotel Pumerai, Honnāvar. Premium spirits, coastal kokum mocktails, espresso coffee, and savory appetizers along NH-66 in Uttara Kannada.",
    canonical: "https://hotelpumerai.com/bar-lounge",
    breadcrumbs: [
      { name: "Home", url: "https://hotelpumerai.com/" },
      { name: "Madira Bar & Lounge", url: "https://hotelpumerai.com/bar-lounge" },
    ],
  },
  "/gallery": {
    title: "Hotel Pumerai Gallery | Rooms, Dining & Honnāvar",
    description:
      "Browse photos of Hotel Pumerai in Honnāvar, Karnataka. Explore our guestrooms, glass-edge swimming pool, restaurants, and scenic surroundings across coastal Uttara Kannada.",
    canonical: "https://hotelpumerai.com/gallery",
    breadcrumbs: [
      { name: "Home", url: "https://hotelpumerai.com/" },
      { name: "Visual Gallery", url: "https://hotelpumerai.com/gallery" },
    ],
  },
  "/location": {
    title: "Hotel Pumerai Location | NH-66, Honnāvar, Karnataka",
    description:
      "Hotel Pumerai is located on NH-66 near Ramateertha Cross in Honnāvar, Uttara Kannada. Close to Kasarkod Eco Beach, Sharavati backwaters, Murudeshwar, Bhatkal & Gokarna.",
    canonical: "https://hotelpumerai.com/location",
    breadcrumbs: [
      { name: "Home", url: "https://hotelpumerai.com/" },
      { name: "Location & Directions", url: "https://hotelpumerai.com/location" },
    ],
  },
  "/contact": {
    title: "Contact Hotel Pumerai | Honnāvar, Karnataka",
    description:
      "Contact Hotel Pumerai in Honnāvar, Karnataka for room reservations and travel enquiries. Call +91 98454 23223, message on WhatsApp, or visit our 24/7 front desk on NH-66.",
    canonical: "https://hotelpumerai.com/contact",
    breadcrumbs: [
      { name: "Home", url: "https://hotelpumerai.com/" },
      { name: "Contact", url: "https://hotelpumerai.com/contact" },
    ],
  },
};

export function getPageMeta(pathname = "/") {
  const normalized = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  return routesMeta[normalized] || routesMeta["/"];
}

export function generateStructuredData(pathname = "/") {
  const meta = getPageMeta(pathname);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hotelpumerai.com/#organization",
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.siteUrl,
    logo: siteConfig.logo,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "reservations",
      availableLanguage: ["en", "kn", "hi"],
      areaServed: "IN",
    },
  };

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": "https://hotelpumerai.com/#hotel",
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    description:
      "A 3-star contemporary boutique hotel situated on NH-66 near Ramateertha Cross in Honnavar, Uttara Kannada, Karnataka. Offering 40 air-conditioned rooms, glass-edge swimming pool, coastal multicuisine and pure vegetarian dining, and bar lounge.",
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: [
      `${siteConfig.siteUrl}/frames/frame_0001.webp`,
      `${siteConfig.siteUrl}/frames/frame_0180.webp`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7",
    checkinTime: siteConfig.checkinTime,
    checkoutTime: siteConfig.checkoutTime,
    numberOfRooms: 40,
    priceRange: siteConfig.priceRange,
    petsAllowed: false,
    smokingAllowed: false,
    starRating: {
      "@type": "Rating",
      ratingValue: siteConfig.starRating,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free High-Speed Wi-Fi (100+ Mbps)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Indoor & Children Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Complimentary Daily Hot Breakfast", value: true },
      { "@type": "LocationFeatureSpecification", name: "24-Hour Front Desk", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Secure Private Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Electric Vehicle (EV) Charging Station", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-Site Matsya Multi-Cuisine Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-Site Madhura Pure Veg Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-Site Madira Bar & Lounge", value: true },
      { "@type": "LocationFeatureSpecification", name: "100% Smoke-Free Indoor Rooms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Acoustic Soundproofing", value: true },
    ],
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: meta.breadcrumbs.map((b, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: b.name,
      item: b.url,
    })),
  };

  const schemas = [organizationSchema, hotelSchema, breadcrumbsSchema];

  // Include FAQPage on Home and Location routes
  if (pathname === "/" || pathname === "/location") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  // Include Restaurant schemas on Dining, Bar-Lounge, and Home
  if (pathname === "/dining" || pathname === "/" || pathname === "/bar-lounge") {
    schemas.push(
      {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": "https://hotelpumerai.com/dining#matsya",
        name: "Matsya Multi-Cuisine Restaurant",
        parentOrganization: { "@id": "https://hotelpumerai.com/#hotel" },
        servesCuisine: ["Coastal Karavali Seafood", "North Indian", "Continental", "Tandoori"],
        openingHours: "Mo-Su 07:00-22:30",
        priceRange: "₹₹",
        telephone: siteConfig.phone,
        address: hotelSchema.address,
      },
      {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": "https://hotelpumerai.com/dining#madhura",
        name: "Madhura Pure Veg Restaurant",
        parentOrganization: { "@id": "https://hotelpumerai.com/#hotel" },
        servesCuisine: ["Pure Vegetarian", "South Indian", "Coastal Satvik"],
        openingHours: "Mo-Su 06:30-22:00",
        priceRange: "₹",
        telephone: siteConfig.phone,
        address: hotelSchema.address,
      },
      {
        "@context": "https://schema.org",
        "@type": "BarOrPub",
        "@id": "https://hotelpumerai.com/bar-lounge#madira",
        name: "Madira Bar & Lounge",
        parentOrganization: { "@id": "https://hotelpumerai.com/#hotel" },
        servesCuisine: ["Cocktails", "Spirits", "Espresso Coffee", "Small Plates"],
        openingHours: "Mo-Su 11:00-23:00",
        priceRange: "₹₹",
        telephone: siteConfig.phone,
        address: hotelSchema.address,
      }
    );
  }

  // Include Room offerings on Rooms route
  if (pathname === "/rooms") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Hotel Pumerai Room Collection",
      itemListElement: rooms.map((room) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: room.name,
          description: room.shortDescription,
          occupancy: room.occupancy,
          bed: {
            "@type": "BedDetails",
            typeOfBed: room.bedType,
          },
        },
        price: room.startingPrice,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      })),
    });
  }

  return schemas;
}
