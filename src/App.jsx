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
  { name:'PERMIT PHANTOM',    emoji:'👻', color:'#9CA3AF', flavor:'Denies every permit without the proper stamps!' },
  { name:'CALIPER CRUSHER',   emoji:'📏', color:'#3B7DC4', flavor:'Measures your every mistake down to the micron!' },
  { name:'PRESS PHANTOM',     emoji:'🏭', color:'#71717A', flavor:'Crushes sheet metal — and excuses — flat!' },
  { name:'LATHE LORD',        emoji:'🌀', color:'#A8A8B0', flavor:'Turns raw stock into razor-sharp judgment!' },
  { name:'DRAWING DEMON',     emoji:'📐', color:'#1E3A8A', flavor:'Rejects anything outside the tolerance zone!' },
  { name:'INSPECTION DRAGON', emoji:'🐉', color:'#D4AF37', flavor:'The final inspection — pass or be scrapped!' },
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
  const aspect = 165 / 100
  const h = Math.round(size * aspect)
  return (
    <svg width={size} height={h} viewBox="0 -45 100 165"
      style={{
        filter:'drop-shadow(0 0 14px #FF440099) drop-shadow(0 0 4px #8B691466)',
        animation:'wf-bob 3s ease-in-out infinite',
      }}>
      <defs>
        {/* Visor glow gradient */}
        <radialGradient id="wf-visor-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFCC00" stopOpacity="0.9"/>
          <stop offset="60%"  stopColor="#FF4400" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#CC2200" stopOpacity="0"/>
        </radialGradient>
        {/* Anvil chest plate gradient */}
        <linearGradient id="wf-chest-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#8B6914"/>
          <stop offset="100%" stopColor="#3d2e08"/>
        </linearGradient>
        {/* Leather apron gradient */}
        <linearGradient id="wf-apron-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5a3a1a"/>
          <stop offset="100%" stopColor="#2e1d0c"/>
        </linearGradient>
        {/* Spark gradient at hammer tip */}
        <radialGradient id="wf-arc-grad" cx="50%" cy="80%" r="60%">
          <stop offset="0%"   stopColor="#ffffff"/>
          <stop offset="30%"  stopColor="#FFCC00"/>
          <stop offset="70%"  stopColor="#FF4400"/>
          <stop offset="100%" stopColor="#CC220000"/>
        </radialGradient>
        {/* Bronze edge highlight */}
        <linearGradient id="wf-armor-hi" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#a8841a"/>
          <stop offset="40%"  stopColor="#d4ab2a"/>
          <stop offset="100%" stopColor="#5a4310"/>
        </linearGradient>
      </defs>

      {/* ── LEGS ── */}
      {/* Left leg */}
      <path d="M36 88 L34 108 L30 110 L28 108 L30 88Z" fill="#2e1d0c" stroke="#5a3a1a" strokeWidth="0.5"/>
      <path d="M30 108 L28 108 L26 112 L34 112 L34 110Z" fill="#1f1408"/>
      {/* Right leg */}
      <path d="M64 88 L66 108 L70 110 L72 108 L70 88Z" fill="#2e1d0c" stroke="#5a3a1a" strokeWidth="0.5"/>
      <path d="M70 108 L72 108 L74 112 L66 112 L66 110Z" fill="#1f1408"/>
      {/* Apron hem flaps */}
      <path d="M30 84 L26 100 L34 100 L36 86Z" fill="#4a2f1a" stroke="#6b4423" strokeWidth="0.6"/>
      <path d="M70 84 L74 100 L66 100 L64 86Z" fill="#4a2f1a" stroke="#6b4423" strokeWidth="0.6"/>
      {/* Boot bands */}
      <rect x="27" y="98" width="8" height="5" rx="1.5" fill="#5a3a1a"/>
      <rect x="65" y="98" width="8" height="5" rx="1.5" fill="#5a3a1a"/>

      {/* ── TORSO ── */}
      {/* Muscular body silhouette */}
      <path d="M26 58 L22 88 L78 88 L74 58 L70 44 L30 44Z" fill="#3a2a1a" stroke="#5a3a1a" strokeWidth="0.8"/>
      {/* Leather apron bib */}
      <path d="M34 50 L32 84 L68 84 L66 50 L58 46 L42 46Z" fill="url(#wf-apron-grad)" stroke="#6b4423" strokeWidth="0.7"/>
      {/* Apron stitch lines */}
      <path d="M37 52 L35.5 82" stroke="#3a2511" strokeWidth="1" opacity="0.6"/>
      <path d="M63 52 L64.5 82" stroke="#3a2511" strokeWidth="1" opacity="0.6"/>
      {/* Anvil-shaped chest plate */}
      <path d="M40 54 L38 62 L62 62 L60 54 Q60 50 50 50 Q40 50 40 54Z" fill="url(#wf-chest-grad)" stroke="#5a4310" strokeWidth="0.8"/>
      <path d="M38 62 L36 68 L64 68 L62 62Z" fill="url(#wf-chest-grad)" stroke="#5a4310" strokeWidth="0.8"/>
      <rect x="44" y="68" width="12" height="10" rx="1.5" fill="#3d2e08" stroke="#5a4310" strokeWidth="0.6"/>
      {/* "SF" engraved text on anvil plate */}
      <text x="50" y="60" textAnchor="middle" fontFamily="monospace" fontWeight="900"
        fontSize="7" fill="#FF4400" opacity="0.9" letterSpacing="0.5"
        style={{ filter:'url(#wf-visor-glow)' }}>SF</text>
      <text x="50" y="60" textAnchor="middle" fontFamily="monospace" fontWeight="900"
        fontSize="7" fill="#FF440033" letterSpacing="0.5" stroke="#FF440022" strokeWidth="2.5">SF</text>
      {/* Bulky shoulder pads */}
      <path d="M26 58 L16 50 L12 60 L18 70 L28 68Z" fill="#4a3a1a" stroke="#6b4423" strokeWidth="0.7"/>
      <path d="M74 58 L84 50 L88 60 L82 70 L72 68Z" fill="#4a3a1a" stroke="#6b4423" strokeWidth="0.7"/>
      {/* Belt */}
      <rect x="28" y="82" width="44" height="6" rx="1" fill="#2e1d0c" stroke="#5a3a1a" strokeWidth="0.6"/>
      <rect x="44" y="83" width="12" height="4" rx="1" fill="#8B6914" opacity="0.8"/>

      {/* ── LEFT ARM (thick glove — hanging) ── */}
      <path d="M18 70 L10 78 L8 92 L18 94 L22 80 L28 70Z" fill="#3a2a1a" stroke="#5a3a1a" strokeWidth="0.6"/>
      {/* Thick glove */}
      <path d="M7 84 L18 94 L24 90 L13 80Z" fill="#4a3a1a" stroke="#6b4423" strokeWidth="0.7"/>
      <line x1="10" y1="86" x2="16" y2="92" stroke="#6b4423" strokeWidth="0.8" opacity="0.5"/>

      {/* ── RIGHT ARM (raising forge hammer) ── */}
      {/* Upper arm — bulging */}
      <path d="M74 58 L86 44 L92 30 L84 24 L76 38 L66 54Z" fill="#3a2a1a" stroke="#5a3a1a" strokeWidth="0.6"/>
      {/* Forearm */}
      <path d="M92 30 L96 16 L88 10 L84 24Z" fill="#3a2a1a" stroke="#5a3a1a" strokeWidth="0.6"/>
      {/* Thick gauntlet glove */}
      <path d="M87 12 L83 4 L89 0 L95 4 L96 16Z" fill="#4a3a1a" stroke="#6b4423" strokeWidth="0.7"/>
      <line x1="88" y1="10" x2="92" y2="2" stroke="#6b4423" strokeWidth="0.8" opacity="0.5"/>
      {/* Hammer handle */}
      <rect x="80" y="-10" width="6" height="22" rx="2" fill="#4a2f1a" stroke="#2e1d0c" strokeWidth="0.5"
        transform="rotate(-18 83 1)"/>
      <line x1="78" y1="8" x2="83" y2="-8" stroke="#2e1d0c" strokeWidth="1" opacity="0.6" transform="rotate(-18 83 1)"/>
      {/* Heavy forge hammer head */}
      <rect x="68" y="-22" width="28" height="14" rx="2" fill="url(#wf-armor-hi)" stroke="#3d2e08" strokeWidth="1"
        transform="rotate(-18 82 -15)"/>
      <rect x="70" y="-19" width="24" height="4" rx="1" fill="#d4ab2a" opacity="0.6" transform="rotate(-18 82 -17)"/>

      {/* ── SPARKS flying from hammer tip ── */}
      <ellipse cx="78" cy="-26" rx="9" ry="9" fill="#FF440022"/>
      <path d="M76 -22 Q74 -28 78 -32 Q80 -35 79 -31 Q83 -36 80 -28 Q84 -32 82 -26 Q80 -22 78 -22Z"
        fill="url(#wf-arc-grad)" opacity="0.95"/>
      <ellipse cx="78" cy="-29" rx="2.2" ry="3" fill="#ffffff" opacity="0.9"/>
      <line x1="78" y1="-27" x2="70" y2="-36" stroke="#FFCC00" strokeWidth="1"   opacity="0.85" strokeLinecap="round"/>
      <line x1="78" y1="-27" x2="86" y2="-34" stroke="#FF4400" strokeWidth="0.9" opacity="0.8" strokeLinecap="round"/>
      <line x1="78" y1="-27" x2="68" y2="-20" stroke="#FFCC00" strokeWidth="0.8" opacity="0.7" strokeLinecap="round"/>
      <line x1="78" y1="-27" x2="88" y2="-22" stroke="#FF8800" strokeWidth="0.7" opacity="0.7" strokeLinecap="round"/>
      <line x1="78" y1="-27" x2="80" y2="-12" stroke="#FF4400" strokeWidth="0.7" opacity="0.6" strokeLinecap="round"/>
      <circle cx="68" cy="-19" r="1.2" fill="#FFCC00" opacity="0.9"/>
      <circle cx="88" cy="-23" r="1.0" fill="#ffffff"  opacity="0.85"/>
      <circle cx="90" cy="-31" r="0.8" fill="#FF8800"  opacity="0.8"/>
      <circle cx="66" cy="-26" r="0.9" fill="#FF4400"  opacity="0.75"/>
      <circle cx="82" cy="-38" r="0.7" fill="#FFCC00"  opacity="0.7"/>
      <circle cx="74" cy="-37" r="1.0" fill="#ffffff"  opacity="0.65"/>

      {/* ── NECK ── */}
      <rect x="38" y="36" width="24" height="12" rx="2" fill="#3a2a1a" stroke="#5a3a1a" strokeWidth="0.6"/>

      {/* ── HARD HAT (with face shield pushed up) ── */}
      <path d="M24 34 L26 18 Q28 6 50 4 Q72 6 74 18 L76 34 L70 38 L30 38Z"
        fill="#8B6914" stroke="#5a4310" strokeWidth="1"/>
      <path d="M26 16 Q50 6 74 16" stroke="#a8841a" strokeWidth="1.4" fill="none" opacity="0.5"/>
      {/* Hard hat brim */}
      <path d="M22 34 L78 34 L74 38 L26 38Z" fill="#6b5210" stroke="#3d2e08" strokeWidth="0.6"/>
      {/* Face shield — flipped up over hat brim */}
      <path d="M22 18 Q50 8 78 18 L76 22 Q50 13 24 22Z" fill="#0d0d18" stroke="#888" strokeWidth="0.8" opacity="0.85"/>
      <line x1="26" y1="19" x2="74" y2="19" stroke="#999" strokeWidth="0.5" opacity="0.6"/>

      {/* ── MUSCULAR JAW / FACE ── */}
      <path d="M30 30 L32 40 Q50 46 68 40 L70 30 L66 24 L34 24Z" fill="#c98a52" stroke="#8a5a32" strokeWidth="0.6"/>
      {/* Heavy brow */}
      <rect x="34" y="26" width="32" height="3" rx="1.5" fill="#6b4423" opacity="0.7"/>

      {/* ── VISOR (down position, glowing) — worn over eyes ── */}
      <path d="M32 28 L34 24 L66 24 L68 28 L64 33 L36 33Z" fill="#0d0d18" stroke="#FF440055" strokeWidth="0.8"/>
      <path d="M33 28 L35 25 L65 25 L67 28 L63 32 L37 32Z" fill="url(#wf-visor-glow)" opacity="0.4"/>
      {/* Glowing forge-red eyes behind visor */}
      <ellipse cx="42" cy="28" rx="5" ry="3.2" fill="#FF4400" opacity="0.8"/>
      <ellipse cx="58" cy="28" rx="5" ry="3.2" fill="#FF4400" opacity="0.8"/>
      <ellipse cx="42" cy="28" rx="2.6" ry="1.8" fill="#FFCC00" opacity="0.9"/>
      <ellipse cx="58" cy="28" rx="2.6" ry="1.8" fill="#FFCC00" opacity="0.9"/>
      <ellipse cx="42" cy="28" rx="1.1" ry="0.8" fill="#ffffff"  opacity="0.8"/>
      <ellipse cx="58" cy="28" rx="1.1" ry="0.8" fill="#ffffff"  opacity="0.8"/>

      {/* ── GROUND SHADOW ── */}
      <ellipse cx="50" cy="116" rx="22" ry="3" fill="#FF440011"/>
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
function MonsterPermitPhantom() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k1-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="60%" stopColor="#9CA3AF"/>
          <stop offset="100%" stopColor="#374151" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="k1-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="k1-robe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5E7EB"/>
          <stop offset="100%" stopColor="#9CA3AF"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="url(#k1-glow)"/>
      {/* Floating red prohibition signs */}
      {[{x:14,y:30,r:9},{x:106,y:26,r:7},{x:10,y:78,r:7},{x:108,y:84,r:8},{x:60,y:8,r:6}].map((s,i) => (
        <g key={i} opacity="0.85">
          <circle cx={s.x} cy={s.y} r={s.r} fill="none" stroke="#DC2626" strokeWidth="2.4"/>
          <line x1={s.x-s.r*0.7} y1={s.y+s.r*0.7} x2={s.x+s.r*0.7} y2={s.y-s.r*0.7} stroke="#DC2626" strokeWidth="2.4"/>
        </g>
      ))}
      {/* Ghostly wavy robe — translucent */}
      <path d="M28 100 Q22 70 26 44 Q32 14 60 10 Q88 14 94 44 Q98 70 92 100 Q84 90 76 98 Q68 90 60 98 Q52 90 44 98 Q36 90 28 100Z"
        fill="url(#k1-robe)" opacity="0.55"/>
      <path d="M32 96 Q27 70 30 46 Q35 18 60 14 Q85 18 90 46 Q93 70 88 96 Q81 87 74 95 Q67 87 60 95 Q53 87 46 95 Q39 87 32 96Z"
        fill="url(#k1-robe)" opacity="0.8"/>
      {/* Robe fold lines */}
      <path d="M44 40 Q42 64 40 88" stroke="#fff" strokeWidth="1" opacity="0.4"/>
      <path d="M60 36 Q60 64 60 92" stroke="#fff" strokeWidth="1" opacity="0.4"/>
      <path d="M76 40 Q78 64 80 88" stroke="#fff" strokeWidth="1" opacity="0.4"/>
      {/* Hi-vis vest sash */}
      <path d="M40 48 L48 92 L56 90 L50 46Z" fill="#F59E0B" opacity="0.85"/>
      <path d="M80 48 L72 92 L64 90 L70 46Z" fill="#F59E0B" opacity="0.85"/>
      <rect x="44" y="58" width="6" height="4" fill="#1f2937" opacity="0.7"/>
      <rect x="70" y="58" width="6" height="4" fill="#1f2937" opacity="0.7"/>
      {/* Left arm — holding clipboard */}
      <path d="M36 58 Q18 64 12 76" stroke="#9CA3AF" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85"/>
      <rect x="0" y="74" width="18" height="24" rx="1.5" fill="#7C5230" transform="rotate(-8 9 86)"/>
      <rect x="2" y="76" width="14" height="19" rx="1" fill="#f0e8cc" transform="rotate(-8 9 86)"/>
      {[80,84,88,92].map(y => <line key={y} x1="4" y1={y} x2="14" y2={y} stroke="#999" strokeWidth="0.8" opacity="0.6" transform="rotate(-8 9 86)"/>)}
      <line x1="4" y1="89" x2="9" y2="93" stroke="#DC2626" strokeWidth="1.4" transform="rotate(-8 9 86)"/>
      <line x1="9" y1="89" x2="4" y2="93" stroke="#DC2626" strokeWidth="1.4" transform="rotate(-8 9 86)"/>
      {/* Right arm — raised, pointing/forbidding */}
      <path d="M84 58 Q102 50 108 36" stroke="#9CA3AF" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M108 36 L104 30 M108 36 L112 30 M108 36 L106 42" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      {/* Neck */}
      <rect x="48" y="38" width="24" height="10" rx="3" fill="#9CA3AF" opacity="0.8"/>
      {/* Head — ghostly pale */}
      <path d="M30 32 Q32 10 60 8 Q88 10 90 32 L86 46 L34 46Z" fill="url(#k1-robe)"/>
      {/* Hard hat */}
      <path d="M28 28 Q60 6 92 28 L90 34 Q60 16 30 34Z" fill="#FBBF24" stroke="#92400E" strokeWidth="0.8"/>
      <ellipse cx="60" cy="14" rx="18" ry="7" fill="#FCD34D" stroke="#92400E" strokeWidth="0.8"/>
      <line x1="44" y1="13" x2="76" y2="13" stroke="#92400E" strokeWidth="0.6" opacity="0.5"/>
      {/* Hollow ghost eyes */}
      <ellipse cx="46" cy="32" rx="7" ry="8" fill="#1f2937" opacity="0.9"/>
      <ellipse cx="74" cy="32" rx="7" ry="8" fill="#1f2937" opacity="0.9"/>
      <ellipse cx="46" cy="33" rx="3.6" ry="4.5" fill="url(#k1-eye)"/>
      <ellipse cx="74" cy="33" rx="3.6" ry="4.5" fill="url(#k1-eye)"/>
      {/* Disapproving frown */}
      <path d="M44 42 Q60 38 76 42" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* Wispy ghost tail trails */}
      <path d="M44 98 Q40 108 44 116" stroke="#E5E7EB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M60 98 Q60 110 60 118" stroke="#E5E7EB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M76 98 Q80 108 76 116" stroke="#E5E7EB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#9CA3AF20"/>
    </svg>
  )
}

