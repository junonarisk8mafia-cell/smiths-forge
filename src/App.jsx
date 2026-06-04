// ============================================================
// WELDON'S FORGE - メインApp（軽量ルーター）
// 各ファイルから import して繋ぐだけ
// ============================================================
import { useState, useEffect } from "react";
import { QUIZ_STAGES } from "./questions";       // 既存の問題データ
import { SFX } from "./sound";                    // BGM/SE
import { PixelWeldon, LevelUpEvent, LEVELS, getLv, getNxt } from "./Weldon"; // キャラ+レベル
import { TreeScreen, CostScreen } from "./Tree";  // ツリー+コスト

// ============================================================
// STAGE 2 分岐設定（問題はquestions.jsから取得）
// ============================================================
const STAGE2_BRANCHES = [
  {id:"2A", label:"2A — AW検定（鉄骨）",    color:"#1D4ED8", icon:"🏗️", enemy:"ラメラテア将軍",  enemyHP:160, badge:"🏗️ AW検定合格",      qStageId:21},
  {id:"2B", label:"2B — ボイラー溶接士",    color:"#F97316", icon:"🏭", enemy:"高圧蒸気鬼",      enemyHP:160, badge:"🏭 ボイラー溶接士合格", qStageId:22},
  {id:"2C", label:"2C — 水中溶接士",        color:"#06B6D4", icon:"🌊", enemy:"深海溶接怪人",    enemyHP:160, badge:"🌊 水中溶接士合格",    qStageId:23},
];

// STAGE設定（questions.jsのQUIZ_STAGESと対応）
const MAIN_STAGES = [
  {id:1,  label:"STAGE 1 — JIS入門",       color:"#E85D04", icon:"⚡", unlockXP:0,    enemy:"スラグ鬼",    enemyHP:120, qStageId:1},
  {id:3,  label:"STAGE 3 — WES管理技術者", color:"#D97706", icon:"👑", unlockXP:550,  enemy:"ブローホール将軍", enemyHP:240, qStageId:3},
  {id:4,  label:"STAGE 4 — AWS",           color:"#DC2626", icon:"🇺🇸", unlockXP:950,  enemy:"CWI検査鬼",   enemyHP:300, qStageId:4},
  {id:5,  label:"STAGE 5 — IIW国際資格",  color:"#7C3AED", icon:"🌍", unlockXP:1450, enemy:"溶接魔王IWE", enemyHP:400, qStageId:5},
];

// questions.jsからSTAGE別問題を取得（stageIdで照合）
function getQuestions(qStageId){
  const stage = QUIZ_STAGES.find(s=>s.stageId===qStageId);
  return stage ? stage.questions : [];
}

const FB = "https://docs.google.com/forms/d/e/1FAIpQLSdw5Us-3pXujhPo3DNGjkCO5AC_2Ww2w6_QQla9tQUeS7A60g/viewform";
const F  = "'Courier New',monospace";
const MAX_Q = 10;

