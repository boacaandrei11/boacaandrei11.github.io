# ASF – Interactive Video Questionnaire

A complete static website scaffold for **16 LED-lightbar simulations + 8 sound simulations**.

## Files

```
ASF_Questionnaire_Website/
├── index.html               # Main website structure
├── styles.css               # All layout / styling (responsive)
├── js/
│   ├── content.js           # CHANGE ALL TEXT, QUESTIONS AND VIDEO PATHS HERE
│   ├── config.js            # OPTIONAL: Supabase credentials for real submissions
│   └── app.js               # Questionnaire logic; normally don't edit
├── videos/
│   ├── README.txt           # Video filename checklist
│   └── (your 24 MP4 files go here)
├── supabase/
│   └── schema.sql           # OPTIONAL: create response database and protections
└── .nojekyll               # Allows straightforward GitHub Pages publishing
```

## Exactly how the pages run

1. Title page + consent
2. Context page 1
3. Context page 2
4. LED bar introduction
5. LED video 01 -> multiple-choice question 01
6. ... repeat through LED video 16 -> question 16
7. Sound introduction
8. Sound video 01 -> multiple-choice question 01
9. ... repeat through Sound video 08 -> question 08
10. Thank-you-for-answering page
11. Personal details OR no-name/no-email option
12. Submit -> confirmation page

Every video and question are **separate screens**. The video question is locked until playback completes. The Back button allows replays and editing an answer.

## Step 1 – Preview locally

- Open the folder in VS Code.
- Install the VS Code extension **Live Server**, right-click `index.html` and choose **Open with Live Server**, OR run this in the website folder:

  ```bash
  python -m http.server 8000
  ```

- Open `http://localhost:8000` in your browser. (Windows may require `py -m http.server 8000`.)
- Without MP4s, the site **shows obvious placeholders** and lets you continue through the survey to preview all 24 scenarios.

## Step 2 – Add all 24 MP4 videos

Copy them into `videos/` with the names shown in `videos/README.txt`.

For example, `videos/led-01.mp4` and `videos/sound-08.mp4`.

- Use **MP4/H.264** (and AAC sound for audio scenarios) for widest browser support.
- With a real video installed, the page unlocks only after the browser reports that the video reached the end. The participant plays/pauses/replays with your site's buttons. This is a browser-side deterrent to skipping, **not a tamper-proof proof-of-attention system**.
- When a file is missing, an explicit **Continue demo** button will be available instead. **DO NOT distribute the site before all 24 files are installed and tested.**
- Keep your exported files small. GitHub rejects individual files larger than 100 MiB and GitHub Pages has published size/bandwidth limits.

## Step 3 – Edit the placeholders

Only change `js/content.js`:

- `project`: website title, university, expected time, version.
- `welcome`: introduction and **university-approved informed consent statement**.
- `contextPages`: two context sections.
- `ledIntro` / `soundIntro`: introductions to the two simulation groups.
- `led`: 16 scenario captions/questions/answer choices.
- `sound`: 8 scenario captions/questions/answer choices.
- `thankYou`: penultimate message.
- `personalDetails`: final data-collection explanation.

Keep 16 and 8 records unless you deliberately want to change the study size. Questions currently have five replaceable choices and require one answer each.

## Step 4 – Optional: Set up real data collection via Supabase

**By default the website is a DEMO:** The last button saves a `asf-demo-....json` file on the participant's own computer. **Nothing is sent to you until a database is connected.**

To set up automatic collection:

1. Create a free Supabase project (subject to current free-tier limits).
2. Open **SQL Editor** and run all statements in `supabase/schema.sql`.
3. In Supabase, obtain the **Project URL** and **publishable API key** (sometimes called a public/anon key in older accounts).
4. Add them to `js/config.js`. A publishable key is intended for browser use; **NEVER include a Supabase secret key or `service_role` key**.
5. Test one real response, then check **Table Editor > asf_responses**.
6. In Table Editor you can view responses. For more analysis, use SQL Editor to extract JSON answers or export table data as CSV.

With Supabase connected, the final button switches to **Submit responses** and the next screen appears only after a successful server response.

**Privacy and integrity:** This simple public insertion endpoint allows anonymous inserts and can be spammed. Before public recruitment, add rate limiting / CAPTCHA / a serverless function if needed, and get your university's approval for the consent and privacy text. Hosting platforms may log technical access data even when you do not ask for a name or email. Do not claim legally guaranteed anonymity without a proper privacy review. Consider whether you should collect names/emails at all.

## Step 5 – Publish free via GitHub Pages

1. Create a **public** repository such as `asf-questionnaire`.
2. Put the contents of this folder **at the root** of the repository (`index.html` must be in the root).
3. Commit and push to `main`.
4. Open **Repository > Settings > Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**; select `main` and `/ (root)`; click **Save**.
6. GitHub will give a link like `https://YOUR-USERNAME.github.io/asf-questionnaire/`.

The website and uploaded MP4 assets in a public repository are publicly accessible; don't include confidential/unreleased research material unless you have permission to publish it.

## Experimental considerations

- Avoid revealing the "correct" intended behavior in scenario captions and introductory texts.
- Participants can replay videos and navigate back; if your methodology prohibits this, change the behavior in `js/app.js`.
- If the order of scenarios may bias your results, randomization is not implemented in this initial fixed-order version. It can be added later.
- A clickable play button may be required by browsers because autoplay with sound is restricted.
- Provide accessible alternatives as necessary for deaf/blind participants and document how differing stimulus modalities are handled in your study design.
- Before publishing, test on desktop and mobile in more than one browser.
