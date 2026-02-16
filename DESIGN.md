# DESIGN.md — Zen Browser Website Design System

This document captures every design decision, token, component pattern, and UX convention used on the Zen Browser website (`zen-browser.app`). It is written so that someone could reproduce the same UI from scratch without access to the source code.

---

## 1. Overview

**Tech stack:** Astro 5, React 19, TypeScript, Tailwind CSS 3, deployed to Cloudflare Pages.

**Design philosophy:** Warm, minimal, calm. The site uses an off-white paper tone, soft borders, and generous whitespace to create a serene browsing experience. Interactions are subtle — gentle fades, slight scale shifts, soft blurs. Typography mixes a geometric sans-serif for body text with a classic serif for display headings.

---

## 2. Color System

### CSS Custom Properties

Defined on `:root` and toggled via `[data-theme="dark"]`:

| Token            | Light                    | Dark                      |
|------------------|--------------------------|---------------------------|
| `--zen-paper`    | `#f2f0e3`               | `#1f1f1f`                |
| `--zen-dark`     | `#2e2e2e`               | `#d1cfc0`                |
| `--zen-muted`    | `rgba(0, 0, 0, 0.05)`   | `rgba(255, 255, 255, 0.05)` |
| `--zen-subtle`   | `rgba(0, 0, 0, 0.05)`   | `rgba(255, 255, 255, 0.1)` |

### Tailwind Color Aliases

Configured in `tailwind.config.mjs` under `theme.extend.colors`:

| Tailwind class | Value              |
|----------------|--------------------|
| `paper`        | `var(--zen-paper)` |
| `dark`         | `var(--zen-dark)`  |
| `muted`        | `var(--zen-muted)` |
| `subtle`       | `var(--zen-subtle)`|
| `coral`        | `#F76F53`          |
| `zen-blue`     | `#6287f5`          |
| `zen-green`    | `#63f78b`          |

### Brand Colors

- **Coral** `#F76F53` — primary accent, CTA highlights, link underlines, logo color, decorative circles
- **Zen Blue** `#6287f5` — secondary accent
- **Zen Green** `#63f78b` — tertiary accent
- **Theme color** (meta tag): `#da755b`

---

## 3. Typography

### Primary: Bricolage Grotesque

A variable geometric sans-serif loaded via `@fontsource/bricolage-grotesque`.

- **Weights imported:** 400, 500, 600
- **Default body weight:** 500
- **Variation settings:** `'width' 100`
- **Optical sizing:** `auto`
- **Font style:** `normal`
- **CSS:** Applied to `body, body > *` via global styles

```css
body, body > * {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 500;
  font-variation-settings: 'width' 100;
}
```

### Accent: Junicode

A serif typeface used for display headings (`<Title>` component, `<h1>`).

- **Variants:** Roman (`JunicodeVF-Roman-subset.woff2`), Italic (`JunicodeVF-Italic-subset.woff2`)
- **Font display:** `swap`
- **Feature settings:** `swsh 1` enabled by default via Tailwind `fontFamily.junicode` config; `swsh 0` on `h1 .italic` elements
- **Served from:** `/fonts/` directory as self-hosted woff2 subsets

Tailwind config for Junicode:
```js
fontFamily: {
  junicode: [
    'Junicode, serif',
    { fontFeatureSettings: { swsh: 1 } },
  ],
},
```

### Italic Pattern in Headings

When a `<b>` element inside `<h1>` has the `.italic` class, the italic variant is used:

```css
h1 .italic {
  font-family: 'Junicode-Italic', serif;
  font-weight: 400;
  font-feature-settings: 'swsh' 0;
  font-style: normal; /* not italic — the italic is baked into the font file */
}
```

### Size & Weight Conventions

