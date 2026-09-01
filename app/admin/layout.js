/* The dashboard shares the site's header and footer so staff can get back to
   the public pages, but the announcement strip is hidden — it is a marketing
   message aimed at visitors, and it is sticky, so on a work tool it would take
   up screen for no reason. That hiding is done in globals.css with
   `body:has(.adminwrap)`, because the root layout has no way to know which
   route is rendering. */
export default function AdminLayout({ children }) {
  return <div className="adminwrap">{children}</div>;
}
