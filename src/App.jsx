// ============================================================
// SMITH'S FORGE — METAL EDITION
// App.jsx — Complete game for foreign welding trainees in Japan
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { QUIZ_STAGES } from './questions_smith.js'

// ── CONSTANTS ───────────────────────────────────────────────
const P_HP   = 100   // player max HP
const M_HP   = 100   // monster max HP
const MISSES = 5     // misses before GAME OVER
const WINS   = 10    // correct answers to WIN
const M_DMG  = 10    // damage to monster per correct answer
const P_DMG  = 20    // damage to player per wrong answer

// ── MONSTER DATA ────────────────────────────────────────────
const MONSTERS = [
  { name:'TORQUE TITAN',      emoji:'🛡️', color:'#1E90FF', flavor:'Blocks all without proper permits!' },
  { name:'CHIP CRUSHER',      emoji:'⚙️', color:'#00CED1', flavor:'Built from neglected equipment!' },
  { name:'PRESS PHANTOM',     emoji:'🔨', color:'#4169E1', flavor:'Master of bending and blanking!' },
  { name:'MILLING MENACE',    emoji:'⚙️', color:'#6A5ACD', flavor:'Carves through steel and patience alike!' },
  { name:'TOLERANCE TERROR',  emoji:'📐', color:'#483D8B', flavor:'Demands precision to the micron!' },
  { name:'QUALITY DRAGON',    emoji:'🐉', color:'#2F4F4F', flavor:'The final boss of certification!' },
]

// ── CSS ANIMATIONS ──────────────────────────────────────────
;(function injectAnims() {
  if (typeof document === 'undefined') return
  if (document.getElementById('wf-anims')) return
  const s = document.createElement('style')
  s.id = 'wf-anims'
  s.textContent = `
    /* ── battle effects ── */
    @keyframes wf-mshake  { 0%,100%{transform:translateX(0)} 14%{transform:translateX(-9px)} 28%{transform:translateX(9px)} 42%{transform:translateX(-9px)} 57%{transform:translateX(9px)} 71%{transform:translateX(-5px)} 85%{transform:translateX(5px)} }
    @keyframes wf-mdeath  { 0%{transform:rotate(0deg) scale(1);opacity:1} 100%{transform:rotate(720deg) scale(0);opacity:0} }
    @keyframes wf-pshake  { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-7px)} 80%{transform:translateX(7px)} }
    @keyframes wf-float   { 0%{opacity:1;transform:translateY(0) translateX(-50%)} 75%{opacity:0.9} 100%{opacity:0;transform:translateY(-46px) translateX(-50%)} }
    @keyframes wf-vflash  { 0%{opacity:0.8} 100%{opacity:0} }
    @keyframes wf-doverlay{ 0%{opacity:0}   100%{opacity:0.82} }
    @keyframes wf-pcollapse{ 0%{transform:scaleY(1);opacity:1} 100%{transform:scaleY(0.05);opacity:0;transform-origin:top} }
    /* ── new visuals ── */
    @keyframes wf-pulse-glow { 0%,100%{text-shadow:0 0 18px #1E90FF77,0 0 36px #1E90FF33} 50%{text-shadow:0 0 28px #1E90FFCC,0 0 56px #1E90FF88,0 0 80px #1E90FF44} }
    @keyframes wf-bob        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes wf-mon-entry  { 0%{transform:translateY(-28px);opacity:0} 100%{transform:translateY(0);opacity:1} }
    @keyframes wf-stripe     { 0%{background-position:0 0} 100%{background-position:20px 0} }
    @keyframes wf-bounce-in  { 0%{transform:scale(1)} 40%{transform:scale(1.04)} 70%{transform:scale(0.98)} 100%{transform:scale(1)} }
    @keyframes wf-shine      { 0%{left:-100%} 100%{left:160%} }
    @keyframes wf-scanln     { 0%{background-position:0 0} 100%{background-position:0 40px} }
    @keyframes wf-star-a     { 0%{transform:translate(0,0)scale(1.2);opacity:1} 100%{transform:translate(-28px,-80px)scale(0);opacity:0} }
    @keyframes wf-star-b     { 0%{transform:translate(0,0)scale(1.2);opacity:1} 100%{transform:translate(22px,-90px)scale(0);opacity:0} }
    @keyframes wf-star-c     { 0%{transform:translate(0,0)scale(1.2);opacity:1} 100%{transform:translate(6px,-70px)scale(0);opacity:0} }
    /* ── ember/spark particles for title screen ── */
    @keyframes wf-ember-1 { 0%{transform:translate(0,0)scale(1);opacity:1} 100%{transform:translate(-18px,-130px)scale(0);opacity:0} }
    @keyframes wf-ember-2 { 0%{transform:translate(0,0)scale(1.2);opacity:0.9} 100%{transform:translate(22px,-110px)scale(0);opacity:0} }
    @keyframes wf-ember-3 { 0%{transform:translate(0,0)scale(0.8);opacity:1} 100%{transform:translate(-8px,-150px)scale(0);opacity:0} }
    @keyframes wf-ember-4 { 0%{transform:translate(0,0)scale(1.1);opacity:0.85} 100%{transform:translate(14px,-95px)scale(0);opacity:0} }
    @keyframes wf-ember-5 { 0%{transform:translate(0,0)scale(0.9);opacity:1} 100%{transform:translate(-24px,-120px)scale(0);opacity:0} }
    @keyframes wf-ember-6 { 0%{transform:translate(0,0)scale(1.3);opacity:0.8} 100%{transform:translate(30px,-140px)scale(0);opacity:0} }
    @keyframes wf-ember-7 { 0%{transform:translate(0,0)scale(0.7);opacity:1} 100%{transform:translate(-10px,-100px)scale(0);opacity:0} }
    @keyframes wf-ember-8 { 0%{transform:translate(0,0)scale(1);opacity:0.9} 100%{transform:translate(18px,-125px)scale(0);opacity:0} }
    /* ── button border glow ── */
    @keyframes wf-btn-glow { 0%,100%{box-shadow:0 0 10px #1E90FF88,0 0 20px #1E90FF44,0 4px 16px #1E90FF44} 50%{box-shadow:0 0 24px #1E90FFDD,0 0 48px #1E90FF99,0 0 80px #1E90FF44,0 4px 16px #1E90FF44} }
    /* ── screen shake (applied to body) ── */
    @keyframes wf-body-shake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px) translateY(3px)} 20%{transform:translateX(8px) translateY(-3px)} 30%{transform:translateX(-10px) translateY(2px)} 40%{transform:translateX(10px) translateY(-2px)} 55%{transform:translateX(-6px) translateY(1px)} 70%{transform:translateX(6px) translateY(-1px)} 85%{transform:translateX(-2px)} }
    /* ── full-screen red damage flash ── */
    @keyframes wf-red-flash { 0%{opacity:0.65} 100%{opacity:0} }
    /* ── big damage float ── */
    @keyframes wf-dmg-float { 0%{opacity:1;transform:translateY(0) translateX(-50%) scale(1)} 20%{transform:translateY(-10px) translateX(-50%) scale(1.2)} 100%{opacity:0;transform:translateY(-70px) translateX(-50%) scale(0.8)} }
    /* ── confetti squares ── */
    @keyframes wf-conf-1 { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(-40px,110vh)rotate(700deg);opacity:0} }
    @keyframes wf-conf-2 { 0%{transform:translate(0,0)rotate(45deg);opacity:1} 100%{transform:translate(50px,110vh)rotate(-540deg);opacity:0} }
    @keyframes wf-conf-3 { 0%{transform:translate(0,0)rotate(90deg);opacity:1} 100%{transform:translate(-25px,110vh)rotate(600deg);opacity:0} }
    @keyframes wf-conf-4 { 0%{transform:translate(0,0)rotate(135deg);opacity:1} 100%{transform:translate(60px,110vh)rotate(-720deg);opacity:0} }
    @keyframes wf-conf-5 { 0%{transform:translate(0,0)rotate(180deg);opacity:1} 100%{transform:translate(-55px,110vh)rotate(480deg);opacity:0} }
    /* ── trophy bounce ── */
    @keyframes wf-trophy-bounce { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-22px) scale(1.12)} 50%{transform:translateY(-8px) scale(1.06)} 75%{transform:translateY(-18px) scale(1.1)} }
    /* ── skull shake ── */
    @keyframes wf-skull-shake { 0%,100%{transform:translateX(0) rotate(0deg)} 10%{transform:translateX(-6px) rotate(-4deg)} 20%{transform:translateX(6px) rotate(4deg)} 30%{transform:translateX(-7px) rotate(-3deg)} 40%{transform:translateX(7px) rotate(3deg)} 55%{transform:translateX(-4px) rotate(-2deg)} 70%{transform:translateX(4px) rotate(2deg)} 85%{transform:translateX(-2px) rotate(-1deg)} }
    /* ── CSS utility classes ── */
    .wf-correct-btn { animation: wf-bounce-in 0.35s ease forwards !important; }
    .wf-shine-btn   { position:relative; overflow:hidden; }
    .wf-shine-btn::after {
      content:''; position:absolute; top:0; left:-100%;
      width:55%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
      transform:skewX(-18deg); pointer-events:none;
    }
    .wf-shine-btn:hover::after { animation:wf-shine 0.52s ease forwards; }
    .wf-answer-btn { transition: all 0.15s !important; }
    .wf-answer-btn:not([disabled]):hover { transform:scale(1.025) !important; box-shadow:0 0 12px #1E90FF55 !important; border-color:#1E90FF88 !important; background:#252525 !important; }
    .wf-locked-card { position:relative; overflow:hidden; }
    .wf-locked-card::after {
      content:''; position:absolute; inset:0; pointer-events:none;
      background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.025) 3px,rgba(255,255,255,0.025) 4px);
      background-size:100% 40px;
      animation:wf-scanln 3s linear infinite;
    }
    .wf-hp-ribs::after {
      content:''; position:absolute; inset:0; pointer-events:none; border-radius:8px;
      background:repeating-linear-gradient(90deg,transparent,transparent 7px,rgba(0,0,0,0.18) 7px,rgba(0,0,0,0.18) 8px);
    }
    * { box-sizing:border-box; }
    html, body {
      background:#0d0d0d; margin:0;
      overscroll-behavior:none;
      -webkit-overflow-scrolling:touch;
    }
    button, a, [role="button"] {
      -webkit-tap-highlight-color:transparent;
      touch-action:manipulation;
    }
    input, textarea, select { font-size:16px !important; }
    /* ── safe-area nav spacer ── */
    .wf-nav-safe { padding-bottom:env(safe-area-inset-bottom); }
    /* ── small screen overrides (≤380px) ── */
    @media (max-width:380px) {
      .wf-pad   { padding-left:8px !important; padding-right:8px !important; }
      .wf-mon-wrap svg { max-height:100px; width:auto; }
    }
  `
  document.head.appendChild(s)
})()

// ── SOUND ────────────────────────────────────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    // sequences: [startHz, endHz, duration, waveform]
    const SEQ = {
      correct: [[220, 440, 0.10, 'sine']],
      wrong:   [[200, 100, 0.20, 'sawtooth']],
      victory: [[523, 523, 0.14, 'sine'], [659, 659, 0.14, 'sine'], [784, 784, 0.22, 'sine']],
      defeat:  [[150, 100, 0.40, 'sawtooth']],
      click:   [[800, 800, 0.05, 'square']],
    }
    let t = ctx.currentTime + 0.01
    for (const [startHz, endHz, dur, wave] of (SEQ[type] || [])) {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = wave
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(startHz, t)
      if (endHz !== startHz) osc.frequency.exponentialRampToValueAtTime(endHz, t + dur)
      gain.gain.setValueAtTime(0.18, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
      osc.start(t)
      osc.stop(t + dur)
      t += dur
    }
    setTimeout(() => ctx.close().catch(()=>{}), (t - ctx.currentTime + 0.3) * 1000)
  } catch (_) {}
}

