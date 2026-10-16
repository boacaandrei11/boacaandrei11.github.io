# ASF Group 4 — clean copy update (draft-3)

Files to replace in the ROOT of the GitHub repository `boacaandrei11/boacaandrei11.github.io`:

- `js/content.js` — **required**; team text, one context page, no non-sound filler copy, all 24 scenarios retained.
- `js/app.js` — **required**; removes development placeholder text from the media and privacy displays. The latest MP3 support, LED muting, Supabase POST, and playback completion logic are retained.
- `index.html` — **required**; removes the draft-template footer.

Do NOT replace `js/config.js`, your existing video files, `styles.css`, or `supabase/schema.sql`.

## What changed
- Context Page 2 has been removed by reducing `contextPages` to one entry. The app dynamically creates the page sequence from that array; no broken links or manual page-number edits are needed.
- Thank-you screen: the unfinished second paragraph has been removed.
- Personal details intro: the editor instruction to add a privacy notice has been removed from the on-screen copy.
- In-page privacy reminder: editor instruction removed, while the existing statement about technical access data remains.
- The draft-template footer has been replaced with the university and group name.
- Media-unavailable screen: changed to present a clear message instead of visible template instructions.
- Sound scenarios 1–8: unchanged with their current scenario-caption, question, and options placeholders, as requested.

## What was not changed
- The team-approved text in the welcome, Context Page 1, LED introduction, 16 LED questions and options, and sound introduction.
- LED scenarios 01–16 use `videos/led-01.mp4` ... `led-16.mp4` and are muted.
- Sound scenarios 01–04 use `.mp3`, 05–08 use `.mp4` and sound is enabled.
- Supabase configuration and database submission logic.

## How to publish
1. Back up your current GitHub files before replacing them.
2. Copy the three included files into the same relative paths on the `main` branch.
3. Commit and verify GitHub Pages deployment under Actions.
4. Hard refresh `https://boacaandrei11.github.io/` (Ctrl+Shift+R).
5. Check navigation: Welcome → Context (single page) → LED → Sound → Thank-you → Personal details.
6. Before recruiting real participants, finalize all Sound scenarios and obtain a university-approved consent/privacy notice. Removing placeholder instructions from a screen does not replace the need for these research disclosures.

As a reminder, no files have been automatically pushed to GitHub.
