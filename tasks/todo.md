# Todo: Clean Up Broken/Orphaned Image Assets

## Task 1: Remove 3 corrupted, unreferenced image files

**Description:** Delete `public/images/deeplearning_ai_logo.png` (contains an S3 AccessDenied XML error, not image bytes), `public/images/stanford_logo.png` (contains a Wikimedia error HTML page), and `public/images/udemy_logo.png` (raw SVG markup saved with a `.png` extension). All 3 are confirmed unreferenced by any `logoPath` in `src/data/*.js` or anywhere else in `src/`.

**Acceptance criteria:**
- [ ] All 3 files removed from `public/images/`
- [ ] No other file in the repo references them (already verified — re-verify after deletion as a sanity check)

**Verification:**
- [ ] `git status` shows exactly 3 deleted files, nothing else
- [ ] `grep -rn "deeplearning_ai_logo\|stanford_logo\|udemy_logo" src/ public/` returns nothing
- [ ] `npm run build` succeeds

**Dependencies:** None

**Files touched:**
- `public/images/deeplearning_ai_logo.png` (deleted)
- `public/images/stanford_logo.png` (deleted)
- `public/images/udemy_logo.png` (deleted)

**Estimated scope:** XS (3 file deletions, 0 code changes)

---

## Task 2: Fix stale comment in `education.js`

**Description:** The file-header comment says "Certification logo images live in public/images/certifications/" — false. `CertificationCard.jsx:46` resolves `certificate.logoPath` as `/${logoPath}` (no `/images/` prefix), so certification logos actually resolve from `public/certifications/`. Correct the comment to match the real resolution path so the next person reading this file doesn't chase the same false lead this session did.

**Acceptance criteria:**
- [ ] Comment accurately states certification logos resolve from `public/certifications/`
- [ ] Comment distinguishes this from degree/experience logos, which do use the `/images/` prefix (via `DegreeCard.jsx` / `ExperienceCard.jsx`)

**Verification:**
- [ ] Manual read-through: comment matches `CertificationCard.jsx` behavior
- [ ] `git diff -- src/data/education.js` shows only the comment line(s) changed

**Dependencies:** None (independent of Task 1)

**Files touched:**
- `src/data/education.js`

**Estimated scope:** XS (1 file, comment-only change)

---

## Checkpoint: Both tasks complete
- [ ] `git status --short` shows only the 3 deletions + 1 modified file
- [ ] `npm run build` succeeds
- [ ] No other `public/images/*` file was touched
