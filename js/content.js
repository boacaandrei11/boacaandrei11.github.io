/* ===============================================================
   EDIT THIS FILE to customize the text and all 24 questionnaires.
   You do NOT need to edit app.js for normal content changes.
   =============================================================== */

window.ASF_CONTENT = {
  project: {
    shortTitle: "Autonomous vehicle communication",
    title: "How do pedestrians understand autonomous vehicles?",
    subtitle: "An interactive research questionnaire",
    university: "[University / course / research group]",
    estimatedTime: "[Estimated completion time]",
    version: "draft-1"
  },

  // First screen: title page and consent.
  welcome: {
    eyebrow: "WELCOME TO THE STUDY",
    paragraphs: [
      "[Introduce your research project here in 2–3 sentences. Explain who is conducting the study and what participants will do.]",
      "[Add the approximate study duration and any eligibility criteria. All 24 simulations will be shown unless you later modify the structure.]"
    ],
    consent: "I have read the study information and agree to participate voluntarily. [Replace with your university-approved consent wording and a link to your privacy notice.]"
  },

  // Two required context pages.
  contextPages: [
    {
      eyebrow: "BACKGROUND / 01",
      title: "Autonomous vehicles and pedestrians",
      paragraphs: [
        "[Context page 1: Describe the research problem and why communication between autonomous vehicles and pedestrians matters.]",
        "[Explain the crossing situation without giving away the correct answers to the questions.]"
      ],
      callout: "[Optional key point or definition for page 1]"
    },
    {
      eyebrow: "BACKGROUND / 02",
      title: "How this questionnaire works",
      paragraphs: [
        "[Context page 2: Explain how to watch each simulation and what kind of answers participants should provide.]",
        "[Explain whether participants may replay the videos. Mention headphones for the sound section.]"
      ],
      callout: "Please watch the videos carefully, then answer based on your own interpretation."
    }
  ],

  ledIntro: {
    eyebrow: "PART ONE / VISUAL SIGNALS",
    title: "The LED lightbar",
    paragraphs: [
      "[Explain what the LED lightbar is and where it appears on the vehicle.]",
      "[Explain what participants should focus on during the 16 short simulations without revealing the intended meaning of each signal.]"
    ],
    callout: "16 videos · 16 multiple-choice questions"
  },

  soundIntro: {
    eyebrow: "PART TWO / AUDITORY SIGNALS",
    title: "The external sound system",
    paragraphs: [
      "[Explain the purpose of the external speaker and how sounds may communicate vehicle behavior.]",
      "[Ask participants to enable sound, use headphones if possible and set a comfortable volume.]"
    ],
    callout: "8 videos · 8 multiple-choice questions · Audio required"
  },

  // The next array creates all 16 LED video + question pairs automatically.
  // To change a specific question, edit its question/choices below.
  led: Array.from({ length: 16 }, (_, index) => ({
    id: `led-${String(index + 1).padStart(2, "0")}`,
    title: `LED lightbar — Scenario ${index + 1}`,
    video: `videos/led-${String(index + 1).padStart(2, "0")}.mp4`,
    videoCaption: `[Describe LED scenario ${index + 1} here; avoid revealing the answer.]`,
    question: `[LED ${index + 1}] What do you think the vehicle is communicating?`,
    choices: [
      "[Option A — replace]",
      "[Option B — replace]",
      "[Option C — replace]",
      "[Option D — replace]",
      "I am not sure"
    ]
  })),

  // The next array creates all 8 sound video + question pairs automatically.
  sound: Array.from({ length: 8 }, (_, index) => ({
    id: `sound-${String(index + 1).padStart(2, "0")}`,
    title: `Sound — Scenario ${index + 1}`,
    video: `videos/sound-${String(index + 1).padStart(2, "0")}.mp4`,
    videoCaption: `[Describe sound scenario ${index + 1} here; avoid revealing the answer.]`,
    question: `[Sound ${index + 1}] What do you think the vehicle is communicating?`,
    choices: [
      "[Option A — replace]",
      "[Option B — replace]",
      "[Option C — replace]",
      "[Option D — replace]",
      "I am not sure"
    ]
  })),

  thankYou: {
    eyebrow: "ALL SCENARIOS COMPLETE",
    title: "Thank you for answering the questions.",
    paragraphs: [
      "You have completed both video sections. There is one optional final step before you submit your responses.",
      "[Add any concluding information. Avoid presenting this as the final submission confirmation: responses are sent on the next page.]"
    ]
  },

  personalDetails: {
    eyebrow: "FINAL STEP / OPTIONAL",
    title: "Would you like to share your details?",
    description: "You may submit without a name or email address. If you choose to share details, they will be stored alongside your questionnaire answers. [Add your research privacy notice before using this with real participants.]"
  }
};
