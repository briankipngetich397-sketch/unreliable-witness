# Putting The Unreliable Witness online

This guide uses **GitHub** (to store your files) and **Render** (to run the game on the internet). Both have free plans that work for this game and did not need a credit card when this was written. Check their pages for current terms.

You will end up with a link like `https://unreliable-witness.onrender.com` that anyone can open.

## Read this first: the Gemini free tier has rules

The free Gemini key is great for building and for sharing with friends. Before you open the game to everyone, know what Google's terms said when I checked (https://ai.google.dev/gemini-api/terms):

- **Google may use what players type to improve its products**, and people may read it. Google tells developers not to send personal information through the free tier. The game's start page already warns players about this.
- **Players must be 18 or older.** The game's start page says so. The terms also say you should not offer an app that is likely to be used by under-18s.
- **Players in the EU, UK and Switzerland are not allowed on the free tier.** For those users you may only use the paid service. A free-hosted site cannot easily block countries, so: **share the link with people in Kenya and friends elsewhere at first, and don't promote it in Europe until you switch to the paid Gemini service.**
- Free-tier limits are small and can change. The game stops politely when it reaches its daily cap.

**If you want to earn from the game, plan to turn on billing for your Gemini key** (a paid key is still cheap for short chats, but check Google's current pricing page). Paid use also removes the data-use and EU problems. Do it before you advertise the game or add payments.

## Step 1: Put your files on GitHub

1. Make a free account at https://github.com and sign in.
2. Click the **+** at the top right, then **New repository**. Name it `unreliable-witness`. Choose **Private**. Click **Create repository**.
3. On the next page click **uploading an existing file**.
4. Unzip the game on your computer. Open the unzipped `unreliable-witness` folder, select **everything inside it**, and drag it into the GitHub page. (You should see `server.js`, `case.json`, `package.json`, the `public` folder, and so on.)
5. **Do not upload a file called `.env`.** That file holds your secret key. If you made one for testing, leave it out. You will give the key to Render separately, in step 2.
6. Scroll down and click **Commit changes**.

Check that the repository now shows `server.js` and a `public` folder.

## Step 2: Run it on Render

1. Make a free account at https://render.com. The easiest way is **Sign in with GitHub**.
2. Click **New +**, then **Web Service**. Pick your `unreliable-witness` repository. (If it isn't listed, click the link to configure GitHub access and allow Render to see that repository.)
3. Fill in the form:
   - **Name:** `unreliable-witness` (this becomes part of your link; if it is taken, add something extra)
   - **Language / Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
4. Open **Environment Variables** (or **Advanced**) and add these:

   | Name | Value |
   |---|---|
   | `GEMINI_API_KEY` | your key from https://aistudio.google.com/apikey |
   | `TRUST_PROXY` | `1` |
   | `DAILY_LIMIT` | `300` (see the table below) |

   `TRUST_PROXY=1` matters. It lets the game tell visitors apart so the per-visitor limits work.
5. Under **Health Check Path** (in Advanced) enter `/healthz`.
6. Click **Create Web Service**. Wait a few minutes while it builds. When the log says `The Unreliable Witness is running`, click the link at the top of the page.

## Step 3: Test it

Open your link on your phone, not just your computer, and play one full game: ask questions, pin a reply, make an accusation, then **Play again**. Open the **Logs** tab on Render while you do. If a suspect says the AI could not answer, the log shows the exact reason (`Gemini error 404`, `403`, and so on). The most common causes are a mistyped key and a retired model name. See Troubleshooting in README.md.

## What the free plan is like

- **It goes to sleep** after 15 minutes without visitors. The next visitor waits about a minute while it wakes up. Render's own page says free services are not meant for serious production use.
- **When it wakes, the game server forgets everything.** A player who comes back to a half-played game keeps their notebook, but the suspects forget earlier conversations. The page tells them so.
- **It has limits per month** (instance hours and bandwidth). Render pauses free services if you go over, unless you add a payment method.
- When you start earning, move to a paid plan so the game is always awake. That is a good time to also turn on billing for Gemini.

## The protection settings

These stop one person from using up your free AI allowance. Change them in Render under **Environment**. They are all optional.

| Setting | Default | What it does |
|---|---|---|
| `DAILY_LIMIT` | 500 | Most AI answers the whole site gives per day. **Set it below your Gemini daily limit**, shown at https://aistudio.google.com/rate-limit. A full game uses 15. |
| `IP_DAILY_LIMIT` | 60 | Most questions one visitor (one network address) can ask per day. About four games. |
| `IP_PER_MINUTE` | 8 | Most questions one visitor can ask per minute. |
| `MAX_IN_FLIGHT` | 8 | Most AI calls happening at the same moment. |
| `MIN_Q_TO_ACCUSE` | 3 | Questions a player must ask before accusing. Stops guessing the culprit without playing. |
| `MODEL` | gemini-3.5-flash-lite | The Gemini model. Change it if Google retires it. |

Many people on a mobile network can share one network address. If you notice real players getting "used all your questions for today", raise `IP_DAILY_LIMIT`.

## Updating the game later

Change a file on your computer, then in your GitHub repository click the file, the pencil icon, paste the new content, and **Commit changes**. Render rebuilds automatically within a few minutes. Or use **Add file, Upload files** to replace several at once.

## Your own web address (optional)

In Render, open your service, then **Settings, Custom Domains**, and follow the steps. You will need to buy a domain from a registrar first. This is not necessary to start.

## If something goes wrong

- **Bill or quota worry:** on Render click **Suspend Service** to take the game offline immediately. In Google AI Studio you can delete the API key.
- **Someone is abusing it:** lower `DAILY_LIMIT` (even to `50`) and save. Render restarts the game with the new limit.
- **Never put your API key in the page files or on GitHub.** If you ever do, delete that key at https://aistudio.google.com/apikey and make a new one.

## When you want to earn from it

Do these first, in this order: turn on billing for the Gemini key, put a short privacy note and contact email on the page, and watch the Logs for a week to learn how many people play and how much each game costs. Then add payments. From Kenya, Paystack and Flutterwave support M-Pesa and cards. Ask me and I can build a version with a free daily game plus paid extra cases.
