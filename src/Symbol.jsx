// ============================================================
// WELDON'S FORGE - 溶接記号＋図面の見方
// JISメイン＋AWS補足
// 小学生でもわかるやさしい説明
// ============================================================
import { useState } from "react";

const F = "'Courier New',monospace";

// ============================================================
// JIS溶接記号データ
// ============================================================
const JIS_SYMBOLS = [
  // ── 基本記号 ──
  {
    id:"j1", category:"基本記号", name:"突合せ溶接（I形）",
    symbol:"I", color:"#E85D04",
    emoji:"📏",
    easy:"2枚の板をそのままくっつける。一番シンプルな溶接。",
    detail:"開先なし（I形開先）の突合せ溶接。薄い板に使う。板を面一に合わせてそのまま溶接する。",
    svg: `<svg viewBox="0 0 120 60" width="120" height="60">
      <rect x="10" y="10" width="45" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <rect x="65" y="10" width="45" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <rect x="54" y="10" width="12" height="18" fill="#E85D04"/>
      <text x="60" y="50" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">I形開先</text>
    </svg>`,
  },
  {
    id:"j2", category:"基本記号", name:"V形突合せ溶接",
    symbol:"V", color:"#1D4ED8",
    emoji:"✌️",
    easy:"板の端をV字に削って溶接。よく現場で使う定番の形。",
    detail:"V形開先の突合せ溶接。板厚が厚いほど溶け込みが必要なのでV字に削る。開先角度は通常60°。",
    svg: `<svg viewBox="0 0 120 60" width="120" height="60">
      <polygon points="10,10 55,28 10,28" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <polygon points="110,10 65,28 110,28" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <polygon points="55,28 65,28 60,10" fill="#1D4ED8"/>
      <text x="60" y="50" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">V形開先</text>
    </svg>`,
  },
  {
    id:"j3", category:"基本記号", name:"レ形突合せ溶接（片側V形）",
    symbol:"レ", color:"#7C3AED",
    emoji:"✏️",
    easy:"片方だけV字に削る。鉄骨のスカラップ部分でよく使う。",
    detail:"片側だけ斜めに削ったレ形開先の突合せ溶接。AW検定の工場溶接でよく使われる。",
    svg: `<svg viewBox="0 0 120 60" width="120" height="60">
      <rect x="10" y="10" width="50" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <polygon points="110,10 65,28 110,28" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <polygon points="60,10 65,28 60,28" fill="#7C3AED"/>
      <text x="60" y="50" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">レ形開先</text>
    </svg>`,
  },
  {
    id:"j4", category:"基本記号", name:"すみ肉溶接",
    symbol:"△", color:"#D97706",
    emoji:"📐",
    easy:"直角に合わさった板の角をつなぐ。一番よく使う溶接！",
    detail:"T継手・角継手などで使用。記号は△（三角形）で表す。サイズ（脚長）と長さを記載する。",
    svg: `<svg viewBox="0 0 120 70" width="120" height="70">
      <rect x="10" y="30" width="100" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <rect x="52" y="10" width="16" height="40" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <polygon points="52,30 68,30 52,10" fill="#D97706"/>
      <text x="60" y="62" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">すみ肉溶接</text>
    </svg>`,
  },
  {
    id:"j5", category:"基本記号", name:"裏波溶接（▽）",
    symbol:"▽", color:"#0891B2",
    emoji:"🔄",
    easy:"板の裏側まで溶かして、裏にもビードを出す溶接。完全に貫通させる！",
    detail:"完全溶込み溶接で裏面にビードを出す。記号は▽（逆三角形）。パイプ溶接などで必須。",
    svg: `<svg viewBox="0 0 120 70" width="120" height="70">
      <rect x="10" y="20" width="45" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <rect x="65" y="20" width="45" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <polygon points="55,20 65,20 60,38" fill="#0891B2"/>
      <ellipse cx="60" cy="40" rx="8" ry="4" fill="#0891B2" opacity="0.6"/>
      <text x="60" y="58" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">裏波あり</text>
    </svg>`,
  },
  {
    id:"j6", category:"基本記号", name:"プラグ溶接・スロット溶接",
    symbol:"○", color:"#166534",
    emoji:"🔘",
    easy:"穴をあけてその中を溶接で埋める。重ね板を固定するときに使う。",
    detail:"重ね継手で穴（円形＝プラグ、長穴＝スロット）を設けてその中を溶接する。デッキプレート溶接に多用。",
    svg: `<svg viewBox="0 0 120 70" width="120" height="70">
      <rect x="10" y="35" width="100" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <rect x="10" y="15" width="100" height="18" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5"/>
      <circle cx="60" cy="24" r="8" fill="#166534"/>
      <text x="60" y="62" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">プラグ溶接</text>
    </svg>`,
  },

  // ── 補助記号 ──
  {
    id:"j7", category:"補助記号", name:"現場溶接（旗マーク）",
    symbol:"🚩", color:"#DC2626",
    emoji:"🚩",
    easy:"工場じゃなくて現場でやる溶接！旗みたいなマークがついてたら現場溶接。",
    detail:"基線の折れ点に旗マーク（△）を付ける。工場で溶接できない現場組立部分に使用。",
    svg: `<svg viewBox="0 0 120 60" width="120" height="60">
      <line x1="20" y1="50" x2="20" y2="10" stroke="#475569" strokeWidth="2"/>
      <line x1="20" y1="30" x2="100" y2="30" stroke="#475569" strokeWidth="2"/>
      <polygon points="20,10 20,30 40,20" fill="#DC2626"/>
      <text x="60" y="52" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">現場溶接マーク</text>
    </svg>`,
  },
  {
    id:"j8", category:"補助記号", name:"全周溶接（○マーク）",
    symbol:"○", color:"#0891B2",
    emoji:"⭕",
    easy:"ぐるっと一周全部溶接！基線の折れ点に丸がついてたら全部溶接する。",
    detail:"基線の折れ点に○を付ける。部材の周囲全体を溶接することを示す。パイプの取合い部などに使用。",
    svg: `<svg viewBox="0 0 120 60" width="120" height="60">
      <line x1="20" y1="50" x2="20" y2="10" stroke="#475569" strokeWidth="2"/>
      <line x1="20" y1="30" x2="100" y2="30" stroke="#475569" strokeWidth="2"/>
      <circle cx="20" cy="30" r="6" fill="none" stroke="#0891B2" strokeWidth="2.5"/>
      <text x="60" y="52" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">全周溶接マーク</text>
    </svg>`,
  },
  {
    id:"j9", category:"補助記号", name:"表面仕上げ記号",
    symbol:"～", color:"#7C3AED",
    emoji:"✨",
    easy:"溶接した後にグラインダーなどで表面をきれいにすること。波線マークがヒント！",
    detail:"溶接後に機械加工・グラインダー仕上げなどで余盛を除去することを指示する記号。",
    svg: `<svg viewBox="0 0 120 60" width="120" height="60">
      <rect x="10" y="20" width="45" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <rect x="65" y="20" width="45" height="18" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5"/>
      <path d="M45,20 Q52,14 60,20 Q68,26 75,20" fill="none" stroke="#7C3AED" strokeWidth="2.5"/>
      <text x="60" y="50" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">表面仕上げ</text>
    </svg>`,
  },
];

