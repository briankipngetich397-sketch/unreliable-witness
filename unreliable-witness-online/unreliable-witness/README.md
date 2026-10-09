# The Unreliable Witness

A detective game where every suspect is an AI character with a secret, a reason to lie, and a habit of comparing notes with the others. Interview them in your own words, catch contradictions, and name the thief.

## Run it

1. Install Node.js 18 or newer from https://nodejs.org
2. Get a free Gemini API key at https://aistudio.google.com/apikey (sign in with a Google account, no card needed at the time of writing). Copy `.env.example` to `.env` and paste the key after `GEMINI_API_KEY=`.
3. In this folder run:

       node server.js

4. Open http://localhost:3000

There is nothing to `npm install`. The server has no dependencies.

## How it works

- `case.json` holds the mystery: suspects, secrets, lies, and the solution. It stays on the server and is never sent to the browser.
- `server.js` holds your API key, builds each suspect's private prompt for every question, and checks accusations.
- `public/` is the web page (HTML, CSS, JavaScript).
- `public/art.js` draws the characters and scenes (animated SVG). Swap in your own photos with `public/img/`, see `IMAGE-PROMPTS.md`.
- **Suspects gossip.** Each time you question someone, they are told what the other suspects have said to you so far, so their stories can shift, harden, or collide.
- **Living scenes.** Each suspect has their own location (gallery, entrance, courtyard, bar). Characters breathe, blink, glance around, move their mouths while a reply types out, and get visibly more nervous the more you question them. Asking about the lights, cameras or 9:10 triggers a blackout flicker. Everyone gets nervous at the same rate, so it never reveals who is guilty.
- **15 questions total.** The limit is enforced in both the page and the server. It also caps your API costs per game.

## Make your own case

Copy the structure of `case.json`. For each suspect write: a `personality`, a private `truth`, a list of `knows` facts, and a `lies` paragraph describing what they hide and what makes them crack. Set `isCulprit` on one suspect and update `solution`. Good cases have several suspects who lie for different reasons, so the player has to separate the thief from the merely guilty-looking.

## Putting it online

Read **DEPLOY.md**. It walks through GitHub and Render step by step, and explains the Gemini free-tier rules you need to know before the public can play.

The server already protects you when it is public: each player's game lives on the server (so questions cannot be reset or history forged), there are per-visitor and daily limits that keep you inside your free AI quota, you get one accusation per game, and the page sends security headers. The limits are adjustable with environment settings, all listed in DEPLOY.md.

## Troubleshooting

Players only see short, friendly errors. The technical reason is written to the server log (the window where you ran `node server.js`, or the Logs tab on your host).

- **"The game could not get an answer from its AI"**: look in the log for a line starting `Gemini error`. `404` means Google renamed or retired the model: check https://ai.google.dev/gemini-api/docs/models and set `MODEL=` in `.env` (for example `MODEL=gemini-3.8-flash`). `400` or `403` usually means the key is wrong, has extra spaces, or was deleted: make a new one at https://aistudio.google.com/apikey.
- **"AI limit reached" / "detective agency is very busy"**: the free tier caps requests per minute and per day. Wait a minute. Your current limits are shown at https://aistudio.google.com/rate-limit
- **A suspect answers `*stays silent*`**: Gemini returned an empty reply (its safety filter can occasionally do this). Just ask again.
- Free-tier terms can change, including whether Google may use free-tier prompts to improve its products. DEPLOY.md summarises the current rules.
