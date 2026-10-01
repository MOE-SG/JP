# Moe's Schematic

**Schematic & Panel Documentation Workspace**

Moe's Schematic is a self-contained, browser-based schematic capture tool, installable
as a PWA (Progressive Web App). At its core it's a single `index.html` file — no
account, build step, or server required to just open and use it — with an optional
`manifest.json`, `sw.js` (service worker), and a few icon files alongside it that
enable installing it as a standalone app with offline support. Every drawing lives on
an A3 landscape sheet with a red ASME-style border, inch-accurate zone references, and
a fully editable engineering title block.

---

## Contents

- [Getting Started](#getting-started)
- [Installing as an App (PWA)](#installing-as-an-app-pwa)
- [Sheet & Title Block](#sheet--title-block)
- [Toolbar Reference](#toolbar-reference)
- [Component Library](#component-library)
- [Custom Symbols: Bitmap Import & Freehand Drawing](#custom-symbols-bitmap-import--freehand-drawing)
- [Grouping, Copy & Paste](#grouping-copy--paste)
- [Freehand & Arc Drawing](#freehand--arc-drawing)
- [Resizing & Reshaping Drawn Shapes](#resizing--reshaping-drawn-shapes)
- [Rotating](#rotating)
- [Undo / Redo](#undo--redo)
- [Right-Click / Long-Press Menu](#right-click--long-press-menu)
- [Element Inspector](#element-inspector)
- [Bill of Materials (BOM)](#bill-of-materials-bom)
- [File Format](#file-format)
- [Controls & Shortcuts](#controls--shortcuts)
- [Browser Support](#browser-support)
- [Known Limitations](#known-limitations)
- [License](#license)

---

## Getting Started

1. Open `index.html` in any modern desktop browser (double-click it, or serve it from
   any static host — no backend needed).
2. Pick a symbol from the **Engineering Structural Library** on the left, then click on
   the sheet to place it.
3. Wire components together, annotate with text, and fill in the title block on the right.
4. Use the **Output** group to export DXF/JPG or print, and the **Parts** group to
   generate a Bill of Materials.
5. Use **File → Save** to download your work as a `.json` project file, and **File → Open**
   to resume it later.

All project data stays in your browser session and any files you explicitly save —
nothing is uploaded to a server.

---

## Installing as an App (PWA)

Moe's Schematic can be installed like a native app (its own window, an icon on your
home screen/dock, and offline support after the first visit), when served over
**HTTPS or `localhost`** — browsers block service workers and install prompts on a
plain `file://` page, so this only applies when you host the folder (e.g. GitHub
Pages, or any static web host).

1. Serve the folder containing `index.html`, `manifest.json`, `sw.js`, and the
   `icon-*.png` files together (they must stay alongside each other).
2. Open it in Chrome, Edge, or another PWA-capable browser.
3. Click the **📲 Install** button that appears in the header once the browser
   decides the app is installable (or use your browser's own install / "Add to
   Home Screen" option — the button is a shortcut to the same prompt, not the
   only way to install).
4. The installed app opens in its own window and keeps working offline after
   that first successful load, since the service worker caches the app shell.

If you just double-click `index.html` locally instead, everything still works
exactly as before — you simply won't get the install prompt or offline caching.

---

## Sheet & Title Block

- The drawing sheet is rendered at the true **A3 landscape** aspect ratio (420 mm × 297 mm,
  ≈16.5″ × 11.7″), with a red outer border and inch-accurate zone markers (numbers across
  the top/bottom, letters down the left/right) for callouts like `4-B`.
- The title block (bottom-right) mirrors a standard ASME drawing block:
  - Unspecified tolerances (three fully editable lines)
  - Sheet size designation (e.g. `A3`)
  - Document/drawing number with revision
  - Company name
  - Date, drawn-by, and sheet number (e.g. `1/1`)
- All title block fields are editable live from the **Title Block Fields** panel on the
  right sidebar and update the sheet instantly.

## Toolbar Reference

The header is a compact menu bar — each group name (**File**, **Edit**, **Insert**,
**Draw**, **View**, **Output**, **Parts**) is a button that drops open a vertical menu
of its commands, the way a desktop app's menu bar works, instead of showing every
button at once. Click a group name to open it, click a command to run it (this also
closes the menu), or click anywhere else to close it without choosing anything. On
phone-sized screens the **☰** button opens the whole menu bar as a panel, and each
group still expands/collapses the same way inside it.

| Group | Commands | Description |
|---|---|---|
| **File** | New, Open, Save | Start a blank sheet, load a saved `.json` project, or download the current one. |
| **Edit** | Copy, Cut, Paste, Group, Ungroup, Rotate 90° CW, Undo, Redo, Select All | Duplicate or move a selection, bundle several parts so clicking any one of them selects (and moves) the whole set, or rotate the selection. See [Grouping, Copy & Paste](#grouping-copy--paste), [Rotating](#rotating), and [Undo / Redo](#undo--redo). |
| **Insert** | Text, Symbol Image | Place free-form text annotations or import a raster image as a custom symbol/footprint. |
| **Draw** | Line, Polyline, Freehand, Rectangle, Circle, Ellipse, Arc, Terminal Pin | Drawing primitives and terminal pins, all snapped to the active grid (freehand excepted). Rectangles, circles, ellipses, polylines, and arcs can be reshaped after drawing — see [Resizing & Reshaping Drawn Shapes](#resizing--reshaping-drawn-shapes) and [Freehand & Arc Drawing](#freehand--arc-drawing). |
| **View** | Fit to View, Grid: 5/10/20 px | Reset zoom to fit the whole sheet, or change the snap grid (a checkmark shows the active size). |
| **Output** | Export DXF, Export JPG, Print | Export a vector DXF, export a raster JPG snapshot, or print an exact, borderless A3 sheet. |
| **Parts** | Bill of Materials | Open the auto-generated Bill of Materials. |

Every one of these commands is also reachable by right-clicking (or long-pressing on
touch) anywhere on the sheet — see [Right-Click / Long-Press Menu](#right-click--long-press-menu).

The status bar on the right of the header shows the current zoom level, active tool mode,
sheet size, and an **About** (`?`) button with a quick feature/controls summary.

## Component Library

Symbols are organized into four collapsible categories in the left sidebar. Click a
category header (or its chevron ▼/▶) to expand or collapse it — handy for keeping
the list short once you know which set you need. Each header also shows a live count
of the parts inside it.

**Electrical Components** (30 parts) — Standard Resistor, Variable Resistor,
Potentiometer, Non-Polar Capacitor, Polarized Capacitor, Ground (GND), Chassis
Ground, Power Source (VCC), Battery, Diode, Zener Diode, Schottky Diode, LED, SCR
(Thyristor), Fuse, Inductor, Crystal Oscillator, Transformer, Relay (SPST),
Transistor (NPN), Transistor (PNP), N-Channel MOSFET, Switch (SPST), Operational
Amplifier, Speaker/Buzzer, Antenna, Motor, Connector (2-Pin), Banana Jack, BNC
Connector.

**Logic Gates** (6 parts) — AND, OR, NOT (Inverter), NAND, NOR, XOR. Standard
MIL/ANSI-style gate outlines with input/output pins ready to wire.

**Flow Chart Nodes** (3 parts) — Terminal Block, Process Engine, Decision Branch.
Useful for process/logic diagrams alongside or instead of electrical schematics.

**Rack Systems Layout** (12 parts) — 19″ Full Frame Unit, 19″ Half Frame Module,
Rackmount Computer, Foldable LCD/KB Drawer (1U), Half-Length PSU (Dual), Electronic
Load Frame, Rack PDU (Horizontal), Patch Panel, Blanking Panel, UPS Unit, Cable
Management Bar, BK9201B DC Power Supply. For enclosure/rack elevation-style layouts —
front-panel views sized to a consistent 19″ rack width so you can stack them into a
realistic rack elevation.

**Rack unit (U) height** — every part in this category shows a small red "N U" readout
just above its top-right corner, live-updated from its current height (1U = 25px in
this tool's schematic scale, so a 2U part is 50px tall, 3U is 75px, and so on). The
19″ Full Frame Unit and 19″ Half Frame Module default to 4U but are resizable — drag
the blue handle at the bottom-right corner of a selected frame, and its height snaps
to the nearest whole U as you drag, so the readout always lands on a clean number.

Each placed part is automatically assigned the next reference designator for its
prefix (e.g. `R1`, `R2`, `C1`, `C2` — numbering is per-prefix, so parts that share a
prefix, like the two capacitor types, never collide). Related parts intentionally
share a prefix only when that's the real-world convention (e.g. both grounds use
`GND`); otherwise each new part type gets its own prefix (`LED`, `DS`, `SCR`, `POT`,
etc.) so its numbering stays independent.

## Custom Symbols: Bitmap Import & Freehand Drawing

Not every part you need is in the built-in library. There are two ways to add a
custom symbol, and they can be combined:

**1. Import a bitmap/JPG as a symbol** — use **Insert → Symbol Image** to open a file
picker (accepts any raster format: JPG, PNG, GIF, WEBP, etc.). The chosen image is
dropped onto the sheet as a resizable, draggable symbol with:

- A default pair of terminal pins (left-center and right-center), ready to wire.
- Its own reference designator (`IMG1`, `IMG2`, …) and an optional Value/Rating field,
  both editable in the [Element Inspector](#element-inspector).
- A **Pin Terminal Configuration** editor in the Inspector — use **+ Append Terminal
  Pin** to add as many pins as the real part needs, then drag each pin's X/Y fields
  (or the pin dot itself on the canvas) to line them up with the actual leads/terminals
  in the image. Extra pins can be deleted individually.
- A corner drag-handle to resize the image to match your drawing's scale.

This is the fastest route for parts with a recognizable outline (a datasheet
mechanical drawing, a screenshot of a footprint, a photo of a connector, etc.) — trace
nothing, just import and reposition the pins.

**2. Draw a symbol by hand** — use the **Draw** tool group (Line, Polyline, Freehand,
Rectangle, Circle, Ellipse, Arc) to build a symbol's outline directly on the sheet at
schematic scale. Combine a few primitives (e.g. a rectangle body + polyline leads, or
a freehand sketch traced over a reference image you've temporarily imported), then:

- Select the finished shapes together (marquee-drag or shift-click) and **Group**
  (<kbd>Ctrl</kbd>+<kbd>G</kbd>) them so they move, copy, and paste as one unit — see
  [Grouping, Copy & Paste](#grouping-copy--paste).
- Add standalone **Terminal Pins** (Insert → Terminal Pin, or Draw group in the
  right-click menu) at the lead locations so wires can snap to them, then group the
  pins in with the shapes.
- Drawn shapes can be reshaped anytime after the fact by dragging their blue vertex
  handles — see [Resizing & Reshaping Drawn Shapes](#resizing--reshaping-drawn-shapes).

**Need reference artwork to trace or import?** [Electronic Symbols by Chris
Pikul](https://chris-pikul.github.io/electronic-symbols/) is a free library of clean,
standardized electronic symbol graphics — a good source either for exporting a
symbol as a bitmap to import (method 1) or as a visual reference to trace with the
Draw tools (method 2).

## Grouping, Copy & Paste

- **Copy / Cut / Paste** — select one or more parts (click one, or drag a marquee box
  around several), then use the **Edit** toolbar buttons or <kbd>Ctrl</kbd>+<kbd>C</kbd> /
  <kbd>Ctrl</kbd>+<kbd>X</kbd> / <kbd>Ctrl</kbd>+<kbd>V</kbd>. Pasted copies get fresh,
  collision-free reference designators (continuing from the highest number already in
  use, so it's safe even after deleting parts out of sequence) and land offset from the
  originals; pasting repeatedly cascades each copy a bit further so they don't stack
  exactly on top of each other. Wires aren't copied — everything else (components,
  text, custom symbol images, drawn shapes) is.
  - Whenever a paste creates more than one object at once, the whole pasted batch is
    automatically bundled into one group (see below), so you can immediately drag any
    one of the newly pasted items to move all of them together, instead of one at a time.
- **Group / Ungroup** — select two or more parts and click **Group** (or
  <kbd>Ctrl</kbd>+<kbd>G</kbd>) to bundle them: clicking any single member afterward
  selects the whole group, so they move together as one unit. **Ungroup**
  (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>) releases the current selection back
  into independent parts. Copying/pasting a group keeps its members grouped in the
  pasted copy too.
- **Select All** — <kbd>Ctrl</kbd>+<kbd>A</kbd> (or the **Select All** button in the
  Edit toolbar group) selects every component, image, text note, drawn shape, wire,
  custom terminal pin, and wire junction on the sheet at once, so you can move, copy,
  or delete the entire drawing in one action.

## Freehand & Arc Drawing

- **Freehand** (Draw → Freehand) — click and drag to sketch a loose line; release to
  finish. The stroke is recorded as a series of points as you move (thinned out
  automatically so a fast drag doesn't create an excessive number of points) and
  baked into the same kind of shape a polyline is, so it can be selected, moved, and
  reshaped point-by-point afterward exactly like one — see below.
- **Arc** (Draw → Arc) — a three-click tool: click the **start** point, click the
  **end** point, then click a third point for the arc to **bulge through**. The
  preview updates live as you move the cursor for each step, so you can see the arc
  take shape before committing it.

## Resizing & Reshaping Drawn Shapes

Selecting a drawn line, rectangle, circle, ellipse, polyline, or arc shows small blue
square handles on it. Drag a handle to reshape the element:

- **Line / Rectangle / Circle / Ellipse** — two handles mark the shape's defining
  points (the two endpoints for a line, opposite bounding-box corners for a
  rectangle or ellipse, or the center and a radius point for a circle). Dragging
  either one resizes the shape.
- **Polyline / Freehand stroke** — every vertex gets its own handle, so you can
  reshape individual segments of a multi-point line after it's drawn, without having
  to redraw the whole path.
- **Arc** — its three defining points (start, end, bulge-through) each get a handle,
  so you can drag any one of them to change the arc's span or curvature.

This is separate from the corner-handle resize used for library parts placed from
the **Rack Systems Layout** category, which continues to work as before.

## Rotating

Select one or more components and either press <kbd>Spacebar</kbd>, or use
**Edit → Rotate 90° CW** (from the header menu or the right-click menu) — both rotate
the selection 90° clockwise. The toolbar/menu command is there for phone/touch use,
where there's no keyboard to press Spacebar with.

## Undo / Redo

Press <kbd>Ctrl</kbd>+<kbd>Z</kbd> to undo the last action, and <kbd>Ctrl</kbd>+
<kbd>Shift</kbd>+<kbd>Z</kbd> (or <kbd>Ctrl</kbd>+<kbd>Y</kbd>) to redo — or use the
**Undo**/**Redo** buttons in the Edit toolbar group on phone/touch. Undo covers
placing, moving, resizing, reshaping, rotating, deleting, grouping, ungrouping,
copying/pasting, and drawing any shape, wire, pin, or text note, going back up to the
last 50 actions. Typing into an inspector field (renaming a reference designator,
editing a value, or changing a title block field) is not tracked keystroke-by-keystroke
— only the discrete actions listed above go on the undo stack.

## Right-Click / Long-Press Menu

Right-clicking anywhere on the sheet (or long-pressing — about half a second — on a
touchscreen) opens a context menu listing every command from the header menu bar,
grouped the same way, so you don't have to reach for the header while you work.

- **Right-click** opens the menu only for a stationary click; right-click-**dragging**
  still pans the view exactly as before, and doesn't open the menu.
- The menu never opens in the middle of a drag — panning, moving/resizing an
  element, or sweeping a marquee box all suppress it.
- **Long-press on touch** works the same way: press and hold without moving your
  finger to open the menu. Moving your finger before the hold completes cancels the
  long-press and continues as a normal drag/draw/select gesture instead — the menu
  only appears on a hold that doesn't turn into a drag.
- The menu opens with every group (File, Edit, Insert, Draw, View, Output, Parts)
  collapsed to just its heading — tap or click a heading to expand it and reveal its
  commands, tap it again to collapse it. Several groups can be expanded at once, and
  if the expanded content runs taller than the screen the menu scrolls internally
  without closing.
- Click any item to run it (and close the menu), or click outside the menu to
  dismiss it without choosing anything.

## Element Inspector

Selecting any placed element opens the **Element Inspector** in the right sidebar:

- **Designator Name** — the reference designator (or annotation text, for text objects).
- **Value / Rating** — free-text field for a component's value (e.g. `10k`, `100nF`,
  `1N4148`). This feeds directly into the Bill of Materials.
- **Show Label** — toggles visibility of the designator/value label on the sheet.
- **Pin Terminal Configuration** — for components with pins, lets you fine-tune each
  pin's position.
- **Element Stroke Color** — applies to the currently selected element, or to the next
  element you draw/place if nothing is selected.

## Bill of Materials (BOM)

Click **📋 BOM** in the Parts group to open a live-generated BOM:

- Components are grouped by **type + value**, so identical parts (same type and same
  Value/Rating) collapse into a single row with a combined quantity and a sorted list
  of reference designators (e.g. `R1, R2, R5`).
- Columns: Item #, Qty, Reference Designator(s), Description, Value/Rating, Category.
- **Export CSV** downloads the table as `<DocumentID>_BOM.csv` for use in Excel or any
  parts/ERP system.
- **Print BOM** opens a clean, separate A4 print layout with its own header (company,
  document ID, revision, date, sheet).
- **Auto-added rack accessories** — some parts automatically pull companion hardware
  into the BOM based on how they're arranged on the sheet. Placing a **BK9201B DC
  Power Supply** adds a matching **Rack Shelf** and **BK IT-E151 Rack Mount Kit** line:
  one kit/shelf pair covers up to 2 units mounted side-by-side at the same height
  (same Y position on the sheet), and units placed at a different height each get
  their own kit/shelf. The Reference Designator column shows which supply(s) each
  accessory belongs to (e.g. `BK1+BK2` for a shared kit, `BK3` for a standalone one).

## File Format

**Save/Open** uses a plain JSON structure (`system_schema.json` on save) containing:

```jsonc
{
  "titleBlock": { "company": "...", "docId": "...", "rev": "...", "date": "...", "drawnBy": "...", "sheet": "...", "size": "...", "tol1": "...", "tol2": "...", "tol3": "..." },
  "components": [ /* placed parts: type, x, y, rotation, refDes, value, color, pins, ... */ ],
  "wires": [ /* net connections */ ],
  "customImages": [ /* imported raster symbols */ ],
  "annotations": [ /* free-form text */ ],
  "shapes": [ /* lines, polylines/freehand strokes, rectangles, circles, ellipses, arcs */ ],
  "customPins": [ /* freestanding terminal pins */ ],
  "junctions": [ /* wire junction dots */ ]
}
```

This makes projects easy to version-control, diff, or script against outside the app.

## Controls & Shortcuts

- **Wires/Nets** — select a wire directly, or drag a marquee box around it and press
  <kbd>Backspace</kbd> to delete.
- **Move Pins** — click a component, then drag any red terminal pin dot to reposition it.
- **Move a Freestanding Terminal Pin** — a pin placed with the **Pin** draw tool (not
  attached to a component) can be clicked and dragged directly, just like any other
  element.
- **Move Designator Label** — click a component to select it, then drag its reference
  designator text (e.g. `R1`, `RACK1`) to reposition it independently of the symbol — a
  dashed box appears around the label when it's draggable. The label keeps its offset
  when you move or rotate the component afterward.
- **Overlapping Parts** — when parts sit on top of each other, clicking always selects
  whichever one was placed most recently (i.e. the one drawn on top), so a part placed
  over an existing one — like a KVM drawer over a rack frame — is the one you get.
- **Marquee Box** — drag across empty canvas space to sweep-select multiple parts or
  custom-drawn lines at once.
- **Copy / Cut / Paste / Group / Ungroup / Select All** — <kbd>Ctrl</kbd>+<kbd>C</kbd> /
  <kbd>Ctrl</kbd>+<kbd>X</kbd> / <kbd>Ctrl</kbd>+<kbd>V</kbd> /
  <kbd>Ctrl</kbd>+<kbd>G</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> /
  <kbd>Ctrl</kbd>+<kbd>A</kbd>, or the matching **Edit** toolbar buttons (works on
  phone/touch too, no keyboard needed). See
  [Grouping, Copy & Paste](#grouping-copy--paste).
- **Undo / Redo** — <kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+
  <kbd>Z</kbd> (also <kbd>Ctrl</kbd>+<kbd>Y</kbd> for redo), or the **Undo**/**Redo**
  toolbar buttons. See [Undo / Redo](#undo--redo).
- **Resize/Reshape a Drawn Shape** — select a line, rectangle, circle, ellipse,
  polyline, or arc, then drag one of its blue handles. See
  [Resizing & Reshaping Drawn Shapes](#resizing--reshaping-drawn-shapes).
- **Close the Color Picker** — click the **✕** button next to the Element Stroke Color
  swatch to dismiss the picker once you've chosen a color.
- **Spacebar** / **Edit → Rotate 90° CW** — rotate the current selection 90° clockwise.
  See [Rotating](#rotating).
- **Right-click / long-press** — opens a context menu with every command. See
  [Right-Click / Long-Press Menu](#right-click--long-press-menu).
- **Delete Selected** — press <kbd>Delete</kbd>/<kbd>Backspace</kbd> on desktop, or tap the
  red **🗑 Delete Selected** button in the Element Inspector (this is the way to delete on
  phone/touch, where there's no keyboard). Selecting any element opens the inspector
  automatically on phone-sized screens.

## Browser Support

Any current desktop or mobile browser with Canvas2D support (Chrome, Edge, Firefox,
Safari). Printing uses `@page` sizing for exact, borderless A3 output — tested in
Chromium-based browsers; other browsers should honor the same CSS but may vary slightly
in print preview.

### Phone / touch support

- Below ~900px wide, the header toolbar collapses into a **☰** menu button; tap it to
  open the full menu bar as a panel, with the same File/Edit/Insert/Draw/View/Output/Parts
  groups you'd get on desktop.
- The component library and inspector sidebars become slide-over drawers (tap the
  **◂▸** tab on either edge) instead of squeezing the canvas, and start collapsed on
  phone-sized screens so the sheet is visible immediately.
- Single-finger touch drags draw, select, and move elements exactly like a mouse.
- **Long-press** (press and hold without moving) opens the same right-click context
  menu described in [Right-Click / Long-Press Menu](#right-click--long-press-menu).
- **Pinch with two fingers** to zoom, and drag with two fingers to pan — anchored under
  your fingers the same way scroll-wheel zoom is anchored under the cursor on desktop.

## Known Limitations

- No electrical rule checking (ERC) or netlist export — this is a documentation/drafting
  tool, not a full EDA suite with simulation.
- Imported symbols/footprints are raster images (PNG/JPG), not editable vector symbols.
- Multi-sheet projects are not yet supported; each project file represents one A3 sheet.

## License

Licensed under the GNU General Public License v3.0 (GPL-3.0).

---

*Built for MOE's ENTERPRISE.*