// ============================================================
// 敵キャラ（軽量SVG版）
// ============================================================
function Enemy({st, hit, hp, maxHP}){
  const pct = Math.max(0,(hp/maxHP)*100);
  const hc  = pct>50?"#4CAF50":pct>25?"#FF9800":"#F44336";
  const ec  = {
    "1":["#795548","#FF6B00"], "2A":["#1E3A5F","#60A5FA"],
    "2B":["#7C2D12","#FB923C"],"2C":["#164E63","#22D3EE"],
    "3":["#E65100","#FFB300"], "4":["#7F1D1D","#F87171"],
    "5":["#4A148C","#CE93D8"],
  };
  const [bg,ac] = ec[String(st?.id)]||["#555","#aaa"];
  return(
    <svg width="130" height="148" viewBox="0 0 130 148" style={{imageRendering:"pixelated",transform:hit?"translateX(-8px)":"translateX(0)",transition:"transform .15s"}}>
      <ellipse cx="65" cy="141" rx="28" ry="5" fill="#000" opacity="0.3"/>
      <rect x="15" y="5" width="100" height="10" rx="2" fill="#222"/>
      <rect x="15" y="5" width={pct} height="10" rx="2" fill={hc}/>
      <text x="65" y="13" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace">{Math.round(hp)}HP</text>
      <text x="65" y="28" textAnchor="middle" fill={ac} fontSize="8" fontWeight="bold" fontFamily="monospace">{st?.enemy}</text>
      <rect x="30" y="38" width="70" height="80" rx="6" fill={`${bg}CC`}/>
      <rect x="33" y="41" width="64" height="74" rx="5" fill={bg}/>
      <rect x="42" y="56" width="16" height="12" rx="2" fill={ac}/>
      <rect x="72" y="56" width="16" height="12" rx="2" fill={ac}/>
      <rect x="46" y="58" width="8" height="8" fill="#111"/>
      <rect x="76" y="58" width="8" height="8" fill="#111"/>
      <rect x="42" y="80" width="46" height="8" rx="3" fill={`${bg}AA`}/>
      {[46,56,66,76].map(x=><rect key={x} x={x} y="82" width="6" height="6" rx="1" fill={ac} opacity="0.8"/>)}
      <rect x="10" y="50" width="22" height="10" rx="3" fill={bg}/>
      <rect x="98" y="50" width="22" height="10" rx="3" fill={bg}/>
      <rect x="40" y="28" width="50" height="14" rx="3" fill={`${bg}CC`}/>
      <rect x="60" y="20" width="10" height="14" rx="2" fill={ac} opacity="0.8"/>
      {st?.id==="5"&&<ellipse cx="65" cy="88" rx="50" ry="55" fill={ac} opacity="0.05"><animate attributeName="rx" dur="2s" repeatCount="indefinite" values="50;56;50"/></ellipse>}
    </svg>
  );
}

function HPBar({v, max}){
  const p = Math.min(100,(v/max)*100);
  const c = p>50?"#4CAF50":p>25?"#FF9800":"#F44336";
  return <div style={{background:"#E2E8F0",borderRadius:4,height:8,border:"1px solid #CBD5E1",overflow:"hidden"}}>
    <div style={{width:`${p}%`,height:"100%",background:c,transition:"width .4s ease"}}/>
  </div>;
}

const css=`
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes dmg{0%{opacity:1;transform:translateY(0) scale(1.3)}100%{opacity:0;transform:translateY(-35px) scale(0.8)}}
  @keyframes cursor{0%,40%{opacity:1}60%,100%{opacity:0}}
  @keyframes twinkle{0%,100%{opacity:0.2}50%{opacity:0.8}}
`;

