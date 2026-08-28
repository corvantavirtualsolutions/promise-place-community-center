import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Promise Place Community Center — services for children and adults, telehealth, Medicaid and commercial insurance, sliding scale, and school-based services.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Common Questions"
        title="Questions? We have answers."
        lede="If you don't see your question here, just ask — we're glad to help."
        tone="grape"
      />
      <FAQ hideHead />
      <CTABand
        title="Didn't find what you were looking for?"
        body="Send us your question and someone from our team will get back to you."
        primary={{ href: "/contact", label: "Ask a Question" }}
        secondary={{ href: "/services", label: "Browse Services" }}
      />
    </>
  );
}
