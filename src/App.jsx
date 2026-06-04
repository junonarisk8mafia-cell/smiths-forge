
// ============================================================
// STAGE設定
// ============================================================
const MAIN_STAGES=[
  {id:1,label:"STAGE 1 — JIS入門",color:"#E85D04",icon:"⚡",unlockXP:0,enemy:"スラグ鬼",enemyHP:120,db:DB1},
  {id:3,label:"STAGE 3 — WES管理技術者",color:"#D97706",icon:"👑",unlockXP:550,enemy:"ブローホール将軍",enemyHP:240,db:DB3},
  {id:4,label:"STAGE 4 — AWS",color:"#DC2626",icon:"🇺🇸",unlockXP:950,enemy:"CWI検査鬼",enemyHP:300,db:DB4},
  {id:5,label:"STAGE 5 — IIW国際資格",color:"#7C3AED",icon:"🌍",unlockXP:1450,enemy:"溶接魔王IWE",enemyHP:400,db:DB5},
];

const BRANCH_STAGES=[
  {id:"2A",label:"2A — AW検定（鉄骨）",color:"#1D4ED8",icon:"🏗️",enemy:"ラメラテア将軍",enemyHP:160,db:DB2A,badge:"🏗️ AW検定合格"},
  {id:"2B",label:"2B — ボイラー溶接士",color:"#F97316",icon:"🏭",enemy:"高圧蒸気鬼",enemyHP:160,db:DB2B,badge:"🏭 ボイラー溶接士合格"},
  {id:"2C",label:"2C — 水中溶接士",color:"#06B6D4",icon:"🌊",enemy:"深海溶接怪人",enemyHP:160,db:DB2C,badge:"🌊 水中溶接士合格"},
];

const LEVELS=[
  {level:1,name:"見習い溶接工",minXP:0,color:"#E85D04",hp:60,wCol:"#E74C3C"},
  {level:2,name:"一人前溶接工",minXP:200,color:"#1D4ED8",hp:90,wCol:"#2980B9"},
  {level:3,name:"熟練溶接工",minXP:550,color:"#D97706",hp:130,wCol:"#E67E22"},
  {level:4,name:"上級溶接工",minXP:950,color:"#DC2626",hp:170,wCol:"#C0392B"},
  {level:5,name:"溶接マスター",minXP:1450,color:"#7C3AED",hp:220,wCol:"#8E44AD"},
  {level:6,name:"IIW溶接エンジニア",minXP:2000,color:"#D4AC0D",hp:280,wCol:"#D4AC0D"},
];
const getLv=xp=>{for(let i=LEVELS.length-1;i>=0;i--)if(xp>=LEVELS[i].minXP)return LEVELS[i];return LEVELS[0];};
const getNxt=xp=>{const c=getLv(xp);return LEVELS.find(l=>l.level===c.level+1)||null;};

