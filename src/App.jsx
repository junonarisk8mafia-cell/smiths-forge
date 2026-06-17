// ============================================================
// WELDON'S FORGE — ENGLISH EDITION
// App.jsx — Complete game for foreign welding trainees in Japan
// ============================================================

import { useState, useEffect } from 'react'
import { QUIZ_STAGES } from './questions_en.js'

// ── CONSTANTS ───────────────────────────────────────────────
const P_HP   = 100   // player max HP
const M_HP   = 100   // monster max HP
const MISSES = 5     // misses before GAME OVER
const WINS   = 10    // correct answers to WIN
const M_DMG  = 10    // damage to monster per correct answer
const P_DMG  = 20    // damage to player per wrong answer

// ── MONSTER DATA ────────────────────────────────────────────
const MONSTERS = [
  { name:'KINSHI DAEMON',    emoji:'🚫', color:'#E85D04', flavor:'Blocks all without proper permits!' },
  { name:'GURAINDAA GOLEM',  emoji:'⚙️', color:'#1565C0', flavor:'Built from neglected equipment!' },
  { name:'GATAGATA GHOST',   emoji:'👻', color:'#D97706', flavor:'Speaks only in job site slang!' },
  { name:'KAISAKI KNIGHT',   emoji:'⚔️', color:'#059669', flavor:'Master of all welding positions!' },
  { name:'BUROOHORU BEAST',  emoji:'💀', color:'#7C3AED', flavor:'Breeds defects and cracks!' },
  { name:'SHIKAKU DRAGON',   emoji:'🐉', color:'#DC2626', flavor:'The final boss of certification!' },
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
    @keyframes wf-pulse-glow { 0%,100%{text-shadow:0 0 18px #FF660077,0 0 36px #FF660033} 50%{text-shadow:0 0 28px #FF6600CC,0 0 56px #FF660088,0 0 80px #FF660044} }
    @keyframes wf-bob        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes wf-mon-entry  { 0%{transform:translateY(-28px);opacity:0} 100%{transform:translateY(0);opacity:1} }
    @keyframes wf-stripe     { 0%{background-position:0 0} 100%{background-position:20px 0} }
    @keyframes wf-bounce-in  { 0%{transform:scale(1)} 40%{transform:scale(1.04)} 70%{transform:scale(0.98)} 100%{transform:scale(1)} }
    @keyframes wf-shine      { 0%{left:-100%} 100%{left:160%} }
    @keyframes wf-scanln     { 0%{background-position:0 0} 100%{background-position:0 40px} }
    @keyframes wf-star-a     { 0%{transform:translate(0,0)scale(1.2);opacity:1} 100%{transform:translate(-28px,-80px)scale(0);opacity:0} }
    @keyframes wf-star-b     { 0%{transform:translate(0,0)scale(1.2);opacity:1} 100%{transform:translate(22px,-90px)scale(0);opacity:0} }
    @keyframes wf-star-c     { 0%{transform:translate(0,0)scale(1.2);opacity:1} 100%{transform:translate(6px,-70px)scale(0);opacity:0} }
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
    .wf-locked-card { position:relative; overflow:hidden; }
    .wf-locked-card::after {
      content:''; position:absolute; inset:0; pointer-events:none;
      background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.025) 3px,rgba(255,255,255,0.025) 4px);
      background-size:100% 40px;
      animation:wf-scanln 3s linear infinite;
    }
    * { box-sizing:border-box; }
    body { background:#111; margin:0; }
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

// ── WELDON SVG CHARACTER ────────────────────────────────────
function WeldonSVG({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80"
      style={{ filter:'drop-shadow(0 0 8px #ff660088)' }}>
      <ellipse cx="40" cy="52" rx="13" ry="20" fill="#CC2200"/>
      <rect x="28" y="20" width="24" height="18" rx="4" fill="#AA1100"/>
      <rect x="33" y="12" width="14" height="10" rx="3" fill="#880000"/>
      <path d="M26 64 Q20 70 22 76" stroke="#777" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M54 64 Q60 70 58 76" stroke="#777" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="31" r="4" fill="#fff"/>
      <circle cx="45" cy="31" r="4" fill="#fff"/>
      <circle cx="36" cy="32" r="2.5" fill="#111"/>
      <circle cx="46" cy="32" r="2.5" fill="#111"/>
      <path d="M36 10 Q40 2 44 10" stroke="#FFB800" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M34 8 Q40 -2 46 8" stroke="#FF6600" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M34 40 Q40 46 46 40" stroke="#ff9966" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

// ── HP BAR ──────────────────────────────────────────────────
function HPBar({ cur, max, label }) {
  const pct  = Math.max(0, Math.min(100, (cur / max) * 100))
  const col  = pct > 60 ? '#22c55e' : pct > 30 ? '#f59e0b' : '#ef4444'
  const low  = pct <= 30
  const fill = low
    ? { background:`repeating-linear-gradient(45deg,${col},${col} 5px,${col}99 5px,${col}99 10px)`,
        animation:'wf-stripe 0.4s linear infinite' }
    : { background: col }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between',
        fontSize:'0.65rem', fontFamily:"'Share Tech Mono',monospace", color:'#888', marginBottom:3 }}>
        <span>{label}</span>
        <span style={{ color:col, fontFamily:"'Orbitron',monospace", fontSize:'0.6rem' }}>{cur}/{max} HP</span>
      </div>
      <div style={{ height:10, background:'#333', borderRadius:5, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, borderRadius:5,
          transition:'width 0.4s ease', boxShadow:`0 0 6px ${col}88`, ...fill }}/>
      </div>
    </div>
  )
}

// ── TITLE SCREEN ────────────────────────────────────────────
function TitleScreen({ onStart, totalXP }) {
  const S = styles
  return (
    <div style={{ ...S.page, justifyContent:'center', alignItems:'center', textAlign:'center' }}>
      <div style={{ animation:'wf-bob 2.2s ease-in-out infinite' }}>
        <WeldonSVG size={100}/>
      </div>
      <div style={{
        color:'#FF6600', fontSize:'1.9rem', fontWeight:'900',
        fontFamily:"'Orbitron',monospace",
        letterSpacing:'0.08em', marginTop:14,
        animation:'wf-pulse-glow 2s ease-in-out infinite',
      }}>
        WELDON'S FORGE
      </div>
      <div style={{ color:'#FFB800', fontSize:'0.72rem', fontFamily:"'Orbitron',monospace",
        letterSpacing:'0.18em', marginBottom:6, marginTop:4 }}>
        ⚡ ENGLISH EDITION ⚡
      </div>
      <div style={{ color:'#555', fontSize:'0.7rem', maxWidth:260, marginBottom:32,
        fontFamily:"'Share Tech Mono',monospace", lineHeight:1.6 }}>
        Japanese Welding RPG Quiz<br/>for Foreign Trainees in Japan
      </div>
      <button onClick={onStart} className="wf-shine-btn"
        style={{ ...S.btnPrimary, fontFamily:"'Orbitron',monospace",
          fontSize:'0.95rem', padding:'14px 40px', letterSpacing:'0.1em' }}>
        ⚡ START BATTLE
      </button>
      {totalXP > 0 && (
        <div style={{ color:'#555', fontSize:'0.68rem', marginTop:14,
          fontFamily:"'Share Tech Mono',monospace" }}>
          Total XP: <span style={{ color:'#FFB800', fontFamily:"'Orbitron',monospace" }}>{totalXP}</span>
        </div>
      )}
      <div style={{ color:'#2e2e2e', fontSize:'0.6rem', marginTop:20, maxWidth:260,
        lineHeight:1.6, fontFamily:"'Share Tech Mono',monospace" }}>
        Answer {WINS} correctly to win · {MISSES} misses = GAME OVER
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
          <div style={{ color:'#FF6600', fontWeight:'700',
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
                background: locked ? '#181818' : '#1e1e1e',
                border:`1px solid ${locked ? '#2a2a2a' : isHov ? st.color : st.color+'88'}`,
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
function MonsterKinshi() { // Stage 1 — bureaucratic demon, red/orange
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="60" cy="72" rx="22" ry="28" fill="#8B1A00"/>
      {/* Head */}
      <ellipse cx="60" cy="40" rx="20" ry="20" fill="#B22000"/>
      {/* Horns */}
      <polygon points="44,26 38,8 50,22" fill="#CC3300"/>
      <polygon points="76,26 82,8 70,22" fill="#CC3300"/>
      {/* Eyes — angry slants */}
      <ellipse cx="52" cy="37" rx="5" ry="4" fill="#FF0000"/>
      <ellipse cx="68" cy="37" rx="5" ry="4" fill="#FF0000"/>
      <ellipse cx="52" cy="38" rx="2.5" ry="2" fill="#111"/>
      <ellipse cx="68" cy="38" rx="2.5" ry="2" fill="#111"/>
      {/* Angry brow lines */}
      <line x1="47" y1="32" x2="57" y2="35" stroke="#FF4400" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="73" y1="32" x2="63" y2="35" stroke="#FF4400" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Mouth */}
      <path d="M52 48 Q60 44 68 48" stroke="#FF4400" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Arms */}
      <path d="M38 65 Q22 58 18 70" stroke="#8B1A00" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M82 65 Q98 58 102 70" stroke="#8B1A00" strokeWidth="7" fill="none" strokeLinecap="round"/>
      {/* Stamp in right hand */}
      <rect x="96" y="62" width="18" height="12" rx="2" fill="#CC0000"/>
      <rect x="98" y="74" width="14" height="5" rx="1" fill="#AA0000"/>
      {/* 禁止 circle on stamp */}
      <circle cx="105" cy="68" r="4" fill="none" stroke="#FF6600" strokeWidth="1.5"/>
      <line x1="102" y1="65" x2="108" y2="71" stroke="#FF6600" strokeWidth="1.5"/>
      {/* Legs */}
      <rect x="50" y="96" width="9" height="16" rx="3" fill="#701500"/>
      <rect x="61" y="96" width="9" height="16" rx="3" fill="#701500"/>
      {/* Glow */}
      <ellipse cx="60" cy="115" rx="20" ry="4" fill="#FF330033"/>
    </svg>
  )
}

function MonsterGuraindaa() { // Stage 2 — grinder golem, blue/steel
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* Body — steel box */}
      <rect x="34" y="54" width="52" height="44" rx="4" fill="#1A3A5C"/>
      <rect x="38" y="58" width="44" height="36" rx="3" fill="#1E4C7A"/>
      {/* Rivet details */}
      <circle cx="42" cy="62" r="2" fill="#4A8CC4"/>
      <circle cx="78" cy="62" r="2" fill="#4A8CC4"/>
      <circle cx="42" cy="88" r="2" fill="#4A8CC4"/>
      <circle cx="78" cy="88" r="2" fill="#4A8CC4"/>
      {/* Head — hexagonal */}
      <polygon points="60,10 78,20 78,40 60,50 42,40 42,20" fill="#1A3A5C"/>
      <polygon points="60,14 75,22 75,38 60,46 45,38 45,22" fill="#1E4C7A"/>
      {/* Eye — single cyclops grinder wheel */}
      <circle cx="60" cy="30" r="11" fill="#0A1E35"/>
      <circle cx="60" cy="30" r="9" fill="none" stroke="#4A8CC4" strokeWidth="2"/>
      <circle cx="60" cy="30" r="5" fill="#2A6BAA"/>
      <circle cx="60" cy="30" r="2" fill="#88CCFF"/>
      {/* Grinder teeth on eye */}
      {[0,45,90,135,180,225,270,315].map(a=>{
        const r=10, x=60+r*Math.cos(a*Math.PI/180), y=30+r*Math.sin(a*Math.PI/180)
        return <rect key={a} x={x-1.5} y={y-1.5} width="3" height="3" rx="0.5" fill="#4A8CC4"
          transform={`rotate(${a},${x},${y})`}/>
      })}
      {/* Arms — angle grinder arms */}
      <rect x="6" y="58" width="28" height="8" rx="3" fill="#1A3A5C"/>
      <rect x="4" y="60" width="10" height="4" rx="2" fill="#4A8CC4"/>
      <circle cx="34" cy="62" r="7" fill="#1A3A5C"/>
      <circle cx="34" cy="62" r="5" fill="none" stroke="#4A8CC4" strokeWidth="2"/>
      <rect x="86" y="58" width="28" height="8" rx="3" fill="#1A3A5C"/>
      <rect x="106" y="60" width="10" height="4" rx="2" fill="#4A8CC4"/>
      <circle cx="86" cy="62" r="7" fill="#1A3A5C"/>
      <circle cx="86" cy="62" r="5" fill="none" stroke="#4A8CC4" strokeWidth="2"/>
      {/* Legs */}
      <rect x="40" y="98" width="14" height="16" rx="3" fill="#1A3A5C"/>
      <rect x="66" y="98" width="14" height="16" rx="3" fill="#1A3A5C"/>
      {/* Sparks */}
      <line x1="30" y1="62" x2="22" y2="55" stroke="#88CCFF" strokeWidth="1.5" opacity="0.8"/>
      <line x1="30" y1="64" x2="20" y2="66" stroke="#88CCFF" strokeWidth="1" opacity="0.6"/>
      <ellipse cx="60" cy="116" rx="20" ry="4" fill="#1E4C7A44"/>
    </svg>
  )
}

