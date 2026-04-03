# Midsphere Design System

Design specification for the midsphere.ai website. Monochrome palette with restrained color use, DM Sans throughout, black CTAs, and bold colorful feature cards as the one deliberate exception.

---

## 1. Design Philosophy

**Core principle:** Restraint. The base palette is white, gray, and black. Typography, spacing, and hierarchy do the heavy lifting. A single blue (`#0081f2`) appears only for interactive feedback (progress bars, links, focus rings), never as a brand color or CTA fill.

**One exception:** The Feature Showcase carousel uses bold, saturated color cards (coral, purple, teal, blue, charcoal) to create visual drama. These are the only place where strong color appears. Everything else on the page remains monochrome.

**Aesthetic:** Clean, minimal, editorial. Premium without being cold. Left-aligned headings, generous whitespace, no decorative badges or pills.

---

## 2. Color System

### Light Mode (`:root`)

| Token | Hex | Role |
|-------|-----|------|
| `--ms-paper` | `#f8f8f7` | Page background — warm off-white |
| `--ms-dark` | `#1a1a1a` | Primary text — near-black |
| `--ms-surface` | `#f2f2f1` | Card and section backgrounds |
| `--ms-elevated` | `#eaeae9` | Elevated card backgrounds, hover states |
| `--ms-accent` | `#1a1a1a` | Primary accent (same as text — monochrome) |
| `--ms-coral` | `#1a1a1a` | CTA buttons, primary actions — **black** |
| `--ms-blue` | `#0081f2` | Interactive elements, links, progress bars |
| `--ms-green` | `#0081f2` | Success states (maps to blue — monochrome) |
| `--ms-panel-dark` | `#111111` | Dark panel backgrounds (hero mockup, feature panels) |
| `--ms-muted` | `rgba(0,0,0,0.03)` | Subtle overlay backgrounds |
| `--ms-subtle` | `rgba(0,0,0,0.04)` | Slightly visible backgrounds |
| `--ms-border` | `rgba(0,0,0,0.08)` | Default borders |
| `--ms-border-subtle` | `rgba(0,0,0,0.04)` | Barely visible borders |
| `--ms-border-strong` | `rgba(0,0,0,0.15)` | Prominent borders |
| `--ms-danger` | `#e53e3e` | Error/danger states |

### Dark Mode (`[data-theme="dark"]`)

| Token | Hex | Role |
|-------|-----|------|
| `--ms-paper` | `#111111` | Page background — deep black |
| `--ms-dark` | `#e8e8e6` | Primary text — warm off-white |
| `--ms-surface` | `#1a1a1a` | Card backgrounds |
| `--ms-elevated` | `#222222` | Elevated surfaces |
| `--ms-accent` | `#e8e8e6` | Primary accent (inverted monochrome) |
| `--ms-coral` | `#e8e8e6` | CTA buttons — **white** (inverted from light mode) |
| `--ms-blue` | `#4da6ff` | Interactive elements — lighter blue for contrast |
| `--ms-green` | `#4da6ff` | Success states (maps to blue) |
| `--ms-panel-dark` | `#0a0a0a` | Dark panel backgrounds |
| `--ms-muted` | `rgba(255,255,255,0.03)` | Subtle overlay |
| `--ms-subtle` | `rgba(255,255,255,0.05)` | Slightly visible backgrounds |
| `--ms-border` | `rgba(255,255,255,0.08)` | Default borders |
| `--ms-border-subtle` | `rgba(255,255,255,0.05)` | Barely visible borders |
| `--ms-border-strong` | `rgba(255,255,255,0.15)` | Prominent borders |
| `--ms-danger` | `#fc8181` | Error/danger (lighter for dark bg) |

### Feature Showcase Card Colors

These are the **only** saturated colors on the page, used exclusively in the FeatureShowcase carousel:

