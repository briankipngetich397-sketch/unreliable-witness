// The Unreliable Witness - front end.
// All game state lives in the browser; the server only holds secrets and the API key.
// Artwork lives in art.js. This file wires it to the game: talking mouths, nervous
// faces, flickering lights and so on.

const $ = id => document.getElementById(id);

const state = {
  caseData: null,
  activeId: null,
  transcripts: {},   // suspectId -> [{ role: 'user' | 'assistant', content }]
  pins: [],          // { suspectName, text }
  questionsLeft: 0,
  busy: false,
  finished: false
};

const NOTES_KEY = 'unreliable-witness-notes';

// ---------------------------------------------------------------------------
// Stage: scene + character animation
// ---------------------------------------------------------------------------

// Builds the animated layers inside a ".stage" element and returns the portrait
// wrapper (or null when no character is shown).
function mountStage(host, sceneId, personId) {
  const old = host.querySelector('.stage-art');
  if (old) old.remove();

  const art = document.createElement('div');
  art.className = 'stage-art';
  const blink = (3.6 + Math.random() * 3.4).toFixed(1) + 's';
  const delay = (-Math.random() * 5).toFixed(1) + 's';
  const person = personId
    ? `<div class="portrait-wrap" style="--blink:${blink};--blink-delay:${delay}">${Art.portrait(personId)}</div>`
    : '';
  art.innerHTML = `<div class="scene">${Art.scene(sceneId)}</div><div class="spot"></div>${person}${Art.motes()}`;
  host.prepend(art);
  return art.querySelector('.portrait-wrap');
}

function currentPortrait() {
  return document.querySelector('#stage .portrait-wrap');
}

function setTalking(on) {
  const w = currentPortrait();
  if (w) w.classList.toggle('talking', on);
}

function setThinking(on) {
  const w = currentPortrait();
  if (w) w.classList.toggle('thinking', on);
}

// Everyone gets more nervous the more they are questioned. It is based only on
// how many questions they have faced, so it never hints at who is guilty.
function setTension(asked) {
  const w = currentPortrait();
  if (!w) return;
  w.classList.toggle('tense', asked >= 3);
  w.classList.toggle('very-tense', asked >= 5);
}

function askedOf(id) {
  return (state.transcripts[id] || []).filter(m => m.role === 'user').length;
}

// Brief lights-out effect, like the blackout at 9:10 PM.
function flicker(host) {
  if (!host) return;
  host.classList.remove('flicker');
  void host.offsetWidth; // restart the animation
  host.classList.add('flicker');
  setTimeout(() => host.classList.remove('flicker'), 1600);
}

// ---------------------------------------------------------------------------
// Counter, suspects list, chat
// ---------------------------------------------------------------------------

function questionsAsked() {
  return Object.values(state.transcripts)
    .reduce((n, t) => n + t.filter(m => m.role === 'user').length, 0);
}

function updateCounter() {
  state.questionsLeft = state.caseData.maxQuestions - questionsAsked();
  $('qLeft').textContent = state.questionsLeft;
  const out = state.questionsLeft <= 0;
  $('askInput').disabled = out || !state.activeId || state.busy || state.finished;
  $('askBtn').disabled = $('askInput').disabled;
  if (out && !state.finished) $('askInput').placeholder = 'Out of questions. Make your accusation.';
}

function renderSuspects() {
  const list = $('suspectList');
  list.innerHTML = '';
  for (const s of state.caseData.suspects) {
    const asked = askedOf(s.id);
    const btn = document.createElement('button');
    btn.className = 'suspect-card' + (s.id === state.activeId ? ' active' : '');
    btn.innerHTML = `<div class="avatar"></div><div class="txt"><strong></strong><span></span></div>`;
    btn.querySelector('.avatar').innerHTML = Art.portrait(s.id, { mini: true });
    btn.querySelector('strong').textContent = s.name;
    btn.querySelector('span').textContent = s.role;
    if (asked) {
      const tag = document.createElement('em');
      tag.className = 'asked';
      tag.textContent = asked + ' asked';
      btn.querySelector('.txt').appendChild(tag);
    }
    btn.addEventListener('click', () => selectSuspect(s.id));
    list.appendChild(btn);
  }
}

function addMessage(kind, text, extraClass) {
  const div = document.createElement('div');
  div.className = 'msg ' + kind + (extraClass ? ' ' + extraClass : '');
  div.textContent = text;
  $('chat').appendChild(div);
  $('chat').scrollTop = $('chat').scrollHeight;
  return div;
}

