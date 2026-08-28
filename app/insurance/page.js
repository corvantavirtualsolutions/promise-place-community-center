import Insurance from "@/components/Insurance";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Insurance & Payment",
  description:
    "Promise Place Community Center accepts Medicaid and commercial insurance, and offers sliding-scale services to help make mental health care more accessible.",
};

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance & Payment"
        title="Care that works with your needs."
        lede="We believe getting mental health support should be as accessible as possible. We accept Medicaid and commercial insurance, and offer sliding-scale services."
        tone="sky"
      />
      <Insurance hideHead />
      <CTABand
        title="Questions about coverage?"
        body="Coverage and eligibility vary from family to family. Contact us and we can talk through your individual situation."
        primary={{ href: "/contact", label: "Ask About Coverage" }}
        secondary={{ href: "/get-started", label: "How to Get Started" }}
      />
    </>
  );
}