// ── HELPERS ─────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── SMITH SVG CHARACTER ────────────────────────────────────
function SmithSVG({ size = 80 }) {
  const aspect = 120 / 100
  const h = Math.round(size * aspect)
  return (
    <svg width={size} height={h} viewBox="0 0 100 120"
      style={{
        filter:'drop-shadow(0 0 14px #1E90FF99) drop-shadow(0 0 4px #FFB80066)',
        animation:'wf-bob 3s ease-in-out infinite',
      }}>
      <defs>
        {/* Visor glow gradient */}
        <radialGradient id="wf-visor-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFB800" stopOpacity="0.9"/>
          <stop offset="60%"  stopColor="#1E90FF" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#CC2200" stopOpacity="0"/>
        </radialGradient>
        {/* Chest plate gradient */}
        <linearGradient id="wf-chest-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3a3a4e"/>
          <stop offset="100%" stopColor="#1a1a26"/>
        </linearGradient>
        {/* Arc flame gradient */}
        <radialGradient id="wf-arc-grad" cx="50%" cy="80%" r="60%">
          <stop offset="0%"   stopColor="#ffffff"/>
          <stop offset="30%"  stopColor="#FFE066"/>
          <stop offset="70%"  stopColor="#1E90FF"/>
          <stop offset="100%" stopColor="#CC220000"/>
        </radialGradient>
        {/* Armor edge highlight */}
        <linearGradient id="wf-armor-hi" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#555566"/>
          <stop offset="40%"  stopColor="#888899"/>
          <stop offset="100%" stopColor="#2a2a3a"/>
        </linearGradient>
      </defs>

      {/* ── LEGS ── */}
      {/* Left leg */}
      <path d="M36 88 L34 108 L30 110 L28 108 L30 88Z" fill="#222233" stroke="#3a3a4e" strokeWidth="0.5"/>
      <path d="M30 108 L28 108 L26 112 L34 112 L34 110Z" fill="#1a1a28"/>
      {/* Right leg */}
      <path d="M64 88 L66 108 L70 110 L72 108 L70 88Z" fill="#222233" stroke="#3a3a4e" strokeWidth="0.5"/>
      <path d="M70 108 L72 108 L74 112 L66 112 L66 110Z" fill="#1a1a28"/>
      {/* Knee guards */}
      <rect x="27" y="98" width="8" height="5" rx="1.5" fill="#3a3a4e"/>
      <rect x="65" y="98" width="8" height="5" rx="1.5" fill="#3a3a4e"/>
      {/* Knee highlight */}
      <rect x="28" y="98.5" width="6" height="1.5" rx="0.5" fill="#666677" opacity="0.7"/>
      <rect x="66" y="98.5" width="6" height="1.5" rx="0.5" fill="#666677" opacity="0.7"/>

      {/* ── TORSO ── */}
      {/* Main body — tapered hero shape */}
      <path d="M28 60 L24 88 L76 88 L72 60 L68 46 L32 46Z" fill="url(#wf-chest-grad)" stroke="#3a3a4e" strokeWidth="0.8"/>
      {/* Chest plate center panel */}
      <path d="M38 50 L36 82 L64 82 L62 50Z" fill="#252535" stroke="#444455" strokeWidth="0.6"/>
      {/* Chest plate highlight line */}
      <line x1="39" y1="51" x2="37" y2="81" stroke="#555566" strokeWidth="1" opacity="0.6"/>
      {/* "SF" engraved text */}
      <text x="50" y="68" textAnchor="middle" fontFamily="monospace" fontWeight="900"
        fontSize="9" fill="#1E90FF" opacity="0.85" letterSpacing="1"
        style={{ filter:'url(#wf-visor-glow)' }}>SF</text>
      {/* SF glow behind text */}
      <text x="50" y="68" textAnchor="middle" fontFamily="monospace" fontWeight="900"
        fontSize="9" fill="#1E90FF33" letterSpacing="1" stroke="#1E90FF22" strokeWidth="3">SF</text>
      {/* Shoulder pauldrons */}
      <path d="M28 60 L20 52 L16 58 L20 66 L28 68Z" fill="#2a2a3a" stroke="#444455" strokeWidth="0.7"/>
      <path d="M72 60 L80 52 L84 58 L80 66 L72 68Z" fill="#2a2a3a" stroke="#444455" strokeWidth="0.7"/>
      {/* Pauldron highlight */}
      <path d="M20 52 L28 60" stroke="#666677" strokeWidth="1" opacity="0.5"/>
      <path d="M80 52 L72 60" stroke="#666677" strokeWidth="1" opacity="0.5"/>
      {/* Belt / waist armor */}
      <rect x="30" y="82" width="40" height="6" rx="1" fill="#1e1e2e" stroke="#3a3a4e" strokeWidth="0.6"/>
      <rect x="46" y="83" width="8" height="4" rx="1" fill="#1E90FF" opacity="0.6"/>

      {/* ── LEFT ARM (shield side — hanging) ── */}
      <path d="M20 66 L14 72 L12 84 L18 86 L22 74 L28 68Z" fill="#252535" stroke="#3a3a4e" strokeWidth="0.6"/>
      {/* Forearm plate */}
      <path d="M13 76 L18 86 L22 84 L17 74Z" fill="#2a2a3a"/>
      {/* Shield bracer glint */}
      <line x1="14" y1="78" x2="18" y2="84" stroke="#666677" strokeWidth="0.8" opacity="0.5"/>

      {/* ── RIGHT ARM (torch arm — raised) ── */}
      {/* Upper arm */}
      <path d="M72 60 L84 48 L88 38 L82 34 L76 44 L68 56Z" fill="#252535" stroke="#3a3a4e" strokeWidth="0.6"/>
      {/* Forearm */}
      <path d="M88 38 L92 26 L86 22 L82 34Z" fill="#2a2a3a" stroke="#3a3a4e" strokeWidth="0.6"/>
      {/* Forearm armor ridge */}
      <line x1="89" y1="36" x2="87" y2="24" stroke="#555566" strokeWidth="1" opacity="0.6"/>
      {/* Gauntlet */}
      <path d="M87 24 L85 16 L89 14 L93 18 L92 26Z" fill="#1e1e2e" stroke="#444455" strokeWidth="0.7"/>
      {/* Torch handle */}
      <rect x="83" y="6" width="5" height="14" rx="2" fill="#333344" stroke="#555566" strokeWidth="0.5"
        transform="rotate(-20 86 13)"/>
      {/* Torch grip wrap lines */}
      <line x1="81" y1="15" x2="85" y2="8"  stroke="#444455" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-20 86 13)"/>
      <line x1="82" y1="12" x2="86" y2="5"  stroke="#444455" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-20 86 13)"/>

      {/* ── ARC FLAME at torch tip ── */}
      {/* Outer glow halo */}
      <ellipse cx="80" cy="4" rx="10" ry="10" fill="#1E90FF22"/>
      <ellipse cx="80" cy="4" rx="7"  ry="7"  fill="#FF880033"/>
      {/* Main flame body */}
      <path d="M78 8 Q76 2 80 -2 Q82 -5 81 -1 Q85 -6 82 2 Q86 -2 84 4 Q82 8 80 8 Q78 8 78 8Z"
        fill="url(#wf-arc-grad)" opacity="0.95"/>
      {/* Bright white core */}
      <ellipse cx="80" cy="3" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.9"/>
      <ellipse cx="80" cy="2" rx="1.2" ry="2"   fill="#ffffff"/>
      {/* Arc sputter lines */}
      <line x1="80" y1="3" x2="72" y2="-4" stroke="#FFE066" strokeWidth="1"   opacity="0.8" strokeLinecap="round"/>
      <line x1="80" y1="3" x2="88" y2="-2" stroke="#FFB800" strokeWidth="0.8" opacity="0.7" strokeLinecap="round"/>
      <line x1="80" y1="3" x2="74" y2="10" stroke="#1E90FF" strokeWidth="0.8" opacity="0.6" strokeLinecap="round"/>
      <line x1="80" y1="3" x2="87" y2="8"  stroke="#FFB800" strokeWidth="0.7" opacity="0.5" strokeLinecap="round"/>
      {/* Spark dots */}
      <circle cx="71" cy="-3" r="1.2" fill="#FFE066" opacity="0.9"/>
      <circle cx="88" cy="-1" r="1.0" fill="#ffffff"  opacity="0.85"/>
      <circle cx="90" cy="7"  r="0.8" fill="#FFB800"  opacity="0.8"/>
      <circle cx="73" cy="11" r="0.9" fill="#1E90FF"  opacity="0.75"/>
      <circle cx="84" cy="-7" r="0.7" fill="#FFE066"  opacity="0.7"/>
      <circle cx="76" cy="-7" r="1.0" fill="#ffffff"  opacity="0.65"/>

      {/* ── HELMET ── */}
      {/* Neck */}
      <rect x="38" y="38" width="24" height="12" rx="2" fill="#222233" stroke="#3a3a4e" strokeWidth="0.6"/>
      <rect x="42" y="39" width="16" height="2"  rx="1" fill="#333344" opacity="0.7"/>
      {/* Main helmet shell */}
      <path d="M26 36 L28 18 Q30 8 50 6 Q70 8 72 18 L74 36 L70 40 L30 40Z"
        fill="#2a2a3a" stroke="#444455" strokeWidth="1"/>
      {/* Helmet top ridge / crest */}
      <path d="M42 6 L40 2 L50 0 L60 2 L58 6Z" fill="#333344" stroke="#555566" strokeWidth="0.5"/>
      {/* Crest glow line */}
      <line x1="50" y1="0" x2="50" y2="6" stroke="#1E90FF66" strokeWidth="1.5"/>
      {/* Side angular cheek guards */}
      <path d="M26 36 L22 30 L24 22 L28 18" fill="#222233" stroke="#3a3a4e" strokeWidth="0.7"/>
      <path d="M74 36 L78 30 L76 22 L72 18" fill="#222233" stroke="#3a3a4e" strokeWidth="0.7"/>
      {/* Helmet highlight — left bevel */}
      <path d="M28 18 L26 36" stroke="#666677" strokeWidth="1.5" opacity="0.4"/>
      {/* Helmet highlight — top arc */}
      <path d="M35 8 Q50 4 65 8" stroke="#888899" strokeWidth="1" fill="none" opacity="0.35"/>

      {/* ── VISOR ── */}
      {/* Visor slot — angular futuristic shape */}
      <path d="M30 28 L32 22 L68 22 L70 28 L66 34 L34 34Z" fill="#0d0d18" stroke="#1E90FF55" strokeWidth="0.8"/>
      {/* Visor glow fill */}
      <path d="M31 28 L33 23 L67 23 L69 28 L65 33 L35 33Z" fill="url(#wf-visor-glow)" opacity="0.35"/>
      {/* Horizontal visor scan line */}
      <line x1="32" y1="28" x2="68" y2="28" stroke="#1E90FF44" strokeWidth="0.6"/>
      {/* Glowing eyes behind visor */}
      <ellipse cx="41" cy="28" rx="5.5" ry="3.5" fill="#1E90FF" opacity="0.75"/>
      <ellipse cx="59" cy="28" rx="5.5" ry="3.5" fill="#1E90FF" opacity="0.75"/>
      <ellipse cx="41" cy="28" rx="3"   ry="2"   fill="#FFB800" opacity="0.9"/>
      <ellipse cx="59" cy="28" rx="3"   ry="2"   fill="#FFB800" opacity="0.9"/>
      <ellipse cx="41" cy="28" rx="1.2" ry="0.9" fill="#ffffff"  opacity="0.8"/>
      <ellipse cx="59" cy="28" rx="1.2" ry="0.9" fill="#ffffff"  opacity="0.8"/>
      {/* Visor outer edge chrome */}
      <path d="M30 28 L32 22 L68 22 L70 28 L66 34 L34 34Z"
        fill="none" stroke="url(#wf-armor-hi)" strokeWidth="1.2" opacity="0.6"/>

      {/* ── GROUND SHADOW ── */}
      <ellipse cx="50" cy="116" rx="22" ry="3" fill="#1E90FF11"/>
    </svg>
  )
}

// ── HP BAR ──────────────────────────────────────────────────
function HPBar({ cur, max, label }) {
  const pct  = Math.max(0, Math.min(100, (cur / max) * 100))
  const col  = pct > 60 ? '#22c55e' : pct > 30 ? '#f59e0b' : '#ef4444'
  const low  = pct <= 30
  const gradFill = pct > 60
    ? `linear-gradient(90deg,#16a34a,#22c55e,#4ade80)`
    : pct > 30
    ? `linear-gradient(90deg,#b45309,#f59e0b,#fcd34d)`
    : `linear-gradient(90deg,#991b1b,#ef4444,#fca5a5)`
  const fill = low
    ? { background:`repeating-linear-gradient(45deg,${col},${col} 6px,${col}88 6px,${col}88 12px)`,
        animation:'wf-stripe 0.35s linear infinite' }
    : { background: gradFill }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between',
        fontSize:'0.65rem', fontFamily:"'Share Tech Mono',monospace", color:'#888', marginBottom:4 }}>
        <span>{label}</span>
        <span style={{ color:col, fontFamily:"'Orbitron',monospace", fontSize:'0.6rem' }}>{cur}/{max} HP</span>
      </div>
      <div style={{ height:16, background:'#1e1e1e', borderRadius:8, overflow:'hidden',
        boxShadow:'inset 0 2px 4px #00000088', position:'relative' }}>
        <div style={{ height:'100%', width:`${pct}%`, borderRadius:8,
          transition:'width 0.4s ease', boxShadow:`0 0 10px ${col}99`, ...fill }}/>
        <div className="wf-hp-ribs" style={{ position:'absolute', inset:0, pointerEvents:'none' }}/>
      </div>
    </div>
  )
}

// ── TITLE SCREEN ────────────────────────────────────────────
const EMBER_CONFIGS = [
  { left:'12%', top:'70%', size:5, color:'#1E90FF', anim:'wf-ember-1 2.4s 0.0s ease-in infinite' },
  { left:'28%', top:'75%', size:4, color:'#FFB800', anim:'wf-ember-2 2.8s 0.4s ease-in infinite' },
  { left:'45%', top:'80%', size:6, color:'#FF4400', anim:'wf-ember-3 2.2s 0.8s ease-in infinite' },
  { left:'62%', top:'72%', size:4, color:'#1E90FF', anim:'wf-ember-4 3.0s 0.2s ease-in infinite' },
  { left:'78%', top:'78%', size:5, color:'#FFB800', anim:'wf-ember-5 2.6s 0.6s ease-in infinite' },
  { left:'20%', top:'65%', size:3, color:'#FF8800', anim:'wf-ember-6 2.1s 1.0s ease-in infinite' },
  { left:'55%', top:'68%', size:4, color:'#FF4400', anim:'wf-ember-7 2.9s 0.3s ease-in infinite' },
  { left:'85%', top:'65%', size:6, color:'#1E90FF', anim:'wf-ember-8 2.3s 0.7s ease-in infinite' },
  { left:'38%', top:'82%', size:3, color:'#FFB800', anim:'wf-ember-1 3.1s 1.2s ease-in infinite' },
  { left:'70%', top:'60%', size:4, color:'#FF8800', anim:'wf-ember-3 2.5s 0.9s ease-in infinite' },
]

const SUBTITLE_FULL = 'Japanese Welding RPG Quiz · Foreign Trainees in Japan'

function TitleScreen({ onStart, totalXP }) {
  const S = styles
  const [typed, setTyped] = useState('')
  const [btnHover, setBtnHover] = useState(false)

  useEffect(() => {
    let i = 0
    setTyped('')
    const t = setInterval(() => {
      i++
      setTyped(SUBTITLE_FULL.slice(0, i))
      if (i >= SUBTITLE_FULL.length) clearInterval(t)
    }, 42)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      minHeight:'100vh', background:'#080808', display:'flex',
      flexDirection:'column', justifyContent:'center', alignItems:'center',
      textAlign:'center', padding:'20px 16px', position:'relative', overflow:'hidden',
      fontFamily:"'Share Tech Mono',monospace",
    }}>
      {/* Ember particles */}
      {EMBER_CONFIGS.map((e, i) => (
        <div key={i} style={{
          position:'absolute', left:e.left, top:e.top,
          width:e.size, height:e.size, borderRadius:'50%',
          background:e.color, boxShadow:`0 0 ${e.size*2}px ${e.color}`,
          animation:e.anim, pointerEvents:'none', zIndex:1,
        }}/>
      ))}

      {/* Radial glow behind title */}
      <div style={{
        position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)',
        width:300, height:200,
        background:'radial-gradient(ellipse, #1E90FF22 0%, transparent 70%)',
        pointerEvents:'none', zIndex:1,
      }}/>

      <div style={{ position:'relative', zIndex:2 }}>
        <div style={{ animation:'wf-bob 2.2s ease-in-out infinite' }}>
          <SmithSVG size={110}/>
        </div>

        {/* Main title — metallic orange gradient text */}
        <div style={{
          fontSize:'clamp(2rem, 8vw, 3.2rem)', fontWeight:'900',
          fontFamily:"'Orbitron',monospace",
          letterSpacing:'0.06em', marginTop:16,
          background:'linear-gradient(180deg, #FFB800 0%, #1E90FF 40%, #CC2200 80%, #1E90FF 100%)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text',
          filter:'drop-shadow(0 0 12px #1E90FF88)',
          animation:'wf-pulse-glow 2s ease-in-out infinite',
          lineHeight:1.05,
        }}>
          SMITH'S<br/>FORGE
        </div>

        <div style={{ color:'#FFB800', fontSize:'0.75rem', fontFamily:"'Orbitron',monospace",
          letterSpacing:'0.22em', marginBottom:8, marginTop:8,
          textShadow:'0 0 10px #FFB80088' }}>
          ⚡ METAL EDITION ⚡
        </div>

        {/* Typewriter subtitle */}
        <div style={{ color:'#666', fontSize:'0.68rem', maxWidth:280, marginBottom:36,
          fontFamily:"'Share Tech Mono',monospace", lineHeight:1.7,
          minHeight:'2.4em', textAlign:'center' }}>
          {typed}<span style={{ animation:'wf-pulse-glow 0.8s ease-in-out infinite',
            color:'#1E90FF', fontSize:'0.8rem' }}>|</span>
        </div>

        {/* Glowing START BATTLE button */}
        <button
          onClick={onStart}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="wf-shine-btn"
          style={{
            background: btnHover
              ? 'linear-gradient(135deg,#FF8800,#FF3300)'
              : 'linear-gradient(135deg,#1E90FF,#CC2200)',
            color:'#fff', border:'2px solid #FF880066', borderRadius:10,
            padding:'16px 52px', fontWeight:'900',
            cursor:'pointer', fontFamily:"'Orbitron',monospace",
            fontSize:'1.05rem', letterSpacing:'0.14em',
            animation:'wf-btn-glow 1.8s ease-in-out infinite',
            transform: btnHover ? 'scale(1.05)' : 'scale(1)',
            transition:'transform 0.15s, background 0.15s',
            position:'relative',
          }}>
          ⚡ START BATTLE
        </button>

        {totalXP > 0 && (
          <div style={{ color:'#444', fontSize:'0.68rem', marginTop:16,
            fontFamily:"'Share Tech Mono',monospace" }}>
            Total XP: <span style={{ color:'#FFB800', fontFamily:"'Orbitron',monospace",
              textShadow:'0 0 8px #FFB80066' }}>{totalXP}</span>
          </div>
        )}
        <div style={{ color:'#222', fontSize:'0.6rem', marginTop:18, maxWidth:260,
          lineHeight:1.7, fontFamily:"'Share Tech Mono',monospace" }}>
          Answer {WINS} correctly to win · {MISSES} misses = GAME OVER
        </div>
      </div>
    </div>
  )
}