function MonsterCaliperCrusher() {
  const dialTicks = (cx, cy, r, n, fill) =>
    Array.from({length: n}, (_, i) => {
      const a = (i / n) * Math.PI * 2
      const x1 = cx + (r-3) * Math.cos(a), y1 = cy + (r-3) * Math.sin(a)
      const x2 = cx + r * Math.cos(a),     y2 = cy + r * Math.sin(a)
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} strokeWidth="1.2"/>
    })
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k2-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B7DC4" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#3B7DC4" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="k2-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A9CD4"/>
          <stop offset="100%" stopColor="#1A3A5C"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="url(#k2-glow)"/>
      {/* Micrometer-barrel legs */}
      <rect x="40" y="88" width="14" height="26" rx="2" fill="#1A3A5C"/>
      <rect x="66" y="88" width="14" height="26" rx="2" fill="#1A3A5C"/>
      {[92,97,102,107].map(y => <line key={y}     x1="40" y1={y} x2="54" y2={y} stroke="#5A9CD4" strokeWidth="0.7" opacity="0.7"/>)}
      {[92,97,102,107].map(y => <line key={y+'r'} x1="66" y1={y} x2="80" y2={y} stroke="#5A9CD4" strokeWidth="0.7" opacity="0.7"/>)}
      <rect x="38" y="106" width="18" height="8" rx="2" fill="#5A9CD4"/>
      <rect x="64" y="106" width="18" height="8" rx="2" fill="#5A9CD4"/>
      <rect x="36" y="112" width="22" height="4" rx="1" fill="#0D2240"/>
      <rect x="62" y="112" width="22" height="4" rx="1" fill="#0D2240"/>
      {/* Torso — stacked dial gauge plates */}
      <rect x="32" y="56" width="56" height="36" rx="4" fill="#1A3A5C"/>
      <rect x="36" y="60" width="48" height="28" rx="3" fill="url(#k2-metal)"/>
      <circle cx="60" cy="74" r="13" fill="#0D2240"/>
      <circle cx="60" cy="74" r="11" fill="#15304f" stroke="#5A9CD4" strokeWidth="1"/>
      {dialTicks(60, 74, 11, 12, '#88CCFF')}
      <line x1="60" y1="74" x2="66" y2="67" stroke="#FF4444" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="60" cy="74" r="1.6" fill="#88CCFF"/>
      {/* Hi-vis warning chevron on chest */}
      <path d="M44 92 L60 84 L76 92" stroke="#FBBF24" strokeWidth="2.5" fill="none" opacity="0.8"/>
      {/* Shoulders */}
      <circle cx="30" cy="60" r="9" fill="#0D2240"/>
      <circle cx="90" cy="60" r="9" fill="#0D2240"/>
      <circle cx="30" cy="60" r="6.5" fill="#5A9CD4"/>
      <circle cx="90" cy="60" r="6.5" fill="#5A9CD4"/>
      {/* Vernier-caliper arms — sliding jaws */}
      <rect x="2" y="58" width="30" height="6" rx="1" fill="#1A3A5C"/>
      <rect x="4" y="59.2" width="26" height="3.6" rx="0.8" fill="#88CCFF" opacity="0.7"/>
      {[6,10,14,18,22,26].map(x => <line key={x} x1={x} y1="58" x2={x} y2="61" stroke="#0D2240" strokeWidth="0.6"/>)}
      <path d="M2 58 L2 50 L7 50 L7 58Z" fill="#5A9CD4"/>
      <path d="M2 64 L2 72 L7 72 L7 64Z" fill="#5A9CD4"/>
      <rect x="88" y="58" width="30" height="6" rx="1" fill="#1A3A5C"/>
      <rect x="90" y="59.2" width="26" height="3.6" rx="0.8" fill="#88CCFF" opacity="0.7"/>
      {[92,96,100,104,108,112].map(x => <line key={x} x1={x} y1="58" x2={x} y2="61" stroke="#0D2240" strokeWidth="0.6"/>)}
      <path d="M118 58 L118 50 L113 50 L113 58Z" fill="#5A9CD4"/>
      <path d="M118 64 L118 72 L113 72 L113 64Z" fill="#5A9CD4"/>
      {/* Head — large dial gauge face */}
      <circle cx="60" cy="28" r="23" fill="#1A3A5C"/>
      <circle cx="60" cy="28" r="20" fill="#15304f" stroke="#5A9CD4" strokeWidth="1.2"/>
      {dialTicks(60, 28, 19, 24, '#88CCFF')}
      {/* Dial gauge eyes */}
      <circle cx="50" cy="28" r="6.5" fill="#0A1E35" stroke="#5A9CD4" strokeWidth="1"/>
      <circle cx="70" cy="28" r="6.5" fill="#0A1E35" stroke="#5A9CD4" strokeWidth="1"/>
      {dialTicks(50, 28, 6, 8, '#88CCFF')}
      {dialTicks(70, 28, 6, 8, '#88CCFF')}
      <line x1="50" y1="28" x2="53" y2="24" stroke="#FF4444" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="70" y1="28" x2="73" y2="24" stroke="#FF4444" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="50" cy="28" r="1.1" fill="#88CCFF"/>
      <circle cx="70" cy="28" r="1.1" fill="#88CCFF"/>
      {/* Grill mouth */}
      <rect x="48" y="38" width="24" height="8" rx="2" fill="#0A1E35"/>
      {[40.5,42.5,44.5].map(y => <rect key={y} x="49" y={y} width="22" height="1.2" rx="0.5" fill="#5A9CD4" opacity="0.7"/>)}
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#3B7DC420"/>
    </svg>
  )
}

