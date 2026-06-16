// ============================================================
// WELDON'S FORGE — ENGLISH EDITION
// App.jsx — Complete game for foreign welding trainees in Japan
// ============================================================

import { useState } from 'react'
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
  const pct = Math.max(0, Math.min(100, (cur / max) * 100))
  const col  = pct > 60 ? '#22c55e' : pct > 30 ? '#f59e0b' : '#ef4444'
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between',
        fontSize:'0.68rem', color:'#888', marginBottom:3 }}>
        <span>{label}</span>
        <span style={{ color:col }}>{cur}/{max} HP</span>
      </div>
      <div style={{ height:10, background:'#333', borderRadius:5, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:col, borderRadius:5,
          transition:'width 0.4s ease', boxShadow:`0 0 6px ${col}88` }}/>
      </div>
    </div>
  )
}

// ── TITLE SCREEN ────────────────────────────────────────────
function TitleScreen({ onStart, totalXP }) {
  const S = styles
  return (
    <div style={{ ...S.page, justifyContent:'center', alignItems:'center', textAlign:'center' }}>
      <WeldonSVG size={100}/>
      <div style={{ color:'#FF6600', fontSize:'2rem', fontWeight:'bold',
        letterSpacing:'0.1em', marginTop:12, textShadow:'0 0 20px #FF660088' }}>
        WELDON'S FORGE
      </div>
      <div style={{ color:'#FFB800', fontSize:'0.9rem', letterSpacing:'0.1em', marginBottom:4 }}>
        ⚡ ENGLISH EDITION ⚡
      </div>
      <div style={{ color:'#666', fontSize:'0.72rem', maxWidth:260, marginBottom:32 }}>
        Japanese Welding RPG Quiz<br/>for Foreign Trainees in Japan
      </div>
      <button onClick={onStart} style={{ ...S.btnPrimary, fontSize:'1.1rem', padding:'14px 40px' }}>
        ⚡ START BATTLE
      </button>
      {totalXP > 0 && (
        <div style={{ color:'#555', fontSize:'0.75rem', marginTop:14 }}>
          Total XP: <span style={{ color:'#FFB800' }}>{totalXP}</span>
        </div>
      )}
      <div style={{ color:'#333', fontSize:'0.62rem', marginTop:20, maxWidth:260, lineHeight:1.5 }}>
        Answer {WINS} questions correctly to defeat the monster.{'\n'}
        {MISSES} mistakes = GAME OVER.
      </div>
    </div>
  )
}

