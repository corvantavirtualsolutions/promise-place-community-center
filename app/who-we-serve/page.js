import WhoWeServe from "@/components/WhoWeServe";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Who We Serve",
  description:
    "Promise Place Community Center works with children, adults, families, and schools across Indiana, providing mental health and behavioral support at every age and stage.",
};

export default function WhoWeServePage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Serve"
        title="Support for every member of the family."
        lede="Mental health looks different at every age. Promise Place works with children, adults, families, and schools across Indiana."
        tone="sun"
      />
      <WhoWeServe hideHead />
      <CTABand
        title="Looking for support for someone you love?"
        body="Whether it's for yourself, your child, or your whole family, we can talk through what's available."
        primary={{ href: "/contact", label: "Contact Promise Place" }}
        secondary={{ href: "/services", label: "Browse Services" }}
      />
    </>
  );
}
