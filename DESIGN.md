---
name: Lucas Xavier | Barbeiro
description: A dark, cognac-lit link page where one warm light falls on the barber and on the action of booking him.
colors:
  brand-cognac: '#c37c33'
  brand-light: '#d68e47'
  brand-dark: '#a15e1f'
  brand-deep: '#784312'
  coffee-950: '#140f0c'
  coffee-900: '#1a1410'
  coffee-850: '#221b16'
  coffee-800: '#2a221c'
  coffee-700: '#382e26'
  cream: '#f1ede8'
  cream-muted: '#c7beb5'
  cream-subtle: '#b3a69a'
  cream-dim: '#9c8e82'
  cream-highlight: '#ffdcc0'
  white: '#ffffff'
typography:
  headline:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '1.875rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.025em'
  title:
    fontFamily: 'Plus Jakarta Sans, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: 'normal'
  body:
    fontFamily: 'Plus Jakarta Sans, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 'normal'
  label:
    fontFamily: 'Plus Jakarta Sans, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: '0.05em'
  label-heading:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: '0.05em'
rounded:
  lg: '0.625rem'
  xl: '0.875rem'
  full: '9999px'
spacing:
  control-gap: '0.375rem'
  stack: '0.625rem'
  card: '0.875rem'
  card-lg: '1rem'
  gutter: '1.25rem'
  section: '1.25rem'
components:
  button-primary:
    backgroundColor: '{colors.brand-cognac}'
    textColor: '{colors.coffee-950}'
    typography: '{typography.label-heading}'
    rounded: '{rounded.xl}'
    padding: '1rem 1.25rem'
    width: '100%'
  button-secondary:
    backgroundColor: '{colors.coffee-850}'
    textColor: '{colors.cream}'
    typography: '{typography.title}'
    rounded: '{rounded.xl}'
    padding: '0.75rem'
    width: '100%'
  button-icon:
    backgroundColor: '{colors.coffee-850}'
    textColor: '{colors.brand-cognac}'
    rounded: '{rounded.xl}'
    size: '2.75rem'
  button-icon-hover:
    textColor: '{colors.brand-light}'
  chip-specialty:
    backgroundColor: '{colors.coffee-850}'
    textColor: '{colors.cream}'
    rounded: '{rounded.full}'
    padding: '0.25rem 0.75rem'
  card-channel:
    textColor: '{colors.white}'
    typography: '{typography.title}'
    rounded: '{rounded.xl}'
    padding: '0.875rem'
  card-info:
    textColor: '{colors.cream}'
    rounded: '{rounded.xl}'
    padding: '1rem'
  avatar:
    rounded: '{rounded.full}'
    size: '8rem'
---

# Design System: Lucas Xavier | Barbeiro

## Overview

**Creative North Star: "The Lit Chair"**

The room is dark coffee brown and almost featureless. One warm light hangs over the chair, and whatever sits under it is what matters: Lucas's portrait at the top of the page, and the button that books him. Everything else is furniture in the half-dark, legible and reachable but never competing for the light. This is the visual form of the product's position: the client chooses a person, so the person is the only thing lit.

The system is a single narrow column built for a phone held in one hand. Density is high and type is compact, so hierarchy comes from light and color before it comes from size. Surfaces are warm near-blacks separated by tone and a hairline border. Cognac is the only hue. Components are warm and inviting: soft corners, a slow glow, and gentle continuous motion that draws the thumb toward the booking action.

**Key Characteristics:**

- One hue (cognac) on a ramp of coffee-brown neutrals; cream for text.
- A radial cognac glow anchored at the top of the page, behind the portrait.
- A single column capped at 28rem, centered, with generous side gutters.
- Compact type in three sizes; uppercase tracked labels in place of section headings.
- Ambient motion on exactly two things: the portrait halo and the booking button.
- On load the lamp blooms once while content settles in quickly beneath it.

## Colors

A monochrome warm palette: coffee-brown darks, cream lights, and one cognac accent that stands in for light itself.

