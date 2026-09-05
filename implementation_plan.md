# Implementation Plan - Multiple Floating Animated Emojis Around Avatar Ring

Add floating romantic/sparkle emojis & badges around the avatar circle ring in `EntryCard` with staggered pulse animations.

## User Review Required

> [!NOTE]
> Multiple decorative floating badges (`💖`, `✨`, `🌸`, `💕`) will be randomly positioned around the avatar ring with staggered float keyframe timings.

## Proposed Changes

### Frontend (`client/`)

#### [MODIFY] [client/src/components/EntryCard/styles.css](file:///d:/!/couple_project/yasmina_khaled/client/src/components/EntryCard/styles.css)

- Add animation delay utility classes (`badge-delay-1`, `badge-delay-2`, `badge-delay-3`, `badge-delay-4`) so badges float asynchronously.

#### [MODIFY] [client/src/components/EntryCard/index.jsx](file:///d:/!/couple_project/yasmina_khaled/client/src/components/EntryCard/index.jsx)

- Add 4-5 floating badge elements around the outer perimeter of the avatar ring container with distinct emojis/icons (`💖`, `✨`, `🌸`, `💕`, `⭐`).

## Verification Plan

### Automated Tests & Linting

- Run `npm run lint` in `client/` directory to ensure zero ESLint errors or warnings.

### Manual Verification

- Capture browser agent screenshot of the floating badges around the avatar ring and add it to `walkthrough.md`.
