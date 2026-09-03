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

## Contact form backend and staff dashboard

The form posts JSON to `app/api/contact/route.js`, which saves the inquiry to
Supabase. Staff read it at **`/admin`**. Both sides use plain `fetch` against
Supabase's REST and Auth APIs — no `@supabase/supabase-js`, no new dependencies.

```
visitor ──POST /api/contact──▶ route.js ──▶ Supabase REST (insert)
staff   ──GET  /admin ───────▶ page.js  ──▶ Supabase Auth (verify session)
                                        └─▶ Supabase REST (read + update)
```

### Emails (Mailgun)
After a successful save, two messages go out through Mailgun — `lib/mailgun.js`
sends, `lib/contactEmails.js` holds the copy:

1. **An auto-reply to the visitor.** Confirms receipt, repeats the 911 line,
   and **never quotes back what they wrote.** Their message may describe
   symptoms or a crisis, and plain email is not a safe place to put that; it
   also means a mistyped address leaks nothing to a stranger.
2. **A notification to `CONTACT_TO_EMAIL`** with the full inquiry, `Reply-To`
   set to the visitor so hitting reply answers them directly.

Rules that must survive any refactor:

- **Email failure must never fail the request.** The inquiry is already saved by
  the time we send. Telling someone their message failed when it did not is
  worse than a missed email. Every send is caught and logged; the visitor still
  gets a 200.
- **If Mailgun is unconfigured, nothing is attempted** and the form behaves
  exactly as it did before. That is the tested no-op path, not an accident.
- **Auto-replies carry `Auto-Submitted: auto-replied`** plus
  `X-Auto-Response-Suppress`, and are skipped for `no-reply@`-style addresses
  and for the clinic's own address. Without that, two autoresponders can talk to
  each other indefinitely.
- **`MAILGUN_BASE_URL` carries the region.** A key issued in the EU will not
  authenticate against `api.mailgun.net`, and the failure looks like a bad key.

The client-side `mailto:` fallback still matters: it is the safety net when the
**database** is unreachable, which is a different failure from email. Keep it.

### DNS — the one that can break their inbox
`MAILGUN_DOMAIN` is a **subdomain**: `mg.promiseplacecc.com`. Mailgun asks for MX
records, and putting those on the root `promiseplacecc.com` would take over
inbound mail and stop `admin@promiseplacecc.com` receiving anything. The
subdomain sends; the root's MX records are never touched.

### Two Supabase keys, used for different things
- **Service role key** → `/rest/v1/*`. Bypasses row-level security, which is how
  the site reads and writes a table that is closed to everyone else.
- **Anon key** → `/auth/v1/*`. Sign-in and session verification only.

Neither is `NEXT_PUBLIC_*`; neither reaches the browser. The table has RLS
enabled with **no policies at all**, so the anon key can do nothing with it even
if it leaked.

### Who can reach /admin
Only the address in `ADMIN_EMAIL`. That is enforced in three places, and all
three have to fail before anyone else gets in:

1. Before sign-in is even attempted, so a wrong address can't be used to probe
   Supabase for which accounts exist.
2. Against the account Supabase returns after a successful password check.
3. On **every page load and every API call**, via `requireAdmin()` — because a
   Supabase project can gain another user later, and that must never be enough.

Sign-in failures all return one generic message. Telling someone whether the
email or the password was wrong tells an attacker which half they got right.

The session is a Supabase access token in an **httpOnly** cookie, so page
JavaScript cannot read it. `/admin` and `/api/` are disallowed in
`app/robots.js`, and the page sets `robots: { index: false }`.

### The dashboard
Filter by status or Archived, search across name/email/message, expand a row for
the full inquiry, set status (New / In progress / Closed), leave staff notes, and
archive. Status, notes and archiving save optimistically and roll back if the
request fails.

- **The whole public shell is hidden here** — header, announcement strip, footer,
  back-to-top, scroll progress — via `body:has(.adminwrap)` in `globals.css`,
  because the root layout renders them for every route and cannot tell which one
  is being served. The dashboard supplies its own bar instead.
- **`.abar` is sticky**: title, signed-in address, sign-out, filters and search
  all stay put while the list scrolls. It is one element on purpose — two stacked
  stickies would need a hardcoded top offset that breaks between breakpoints.
- **"Delete" archives, it never deletes.** It sets `archived_at`; `status` and
  notes survive the round trip, and Unarchive puts the row straight back. An
  inquiry from someone asking for help should not be destroyable by a mis-click.
  There is no hard-delete anywhere in the UI — removing a row for good is a
  deliberate action in the Supabase dashboard.
- **`min-width: 0` on `.arow__body dl > div` is load-bearing.** Grid children
  size to min-content by default, so a long address like
  `corvantavirtualsolutions@gmail.com` overflowed its track and ran into the
  phone column. Paired with `overflow-wrap: anywhere` on `dd`.

### After the form is sent
The form is **replaced** by a thank-you panel (`.thanks`), not topped with a
success banner: leaving a blank form under a success message reads as "did that
work?" and invites a duplicate submission. The panel has a waving-person
illustration, a "Send another message" button that restores the form, and a note
that changes daily.

