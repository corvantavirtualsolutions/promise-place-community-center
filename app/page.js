import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhoWeServe from "@/components/WhoWeServe";
import SchoolBased from "@/components/SchoolBased";
import Insurance from "@/components/Insurance";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <WhoWeServe />
        <SchoolBased />
        <Insurance />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