function MonsterGatagata() { // Stage 3 — wobbly ghost, amber/yellow
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* Ghost body — wobbly bead shape */}
      <path d="M30 110 Q25 90 28 70 Q20 50 30 35 Q40 15 60 12 Q80 15 90 35 Q100 50 92 70 Q95 90 90 110 Q82 102 75 108 Q68 102 60 108 Q52 102 45 108 Q38 102 30 110Z"
        fill="#D97706" opacity="0.72"/>
      {/* Bead ripple lines across body */}
      <path d="M32 60 Q60 54 88 60" stroke="#FCD34D" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M30 73 Q60 67 90 73" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M31 86 Q60 80 89 86" stroke="#FCD34D" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round"/>
      {/* Hollow eyes */}
      <ellipse cx="46" cy="40" rx="7" ry="9" fill="#1a0a00" opacity="0.9"/>
      <ellipse cx="74" cy="40" rx="7" ry="9" fill="#1a0a00" opacity="0.9"/>
      <ellipse cx="46" cy="41" rx="3.5" ry="5" fill="#FF9500" opacity="0.7"/>
      <ellipse cx="74" cy="41" rx="3.5" ry="5" fill="#FF9500" opacity="0.7"/>
      {/* Jagged mouth */}
      <path d="M46 56 L50 52 L54 56 L58 52 L62 56 L66 52 L70 56 L74 52 L74 58 L46 58Z"
        fill="#1a0a00" opacity="0.8"/>
      {/* Sparks around ghost */}
      <line x1="18" y1="35" x2="24" y2="28" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="42" x2="22" y2="40" stroke="#FF9500" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="102" y1="35" x2="96" y2="28" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="106" y1="42" x2="98" y2="40" stroke="#FF9500" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="55" x2="26" y2="50" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="100" y1="55" x2="94" y2="50" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Top wisp */}
      <path d="M60 12 Q56 2 60 0 Q64 2 60 12" fill="#FCD34D" opacity="0.6"/>
      <ellipse cx="60" cy="116" rx="20" ry="4" fill="#D9770633"/>
    </svg>
  )
}

