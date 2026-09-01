/* Keeps the staff dashboard and the API out of search results. It is already
   behind a sign-in — this just stops the URL itself being indexed. */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
  };
}
