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
| `/mini-games` | Hub linking the five activities |
| `/mini-games/balloon-breath` | Hold-to-inflate breathing exercise |
| `/mini-games/sound-garden` | Tap-to-plant note grid |
| `/mini-games/zen-sand-garden` | Rake sand, set stones |
| `/mini-games/mandala-maker` | Mirrored symmetry drawing |
| `/mini-games/calm-catch` | 60-second gentle catching game — the only actual game |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |

The section was called Wellness Games for a while, so `/wellness-games` and
`/wellness-games/:slug` redirect here, as do the four original slugs
(`breathe-and-grow`, `memory-match`, `pop-the-worries`, `color-your-mood`).
See `next.config.js` — and note nothing in there may point AT `/wellness-games`,
which would make a redirect loop.

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
  privacy-policy/ terms-of-service/          one page.js each
  mini-games/
    layout.js       imports games.css so it loads only on these routes
    games.css       every game style, scoped to this route group
    page.js         hub + wellness disclaimer
    <slug>/page.js  one thin wrapper per game
_replaced-games/                             the four retired games — safe to delete
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
  BackToTop.js      Floating scroll-to-top, hides over the footer
  games/
    gamesData.js    Titles, blurbs, slugs, accent colours for all five games
    GameShell.js    Shared page frame: hero, instructions, disclaimer, back link
    GameDone.js     Shared completion card + replay button
    GameIcons.js    Inline SVG art used by the games
    BalloonBreath.js   SoundGarden.js  ZenSandGarden.js
    MandalaMaker.js    CalmCatch.js

Section components take a `hideHead` prop. Interior pages pass `hideHead`
because `PageHero` already supplies the page's single `<h1>`; the home page
omits it so each section keeps its own `<h2>`.
```

## Mini Games

Five small activities at `/mini-games`. They are calming things to do, not
treatment, and the hub and every page carry that disclaimer.

**Only Calm Catch is actually a game.** Each entry in `gamesData.js` carries a
`kind` ("Breathing exercise", "Music activity", "Quiet activity", "Creative
activity", "Game") and its own `cta` ("Take a Breath", "Be Creative", …). The
hub shows the kind as a chip on the card, each activity page shows it as the
eyebrow above the title, and the button names the thing you will be doing.
Do not collapse these back to a generic "Play Game" — telling someone they are
about to play a game when they are about to do a breathing exercise sets the
wrong expectation before they have clicked.

**Hard constraints — do not add any of these:** no backend, no accounts, no
database, no external API, no login, no analytics, no personal information
collected, nothing about anyone's mental health stored, no gambling mechanics,
no purchases, no ads, no game engine, no extra dependencies. Every game is
plain React state plus CSS, and Sound Garden's audio is generated with the Web
Audio API rather than any audio file. Nothing leaves the browser and nothing is
saved between visits.

| Game | How it works |
|---|---|
| Balloon Breath | Hold to inflate over 4s, release to exhale; the balloon floats off and the breath counts. Five breaths |
| Sound Garden | 5×8 grid on a C pentatonic scale; a playhead sweeps every 380ms and sounds the lit cells |
| Zen Sand Garden | Canvas. Drag rakes four grooved furrows; a tap sets a stone with ripple rings |
| Mandala Maker | Canvas. Each segment is redrawn per slice, rotated and mirrored, at 6/8/12 slices |
| Calm Catch | 60 seconds, `requestAnimationFrame` loop; basket follows pointer, touch, or arrow keys |

### The design rule these follow

The first four games were replaced because nothing the visitor did changed
anything: Breathe & Grow was watched rather than played, Memory Match had no
connection to the site, Pop the Worries was one tap per bubble with no
consequence. **Every replacement reacts to the hand, continuously.** If a new
game is added, hold it to that test before anything else.

### Things that will break if you change them carelessly

- **`games.css` is imported by `app/mini-games/layout.js`**, not by
  `globals.css`. That keeps game styles off the other 11 pages. Add game styles
  there, not to `globals.css`.
- **The reduced-motion block at the bottom of `games.css`** must stay last, the
  same rule as `globals.css`.
- **Balloon Breath keeps `fill` and `phase` in refs as well as state.** The rAF
  loop and the release handler read them; drop the refs and releasing the
  pointer reads a stale fill and mis-counts the breath.
- **Sound Garden creates its `AudioContext` on the first tap, never on mount.**
  Browsers block audio not started by a user gesture, and iOS additionally needs
  the `resume()` call that `audio()` makes. Nothing plays until Play is pressed.
- **Both canvases scale by `devicePixelRatio`** in `fit()` and re-fit only when
  the window width really changes — an iOS address bar hiding must not wipe the
  drawing.
- **`CalmCatch.js` keeps the basket position in a ref**, not state, so the
  animation loop does not re-render on every frame.

## Announcement strip

`components/AnnounceBar.js`. It and `<Header />` sit inside a `.topbar` wrapper
in `app/layout.js`, and **the wrapper is the sticky element** — so the header and
the strip stay pinned together on every page as one block: 79px of header plus
48px of strip (45px under 620px).

It reads "More services and opportunities are coming soon — get in touch to hear
more" and links to `/contact`. Four decisions worth keeping:

- **The whole strip is the link**, not a separate "Get in touch" anchor. An
  inline anchor there was a 23px-tall tap target and took a third line of its
  own at 375px; the strip is 45–48px tall everywhere and the entire bar is
  the target.
- **`.announce__more` is hidden under 620px**, dropping the second clause so the
  message stays on one line on a phone.
- **`--announce-h` (48px, 45px under 620px) must track the strip's real height.**
  Two things read it: `scroll-padding-top`, so in-page anchors don't land under
  the strip, and `.mobile-nav`'s `max-height`, so the open menu plus the strip
  still fit the viewport. Change the strip's padding or font size and this token
  has to change with it.
- **Don't put `position: sticky` back on `.header`.** The wrapper is sticky; the
  header is `position: relative` only so the mobile menu's shadow lands over the
  strip. Sticking the two separately needs a hardcoded `top` offset that breaks
  whenever the header changes height between breakpoints.

Keep the copy vague. It must not name a service, promise a date, or imply an
offer the organization has not actually made.

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
- **Privacy Policy / Terms of Service** — real pages now live at
  `/privacy-policy` and `/terms-of-service`. They describe only what this
  website itself does (a contact form, no tracking, no accounts). They are
  **not** a HIPAA Notice of Privacy Practices and do not cover the clinical
  practice — that has to come from the organization's own counsel.
- **Alternative to Explosion Program** — described only as a specialized
  school-based program, with a "contact us to learn more" call to action, since
  detailed program information was not supplied.