// ── STAGE SELECT ────────────────────────────────────────────
function StageSelect({ stages, totalXP, stageProgress, onSelect, onBack }) {
  const S = styles
  const [hovered,   setHovered]   = useState(null)
  const [displayXP, setDisplayXP] = useState(0)

  useEffect(() => {
    if (totalXP <= 0) { setDisplayXP(0); return }
    let cur = 0
    const step  = Math.max(1, Math.ceil(totalXP / 40))
    const timer = setInterval(() => {
      cur = Math.min(cur + step, totalXP)
      setDisplayXP(cur)
      if (cur >= totalXP) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [totalXP])

  return (
    <div style={{ ...S.page, paddingBottom:16 }}>
      {/* XP header */}
      <div style={{ display:'flex', alignItems:'center', marginBottom:14 }}>
        <button onClick={onBack} style={S.btnGhost}>←</button>
        <div style={{ marginLeft:12, flex:1 }}>
          <div style={{ color:'#1E90FF', fontWeight:'700',
            fontFamily:"'Orbitron',monospace", fontSize:'0.82rem',
            letterSpacing:'0.06em' }}>SELECT STAGE</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ color:'#555', fontSize:'0.58rem', fontFamily:"'Share Tech Mono',monospace" }}>TOTAL XP</div>
          <div style={{ color:'#FFB800', fontFamily:"'Orbitron',monospace",
            fontSize:'1.1rem', fontWeight:'900',
            textShadow:'0 0 12px #FFB80088' }}>{displayXP}</div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {stages.map((st, i) => {
          const locked  = totalXP < st.unlockXP
          const mon     = MONSTERS[i] || MONSTERS[0]
          const isHov   = hovered === i && !locked
          const prog    = stageProgress[st.stageId] || {}
          const progPct = locked ? 0 : Math.min(100, ((prog.correct || 0) / 10) * 100)
          const isWon   = prog.result === 'victory'

          return (
            <button key={st.stageId}
              className={locked ? 'wf-locked-card' : ''}
              onClick={() => !locked && onSelect(i)}
              onMouseEnter={() => !locked && setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              disabled={locked}
              style={{
                background: locked ? '#111' : '#161616',
                border:`1px solid ${locked ? '#1e1e1e' : isHov ? st.color : st.color+'44'}`,
                borderRadius:10, padding:'12px 10px 10px', textAlign:'center',
                cursor: locked ? 'not-allowed' : 'pointer',
                opacity: locked ? 0.45 : 1,
                fontFamily:F_BODY,
                transition:'all 0.18s',
                transform: isHov ? 'translateY(-4px)' : 'none',
                boxShadow: isHov ? `0 8px 22px ${st.color}55` : 'none',
                position:'relative',
              }}>
              {/* Won badge */}
              {isWon && (
                <div style={{ position:'absolute', top:6, right:6,
                  fontSize:'0.5rem', background:'#22c55e22', border:'1px solid #22c55e',
                  color:'#22c55e', borderRadius:4, padding:'1px 5px',
                  fontFamily:"'Orbitron',monospace", letterSpacing:'0.04em' }}>✓</div>
              )}

              {/* Monster emoji (unlocked) or lock (locked) */}
              <div style={{ fontSize: locked ? '1.6rem' : '2.0rem', marginBottom:3 }}>
                {locked ? '🔒' : mon.emoji}
              </div>

              <div style={{ fontSize:'0.58rem', fontFamily:"'Orbitron',monospace",
                color: locked ? '#3a3a3a' : st.color,
                fontWeight:'700', letterSpacing:'0.06em', marginBottom:2 }}>
                STAGE {st.stageId}
              </div>
              <div style={{ fontSize:'0.56rem', fontFamily:"'Share Tech Mono',monospace",
                color: locked ? '#333' : '#aaa', lineHeight:1.3, marginBottom:6 }}>
                {st.label.replace(/^STAGE \d+ — /,'')}
              </div>

              {locked ? (
                <div style={{ fontSize:'0.54rem', color:'#444',
                  fontFamily:"'Share Tech Mono',monospace", marginBottom:6 }}>
                  Need {st.unlockXP} XP
                </div>
              ) : (
                <div style={{ fontSize:'0.54rem', color:mon.color,
                  fontFamily:"'Share Tech Mono',monospace', marginBottom:6" }}>
                  vs {mon.name}
                </div>
              )}

              {/* Mini progress bar */}
              <div style={{ height:4, background:'#2a2a2a', borderRadius:2, overflow:'hidden', marginTop:4 }}>
                <div style={{
                  height:'100%', borderRadius:2,
                  width:`${progPct}%`,
                  background: isWon ? '#22c55e' : st.color,
                  transition:'width 0.6s ease',
                  boxShadow: progPct > 0 ? `0 0 6px ${isWon ? '#22c55e' : st.color}88` : 'none',
                }}/>
              </div>
              <div style={{ fontSize:'0.5rem', color: locked ? '#333' : '#555',
                fontFamily:"'Share Tech Mono',monospace", marginTop:3 }}>
                {locked ? `🔒 ${st.unlockXP} XP` : `${prog.correct || 0}/10 correct`}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── SVG MONSTERS ─────────────────────────────────────────────
function MonsterKinshi() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k1-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE066"/>
          <stop offset="60%" stopColor="#1E90FF"/>
          <stop offset="100%" stopColor="#CC2200" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="k1-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E85D04" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#E85D04" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="url(#k1-glow)"/>
      {/* Tattered paper cape — back layer */}
      <path d="M28 56 L20 62 L18 72 L14 78 L18 84 L15 92 L24 90 L22 80 L26 84 L30 80 L28 90 L36 90 L34 80 L38 56Z" fill="#f0e8cc" opacity="0.88"/>
      <path d="M92 56 L100 62 L102 72 L106 78 L102 84 L105 92 L96 90 L98 80 L94 84 L90 80 L92 90 L84 90 L86 80 L82 56Z" fill="#f0e8cc" opacity="0.88"/>
      {[64,68,72,76,80,84].map(y => <line key={y}   x1="20" y1={y} x2="34" y2={y} stroke="#ccc0a0" strokeWidth="0.6" opacity="0.6"/>)}
      {[64,68,72,76,80,84].map(y => <line key={y+'r'} x1="86" y1={y} x2="100" y2={y} stroke="#ccc0a0" strokeWidth="0.6" opacity="0.6"/>)}
      {/* Body */}
      <path d="M34 56 L30 96 L90 96 L86 56 L74 48 L46 48Z" fill="#8B2200"/>
      <path d="M38 60 L35 92 L85 92 L82 60 L72 53 L48 53Z" fill="#A82A00"/>
      <line x1="60" y1="54" x2="58" y2="90" stroke="#7B1A00" strokeWidth="1.5" opacity="0.7"/>
      <line x1="48" y1="56" x2="46" y2="90" stroke="#7B1A00" strokeWidth="1" opacity="0.5"/>
      <line x1="72" y1="56" x2="74" y2="90" stroke="#7B1A00" strokeWidth="1" opacity="0.5"/>
      {/* Right arm — raised, holding stamp */}
      <path d="M82 62 Q98 52 104 40" stroke="#8B2200" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <path d="M82 62 Q98 52 104 40" stroke="#AA2800" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <rect x="100" y="22" width="14" height="20" rx="2" fill="#CC0000"/>
      <rect x="102" y="42" width="10" height="6" rx="1" fill="#AA0000"/>
      <circle cx="107" cy="30" r="8" fill="#EE0000"/>
      <circle cx="107" cy="30" r="7" fill="none" stroke="#fff" strokeWidth="2.5"/>
      <line x1="102" y1="25" x2="112" y2="35" stroke="#fff" strokeWidth="2.5"/>
      <circle cx="107" cy="30" r="9" fill="none" stroke="#FF440044" strokeWidth="3"/>
      {/* Left arm — claw */}
      <path d="M38 62 Q22 70 16 80" stroke="#8B2200" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <path d="M38 62 Q22 70 16 80" stroke="#AA2800" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <path d="M16 80 L10 76 M16 80 L12 86 M16 80 L20 86" stroke="#CC4400" strokeWidth="2" strokeLinecap="round"/>
      {/* Neck */}
      <rect x="46" y="40" width="28" height="12" rx="3" fill="#8B2200"/>
      {/* Head */}
      <path d="M26 34 Q28 10 60 8 Q92 10 94 34 L90 48 L30 48Z" fill="#C42C00"/>
      <path d="M30 36 Q32 14 60 12 Q88 14 90 36 L87 46 L33 46Z" fill="#D93300"/>
      {/* Horns */}
      <polygon points="40,30 30,2 52,24" fill="#E85D04"/>
      <polygon points="40,30 30,2 52,24" fill="none" stroke="#FF8844" strokeWidth="0.8" opacity="0.6"/>
      <polygon points="80,30 90,2 68,24" fill="#E85D04"/>
      <polygon points="80,30 90,2 68,24" fill="none" stroke="#FF8844" strokeWidth="0.8" opacity="0.6"/>
      <polygon points="50,24 44,10 58,22" fill="#CC4400"/>
      <polygon points="70,24 76,10 62,22" fill="#CC4400"/>
      {/* Eyes */}
      <ellipse cx="46" cy="30" rx="9" ry="7" fill="#E85D0433"/>
      <ellipse cx="74" cy="30" rx="9" ry="7" fill="#E85D0433"/>
      <ellipse cx="46" cy="30" rx="7" ry="5" fill="url(#k1-eye)"/>
      <ellipse cx="74" cy="30" rx="7" ry="5" fill="url(#k1-eye)"/>
      <ellipse cx="46" cy="30" rx="3" ry="2.2" fill="#FFE066" opacity="0.9"/>
      <ellipse cx="74" cy="30" rx="3" ry="2.2" fill="#FFE066" opacity="0.9"/>
      <ellipse cx="46" cy="30" rx="1" ry="2" fill="#220000"/>
      <ellipse cx="74" cy="30" rx="1" ry="2" fill="#220000"/>
      <path d="M36 24 L50 28" stroke="#5C0000" strokeWidth="3" strokeLinecap="round"/>
      <path d="M84 24 L70 28" stroke="#5C0000" strokeWidth="3" strokeLinecap="round"/>
      {/* Grin */}
      <path d="M38 40 Q60 50 82 40 L80 46 Q60 56 40 46Z" fill="#1a0000"/>
      {[42,48,54,60,66,72,78].map(x => <rect key={x} x={x} y={40} width="3.5" height="5" rx="0.5" fill="#fff" opacity="0.9"/>)}
      {/* Legs */}
      <rect x="42" y="93" width="13" height="20" rx="3" fill="#6B1800"/>
      <rect x="65" y="93" width="13" height="20" rx="3" fill="#6B1800"/>
      <rect x="40" y="109" width="17" height="5" rx="2" fill="#8B2200"/>
      <rect x="63" y="109" width="17" height="5" rx="2" fill="#8B2200"/>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#E85D0420"/>
    </svg>
  )
}

function MonsterGuraindaa() {
  const discTeeth = (cx, cy, r, n, fill) =>
    Array.from({length: n}, (_, i) => {
      const a = (i / n) * Math.PI * 2
      const x = cx + r * Math.cos(a)
      const y = cy + r * Math.sin(a)
      return <rect key={i} x={x-2} y={y-2} width="4" height="4" rx="0.5" fill={fill}
        transform={`rotate(${(i/n)*360},${x},${y})`}/>
    })
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k2-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1565C0" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#1565C0" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="k2-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A6BAA"/>
          <stop offset="100%" stopColor="#0D3060"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="url(#k2-glow)"/>
      {/* Legs */}
      <rect x="38" y="92" width="16" height="22" rx="3" fill="#0D3060"/>
      <rect x="66" y="92" width="16" height="22" rx="3" fill="#0D3060"/>
      <rect x="36" y="104" width="20" height="6" rx="2" fill="#1565C0"/>
      <rect x="64" y="104" width="20" height="6" rx="2" fill="#1565C0"/>
      <circle cx="46" cy="96" r="1.5" fill="#4A8CC4"/>
      <circle cx="74" cy="96" r="1.5" fill="#4A8CC4"/>
      {/* Disc torso */}
      <ellipse cx="60" cy="90" rx="26" ry="7" fill="#1A3A5C"/>
      <ellipse cx="60" cy="90" rx="24" ry="6" fill="url(#k2-metal)"/>
      {discTeeth(60, 90, 25, 16, '#4A8CC4')}
      <ellipse cx="60" cy="78" rx="24" ry="7" fill="#1A3A5C"/>
      <ellipse cx="60" cy="78" rx="22" ry="6" fill="url(#k2-metal)"/>
      {discTeeth(60, 78, 23, 14, '#4A8CC4')}
      <ellipse cx="60" cy="66" rx="26" ry="7" fill="#1A3A5C"/>
      <ellipse cx="60" cy="66" rx="24" ry="6" fill="url(#k2-metal)"/>
      {discTeeth(60, 66, 25, 16, '#5A9CD4')}
      <ellipse cx="60" cy="54" rx="28" ry="8" fill="#1A3A5C"/>
      <ellipse cx="60" cy="54" rx="26" ry="7" fill="url(#k2-metal)"/>
      {discTeeth(60, 54, 27, 18, '#5A9CD4')}
      <circle cx="60" cy="90" r="4" fill="#0A1E35"/>
      <circle cx="60" cy="90" r="2.5" fill="#4A8CC4"/>
      <circle cx="60" cy="78" r="4" fill="#0A1E35"/>
      <circle cx="60" cy="78" r="2.5" fill="#4A8CC4"/>
      <circle cx="60" cy="66" r="4" fill="#0A1E35"/>
      <circle cx="60" cy="66" r="2.5" fill="#4A8CC4"/>
      <circle cx="60" cy="54" r="5" fill="#0A1E35"/>
      <circle cx="60" cy="54" r="3" fill="#4A8CC4"/>
      {/* Shoulder grinding wheels */}
      <circle cx="28" cy="58" r="14" fill="#1A3A5C"/>
      <circle cx="28" cy="58" r="12" fill="url(#k2-metal)"/>
      {discTeeth(28, 58, 13, 10, '#4A8CC4')}
      <circle cx="28" cy="58" r="5" fill="#0A1E35"/>
      <circle cx="28" cy="58" r="3" fill="#88CCFF"/>
      <circle cx="92" cy="58" r="14" fill="#1A3A5C"/>
      <circle cx="92" cy="58" r="12" fill="url(#k2-metal)"/>
      {discTeeth(92, 58, 13, 10, '#4A8CC4')}
      <circle cx="92" cy="58" r="5" fill="#0A1E35"/>
      <circle cx="92" cy="58" r="3" fill="#88CCFF"/>
      {/* Arms */}
      <rect x="6" y="54" width="22" height="9" rx="4" fill="#0D3060"/>
      <rect x="8" y="56" width="18" height="5" rx="2" fill="#1565C0"/>
      <circle cx="8" cy="58" r="5" fill="#0D3060"/>
      <circle cx="8" cy="58" r="3.5" fill="#1565C0" stroke="#4A8CC4" strokeWidth="1"/>
      <rect x="92" y="54" width="22" height="9" rx="4" fill="#0D3060"/>
      <rect x="92" y="56" width="18" height="5" rx="2" fill="#1565C0"/>
      <circle cx="112" cy="58" r="5" fill="#0D3060"/>
      <circle cx="112" cy="58" r="3.5" fill="#1565C0" stroke="#4A8CC4" strokeWidth="1"/>
      {/* Head — large grinding wheel */}
      <circle cx="60" cy="28" r="22" fill="#1A3A5C"/>
      <circle cx="60" cy="28" r="20" fill="url(#k2-metal)"/>
      {discTeeth(60, 28, 21, 18, '#5A9CD4')}
      <circle cx="60" cy="28" r="8" fill="#0A1E35"/>
      <circle cx="60" cy="28" r="6" fill="#1565C0" stroke="#4A8CC4" strokeWidth="1.5"/>
      {/* Spark eyes */}
      <ellipse cx="52" cy="26" rx="4" ry="3" fill="#0A1E35"/>
      <ellipse cx="68" cy="26" rx="4" ry="3" fill="#0A1E35"/>
      <ellipse cx="52" cy="26" rx="3" ry="2" fill="#88CCFF"/>
      <ellipse cx="68" cy="26" rx="3" ry="2" fill="#88CCFF"/>
      <ellipse cx="52" cy="26" rx="1.5" ry="1" fill="#fff"/>
      <ellipse cx="68" cy="26" rx="1.5" ry="1" fill="#fff"/>
      <line x1="48" y1="24" x2="40" y2="18" stroke="#88CCFF" strokeWidth="1.5" opacity="0.9"/>
      <line x1="48" y1="26" x2="38" y2="24" stroke="#4A8CC4" strokeWidth="1" opacity="0.8"/>
      <line x1="50" y1="23" x2="44" y2="14" stroke="#fff" strokeWidth="0.8" opacity="0.7"/>
      <line x1="72" y1="24" x2="80" y2="18" stroke="#88CCFF" strokeWidth="1.5" opacity="0.9"/>
      <line x1="72" y1="26" x2="82" y2="24" stroke="#4A8CC4" strokeWidth="1" opacity="0.8"/>
      <line x1="70" y1="23" x2="76" y2="14" stroke="#fff" strokeWidth="0.8" opacity="0.7"/>
      <circle cx="40" cy="18" r="1.2" fill="#88CCFF" opacity="0.9"/>
      <circle cx="38" cy="24" r="0.9" fill="#fff" opacity="0.8"/>
      <circle cx="80" cy="18" r="1.2" fill="#88CCFF" opacity="0.9"/>
      <circle cx="82" cy="24" r="0.9" fill="#fff" opacity="0.8"/>
      {/* Grill mouth */}
      <rect x="48" y="32" width="24" height="9" rx="2" fill="#0A1E35"/>
      {[34,36.5,39].map(y => <rect key={y} x="49" y={y} width="22" height="1.5" rx="0.5" fill="#4A8CC4" opacity="0.7"/>)}
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#1565C020"/>
    </svg>
  )
}

function MonsterGatagata() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k3-body" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.6"/>
          <stop offset="60%" stopColor="#D97706" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#92400E" stopOpacity="0.1"/>
        </radialGradient>
        <radialGradient id="k3-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#D97706" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="k3-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9500" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#D97706" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="url(#k3-glow)"/>
      {/* Ghost body — wobbly like bad weld bead */}
      <path d="M22 108 Q18 88 20 68 Q14 50 18 34 Q24 14 42 8 Q60 4 78 8 Q96 14 102 34 Q106 50 100 68 Q102 88 98 108 Q88 98 80 104 Q72 98 64 106 Q56 98 48 106 Q40 98 32 104 Q24 98 22 108Z"
        fill="#D97706" opacity="0.15"/>
      <path d="M24 106 Q19 86 22 66 Q16 48 22 32 Q28 12 46 8 Q60 5 74 8 Q92 12 98 32 Q104 48 98 66 Q101 86 96 106 Q88 96 80 102 Q72 96 64 104 Q56 96 48 104 Q40 96 32 102 Q26 96 24 106Z"
        fill="url(#k3-body)"/>
      {/* Weld-bead ripple lines */}
      <path d="M26 55 Q34 48 44 52 Q52 56 60 50 Q68 44 78 50 Q86 54 94 50" stroke="#FCD34D" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M24 68 Q32 61 44 65 Q54 69 62 63 Q70 57 82 63 Q90 67 96 62" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M25 81 Q35 74 46 78 Q56 82 64 76 Q72 70 84 76 Q92 80 96 75" stroke="#FCD34D" strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round"/>
      {/* Spatter lumps */}
      <circle cx="20" cy="58" r="6" fill="#D97706" opacity="0.4"/>
      <circle cx="100" cy="62" r="7" fill="#D97706" opacity="0.4"/>
      <circle cx="18" cy="74" r="5" fill="#D97706" opacity="0.3"/>
      <circle cx="102" cy="78" r="5" fill="#D97706" opacity="0.3"/>
      {/* Wavy arms */}
      <path d="M24 68 Q10 60 6 54 Q2 48 8 44 Q12 40 16 46" stroke="#D97706" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M16 46 L10 42 M16 46 L12 52 M16 46 L20 40" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      <path d="M96 68 Q110 60 114 54 Q118 48 112 44 Q108 40 104 46" stroke="#D97706" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M104 46 L110 42 M104 46 L108 52 M104 46 L100 40" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      {/* Hollow eye sockets */}
      <ellipse cx="44" cy="36" rx="10" ry="12" fill="#1a0800" opacity="0.92"/>
      <ellipse cx="76" cy="36" rx="10" ry="12" fill="#1a0800" opacity="0.92"/>
      <ellipse cx="44" cy="37" rx="6" ry="8" fill="url(#k3-eye)"/>
      <ellipse cx="76" cy="37" rx="6" ry="8" fill="url(#k3-eye)"/>
      <ellipse cx="44" cy="38" rx="3" ry="4.5" fill="#FF9500" opacity="0.6"/>
      <ellipse cx="76" cy="38" rx="3" ry="4.5" fill="#FF9500" opacity="0.6"/>
      <ellipse cx="44" cy="38" rx="1.5" ry="2.5" fill="#050200"/>
      <ellipse cx="76" cy="38" rx="1.5" ry="2.5" fill="#050200"/>
      {/* Jagged mouth */}
      <path d="M38 58 L42 52 L46 58 L50 52 L54 58 L58 52 L62 58 L66 52 L70 58 L74 52 L78 58 L78 64 L38 64Z" fill="#1a0800" opacity="0.9"/>
      <path d="M40 62 Q50 58 60 62 Q70 58 76 62" stroke="#FF9500" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Floating sparks */}
      {[{x:14,y:30,r:1.8,c:'#FCD34D'},{x:8,y:42,r:1.2,c:'#FF9500'},{x:106,y:32,r:1.8,c:'#FCD34D'},{x:112,y:44,r:1.2,c:'#FF9500'},{x:18,y:18,r:1.4,c:'#FFE066'},{x:102,y:20,r:1.4,c:'#FFE066'},{x:30,y:10,r:1.0,c:'#FCD34D'},{x:90,y:12,r:1.0,c:'#FCD34D'},{x:60,y:4,r:1.5,c:'#FFB800'}].map((s,i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity="0.85"/>)}
      <line x1="14" y1="30" x2="20" y2="24" stroke="#FCD34D" strokeWidth="1.2" opacity="0.7"/>
      <line x1="106" y1="32" x2="100" y2="26" stroke="#FCD34D" strokeWidth="1.2" opacity="0.7"/>
      {/* Top wisps */}
      <path d="M52 6 Q48 -4 52 -6 Q56 -4 52 6" fill="#FCD34D" opacity="0.5"/>
      <path d="M68 6 Q72 -4 74 -2 Q72 4 68 6" fill="#FCD34D" opacity="0.45"/>
      <ellipse cx="60" cy="114" rx="26" ry="3.5" fill="#D9770618"/>
    </svg>
  )
}

function MonsterKaisaki() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="k4-armor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3D6B3D"/>
          <stop offset="100%" stopColor="#1A3A1A"/>
        </linearGradient>
        <radialGradient id="k4-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#059669" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="k4-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ade80"/>
          <stop offset="100%" stopColor="#059669" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="url(#k4-glow)"/>
      {/* Legs with greaves */}
      <rect x="40" y="90" width="14" height="24" rx="2" fill="#1A3A1A"/>
      <rect x="66" y="90" width="14" height="24" rx="2" fill="#1A3A1A"/>
      <rect x="39" y="92" width="16" height="20" rx="2" fill="url(#k4-armor)" stroke="#22c55e" strokeWidth="0.7" opacity="0.7"/>
      <rect x="65" y="92" width="16" height="20" rx="2" fill="url(#k4-armor)" stroke="#22c55e" strokeWidth="0.7" opacity="0.7"/>
      <path d="M38 100 L56 100 L56 106 L47 110 L38 106Z" fill="#2D4A2D" stroke="#22c55e" strokeWidth="0.8"/>
      <path d="M64 100 L82 100 L82 106 L73 110 L64 106Z" fill="#2D4A2D" stroke="#22c55e" strokeWidth="0.8"/>
      <line x1="39" y1="92" x2="55" y2="92" stroke="#22c55e" strokeWidth="0.8" opacity="0.7"/>
      <line x1="65" y1="92" x2="81" y2="92" stroke="#22c55e" strokeWidth="0.8" opacity="0.7"/>
      {/* Body armor */}
      <path d="M28 50 L24 90 L96 90 L92 50 L80 42 L40 42Z" fill="#1A3A1A"/>
      <path d="M32 53 L29 87 L91 87 L88 53 L78 46 L42 46Z" fill="url(#k4-armor)"/>
      {/* V-groove chest symbol */}
      <path d="M60 52 L46 76 L60 80 L74 76 Z" fill="#1A3A1A" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="60" y1="52" x2="60" y2="80" stroke="#22c55e" strokeWidth="1" opacity="0.6"/>
      <path d="M32 53 L29 87" stroke="#22c55e" strokeWidth="1" opacity="0.5"/>
      <path d="M88 53 L91 87" stroke="#22c55e" strokeWidth="1" opacity="0.5"/>
      <path d="M32 53 L42 46 L78 46 L88 53" stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.4"/>
      {/* Shoulder pauldrons */}
      <path d="M28 50 L18 44 L14 56 L22 62 L32 58Z" fill="#2D4A2D" stroke="#22c55e" strokeWidth="1"/>
      <path d="M92 50 L102 44 L106 56 L98 62 L88 58Z" fill="#2D4A2D" stroke="#22c55e" strokeWidth="1"/>
      {/* Shield */}
      <path d="M4 52 L8 46 L24 46 L28 52 L26 72 L16 80 L6 72Z" fill="#1A3A1A" stroke="#22c55e" strokeWidth="1.2"/>
      <path d="M6 54 L10 49 L22 49 L26 54 L24 70 L16 77 L8 70Z" fill="#2D4A2D"/>
      <polygon points="16,56 10,70 22,70" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="16" y1="56" x2="16" y2="70" stroke="#059669" strokeWidth="1" opacity="0.6"/>
      <path d="M6 54 L10 49 L22 49 L26 54" stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Torch-lance (right arm raised) */}
      <path d="M92 54 L104 38 L108 28" stroke="#2D4A2D" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M92 54 L104 38 L108 28" stroke="#3D6B3D" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <rect x="104" y="4" width="6" height="28" rx="2" fill="#2D4A2D" transform="rotate(15 107 18)"/>
      <rect x="105" y="5" width="4" height="26" rx="1" fill="#3D6B3D" transform="rotate(15 107 18)"/>
      <path d="M108 10 L112 6 L116 10 L114 18 L110 18Z" fill="#888" transform="rotate(15 112 12)"/>
      <path d="M110 6 Q106 -2 112 -6 Q116 -2 114 4" fill="#22c55e" opacity="0.9" transform="rotate(15 112 0)"/>
      <ellipse cx="111" cy="4" rx="2" ry="3" fill="#86efac" opacity="0.8" transform="rotate(15 111 4)"/>
      <ellipse cx="111" cy="3" rx="1" ry="1.5" fill="#fff" opacity="0.9" transform="rotate(15 111 3)"/>
      <circle cx="106" cy="2" r="1.2" fill="#4ade80" opacity="0.9"/>
      <circle cx="118" cy="8" r="1" fill="#86efac" opacity="0.8"/>
      <circle cx="104" cy="10" r="0.8" fill="#22c55e" opacity="0.7"/>
      {/* Helmet */}
      <path d="M26 38 L28 16 Q32 4 60 2 Q88 4 92 16 L94 38 L88 44 L32 44Z" fill="#1A3A1A"/>
      <path d="M30 38 L32 18 Q36 8 60 6 Q84 8 88 18 L90 38 L85 42 L35 42Z" fill="url(#k4-armor)"/>
      <path d="M52 2 L50 -2 L60 -4 L70 -2 L68 2" fill="#2D4A2D" stroke="#22c55e" strokeWidth="0.8"/>
      {/* V-groove visor */}
      <path d="M32 28 L60 38 L88 28 L84 24 L60 34 L36 24Z" fill="#0a1f0a"/>
      <path d="M36 26 L60 35 L84 26" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.9"/>
      <ellipse cx="46" cy="28" rx="5" ry="3" fill="url(#k4-eye)" opacity="0.9"/>
      <ellipse cx="74" cy="28" rx="5" ry="3" fill="url(#k4-eye)" opacity="0.9"/>
      <ellipse cx="46" cy="28" rx="2.5" ry="1.5" fill="#4ade80"/>
      <ellipse cx="74" cy="28" rx="2.5" ry="1.5" fill="#4ade80"/>
      <path d="M26 38 L22 30 L24 18 L28 16" fill="#1A3A1A" stroke="#22c55e" strokeWidth="0.7" opacity="0.5"/>
      <path d="M94 38 L98 30 L96 18 L92 16" fill="#1A3A1A" stroke="#22c55e" strokeWidth="0.7" opacity="0.5"/>
      <path d="M30 38 L32 18" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
      <path d="M90 38 L88 18" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#05966920"/>
    </svg>
  )
}

