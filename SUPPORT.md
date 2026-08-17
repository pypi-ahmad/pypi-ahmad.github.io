# Support

## Before opening an issue

1. **Read the README** — [README.md](README.md) covers setup, configuration, commands, and how the project works.
2. **Search existing issues** — someone may have already asked the same question or reported the same problem at [github.com/pypi-ahmad/pypi-ahmad.github.io/issues](https://github.com/pypi-ahmad/pypi-ahmad.github.io/issues).

## Common questions

**The dev server won't start.**
Make sure you're on Node.js `24.19.0` and npm `12.0.2`. Run `npm ci` (not `npm install`) to install exact dependency versions from the lockfile.

**Changes to `src/data/` don't appear.**
Vite's hot-reload picks up JavaScript changes automatically. If you don't see the change, force-reload the browser (`Ctrl + Shift + R` / `Cmd + Shift + R`).

**The build fails.**
Run `npm run lint` and `npm run typecheck` first — most build failures are caught by these two checks. Fix reported errors, then retry `npm run build`.

**Tests are failing locally but pass in CI.**
Make sure you ran `npm ci` after the last `git pull`. A stale `node_modules` is the most common cause.

**Deployment to GitHub Pages isn't working.**
Confirm that **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**, not the legacy "Deploy from a branch" option.

## Getting help

For anything not covered above, [open an issue](https://github.com/pypi-ahmad/pypi-ahmad.github.io/issues/new) and describe what you're trying to do, what you expected, and what actually happened. Include your OS, Node.js version, and any relevant error messages.

There is no Slack, Discord, mailing list, or paid support channel. GitHub Issues is the only support path.

## No financial support needed

This project is free and MIT-licensed. **The author does not want or accept donations, sponsorships, or financial contributions of any kind.** If you find the project useful, the best way to show it is to file a clear issue, submit a pull request, or share it with someone who might benefit from it.