// ============================================================
// 図面の見方データ
// ============================================================
const DRAWING_BASICS = [
  {
    id:"d1", title:"溶接記号の基本構造",
    emoji:"📐",
    color:"#E85D04",
    easy:"溶接記号は「矢」と「基線」と「記号」の3つでできている！",
    items:[
      {label:"矢（や）", desc:"どこを溶接するか指差している線。ここが「矢側（やがわ）」！"},
      {label:"基線（きせん）", desc:"水平な線。ここに溶接の情報を全部書く。"},
      {label:"記号", desc:"どんな溶接をするか表す形（△・V・Iなど）。基線の上か下に書く。"},
      {label:"上側＝反矢側", desc:"基線の上に記号 → 矢の反対側を溶接する。"},
      {label:"下側＝矢側", desc:"基線の下に記号 → 矢が指している側を溶接する。"},
    ],
    svg:`<svg viewBox="0 0 200 120" width="200" height="120">
      <line x1="40" y1="100" x2="100" y2="60" stroke="#E85D04" strokeWidth="2.5"/>
      <line x1="100" y1="60" x2="170" y2="60" stroke="#475569" strokeWidth="2.5"/>
      <polygon points="40,100 50,88 52,100" fill="#E85D04"/>
      <polygon points="100,60 110,50 115,60" fill="#1D4ED8"/>
      <text x="40" y="115" fill="#E85D04" fontSize="9" fontFamily="monospace">矢（や）</text>
      <text x="125" y="55" fill="#475569" fontSize="9" fontFamily="monospace">基線</text>
      <text x="108" y="44" fill="#1D4ED8" fontSize="9" fontFamily="monospace">記号（反矢側）</text>
    </svg>`,
  },
  {
    id:"d2", title:"寸法の書き方",
    emoji:"📏",
    color:"#1D4ED8",
    easy:"記号の左に数字＝サイズ（太さ）、右に数字＝長さ！",
    items:[
      {label:"サイズ（左の数字）", desc:"すみ肉溶接なら脚長（きゃくちょう）。溶接の「太さ」。"},
      {label:"長さ（右の数字）", desc:"どのくらいの長さを溶接するか。"},
      {label:"数×ピッチ", desc:"「3×50(100)」なら「長さ50mmを100mm間隔で3か所」溶接。"},
      {label:"例：△6-150", desc:"脚長6mmのすみ肉溶接を150mmの長さで行う。"},
    ],
    svg:`<svg viewBox="0 0 200 80" width="200" height="80">
      <line x1="20" y1="50" x2="20" y2="20" stroke="#475569" strokeWidth="2"/>
      <line x1="20" y1="35" x2="180" y2="35" stroke="#475569" strokeWidth="2"/>
      <polygon points="80,35 90,25 95,35" fill="#1D4ED8"/>
      <text x="60" y="32" fill="#D97706" fontSize="11" fontFamily="monospace" fontWeight="bold">6</text>
      <text x="100" y="32" fill="#DC2626" fontSize="11" fontFamily="monospace" fontWeight="bold">150</text>
      <text x="55" y="62" fill="#D97706" fontSize="9" fontFamily="monospace">↑サイズ</text>
      <text x="100" y="62" fill="#DC2626" fontSize="9" fontFamily="monospace">↑長さ</text>
    </svg>`,
  },
  {
    id:"d3", title:"三面図の基本（正面・側面・平面）",
    emoji:"📦",
    color:"#D97706",
    easy:"箱を3方向から見た図。正面・横・上から見た3枚の絵！",
    items:[
      {label:"正面図（せいめんず）", desc:"正面から見た形。一番大事な図。"},
      {label:"側面図（そくめんず）", desc:"横から見た形。右側から見ることが多い。"},
      {label:"平面図（へいめんず）", desc:"上から見た形。俯瞰（ふかん）図ともいう。"},
      {label:"配置ルール", desc:"正面図の右に側面図、正面図の上に平面図を置く。"},
    ],
    svg:`<svg viewBox="0 0 200 120" width="200" height="120">
      <rect x="10" y="40" width="70" height="70" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="90" y="40" width="50" height="70" fill="#F0FDF4" stroke="#166534" strokeWidth="1.5"/>
      <rect x="10" y="5"  width="70" height="30" fill="#FFF7ED" stroke="#D97706" strokeWidth="1.5"/>
      <text x="45" y="80"  textAnchor="middle" fill="#1D4ED8" fontSize="9" fontFamily="monospace">正面図</text>
      <text x="115" y="80" textAnchor="middle" fill="#166534" fontSize="9" fontFamily="monospace">側面図</text>
      <text x="45" y="24"  textAnchor="middle" fill="#D97706" fontSize="9" fontFamily="monospace">平面図</text>
    </svg>`,
  },
  {
    id:"d4", title:"線の種類と意味",
    emoji:"✏️",
    color:"#7C3AED",
    easy:"図面の線にはルールがある！太さと形で意味が変わる。",
    items:[
      {label:"太い実線（───）", desc:"見えている輪郭線。一番大事な線。"},
      {label:"細い実線（───）", desc:"寸法線・引出線・ハッチング。補助的な線。"},
      {label:"破線（- - -）",    desc:"隠れて見えない線（かくれ線）。裏側の形。"},
      {label:"一点鎖線（－・－）",desc:"中心線（ちゅうしんせん）。穴や丸の中心。"},
      {label:"二点鎖線（－‥－）",desc:"想像線。参考のために書く線。"},
    ],
    svg:`<svg viewBox="0 0 200 110" width="200" height="110">
      <line x1="10" y1="15" x2="90" y2="15" stroke="#1E293B" strokeWidth="3"/>
      <text x="100" y="19" fill="#1E293B" fontSize="9" fontFamily="monospace">太い実線（輪郭）</text>
      <line x1="10" y1="35" x2="90" y2="35" stroke="#1E293B" strokeWidth="1"/>
      <text x="100" y="39" fill="#1E293B" fontSize="9" fontFamily="monospace">細い実線（寸法）</text>
      <line x1="10" y1="55" x2="90" y2="55" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="6,4"/>
      <text x="100" y="59" fill="#1E293B" fontSize="9" fontFamily="monospace">破線（かくれ線）</text>
      <line x1="10" y1="75" x2="90" y2="75" stroke="#1E293B" strokeWidth="1" strokeDasharray="12,3,2,3"/>
      <text x="100" y="79" fill="#1E293B" fontSize="9" fontFamily="monospace">一点鎖線（中心）</text>
      <line x1="10" y1="95" x2="90" y2="95" stroke="#1E293B" strokeWidth="1" strokeDasharray="12,3,2,3,2,3"/>
      <text x="100" y="99" fill="#1E293B" fontSize="9" fontFamily="monospace">二点鎖線（想像）</text>
    </svg>`,
  },
  {
    id:"d5", title:"溶接記号の読み方（実例）",
    emoji:"🔍",
    color:"#DC2626",
    easy:"実際の図面に書いてある記号を読んでみよう！",
    items:[
      {label:"△6", desc:"脚長6mmのすみ肉溶接。記号の左の数字がサイズ。"},
      {label:"△6-200", desc:"脚長6mm・長さ200mmのすみ肉溶接。"},
      {label:"△6(200)", desc:"断続すみ肉溶接。長さ6mmをサイズ、200mmをピッチとする場合も。図面の凡例を確認！"},
      {label:"▽V", desc:"V形開先で裏波あり（▽）の完全溶込み溶接。パイプ溶接の基本。"},
      {label:"🚩△6", desc:"現場溶接でのすみ肉溶接6mm。旗マーク＝現場！"},
    ],
    svg:`<svg viewBox="0 0 200 90" width="200" height="90">
      <line x1="30" y1="80" x2="80" y2="50" stroke="#E85D04" strokeWidth="2"/>
      <line x1="80" y1="50" x2="170" y2="50" stroke="#475569" strokeWidth="2"/>
      <polygon points="80,50 90,40 95,50" fill="#DC2626"/>
      <text x="70" y="47" fill="#D97706" fontSize="12" fontFamily="monospace" fontWeight="bold">6</text>
      <text x="96" y="47" fill="#DC2626" fontSize="12" fontFamily="monospace" fontWeight="bold">-200</text>
      <text x="60" y="30" fill="#475569" fontSize="9" fontFamily="monospace">↑脚長6mm</text>
      <text x="96" y="30" fill="#DC2626" fontSize="9" fontFamily="monospace">↑長さ200mm</text>
      <text x="80" y="78" fill="#D97706" fontSize="9" fontFamily="monospace">すみ肉溶接の例</text>
    </svg>`,
  },
];