| Context                  | Size                              | Weight    | Leading       |
|--------------------------|-----------------------------------|-----------|---------------|
| Title component          | `text-5xl` (3rem)                 | semibold (600) | `leading-[0.9]` |
| Hero title (mobile)      | `text-5xl` (3rem)                 | semibold  | `leading-[0.9]` |
| Hero title (md)          | `text-7xl` (4.5rem)              | semibold  | `leading-[0.9]` |
| Hero title (lg)          | `text-9xl` (8rem)                | semibold  | `leading-[0.9]` |
| Features section title   | `text-4xl` sm:`text-6xl`          | bold (700)| default       |
| Feature item title       | `text-2xl`                        | bold      | default       |
| Feature tab text         | `text-lg`                         | medium (500) | default    |
| NavBar brand             | `text-lg`                         | bold      | default       |
| NavBar links             | `text-xs` sm:`text-sm` lg:`text-base` | default | default   |
| Button text              | `0.9rem` (scoped CSS)             | default   | default       |
| Footer section headings  | `text-base`                       | semibold  | default       |
| Footer title             | `text-6xl`                        | bold      | default       |

---

## 4. Spacing & Layout

### Container

Configured in `tailwind.config.mjs` under `theme.container`:

```js
container: {
  center: true,
  screens: {
    sm: '100%',
    md: '100%',
    lg: '1024px',
    xl: '1280px',
  },
  padding: {
    DEFAULT: '1rem',
    sm: '1.5rem',
    md: '1.5rem',
    lg: '1.5rem',
    xl: '2rem',
  },
},
```

- Container is centered by default
- Full-width on small/medium screens, max `1024px` at `lg`, `1280px` at `xl`
- Horizontal padding scales from `1rem` (mobile) to `2rem` (xl)

### Negative Breakpoints

Custom max-width breakpoints for targeting smaller screens:

| Breakpoint | Media Query             |
|------------|-------------------------|
| `-sm`      | `@media (max-width: 639px)` |
| `-md`      | `@media (max-width: 767px)` |
| `-lg`      | `@media (max-width: 1023px)` |

### Common Spacing Patterns

| Context                    | Spacing                                              |
|----------------------------|------------------------------------------------------|
| Hero vertical padding      | `py-16` (mobile), `py-32` (lg)                      |
| Hero element gap           | `gap-6` (mobile), `gap-12` (lg)                     |
| Hero inner gap             | `gap-6` (mobile), `gap-8` (md)                      |
| Hero CTA button gap        | `gap-3` (mobile), `gap-6` (sm)                      |
| Features section padding   | `py-12` (mobile), `py-36` (lg)                      |
| Features list gap          | `gap-3` (desktop list), `gap-2` (mobile tabs)       |
| Features main layout gap   | `gap-6` (mobile), `gap-2` (lg)                      |
| NavBar padding             | `py-3` (mobile), `py-6` (lg)                        |
| Footer padding             | `px-4 py-12` (mobile), `p-24` (lg)                  |
| Footer section gap         | `gap-16` (outer), `gap-12` (inner)                  |
| Footer link grid gap       | `gap-8` (columns), `gap-2` (within column)          |
| Title bottom margin        | `mb-[0.4rem]`                                        |
| Body min height            | `min-h-[max(100dvh,_64rem)]`                        |

---

## 5. Dark Mode

### Detection Priority

Resolved in a blocking inline `<script>` before any rendering:

1. `localStorage.getItem('theme')` — user's explicit choice
2. `window.matchMedia('(prefers-color-scheme: dark)').matches` — system preference
3. Default: `'light'`

### Implementation

- The `data-theme` attribute is set on `<html>` (`'light'` or `'dark'`)
- Tailwind's `darkMode` is configured as: `['selector', '[data-theme="dark"]']`
- CSS custom properties on `:root` are overridden inside `&[data-theme='dark']`
- The `dark:` Tailwind prefix works via this selector

### Theme Toggle

The `ThemeSwitch` component toggles the theme:

1. Reads current theme via `resolveTheme()`
2. Flips to opposite value
3. Sets `data-theme` attribute on `<html>`
4. Adds/removes `dark` class on `<html>` (`html.classList.toggle('dark', ...)`)
5. Persists to `localStorage`

### Dark Mode Specific Adjustments

