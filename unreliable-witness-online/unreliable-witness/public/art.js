// The Unreliable Witness - artwork.
// Characters and scenes are drawn as layered SVG so they can be animated with CSS.
// Want photos instead? Drop files into public/img (see IMAGE-PROMPTS.md). Any photo
// that exists replaces the matching drawing and keeps the same animations.

(function () {
  let counter = 0;
  const newUid = () => 'u' + (++counter);

  // ------------------------------------------------------------------
  // CHARACTERS
  // ------------------------------------------------------------------
  const PEOPLE = {
    amina: {
      skin: '#a5683f', skinLight: '#bf8458', skinShade: '#7a4527',
      brow: '#24150f', iris: '#4a2c1a', lip: '#7a2f35',
      top: '#3b2c4a', topShade: '#241a2e',
      cloth: '#8a3a72', clothShade: '#5a2349', gold: '#e0b04a'
    },
    brian: {
      skin: '#6e4329', skinLight: '#8a5a3a', skinShade: '#4a2a17',
      brow: '#140c08', iris: '#2b1a10', lip: '#4d2320',
      top: '#8fb2d4', topShade: '#6a8fb3',
      cloth: '#1f3558', clothShade: '#142339', gold: '#e0b04a'
    },
    wanjiru: {
      skin: '#8a5634', skinLight: '#a56d46', skinShade: '#5e3720',
      brow: '#150e0b', iris: '#3a2214', lip: '#8a2f3a',
      top: '#a8472a', topShade: '#762f1b',
      cloth: '#e6dccb', clothShade: '#cbbfa8', gold: '#e0b04a'
    },
    otieno: {
      skin: '#5f3b26', skinLight: '#7b4f33', skinShade: '#3e2415',
      brow: '#8f8a82', iris: '#2a1a10', lip: '#45201d',
      top: '#2a2b34', topShade: '#17181e',
      cloth: '#a31e2b', clothShade: '#6e1019', gold: '#d6b25a'
    }
  };

  function defs(u, p) {
    return `<defs>
      <radialGradient id="${u}f" cx="45%" cy="36%" r="72%">
        <stop offset="0" stop-color="${p.skinLight}"/><stop offset=".55" stop-color="${p.skin}"/><stop offset="1" stop-color="${p.skinShade}"/>
      </radialGradient>
      <linearGradient id="${u}n" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.skinShade}"/><stop offset="1" stop-color="${p.skin}"/>
      </linearGradient>
      <linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.top}"/><stop offset="1" stop-color="${p.topShade}"/>
      </linearGradient>
      <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.cloth}"/><stop offset="1" stop-color="${p.clothShade}"/>
      </linearGradient>
    </defs>`;
  }

  // Everything drawn BEHIND the head (hair mass, headscarf, collar backs).
  function behind(id, p, u) {
    if (id === 'amina') {
      return `<path d="M44 112 C36 52 68 26 100 26 C132 26 164 52 156 112 C154 146 142 172 132 188 L68 188 C58 172 46 146 44 112 Z" fill="url(#${u}c)"/>`;
    }
    if (id === 'wanjiru') {
      const bumps = [[56,62,20],[78,44,22],[104,38,24],[130,46,22],[148,66,20],[44,92,18],[158,94,18],[52,120,15],[150,122,15]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#150e0b"/>`).join('');
      return `<ellipse cx="100" cy="86" rx="62" ry="58" fill="#150e0b"/>${bumps}
        <ellipse cx="100" cy="60" rx="40" ry="14" fill="#2a1d17" opacity=".55"/>`;
    }
    return '';
  }

  // Torso, shoulders and clothing.
  function torso(id, p, u) {
    const base = `<path d="M6 262 C6 208 44 186 100 183 C156 186 194 208 194 262 Z" fill="url(#${u}t)"/>`;
    if (id === 'amina') {
      return `<path d="M6 262 C6 208 44 186 100 183 C156 186 194 208 194 262 Z" fill="url(#${u}t)"/>`;
    }
    if (id === 'brian') {
      return `${base}
        <path d="M70 186 L100 214 L130 186 L120 182 L100 200 L80 182 Z" fill="#eef3f8"/>
        <path d="M96 204 L104 204 L108 250 L100 258 L92 250 Z" fill="#1f3558"/>
        <path d="M10 236 C10 214 30 200 52 194 L60 214 C40 222 28 236 28 262 L10 262 Z" fill="${p.cloth}"/>
        <path d="M190 236 C190 214 170 200 148 194 L140 214 C160 222 172 236 172 262 L190 262 Z" fill="${p.cloth}"/>
        <rect x="46" y="204" width="22" height="7" rx="3" fill="${p.gold}" transform="rotate(-18 57 207)"/>
        <rect x="132" y="204" width="22" height="7" rx="3" fill="${p.gold}" transform="rotate(18 143 207)"/>
        <path d="M122 222 l9 0 l3 8 l-7.5 6 l-7.5 -6 z" fill="${p.gold}"/>`;
    }
    if (id === 'wanjiru') {
      const splat = [[78,228,4,'#e0a030'],[118,236,5,'#1e8a8a'],[96,248,3,'#c9302c'],[132,222,3,'#3a6ab0'],[70,250,4,'#6a3a8a'],[110,226,2.5,'#e0a030']]
        .map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');
      return `${base}
        <path d="M64 188 L136 188 L152 262 L48 262 Z" fill="url(#${u}c)"/>
        <path d="M76 186 L72 214 M124 186 L128 214" stroke="${p.clothShade}" stroke-width="4" fill="none"/>${splat}`;
    }
    if (id === 'otieno') {
      return `${base}
        <path d="M84 184 L100 236 L116 184 Z" fill="#f2efe9"/>
        <path d="M84 184 L56 200 L84 262 L96 262 L100 236 Z" fill="#1d1e25"/>
        <path d="M116 184 L144 200 L116 262 L104 262 L100 236 Z" fill="#1d1e25"/>
        <path d="M44 226 l16 -4 l3 10 l-17 3 z" fill="#f7f3ee"/><path d="M48 228 l10 -2 l1 4 l-11 2 z" fill="${p.cloth}"/>`;
    }
    return base;
  }

  // Things drawn OVER the head and neck (hairline, cap, glasses, beard...).
  function front(id, p, u) {
    if (id === 'amina') {
      return `<path d="M54 92 C58 58 80 44 100 44 C120 44 142 58 146 92 C134 72 118 66 100 66 C82 66 66 72 54 92 Z" fill="url(#${u}c)"/>
        <path d="M24 214 C46 184 80 176 100 192 C120 176 154 184 176 214 L192 262 L8 262 Z" fill="url(#${u}c)"/>
        <path d="M100 192 C96 220 92 240 90 262 M100 192 C106 218 112 240 118 262" stroke="${p.clothShade}" stroke-width="2" fill="none" opacity=".7"/>
        <circle cx="132" cy="206" r="6" fill="${p.gold}"/><circle cx="130.5" cy="204.5" r="2" fill="#fff6d6" opacity=".9"/>`;
    }
    if (id === 'brian') {
      return `<path d="M52 90 C52 50 76 38 100 38 C124 38 148 50 148 90 Q100 78 52 90 Z" fill="url(#${u}c)"/>
        <path d="M54 86 Q100 100 146 86 L144 94 Q100 108 56 94 Z" fill="${p.clothShade}"/>
        <path d="M88 52 l12 -8 l12 8 l-3 14 l-9 5 l-9 -5 z" fill="${p.gold}" opacity=".95"/>
        <path d="M82 138 Q100 134 118 138" stroke="${p.skinShade}" stroke-width="5" stroke-linecap="round" fill="none" opacity=".35"/>`;
    }
    if (id === 'wanjiru') {
      return `<path d="M56 88 Q100 58 144 88 L143 97 Q100 68 57 97 Z" fill="#e0a030"/>
        <path d="M60 94 Q100 66 140 94" stroke="#1e8a8a" stroke-width="3" fill="none" stroke-dasharray="7 5"/>
        <path d="M146 112 L180 58" stroke="#c9a36a" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M176 64 L181 56" stroke="#d6402f" stroke-width="3.6" stroke-linecap="round"/>
        <circle cx="52" cy="134" r="4.2" fill="#1e8a8a"/><circle cx="148" cy="134" r="4.2" fill="#1e8a8a"/>
        <circle cx="52" cy="143" r="3" fill="${p.gold}"/><circle cx="148" cy="143" r="3" fill="${p.gold}"/>`;
    }
    if (id === 'otieno') {
      return `<path d="M57 100 C50 84 54 70 63 66 C59 80 59 92 62 106 Z" fill="#cfcac0"/>
        <path d="M143 100 C150 84 146 70 137 66 C141 80 141 92 138 106 Z" fill="#cfcac0"/>
        <ellipse cx="100" cy="62" rx="22" ry="8" fill="#fff" opacity=".16"/>
        <circle cx="82" cy="104" r="14" fill="rgba(255,255,255,.05)" stroke="${p.gold}" stroke-width="2.2"/>
        <circle cx="118" cy="104" r="14" fill="rgba(255,255,255,.05)" stroke="${p.gold}" stroke-width="2.2"/>
        <path d="M96 102 Q100 98 104 102 M68 103 L58 105 M132 103 L142 105" stroke="${p.gold}" stroke-width="2" fill="none"/>
        <path d="M82 138 Q91 131 100 135 Q109 131 118 138 Q109 143 100 140 Q91 143 82 138 Z" fill="#d6d1c7"/>
        <path d="M90 152 Q100 170 110 152 Q100 157 90 152 Z" fill="#d6d1c7"/>
        <path d="M86 183 L100 190 L114 183 L108 194 L100 191 L92 194 Z" fill="${p.cloth}"/>
        <circle cx="100" cy="190" r="3.6" fill="${p.clothShade}"/>`;
    }
    return '';
  }

  function face(id, p, u) {
    const eye = cx => `<g class="eye">
        <ellipse cx="${cx}" cy="104" rx="9.6" ry="6.3" fill="#f3eee6"/>
        <g class="pupils">
          <circle cx="${cx}" cy="104" r="4.7" fill="${p.iris}"/>
          <circle cx="${cx}" cy="104" r="2.3" fill="#0c0908"/>
          <circle cx="${cx + 1.7}" cy="102.4" r="1.15" fill="#fff"/>
        </g>
        <ellipse class="lid" cx="${cx}" cy="104" rx="10.6" ry="7.2" fill="${p.skin}"/>
        <path d="M${cx - 10} 103.5 Q${cx} 96 ${cx + 10} 103.5" stroke="${p.skinShade}" stroke-width="1.7" fill="none" opacity=".75"/>
      </g>`;
    return `
      <ellipse cx="55" cy="112" rx="7" ry="11" fill="${p.skinShade}"/><ellipse cx="145" cy="112" rx="7" ry="11" fill="${p.skinShade}"/>
      <path d="M84 148 L84 190 Q100 204 116 190 L116 148 Z" fill="url(#${u}n)"/>
      <path d="M56 100 C56 62 76 48 100 48 C124 48 144 62 144 100 C144 138 124 168 100 168 C76 168 56 138 56 100 Z" fill="url(#${u}f)"/>
      <ellipse cx="76" cy="128" rx="9" ry="6" fill="#d8644a" opacity=".16"/><ellipse cx="124" cy="128" rx="9" ry="6" fill="#d8644a" opacity=".16"/>
      <path d="M100 108 Q95 126 91 130 Q100 135 109 130" stroke="${p.skinShade}" stroke-width="2.2" fill="none" opacity=".55" stroke-linecap="round"/>
      ${eye(82)}${eye(118)}
      <path class="brow-l" d="M69 91 Q82 84 94 90" stroke="${p.brow}" stroke-width="3.8" stroke-linecap="round" fill="none"/>
      <path class="brow-r" d="M106 90 Q118 84 131 91" stroke="${p.brow}" stroke-width="3.8" stroke-linecap="round" fill="none"/>
      <path class="lips" d="M88 146 Q100 152 112 146" stroke="${p.lip}" stroke-width="3.2" stroke-linecap="round" fill="none"/>
      <ellipse class="mouth-open" cx="100" cy="148" rx="8.6" ry="5.6" fill="#35100f"/>`;
  }

  function sweat() {
    return `<path class="sweat" d="M141 78 C141 78 134 88 134 92 A7 7 0 0 0 148 92 C148 88 141 78 141 78 Z" fill="#bfe6ff" opacity="0"/>`;
  }

  // mini=true crops to the face for the small round avatars.
  function portrait(id, opts) {
    opts = opts || {};
    const photo = Art.photos['portrait-' + id];
    if (photo) {
      return `<img class="photo" src="img/${photo}" alt="" draggable="false">`;
    }
    const p = PEOPLE[id];
    if (!p) return '';
    const u = newUid();
    const viewBox = opts.mini ? '42 24 116 116' : '0 0 200 262';
    return `<svg class="figure" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${defs(u, p)}
      <g class="body">
        ${behind(id, p, u)}
        ${torso(id, p, u)}
        <g class="head">
          ${face(id, p, u)}
          ${front(id, p, u)}
          ${sweat()}
        </g>
      </g>
    </svg>`;
  }

  // ------------------------------------------------------------------
  // SCENES (640 x 260, cropped to fit with "slice")
  // ------------------------------------------------------------------
  function seeded(seed) {
    let s = seed;
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  function galleryScene(u, withEmptyFrame) {
    const art1 = `<rect x="46" y="58" width="104" height="76" fill="url(#${u}a1)"/><circle cx="108" cy="88" r="16" fill="#f3c26a" opacity=".9"/><path d="M46 134 L86 98 L112 120 L150 90 L150 134 Z" fill="#3a2a4a" opacity=".8"/>`;
    const art2 = `<rect x="492" y="52" width="96" height="84" fill="url(#${u}a2)"/><path d="M492 100 C520 70 548 126 588 84 L588 136 L492 136 Z" fill="#0f4a56" opacity=".85"/><circle cx="560" cy="76" r="9" fill="#f6e7c1" opacity=".85"/>`;
    const frame = (x, y, w, h) => `<rect x="${x - 7}" y="${y - 7}" width="${w + 14}" height="${h + 14}" fill="#c79a4a"/><rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" fill="#6e4d1f"/>`;
    return `<svg class="scene-svg" viewBox="0 0 640 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3144"/><stop offset="1" stop-color="#1d1824"/></linearGradient>
        <linearGradient id="${u}fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d2420"/><stop offset="1" stop-color="#120e0d"/></linearGradient>
        <linearGradient id="${u}a1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f08a4b"/><stop offset="1" stop-color="#7a3a7a"/></linearGradient>
        <linearGradient id="${u}a2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f8f9a"/><stop offset="1" stop-color="#e7c36a"/></linearGradient>
        <linearGradient id="${u}cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2a8" stop-opacity=".5"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/></linearGradient>
        <filter id="${u}blur"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <rect width="640" height="260" fill="url(#${u}w)"/>
      <rect y="206" width="640" height="54" fill="url(#${u}fl)"/>
      <rect y="204" width="640" height="3" fill="#0a0808"/>
      ${frame(46, 58, 104, 76)}${art1}
      ${frame(492, 52, 96, 84)}${art2}
      ${withEmptyFrame ? `
        <g class="ghost">
          <rect x="226" y="26" width="188" height="124" fill="#463a50" opacity=".55"/>
          <rect x="226" y="26" width="188" height="124" fill="none" stroke="#e7c36a" stroke-width="1.5" stroke-dasharray="6 5" opacity=".7"/>
          <path d="M320 26 L296 6 M320 26 L344 6" stroke="#9a8a6a" stroke-width="1.3" fill="none"/>
          <circle cx="320" cy="26" r="2.4" fill="#c79a4a"/>
          <rect x="278" y="160" width="84" height="16" rx="2" fill="#c79a4a"/>
          <text x="320" y="171.5" text-anchor="middle" font-family="Georgia,serif" font-size="7.4" fill="#2a1d0a">SUNRISE OVER NGONG</text>
        </g>` : ''}
      <g filter="url(#${u}blur)" opacity=".55">
        <g class="sway"><ellipse cx="20" cy="190" rx="22" ry="44" fill="#0e0b12"/><circle cx="20" cy="140" r="14" fill="#0e0b12"/></g>
        <g class="sway s2"><ellipse cx="620" cy="190" rx="24" ry="48" fill="#0e0b12"/><circle cx="620" cy="136" r="15" fill="#0e0b12"/></g>
        <g class="sway s3"><ellipse cx="190" cy="196" rx="16" ry="36" fill="#0e0b12"/><circle cx="190" cy="158" r="11" fill="#0e0b12"/></g>
      </g>
      <rect x="0" y="0" width="640" height="7" fill="#15111a"/>
      ${[110, 250, 390, 530].map((x, i) => `
        <rect x="${x - 8}" y="7" width="16" height="9" rx="2" fill="#26202c"/>
        <polygon class="cone c${i}" points="${x - 5},16 ${x + 5},16 ${x + 62},206 ${x - 62},206" fill="url(#${u}cone)"/>`).join('')}
      <rect y="207" width="640" height="53" fill="#fff" opacity=".035"/>
    </svg>`;
  }

  function entranceScene(u) {
    return `<svg class="scene-svg" viewBox="0 0 640 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22303a"/><stop offset="1" stop-color="#111a20"/></linearGradient>
        <linearGradient id="${u}night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1230"/><stop offset="1" stop-color="#2a3f70"/></linearGradient>
        <linearGradient id="${u}lamp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd48a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd48a" stop-opacity="0"/></linearGradient>
        <radialGradient id="${u}moon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe6"/><stop offset=".4" stop-color="#fffbe6" stop-opacity=".5"/><stop offset="1" stop-color="#fffbe6" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="640" height="260" fill="url(#${u}w)"/>
      <rect y="210" width="640" height="50" fill="#0b1014"/>
      <rect x="40" y="26" width="236" height="184" fill="#0d151b"/>
      <rect x="48" y="34" width="106" height="172" fill="url(#${u}night)"/>
      <rect x="162" y="34" width="106" height="172" fill="url(#${u}night)"/>
      <circle cx="104" cy="74" r="40" fill="url(#${u}moon)"/><circle cx="104" cy="74" r="9" fill="#fffbe6"/>
      <path d="M48 206 L48 150 Q80 120 110 160 Q140 130 154 156 L154 206 Z M162 206 L162 160 Q200 128 230 164 Q250 146 268 170 L268 206 Z" fill="#0a0f1a"/>
      <rect x="153" y="34" width="10" height="172" fill="#1b2830"/>
      <rect x="48" y="118" width="106" height="4" fill="#26363f"/><rect x="162" y="118" width="106" height="4" fill="#26363f"/>
      <rect x="286" y="44" width="46" height="16" rx="3" fill="#0a1a10"/>
      <text x="309" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="10" fill="#6dff9a" class="exit">EXIT</text>
      <g transform="translate(340 40)">
        ${[0, 1, 2, 3].map(i => {
          const x = (i % 2) * 112, y = Math.floor(i / 2) * 76;
          const dead = i === 3;
          return `<rect x="${x}" y="${y}" width="104" height="68" rx="3" fill="#06090c" stroke="#33444f" stroke-width="2"/>
            <rect class="${dead ? 'screen dead' : 'screen'}" x="${x + 5}" y="${y + 5}" width="94" height="58" fill="${dead ? '#2a0c0c' : '#16313a'}"/>
            ${dead ? `<text x="${x + 52}" y="${y + 38}" text-anchor="middle" font-family="monospace" font-size="9" fill="#ff5a5a" class="nosig">NO SIGNAL</text>`
                   : `<path d="M${x + 12} ${y + 52} L${x + 40} ${y + 24} L${x + 62} ${y + 44} L${x + 90} ${y + 16}" stroke="#4fd1c5" stroke-width="1.2" fill="none" opacity=".6"/>`}`;
        }).join('')}
      </g>
      <polygon class="cone c1" points="560,0 600,0 640,210 520,210" fill="url(#${u}lamp)"/>
      <rect y="206" width="640" height="3" fill="#050709"/>
    </svg>`;
  }

  function courtyardScene(u) {
    const rnd = seeded(7);
    const stars = Array.from({ length: 46 }, (_, i) => {
      const x = Math.round(rnd() * 640), y = Math.round(rnd() * 150), r = (0.6 + rnd() * 1.2).toFixed(1);
      return `<circle class="star" style="animation-delay:${(rnd() * 4).toFixed(2)}s;animation-duration:${(2 + rnd() * 3).toFixed(2)}s" cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`;
    }).join('');
    const bulbs = Array.from({ length: 11 }, (_, i) => {
      const x = 20 + i * 60, y = 44 + Math.sin(i / 10 * Math.PI) * 30 + (i % 2) * 3;
      return `<circle class="bulb b${i % 3}" cx="${x}" cy="${(y + 5).toFixed(1)}" r="4" fill="#ffd48a"/>
              <circle cx="${x}" cy="${(y + 5).toFixed(1)}" r="12" fill="#ffd48a" opacity=".12" class="halo b${i % 3}"/>`;
    }).join('');
    return `<svg class="scene-svg" viewBox="0 0 640 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070c24"/><stop offset=".7" stop-color="#1c3262"/><stop offset="1" stop-color="#3a5a8c"/></linearGradient>
        <radialGradient id="${u}moon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff7d8" stop-opacity=".9"/><stop offset="1" stop-color="#fff7d8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="640" height="260" fill="url(#${u}sky)"/>
      ${stars}
      <circle cx="540" cy="52" r="46" fill="url(#${u}moon)"/><circle cx="540" cy="52" r="15" fill="#fff7d8"/><circle cx="546" cy="48" r="13" fill="#0c1536" opacity=".0"/>
      <path d="M0 176 C60 150 120 160 190 150 C260 140 300 160 380 150 L380 260 L0 260 Z" fill="#0b1226" opacity=".7"/>
      <g fill="#070b17">
        <path d="M430 176 L430 120 Q432 110 440 100 L452 96 L448 104 Q470 92 520 92 Q580 90 606 104 Q560 100 520 106 Q490 108 470 114 L452 126 L450 176 Z"/>
        <ellipse cx="520" cy="94" rx="108" ry="14"/><ellipse cx="560" cy="88" rx="70" ry="10"/>
      </g>
      <path d="M0 78 C120 40 220 110 320 70 C420 40 520 100 640 62" stroke="#1a1f33" stroke-width="2" fill="none"/>
      ${bulbs}
      <rect y="196" width="640" height="64" fill="#10141f"/>
      <rect y="190" width="640" height="10" fill="#1b2130"/>
      <rect y="190" width="640" height="2" fill="#2a3246"/>
    </svg>`;
  }

  function barScene(u) {
    const rnd = seeded(21);
    const bottleColors = ['#7a3b1c', '#2f6a4a', '#9a6a1a', '#4a2a5a', '#a33a2a', '#2a4a7a', '#c9a24a'];
    const bottles = [0, 1, 2].map(row => Array.from({ length: 16 }, (_, i) => {
      const x = 12 + i * 40 + (row % 2) * 14, y = 54 + row * 46;
      const h = 24 + Math.round(rnd() * 12), c = bottleColors[Math.floor(rnd() * bottleColors.length)];
      return `<rect x="${x}" y="${y + 36 - h}" width="11" height="${h}" rx="3" fill="${c}"/><rect x="${x + 3}" y="${y + 28 - h}" width="5" height="9" fill="${c}"/><rect x="${x + 2}" y="${y + 38 - h}" width="2" height="${h - 8}" fill="#fff" opacity=".25"/>`;
    }).join('')).join('');
    const bokeh = Array.from({ length: 14 }, (_, i) => {
      const x = Math.round(rnd() * 640), y = Math.round(20 + rnd() * 150), r = Math.round(10 + rnd() * 22);
      return `<circle class="bokeh k${i % 4}" cx="${x}" cy="${y}" r="${r}" fill="${i % 3 ? '#ffb45a' : '#ff7a5a'}" opacity=".14"/>`;
    }).join('');
    return `<svg class="scene-svg" viewBox="0 0 640 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2417"/><stop offset="1" stop-color="#1a0f0a"/></linearGradient>
        <linearGradient id="${u}ctr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4326"/><stop offset="1" stop-color="#2a180d"/></linearGradient>
        <filter id="${u}blur"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <rect width="640" height="260" fill="url(#${u}w)"/>
      ${[0, 1, 2].map(row => `<rect x="0" y="${88 + row * 46}" width="640" height="4" fill="#8a5a2e" opacity=".8"/>`).join('')}
      ${bottles}
      <g filter="url(#${u}blur)">${bokeh}</g>
      <rect x="470" y="34" width="120" height="30" rx="6" fill="#1a0b14" stroke="#ff4f8a" stroke-width="2" class="neon"/>
      <text x="530" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="18" letter-spacing="6" fill="#ff7ab0" class="neon">BAR</text>
      <rect y="206" width="640" height="54" fill="url(#${u}ctr)"/>
      <rect y="204" width="640" height="5" fill="#b98a52"/><rect y="204" width="640" height="1.5" fill="#f1c98a" opacity=".7"/>
      <path d="M60 204 L72 176 L84 176 L96 204 Z" fill="#fff" opacity=".18"/>
    </svg>`;
  }

  function scene(id) {
    const photo = Art.photos['scene-' + id] || (id === 'hero' && Art.photos.intro);
    if (photo) return `<img class="scene-photo" src="img/${photo}" alt="" draggable="false">`;
    const u = newUid();
    switch (id) {
      case 'amina': return galleryScene(u, true);
      case 'brian': return entranceScene(u);
      case 'wanjiru': return courtyardScene(u);
      case 'otieno': return barScene(u);
      case 'hero':
      default: return galleryScene(u, true);
    }
  }

  // Slow-drifting dust motes. Position and speed are randomised once, then CSS does the work.
  function motes(count) {
    const rnd = seeded(99);
    let out = '';
    for (let i = 0; i < (count || 22); i++) {
      const left = (rnd() * 100).toFixed(1), size = (1.5 + rnd() * 3).toFixed(1);
      const dur = (9 + rnd() * 12).toFixed(1), delay = (-rnd() * 16).toFixed(1), drift = Math.round(-30 + rnd() * 60);
      out += `<i style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;--drift:${drift}px"></i>`;
    }
    return `<div class="motes" aria-hidden="true">${out}</div>`;
  }

  const Art = {
    photos: {},
    portrait,
    scene,
    motes,
    // Asks the server which image files exist in public/img, e.g. portrait-amina.png.
    async loadPhotos() {
      try {
        const res = await fetch('/api/art');
        const list = await res.json();
        for (const file of list.files || []) {
          const key = file.replace(/\.[a-z0-9]+$/i, '').toLowerCase();
          Art.photos[key] = file;
        }
      } catch (_) { /* no photos, the drawings are used */ }
    }
  };

  window.Art = Art;
})();
