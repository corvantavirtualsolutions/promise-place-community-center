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

## Colour rule

Saturated colour lives in **small** areas only — chips, card top rules, buttons,
illustrations. Large areas (page and section backgrounds) stay near-white. That
is what keeps the site colourful without being tiring to read.

Section washes rotate: mint → white → blush → lilac → cream → sky. All of them
are within a few percent of white; if you make one darker, re-check contrast.

Every text and icon pair on the site clears WCAG AA (4.5:1). Body text sits at
7.0:1 or better on every background.

## Illustrations

`components/Illustrations.js` holds hand-drawn flat SVG scenes — `AboutArt`,
`ChildArt`, `AdultArt`, `FamilyArt`, `SchoolCardArt`, `SchoolArt`,
`InsuranceArt`, `StepsArt`, `ContactArt`, `NotFoundArt`. They are drawn in-house
so there are no stock-photo licences, they scale losslessly, and they use the
brand palette from the `P` object at the top of the file.

Pass a `title` to make one meaningful to screen readers; leave it off and the
SVG is marked decorative. Illustrations live in the section components, never
in the page hero, so no page shows the same drawing twice.

**If you want real photography instead**, supply licensed images and swap the
`<XxxArt />` calls for `next/image` components.

## Navigation

The header carries only About, Services, Who We Serve and the Contact Us button.
Everything else — school-based services, insurance, how to get started, FAQ — is
reachable from the footer and from the "More" group in the mobile menu. Edit
`PRIMARY` and `SECONDARY` at the top of `components/Header.js`.

## Motion & animation

Everything is CSS-driven with a JavaScript observer for scroll reveals — no
animation library.

| Piece | File |
|---|---|
| Scroll reveals (`up` / `left` / `right` / `scale` / `fade`) | `components/Reveal.js` |
| Route fade-and-lift on navigation | `components/PageTransition.js` |
| Gradient scroll-progress bar | `components/ScrollProgress.js` |
| Back-to-top button | `components/BackToTop.js` |
| Curved section dividers | `components/Divider.js` |
| Keyframes, hovers, sheens | the MOTION LAYER block in `app/globals.css` |

Two guarantees, both tested:

- **`prefers-reduced-motion: reduce`** disables every animation and transition.
  The override block is the last thing in `globals.css` and must stay there.
- **No JavaScript** — a `<noscript>` block in `app/layout.js` forces all
  revealed content visible, so the site renders fully without JS.

If you add a new animation, add it above that final reduced-motion block, and
add the selector to the override list if it moves or fades anything.

---

## Common edits

### Change the address, email, or organization name
Edit **`components/site.js`** only. Header, contact section, footer and
structured data all read from it.

## Logo

The mark is **two figures whose bodies together form a heart** — people,
together, cared for. It ties to the name (a *place* where you're welcome) and to
the site's promise that getting support doesn't have to be hard.

- Left figure: teal `#3ECFB6 → #0C7267`
- Right figure: sky `#6CC5F5 → #1B82C9`
- Type: Plus Jakarta Sans ExtraBold (name), Bold (COMMUNITY CENTER)

### On the site
`components/LogoMark.js` renders the mark inline as SVG. It takes `size` and
`tone` (`"color"` | `"white"` | `"ink"`) and generates unique gradient ids per
instance, so header and footer can both use it safely. The wordmark beside it is
real HTML text in the site font — crisp, selectable, and readable to screen
readers.

`app/icon.svg` is the browser favicon (Next.js picks it up automatically).

### Files for the client
`public/brand/` holds every version as SVG: horizontal and stacked lockups, the
mark alone, white versions for dark backgrounds, one-colour versions for print,
and the app icon. All text is converted to outlines, so no font is needed to
open them. `brand-assets.zip` (git-ignored) additionally contains PNG exports at
every common size, a brand sheet, and a usage README.

Minimum sizes: lockup 120px wide, mark alone 20px. Keep clear space around the
logo of at least the height of the mark's head.

> This is a **new** mark. The original brief mentioned the organisation has an
> existing logo they wanted brightened — none was ever supplied. If that logo
> turns up, swap `LogoMark.js` and `app/icon.svg` for it; nothing here claims to
> be their existing brand.

### Replacing the logo
To use a different mark, replace the paths inside `components/LogoMark.js` and
`app/icon.svg`, and drop new files into `public/brand/`. If the brand colours
change, update the palette at the top of `app/globals.css` — every component
reads from those variables.

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