function MonsterBuroohoru() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k5-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="k5-void" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DDD6FE"/>
          <stop offset="40%" stopColor="#7C3AED"/>
          <stop offset="100%" stopColor="#0D0D1A" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="k5-void2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C4B5FD"/>
          <stop offset="50%" stopColor="#6D28D9"/>
          <stop offset="100%" stopColor="#0D0D1A" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="54" ry="54" fill="url(#k5-glow)"/>
      {/* Tentacle arms */}
      <path d="M26 72 Q14 64 8 56 Q4 48 10 42 Q14 38 18 44 Q16 50 22 56 Q28 62 26 72Z" fill="#4C1D95" stroke="#7C3AED" strokeWidth="0.8"/>
      <path d="M18 44 L12 40 M18 44 L14 50 M18 44 L22 38" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M94 72 Q106 64 112 56 Q116 48 110 42 Q106 38 102 44 Q104 50 98 56 Q92 62 94 72Z" fill="#4C1D95" stroke="#7C3AED" strokeWidth="0.8"/>
      <path d="M102 44 L108 40 M102 44 L106 50 M102 44 L98 38" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Lower tentacles */}
      <path d="M34 98 Q22 104 18 114" stroke="#4C1D95" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M18 114 L14 110 M18 114 L16 118" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M86 98 Q98 104 102 114" stroke="#4C1D95" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M102 114 L106 110 M102 114 L104 118" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Main body */}
      <path d="M20 80 Q14 58 20 40 Q28 14 60 10 Q92 14 100 40 Q106 58 100 80 Q96 100 80 108 Q60 116 40 108 Q24 100 20 80Z" fill="#2D1A4A"/>
      <path d="M24 78 Q18 58 24 42 Q32 18 60 14 Q88 18 96 42 Q102 58 96 78 Q92 96 76 104 Q60 112 44 104 Q28 96 24 78Z" fill="#3B2260"/>
      {/* Void holes */}
      <circle cx="44" cy="44" r="12" fill="#0D0D1A"/>
      <circle cx="44" cy="44" r="9" fill="#1a0a2e"/>
      <circle cx="44" cy="44" r="6" fill="url(#k5-void)"/>
      <circle cx="44" cy="44" r="2.5" fill="#DDD6FE" opacity="0.9"/>
      <circle cx="76" cy="40" r="11" fill="#0D0D1A"/>
      <circle cx="76" cy="40" r="8" fill="#1a0a2e"/>
      <circle cx="76" cy="40" r="5.5" fill="url(#k5-void2)"/>
      <circle cx="76" cy="40" r="2" fill="#C4B5FD" opacity="0.9"/>
      <circle cx="36" cy="68" r="9" fill="#0D0D1A"/>
      <circle cx="36" cy="68" r="6.5" fill="#1a0a2e"/>
      <circle cx="36" cy="68" r="4" fill="url(#k5-void)"/>
      <circle cx="36" cy="68" r="1.5" fill="#DDD6FE" opacity="0.85"/>
      <circle cx="66" cy="64" r="10" fill="#0D0D1A"/>
      <circle cx="66" cy="64" r="7.5" fill="#1a0a2e"/>
      <circle cx="66" cy="64" r="5" fill="url(#k5-void2)"/>
      <circle cx="66" cy="64" r="2" fill="#C4B5FD" opacity="0.9"/>
      <circle cx="42" cy="88" r="8" fill="#0D0D1A"/>
      <circle cx="42" cy="88" r="5.5" fill="#1a0a2e"/>
      <circle cx="42" cy="88" r="3.5" fill="url(#k5-void)"/>
      <circle cx="42" cy="88" r="1.5" fill="#DDD6FE" opacity="0.8"/>
      <circle cx="76" cy="84" r="7" fill="#0D0D1A"/>
      <circle cx="76" cy="84" r="5" fill="#1a0a2e"/>
      <circle cx="76" cy="84" r="3" fill="url(#k5-void2)"/>
      <circle cx="76" cy="84" r="1.2" fill="#C4B5FD" opacity="0.8"/>
      <circle cx="58" cy="28" r="6" fill="#0D0D1A"/>
      <circle cx="58" cy="28" r="4" fill="#1a0a2e"/>
      <circle cx="58" cy="28" r="2.5" fill="url(#k5-void)"/>
      <circle cx="58" cy="28" r="1" fill="#DDD6FE" opacity="0.75"/>
      {/* Eyes */}
      <circle cx="48" cy="32" r="9" fill="#0D0D1A"/>
      <circle cx="72" cy="32" r="9" fill="#0D0D1A"/>
      <circle cx="48" cy="32" r="6.5" fill="#7C3AED" opacity="0.85"/>
      <circle cx="72" cy="32" r="6.5" fill="#7C3AED" opacity="0.85"/>
      <circle cx="48" cy="32" r="3.5" fill="#D8B4FE"/>
      <circle cx="72" cy="32" r="3.5" fill="#D8B4FE"/>
      <circle cx="48" cy="31" r="1.5" fill="#fff" opacity="0.9"/>
      <circle cx="72" cy="31" r="1.5" fill="#fff" opacity="0.9"/>
      <circle cx="48" cy="32" r="11" fill="none" stroke="#7C3AED" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="72" cy="32" r="11" fill="none" stroke="#7C3AED" strokeWidth="1.5" opacity="0.4"/>
      {/* Ragged maw */}
      <path d="M40 50 Q60 42 80 50 L78 56 L74 50 L70 57 L66 50 L62 57 L58 50 L54 57 L50 50 L46 57 L42 50Z" fill="#0D0D1A" opacity="0.95"/>
      <path d="M40 50 Q60 44 80 50" stroke="#9333EA" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M44 53 Q60 48 76 53" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* Void particles */}
      {[{x:18,y:50},{x:102,y:46},{x:16,y:70},{x:104,y:68},{x:26,y:30},{x:96,y:28}].map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill="#7C3AED" opacity="0.6"/>)}
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#7C3AED22"/>
    </svg>
  )
}

