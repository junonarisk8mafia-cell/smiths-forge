// ============================================================
// WELDON'S FORGE — ENGLISH VERSION
// questions_en.js
//
// Target: Foreign welding trainees working in Japan
// Standard: JIS (Japan Industrial Standards)
// Features: Japanese terms + Romaji + English explanations
//           Real workplace slang from Japanese job sites
// ============================================================

export const QUIZ_STAGES = [
  // ──────────────────────────────────────────────────────────
  // STAGE 1 — Legal Permits & Safety
  // ──────────────────────────────────────────────────────────
  {
    stageId: 1,
    label: "STAGE 1 — Legal Permits & Safety",
    color: "#E85D04",
    icon: "🛡️",
    unlockXP: 0,
    questions: [
      {
        id: 1, cat: "Legal Permits",
        q: "You just arrived at a Japanese welding site. Which certificate do you LEGALLY need before touching any welding machine?",
        opts: [
          "JIS Welder Certification — takes months of practice",
          "No certificate needed for foreign workers",
          "Arc Welding Safety Training Certificate — 'Aaku-yosetsu tokubetsu-kyoiku' (アーク溶接特別教育)",
          "Boiler Welder License — national exam required"
        ],
        a: 2, xp: 15,
        exp: "Japanese law (労働安全衛生法) requires the Arc Welding Safety Training Certificate before ANY welding work. 3-day course, approx ¥20,000–40,000. No certificate = illegal to work. No exceptions."
      },
      {
        id: 2, cat: "Legal Permits",
        q: "Your supervisor hands you a grinder. What certificate allows you to use it legally in Japan?",
        opts: [
          "Arc Welding Safety Training is enough",
          "No certificate needed for grinding",
          "Forklift License",
          "Grinding Wheel Safety Training — 'Jiyu-kensakutoishi tokubetsu-kyoiku' (自由研削といし特別教育)"
        ],
        a: 3, xp: 15,
        exp: "The Grinding Wheel Safety Training (自由研削といし特別教育) is a separate 1-day course (~¥10,000) required by law before using angle grinders or disc grinders. Many trainees forget this one — don't."
      },
      {
        id: 3, cat: "Legal Permits",
        q: "You need to switch on the welding machine's power panel. Which additional certificate is legally required for this in Japan?",
        opts: [
          "Arc Welding Safety Training already covers this",
          "Low-Voltage Electrical Safety Training — 'Teiatsu-denki toriatsukai tokubetsu-kyoiku' (低圧電気取扱特別教育)",
          "Forklift License",
          "No certificate needed for power switches"
        ],
        a: 1, xp: 15,
        exp: "Low-Voltage Electrical Safety Training (低圧電気取扱特別教育) is required to operate or touch electrical panels of welding machines (AC 600V or below, DC 750V or below). 1–2 days, approx ¥12,000–22,000."
      },
      {
        id: 4, cat: "Legal Permits",
        q: "A heavy steel plate needs to be lifted by crane. You attach the wire rope to the plate. What certification do you need for this work?",
        opts: [
          "Crane Operator License only",
          "No certification needed — just use common sense",
          "Rigging Certification — 'Tamakake gino-koshu' (玉掛け技能講習)",
          "Forklift License"
        ],
        a: 2, xp: 15,
        exp: "Tamakake (玉掛け) is the act of attaching loads to crane hooks for lifting. The Tamakake Gino-koshu (玉掛け技能講習) takes 3 days (~¥20,000–40,000) and legally covers loads of 1 ton or more. Without it, you cannot hook up steel for lifting."
      },
      {
        id: 5, cat: "Legal Permits",
        q: "What is the difference between 'tokubetsu-kyoiku' (特別教育) and 'gino-koshu' (技能講習) in Japan?",
        opts: [
          "They are the same thing with different names",
          "Tokubetsu-kyoiku is for managers only",
          "Tokubetsu-kyoiku = safety training course (no exam). Gino-koshu = skills training with a qualification test — broader work scope",
          "Gino-koshu is only for Japanese nationals"
        ],
        a: 2, xp: 20,
        exp: "Key difference: Tokubetsu-kyoiku (特別教育) is a safety lecture — attend and you pass. Gino-koshu (技能講習) involves actual skills training with a pass/fail test, and unlocks a wider range of work. Example: Tamakake tokubetsu-kyoiku = under 1t only. Tamakake gino-koshu = 1t and above."
      },
      {
        id: 6, cat: "Legal Permits",
        q: "Since 2022, working at heights above 2 meters in Japan requires what safety training?",
        opts: [
          "A hard hat is sufficient — no training required",
          "Aerial Work Platform License only",
          "Full Harness Safety Training — 'Furu-hanesu tokubetsu-kyoiku' (フルハーネス特別教育)",
          "Crane Operator License"
        ],
        a: 2, xp: 15,
        exp: "Since February 2022, Japanese law requires Full Harness Safety Training (フルハーネス特別教育) for working at heights of 2 meters or more. 1-day course, approx ¥10,000. Traditional body belts (胴ベルト) are now restricted — full harness is mandatory."
      },
      {
        id: 7, cat: "Legal Permits",
        q: "You want BOTH 'Tamakake' (玉掛け) and 'Kurēn' (クレーン) operation certificates. What is the smartest approach?",
        opts: [
          "Get Crane first — then Tamakake",
          "Only Tamakake is needed — Crane is optional",
          "Take the combo course (セット講習) — same result in 4–5 days, cheaper overall (~¥70,000–80,000)",
          "Take them separately for more thorough training"
        ],
        a: 2, xp: 20,
        exp: "Many training centers offer a combo course (玉掛け + クレーン運転特別教育セット). You get both certificates in 4–5 days at a discounted total price (~¥70,000–80,000). Much smarter than taking them separately."
      },
      {
        id: 8, cat: "Legal Permits",
        q: "A forklift at the factory has a maximum load capacity of 2 tons. What certificate do you need to operate it?",
        opts: [
          "Any driving license works",
          "Forklift Safety Training (under 1t only — tokubetsu-kyoiku)",
          "No certificate needed inside a factory",
          "Forklift Skills Training — 'Fokku-rifuto gino-koshu' (フォークリフト運転技能講習) — covers 1t and above"
        ],
        a: 3, xp: 20,
        exp: "For forklifts of 1 ton or more, you need the Forklift Skills Training (技能講習), which takes 3 days (~¥40,000–60,000). The tokubetsu-kyoiku (特別教育) only covers under 1 ton. A 2-ton forklift = gino-koshu required."
      },
      {
        id: 9, cat: "Safety",
        q: "In a Japanese workplace, you see the sign '禁止' (Kinshi). What does it mean?",
        opts: [
          "Caution — proceed carefully",
          "Emergency exit this way",
          "Required — must wear PPE",
          "Prohibited — do NOT do this"
        ],
        a: 3, xp: 15,
        exp: "禁止 (Kinshi) = PROHIBITED. Common signs: 立入禁止 (Tachiiri-kinshi) = No entry, 溶接禁止 (Yosetsu-kinshi) = No welding here. Learn these — they protect your life."
      },
      {
        id: 10, cat: "Safety",
        q: "What is 'Sanso-keppitsu' (酸素欠乏 / さんそけっぴつ) and why is it dangerous for welders?",
        opts: [
          "Excess oxygen — causes fire risk",
          "Oxygen deficiency — shielding gas can displace oxygen in enclosed spaces, causing loss of consciousness and death",
          "Carbon monoxide — only dangerous outdoors",
          "A type of welding defect"
        ],
        a: 1, xp: 20,
        exp: "Sanso-keppitsu (酸素欠乏) = Oxygen Deficiency. In confined spaces (tanks, holds, enclosed rooms), shielding gas (CO₂, Argon) can push out oxygen. Below 18% O₂ = danger. Below 16% = blackout. Measure oxygen levels BEFORE entering any enclosed welding area."
      },
      {
        id: 11, cat: "Safety",
        q: "What is 'Yosetsu-hyumu' (溶接ヒューム / ようせつヒューム) and what PPE do you need?",
        opts: [
          "Welding sparks — need leather gloves only",
          "Welding fumes — tiny metal particles in smoke; require dust respirator (防じんマスク) rated for welding fumes",
          "Shielding gas — only CO₂ is dangerous",
          "Welding noise — require ear protection only"
        ],
        a: 1, xp: 20,
        exp: "Welding fumes (溶接ヒューム) contain fine metal particles including manganese, chromium, and other compounds. Long-term exposure causes lung disease (じん肺). Japanese law requires a dust respirator (防じんマスク) rated for welding fumes. Always ventilate the work area."
      },
      {
        id: 12, cat: "Safety",
        q: "What shade number (遮光番号 / しゃこうばんごう) welding helmet lens is recommended for semi-auto welding at around 150A?",
        opts: [
          "Shade #3–4 — standard sunglasses level",
          "Shade #16 or higher — maximum protection",
          "Shade #1 — nearly clear lens",
          "Shade #10–11 — standard for 100–200A arc welding"
        ],
        a: 3, xp: 20,
        exp: "For arc welding at 100–200A, JIS recommends shade #10–11 (遮光番号10〜11). Higher current = higher shade number. A normal welding helmet without the correct shade glass can cause serious eye damage (arc eye / 電気性眼炎 / でんきせいがんえん). Never look at an arc without proper protection."
      },
      {
        id: 13, cat: "Safety",
        q: "A welder receives an electric shock. What is the FIRST action to take?",
        opts: [
          "Pour water on the victim immediately",
          "Try to pull the victim away with your bare hands",
          "Turn OFF the power source first — then move the victim safely — then call for help",
          "Shake the victim hard to wake them up"
        ],
        a: 2, xp: 25,
        exp: "Electric shock first response: 1) CUT THE POWER — turn off the machine or breaker. 2) Do NOT touch the victim while power is on — you will be shocked too. 3) Move victim to safety. 4) Call 119 (Japanese emergency). 5) Perform CPR if trained. Wet hands or wet ground dramatically increase electrocution risk."
      },
      {
        id: 14, cat: "Safety",
        q: "Before welding inside a tank or enclosed space, what must you check FIRST?",
        opts: [
          "The brand of shielding gas",
          "The wire spool size",
          "Oxygen concentration (酸素濃度 / さんそのうど) AND harmful gas levels — then ensure ventilation",
          "The welding machine's serial number"
        ],
        a: 2, xp: 25,
        exp: "Before entering any enclosed space in Japan, you MUST measure oxygen concentration (酸素濃度) — must be above 18%. Also check for CO, hydrogen, and other hazardous gases. Set up forced ventilation. In Japan, this is covered by the Oxygen Deficiency Hazard Work Certification (酸素欠乏危険作業特別教育)."
      },
      {
        id: 15, cat: "Safety",
        q: "What does the Japanese term 'Anzen-gutsu' (安全靴 / あんぜんぐつ) refer to, and why is it required on welding sites?",
        opts: [
          "Safety rope for working at heights",
          "Steel-toe safety boots — protects feet from falling steel plates, hot spatter, and heavy objects",
          "Fire-resistant welding jacket",
          "A type of fire extinguisher"
        ],
        a: 1, xp: 15,
        exp: "Anzen-gutsu (安全靴) = Safety boots with steel toe caps. Required by law on all Japanese construction and manufacturing sites. Must meet JIS T 8101 standards. Regular shoes or sneakers are strictly prohibited. Your company will inspect your footwear."
      },
      {
        id: 16, cat: "Legal Permits",
        q: "Which of these certificates is NOT typically required on a standard Japanese welding site?",
        opts: [
          "Arc Welding Safety Training (アーク溶接特別教育)",
          "Grinding Wheel Safety Training (自由研削といし特別教育)",
          "Driver's License for operating welding equipment",
          "Low-Voltage Electrical Safety Training (低圧電気取扱特別教育)"
        ],
        a: 2, xp: 20,
        exp: "A standard driving license does NOT qualify you to operate welding equipment, cranes, or forklifts on a Japanese job site. Each piece of equipment has its own specific safety training or license requirement under Japanese labor law."
      },
      {
        id: 17, cat: "Safety",
        q: "Your welding area has poor ventilation. What is the MINIMUM action you must take before starting?",
        opts: [
          "Weld quickly and take breaks often",
          "Open a window nearby — that is enough",
          "Set up local exhaust ventilation (局所排気装置 / きょくしょはいきそうち) or portable ventilation fans to remove welding fumes at the source",
          "No action needed — welding fumes are harmless in small amounts"
        ],
        a: 2, xp: 20,
        exp: "Japanese law requires proper ventilation for welding areas. Local exhaust ventilation (局所排気装置) captures fumes at the source — this is the most effective method. Portable fans blowing fresh air also help. In confined spaces, forced ventilation is legally mandatory."
      },
      {
        id: 18, cat: "Safety",
        q: "What does 'Maekake' (前掛け / まえかけ) protect you from during welding?",
        opts: [
          "Electric shock from the welding machine",
          "Fumes and toxic gases",
          "Spatter, sparks, and infrared radiation on your torso and legs — it is a leather welding apron",
          "High-frequency noise from arc welding"
        ],
        a: 2, xp: 15,
        exp: "Maekake (前掛け) = leather welding apron. Protects your body from hot spatter, sparks, and radiant heat. Required for overhead (かちあげ / Kachiage) welding where spatter falls on you. Pair with ude-kabaa (腕カバー / arm sleeves) for full coverage."
      },
      {
        id: 19, cat: "Legal Permits",
        q: "For the 'Tamakake' (玉掛け) certificate, what is the work scope difference between the 'tokubetsu-kyoiku' (特別教育) and 'gino-koshu' (技能講習) versions?",
        opts: [
          "Both cover all load weights — no difference",
          "Tokubetsu-kyoiku covers loads under 1 ton only. Gino-koshu covers 1 ton and above (all weights)",
          "Tokubetsu-kyoiku is for permanent workers only",
          "Gino-koshu is only for Japanese nationals"
        ],
        a: 1, xp: 20,
        exp: "Tamakake (玉掛け) rigging certification: Tokubetsu-kyoiku (特別教育) = loads under 1 ton only (1–2 days, ~¥12,000–15,000). Gino-koshu (技能講習) = loads of 1 ton and above, covering all weights (3 days, ~¥20,000–40,000). On most job sites, you need the Gino-koshu version."
      },
      {
        id: 20, cat: "Legal Permits",
        q: "What is the total approximate cost and time to get the basic welding permit package in Japan? (Arc Welding + Grinding Wheel + Low-Voltage Electrical)",
        opts: [
          "1 day / ¥5,000 total",
          "3 months / ¥500,000 total",
          "About 5 days / ¥42,000–72,000 total — then you can legally weld, grind, and operate power panels",
          "1 year / ¥200,000 total"
        ],
        a: 2, xp: 25,
        exp: "Basic welding permit package: Arc Welding (3 days, ¥20,000–40,000) + Grinding Wheel (1 day, ¥10,000) + Low-Voltage Electrical (1 day, ¥12,000–22,000) = approximately 5 days and ¥42,000–72,000 total. After this, you are legally cleared to weld, grind, and handle power panels in Japan."
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // STAGE 2 — Tools & Torch Parts
  // ──────────────────────────────────────────────────────────
  {
    stageId: 2,
    label: "STAGE 2 — Tools & Torch Parts",
    color: "#1565C0",
    icon: "🔧",
    unlockXP: 200,
    questions: [
      {
        id: 101, cat: "Tools",
        q: "Your senior welder points at the large disc tool and says 'Guraindaa!' (グラインダー). What is it?",
        opts: [
          "A welding machine brand name",
          "An angle grinder / disc grinder — the main tool for weld cleanup, surface prep, and material removal",
          "A type of welding wire",
          "An air compressor"
        ],
        a: 1, xp: 15,
        exp: "Guraindaa (グラインダー) = Angle grinder. The most common tool on any Japanese welding site. Used for weld cleanup, grinding excess reinforcement, surface preparation, and cutting (with a cut-off disc). Remember: you need the Grinding Wheel Safety Training (自由研削といし特別教育) before using one."
      },
      {
        id: 102, cat: "Tools",
        q: "Before welding, you need to clean a very narrow groove. Your supervisor hands you a 'Bo-gura' (棒グラ). What is it?",
        opts: [
          "A metal measuring rod",
          "A large angle grinder for flat surfaces",
          "A die grinder / pencil grinder — rod-shaped, used for tight spaces and groove finishing where a disc grinder won't fit",
          "A welding torch extension"
        ],
        a: 2, xp: 15,
        exp: "Bo-gura (棒グラ) = 棒式グラインダー = die grinder or pencil grinder. The 棒 (bo) means 'rod-shaped.' Perfect for cleaning grooves (開先 / kaisaki), tight corners, and narrow joints where a large disc grinder cannot reach. Used daily in shipyards and factories."
      },
      {
        id: 103, cat: "Tools",
        q: "After stick welding, the foreman says 'Chippaa!' (チッパー) and points at the weld. What should you grab?",
        opts: [
          "The welding torch — to add more metal",
          "A wire brush only",
          "The angle grinder",
          "The air chipper — to knock off the slag from the weld bead before the next pass"
        ],
        a: 3, xp: 15,
        exp: "Chippaa (チッパー) = Air chipper or chipping gun. Pneumatic tool that rapidly strikes the weld surface to remove slag (ノロ / Noro). Much faster than a manual chipping hammer. In Japanese shipyards and factories, removing slag before the next pass is MANDATORY — skipping it causes slag inclusion defects."
      },
      {
        id: 104, cat: "Tools",
        q: "What is the difference between a 'Chippaa' (チッパー) and a 'Chippingu-hanmaa' (チッピングハンマー)?",
        opts: [
          "They are exactly the same tool",
          "Chippaa = air-powered pneumatic tool. Chippingu-hanmaa = manual hammer. Both remove slag, but the air chipper is faster",
          "Chippingu-hanmaa is for cutting steel, Chippaa is for polishing",
          "Chippaa is for TIG welding only"
        ],
        a: 1, xp: 20,
        exp: "Chippaa (チッパー) = Air chipper — pneumatic, fast, used for heavy slag removal in production welding. Chippingu-hanmaa (チッピングハンマー) = manual chipping hammer — used when air tools are not available or for small amounts of slag. Both tools require technique to avoid damaging the weld bead."
      },
      {
        id: 105, cat: "Torch Parts",
        q: "Your supervisor says the 'Chippu' (チップ) in the torch needs replacing. What does the contact tip do?",
        opts: [
          "Controls the shielding gas flow",
          "Cools the torch during heavy welding",
          "Feeds electrical current to the welding wire AND guides the wire to the weld point",
          "Connects the torch to the wire feeder"
        ],
        a: 2, xp: 20,
        exp: "Chippu (チップ) = Contact tip. TWO jobs: 1) Transfers electrical current from the torch to the welding wire. 2) Guides the wire through the correct path to the arc. A worn or spatter-clogged tip causes arc instability, poor bead shape, and wire feeding problems. Replace regularly — they are cheap and critical."
      },
      {
        id: 106, cat: "Torch Parts",
        q: "What is the role of the 'Nozuru' (ノズル) in a semi-auto welding torch?",
        opts: [
          "It guides the welding wire to the work",
          "It connects the torch to the power cable",
          "It directs and shapes the shielding gas flow around the weld pool — the outermost part of the torch",
          "It cools the contact tip"
        ],
        a: 2, xp: 20,
        exp: "Nozuru (ノズル) = Nozzle. The outermost part of the torch. It channels shielding gas (CO₂, Argon, or mixed gas) from the torch body around the arc and weld pool. A clogged or spatter-coated nozzle restricts gas flow and causes porosity (ブローホール). Clean it regularly with anti-spatter spray."
      },
      {
        id: 107, cat: "Torch Parts",
        q: "You notice lots of porosity in your welds. Your senior checks the torch and removes a blocked 'Orifisu' (オリフィス). Why does a blocked orifice cause porosity?",
        opts: [
          "It overheats the contact tip",
          "It slows down the wire feed speed",
          "Without a working orifice, shielding gas becomes turbulent and pulls in surrounding air — the nitrogen and oxygen contaminate the weld pool",
          "It causes the liner to clog with wire debris"
        ],
        a: 2, xp: 25,
        exp: "Orifisu (オリフィス) = Gas diffuser / orifice. Located between the torch body and the nozzle. It spreads the shielding gas evenly for a smooth, laminar flow. If blocked, gas turbulence sucks in atmospheric air (nitrogen + oxygen), causing gas pores (ブローホール) in the weld. A common cause of mysterious porosity that beginners overlook."
      },
      {
        id: 108, cat: "Torch Parts",
        q: "What is the 'Rainaa' (ライナー) inside a semi-auto welding torch?",
        opts: [
          "The insulating sleeve that separates the nozzle from the body",
          "The internal tube that guides welding wire AND shielding gas from the feeder through the torch cable to the contact tip",
          "The cooling water channel inside the torch",
          "The rubber outer sleeve protecting the torch cable"
        ],
        a: 1, xp: 20,
        exp: "Rainaa (ライナー) = Liner / conduit tube. Runs the full length of the torch cable. It guides the welding wire smoothly from the feeder to the contact tip AND carries shielding gas. A kinked, dirty, or worn liner causes wire jamming (バードネスティング), inconsistent feeding, and arc instability. Replace when wire feeding becomes rough."
      },
      {
        id: 109, cat: "Tools",
        q: "In a Japanese shipyard, a 'Sokyuki' (走行機 / そうきゅうき) or 'Kyarijji' (キャリッジ) is set up on a long joint. What does it do?",
        opts: [
          "A crane for lifting steel plates",
          "A motorized welding carriage that moves the welding torch automatically along the joint at a constant speed",
          "A grinding machine for weld cleanup",
          "A gas cutting torch system"
        ],
        a: 1, xp: 20,
        exp: "Sokyuki (走行機) / Kyarijji (キャリッジ) = Welding carriage. A motorized trolley that carries the semi-auto welding torch along a straight joint at a set, constant speed. The welder sets the parameters (voltage, wire speed, travel speed) and monitors. Common for long straight welds on ship hulls, steel structures, and tank walls. 🚢 SHIPYARD TERM"
      },
      {
        id: 110, cat: "Tools",
        q: "What is 'Yosetsu-men' (溶接面 / ようせつめん), and what does the shade number on it mean?",
        opts: [
          "The welding surface preparation — how smooth the metal must be",
          "The welding helmet / mask — the shade number indicates how dark the lens is (higher = darker = for higher amperage)",
          "A reference document showing where to weld",
          "The welding seam face visible from the outside"
        ],
        a: 1, xp: 15,
        exp: "Yosetsu-men (溶接面) = Welding helmet or welding mask. The shade number (遮光番号 / しゃこうばんごう) indicates lens darkness: Shade #9–10 for low amperage, #10–11 for 100–200A (typical semi-auto), #12–14 for high amperage. Wrong shade = damaged eyesight. Always check before welding."
      },
      {
        id: 111, cat: "Tools",
        q: "What is a 'Jido-shakko-men' (自動遮光面 / じどうしゃこうめん) and why do many Japanese welders prefer it?",
        opts: [
          "A standard fixed-shade welding mask — lens is always dark",
          "A remote-controlled helmet with camera",
          "An auto-darkening helmet — lens is clear until the arc strikes, then darkens automatically in milliseconds",
          "A face shield for grinding only"
        ],
        a: 2, xp: 20,
        exp: "Jido-shakko-men (自動遮光面) = Auto-darkening welding helmet (ADH). The lens is clear at rest (you can see clearly to position the torch) then darkens automatically when the arc starts — reaction time under 1/25,000 second. Reduces eye strain, improves positioning accuracy. Standard in modern Japanese workshops."
      },
      {
        id: 112, cat: "Tools",
        q: "What is 'Ura-atekin' (裏当て金 / うらあてきん) used for in welding?",
        opts: [
          "A backing bar / backing strip — placed on the back of a joint to support the molten root pass and ensure complete penetration without burn-through",
          "A filler metal for gap filling only",
          "A clamping device for holding plates together",
          "A grounding device for the welding circuit"
        ],
        a: 0, xp: 20,
        exp: "Ura-atekin (裏当て金) = Backing strip / backing bar. Placed behind the groove root to support the molten weld pool on the first (root) pass. Prevents burn-through (溶落ち / yoochi) and helps achieve full root penetration (完全溶込み). Common in shipbuilding, structural steel, and pressure vessel fabrication."
      },
      {
        id: 113, cat: "Tools",
        q: "What is 'Endo-tabu' (エンドタブ) and why is it used in certification tests and production welding?",
        opts: [
          "A test report form filled after welding",
          "An auxiliary plate attached at the weld start and end — moves defect-prone zones (arc starts, crater cracks) outside the actual joint",
          "A type of flux-cored wire",
          "A backing material for pipe welding only"
        ],
        a: 1, xp: 20,
        exp: "Endo-tabu (エンドタブ) = Run-off tab / end tab. Short steel plates attached at each end of the weld joint. Arc starts and ends are the most defect-prone areas (ブローホール, クレーター割れ). The end tab moves these defects outside the actual joint. After welding, end tabs are cut off and discarded. Required in JIS certification tests."
      },
      {
        id: 114, cat: "Tools",
        q: "What is 'Aasuクリップ' (アースクリップ) also called 'ground clamp' and why is it critical?",
        opts: [
          "A clip that holds the welding wire spool",
          "The earth/ground clamp that connects the welding return circuit to the workpiece — without it, the welding circuit is incomplete and the current finds other paths (causing damage or fire)",
          "A safety clip for securing the power cable",
          "A clip for attaching the welding electrode"
        ],
        a: 1, xp: 20,
        exp: "Aasu-kurippu (アースクリップ) = Earth clamp / ground clamp. Completes the welding electrical circuit by connecting to the workpiece. Poor ground contact causes arc instability, spatter, and electrical current finding dangerous alternative paths through machinery, frameworks, or structures. Always clamp as close to the weld as possible."
      },
      {
        id: 115, cat: "Tools",
        q: "Your supervisor tells you to spray 'Supatta-boshi-zai' (スパッタ防止剤) on the nozzle before welding. What is it?",
        opts: [
          "A welding flux",
          "A shielding gas in liquid form",
          "Anti-spatter spray — prevents spatter from sticking to the nozzle, torch tip, and workpiece, making cleanup faster",
          "A metal primer for rust prevention"
        ],
        a: 2, xp: 15,
        exp: "Supatta-boshi-zai (スパッタ防止剤) = Anti-spatter spray. Applied to the nozzle, torch body, and sometimes the workpiece near the weld. Spatter that sticks to the nozzle restricts gas flow — anti-spatter spray lets it fall off easily. Spray before welding, wipe clean after. Small investment, big time saving."
      },
      {
        id: 116, cat: "Tools",
        q: "What is 'Ondo-chooku' (温度チョーク / おんどチョーク) or 'Tempu-sutikku' (テンプスティック) used for?",
        opts: [
          "Marking cut lines on steel plate",
          "A temperature indicator crayon — melts at a specific temperature to verify preheat or interpass temperature on the steel",
          "Marking welding positions on drawings",
          "Anti-corrosion coating"
        ],
        a: 1, xp: 20,
        exp: "Ondo-chooku (温度チョーク) = Temperature crayon / Tempilstick. Each crayon melts at a specific temperature (e.g., 150°C, 200°C, 350°C). Mark the steel near the weld — if the mark melts, the temperature has been reached. Used to verify preheat temperature (予熱) before welding and interpass temperature (パス間温度) between passes."
      },
      {
        id: 117, cat: "Tools",
        q: "What is a 'Yosetsu-geeji' (溶接ゲージ / ようせつゲージ) used for on a Japanese job site?",
        opts: [
          "Measuring the length of welding wire used",
          "Checking the gas cylinder pressure",
          "A multi-function welding gauge that measures bead size, leg length, throat thickness, undercut depth, and weld reinforcement height",
          "Setting the welding machine amperage"
        ],
        a: 2, xp: 20,
        exp: "Yosetsu-geeji (溶接ゲージ) = Welding gauge. An essential inspection tool with multiple functions: measures fillet weld leg length (脚長), throat thickness (のど厚), weld reinforcement height (余盛), undercut depth (アンダーカット), and more. Used during visual inspection (VT) by welders and inspectors."
      },
      {
        id: 118, cat: "Tools",
        q: "In Japan, the Panasonic welding torch is called 'Reddo-tochi' (レッドトーチ) and the Daihen torch is called 'Buruu-tochi' (ブルートーチ). Why does this matter on site?",
        opts: [
          "They are identical — color is just branding",
          "Red torches weld faster than blue ones",
          "The torch brands use different contact tip sizes and thread standards — parts are NOT interchangeable. Using the wrong chip/nozzle causes poor welding",
          "Blue torches require higher gas flow than red"
        ],
        a: 2, xp: 25,
        exp: "On Japanese job sites: Panasonic = Red torch (レッドトーチ), Daihen = Blue torch (ブルートーチ). Their contact tips (チップ), nozzles, and liners use DIFFERENT sizes and thread standards. If you put a red torch chip in a blue torch, it won't fit properly. Always match replacement parts to the correct torch brand."
      },
      {
        id: 119, cat: "Tools",
        q: "What is 'Furappu-disuku' (フラップディスク) and when is it used instead of a standard grinding disc?",
        opts: [
          "A cutting disc for slicing steel plate",
          "A flap disc — overlapping abrasive flaps that smooth weld surfaces more gently than a grinding disc, leaving a better finish",
          "A safety guard for angle grinders",
          "A wire brush wheel for rust removal"
        ],
        a: 1, xp: 20,
        exp: "Furappu-disuku (フラップディスク) = Flap disc. Overlapping abrasive flaps attached to a backing plate. Used to blend and smooth weld surfaces, remove light spatter, and feather weld toes — gentler than a flat grinding disc. Leaves a smoother surface finish. Common in finish welding work and stainless steel applications."
      },
      {
        id: 120, cat: "Tools",
        q: "What is 'Waiyaa-burashi' (ワイヤーブラシ) used for in welding, and when is it NOT enough?",
        opts: [
          "Always sufficient for all weld cleaning tasks",
          "Used only on stainless steel — never on carbon steel",
          "Post-weld surface cleaning (removing light slag, scale, and spatter). NOT enough for heavy slag — use a chipping hammer or air chipper first",
          "Used to clean the inside of the welding torch liner"
        ],
        a: 2, xp: 15,
        exp: "Waiyaa-burashi (ワイヤーブラシ) = Wire brush. Used after welding for final surface cleanup — removes light slag residue, oxidation, and fine spatter. For heavy slag after stick welding, you need the chipping hammer (チッピングハンマー) or air chipper (チッパー) FIRST, then follow with the wire brush. Two-step process."
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // STAGE 3 — Japanese Workplace Slang
  // ──────────────────────────────────────────────────────────
  {
    stageId: 3,
    label: "STAGE 3 — Japanese Workplace Slang",
    color: "#D97706",
    icon: "🗣️",
    unlockXP: 400,
    questions: [
      {
        id: 201, cat: "Slang",
        q: "A senior welder groans and says 'Kachiage...' (かちあげ) when he sees the next joint. What position is he about to weld?",
        opts: [
          "Flat position — easy day, gravity helps",
          "Vertical position — fight against gravity",
          "Horizontal position — manageable",
          "Overhead position (4G / 4F) — welding above your head with spatter raining down"
        ],
        a: 3, xp: 15,
        exp: "Kachiage (かちあげ) = Overhead welding position. The hardest position — you hold the torch above your head, gravity pulls the molten pool away, and hot spatter falls directly onto you. Professional welders groan at this word. The official name is 上向き姿勢 (Uwamuki-shisei)."
      },
      {
        id: 202, cat: "Slang",
        q: "Your supervisor points up and yells 'Moriage!' (盛り上げ). What welding position is this?",
        opts: [
          "Flat position — no gravity problem",
          "Overhead position — welding above your head",
          "Vertical position (3G / 3F) — welding upward or downward on a vertical surface",
          "Horizontal position — welding on a horizontal joint"
        ],
        a: 2, xp: 15,
        exp: "Moriage (盛り上げ) = Vertical welding position. You weld on a vertical plate — fighting gravity to keep the molten pool from running down. The official name is 立向き姿勢 (Tatemuki-shisei). Most commonly, vertical-up welding (立向上進) is used in Japan for better fusion and penetration."
      },
      {
        id: 203, cat: "Slang",
        q: "Your senior inspects the groove and says 'Tenpai!' (テンパイ). What does this mean for your next move?",
        opts: [
          "The weld is finished — pack up and go home",
          "There is a crack — stop and call the inspector",
          "The groove is nearly full — just one more pass (the cap/cover pass) and you are done",
          "Start the root pass from scratch — everything was wrong"
        ],
        a: 2, xp: 20,
        exp: "Tenpai (テンパイ) comes from Japanese Mahjong — it means 'one tile away from winning.' On the job site, it means the groove weld is filled up to just below the final cap pass. You are one pass away from finishing. 🀄 Fun fact: Japanese welders borrow Mahjong vocabulary all the time!"
      },
      {
        id: 204, cat: "Slang",
        q: "Your supervisor looks at your practice weld and shouts 'Mimizu!' (ミミズ). What went wrong?",
        opts: [
          "The weld is too deep — you burned through",
          "Your bead is wobbly and uneven — like a worm crawling across the plate",
          "The gas flow is too high",
          "You used the wrong wire"
        ],
        a: 1, xp: 15,
        exp: "Mimizu (ミミズ) = earthworm. Used to describe a wobbly, uneven, inconsistent bead that winds left and right like a worm. Caused by unsteady torch movement, inconsistent travel speed, or shaking hands. Fix: practice straight stringer beads until they are perfectly straight before attempting weave beads."
      },
      {
        id: 205, cat: "Slang",
        q: "A senior welder looks at your bead, shakes his head, and says 'Gatagata!' (ガタガタ). What does he mean?",
        opts: [
          "The welding machine is broken",
          "The base metal has a crack",
          "Your travel speed was too fast — the bead is too thin",
          "Your bead has no consistency — rough, uneven, no rhythm, not controlled"
        ],
        a: 3, xp: 15,
        exp: "Gatagata (ガタガタ) = rough, rattling, inconsistent. Used to describe a bead with irregular width, height, and ripple pattern — no consistent rhythm or control. Different from Mimizu (which is straight but wobbly) — Gatagata means the whole bead is messy. Both are feedback you need to hear and improve from."
      },
      {
        id: 206, cat: "Slang",
        q: "After welding a large plate, your supervisor says 'Hizumi ga deta!' (歪みが出た！). What happened?",
        opts: [
          "The weld passed inspection — great work",
          "The shielding gas ran out during welding",
          "Distortion / warping — the heat from welding caused the metal plate to bend or curve out of shape",
          "A crack appeared in the weld"
        ],
        a: 2, xp: 20,
        exp: "Hizumi (歪み) = distortion / warping. When you weld, intense heat causes the metal to expand then contract unevenly as it cools — this warps the plate. More passes = more heat = more distortion. Solutions: proper tack weld sequence, back-step welding (後退法), pre-setting (逆ひずみ法), and minimizing heat input."
      },
      {
        id: 207, cat: "Slang",
        q: "After welding with stick electrodes, your senior says 'Noro tore!' (ノロとれ！). What are you being told to do?",
        opts: [
          "Take a break — Noro means 'slow down'",
          "Remove the slag — Noro is slang for the crusty slag crust left on the weld bead after stick welding",
          "Call the quality inspector",
          "Change the welding rod diameter"
        ],
        a: 1, xp: 15,
        exp: "Noro (ノロ) = slag — the crusty residue left on top of a weld bead after stick welding (SMAW) or flux-cored welding (FCAW). Must be removed between every pass to prevent slag inclusion defects. Use a chipping hammer or air chipper first, then wire brush. 'Noro tore' = 'Remove the slag!'"
      },
      {
        id: 208, cat: "Slang",
        q: "What is 'Karitsuke' (仮付け / かりつけ) or 'Tenzuke' (点付け / てんづけ) and why is it important?",
        opts: [
          "The final cover pass that completes the weld",
          "A weld defect caused by incorrect positioning",
          "Tack weld — short temporary welds that hold parts in position before full welding. Quality matters because defects in tack welds contaminate the final weld",
          "A type of fillet weld used in corners only"
        ],
        a: 2, xp: 20,
        exp: "Karitsuke (仮付け) / Tenzuke (点付け) = Tack weld. Short welds at intervals to hold parts in correct position before full welding. CRITICAL: tack weld defects (cracks, porosity) get absorbed into the final weld and become serious problems. Treat tack welds with the same care as full welds. In Japan, this is strictly enforced."
      },
      {
        id: 209, cat: "Slang",
        q: "Your supervisor says 'Kaisaki wo tsukure!' (開先を作れ！ / かいさきをつくれ！). What are you being asked to do?",
        opts: [
          "Make a welding wire",
          "Prepare the groove / joint preparation — cutting or grinding the plate edges to a specific angle for proper penetration",
          "Apply anti-spatter spray",
          "Draw a weld symbol on the drawing"
        ],
        a: 1, xp: 20,
        exp: "Kaisaki (開先) = Groove / joint preparation. The beveled or shaped edge of a plate prepared before welding to ensure the arc and filler metal can reach the root for full penetration. Common types: I-groove (I形), V-groove (V形), X-groove (X形), U-groove (U形). Kaisaki shape and dimensions are specified on the drawing."
      },
      {
        id: 210, cat: "Slang",
        q: "Your senior compliments your root pass: 'Uranami kirei da na!' (裏波きれいだな！ / うらなみきれいだな！). What did you achieve?",
        opts: [
          "A clean surface on top of the weld",
          "A perfectly straight bead line",
          "Back bead — the root weld penetrated completely through and formed a clean, even bead visible on the back side of the joint",
          "Correct slag removal after welding"
        ],
        a: 2, xp: 25,
        exp: "Uranami (裏波) = back bead / root penetration bead. In complete penetration groove welding (完全溶込み), the root pass must penetrate fully and form a visible, even bead on the back side of the joint. A beautiful Uranami shows mastery of root pass control — it is the proof of a skilled welder in Japan."
      },
      {
        id: 211, cat: "Slang",
        q: "During a site visit, an inspector points at the joint and says 'Mechigai ga aru!' (目違いがある！ / めちがいがある！). What is the problem?",
        opts: [
          "The wrong welding process was used",
          "The weld bead is too high",
          "Misalignment — the two plate edges at the joint are not flush; one is higher than the other",
          "The shielding gas mixture is incorrect"
        ],
        a: 2, xp: 20,
        exp: "Mechigai (目違い) = misalignment / mismatch. The two plates being welded together are not at the same height — one edge is higher than the other. This creates uneven stress distribution and can lead to defects. JIS standards specify maximum allowable misalignment depending on plate thickness. Fix with clamps before welding."
      },
      {
        id: 212, cat: "Slang",
        q: "The foreman checks a thin plate joint and says 'Yoochi shita!' (溶落ちした！ / ようおちした！). What went wrong?",
        opts: [
          "The weld is perfectly completed",
          "The slag was not removed",
          "Burn-through — the arc melted completely through the base metal, creating a hole in the plate",
          "The weld bead is too narrow"
        ],
        a: 2, xp: 20,
        exp: "Yoochi (溶落ち) = burn-through / melt-through. The arc was too hot, too slow, or the root gap too wide — the base metal melted completely through, leaving a hole. More common with thin plates or wide root gaps. Prevention: reduce current, increase travel speed, use backing bar (裏当て金), or reduce root gap."
      },
      {
        id: 213, cat: "Slang",
        q: "For stainless steel welding, your supervisor says 'Uragas wo shire!' (裏ガスをしろ！). What do you need to set up?",
        opts: [
          "Double the shielding gas flow on the front",
          "Back purging — shield the back side of the stainless steel weld with inert gas (Argon) to prevent oxidation",
          "Use CO₂ gas instead of Argon",
          "Apply flux paste to the back of the joint"
        ],
        a: 1, xp: 25,
        exp: "Ura-gasu (裏ガス) = back purge / back shielding. When welding stainless steel or titanium, the back of the weld must be shielded with Argon or Nitrogen to prevent oxidation. Without it, the back surface oxidizes — creating rainbow discoloration (Tenpaa-karaa / テンパーカラー) and dramatically reducing corrosion resistance."
      },
      {
        id: 214, cat: "Slang",
        q: "You weld stainless steel without back purging and the supervisor sees rainbow colors on the back. He says 'Tenpaa-karaa da!' (テンパーカラーだ！). What does this indicate?",
        opts: [
          "Excellent weld quality — the rainbow shows full penetration",
          "Normal for stainless steel — no action needed",
          "Heat tint — the stainless surface oxidized at high temperature, reducing corrosion resistance. Severity: Gold → Blue → Violet → Grey (worst)",
          "The backing gas is working correctly"
        ],
        a: 2, xp: 25,
        exp: "Tenpaa-karaa (テンパーカラー) = heat tint / temper color. On stainless steel: Gold = mild (acceptable in some codes), Blue = significant oxidation, Violet/Grey = severe (very poor corrosion resistance). Cause: insufficient back gas shielding or excessive heat input. Must be mechanically or chemically removed in corrosion-critical applications."
      },
      {
        id: 215, cat: "Slang",
        q: "Your supervisor says 'Hatsuri shiro!' (ハツリしろ！ / はつりしろ！). What must you do?",
        opts: [
          "Apply flux to the joint",
          "Grind out / gouge out — remove the defective weld metal by air arc gouging or grinding so it can be re-welded",
          "Increase the wire feed speed",
          "Apply anti-spatter spray"
        ],
        a: 1, xp: 20,
        exp: "Hatsuri (ハツリ) = gouging or chipping out weld metal. When a weld has failed inspection, the defective part must be completely removed before re-welding. Methods: air arc gouging (ガウジング), grinding with Bo-gura (棒グラ), or chipping. The area must be clean to bare metal before re-welding."
      },
      {
        id: 216, cat: "Slang",
        q: "The inspector says 'Torinao-shi da!' (取り直しだ！ / とりなおしだ！). What does this mean for the welder?",
        opts: [
          "The weld is perfect — approved",
          "Stop and change welding machine settings only",
          "Rework — the entire weld (or section) must be removed and done again from scratch. The most dreaded words on a Japanese job site",
          "Add one more cover pass on top"
        ],
        a: 2, xp: 20,
        exp: "Torinao-shi (取り直し) = rework / redo. The weld has been rejected and must be completely removed and re-welded. This costs time, materials, and reputation. In Japan's quality culture, rework is taken very seriously — it affects the welder's evaluation. Prevention: do it right the first time."
      },
      {
        id: 217, cat: "Slang",
        q: "A welder says a job requires 'Genga' (現合 / げんか). What does this mean?",
        opts: [
          "Using computer drawings only",
          "On-site custom fitting — measuring and cutting parts directly at the actual structure because drawings are insufficient or gaps have changed",
          "A type of inspection certificate",
          "Working overtime on weekends"
        ],
        a: 1, xp: 25,
        exp: "Genga (現合) = on-site fitting / field fitting. When parts don't match the drawing exactly due to fabrication tolerances or structural changes, workers measure the actual gap on-site and custom-cut or fabricate the piece to fit. Common in shipbuilding and civil construction. ⚓ Often heard in shipyards."
      },
      {
        id: 218, cat: "Slang",
        q: "What is 'Chippingu' (チッピング) in the welding workflow, and when exactly is it done?",
        opts: [
          "Applying anti-spatter spray before welding",
          "Inspecting the bead for cracks after welding",
          "Removing slag after each pass using a chipping hammer or air chipper — done between EVERY layer in multi-pass welding",
          "Grinding the weld to final height"
        ],
        a: 2, xp: 15,
        exp: "Chippingu (チッピング) = slag chipping / slag removal. Done after every single pass in multi-pass welding. Failing to remove slag between passes causes slag inclusion (スラグ巻き込み) — a serious internal defect that will fail NDT inspection. Process: chip → wire brush → inspect → weld next pass."
      },
      {
        id: 219, cat: "Slang",
        q: "A senior says you need to do 'Bokae' (棒替え / ぼうかえ) soon. What does this mean — and which welding process is this relevant to?",
        opts: [
          "Switch to a different shielding gas — used in MIG/MAG welding",
          "Replace the contact tip — used in all semi-auto welding",
          "Change the electrode / welding stick — relevant to SMAW (stick welding / 被覆アーク溶接) only. NOT used in semi-auto welding",
          "Change the wire spool — used in FCAW welding"
        ],
        a: 2, xp: 25,
        exp: "Bokae (棒替え) = electrode change. In stick welding (SMAW / 被覆アーク溶接), you use a short stick electrode that burns down and must be replaced. This word is ONLY relevant to stick welding. In shipyards and factories using semi-auto FCAW/MAG welding, the wire comes from a spool — no 'bokae' needed. Using this word on the wrong site will confuse people!"
      },
      {
        id: 220, cat: "Slang",
        q: "Your senior says the wire is 'Tobidashi!' (飛び出し！). What is the problem?",
        opts: [
          "The wire spool is empty",
          "The shielding gas pressure is too high",
          "Wire stick-out is too long — the welding wire extends too far from the contact tip, causing arc instability and poor shielding",
          "The wire is feeding too slowly"
        ],
        a: 2, xp: 20,
        exp: "Tobidashi (飛び出し) = wire stick-out / extension. In FCAW/GMAW semi-auto welding, the distance from the contact tip to the work surface (スティックアウト / stick-out) greatly affects welding results. Too long: arc instability, poor penetration, shielding failure. Correct stick-out: typically 15–25mm depending on wire size and process."
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // STAGE 4 — Welding Positions & Joint Types
  // ──────────────────────────────────────────────────────────
  {
    stageId: 4,
    label: "STAGE 4 — Positions & Joint Types",
    color: "#059669",
    icon: "📐",
    unlockXP: 600,
    questions: [
      {
        id: 301, cat: "Positions",
        q: "What is 'Shitamuki-shisei' (下向き姿勢 / したむきしせい) — and why is it considered the easiest position?",
        opts: [
          "Overhead position — you weld above your head",
          "Vertical position — you weld on a vertical wall",
          "Flat position (1G / 1F) — you weld horizontally on top of the joint, gravity helps hold the molten pool in place",
          "Horizontal position — you weld on the side of a joint"
        ],
        a: 2, xp: 15,
        exp: "Shitamuki-shisei (下向き姿勢) = Flat position, 1G (groove) / 1F (fillet). The easiest position — gravity pulls the molten pool down into the joint, helping penetration and fusion. All beginners start here. ISO code: PA. Japanese JIS code: F (for flat)."
      },
      {
        id: 302, cat: "Positions",
        q: "A drawing specifies 'Tatemuki-shisei' (立向き姿勢 / たてむきしせい). What is this welding position?",
        opts: [
          "Flat position — horizontal on top",
          "Overhead position — welding above your head",
          "Vertical position (3G / 3F) — welding upward or downward on a vertical plate surface",
          "Horizontal position — welding on the side"
        ],
        a: 2, xp: 15,
        exp: "Tatemuki-shisei (立向き姿勢) = Vertical position. 3G (groove) / 3F (fillet). You weld on a vertical surface — either going UP (立向上進 / Tatemuki joshin = upward = better fusion) or DOWN (立向下進 / downward = faster but harder to control). ISO code: PF (up) / PG (down). More difficult than flat — gravity pulls the pool down."
      },
      {
        id: 303, cat: "Positions",
        q: "What is 'Yokomuki-shisei' (横向き姿勢 / よこむきしせい)?",
        opts: [
          "Flat position — on top of the joint",
          "Overhead position — arms up",
          "Horizontal position (2G / 2F) — welding on the side face of a vertical plate, the joint runs horizontally",
          "Vertical position — on a vertical wall"
        ],
        a: 2, xp: 15,
        exp: "Yokomuki-shisei (横向き姿勢) = Horizontal position. 2G (groove) / 2F (fillet). The weld joint runs horizontally on a vertical surface. Gravity pulls the molten pool downward (toward the lower plate). Technique: angle torch slightly upward to compensate. ISO code: PC."
      },
      {
        id: 304, cat: "Positions",
        q: "The site supervisor marks a joint and says 'Kachiage da!' (かちあげだ！). In official JIS terminology, what is this position called?",
        opts: [
          "下向き姿勢 (Shitamuki-shisei) — flat position",
          "立向き姿勢 (Tatemuki-shisei) — vertical position",
          "横向き姿勢 (Yokomuki-shisei) — horizontal position",
          "上向き姿勢 (Uwamuki-shisei) — overhead position (4G / 4F)"
        ],
        a: 3, xp: 15,
        exp: "Kachiage (かちあげ) is the everyday slang for 上向き姿勢 (Uwamuki-shisei) = Overhead position. 4G (groove) / 4F (fillet). You hold the torch above your head and weld on the underside of a joint. The hardest position: gravity pulls the molten pool away from the joint, spatter falls on you. ISO code: PE."
      },
      {
        id: 305, cat: "Positions",
        q: "In Japanese JIS certification tests, which position code 'F' refers to?",
        opts: [
          "F = Forward (direction of welding)",
          "F = Fillet weld type",
          "F = Flat (下向き / Shitamuki) — used in test codes like N-2F meaning flat position groove weld",
          "F = Finish pass"
        ],
        a: 2, xp: 20,
        exp: "In JIS certification test codes: F = Flat (下向き), H = Horizontal (横向き), V = Vertical (立向き), O = Overhead (上向き). Example: N-2F = mild steel (N), plate groove weld (2), flat position (F). N-2P = mild steel (N), pipe weld (P in all positions). These codes appear on your qualification certificate."
      },
      {
        id: 306, cat: "Joint Types",
        q: "What is 'Tsukiawase-yosetsu' (突き合わせ溶接 / つきあわせようせつ)?",
        opts: [
          "Welding two plates side by side at the same level — a butt weld / groove weld",
          "Welding a plate to the side of another plate at 90°",
          "Welding two pipes together at an angle",
          "Welding over a previously placed weld bead"
        ],
        a: 0, xp: 15,
        exp: "Tsukiawase-yosetsu (突き合わせ溶接) = Butt weld / groove weld. Two plate edges are placed end-to-end (butt joint) and welded. Requires groove preparation (開先 / kaisaki) for thick plates to ensure full penetration. The most tested joint type in JIS certification exams."
      },
      {
        id: 307, cat: "Joint Types",
        q: "What is 'Suminiku-yosetsu' (すみ肉溶接 / すみにくようせつ) — the most common joint type in Japanese factories?",
        opts: [
          "A butt weld connecting two plates end-to-end",
          "A fillet weld — welding in the corner of a T-joint, lap joint, or corner joint, no groove preparation needed",
          "A stitch weld used for thin sheet metal only",
          "A pipe weld connecting two circular sections"
        ],
        a: 1, xp: 15,
        exp: "Suminiku-yosetsu (すみ肉溶接) = Fillet weld. Triangular cross-section weld in the corner where two surfaces meet (T-joint, lap joint, corner joint). No groove preparation required. The key dimensions are: leg length (脚長 / Kyakucho) and throat thickness (のど厚 / Nodo-atsu). The most common weld type in structural fabrication."
      },
      {
        id: 308, cat: "Dimensions",
        q: "What is 'Kyakucho' (脚長 / きゃくちょう) in a fillet weld?",
        opts: [
          "The length of the weld bead from start to finish",
          "The depth of penetration into the base metal",
          "The leg length — the distance from the weld root to the weld toe, measured along the face of each plate",
          "The height of the weld reinforcement above the plate surface"
        ],
        a: 2, xp: 20,
        exp: "Kyakucho (脚長) = Leg length. The length of each leg of the triangular fillet weld cross-section. For an equal-leg fillet weld, both legs are the same size. Specified on drawings as a number (e.g., 脚長6 = 6mm leg). Used for inspection with a welding gauge."
      },
      {
        id: 309, cat: "Dimensions",
        q: "What is 'Nodo-atsu' (のど厚 / のどあつ) and how does it relate to fillet weld leg length?",
        opts: [
          "The width of the weld bead on the surface",
          "The throat thickness — the shortest distance through the triangular cross-section. For equal-leg fillet: throat = leg × 0.707",
          "The depth of the groove before welding",
          "The distance from one toe to the other"
        ],
        a: 1, xp: 25,
        exp: "Nodo-atsu (のど厚) = Throat thickness. The shortest distance from the weld root to the weld face — this is the load-bearing dimension used in strength calculations. Formula: throat = leg length × cos45° = leg × 0.707. Example: 6mm leg → throat = 6 × 0.707 ≈ 4.24mm. Critical for structural design."
      },
      {
        id: 310, cat: "Dimensions",
        q: "What is 'Ruuto-gyappu' (ルートギャップ) — and what happens if it is too wide or too narrow?",
        opts: [
          "The angle of the groove opening — too wide causes burn-through",
          "The root gap — the space between plate edges at the bottom of the groove. Too narrow = poor penetration. Too wide = burn-through",
          "The reinforcement height above the plate — must be within specification",
          "The distance between tack welds along the joint"
        ],
        a: 1, xp: 20,
        exp: "Ruuto-gyappu (ルートギャップ) = Root gap / root opening. The controlled space between plate edges at the root of the groove. Too narrow (< spec): arc can't reach the root, causing lack of penetration (溶込不良). Too wide (> spec): burn-through (溶落ち). Specified on drawings — measure with gap gauges before welding."
      },
      {
        id: 311, cat: "JIS Symbols",
        q: "On a JIS drawing, a welding symbol is placed BELOW the reference line. What does this indicate?",
        opts: [
          "The weld is on the opposite side from the arrow",
          "The weld is on BOTH sides",
          "The weld is on the ARROW SIDE — the side the arrow is pointing to",
          "The symbol below the line means overhead welding is required"
        ],
        a: 2, xp: 25,
        exp: "JIS welding symbol rule: Below the reference line = ARROW SIDE (矢側 / やがわ). Above the reference line = OTHER SIDE (反矢側 / はんやがわ). This is the JIS/ISO convention. WARNING: AWS (American) symbols use the OPPOSITE convention — AWS puts arrow-side symbol BELOW too, but definitions can confuse. Always confirm which standard the drawing uses."
      },
      {
        id: 312, cat: "JIS Symbols",
        q: "A JIS drawing has a fillet weld symbol (△) above AND below the reference line. What does this mean?",
        opts: [
          "The symbol is drawn incorrectly — ignore one of them",
          "Weld on the arrow side only — the second symbol is decorative",
          "Weld on both sides — fillet welds on both the arrow side and the other side of the joint",
          "Apply fillet weld to a different joint nearby"
        ],
        a: 2, xp: 20,
        exp: "When the welding symbol appears BOTH above and below the reference line, it means weld on BOTH SIDES. For fillet welds: two-sided fillet weld (両面すみ肉溶接). Each side may have different dimensions specified — read the numbers separately for each."
      },
      {
        id: 313, cat: "JIS Symbols",
        q: "What does the circle (○) at the intersection of the reference line and arrow mean in a JIS welding symbol?",
        opts: [
          "Zero welds — do not weld this joint",
          "All-around weld (全周溶接 / ぜんしゅうようせつ) — weld continuously around the entire joint perimeter",
          "Overhead welding required at this location",
          "The weld has been inspected and approved"
        ],
        a: 1, xp: 20,
        exp: "The circle symbol (○) at the arrow/reference line junction = All-around weld (全周溶接). The specified weld must be made continuously around the complete perimeter of the joint. Common on pipe connections, column base plates, and hollow structural sections."
      },
      {
        id: 314, cat: "JIS Symbols",
        q: "A JIS drawing has a flag symbol (旗マーク / はたまーく) at the reference line. What does this indicate?",
        opts: [
          "The welder has passed quality inspection",
          "The weld requires post-weld heat treatment",
          "Field weld (現場溶接 / げんばようせつ) — this weld is performed at the construction/installation site, not in the factory",
          "The weld joint is under high stress — extra care required"
        ],
        a: 2, xp: 20,
        exp: "Flag mark (旗マーク) = Field weld symbol (現場溶接記号). This weld is NOT done in the factory — it is performed at the actual construction or installation site after the prefabricated parts are assembled in place. Important for planning: field welds have more challenging conditions (weather, position, access) than factory welds."
      },
      {
        id: 315, cat: "JIS Symbols",
        q: "What is the CRITICAL difference between JIS and AWS welding symbol conventions that can cause serious errors if confused?",
        opts: [
          "JIS uses metric dimensions, AWS uses imperial — no other difference",
          "JIS uses solid lines, AWS uses dashed lines for the reference line",
          "In JIS: below the line = ARROW side. In AWS: below the line = ARROW side too — BUT the 'other side' symbol placement logic is reversed in historical interpretations. Always verify which standard the project follows",
          "There is no difference — JIS and AWS symbols are identical"
        ],
        a: 2, xp: 30,
        exp: "This is a critical point. JIS/ISO and AWS use different conventions for arrow-side vs. other-side symbol placement. In Japan, ALL drawings use JIS (or ISO) — if you are used to AWS drawings (used in USA, Australia, etc.), verify the standard at the start of every project. Mis-reading a symbol = welding on the wrong side = rework or structural failure."
      },
      {
        id: 316, cat: "Joint Types",
        q: "What is 'T-keite' (T継手 / ティーけいて) and where is it commonly used?",
        opts: [
          "Two plates welded end-to-end in a straight line",
          "A T-joint — one plate meets another at 90°, forming a T-shape. Usually welded with fillet welds (すみ肉) on both sides",
          "Two pipes connected at the same diameter",
          "A joint where two plates overlap each other"
        ],
        a: 1, xp: 15,
        exp: "T-keite (T継手) = T-joint. One plate is welded perpendicular to the surface of another, forming a T shape. The most common structural joint in steel fabrication. Typically uses two fillet welds (すみ肉溶接) on both sides. For high-stress applications, a full penetration groove weld may be required."
      },
      {
        id: 317, cat: "Positions",
        q: "What ISO welding position code is 'PA' and what is it called in Japanese?",
        opts: [
          "PA = Overhead position = 上向き姿勢 (Uwamuki-shisei)",
          "PA = Vertical position = 立向き姿勢 (Tatemuki-shisei)",
          "PA = Horizontal position = 横向き姿勢 (Yokomuki-shisei)",
          "PA = Flat position = 下向き姿勢 (Shitamuki-shisei)"
        ],
        a: 3, xp: 20,
        exp: "ISO 6947 position codes: PA = Flat (下向き / PA), PB = Horizontal fillet (水平すみ肉 / PB), PC = Horizontal groove (横向き / PC), PE = Overhead (上向き / PE), PF = Vertical-up (立向上進 / PF), PG = Vertical-down (立向下進 / PG). These codes appear on international welding qualification certificates."
      },
      {
        id: 318, cat: "Positions",
        q: "What ISO position code 'PF' stands for, and what is the Japanese name?",
        opts: [
          "PF = Flat position (PA in Japanese) = 下向き",
          "PF = Overhead position = 上向き姿勢",
          "PF = Vertical-up welding = 立向上進 (Tatemuki-joshin) — welding upward on a vertical plate",
          "PF = Horizontal fillet = 水平すみ肉"
        ],
        a: 2, xp: 20,
        exp: "ISO PF = Vertical-up welding (立向上進 / Tatemuki-joshin). This is the standard vertical welding direction in Japanese fabrication — welding upward produces better fusion and penetration compared to vertical-down. ISO PG = vertical-down. These codes appear on JIS and IIW international qualification certificates."
      },
      {
        id: 319, cat: "Dimensions",
        q: "A drawing specifies a fillet weld with 'Kyakucho 8mm' (脚長8mm). What is the theoretical throat thickness (のど厚)?",
        opts: [
          "8.0mm — throat equals leg length",
          "4.0mm — throat is half the leg length",
          "11.3mm — throat is larger than leg length",
          "5.66mm — throat = 8mm × 0.707"
        ],
        a: 3, xp: 25,
        exp: "Theoretical throat (理論のど厚) = leg length × 0.707 (= cos 45°). For 8mm leg: 8 × 0.707 = 5.66mm throat. This calculation is fundamental for structural strength design. The throat dimension is used in all weld strength formulas. Always check: drawing usually specifies leg length (脚長), but strength is calculated from throat (のど厚)."
      },
      {
        id: 320, cat: "Joint Types",
        q: "What is 'Kanzen-tokekomi-yosetsu' (完全溶込み溶接 / かんぜんとけこみようせつ / CJP) and when is it required?",
        opts: [
          "A weld that is polished to a flush surface finish",
          "A complete joint penetration weld — the weld metal fully penetrates the entire thickness of the joint. Required for high-stress connections (e.g., column-to-beam, pressure vessels)",
          "A weld that uses maximum current settings",
          "A weld that covers both sides of the plate"
        ],
        a: 1, xp: 25,
        exp: "Kanzen-tokekomi-yosetsu (完全溶込み溶接) = Complete Joint Penetration (CJP) weld. The fusion zone extends through the ENTIRE plate thickness. Required for: seismic building connections (ダイアフラム), pressure vessel shells, and critical structural joints. Verified by RT or UT inspection. Contrast with partial penetration welds (部分溶込み / PJP)."
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // STAGE 5 — Defects & NDT Inspection
  // ──────────────────────────────────────────────────────────
  {
    stageId: 5,
    label: "STAGE 5 — Defects & NDT Inspection",
    color: "#7C3AED",
    icon: "🔍",
    unlockXP: 800,
    questions: [
      {
        id: 401, cat: "Defects",
        q: "Your supervisor sees a groove cut along the edge of your weld bead and says 'Andaakatto!' (アンダーカット). What most likely caused it?",
        opts: [
          "Travel speed too slow — too much metal deposited",
          "Shielding gas ran out mid-weld",
          "Current or travel speed TOO HIGH — the arc gouged a groove into the base metal at the weld toe before the pool could fill it",
          "Wrong wire diameter — too thick"
        ],
        a: 2, xp: 20,
        exp: "Andaakatto (アンダーカット) = Undercut. A groove melted at the base metal toe of the weld. Main causes: excessive current, too high travel speed, or improper torch angle. Undercut acts as a stress concentration notch and weakens the joint. Fix: reduce current, slow down, or adjust torch angle. Maximum allowable depth is strictly specified in codes."
      },
      {
        id: 402, cat: "Defects",
        q: "Your inspection shows molten metal has flowed over the base metal surface without fusing to it — a lip of weld metal sitting on the plate. This is called?",
        opts: [
          "Andaakatto (アンダーカット) — a groove at the weld toe",
          "Oobaraappu (オーバーラップ) — weld metal that rolled over the plate without fusing",
          "Tokekomi-furyou (溶込不良) — lack of penetration at the root",
          "Buroohoru (ブローホール) — gas pore inside the weld"
        ],
        a: 1, xp: 20,
        exp: "Oobaraappu (オーバーラップ) = Overlap. The molten weld metal flows beyond the fusion zone and sits on the cold base metal without melting into it — creating a notch on the other side. Main causes: too low current, too slow travel speed, improper torch angle. Like undercut, it creates a stress riser at the weld toe."
      },
      {
        id: 403, cat: "Defects",
        q: "After welding, RT inspection shows round dark spots inside the weld. Your supervisor says 'Buroohoru ga aru!' (ブローホールがある！). What caused these?",
        opts: [
          "Excessive current — too much heat in the weld",
          "Travel speed too slow — over-deposited metal",
          "Trapped gas (from moisture, rust, oil, contamination, or poor shielding) that couldn't escape from the solidifying weld metal",
          "Wrong filler metal for the base material"
        ],
        a: 2, xp: 20,
        exp: "Buroohoru (ブローホール) = Blowhole / Porosity. Gas trapped inside the solidified weld metal, appearing as round dark spots on RT film. Causes: moisture on base metal, rust, oil, paint, inadequate shielding gas, arc too long, contaminated filler. Prevention: clean the base metal, check gas flow, maintain proper arc length."
      },
      {
        id: 404, cat: "Defects",
        q: "An RT film shows elongated dark shadows in a line along the weld. What type of defect is this?",
        opts: [
          "Buroohoru (ブローホール) — round gas pores",
          "Andaakatto (アンダーカット) — surface groove",
          "Suragu-makikomi (スラグ巻き込み) — slag inclusion — slag trapped inside the weld from incomplete removal between passes",
          "Oobaraappu (オーバーラップ) — surface overlap"
        ],
        a: 2, xp: 20,
        exp: "Suragu-makikomi (スラグ巻き込み) = Slag inclusion. Slag (ノロ) from a previous pass was not completely removed before the next pass — it got trapped inside the weld. Appears on RT as irregular dark elongated shapes. Prevention: thorough chipping and wire brushing between EVERY pass. This is why 'Chippingu' is so important in Japan."
      },
      {
        id: 405, cat: "Defects",
        q: "What is 'Yuugou-furyou' (融合不良 / ゆうごうふりょう) — abbreviated LOF — and why is it dangerous?",
        opts: [
          "Too much weld metal deposited — over-reinforcement",
          "The weld bead is too narrow",
          "Lack of Fusion — weld metal deposited alongside but NOT fused to the base metal or previous pass. Creates a planar unbonded interface that acts like a crack",
          "Surface oxidation from insufficient shielding"
        ],
        a: 2, xp: 25,
        exp: "Yuugou-furyou (融合不良) = Lack of Fusion (LOF). The weld metal sits next to but is NOT metallurgically bonded to the base metal or previous pass. Causes: insufficient current, wrong technique, contamination. LOF is planar (like a crack) and is NOT detected by RT as easily as rounded defects. UT is better for detecting LOF. Very dangerous in structural welds."
      },
      {
        id: 406, cat: "Defects",
        q: "What is the difference between 'Teion-ware' (低温割れ / ていおんわれ) and 'Kouon-ware' (高温割れ / こうおんわれ)?",
        opts: [
          "Teion-ware = above 500°C, Kouon-ware = below 0°C",
          "They are the same defect with different names depending on the company",
          "Teion-ware (cold crack / hydrogen crack) = forms HOURS or DAYS after welding at room temperature. Kouon-ware (hot crack) = forms immediately during solidification at high temperature",
          "Teion-ware only occurs in stainless steel, Kouon-ware only in carbon steel"
        ],
        a: 2, xp: 25,
        exp: "Teion-ware (低温割れ) = Cold crack / Hydrogen-induced crack. Forms AFTER welding (hours to days later) at room temperature. Requires: hard HAZ + diffusible hydrogen + tensile stress. Prevention: preheating, low-hydrogen electrodes, PWHT. Kouon-ware (高温割れ) = Hot crack. Forms IMMEDIATELY during solidification. Caused by low-melting-point impurities. Two very different problems requiring different solutions."
      },
      {
        id: 407, cat: "Defects",
        q: "At the end of a weld bead, the arc was cut off suddenly without proper crater fill. What defect is likely to form?",
        opts: [
          "Andaakatto (アンダーカット)",
          "Oobaraappu (オーバーラップ)",
          "Buroohoru (ブローホール)",
          "Kureetaa-ware (クレーター割れ) — a crack forming in the crater hollow at the weld end due to rapid shrinkage"
        ],
        a: 3, xp: 20,
        exp: "Kureetaa-ware (クレーター割れ) = Crater crack. When you abruptly stop the arc, a hollow crater remains. As this solidifies and shrinks faster than the surrounding weld, cracks form from the center outward. Prevention: use crater fill technique — reduce current gradually and fill the crater before breaking the arc. Never just stop mid-weld."
      },
      {
        id: 408, cat: "NDT",
        q: "What is 'VT' (Mokushi-shiken / 目視試験 / もくししけん) and why is it always done FIRST before other NDT methods?",
        opts: [
          "VT is the least important check — skip it if time is short",
          "VT (Visual Testing) = eyeball inspection of the weld surface. Done first because it is fast, free, and catches obvious surface defects before wasting time on expensive advanced tests",
          "VT requires special equipment — it is the most expensive test",
          "VT can detect internal porosity without X-rays"
        ],
        a: 1, xp: 20,
        exp: "VT (Visual Testing / 目視試験) = visual inspection. The first and most fundamental check. Cost: zero. Equipment: welding gauge, good lighting, trained eyes. Detects: surface cracks, undercut, overlap, porosity, geometry issues. If VT fails, there's no point doing RT or UT. In Japan, every weld MUST pass VT before advanced NDT."
      },
      {
        id: 409, cat: "NDT",
        q: "How does 'PT' (Shinto-tansho / 浸透探傷試験 / しんとうたんしょうしけん) work?",
        opts: [
          "X-rays pass through the weld and expose a film",
          "Sound waves bounce back from internal defects",
          "Red penetrant liquid is applied to the surface, drawn into cracks, then developer (white powder) is applied — defects appear as red indications on white background",
          "Magnetic iron powder clusters at defect locations"
        ],
        a: 2, xp: 20,
        exp: "PT (Penetrant Testing / 浸透探傷試験): 1) Apply red penetrant liquid. 2) Wait (dwell time). 3) Remove excess. 4) Apply white developer powder. 5) Cracks that absorbed the penetrant will 'bleed out' as red marks on white background. Detects: SURFACE OPEN cracks and pits only. Works on NON-MAGNETIC materials (stainless steel, aluminum). Can't detect internal defects."
      },
      {
        id: 410, cat: "NDT",
        q: "When would you use 'PT' (浸透探傷 / PT) instead of 'MT' (磁粉探傷 / MT) for stainless steel?",
        opts: [
          "PT and MT are interchangeable — use either",
          "MT is better for stainless — always prefer MT",
          "PT must be used for stainless steel (SUS304 etc.) because austenitic stainless is NON-MAGNETIC — MT requires a magnetic material to work. PT has no magnetic limitation",
          "Neither works on stainless — use RT only"
        ],
        a: 2, xp: 25,
        exp: "MT (Magnetic Particle Testing / 磁粉探傷試験) uses a magnetic field to attract iron powder to defects — it ONLY works on magnetic (ferritic) materials. Austenitic stainless steel (SUS304, SUS316) is NON-MAGNETIC. For stainless steel, you MUST use PT (浸透探傷) instead. Ferrite content stainless (like SUS430) may allow MT — check material type first."
      },
      {
        id: 411, cat: "NDT",
        q: "What does 'UT' (Cho-onpa-tansho / 超音波探傷試験 / ちょうおんぱたんしょう) excel at detecting compared to RT?",
        opts: [
          "UT is better at detecting round gas pores (ブローホール)",
          "UT is better at detecting surface cracks visible to the eye",
          "UT excels at detecting PLANAR defects — cracks, lack of fusion (融合不良), lack of penetration. These planar defects reflect sound waves strongly even when RT misses them",
          "UT is better for checking shielding gas purity"
        ],
        a: 2, xp: 25,
        exp: "UT (Ultrasonic Testing) sends high-frequency sound waves into the metal. Planar defects (cracks, fusion lines, laminations) reflect sound strongly back to the probe — excellent detection. RT (X-ray) is better for volumetric defects (round pores, slag). For critical welds in Japanese shipyards and buildings, BOTH UT and RT are often required."
      },
      {
        id: 412, cat: "NDT",
        q: "What is 'RT' (Hoshasen-toka-shiken / 放射線透過試験 / ほうしゃせんとうかしけん) commonly called on Japanese job sites, and what are the safety implications?",
        opts: [
          "Called 'Rentogen' (レントゲン) — Japanese slang for X-ray. During RT: the area becomes a RADIATION HAZARD ZONE (放射線管理区域) and ALL personnel must leave the area",
          "Called 'Rentogen' but it is completely safe — no evacuation needed",
          "Called 'Cho-onpa' — the same as ultrasonic testing",
          "There are no safety concerns with RT — the radiation levels are very low"
        ],
        a: 0, xp: 25,
        exp: "RT is called Rentogen (レントゲン) on Japanese job sites — slang for X-ray from the German physicist Röntgen. During RT: mandatory radiation management zone (放射線管理区域) is established. ALL workers must evacuate before shooting. Special safety officers (放射線取扱主任者) manage the process. RT results are permanently recorded on film — unlike UT, the film serves as a permanent quality record."
      },
      {
        id: 413, cat: "NDT",
        q: "A weld passed VT inspection but failed RT. The RT film shows internal round dark spots. What defect type is this and why didn't VT catch it?",
        opts: [
          "Surface undercut — VT should have caught this",
          "Weld reinforcement too high — visible from outside",
          "Internal porosity (ブローホール) — VT only sees the SURFACE. Internal gas pores are invisible to the eye and can only be detected by RT, UT, or other volumetric methods",
          "Overlap at the weld toe — visible from outside"
        ],
        a: 2, xp: 25,
        exp: "VT (Visual Testing) only detects SURFACE defects. Internal defects — like porosity (ブローホール), slag inclusions (スラグ巻き込み), and fusion defects — are completely invisible to the eye. This is why RT (X-ray) and UT are mandatory for critical welds in Japan: VT passing does NOT guarantee an internally sound weld."
      },
      {
        id: 414, cat: "Defects",
        q: "What is 'Lamellar Tearing' (ラメラテア) and in which joint configuration is it most common?",
        opts: [
          "A surface crack from excessive grinding",
          "A hot crack forming immediately after welding",
          "A layer-like crack through the base metal thickness caused by tensile stress pulling on non-metallic inclusions in rolled steel. Most common in T-joints and cruciform joints where stress acts through the plate thickness",
          "A type of weld porosity unique to pipe welding"
        ],
        a: 2, xp: 30,
        exp: "Ramera-tea (ラメラテア) = Lamellar tearing. Steel is rolled in the mill — non-metallic inclusions become flat layers parallel to the plate surface. When welding creates tensile stress THROUGH the plate thickness (common in T-joints, column connections), these layers can split apart. Prevention: use low-sulfur steel (低硫黄鋼), pre-heat, or redesign the joint."
      },
      {
        id: 415, cat: "Defects",
        q: "Your weld failed the RT inspection for 'Tokekomi-furyou' (溶込不良 / とけこみふりょう). What is LOP and what caused it?",
        opts: [
          "Lack of Penetration — the weld metal did NOT penetrate to the root of the joint. Caused by: too low current, too fast travel, incorrect root gap, wrong torch angle",
          "Too much penetration — the weld burned through the back",
          "Excessive weld reinforcement on top of the joint",
          "Porosity at the root of the weld"
        ],
        a: 0, xp: 25,
        exp: "Tokekomi-furyou (溶込不良) = Lack of Penetration (LOP). The arc did not reach the root of the joint — leaving an unfused gap at the bottom. Causes: insufficient current, too fast travel speed, root gap too small, incorrect electrode angle. In Japan's JIS certification tests, incomplete root penetration is an automatic fail."
      },
      {
        id: 416, cat: "NDT",
        q: "When is 'MT' (Jifun-tansho / 磁粉探傷試験 / じふんたんしょうしけん) used rather than PT, and what can it detect that PT cannot?",
        opts: [
          "MT works on non-magnetic materials — PT cannot do this",
          "MT and PT detect exactly the same defects",
          "MT can detect NEAR-SURFACE cracks (slightly below the surface, not just open to the surface) on MAGNETIC materials. PT only detects surface-open defects",
          "MT is only used for aluminum welding"
        ],
        a: 2, xp: 25,
        exp: "MT (Magnetic Particle Testing / 磁粉探傷試験): Applies magnetic field to the workpiece — defects interrupt the field and iron powder clusters at these points. MT detects both surface AND near-surface (slightly subsurface) defects on magnetic (carbon steel, ferritic stainless) materials. PT only detects defects OPEN to the surface. MT is more sensitive for magnetic materials — preferred in Japanese shipyards for carbon steel welds."
      },
      {
        id: 417, cat: "Defects",
        q: "Cold cracks (低温割れ / Teion-ware) are called 'hydrogen-induced cracks.' What are the THREE conditions that must ALL be present for a cold crack to form?",
        opts: [
          "High current + fast travel + wrong wire",
          "Hot weather + stainless steel + excess shielding gas",
          "Diffusible hydrogen in the weld + hardened/susceptible microstructure + tensile stress",
          "Low preheat + thick plate + FCAW process only"
        ],
        a: 2, xp: 30,
        exp: "Cold crack (低温割れ) requires ALL THREE: 1) Diffusible hydrogen (from moisture, contaminated materials, or non-low-hydrogen electrodes). 2) Susceptible hard microstructure (martensite in the HAZ — from high carbon equivalent steel or rapid cooling). 3) Tensile stress (residual or applied). Remove ANY one of these and the crack cannot form. Solution: preheat + low-hydrogen materials + PWHT."
      },
      {
        id: 418, cat: "Defects",
        q: "A cold crack is found 24 hours AFTER welding — the weld looked fine immediately after completion. How is this possible?",
        opts: [
          "This is impossible — cracks form immediately or not at all",
          "The crack was there from the start but the inspector missed it",
          "Cold cracks are 'delayed' — diffusible hydrogen slowly migrates and concentrates at stress points, and the crack forms gradually over hours to days after welding. This is why post-weld inspection timing matters",
          "The metal was struck and cracked by accident after welding"
        ],
        a: 2, xp: 30,
        exp: "Cold cracks are also called 'delayed cracks' because diffusible hydrogen in the weld metal migrates slowly to high-stress zones (HAZ, hard microstructure areas) and accumulates. The crack may not form until hours — or even days — after welding. This is why Japanese codes specify post-weld inspection timing: often 24–48 hours after completion for critical welds."
      },
      {
        id: 419, cat: "NDT",
        q: "What is the correct NDT sequence for a critical structural weld in Japan, from first to last?",
        opts: [
          "RT → VT → PT/MT → UT",
          "UT → MT → RT → VT",
          "VT first → then PT or MT (surface) → then RT or UT (internal) — always surface methods first, then volumetric",
          "Do all tests simultaneously to save time"
        ],
        a: 2, xp: 25,
        exp: "Standard NDT sequence: 1) VT (目視) — visual first, always free and fast. 2) PT or MT (浸透 / 磁粉) — surface defects. 3) RT (放射線) or UT (超音波) — internal defects. Logic: if VT or PT/MT finds a serious defect, no need to proceed to expensive RT/UT. In Japan, the inspection order is controlled by the quality plan (品質計画書)."
      },
      {
        id: 420, cat: "Defects",
        q: "What is the difference between 'Pit' (ピット) and 'Buroohoru' (ブローホール)?",
        opts: [
          "They are exactly the same defect",
          "Pit = internal gas void. Blowhole = surface gas void",
          "Pit = a gas pore OPEN to the surface (visible during VT). Blowhole = a gas pore TRAPPED INSIDE the weld (only detectable by RT)",
          "Pit occurs in stainless steel only. Blowhole occurs in carbon steel only"
        ],
        a: 2, xp: 25,
        exp: "Pitto (ピット) = surface-open gas pore — visible during VT as a small crater on the weld face. Buroohoru (ブローホール) = internal gas pore — completely enclosed inside the weld, invisible to the eye, only detectable by RT. Both are caused by the same mechanisms (moisture, contamination, shielding failure) but at different stages of solidification."
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // STAGE 6 — JIS Certifications & Career Path
  // ──────────────────────────────────────────────────────────
  {
    stageId: 6,
    label: "STAGE 6 — Certifications & Career Path",
    color: "#DC2626",
    icon: "🏆",
    unlockXP: 1000,
    questions: [
      {
        id: 501, cat: "Certifications",
        q: "What is the 'JIS Yosetsu-gino-sha' (JIS溶接技能者 / JISようせつぎのうしゃ) qualification and who issues it?",
        opts: [
          "A factory safety training certificate issued by your employer",
          "A government-mandated license required to weld anywhere in Japan",
          "Japan Welding Engineering Society (JWES / 日本溶接協会) certification that verifies a welder's skill level through practical tests. Not legally mandatory but widely required by employers",
          "An international certification recognized only outside Japan"
        ],
        a: 2, xp: 20,
        exp: "JIS Yosetsu-gino-sha (JIS溶接技能者) is issued by JWES (日本溶接協会 / Japan Welding Engineering Society). It proves welding skill through practical tests (not just safety training). Divided by: welding process (手溶接 / 半自動 / TIG), joint type, plate thickness, and welding position. Validity: 2 years — must renew. The industry standard in Japan."
      },
      {
        id: 502, cat: "Certifications",
        q: "What is the difference between 'Kihon-kyu' (基本級 / きほんきゅう / Basic Grade) and 'Senmon-kyu' (専門級 / せんもんきゅう / Specialist Grade) in JIS welding certification?",
        opts: [
          "They are the same level — just different names for age groups",
          "Basic Grade = flat position (下向き) only. Specialist Grade = flat + additional positions (horizontal, vertical, overhead, pipe) — higher difficulty and broader application",
          "Basic Grade is for stick welding, Specialist Grade is for TIG only",
          "Basic Grade is a government license, Specialist Grade is optional"
        ],
        a: 1, xp: 25,
        exp: "Kihon-kyu (基本級) = Basic Grade. Flat position (下向き / 1G) only — the entry point for JIS certification. Senmon-kyu (専門級) = Specialist Grade. Covers additional positions: horizontal (2G), vertical (3G), overhead (4G), pipe (P). Specialist grade is required for most professional welding work. Always aim for Specialist Grade."
      },
      {
        id: 503, cat: "Certifications",
        q: "What does test code 'N-2F' mean in JIS welding certification?",
        opts: [
          "Nitrogen-2 Fillet weld",
          "N = Mild steel (軟鋼), 2 = Plate groove weld (厚板突合せ), F = Flat position (下向き). A basic flat position groove weld on mild steel plate",
          "N = No groove, 2 = 2mm plate thickness, F = Final pass only",
          "N = Non-ferrous, 2 = Two-pass weld, F = FCAW process"
        ],
        a: 1, xp: 25,
        exp: "JIS test code N-2F: N = 軟鋼 (Nankoo = mild steel), 2 = 厚板突合せ (plate groove weld), F = 下向き (flat position). Other common codes: N-2H (horizontal), N-2V (vertical), N-2O (overhead), N-2P (pipe, all positions — the hardest). The code tells you exactly what test you passed."
      },
      {
        id: 504, cat: "Certifications",
        q: "What is 'N-2P' in JIS certification and why is it considered the most prestigious?",
        opts: [
          "N-2P = Narrow gap, 2-pass process — a fast welding technique",
          "N-2P = Mild steel, pipe, all positions — welding a horizontal fixed pipe in all positions (flat + vertical + overhead) in one test. Pass rate ~30%. The gold standard for Japanese welders",
          "N-2P = Normal 2-position test — slightly harder than basic",
          "N-2P = Non-destructive, 2-point inspection"
        ],
        a: 1, xp: 30,
        exp: "N-2P = mild steel (N) pipe (P) in all positions. A horizontal fixed pipe is welded continuously through all four positions: flat at top, vertical on sides, overhead at bottom — all in one pass. The root pass (初層) must be perfectly executed for complete back bead penetration (裏波). Considered the most difficult and prestigious JIS certification. Widely respected in Japanese industry."
      },
      {
        id: 505, cat: "Certifications",
        q: "JIS welding certification expires every 2 years. What happens if you do NOT renew before expiration?",
        opts: [
          "Nothing — the certification is valid for life once obtained",
          "You pay a small fine but continue working",
          "Your certification becomes INVALID. You cannot claim JIS certification for work. You must re-test to regain it. Japanese employers check certification dates regularly",
          "You get a 6-month grace period automatically"
        ],
        a: 2, xp: 20,
        exp: "JIS welding certification (JIS溶接技能者認証) has a 2-year validity. Before expiry, you must complete renewal testing (更新試験). If expired, the certification is no longer valid — you cannot represent yourself as JIS certified. In Japan, employers and inspectors check certification expiry dates. Renewal is straightforward but must be done on time."
      },
      {
        id: 506, cat: "Certifications",
        q: "What is 'AW Kentei' (AW検定 / AWけんてい) and which industry is it for?",
        opts: [
          "AW = Arc Welding — a general welding certification for all industries",
          "AW = Architectural Welding (建築鉄骨溶接技量検定) — the certification for structural steel welding in buildings. Only valid for 1 year — must be renewed annually",
          "AW = Aluminum Welding — for aerospace applications",
          "AW = Automated Welding — for robotic welding operators"
        ],
        a: 1, xp: 25,
        exp: "AW Kentei (AW検定) = Architectural Welding certification (建築鉄骨溶接技量検定). Specifically for structural steel fabrication in buildings. Managed by the AW Kentei Association. Test once per year (June–September). Validity: 1 year only — must renew every year. Includes: factory welding, field welding, pipe welding, and robot welding operator categories."
      },
      {
        id: 507, cat: "Certifications",
        q: "What can a 'Futsuu-Boilaa-Yosetsu-shi' (普通ボイラー溶接士 / ふつうボイラーようせつし) weld — and what is the key plate thickness restriction?",
        opts: [
          "Can weld all boiler and pressure vessel parts without restriction",
          "Can only weld pipes — no flat plates",
          "Can weld boiler and pressure vessel parts up to 25mm plate thickness only. For 25mm+ = must have Tokubetsu-Boilaa (特別ボイラー溶接士)",
          "Can only weld low-pressure systems under 0.1 MPa"
        ],
        a: 2, xp: 25,
        exp: "Futsuu-Boilaa-Yosetsu-shi (普通ボイラー溶接士) = Standard Boiler Welder. Can weld boiler and pressure vessel components up to 25mm plate thickness. For plates OVER 25mm, the Tokubetsu (特別) grade is required. National license — legally mandatory. Practical test: horizontal groove weld, 60 minutes. NDT: RT + bend test required."
      },
      {
        id: 508, cat: "Certifications",
        q: "What TWO licenses are required to work as an 'Underwater Welder' (水中溶接士 / すいちゅうようせつし) in Japan?",
        opts: [
          "JIS Certification + Driver's License",
          "Boiler Welder + Arc Welding Safety Training only",
          "Diving License (潜水士 / Senzo-shi) + Welding qualification (JIS or equivalent). Both are mandatory — you cannot legally dive AND weld without both",
          "Any two safety training certificates"
        ],
        a: 2, xp: 25,
        exp: "Underwater Welder = Senzoushi (潜水士) national diving license + welding qualification (JIS specialist grade recommended). The diving license requires written exam only (no practical) — pass rate ~75%. The welding skill must then be applied in a completely different environment. Very rare combination. Annual income: ¥7–10 million. Top saturation divers: ¥10–15 million."
      },
      {
        id: 509, cat: "Certifications",
        q: "What is 'WES' in Japanese welding, and what level of qualification does it represent?",
        opts: [
          "WES = Welding Equipment Standard — a certification for welding machines",
          "WES = Welding Engineering Standard — the Japan Welding Engineering Society's qualification for welding management engineers (WES 8103). Levels: Grade 3 → 2 → 1 → Special Grade",
          "WES = Western Engineering System — an American certification used in Japan",
          "WES = Welding Examination System — a basic safety training program"
        ],
        a: 1, xp: 25,
        exp: "WES (Welding Engineering Standard) = Japan Welding Engineering Society's qualification for welding managers and engineers. WES 8103 levels: Grade 3 (基礎), Grade 2 (監督レベル), Grade 1 (管理者レベル), Special Grade (特別級 — ISO-aligned, international equivalent). WES is for engineers who MANAGE and SUPERVISE welding, not necessarily do the welding. High salary: ¥700,000–900,000+/year."
      },
      {
        id: 510, cat: "Career",
        q: "What is the correct career path order from entry-level to expert in Japanese welding?",
        opts: [
          "WES Special → Underwater Welder → Boiler Welder → JIS Basic → Arc Safety Training",
          "Arc Safety Training (Day 1) → JIS Basic Grade → JIS Specialist Grade → AW / Boiler Welder → WES → Underwater Welder (top)",
          "Underwater Welder first — then everything else is easy",
          "All certifications are obtained simultaneously in the first week"
        ],
        a: 1, xp: 20,
        exp: "Japanese welding career ladder: 1) Arc Safety Training (アーク溶接特別教育) — legally required from Day 1. 2) JIS Basic Grade (基本級) — first skill certification. 3) JIS Specialist Grade (専門級) — all positions. 4) AW Kentei or Boiler Welder (specialized). 5) WES management qualification. 6) Underwater Welder (elite). Each step opens higher-paying work."
      },
      {
        id: 511, cat: "Certifications",
        q: "What is the approximate annual income range for each level of Japanese welding career?",
        opts: [
          "All welders earn the same in Japan — no variation",
          "Arc Safety (¥8M) → JIS Basic (¥6M) → Underwater Welder (¥2M)",
          "Arc Safety / JIS Basic: ¥3–4M → JIS Specialist / AW: ¥4–6M → Boiler Welder: ¥5–8M → Underwater Welder: ¥7–15M",
          "Japanese welders earn ¥1–2M per year regardless of certification"
        ],
        a: 2, xp: 20,
        exp: "Approximate annual income in Japanese welding (万円/year): JIS Basic 300–400万, JIS Specialist 400–600万, AW Kentei 500–700万, Boiler Welder Standard 450–650万, Boiler Welder Special 600–800万, Underwater Welder 700–1,000万, Saturation Diver + Underwater 1,000–1,500万. Rare specialized skills = premium pay."
      },
      {
        id: 512, cat: "Physics",
        q: "Water pressure increases by approximately 1 atmosphere every 10 meters of depth. What is the absolute pressure at 30 meters depth?",
        opts: [
          "1 atmosphere (just atmospheric pressure)",
          "2 atmospheres",
          "3 atmospheres — 1 atm (surface) + 3 atm (from 30m water) — WRONG calculation",
          "4 atmospheres — 1 atm (surface) + 3 atm (from 30m = 3 × 10m)"
        ],
        a: 3, xp: 25,
        exp: "Water pressure: Every 10m depth adds ~1 atmosphere. At 30m: 1 atm (atmospheric pressure at surface) + 3 atm (from 30m of water) = 4 atm absolute. This pressure affects diving: gas consumption increases, nitrogen narcosis risk increases, decompression stops become mandatory. Underwater welders must understand this math."
      },
      {
        id: 513, cat: "Physics",
        q: "Heat Input formula: Q = 60 × E × I / v. What do E, I, and v represent in welding?",
        opts: [
          "E = efficiency, I = insulation, v = volume",
          "E = arc voltage (V), I = welding current (A), v = travel speed (cm/min). Result Q = heat input (J/cm or kJ/cm)",
          "E = electrode diameter, I = interpass temperature, v = ventilation rate",
          "E = elongation, I = impact strength, v = viscosity of weld pool"
        ],
        a: 1, xp: 25,
        exp: "Heat Input Q = 60 × E × I / v. E = Voltage (V), I = Current (A), v = Travel speed (cm/min). Result in J/cm (divide by 1000 for kJ/cm). Example: E=28V, I=180A, v=30cm/min → Q = 60×28×180/30 = 10,080 J/cm = 10.1 kJ/cm. Heat input controls HAZ toughness, cooling rate, and distortion. Managed in WPS."
      },
      {
        id: 514, cat: "Certifications",
        q: "What is a 'WPS' (Welding Procedure Specification / 溶接施工要領書) and why does every qualified welding job in Japan require one?",
        opts: [
          "WPS = Worker Protection System — a safety plan for the site",
          "WPS = a document specifying all welding parameters (process, materials, current, voltage, speed, preheat, PWHT) that a welder must follow to produce a qualified weld. Required by codes for all critical welded structures",
          "WPS = a record of past welds done on the project",
          "WPS = a weekly work schedule for welding crews"
        ],
        a: 1, xp: 25,
        exp: "WPS (溶接施工要領書 / Yosetsu-shiko-yoryosho) = Welding Procedure Specification. The 'recipe' for a weld: defines process, base metal, filler metal, preheat, current, voltage, speed, post-weld heat treatment, and more. Backed by a PQR (procedure qualification test record). Every qualified weld in Japanese pressure vessels, buildings, and ships must follow an approved WPS."
      },
      {
        id: 515, cat: "Certifications",
        q: "What is 'Yonetsu' (予熱 / よねつ / preheat) and why is it required for high-strength steel?",
        opts: [
          "Heating the weld after completion — post-weld heat treatment",
          "Preheating the base metal before welding to slow cooling rate — prevents cold cracking in high carbon equivalent steels, reduces hardening in HAZ, promotes hydrogen escape",
          "A type of annealing process for stainless steel only",
          "Warming the shielding gas to improve flow rate"
        ],
        a: 1, xp: 25,
        exp: "Yonetsu (予熱) = Preheat. Heating the base metal (and surrounding area) to a specified temperature BEFORE starting to weld. Why: slows cooling rate → less hardening in HAZ → less cold crack risk. Also helps diffusible hydrogen escape. Required for: high carbon equivalent steels (Ceq > ~0.40), thick plates, highly restrained joints. Temperature checked with ondo-chooku (温度チョーク)."
      },
      {
        id: 516, cat: "Career",
        q: "As a foreign welder in Japan, what is the MOST IMPORTANT certificate combination to get in your first month to become fully functional on any job site?",
        opts: [
          "Driver's License + Boiler Welder License",
          "JIS Specialist Grade only — everything else is optional",
          "Arc Welding Safety Training + Grinding Wheel Safety Training + Low-Voltage Electrical Training + Full Harness Safety Training — the basic operational package (~¥52,000–82,000, about 6–7 days total)",
          "WES Grade 2 only — covers everything"
        ],
        a: 2, xp: 25,
        exp: "First-month priority package: 1) Arc Welding Safety Training (3 days, ¥20–40k) → can weld. 2) Grinding Wheel Safety Training (1 day, ¥10k) → can grind. 3) Low-Voltage Electrical Safety Training (1 day, ¥12–22k) → can operate power panels. 4) Full Harness Safety Training (1 day, ¥10k) → can work at height. Total: ~6–7 days, ¥52,000–82,000. Now you are legally operational on virtually any Japanese job site."
      },
      {
        id: 517, cat: "Certifications",
        q: "What is 'IIW' and how does it relate to Japanese welding qualifications?",
        opts: [
          "IIW = International Institute of Welding — issues internationally recognized certifications (IW, IWT, IWE) that align with Japan's WES system. WES Special Grade ≈ IWE (International Welding Engineer)",
          "IIW = an American industry association with no connection to Japan",
          "IIW = a Japanese acronym for the welding safety law",
          "IIW = a brand of Japanese welding machines"
        ],
        a: 0, xp: 30,
        exp: "IIW (International Institute of Welding) = the global body for welding standards. Issues: IW (International Welder), IWT (International Welding Technologist), IWE (International Welding Engineer). Japan's WES 8103 Special Grade (特別級) is aligned with IWE standards — holders can apply for IIW international recognition. Valuable for Japanese welders working on international projects (offshore, LNG, nuclear)."
      },
      {
        id: 518, cat: "Career",
        q: "What does 'PWHT' (Post-Weld Heat Treatment / 溶接後熱処理 / ようせつごねつしょり) do and when is it required in Japan?",
        opts: [
          "PWHT = cleaning the weld bead with a wire brush after cooling",
          "PWHT = heating the entire weldment to a specific temperature (e.g. 600°C) and holding, then slow cooling — removes residual stress, softens hard HAZ, releases hydrogen. Required for pressure vessels, boilers, and critical structures by JIS/ASME codes",
          "PWHT = applying anti-rust paint after welding",
          "PWHT = a final visual inspection required before shipment"
        ],
        a: 1, xp: 30,
        exp: "PWHT (Post-Weld Heat Treatment / 溶接後熱処理) = stress-relief heat treatment. The completed weldment is heated to ~600–700°C (for carbon steel), held for a specified time, then slowly cooled. Effects: residual stress removed (↓ distortion, ↓ stress corrosion risk), hard HAZ softened (↓ cold crack risk), hydrogen released. Mandatory for boiler vessels (ボイラー), pressure equipment, and specified structural connections."
      },
      {
        id: 519, cat: "Career",
        q: "What is the main difference between working as a welder in Japan vs other countries that foreign workers should know?",
        opts: [
          "Japan uses completely different welding techniques not found anywhere else",
          "Japanese welders work longer hours but earn less",
          "Japan has a very strict certificate-based qualification system — even simple tasks (grinding, crane operation) require specific legal certificates. Safety culture is deeply embedded. Quality standards are extremely high. Rework (取り直し) is costly to reputation",
          "Japanese companies never hire foreign welders — it is not possible"
        ],
        a: 2, xp: 20,
        exp: "Key differences in Japan: 1) Certificate culture — every tool/task has a legal qualification requirement. 2) Quality focus — NDT inspection is thorough and rework damages your reputation significantly. 3) Team communication — learning key Japanese terms (like the ones in this game) is essential for safety and efficiency. 4) Respect for process — following WPS and work instructions exactly is non-negotiable."
      },
      {
        id: 520, cat: "Career",
        q: "You have mastered all the content in this game. What should your NEXT step be to advance your welding career in Japan?",
        opts: [
          "Nothing more to learn — you are now an expert",
          "Sit the JIS 専門級 (Specialist Grade) practical test for your main welding process, accumulate 実務経験 (practical experience on the job), then aim for N-2P (pipe all-positions) and eventually Boiler Welder or AW certification",
          "Immediately apply for the WES Special Grade exam",
          "Apply for underwater welding jobs without any further preparation"
        ],
        a: 1, xp: 25,
        exp: "Knowledge is Step 1. Now: 1) Sit the JIS 専門級 practical test for FCAW or SMAW. 2) Build 実務経験 (jitsumukeiken = practical work experience) — quality matters more than quantity. 3) Aim for N-2P (pipe all-positions) — the most respected JIS test. 4) Accumulate: Tamakake + Crane + Forklift. 5) Consider AW or Boiler Welder depending on your work field. Your career = your certifications + your quality record. Gambatte! (頑張れ！)"
      }
    ]
  }
]