### Primary

- **Cognac** (`brand-cognac`, #c37c33): the light source. Fill of the booking button, every icon, the logo mark, the portrait ring and halo, the Instagram handle, focus ring. Also appears at low opacity as border tint (20% at rest, 45–55% on hover) and as icon-tile wash (15%).
- **Cognac Light** (`brand-light`, #d68e47): the location eyebrow under the name and the hover color of cognac icons.
- **Cognac Dark** (`brand-dark`, #a15e1f) and **Cognac Deep** (`brand-deep`, #784312): the lower stops of the portrait ring and halo gradients. Never used as flat fills.

### Neutral

- **Coffee 950** (#140f0c): the page surface that carries the glow, the document background, and the browser theme color. Also the ink on the cognac booking button.
- **Coffee 900** (#1a1410): background of the verified badge and of popovers and toasts.
- **Coffee 850** (#221b16): fill of secondary buttons, the icon button, and specialty chips; top stop of the card gradient.
- **Coffee 800** (#2a221c): the hover step. Hover fill of secondary buttons and chips, and the top stop of a card's hover gradient.
- **Coffee 700** (#382e26): hairline borders on quiet controls and the column edge; last stop of the portrait ring.
- **Cream** (#f1ede8): default text.
- **Cream Muted** (#c7beb5): descriptive paragraph text.
- **Cream Subtle** (#b3a69a): secondary detail lines inside cards (phone number, address).
- **Cream Dim** (#9c8e82): section labels and resting chevrons.
- **Cream Highlight** (#ffdcc0): card title on hover, as if the light caught it.
- **White** (#ffffff): the name and card titles. Never on solid cognac: it falls below 4.5:1 there.

### Named Rules

**The One Lamp Rule.** Cognac is the only hue in the system. No second accent, no status colors on the page. If something needs emphasis, it gets more cognac or more light, not a new color.

**The Solid Fill Rule.** Solid cognac fill belongs to the booking button alone. Everywhere else cognac appears as a stroke, an icon, a tint, or a gradient stop.

## Typography

**Display Font:** Outfit (with sans-serif fallback), loaded as `--font-heading`
**Body Font:** Plus Jakarta Sans (with sans-serif fallback), loaded as `--font-sans`
**Character:** Two friendly geometric sans faces, close in voice. Outfit carries the name and the uppercase action labels; Plus Jakarta Sans carries everything read as a sentence. The contrast between them is role, not personality.

### Hierarchy

- **Headline** (Outfit 700, 1.875rem, line-height 1.2, tracking -0.025em, uppercase, white): the name. One per page.
- **Title** (Plus Jakarta Sans 600, 0.875rem, white): the name of a channel inside a card, and the save-contact label.
- **Body** (Plus Jakarta Sans 400, 0.875rem, line-height 1.625, Cream Muted): the bio paragraph, capped at 20rem wide. Card detail lines and the hours line use the same size at line-height 1.43.
- **Label** (Plus Jakarta Sans 600, 0.75rem, tracking 0.05em, uppercase): the location eyebrow (Cognac Light) and section labels (Cream Dim). Specialty chips use this size in sentence case at weight 500. The hours card heading is the Outfit variant of this label at weight 600.
- **Label Heading** (Outfit 700, 0.875rem, tracking 0.05em, uppercase): the booking button label.

### Named Rules

**The Three Sizes Rule.** The page has three type sizes, each with one job: 1.875rem for the name, 0.875rem for anything read or tapped, 0.75rem for uppercase labels and chips. Nothing a visitor has to read as a sentence is set below 0.875rem.

**The Outfit-Is-Uppercase Rule.** Outfit only ever appears uppercase. Sentence-case text is always Plus Jakarta Sans.

## Layout

A single centered column. The outer surface spans the viewport at full height with 1.25rem side gutters, 1.5rem top padding, and 2.5rem bottom padding. The column fills the available width up to 28rem and stretches to the full height, so the footer signature rests at the bottom of the viewport when content is short. There are no breakpoints: the same column serves every viewport, and on wide screens it sits in the middle of the dark surface.

The page reads as three groups, top to bottom, between a header (logo mark left, share button right) and the footer signature:

1. **Identity:** portrait, name, tagline, bio, specialty chips. Center-aligned.
2. **Actions:** the booking button, then save contact directly beneath it.
3. **Atendimento:** a section label, the channel cards, and the hours card.

Rhythm has two intervals. Items inside a group sit 0.625rem apart; groups are separated by 1.75rem to 2rem. The section label has 2rem above it and 0.625rem below. Cards pad 0.875rem to 1rem; chips sit 0.375rem apart and wrap centered.

Only the identity group is center-aligned. Cards are left-aligned rows: a 2.5rem icon tile, a two-line text block, and a trailing chevron.

## Elevation & Depth

Light is the hierarchy. Surfaces are nearly flat and are separated by tone and a 1px border, not by shadow. Glow is spent on two things only: the portrait and the booking button. Dark drop shadow appears as a response to touch, when a card lifts. Quiet controls and chips have a border and no shadow at all.

### Shadow Vocabulary

- **Room glow** (`radial-gradient(circle at 50% 12%, var(--color-cognac-glow) 0%, transparent 70%)`, cognac at 18%): the lamp. Painted once on the page surface, centered behind the portrait. It blooms on load.
- **Portrait halo** (cognac-to-transparent vertical gradient, inset -0.625rem, blurred 16px): breathes behind the avatar on a 4.5s loop by scaling and fading. The blur itself is fixed; never animate `filter`.
- **Action glow** (`--shadow-glow`: `0 10px 24px -6px` cognac at 40%): under the booking button at rest. Strengthens to `--shadow-glow-strong` (`0 12px 28px -4px` cognac at 55%) on hover.
- **Lift** (`--shadow-lift`: `0 8px 20px -6px` black at 50%): under a card on hover and keyboard focus, paired with a 1.5px rise.

### Named Rules

**The Two Glows Rule.** Cognac glow belongs to the portrait and the booking button. Nothing else on the page emits light.

**The Shadow-On-Touch Rule.** Cards are flat at rest. Dark shadow is a state, never a resting decoration.

## Shapes

Soft and rounded throughout. Controls and cards share one generous corner (0.875rem). Icon tiles inside cards step down one size (0.625rem) so the nested corner reads as concentric. Chips, the avatar, and the verified badge are full circles or pills.

Borders are always 1px. Quiet controls use a solid Coffee 700 line; cards use cognac at 20% so the edge looks faintly lit. The portrait wears a 3px ring made of a vertical cognac-to-coffee gradient. The footer divider is a 2.5rem hairline that fades out at both ends.

## Components

Warm and inviting: soft, luminous, and gently in motion, so the page feels like it is leaning toward the visitor's thumb.

### Buttons

- **Shape:** softly rounded (0.875rem), full column width.
- **Primary (booking):** solid Cognac with Coffee 950 Label Heading text and a matching 1.25rem calendar icon, padding 1rem by 1.25rem. Carries the Action glow and a light beam that sweeps across every 4s. Hover brightens the fill and the glow and scales the icon to 110%; press scales the button to 98.5%.
- **Secondary (save contact):** Coffee 850 fill, Coffee 700 border, Cream text at Title weight, cognac 1rem icon, padding 0.75rem. Hover warms the fill and tints the border cognac at 40%; press scales to 95%.
- **Icon (share):** 2.75rem square, same quiet fill and border, cognac icon. Hover tints the border cognac at 50% and lightens the icon; press scales to 90%.

### Chips

- **Style:** pill, Coffee 850 fill, Coffee 700 border, Cream text at 0.75rem medium, with a 0.875rem cognac icon. Padding 0.25rem by 0.75rem.
- **State:** informational, not selectable. Hover warms the fill, tints the border cognac at 45%, and lifts 1px; the scissors icon rotates 45 degrees. No press response: only real controls react to a press.

### Cards / Containers

- **Corner Style:** softly rounded (0.875rem).
- **Background:** a 145-degree gradient from Coffee 850 to Coffee 900, slightly lighter at the top-left. On hover and focus it steps up to Coffee 800 over Coffee 850.
- **Shadow Strategy:** flat at rest; Lift on hover and focus (see Elevation & Depth).
- **Border:** 1px cognac at 20%, rising to 55% on hover and focus.
- **Internal Padding:** 0.875rem for channel rows, 1rem for the hours card.
- **Channel row:** the whole card is a link. A 2.5rem icon tile (cognac at 15% fill, 30% border, 0.625rem corner), a white Title over a detail line, and a chevron that slides 0.375rem right and turns cognac on hover. Press scales the card to 98.5%.
- **Info card:** not interactive in purpose. A cognac icon and an uppercase Outfit heading over one Cream line.

### Navigation

There is no navigation. The header holds the logo mark (2rem, cognac) on the left and the share button on the right.

### Portrait (signature)

An 8rem circular photo inside a 3px gradient ring, with the Portrait halo breathing behind it. A small verified badge sits at the lower right: Coffee 900 disc, cognac border at 50%, with a ring that pings outward every 2.5s. The portrait scales to 105% on hover.

### Motion

The entrance is one moment: the lamp comes on. The room glow blooms from its source behind the portrait over 1.4s (fade in while scaling from 85%, on `--ease-out-expo`), and it plays once. Content does not wait for it. Sections settle in underneath with a short list stagger: fade in while rising 12px over 0.5s on `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`), 40ms apart, with the last one starting at 0.28s. The booking button starts at 0.16s. Content is visible by default; the animation only describes where it arrives from.

State changes run 0.2s to 0.3s on the same curve and name the properties they animate. Under `prefers-reduced-motion`, the bloom and the reveals do not play, the beam and badge ping are removed, and the halo holds still.

## Do's and Don'ts

### Do:

- **Do** keep cognac (#c37c33) as the only hue, and reserve its solid fill for the booking button.
- **Do** separate surfaces with tone and a 1px border; cards use cognac at 20%, quiet controls use Coffee 700.
- **Do** use 0.875rem corners on controls and cards, 0.625rem on tiles nested inside them, and full rounding on chips and the portrait.
- **Do** build hierarchy below the name from weight, case, tracking, and color, at 0.875rem for reading and 0.75rem for uppercase labels.
- **Do** give every interactive element a hover and a press response: a warmer fill or border, and a small scale-down on press.
- **Do** show keyboard focus as a 2px solid cognac outline offset 2px, on every focusable element.
- **Do** theme the surfaces the browser draws: toasts use the popover tokens in dark theme, the page declares `color-scheme: dark` and a Coffee 950 `theme-color`, and selection is cognac at 30%.
- **Do** stagger new sections into the existing reveal sequence, keep the last delay at or under 0.3s, and honor `prefers-reduced-motion`.
- **Do** reference the named tokens: palette colors, `--shadow-glow`, `--shadow-glow-strong`, `--shadow-lift`, and `--ease-out-expo`. The palette in `globals.css` is the only place a hex value is written; derive tints with `--alpha()` and in-between tones with `color-mix()`.

### Don't:

- **Don't** add a second accent color or status hues to the page.
- **Don't** set white or cream text on solid cognac; text on the booking button is Coffee 950.
- **Don't** give resting cards a drop shadow; shadow is a hover and focus state.
- **Don't** put a cognac glow on anything other than the portrait and the booking button.
- **Don't** add ambient looping motion to a third element; the halo and the booking beam are the only two.
- **Don't** hide content behind its entrance: no `opacity: 0` base state, and nothing may delay the booking button past 0.2s.
- **Don't** set Outfit in sentence case or use it for running text.
- **Don't** introduce breakpoints that split the column; the page is one column at every width.
- **Don't** space every block evenly; keep 0.625rem inside a group and 1.75rem to 2rem between groups.
