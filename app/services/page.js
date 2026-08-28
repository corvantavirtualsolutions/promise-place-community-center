import Services from "@/components/Services";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Our Services",
  description:
    "Therapy, telehealth, assessments, case management, life skills, behavior support, grief counseling, anger management, domestic violence services and school-based mental health support in Indiana.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Many kinds of support, one welcoming place."
        lede="Whether you're looking for therapy, an assessment, help with behavior at home or at school, or simply somewhere to start — there is likely a service here that fits."
      />
      <Services hideHead />
      <CTABand
        title="Not sure which service fits?"
        body="That's okay — most people aren't. Tell us a little about what's going on and we'll help you figure out the next step."
        primary={{ href: "/contact", label: "Talk With Our Team" }}
        secondary={{ href: "/get-started", label: "How to Get Started" }}
      />
    </>
  );
}