| Feature | Base | Light | Dark | Accent |
|---------|------|-------|------|--------|
| Deep Research | `#E8573A` | `#F09080` | `#C23A1E` | `#FBBBA8` |
| Full-Stack Builder | `#6C5CE7` | `#A29BFE` | `#5241D0` | `#D4CFFF` |
| Workflow Automation | `#00B894` | `#55E6C1` | `#009B7D` | `#B8F0E0` |
| Smart Integrations | `#0984E3` | `#74B9FF` | `#0767B5` | `#BDE0FF` |
| Sandboxed Execution | `#2D3436` | `#636E72` | `#1A1D1E` | `#B2BEC3` |

Each card background is a `linear-gradient(135deg, light, base 40%, dark)` with unique abstract geometric shapes (diagonal lines, overlapping rectangles, arcs, grids, concentric rings) rendered as positioned divs with semi-transparent fills.

### Meta

| Property | Value |
|----------|-------|
| `theme-color` (meta tag) | `#da755b` |
| `.hero-mockup-bg` base | `#111111` |

---

## 3. Typography

### System Font Stack

No external fonts are loaded. The site uses the OS native font for zero-latency rendering.

| Property | Value |
|----------|-------|
| Font family | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |
| Default body weight | 500 |
| CSS variables | `--ms-font-sans`, `--ms-font-display` |

Resolves to San Francisco (macOS/iOS), Segoe UI (Windows), Roboto (Android/Chrome OS).

### Font Variables

```css
:root {
  --ms-font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --ms-font-display: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
```

### No Bold — Color Hierarchy Instead

**Bold font weights are not used.** Hierarchy is communicated through color contrast (muted vs full opacity) rather than weight variation. The greeting text above the main heading uses muted color to recede while the heading uses full-opacity text — both at the same weight.

| Instead of... | Use... |
|---------------|--------|
| `font-bold` / `font-semibold` | `text-dark` (full opacity) |
| Regular weight for secondary text | `text-dark/50` or `text-dark/60` (muted) |
| Bold headings vs normal body | Same weight, heading at full color, body at reduced opacity |

---

## 4. Layout & Spacing

### Container Width

All content sections use a consistent `max-w-5xl` (64rem / 1024px) container with `px-4 sm:px-6 lg:px-8` padding. This applies to:
- Feature Showcase heading
- Pricing section
- FAQ section

The Feature Showcase carousel track extends full-width for edge-to-edge scroll, with calculated padding (`px-[max(1rem,calc((100vw-72rem)/2+1.5rem))]`) to align the first card with the heading.

### Section Spacing

All sections use identical vertical padding for consistent rhythm:

| Value | Usage |
|-------|-------|
| `py-14 lg:py-20` | Every section (Feature Showcase, Pricing, FAQ) |
| `mb-8 lg:mb-10` | Heading-to-content gap in every section |

### Section Headings

All section headings follow the same left-aligned, editorial pattern — **no centered text, no pill badges, no decorative elements, no uppercase, no bold**:

```html
<span class="text-[12px] font-medium tracking-wide text-dark/50">Label</span>
<h2 class="mt-2 text-xl font-normal tracking-tight text-dark md:text-3xl lg:text-4xl">
  Heading text
</h2>
```

- **Label**: 12px, font-medium (500), tracking-wide, 50% opacity — no uppercase, sentence case only
- **Heading**: xl→4xl responsive, font-normal (400), tracking-tight — must match the TypewriterGreeting size exactly (`text-xl md:text-3xl lg:text-4xl font-normal`)
- **Subtitle** (optional): `text-base text-dark/60 sm:text-lg`
- **Alignment**: Always left-aligned, never centered
- **Margin below heading group**: `mb-8 lg:mb-10` (consistent across all sections)

### Weight Rules

- **No bold or semibold in section content.** Body weight is 500 (medium); headings use 400 (normal). The only exception is the Feature Showcase card hero text (bold, white on color).
- Pricing prices: `font-normal` (not bold)
- CTA buttons: `font-medium` (not semibold)
- Labels and badges: `font-medium` (not semibold)

