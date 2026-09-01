import Link from "next/link";
import { Sparkle, ArrowRight } from "@/components/Icons";

/* Slim announcement strip that sits under the header on every page.

   It borrows the shape of a retail promo bar, but this is a mental health
   provider, not a shop — so it announces that more is coming and offers a
   conversation, rather than pushing an offer. Deliberately vague: no dates, no
   named services, nothing that would be a promise the organization has not made.

   The whole strip is the link rather than a separate "Get in touch" anchor.
   That made it one large tap target instead of a 23px-tall inline link, and it
   stopped the call to action taking a third line of its own on a 375px screen. */
export default function AnnounceBar() {
  return (
    <aside className="announce" aria-label="Announcement">
      <Link className="container announce__inner" href="/contact">
        <Sparkle />
        <span>
          More services and opportunities are coming soon
          <span className="announce__more"> &mdash; get in touch to hear more</span>
        </span>
        <ArrowRight />
      </Link>
    </aside>
  );
}