Those notes are in `components/quotes.js`, rotated by day of the year. They are
**written for this site and attributed to nobody**. Quotes get misattributed
constantly, and putting invented words in a real person's mouth on a mental
health provider's website is not worth the decoration. They also avoid "just
think positive" framing — someone who has only just asked a clinic for help
should not be told to cheer up. Add to the array freely; keep both rules.

### Setup
1. Supabase → SQL Editor → run `supabase/schema.sql`. If the table already
   exists from an earlier copy, run `supabase/migration-01-archive.sql` instead
   to add the archive column.
2. Supabase → Authentication → Users → add **one** user, the `ADMIN_EMAIL`, with
   "Auto Confirm User" ticked. Then Providers → Email → turn **off** "Enable
   sign ups" so no one else can ever register.
3. Copy `SUPABASE_URL`, the **service_role** key and the **anon** key into
   Vercel's environment variables, along with `ADMIN_EMAIL` and a random
   `IP_HASH_SALT`. See `.env.example`.

### Behaviour worth preserving
- **Honeypot** (`#company`, off-screen, `tabIndex={-1}`, `aria-hidden`) returns
  `200` on a hit, not an error — a bot that gets an error just retries.
- **Rate limit** is 3 per hashed IP per 10 minutes, counted *in the database*:
  each serverless invocation may be a cold instance, so an in-memory counter
  would reset constantly and catch nothing.
- **The raw IP is never stored**, only a salted SHA-256.
- **`/admin` is `force-dynamic` with `revalidate = 0`.** A cached copy of this
  page would be a data leak.

### ⚠️ HIPAA — read before this goes live
The `message` column stores free text written by the public, and people asking a
mental health provider for help **will** describe symptoms, medication and
crises in it. That is protected health information.

**Supabase only signs a Business Associate Agreement on its Team plan and above.**
On the free or Pro tier there is no BAA, and storing PHI there is a compliance
exposure for the clinic — not for the website.

Options, for the client and their counsel:
1. Upgrade Supabase to a plan with a BAA.
2. Stop storing the message body — drop `message` from the `row` object in
   `app/api/contact/route.js` and keep only the structured fields.
3. Accept the risk in writing.

Raised 2026-09-01; the decision was to store everything for now.

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

The mark is **a roof with three people under it** — shelter, and a community
center in the most literal sense. Replaced the earlier two-figures-and-a-heart
mark on 2026-09-02.

Why this one: it holds its shape everywhere a logo actually has to survive. The
roof and the three dots stay separate and legible at 24px in the header, in a
single colour, and knocked out on the footer's dark teal. The old mark's two
heads merged into one blob below about 24px.

- Roof: teal gradient `#3ECFB6 → #0C7267`
- People: coral `#EE6A62`, yellow `#F5CE63`, blue `#1B82C9`
- Type: Plus Jakarta Sans ExtraBold (name), Bold (COMMUNITY CENTER)

Three figures, not two: children, adults and families are all named on the site,
and three reads as a group where two reads as a couple.

### Things to keep
- **The roof is a stroke, not a filled shape**, with round caps and joins. Its
  weight then stays identical at every size, and there is no overlap to be
  knocked out by a fill rule — the trap that put a hole in the old mark.
- **On the dark footer the roof goes white but the people keep their colours.**
  Three white dots read as decoration rather than as people.

### On the site
`components/LogoMark.js` renders the mark inline as SVG. It takes `size` and
`tone` (`"color"` | `"white"` | `"ink"`) and generates a unique gradient id per
instance, so header, footer and the admin bar can all use it safely. The
wordmark beside it is real HTML text in the site font — crisp, selectable and
readable to screen readers.

`app/icon.svg` is the browser favicon (Next.js picks it up automatically).

### Files for the client
`public/brand/` holds the lockups the client can actually use, as both SVG and
PNG, with a plain-English `README.txt` explaining which file goes where:

| File | For |
|---|---|
| `promise-place-logo-horizontal.*` | Default. Letterhead, signatures, documents |
| `promise-place-logo-stacked.*` | Tall or square spaces. Flyers, posters, signage |
| `*-white.*` | Dark or coloured backgrounds only |
| `*-black.*` | One colour — fax, photocopy, embroidery |
| `promise-place-mark-only.*` | Roof alone, where the name is already nearby |
| `promise-place-social-avatar.png` | Square 1024px profile picture |

**All wordmark text is converted to vector outlines.** A `<text>` element only
renders right where Plus Jakarta Sans is installed — paste that into Canva or a
printer's workflow and it silently falls back to something else. Outlines look
identical everywhere and need no font file. `fontwork/build_lockup.py` in the
session notes documents how they were generated if they ever need rebuilding.

Minimum sizes: lockup 120px wide, mark alone 20px. Keep clear space around the
logo of at least the height of the roof.

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
Out of date — the form now posts to `/api/contact` and saves to Supabase, and
staff read submissions at `/admin`. See **Contact form backend and staff
dashboard** above. The `mailto:` path still exists, but only as the fallback
when the API call fails.

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