### Opacity / Muted Text

Avoid overly muted text. Minimum readability thresholds:

| Role | Opacity |
|------|---------|
| Labels (section, tier names) | `text-dark/50` |
| Subtitles, descriptions | `text-dark/60` |
| Secondary text (periods, footnotes) | `text-dark/40` |
| Feature list items | `text-dark/55` — `text-dark/60` |
| Excluded/disabled items | `text-dark/20` |

Never use `text-dark/25` or `text-dark/30` for readable text — reserve those only for decorative borders and dividers.

---

## 5. Component Patterns

### Buttons / CTAs

Since `--ms-coral` maps to `#1a1a1a` (near-black), all `bg-coral` buttons become solid black with white text.

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| `bg-coral text-paper` | Black button, off-white text | Off-white button, dark text |
| Primary CTA | `bg-dark text-paper hover:bg-dark/85` | Inverted |
| Secondary CTA | `ring-1 ring-dark/[0.1] text-dark hover:bg-subtle` | Inverted |

### Cards and Surfaces

| Surface | Light | Dark |
|---------|-------|------|
| Page background | `#f8f8f7` | `#111111` |
| Card (`bg-surface`) | `#f2f2f1` | `#1a1a1a` |
| Elevated card (`bg-elevated`) | `#eaeae9` | `#222222` |
| Hover state (`bg-subtle`) | 4% black overlay | 5% white overlay |

Surface differentiation is very subtle (2-3 value steps). The aesthetic relies on spacing and typography for hierarchy, not surface color contrast.

### Feature Showcase Cards

Bold, colorful cards with:
- Saturated gradient backgrounds (the only color on the page)
- Abstract geometric shapes (CSS-only: positioned divs with border-radius, rotation, opacity)
- Large white hero typography (`1.75rem` / `2rem`, bold) — the feature name is the visual centerpiece
- Bottom info strip: title (13px semibold), category badge (`rgba(0,0,0,0.25)` pill), description (12px, white/50)
- Card dimensions: `w-[260px]` mobile, `w-[280px]` desktop
- Hero area: `h-[200px]` mobile, `h-[220px]` desktop
- Rounded-2xl corners, hover: `-translate-y-1.5` + `shadow-2xl`
- CSS scroll-snap carousel, hidden scrollbar, dot indicators, desktop arrow buttons

### Pricing

Three-column layout with no card containers. Columns separated by thin vertical borders on the middle tier only (`border-x border-dark/[0.06]`). Each column contains:
- Plan name (12px, font-medium, sentence case, dark/50)
- Price (5xl→6xl, font-normal — not bold)
- Period text (`/mo`): `text-sm text-dark/40`
- Description (13px, dark/60)
- CTA button: font-medium, filled dark for highlighted, outlined ring for others
- Feature list below a border-top divider (checkmarks for included, thin dashes for excluded, items at dark/55)

Mobile: stacked vertically with border-top dividers between tiers.

### FAQ

Two-column layout on desktop (`lg:grid-cols-[1fr_2fr]`):
- **Left**: Sticky heading with label/title/subtitle
- **Right**: Accordion with `<details>`/`<summary>` elements
- Plus/minus toggle icon (horizontal bar always visible, vertical bar rotates away on open via `group-open:rotate-90 group-open:opacity-0`)
- Questions: 15px, font-medium (500), dark/80
- Answers: 13px, dark/60, relaxed leading
- Borders between items (`border-t border-dark/[0.06]`)

### Navigation

| Element | Appearance |
|---------|------------|
| Navbar background | `#f8f8f7` (paper) |
| Nav text | `#1a1a1a` (near-black) |
| Active/hover | `bg-subtle` (4% black overlay) |
| Dropdown border | 8% black opacity |
| Mobile menu background | `#f8f8f7` |

### Footer

