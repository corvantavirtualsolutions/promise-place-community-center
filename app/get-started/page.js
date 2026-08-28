import Process from "@/components/Process";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "How to Get Started",
  description:
    "Getting started with Promise Place Community Center takes three simple steps: reach out, tell us what you need, and find the right support.",
};

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="How to Get Started"
        title="Getting started is easy."
        lede="Three simple steps. No complicated paperwork to begin the conversation."
        tone="sun"
      />
      <Process hideHead />
      <CTABand
        title="Still have questions first?"
        body="Plenty of people do. Our FAQ covers the most common ones, or you can just ask us directly."
        primary={{ href: "/contact", label: "Contact Promise Place" }}
        secondary={{ href: "/faq", label: "Read the FAQ" }}
      />
    </>
  );
}
