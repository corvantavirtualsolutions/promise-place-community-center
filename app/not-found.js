import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <span className="eyebrow">Page not found</span>
        <h1>We couldn&rsquo;t find that page.</h1>
        <p style={{ maxWidth: "46ch", margin: "0 auto 28px" }}>
          The page you were looking for may have moved. Let&rsquo;s get you back to
          somewhere useful.
        </p>
        <div style={{ display: "flex", gap: 13, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/">Back to Home <ArrowRight /></Link>
          <Link className="btn btn-secondary" href="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