function renderChat() {
  $('chat').innerHTML = '';
  const suspect = state.caseData.suspects.find(s => s.id === state.activeId);
  const t = state.transcripts[state.activeId] || [];
  if (!t.length) {
    addMessage('typing', `${suspect.bio}\n\nAsk your first question.`);
    return;
  }
  for (const m of t) {
    if (m.role === 'user') addMessage('you', m.content);
    else attachPin(addMessage('them', m.content), suspect.name, m.content);
  }
}

function attachPin(el, name, text) {
  el.title = 'Click to pin to your notebook';
  if (state.pins.some(p => p.text === text && p.suspectName === name)) el.classList.add('pinned');
  el.addEventListener('click', () => {
    const idx = state.pins.findIndex(p => p.text === text && p.suspectName === name);
    if (idx >= 0) state.pins.splice(idx, 1);
    else state.pins.push({ suspectName: name, text });
    el.classList.toggle('pinned');
    renderPins();
  });
}

function renderPins() {
  const box = $('pins');
  box.innerHTML = '';
  if (!state.pins.length) {
    box.innerHTML = '<p class="muted">Pinned statements will appear here.</p>';
    return;
  }
  for (const p of state.pins) {
    const d = document.createElement('div');
    d.className = 'pin';
    const b = document.createElement('b');
    b.textContent = p.suspectName;
    const t = document.createElement('span');
    t.textContent = p.text;
    d.append(b, t);
    box.appendChild(d);
  }
}

function selectSuspect(id) {
  state.activeId = id;
  const s = state.caseData.suspects.find(x => x.id === id);
  $('activeName').textContent = s.name;
  $('activeRole').textContent = s.role;
  $('askInput').placeholder = 'Ask ' + s.name.replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, '').split(' ')[0] + ' a question...';
  mountStage($('stage'), id, id);
  setTension(askedOf(id));
  if (state.busy) setThinking(true);
  renderSuspects();
  renderChat();
  updateCounter();
  if (!$('askInput').disabled) $('askInput').focus();
}

// Types a reply out letter by letter while the character's mouth moves.
// Clicking the bubble while it types shows the full text at once.
function typeText(el, text) {
  return new Promise(resolve => {
    let i = 0;
    let done = false;
    let timer = null;
    const finish = () => {
      if (done) return;
      done = true;
      clearInterval(timer);
      el.textContent = text;
      setTalking(false);
      $('chat').scrollTop = $('chat').scrollHeight;
      resolve();
    };
    el.addEventListener('click', finish, { once: true });
    setTalking(true);
    timer = setInterval(() => {
      if (!el.isConnected) return finish();
      i += Math.random() < 0.3 ? 2 : 1;
      el.textContent = text.slice(0, i);
      $('chat').scrollTop = $('chat').scrollHeight;
      if (i >= text.length) finish();
    }, 24);
  });
}

async function ask(message) {
  const id = state.activeId;
  const name = state.caseData.suspects.find(s => s.id === id).name;
  if (!state.transcripts[id]) state.transcripts[id] = [];

  // First message clears the intro placeholder.
  if (!state.transcripts[id].length) $('chat').innerHTML = '';

  if (/light|dark|camera|breaker|blackout|power|9:10/i.test(message)) flicker($('stage'));

  addMessage('you', message);
  const typing = addMessage('them', `${name} is thinking...`, 'typing');
  state.busy = true;
  setThinking(true);
  updateCounter();

  try {
    const res = await fetch('/api/interview', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // The server keeps the conversations itself, so only the new question is sent.
      body: JSON.stringify({ suspectId: id, message })
    });
    const data = await res.json();
    typing.remove();
    setThinking(false);
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');

    const askedBefore = questionsAsked();
    state.transcripts[id].push({ role: 'user', content: message });
    state.transcripts[id].push({ role: 'assistant', content: data.reply });

    // If the server's count is behind ours, the game server restarted (free hosts do this
    // after a quiet spell) and forgot earlier interviews. Say so instead of confusing the player.
    if (typeof data.asked === 'number' && data.asked < askedBefore + 1) {
      addMessage('error', 'The game server was asleep and restarted, so the suspects have forgotten your earlier conversations. Your notebook is safe.');
    }
    if (state.activeId === id) setTension(askedOf(id));

    const el = addMessage('them', '');
    await typeText(el, data.reply);
    attachPin(el, name, data.reply);
  } catch (err) {
    typing.remove();
    setThinking(false);
    // Remove the question we echoed, since it was not counted.
    const bubbles = $('chat').querySelectorAll('.msg.you');
    if (bubbles.length) bubbles[bubbles.length - 1].remove();
    addMessage('error', err.message);
  } finally {
    state.busy = false;
    setThinking(false);
    renderSuspects();
    updateCounter();
    if (!$('askInput').disabled) $('askInput').focus();
  }
}

// ---------------------------------------------------------------------------
// Accusation
// ---------------------------------------------------------------------------

