import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesTeaser from "@/components/ServicesTeaser";
import WhoWeServe from "@/components/WhoWeServe";
import SchoolPromo from "@/components/SchoolPromo";
import Insurance from "@/components/Insurance";
import Process from "@/components/Process";
import CTABand from "@/components/CTABand";
import Divider from "@/components/Divider";
import { SITE } from "@/components/site";

/* Structured data uses only details the organization has provided.
   No phone number, hours, or city are included because none were supplied. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: SITE.name,
  description:
    "Community-based outpatient mental health services for children, adults, and families throughout Indiana.",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address1,
    addressRegion: "IN",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Indiana" },
  medicalSpecialty: "Psychiatric",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About moreLink />
      <ServicesTeaser />
      <WhoWeServe />
      <Divider from="var(--wash-blush)" to="#F4F1FF" />
      <SchoolPromo />
      <Insurance />
      <Divider from="var(--wash-cream)" to="#EAF5FF" />
      <Process />
      <CTABand />
    </>
  );
}
