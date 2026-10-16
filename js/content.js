/* ASF Group 4 questionnaire content — draft-3
 * Based on the team's questionnaire PDF.
 * Context page 2 removed, and unfilled non-sound copy hidden/removed.
 * Sound scenario 01–08 question and answer placeholders remain pending team input.
 * Video paths, scenario IDs and backend payload remain unchanged.
 */
window.ASF_CONTENT = {
  "project": {
    "shortTitle": "Autonomous vehicle communication",
    "title": "Communication of AV with pedestrians",
    "subtitle": "An interactive research questionnaire",
    "university": "0HM310 · Automotive societal factors · Q1 (2026) - group 4",
    "estimatedTime": "10 minutes",
    "version": "draft-3"
  },
  "welcome": {
    "eyebrow": "WELCOME TO THE STUDY",
    "paragraphs": [
      "Thank you for starting in this questionnaire. This questionnaire will be used for a project in the course Automotive societal factors. The research question for the project is: How can an AV (Automated Vehicle) communicate with pedestrians, by approaching a crossing, even if the pedestrian is blind or deaf?",
      "In this questionnaire there are 24 scenarios created which consist of an AV approaching a pedestrian who wants to cross. The video’s are taken from the perspective of the pedestrian."
    ],
    "consent": "I have read the study information and agree to participate voluntarily."
  },
  "contextPages": [
    {
      "eyebrow": "BACKGROUND / 01",
      "title": "Autonomous vehicles and pedestrians",
      "paragraphs": [
        "Nowadays, technology is developing faster than ever, and we are not far away from autonomous vehicles. This creates new possibilities, while it also creates some problem. The communication from pedestrians towards AV is researched in this questionnaire.",
        "As a possible solution to this problem, a 360 light bar is created around the car, combined with using different sounds. This will create communication between AVs and pedestrians. Both solutions (lightbar and sound) will be tested separately in this questionnaire. For every scenario, there will be a follow-up question on how you feel with this situations. This can be answered by choosing 1 of the 5 answer options."
      ],
      "callout": ""
    }
  ],
  "ledIntro": {
    "eyebrow": "PART ONE / VISUAL SIGNALS",
    "title": "The LED lightbar",
    "paragraphs": [
      "In this section, you will watch 16 silent videos from the perspective of a pedestrian waiting to cross the road. The videos show a car approaching with an LED lightbar.",
      "Imagine that you are waiting to cross the road in each scenario. Watch the entire video and consider what you see, including the car’s movement and its light signals. Answer each question based on your own interpretation."
    ],
    "callout": "16 videos – 16 multiple-choice questions"
  },
  "soundIntro": {
    "eyebrow": "PART TWO / AUDITORY SIGNALS",
    "title": "The external sound system",
    "paragraphs": [
      "The purpose of the sound is to communicate to the surroundings that an AV is stopping for on the road. For the first 4 scenarios, only the sound is used. Imagine here that a car is approaching and, the moment it is slowing down, this sound will be produced. Do you feel confident to cross now? The same questions will be asked in the last 4 scenarios, where a simulation with sound is shown.",
      "Please make sure the sound on your device is working properly"
    ],
    "callout": "4 audio clips + 4 videos – 8 multiple-choice questions – Sound required"
  },
  "led": [
    {
      "id": "led-01",
      "title": "LED lightbar — Scenario 1",
      "video": "videos/led-01.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-02",
      "title": "LED lightbar — Scenario 2",
      "video": "videos/led-02.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-03",
      "title": "LED lightbar — Scenario 3",
      "video": "videos/led-03.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-04",
      "title": "LED lightbar — Scenario 4",
      "video": "videos/led-04.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-05",
      "title": "LED lightbar — Scenario 5",
      "video": "videos/led-05.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-06",
      "title": "LED lightbar — Scenario 6",
      "video": "videos/led-06.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-07",
      "title": "LED lightbar — Scenario 7",
      "video": "videos/led-07.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-08",
      "title": "LED lightbar — Scenario 8",
      "video": "videos/led-08.mp4",
      "videoCaption": "A car approaches and comes to a stop, viewed from the perspective of a pedestrian waiting to cross the road.",
      "question": "Once the car has stopped, how safe would you feel crossing the road in front of it?",
      "choices": [
        "Very unsafe",
        "Somewhat unsafe",
        "Neither safe nor unsafe",
        "Somewhat safe",
        "Very safe"
      ]
    },
    {
      "id": "led-09",
      "title": "LED lightbar — Scenario 9",
      "video": "videos/led-09.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    },
    {
      "id": "led-10",
      "title": "LED lightbar — Scenario 10",
      "video": "videos/led-10.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    },
    {
      "id": "led-11",
      "title": "LED lightbar — Scenario 11",
      "video": "videos/led-11.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    },
    {
      "id": "led-12",
      "title": "LED lightbar — Scenario 12",
      "video": "videos/led-12.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    },
    {
      "id": "led-13",
      "title": "LED lightbar — Scenario 13",
      "video": "videos/led-13.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    },
    {
      "id": "led-14",
      "title": "LED lightbar — Scenario 14",
      "video": "videos/led-14.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    },
    {
      "id": "led-15",
      "title": "LED lightbar — Scenario 15",
      "video": "videos/led-15.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    },
    {
      "id": "led-16",
      "title": "LED lightbar — Scenario 16",
      "video": "videos/led-16.mp4",
      "videoCaption": "An approaching car is shown from the perspective of a pedestrian waiting to cross the road.",
      "question": "Based on what you saw in the video, how likely do you think it is that the car will let you cross the road in front of it?",
      "choices": [
        "Very unlikely",
        "Somewhat unlikely",
        "Neither likely nor unlikely",
        "Somewhat likely",
        "Very likely"
      ]
    }
  ],
  "sound": [
    {
      "id": "sound-01",
      "title": "Sound — Scenario 1",
      "video": "videos/sound-01.mp3",
      "videoCaption": "[Describe sound scenario 1 here; avoid revealing the answer.]",
      "question": "[Sound 1] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    },
    {
      "id": "sound-02",
      "title": "Sound — Scenario 2",
      "video": "videos/sound-02.mp3",
      "videoCaption": "[Describe sound scenario 2 here; avoid revealing the answer.]",
      "question": "[Sound 2] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    },
    {
      "id": "sound-03",
      "title": "Sound — Scenario 3",
      "video": "videos/sound-03.mp3",
      "videoCaption": "[Describe sound scenario 3 here; avoid revealing the answer.]",
      "question": "[Sound 3] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    },
    {
      "id": "sound-04",
      "title": "Sound — Scenario 4",
      "video": "videos/sound-04.mp3",
      "videoCaption": "[Describe sound scenario 4 here; avoid revealing the answer.]",
      "question": "[Sound 4] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    },
    {
      "id": "sound-05",
      "title": "Sound — Scenario 5",
      "video": "videos/sound-05.mp4",
      "videoCaption": "[Describe sound scenario 5 here; avoid revealing the answer.]",
      "question": "[Sound 5] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    },
    {
      "id": "sound-06",
      "title": "Sound — Scenario 6",
      "video": "videos/sound-06.mp4",
      "videoCaption": "[Describe sound scenario 6 here; avoid revealing the answer.]",
      "question": "[Sound 6] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    },
    {
      "id": "sound-07",
      "title": "Sound — Scenario 7",
      "video": "videos/sound-07.mp4",
      "videoCaption": "[Describe sound scenario 7 here; avoid revealing the answer.]",
      "question": "[Sound 7] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    },
    {
      "id": "sound-08",
      "title": "Sound — Scenario 8",
      "video": "videos/sound-08.mp4",
      "videoCaption": "[Describe sound scenario 8 here; avoid revealing the answer.]",
      "question": "[Sound 8] What do you think the vehicle is communicating?",
      "choices": [
        "[Option A — replace]",
        "[Option B — replace]",
        "[Option C — replace]",
        "[Option D — replace]",
        "I am not sure"
      ]
    }
  ],
  "thankYou": {
    "eyebrow": "ALL SCENARIOS COMPLETE",
    "title": "Thank you for answering the questions.",
    "paragraphs": [
      "You have completed both video sections. There is one optional final step before you submit your responses."
    ]
  },
  "personalDetails": {
    "eyebrow": "FINAL STEP / OPTIONAL",
    "title": "Would you like to share your details?",
    "description": "You may submit without a name or email address. If you choose to share details, they will be stored alongside your questionnaire answers."
  }
};
