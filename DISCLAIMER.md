# Disclaimer

## Data responsibility

This project is a static, client-only web application. It has no backend server, no database, no authentication service, and no external API of its own.

**All data you enter, display, or process through this application is 100% your responsibility.** This includes, but is not limited to:

- Any personal or professional information you display by customizing `src/data/`
- Any Google Analytics data collected through a tracking ID you configure in `src/data/settings.js`
- Any credentials, API keys, or tokens you add to environment configuration — these are yours and must never be committed to version control

## No warranty

This software is provided **as is**, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.

In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

See the full license text: [LICENSE](LICENSE)

## API keys and credentials

If you configure Google Analytics or any third-party service, **you own those credentials**. Do not commit API keys, measurement IDs, or any secrets to a public repository. Vite bundles all client-side configuration into publicly accessible JavaScript — assume anything placed in `src/data/` is visible to anyone who loads the site.

## Analytics

Google Analytics is **disabled by default**. The `googleTrackingID` field in `src/data/settings.js` is intentionally empty in the repository. You enable it only if you fork this project and configure your own GA4 property. The author of this repository is not responsible for how you configure or use analytics on your own deployment.

## Third-party content

This project uses open-source packages listed in `package.json`. Each package is governed by its own license and terms. Review those terms before deploying a fork in a production or commercial context.
