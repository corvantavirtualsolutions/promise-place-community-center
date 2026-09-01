import { requireAdmin, supabaseBase } from "@/lib/adminAuth";
import AdminLogin from "./AdminLogin";
import AdminTable from "./AdminTable";

/* Never cached and never prerendered: this page's whole job is to show live,
   private data, and a cached copy of it would be a data leak. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Staff Dashboard",
  // keep it out of search results even though it is behind a sign-in
  robots: { index: false, follow: false, nocache: true },
};

async function loadSubmissions() {
  const base = supabaseBase();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return [];

  const res = await fetch(
    `${base}/rest/v1/contact_submissions?select=*&order=created_at.desc&limit=500`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" },
  );
  if (!res.ok) {
    console.error("[admin] load failed:", res.status, await res.text());
    return [];
  }
  return res.json().catch(() => []);
}

export default async function AdminPage() {
  const user = await requireAdmin();
  if (!user) return <AdminLogin />;

  const rows = await loadSubmissions();

  return (
    <section className="section section--white">
      <div className="container">
        <div className="admin__head">
          <div>
            <span className="eyebrow">Staff Only</span>
            <h1>Website inquiries</h1>
            <p>Signed in as {user.email}</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="btn btn-secondary" type="submit">Sign out</button>
          </form>
        </div>

        <AdminTable rows={rows} />
      </div>
    </section>
  );
}