function MonsterKaisaki() { // Stage 4 — armored knight, green/silver
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* Legs */}
      <rect x="42" y="90" width="14" height="22" rx="3" fill="#2D4A2D"/>
      <rect x="64" y="90" width="14" height="22" rx="3" fill="#2D4A2D"/>
      <rect x="40" y="102" width="18" height="6" rx="2" fill="#3D6B3D"/>
      <rect x="62" y="102" width="18" height="6" rx="2" fill="#3D6B3D"/>
      {/* Body armor */}
      <rect x="30" y="50" width="60" height="44" rx="5" fill="#2D4A2D"/>
      <rect x="34" y="54" width="52" height="36" rx="4" fill="#3D6B3D"/>
      {/* Chest plate — V-groove symbol */}
      <polygon points="60,58 72,68 60,78 48,68" fill="#2D4A2D" stroke="#86efac" strokeWidth="1.5"/>
      <line x1="60" y1="58" x2="60" y2="78" stroke="#86efac" strokeWidth="1" opacity="0.6"/>
      {/* Shoulder pauldrons */}
      <ellipse cx="30" cy="58" rx="12" ry="8" fill="#3D6B3D"/>
      <ellipse cx="90" cy="58" rx="12" ry="8" fill="#3D6B3D"/>
      {/* Helmet */}
      <rect x="36" y="16" width="48" height="38" rx="8" fill="#2D4A2D"/>
      <rect x="40" y="20" width="40" height="30" rx="6" fill="#3D6B3D"/>
      {/* Visor slit */}
      <rect x="40" y="34" width="40" height="7" rx="2" fill="#0D1F0D"/>
      <line x1="42" y1="37" x2="78" y2="37" stroke="#86efac" strokeWidth="1.5" opacity="0.8"/>
      {/* Eyes behind visor */}
      <ellipse cx="51" cy="37" rx="4" ry="2.5" fill="#22c55e" opacity="0.9"/>
      <ellipse cx="69" cy="37" rx="4" ry="2.5" fill="#22c55e" opacity="0.9"/>
      {/* Groove sword (right arm) */}
      <rect x="92" y="30" width="7" height="58" rx="2" fill="#888"/>
      <polygon points="95.5,18 88,30 103,30" fill="#AAA"/>
      {/* V-groove bevel on sword */}
      <path d="M92 40 L99 52 L92 64 L99 76" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.8"/>
      {/* Welding shield (left arm) */}
      <rect x="4" y="52" width="22" height="30" rx="4" fill="#1A3A1A"/>
      <rect x="6" y="54" width="18" height="26" rx="3" fill="#2D4A2D"/>
      <ellipse cx="15" cy="67" rx="6" ry="8" fill="#0a1f0a" stroke="#22c55e" strokeWidth="1.5"/>
      <ellipse cx="15" cy="67" rx="3" ry="4" fill="#22c55e" opacity="0.4"/>
      <ellipse cx="60" cy="116" rx="22" ry="4" fill="#3D6B3D44"/>
    </svg>
  )
}