function MonsterShikaku() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k6-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="k6-scale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B91C1C"/>
          <stop offset="100%" stopColor="#7F1D1D"/>
        </linearGradient>
        <linearGradient id="k6-scroll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7"/>
          <stop offset="100%" stopColor="#fde68a"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="64" rx="54" ry="50" fill="url(#k6-glow)"/>
      {/* Tail */}
      <path d="M86 96 Q104 100 114 90 Q120 82 112 76 Q108 72 104 78 Q108 84 102 88 Q94 92 86 96Z" fill="#9B1C1C" stroke="#DC2626" strokeWidth="0.5"/>
      <circle cx="108" cy="82" r="3" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.7"/>
      {/* Wings — scroll wings */}
      <path d="M28 58 Q10 44 4 24 Q8 18 14 22 Q12 38 28 48" fill="#7F1D1D" opacity="0.9"/>
      <path d="M28 58 Q14 46 12 28 Q16 22 20 28 Q18 40 28 48" fill="#9B1C1C"/>
      <ellipse cx="6" cy="23" rx="4" ry="5" fill="url(#k6-scroll)" opacity="0.9"/>
      <ellipse cx="6" cy="23" rx="2.5" ry="3.5" fill="#fde68a"/>
      {[20,22,24].map(y => <line key={y} x1="4" y1={y} x2="8" y2={y} stroke="#92400E" strokeWidth="0.8" opacity="0.6"/>)}
      <path d="M92 58 Q110 44 116 24 Q112 18 106 22 Q108 38 92 48" fill="#7F1D1D" opacity="0.9"/>
      <path d="M92 58 Q106 46 108 28 Q104 22 100 28 Q102 40 92 48" fill="#9B1C1C"/>
      <ellipse cx="114" cy="23" rx="4" ry="5" fill="url(#k6-scroll)" opacity="0.9"/>
      <ellipse cx="114" cy="23" rx="2.5" ry="3.5" fill="#fde68a"/>
      {[20,22,24].map(y => <line key={y} x1="112" y1={y} x2="116" y2={y} stroke="#92400E" strokeWidth="0.8" opacity="0.6"/>)}
      {/* Body */}
      <path d="M32 58 L28 96 L92 96 L88 58 L76 50 L44 50Z" fill="#9B1C1C"/>
      <path d="M36 61 L33 93 L87 93 L84 61 L74 54 L46 54Z" fill="url(#k6-scale)"/>
      {/* Scale texture */}
      {[[44,62],[56,62],[68,62],[38,72],[50,72],[62,72],[74,72],[44,82],[56,82],[68,82]].map(([x,y],i) => <path key={i} d={`M${x} ${y} Q${x+6} ${y+7} ${x+12} ${y}`} fill="none" stroke="#DC2626" strokeWidth="1.2" opacity="0.5"/>)}
      {/* Gold stamp marks */}
      {[[48,68],[72,70],[60,82],[42,80],[78,80]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2.5" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.6"/>)}
      {/* Certification stamp claw */}
      <path d="M32 66 Q16 60 10 72" stroke="#9B1C1C" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <circle cx="10" cy="72" r="10" fill="#FFB800"/>
      <circle cx="10" cy="72" r="8" fill="#F59E0B"/>
      <text x="6" y="76" fontSize="9" fontWeight="bold" fill="#7F1D1D" fontFamily="monospace">認</text>
      <circle cx="10" cy="72" r="9" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.6"/>
      {/* Right claw */}
      <path d="M88 66 Q102 58 108 50" stroke="#9B1C1C" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M108 50 L112 44 M108 50 L114 52 M108 50 L110 58" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
      {/* Neck */}
      <rect x="44" y="34" width="32" height="20" rx="4" fill="#9B1C1C"/>
      <rect x="47" y="36" width="26" height="16" rx="3" fill="#B91C1C"/>
      {/* Head */}
      <path d="M24 26 Q28 4 60 2 Q92 4 96 26 L92 42 L28 42Z" fill="#B91C1C"/>
      <path d="M28 26 Q32 8 60 6 Q88 8 92 26 L89 40 L31 40Z" fill="#DC2626"/>
      {/* Head scales */}
      {[[36,16],[48,16],[60,16],[72,16],[42,26],[54,26],[66,26]].map(([x,y],i) => <path key={i} d={`M${x} ${y} Q${x+5} ${y+6} ${x+10} ${y}`} fill="none" stroke="#9B1C1C" strokeWidth="1" opacity="0.6"/>)}
      {/* Crown of rolled certificates */}
      {[{cx:38,cy:8,rx:5,ry:7},{cx:50,cy:4,rx:4,ry:6},{cx:60,cy:2,rx:5,ry:7},{cx:70,cy:4,rx:4,ry:6},{cx:82,cy:8,rx:5,ry:7}].map((s,i) => (
        <g key={i}>
          <ellipse cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill="url(#k6-scroll)"/>
          <ellipse cx={s.cx} cy={s.cy} rx={s.rx-1.5} ry={s.ry-1.5} fill="#fde68a"/>
          <line x1={s.cx-s.rx+1} y1={s.cy-1} x2={s.cx+s.rx-1} y2={s.cy-1} stroke="#92400E" strokeWidth="0.6" opacity="0.6"/>
          <line x1={s.cx-s.rx+1} y1={s.cy+1} x2={s.cx+s.rx-1} y2={s.cy+1} stroke="#92400E" strokeWidth="0.6" opacity="0.5"/>
          <circle cx={s.cx} cy={s.cy} r="1" fill="#DC2626" opacity="0.5"/>
        </g>
      ))}
      {/* Eyes */}
      <ellipse cx="44" cy="22" rx="7" ry="5.5" fill="#0D0000"/>
      <ellipse cx="76" cy="22" rx="7" ry="5.5" fill="#0D0000"/>
      <ellipse cx="44" cy="22" rx="4.5" ry="3.5" fill="#FF0000"/>
      <ellipse cx="76" cy="22" rx="4.5" ry="3.5" fill="#FF0000"/>
      <circle cx="44" cy="22" r="2" fill="#FFB800"/>
      <circle cx="76" cy="22" r="2" fill="#FFB800"/>
      <circle cx="44" cy="21" r="1" fill="#fff" opacity="0.7"/>
      <circle cx="76" cy="21" r="1" fill="#fff" opacity="0.7"/>
      <path d="M36 17 L50 21" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M84 17 L70 21" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Snout */}
      <path d="M44 32 Q60 38 76 32 L74 36 Q60 42 46 36Z" fill="#9B1C1C"/>
      <circle cx="54" cy="35" r="2" fill="#7F1D1D"/>
      <circle cx="66" cy="35" r="2" fill="#7F1D1D"/>
      {/* Fire breath */}
      <path d="M50 38 Q44 50 40 60 Q36 68 42 72" stroke="#1E90FF" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M60 40 Q56 52 54 64 Q52 72 56 76" stroke="#FFB800" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M70 38 Q76 50 78 62 Q80 70 76 74" stroke="#1E90FF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75"/>
      <circle cx="42" cy="72" r="4" fill="#FF4400" opacity="0.6"/>
      <circle cx="56" cy="76" r="3" fill="#FF8800" opacity="0.6"/>
      <circle cx="76" cy="74" r="3.5" fill="#FF4400" opacity="0.55"/>
      {/* Kanji in fire */}
      <text x="38" y="66" fontSize="6" fill="#FFE066" fontFamily="monospace" opacity="0.8">合</text>
      <text x="52" y="70" fontSize="6" fill="#FFE066" fontFamily="monospace" opacity="0.7">格</text>
      <text x="66" y="68" fontSize="6" fill="#FFE066" fontFamily="monospace" opacity="0.75">証</text>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#DC262622"/>
    </svg>
  )
}

const MONSTER_SVGS = [
  MonsterKinshi,
  MonsterGuraindaa,
  MonsterGatagata,
  MonsterKaisaki,
  MonsterBuroohoru,
  MonsterShikaku,
]