- Feature videos: `dark:opacity-80` (slightly dimmed in dark mode)
- All theme-aware colors use CSS custom properties, so they adapt automatically

---

## 6. Components

### Button (`src/components/Button.astro`)

A polymorphic component that renders as either `<a>` or `<button>` depending on whether `href` is provided.

**Props:**
| Prop         | Type    | Default | Description                              |
|--------------|---------|---------|------------------------------------------|
| `href`       | string  | —       | If present, renders as `<a>` link        |
| `isPrimary`  | boolean | false   | Primary (filled) variant                 |
| `isAlert`    | boolean | false   | Alert (red) variant                      |
| `isBordered` | boolean | false   | Bordered (outline) variant               |
| `class`      | string  | —       | Additional CSS classes                   |
| `id`         | string  | —       | Element ID                               |
| `extra`      | object  | —       | Additional HTML attributes               |
| `localePath` | boolean | true    | Whether to apply locale path to href     |

**Base styles (link variant):**
```
transition-bg flex items-center justify-center gap-2 rounded-xl px-6 py-4
transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]
```

**Base styles (button variant):**
```
transition-bg flex items-center justify-center gap-2 rounded-lg px-6 py-3
transition-transform duration-150 hover:scale-[1.02]
```

Note: Links use `rounded-xl` and `py-4`; buttons use `rounded-lg` and `py-3`.

**Variant styles:**

| Variant    | Link classes                                               | Button classes                                             |
|------------|------------------------------------------------------------|------------------------------------------------------------|
| Primary    | `border-dark bg-dark text-paper shadow-lg`                 | `border-dark bg-dark text-paper shadow-md`                 |
| Alert      | `bg-red-300 text-dark`                                     | `bg-red-300 text-dark`                                     |
| Default    | `bg-subtle`                                                | (no extra classes)                                         |
| Bordered   | `border-2 border-dark hover:bg-dark hover:text-paper hover:shadow-sm` | Same                                            |

**Scoped styles:**
```css
button, a {
  font-size: 0.9rem;
}
button[disabled], a[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
```

**Interaction:** 150ms transform transition, scale to `1.02` on hover, `0.98` on active (link only).

---

### Title (`src/components/Title.astro`)

A heading component using Junicode serif.

**Props:**
| Prop    | Type   | Description              |
|---------|--------|--------------------------|
| `class` | string | Additional CSS classes   |

**Default classes:**
```
mb-[0.4rem] font-junicode text-5xl font-semibold leading-[0.9] text-dark
```

Renders as `<h1>`. Classes are merged via `cn()` so consumer can override.

---

### Description (`src/components/Description.astro`)

A simple pass-through `<p>` element that spreads all props.

**Usage:** Wraps text content, typically styled by the parent via class props.

---

### NavBar (`src/components/NavBar.astro`)

Uses `astro-navbar` library (`Astronav`, `Dropdown`, `DropdownItems`, `MenuItems`).

**Desktop layout:**
```
container grid grid-cols-2 lg:grid-cols-[auto_1fr_auto] items-center gap-2 bg-paper py-3 lg:py-6
```

Three columns at `lg`:
1. Logo + brand name (left)
2. Navigation links (center, hidden below `lg`)
3. Theme switch + download button + hamburger (right)

**Dropdown menu styling:**
```css
.navbar-dropdown {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* or 1 for "Useful Links" */
  gap: 0.5rem;
  border: 2px solid var(--zen-dark);
  background: var(--zen-paper);
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
```

**Dropdown items:**
```css
.dropdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  user-select: none;
  transition: colors 200ms;
}
.dropdown-item:hover { background: var(--zen-muted); }
.dropdown-title { font-weight: bold; }
.dropdown-description { font-size: 0.875rem; }
```

**Dropdown chevron animation:** `group-open:rotate-180` with `duration-200`.

**Mobile menu:** Slide-in panel from right, 16rem wide (`w-64`), triggered by hidden checkbox (`#mobile-menu-toggle`). Overlay is fixed black at `opacity-50`. Transition: `translate-x-full` to `translate-x-0`, 300ms duration.