function MonsterBuroohoru() { // Stage 5 — porous void beast, purple/dark
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* Main body — dark amorphous */}
      <ellipse cx="60" cy="68" rx="34" ry="38" fill="#2D1A4A"/>
      <ellipse cx="60" cy="35" rx="24" ry="22" fill="#3B2260"/>
      {/* Porosity holes scattered across body */}
      <circle cx="46" cy="60" r="7" fill="#0D0D1A"/>
      <circle cx="74" cy="55" r="9" fill="#0D0D1A"/>
      <circle cx="52" cy="82" r="6" fill="#0D0D1A"/>
      <circle cx="72" cy="78" r="5" fill="#0D0D1A"/>
      <circle cx="60" cy="68" r="4" fill="#0D0D1A"/>
      <circle cx="40" cy="75" r="4" fill="#0D0D1A"/>
      <circle cx="80" cy="90" r="3.5" fill="#0D0D1A"/>
      {/* Void glow inside holes */}
      <circle cx="46" cy="60" r="4" fill="#7C3AED" opacity="0.4"/>
      <circle cx="74" cy="55" r="5" fill="#7C3AED" opacity="0.4"/>
      <circle cx="52" cy="82" r="3" fill="#9333EA" opacity="0.35"/>
      <circle cx="72" cy="78" r="2.5" fill="#7C3AED" opacity="0.35"/>
      {/* Eyes — glowing purple voids */}
      <circle cx="50" cy="30" r="8" fill="#0D0D1A"/>
      <circle cx="70" cy="30" r="8" fill="#0D0D1A"/>
      <circle cx="50" cy="30" r="5" fill="#7C3AED" opacity="0.8"/>
      <circle cx="70" cy="30" r="5" fill="#7C3AED" opacity="0.8"/>
      <circle cx="50" cy="30" r="2" fill="#D8B4FE"/>
      <circle cx="70" cy="30" r="2" fill="#D8B4FE"/>
      {/* Ragged maw */}
      <path d="M44 46 Q60 38 76 46" stroke="#D8B4FE" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M44 46 L48 52 L52 46 L56 52 L60 46 L64 52 L68 46 L72 52 L76 46"
        stroke="#9333EA" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      {/* Void tendrils */}
      <path d="M30 70 Q18 60 14 72" stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M90 70 Q102 60 106 72" stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M38 94 Q28 102 26 110" stroke="#7C3AED" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M82 94 Q92 102 94 110" stroke="#7C3AED" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      {/* Aura */}
      <ellipse cx="60" cy="116" rx="22" ry="4" fill="#7C3AED33"/>
    </svg>
  )
}

