/* The dashboard is a private work tool, so it drops the whole public shell —
   header, announcement strip, footer, back-to-top. Those are hidden in
   globals.css via `body:has(.adminwrap)`, because the root layout renders them
   for every route and has no way to know which one is being served. The
   dashboard supplies its own sticky bar instead. */
export default function AdminLayout({ children }) {
  return <div className="adminwrap">{children}</div>;
}