function openAccuseDialog() {
  const box = $('accuseOptions');
  box.innerHTML = '';
  state.caseData.suspects.forEach((s, i) => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'accused';
    radio.value = s.id;
    if (i === 0) radio.checked = true;
    label.append(radio, document.createTextNode(` ${s.name}, ${s.role}`));
    box.appendChild(label);
  });
  $('accuseDialog').showModal();
}

async function submitAccusation(suspectId) {
  try {
    const res = await fetch('/api/accuse', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ suspectId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');
    showResult(data);
  } catch (err) {
    addMessage('error', err.message);
  }
}

// Shows the verdict and reveals the thief. Also used to restore a finished game after a refresh.
function showResult(data) {
  {
    state.finished = true;
    updateCounter();

    const body = $('resultBody');
    body.innerHTML = '';
    const h = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    if (data.correct) {
      h.className = 'win';
      h.textContent = 'Case closed. You got them.';
      p1.textContent = `${data.accused} is the thief.`;
    } else {
      h.className = 'lose';
      h.textContent = 'Wrong person.';
      p1.textContent = `You accused ${data.accused}, but the real thief was ${data.culprit}.`;
    }
    p2.textContent = data.explanation;
    body.append(h, p1, p2);

    // Reveal the thief, under the spotlight and visibly rattled.
    const culprit = state.caseData.suspects.find(s => s.name === data.culprit);
    const stage = $('resultStage');
    if (culprit) {
      const wrap = mountStage(stage, culprit.id, culprit.id);
      if (wrap) wrap.classList.add('tense', 'very-tense');
      stage.classList.remove('hidden');
    } else {
      stage.classList.add('hidden');
    }
    $('resultDialog').showModal();
    flicker(stage);
  }
}

// ---------------------------------------------------------------------------
// Notes, setup
// ---------------------------------------------------------------------------

function loadNotes() {
  try { $('notes').value = localStorage.getItem(NOTES_KEY) || ''; } catch (_) {}
}
function saveNotes() {
  try { localStorage.setItem(NOTES_KEY, $('notes').value); } catch (_) {}
}

async function init() {
  await Art.loadPhotos();
  const res = await fetch('/api/case');
  state.caseData = await res.json();
  document.title = state.caseData.title + ' | The Unreliable Witness';
  $('caseTitle').textContent = state.caseData.title;
  $('caseSetting').textContent = state.caseData.setting;
  $('introText').textContent = state.caseData.intro;
  $('qLeft').textContent = state.caseData.maxQuestions;
  loadNotes();

  // The server remembers each player's game, so a refresh or a returning player picks up
  // where they left off (and cannot get extra questions by reloading the page).
  try {
    const st = await (await fetch('/api/state')).json();
    state.transcripts = st.transcripts || {};
    state.pendingResult = st.accused || null;
    if (questionsAsked() > 0 || st.accused) {
      $('startBtn').textContent = 'Continue the investigation';
      $('qLeft').textContent = Math.max(0, state.caseData.maxQuestions - questionsAsked());
    }
  } catch (_) { /* start a fresh game */ }

  // Opening shot: the gallery wall with the empty space where the painting hung.
  const hero = $('introStage');
  mountStage(hero, 'hero', null);
  const cap = document.createElement('div');
  cap.className = 'hero-caption';
  cap.textContent = 'Rift Gallery, Nairobi · 9:10 PM';
  hero.appendChild(cap);
  setTimeout(() => flicker(hero), 900);
}

$('startBtn').addEventListener('click', () => {
  $('briefing').classList.add('hidden');
  $('game').classList.remove('hidden');
  mountStage($('stage'), 'hero', null);
  flicker($('stage'));
  renderSuspects();
  renderPins();
  updateCounter();
  if (state.pendingResult) showResult(state.pendingResult);
});

$('askForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = $('askInput').value.trim();
  if (!msg || state.busy || !state.activeId || state.questionsLeft <= 0) return;
  $('askInput').value = '';
  ask(msg);
});

$('notes').addEventListener('input', saveNotes);
$('accuseBtn').addEventListener('click', openAccuseDialog);

$('accuseForm').addEventListener('submit', e => {
  const submitter = e.submitter;
  if (submitter && submitter.value === 'confirm') {
    const chosen = document.querySelector('input[name="accused"]:checked');
    if (chosen) submitAccusation(chosen.value);
  }
});

// Starts a brand new game: the server forgets this player's interviews, then the page reloads.
$('playAgain').addEventListener('click', async () => {
  try {
    await fetch('/api/reset', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}'
    });
  } catch (_) { /* reload anyway */ }
  location.reload();
});

init().catch(() => {
  $('introText').textContent = 'Could not load the case. Is the server running?';
  $('startBtn').disabled = true;
});
