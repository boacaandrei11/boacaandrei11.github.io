/* ASF questionnaire engine: reads all editable text and scenarios from content.js */
(() => {
  "use strict";

  const content = window.ASF_CONTENT;
  const backend = window.ASF_BACKEND || {};
  const page = document.querySelector("#page");
  const controls = document.querySelector("#page-controls");
  const stepList = document.querySelector("#step-list");
  const progressLabel = document.querySelector("#progress-label");
  const progressPercent = document.querySelector("#progress-percent");
  const progressFill = document.querySelector("#progress-fill");
  const chapterPill = document.querySelector("#chapter-pill");
  const footerNote = document.querySelector("#footer-note");

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  const paragraphs = lines => lines.map(p => `<p>${escapeHtml(p)}</p>`).join("");

  const sequence = [
    { kind: "welcome", group: "intro" },
    ...content.contextPages.map((_, i) => ({ kind: "context", index: i, group: "intro" })),
    { kind: "intro", group: "led" },
    ...content.led.flatMap((scenario, i) => [
      { kind: "video", scenario, index: i, group: "led" },
      { kind: "question", scenario, index: i, group: "led" }
    ]),
    { kind: "intro", group: "sound" },
    ...content.sound.flatMap((scenario, i) => [
      { kind: "video", scenario, index: i, group: "sound" },
      { kind: "question", scenario, index: i, group: "sound" }
    ]),
    { kind: "thanks", group: "finish" },
    { kind: "details", group: "finish" },
    { kind: "complete", group: "finish" }
  ];

  const state = {
    position: 0,
    participantId: (globalThis.crypto?.randomUUID?.() || `participant-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`),
    consent: false,
    watched: {},
    missingVideos: {},
    answers: {},
    identityMode: "anonymous",
    details: { name: "", email: "", ageRange: "" },
    submitted: false,
    demo: false,
    isSending: false
  };

  const scenarios = [...content.led, ...content.sound];

  function renderSidebar() {
    const currentGroup = sequence[state.position].group;
    const countAnswered = scenarios.filter(s => state.answers[s.id] !== undefined).length;
    const steps = [
      ["intro", "01", "Introduction", "Context & instructions"],
      ["led", "02", "LED lightbar", `${content.led.length} visual scenarios`],
      ["sound", "03", "Sound", `${content.sound.length} audio scenarios`],
      ["finish", "04", "Finish", "Details & submission"]
    ];
    const currentIndex = steps.findIndex(s => s[0] === currentGroup);
    stepList.innerHTML = steps.map(([id, no, title, desc], i) => `
      <div class="step ${id === currentGroup ? "is-active" : ""} ${i < currentIndex ? "is-complete" : ""}">
        <span class="step-index">${i < currentIndex ? "✓" : no}</span>
        <span class="step-info"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(desc)}</small></span>
      </div>`).join("");
    chapterPill.textContent = sequence[state.position].kind === "complete" ? "Complete" : `${countAnswered} / ${scenarios.length} answered`;
  }

  function renderProgress() {
    const current = sequence[state.position];
    const groupNames = { intro: "Introduction", led: "Part 1 — LED lightbar", sound: "Part 2 — Sound", finish: "Final step" };
    const pct = Math.round(100 * Math.min(state.position, sequence.length - 1) / (sequence.length - 1));
    progressLabel.textContent = current.kind === "complete" ? "Study complete" : groupNames[current.group];
    progressPercent.textContent = `${pct}%`;
    progressFill.style.width = `${pct}%`;
  }

  function heading(eyebrow, title, icon = "") {
    return `<div class="eyebrow">${escapeHtml(eyebrow)}</div>${icon ? `<div class="symbol">${icon}</div>` : ""}<h2 class="page-title">${escapeHtml(title)}</h2>`;
  }

  function renderTextPage(info, icon = "") {
    return `<div class="page-content text-content">${heading(info.eyebrow, info.title, icon)}
      <div class="prose">${paragraphs(info.paragraphs)}</div>
      ${info.callout ? `<div class="callout"><span aria-hidden="true">↗</span><p>${escapeHtml(info.callout)}</p></div>` : ""}
    </div>`;
  }

  function renderWelcome() {
    const info = content.welcome;
    return `<div class="page-content welcome-content">
      <span class="eyebrow">${escapeHtml(info.eyebrow)}</span>
      <div class="hero-illustration" aria-hidden="true"><span class="road road-a"></span><span class="road road-b"></span><span class="vehicle">▰</span><span class="human">●</span><span class="ring ring-one"></span><span class="ring ring-two"></span></div>
      <h2 class="hero-title">${escapeHtml(content.project.title)}</h2>
      <p class="hero-subtitle">${escapeHtml(content.project.subtitle)}</p>
      <div class="study-stats"><span>◷ ${escapeHtml(content.project.estimatedTime)}</span><span>▤ ${scenarios.length} scenarios</span><span>⌂ ${escapeHtml(content.project.university)}</span></div>
      <div class="prose">${paragraphs(info.paragraphs)}</div>
      <label class="consent-box"><input id="consent-checkbox" type="checkbox" ${state.consent ? "checked" : ""}><span>${escapeHtml(info.consent)}</span></label>
    </div>`;
  }

  function renderVideo(screen) {
    const { scenario, group, index } = screen;
    const watched = Boolean(state.watched[scenario.id]);
    const audioOnly = /\.mp3(?:[?#].*)?$/i.test(scenario.video);
    const ledSilent = group === "led";
    const mediaElement = audioOnly
      ? `<audio id="stimulus-video" preload="auto" src="${escapeHtml(scenario.video)}" aria-label="Audio stimulus: ${escapeHtml(scenario.title)}"></audio>
         <div class="audio-art" id="audio-art" aria-hidden="true"><div class="audio-art-icon">♫</div><div class="audio-art-label">Audio scenario</div><div class="audio-art-sub">Audio starts automatically when this scenario opens</div></div>`
      : `<video id="stimulus-video" preload="auto" playsinline ${ledSilent ? "muted" : ""} src="${escapeHtml(scenario.video)}" aria-label="Simulation video: ${escapeHtml(scenario.title)}"></video>`;
    return `<div class="page-content video-content">
      <span class="eyebrow">${group === "led" ? "PART ONE / LED LIGHTBAR" : "PART TWO / SOUND"} — ${String(index + 1).padStart(2, "0")} OF ${group === "led" ? content.led.length : content.sound.length}</span>
      <h2 class="page-title">${escapeHtml(scenario.title)}</h2>
      <p class="content-lede">${audioOnly ? "Listen to the entire audio clip, then continue to the question." : ledSilent ? "Watch the entire video without sound, then continue to the question." : "Watch the video in full, then continue to the question."}</p>
      <div class="video-frame">
        ${mediaElement}
        <div id="video-placeholder" class="video-placeholder" hidden>
          <div class="video-placeholder-icon">${audioOnly ? "♫" : "▶"}</div><strong>Recording unavailable</strong>
          <p>This recording is not available in the current preview.</p>
          <small>You can continue exploring the questionnaire; real submissions require all recordings.</small>
        </div>
        <span class="video-badge">${audioOnly ? "MP3 · Audio" : "MP4 · Video"}</span>
      </div>
      <div class="video-toolbar"><button class="mini-button" id="play-toggle" type="button">▶ Play ${audioOnly ? "audio" : "video"}</button><span id="video-status" role="status">${watched ? "✓ Playback complete — you can continue or replay." : "Starting recording automatically…"}</span></div>
      <div class="video-timeline"><div id="video-timeline-fill"></div></div>
      <p class="video-caption">${escapeHtml(scenario.videoCaption)}</p>
      ${group === "sound" ? `<div class="small-notice">♫ Enable sound, set a comfortable volume, and use headphones if possible.</div>` : `<div class="small-notice">🔇 The LED lightbar scenarios are intentionally silent. Audio playback is disabled.</div>`}
    </div>`;
  }

  function renderQuestion(screen) {
    const { scenario, group, index } = screen;
    const current = state.answers[scenario.id];
    return `<div class="page-content question-content">
      <span class="eyebrow">${group === "led" ? "LED LIGHTBAR" : "SOUND"} / QUESTION ${String(index + 1).padStart(2, "0")}</span>
      <p class="question-kicker">Based on the recording you just experienced</p>
      <h2 class="question-title">${escapeHtml(scenario.question)}</h2>
      <fieldset class="answer-list"><legend class="sr-only">Choose one answer</legend>
        ${scenario.choices.map((choice, optionIndex) => `<label class="answer-option ${current === optionIndex ? "selected" : ""}">
          <input type="radio" name="answer" value="${optionIndex}" ${current === optionIndex ? "checked" : ""}>
          <span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span>
          <span class="answer-text">${escapeHtml(choice)}</span>
          <span class="answer-check" aria-hidden="true">✓</span>
        </label>`).join("")}
      </fieldset>
      <p class="question-helper">Select one answer to continue. You can go back to replay the recording.</p>
    </div>`;
  }

  function renderDetails() {
    const info = content.personalDetails;
    const anonymous = state.identityMode === "anonymous";
    return `<div class="page-content details-content">
      ${heading(info.eyebrow, info.title)}
      <p class="content-lede">${escapeHtml(info.description)}</p>
      <div class="identity-list" role="group" aria-label="Personal information preferences">
        <label class="identity-choice ${anonymous ? "selected" : ""}"><input type="radio" name="identity" value="anonymous" ${anonymous ? "checked" : ""}><span class="identity-choice-body"><strong>Continue without personal details</strong><small>Do not attach a name or email address to my answers.</small></span></label>
        <label class="identity-choice ${!anonymous ? "selected" : ""}"><input type="radio" name="identity" value="details" ${!anonymous ? "checked" : ""}><span class="identity-choice-body"><strong>Share optional personal details</strong><small>You choose which fields to complete.</small></span></label>
      </div>
      <div class="form-fields" id="personal-fields" ${anonymous ? "hidden" : ""}>
        <label><span>Name <em>(optional)</em></span><input id="personal-name" autocomplete="name" type="text" maxlength="120" placeholder="Your name" value="${escapeHtml(state.details.name)}"></label>
        <label><span>Email <em>(optional)</em></span><input id="personal-email" autocomplete="email" type="email" maxlength="254" placeholder="name@example.com" value="${escapeHtml(state.details.email)}"></label>
        <label><span>Age group <em>(optional)</em></span><select id="personal-age"><option value="">Prefer not to say / choose...</option>${["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"].map(x => `<option value="${escapeHtml(x)}" ${state.details.ageRange === x ? "selected" : ""}>${escapeHtml(x)}</option>`).join("")}</select></label>
      </div>
      <div class="privacy-note"><strong>Privacy reminder</strong><p>If you choose to continue without personal details, the form will not ask for your name or email. Website and hosting services may still process technical access data.</p></div>
      <div id="submit-error" role="alert" class="form-error" hidden></div>
    </div>`;
  }

  function renderComplete() {
    return `<div class="page-content complete-content"><div class="success-icon">✓</div>
      ${heading(state.demo ? "LOCAL TEST COMPLETED" : "RESPONSES SUBMITTED", state.demo ? "Test responses downloaded." : "Your responses have been received.")}
      <div class="prose"><p>${state.demo ? "You are currently in demo mode. A JSON file was downloaded to your computer; nothing has been sent to the research team. Connect Supabase before sharing this questionnaire with participants." : "Thank you for contributing to this research. You can now close this page."}</p></div>
      <div class="callout"><span aria-hidden="true">✓</span><p>${scenarios.length} video questions completed</p></div>
    </div>`;
  }

  function render() {
    const screen = sequence[state.position];
    renderSidebar();
    renderProgress();
    const pageHtml = {
      welcome: () => renderWelcome(),
      context: () => renderTextPage(content.contextPages[screen.index], "◌"),
      intro: () => renderTextPage(screen.group === "led" ? content.ledIntro : content.soundIntro, screen.group === "led" ? "◎" : "♫"),
      video: () => renderVideo(screen),
      question: () => renderQuestion(screen),
      thanks: () => renderTextPage(content.thankYou, "✓"),
      details: () => renderDetails(),
      complete: () => renderComplete()
    }[screen.kind];
    page.innerHTML = pageHtml();

    const atStart = state.position === 0;
    const atEnd = screen.kind === "complete";
    if (atEnd) {
      controls.innerHTML = `<span class="submitted-indicator">✓ ${state.demo ? "Demo finished" : "Submission complete"}</span>`;
      footerNote.textContent = state.demo ? "Demo mode — no responses were transmitted" : "Thank you for participating";
      return;
    }
    const nextLabel = screen.kind === "welcome" ? "Begin study" :
      screen.kind === "video" ? "Continue to question" :
      screen.kind === "details" ? (isConfigured() ? "Submit responses" : "Download test responses") :
      screen.kind === "thanks" ? "Personal details" : "Continue";
    controls.innerHTML = `<button type="button" class="btn btn-secondary" id="prev-button" ${atStart ? "disabled" : ""}>← Back</button>
      <button type="button" class="btn btn-primary" id="next-button">${escapeHtml(nextLabel)} <span aria-hidden="true">→</span></button>`;
    document.querySelector("#prev-button").addEventListener("click", () => navigate(-1));
    document.querySelector("#next-button").addEventListener("click", onNext);
    if (screen.kind === "welcome") {
      const checkbox = document.querySelector("#consent-checkbox");
      checkbox.addEventListener("change", e => { state.consent = e.target.checked; updateNextAvailability(); });
    }
    if (screen.kind === "video") setupVideo(screen);
    if (screen.kind === "question") {
      document.querySelectorAll('input[name="answer"]').forEach(input => input.addEventListener("change", e => {
        state.answers[screen.scenario.id] = Number(e.target.value);
        document.querySelectorAll(".answer-option").forEach(el => el.classList.toggle("selected", el.querySelector("input").checked));
        updateNextAvailability();
        renderSidebar();
      }));
    }
    if (screen.kind === "details") setupDetails();
    updateNextAvailability();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function setupVideo(screen) {
    const video = document.querySelector("#stimulus-video");
    const toggle = document.querySelector("#play-toggle");
    const status = document.querySelector("#video-status");
    const fill = document.querySelector("#video-timeline-fill");
    const placeholder = document.querySelector("#video-placeholder");
    const id = screen.scenario.id;
    const audioArt = document.querySelector("#audio-art");
    const ledSilent = screen.group === "led";

    // LED lightbar stimuli must NEVER play audio. This applies to all 16 LED
    // scenarios, even when the source MP4 contains an audio track.
    // No native media controls are exposed, and volume changes are re-muted.
    function enforceLedMute() {
      if (!ledSilent) return;
      if (!video.muted) video.muted = true;
      if (video.volume !== 0) video.volume = 0;
    }
    if (ledSilent) {
      video.defaultMuted = true;
      enforceLedMute();
      video.addEventListener("volumechange", enforceLedMute);
      video.addEventListener("loadedmetadata", enforceLedMute);
      video.addEventListener("play", enforceLedMute);
    }

    function showMissingVideo() {
      state.missingVideos[id] = true;
      video.hidden = true;
      if (audioArt) audioArt.hidden = true;
      placeholder.hidden = false;
      toggle.hidden = true;
      status.textContent = "Recording unavailable in this preview.";
      document.querySelector("#next-button").innerHTML = 'Continue preview <span aria-hidden="true">→</span>';
      updateNextAvailability();
    }

    video.addEventListener("error", showMissingVideo);
    const mediaLabel = video.tagName.toLowerCase() === "audio" ? "audio" : "video";

    // Start media immediately upon entering a scenario. Because this is called
    // synchronously from the participant's Continue/Back click, sound playback
    // is allowed in many browsers. Some browsers still block audible autoplay.
    // If so, preserve a visible Play button rather than muting the sound stimulus.
    function startPlayback(automatic = false) {
      enforceLedMute();
      let playRequest;
      try {
        playRequest = video.play();
      } catch (error) {
        handlePlayFailure(error, automatic);
        return;
      }
      if (playRequest && typeof playRequest.catch === "function") {
        playRequest.catch(error => handlePlayFailure(error, automatic));
      }
    }

    function handlePlayFailure(error, automatic) {
      if (!video.isConnected || state.missingVideos[id]) return;
      if (error?.name === "AbortError") return; // e.g. navigating away mid-load
      toggle.textContent = `▶ Play ${mediaLabel}`;
      if (automatic && error?.name === "NotAllowedError") {
        status.textContent = `Your browser blocked automatic ${mediaLabel} playback. Press Play ${mediaLabel} to continue.`;
      } else {
        status.textContent = `Playback could not start. Press Play ${mediaLabel} to retry.`;
      }
    }

    toggle.addEventListener("click", () => {
      if (video.paused) startPlayback();
      else video.pause();
    });
    video.addEventListener("play", () => {
      toggle.textContent = `Ⅱ Pause ${mediaLabel}`;
      status.textContent = "Recording playing…";
    });
    video.addEventListener("pause", () => {
      toggle.textContent = video.ended ? `↻ Replay ${mediaLabel}` : `▶ Resume ${mediaLabel}`;
      if (!video.ended && !state.watched[id]) status.textContent = "Recording paused. Finish playback to continue.";
    });
    video.addEventListener("timeupdate", () => {
      if (Number.isFinite(video.duration) && video.duration > 0) fill.style.width = `${Math.min(100, video.currentTime / video.duration * 100)}%`;
    });
    video.addEventListener("ended", () => {
      state.watched[id] = true;
      status.textContent = "✓ Recording finished — you can continue or replay.";
      toggle.textContent = `↻ Replay ${mediaLabel}`;
      fill.style.width = "100%";
      updateNextAvailability();
    });
    if (state.missingVideos[id]) showMissingVideo();
    else startPlayback(true);
  }

  function setupDetails() {
    const identityInputs = document.querySelectorAll('input[name="identity"]');
    const fields = document.querySelector("#personal-fields");
    identityInputs.forEach(input => input.addEventListener("change", e => {
      state.identityMode = e.target.value;
      fields.hidden = state.identityMode === "anonymous";
      document.querySelectorAll(".identity-choice").forEach(el => el.classList.toggle("selected", el.querySelector("input").checked));
    }));
    for (const [selector, key] of [["#personal-name", "name"], ["#personal-email", "email"], ["#personal-age", "ageRange"]]) {
      document.querySelector(selector).addEventListener("input", e => { state.details[key] = e.target.value; });
    }
  }

  function updateNextAvailability() {
    const screen = sequence[state.position];
    const next = document.querySelector("#next-button");
    if (!next) return;
    next.disabled = state.isSending ||
      (screen.kind === "welcome" && !state.consent) ||
      (screen.kind === "video" && !state.watched[screen.scenario.id] && !state.missingVideos[screen.scenario.id]) ||
      (screen.kind === "question" && state.answers[screen.scenario.id] === undefined);
  }

  function navigate(offset) {
    const screen = sequence[state.position];
    if (screen.kind === "video") document.querySelector("#stimulus-video")?.pause();
    state.position = Math.max(0, Math.min(sequence.length - 1, state.position + offset));
    render();
  }

  function isConfigured() {
    return Boolean(backend.supabaseUrl?.trim() && backend.publishableKey?.trim());
  }

  function buildPayload() {
    return {
      participant_id: state.participantId,
      form_version: content.project.version,
      consent: state.consent,
      participation_mode: state.identityMode,
      personal_details: state.identityMode === "details" ? {
        name: state.details.name.trim() || null,
        email: state.details.email.trim() || null,
        age_range: state.details.ageRange || null
      } : null,
      answers: scenarios.map(s => ({
        scenario_id: s.id,
        section: s.id.startsWith("led") ? "led" : "sound",
        question: s.question,
        answer_index: state.answers[s.id],
        answer_text: s.choices[state.answers[s.id]],
        video_filename: s.video,
        media_type: /\.mp3(?:[?#].*)?$/i.test(s.video) ? "audio" : "video",
        video_completed: Boolean(state.watched[s.id]),
        demo_video_missing: Boolean(state.missingVideos[s.id])
      }))
    };
  }

  function downloadDemoJson(payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = `asf-demo-${payload.participant_id}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
  }

  async function submitResponses() {
    const emailField = document.querySelector("#personal-email");
    if (state.identityMode === "details" && emailField.value && !emailField.checkValidity()) {
      emailField.reportValidity();
      return;
    }
    const error = document.querySelector("#submit-error");
    error.hidden = true;
    if (scenarios.some(s => state.answers[s.id] === undefined)) {
      error.textContent = "Please complete all scenario questions before submitting.";
      error.hidden = false;
      return;
    }
    const payload = buildPayload();
    if (isConfigured() && scenarios.some(s => state.missingVideos[s.id])) {
      error.textContent = "This questionnaire is not ready for real submissions: one or more simulation video files are missing. Please contact the research team.";
      error.hidden = false;
      return;
    }
    if (!backend.supabaseUrl?.trim() && !backend.publishableKey?.trim()) {
      downloadDemoJson(payload);
      state.demo = true;
      state.submitted = true;
      navigate(1);
      return;
    }
    if (!isConfigured()) {
      error.textContent = "Supabase configuration is incomplete. Set both values in js/config.js.";
      error.hidden = false;
      return;
    }
    state.isSending = true;
    const next = document.querySelector("#next-button");
    next.textContent = "Submitting…";
    updateNextAvailability();
    try {
      const base = backend.supabaseUrl.trim().replace(/\/$/, "");
      const response = await fetch(`${base}/rest/v1/asf_responses`, {
        method: "POST",
        headers: {
          apikey: backend.publishableKey.trim(),
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`Server returned HTTP ${response.status}.`);
      state.submitted = true;
      state.demo = false;
      navigate(1);
    } catch (reason) {
      error.textContent = `Could not submit responses. Please check your connection and try again. ${reason.message || ""}`;
      error.hidden = false;
      next.innerHTML = 'Submit responses <span aria-hidden="true">→</span>';
    } finally {
      state.isSending = false;
      updateNextAvailability();
    }
  }

  function onNext() {
    const screen = sequence[state.position];
    if (screen.kind === "details") { void submitResponses(); return; }
    if (screen.kind === "welcome" && !state.consent) return;
    if (screen.kind === "question" && state.answers[screen.scenario.id] === undefined) return;
    if (screen.kind === "video" && !state.watched[screen.scenario.id] && !state.missingVideos[screen.scenario.id]) return;
    navigate(1);
  }

  render();
})();
