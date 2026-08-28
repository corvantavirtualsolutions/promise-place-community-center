import Contact from "@/components/Contact";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Promise Place Community Center at 1800 N Meridian, Suite 400 B, Indiana, or email admin@promiseplacecc.com to ask a question or request services.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We're glad you reached out."
        lede="Send us a question or a request for services and our team will follow up with information about how we can help."
      />
      <Contact hideHead />
    </>
  );
}
