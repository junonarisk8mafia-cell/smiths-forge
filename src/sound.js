// ============================================================
// WELDON'S FORGE - サウンドエンジン
// Web Audio API による 8bit SE
// ============================================================
function createSound(){
  let ctx=null;
  function getCtx(){
    if(!ctx) ctx=new(window.AudioContext||window.webkitAudioContext)();
    return ctx;
  }
  function beep(f,d,t="square",v=0.12,dl=0){
    try{
      const c=getCtx(),o=c.createOscillator(),g=c.createGain();
      o.connect(g);g.connect(c.destination);
      o.type=t;o.frequency.value=f;
      g.gain.setValueAtTime(0,c.currentTime+dl);
      g.gain.linearRampToValueAtTime(v,c.currentTime+dl+0.01);
      g.gain.linearRampToValueAtTime(0,c.currentTime+dl+d);
      o.start(c.currentTime+dl);
      o.stop(c.currentTime+dl+d+0.05);
    }catch(e){}
  }
  return{
    // ✅ 正解：上昇アルペジオ
    correct(){ [523,659,784,1047].forEach((f,i)=>beep(f,0.12,"square",0.12,i*0.08)); },
    // ❌ 不正解：下降ブザー
    wrong(){ beep(300,0.1,"sawtooth",0.12,0); beep(200,0.15,"sawtooth",0.12,0.1); beep(150,0.2,"sawtooth",0.1,0.22); },
    // ⬆️ レベルアップ：ファンファーレ
    levelup(){ [[523,0.1],[659,0.1],[784,0.1],[1047,0.15],[784,0.08],[1047,0.3]].reduce((t,[f,d])=>{ beep(f,d,"square",0.13,t); return t+d+0.02; },0); },
    // 🗡️ 攻撃：敵ダメージ
    attack(){ beep(440,0.05,"square",0.1,0); beep(220,0.08,"sawtooth",0.08,0.05); },
    // 💥 被弾：自分ダメージ
    hurt(){ beep(180,0.15,"sawtooth",0.12,0); beep(120,0.1,"sawtooth",0.08,0.1); },
    // 🎮 バトル開始
    start(){ [262,330,392,523].forEach((f,i)=>beep(f,0.1,"square",0.1,i*0.06)); },
    // 🎊 変身イベント
    evolve(){ [[392,0.08],[440,0.08],[494,0.08],[523,0.08],[659,0.08],[784,0.15],[1047,0.4]].reduce((t,[f,d])=>{ beep(f,d,"square",0.13,t); return t+d+0.015; },0); },
  };
}

export const SFX = createSound();