function MonsterShikaku() { // Stage 6 — certification dragon, red/gold
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* Tail */}
      <path d="M80 95 Q100 100 112 90 Q118 82 108 78" stroke="#8B0000" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <path d="M108 78 Q114 72 110 68" stroke="#8B0000" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Body */}
      <ellipse cx="58" cy="72" rx="28" ry="32" fill="#8B0000"/>
      <ellipse cx="58" cy="72" rx="22" ry="26" fill="#A31515"/>
      {/* Scroll-scale texture on body */}
      <path d="M38 62 Q58 56 78 62" stroke="#CC2200" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M36 72 Q58 66 80 72" stroke="#CC2200" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M38 82 Q58 76 78 82" stroke="#CC2200" strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Wings — scroll-shaped */}
      <path d="M30 55 Q10 38 6 20 Q12 16 18 22 Q14 36 30 48" fill="#6B0000" opacity="0.9"/>
      <path d="M30 55 Q16 42 14 26 Q18 22 22 26 Q20 38 30 48" fill="#8B0000"/>
      <path d="M86 55 Q106 38 114 20 Q108 16 102 22 Q106 36 90 48" fill="#6B0000" opacity="0.9"/>
      <path d="M86 55 Q100 42 102 26 Q98 22 94 26 Q96 38 86 48" fill="#8B0000"/>
      {/* Neck */}
      <rect x="46" y="28" width="24" height="24" rx="6" fill="#8B0000"/>
      {/* Head */}
      <ellipse cx="58" cy="22" rx="22" ry="18" fill="#A31515"/>
      {/* Horns — scroll rolls */}
      <path d="M42 10 Q36 2 42 0 Q48 2 44 10" fill="#FFB800"/>
      <path d="M74 10 Q80 2 74 0 Q68 2 76 10" fill="#FFB800"/>
      {/* Eyes — stamp red */}
      <ellipse cx="50" cy="20" rx="6" ry="5" fill="#0D0000"/>
      <ellipse cx="66" cy="20" rx="6" ry="5" fill="#0D0000"/>
      <ellipse cx="50" cy="20" rx="3.5" ry="3" fill="#FF0000"/>
      <ellipse cx="66" cy="20" rx="3.5" ry="3" fill="#FF0000"/>
      <circle cx="50" cy="20" r="1.5" fill="#FFB800"/>
      <circle cx="66" cy="20" r="1.5" fill="#FFB800"/>
      {/* Snout */}
      <ellipse cx="58" cy="30" rx="10" ry="6" fill="#8B0000"/>
      {/* Nostrils */}
      <circle cx="54" cy="30" r="2" fill="#600000"/>
      <circle cx="62" cy="30" r="2" fill="#600000"/>
      {/* Certification stamp in claw */}
      <path d="M28 75 Q14 68 10 80" stroke="#8B0000" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <circle cx="10" cy="80" r="8" fill="#FFB800"/>
      <text x="6" y="84" fontSize="8" fontWeight="bold" fill="#8B0000" fontFamily="monospace">認</text>
      {/* Fire breath */}
      <path d="M58 34 Q50 44 44 50" stroke="#FF6600" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M58 34 Q66 44 72 52" stroke="#FFB800" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <ellipse cx="58" cy="116" rx="22" ry="4" fill="#8B000033"/>
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

  function optStyle(i) {
    const base = {
      width:'100%', padding:'10px 14px', marginBottom:8,
      background:'#1e1e1e', border:'1px solid #333',
      borderRadius:8, color:'#ddd', textAlign:'left',
      cursor: done ? 'default' : 'pointer',
      fontSize:'0.76rem', fontFamily:'monospace', lineHeight:1.4,
      transition:'all 0.15s',
    }
    if (!done) return base
    if (i === q.a)              return { ...base, background:'#0f2a0f', border:'1px solid #22c55e', color:'#86efac' }
    if (i === sel && sel!==q.a) return { ...base, background:'#2a0f0f', border:'1px solid #ef4444', color:'#fca5a5' }
    return { ...base, opacity:0.35 }
  }

  const bg = bgFlash === 'correct' ? '#0a200a' : bgFlash === 'wrong' ? '#200a0a' : '#111'

  const monAnimStyle = monsterAnim === 'shake' ? 'wf-mshake 0.38s ease'
                     : monsterAnim === 'death' ? 'wf-mdeath 0.65s ease forwards'
                     : 'none'

  const turnNum = correct + miss + (done ? 1 : 0)

  return (
    <div style={{ background:bg, minHeight:'100vh', fontFamily:'monospace',
      transition:'background 0.3s', paddingBottom:70 }}>

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
        background: bg === '#111' ? '#111' : bg,
        borderBottom:'1px solid #222', padding:'8px 12px 8px',
        transition:'background 0.3s' }}>
        {/* Player HP */}
        <div style={{
          position:'relative', overflow:'hidden',
          animation: pending === 'defeat' ? 'wf-pcollapse 0.5s 0.3s ease forwards'
                   : playerShake           ? 'wf-pshake 0.32s ease'
                   : 'none',
        }}>
          <HPBar cur={pHP} max={P_HP} label="⚡ WELDON (YOU)"/>
          {floatPlayer && (
            <div key={floatPlayer.k} style={{
              position:'absolute', top:'0%', right:'8px',
              color:'#fca5a5', fontWeight:'bold', fontSize:'0.9rem',
              fontFamily:'monospace', pointerEvents:'none',
              animation:'wf-float 0.75s ease forwards',
              textShadow:'0 0 10px #ef4444', whiteSpace:'nowrap',
            }}>{floatPlayer.text}</div>
          )}
        </div>
        {/* Monster HP */}
        <div style={{ marginTop:5, position:'relative', overflow:'hidden' }}>
          <HPBar cur={mHP} max={M_HP} label={mon.name}/>
          {floatMonster && (
            <div key={floatMonster.k} style={{
              position:'absolute', top:'0%', right:'8px',
              color:'#86efac', fontWeight:'bold', fontSize:'0.9rem',
              fontFamily:'monospace', pointerEvents:'none',
              animation:'wf-float 0.75s ease forwards',
              textShadow:'0 0 10px #22c55e', whiteSpace:'nowrap',
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
        <div style={{ background:'#1a1a1a', borderRadius:10, padding:'8px 14px',
          marginBottom:10, position:'relative', overflow:'hidden' }}>
          <div key={qi} style={{
            textAlign:'center', margin:'6px 0 2px',
            animation: monAnimStyle !== 'none' ? monAnimStyle : 'wf-mon-entry 0.4s ease',
            opacity: 0.4 + (mHP/M_HP)*0.6,
            filter: `brightness(${0.5 + (mHP/M_HP)*0.6}) saturate(${0.6 + (mHP/M_HP)*0.5})`,
          }}>
            {(() => { const SVG = MONSTER_SVGS[si] || MONSTER_SVGS[0]; return <SVG/> })()}
            <div style={{ color:mon.color, fontSize:'0.68rem', fontWeight:'700',
              fontFamily:"'Orbitron',monospace",
              letterSpacing:'0.06em', textShadow:`0 0 8px ${mon.color}88`, marginTop:2 }}>
              {mon.name}
            </div>
          </div>
        </div>

        {/* Question */}
        <div style={{ background:'#1a1a1a', borderRadius:10, padding:'12px 14px', marginBottom:10 }}>
          <div style={{ fontSize:'0.58rem', color:'#555', marginBottom:6,
            fontFamily:"'Share Tech Mono',monospace" }}>
            [{q.cat}]&nbsp;&nbsp;+{q.xp} XP if correct
          </div>
          <div style={{ color:'#efefef', fontSize:'0.82rem', lineHeight:1.55, marginBottom:12,
            fontFamily:"'Share Tech Mono',monospace" }}>
            {q.q}
          </div>
          {q.opts.map((opt, i) => (
            <button key={i}
              className={done && i === q.a ? 'wf-correct-btn' : ''}
              onClick={() => !done && onAnswer(i)} style={optStyle(i)}>
              <span style={{ color:'#FF6600', fontWeight:'bold', marginRight:8 }}>{OPTS[i]}.</span>
              {opt}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {done && (
          <div style={{
            background: sel===q.a ? '#0a1f0a' : '#1f0a0a',
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
    <div style={{ ...styles.page, background:'#0a180a', justifyContent:'center',
      alignItems:'center', textAlign:'center', position:'relative', overflow:'hidden' }}>
      {flash && (
        <div style={{ position:'fixed', inset:0, background:'#00ff0066',
          animation:'wf-vflash 0.95s ease forwards', pointerEvents:'none', zIndex:100 }}/>
      )}
      {/* Star particles */}
      {[
        { top:'18%', left:'18%', anim:'wf-star-a 1.1s 0.1s ease forwards' },
        { top:'12%', left:'72%', anim:'wf-star-b 1.0s 0.2s ease forwards' },
        { top:'30%', left:'88%', anim:'wf-star-c 0.9s 0.05s ease forwards' },
        { top:'22%', left:'44%', anim:'wf-star-a 1.2s 0.3s ease forwards' },
        { top:'15%', left:'58%', anim:'wf-star-b 0.95s 0.15s ease forwards' },
        { top:'35%', left:'28%', anim:'wf-star-c 1.0s 0.25s ease forwards' },
      ].map((s, idx) => (
        <div key={idx} style={{ position:'fixed', top:s.top, left:s.left,
          fontSize:'1.4rem', animation:s.anim, pointerEvents:'none', zIndex:50 }}>⭐</div>
      ))}
      <div style={{ fontSize:72, marginBottom:8 }}>💥</div>
      <div style={{ color:'#22c55e', fontSize:'1.9rem', fontWeight:'900',
        fontFamily:"'Orbitron',monospace", letterSpacing:'0.08em',
        textShadow:'0 0 20px #22c55e88,0 0 40px #22c55e44', marginBottom:4 }}>VICTORY!</div>
      {perfect && (
        <div style={{
          background:'linear-gradient(135deg,#FFB800,#FF6600)', color:'#111',
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
      <div style={{ background:'#0f1f0f', border:'1px solid #22c55e33',
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

      <WeldonSVG size={60}/>
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
    <div style={{ ...styles.page, background:'#180a0a', justifyContent:'center',
      alignItems:'center', textAlign:'center', position:'relative', overflow:'hidden' }}>
      {overlay && (
        <div style={{ position:'fixed', inset:0, background:'#330000',
          animation:'wf-doverlay 0.6s ease forwards', pointerEvents:'none', zIndex:100 }}/>
      )}
      <div style={{ position:'relative', zIndex:1, display:'contents' }}>
        <div style={{ fontSize:64, marginBottom:8 }}>💀</div>
        <div style={{ color:'#ef4444', fontSize:'1.9rem', fontWeight:'900',
          fontFamily:"'Orbitron',monospace", letterSpacing:'0.08em',
          textShadow:'0 0 20px #ef444488,0 0 40px #ef444433', marginBottom:4 }}>GAME OVER</div>
        <div style={{ color:'#fca5a5', fontSize:'0.82rem', fontFamily:"'Share Tech Mono',monospace",
          marginBottom:10 }}>
          {mon.name} was too strong...
        </div>

        {/* Survival stats */}
        <div style={{ background:'#2a0808', border:'1px solid #ef444433',
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
    <div style={{ padding:16, fontFamily:'monospace', background:'#111', minHeight:'100vh', paddingBottom:70 }}>
      <div style={{ color:'#FF6600', fontWeight:'bold', marginBottom:12 }}>📐 JIS WELDING SYMBOLS</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
        {syms.map(s => (
          <div key={s.sym} style={{ background:'#1a1a1a', border:'1px solid #2a2a2a',
            borderRadius:8, padding:'10px', textAlign:'center' }}>
            <div style={{ fontSize:'1.6rem', marginBottom:4 }}>{s.sym}</div>
            <div style={{ color:'#FF6600', fontSize:'0.68rem', fontWeight:'bold' }}>{s.name}</div>
            <div style={{ color:'#777', fontSize:'0.6rem' }}>{s.jp}</div>
            <div style={{ color:'#555', fontSize:'0.58rem', fontStyle:'italic' }}>{s.rom}</div>
            <div style={{ color:'#999', fontSize:'0.6rem', marginTop:4, lineHeight:1.3 }}>{s.note}</div>
          </div>
        ))}
      </div>
      {rules.map(r => (
        <div key={r.title} style={{ background:'#1a1a1a', border:'1px solid #FF660033',
          borderRadius:8, padding:'12px 14px', marginBottom:8 }}>
          <div style={{ color:'#FF6600', fontSize:'0.7rem', fontWeight:'bold', marginBottom:6 }}>{r.title}</div>
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
    <div style={{ padding:16, fontFamily:'monospace', background:'#111', minHeight:'100vh', paddingBottom:70 }}>
      <div style={{ color:'#FF6600', fontWeight:'bold', marginBottom:16 }}>🔢 WELDING CALCULATORS</div>

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
    { level:'SKILLED', icon:'🔥', color:'#FF6600', title:'JIS Specialist Grade',
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
    <div style={{ padding:16, fontFamily:'monospace', background:'#111', minHeight:'100vh', paddingBottom:70 }}>
      <div style={{ color:'#FF6600', fontWeight:'bold', marginBottom:4 }}>🗺️ CAREER ROADMAP</div>
      <div style={{ color:'#444', fontSize:'0.65rem', marginBottom:16 }}>
        Japanese Welding Career Path — Entry to Legend
      </div>
      {path.map((s, i) => (
        <div key={i}>
          {i > 0 && <div style={{ width:2, height:12, background:'#2a2a2a', marginLeft:20, marginBottom:0 }}/>}
          <div style={{ background:'#1a1a1a', border:`1px solid ${s.color}33`,
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
    <div style={{ minHeight:'100vh', background:'#111', fontFamily:'monospace',
      padding:'14px 12px', paddingBottom:70 }}>

      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
        <div style={{ color:'#FF6600', fontWeight:'bold', fontSize:'0.95rem' }}>
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
            background:'#1a1a1a',
            border:`1px solid ${wasCorrect ? '#22c55e33' : '#ef444433'}`,
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
              background:'#141414', borderRadius:6,
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
        background:'linear-gradient(135deg,#FF6600,#CC2200)',
        color:'#fff', border:'none', borderRadius:8,
        fontWeight:'bold', cursor:'pointer', fontFamily:'monospace',
        fontSize:'0.9rem', letterSpacing:'0.05em',
        boxShadow:'0 4px 16px #FF660044',
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
  const [log, setLog] = useState(() => loadBattleLog())

  function clearHistory() {
    localStorage.removeItem(LS_KEY)
    setLog([])
  }

  const total   = log.length
  const wins    = log.filter(r => r.result === 'victory').length
  const winRate = total ? Math.round((wins / total) * 100) : 0

  function fmtDate(iso) {
    try {
      const d = new Date(iso)
      return d.toLocaleDateString(undefined, { month:'short', day:'numeric' }) +
             ' ' + d.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' })
    } catch { return '—' }
  }

  return (
    <div style={{ padding:16, fontFamily:'monospace', background:'#111',
      minHeight:'100vh', paddingBottom:70 }}>

      {/* Header */}
      <div style={{ color:'#FF6600', fontWeight:'bold', marginBottom:4 }}>📜 BATTLE HISTORY</div>
      <div style={{ color:'#444', fontSize:'0.65rem', marginBottom:14 }}>
        Your record fighting through the Forge
      </div>

      {/* Stats bar */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:16 }}>
        {[
          { label:'BATTLES', value: total, color:'#FF6600' },
          { label:'WINS',    value: wins,  color:'#22c55e' },
          { label:'WIN RATE',value: `${winRate}%`,
            color: winRate >= 70 ? '#22c55e' : winRate >= 40 ? '#f59e0b' : '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ background:'#1a1a1a', border:'1px solid #2a2a2a',
            borderRadius:8, padding:'10px 8px', textAlign:'center' }}>
            <div style={{ color:s.color, fontSize:'1.3rem', fontWeight:'bold' }}>{s.value}</div>
            <div style={{ color:'#444', fontSize:'0.56rem', letterSpacing:'0.04em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Record list */}
      {log.length === 0 ? (
        <div style={{ color:'#333', fontSize:'0.75rem', textAlign:'center',
          padding:'48px 0', lineHeight:2 }}>
          No battles yet.<br/>
          <span style={{ color:'#444' }}>Start a stage to build your record.</span>
        </div>
      ) : (
        log.map((r, i) => {
          const won     = r.result === 'victory'
          const stage   = QUIZ_STAGES.find(s => s.stageId === r.stageId)
          const icon    = stage ? stage.icon : '⚔️'
          return (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:10,
              background:'#1a1a1a',
              border:`1px solid ${won ? '#22c55e22' : '#ef444422'}`,
              borderRadius:8, padding:'10px 12px', marginBottom:7,
            }}>
              <span style={{ fontSize:'1.4rem', flexShrink:0 }}>{icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                  <span style={{ color: won ? '#22c55e' : '#ef4444',
                    fontWeight:'bold', fontSize:'0.78rem' }}>
                    {won ? '✓ VICTORY' : '✗ DEFEAT'}
                  </span>
                  <span style={{ color:'#333', fontSize:'0.62rem' }}>
                    STAGE {r.stageId}
                  </span>
                </div>
                <div style={{ color:'#666', fontSize:'0.62rem', whiteSpace:'nowrap',
                  overflow:'hidden', textOverflow:'ellipsis' }}>
                  {r.stageName}
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:'0.68rem', marginBottom:2 }}>
                  <span style={{ color:'#22c55e' }}>✓{r.correct}</span>
                  <span style={{ color:'#444' }}> / </span>
                  <span style={{ color:'#ef4444' }}>✗{r.miss}</span>
                </div>
                {r.xpEarned > 0 && (
                  <div style={{ color:'#FFB800', fontSize:'0.6rem' }}>+{r.xpEarned} XP</div>
                )}
                <div style={{ color:'#333', fontSize:'0.56rem', marginTop:2 }}>
                  {fmtDate(r.date)}
                </div>
              </div>
            </div>
          )
        })
      )}

      {/* Clear button */}
      {log.length > 0 && (
        <button onClick={clearHistory}
          style={{ width:'100%', marginTop:8, padding:'11px',
            background:'none', border:'1px solid #2a2a2a', borderRadius:8,
            color:'#444', cursor:'pointer', fontFamily:'monospace', fontSize:'0.72rem',
            transition:'all 0.15s',
          }}
          onMouseEnter={e => { e.target.style.borderColor='#ef4444'; e.target.style.color='#ef4444' }}
          onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#444' }}>
          🗑 Clear History
        </button>
      )}
    </div>
  )
}

// ── SHARED STYLES ────────────────────────────────────────────
const F_BODY    = "'Share Tech Mono', monospace"
const F_TITLE   = "'Orbitron', 'Share Tech Mono', monospace"

const styles = {
  page: {
    minHeight:'100vh',
    background:"#111 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cpath d='M0 0h28v28H0z' fill='none'/%3E%3Cpath d='M0 0h1v28H0zM27 0h1v28h-1zM0 0h28v1H0zM0 27h28v1H0z' fill='rgba(255,102,0,0.04)'/%3E%3C/svg%3E\")",
    backgroundSize:'28px 28px',
    display:'flex', flexDirection:'column',
    padding:'20px 16px', fontFamily:F_BODY,
  },
  btnPrimary: {
    background:'linear-gradient(135deg,#FF6600,#CC2200)',
    color:'#fff', border:'none', borderRadius:8,
    padding:'12px 28px', fontWeight:'bold',
    cursor:'pointer', fontFamily:F_BODY,
    letterSpacing:'0.05em', fontSize:'0.9rem',
    boxShadow:'0 4px 16px #FF660044',
  },
  btnGhost: {
    background:'none', border:'1px solid #333', color:'#666',
    borderRadius:6, padding:'6px 12px', cursor:'pointer',
    fontFamily:F_BODY, fontSize:'0.7rem',
  },
  card: {
    background:'#1a1a1a', border:'1px solid #2a2a2a',
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
          result:    'victory',
          correct:   nc,
          miss,
          xpEarned:  sessionXP + q.xp,
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
          result:    'defeat',
          correct,
          miss:      ns,
          xpEarned:  sessionXP,
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
    <div style={{ maxWidth:480, margin:'0 auto', background:'#111', minHeight:'100vh' }}>
      {/* Content */}
      <div style={{ paddingBottom:58 }}>
        {tab==='battle'  && battleContent()}
        {tab==='symbol'  && <SymbolTab/>}
        {tab==='calc'    && <CalcTab/>}
        {tab==='career'  && <CareerTab/>}
        {tab==='history' && <HistoryTab/>}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:480, background:'#141414',
        borderTop:'1px solid #282828', display:'flex', zIndex:200,
      }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1, padding:'9px 0 7px', border:'none',
            background: tab===t.id ? '#1e1e1e' : 'transparent',
            borderTop: `2px solid ${tab===t.id ? '#FF6600' : 'transparent'}`,
            color: tab===t.id ? '#FF6600' : '#444',
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
