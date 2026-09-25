import GallerySection from "../sections/GallerySection.jsx";
import PageHeader from "./PageHeader.jsx";

export default function GalleryPage() {
  return (
    <main className="page-shell gallery-page-shell">
      <PageHeader
        eyebrow="PHOTOGRAPHY • HONNĀVAR"
        title="Visual Archive &"
        italicTitle="Property Gallery"
        description="Explore Hotel Pumerai, from our rooms and pool to dining and coastal surroundings."
        id="gallery-page-heading"
      />
      <GallerySection isStandalonePage={true} />
    </main>
  );
}