The footer (`bg-dark text-paper`) inverts:
- Background: `#1a1a1a` (near-black)
- Text: `#f8f8f7` (off-white)
- Accent text: `text-coral` renders as `#1a1a1a` (same as bg — effectively invisible). Use `text-mid-blue` (`#0081f2`) or `text-paper` for footer accent links.

---

## 6. Borders

Extremely subtle borders:

| Border type | Opacity | Use case |
|-------------|---------|----------|
| `border-subtle` | 4% | Dividers between equal elements |
| `border` (default) | 8% | Card outlines, input borders |
| `border-strong` | 15% | Active states, focused inputs |

This creates a "borderless" visual feel where elements are defined by spacing rather than explicit lines.

---

## 7. Shadows

In dark mode:

```css
[data-theme="dark"] .shadow-sm { --tw-shadow-color: rgba(0, 0, 0, 0.3); }
[data-theme="dark"] .shadow-lg { --tw-shadow-color: rgba(0, 0, 0, 0.4); }
[data-theme="dark"] .shadow-xl { --tw-shadow-color: rgba(0, 0, 0, 0.5); }
```

---

## 8. Animations

### Scroll-triggered (`[data-animate]`)

Elements start invisible (`opacity: 0; filter: blur(4px); transform: translateY(24px)`) and animate in when an IntersectionObserver adds `.is-visible`:
- `zenReveal`: blur + translateY + opacity (default)
- `zenFade`: blur + opacity only
- `zenScale`: blur + scale + opacity
- Staggered delays via `data-delay="1"` through `data-delay="6"` (0.15s increments)
- Duration: 0.5s, easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`

### Hero entrance

`.hero-child` elements animate on page load (not scroll-triggered):
- `heroEntrance` keyframe: blur(6px) + translateY(20px) → clear
- Duration: 0.6s, staggered via `--hero-delay` CSS variable

### Reduced motion

All animations are disabled when `prefers-reduced-motion: reduce` — elements appear immediately with no animation.

---

## 9. Landing Page Structure

```
ComposerLayout (flex min-h-dvh flex-col bg-paper)
  ComposerStore (global state)
  div.h-dvh (first screen — fills viewport)
    Navbar
    Centered content (TypewriterGreeting, DesktopComposer, TemplateCarousel, ExamplePrompts)
    MobileComposer (fixed bottom on mobile)
  FeatureShowcase (colorful card carousel)
  Pricing (three-column, no cards)
  FAQ (two-column, accordion)
  Footer (dark, inverted)
  DragDropOverlay (global file drop handler)
```

---

## 10. Known Considerations

1. **`text-coral` in footer**: Since coral = black and the footer has a dark background, `text-coral` text becomes invisible. Use `text-mid-blue` or `text-paper` for footer accent text.

2. **Colored badges/pills**: Components using `bg-coral/10` produce a faint near-black tint. This is consistent with the monochrome aesthetic but may need review for readability.

3. **Feature Showcase is the color exception**: All saturated color is contained within the FeatureShowcase carousel cards. No other section uses non-grayscale colors (except blue for interactive feedback).

4. **Integration icons**: Third-party brand colors (Slack purple, GitHub black, etc.) are hardcoded and unaffected.

5. **Section width consistency**: All sections use `max-w-5xl` containers. The carousel track is the only element that extends beyond this for the scroll effect.

---

## 11. Implementation

- **Color tokens**: `src/styles/global.css` — `:root` and `[data-theme="dark"]` blocks
- **Font**: `@fontsource/dm-sans` (400, 500, 600, 700)
- **Variable prefix**: `--ms-*` for CSS custom properties, `mid-*` for Tailwind color utilities
- **Sections**: `src/components/sections/` — FeatureShowcase, Pricing, FAQ
- **Layouts**: `src/layouts/ComposerLayout.astro` wraps `BaseLayout.astro`
- **Utility**: `src/utils/merge.ts` exports `cn()` (clsx + tailwind-merge)
