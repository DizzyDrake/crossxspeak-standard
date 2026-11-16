# Cross X Speak Standard v0.2.3 — GitHub Pages installable edition

This is the owner phone-tested v0.2.3 Standard HTML, with a minimal HTTPS/PWA wrapper: a web app manifest, offline service worker, three icon PNGs, and a small registration script. **Existing speech, gestures, phrase data structure, and localStorage key are retained; a new optional local JSON backup/restore control is added under Home > Edit.** This is not an Android APK. The Standard and Visual editions remain separate applications.

## Publish (first time, no coding)

1. Make a NEW **public** GitHub repository such as `crossxspeak-standard`. Do not use your existing Link Sender or other app repository.
2. Download and **extract this ZIP**. Upload the contents of this folder to the **root** of that repository (not the ZIP itself, and not an extra enclosing folder). Keep `index.html`, `sw.js`, `manifest.webmanifest`, `LICENSE`, `.nojekyll` and `icons/` at these relative locations. Commit the files. GitHub's Add file > Upload files works for ordinary small files; if it does not preserve `icons/`, upload the icon PNGs into an `icons` folder.
3. Go to repository **Settings > Pages > Build and deployment > Source: Deploy from a branch**; choose your default branch (usually `main`) and `/(root)`; click **Save**.
4. In Settings > Pages, use **Visit site** after publishing has completed. The URL is normally `https://USERNAME.github.io/crossxspeak-standard/`. Use the URL shown by GitHub rather than guessing if the repository name differs.
5. Send that HTTPS link to your friend. On his Android phone, open it in Chrome. From Chrome's three-dot menu select **Install app** or **Add to Home screen** (wording depends on the device/browser), and confirm. Then launch via the new Cross X Speak icon.
6. **Before relying on offline use:** load the app while online, return to it once, then switch on airplane mode and check that it opens, navigates, and displays saved phrases. Test the phone's Speak/Stop voice separately; speech voices may require device voices or a network connection.

## Privacy and updates

- A **public GitHub Pages site exposes the application source code**, but nothing on your friend's phone is uploaded as phrase data by this application. Phrases and preferences use the existing browser localStorage key (`crossxspeak.v1`) and are scoped to this website's origin. Hosting still means a normal web connection to GitHub Pages, and browser speech engines may use network-backed voices.
- Never upload anyone's private phrase exports or other personal records into the GitHub repository. This build includes only public/default app code and artwork.
- A previously opened local `.html` file has **different browser storage** from the HTTPS version. Saved phrases DO NOT migrate automatically. Preserve the old HTML/browser data until a deliberate export/import migration is available.
- For updates, upload the changed web files and bump `CACHE_NAME` in `sw.js` whenever static resources change. Existing browser-installed apps can pick up new versions on later visits/reloads; ask the user to close/reopen it after updates. Do not change the manifest `id` or `start_url` path once the site is installed, unless intentionally migrating installs.
- Browser localStorage and app caches are not backups. **Home > Edit > Download backup** saves a dated JSON export in the phone’s download location; **Restore backup** imports that file after validation and an explicit replacement warning. The JSON file stays on the user’s device unless the user chooses to share it. Back up regularly, and keep the file outside the browser. An import of the old local HTML version must first receive this same backup control; simply switching URLs does not migrate local storage.
- Offline shell uses same-origin service worker cache. GitHub Pages HTTPS is required for service workers on an actual phone (opening `index.html` as a local file is not sufficient to install this PWA).

## Build evidence

This is a source-first GitHub Pages handoff, not a deployed site. See `BUILD_CHECKS.md` for offline validation and backup/restore regression tests. Native phone installation, Firefox/FOSS browser compatibility, speech voices, and remote GitHub Pages deploy are unverified until tested.

## License

Retains Apache-2.0 LICENSE and Standard Edition scope note from the original licensed parent; all new wrapper files are distributed under Apache-2.0 too. This package does not assert third-party artwork ownership beyond the newly drawn simple app icons included here.

## Dedicated browser note

A separate Chromium-based browser/profile can reduce accidental clearing of Cross X Speak site data, but installability and speech support differ across browsers. **The simplest supported handoff is Chrome → Install app**, then use the home-screen icon. Do not clear Chrome site data or uninstall the web app without a separate JSON backup. Clearing only cached images is not the same as clearing site storage, but broad “clear browsing data” operations may remove saved phrases.