---

### Footer (`src/components/Footer.astro`)

**Container:**
```
border-t border-dark bg-dark text-paper px-4 py-12 lg:p-24 overflow-hidden
```

Inverted color scheme — dark background with paper text.

**Structure:**
1. Title section (`text-6xl` bold, paper color) with description
2. Download CTA button (paper bg, dark text — inverted primary)
3. Link grid: 3 columns at `md`, containing "Follow Us" (social strip), "About Us", "Get Started", "Get Help" sections
4. Copyright bar
5. Decorative `<Circles>` in bottom-right corner (white variant, `multiplier={0.7}`, offset with negative margins)

**Link grid headings:** `text-base !font-semibold`
**Link list items:** `opacity-80`, `font-normal`

**Accessibility:** `role="contentinfo"`, `aria-label` on footer and sections, `aria-labelledby` linking headings to sections, `<nav>` elements with `aria-label`.

---

### Hero (`src/components/Hero.astro`)

**Layout:**
```
flex flex-col items-center gap-6 py-16 text-center lg:gap-12 lg:py-32
```

**Elements (top to bottom):**
1. Title with highlighted italic words in coral
2. Description paragraph
3. Two CTA buttons (primary "Download" + default "Support")
4. Social media strip
5. Hero video

**Initial state for animated elements:**
```css
transform: translateY(20px); opacity: 0.001; filter: blur(4px);
```

All animated children start hidden and are revealed by the entrance animation.

---

### Features (`src/components/Features.astro`)

**Layout:** Two-column at `lg` — feature list (1/3 width) on left, video stack (3/5 width) on right.

**Desktop feature list:** Clickable cards with `rounded-lg p-4`, background `bg-subtle` when active, `hover:bg-subtle` on hover. Transition: `background 0.2s ease-in-out`.

**Mobile tabs:** Horizontal scroll row of `rounded-lg px-4 py-2 text-lg font-medium` buttons.

**3D Video Stack:**
```css
.video-stack {
  aspect-ratio: 16/9;
  perspective: 2000px;
  transform-style: preserve-3d;
}

.feature-video {
  position: absolute;
  top: 0;
  left: 50%;
  max-width: 800px;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform-origin: top center;
  backface-visibility: hidden;
  will-change: transform, opacity;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(-50%, 0, -100px) scale(0.95);
}
```

**Active video:** `translate3d(-50%, 0, 0) scale(1)`, `z-index: 10`, `opacity: 1`
**Inactive videos:** Offset by `(i - activeIndex) * 20px` on Y, `-100 - abs(i - activeIndex) * 50px` on Z, rotated `(i - activeIndex) * 3deg` around X axis, scaled to `0.95`.

**Mobile (max-width: 1024px):** No 3D transforms. Videos are absolutely positioned, hidden by default, shown when `[data-active='true']` with `display: block; opacity: 1`.

---

### Video (`src/components/Video.astro`)

**Props:** `name` (string, required), plus any HTML video attributes.

**File convention:**
- Poster: `/media/{name}/poster.webp`
- WebM source: `/media/{name}/video.webm`
- MP4 source: `/media/{name}/video.mp4`

**Default attributes:** `preload="none"`, `class="w-fit"`

Sources are ordered WebM first (smaller), MP4 fallback.

---

### Circles (`src/components/Circles.astro`)

Decorative concentric circle rings.

**Props:**
| Prop         | Type    | Default | Description                          |
|--------------|---------|---------|--------------------------------------|
| `white`      | boolean | false   | Use paper color instead of coral     |
| `multiplier` | number  | 0.9    | Scale factor for all sizes           |
| `class`      | string  | —       | Additional classes                   |

**Ring sizes (base):** 216px, 396px, 576px, 756px
**Border widths (base):** 20px, 30px, 40px, 50px

All values are multiplied by the `multiplier` prop. Each ring is `rounded-full`, absolutely positioned, centered with `-translate-x-1/2 -translate-y-1/2`.

