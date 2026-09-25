import Location from "../sections/Location.jsx";
import PageHeader from "./PageHeader.jsx";

export default function LocationPage() {
  return (
    <main className="page-shell location-page-shell">
      <PageHeader
        eyebrow="LOCATION • HONNĀVAR"
        title="Location & Discover"
        italicTitle="Honnāvar, Karnataka"
        description="On NH-66, near Kasarkod Beach, Sharavathi backwaters and Honnāvar."
        id="location-page-heading"
      />
      <Location isStandalonePage={true} />
    </main>
  );
}
