import FAQ from "../sections/FAQ.jsx";
import PageHeader from "./PageHeader.jsx";

export default function FAQPage() {
  return (
    <main className="page-shell faq-page-shell">
      <PageHeader
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Frequently Asked"
        italicTitle="Questions"
        description="Find answers to frequently asked questions about Hotel Pumerai, rooms, dining, location, booking and your stay in Honnāvar."
        id="faq-page-heading"
      />
      <FAQ isStandalonePage={true} />
    </main>
  );
}
