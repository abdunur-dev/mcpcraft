<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Web Interface Guidelines

Apply the [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) to all UI work:

### Interactions
- Keyboard works everywhere; clear `:focus-visible` rings
- Hit targets ≥24px (≥44px on mobile)
- Mobile `<input>` font-size ≥16px
- Never disable paste or zoom
- Loading buttons show spinner + keep original label; min loading duration ~150-300ms delay, ~300-500ms visible
- URL as state (nuqs); optimistic updates; ellipsis for further input/loading states
- Confirm destructive actions; `touch-action: manipulation` on controls
- Tooltip timing (delay first, skip delay on peers)
- `overscroll-behavior: contain` in modals/drawers
- Autofocus on desktop single-primary-input screens
- Deep-link everything; links are `<a>` or `<Link>`, never `<button>`/`<div>`
- `aria-live="polite"` for async updates
- Locale-aware keyboard shortcuts

### Animations
- Honor `prefers-reduced-motion`
- Preference: CSS > Web Animations API > JS libs
- Compositor-friendly (transform, opacity only)
- Interruptible; input-driven; correct transform origin
- Never use `transition: all`
- Cross-browser SVG transforms: `<g>` wrapper + `transform-box: fill-box`

### Layout
- Optical alignment (±1px); deliberate alignment
- Balance contrast in text+icon lockups
- Test on mobile, laptop, ultra-wide (50% zoom)
- Respect safe areas; no excessive scrollbars
- Prefer flex/grid/intrinsic over JS measuring

### Content
- Inline help first; stable skeletons; accurate `<title>`; no dead ends
- All states designed (empty, sparse, dense, error)
- Curly quotes; avoid widows/orphans
- `font-variant-numeric: tabular-nums` for comparisons
- Redundant status cues (not color alone); icons have labels
- Anchored headings with `scroll-margin-top`
- Locale-aware formats; language from Accept-Language, not IP
- `translate="no"` on brand/code tokens
- Semantics before ARIA; `<h1-h6>` + skip link
- Non-breaking spaces for glued terms

### Forms
- Enter submits (single input) or on last input; Textarea: Cmd+Enter submits
- Labels everywhere; label activation; disable submit during request
- Don't block typing; don't pre-disable submit; error placement next to field
- Meaningful `autocomplete`/`name`; correct `type`/`inputmode`
- Placeholders end with ellipsis; unsaved changes warning
- Password manager compatibility; explicit `<select>` bg-color on Windows

### Performance
- Test Low Power Mode + Safari; disable extensions when profiling
- Track re-renders (React DevTools/React Scan); CPU/network throttle
- Batch reads/writes; POST/PATCH/DELETE <500ms
- Virtualize large lists; preload above-fold images; explicit image dimensions
- `preconnect` to origins; preload/subset fonts
- Web Workers for expensive work

### Design
- Layered shadows (ambient + direct); crisp borders (border + shadow)
- Nested radii (child ≤ parent); hue consistency
- Accessible charts; APCA contrast; increased contrast on interaction
- `theme-color` meta tag; `color-scheme` on `<html>`
- Text anti-aliasing: animate wrapper, not text node
- Avoid gradient banding (background images over CSS masks)

### Vercel copywriting
- Active voice; Title Case (Chicago) for headings/buttons; sentence case for marketing
- Be concise; prefer & over and; action-oriented; second person
- Numerals for counts; currency with consistent decimals
- Space between number and unit with &nbsp;
- Default to positive language; error messages guide exit