**Color:** `border-coral` (default) or `border-paper` (white variant).

**Opacity:** `opacity-10` on mobile, `lg:opacity-100` on desktop.

**Container:** `pointer-events-none inset-0 overflow-hidden`.

---

### Logo (`src/components/Logo.astro`)

An inline SVG of three concentric circle rings (matching the Circles motif). Default size `32x32`, viewBox `0 0 64 64`. Uses `currentColor` for fill, typically colored via `text-coral`.

---

### ThemeSwitch (`src/components/ThemeSwitch.astro`)

A button (`32x32` hit target, `20x20` icon) with two SVG icons:
- **Sun icon** (dark mode only — `hidden dark:block`): 12-ray sun with central circle
- **Moon icon** (light mode only — `dark:hidden`): Crescent moon with stars

---

### SocialMediaStrip (`src/components/SocialMediaStrip.astro`)

A horizontal `<ul>` of social media icon links using FontAwesome brand icons.

**Layout:** `flex items-center gap-4 opacity-80`

**Icons (via `@fortawesome/free-brands-svg-icons`):**
- GitHub (`faGithub`)
- X/Twitter (`faXTwitter`)
- Mastodon (`faMastodon`)
- Bluesky (`faBluesky`)
- Reddit (`faReddit`)

Each link has an `aria-label` and opens in a new tab.

---

### MobileMenu (`src/components/MobileMenu.astro`)

**Toggle mechanism:** CSS-only via a hidden `<input type="checkbox" id="mobile-menu-toggle">` with `peer` classes.

**Panel:** Fixed position, right-aligned, `w-64`, `bg-paper`, `shadow-lg`. Hidden via `translate-x-full`, shown via `peer-checked:translate-x-0`. Transition: `duration-300`.

**Overlay:** Fixed full-screen, `bg-black`, default `opacity-0 pointer-events-none`, toggles to `opacity-50 pointer-events-auto` when menu is open.

**Structure:** Header with title + close button, then `<nav>` with nested `<ul>` groups. Links styled with `text-dark hover:text-coral`.

---

## 7. Animation System

### Library

**anime.js v4** (`animejs@4.0.2`) with `onScroll` scroll-trigger support.

### Hero Entrance Animation

```js
animate(elements, {
  opacity: (element) => {
    if (element.tagName === 'UL') return { from: 0.001, to: 0.8 }
    return { from: 0.001, to: 1 }
  },
  translateY: { from: 20, to: 0 },
  filter: { from: 'blur(4px)', to: 'blur(0px)' },
  duration: 300,
  delay: stagger(150),
  ease: 'cubicBezier(0.25, 0.1, 0.25, 1)',
  autoplay: onScroll({ target: '#header' }),
})
```

- **Initial CSS state:** `transform: translateY(20px); opacity: 0.001; filter: blur(4px)` (set inline)
- **Targets:** `#header h1 b, #header p, #header div:has(a), #header video, #header ul`
- **Stagger:** 150ms between each element
- **Easing:** `cubicBezier(0.25, 0.1, 0.25, 1)` — a smooth ease-out
- **Social media strip** animates to `opacity: 0.8` (not 1)

### Features Entrance Animation

```js
// Titles
animate('.title-line', {
  opacity: [0, 1],
  delay: stagger(200, { start: 200 }),
  duration: 600,
  easing: 'easeOutQuad',
})

// Description text
animate('.feature-description-text', {
  opacity: [0, 1],
  delay: 600,
  duration: 600,
  easing: 'easeOutQuad',
})

// Tabs and feature items
animate('.feature-tab, .feature', {
  opacity: [0, 1],
  delay: stagger(200, { start: 800 }),
  duration: 500,
  easing: 'easeOutQuad',
})
```

- **Easing:** `easeOutQuad` throughout
- **Sequence:** Titles (200ms stagger, start at 200ms) -> description (600ms delay) -> tabs/features (200ms stagger, start at 800ms)

### CSS Keyframe Animations

