// ============================================================
// SMITH'S FORGE — METAL EDITION
// questions_smith.js
//
// Target: Foreign workers in Japanese metal fabrication shops
// Standard: JIS (Japan Industrial Standards)
// Features: Japanese terms + Romaji + English explanations
// ============================================================

export const QUIZ_STAGES = [
  {
    stageId: 1,
    label: "STAGE 1 — Legal Permits & Safety",
    color: "#1E90FF",
    icon: "🛡️",
    unlockXP: 0,
    questions: [
      {
        id: 1, cat: "Press Machine Safety",
        q: "Before operating a power press, your supervisor says you need 'Puresu Kikai Tokubetsu Kyouiku (プレス機械特別教育)'. What is this?",
        opts: [
          "Mandatory special safety training required by law before operating press machines",
          "A general factory orientation video",
          "An optional certificate for promotion",
          "A union membership requirement"
        ],
        a: 0, xp: 20,
        exp: "Puresu Kikai Tokubetsu Kyouiku (プレス機械特別教育) is a legally mandated special education course under Japan's Industrial Safety and Health Act for anyone who will operate a power press. Skipping it is illegal for both the worker and the company. The training covers pinch-point hazards, two-hand controls, and emergency stops. 🇯🇵 TIP: Always keep your training completion certificate (受講証明書) in your locker — inspectors and clients can ask to see it on short notice."
      },
      {
        id: 2, cat: "Press Machine Safety",
        q: "A new press operator skips the safety guard interlock check before starting a shift. What is the biggest risk?",
        opts: [
          "Slower production speed",
          "Crushing or amputation injury from the press slide",
          "Higher electricity bill",
          "Voiding the machine's paint warranty"
        ],
        a: 1, xp: 25,
        exp: "Press machines move with enormous force and speed, and most press-related accidents in Japanese factories involve hands caught between dies. The safety guard and light curtain interlocks exist specifically to stop the slide if a hand enters the danger zone. 🇯🇵 TIP: Never silence or bypass an interlock alarm even if it slows you down — supervisors treat tampering with safety devices as a serious violation, not just a minor shortcut."
      },
      {
        id: 3, cat: "Grinding Machine Safety",
        q: "What does 'Kensakuban Tokubetsu Kyouiku (研削盤特別教育)' specifically train workers to handle safely?",
        opts: [
          "Forklift driving in the yard",
          "Filling out shipping invoices",
          "Operating grinding machines and handling grinding wheels",
          "Cleaning oil from the floor"
        ],
        a: 2, xp: 20,
        exp: "Kensakuban Tokubetsu Kyouiku (研削盤特別教育) is required special training for using grinding machines (研削盤), focusing on wheel inspection, mounting, balancing, and guard use. A grinding wheel that bursts at high RPM can cause severe injury. 🇯🇵 TIP: Always perform the 'ring test' (tapping the wheel to check for cracks) before mounting — this small habit is taken very seriously in Japanese workshops."
      },
      {
        id: 4, cat: "Grinding Machine Safety",
        q: "After replacing a grinding wheel, your trainer tells you to run the machine empty for one minute before use. Why?",
        opts: [
          "To warm up the motor for better color of sparks",
          "It is just a traditional ritual with no real purpose",
          "To save electricity later in the shift",
          "To check for vibration or wheel failure at speed before any work is done"
        ],
        a: 3, xp: 20,
        exp: "Running a newly mounted grinding wheel at operating speed without a workpiece (test run) lets you detect imbalance, cracks, or improper mounting before it becomes dangerous under load. This step is required by safety regulations, not optional. 🇯🇵 TIP: If a machine 'feels off' even slightly, stop and report it immediately — in Japanese shops, raising a safety concern early is respected, not seen as complaining."
      },
      {
        id: 5, cat: "Crane Safety",
        q: "Your factory has an overhead crane rated under 5 tons. What must an operator complete before using it?",
        opts: [
          "Kuren Tokubetsu Kyouiku (クレーン特別教育), special crane safety training",
          "A simple verbal explanation from a coworker",
          "Nothing, if the operator has a driver's license",
          "Only a one-time safety video with no exam"
        ],
        a: 0, xp: 20,
        exp: "Kuren Tokubetsu Kyouiku (クレーン特別教育) is legally required special education for operating overhead cranes under 5 tons; heavier cranes require an even more rigorous license (技能講習). This training covers load limits, sling angles, and signaling. 🇯🇵 TIP: Learn the standard hand signals used by your crew, since shouting over factory noise is unreliable and miscommunication during a lift is a leading cause of accidents."
      },
      {
        id: 6, cat: "Crane Safety",
        q: "While lifting a heavy die with an overhead crane, a coworker walks directly underneath the suspended load. What should you do?",
        opts: [
          "Continue the lift since they should be careful themselves",
          "Immediately stop the lift and tell them to move away from under the load",
          "Speed up the lift to finish quickly",
          "Ignore it because it is their responsibility"
        ],
        a: 1, xp: 25,
        exp: "Standing under a suspended load is one of the most dangerous habits in any factory; if the sling, hook, or crane fails, there is no time to react. The operator is responsible for stopping the lift the moment anyone enters that zone. 🇯🇵 TIP: In Japanese workplaces, calling out 'Tomete! (止めて, Stop!)' loudly and immediately is expected and will never be seen as overreacting."
      },
      {
        id: 7, cat: "Low-Voltage Electrical Handling",
        q: "What is 'Teiatsu Denki Toriatsukai (低圧電気取扱)' training designed to prevent?",
        opts: [
          "Damage to finished parts during shipping",
          "Excessive noise from electric motors",
          "Electric shock and arc injuries when handling low-voltage electrical equipment",
          "Late delivery of electrical parts"
        ],
        a: 2, xp: 20,
        exp: "Teiatsu Denki Toriatsukai (低圧電気取扱) training is required for workers who handle low-voltage (under 600V) electrical equipment such as control panels and wiring on machines. It covers lockout procedures, insulated tools, and shock hazards. 🇯🇵 TIP: Always confirm a machine is fully de-energized and tagged out before opening an electrical panel — Japanese safety audits check tagging procedures very closely."
      },
      {
        id: 8, cat: "Low-Voltage Electrical Handling",
        q: "You notice a frayed power cord on a hand grinder. What is the correct action?",
        opts: [
          "Wrap it with tape yourself and keep using it",
          "Use the tool only for short tasks",
          "Ignore it since it has worked fine so far",
          "Report it and tag the tool out of service until repaired"
        ],
        a: 3, xp: 20,
        exp: "A frayed cord on a powered tool is an electrical hazard that can cause shock or fire, and self-repairing it with tape is not an approved fix in a factory environment. The correct process is to remove it from service and report it through the proper channel. 🇯🇵 TIP: Use the red 'Koshou (故障, Out of Order)' tag system common in Japanese plants so the next worker does not unknowingly use damaged equipment."
      },
      {
        id: 9, cat: "Forklift Skills Training",
        q: "To legally drive a forklift over 1 ton capacity in Japan, a worker must complete which qualification?",
        opts: [
          "Forkurifuto Ginou Koushuu (フォークリフト技能講習), forklift skills training course",
          "A simple in-house orientation only",
          "A regular car driver's license alone",
          "No qualification is needed inside a private factory"
        ],
        a: 0, xp: 25,
        exp: "Forkurifuto Ginou Koushuu (フォークリフト技能講習) is a government-recognized skills training course required to operate forklifts with a load capacity of 1 ton or more, even inside a private factory. It includes both practical driving exams and written tests. 🇯🇵 TIP: Carry your forklift license card with you during your shift, since safety patrols in Japanese factories often do random ID checks."
      },
      {
        id: 10, cat: "Forklift Skills Training",
        q: "While driving a forklift with a raised load, you need to turn a corner near a blind spot. What is the safest practice?",
        opts: [
          "Speed through quickly before anyone notices",
          "Sound the horn, slow down, and proceed cautiously, lowering the load if possible",
          "Reverse instead of turning since it is faster",
          "Ask a coworker to walk in front while you keep normal speed"
        ],
        a: 1, xp: 20,
        exp: "Forklifts have significant blind spots, especially with a raised or bulky load, making intersections and corners high-risk points for collisions with pedestrians. Sounding the horn and lowering the load improves visibility and stability. 🇯🇵 TIP: Many Japanese factories install mirrors and floor markings at blind corners — always obey these even if the area looks empty."
      },
      {
        id: 11, cat: "Full Harness",
        q: "What is 'Furu Hanesu (フルハーネス)' used for in a metal fabrication shop?",
        opts: [
          "A type of cutting tool for sheet metal",
          "A measuring instrument for tolerances",
          "A full-body safety harness used for fall protection at height",
          "A lubricant applied to press dies"
        ],
        a: 2, xp: 15,
        exp: "Furu Hanesu (フルハーネス) refers to a full-body safety harness, now legally required (replacing simple waist belts) for work at height above 2 meters in many situations. It distributes fall-arrest forces across the body instead of just the waist. 🇯🇵 TIP: Since 2019, Japanese law phased out waist-belt-only harnesses for high-risk height work, so always check that your harness is the current full-body type before climbing."
      },
      {
        id: 12, cat: "Full Harness",
        q: "Before climbing a mezzanine platform to retrieve material, what should you check on your full harness first?",
        opts: [
          "The color matches your uniform",
          "It smells clean",
          "It was issued less than a week ago",
          "All buckles, D-rings, and the lanyard hook are secure and undamaged"
        ],
        a: 3, xp: 20,
        exp: "A pre-use inspection of buckles, stitching, D-rings, and the lanyard hook ensures the harness will actually arrest a fall; a damaged harness gives a false sense of safety. This check should take less than a minute but is never skipped. 🇯🇵 TIP: Japanese safety culture emphasizes 'Shisa Kakunin (指差し確認)', pointing and calling out each check aloud, to make sure inspection steps are not silently skipped."
      },
      {
        id: 13, cat: "PPE — Safety Glasses",
        q: "Your supervisor reminds you to wear 'Hogo Megane (保護メガネ)' before using the grinder. What does this mean?",
        opts: [
          "Safety glasses to protect eyes from flying debris and sparks",
          "Prescription reading glasses",
          "Sunglasses for outdoor work only",
          "A magnifying lens for inspection"
        ],
        a: 0, xp: 15,
        exp: "Hogo Megane (保護メガネ) are safety glasses required whenever there is a risk of flying particles, such as grinding, cutting, or drilling metal. Even a small metal chip can cause permanent eye damage. 🇯🇵 TIP: It is common in Japanese shops to keep a spare pair of safety glasses at each station so there is never an excuse to skip them."
      },
      {
        id: 14, cat: "PPE — Earplugs",
        q: "In a press shop area marked with a high noise warning sign, what PPE must you wear?",
        opts: [
          "A face shield only",
          "Mimisen (耳栓), earplugs, to protect hearing",
          "Steel-toed boots only",
          "Nothing extra if you are used to the noise"
        ],
        a: 1, xp: 15,
        exp: "Mimisen (耳栓), earplugs, are required in areas with sustained loud noise such as stamping presses, because long-term exposure causes permanent hearing damage even without immediate pain. Posted noise warning signs indicate mandatory hearing protection zones. 🇯🇵 TIP: Look for color-coded floor zones in Japanese factories — yellow or red borders near loud equipment usually mean PPE is mandatory inside that area."
      },
      {
        id: 15, cat: "PPE — Dust Mask",
        q: "When grinding or sanding metal that produces fine dust, what should you wear over your nose and mouth?",
        opts: [
          "A simple cotton handkerchief",
          "Nothing, since metal dust is harmless",
          "Boujin Masuku (防塵マスク), a dust mask",
          "Ear muffs instead"
        ],
        a: 2, xp: 15,
        exp: "Boujin Masuku (防塵マスク), a dust mask, filters fine particulates produced during grinding, sanding, or cutting metal, protecting the lungs from long-term damage. A cotton handkerchief does not filter fine particles effectively. 🇯🇵 TIP: Replace disposable dust masks when breathing becomes harder through them — Japanese safety officers often check mask freshness during inspections."
      },
      {
        id: 16, cat: "Oxygen Deficiency Hazard",
        q: "What does 'Sanketsu Kiken Sagyou (酸欠危険作業)' refer to?",
        opts: [
          "Work involving excessive sunlight exposure",
          "Tasks requiring extra physical strength",
          "Jobs that require working with acids only",
          "Work in confined spaces where oxygen levels may be dangerously low"
        ],
        a: 3, xp: 25,
        exp: "Sanketsu Kiken Sagyou (酸欠危険作業) refers to hazardous work in confined or poorly ventilated spaces such as tanks, pits, or sealed containers, where oxygen concentration can drop to unsafe levels without warning. Workers can lose consciousness within seconds in severe cases. 🇯🇵 TIP: Always use an oxygen meter and have a designated watcher outside before entering any confined space — this buddy system is strictly enforced in Japanese safety regulations."
      },
      {
        id: 17, cat: "Oxygen Deficiency Hazard",
        q: "Before entering a sealed tank for cleaning, what must be measured and confirmed?",
        opts: [
          "Oxygen concentration and presence of toxic gases",
          "Room temperature only",
          "The tank's paint color code",
          "The weight of the tank"
        ],
        a: 0, xp: 20,
        exp: "Confined spaces like sealed tanks can have low oxygen or hidden toxic gas buildup, so atmosphere testing before and during entry is mandatory, not optional. Ventilation must also be confirmed before anyone goes inside. 🇯🇵 TIP: If the gas meter alarm sounds even briefly, treat it seriously and evacuate immediately — Japanese plants run regular drills specifically for this scenario."
      },
      {
        id: 18, cat: "Noise Hazard Prevention",
        q: "'Souon Shougai Boushi (騒音障害防止)' guidelines mainly aim to prevent what kind of long-term injury?",
        opts: [
          "Back pain from lifting",
          "Hearing loss from prolonged exposure to loud machinery",
          "Eye strain from bright lighting",
          "Skin irritation from oils"
        ],
        a: 1, xp: 20,
        exp: "Souon Shougai Boushi (騒音障害防止), noise hazard prevention, guidelines require noise measurement, hearing protection, and regular hearing checks for workers in loud areas like press and stamping lines. Hearing loss from years of unprotected exposure is gradual and often goes unnoticed until it is permanent. 🇯🇵 TIP: If you are asked to take an annual hearing test (聴力検査) at a Japanese factory, treat it seriously — results affect what protection measures the company must provide you."
      },
      {
        id: 19, cat: "KY Activity (Hazard Prediction)",
        q: "Before starting work each morning, your team gathers for 'KY Katsudou (KY活動)'. What is this activity?",
        opts: [
          "A stretching exercise routine only",
          "A daily attendance check",
          "A hazard prediction activity where the team discusses possible dangers for that day's task",
          "A competition for fastest worker"
        ],
        a: 2, xp: 20,
        exp: "KY Katsudou (KY活動), Kiken Yochi or hazard prediction activity, is a short team discussion held before work where everyone identifies potential dangers in the day's tasks and agrees on countermeasures. It is a core part of Japanese workplace safety culture, not just paperwork. 🇯🇵 TIP: Speak up during KY meetings even as a newcomer — pointing out a hazard you noticed is viewed as valuable input, not as questioning your seniors."
      },
      {
        id: 20, cat: "KY Activity (Hazard Prediction)",
        q: "During a KY activity, a worker identifies 'wet floor near the press' as a risk. What is the next correct step?",
        opts: [
          "Note it but take no action since the shift just started",
          "Ignore it because it has always been like that",
          "Wait until lunch break to deal with it",
          "Agree on a specific countermeasure, like wiping the floor or placing a warning sign, before starting work"
        ],
        a: 3, xp: 20,
        exp: "The purpose of KY Katsudou (KY活動) is not just to list hazards but to agree on concrete countermeasures before work begins, closing the loop between identifying and preventing risk. Skipping the countermeasure step defeats the purpose of the activity. 🇯🇵 TIP: Many Japanese teams finish KY meetings with everyone raising a hand and calling out 'Goannzen (ご安全に, Be safe)' together — join in, it builds team trust."
      }
    ]
  },
  {
    stageId: 2,
    label: "STAGE 2 — Tools & Machine Names",
    color: "#00CED1",
    icon: "⚙️",
    unlockXP: 200,
    questions: [
      {
        id: 101, cat: "Calipers (Nogisu)",
        q: "Your supervisor hands you 'Nogisu (ノギス)' and asks you to check a part's outer diameter. What is this tool used for?",
        opts: [
          "Measuring length, diameter, and depth with a sliding scale",
          "Measuring temperature of metal",
          "Cutting sheet metal edges",
          "Polishing rough surfaces"
        ],
        a: 0, xp: 15,
        exp: "Nogisu (ノギス), calipers, use a sliding vernier or digital scale to measure outer dimensions, inner dimensions, and depth on a single tool. They are one of the most common measuring tools on a shop floor. 🇯🇵 TIP: Always zero-check your Nogisu (ノギス) at the start of a shift — Japanese quality culture treats an uncalibrated tool as a personal responsibility, not just an equipment issue."
      },
      {
        id: 102, cat: "Calipers (Nogisu)",
        q: "While using digital Nogisu (ノギス) to measure a shaft, the reading seems inconsistent each time. What should you check first?",
        opts: [
          "The factory lighting",
          "Whether the jaws are clean and the part is measured perpendicular to the jaws",
          "The color of the part",
          "The brand name on the tool"
        ],
        a: 1, xp: 20,
        exp: "Inconsistent caliper readings are usually caused by dirt or chips on the measuring jaws, or by holding the part at an angle instead of square to the jaws. Both issues introduce measurement error that has nothing to do with the part itself. 🇯🇵 TIP: Wipe both the tool jaws and the part surface with a clean cloth before measuring — this small habit is taught on day one in most Japanese machine shops."
      },
      {
        id: 103, cat: "Micrometer (Maikurometa)",
        q: "For measuring a precision shaft diameter to within 0.01mm, which tool is most appropriate?",
        opts: [
          "A standard tape measure",
          "A simple ruler",
          "Maikurometa (マイクロメータ), a micrometer",
          "Nogisu (ノギス) only, since it is always more precise"
        ],
        a: 2, xp: 20,
        exp: "Maikurometa (マイクロメータ), a micrometer, provides much finer precision than calipers, typically reading to 0.01mm or even 0.001mm, making it the standard tool for critical diameter checks. Calipers are convenient but generally less precise for tight tolerances. 🇯🇵 TIP: Many Japanese shops require a 'tool calibration sticker' (検査済 sticker) on micrometers — never use one past its inspection due date."
      },
      {
        id: 104, cat: "Micrometer (Maikurometa)",
        q: "Before using a Maikurometa (マイクロメータ) for the first time today, what should you do?",
        opts: [
          "Use it immediately without checking anything",
          "Apply oil to the spindle threads",
          "Shake it to check for looseness",
          "Close the spindle on the anvil with no part and confirm it reads zero"
        ],
        a: 3, xp: 20,
        exp: "Checking the zero point of a micrometer by closing the spindle on the anvil with nothing in between confirms the tool has not drifted out of calibration. Skipping this step can let a worn or misadjusted tool pass bad measurements as good. 🇯🇵 TIP: If you find a tool out of calibration, report it right away rather than 'mentally adjusting' your readings — Japanese QC systems rely on traceable, honest reporting."
      },
      {
        id: 105, cat: "Dial Gauge (Daiyaru-geeji)",
        q: "A 'Daiyaru-geeji (ダイヤルゲージ)' is most commonly used to check what on a rotating part?",
        opts: [
          "Runout or flatness deviation as the part rotates",
          "Surface color",
          "Total weight",
          "Magnetic properties"
        ],
        a: 0, xp: 20,
        exp: "Daiyaru-geeji (ダイヤルゲージ), a dial gauge (dial indicator), measures small deviations in movement, commonly used to check runout, flatness, or alignment as a part rotates on a lathe or fixture. The needle shows tiny deviations that the eye cannot detect directly. 🇯🇵 TIP: Mount the dial gauge stand firmly before reading — Japanese trainers often say a wobbling stand 'lies' to you, since it changes the reading itself."
      },
      {
        id: 106, cat: "Dial Gauge (Daiyaru-geeji)",
        q: "Using a Daiyaru-geeji (ダイヤルゲージ) on a spinning shaft, the needle swings further than expected at one point. What does this likely indicate?",
        opts: [
          "The shaft is perfectly round",
          "The shaft has a bend or runout problem at that point",
          "The gauge battery is low",
          "The shaft is too cold"
        ],
        a: 1, xp: 25,
        exp: "A larger-than-expected needle swing during rotation usually indicates the shaft is not perfectly round or straight at that point, called runout. This kind of deviation can cause vibration, poor fit, or premature wear in assembly. 🇯🇵 TIP: When reporting a runout problem, bring the actual reading number, not just 'it looks off' — Japanese supervisors expect data-based reporting (数値で報告)."
      },
      {
        id: 107, cat: "Lathe (Senban)",
        q: "What is a 'Senban (旋盤)' primarily used for in a machining shop?",
        opts: [
          "Bending sheet metal",
          "Welding two metal pieces together",
          "Rotating a workpiece against a cutting tool to shape cylindrical parts",
          "Measuring surface roughness"
        ],
        a: 2, xp: 15,
        exp: "Senban (旋盤), a lathe, rotates the workpiece while a cutting tool removes material to create cylindrical shapes, threads, and tapers. It is one of the oldest and most fundamental machine tools in metalworking. 🇯🇵 TIP: Never reach near a rotating chuck on a Senban (旋盤) even briefly — loose sleeves or gloves can be pulled in instantly, so Japanese shops strictly ban loose clothing near lathes."
      },
      {
        id: 108, cat: "Lathe (Senban)",
        q: "Your trainer tells you to never wear gloves while operating a Senban (旋盤). Why is this rule important?",
        opts: [
          "Gloves make hands too cold to feel vibration",
          "Gloves are simply against the dress code",
          "Gloves slow down production speed",
          "Gloves can get caught in the rotating chuck or tool, pulling the hand in"
        ],
        a: 3, xp: 25,
        exp: "Gloves can easily get snagged by a spinning chuck or workpiece on a lathe, and once caught, there is often no time to pull free before serious injury occurs. This is why most Japanese machine shops strictly forbid gloves around rotating spindles. 🇯🇵 TIP: If you need hand protection for sharp swarf, ask about cut-resistant sleeves instead of gloves — supervisors will guide you to the approved alternative."
      },
      {
        id: 109, cat: "Milling Machine (Furaisuban)",
        q: "A 'Furaisuban (フライス盤)' differs from a lathe mainly because:",
        opts: [
          "The cutting tool rotates while the workpiece is typically held stationary or moved on a table",
          "It only measures parts, never cuts them",
          "It can only cut plastic, not metal",
          "It has no motor and is hand-powered"
        ],
        a: 0, xp: 20,
        exp: "On a Furaisuban (フライス盤), a milling machine, the cutting tool itself rotates while the workpiece is fed into it on a table, the opposite setup from a lathe where the workpiece rotates. This allows milling machines to cut flat surfaces, slots, and complex shapes. 🇯🇵 TIP: Always confirm the workpiece is fully clamped before starting a mill — Japanese trainers often test new workers by tapping the part lightly to see if it shifts."
      },
      {
        id: 110, cat: "Milling Machine (Furaisuban)",
        q: "While setting up a job on a Furaisuban (フライス盤), you notice the vise is not fully tightened. What should you do?",
        opts: [
          "Start the job anyway since it looks close enough",
          "Stop and properly tighten the vise before running the spindle",
          "Run at a slower speed to compensate",
          "Ask a coworker to hold the part by hand instead"
        ],
        a: 1, xp: 20,
        exp: "An improperly clamped workpiece can shift or be thrown during milling, damaging the part, the tool, or causing injury. Proper clamping must always be confirmed before the spindle starts, regardless of time pressure. 🇯🇵 TIP: In Japanese shops it is normal and expected to redo a setup check even if it costs a few extra minutes — rushing setup is viewed as a bigger risk than a short delay."
      },
      {
        id: 111, cat: "Press Machine (Puresu-ki)",
        q: "What does a 'Puresu-ki (プレス機)' do in a sheet metal shop?",
        opts: [
          "Heats metal until it melts",
          "Measures the thickness of coils",
          "Applies force through a die to cut, bend, or form sheet metal",
          "Paints finished parts"
        ],
        a: 2, xp: 15,
        exp: "Puresu-ki (プレス機), a press machine, uses mechanical or hydraulic force to push a punch and die together, shaping, cutting, or bending sheet metal in a single stroke. It is central to high-volume sheet metal production. 🇯🇵 TIP: Learn the specific stop button location for each Puresu-ki (プレス機) you work on, since emergency stop placement can vary slightly between machine models in the same shop."
      },
      {
        id: 112, cat: "Press Machine (Puresu-ki)",
        q: "You hear a strange repeated clicking sound from a Puresu-ki (プレス機) during operation. What is the correct response?",
        opts: [
          "Continue running and report it at the end of the shift",
          "Increase the speed to see if the sound goes away",
          "Ignore it if production is on schedule",
          "Stop the machine and report the abnormal sound immediately"
        ],
        a: 3, xp: 25,
        exp: "An unusual sound from a press machine can signal a developing mechanical fault that may lead to sudden failure or a safety incident. Stopping immediately and reporting prevents a small issue from becoming a major breakdown or accident. 🇯🇵 TIP: Use the phrase 'oto ga okashii (音がおかしい, the sound is strange)' when reporting — this specific phrasing is well understood by Japanese maintenance staff as a request for prompt inspection."
      },
      {
        id: 113, cat: "Drill Press (Booruban)",
        q: "A 'Booruban (ボール盤)' is mainly used for what operation?",
        opts: [
          "Drilling precise holes into a workpiece",
          "Bending metal sheets into shapes",
          "Polishing the surface of a part",
          "Cutting threads on the outside of a bolt"
        ],
        a: 0, xp: 15,
        exp: "Booruban (ボール盤), a drill press, holds a rotating drill bit in a fixed vertical position to bore accurate holes into a workpiece clamped on the table. It offers more control and accuracy than a handheld drill. 🇯🇵 TIP: Always clamp small parts rather than holding them by hand on a Booruban (ボール盤) — a spinning drill can grab and spin a loose part violently, a common cause of hand injuries."
      },
      {
        id: 114, cat: "Drill Press (Booruban)",
        q: "Before drilling a hole with a Booruban (ボール盤), why should you mark the center point with a center punch first?",
        opts: [
          "It is just a decoration on the part",
          "It prevents the drill bit from wandering off position when starting the hole",
          "It cools the metal before drilling",
          "It is required only for plastic parts"
        ],
        a: 1, xp: 20,
        exp: "A center punch mark creates a small dent that guides the drill tip, preventing it from sliding or 'walking' across the surface before it bites in. This simple step greatly improves hole position accuracy. 🇯🇵 TIP: Japanese trainers often emphasize 'shita junbi (下準備, preparation beforehand)' — taking time on small prep steps like punching is seen as a mark of a skilled worker, not wasted time."
      },
      {
        id: 115, cat: "Hand Tap (Hando-tappu)",
        q: "What is a 'Hando-tappu (ハンドタップ)' used for?",
        opts: [
          "Measuring hole depth",
          "Polishing a rough surface",
          "Cutting internal threads into a drilled hole by hand",
          "Bending thin sheet metal"
        ],
        a: 2, xp: 15,
        exp: "Hando-tappu (ハンドタップ), a hand tap, is turned by hand using a tap wrench to cut internal threads into a pre-drilled hole, allowing a bolt to be screwed in later. It requires careful alignment to avoid breaking the tap inside the hole. 🇯🇵 TIP: If a Hando-tappu (ハンドタップ) feels like it is binding, back it off slightly rather than forcing it — broken taps stuck in a part are notoriously hard to remove and are taken seriously as a costly mistake."
      },
      {
        id: 116, cat: "Hand Tap (Hando-tappu)",
        q: "While using a Hando-tappu (ハンドタップ), what is the correct technique to avoid breaking the tap?",
        opts: [
          "Turn continuously in one direction as fast as possible",
          "Apply heavy downward force while turning",
          "Use no cutting oil to keep the hole dry",
          "Turn forward partially, then back off slightly to clear chips, repeating in a steady rhythm"
        ],
        a: 3, xp: 20,
        exp: "The forward-and-back technique clears metal chips from the flutes of the tap, reducing the chance of binding or snapping inside the hole. Cutting oil also reduces friction and heat during tapping. 🇯🇵 TIP: Many Japanese workers say 'ichi, ni no san (一、二の三)' rhythmically while tapping by hand — adopting a steady count helps maintain the right pace and feel."
      },
      {
        id: 117, cat: "Reamer (Riima)",
        q: "What is the purpose of a 'Riima (リーマ)' after a hole has already been drilled?",
        opts: [
          "To enlarge and finish the hole to a precise, smooth diameter",
          "To weld the hole closed",
          "To paint the inside of the hole",
          "To measure hole roundness only"
        ],
        a: 0, xp: 20,
        exp: "Riima (リーマ), a reamer, is used after drilling to slightly enlarge a hole and bring it to a precise final diameter with a smooth, accurate finish, which a standard drill bit cannot achieve alone. Reaming is a common finishing step for dowel pin holes and precision bores. 🇯🇵 TIP: Never reverse a Riima (リーマ) while it is still inside the hole — pulling it out backward can damage both the tool and the hole's finish, a mistake Japanese trainers warn about early."
      },
      {
        id: 118, cat: "Reamer (Riima)",
        q: "A reamed hole comes out slightly oversized after using a Riima (リーマ). What is a likely cause?",
        opts: [
          "The reamer was too small for the original drilled hole",
          "Excessive force or speed caused the reamer to wander, removing too much material",
          "The part was too cold",
          "The operator wore gloves"
        ],
        a: 1, xp: 25,
        exp: "Reaming requires steady, controlled feed and the correct speed; excessive force or incorrect RPM can cause the reamer to wander or chatter, removing more material than intended and producing an oversized, rough hole. Reamers are precision finishing tools, not rough cutting tools. 🇯🇵 TIP: Always check the recommended speed and feed chart posted near Japanese machine stations — these reference sheets exist specifically to prevent this kind of mistake."
      },
      {
        id: 119, cat: "Torque Wrench (Toruku-renchi)",
        q: "Why would a supervisor specifically hand you a 'Toruku-renchi (トルクレンチ)' instead of a regular wrench for tightening bolts on a fixture?",
        opts: [
          "It looks more professional",
          "It is lighter to carry around",
          "It allows tightening bolts to a precise, specified torque value to avoid over- or under-tightening",
          "It works faster than a regular wrench"
        ],
        a: 2, xp: 20,
        exp: "Toruku-renchi (トルクレンチ), a torque wrench, lets you tighten a bolt to an exact specified torque value, which is critical for safety-critical or precision fixtures where over-tightening can strip threads and under-tightening can let parts loosen during operation. Regular wrenches give no such control. 🇯🇵 TIP: Always return a torque wrench to its lowest setting after use and store it in its case — Japanese tool rooms inspect torque wrenches carefully since incorrect storage can throw off calibration."
      },
      {
        id: 120, cat: "Torque Wrench (Toruku-renchi)",
        q: "A work instruction specifies '25 N·m' for a bolt using a Toruku-renchi (トルクレンチ). What does this number represent?",
        opts: [
          "The bolt's length in millimeters",
          "The bolt's weight in grams",
          "The number of turns required",
          "The required tightening torque, a measure of rotational force"
        ],
        a: 3, xp: 20,
        exp: "N·m (newton-meters) is the unit of torque, representing the rotational force applied when tightening a fastener; following the specified value precisely ensures the joint is neither loose nor overstressed. Work instructions in Japanese factories often specify torque values exactly for this reason. 🇯🇵 TIP: If you are unsure which torque value applies, always check the work instruction sheet (作業手順書) rather than guessing from memory or experience on a different product."
      }
    ]
  },
  {
    stageId: 3,
    label: "STAGE 3 — Sheet Metal & Press",
    color: "#4169E1",
    icon: "🔨",
    unlockXP: 400,
    questions: [
      {
        id: 201, cat: "Burr (Bari)",
        q: "After a sheet metal part is cut, you notice sharp raised edges. What is this called in Japanese shops?",
        opts: [
          "Bari (バリ), burr",
          "Mage (曲げ), bending",
          "Kanagata (金型), die",
          "Sendan (せん断), shearing"
        ],
        a: 0, xp: 15,
        exp: "Bari (バリ), burr, refers to the sharp raised material left along a cut or punched edge after shearing or blanking. It must be removed (deburred) before the part is safe to handle or assembled. 🇯🇵 TIP: Always wear cut-resistant gloves when deburring by hand — even small Bari (バリ) edges can cause surprisingly deep cuts."
      },
      {
        id: 202, cat: "Burr (Bari)",
        q: "Which factor is most likely to increase the amount of Bari (バリ) produced when punching a hole?",
        opts: [
          "Using a sharp punch and correct clearance",
          "A worn or dull punch and excessive die clearance",
          "Lower production speed",
          "Using thinner sheet metal only"
        ],
        a: 1, xp: 20,
        exp: "A dull punch or excessive clearance between punch and die causes the metal to tear rather than shear cleanly, producing larger burrs along the cut edge. Maintaining sharp tooling and correct clearance keeps Bari (バリ) to a minimum. 🇯🇵 TIP: If burrs suddenly increase on a job that was running fine, report it as a possible tool wear issue rather than just deburring harder — catching tool wear early saves the whole batch."
      },
      {
        id: 203, cat: "Chamfer (Mentori)",
        q: "A drawing note says to apply 'Mentori (面取り)' to all sharp edges. What does this instruction mean?",
        opts: [
          "Polish the surface to a mirror finish",
          "Drill a hole at that location",
          "Cut a small angled or rounded edge to remove sharpness",
          "Paint the edge a different color"
        ],
        a: 2, xp: 15,
        exp: "Mentori (面取り), chamfering, means cutting a small angled or rounded edge on a sharp corner, which improves safety for handling, helps parts fit together, and prevents edge chipping. It is one of the most common finishing notes on technical drawings. 🇯🇵 TIP: When a drawing just says 'C1' or 'C0.5' next to an edge, this is shorthand for a 1mm or 0.5mm chamfer — learning these drawing abbreviations quickly will save you many questions to your supervisor."
      },
      {
        id: 204, cat: "Chamfer (Mentori)",
        q: "Why is Mentori (面取り) especially important on a shaft that will be inserted into a bearing?",
        opts: [
          "It makes the shaft heavier",
          "It changes the shaft's hardness",
          "It is purely decorative",
          "It prevents the sharp edge from damaging the bearing or operator's hands during assembly"
        ],
        a: 3, xp: 20,
        exp: "A sharp, unchamfered edge on a shaft can scrape or gouge the inner surface of a bearing during insertion, damaging both parts, and can also cut an assembler's hands. A small chamfer guides the shaft in smoothly. 🇯🇵 TIP: If you find a part missing its required Mentori (面取り), flag it before it reaches assembly — catching this kind of omission early is valued more than fixing it after a customer complaint."
      },
      {
        id: 205, cat: "Bending (Mage)",
        q: "What does 'Mage (曲げ)' refer to in sheet metal processing?",
        opts: [
          "Forming a sheet metal part by bending it along a line",
          "Cutting a sheet into separate pieces",
          "Polishing a flat surface",
          "Welding two sheets together"
        ],
        a: 0, xp: 15,
        exp: "Mage (曲げ), bending, is the process of deforming sheet metal along a straight line using a press brake to create angles, flanges, or box shapes. The bend line and angle are usually specified precisely on the drawing. 🇯🇵 TIP: Always check the bend direction arrow on the drawing carefully — a part bent the wrong direction (上下逆, upside down) is a common and costly mistake for new operators."
      },
      {
        id: 206, cat: "Bending (Mage)",
        q: "After Mage (曲げ) forming, a part's final angle is slightly more open than the die angle used to form it. What phenomenon causes this?",
        opts: [
          "Thermal expansion from punching heat",
          "Supuringu-bakku (スプリングバック), springback, where the metal partially returns toward its original shape",
          "The metal melting slightly during bending",
          "Incorrect coloring of the sheet metal"
        ],
        a: 1, xp: 25,
        exp: "When sheet metal is bent, the material has some elastic recovery after the press releases it, called Supuringu-bakku (スプリングバック), springback, causing the final angle to be slightly more open than the die angle. Experienced press operators compensate by over-bending slightly. 🇯🇵 TIP: Keep a record of how much over-bend your specific machine and material need — many Japanese operators keep handwritten notebooks of these compensation values for different jobs."
      },
      {
        id: 207, cat: "Blanking (Nuki)",
        q: "What does 'Nuki (抜き)' mean when referring to a press operation?",
        opts: [
          "Polishing a surface to remove scratches",
          "Heating metal until soft",
          "Punching or cutting a flat shape out of sheet metal stock",
          "Bending metal into a U shape"
        ],
        a: 2, xp: 15,
        exp: "Nuki (抜き), blanking, is the process of punching a flat shape out of sheet metal, separating it cleanly from the surrounding material using a punch and die. It is often the first step before further forming operations. 🇯🇵 TIP: Listen for the press sound during Nuki (抜き) operations — an experienced operator can often tell from sound alone whether the punch is becoming dull, a skill worth learning."
      },
      {
        id: 208, cat: "Blanking (Nuki)",
        q: "During Nuki (抜き), the scrap piece sometimes sticks to the punch instead of falling away. What safety risk does this create?",
        opts: [
          "No risk, it is purely a quality issue",
          "It only affects part color",
          "It causes the machine to run faster than normal",
          "The stuck scrap can be ejected unexpectedly or require risky manual removal near the die area"
        ],
        a: 3, xp: 25,
        exp: "Scrap sticking to the punch can be ejected suddenly when the press cycles again, or it may tempt an operator to reach into the die area to remove it manually, both of which are dangerous. The correct response is to stop the machine and use proper tools or procedures to clear it. 🇯🇵 TIP: Never reach into a die area with the press power on, even 'just for a second' — Japanese safety training repeats this rule constantly because momentary shortcuts are how serious accidents happen."
      },
      {
        id: 209, cat: "Drawing Process (Shibori)",
        q: "What is 'Shibori (絞り)' in sheet metal forming?",
        opts: [
          "A deep drawing process that forms sheet metal into cup or box shapes using a punch and die",
          "A method of cutting threads",
          "A surface coating process",
          "A way of measuring material thickness"
        ],
        a: 0, xp: 20,
        exp: "Shibori (絞り), deep drawing, stretches and forms a flat sheet metal blank into a three-dimensional shape like a cup, can, or box using a punch pressed into a die cavity. It requires careful control of blank holding force to avoid wrinkling or tearing. 🇯🇵 TIP: If you notice wrinkling on the flange of a Shibori (絞り) part, mention the blank holder pressure setting to your supervisor — this is usually the first thing experienced operators check."
      },
      {
        id: 210, cat: "Drawing Process (Shibori)",
        q: "A part formed by Shibori (絞り) shows cracking near the bottom corner. What is a likely cause?",
        opts: [
          "Too much lubricant was used",
          "The material was stretched beyond its limit, often from excessive draw depth or insufficient lubrication",
          "The press ran too slowly",
          "The blank was too large"
        ],
        a: 1, xp: 25,
        exp: "Cracking during deep drawing usually indicates the material was stretched past its forming limit, which can result from too much draw depth relative to material thickness, poor lubrication, or incorrect blank holder force. Adequate lubrication and proper tooling design help the material flow rather than tear. 🇯🇵 TIP: When reporting a forming defect, bring the actual cracked part to your supervisor rather than just describing it — Japanese quality discussions strongly prefer 'genbutsu (現物, the actual item)' over verbal description alone."
      },
      {
        id: 211, cat: "Springback (Supuringu-bakku)",
        q: "Why do press shops often program a bend angle slightly tighter than the final required angle?",
        opts: [
          "To use less material",
          "To make the part look more bent for inspection",
          "To compensate for Supuringu-bakku (スプリングバック), springback, so the final part settles at the correct angle",
          "It has no real purpose, just tradition"
        ],
        a: 2, xp: 20,
        exp: "Because metal naturally springs back slightly toward its original flat shape after bending, over-bending slightly compensates so the final, relaxed angle matches the drawing requirement. This compensation amount varies by material type and thickness. 🇯🇵 TIP: Harder materials and thicker sheets generally springback more — ask your supervisor for the specific compensation chart used for each material in your shop."
      },
      {
        id: 212, cat: "Springback (Supuringu-bakku)",
        q: "A switch from mild steel to stainless steel (SUS) on the same bending die produces a noticeably different final angle. What is the most likely explanation?",
        opts: [
          "The die size changed accidentally",
          "The press lost power",
          "The drawing was wrong from the start",
          "SUS has different springback characteristics than mild steel, requiring different compensation"
        ],
        a: 3, xp: 25,
        exp: "Different materials have different elastic properties, so Supuringu-bakku (スプリングバック) behavior changes between materials like mild steel and stainless steel (SUS) even using the same die and angle setting. Process parameters often need adjustment when material changes. 🇯🇵 TIP: Always double check the material code on the work order before starting a new batch — mixing up SS400 and SUS304 jobs on the same line is a classic and costly error in Japanese shops."
      },
      {
        id: 213, cat: "Die/Mold (Kanagata)",
        q: "What does 'Kanagata (金型)' refer to in press shop terminology?",
        opts: [
          "The tooling, die or mold, used to cut or form the sheet metal",
          "The finished sheet metal product",
          "The raw material coil",
          "The packaging box for parts"
        ],
        a: 0, xp: 15,
        exp: "Kanagata (金型), die or mold, refers to the precision tooling mounted in the press that shapes, cuts, or forms the sheet metal as the press cycles. A single die set can be extremely expensive and is treated as a critical company asset. 🇯🇵 TIP: Always handle Kanagata (金型) according to the storage and lifting procedure posted nearby — dropping or scratching die tooling can cost far more than a damaged part."
      },
      {
        id: 214, cat: "Die/Mold (Kanagata)",
        q: "Before installing a Kanagata (金型) into the press, what should be checked first?",
        opts: [
          "The color of the die set",
          "That the die is clean, undamaged, and matches the correct part number for the job",
          "The brand of the press machine",
          "The weather outside"
        ],
        a: 1, xp: 20,
        exp: "Confirming the correct die matches the part number prevents producing wrong or defective parts, and checking for cleanliness or damage prevents installing a faulty tool that could damage the press or create scrap. This check is a standard step before every die change. 🇯🇵 TIP: Many Japanese shops use a die-change checklist (金型交換チェックリスト) that must be signed off — always follow it fully even under time pressure to finish a changeover quickly."
      },
      {
        id: 215, cat: "Clearance (Kuriaransu)",
        q: "In a blanking die, what does 'Kuriaransu (クリアランス)' refer to?",
        opts: [
          "The total weight of the die set",
          "The color coating on the punch",
          "The gap between the punch and the die opening",
          "The speed of the press stroke"
        ],
        a: 2, xp: 20,
        exp: "Kuriaransu (クリアランス), clearance, is the small gap between the punch and the die opening, and its size directly affects cut quality, burr size, and tool life. Too little clearance increases tool wear; too much increases burr and part distortion. 🇯🇵 TIP: If burrs suddenly get worse on a long-running job, suspect the Kuriaransu (クリアランス) has changed due to tool wear before assuming the material itself changed."
      },
      {
        id: 216, cat: "Clearance (Kuriaransu)",
        q: "A die designed for 0.5mm steel is mistakenly used on 1.0mm steel without adjustment. What problem does this likely cause related to Kuriaransu (クリアランス)?",
        opts: [
          "No effect at all, clearance does not matter for thickness",
          "The press will run faster automatically",
          "Only the part color will change",
          "Incorrect clearance for the thicker material, leading to excessive burr or part damage"
        ],
        a: 3, xp: 25,
        exp: "Die clearance is calculated based on material type and thickness, so using a die designed for thinner material on thicker stock creates incorrect clearance, often resulting in excessive burr, tearing, or accelerated tool wear. Material thickness changes generally require a different die or clearance adjustment. 🇯🇵 TIP: Always confirm material thickness against the work order before running a job, since visually similar coils can have different gauges that are easy to mix up."
      },
      {
        id: 217, cat: "Shearing (Sendan)",
        q: "What does 'Sendan (せん断)' describe in metal cutting?",
        opts: [
          "Cutting metal by applying opposing forces that shear it apart, like scissors",
          "Melting metal with heat",
          "Polishing a rough surface smooth",
          "Bending metal into a curve"
        ],
        a: 0, xp: 20,
        exp: "Sendan (せん断), shearing, is a cutting process where two opposing forces, like the punch and die or shear blades, cut through the metal similar to how scissors cut paper. Most punching, blanking, and trimming operations rely on this shearing action. 🇯🇵 TIP: Keep fingers well clear of any Sendan (せん断) shear line, even on hand-operated shears — these blades close with enough force to cause amputation injuries instantly."
      },
      {
        id: 218, cat: "Shearing (Sendan)",
        q: "A guillotine shear used for cutting sheet metal coil requires what safety feature to protect the operator's hands?",
        opts: [
          "A simple warning sticker only",
          "A guard or light curtain that prevents hand access to the Sendan (せん断) blade area during operation",
          "Bright lighting around the machine",
          "A faster cutting speed"
        ],
        a: 1, xp: 20,
        exp: "Shearing machines apply enormous cutting force in a small area, so physical guards or light curtains are required to physically or electronically block hand access to the blade zone during the cutting stroke. These safeguards are a legal requirement, not optional add-ons. 🇯🇵 TIP: If a guard on a shear machine is missing or disabled, stop work and report it immediately — operating without required guarding is treated as a serious violation in Japanese factories."
      },
      {
        id: 219, cat: "Stripper (Sutorippa)",
        q: "What is the function of a 'Sutorippa (ストリッパー)' plate in a punching die?",
        opts: [
          "It strips paint off the part",
          "It heats the sheet metal",
          "It holds the sheet metal down and helps strip the part off the punch after the stroke",
          "It measures part dimensions"
        ],
        a: 2, xp: 20,
        exp: "Sutorippa (ストリッパー), the stripper plate, holds the sheet metal flat against the die during punching and then strips the workpiece or scrap off the punch as it retracts, preventing the material from sticking and being carried upward. Without it, parts can jam or be ejected unpredictably. 🇯🇵 TIP: If parts are coming out stuck or jammed at the Sutorippa (ストリッパー), report it rather than forcing it free by hand while the press is powered, since this is a common cause of crush injuries."
      },
      {
        id: 220, cat: "Stripper (Sutorippa)",
        q: "During die maintenance, you notice the Sutorippa (ストリッパー) plate is bent slightly. What is the risk if it is not repaired?",
        opts: [
          "No risk, stripper plates are not important",
          "The press will run more quietly",
          "The die will become lighter",
          "Parts may not release properly, causing jams, double-feeds, or damage during the press cycle"
        ],
        a: 3, xp: 25,
        exp: "A bent or damaged stripper plate can fail to hold material correctly or release parts cleanly, leading to jams, double feeding, or material being carried into the press in an uncontrolled way, which can damage the die or create a safety hazard. Stripper plate condition should be part of routine die maintenance checks. 🇯🇵 TIP: Log any die abnormality you find in the maintenance notebook (金型メンテナンス記録), even small ones — Japanese maintenance teams rely heavily on this written history to catch developing problems early."
      }
    ]
  },
  {
    stageId: 4,
    label: "STAGE 4 — Machining",
    color: "#6A5ACD",
    icon: "⚙️",
    unlockXP: 600,
    questions: [
      {
        id: 301, cat: "Turning (Senshoku)",
        q: "What is 'Senshoku (旋削)' in machining terminology?",
        opts: [
          "The process of turning a workpiece on a lathe to remove material",
          "Spraying paint onto a finished part",
          "Measuring a part with calipers",
          "Welding two metal rods together"
        ],
        a: 0, xp: 15,
        exp: "Senshoku (旋削), turning, is the machining process performed on a lathe where the rotating workpiece is shaped by a stationary cutting tool. It is used to create cylindrical, conical, and threaded features. 🇯🇵 TIP: When learning Senshoku (旋削) terms, note that many machining words pair a kanji term with a katakana loanword for the same concept — both are commonly used interchangeably on the shop floor."
      },
      {
        id: 302, cat: "Turning (Senshoku)",
        q: "During Senshoku (旋削), the surface finish on the part is rougher than expected. What is one common cause?",
        opts: [
          "The cutting tool is too sharp",
          "Excessive cutting speed, wrong feed rate, or a worn tool edge",
          "Using cutting fluid",
          "The part is too short"
        ],
        a: 1, xp: 20,
        exp: "Poor surface finish during turning often comes from an incorrect feed rate, excessive speed for the material, or a dull/worn tool edge that tears rather than cleanly cuts the surface. Adjusting speed, feed, and checking tool condition usually resolves it. 🇯🇵 TIP: Compare your part's finish against a surface roughness sample block if your shop has one — this physical comparison method is widely used on Japanese shop floors before resorting to lab measurement."
      },
      {
        id: 303, cat: "Milling (Furaisukezuri)",
        q: "What does 'Furaisu Kezuri (フライス削り)' refer to?",
        opts: [
          "Polishing with a cloth wheel",
          "Cutting threads with a tap",
          "Material removal performed by a rotating milling cutter on a milling machine",
          "Bending a metal bracket"
        ],
        a: 2, xp: 15,
        exp: "Furaisu Kezuri (フライス削り), milling, refers to the cutting action of a rotating multi-tooth cutter as it removes material from a workpiece, used for flat surfaces, slots, pockets, and contours. It is a fundamental subtractive machining process. 🇯🇵 TIP: Always check the rotation direction setting before starting a milling job — running the spindle backward by mistake can damage both the tool and the part instantly."
      },
      {
        id: 304, cat: "Milling (Furaisukezuri)",
        q: "While performing Furaisu Kezuri (フライス削り), you hear chattering vibration and see a wavy finish. What is the likely cause?",
        opts: [
          "The coolant is too clean",
          "The part is too small to mill",
          "The cutting tool color changed",
          "Insufficient rigidity in setup, excessive cutting depth, or wrong speed causing tool chatter"
        ],
        a: 3, xp: 25,
        exp: "Chatter during milling typically results from insufficient workholding rigidity, too aggressive a cutting depth, or running at the wrong spindle speed for the tool and material combination, causing vibration that leaves a wavy surface finish. Adjusting these parameters or improving the setup usually solves it. 🇯🇵 TIP: If chatter appears suddenly on a previously stable job, check tool wear first — Japanese machinists often say a tool 'getting tired' (刃が弱ってきた) is a common hidden cause."
      },
      {
        id: 305, cat: "Cutting Speed (Sessoku-sokudo)",
        q: "What does 'Sessoku Sokudo (切削速度)' refer to in machining?",
        opts: [
          "The relative speed between the cutting tool edge and the workpiece surface",
          "The speed at which the operator walks around the machine",
          "The RPM of the coolant pump",
          "The feed rate of the table only"
        ],
        a: 0, xp: 20,
        exp: "Sessoku Sokudo (切削速度), cutting speed, refers to the surface speed at which the cutting edge passes over the workpiece material, usually expressed in meters per minute, and is a key factor in tool life and finish quality. It is calculated from spindle RPM and workpiece or tool diameter. 🇯🇵 TIP: Keep a copy of the recommended Sessoku Sokudo (切削速度) chart for common materials at your station — referring to it instead of guessing is standard practice among experienced Japanese machinists."
      },
      {
        id: 306, cat: "Cutting Speed (Sessoku-sokudo)",
        q: "Running Sessoku Sokudo (切削速度) too high for the material being cut typically results in what problem?",
        opts: [
          "Longer tool life and better finish",
          "Excessive heat buildup, faster tool wear, and possible tool failure",
          "Slower material removal rate only",
          "No change to the process"
        ],
        a: 1, xp: 25,
        exp: "Cutting speed that is too high for the material generates excessive heat at the cutting edge, accelerating tool wear and potentially causing the tool to fail or the workpiece to discolor or warp. Matching speed to the material's recommended range balances productivity and tool life. 🇯🇵 TIP: When in doubt about the right speed for an unfamiliar material, ask a senior operator (先輩, senpai) rather than guessing — asking questions is viewed as responsible, not as a weakness."
      },
      {
        id: 307, cat: "Feed Rate (Okuri-ryo)",
        q: "What does 'Okuri Ryou (送り量)' control during a machining operation?",
        opts: [
          "The amount of coolant sprayed per minute",
          "The total weight of removed material",
          "How far the cutting tool or table advances per revolution or per minute",
          "The temperature of the spindle motor"
        ],
        a: 2, xp: 20,
        exp: "Okuri Ryou (送り量), feed rate, controls how much the tool or table advances relative to the rotating spindle, directly affecting surface finish, cutting force, and cycle time. Too high a feed rate can overload the tool; too low can cause rubbing instead of cutting. 🇯🇵 TIP: Many Japanese work instructions list both speed and Okuri Ryou (送り量) together as a set — never change one value without checking whether the other also needs adjustment."
      },
      {
        id: 308, cat: "Feed Rate (Okuri-ryo)",
        q: "A part shows excessive tool deflection marks after a roughing pass. What adjustment to Okuri Ryou (送り量) might help?",
        opts: [
          "Increase it further to finish faster",
          "Stop using coolant",
          "Switch to a larger diameter tool with no other changes",
          "Reduce the feed rate or take a lighter cut to lower cutting force"
        ],
        a: 3, xp: 20,
        exp: "Excessive tool deflection usually means the cutting force is too high for the tool's rigidity, often solved by reducing the feed rate (Okuri Ryou, 送り量) or cutting depth to lower the load on the tool. Simply changing tool size without adjusting these parameters may not solve the underlying force issue. 🇯🇵 TIP: Document any parameter change you make to fix a quality issue on the job's process sheet — this kind of record-keeping habit is expected so the next operator does not repeat the same mistake."
      },
      {
        id: 309, cat: "Depth of Cut (Kirikomi)",
        q: "What does 'Kirikomi (切り込み)' refer to in a machining operation?",
        opts: [
          "The depth the cutting tool penetrates into the material on each pass",
          "The angle of the cutting tool only",
          "The color of the chips produced",
          "The brand of the cutting tool"
        ],
        a: 0, xp: 20,
        exp: "Kirikomi (切り込み), depth of cut, is how deep the tool bites into the material during each pass, directly affecting cutting force, tool load, and how many passes are needed to reach final dimension. It must be balanced with speed and feed for efficient, safe machining. 🇯🇵 TIP: For roughing passes, Japanese training often emphasizes a larger Kirikomi (切り込み) with conservative speed, then a light finishing pass — learning this pass strategy early will make your parts more consistent."
      },
      {
        id: 310, cat: "Depth of Cut (Kirikomi)",
        q: "Taking too large a Kirikomi (切り込み) in a single pass on a thin-walled part risks what outcome?",
        opts: [
          "Improved dimensional accuracy",
          "Part distortion or vibration due to excessive cutting force on a weak section",
          "Faster coolant flow",
          "No risk at all since thin walls cut easier"
        ],
        a: 1, xp: 25,
        exp: "Thin-walled parts have less rigidity, so an aggressive depth of cut can generate enough force to deflect or vibrate the wall, leading to dimensional errors or even part failure. Lighter, multiple passes are often required for thin or delicate features. 🇯🇵 TIP: When machining a new or unfamiliar thin-walled design, it is common in Japanese shops to run a trial part first and measure it before committing to full production parameters."
      },
      {
        id: 311, cat: "Cutting Tool/Bit (Baito)",
        q: "What is a 'Baito (バイト)' in lathe turning operations?",
        opts: [
          "A lubricant additive",
          "A type of measuring gauge",
          "The cutting tool bit mounted in the tool post that removes material",
          "A clamping fixture for the chuck"
        ],
        a: 2, xp: 15,
        exp: "Baito (バイト), the cutting tool or tool bit, is the actual cutting edge mounted in the lathe's tool post that contacts and removes material from the rotating workpiece. Different Baito (バイト) shapes are chosen depending on the operation, such as facing, turning, or threading. 🇯🇵 TIP: Note that this Japanese word 'baito' for cutting tool is unrelated to the common slang 'baito (バイト)' meaning part-time job — context makes it clear which meaning is intended on the shop floor."
      },
      {
        id: 312, cat: "Cutting Tool/Bit (Baito)",
        q: "A Baito (バイト) shows visible chipping on its cutting edge after a job. What should the operator do?",
        opts: [
          "Continue using it since it still cuts something",
          "Increase feed rate to compensate",
          "Ignore it unless the part fails final inspection",
          "Replace or resharpen the tool before continuing, since a chipped edge produces poor finish and inaccurate dimensions"
        ],
        a: 3, xp: 20,
        exp: "A chipped cutting edge cannot produce a clean, accurate cut and will worsen surface finish and dimensional accuracy as it continues to degrade, possibly damaging the workpiece further. Replacing or resharpening the Baito (バイト) promptly prevents scrap parts. 🇯🇵 TIP: Keep worn or chipped tools in a separate labeled tray rather than mixing them with good tools — this simple sorting habit, common in Japanese tool rooms, prevents accidental reuse."
      },
      {
        id: 313, cat: "Chuck (Chakku)",
        q: "What is the function of a 'Chakku (チャック)' on a lathe?",
        opts: [
          "It clamps and holds the workpiece securely while it rotates",
          "It cools the cutting tool",
          "It measures the part diameter",
          "It lubricates the spindle bearings"
        ],
        a: 0, xp: 15,
        exp: "Chakku (チャック), the chuck, grips and centers the workpiece on the lathe spindle so it can rotate accurately and securely during cutting. A poorly tightened chuck can let the workpiece slip, causing damage or injury. 🇯🇵 TIP: Always remove the chuck key immediately after tightening, never leave it inserted — Japanese safety training treats a forgotten chuck key as a serious near-miss, since it can be thrown out at high speed."
      },
      {
        id: 314, cat: "Chuck (Chakku)",
        q: "Before starting the spindle, you notice the chuck key is still inserted in the Chakku (チャック). What must you do first?",
        opts: [
          "Start the spindle slowly to test it",
          "Remove the chuck key completely before starting the spindle",
          "Tape the key in place for convenience",
          "Ask someone else to start the machine for you"
        ],
        a: 1, xp: 25,
        exp: "A chuck key left inserted can be violently ejected the instant the spindle starts rotating, posing a serious projectile hazard to the operator and anyone nearby. It must always be removed immediately after adjusting the chuck, with no exceptions. 🇯🇵 TIP: Many Japanese lathes use a self-ejecting or spring-loaded chuck key specifically to reduce this risk — learn whether your machine has this feature, but never rely on it instead of checking yourself."
      },
      {
        id: 315, cat: "Centering (Shindashi)",
        q: "What does 'Shindashi (芯出し)' mean when setting up a workpiece on a lathe or mill?",
        opts: [
          "Painting the center of the part",
          "Measuring the part's total weight",
          "Aligning the workpiece precisely so its center axis matches the machine's rotation or reference axis",
          "Cleaning the machine table"
        ],
        a: 2, xp: 20,
        exp: "Shindashi (芯出し), centering, is the process of precisely aligning a workpiece's true center with the machine's spindle or reference axis before machining begins, which is critical for dimensional accuracy, especially on round or symmetric parts. Poor centering leads to uneven wall thickness or off-center features. 🇯🇵 TIP: Take extra time on Shindashi (芯出し) for expensive or hard-to-replace raw material — a few extra minutes here is far cheaper than scrapping the part later."
      },
      {
        id: 316, cat: "Centering (Shindashi)",
        q: "After Shindashi (芯出し), a quick test cut shows the part is still slightly off-center. What should you do?",
        opts: [
          "Proceed with full production anyway since it is close enough",
          "Increase the cutting speed to mask the error",
          "Switch to a different cutting tool only",
          "Re-adjust the centering and re-check before continuing with the full job"
        ],
        a: 3, xp: 20,
        exp: "Even a small centering error can cause dimensional problems across the entire batch, so it must be corrected before committing to full production, not accepted as 'close enough.' Catching and fixing the alignment issue early avoids producing a large quantity of defective parts. 🇯🇵 TIP: It is normal in Japanese shops to run a single test part (試作品, shisakuhin) and get sign-off before starting a full production run — never skip this step to save time."
      },
      {
        id: 317, cat: "Coolant (Kuuranto)",
        q: "What is the primary purpose of 'Kuuranto (クーラント)' during machining?",
        opts: [
          "To cool the cutting zone and lubricate, reducing heat and friction during cutting",
          "To color-code finished parts",
          "To clean the floor around the machine",
          "To paint the workpiece surface"
        ],
        a: 0, xp: 15,
        exp: "Kuuranto (クーラント), coolant, is sprayed or flooded onto the cutting zone to reduce heat buildup, lubricate the tool-workpiece interface, and flush away chips, extending tool life and improving surface finish. Running dry when coolant is specified can quickly damage both tool and part. 🇯🇵 TIP: Report a clogged or weak coolant nozzle right away rather than working around it — Japanese maintenance teams treat coolant delivery problems as a priority since they affect both quality and tool cost."
      },
      {
        id: 318, cat: "Coolant (Kuuranto)",
        q: "Kuuranto (クーラント) in the machine sump appears discolored and has a strong odor. What should you do?",
        opts: [
          "Ignore it as long as the machine still runs",
          "Report it, since degraded coolant can cause poor finish, skin irritation, and reduced tool life",
          "Add more coolant on top without telling anyone",
          "Drain it onto the shop floor immediately"
        ],
        a: 1, xp: 20,
        exp: "Degraded coolant loses its lubricating and cooling properties and can also cause skin irritation or respiratory issues for operators, so discoloration or odor should be reported for proper testing, filtering, or replacement. Improper disposal, such as draining onto the floor, can also violate environmental regulations. 🇯🇵 TIP: Japanese factories often follow strict environmental rules (環境規制) for coolant disposal — always use the designated waste coolant container, never a regular drain."
      },
      {
        id: 319, cat: "Chips/Swarf (Kirikuzu)",
        q: "What is 'Kirikuzu (切りくず)' in a machining context?",
        opts: [
          "The finished, polished part",
          "A type of cutting fluid",
          "The waste material chips or swarf removed during cutting",
          "A measuring tool for chip thickness"
        ],
        a: 2, xp: 15,
        exp: "Kirikuzu (切りくず), chips or swarf, refers to the small pieces of metal removed from the workpiece during cutting operations like turning, milling, or drilling. Chip shape and color can actually tell an experienced machinist a lot about whether cutting conditions are correct. 🇯🇵 TIP: Learn to glance at chip color during cutting — blue or discolored Kirikuzu (切りくず) often signals excessive heat, a quick visual clue Japanese machinists rely on constantly."
      },
      {
        id: 320, cat: "Chips/Swarf (Kirikuzu)",
        q: "Long, stringy Kirikuzu (切りくず) is wrapping around the rotating workpiece during turning. What is the main safety concern?",
        opts: [
          "It will make the part shinier",
          "It improves cutting tool life",
          "It has no safety relevance, only a cleanliness issue",
          "It can entangle the operator's hand or clothing, or fly off and cause injury"
        ],
        a: 3, xp: 25,
        exp: "Long stringy chips can wrap around a rotating workpiece or tool and then suddenly release or be thrown off, posing a cutting or entanglement hazard to the operator. Chip breakers on the tool and proper cutting parameters help produce shorter, safer chip forms. 🇯🇵 TIP: Never try to clear wrapping Kirikuzu (切りくず) by hand while the spindle is still turning — always stop the machine completely first, no matter how quick it seems."
      }
    ]
  },
  {
    stageId: 5,
    label: "STAGE 5 — Drawing & Tolerances",
    color: "#483D8B",
    icon: "📐",
    unlockXP: 800,
    questions: [
      {
        id: 401, cat: "Tolerance (Kousa)",
        q: "A drawing specifies a dimension as '20 ±0.05'. What does this represent in terms of 'Kousa (公差)'?",
        opts: [
          "The allowable Kousa (公差), tolerance, range the actual dimension may vary within, from 19.95 to 20.05",
          "The part must weigh exactly 20 grams",
          "The part number is 20-005",
          "The drawing was revised 20 times"
        ],
        a: 0, xp: 20,
        exp: "Kousa (公差), tolerance, defines the acceptable range of variation around a target dimension; here the part can measure anywhere from 19.95mm to 20.05mm and still be considered acceptable. Parts outside this range are rejected even if they look correct visually. 🇯🇵 TIP: Always measure with a tool precise enough for the specified Kousa (公差) — using a tool too coarse for a tight tolerance is a common rookie mistake flagged quickly by Japanese QC staff."
      },
      {
        id: 402, cat: "Tolerance (Kousa)",
        q: "Why might a customer specify a tighter Kousa (公差) on a mating hole-and-shaft pair than on a non-critical bracket hole?",
        opts: [
          "Tighter tolerance is always cheaper to produce",
          "Mating parts need a controlled fit for proper assembly function, while non-critical holes have more flexibility",
          "It makes the drawing look more professional",
          "There is no real difference, tolerance is just a formality"
        ],
        a: 1, xp: 20,
        exp: "Parts that must fit together, like a shaft and bearing bore, require tighter Kousa (公差) to ensure correct functional fit, while less critical features can have looser tolerance without affecting the part's performance. Tighter tolerances generally also cost more to achieve and verify. 🇯🇵 TIP: If a tolerance seems unusually tight for what looks like a simple hole, ask why before assuming it is a drawing error — there is often a hidden functional reason behind it."
      },
      {
        id: 403, cat: "Fit (Hameai)",
        q: "What does 'Hameai (はめあい)' describe in mechanical design?",
        opts: [
          "The surface roughness of a part",
          "The color matching between painted parts",
          "The relationship and clearance between two mating parts, like a shaft and a hole",
          "The total weight of an assembly"
        ],
        a: 2, xp: 20,
        exp: "Hameai (はめあい), fit, describes how two mating parts, such as a shaft and hole, relate to each other dimensionally, ranging from a loose, easily sliding fit to a tight, pressed fit. The drawing specifies which type of Hameai (はめあい) is required for correct assembly function. 🇯🇵 TIP: Learn the basic fit categories like 'clearance fit' and 'interference fit' early, since misunderstanding Hameai (はめあい) requirements is a frequent cause of assembly problems for new machinists."
      },
      {
        id: 404, cat: "Fit (Hameai)",
        q: "A shaft is supposed to have a tight interference Hameai (はめあい) with a hole, but it slides in easily by hand. What does this suggest?",
        opts: [
          "The fit is perfect as designed",
          "The part needs more lubricant",
          "The drawing units were in inches instead of millimeters",
          "The shaft or hole dimension is likely out of tolerance, producing a looser fit than intended"
        ],
        a: 3, xp: 25,
        exp: "If a part designed for a tight interference Hameai (はめあい) slides in too easily, the shaft is likely undersized or the hole is oversized relative to specification, meaning a dimensional or tolerance problem exists somewhere in the process. This should be checked with proper measuring tools immediately rather than assembled anyway. 🇯🇵 TIP: Never force or hand-fit a part that should require a press fit just to keep production moving — flag the dimensional issue, since a loose interference fit can fail completely in use."
      },
      {
        id: 405, cat: "Surface Roughness (Hyomen-arasa)",
        q: "What does 'Hyomen Arasa (表面粗さ)' measure on a finished part?",
        opts: [
          "The texture or smoothness of the surface, often expressed in Ra value",
          "The hardness of the metal",
          "The total part weight",
          "The color consistency of the coating"
        ],
        a: 0, xp: 20,
        exp: "Hyomen Arasa (表面粗さ), surface roughness, quantifies how smooth or rough a machined surface is, commonly expressed as an Ra value in micrometers, and is specified on drawings when surface finish affects function, sealing, or appearance. A surface can be dimensionally correct but still fail if the roughness requirement is not met. 🇯🇵 TIP: Keep a surface roughness comparison sample set at your station if available — comparing by touch and sight against known samples is a quick first check used widely in Japanese shops before formal measurement."
      },
      {
        id: 406, cat: "Surface Roughness (Hyomen-arasa)",
        q: "A drawing specifies 'Ra 1.6' for a sealing surface. What happens if the actual Hyomen Arasa (表面粗さ) is much rougher than this?",
        opts: [
          "The part will look shinier than required",
          "The seal may leak because the rough surface cannot create a proper seal",
          "The part will be stronger structurally",
          "There is no effect since Ra only matters for paint"
        ],
        a: 1, xp: 25,
        exp: "A surface rougher than the specified Ra value may have microscopic gaps or peaks that prevent a gasket or O-ring from sealing properly, leading to leaks even though the part dimensions look correct. Surface finish requirements like Hyomen Arasa (表面粗さ) exist specifically to guarantee functional performance, not just appearance. 🇯🇵 TIP: If your shop has a surface roughness tester (表面粗さ測定器), learn to use it correctly rather than relying only on visual judgment for critical sealing surfaces."
      },
      {
        id: 407, cat: "GD&T (Kika-kousa)",
        q: "What does 'Kika Kousa (幾何公差)' refer to on an engineering drawing?",
        opts: [
          "The total number of holes in a part",
          "The color-coding system for materials",
          "The geometric tolerancing symbols that control form, orientation, location, and runout, beyond simple linear dimensions",
          "A simplified version of basic dimensioning with no special meaning"
        ],
        a: 2, xp: 25,
        exp: "Kika Kousa (幾何公差), geometric tolerancing (GD&T), uses special symbols to control characteristics like flatness, perpendicularity, position, and runout that simple linear dimensions cannot fully describe. These callouts often appear in feature control frames near a dimension. 🇯🇵 TIP: If you see an unfamiliar symbol in a small rectangular box on a drawing, it is likely a Kika Kousa (幾何公差) callout — ask your supervisor to explain it rather than skipping over it."
      },
      {
        id: 408, cat: "GD&T (Kika-kousa)",
        q: "A feature control frame on a drawing shows a flatness symbol with a value of 0.02. What does this require?",
        opts: [
          "The surface must be polished to a mirror shine",
          "The part must weigh 0.02 kg",
          "The hole diameter must be 0.02mm larger than nominal",
          "The entire surface must lie within a flatness zone of 0.02mm, regardless of the part's overall size dimension"
        ],
        a: 3, xp: 25,
        exp: "A flatness callout in Kika Kousa (幾何公差) defines a zone, here 0.02mm wide, within which the entire referenced surface must lie, independent of the part's basic size dimension. This controls form even when the part is otherwise within its linear size tolerance. 🇯🇵 TIP: Geometric tolerance callouts are often stricter than they first appear — when unsure how to inspect one, ask the quality department rather than guessing how to check it."
      },
      {
        id: 409, cat: "Material Codes",
        q: "On a Japanese drawing, the material is specified as 'SS400'. What kind of material does this code represent?",
        opts: [
          "A general structural carbon steel commonly used for non-critical structural parts",
          "A type of stainless steel for corrosion resistance",
          "An aluminum alloy used for lightweight parts",
          "A type of plastic resin"
        ],
        a: 0, xp: 20,
        exp: "SS400 is a JIS (Japan Industrial Standards) code for general structural rolled steel with a minimum tensile strength around 400 N/mm², commonly used for frames, brackets, and general structural fabrication where high corrosion resistance is not required. It is one of the most common materials seen on Japanese fabrication drawings. 🇯🇵 TIP: Always double check material codes like SS400 against the actual stock tag on the material rack — mixing up similar-looking steel grades is a common and costly shop floor error."
      },
      {
        id: 410, cat: "Material Codes",
        q: "A drawing calls for 'SUS304' instead of 'SS400'. What is the main reason a designer would choose SUS304?",
        opts: [
          "It is always cheaper than SS400",
          "SUS304 is a stainless steel offering much better corrosion resistance than plain carbon steel",
          "SUS304 is lighter than aluminum",
          "SUS304 cannot be machined at all"
        ],
        a: 1, xp: 20,
        exp: "SUS304 is an austenitic stainless steel known for strong corrosion resistance, making it preferred for parts exposed to moisture, chemicals, or food contact, unlike plain carbon steel such as SS400 which rusts without protective coating. The trade-off is usually higher cost and different machining behavior. 🇯🇵 TIP: SUS304 tends to work-harden and gall more than mild steel, so ask about the recommended cutting speed and coolant for stainless before machining it for the first time."
      },
      {
        id: 411, cat: "Material Codes",
        q: "A drawing specifies 'A5052' for a sheet metal bracket. What general category of material is this?",
        opts: [
          "A high-carbon tool steel",
          "A type of rubber gasket material",
          "An aluminum alloy known for good corrosion resistance and formability",
          "A ceramic coating material"
        ],
        a: 2, xp: 20,
        exp: "A5052 is a JIS code for an aluminum-magnesium alloy valued for good corrosion resistance, weldability, and formability, frequently used in sheet metal enclosures and brackets where light weight matters. It behaves quite differently from steel under bending and cutting. 🇯🇵 TIP: Aluminum alloys like A5052 can react badly if mixed with certain coolants or contaminated with steel chips — keep aluminum and steel scrap and tooling separated where your shop requires it."
      },
      {
        id: 412, cat: "Third Angle Projection (Daisankakuhou)",
        q: "What is 'Daisankakuhou (第三角法)' used for on Japanese engineering drawings?",
        opts: [
          "A method for calculating material cost",
          "A type of heat treatment process",
          "A symbol indicating the part is rejected",
          "A standard projection system used to arrange multiple views, such as front, top, and side, on a drawing"
        ],
        a: 3, xp: 25,
        exp: "Daisankakuhou (第三角法), third angle projection, is the standard drawing convention used in Japan and much of Asia and North America to arrange orthographic views logically around a front view. Misreading the projection system can cause a worker to misinterpret which side of a part a feature belongs on. 🇯🇵 TIP: If you trained in a country using first angle projection, double check the projection symbol box on Japanese drawings before reading dimensions, since view placement differs from what you may be used to."
      },
      {
        id: 413, cat: "Third Angle Projection (Daisankakuhou)",
        q: "On a drawing using Daisankakuhou (第三角法), where is the top view typically placed relative to the front view?",
        opts: [
          "Above the front view",
          "Below the front view",
          "To the far right, disconnected from the front view",
          "There is no standard placement"
        ],
        a: 0, xp: 20,
        exp: "In Daisankakuhou (第三角法), third angle projection, the top view is placed directly above the front view, and the right side view is placed to the right, following a consistent, predictable layout. Knowing this layout helps you quickly locate the view you need without confusion. 🇯🇵 TIP: Look for the small truncated-cone projection symbol in the drawing's title block — it visually confirms whether the drawing uses first or third angle projection."
      },
      {
        id: 414, cat: "JIS Symbols",
        q: "What does the abbreviation 'JIS' stand for, frequently seen stamped on Japanese drawings and material certificates?",
        opts: [
          "Japan International Shipping",
          "Japanese Industrial Standards, the national standardization system for industry",
          "Joint Inspection System",
          "Japan Internal Specification, a company-only standard"
        ],
        a: 1, xp: 15,
        exp: "JIS, Japan Industrial Standards (日本産業規格), is the official national standardization system covering everything from material grades to drawing symbols and testing methods, ensuring consistency across Japanese industry. Many drawings and certificates reference specific JIS standard numbers directly. 🇯🇵 TIP: If a drawing references a JIS standard number you don't recognize, it is normal and expected to look it up or ask, since even experienced Japanese engineers regularly check standard reference tables."
      },
      {
        id: 415, cat: "JIS Symbols",
        q: "A drawing shows a small triangle symbol with 'Ra' next to a surface. What category of information does this convey?",
        opts: [
          "The part's hardness rating",
          "The painting color code",
          "Surface finish or roughness requirement for that surface, per JIS symbol conventions",
          "The bolt torque specification"
        ],
        a: 2, xp: 20,
        exp: "JIS surface finish symbols, often a small checkmark or triangle paired with an Ra value, specify the required surface roughness for a particular surface, distinct from dimensional tolerances. Recognizing these symbols is essential to avoid misreading a drawing's quality requirements. 🇯🇵 TIP: Keep a JIS symbol reference card near your workstation when starting out — most experienced Japanese drafters keep one handy too, since there are many symbols to remember."
      },
      {
        id: 416, cat: "Dimensional Tolerance",
        q: "A drawing dimension has no explicit tolerance written next to it. What does this usually mean in a JIS-based shop?",
        opts: [
          "The dimension has no tolerance at all and any size is acceptable",
          "The part can be made to any convenient size",
          "It is a drafting mistake that should be ignored",
          "A general or standard tolerance specified elsewhere on the drawing, such as in the title block, applies automatically"
        ],
        a: 3, xp: 20,
        exp: "When a specific tolerance is not shown next to a dimension, a general tolerance table, often referenced in the title block, automatically applies based on the dimension's size range. Workers must check the title block notes rather than assuming no tolerance control exists. 🇯🇵 TIP: Always read the title block notes fully before starting a new job, since general tolerance and material notes are easy to overlook but apply to the whole drawing."
      },
      {
        id: 417, cat: "Dimensional Tolerance",
        q: "Two dimensions on the same part have a general tolerance of ±0.1mm but one critical hole is marked ±0.02mm directly on the dimension. What takes priority?",
        opts: [
          "The specifically marked ±0.02mm tolerance applies to that dimension, overriding the general default",
          "The general tolerance always overrides a specific one",
          "Whichever tolerance is smaller numerically is always ignored",
          "Both tolerances apply simultaneously and must both be satisfied separately"
        ],
        a: 0, xp: 25,
        exp: "A tolerance written directly next to a specific dimension always takes priority over the general default tolerance, since it represents a deliberate, specific requirement for that feature. Designers use this approach to call special attention to dimensions that are functionally critical. 🇯🇵 TIP: Treat any dimension with its own specific tolerance as a flag for extra care during both machining and inspection — it almost always indicates a functionally important feature."
      },
      {
        id: 418, cat: "IT Grade",
        q: "What does an 'IT Toukyuu (IT等級)' grade, such as IT7, describe in the ISO/JIS tolerance system?",
        opts: [
          "The material's hardness level",
          "A standardized tolerance grade indicating how tight the dimensional tolerance band is for a given size",
          "The color code for inspection stamps",
          "The number of inspections required per batch"
        ],
        a: 1, xp: 25,
        exp: "IT Toukyuu (IT等級), IT grade, is part of a standardized international tolerance system where a lower IT number, like IT6, means a tighter tolerance band, and a higher number, like IT12, means a looser one, for a given nominal size. This system lets engineers specify precision levels in a consistent, comparable way across many dimensions. 🇯🇵 TIP: If a customer requests a tighter IT grade than your shop normally holds, raise it with your supervisor early rather than after parts fail inspection, since process or tooling changes may be needed."
      },
      {
        id: 419, cat: "Basic Hole/Shaft System",
        q: "In the 'Kijun Ana / Kijun Jiku (基準穴・基準軸)' system used for fits, what does 'Kijun Ana (基準穴)', basic hole system, mean?",
        opts: [
          "The hole size is always adjusted to match a fixed shaft size",
          "Holes are never toleranced in this system",
          "The hole is held to a fixed standard tolerance, and the shaft size is varied to achieve the desired fit",
          "Only shafts are manufactured, holes are assumed pre-existing"
        ],
        a: 2, xp: 25,
        exp: "In the Kijun Ana (基準穴), basic hole system, the hole's tolerance is fixed as a standard reference, and the shaft is manufactured to different tolerance classes to achieve the desired type of fit, loose, transition, or tight. This approach is common because holes are often harder to adjust in size than shafts during production. 🇯🇵 TIP: When you see fit codes like H7/g6 on a drawing, recognize the H as referring to the basic hole system, a notation worth memorizing early since it appears constantly on Japanese mechanical drawings."
      },
      {
        id: 420, cat: "Basic Hole/Shaft System",
        q: "A drawing fit callout reads 'H7/g6'. Based on the 'Kijun Ana (基準穴)' convention, what does the 'H7' part represent?",
        opts: [
          "The shaft's tolerance class",
          "The surface roughness value",
          "The material hardness rating",
          "The hole's tolerance class, following the basic hole reference system"
        ],
        a: 3, xp: 20,
        exp: "In a fit notation like H7/g6, the capital letter H always refers to the hole's tolerance class under the Kijun Ana (基準穴) basic hole system, while the lowercase letter (g6 here) refers to the shaft's tolerance class. Recognizing this capital-versus-lowercase convention quickly tells you which class applies to which mating part. 🇯🇵 TIP: If you are ever unsure whether a fit callout refers to the hole or shaft, remember capital letters are holes and lowercase letters are shafts — this convention is consistent across JIS and ISO fit tables."
      }
    ]
  },
  {
    stageId: 6,
    label: "STAGE 6 — Quality & Inspection",
    color: "#2F4F4F",
    icon: "🔍",
    unlockXP: 1000,
    questions: [
      {
        id: 501, cat: "Reading Calipers",
        q: "When reading a vernier scale on analog Nogisu (ノギス), what do you align to get the fine decimal reading?",
        opts: [
          "The line on the sliding vernier scale that aligns most closely with a line on the main scale",
          "The brand logo on the tool",
          "The temperature gauge",
          "The thickness of the jaws"
        ],
        a: 0, xp: 20,
        exp: "On a vernier caliper, after reading the main scale for the whole number, you find which vernier line lines up most closely with a main scale line to get the fine decimal portion of the measurement. This skill takes some practice but becomes quick with repetition. 🇯🇵 TIP: Even though digital Nogisu (ノギス) are common now, many Japanese training programs still teach the analog vernier method first, since it builds a deeper understanding of measurement principles."
      },
      {
        id: 502, cat: "Reading Calipers",
        q: "A digital Nogisu (ノギス) displays '25.47mm' but the part should be close to 1 inch. What should you check?",
        opts: [
          "Nothing, the reading is fine as is",
          "Whether the display unit is set to mm instead of inch, and convert or switch units accordingly",
          "The battery level only",
          "The color of the display"
        ],
        a: 1, xp: 20,
        exp: "Digital calipers can often switch between millimeters and inches with a button, and 25.47mm actually converts to almost exactly 1.00 inch, suggesting the display is simply in mm while the expected reference was in inches. Always confirm which unit you are reading before judging a measurement as wrong. 🇯🇵 TIP: When working with drawings that mix unit systems, double-check the unit symbol in the drawing's title block, since unit mix-ups are a common source of confusion for workers new to Japanese metric-standard shops."
      },
      {
        id: 503, cat: "Reading Micrometers",
        q: "On an analog micrometer, the sleeve shows '5.5mm' and the thimble scale shows '0.32mm' aligned with the reference line. What is the total reading?",
        opts: [
          "5.5mm only",
          "0.32mm only",
          "5.82mm, combining the sleeve and thimble readings",
          "5.32mm"
        ],
        a: 2, xp: 25,
        exp: "Reading an analog micrometer requires adding the sleeve (main scale) reading and the thimble (rotating scale) reading together to get the total measurement, here 5.5mm plus 0.32mm equals 5.82mm. Misreading either scale or forgetting to add them is a common beginner mistake. 🇯🇵 TIP: Practice reading sample blocks of known dimension with a micrometer regularly — many Japanese trainees do short daily reading drills until it becomes second nature."
      },
      {
        id: 504, cat: "Reading Micrometers",
        q: "Before trusting a critical micrometer measurement on an important part, what extra step builds confidence in the reading?",
        opts: [
          "Measuring once quickly and moving on",
          "Asking a coworker to guess the size visually",
          "Skipping verification since micrometers are always accurate",
          "Measuring the same spot two or three times and confirming consistent results"
        ],
        a: 3, xp: 20,
        exp: "Taking repeated measurements at the same location helps confirm the reading is consistent and not affected by operator technique error, dirt, or tool issues, increasing confidence before recording a critical measurement. A single reading on an important dimension is generally not considered sufficient. 🇯🇵 TIP: Japanese quality documentation often requires recording multiple measurement points for critical dimensions — get used to this habit early since it reflects standard inspection practice."
      },
      {
        id: 505, cat: "Limit Gauge (Genkai-geeji)",
        q: "What is the purpose of a 'Genkai Geeji (限界ゲージ)' such as a go/no-go plug gauge?",
        opts: [
          "To quickly check whether a dimension falls within acceptable limits using a simple pass or fail test",
          "To give an exact numeric dimension reading",
          "To polish the inside of a hole",
          "To apply lubricant before assembly"
        ],
        a: 0, xp: 20,
        exp: "Genkai Geeji (限界ゲージ), limit gauges like go/no-go plug or ring gauges, provide a fast pass/fail check for whether a dimension is within tolerance, without giving an exact numeric value. They are especially useful for high-volume inspection where speed matters more than exact measurement. 🇯🇵 TIP: If the 'go' side of a Genkai Geeji (限界ゲージ) does not enter smoothly, do not force it — forcing a gauge can damage both the gauge and the part, masking a real problem."
      },
      {
        id: 506, cat: "Limit Gauge (Genkai-geeji)",
        q: "Using a go/no-go Genkai Geeji (限界ゲージ) on a hole, the 'go' side fits but the 'no-go' side also fits. What does this mean?",
        opts: [
          "The hole is perfectly within tolerance",
          "The hole is oversized, beyond the acceptable tolerance range, since even the no-go side should not fit",
          "The gauge itself is broken",
          "The part should be accepted since it is close enough"
        ],
        a: 1, xp: 25,
        exp: "If both the 'go' and 'no-go' sides of a limit gauge fit into the hole, the hole is actually oversized beyond the acceptable tolerance, since the 'no-go' side is specifically sized to not fit a correctly sized hole. This result should lead to rejecting the part, not accepting it. 🇯🇵 TIP: Always check both sides of a go/no-go gauge in the correct order, and report unexpected results to your team leader rather than assuming the gauge is wrong."
      },
      {
        id: 507, cat: "Defective Product Handling",
        q: "When you find a defective part during your own inspection, what is the correct 'Furyouhin (不良品)' handling procedure?",
        opts: [
          "Hide it among good parts to keep production numbers up",
          "Throw it away immediately with no record",
          "Separate it clearly, tag it as defective, and report it according to the shop's defect handling procedure",
          "Fix it yourself without telling anyone"
        ],
        a: 2, xp: 20,
        exp: "Furyouhin (不良品), defective products, must be physically separated from good parts, clearly tagged, and reported through the proper process so the cause can be investigated and corrective action taken. Hiding or quietly disposing of defects prevents the root cause from ever being addressed and can lead to repeat problems. 🇯🇵 TIP: Japanese factories take pride in transparent defect reporting — reporting your own mistake quickly and honestly is viewed far more positively than trying to hide it and being discovered later."
      },
      {
        id: 508, cat: "Defective Product Handling",
        q: "A batch of parts is found defective after already being placed in the shipping area. What should happen next regarding 'Furyouhin (不良品)' control?",
        opts: [
          "Ship them anyway since they are already packed",
          "Only fix the ones on top of the box",
          "Wait until the customer complains before taking action",
          "Immediately quarantine the batch, halt shipment, and notify quality control before any parts leave the building"
        ],
        a: 3, xp: 25,
        exp: "Once defective parts are identified, they must be quarantined immediately to prevent shipment, with quality control notified so the scope of the problem can be assessed and contained. Allowing defective Furyouhin (不良品) to ship, even accidentally, can damage customer trust and trigger a much larger investigation later. 🇯🇵 TIP: Japanese suppliers place huge importance on preventing defective shipments to customers, since a single shipped defect can affect the whole company's reputation, not just one department."
      },
      {
        id: 509, cat: "7 QC Tools",
        q: "The 'QC Nanatsu Dougu (QC7つ道具)' refers to what set of tools used in quality control?",
        opts: [
          "Seven basic analytical tools, such as Pareto charts and control charts, used to analyze and improve quality data",
          "Seven physical hand tools like wrenches and pliers",
          "Seven types of safety equipment",
          "Seven inspection certificates required for export"
        ],
        a: 0, xp: 25,
        exp: "QC Nanatsu Dougu (QC7つ道具), the 7 QC tools, are basic statistical and analytical tools, including Pareto charts, cause-and-effect (fishbone) diagrams, histograms, and control charts, used to analyze quality data and identify root causes of problems. These tools are taught widely in Japanese quality training programs as the foundation of practical problem solving. 🇯🇵 TIP: Even if your role is mostly hands-on production, learning to read a basic Pareto chart will help you understand quality meetings at a Japanese factory much better."
      },
      {
        id: 510, cat: "7 QC Tools",
        q: "Which of the QC Nanatsu Dougu (QC7つ道具) is most useful for visually identifying the most frequent causes of defects in a batch of data?",
        opts: [
          "A checklist with no data",
          "A Pareto chart, which ranks causes by frequency to highlight the most significant ones",
          "A blank notebook",
          "A measuring tape"
        ],
        a: 1, xp: 20,
        exp: "A Pareto chart, one of the QC Nanatsu Dougu (QC7つ道具), visually ranks defect causes from most to least frequent, helping teams focus improvement efforts on the few causes responsible for the majority of problems, following the 80/20 principle. This focused approach is more effective than trying to fix every minor issue at once. 🇯🇵 TIP: In Japanese quality meetings, you will often hear the phrase 'juuten kanri (重点管理)', meaning focusing on the most important few items first, which is exactly the philosophy behind Pareto analysis."
      },
      {
        id: 511, cat: "4M Change Point",
        q: "What does 'Yonemu Henkaten (4M変化点)' refer to in factory quality management?",
        opts: [
          "Four measurement units used in Japan",
          "A four-step assembly process",
          "A change in one of the four key factors, Man, Machine, Material, or Method, that can affect quality and needs special attention",
          "A type of inspection stamp"
        ],
        a: 2, xp: 25,
        exp: "Yonemu Henkaten (4M変化点), the 4M change point, tracks changes in Man (worker), Machine, Material, or Method, since a shift in any of these factors is a common trigger for new quality problems. Recognizing and flagging these change points helps prevent defects before they happen rather than just reacting afterward. 🇯🇵 TIP: If you are a new worker assigned to a job for the first time, that itself counts as a 'Man' change point — do not be surprised if supervisors check your work more closely during this transition, it is standard procedure, not distrust."
      },
      {
        id: 512, cat: "4M Change Point",
        q: "A new lot of raw material arrives with a slightly different supplier than usual. Under 4M Henkaten (4M変化点) thinking, what should happen?",
        opts: [
          "Nothing, since the part number is the same",
          "The change should be hidden from quality control to avoid delays",
          "Only the supplier needs to know about the switch",
          "This is flagged as a Material change point, prompting extra verification of the first parts produced from it"
        ],
        a: 3, xp: 20,
        exp: "A supplier change, even with the same part number, is considered a Material change under 4M Henkaten (4M変化点) thinking, and typically triggers extra first-article inspection to confirm the new material still meets requirements. Skipping this verification risks quality issues that would otherwise be caught early. 🇯🇵 TIP: Always read incoming material tags and certificates carefully, since supplier or lot changes are often noted there and matter more than they might seem at first glance."
      },
      {
        id: 513, cat: "Mistake-Proofing (Pokayoke)",
        q: "What is the purpose of 'Pokayoke (ポカヨケ)' devices on a production line?",
        opts: [
          "To physically or mechanically prevent operator mistakes from happening or from going unnoticed",
          "To increase production speed regardless of errors",
          "To decorate the workstation",
          "To replace the need for any inspection at all"
        ],
        a: 0, xp: 20,
        exp: "Pokayoke (ポカヨケ), mistake-proofing (often called poka-yoke internationally), uses simple mechanical or sensor-based devices, such as a part that only fits one way, to prevent errors from occurring or to immediately detect them if they do. The goal is to make mistakes physically difficult or impossible rather than relying purely on operator attention. 🇯🇵 TIP: If you find a clever way to prevent a mistake at your own station, suggest it through your shop's improvement suggestion system (改善提案) — Pokayoke ideas from frontline workers are highly valued in Japanese manufacturing culture."
      },
      {
        id: 514, cat: "Mistake-Proofing (Pokayoke)",
        q: "A fixture is designed so an asymmetric part can only be loaded in the correct orientation. This is an example of what concept?",
        opts: [
          "KY Katsudou, hazard prediction activity",
          "Pokayoke (ポカヨケ), mistake-proofing through physical design",
          "Hyomen Arasa, surface roughness control",
          "Sessoku Sokudo, cutting speed control"
        ],
        a: 1, xp: 20,
        exp: "Designing a fixture so a part physically cannot be loaded incorrectly is a classic Pokayoke (ポカヨケ) approach, eliminating the possibility of an orientation mistake rather than relying on the operator to remember the correct way every time. This kind of design-based prevention is considered more reliable than instructions or warnings alone. 🇯🇵 TIP: When training on a new fixture, ask specifically what mistakes the design prevents — understanding the Pokayoke (ポカヨケ) logic helps you respect why the fixture is shaped the way it is."
      },
      {
        id: 515, cat: "Traceability",
        q: "Why does a Japanese metal fabrication shop often require 'Toresabiriti (トレーサビリティ)', traceability, records for each batch of parts?",
        opts: [
          "To track employee lunch breaks",
          "To calculate shipping costs only",
          "To be able to trace a part back through its production history, material lot, and process steps if a problem is found later",
          "To decide vacation schedules"
        ],
        a: 2, xp: 20,
        exp: "Toresabiriti (トレーサビリティ), traceability, allows a company to trace any part back to its specific material lot, machine, operator, and date, which becomes critical if a defect is discovered after shipment, allowing the affected scope to be identified precisely. Without good traceability records, a single defect could force recalling far more parts than necessary. 🇯🇵 TIP: Always fill in batch numbers, dates, and your operator stamp accurately on production records, even when it feels like routine paperwork — this data is exactly what gets used during a traceability investigation."
      },
      {
        id: 516, cat: "Traceability",
        q: "A customer reports a defect found in the field and asks which production lot it came from. What allows the factory to answer this quickly?",
        opts: [
          "Guessing based on when the complaint arrived",
          "Calling every former employee for memory recall",
          "There is no way to know after shipment",
          "Toresabiriti (トレーサビリティ) records that link the part's serial or lot number to its specific production history"
        ],
        a: 3, xp: 25,
        exp: "With proper Toresabiriti (トレーサビリティ) records, a factory can look up a part's serial or lot number and immediately find which machine, operator, material lot, and date produced it, enabling a fast, accurate response to the customer. Without this system, the investigation would be slow, imprecise, and could require recalling unnecessarily large quantities of product. 🇯🇵 TIP: Treat lot numbers and traceability labels on bins and parts as critical information, never remove or mix them casually, since doing so can break the entire traceability chain."
      },
      {
        id: 517, cat: "Self-Inspection (Jishu-kensa)",
        q: "What does 'Jishu Kensa (自主検査)' mean for a machine operator?",
        opts: [
          "The operator personally checking their own work for defects and dimensional accuracy during production",
          "Inspection performed only by a separate quality department, never the operator",
          "A inspection that happens only once per month",
          "An inspection skipped entirely if trust is high"
        ],
        a: 0, xp: 20,
        exp: "Jishu Kensa (自主検査), self-inspection, means the operator regularly checks their own output for defects and correct dimensions during production, rather than relying solely on a separate inspector found later. This catches problems early, often before a large quantity of bad parts accumulates. 🇯🇵 TIP: Even in shops with dedicated inspectors, performing honest Jishu Kensa (自主検査) on your own work is expected and shows professionalism, not a lack of trust in the inspection department."
      },
      {
        id: 518, cat: "Self-Inspection (Jishu-kensa)",
        q: "During Jishu Kensa (自主検査), an operator notices an occasional dimension drifting slightly over several parts. What is the correct response?",
        opts: [
          "Average the good and bad parts together mentally and continue",
          "Stop, investigate the cause such as tool wear, and adjust before continuing production",
          "Wait until the end of the shift to mention it",
          "Quietly discard only the worst parts without telling anyone"
        ],
        a: 1, xp: 25,
        exp: "A gradual dimensional drift detected during self-inspection often indicates a developing cause like tool wear or thermal drift, and should be investigated and corrected immediately rather than waiting, to prevent producing more defective parts. Quietly discarding parts without reporting hides information that could help prevent the issue recurring. 🇯🇵 TIP: Bring a few of the drifting parts and your measurement data when reporting this kind of trend — Japanese supervisors respond much faster to concrete data than to a vague description of a problem."
      },
      {
        id: 519, cat: "Corrective Action",
        q: "What is the purpose of 'Zesei Shochi (是正処置)' after a quality problem is found?",
        opts: [
          "Simply scrapping the bad parts with no further action",
          "Blaming a specific worker without investigation",
          "Investigating the root cause of the problem and implementing a fix to prevent it from happening again",
          "Changing the part number to hide the issue"
        ],
        a: 2, xp: 25,
        exp: "Zesei Shochi (是正処置), corrective action, goes beyond just fixing or scrapping the immediate defective parts; it requires investigating the underlying root cause and implementing changes to prevent the same problem from recurring in the future. This is a core principle of continuous improvement (改善, kaizen) in Japanese manufacturing. 🇯🇵 TIP: When asked to participate in a Zesei Shochi (是正処置) discussion, focus on facts and process details rather than personal blame — Japanese quality culture strongly emphasizes fixing systems, not punishing individuals."
      },
      {
        id: 520, cat: "Corrective Action",
        q: "After implementing a Zesei Shochi (是正処置) for a recurring defect, what final step confirms the action actually worked?",
        opts: [
          "Assuming it worked since the meeting is over",
          "Closing the report immediately with no follow-up",
          "Asking only the supervisor's opinion with no data check",
          "Monitoring subsequent production to verify the defect rate has actually improved and the same problem does not return"
        ],
        a: 3, xp: 20,
        exp: "An effective Zesei Shochi (是正処置) process includes a follow-up verification step, monitoring actual production data afterward to confirm the corrective action truly eliminated or reduced the problem, not just assuming it worked because a meeting concluded. Without this verification, an ineffective fix could go unnoticed and the defect could return. 🇯🇵 TIP: Japanese quality reports often include an explicit 'effectiveness confirmation' (効果確認) section — get used to seeing this as a required, not optional, part of closing out a corrective action."
      }
    ]
  }
];