// ============================================================
// メインApp
// ============================================================
export default function App(){
  const [sc,   setSc]   = useState("title");
  const [xp,   setXp]   = useState(0);
  const [tab,  setTab]  = useState("quiz");   // title画面のタブ
  const [selSt,setSelSt]= useState(null);
  const [qs,   setQs]   = useState([]);
  const [qi,   setQi]   = useState(0);
  const [sel,  setSel]  = useState(null);
  const [ans,  setAns]  = useState([]);
  const [earned,setEarned]=useState(0);
  const [score,setScore]= useState(0);
  const [mood, setMood] = useState("smile");
  const [bounce,setBounce]=useState(false);
  const [eHit, setEHit] = useState(false);
  const [wHit, setWHit] = useState(false);
  const [eHP,  setEHP]  = useState(0);
  const [pHP,  setPHP]  = useState(60);
  const [dmg,  setDmg]  = useState(null);
  const [prevLv,setPrevLv]=useState(null);
  const [msg,  setMsg]  = useState("");
  const [showMsg,setShowMsg]=useState(false);
  const [msgDone,setMsgDone]=useState(false);
  const [showOpts,setShowOpts]=useState(true);
  const [cur,  setCur]  = useState(0);
  // STAGE2分岐管理
  const [stage2Cleared,  setStage2Cleared]  = useState(false);
  const [clearedBranch,  setClearedBranch]  = useState(null);

  const lv  = getLv(xp);
  const nxt = getNxt(xp);

  useEffect(()=>{
    if(sc==="battle"){
      const t=setInterval(()=>setCur(c=>c+1),1200);
      return()=>clearInterval(t);
    }
  },[sc]);

  // ── バトル開始 ──
  function startBattle(st){
    const pool = [...getQuestions(st.qStageId)].sort(()=>Math.random()-0.5).slice(0,MAX_Q);
    if(pool.length===0){ alert("問題データが見つかりません（qStageId:"+st.qStageId+"）"); return; }
    setSelSt(st); setQs(pool); setQi(0); setSel(null); setAns([]);
    setEarned(0); setScore(0); setMood("smile");
    setEHP(st.enemyHP); setPHP(lv.hp);
    setShowOpts(true); setShowMsg(false);
    SFX.start(); setSc("battle");
  }

  // ── 回答処理 ──
  function doAnswer(idx){
    if(sel!==null) return;
    setSel(idx);
    const q=qs[qi], ok=idx===q.a;
    const dv=ok?Math.floor(15+Math.random()*25):0;
    const pv=ok?0:Math.floor(8+Math.random()*12);
    setShowOpts(false);
    if(ok){
      setMood("happy"); setBounce(true); SFX.correct();
      setTimeout(()=>{ setEHit(true); SFX.attack(); setDmg({val:`-${dv}`,t:"e"}); setEHP(h=>Math.max(0,h-dv)); setTimeout(()=>{ setEHit(false); setDmg(null); },600); },200);
      setScore(s=>s+1); setEarned(v=>v+q.xp);
      setMsg("✅ 正解！ "+q.cat+"の知識でダメージ！\n\n"+q.exp);
    }else{
      setMood("hurt"); SFX.wrong();
      setTimeout(()=>{ setWHit(true); SFX.hurt(); setDmg({val:`-${pv}`,t:"p"}); setPHP(h=>Math.max(0,h-pv)); setTimeout(()=>{ setWHit(false); setDmg(null); },600); },200);
      setMsg("❌ 不正解！ 敵の攻撃を受けた！\n正解："+q.opts[q.a]+"\n\n"+q.exp);
    }
    setAns(p=>[...p,{ok,exp:q.exp,cat:q.cat,xp:q.xp}]);
    setTimeout(()=>{ setBounce(false); },500);
    setTimeout(()=>{ setShowMsg(true); setMsgDone(false); setTimeout(()=>setMsgDone(true),1000); },800);
  }

  // ── 次の問題 ──
  function nextQ(){
    if(!msgDone) return;
    setShowMsg(false);
    if(qi+1>=MAX_Q){
      // STAGE2分岐の合格判定（60%以上）
      const isBranch = STAGE2_BRANCHES.some(b=>b.id===selSt?.id);
      if(isBranch && score>=MAX_Q*0.6 && !stage2Cleared){
        setStage2Cleared(true); setClearedBranch(selSt.id);
      }
      const pl=getLv(xp), nx=xp+earned, nl=getLv(nx);
      setXp(nx);
      if(nl.level>pl.level){ setPrevLv(pl); SFX.levelup(); SFX.evolve(); setTimeout(()=>setSc("lvlup"),200); }
      else setSc("result");
    }else{
      setQi(q=>q+1); setSel(null); setMood("smile"); setShowOpts(true);
    }
  }

  const q   = qs[qi];
  const stC = selSt?.color||"#E85D04";

  // ============================================================
  // ── TITLE ──
  // ============================================================
  if(sc==="title") return(
    <div style={{minHeight:"100vh",background:"#F8FAFC",fontFamily:F,display:"flex",flexDirection:"column",alignItems:"center",position:"relative",overflow:"hidden"}}>
      <style>{css}</style>

      {/* 背景の星（軽量） */}
      {[...Array(12)].map((_,i)=>(
        <div key={i} style={{position:"absolute",left:`${6+i*8}%`,top:`${5+((i*37)%88)}%`,width:2,height:2,background:"#94A3B8",borderRadius:"50%",opacity:.4,animation:`twinkle ${1.2+i*0.2}s ${i*0.1}s infinite`}}/>
      ))}

      {/* ヘッダー（暗め） */}
      <div style={{width:"100%",background:"linear-gradient(135deg,#1E293B,#0F172A)",padding:"20px 16px 24px",textAlign:"center"}}>
        <div style={{animation:"bounce 1.5s ease-in-out infinite",display:"inline-block"}}>
          <PixelWeldon size={110} mood="smile" col={lv.wCol} level={lv.level}/>
        </div>
        <div style={{marginTop:6}}>
          <div style={{fontSize:9,letterSpacing:6,color:"#E85D04"}}>WELDON'S</div>
          <div style={{fontSize:32,fontWeight:900,color:"#FFE500",letterSpacing:3}}>FORGE</div>
          <div style={{fontSize:8,color:"#94A3B8",letterSpacing:2}}>溶接資格RPG｜5STAGE×20問</div>
        </div>
        {/* XPバー */}
        <div style={{marginTop:10,background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"9px 14px",maxWidth:280,margin:"10px auto 0"}}>
          <div style={{color:lv.color,fontSize:13,fontWeight:700}}>{lv.name}</div>
          <div style={{color:"#FFE500",fontSize:10,marginTop:2}}>XP: {xp}</div>
          <div style={{background:"rgba(255,255,255,0.1)",borderRadius:4,height:8,margin:"5px 0",overflow:"hidden"}}>
            <div style={{width:`${Math.min(100,((xp-lv.minXP)/((nxt?.minXP||lv.minXP+300)-lv.minXP))*100)}%`,height:"100%",background:lv.color,transition:"width .8s ease"}}/>
          </div>
          {nxt&&<div style={{color:"#94A3B8",fontSize:9}}>「{nxt.name}」まで {nxt.minXP-xp} XP</div>}
          {stage2Cleared&&<div style={{color:"#4CAF50",fontSize:9,marginTop:3}}>{STAGE2_BRANCHES.find(b=>b.id===clearedBranch)?.badge} ✓</div>}
        </div>
      </div>

      {/* タブ */}
      <div style={{display:"flex",width:"100%",maxWidth:400,background:"white",borderBottom:"2px solid #E2E8F0"}}>
        {[{id:"quiz",l:"🎮 クイズ"},{id:"tree",l:"🗺️ ツリー"},{id:"cost",l:"💰 コスト"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"11px 0",border:"none",borderBottom:`3px solid ${tab===t.id?"#E85D04":"transparent"}`,background:"white",color:tab===t.id?"#1E293B":"#94A3B8",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:F,transition:"all .2s"}}>{t.l}</button>
        ))}
      </div>

      <div style={{width:"100%",maxWidth:400,padding:"12px 14px 40px",overflowY:"auto"}}>

        {/* ── クイズタブ ── */}
        {tab==="quiz"&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{background:"#FFF7ED",border:"1px solid #FED7AA",borderRadius:10,padding:"9px 12px",marginBottom:2}}>
              <div style={{color:"#C2410C",fontSize:10,fontWeight:700}}>💡 各ステージ20問からランダム10問出題</div>
              <div style={{color:"#92400E",fontSize:9,marginTop:1}}>XPを稼いで次のSTAGEを解放しよう！</div>
            </div>

            {/* STAGE 1 */}
            {MAIN_STAGES.filter(s=>s.id===1).map(s=>{
              const ok=xp>=s.unlockXP;
              return(
                <button key={s.id} onClick={()=>ok&&startBattle(s)} style={{background:ok?`${s.color}10`:"#F8FAFC",border:`2px solid ${ok?s.color:"#E2E8F0"}`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,cursor:ok?"pointer":"default",fontFamily:F,boxShadow:ok?"0 2px 8px rgba(0,0,0,0.08)":"none",opacity:ok?1:0.5}}>
                  <div style={{width:42,height:42,borderRadius:10,background:ok?`${s.color}15`:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{ok?s.icon:"🔒"}</div>
                  <div style={{flex:1,textAlign:"left"}}>
                    <div style={{color:ok?s.color:"#94A3B8",fontSize:10,fontWeight:700}}>{s.label}</div>
                    <div style={{color:"#64748B",fontSize:9,marginTop:1}}>{ok?`${s.enemy}に挑む！`:`XP ${s.unlockXP}以上で解放`}</div>
                  </div>
                  {ok&&<span style={{color:s.color,fontSize:16,fontWeight:900}}>▶</span>}
                </button>
              );
            })}

            {/* STAGE 2 分岐ボックス */}
            <div style={{background:"#EFF6FF",border:"2px solid #1D4ED8",borderRadius:12,padding:"10px 12px"}}>
              <div style={{color:"#1D4ED8",fontSize:10,fontWeight:700,marginBottom:2}}>🔀 STAGE 2 — 専門ルート分岐</div>
              <div style={{color:"#64748B",fontSize:9,marginBottom:8}}>
                {stage2Cleared?"✅ クリア！→ STAGE 3解放済み":"どれか1つ60%以上合格でSTAGE 3へ進める"}
              </div>
              {STAGE2_BRANCHES.map(b=>{
                const ok=xp>=200;
                const isCleared=clearedBranch===b.id;
                return(
                  <button key={b.id} onClick={()=>ok&&startBattle(b)} style={{width:"100%",background:isCleared?`${b.color}15`:ok?`${b.color}08`:"#F8FAFC",border:`1px solid ${isCleared?b.color:ok?b.color+"40":"#E2E8F0"}`,borderRadius:8,padding:"9px 11px",display:"flex",alignItems:"center",gap:8,cursor:ok?"pointer":"default",fontFamily:F,marginBottom:5,opacity:ok?1:0.4}}>
                    <span style={{fontSize:16}}>{ok?b.icon:"🔒"}</span>
                    <div style={{flex:1,textAlign:"left"}}>
                      <div style={{color:ok?b.color:"#94A3B8",fontSize:10,fontWeight:700}}>{b.label}</div>
                      <div style={{color:"#64748B",fontSize:9,marginTop:1}}>{isCleared?"✅ 合格済み！":ok?`${b.enemy}に挑む！`:`XP 200以上で解放`}</div>
                    </div>
                    {ok&&<span style={{color:isCleared?"#16A34A":b.color,fontSize:13}}>{isCleared?"✓":"▶"}</span>}
                  </button>
                );
              })}
            </div>

            {/* STAGE 3〜5 */}
            {MAIN_STAGES.filter(s=>s.id!==1).map(s=>{
              const ok = s.id===3 ? (stage2Cleared&&xp>=s.unlockXP) : xp>=s.unlockXP;
              return(
                <button key={s.id} onClick={()=>ok&&startBattle(s)} style={{background:ok?`${s.color}10`:"#F8FAFC",border:`2px solid ${ok?s.color:"#E2E8F0"}`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,cursor:ok?"pointer":"default",fontFamily:F,boxShadow:ok?"0 2px 8px rgba(0,0,0,0.08)":"none",opacity:ok?1:0.5}}>
                  <div style={{width:42,height:42,borderRadius:10,background:ok?`${s.color}15`:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{ok?s.icon:"🔒"}</div>
                  <div style={{flex:1,textAlign:"left"}}>
                    <div style={{color:ok?s.color:"#94A3B8",fontSize:10,fontWeight:700}}>{s.label}</div>
                    <div style={{color:"#64748B",fontSize:9,marginTop:1}}>
                      {ok?`${s.enemy}に挑む！`:s.id===3?"STAGE 2クリア＋XP "+s.unlockXP+"以上で解放":"XP "+s.unlockXP+"以上で解放"}
                    </div>
                  </div>
                  {ok&&<span style={{color:s.color,fontSize:16,fontWeight:900}}>▶</span>}
                </button>
              );
            })}

            <a href={FB} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",border:"1px solid #CBD5E1",borderRadius:10,padding:"10px 0",color:"#64748B",fontSize:10,fontFamily:F,textDecoration:"none",background:"white",marginTop:4}}>📝 フィードバックを送る</a>
          </div>
        )}

        {/* ── ツリータブ ── */}
        {tab==="tree"&&<TreeScreen/>}

        {/* ── コストタブ ── */}
        {tab==="cost"&&<CostScreen/>}

      </div>
    </div>
  );

  // ============================================================
  // ── BATTLE（ドラクエ風） ──
  // ============================================================
  if(sc==="battle"&&q) return(
    <div style={{minHeight:"100vh",background:"#F1F5F9",fontFamily:F,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto",position:"relative",overflow:"hidden"}}>
      <style>{css}</style>
      {/* スキャンライン */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)",pointerEvents:"none",zIndex:20}}/>

      {/* ヘッダー */}
      <div style={{background:"#1E293B",borderBottom:"2px solid #334155",padding:"7px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setSc("title")} style={{background:"none",border:"1px solid #475569",borderRadius:6,color:"#94A3B8",padding:"4px 10px",cursor:"pointer",fontSize:10,fontFamily:F}}>← 逃げる</button>
        <div style={{color:stC,fontSize:9,fontWeight:700}}>{selSt?.label}</div>
        <div style={{color:"#FFE500",fontSize:10,fontWeight:700}}>XP:{xp+earned} | {qi+1}/{MAX_Q}</div>
      </div>

      {/* バトルフィールド（暗め） */}
      <div style={{background:"linear-gradient(180deg,#1E293B 0%,#0F172A 60%,#1E293B 100%)",padding:"12px 10px",flex:1,display:"flex",flexDirection:"column"}}>

        {/* 敵 */}
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:7,minHeight:148,position:"relative"}}>
          <div style={{position:"relative"}}>
            <Enemy st={selSt} hit={eHit} hp={eHP} maxHP={selSt?.enemyHP||100}/>
            {dmg?.t==="e"&&<div style={{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",color:"#FF6B00",fontSize:22,fontWeight:900,textShadow:"0 0 10px #FF6B00",animation:"dmg .8s ease forwards",zIndex:10}}>{dmg.val}</div>}
          </div>
        </div>

        {/* 問題ウィンドウ */}
        <div style={{background:"white",border:"3px solid #334155",borderRadius:6,padding:"10px 12px",marginBottom:7,position:"relative",minHeight:55,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
          <div style={{position:"absolute",top:-1,left:10,background:"white",padding:"0 6px",color:"#475569",fontSize:8,fontWeight:700}}>【質問】<span style={{color:stC,marginLeft:5}}>— {q.cat}</span></div>
          <div style={{color:"#1E293B",fontSize:12,lineHeight:1.85,marginTop:4}}>{q.q}</div>
        </div>

        {/* コマンド＋プレイヤー */}
        <div style={{display:"flex",gap:7,marginBottom:7}}>
          {/* コマンドウィンドウ */}
          <div style={{background:"white",border:"3px solid #334155",borderRadius:6,padding:"8px 10px",flex:1,minWidth:0,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
            <div style={{color:"#475569",fontSize:8,fontWeight:700,marginBottom:5}}>【こたえる】</div>
            {showOpts&&q.opts.map((o,i)=>{
              let c="#1E293B";
              if(sel!==null){ if(i===q.a)c="#16A34A"; else if(i===sel)c="#DC2626"; }
              return(
                <div key={i} onClick={()=>sel===null&&doAnswer(i)} style={{color:c,fontSize:10,padding:"4px 2px",cursor:sel===null?"pointer":"default",display:"flex",alignItems:"flex-start",gap:3,fontWeight:sel===null&&i===cur%4?"900":"400"}}>
                  <span style={{color:"#FFE500",background:"#1E293B",borderRadius:2,opacity:sel===null&&i===cur%4?1:0,fontSize:8,marginTop:1,flexShrink:0,padding:"0 2px"}}>▶</span>
                  <span style={{fontSize:8,color:"#94A3B8",marginRight:2,flexShrink:0}}>{["Ａ","Ｂ","Ｃ","Ｄ"][i]}.</span>
                  <span style={{fontSize:10,lineHeight:1.5}}>{o}</span>
                </div>
              );
            })}
            {!showOpts&&!showMsg&&<div style={{color:"#94A3B8",fontSize:10,padding:"8px 0"}}>...</div>}
          </div>

          {/* プレイヤーステータス */}
          <div style={{background:"white",border:"3px solid #334155",borderRadius:6,padding:"7px 9px",width:92,flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
            <div style={{color:"#475569",fontSize:7,fontWeight:700,marginBottom:3,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{lv.name}</div>
            <div style={{position:"relative"}}>
              <PixelWeldon size={66} mood={mood} bounce={bounce} hit={wHit} col={lv.wCol} level={lv.level}/>
              {dmg?.t==="p"&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",color:"#DC2626",fontSize:16,fontWeight:900,animation:"dmg .8s ease forwards",zIndex:10}}>{dmg.val}</div>}
            </div>
            <div style={{marginTop:2}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                <span style={{color:"#64748B",fontSize:7}}>HP</span>
                <span style={{color:"#16A34A",fontSize:7}}>{pHP}</span>
              </div>
              <HPBar v={pHP} max={lv.hp}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                <span style={{color:"#64748B",fontSize:7}}>問</span>
                <span style={{color:"#FFE500",fontSize:7}}>{qi+1}/{MAX_Q}</span>
              </div>
            </div>
          </div>
        </div>

        {/* メッセージウィンドウ */}
        {showMsg&&(
          <div onClick={nextQ} style={{background:"white",border:"3px solid #334155",borderRadius:6,padding:"10px 12px",cursor:"pointer",position:"relative",minHeight:55,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
            <div style={{color:"#1E293B",fontSize:11,lineHeight:1.75,whiteSpace:"pre-line"}}>{msg}</div>
            {msgDone&&<div style={{position:"absolute",bottom:6,right:10,color:"#FFE500",fontSize:12,background:"#1E293B",padding:"1px 4px",borderRadius:3,animation:"cursor 2s infinite"}}>▼</div>}
          </div>
        )}
      </div>
    </div>
  );

  // ============================================================
  // ── LEVEL UP（変身イベント） ──
  // ============================================================
  if(sc==="lvlup") return(
    <LevelUpEvent lv={lv} prevLv={prevLv} onNext={()=>setSc("result")}/>
  );

  // ============================================================
  // ── RESULT ──
  // ============================================================
  if(sc==="result") return(
    <div style={{minHeight:"100vh",background:"#F8FAFC",fontFamily:F,padding:14,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"}}>
      <style>{css}</style>

      {/* スコア */}
      <div style={{background:"linear-gradient(135deg,#1E293B,#0F172A)",borderRadius:14,padding:"16px",marginBottom:12,textAlign:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.15)"}}>
        <div style={{fontSize:9,color:"#94A3B8",letterSpacing:4,marginBottom:4}}>★ BATTLE RESULT ★</div>
        <div style={{fontSize:38,fontWeight:900,color:"#FFE500"}}>{score} / {MAX_Q}</div>
        <div style={{color:"#94A3B8",fontSize:11,marginTop:2}}>+{earned} XP 獲得</div>
        {/* STAGE2分岐の合否 */}
        {STAGE2_BRANCHES.some(b=>b.id===selSt?.id)&&(
          <div style={{marginTop:8,padding:"7px 12px",background:score>=MAX_Q*0.6?"rgba(22,163,74,0.15)":"rgba(220,38,38,0.15)",border:"1px solid "+(score>=MAX_Q*0.6?"#16A34A":"#DC2626"),borderRadius:8,fontSize:11,color:score>=MAX_Q*0.6?"#4ADE80":"#F87171"}}>
            {score>=MAX_Q*0.6 ? "🎉 合格！ "+selSt.badge+" → STAGE 3解放！" : "不合格（"+score+"/"+MAX_Q+"）60%以上で合格 → 再挑戦！"}
          </div>
        )}
        <div style={{display:"flex",justifyContent:"center",marginTop:10}}>
          <PixelWeldon size={85} mood={score>=MAX_Q*0.7?"happy":"neutral"} col={lv.wCol} level={lv.level}/>
        </div>
      </div>

      {/* XPバー */}
      <div style={{background:"white",borderRadius:12,padding:"12px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",border:"1px solid #F1F5F9"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{color:lv.color,fontSize:12,fontWeight:700}}>{lv.name}</span>
          <span style={{color:"#1E293B",fontSize:11}}>XP: {xp}</span>
        </div>
        <div style={{background:"#E2E8F0",borderRadius:5,height:10,border:"1px solid #CBD5E1",overflow:"hidden"}}>
          <div style={{width:`${Math.min(100,((xp-lv.minXP)/((nxt?.minXP||lv.minXP+300)-lv.minXP))*100)}%`,height:"100%",background:lv.color,transition:"width .8s ease"}}/>
        </div>
        {nxt&&<div style={{color:"#94A3B8",fontSize:9,marginTop:3}}>「{nxt.name}」まで {nxt.minXP-xp} XP</div>}
      </div>

      {/* 答えの振り返り */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12,maxHeight:200,overflowY:"auto"}}>
        {ans.map((a,i)=>(
          <div key={i} style={{background:a.ok?"#F0FDF4":"#FEF2F2",border:"1px solid "+(a.ok?"#86EFAC":"#FCA5A5"),borderRadius:10,padding:"9px 11px"}}>
            <div style={{color:a.ok?"#166534":"#991B1B",fontSize:10,fontWeight:700,marginBottom:2}}>
              {a.ok?"✅ 正解":"❌ 不正解"} — {a.cat}
              {a.ok&&<span style={{color:"#D97706",marginLeft:5}}>+{a.xp}XP</span>}
            </div>
            <div style={{color:"#475569",fontSize:10,lineHeight:1.55}}>{a.exp}</div>
          </div>
        ))}
      </div>

      {/* ボタン */}
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <button onClick={()=>startBattle(selSt)} style={{flex:1,background:`linear-gradient(135deg,${stC},${stC}CC)`,border:"none",borderRadius:12,padding:"13px 0",color:"white",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F,boxShadow:`0 4px 14px ${stC}40`}}>🔥 もう一戦</button>
        <button onClick={()=>setSc("title")} style={{flex:1,background:"white",border:"2px solid #CBD5E1",borderRadius:12,padding:"13px 0",color:"#64748B",fontSize:13,cursor:"pointer",fontFamily:F}}>🏠 タイトル</button>
      </div>

      <a href={FB} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",border:"1px solid #CBD5E1",borderRadius:10,padding:"10px 0",color:"#64748B",fontSize:10,fontFamily:F,textDecoration:"none",background:"white"}}>📝 フィードバックを送る（アプリ改善にご協力ください）</a>
    </div>
  );

  return null;
}