Defined in `tailwind.config.mjs`:

```js
keyframes: {
  fadeIn: {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  breathe: {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.2)' },
  },
},
animation: {
  fadeIn: 'fadeIn 2s ease-in-out',
  breathe: 'breathe 5s ease-in-out infinite',
},
```

- `animate-fadeIn` — 2s fade-in, ease-in-out
- `animate-breathe` — 5s infinite pulsing scale (1 -> 1.2 -> 1)

### Button Interaction

- `transition-transform duration-150`
- Hover: `scale-[1.02]`
- Active: `scale-[0.98]` (link variant only)

### Feature Video Stack Transition

```css
transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
```

### Feature Item Background Transition

```css
transition: background 0.2s ease-in-out;
```

### Dropdown Chevron

```
transform transition-transform duration-200 group-open:rotate-180
```

### Mobile Menu Transition

```
transition-transform duration-300
```

---

## 8. Responsive Design

### Approach

Mobile-first with progressive enhancement at larger breakpoints.

### Key Breakpoints

| Breakpoint | Width    | Usage                                                |
|------------|----------|------------------------------------------------------|
| `sm`       | 640px    | Minor text adjustments, button layout                |
| `md`       | 768px    | Hero title scaling, layout direction changes         |
| `lg`       | 1024px   | **Major layout shift** — desktop nav, two-column layouts, full-size decorative elements |
| `xl`       | 1280px   | Max container width                                  |

### Common Patterns

**Visibility toggling:**
- Desktop nav links: `hidden lg:flex`
- Mobile hamburger: `lg:hidden`
- Download button: `hidden lg:flex`
- Line breaks in hero: `hidden md:block` or `hidden sm:inline`

**Flex direction switching:**
- Hero buttons: `flex-col md:flex-row`
- Features layout: `flex-col lg:flex-row`

**Text size scaling:**
- Hero title: `text-5xl md:text-7xl lg:text-9xl`
- Features title: `text-4xl sm:text-6xl`
- Nav links: `text-xs sm:text-sm lg:text-base`

**Width adjustments:**
- Features list: `w-full lg:w-1/3`
- Features video: `w-full lg:w-3/5`
- Footer title section: `w-full lg:w-1/2`

**Padding scaling:**
- Hero: `py-16 lg:py-32`
- Features: `py-12 lg:py-36`
- NavBar: `py-3 lg:py-6`
- Footer: `px-4 py-12 lg:p-24`

**Decorative elements:**
- Circles: `opacity-10 lg:opacity-100` (faded on mobile, full on desktop)
- Footer circles: `hidden lg:block`

---

## 9. Accessibility

### Semantic HTML

- `<header>` for hero section
- `<footer>` with `role="contentinfo"` and `aria-label="Site footer"`
- `<nav>` elements with `aria-label` for each navigation group
- `<section>` elements with `aria-labelledby` pointing to heading IDs
- Proper heading hierarchy (`h1` in Title, `h2` in footer sections)

### ARIA Attributes

- `aria-label` on social media links (e.g., `"Visit Zen Browser on GitHub"`)
- `aria-label="Toggle theme"` on theme switch
- `aria-label="Open menu"` on hamburger button
- `aria-hidden="true"` on decorative elements (icons in buttons, mobile menu overlay, menu checkbox)
- Footer buttons include `aria-label` for the download CTA

### Focus & Keyboard Navigation

- All interactive elements are native `<a>`, `<button>`, or `<label>` elements (focusable by default)
- Mobile menu toggle uses a `<label>` linked to a checkbox for CSS-only interaction

### Color & Theme

- Theme respects `prefers-color-scheme` as fallback
- User's explicit choice persisted in `localStorage`

### Screen Reader

- Mobile menu close button includes `<span class="sr-only">Close menu</span>`
- Hidden checkbox uses `sr-only` class

---

## 10. Icons & Media

### Custom SVG Icon Components (`src/icons/`)

Lucide-style stroke-based SVG icons. All share the same base pattern:

