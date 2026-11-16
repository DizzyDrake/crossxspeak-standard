# Build checks and scope

- Original Standard v0.2.3 owner-confirmed swipe mapping retained; PWA adds manifest, offline service worker, drawn PNG icons, and Home > Edit backup/restore.
- Existing phrase format and localStorage key `crossxspeak.v1` are unchanged.
- Backup is downloaded as local JSON, validated (format/version, collection fields, phrase types, size limits), and requires confirmation before replacing existing storage; no server sync.
- Actual Android browser install, real voice playback, downloaded JSON file picker, GitHub Pages deployment, storage eviction, and real-device offline behavior require owner testing.
- See test report for the tests actually run in the sandbox. Do not infer user acceptance or phone deployment from this package.

## Tests performed, November 15, 2026

- **PASS:** 21 browser/sandbox assertions in headless mobile-sized Chromium after document injection: startup, add phrase, JSON download, schema and phrase contents, restore via JSON file chooser, simulated persisted storage on reopening, malformed file rejection, cancellation preserves existing data, gesture mapping, icon dimensions, manifest paths, and checksum integrity.
- **PASS:** synthetic Node.js service-worker lifecycle test: installation caches all six shell paths, activation clears old caches, and offline navigation recovers the cached project-path root.
- **PASS:** fresh ZIP extraction, CRC and internal SHA-256 checks (performed before handoff).
- **LIMITATION:** the sandbox's Chromium refuses all HTTP/HTTPS and even loopback URL navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, including intercepted routes; therefore a real secure-origin service worker test, GitHub Pages deployment, Android PWA install, actual Android speech voices, Android Downloads behavior, and real persistent site storage have NOT been tested here. The browser script used `set_content` and an in-memory `localStorage` shim; it is not a real-origin persistence guarantee.