// ============================================================
// AWSとJISの違い（補足）
// ============================================================
const AWS_VS_JIS = [
  {item:"基線上側の記号", jis:"反矢側（Arrow Sideの反対）", aws:"反矢側（Other Side）", note:"同じ意味！ただし英語"},
  {item:"基線下側の記号", jis:"矢側（Arrow Side）", aws:"矢側（Arrow Side）", note:"同じ！"},
  {item:"現場溶接", jis:"旗マーク（△）", aws:"旗マーク（同じ形）", note:"ほぼ同じ"},
  {item:"全周溶接", jis:"○（基線折れ点）", aws:"○（同じ位置）", note:"同じ！"},
  {item:"すみ肉サイズ", jis:"記号左に脚長", aws:"記号左に脚長（同じ）", note:"同じ書き方"},
  {item:"仕上げ記号", jis:"波線（～）", aws:"C/M/G等の英字", note:"ここが違う！"},
  {item:"溶接プロセス", jis:"記載なし（慣例）", aws:"テールに英字（SMAW等）", note:"AWは詳細記載"},
];

// ============================================================
// Symbol画面コンポーネント
// ============================================================
export function SymbolScreen(){
  const [tab, setTab]   = useState("jis");     // jis / draw / aws
  const [open, setOpen] = useState(null);

  return(
    <div style={{display:"flex",flexDirection:"column"}}>

      {/* サブタブ */}
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {[
          {id:"jis",  l:"🔣 JIS記号"},
          {id:"draw", l:"📐 図面の見方"},
          {id:"aws",  l:"🇺🇸 JIS vs AWS"},
        ].map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setOpen(null);}} style={{
            flex:1,padding:"7px 0",border:"none",
            borderBottom:`3px solid ${tab===t.id?"#E85D04":"transparent"}`,
            background:"white",color:tab===t.id?"#1E293B":"#94A3B8",
            fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:F,
            borderRadius:"6px 6px 0 0",
          }}>{t.l}</button>
        ))}
      </div>

      {/* ── JIS記号タブ ── */}
      {tab==="jis"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{background:"#FFF7ED",border:"1px solid #FED7AA",borderRadius:10,padding:"9px 12px",marginBottom:4}}>
            <div style={{color:"#C2410C",fontSize:10,fontWeight:700}}>💡 溶接記号の読み方</div>
            <div style={{color:"#92400E",fontSize:9,lineHeight:1.6,marginTop:2}}>
              タップすると詳しい説明とイラストが見られるよ！まずは△（すみ肉）とV（突合せ）を覚えよう。
            </div>
          </div>

          {/* カテゴリごとに分類 */}
          {["基本記号","補助記号"].map(cat=>(
            <div key={cat}>
              <div style={{color:"#475569",fontSize:9,fontWeight:700,padding:"4px 8px",background:"#F1F5F9",borderRadius:6,marginBottom:5}}>{cat}</div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {JIS_SYMBOLS.filter(s=>s.category===cat).map(s=>{
                  const isO=open===s.id;
                  return(
                    <div key={s.id} onClick={()=>setOpen(isO?null:s.id)} style={{
                      background:isO?`${s.color}08`:"white",
                      border:`1px solid ${isO?s.color:"#E2E8F0"}`,
                      borderRadius:10,padding:"10px 12px",cursor:"pointer",
                      transition:"all .2s",
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{
                          width:40,height:40,borderRadius:8,
                          background:`${s.color}15`,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:20,flexShrink:0,
                        }}>{s.emoji}</div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{background:`${s.color}15`,border:`1px solid ${s.color}40`,color:s.color,fontSize:12,padding:"1px 8px",borderRadius:20,fontWeight:900,fontFamily:F}}>{s.symbol}</span>
                            <span style={{color:"#1E293B",fontSize:11,fontWeight:700}}>{s.name}</span>
                          </div>
                          <div style={{color:"#64748B",fontSize:10,marginTop:3,lineHeight:1.5}}>{s.easy}</div>
                        </div>
                        <span style={{color:s.color,fontSize:10}}>{isO?"▲":"▼"}</span>
                      </div>

                      {isO&&(
                        <div style={{marginTop:10,borderTop:`1px solid ${s.color}20`,paddingTop:10}}>
                          {/* SVGイラスト */}
                          <div style={{background:`${s.color}08`,borderRadius:8,padding:10,marginBottom:8,display:"flex",justifyContent:"center"}}
                            dangerouslySetInnerHTML={{__html:s.svg}}
                          />
                          {/* 詳細説明 */}
                          <div style={{background:"#F8FAFC",borderRadius:8,padding:"8px 10px"}}>
                            <div style={{color:"#475569",fontSize:9,fontWeight:700,marginBottom:3}}>📖 詳しい説明</div>
                            <div style={{color:"#1E293B",fontSize:11,lineHeight:1.7}}>{s.detail}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 図面の見方タブ ── */}
      {tab==="draw"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:10,padding:"9px 12px",marginBottom:4}}>
            <div style={{color:"#1D4ED8",fontSize:10,fontWeight:700}}>💡 図面を読めると仕事の幅が広がる！</div>
            <div style={{color:"#1E40AF",fontSize:9,lineHeight:1.6,marginTop:2}}>
              小学生でもわかるように説明してるよ。まず「記号の基本構造」から読もう！
            </div>
          </div>

          {DRAWING_BASICS.map(d=>{
            const isO=open===d.id;
            return(
              <div key={d.id} onClick={()=>setOpen(isO?null:d.id)} style={{
                background:isO?`${d.color}08`:"white",
                border:`1px solid ${isO?d.color:"#E2E8F0"}`,
                borderRadius:10,padding:"10px 12px",cursor:"pointer",
                transition:"all .2s",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:40,height:40,borderRadius:8,background:`${d.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{d.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{color:d.color,fontSize:11,fontWeight:700}}>{d.title}</div>
                    <div style={{color:"#64748B",fontSize:10,marginTop:2,lineHeight:1.5}}>{d.easy}</div>
                  </div>
                  <span style={{color:d.color,fontSize:10}}>{isO?"▲":"▼"}</span>
                </div>

                {isO&&(
                  <div style={{marginTop:10,borderTop:`1px solid ${d.color}20`,paddingTop:10}}>
                    {/* SVGイラスト */}
                    <div style={{background:`${d.color}08`,borderRadius:8,padding:10,marginBottom:8,display:"flex",justifyContent:"center"}}
                      dangerouslySetInnerHTML={{__html:d.svg}}
                    />
                    {/* 項目リスト */}
                    <div style={{display:"flex",flexDirection:"column",gap:5}}>
                      {d.items.map((item,i)=>(
                        <div key={i} style={{background:"#F8FAFC",borderRadius:7,padding:"7px 10px",border:"1px solid #E2E8F0"}}>
                          <div style={{color:d.color,fontSize:10,fontWeight:700,marginBottom:2}}>📌 {item.label}</div>
                          <div style={{color:"#1E293B",fontSize:11,lineHeight:1.6}}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── JIS vs AWS タブ ── */}
      {tab==="aws"&&(
        <div>
          <div style={{background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:10,padding:"9px 12px",marginBottom:10}}>
            <div style={{color:"#991B1B",fontSize:10,fontWeight:700}}>⚠️ JISとAWSは混同注意！</div>
            <div style={{color:"#7F1D1D",fontSize:9,lineHeight:1.6,marginTop:2}}>
              海外の図面を読むときはAWS規格。ほとんど同じだけど、仕上げ記号など違う部分がある！
            </div>
          </div>

          {/* 比較表 */}
          <div style={{background:"white",borderRadius:10,overflow:"hidden",border:"1px solid #E2E8F0",marginBottom:10}}>
            {/* ヘッダー */}
            <div style={{display:"flex",background:"#1E293B",padding:"8px 10px"}}>
              <div style={{flex:1.5,color:"#94A3B8",fontSize:9,fontWeight:700}}>項目</div>
              <div style={{flex:2,color:"#60A5FA",fontSize:9,fontWeight:700}}>🇯🇵 JIS</div>
              <div style={{flex:2,color:"#F87171",fontSize:9,fontWeight:700}}>🇺🇸 AWS</div>
            </div>
            {/* データ行 */}
            {AWS_VS_JIS.map((row,i)=>(
              <div key={i} style={{display:"flex",padding:"8px 10px",background:i%2===0?"#F8FAFC":"white",borderBottom:"1px solid #F1F5F9",alignItems:"flex-start"}}>
                <div style={{flex:1.5,color:"#475569",fontSize:9,fontWeight:600,paddingRight:4}}>{row.item}</div>
                <div style={{flex:2,color:"#1E3A8A",fontSize:9,paddingRight:4,lineHeight:1.5}}>{row.jis}</div>
                <div style={{flex:2,color:"#991B1B",fontSize:9,lineHeight:1.5}}>{row.aws}</div>
              </div>
            ))}
          </div>

          {/* ポイントまとめ */}
          <div style={{background:"#F0FDF4",border:"1px solid #86EFAC",borderRadius:10,padding:"10px 12px"}}>
            <div style={{color:"#166534",fontSize:10,fontWeight:700,marginBottom:6}}>✅ 覚えるポイント</div>
            {[
              "基本的な記号の形（△V▽など）はJISもAWSもほぼ同じ！",
              "基線の上下の意味もJIS・AWSとも同じ（上＝反矢側・下＝矢側）",
              "仕上げ記号はAWSだとC（チッピング）・M（機械仕上げ）・G（グラインダー）と英字で書く",
              "AWプロセスはAWSではテール部分に「SMAW」「GMAW」などと書く",
              "日本の現場ではほぼJIS。海外・船舶・プラントではAWSやISOが混在する",
            ].map((p,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:5}}>
                <span style={{color:"#16A34A",fontSize:11,flexShrink:0}}>✓</span>
                <div style={{color:"#1E293B",fontSize:10,lineHeight:1.6}}>{p}</div>
              </div>
            ))}
          </div>

          <div style={{height:20}}/>
        </div>
      )}
    </div>
  );
}
