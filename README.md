# Pressure-Test QC Report Combiner

A single-page, installable web app that combines pressure-test measurement
data with its matching per-step reference files, applies configurable
pass/fail QC criteria, and exports a combined report as CSV, formatted
Excel, or a standalone HTML file. No build step, no server, no dependencies
beyond what loads from a CDN at run time — open `index.html` (locally or
hosted) and go.

## What it does

1. You select a single test-result folder.
2. Inside it, the app expects two subfolders:
   - one holding the well-known `ACC` files — each filename encodes a
     timestamp plus a direction/pressure step, e.g.
     `2026-09-19-09-47-54 up 10k.csv` (`up`/`dn`/`down`, pressure like
     `amb`, `2.5k`, `5k`, ... `30k`)
   - one holding the `PulserDiag*.csv` measurement files
3. Every measurement file is paired with its matching reference file by
   filename order, and every row is tagged with:
   - **Size** and **SN** (an 8-digit serial number), both parsed from the
     test folder's own name — with a manual-entry fallback if either can't
     be detected
   - **Direction** (Up/Down) and **Pressure** step, parsed from the paired
     reference filename
4. Each row is checked against a set of QC criteria (see below) and marked
   **Pass** or **Fail**; failing cells are highlighted. A summary table
   rolls this up to one Pass/Fail per Serial Number × Direction × Pressure
   step.
5. Download the combined result as CSV, a formatted `.xlsx` workbook (real
   cell colors, frozen header), or a self-contained HTML report — all three
   cover the same folder info → summary → full data table.

## Pass/fail criteria

All QC logic lives in one place near the top of `index.html`, in a
`CRITERIA_CONFIG` object, so adding a new check never means hunting through
the rest of the code. Three rule types are supported:

- **`nonzero`** — a list of column names that must equal exactly `0`
- **`equalPairs`** — pairs of columns that must match each other exactly
- **`range`** — `{ column, min, max }`; fails below `min` and/or above
  `max` (set either bound to `null` to skip that side — e.g. `min: 80,
  max: null` fails only below 80)

A rule referencing a column that isn't present in a given file is simply
skipped for that file. The "fail criteria" description shown on the page,
the highlighting, the Result column, the summary table, and all three
exports all read from this one config, so they can never drift out of
sync — edit the config once and every part of the app picks it up.

## Running it

Open `index.html` directly in a browser, or host the whole folder as a
static site (GitHub Pages, any web server, or just double-click the file
locally). Nothing is uploaded anywhere — all parsing, QC evaluation, and
file generation happens client-side in your browser.

### Installing as an app (PWA)

This folder is a complete installable web app:

- `manifest.webmanifest` — app name, icons, and standalone display mode
- `sw.js` — a service worker that caches the app shell so it opens (and
  works fully offline) after the first visit
- `icon.svg` / `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` —
  the app icon at the sizes each platform expects

Once hosted (e.g. via GitHub Pages), most browsers will offer an
"Install app" / "Add to Home Screen" prompt. CSV and HTML exports always
work offline; the Excel export needs its formatting library to have
loaded from its CDN at least once, after which it's cached too.

**When you update `index.html`, `manifest.webmanifest`, or any icon**,
bump `CACHE_NAME` in `sw.js` (e.g. `v1` → `v2`). Otherwise returning
visitors keep getting the old cached version instead of your changes.

## Deploying to GitHub Pages

1. Push this folder's contents to the root of a repository (or to a
   `docs/` folder, matching whatever source you set)
2. In the repo's **Settings → Pages**, set the source to that
   branch/folder
3. Visit the published URL — the app is live and installable from there

## Browser support notes

- Folder selection uses the standard HTML file-input folder picker
  (`webkitdirectory`), supported in all Chromium- and Firefox-based
  browsers; Safari support varies by version.
- Selecting a folder far above the actual test folder makes the browser
  enumerate everything underneath before any of the app's own code can
  run — that's a platform limitation, not something JavaScript can
  intercept. The app guards against this by refusing to process an
  unexpectedly large selection and only ever reading files exactly two
  levels below the folder you pick, so always select the specific test
  folder itself (the one directly containing the two subfolders above),
  not a folder above it.
