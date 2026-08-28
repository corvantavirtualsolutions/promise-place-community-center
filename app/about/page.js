import About from "@/components/About";
import WhoWeServe from "@/components/WhoWeServe";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "About Us",
  description:
    "Promise Place Community Center is a community-based outpatient mental health facility serving children, adults, and families throughout Indiana.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Promise Place"
        title="A welcoming place to start."
        lede="We are a community-based outpatient mental health facility serving families throughout Indiana — working with both adults and children to address gaps in mental health care."
        tone="grape"
      />
      <About hideHead />
      <WhoWeServe />
      <CTABand
        title="Have a question about what we do?"
        body="We're glad to talk it through. There's no wrong way to start the conversation."
        primary={{ href: "/contact", label: "Ask a Question" }}
        secondary={{ href: "/services", label: "See Our Services" }}
      />
    </>
  );
}
