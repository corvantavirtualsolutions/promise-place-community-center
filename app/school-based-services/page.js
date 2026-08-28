import SchoolBased from "@/components/SchoolBased";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "School-Based Services",
  description:
    "School-based mental health and behavioral support delivered within Indiana school environments, including the Alternative to Explosion Program for schools.",
};

export default function SchoolBasedPage() {
  return (
    <>
      <PageHero
        eyebrow="School-Based Services"
        title="Support doesn't stop at the office."
        lede="Promise Place Community Center provides school-based services focused on mental health and behavior, delivered where students already spend their days."
        tone="sun"
      />
      <SchoolBased hideHead />
      <CTABand
        title="Interested in bringing our services to your school?"
        body="We work with schools on mental health and behavioral support, including the Alternative to Explosion Program. Reach out and we'll share more."
        primary={{ href: "/contact", label: "Contact Us to Learn More" }}
        secondary={{ href: "/services", label: "See All Services" }}
      />
    </>
  );
}