// ── STAGE SELECT ────────────────────────────────────────────
function StageSelect({ stages, totalXP, onSelect, onBack }) {
  const S = styles
  return (
    <div style={{ ...S.page, paddingBottom:16 }}>
      <div style={{ display:'flex', alignItems:'center', marginBottom:14 }}>
        <button onClick={onBack} style={S.btnGhost}>←</button>
        <div style={{ marginLeft:12 }}>
          <div style={{ color:'#FF6600', fontWeight:'bold' }}>SELECT STAGE</div>
          <div style={{ color:'#555', fontSize:'0.68rem' }}>
            XP: <span style={{ color:'#FFB800' }}>{totalXP}</span>
          </div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {stages.map((st, i) => {
          const locked = totalXP < st.unlockXP
          const mon    = MONSTERS[i] || MONSTERS[0]
          return (
            <button key={st.stageId}
              onClick={() => !locked && onSelect(i)}
              disabled={locked}
              style={{
                background: locked ? '#181818' : '#1e1e1e',
                border:`1px solid ${locked ? '#2a2a2a' : st.color}`,
                borderRadius:10, padding:'14px 10px', textAlign:'center',
                cursor: locked ? 'not-allowed' : 'pointer',
                opacity: locked ? 0.45 : 1,
                fontFamily:'monospace', transition:'all 0.2s',
              }}>
              <div style={{ fontSize:'1.8rem', marginBottom:4 }}>{st.icon}</div>
              <div style={{ fontSize:'0.62rem', color: locked ? '#3a3a3a' : st.color,
                fontWeight:'bold', letterSpacing:'0.04em', marginBottom:2 }}>
                STAGE {st.stageId}
              </div>
              <div style={{ fontSize:'0.58rem', color: locked ? '#333' : '#aaa',
                lineHeight:1.3, marginBottom:4 }}>
                {st.label.replace(/^STAGE \d+ — /,'')}
              </div>
              {locked
                ? <div style={{ fontSize:'0.58rem', color:'#444' }}>🔒 {st.unlockXP} XP</div>
                : <div style={{ fontSize:'0.58rem', color:mon.color }}>vs {mon.name}</div>
              }
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── BATTLE SCREEN ────────────────────────────────────────────
function Battle({
  stage, si, qs, qi,
  pHP, mHP, correct, miss,
  sel, done, bgFlash, shaking,
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
    if (i === q.a)            return { ...base, background:'#0f2a0f', border:'1px solid #22c55e', color:'#86efac' }
    if (i === sel && sel!==q.a) return { ...base, background:'#2a0f0f', border:'1px solid #ef4444', color:'#fca5a5' }
    return { ...base, opacity:0.35 }
  }

  const bg = bgFlash === 'correct' ? '#0a200a' : bgFlash === 'wrong' ? '#200a0a' : '#111'

  return (
    <div style={{ background:bg, minHeight:'100vh', fontFamily:'monospace',
      padding:'10px 12px', transition:'background 0.3s', paddingBottom:70 }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <button onClick={onQuit} style={styles.btnGhost}>✕ Quit</button>
        <div style={{ fontSize:'0.62rem', color:'#555', textAlign:'center', flex:1, padding:'0 8px' }}>
          {stage.label.replace(/^STAGE \d+ — /,'')}
        </div>
        <div style={{ fontSize:'0.7rem' }}>
          <span style={{ color:'#22c55e' }}>✓{correct}</span>
          {' / '}
          <span style={{ color:'#ef4444' }}>✗{miss}</span>
        </div>
      </div>

      {/* Monster */}
      <div style={{ background:'#1a1a1a', borderRadius:10, padding:'10px 14px', marginBottom:10 }}>
        <HPBar cur={mHP} max={M_HP} label={mon.name}/>
        <div style={{
          textAlign:'center', margin:'10px 0 4px',
          transform: shaking ? 'translateX(-3px)' : 'none',
          transition:'transform 0.08s',
          opacity: 0.4 + (mHP/M_HP)*0.6,
        }}>
          <div style={{ fontSize:64, lineHeight:1, filter:`hue-rotate(${(1-mHP/M_HP)*150}deg)` }}>
            {mon.emoji}
          </div>
          <div style={{ color:mon.color, fontSize:'0.72rem', fontWeight:'bold',
            letterSpacing:'0.06em', textShadow:`0 0 8px ${mon.color}88`, marginTop:4 }}>
            {mon.name}
          </div>
        </div>
      </div>

      {/* Player */}
      <div style={{ background:'#1a1a1a', borderRadius:10, padding:'10px 14px', marginBottom:10 }}>
        <HPBar cur={pHP} max={P_HP} label="⚡ WELDON (YOU)"/>
        <div style={{ display:'flex', justifyContent:'space-between',
          fontSize:'0.62rem', color:'#555', marginTop:5 }}>
          <span>Correct: <span style={{ color:'#22c55e' }}>{correct}/{WINS}</span></span>
          <span>Misses: <span style={{ color:'#ef4444' }}>{miss}/{MISSES}</span></span>
        </div>
      </div>

      {/* Question */}
      <div style={{ background:'#1a1a1a', borderRadius:10, padding:'14px', marginBottom:10 }}>
        <div style={{ fontSize:'0.6rem', color:'#555', marginBottom:6 }}>
          [{q.cat}]&nbsp;&nbsp;+{q.xp} XP if correct
        </div>
        <div style={{ color:'#efefef', fontSize:'0.84rem', lineHeight:1.55, marginBottom:12 }}>
          {q.q}
        </div>
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => !done && onAnswer(i)} style={optStyle(i)}>
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
            fontWeight:'bold', fontSize:'0.85rem', marginBottom:6 }}>
            {sel===q.a ? `✓ CORRECT! +${q.xp} XP` : `✗ WRONG! -${P_DMG} HP`}
          </div>
          <div style={{ color:'#ccc', fontSize:'0.73rem', lineHeight:1.55, marginBottom:10 }}>
            {q.exp}
          </div>
          <button onClick={onNext} style={{ ...styles.btnPrimary, width:'100%' }}>
            NEXT QUESTION →
          </button>
        </div>
      )}
    </div>
  )
}

// ── VICTORY SCREEN ───────────────────────────────────────────
function Victory({ stage, si, sessionXP, onContinue }) {
  const mon = MONSTERS[si] || MONSTERS[0]
  return (
    <div style={{ ...styles.page, background:'#0a180a', justifyContent:'center',
      alignItems:'center', textAlign:'center' }}>
      <div style={{ fontSize:72, marginBottom:8 }}>💥</div>
      <div style={{ color:'#22c55e', fontSize:'1.9rem', fontWeight:'bold',
        textShadow:'0 0 20px #22c55e88', marginBottom:4 }}>VICTORY!</div>
      <div style={{ color:'#86efac', fontSize:'0.85rem', marginBottom:4 }}>
        {mon.name} defeated!
      </div>
      <div style={{ color:'#555', fontSize:'0.7rem', marginBottom:24 }}>
        {stage.label.replace(/^STAGE \d+ — /,'')}
      </div>
      <div style={{ background:'#0f2a0f', border:'1px solid #22c55e',
        borderRadius:12, padding:'16px 32px', marginBottom:24 }}>
        <div style={{ color:'#FFB800', fontSize:'1.5rem', fontWeight:'bold' }}>
          +{sessionXP} XP
        </div>
        <div style={{ color:'#444', fontSize:'0.65rem' }}>earned this battle</div>
      </div>
      <WeldonSVG size={70}/>
      <button onClick={onContinue}
        style={{ ...styles.btnPrimary, background:'linear-gradient(135deg,#16a34a,#15803d)',
          marginTop:20, padding:'14px 36px', fontSize:'1rem', letterSpacing:'0.1em' }}>
        CONTINUE →
      </button>
    </div>
  )
}

// ── DEFEAT SCREEN ────────────────────────────────────────────
function Defeat({ si, onRetry, onQuit }) {
  const mon = MONSTERS[si] || MONSTERS[0]
  return (
    <div style={{ ...styles.page, background:'#180a0a', justifyContent:'center',
      alignItems:'center', textAlign:'center' }}>
      <div style={{ fontSize:64, marginBottom:8 }}>💀</div>
      <div style={{ color:'#ef4444', fontSize:'1.9rem', fontWeight:'bold',
        textShadow:'0 0 20px #ef444488', marginBottom:4 }}>GAME OVER</div>
      <div style={{ color:'#fca5a5', fontSize:'0.82rem', marginBottom:12 }}>
        {mon.name} was too strong...
      </div>
      <div style={{ color:'#555', fontSize:'0.7rem', maxWidth:260, lineHeight:1.5, marginBottom:28 }}>
        Review the explanations and try again.{'\n'}
        Every mistake is a lesson — Japanese quality culture demands it!
      </div>
      <button onClick={onRetry} style={{ ...styles.btnPrimary, width:220, marginBottom:10, padding:'13px' }}>
        🔄 RETRY STAGE
      </button>
      <button onClick={onQuit}
        style={{ background:'none', border:'1px solid #333', borderRadius:8,
          width:220, padding:13, color:'#666', cursor:'pointer', fontFamily:'monospace' }}>
        ← STAGE SELECT
      </button>
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

// ── SHARED STYLES ────────────────────────────────────────────
const styles = {
  page: {
    minHeight:'100vh', background:'#111',
    display:'flex', flexDirection:'column',
    padding:'20px 16px', fontFamily:'monospace',
  },
  btnPrimary: {
    background:'linear-gradient(135deg,#FF6600,#CC2200)',
    color:'#fff', border:'none', borderRadius:8,
    padding:'12px 28px', fontWeight:'bold',
    cursor:'pointer', fontFamily:'monospace',
    letterSpacing:'0.05em', fontSize:'0.9rem',
    boxShadow:'0 4px 16px #FF660044',
  },
  btnGhost: {
    background:'none', border:'1px solid #333', color:'#666',
    borderRadius:6, padding:'6px 12px', cursor:'pointer',
    fontFamily:'monospace', fontSize:'0.7rem',
  },
  card: {
    background:'#1a1a1a', border:'1px solid #2a2a2a',
    borderRadius:10, padding:'14px', marginBottom:12,
  },
  cardTitle: {
    color:'#FFB800', fontSize:'0.78rem', fontWeight:'bold', marginBottom:10,
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
  const [sel,   setSel]   = useState(null)
  const [done,  setDone]  = useState(false)
  const [bgFlash, setBgFlash] = useState(null)
  const [shaking, setShaking] = useState(false)
  const [pending, setPending] = useState(null) // 'victory'|'defeat'

  function startStage(idx) {
    setSi(idx)
    setQs(shuffle(QUIZ_STAGES[idx].questions))
    setQi(0); setPHP(P_HP); setMHP(M_HP)
    setCorrect(0); setMiss(0); setSessionXP(0)
    setSel(null); setDone(false)
    setBgFlash(null); setShaking(false); setPending(null)
    setScreen('battle')
  }

  function handleAnswer(optIdx) {
    if (done || pending) return
    const q   = qs[qi]
    setSel(optIdx); setDone(true)

    if (optIdx === q.a) {
      const nc = correct + 1
      const nm = Math.max(0, mHP - M_DMG)
      setCorrect(nc); setMHP(nm)
      setTotalXP(p => p + q.xp); setSessionXP(p => p + q.xp)
      setBgFlash('correct')
      setTimeout(()=>setBgFlash(null), 500)
      if (nc >= WINS || nm <= 0) setPending('victory')
    } else {
      const ns = miss + 1
      const np = Math.max(0, pHP - P_DMG)
      setMiss(ns); setPHP(np)
      setBgFlash('wrong'); setShaking(true)
      setTimeout(()=>{ setBgFlash(null); setShaking(false) }, 500)
      if (ns >= MISSES || np <= 0) setPending('defeat')
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
    { id:'battle', icon:'⚔️', label:'BATTLE' },
    { id:'symbol', icon:'📐', label:'SYMBOLS'},
    { id:'calc',   icon:'🔢', label:'CALC'   },
    { id:'career', icon:'🗺️', label:'CAREER' },
  ]

  function battleContent() {
    if (screen==='title')
      return <TitleScreen onStart={()=>setScreen('stage-select')} totalXP={totalXP}/>
    if (screen==='stage-select')
      return <StageSelect stages={QUIZ_STAGES} totalXP={totalXP}
               onSelect={startStage} onBack={()=>setScreen('title')}/>
    if (screen==='battle' && qs.length)
      return <Battle stage={QUIZ_STAGES[si]} si={si} qs={qs} qi={qi}
               pHP={pHP} mHP={mHP} correct={correct} miss={miss}
               sel={sel} done={done} bgFlash={bgFlash} shaking={shaking}
               onAnswer={handleAnswer} onNext={handleNext}
               onQuit={()=>setScreen('stage-select')}/>
    if (screen==='victory')
      return <Victory stage={QUIZ_STAGES[si]} si={si} sessionXP={sessionXP}
               onContinue={()=>setScreen('stage-select')}/>
    if (screen==='defeat')
      return <Defeat si={si} onRetry={()=>startStage(si)}
               onQuit={()=>setScreen('stage-select')}/>
    return null
  }

  return (
    <div style={{ maxWidth:480, margin:'0 auto', background:'#111', minHeight:'100vh' }}>
      {/* Content */}
      <div style={{ paddingBottom:58 }}>
        {tab==='battle' && battleContent()}
        {tab==='symbol' && <SymbolTab/>}
        {tab==='calc'   && <CalcTab/>}
        {tab==='career' && <CareerTab/>}
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
