import { Trophy, Stars } from "@/components/Icons";

/* The certification marker, sitting between the hero and the About section.

   Two deliberate restraints:

   - It states the certification and nothing more. No number, no date, no scope,
     no "award-winning" — none of which the organization has given us, and all
     of which would be a claim a certifying body could object to.
   - The stars are scattered around the seal rather than lined up in a row of
     five. A five-star row is the universal shape of a customer rating, and next
     to a certification it would read as a review score. These read as an award.

   It is a full-width strip rather than a pill: white between the hero's cream
   and the About section's mint, with a hairline above and below, so it has real
   edges and reads as a band across the page. */
export default function Certification() {
  return (
    <section className="certify" aria-label="Certification">
      <div className="container certify__inner">
        <p className="certify__badge">
          <span className="certify__seal">
            <Trophy />
            <Stars className="certify__stars" aria-hidden="true" />
          </span>
          <span className="certify__text">
            <strong>DMHA Certified</strong>
            <span>Indiana Division of Mental Health and Addiction</span>
          </span>
        </p>
      </div>
    </section>
  );
}
