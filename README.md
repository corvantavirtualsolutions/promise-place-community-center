# Promise Place Community Center — Website

Multi-page marketing site for Promise Place Community Center, a community-based
outpatient mental health facility serving families throughout Indiana.

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, about, service categories, who we serve, schools, insurance, process |
| `/about` | About Us |
| `/services` | All 13 services, grouped into four categories |
| `/who-we-serve` | Children, adults, families, schools |
| `/school-based-services` | School-based services + Alternative to Explosion |
| `/insurance` | Insurance & Payment |
| `/get-started` | How to Get Started |
| `/faq` | Frequently Asked Questions |
| `/contact` | Contact + inquiry form |

Every page has its own `<title>` and meta description. A custom 404 lives at
`app/not-found.js`.

**Stack:** Next.js 14 (App Router) · React 18 · plain CSS · no UI dependencies.

---

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

> `npm run build` downloads Plus Jakarta Sans and Inter from Google Fonts at build
> time (via `next/font`). It needs internet access. Vercel builds have it.

---

## Project structure

```
app/
  layout.js         Fonts, base SEO, Header + Footer wrapper
  page.js           Home page + JSON-LD structured data
  globals.css       Design tokens and every component style
  not-found.js      Custom 404
  about/ services/ who-we-serve/ school-based-services/
  insurance/ get-started/ faq/ contact/      one page.js each
components/
  site.js           Name, email, address — SINGLE SOURCE OF TRUTH
  Icons.js          Inline SVG icon set
  Header.js         Sticky nav, active states, mobile hamburger
  PageHero.js       Banner + h1 for interior pages
  CTABand.js        Reusable closing call to action
  Hero.js           Home hero only
  About.js  Services.js  ServicesTeaser.js  WhoWeServe.js
  SchoolBased.js  SchoolPromo.js  Insurance.js  Process.js
  FAQ.js  Contact.js  Footer.js
  Reveal.js         Scroll fade-in wrapper

Section components take a `hideHead` prop. Interior pages pass `hideHead`
because `PageHero` already supplies the page's single `<h1>`; the home page
omits it so each section keeps its own `<h2>`.
```

---

## Common edits

### Change the address, email, or organization name
Edit **`components/site.js`** only. Header, contact section, footer and
structured data all read from it.

### Adding the real logo
The current logo is a **placeholder** — a gradient rounded square with a heart.
It is marked with a comment in `components/Header.js` and `components/Footer.js`.

To swap it in:

1. Drop the file in `public/` (e.g. `public/logo.svg` or `public/logo.png`).
2. In `Header.js`, replace:
   ```jsx
   <span className="logo__mark"><Heart /></span>
   ```
   with:
   ```jsx
   <img src="/logo.svg" alt="Promise Place Community Center" width={42} height={42} />
   ```
3. Do the same in `Footer.js` (the footer sits on a dark background, so use a
   light version of the mark there if you have one).
4. If the real brand colors differ, update the palette at the top of
   `app/globals.css` — every component reads from those variables.

### Wiring the contact form to a real inbox
The form currently opens the visitor's email client with the inquiry prefilled
(no backend required). To send server-side instead, replace the body of
`handleSubmit` in `components/Contact.js` with a `fetch()` to your form handler
(Formspree, Resend, a Next.js route handler, etc.).

### Editing services or FAQs
Both are plain arrays at the top of `components/Services.js` and
`components/FAQ.js`. Add, remove or reorder entries there. If you change the
service categories, update `components/ServicesTeaser.js` too — it mirrors them
on the home page.

### Adding a page
Create `app/your-page/page.js`, export a `metadata` object with a `title` and
`description`, and render `<PageHero />` then your content. Add the route to
`LINKS` in `components/Header.js` and to `EXPLORE` or `MORE` in
`components/Footer.js`.

---

## Deploying

Pushed to `main` on GitHub → Vercel builds and deploys automatically.

```bash
git add -A
git commit -m "your message"
git push
```

---

## Content notes

Everything on this site comes from information the organization supplied. The
site deliberately contains **no** invented phone number, business hours, staff
names, credentials, testimonials, statistics, or named insurance providers.
Placeholders in use:

- **Logo** — placeholder mark, see above.
- **Privacy Policy / Terms of Use** — footer links point to the contact section
  until real policy copy is provided.
- **Alternative to Explosion Program** — described only as a specialized
  school-based program, with a "contact us to learn more" call to action, since
  detailed program information was not supplied.