function MonsterPressPhantom() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k3-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="k3-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9CA0A6"/>
          <stop offset="100%" stopColor="#3F4448"/>
        </linearGradient>
        <radialGradient id="k3-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B4A"/>
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="62" rx="52" ry="52" fill="url(#k3-glow)"/>
      {/* Press bed / base */}
      <rect x="22" y="98" width="76" height="14" rx="2" fill="#2A2D30" stroke="#71717A" strokeWidth="1"/>
      {[30,46,62,78,90].map(x => <rect key={x} x={x} y="101" width="4" height="4" fill="#DC2626" opacity="0.7"/>)}
      {/* C-frame columns */}
      <path d="M26 98 L30 30 Q32 14 50 12 L52 22 Q42 24 40 34 L38 98Z" fill="url(#k3-metal)" stroke="#26282A" strokeWidth="1"/>
      <path d="M94 98 L90 30 Q88 14 70 12 L68 22 Q78 24 80 34 L82 98Z" fill="url(#k3-metal)" stroke="#26282A" strokeWidth="1"/>
      {/* Warning stripes on frame edges */}
      {[34,42,50,58].map(y => <rect key={y} x="33" y={y} width="6" height="3" fill="#FBBF24" opacity="0.85" transform={`skewY(-25)`}/>)}
      {[34,42,50,58].map(y => <rect key={y+'r'} x="81" y={y} width="6" height="3" fill="#FBBF24" opacity="0.85" transform={`skewY(25)`}/>)}
      {/* Top crossbeam */}
      <rect x="28" y="8" width="64" height="14" rx="2" fill="url(#k3-metal)" stroke="#26282A" strokeWidth="1"/>
      {/* Evil riveted face on crossbeam */}
      <ellipse cx="44" cy="15" rx="6.5" ry="5" fill="#1a1a1c"/>
      <ellipse cx="76" cy="15" rx="6.5" ry="5" fill="#1a1a1c"/>
      <ellipse cx="44" cy="15" rx="4" ry="3" fill="url(#k3-eye)"/>
      <ellipse cx="76" cy="15" rx="4" ry="3" fill="url(#k3-eye)"/>
      <ellipse cx="44" cy="15" rx="1.6" ry="1.2" fill="#FFE066"/>
      <ellipse cx="76" cy="15" rx="1.6" ry="1.2" fill="#FFE066"/>
      <path d="M38 9 L48 11" stroke="#1a1a1c" strokeWidth="2" strokeLinecap="round"/>
      <path d="M82 9 L72 11" stroke="#1a1a1c" strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 19 L60 22 L70 19 L68 23 L60 26 L52 23Z" fill="#1a1a1c"/>
      {/* Hydraulic ram cylinder descending */}
      <rect x="52" y="22" width="16" height="38" rx="2" fill="#26282A" stroke="#71717A" strokeWidth="0.8"/>
      <rect x="54" y="24" width="12" height="34" rx="1.5" fill="url(#k3-metal)"/>
      <line x1="60" y1="24" x2="60" y2="58" stroke="#DC2626" strokeWidth="1" opacity="0.6"/>
      {/* Crushing fists */}
      <circle cx="36" cy="76" r="15" fill="#3F4448" stroke="#26282A" strokeWidth="1.2"/>
      <circle cx="84" cy="76" r="15" fill="#3F4448" stroke="#26282A" strokeWidth="1.2"/>
      <circle cx="36" cy="76" r="11" fill="url(#k3-metal)"/>
      <circle cx="84" cy="76" r="11" fill="url(#k3-metal)"/>
      {[[30,70],[42,70],[30,82],[42,82]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2" fill="#26282A"/>)}
      {[[78,70],[90,70],[78,82],[90,82]].map(([x,y],i) => <circle key={i+'r'} cx={x} cy={y} r="2" fill="#26282A"/>)}
      <rect x="44" y="70" width="32" height="12" rx="2" fill="#26282A"/>
      <rect x="46" y="72" width="28" height="8" rx="1.5" fill="url(#k3-metal)"/>
      {/* Sparks at crush point */}
      {[{x:30,y:92,r:1.6,c:'#FBBF24'},{x:48,y:96,r:1.2,c:'#fff'},{x:70,y:96,r:1.4,c:'#FBBF24'},{x:90,y:92,r:1.6,c:'#fff'},{x:60,y:98,r:1.8,c:'#DC2626'}].map((s,i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity="0.9"/>)}
      <line x1="30" y1="92" x2="24" y2="86" stroke="#FBBF24" strokeWidth="1.2" opacity="0.8"/>
      <line x1="90" y1="92" x2="96" y2="86" stroke="#FBBF24" strokeWidth="1.2" opacity="0.8"/>
      <line x1="60" y1="98" x2="60" y2="90" stroke="#fff" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#DC262620"/>
    </svg>
  )
}

function MonsterLatheLord() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="k4-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D1D5DB"/>
          <stop offset="100%" stopColor="#4B5563"/>
        </linearGradient>
        <radialGradient id="k4-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A8A8B0" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#A8A8B0" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="k4-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="url(#k4-glow)"/>
      {/* Flying metal chips (curly ribbons) */}
      {[{x:12,y:24,s:1,rot:20},{x:104,y:30,s:0.8,rot:-30},{x:8,y:70,s:0.7,rot:50},{x:108,y:80,s:0.9,rot:-10},{x:20,y:96,s:0.7,rot:80}].map((c,i) => (
        <path key={i} d="M0 0 Q6 -4 4 -10 Q2 -16 8 -18 Q14 -20 12 -26" fill="none"
          stroke="#D1D5DB" strokeWidth="2.2" strokeLinecap="round" opacity="0.8"
          transform={`translate(${c.x},${c.y}) rotate(${c.rot}) scale(${c.s})`}/>
      ))}
      {/* Tailstock legs */}
      <rect x="40" y="90" width="14" height="24" rx="3" fill="#4B5563"/>
      <rect x="66" y="90" width="14" height="24" rx="3" fill="#4B5563"/>
      <rect x="38" y="106" width="18" height="8" rx="2" fill="#9CA3AF"/>
      <rect x="64" y="106" width="18" height="8" rx="2" fill="#9CA3AF"/>
      {/* Cylindrical workpiece body with spin lines */}
      <rect x="30" y="54" width="60" height="38" rx="6" fill="url(#k4-metal)" stroke="#374151" strokeWidth="1"/>
      {[60,68,76,84].map(y => <ellipse key={y} cx="60" cy={y} rx="30" ry="2" fill="none" stroke="#6B7280" strokeWidth="0.7" opacity="0.6"/>)}
      {/* Motion-blur speed lines suggesting spin */}
      <path d="M24 58 Q20 72 24 88" stroke="#D1D5DB" strokeWidth="1.4" fill="none" opacity="0.6"/>
      <path d="M96 58 Q100 72 96 88" stroke="#D1D5DB" strokeWidth="1.4" fill="none" opacity="0.6"/>
      {/* Shoulders */}
      <circle cx="28" cy="58" r="9" fill="#374151"/>
      <circle cx="92" cy="58" r="9" fill="#374151"/>
      <circle cx="28" cy="58" r="6" fill="#9CA3AF"/>
      <circle cx="92" cy="58" r="6" fill="#9CA3AF"/>
      {/* Cutting-tool arms — tool post with carbide insert */}
      <rect x="2" y="56" width="24" height="8" rx="1.5" fill="#374151"/>
      <rect x="4" y="57.5" width="20" height="5" rx="1" fill="#9CA3AF"/>
      <polygon points="0,55 8,52 8,68 0,65" fill="#E5E7EB" stroke="#374151" strokeWidth="0.8"/>
      <polygon points="2,57 6,56 6,64 2,63" fill="#FBBF24" opacity="0.85"/>
      <rect x="94" y="56" width="24" height="8" rx="1.5" fill="#374151"/>
      <rect x="96" y="57.5" width="20" height="5" rx="1" fill="#9CA3AF"/>
      <polygon points="120,55 112,52 112,68 120,65" fill="#E5E7EB" stroke="#374151" strokeWidth="0.8"/>
      <polygon points="118,57 114,56 114,64 118,63" fill="#FBBF24" opacity="0.85"/>
      {/* Head — 3-jaw spinning chuck */}
      <circle cx="60" cy="28" r="23" fill="#4B5563" stroke="#1F2937" strokeWidth="1.2"/>
      <circle cx="60" cy="28" r="20" fill="url(#k4-metal)"/>
      {/* Three gripping jaws around chuck */}
      {[0,120,240].map((deg,i) => (
        <g key={i} transform={`rotate(${deg} 60 28)`}>
          <rect x="56" y="6" width="8" height="13" rx="1.5" fill="#6B7280" stroke="#374151" strokeWidth="0.8"/>
          <rect x="57" y="7.5" width="6" height="4" fill="#9CA3AF"/>
        </g>
      ))}
      <circle cx="60" cy="28" r="13" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1"/>
      {/* Dial-gauge style eyes embedded in chuck face */}
      <circle cx="52" cy="27" r="4.5" fill="#1F2937"/>
      <circle cx="68" cy="27" r="4.5" fill="#1F2937"/>
      <circle cx="52" cy="27" r="3" fill="url(#k4-eye)"/>
      <circle cx="68" cy="27" r="3" fill="url(#k4-eye)"/>
      <circle cx="52" cy="27" r="1.2" fill="#fff"/>
      <circle cx="68" cy="27" r="1.2" fill="#fff"/>
      {/* Center bore / mouth */}
      <circle cx="60" cy="34" r="3.5" fill="#1F2937"/>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#A8A8B020"/>
    </svg>
  )
}