```astro
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class:list={['lucide lucide-{name}-icon lucide-{name}', className]}
  {...props}
>
  <!-- paths -->
</svg>
```

**Available icons:**
- `ArrowLeftIcon`
- `ArrowRightIcon`
- `ArrowUp`
- `CheckIcon`
- `ChevronDownIcon`
- `DownloadIcon`
- `ExternalLink`
- `GitHubIcon`
- `InfoIcon`
- `LockIcon`
- `MenuIcon`
- `XmarkIcon`

**Sizing:** Default 24x24, typically overridden via `class="size-4"` (16px) or `class="h-6 w-6"` (24px).

### FontAwesome Brand Icons

Used via `@fortawesome/fontawesome-svg-core` and `@fortawesome/free-brands-svg-icons`.

**Icons used:** `faGithub`, `faXTwitter`, `faMastodon`, `faBluesky`, `faReddit`

**CSS for FontAwesome SVGs:**
```css
.svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
  display: inline-block;
  height: 1em;
  vertical-align: -0.125em;
}
```

### Image Handling

- Astro `<Image>` component for optimized images
- Lazy loading by default

### Video

- Dual-format: WebM (primary) + MP4 (fallback)
- Poster frames: WebP format at `/media/{name}/poster.webp`
- Default `preload="none"` for performance
- Directory convention: `/media/{name}/` contains `video.webm`, `video.mp4`, `poster.webp`

---

## 11. Utility Classes & Helpers

### `.zen-link`

A styled link class applied globally:

```css
.zen-link {
  @apply text-coral underline underline-offset-4;
}
```

Coral-colored text with underline offset by 4px.

### `cn()` Utility (`src/utils/merge.ts`)

Combines `clsx` and `tailwind-merge` for conflict-free class merging:

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
```

Used throughout components to merge default classes with consumer-provided overrides (e.g., `Title`, `SocialMediaStrip`).

### `.svg-inline--fa`

Global CSS for FontAwesome inline SVG icons (documented above in Icons section).

### Global Reset

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Scroll Behavior

```css
html {
  scroll-behavior: smooth;
}
```

### Body Base Classes

```
min-h-[max(100dvh,_64rem)] overflow-x-hidden text-balance bg-paper font-['bricolage-grotesque'] text-dark
```

---

## 12. External Dependencies

UI-relevant packages with versions:

| Package                               | Version  | Purpose                                 |
|---------------------------------------|----------|-----------------------------------------|
| `astro`                               | 5.17.1   | Framework                               |
| `@astrojs/react`                      | 4.4.2    | React islands integration               |
| `@astrojs/tailwind`                   | 6.0.2    | Tailwind CSS integration                |
| `tailwindcss`                         | 3.4.15   | Utility-first CSS framework             |
| `react`                               | 19.1.0   | UI library for interactive components   |
| `react-dom`                           | 19.1.0   | React DOM renderer                      |
| `animejs`                             | 4.0.2    | Animation library (scroll triggers)     |
| `astro-navbar`                        | 2.3.7    | Navigation component (dropdowns)        |
| `@fontsource/bricolage-grotesque`     | 5.2.10   | Primary typeface                        |
| `@fortawesome/fontawesome-svg-core`   | 6.7.2    | FontAwesome core                        |
| `@fortawesome/free-brands-svg-icons`  | 6.7.2    | Brand icons (GitHub, X, etc.)           |
| `@fortawesome/free-solid-svg-icons`   | 6.7.2    | Solid icons                             |
| `clsx`                                | 2.1.1    | Conditional className utility           |
| `tailwind-merge`                      | 3.3.0    | Tailwind class conflict resolution      |
| `sharp`                               | 0.34.3   | Image optimization                      |
| `ua-parser-js`                        | 2.0.8    | User-agent parsing (download page)      |
| `date-fns`                            | 4.1.0    | Date formatting (release notes)         |
| `autoprefixer`                        | 10.4.14  | CSS vendor prefixing                    |
| `postcss`                             | 8.5.1    | CSS processing                          |
