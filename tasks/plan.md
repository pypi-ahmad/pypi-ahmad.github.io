# Implementation Plan: Clean Up Broken/Orphaned Image Assets

## Overview

graphify's semantic extraction flagged 3 corrupted files in `public/images/`. Cross-checking every `logoPath` reference in `src/data/*.js` against actual files on disk confirmed these 3 files are referenced nowhere in the codebase — dead, invisible assets. A fourth suspicion (missing `public/images/certifications/machine_learning_az.png`) turned out to be a false alarm: `CertificationCard.jsx` resolves certification `logoPath` values against `public/certifications/`, not `public/images/certifications/`, and that file exists there. The only real defect found is a stale doc comment. This plan deletes the 3 dead files and corrects the comment — nothing else needs to change.

## Architecture Decisions

- **Delete, don't replace.** All 3 corrupted files are unreferenced by any component or data file. Sourcing real replacement logos would add content nobody displays — pure speculative work. Ponytail rung 1 (does this need to exist at all?) says no.
- **No code changes required.** No component, route, or data file references these paths, so removal has zero runtime blast radius. Verified via repo-wide grep, not assumption.

## Task List

### Phase 1: Delete Orphaned Corrupted Files

- [ ] Task 1: Remove 3 corrupted, unreferenced image files

### Checkpoint: Deletion
- [ ] `git status` shows only the 3 deletions
- [ ] `grep -r "deeplearning_ai_logo\|stanford_logo\|udemy_logo" src/` still returns nothing (confirms no latent reference existed)
- [ ] `npm run build` succeeds (build doesn't fail on missing public/ assets, but confirms nothing else broke)

### Phase 2: Fix Stale Documentation

- [ ] Task 2: Correct the misleading comment in `education.js`

### Checkpoint: Complete
- [ ] Comment accurately describes where certification logos actually resolve from
- [ ] `git diff` reviewed — only the 3 deletions + 1 comment line changed

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| A file is referenced dynamically (string concatenation, CMS config) that grep can't find | Low — would break an image nobody currently sees anyway | Repo-wide grep already run across `src/`, `public/`, and root; zero matches for all 3 filenames |
| Someone intended to add these logos to a future "platforms worked with" section | Low | User explicitly chose "delete orphans" over "replace orphans" — confirmed decision, not a guess |

## Open Questions

None — scope was narrowed via direct user confirmation (AskUserQuestion) after the false-bug correction.