function MonsterDrawingDemon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k5-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="k5-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3A8A"/>
          <stop offset="100%" stopColor="#0B1E4D"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="54" ry="54" fill="url(#k5-glow)"/>
      {/* Floating GD&T tolerance glyphs */}
      {[{x:14,y:26,t:'⌖'},{x:106,y:22,t:'⏥'},{x:10,y:88,t:'⊥'},{x:108,y:92,t:'∥'},{x:60,y:6,t:'⌭'}].map((g,i) => (
        <text key={i} x={g.x} y={g.y} fontSize="11" fill="#60A5FA" opacity="0.85" fontFamily="monospace" textAnchor="middle">{g.t}</text>
      ))}
      {/* GD&T feature-control-frame claw arms */}
      <g transform="translate(0,0)">
        <path d="M26 68 Q10 64 2 58" stroke="#1E3A8A" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <rect x="-12" y="50" width="26" height="11" rx="1.5" fill="#0B1E4D" stroke="#60A5FA" strokeWidth="1"/>
        <line x1="-2" y1="50" x2="-2" y2="61" stroke="#60A5FA" strokeWidth="1"/>
        <text x="-7" y="58" fontSize="6.5" fill="#93C5FD" fontFamily="monospace">⏥</text>
        <text x="2" y="58" fontSize="6.5" fill="#93C5FD" fontFamily="monospace">.02</text>
      </g>
      <g>
        <path d="M94 68 Q110 64 118 58" stroke="#1E3A8A" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <rect x="106" y="50" width="26" height="11" rx="1.5" fill="#0B1E4D" stroke="#60A5FA" strokeWidth="1"/>
        <line x1="116" y1="50" x2="116" y2="61" stroke="#60A5FA" strokeWidth="1"/>
        <text x="108" y="58" fontSize="6.5" fill="#93C5FD" fontFamily="monospace">⊕</text>
        <text x="120" y="58" fontSize="6" fill="#93C5FD" fontFamily="monospace">A</text>
      </g>
      {/* Blueprint-paper demon body */}
      <path d="M22 82 Q16 58 22 38 Q30 12 60 8 Q90 12 98 38 Q104 58 98 82 Q94 102 78 110 Q60 116 42 110 Q26 102 22 82Z" fill="url(#k5-paper)" stroke="#3B82F6" strokeWidth="1"/>
      {/* Dimension lines & arrows across body */}
      <line x1="30" y1="44" x2="90" y2="44" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <path d="M30 44 L34 42 M30 44 L34 46 M90 44 L86 42 M90 44 L86 46" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
      <line x1="34" y1="62" x2="86" y2="62" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5"/>
      <line x1="40" y1="90" x2="80" y2="90" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5"/>
      <line x1="60" y1="20" x2="60" y2="100" stroke="#60A5FA" strokeWidth="0.6" opacity="0.35" strokeDasharray="3,3"/>
      {/* Feature-control-frame horns */}
      <rect x="34" y="2" width="20" height="9" rx="1" fill="#0B1E4D" stroke="#60A5FA" strokeWidth="1" transform="rotate(-12 44 6)"/>
      <line x1="44" y1="2" x2="44" y2="11" stroke="#60A5FA" strokeWidth="0.8" transform="rotate(-12 44 6)"/>
      <text x="36" y="9" fontSize="5.5" fill="#93C5FD" fontFamily="monospace" transform="rotate(-12 44 6)">⌖ .1</text>
      <rect x="66" y="2" width="20" height="9" rx="1" fill="#0B1E4D" stroke="#60A5FA" strokeWidth="1" transform="rotate(12 76 6)"/>
      <line x1="76" y1="2" x2="76" y2="11" stroke="#60A5FA" strokeWidth="0.8" transform="rotate(12 76 6)"/>
      <text x="68" y="9" fontSize="5.5" fill="#93C5FD" fontFamily="monospace" transform="rotate(12 76 6)">⌭ .2</text>
      {/* Glowing eyes */}
      <ellipse cx="46" cy="38" rx="7" ry="9" fill="#0B1E4D" stroke="#3B82F6" strokeWidth="0.8"/>
      <ellipse cx="74" cy="38" rx="7" ry="9" fill="#0B1E4D" stroke="#3B82F6" strokeWidth="0.8"/>
      <ellipse cx="46" cy="38" rx="4" ry="5.5" fill="#60A5FA" opacity="0.9"/>
      <ellipse cx="74" cy="38" rx="4" ry="5.5" fill="#60A5FA" opacity="0.9"/>
      <ellipse cx="46" cy="38" rx="1.6" ry="2.4" fill="#DBEAFE"/>
      <ellipse cx="74" cy="38" rx="1.6" ry="2.4" fill="#DBEAFE"/>
      {/* Tolerance-zone mouth */}
      <rect x="44" y="58" width="32" height="10" rx="3" fill="#0B1E4D" stroke="#60A5FA" strokeWidth="0.8"/>
      <line x1="44" y1="63" x2="76" y2="63" stroke="#3B82F6" strokeWidth="0.6" opacity="0.6"/>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#1E3A8A22"/>
    </svg>
  )
}

