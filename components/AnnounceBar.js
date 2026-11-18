import Link from "next/link";
import { Sparkle, ArrowRight } from "@/components/Icons";

/* Slim announcement strip that sits under the header on every page.

   It borrows the shape of a retail promo bar, but this is a mental health
   provider, not a shop — so it names what is coming and offers a conversation,
   rather than pushing an offer. No date attached: "coming soon" is a promise
   the organization can keep, and a month is one it might not.

   The whole strip is the link rather than a separate "Get in touch" anchor.
   That made it one large tap target instead of a 23px-tall inline link, and it
   stopped the call to action taking a third line of its own on a 375px screen.

   The text is short enough now to need no mobile truncation, so the
   announce__more span that used to hide the second clause is gone. */
export default function AnnounceBar() {
  return (
    <aside className="announce" aria-label="Announcement">
      <Link className="container announce__inner" href="/contact">
        <Sparkle />
        <span>Promise Place Foundation of Hope Coming Soon</span>
        <ArrowRight />
      </Link>
    </aside>
  );
}
