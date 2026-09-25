import Dining from "../sections/Dining.jsx";
import PageHeader from "./PageHeader.jsx";

export default function DiningPage({ onNavigate }) {
  return (
    <main className="page-shell dining-page-shell">
      <PageHeader
        eyebrow="DINING • HONNĀVAR"
        title="Coastal Dining &"
        italicTitle="Culinary Journeys"
        description="Coastal flavours, fresh local ingredients and relaxed dining at Hotel Pumerai."
        id="dining-page-heading"
      />
      <Dining isStandalonePage={true} onNavigate={onNavigate} />
    </main>
  );
}