// ── BATTLE SCREEN ────────────────────────────────────────────
function Battle({
  stage, si, qs, qi,
  pHP, mHP, correct, miss,
  sel, done, bgFlash,
  monsterAnim, playerShake, floatMonster, floatPlayer, pending,
  onAnswer, onNext, onQuit,
}) {
  const q   = qs[qi]
  const mon = MONSTERS[si] || MONSTERS[0]
  if (!q) return null
  const OPTS = ['A','B','C','D']

  const questionRef = useRef(null)

  // Body shake on player damage
  useEffect(() => {
    if (playerShake) {
      document.body.style.animation = 'wf-body-shake 0.4s ease'
      const t = setTimeout(() => { document.body.style.animation = '' }, 420)
      return () => clearTimeout(t)
    }
  }, [playerShake])

  // Smooth scroll to question when a new question loads
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior:'smooth', block:'nearest' })
    }
  }, [qi])

  function optStyle(i) {
    const base = {
      width:'100%', padding:'14px 16px', marginBottom:8,
      background:'#141414', border:'1px solid #252525',
      borderRadius:8, color:'#e8e8e8', textAlign:'left',
      cursor: done ? 'default' : 'pointer',
      fontSize:'clamp(0.75rem, 3.2vw, 0.82rem)', fontFamily:'monospace', lineHeight:1.5,
      transition:'all 0.15s', minHeight:48,
      wordWrap:'break-word', touchAction:'manipulation',
      WebkitTapHighlightColor:'transparent',
    }
    if (!done) return base
    if (i === q.a)              return { ...base, background:'#0f2a0f', border:'1px solid #22c55e', color:'#86efac', boxShadow:'0 0 12px #22c55e44' }
    if (i === sel && sel!==q.a) return { ...base, background:'#2a0f0f', border:'1px solid #ef4444', color:'#fca5a5', boxShadow:'0 0 12px #ef444444' }
    return { ...base, opacity:0.35 }
  }

  const bg = bgFlash === 'correct' ? '#081a08' : bgFlash === 'wrong' ? '#160404' : '#0d0d0d'

  const monAnimStyle = monsterAnim === 'shake' ? 'wf-mshake 0.38s ease'
                     : monsterAnim === 'death' ? 'wf-mdeath 0.65s ease forwards'
                     : 'none'

  const turnNum = correct + miss + (done ? 1 : 0)

  return (
    <div style={{ background:bg, minHeight:'100vh', fontFamily:'monospace',
      transition:'background 0.3s', paddingBottom:70 }}>

      {/* Full-screen red flash on player damage */}
      {bgFlash === 'wrong' && !pending && (
        <div style={{ position:'fixed', inset:0, background:'#cc0000',
          animation:'wf-red-flash 0.4s ease forwards', pointerEvents:'none', zIndex:490 }}/>
      )}
      {/* Victory green flash overlay */}
      {pending === 'victory' && (
        <div style={{ position:'fixed', inset:0, background:'#00ff0055',
          animation:'wf-vflash 0.75s ease forwards', pointerEvents:'none', zIndex:500 }}/>
      )}
      {/* Defeat dark overlay */}
      {pending === 'defeat' && (
        <div style={{ position:'fixed', inset:0, background:'#cc000077',
          animation:'wf-doverlay 0.4s ease forwards', pointerEvents:'none', zIndex:500 }}/>
      )}

      {/* Sticky HP bars — always visible at top */}
      <div style={{ position:'sticky', top:0, zIndex:20,
        background: bg === '#0d0d0d' ? '#0d0d0d' : bg,
        borderBottom:'1px solid #222', padding:'8px 12px 8px',
        transition:'background 0.3s' }}>
        {/* Player HP */}
        <div style={{
          position:'relative', overflow:'hidden',
          animation: pending === 'defeat' ? 'wf-pcollapse 0.5s 0.3s ease forwards'
                   : playerShake           ? 'wf-pshake 0.32s ease'
                   : 'none',
        }}>
          <HPBar cur={pHP} max={P_HP} label="⚡ SMITH (YOU)"/>
          {floatPlayer && (
            <div key={floatPlayer.k} style={{
              position:'absolute', top:'50%', left:'50%',
              color:'#ff4444', fontWeight:'900', fontSize:'2rem',
              fontFamily:"'Orbitron',monospace", pointerEvents:'none',
              animation:'wf-dmg-float 0.9s ease forwards',
              textShadow:'0 0 20px #ef4444, 0 0 40px #cc000099', whiteSpace:'nowrap',
              zIndex:50,
            }}>{floatPlayer.text}</div>
          )}
        </div>
        {/* Monster HP */}
        <div style={{ marginTop:5, position:'relative', overflow:'hidden' }}>
          <HPBar cur={mHP} max={M_HP} label={mon.name}/>
          {floatMonster && (
            <div key={floatMonster.k} style={{
              position:'absolute', top:'10%', right:'12px',
              color:'#4ade80', fontWeight:'900', fontSize:'1.2rem',
              fontFamily:"'Orbitron',monospace", pointerEvents:'none',
              animation:'wf-float 0.8s ease forwards',
              textShadow:'0 0 16px #22c55e, 0 0 32px #22c55e66', whiteSpace:'nowrap',
            }}>{floatMonster.text}</div>
          )}
        </div>
        {/* Turn counter row */}
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', marginTop:5 }}>
          <button onClick={onQuit} style={{ ...styles.btnGhost, fontSize:'0.62rem', padding:'3px 9px' }}>
            ✕ Quit
          </button>
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:'0.58rem',
            color:'#555', letterSpacing:'0.05em', textAlign:'center' }}>
            Q{turnNum}/{WINS}
            &nbsp;·&nbsp;
            <span style={{ color:'#22c55e' }}>✓{correct}</span>
            &nbsp;
            <span style={{ color:'#ef4444' }}>✗{miss}</span>
          </div>
          <div style={{ fontSize:'0.56rem', color:'#444', fontFamily:"'Share Tech Mono',monospace",
            maxWidth:100, textAlign:'right', lineHeight:1.2 }}>
            {stage.label.replace(/^STAGE \d+ — /,'')}
          </div>
        </div>
      </div>

      {/* Monster SVG display */}
      <div style={{ padding:'8px 12px', position:'relative' }}>
        <div style={{ background:'#111', borderRadius:10, padding:'8px 14px',
          marginBottom:10, position:'relative', overflow:'hidden' }}>
          <div style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            width:180, height:180, borderRadius:'50%',
            background:`radial-gradient(ellipse, ${mon.color}22 0%, transparent 70%)`,
            pointerEvents:'none',
          }}/>
          <div key={qi} className="wf-mon-wrap" style={{
            textAlign:'center', margin:'6px 0 2px',
            animation: monAnimStyle !== 'none' ? monAnimStyle : 'wf-mon-entry 0.4s ease',
            opacity: 0.4 + (mHP/M_HP)*0.6,
            filter: `brightness(${0.5 + (mHP/M_HP)*0.6}) saturate(${0.6 + (mHP/M_HP)*0.5})`,
          }}>
            {(() => { const SVG = MONSTER_SVGS[si] || MONSTER_SVGS[0]; return <SVG/> })()}
            <div style={{ color:mon.color, fontSize:'clamp(0.7rem, 3vw, 0.85rem)', fontWeight:'700',
              fontFamily:"'Orbitron',monospace",
              letterSpacing:'0.06em', textShadow:`0 0 8px ${mon.color}88`, marginTop:2 }}>
              {mon.name}
            </div>
          </div>
        </div>

        {/* Question */}
        <div ref={questionRef} style={{ background:'#111', borderRadius:10, padding:'12px 14px', marginBottom:10,
          borderLeft:'4px solid #1E90FF', border:'1px solid #2a2a2a',
          borderLeftWidth:4, borderLeftColor:'#1E90FF', borderLeftStyle:'solid' }}>
          <div style={{ fontSize:'0.58rem', color:'#1E90FF99', marginBottom:6,
            fontFamily:"'Share Tech Mono',monospace", letterSpacing:'0.06em' }}>
            [{q.cat}]&nbsp;&nbsp;<span style={{ color:'#FFB80088' }}>+{q.xp} XP if correct</span>
          </div>
          <div style={{ color:'#f0f0f0', fontSize:'clamp(0.8rem, 3.5vw, 0.9rem)', lineHeight:1.6, marginBottom:14,
            fontFamily:"'Share Tech Mono',monospace" }}>
            {q.q}
          </div>
          {q.opts.map((opt, i) => (
            <button key={i}
              className={`wf-answer-btn${done && i === q.a ? ' wf-correct-btn' : ''}`}
              onClick={() => !done && onAnswer(i)} style={optStyle(i)}>
              <span style={{ color:'#1E90FF', fontWeight:'bold', marginRight:8,
                fontFamily:"'Orbitron',monospace", fontSize:'0.7rem' }}>{OPTS[i]}.</span>
              {opt}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {done && (
          <div style={{
            background: sel===q.a ? '#081808' : '#180808',
            border:`1px solid ${sel===q.a ? '#22c55e' : '#ef4444'}`,
            borderRadius:10, padding:'12px 14px',
          }}>
            <div style={{ color: sel===q.a ? '#22c55e' : '#ef4444',
              fontWeight:'bold', fontSize:'0.85rem', marginBottom:4,
              fontFamily:"'Orbitron',monospace", letterSpacing:'0.04em' }}>
              {sel===q.a
                ? `✓ CORRECT! +${q.xp} XP`
                : `✗ WRONG! Correct: ${OPTS[q.a]} · -${P_DMG} HP`}
            </div>
            <div style={{ color:'#ccc', fontSize:'0.72rem', lineHeight:1.55, marginBottom:10,
              fontFamily:"'Share Tech Mono',monospace" }}>
              {q.exp}
            </div>
            <button onClick={() => { playSound('click'); onNext() }}
              style={{ ...styles.btnPrimary, width:'100%' }}>
              NEXT QUESTION →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── VICTORY SCREEN ───────────────────────────────────────────
function Victory({ stage, si, sessionXP, correct, miss, onContinue, onReview }) {
  const mon = MONSTERS[si] || MONSTERS[0]
  const [flash,     setFlash]     = useState(true)
  const [displayXP, setDisplayXP] = useState(0)
  const accuracy = (correct + miss) > 0 ? Math.round(correct / (correct + miss) * 100) : 100
  const perfect  = miss === 0

  useEffect(() => {
    playSound('victory')
    const t = setTimeout(() => setFlash(false), 950)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (sessionXP <= 0) return
    let cur = 0
    const step  = Math.max(1, Math.ceil(sessionXP / 40))
    const timer = setInterval(() => {
      cur = Math.min(cur + step, sessionXP)
      setDisplayXP(cur)
      if (cur >= sessionXP) clearInterval(timer)
    }, 35)
    return () => clearInterval(timer)
  }, [sessionXP])
  return (
    <div style={{ ...styles.page, background:'#060e06', justifyContent:'center',
      alignItems:'center', textAlign:'center', position:'relative', overflow:'hidden' }}>
      {flash && (
        <div style={{ position:'fixed', inset:0, background:'#00ff0066',
          animation:'wf-vflash 0.95s ease forwards', pointerEvents:'none', zIndex:100 }}/>
      )}
      {/* Confetti explosion */}
      {[
        { left:'10%', top:'5%',  color:'#1E90FF', size:10, anim:'wf-conf-1 2.2s 0.0s ease-out forwards' },
        { left:'22%', top:'8%',  color:'#FFB800', size:8,  anim:'wf-conf-2 2.5s 0.1s ease-out forwards' },
        { left:'35%', top:'3%',  color:'#22c55e', size:12, anim:'wf-conf-3 2.0s 0.2s ease-out forwards' },
        { left:'50%', top:'6%',  color:'#FF4400', size:9,  anim:'wf-conf-4 2.3s 0.05s ease-out forwards' },
        { left:'63%', top:'4%',  color:'#FFB800', size:11, anim:'wf-conf-5 2.1s 0.3s ease-out forwards' },
        { left:'75%', top:'7%',  color:'#22c55e', size:8,  anim:'wf-conf-1 2.4s 0.15s ease-out forwards' },
        { left:'88%', top:'2%',  color:'#1E90FF', size:10, anim:'wf-conf-2 2.6s 0.25s ease-out forwards' },
        { left:'18%', top:'12%', color:'#4ade80', size:7,  anim:'wf-conf-3 1.9s 0.4s ease-out forwards' },
        { left:'42%', top:'10%', color:'#FFB800', size:9,  anim:'wf-conf-4 2.2s 0.35s ease-out forwards' },
        { left:'68%', top:'11%', color:'#1E90FF', size:11, anim:'wf-conf-5 2.0s 0.1s ease-out forwards' },
        { left:'82%', top:'9%',  color:'#22c55e', size:8,  anim:'wf-conf-1 2.5s 0.45s ease-out forwards' },
        { left:'5%',  top:'14%', color:'#FFB800', size:10, anim:'wf-conf-2 2.3s 0.2s ease-out forwards' },
        { left:'56%', top:'13%', color:'#FF4400', size:7,  anim:'wf-conf-3 2.1s 0.5s ease-out forwards' },
        { left:'30%', top:'1%',  color:'#4ade80', size:12, anim:'wf-conf-4 2.4s 0.0s ease-out forwards' },
        { left:'92%', top:'15%', color:'#FFB800', size:9,  anim:'wf-conf-5 2.2s 0.3s ease-out forwards' },
      ].map((c, idx) => (
        <div key={idx} style={{
          position:'fixed', left:c.left, top:c.top,
          width:c.size, height:c.size, background:c.color,
          borderRadius:2, animation:c.anim, pointerEvents:'none', zIndex:50,
          boxShadow:`0 0 ${c.size}px ${c.color}88`,
        }}/>
      ))}
      <div style={{ fontSize:80, marginBottom:8, animation:'wf-trophy-bounce 1.4s ease-in-out infinite' }}>🏆</div>
      <div style={{ color:'#22c55e', fontSize:'1.9rem', fontWeight:'900',
        fontFamily:"'Orbitron',monospace", letterSpacing:'0.08em',
        textShadow:'0 0 20px #22c55e88,0 0 40px #22c55e44', marginBottom:4 }}>VICTORY!</div>
      {perfect && (
        <div style={{
          background:'linear-gradient(135deg,#FFB800,#1E90FF)', color:'#111',
          fontFamily:"'Orbitron',monospace", fontSize:'0.68rem', fontWeight:'900',
          letterSpacing:'0.08em', padding:'4px 14px', borderRadius:20,
          marginBottom:6, boxShadow:'0 0 18px #FFB80088',
        }}>⭐ PERFECT! NO MISSES ⭐</div>
      )}
      <div style={{ color:'#86efac', fontSize:'0.8rem', fontFamily:"'Share Tech Mono',monospace",
        marginBottom:2 }}>
        {mon.name} defeated!
      </div>
      <div style={{ color:'#555', fontSize:'0.65rem', fontFamily:"'Share Tech Mono',monospace",
        marginBottom:16 }}>
        {stage.label.replace(/^STAGE \d+ — /,'')}
      </div>

      {/* Stats card */}
      <div style={{ background:'#0a140a', border:'1px solid #22c55e22',
        borderRadius:12, padding:'14px 24px', marginBottom:16, width:'100%', maxWidth:280 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
          {[
            { label:'CORRECT', value: correct, color:'#22c55e', icon:'✓' },
            { label:'MISSES',  value: miss,    color: miss===0 ? '#22c55e' : '#ef4444', icon:'✗' },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ color:s.color, fontSize:'1.6rem', fontWeight:'900',
                fontFamily:"'Orbitron',monospace" }}>
                {s.icon}{s.value}
              </div>
              <div style={{ color:'#444', fontSize:'0.54rem', fontFamily:"'Share Tech Mono',monospace",
                letterSpacing:'0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid #1a3a1a', paddingTop:10,
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ color:'#FFB800', fontSize:'1.4rem', fontWeight:'900',
              fontFamily:"'Orbitron',monospace" }}>+{displayXP}</div>
            <div style={{ color:'#444', fontSize:'0.54rem', fontFamily:"'Share Tech Mono',monospace" }}>XP EARNED</div>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ color: accuracy===100 ? '#FFB800' : accuracy>=70 ? '#22c55e' : '#f59e0b',
              fontSize:'1.4rem', fontWeight:'900', fontFamily:"'Orbitron',monospace" }}>
              {accuracy}%
            </div>
            <div style={{ color:'#444', fontSize:'0.54rem', fontFamily:"'Share Tech Mono',monospace" }}>ACCURACY</div>
          </div>
        </div>
      </div>

      <SmithSVG size={60}/>
      <button onClick={() => { playSound('click'); onContinue() }}
        style={{ ...styles.btnPrimary, background:'linear-gradient(135deg,#16a34a,#15803d)',
          marginTop:20, padding:'14px 36px', fontSize:'1rem', letterSpacing:'0.1em' }}>
        CONTINUE →
      </button>
      <button onClick={() => { playSound('click'); onReview() }}
        style={{ ...styles.btnGhost, marginTop:10, width:220, padding:'11px' }}>
        📋 Review Answers
      </button>
    </div>
  )
}

// ── DEFEAT SCREEN ────────────────────────────────────────────
function Defeat({ si, correct, miss, onRetry, onQuit, onReview }) {
  const mon = MONSTERS[si] || MONSTERS[0]
  const [overlay, setOverlay] = useState(true)
  useEffect(() => {
    playSound('defeat')
    const t = setTimeout(() => setOverlay(false), 600)
    return () => clearTimeout(t)
  }, [])
  return (
    <div style={{ ...styles.page, background:'#0e0606', justifyContent:'center',
      alignItems:'center', textAlign:'center', position:'relative', overflow:'hidden' }}>
      {overlay && (
        <div style={{ position:'fixed', inset:0, background:'#330000',
          animation:'wf-doverlay 0.6s ease forwards', pointerEvents:'none', zIndex:100 }}/>
      )}
      {/* Screen cracks overlay */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:90, overflow:'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 480 900" preserveAspectRatio="xMidYMid slice"
          style={{ opacity:0.25 }}>
          <line x1="240" y1="0"   x2="80"  y2="300" stroke="#ff4444" strokeWidth="2"/>
          <line x1="80"  y1="300" x2="160" y2="500" stroke="#ff4444" strokeWidth="1.5"/>
          <line x1="160" y1="500" x2="40"  y2="900" stroke="#ff4444" strokeWidth="1"/>
          <line x1="240" y1="0"   x2="380" y2="250" stroke="#ff6666" strokeWidth="1.5"/>
          <line x1="380" y1="250" x2="320" y2="450" stroke="#ff6666" strokeWidth="1"/>
          <line x1="320" y1="450" x2="440" y2="700" stroke="#ff6666" strokeWidth="0.8"/>
          <line x1="120" y1="0"   x2="200" y2="200" stroke="#ff4444" strokeWidth="1"/>
          <line x1="200" y1="200" x2="100" y2="380" stroke="#ff4444" strokeWidth="0.8"/>
          <line x1="360" y1="0"   x2="280" y2="180" stroke="#ff6666" strokeWidth="1"/>
          <line x1="280" y1="180" x2="400" y2="360" stroke="#ff6666" strokeWidth="0.7"/>
          <line x1="80"  y1="300" x2="20"  y2="420" stroke="#ff4444" strokeWidth="1"/>
          <line x1="380" y1="250" x2="460" y2="350" stroke="#ff6666" strokeWidth="0.8"/>
        </svg>
      </div>
      <div style={{ position:'relative', zIndex:1, display:'contents' }}>
        <div style={{ fontSize:72, marginBottom:8, animation:'wf-skull-shake 0.6s ease' }}>💀</div>
        <div style={{ color:'#ef4444', fontSize:'1.9rem', fontWeight:'900',
          fontFamily:"'Orbitron',monospace", letterSpacing:'0.08em',
          textShadow:'0 0 20px #ef444488,0 0 40px #ef444433', marginBottom:4 }}>GAME OVER</div>
        <div style={{ color:'#fca5a5', fontSize:'0.82rem', fontFamily:"'Share Tech Mono',monospace",
          marginBottom:10 }}>
          {mon.name} was too strong...
        </div>

        {/* Survival stats */}
        <div style={{ background:'#180404', border:'1px solid #ef444422',
          borderRadius:10, padding:'12px 20px', marginBottom:16, width:'100%', maxWidth:260 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ color:'#22c55e', fontSize:'1.4rem', fontWeight:'900',
                fontFamily:"'Orbitron',monospace" }}>✓{correct}</div>
              <div style={{ color:'#444', fontSize:'0.52rem',
                fontFamily:"'Share Tech Mono',monospace" }}>CORRECT</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ color:'#ef4444', fontSize:'1.4rem', fontWeight:'900',
                fontFamily:"'Orbitron',monospace" }}>✗{miss}</div>
              <div style={{ color:'#444', fontSize:'0.52rem',
                fontFamily:"'Share Tech Mono',monospace" }}>MISSES</div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid #3a1010', paddingTop:8, textAlign:'center' }}>
            <div style={{ color:'#888', fontSize:'0.62rem', fontFamily:"'Share Tech Mono',monospace" }}>
              You survived <span style={{ color:'#fca5a5', fontWeight:'bold' }}>{correct + miss}</span> question{correct + miss !== 1 ? 's' : ''}
            </div>
            <div style={{ color:'#555', fontSize:'0.58rem', fontFamily:"'Share Tech Mono',monospace",
              marginTop:2 }}>
              The {miss === MISSES ? `${MISSES}th` : 'final'} miss ended the battle
            </div>
          </div>
        </div>

        <div style={{ color:'#ef4444', fontSize:'1.1rem', marginBottom:4,
          fontFamily:"'Share Tech Mono',monospace", letterSpacing:'0.1em' }}>
          がんばれ！
        </div>
        <div style={{ color:'#444', fontSize:'0.62rem', maxWidth:240, lineHeight:1.5, marginBottom:20,
          fontFamily:"'Share Tech Mono',monospace", textAlign:'center' }}>
          Every mistake is a lesson.<br/>Japanese quality culture demands it!
        </div>
        <button onClick={() => { playSound('click'); onRetry() }}
          style={{ ...styles.btnPrimary, width:220, marginBottom:10, padding:'13px' }}>
          🔄 RETRY STAGE
        </button>
        <button onClick={() => { playSound('click'); onReview() }}
          style={{ background:'none', border:'1px solid #555', borderRadius:8,
            width:220, padding:13, color:'#aaa', cursor:'pointer', fontFamily:'monospace',
            marginBottom:10 }}>
          📋 Review Answers
        </button>
        <button onClick={() => { playSound('click'); onQuit() }}
          style={{ background:'none', border:'1px solid #333', borderRadius:8,
            width:220, padding:13, color:'#666', cursor:'pointer', fontFamily:'monospace' }}>
          ← STAGE SELECT
        </button>
      </div>
    </div>
  )
}

// ── SYMBOL TAB ───────────────────────────────────────────────
function SymbolTab() {
  const syms = [
    { sym:'▽', name:'Back Weld',    jp:'裏波溶接',  rom:'Uranami-yosetsu',   note:'Complete root penetration from back' },
    { sym:'△', name:'Fillet Weld',  jp:'すみ肉溶接', rom:'Suminiku-yosetsu',  note:'Triangular cross-section corner weld' },
    { sym:'V',  name:'V-Groove',    jp:'V形開先',   rom:'V-gata kaisaki',    note:'V-shaped groove, typically 60°' },
    { sym:'X',  name:'X-Groove',    jp:'X形開先',   rom:'X-gata kaisaki',    note:'Double-V groove, weld both sides' },
    { sym:'○',  name:'All-Around',  jp:'全周溶接',  rom:'Zenshu-yosetsu',    note:'Weld entire joint perimeter' },
    { sym:'⚑',  name:'Field Weld',  jp:'現場溶接',  rom:'Genba-yosetsu',     note:'Welded on site, not in factory' },
  ]
  const rules = [
    {
      title:'⚠️ CRITICAL: JIS vs AWS Arrow Side',
      body:'JIS / ISO:  symbol BELOW line = ARROW SIDE (矢側)\nAWS (USA): symbol BELOW line = ARROW SIDE too\n\n→ In Japan ALL drawings use JIS standard.\n  Verify the standard at the START of every project.',
    },
    {
      title:'📏 Fillet Weld Dimensions',
      body:'脚長 Kyakucho (Leg length) — measured on drawing\nのど厚 Nodo-atsu (Throat) = Leg × 0.707\n\nThroat = design dimension for strength calcs.',
    },
    {
      title:'🔢 Number Placement Rules',
      body:'Number LEFT of symbol  → leg size (脚長)\nNumber RIGHT of symbol → weld length (溶接長さ)\n(N) in parentheses     → pitch (ピッチ)',
    },
  ]
  return (
    <div style={{ padding:16, fontFamily:'monospace', background:'#0d0d0d', minHeight:'100vh', paddingBottom:70 }}>
      <div style={{ color:'#1E90FF', fontWeight:'bold', marginBottom:12 }}>📐 JIS WELDING SYMBOLS</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
        {syms.map(s => (
          <div key={s.sym} style={{ background:'#141414', border:'1px solid #1e1e1e',
            borderRadius:8, padding:'10px', textAlign:'center' }}>
            <div style={{ fontSize:'1.6rem', marginBottom:4 }}>{s.sym}</div>
            <div style={{ color:'#1E90FF', fontSize:'0.68rem', fontWeight:'bold' }}>{s.name}</div>
            <div style={{ color:'#777', fontSize:'0.6rem' }}>{s.jp}</div>
            <div style={{ color:'#555', fontSize:'0.58rem', fontStyle:'italic' }}>{s.rom}</div>
            <div style={{ color:'#999', fontSize:'0.6rem', marginTop:4, lineHeight:1.3 }}>{s.note}</div>
          </div>
        ))}
      </div>
      {rules.map(r => (
        <div key={r.title} style={{ background:'#141414', border:'1px solid #1E90FF22',
          borderRadius:8, padding:'12px 14px', marginBottom:8 }}>
          <div style={{ color:'#1E90FF', fontSize:'0.7rem', fontWeight:'bold', marginBottom:6 }}>{r.title}</div>
          <pre style={{ color:'#bbb', fontSize:'0.66rem', whiteSpace:'pre-wrap',
            lineHeight:1.55, fontFamily:'monospace', margin:0 }}>{r.body}</pre>
        </div>
      ))}
    </div>
  )
}

// ── CALC TAB ─────────────────────────────────────────────────
function CalcTab() {
  const [E,  setE]  = useState('28')
  const [I,  setI]  = useState('180')
  const [v,  setV]  = useState('30')
  const [leg,setLeg]= useState('8')
  const [C,  setC]  = useState('0.18')
  const [Mn, setMn] = useState('1.40')
  const [Cr, setCr] = useState('0.30')
  const [Mo, setMo] = useState('0.10')
  const [V2, setV2] = useState('0.02')
  const [Ni, setNi] = useState('0.30')
  const [Cu, setCu] = useState('0.20')

  const heatInput = ((60 * (parseFloat(E)||0) * (parseFloat(I)||0)) / ((parseFloat(v)||1) * 1000)).toFixed(2)
  const throat    = ((parseFloat(leg)||0) * 0.707).toFixed(2)
  const ceq       = (
    (parseFloat(C)||0) + (parseFloat(Mn)||0)/6 +
    ((parseFloat(Cr)||0)+(parseFloat(Mo)||0)+(parseFloat(V2)||0))/5 +
    ((parseFloat(Ni)||0)+(parseFloat(Cu)||0))/15
  ).toFixed(3)
  const preheat   = parseFloat(ceq) > 0.40

  const inp = {
    background:'#222', border:'1px solid #444', borderRadius:6,
    color:'#eee', padding:'6px 8px', width:72,
    fontFamily:'monospace', fontSize:'0.83rem',
  }
  const row = { display:'flex', alignItems:'center', gap:8, marginBottom:8 }
  const lab = { color:'#777', fontSize:'0.7rem', flex:1 }

  return (
    <div style={{ padding:16, fontFamily:'monospace', background:'#0d0d0d', minHeight:'100vh', paddingBottom:70 }}>
      <div style={{ color:'#1E90FF', fontWeight:'bold', marginBottom:16 }}>🔢 WELDING CALCULATORS</div>

      {/* Heat Input */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>⚡ Heat Input  Q = 60 × E × I / v</div>
        {[['Voltage E (V)', E, setE], ['Current I (A)', I, setI], ['Travel speed v (cm/min)', v, setV]]
          .map(([l,val,set]) => (
          <div key={l} style={row}>
            <span style={lab}>{l}</span>
            <input style={inp} value={val} onChange={e => set(e.target.value)}/>
          </div>
        ))}
        <div style={{ background:'#222', borderRadius:8, padding:'10px', textAlign:'center', marginTop:4 }}>
          <div style={{ color:'#22c55e', fontSize:'1.4rem', fontWeight:'bold' }}>{heatInput} kJ/cm</div>
          <div style={{ color:'#555', fontSize:'0.62rem' }}>Heat Input (入熱 / Nyunetsu)</div>
        </div>
        <div style={{ color:'#444', fontSize:'0.62rem', marginTop:6, lineHeight:1.4 }}>
          Controls HAZ microstructure, cooling rate, and distortion. Must be within WPS limits.
        </div>
      </div>

      {/* Fillet Throat */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>📐 Fillet Weld Throat  =  Leg × 0.707</div>
        <div style={row}>
          <span style={lab}>Leg length 脚長 (mm)</span>
          <input style={inp} value={leg} onChange={e => setLeg(e.target.value)}/>
        </div>
        <div style={{ background:'#222', borderRadius:8, padding:'10px', textAlign:'center', marginTop:4 }}>
          <div style={{ color:'#22c55e', fontSize:'1.4rem', fontWeight:'bold' }}>{throat} mm</div>
          <div style={{ color:'#555', fontSize:'0.62rem' }}>Throat thickness (のど厚 / Nodo-atsu)</div>
        </div>
        <div style={{ color:'#444', fontSize:'0.62rem', marginTop:6 }}>
          Throat = design dimension used in all structural strength calculations.
        </div>
      </div>

      {/* Carbon Equivalent */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>⚗️ Carbon Equivalent  (IIW formula)</div>
        <div style={{ color:'#444', fontSize:'0.6rem', marginBottom:8 }}>
          Ceq = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:8 }}>
          {[['C',C,setC],['Mn',Mn,setMn],['Cr',Cr,setCr],['Mo',Mo,setMo],
            ['V',V2,setV2],['Ni',Ni,setNi],['Cu',Cu,setCu]].map(([n,val,set])=>(
            <div key={n} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:'#777', fontSize:'0.7rem', width:22 }}>{n}</span>
              <input style={{ ...inp, width:60 }} value={val} onChange={e=>set(e.target.value)}/>
            </div>
          ))}
        </div>
        <div style={{ background:'#222', borderRadius:8, padding:'10px', textAlign:'center' }}>
          <div style={{ color: preheat ? '#f59e0b':'#22c55e', fontSize:'1.4rem', fontWeight:'bold' }}>
            {ceq}
          </div>
          <div style={{ color:'#555', fontSize:'0.62rem' }}>Ceq (IIW)</div>
        </div>
        <div style={{
          background: preheat ? '#2a1800':'#0a200a',
          border:`1px solid ${preheat ? '#f59e0b':'#22c55e'}`,
          borderRadius:6, padding:'8px 10px', marginTop:8, textAlign:'center',
        }}>
          <span style={{ color: preheat ? '#f59e0b':'#22c55e', fontSize:'0.7rem', fontWeight:'bold' }}>
            {preheat ? '⚠️  PREHEAT LIKELY REQUIRED  (Ceq > 0.40)' : '✓  Low cold-crack risk  (Ceq ≤ 0.40)'}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── CAREER TAB ───────────────────────────────────────────────
function CareerTab() {
  const path = [
    { level:'ENTRY', icon:'🛡️', color:'#888', title:'Legal Entry Pack',
      jp:'基本資格セット', salary:'¥3–4M/yr',
      items:['Arc Welding Safety Training (アーク溶接特別教育) — 3 days ¥20–40k',
             'Grinding Wheel Safety Training (自由研削といし) — 1 day ¥10k',
             'Low-Voltage Electrical (低圧電気取扱) — 1 day ¥12–22k',
             'Full Harness Safety (フルハーネス) — 1 day ¥10k'],
      note:'Legally required from Day 1 — without these you CANNOT work.' },
    { level:'BEGINNER', icon:'⚡', color:'#E85D04', title:'JIS Basic Grade',
      jp:'JIS溶接技能者 基本級', salary:'¥3.5–4.5M/yr',
      items:['Flat position only (下向き / 1G, 1F)',
             'First official skill certification in Japan',
             'Issued by JWES (日本溶接協会)',
             'Validity: 2 years — must renew'],
      note:'Your first step as a certified welder in Japan.' },
    { level:'SKILLED', icon:'🔥', color:'#1E90FF', title:'JIS Specialist Grade',
      jp:'JIS溶接技能者 専門級', salary:'¥4–6M/yr',
      items:['All positions: flat → horizontal → vertical → overhead',
             'Pipe all-positions N-2P = most prestigious (pass rate ~30%)',
             'Validity: 2 years — must renew every 2 years'],
      note:'N-2P pipe certification is the gold standard in Japanese welding.' },
    { level:'ADVANCED', icon:'🏗️', color:'#1565C0', title:'AW Kentei',
      jp:'AW検定（建築鉄骨）', salary:'¥5–7M/yr',
      items:['For architectural structural steel welding',
             'Factory / Field / Pipe / Robot categories',
             'Annual exam (June–September)',
             'Validity: 1 year — renew every year'],
      note:'Required for Japanese building construction welding.' },
    { level:'ADVANCED', icon:'🏭', color:'#F97316', title:'Boiler Welder',
      jp:'ボイラー溶接士', salary:'¥5–8M/yr',
      items:['Futsuu 普通 = up to 25mm plate',
             'Tokubetsu 特別 = all thicknesses',
             'National license — legally mandatory',
             'Test: written + horizontal groove + RT + bend'],
      note:'Required for all boiler and pressure vessel welding in Japan.' },
    { level:'ELITE', icon:'🌊', color:'#06B6D4', title:'Underwater Welder',
      jp:'水中溶接士', salary:'¥7–10M/yr',
      items:['Diving License 潜水士 (written exam only, ~75% pass rate)',
             'JIS welding qualification (Specialist Grade recommended)',
             'Wet (湿式) and Dry (乾式) welding techniques',
             'Ship repair, bridges, offshore structures'],
      note:'Extremely rare dual qualification = premium salary.' },
    { level:'LEGEND', icon:'🐉', color:'#DC2626', title:'Saturation Diver + Welder',
      jp:'飽和潜水 + 水中溶接', salary:'¥10–15M+/yr',
      items:['Deep saturation diving at 150m+',
             'Offshore oil/gas platforms worldwide',
             'World-class specialty, extreme scarcity'],
      note:'The absolute pinnacle of welding careers in Japan.' },
  ]
  return (
    <div style={{ padding:16, fontFamily:'monospace', background:'#0d0d0d', minHeight:'100vh', paddingBottom:70 }}>
      <div style={{ color:'#1E90FF', fontWeight:'bold', marginBottom:4 }}>🗺️ CAREER ROADMAP</div>
      <div style={{ color:'#444', fontSize:'0.65rem', marginBottom:16 }}>
        Japanese Welding Career Path — Entry to Legend
      </div>
      {path.map((s, i) => (
        <div key={i}>
          {i > 0 && <div style={{ width:2, height:12, background:'#2a2a2a', marginLeft:20, marginBottom:0 }}/>}
          <div style={{ background:'#141414', border:`1px solid ${s.color}22`,
            borderRadius:10, padding:'12px 14px', marginBottom:0 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:8 }}>
              <span style={{ fontSize:'1.6rem' }}>{s.icon}</span>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                  <span style={{ color:s.color, fontSize:'0.6rem', fontWeight:'bold',
                    background:`${s.color}22`, padding:'2px 7px', borderRadius:4 }}>
                    {s.level}
                  </span>
                  <span style={{ color:s.color, fontSize:'0.88rem', fontWeight:'bold' }}>{s.title}</span>
                </div>
                <div style={{ color:'#555', fontSize:'0.62rem' }}>{s.jp}</div>
              </div>
            </div>
            {s.items.map((it,j)=>(
              <div key={j} style={{ color:'#aaa', fontSize:'0.66rem', lineHeight:1.55 }}>• {it}</div>
            ))}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              background:`${s.color}11`, border:`1px solid ${s.color}33`,
              borderRadius:6, padding:'7px 10px', marginTop:8 }}>
              <span style={{ color:s.color, fontSize:'0.78rem', fontWeight:'bold' }}>{s.salary}</span>
              <span style={{ color:'#444', fontSize:'0.62rem' }}>annual income (approx.)</span>
            </div>
            <div style={{ color:'#444', fontSize:'0.63rem', marginTop:6,
              lineHeight:1.4, fontStyle:'italic' }}>{s.note}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── REVIEW SCREEN ────────────────────────────────────────────
function ReviewScreen({ history, onBack }) {
  const OPTS = ['A','B','C','D']
  return (
    <div style={{ minHeight:'100vh', background:'#0d0d0d', fontFamily:'monospace',
      padding:'14px 12px', paddingBottom:70 }}>

      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
        <div style={{ color:'#1E90FF', fontWeight:'bold', fontSize:'0.95rem' }}>
          📋 BATTLE REVIEW
        </div>
        <div style={{ marginLeft:'auto', fontSize:'0.68rem', color:'#555' }}>
          <span style={{ color:'#22c55e' }}>✓ {history.filter(h=>h.wasCorrect).length}</span>
          {' / '}
          <span style={{ color:'#ef4444' }}>✗ {history.filter(h=>!h.wasCorrect).length}</span>
        </div>
      </div>

      {history.map((item, i) => {
        const { question: q, selected, wasCorrect } = item
        return (
          <div key={i} style={{
            background:'#141414',
            border:`1px solid ${wasCorrect ? '#22c55e22' : '#ef444422'}`,
            borderRadius:10, padding:'12px 14px', marginBottom:12,
          }}>
            {/* Result indicator + question */}
            <div style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:10 }}>
              <span style={{
                fontSize:'1rem', lineHeight:1, flexShrink:0,
                color: wasCorrect ? '#22c55e' : '#ef4444',
              }}>
                {wasCorrect ? '✓' : '✗'}
              </span>
              <div style={{ color:'#efefef', fontSize:'0.78rem', lineHeight:1.5 }}>
                <span style={{ color:'#555', fontSize:'0.62rem', marginRight:6 }}>
                  [{q.cat}]
                </span>
                {q.q}
              </div>
            </div>

            {/* Options */}
            <div style={{ marginBottom:10 }}>
              {q.opts.map((opt, oi) => {
                const isCorrect  = oi === q.a
                const isSelected = oi === selected
                const wrongPick  = isSelected && !wasCorrect

                let bg      = 'transparent'
                let border  = '1px solid #2a2a2a'
                let color   = '#555'
                let opacity = 1

                if (isCorrect) {
                  bg = '#0f2a0f'; border = '1px solid #22c55e'; color = '#86efac'
                } else if (wrongPick) {
                  bg = '#2a0f0f'; border = '1px solid #ef4444'; color = '#fca5a5'
                } else {
                  opacity = 0.35
                }

                return (
                  <div key={oi} style={{
                    display:'flex', gap:8, alignItems:'flex-start',
                    background: bg, border, borderRadius:6,
                    padding:'7px 10px', marginBottom:5,
                    opacity, color, fontSize:'0.72rem', lineHeight:1.4,
                  }}>
                    <span style={{
                      fontWeight:'bold', flexShrink:0,
                      color: isCorrect ? '#22c55e' : wrongPick ? '#ef4444' : '#444',
                    }}>
                      {OPTS[oi]}.
                    </span>
                    <span>{opt}</span>
                    {isCorrect && (
                      <span style={{ marginLeft:'auto', flexShrink:0, color:'#22c55e', fontSize:'0.65rem' }}>
                        ✓ correct
                      </span>
                    )}
                    {wrongPick && (
                      <span style={{ marginLeft:'auto', flexShrink:0, color:'#ef4444', fontSize:'0.65rem' }}>
                        ✗ your pick
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Explanation */}
            <div style={{
              background:'#0f0f0f', borderRadius:6,
              padding:'8px 10px', fontSize:'0.68rem',
              color:'#999', lineHeight:1.55,
            }}>
              <span style={{ color:'#FFB800', fontWeight:'bold', marginRight:6 }}>EXP:</span>
              {q.exp}
            </div>
          </div>
        )
      })}

      <button onClick={onBack} style={{
        width:'100%', padding:'14px', marginTop:4,
        background:'linear-gradient(135deg,#1E90FF,#CC2200)',
        color:'#fff', border:'none', borderRadius:8,
        fontWeight:'bold', cursor:'pointer', fontFamily:'monospace',
        fontSize:'0.9rem', letterSpacing:'0.05em',
        boxShadow:'0 4px 16px #1E90FF44',
      }}>
        ← BACK TO STAGES
      </button>
    </div>
  )
}

// ── HISTORY + PROGRESS STORAGE ───────────────────────────────
const LS_KEY  = 'wf_en_history'
const LS_PROG = 'wf_en_progress'

function loadProgress() { try { return JSON.parse(localStorage.getItem(LS_PROG)||'{}') } catch { return {} } }
function saveProgress(p) { try { localStorage.setItem(LS_PROG, JSON.stringify(p)) } catch {} }

function loadBattleLog() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function saveBattleLog(log) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(log.slice(0, 50))) } catch {}
}
function appendBattleRecord(record) {
  const log = [record, ...loadBattleLog()].slice(0, 50)
  saveBattleLog(log)
}

function HistoryTab() {
  const [log,        setLog]        = useState(() => loadBattleLog())
  const [confirming, setConfirming] = useState(false)

  const STAGE_COLORS = ['#E85D04','#1565C0','#D97706','#059669','#7C3AED','#DC2626']

  function clearHistory() {
    localStorage.removeItem(LS_KEY)
    setLog([])
    setConfirming(false)
  }

  const total   = log.length
  const wins    = log.filter(r => r.result === 'victory').length
  const winRate = total ? Math.round((wins / total) * 100) : 0
  const totalXP = log.reduce((sum, r) => sum + (r.xpEarned || 0), 0)

  function fmtDate(iso) {
    try {
      const d = new Date(iso)
      return d.toLocaleDateString('en-US', { month:'short', day:'numeric' })
    } catch { return '—' }
  }

  const winCol = winRate >= 70 ? '#22c55e' : winRate >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ padding:16, fontFamily:"'Share Tech Mono',monospace",
      background:'#0d0d0d', minHeight:'100vh', paddingBottom:80 }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:16 }}>
        <div style={{ color:'#1E90FF', fontFamily:"'Orbitron',monospace",
          fontWeight:'900', fontSize:'0.9rem', letterSpacing:'0.06em' }}>
          📜 BATTLE HISTORY
        </div>
        <div style={{ color:'#333', fontSize:'0.58rem' }}>{total} records</div>
      </div>

      {/* Stats bar */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:20 }}>
        {[
          { label:'BATTLES',   value: total,         color:'#1E90FF', sub: null },
          { label:'WIN RATE',  value: `${winRate}%`, color: winCol,   sub: `${wins}W / ${total-wins}L` },
          { label:'TOTAL XP',  value: `+${totalXP}`, color:'#FFB800', sub: null },
        ].map(s => (
          <div key={s.label} style={{
            background:'#141414', border:'1px solid #1e1e1e',
            borderRadius:10, padding:'12px 8px', textAlign:'center',
            boxShadow:`0 0 16px ${s.color}11`,
          }}>
            <div style={{ color:s.color, fontSize:'1.1rem', fontWeight:'900',
              fontFamily:"'Orbitron',monospace", letterSpacing:'0.02em',
              textShadow:`0 0 10px ${s.color}66` }}>
              {s.value}
            </div>
            {s.sub && (
              <div style={{ color:'#444', fontSize:'0.5rem', marginTop:1 }}>{s.sub}</div>
            )}
            <div style={{ color:'#383838', fontSize:'0.52rem', letterSpacing:'0.06em', marginTop:3 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {log.length === 0 ? (
        <div style={{ textAlign:'center', padding:'40px 0 32px' }}>
          <div style={{ marginBottom:16, opacity:0.35 }}>
            <SmithSVG size={80}/>
          </div>
          <div style={{ color:'#333', fontSize:'0.78rem', lineHeight:2 }}>
            No battles yet.<br/>
            <span style={{ color:'#3a3a3a' }}>Start fighting to build your record.</span>
          </div>
        </div>
      ) : (
        log.map((r, i) => {
          const won       = r.result === 'victory'
          const stage     = QUIZ_STAGES.find(s => s.stageId === r.stageId)
          const icon      = r.stageIcon || (stage ? stage.icon : '⚔️')
          const stageCol  = STAGE_COLORS[(r.stageId - 1)] || '#1E90FF'
          const accuracy  = r.accuracy != null ? r.accuracy
                          : (r.correct + r.miss) > 0
                            ? Math.round(r.correct / (r.correct + r.miss) * 100) : 0
          const accCol    = accuracy >= 80 ? '#22c55e' : accuracy >= 50 ? '#f59e0b' : '#ef4444'

          return (
            <div key={i} style={{
              background:'#141414',
              border:`1px solid ${won ? '#22c55e18' : '#ef444418'}`,
              borderLeft:`3px solid ${won ? '#22c55e' : '#ef4444'}`,
              borderRadius:8, padding:'10px 12px', marginBottom:8,
            }}>
              {/* Top row: icon + stage name + result badge + date */}
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{ fontSize:'1.3rem', flexShrink:0, lineHeight:1 }}>{icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color: stageCol, fontSize:'0.65rem', fontWeight:'700',
                    letterSpacing:'0.04em', whiteSpace:'nowrap',
                    overflow:'hidden', textOverflow:'ellipsis' }}>
                    {r.stageName}
                  </div>
                  <div style={{ color:'#333', fontSize:'0.54rem' }}>STAGE {r.stageId}</div>
                </div>
                <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2 }}>
                  <div style={{
                    fontSize:'0.58rem', fontFamily:"'Orbitron',monospace", fontWeight:'900',
                    letterSpacing:'0.04em', padding:'2px 7px', borderRadius:4,
                    background: won ? '#22c55e22' : '#ef444422',
                    color: won ? '#22c55e' : '#ef4444',
                    border: `1px solid ${won ? '#22c55e44' : '#ef444444'}`,
                  }}>
                    {won ? '✓ VICTORY' : '✗ DEFEAT'}
                  </div>
                  <div style={{ color:'#383838', fontSize:'0.52rem' }}>{fmtDate(r.date)}</div>
                </div>
              </div>

              {/* Bottom row: stats chips */}
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                <span style={{ fontSize:'0.58rem', color:'#22c55e',
                  background:'#22c55e11', border:'1px solid #22c55e22',
                  borderRadius:4, padding:'2px 6px' }}>✓{r.correct}</span>
                <span style={{ fontSize:'0.58rem', color:'#ef4444',
                  background:'#ef444411', border:'1px solid #ef444422',
                  borderRadius:4, padding:'2px 6px' }}>✗{r.miss}</span>
                <span style={{ fontSize:'0.58rem', color: accCol,
                  background:`${accCol}11`, border:`1px solid ${accCol}22`,
                  borderRadius:4, padding:'2px 6px' }}>{accuracy}%</span>
                {r.xpEarned > 0 && (
                  <span style={{ fontSize:'0.58rem', color:'#FFB800',
                    background:'#FFB80011', border:'1px solid #FFB80022',
                    borderRadius:4, padding:'2px 6px' }}>+{r.xpEarned} XP</span>
                )}
              </div>
            </div>
          )
        })
      )}

      {/* Clear button + confirmation */}
      {log.length > 0 && (
        <div style={{ marginTop:16 }}>
          {confirming ? (
            <div style={{ background:'#1a0808', border:'1px solid #ef444433',
              borderRadius:10, padding:'14px', textAlign:'center' }}>
              <div style={{ color:'#fca5a5', fontSize:'0.72rem', marginBottom:12,
                fontFamily:"'Share Tech Mono',monospace" }}>
                Delete all {total} battle records? This cannot be undone.
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={clearHistory} style={{
                  flex:1, padding:'10px', background:'#ef4444', border:'none',
                  borderRadius:8, color:'#fff', cursor:'pointer',
                  fontFamily:"'Orbitron',monospace", fontSize:'0.68rem', fontWeight:'bold',
                }}>
                  YES, DELETE
                </button>
                <button onClick={() => setConfirming(false)} style={{
                  flex:1, padding:'10px', background:'none',
                  border:'1px solid #333', borderRadius:8,
                  color:'#666', cursor:'pointer', fontFamily:'monospace', fontSize:'0.72rem',
                }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setConfirming(true)} style={{
              width:'100%', padding:'11px', background:'none',
              border:'1px solid #222', borderRadius:8,
              color:'#3a3a3a', cursor:'pointer', fontFamily:'monospace', fontSize:'0.7rem',
              transition:'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#ef444466'; e.currentTarget.style.color='#ef4444' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#222'; e.currentTarget.style.color='#3a3a3a' }}>
              🗑 Clear History
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── SHARED STYLES ────────────────────────────────────────────
const F_BODY    = "'Share Tech Mono', monospace"
const F_TITLE   = "'Orbitron', 'Share Tech Mono', monospace"

const STEEL_GRID = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM39 0h1v40h-1zM0 0h40v1H0zM0 39h40v1H0z' fill='rgba(255,255,255,0.02)'/%3E%3C/svg%3E\")"

const styles = {
  page: {
    minHeight:'100vh',
    background:`#0d0d0d ${STEEL_GRID}`,
    backgroundSize:'40px 40px',
    display:'flex', flexDirection:'column',
    padding:'20px 16px', fontFamily:F_BODY,
  },
  btnPrimary: {
    background:'linear-gradient(135deg,#FF7722,#1E90FF 40%,#CC2200)',
    color:'#e8e8e8', border:'none', borderRadius:8,
    padding:'12px 28px', fontWeight:'bold',
    cursor:'pointer', fontFamily:F_BODY,
    letterSpacing:'0.05em', fontSize:'0.9rem',
    boxShadow:'0 4px 16px #1E90FF44',
    minHeight:48, touchAction:'manipulation',
    WebkitTapHighlightColor:'transparent',
  },
  btnGhost: {
    background:'none', border:'1px solid #2a2a2a', color:'#555',
    borderRadius:6, padding:'6px 12px', cursor:'pointer',
    fontFamily:F_BODY, fontSize:'0.7rem',
    minHeight:48, touchAction:'manipulation',
    WebkitTapHighlightColor:'transparent',
  },
  card: {
    background:'#141414', border:'1px solid #1e1e1e',
    borderRadius:10, padding:'14px', marginBottom:12,
  },
  cardTitle: {
    color:'#FFB800', fontFamily:F_TITLE, fontSize:'0.72rem', fontWeight:'bold', marginBottom:10,
  },
}

// ── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [tab,   setTab]   = useState('battle')
  const [screen,setScreen]= useState('title')
  const [si,    setSi]    = useState(0)      // stage index
  const [qs,    setQs]    = useState([])     // shuffled question pool
  const [qi,    setQi]    = useState(0)      // question index
  const [pHP,   setPHP]   = useState(P_HP)
  const [mHP,   setMHP]   = useState(M_HP)
  const [correct,  setCorrect]  = useState(0)
  const [miss,     setMiss]     = useState(0)
  const [totalXP,  setTotalXP]  = useState(0)
  const [sessionXP,setSessionXP]= useState(0)
  const [sel,         setSel]         = useState(null)
  const [done,        setDone]        = useState(false)
  const [bgFlash,     setBgFlash]     = useState(null)
  const [pending,     setPending]     = useState(null)      // 'victory'|'defeat'
  const [monsterAnim, setMonsterAnim] = useState(null)      // 'shake'|'death'|null
  const [playerShake, setPlayerShake] = useState(false)
  const [floatMonster,setFloatMonster]= useState(null)      // { text, k }
  const [floatPlayer, setFloatPlayer] = useState(null)      // { text, k }
  const [floatKey,    setFloatKey]    = useState(0)
  const [history,       setHistory]       = useState([])
  const [stageProgress, setStageProgress] = useState(() => loadProgress())

  function startStage(idx) {
    setSi(idx)
    setQs(shuffle(QUIZ_STAGES[idx].questions))
    setQi(0); setPHP(P_HP); setMHP(M_HP)
    setCorrect(0); setMiss(0); setSessionXP(0)
    setSel(null); setDone(false)
    setBgFlash(null); setPending(null)
    setMonsterAnim(null); setPlayerShake(false)
    setFloatMonster(null); setFloatPlayer(null)
    setHistory([])
    setScreen('battle')
  }

  function handleAnswer(optIdx) {
    if (done || pending) return
    const q   = qs[qi]
    setSel(optIdx); setDone(true)

    const wasCorrect = optIdx === q.a
    const k = floatKey + 1
    setFloatKey(k)
    setHistory(h => [...h, { question: q, selected: optIdx, wasCorrect }])

    if (wasCorrect) {
      playSound('correct')
      const nc = correct + 1
      const nm = Math.max(0, mHP - M_DMG)
      setCorrect(nc); setMHP(nm)
      setTotalXP(p => p + q.xp); setSessionXP(p => p + q.xp)
      setBgFlash('correct')
      setFloatMonster({ text: `-${M_DMG} DMG`, k })
      setTimeout(() => setFloatMonster(null), 800)
      const isVictory = nc >= WINS || nm <= 0
      if (isVictory) {
        setMonsterAnim('shake')
        setTimeout(() => setMonsterAnim('death'), 380)
        setTimeout(() => setBgFlash(null), 500)
        setPending('victory')
        appendBattleRecord({
          stageId:   QUIZ_STAGES[si].stageId,
          stageName: QUIZ_STAGES[si].label.replace(/^STAGE \d+ — /,''),
          stageIcon: QUIZ_STAGES[si].icon,
          result:    'victory',
          correct:   nc,
          miss,
          xpEarned:  sessionXP + q.xp,
          accuracy:  Math.round(nc / (nc + miss) * 100),
          date:      new Date().toISOString(),
        })
        setStageProgress(prev => {
          const stId   = QUIZ_STAGES[si].stageId
          const newProg = { ...prev, [stId]: { correct: nc, result: 'victory' } }
          saveProgress(newProg)
          return newProg
        })
      } else {
        setMonsterAnim('shake')
        setTimeout(() => setMonsterAnim(null), 400)
        setTimeout(() => setBgFlash(null), 500)
      }
    } else {
      playSound('wrong')
      const ns = miss + 1
      const np = Math.max(0, pHP - P_DMG)
      setMiss(ns); setPHP(np)
      setBgFlash('wrong')
      setPlayerShake(true)
      setFloatPlayer({ text: `-${P_DMG} HP`, k })
      setTimeout(() => setFloatPlayer(null), 800)
      setTimeout(() => { setBgFlash(null); setPlayerShake(false) }, 400)
      if (ns >= MISSES || np <= 0) {
        setPending('defeat')
        appendBattleRecord({
          stageId:   QUIZ_STAGES[si].stageId,
          stageName: QUIZ_STAGES[si].label.replace(/^STAGE \d+ — /,''),
          stageIcon: QUIZ_STAGES[si].icon,
          result:    'defeat',
          correct,
          miss:      ns,
          xpEarned:  sessionXP,
          accuracy:  (correct + ns) > 0 ? Math.round(correct / (correct + ns) * 100) : 0,
          date:      new Date().toISOString(),
        })
        setStageProgress(prev => {
          const stId    = QUIZ_STAGES[si].stageId
          const existing = prev[stId]
          if (existing?.result === 'victory') return prev
          const newProg = { ...prev, [stId]: { correct, result: 'defeat' } }
          saveProgress(newProg)
          return newProg
        })
      }
    }
  }

  function handleNext() {
    if (pending) { setScreen(pending); return }
    const next = qi + 1
    if (next >= qs.length) {
      setQs(shuffle(QUIZ_STAGES[si].questions)); setQi(0)
    } else { setQi(next) }
    setSel(null); setDone(false)
  }

  const TABS = [
    { id:'battle',  icon:'⚔️', label:'BATTLE'  },
    { id:'symbol',  icon:'📐', label:'SYMBOLS' },
    { id:'calc',    icon:'🔢', label:'CALC'    },
    { id:'career',  icon:'🗺️', label:'CAREER'  },
    { id:'history', icon:'📜', label:'HISTORY' },
  ]

  function battleContent() {
    if (screen==='title')
      return <TitleScreen onStart={()=>setScreen('stage-select')} totalXP={totalXP}/>
    if (screen==='stage-select')
      return <StageSelect stages={QUIZ_STAGES} totalXP={totalXP} stageProgress={stageProgress}
               onSelect={startStage} onBack={()=>setScreen('title')}/>
    if (screen==='battle' && qs.length)
      return <Battle stage={QUIZ_STAGES[si]} si={si} qs={qs} qi={qi}
               pHP={pHP} mHP={mHP} correct={correct} miss={miss}
               sel={sel} done={done} bgFlash={bgFlash} pending={pending}
               monsterAnim={monsterAnim} playerShake={playerShake}
               floatMonster={floatMonster} floatPlayer={floatPlayer}
               onAnswer={handleAnswer} onNext={handleNext}
               onQuit={()=>setScreen('stage-select')}/>
    if (screen==='victory')
      return <Victory stage={QUIZ_STAGES[si]} si={si} sessionXP={sessionXP}
               correct={correct} miss={miss}
               onContinue={()=>setScreen('stage-select')}
               onReview={()=>setScreen('review')}/>
    if (screen==='defeat')
      return <Defeat si={si} correct={correct} miss={miss}
               onRetry={()=>startStage(si)}
               onQuit={()=>setScreen('stage-select')}
               onReview={()=>setScreen('review')}/>
    if (screen==='review')
      return <ReviewScreen history={history} onBack={()=>setScreen('stage-select')}/>
    return null
  }

  return (
    <div style={{ maxWidth:480, margin:'0 auto', background:'#0d0d0d', minHeight:'100vh',
      touchAction:'manipulation', overscrollBehavior:'none' }}>
      {/* Content */}
      <div style={{ paddingBottom:'calc(64px + env(safe-area-inset-bottom))' }}>
        {tab==='battle'  && battleContent()}
        {tab==='symbol'  && <SymbolTab/>}
        {tab==='calc'    && <CalcTab/>}
        {tab==='career'  && <CareerTab/>}
        {tab==='history' && <HistoryTab/>}
      </div>

      {/* Bottom Nav */}
      <div className="wf-nav-safe" style={{
        position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:480, background:'#0a0a0a',
        borderTop:'1px solid #1e1e1e', display:'flex', zIndex:200,
      }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1, padding:'10px 0 8px', border:'none', minHeight:56,
            background: tab===t.id ? '#141414' : 'transparent',
            borderTop: `3px solid ${tab===t.id ? '#1E90FF' : 'transparent'}`,
            color: tab===t.id ? '#1E90FF' : '#444',
            cursor:'pointer', fontFamily:'monospace',
            display:'flex', flexDirection:'column', alignItems:'center', gap:2,
            transition:'all 0.15s',
          }}>
            <span style={{ fontSize:'1.05rem' }}>{t.icon}</span>
            <span style={{ fontSize:'0.52rem', letterSpacing:'0.04em' }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
