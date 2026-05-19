# STRAND — Strandbags Website Redesign

INFO20005 · Assignment 3 · UI Implementation

| | |
|---|---|
| **Name** | Yang Sirui |
| **Student ID** | 1554088 |
| **Tutor** | Mia Casey |
| **Tutorial** | Tuesday 4 p.m. |
| **Subject** | INFO20005 |

---

## Live demo & repository

- **Live site**: <https://siryang3.github.io/strand-info20005/>
- **GitHub repo**: <https://github.com/siryang3/strand-info20005>

---

## What this project is

A pure HTML/CSS/JavaScript implementation of the Strandbags redesign I produced
in Assignment 2. No frameworks (no Bootstrap, Tailwind, React). All product
data lives in `assets/js/data.js`; the cart persists in `localStorage`. The
site is responsive between **390 × 844 (iPhone 13/14)** and **1440 × 1024** as
required by the assignment brief.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero + Shop by Category + Featured Edit + New Arrivals |
| Search Results | `search.html` | Live search, cyclic Filter/Sort buttons, responsive grid |
| Product Detail | `product.html?id=<id>` | Image, colour swatches, description, Add to Bag |
| Shopping Cart | `cart.html` | Cart items with ± quantity & remove, Subtotal, Checkout |
| Payment | `payment.html` | Form with client-side validation (Luhn-checked card, AU postcode) |
| Order Confirmed | `confirm.html` | Generated order number + Continue Shopping |

## Folder layout

```
website/
├── index.html
├── search.html
├── product.html
├── cart.html
├── payment.html
├── confirm.html
├── assets/
│   ├── css/
│   │   ├── tokens.css       Design tokens (colours, type, spacing)
│   │   ├── base.css         Reset + global typography
│   │   ├── components.css   Header, footer, buttons, cards, forms
│   │   └── pages.css        Page-specific layouts + responsive rules
│   ├── js/
│   │   ├── data.js          Product catalogue
│   │   ├── cart.js          Cart state in localStorage (read/add/remove/subtotal)
│   │   ├── app.js           Shared header/footer + cart badge + toast
│   │   ├── home.js          Renders New Arrivals + Category tiles
│   │   ├── search.js        Filter/sort + live search
│   │   ├── product.js       Swatch picker + Add to Bag
│   │   ├── cart-page.js     Cart list renderer
│   │   ├── payment.js       Form validation + place-order
│   │   └── confirm.js       Shows the order number from sessionStorage
│   └── img/                 Product images
└── README.md
```

## Running locally

This is a static site — open `index.html` in a browser, or for the cleanest
experience start a local server:

```bash
# Python (no install needed on Windows/macOS)
python -m http.server 5510

# then open http://localhost:5510/
```

A live server is recommended because some browsers restrict `localStorage`
when files are opened via `file://`.

## Responsive testing

Per the assignment brief, the site has been verified at the two official
breakpoints using Chrome DevTools (Inspect → Device toolbar):

- **Mobile** — 390 × 844 px (iPhone 13 / 14)
- **Desktop** — 1440 × 1024 px

There is no horizontal scrolling on any page at either breakpoint.

## External libraries / fonts (Honesty Check)

- **Google Fonts — DM Serif Display** (free, used for headings and the
  `STRAND` wordmark). Loaded via the standard `<link>` tag.
- **No JavaScript framework or UI library** is used.
- AI tooling was used as a coding assistant during development; usage is
  declared in the final report per the unit's AI-use policy.

## Git workflow (Strand's commit history)

```bash
# Inside the website/ folder
cd "<path>/260512-01/website"

# One-time identity setup (uses the same email as your GitHub account)
git config user.name  "Yang Sirui"
git config user.email "<your-github-email>"

# Initialise the repo
git init -b main

# First commit — the project skeleton.
git add .
git commit -m "scaffold: project structure, tokens, six page shells"

# Push to GitHub (after creating an empty repo "strand-info20005" on GitHub)
git remote add origin https://github.com/siryang3/strand-info20005.git
git push -u origin main
```

After that, commit in small, meaningful chunks — at least once per week, as
the brief requires. Sample commit messages to use as work progresses:

```
feat(cart):    quantity stepper + remove button
feat(product): colour swatch picker + Add-to-Bag toast
feat(search):  cyclic Filter/Sort buttons
fix(payment):  Luhn check on card number
style:         tighten mobile header (56px) + 2-col category grid
docs:          add A3 report draft (mockup vs build comparison)
```

## Deployment to GitHub Pages

1. Push the repo (see above).
2. On GitHub: `Settings → Pages → Source: Deploy from a branch → main / root`.
3. Wait ~1 minute, then the site is live at
   `https://siryang3.github.io/strand-info20005/`.
