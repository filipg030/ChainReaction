# Chain Reaction

A minimal daily word game in warm ivory and forest green. Uses browser-native JavaScript modules, CSS and HTML with no installation or external services.

## Run

Requires Node.js 20 or later. In this folder run `npm start`, then open http://127.0.0.1:4173. Run `npm test` for logic tests and `npm run build` for a production static bundle in `dist/`. Deploy the contents of dist to any static host. The local server serves source files.

## Daily content

The starter collection covers October 29 through November 4, 2026 inclusive. Each day changes at midnight UTC. Outside the schedule, the app explicitly reports no available puzzle. Add future puzzles in puzzles.js before the collection runs out. Dates are fixed and shared by all players; no random or recycled puzzles are used.

Each puzzle has seven words, six exact compounds or phrases, a unique ID, a UTC date, review status and an alternatives array. Review all six links for everyday familiarity before marking a puzzle reviewed. Never change word forms or reverse word order. Automatic validation checks structure and spelling only; editorial judgment is still required. All seven starter chains were reviewed individually for familiar exact connections.

The starter catalog has no alternate answers. Alternatives are complete seven-word chains, filtered against previous answers and hint prefixes. Review every alternative before adding it.

## Persistence and privacy

Progress and statistics are stored in localStorage on this browser, with malformed saves discarded. Private browsing, cleared storage, or a different browser may lose progress. No accounts or server are used. Streaks count consecutive completed UTC days; hints are allowed and reported in sharing. The client clock determines the day. Puzzle answers ship in client assets and can be inspected by a determined player.

## Verification

`npm test` covers eligibility from both ends, answer normalization, misses, hints, completion, UTC dates, catalog exhaustion, streak expiration and storage recovery. `npm run build` validates the catalog before copying production assets.

## Archive and themes
The History button lists past scheduled puzzles with completion status, misses and hints. Selecting a date resumes its independent saved progress; completed puzzles open for review. Three historical starter puzzles (October 26–28) are included for immediate testing. Future puzzles remain inaccessible. Archive completion counts in totals but does not repair daily streaks. Older saves without completion timestamps retain legacy streak eligibility. History remains local to the browser. Theme colors transition over 300 ms and respect reduced-motion preferences.