function MonsterInspectionDragon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="k6-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
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
      {/* Tail ending in giant red rejection stamp */}
      <path d="M86 96 Q102 98 108 90 Q112 84 106 80 Q102 78 100 84 Q104 88 98 90 Q92 92 86 96Z" fill="#9B1C1C" stroke="#DC2626" strokeWidth="0.5"/>
      <circle cx="110" cy="84" r="13" fill="#7F1D1D" stroke="#DC2626" strokeWidth="1.5"/>
      <circle cx="110" cy="84" r="10" fill="#DC2626"/>
      <text x="110" y="87" fontSize="8.5" fontWeight="900" fill="#fff" fontFamily="monospace" textAnchor="middle">NG</text>
      <circle cx="110" cy="84" r="11.5" fill="none" stroke="#FCD34D" strokeWidth="1" opacity="0.7"/>
      {/* Wings — QC checklist clipboards */}
      <path d="M28 58 Q10 44 4 24 Q8 18 14 22 Q12 38 28 48" fill="#7F1D1D" opacity="0.9"/>
      <rect x="4" y="16" width="14" height="20" rx="1.5" fill="url(#k6-scroll)" transform="rotate(-12 11 26)"/>
      {[20,24,28,32].map(y => <g key={y}>
        <rect x="6" y={y-2} width="2.4" height="2.4" fill="none" stroke="#16a34a" strokeWidth="0.6" transform="rotate(-12 11 26)"/>
        <line x1="9.5" y1={y-1.5} x2="16" y2={y-1.5} stroke="#92400E" strokeWidth="0.6" opacity="0.7" transform="rotate(-12 11 26)"/>
      </g>)}
      <path d="M6 19 L8 21 L11 17" stroke="#16a34a" strokeWidth="0.8" fill="none" transform="rotate(-12 11 26)"/>
      <path d="M92 58 Q110 44 116 24 Q112 18 106 22 Q108 38 92 48" fill="#7F1D1D" opacity="0.9"/>
      <rect x="102" y="16" width="14" height="20" rx="1.5" fill="url(#k6-scroll)" transform="rotate(12 109 26)"/>
      {[20,24,28,32].map(y => <g key={y+'r'}>
        <rect x="104" y={y-2} width="2.4" height="2.4" fill="none" stroke="#DC2626" strokeWidth="0.6" transform="rotate(12 109 26)"/>
        <line x1="107.5" y1={y-1.5} x2="114" y2={y-1.5} stroke="#92400E" strokeWidth="0.6" opacity="0.7" transform="rotate(12 109 26)"/>
      </g>)}
      <path d="M104 21 L106 19 M104 19 L106 21" stroke="#DC2626" strokeWidth="0.8" transform="rotate(12 109 26)"/>
      {/* Body */}
      <path d="M32 58 L28 96 L92 96 L88 58 L76 50 L44 50Z" fill="#9B1C1C"/>
      <path d="M36 61 L33 93 L87 93 L84 61 L74 54 L46 54Z" fill="url(#k6-scale)"/>
      {/* Scale texture */}
      {[[44,62],[56,62],[68,62],[38,72],[50,72],[62,72],[74,72],[44,82],[56,82],[68,82]].map(([x,y],i) => <path key={i} d={`M${x} ${y} Q${x+6} ${y+7} ${x+12} ${y}`} fill="none" stroke="#DC2626" strokeWidth="1.2" opacity="0.5"/>)}
      {/* Gold pass-stamp marks */}
      {[[48,68],[72,70],[60,82],[42,80],[78,80]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2.5" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>)}
      {/* Left claw — holding a precision gauge */}
      <path d="M32 66 Q16 60 10 72" stroke="#9B1C1C" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <circle cx="10" cy="72" r="9" fill="#D4AF37"/>
      <circle cx="10" cy="72" r="7" fill="#FCD34D"/>
      {[0,45,90,135,180,225,270,315].map(d => <line key={d} x1="10" y1="72" x2={10+6*Math.cos(d*Math.PI/180)} y2={72+6*Math.sin(d*Math.PI/180)} stroke="#7F1D1D" strokeWidth="0.6" opacity="0.6"/>)}
      <line x1="10" y1="72" x2="13" y2="68" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round"/>
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
      {/* Micrometer breath — measuring jaws extending from mouth */}
      <path d="M48 38 Q40 50 34 64" stroke="#9CA3AF" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9"/>
      <path d="M72 38 Q80 50 86 64" stroke="#9CA3AF" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9"/>
      {[44,50,56].map((t,i) => <line key={i} x1={36+i*5} y1={44+i*7} x2={42+i*5} y2={46+i*7} stroke="#E5E7EB" strokeWidth="1" opacity="0.7"/>)}
      {[44,50,56].map((t,i) => <line key={i+'r'} x1={84-i*5} y1={44+i*7} x2={78-i*5} y2={46+i*7} stroke="#E5E7EB" strokeWidth="1" opacity="0.7"/>)}
      <path d="M34 64 L30 70 L38 70Z" fill="#D1D5DB"/>
      <path d="M86 64 L90 70 L82 70Z" fill="#D1D5DB"/>
      <circle cx="60" cy="76" r="4" fill="#DC2626" opacity="0.85"/>
      <circle cx="60" cy="76" r="2" fill="#FCD34D"/>
      <circle cx="34" cy="70" r="2.5" fill="#fff" opacity="0.8"/>
      <circle cx="86" cy="70" r="2.5" fill="#fff" opacity="0.8"/>
      <line x1="34" y1="70" x2="28" y2="76" stroke="#E5E7EB" strokeWidth="1" opacity="0.7"/>
      <line x1="86" y1="70" x2="92" y2="76" stroke="#E5E7EB" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="60" cy="116" rx="26" ry="3.5" fill="#D4AF3722"/>
    </svg>
  )
}

const MONSTER_SVGS = [
  MonsterPermitPhantom,
  MonsterCaliperCrusher,
  MonsterPressPhantom,
  MonsterLatheLord,
  MonsterDrawingDemon,
  MonsterInspectionDragon,
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