function PixelWeldon({size=100,mood="smile",bounce=false,hit=false,col="#E74C3C"}){
  const mp={smile:"M42,70 Q50,76 58,70",happy:"M40,69 Q50,78 60,69",surprised:"M47,70 a4,5 0 1,0 6,0",neutral:"M43,70 L57,70",hurt:"M42,72 Q50,68 58,72"};
  return(
    <svg width={size} height={size*1.1} viewBox="0 0 100 110" style={{imageRendering:"pixelated",transform:bounce?"translateY(-8px)":(hit?"translateX(6px)":"translateY(0)"),transition:"transform .15s ease",filter:"drop-shadow(0 4px 2px rgba(0,0,0,0.5))"}}>
      <ellipse cx="50" cy="106" rx="22" ry="4" fill="#000" opacity="0.4"/>
      <rect x="36" y="88" width="4" height="14" fill="#1C1C1C"/>
      <rect x="60" y="88" width="4" height="14" fill="#1C1C1C"/>
      <rect x="28" y="96" width="20" height="4" rx="2" fill="#1C1C1C"/>
      <rect x="52" y="96" width="20" height="4" rx="2" fill="#1C1C1C"/>
      <rect x="28" y="100" width="4" height="4" fill="#1C1C1C"/>
      <rect x="44" y="100" width="4" height="4" fill="#1C1C1C"/>
      <rect x="52" y="100" width="4" height="4" fill="#1C1C1C"/>
      <rect x="68" y="100" width="4" height="4" fill="#1C1C1C"/>
      <rect x="30" y="46" width="40" height="46" rx="4" fill={`${col}AA`}/>
      <rect x="32" y="48" width="36" height="42" rx="3" fill={col}/>
      <rect x="33" y="49" width="12" height="38" rx="2" fill="white" opacity="0.15"/>
      <rect x="36" y="78" width="28" height="12" rx="2" fill={`${col}AA`}/>
      <text x="50" y="87" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="monospace">MIG</text>
      <rect x="33" y="48" width="34" height="28" rx="3" fill={col}/>
      <rect x="36" y="57" width="10" height="8" rx="1" fill="white"/>
      <rect x="54" y="57" width="10" height="8" rx="1" fill="white"/>
      <rect x="38" y="59" width="6" height="5" rx="1" fill="#5B7FDB"/>
      <rect x="56" y="59" width="6" height="5" rx="1" fill="#5B7FDB"/>
      <rect x="39" y="60" width="2" height="2" fill="#1A1A2E"/>
      <rect x="57" y="60" width="2" height="2" fill="#1A1A2E"/>
      <rect x="43" y="59" width="2" height="2" fill="white"/>
      <rect x="61" y="59" width="2" height="2" fill="white"/>
      <path d={mp[mood]||mp.smile} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <rect x="46" y="26" width="6" height="22" rx="2" fill="#2C2C2C"/>
      <rect x="48" y="14" width="5" height="14" rx="2" fill="#2C2C2C" transform="rotate(-20,50,20)"/>
      <rect x="64" y="2" width="18" height="8" rx="2" fill="#BDC3C7"/>
      <rect x="64" y="7" width="18" height="3" rx="1" fill="#D4AC0D"/>
      <rect x="78" y="0" width="6" height="12" rx="2" fill="#7F8C8D"/>
      <rect x="82" y="0" width="3" height="3" fill="#FFE500" opacity="0.9"><animate attributeName="opacity" dur="0.2s" repeatCount="indefinite" values="0.9;0.1;0.9"/></rect>
      <rect x="14" y="56" width="18" height="5" rx="2" fill="#2C2C2C"/>
      <rect x="68" y="56" width="18" height="5" rx="2" fill="#2C2C2C"/>
      <rect x="8" y="52" width="10" height="14" rx="2" fill={col}/>
      <rect x="6" y="52" width="4" height="4" rx="1" fill={col}/>
      <rect x="6" y="58" width="4" height="4" rx="1" fill={col}/>
      <rect x="6" y="64" width="4" height="4" rx="1" fill={col}/>
      <rect x="82" y="52" width="10" height="14" rx="2" fill={col}/>
      <rect x="90" y="52" width="4" height="4" rx="1" fill={col}/>
      <rect x="90" y="58" width="4" height="4" rx="1" fill={col}/>
      <rect x="90" y="64" width="4" height="4" rx="1" fill={col}/>
    </svg>
  );
}

function Enemy({st,hit,hp,maxHP}){
  const pct=Math.max(0,(hp/maxHP)*100);
  const hc=pct>50?"#4CAF50":pct>25?"#FF9800":"#F44336";
  const ec={"1":["#795548","#FF6B00"],"2A":["#1E3A5F","#60A5FA"],"2B":["#7C2D12","#FB923C"],"2C":["#164E63","#22D3EE"],"3":["#E65100","#FFB300"],"4":["#7F1D1D","#F87171"],"5":["#4A148C","#CE93D8"]};
  const [bg,ac]=ec[String(st?.id)]||["#555","#aaa"];
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
    </svg>
  );
}

function HPBar({v,max}){
  const p=Math.min(100,(v/max)*100);
  const c=p>50?"#4CAF50":p>25?"#FF9800":"#F44336";
  return<div style={{background:"#E2E8F0",borderRadius:4,height:8,border:"1px solid #CBD5E1",overflow:"hidden"}}><div style={{width:`${p}%`,height:"100%",background:c,transition:"width .4s ease"}}/></div>;
}

const F="'Courier New',monospace";
const css=`
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes dmg{0%{opacity:1;transform:translateY(0) scale(1.3)}100%{opacity:0;transform:translateY(-35px) scale(0.8)}}
  @keyframes cursor{0%,40%{opacity:1}60%,100%{opacity:0}}
  @keyframes lu{0%{transform:scale(.3) rotate(-10deg);opacity:0}60%{transform:scale(1.2) rotate(3deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
  @keyframes twinkle{0%,100%{opacity:0.2}50%{opacity:1}}
  @keyframes slide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
`;

export default function App(){
  const [sc,setSc]=useState("title");
  const [xp,setXp]=useState(0);
  const [selSt,setSelSt]=useState(null);
  const [qs,setQs]=useState([]);
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [ans,setAns]=useState([]);
  const [earned,setEarned]=useState(0);
  const [score,setScore]=useState(0);
  const [mood,setMood]=useState("smile");
  const [bounce,setBounce]=useState(false);
  const [eHit,setEHit]=useState(false);
  const [wHit,setWHit]=useState(false);
  const [eHP,setEHP]=useState(0);
  const [pHP,setPHP]=useState(60);
  const [dmg,setDmg]=useState(null);
  const [prevLv,setPrevLv]=useState(null);
  const [msg,setMsg]=useState("");
  const [showMsg,setShowMsg]=useState(false);
  const [msgDone,setMsgDone]=useState(false);
  const [showOpts,setShowOpts]=useState(true);
  const [cur,setCur]=useState(0);
  // STAGE 2 分岐管理
  const [stage2Cleared,setStage2Cleared]=useState(false); // どれか1つ合格でtrue
  const [clearedBranch,setClearedBranch]=useState(null); // 合格したブランチID
  const MAX_Q=10;

  const lv=getLv(xp),nxt=getNxt(xp);

  useEffect(()=>{
    if(sc==="battle"){
      const t=setInterval(()=>setCur(c=>c+1),1200);
      return()=>clearInterval(t);
    }
  },[sc]);

  function startBattle(st){
    const pool=[...st.db].sort(()=>Math.random()-0.5).slice(0,MAX_Q);
    setSelSt(st);setQs(pool);setQi(0);setSel(null);setAns([]);
    setEarned(0);setScore(0);setMood("smile");
    setEHP(st.enemyHP);setPHP(lv.hp);
    setShowOpts(true);setShowMsg(false);
    SFX.start();setSc("battle");
  }

  function doAnswer(idx){
    if(sel!==null) return;
    setSel(idx);
    const q=qs[qi],ok=idx===q.a;
    const dv=ok?Math.floor(15+Math.random()*25):0;
    const pv=ok?0:Math.floor(8+Math.random()*12);
    setShowOpts(false);
    if(ok){
      setMood("happy");setBounce(true);SFX.correct();
      setTimeout(()=>{setEHit(true);SFX.attack();setDmg({val:`-${dv}`,t:"e"});setEHP(h=>Math.max(0,h-dv));setTimeout(()=>{setEHit(false);setDmg(null);},600);},200);
      setScore(s=>s+1);setEarned(v=>v+q.xp);
      setMsg(`✅ 正解！ ${q.cat}の知識でダメージ！\n\n${q.exp}`);
    }else{
      setMood("hurt");SFX.wrong();
      setTimeout(()=>{setWHit(true);SFX.hurt();setDmg({val:`-${pv}`,t:"p"});setPHP(h=>Math.max(0,h-pv));setTimeout(()=>{setWHit(false);setDmg(null);},600);},200);
      setMsg(`❌ 不正解！ 敵の攻撃を受けた！\n正解：${q.opts[q.a]}\n\n${q.exp}`);
    }
    setAns(p=>[...p,{ok,exp:q.exp,cat:q.cat,xp:q.xp}]);
    setTimeout(()=>{setBounce(false);},500);
    setTimeout(()=>{setShowMsg(true);setMsgDone(false);setTimeout(()=>setMsgDone(true),1000);},800);
  }

  function nextQ(){
    if(!msgDone) return;
    setShowMsg(false);
    if(qi+1>=MAX_Q){
      // STAGE2分岐のクリア判定
      const isBranch=BRANCH_STAGES.some(b=>b.id===selSt?.id);
      const passed=score>=MAX_Q*0.6; // 60%以上で合格
      if(isBranch&&passed&&!stage2Cleared){
        setStage2Cleared(true);
        setClearedBranch(selSt.id);
      }
      const pl=getLv(xp),nx=xp+earned,nl=getLv(nx);
      setXp(nx);
      if(nl.level>pl.level){setPrevLv(pl);SFX.levelup();setTimeout(()=>setSc("lvlup"),200);}
      else setSc("result");
    }else{
      setQi(q=>q+1);setSel(null);setMood("smile");setShowOpts(true);
    }
  }

  const q=qs[qi],stC=selSt?.color||"#E85D04";

  // ── TITLE ──
  if(sc==="title") return(
    <div style={{minHeight:"100vh",background:"#F8FAFC",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:F,padding:16,overflow:"hidden",position:"relative"}}>
      <style>{css}</style>
      {[...Array(16)].map((_,i)=><div key={i} style={{position:"absolute",left:`${6+i*6}%`,top:`${5+((i*41)%90)}%`,width:2,height:2,background:"#94A3B8",borderRadius:"50%",opacity:.5,animation:`twinkle ${1+i*0.2}s ${i*0.1}s infinite`}}/>)}
      <div style={{animation:"bounce 1.5s ease-in-out infinite"}}><PixelWeldon size={120} mood="smile" col={lv.wCol}/></div>
      <div style={{textAlign:"center",marginTop:6,zIndex:1}}>
        <div style={{fontSize:9,letterSpacing:6,color:"#FF6B00",textShadow:"0 0 10px #FF6B00"}}>WELDON'S</div>
        <div style={{fontSize:34,fontWeight:900,color:"#FFE500",letterSpacing:3,textShadow:"0 0 20px #FFE500,0 0 40px #FF6B00"}}>FORGE</div>
        <div style={{fontSize:8,color:"#555",letterSpacing:2}}>溶接資格RPG｜5STAGE×20問</div>
      </div>
      <div style={{marginTop:10,background:"white",border:"1px solid #E2E8F0",borderRadius:8,padding:"10px 16px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        <div style={{color:lv.color,fontSize:13,fontWeight:700}}>{lv.name}</div>
        <div style={{color:"#FFE500",fontSize:10}}>XP: {xp}</div>
        {nxt&&<div style={{color:"#94A3B8",fontSize:9,marginTop:2}}>次のLvまで {nxt.minXP-xp} XP</div>}
        {stage2Cleared&&<div style={{color:"#4CAF50",fontSize:9,marginTop:2}}>{BRANCH_STAGES.find(b=>b.id===clearedBranch)?.badge} ✓</div>}
      </div>

      <div style={{marginTop:12,width:"100%",maxWidth:300,display:"flex",flexDirection:"column",gap:5}}>

        {/* STAGE 1 */}
        {MAIN_STAGES.filter(s=>s.id===1).map(s=>{
          const ok=xp>=s.unlockXP;
          return(
            <button key={s.id} onClick={()=>ok&&startBattle(s)} style={{background:ok?`${s.color}15`:"#050505",border:`2px solid ${ok?s.color:"#222"}`,borderRadius:4,padding:"10px 12px",display:"flex",alignItems:"center",gap:9,cursor:ok?"pointer":"default",fontFamily:F,opacity:ok?1:0.4}}>
              <span style={{fontSize:16}}>{ok?s.icon:"🔒"}</span>
              <div style={{flex:1,textAlign:"left"}}>
                <div style={{color:ok?s.color:"#444",fontSize:10,fontWeight:700}}>{s.label}</div>
                <div style={{color:"#555",fontSize:9,marginTop:1}}>{ok?`${s.enemy}に挑む！ 20問中10問出題`:`XP ${s.unlockXP}以上で解放`}</div>
              </div>
              {ok&&<span style={{color:s.color,fontSize:11}}>▶</span>}
            </button>
          );
        })}

        {/* STAGE 2 分岐 */}
        <div style={{background:"#EFF6FF",border:"2px solid #1D4ED8",borderRadius:4,padding:"8px 10px"}}>
          <div style={{color:"#1D4ED8",fontSize:9,fontWeight:700,marginBottom:6,textAlign:"center"}}>
            🔀 STAGE 2 — 専門ルート分岐
            {stage2Cleared
              ? <span style={{color:"#4CAF50",marginLeft:6}}>✓ クリア！→ STAGE 3解放</span>
              : <span style={{color:"#555",marginLeft:6}}>どれか1つ合格でSTAGE 3へ</span>
            }
          </div>
          {BRANCH_STAGES.map(b=>{
            const ok=xp>=200;
            const isCleared=clearedBranch===b.id;
            return(
              <button key={b.id} onClick={()=>ok&&startBattle(b)} style={{width:"100%",background:isCleared?`${b.color}20`:ok?`${b.color}10`:"#050505",border:`1px solid ${isCleared?b.color:ok?b.color+"40":"#222"}`,borderRadius:3,padding:"8px 10px",display:"flex",alignItems:"center",gap:8,cursor:ok?"pointer":"default",fontFamily:F,opacity:ok?1:0.4,marginBottom:4}}>
                <span style={{fontSize:14}}>{ok?b.icon:"🔒"}</span>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{color:ok?b.color:"#444",fontSize:9,fontWeight:700}}>{b.label}</div>
                  <div style={{color:"#555",fontSize:8,marginTop:1}}>
                    {isCleared?"✅ 合格済み！":ok?`${b.enemy}に挑む！ 20問中10問出題`:`XP 200以上で解放`}
                  </div>
                </div>
                {ok&&<span style={{color:isCleared?"#4CAF50":b.color,fontSize:10}}>{isCleared?"✓":"▶"}</span>}
              </button>
            );
          })}
        </div>

        {/* STAGE 3〜5 */}
        {MAIN_STAGES.filter(s=>s.id!==1).map(s=>{
          const ok=s.id===3?stage2Cleared&&xp>=s.unlockXP:xp>=s.unlockXP;
          return(
            <button key={s.id} onClick={()=>ok&&startBattle(s)} style={{background:ok?`${s.color}15`:"#050505",border:`2px solid ${ok?s.color:"#222"}`,borderRadius:4,padding:"10px 12px",display:"flex",alignItems:"center",gap:9,cursor:ok?"pointer":"default",fontFamily:F,opacity:ok?1:0.4}}>
              <span style={{fontSize:16}}>{ok?s.icon:"🔒"}</span>
              <div style={{flex:1,textAlign:"left"}}>
                <div style={{color:ok?s.color:"#444",fontSize:10,fontWeight:700}}>{s.label}</div>
                <div style={{color:"#555",fontSize:9,marginTop:1}}>
                  {ok?`${s.enemy}に挑む！ 20問中10問出題`:s.id===3?`STAGE 2クリア＋XP ${s.unlockXP}以上で解放`:`XP ${s.unlockXP}以上で解放`}
                </div>
              </div>
              {ok&&<span style={{color:s.color,fontSize:11}}>▶</span>}
            </button>
          );
        })}
      </div>
      <a href={FB} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",margin:"10px 16px 0",maxWidth:268,border:"1px solid #CBD5E1",borderRadius:8,padding:"9px 0",color:"#64748B",fontSize:10,fontFamily:F,textDecoration:"none",letterSpacing:1,background:"white"}}>📝 フィードバックを送る</a>
    </div>
  );

  // ── BATTLE ──
  if(sc==="battle"&&q) return(
    <div style={{minHeight:"100vh",background:"#F1F5F9",fontFamily:F,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto",position:"relative",overflow:"hidden"}}>
      <style>{css}</style>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)",pointerEvents:"none",zIndex:20}}/>
      <div style={{background:"#1E293B",borderBottom:"2px solid #334155",padding:"6px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setSc("title")} style={{background:"none",border:"1px solid #333",borderRadius:3,color:"#666",padding:"3px 8px",cursor:"pointer",fontSize:10,fontFamily:F}}>← 逃げる</button>
        <div style={{color:stC,fontSize:9,fontWeight:700}}>{selSt?.label}</div>
        <div style={{color:"#FFE500",fontSize:10,fontWeight:700}}>XP:{xp+earned} | {qi+1}/{MAX_Q}</div>
      </div>
      <div style={{background:"linear-gradient(180deg,#1E293B 0%,#0F172A 60%,#1E293B 100%)",padding:"12px 10px",flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:7,minHeight:148,position:"relative"}}>
          <div style={{position:"relative"}}>
            <Enemy st={selSt} hit={eHit} hp={eHP} maxHP={selSt?.enemyHP||100}/>
            {dmg?.t==="e"&&<div style={{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",color:"#FF6B00",fontSize:22,fontWeight:900,textShadow:"0 0 10px #FF6B00",animation:"dmg .8s ease forwards",zIndex:10}}>{dmg.val}</div>}
          </div>
        </div>
        <div style={{background:"white",border:"2px solid #334155",borderRadius:6,padding:"10px 12px",marginBottom:6,position:"relative",minHeight:50,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          <div style={{position:"absolute",top:-1,left:8,background:"#0D0D1A",padding:"0 5px",color:"#475569",fontSize:8,fontWeight:700}}>【質問】<span style={{color:stC,marginLeft:4}}>— {q.cat}</span></div>
          <div style={{color:"#1E293B",fontSize:12,lineHeight:1.8,marginTop:4}}>{q.q}</div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:6}}>
          <div style={{background:"white",border:"2px solid #334155",borderRadius:6,padding:"8px 10px",flex:1,minWidth:0,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{color:"#475569",fontSize:8,fontWeight:700,marginBottom:5}}>【こたえる】</div>
            {showOpts&&q.opts.map((o,i)=>{
              let c="#1E293B";
              if(sel!==null){if(i===q.a)c="#4CAF50";else if(i===sel)c="#F44336";}
              return(
                <div key={i} onClick={()=>sel===null&&doAnswer(i)} style={{color:c,fontSize:10,padding:"3px 2px",cursor:sel===null?"pointer":"default",display:"flex",alignItems:"flex-start",gap:3,fontWeight:sel===null&&i===cur%4?"900":"400"}}>
                  <span style={{color:"#FFE500",opacity:sel===null&&i===cur%4?1:0,fontSize:8,marginTop:1,flexShrink:0}}>▶</span>
                  <span style={{fontSize:8,color:"#555",marginRight:2,flexShrink:0}}>{["Ａ","Ｂ","Ｃ","Ｄ"][i]}.</span>
                  <span style={{fontSize:10,lineHeight:1.5}}>{o}</span>
                </div>
              );
            })}
            {!showOpts&&!showMsg&&<div style={{color:"#555",fontSize:10,padding:"8px 0"}}>...</div>}
          </div>
          <div style={{background:"white",border:"2px solid #334155",borderRadius:6,padding:"7px 9px",width:92,flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{color:"#475569",fontSize:7,fontWeight:700,marginBottom:3,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{lv.name}</div>
            <div style={{position:"relative"}}>
              <PixelWeldon size={66} mood={mood} bounce={bounce} hit={wHit} col={lv.wCol}/>
              {dmg?.t==="p"&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",color:"#F44336",fontSize:16,fontWeight:900,animation:"dmg .8s ease forwards",zIndex:10}}>{dmg.val}</div>}
            </div>
            <div style={{marginTop:2}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                <span style={{color:"#555",fontSize:7}}>HP</span>
                <span style={{color:"#4CAF50",fontSize:7}}>{pHP}</span>
              </div>
              <HPBar v={pHP} max={lv.hp}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                <span style={{color:"#555",fontSize:7}}>問</span>
                <span style={{color:"#FFE500",fontSize:7}}>{qi+1}/{MAX_Q}</span>
              </div>
            </div>
          </div>
        </div>
        {showMsg&&(
          <div onClick={nextQ} style={{background:"white",border:"2px solid #334155",borderRadius:6,padding:"10px 12px",cursor:"pointer",position:"relative",minHeight:55,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
            <div style={{color:"#1E293B",fontSize:11,lineHeight:1.7,whiteSpace:"pre-line"}}>{msg}</div>
            {msgDone&&<div style={{position:"absolute",bottom:5,right:8,color:"#FFE500",fontSize:11,animation:"cursor 2s infinite"}}>▼</div>}
          </div>
        )}
      </div>
    </div>
  );

  // ── LEVEL UP ──
  if(sc==="lvlup") return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0F172A,#1E293B)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:F,padding:20,textAlign:"center",position:"relative"}}>
      <style>{css}</style>
      {[...Array(8)].map((_,i)=><div key={i} style={{position:"absolute",left:`${10+i*12}%`,top:`${15+((i*23)%70)}%`,fontSize:14,animation:`twinkle ${0.8+i*0.3}s ${i*0.2}s infinite`}}>✨</div>)}
      <div style={{animation:"lu .8s cubic-bezier(.34,1.56,.64,1) forwards"}}><PixelWeldon size={140} mood="happy" col={lv.wCol}/></div>
      <div style={{marginTop:14}}>
        <div style={{fontSize:10,color:"#FFE500",letterSpacing:5,marginBottom:6,textShadow:"0 0 20px #FFE500"}}>★ LEVEL UP! ★</div>
        <div style={{fontSize:46,fontWeight:900,color:"#FFE500",textShadow:"0 0 30px #FFE500"}}>Lv.{lv.level}</div>
        <div style={{fontSize:18,color:lv.color,fontWeight:700,marginTop:4,textShadow:`0 0 15px ${lv.color}`}}>{lv.name}</div>
      </div>
      <div style={{marginTop:10,color:"#666",fontSize:12}}>{prevLv?.name} → <span style={{color:lv.color}}>{lv.name}</span></div>
      <button onClick={()=>setSc("result")} style={{marginTop:22,background:"#0A0A1A",border:`2px solid ${lv.color}`,borderRadius:4,padding:"11px 30px",color:lv.color,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F}}>つぎへ ▶</button>
    </div>
  );

  // ── RESULT ──
  if(sc==="result") return(
    <div style={{minHeight:"100vh",background:"#F8FAFC",fontFamily:F,padding:14,display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"}}>
      <style>{css}</style>
      <div style={{background:"white",border:"2px solid #334155",borderRadius:8,padding:"14px",marginBottom:10,textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:9,color:"#888",letterSpacing:4,marginBottom:4}}>★ BATTLE RESULT ★</div>
        <div style={{fontSize:34,fontWeight:900,color:"#FFE500",textShadow:"0 0 20px #FFE500"}}>{score} / {MAX_Q}</div>
        <div style={{color:"#888",fontSize:10,marginTop:2}}>+{earned} XP</div>
        {/* STAGE2分岐の合否表示 */}
        {BRANCH_STAGES.some(b=>b.id===selSt?.id)&&(
          <div style={{marginTop:8,padding:"6px 10px",background:score>=MAX_Q*0.6?"#F0FDF4":"#FEF2F2",border:"1px solid "+(score>=MAX_Q*0.6?"#16A34A":"#DC2626"),borderRadius:4,fontSize:11,color:score>=MAX_Q*0.6?"#166534":"#991B1B"}}>
            {score>=MAX_Q*0.6
              ?("🎉 合格！ "+selSt.badge+" → STAGE 3解放！")
              :("不合格（"+score+"/"+MAX_Q+"）60%以上で合格 → 再挑戦しよう！")
            }
          </div>
        )}
        <div style={{display:"flex",justifyContent:"center",marginTop:8}}>
          <PixelWeldon size={85} mood={score>=MAX_Q*0.7?"happy":"neutral"} col={lv.wCol}/>
        </div>
      </div>
      <div style={{background:"white",border:"2px solid #334155",borderRadius:8,padding:"10px 12px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{color:lv.color,fontSize:11,fontWeight:700}}>{lv.name}</span>
          <span style={{color:"#FFE500",fontSize:10}}>XP: {xp}</span>
        </div>
        <div style={{background:"#E2E8F0",borderRadius:5,height:10,border:"1px solid #CBD5E1",overflow:"hidden"}}>
          <div style={{width:`${Math.min(100,((xp-lv.minXP)/((nxt?.minXP||lv.minXP+300)-lv.minXP))*100)}%`,height:"100%",background:lv.color,transition:"width .8s ease"}}/>
        </div>
        {nxt&&<div style={{color:"#555",fontSize:9,marginTop:2}}>「{nxt.name}」まで {nxt.minXP-xp} XP</div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:10,maxHeight:180,overflowY:"auto"}}>
        {ans.map((a,i)=>(
          <div key={i} style={{background:a.ok?"#F0FDF4":"#FEF2F2",border:"1px solid "+(a.ok?"#16A34A":"#DC2626"),borderRadius:3,padding:"7px 9px"}}>
            <div style={{color:a.ok?"#4CAF50":"#F44336",fontSize:10,fontWeight:700,marginBottom:2}}>{a.ok?"✅ 正解":"❌ 不正解"} — {a.cat}{a.ok&&<span style={{color:"#FFE500",marginLeft:4}}>+{a.xp}XP</span>}</div>
            <div style={{color:"#475569",fontSize:10,lineHeight:1.5}}>{a.exp}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:8}}>
        <button onClick={()=>startBattle(selSt)} style={{flex:1,background:"#0A0A1A",border:`2px solid ${stC}`,borderRadius:3,padding:"11px 0",color:stC,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F}}>🔥 もう一戦</button>
        <button onClick={()=>setSc("title")} style={{flex:1,background:"#0A0A1A",border:"2px solid #444",borderRadius:3,padding:"11px 0",color:"#777",fontSize:12,cursor:"pointer",fontFamily:F}}>🏠 タイトル</button>
      </div>
      <a href={FB} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",border:"1px solid #CBD5E1",borderRadius:8,padding:"9px 0",color:"#64748B",fontSize:10,fontFamily:F,textDecoration:"none",letterSpacing:1,background:"white"}}>📝 フィードバックを送る（アプリ改善にご協力ください）</a>
    </div>
  );

  return null;
}
