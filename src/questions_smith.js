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
          "Increased die wear requiring more frequent sharpening",
          "A higher reject rate from misaligned dies"
        ],
        a: 1, xp: 25,
        exp: "Press machines move with enormous force and speed, and most press-related accidents in Japanese factories involve hands caught between dies. The safety guard and light curtain interlocks exist specifically to stop the slide if a hand enters the danger zone. 🇯🇵 TIP: Never silence or bypass an interlock alarm even if it slows you down — supervisors treat tampering with safety devices as a serious violation, not just a minor shortcut."
      },
      {
        id: 3, cat: "Grinding Machine Safety",
        q: "What does 'Kensakuban Tokubetsu Kyouiku (研削盤特別教育)' specifically train workers to handle safely?",
        opts: [
          "Operating overhead cranes rated under 5 tons",
          "Setting up press brake tooling for bending jobs",
          "Operating grinding machines and handling grinding wheels",
          "Inspecting incoming raw material certificates"
        ],
        a: 2, xp: 20,
        exp: "Kensakuban Tokubetsu Kyouiku (研削盤特別教育) is required special training for using grinding machines (研削盤), focusing on wheel inspection, mounting, balancing, and guard use. A grinding wheel that bursts at high RPM can cause severe injury. 🇯🇵 TIP: Always perform the 'ring test' (tapping the wheel to check for cracks) before mounting — this small habit is taken very seriously in Japanese workshops."
      },
      {
        id: 4, cat: "Grinding Machine Safety",
        q: "After replacing a grinding wheel, your trainer tells you to run the machine empty for one minute before use. Why?",
        opts: [
          "To pre-heat the bearings so the spindle reaches rated RPM faster",
          "To burn off residual coolant left from the previous wheel change",
          "To let the new wheel's bonding agent cure under load before cutting",
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
        q: "Teiatsu Denki Toriatsukai (低圧電気取扱) training covers several real procedures for handling low-voltage equipment safely. Which of the following is NOT actually part of this training?",
        opts: [
          "Lockout/tagout procedures before opening a control panel",
          "Recognizing arc flash and electric shock hazards on live equipment",
          "Calculating insurance premiums for damaged electrical equipment",
          "Safe use of insulated tools near live low-voltage circuits"
        ],
        a: 2, xp: 25,
        exp: "Teiatsu Denki Toriatsukai (低圧電気取扱) training is required for workers who handle low-voltage (under 600V) electrical equipment such as control panels and wiring on machines. It covers lockout/tagout, insulated tool use, and shock/arc-flash hazard recognition — but insurance and cost calculations are an administrative matter, not part of this safety curriculum. 🇯🇵 TIP: Always confirm a machine is fully de-energized and tagged out before opening an electrical panel — Japanese safety audits check tagging procedures very closely."
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
          "Whether it matches the size printed on your work order",
          "Whether the manufacture date sticker is within five years, regardless of wear",
          "Whether it has been stored in its original packaging",
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
        q: "Sanketsu Kiken Sagyou (酸欠危険作業), oxygen deficiency hazard work, has several real defining features. Which statement below is NOT correct about it?",
        opts: [
          "It often occurs in tanks, pits, or sealed containers where oxygen has been displaced or consumed",
          "Workers can lose consciousness within seconds once oxygen concentration drops critically low",
          "It legally requires atmosphere testing and a designated outside watcher before entry",
          "It is defined by how far below ground level the space is, not by oxygen concentration"
        ],
        a: 3, xp: 25,
        exp: "Sanketsu Kiken Sagyou (酸欠危険作業) is defined by measured oxygen concentration (below roughly 18%), not by depth or location — a sealed elevated tank can be just as deadly as an underground pit. It refers to hazardous work in confined or poorly ventilated spaces such as tanks, pits, or sealed containers, where oxygen concentration can drop to unsafe levels without warning, and workers can lose consciousness within seconds in severe cases. 🇯🇵 TIP: Always use an oxygen meter and have a designated watcher outside before entering any confined space — this buddy system is strictly enforced in Japanese safety regulations."
      },
      {
        id: 17, cat: "Oxygen Deficiency Hazard",
        q: "Before entering a sealed tank for cleaning, what must be measured and confirmed?",
        opts: [
          "Oxygen concentration and presence of toxic gases",
          "Ambient noise level inside the tank",
          "The tank's internal pressure rating only",
          "The humidity level only"
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
        q: "KY Katsudou (KY活動), hazard prediction activity, has several real characteristics. Which statement below is NOT correct about it?",
        opts: [
          "It is held briefly before work starts, identifying hazards specific to that day's tasks",
          "It ends with the team agreeing on concrete countermeasures, not just listing risks",
          "It is primarily a paperwork exercise filled out after the shift ends",
          "Even new or junior workers are expected to speak up during the discussion"
        ],
        a: 2, xp: 25,
        exp: "KY Katsudou (KY活動), Kiken Yochi or hazard prediction activity, happens BEFORE work starts, not as after-the-fact paperwork. It is a short team discussion where everyone identifies potential dangers in the day's tasks and agrees on countermeasures before touching the equipment. It is a core part of Japanese workplace safety culture, not just paperwork. 🇯🇵 TIP: Speak up during KY meetings even as a newcomer — pointing out a hazard you noticed is viewed as valuable input, not as questioning your seniors."
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
        q: "Nogisu (ノギス), calipers, can measure several different dimensions on a single tool. Which of the following is NOT something a standard caliper measures?",
        opts: [
          "The angle of a beveled edge, in degrees",
          "Outer diameter of a round part",
          "Inner diameter of a bore or hole",
          "Depth of a step or blind hole using the depth rod"
        ],
        a: 0, xp: 20,
        exp: "Nogisu (ノギス), calipers, use a sliding vernier or digital scale to measure outer dimensions, inner dimensions, and depth on a single tool — but they cannot read an angle in degrees; that requires a protractor or angle gauge. They are one of the most common measuring tools on a shop floor. 🇯🇵 TIP: Always zero-check your Nogisu (ノギス) at the start of a shift — Japanese quality culture treats an uncalibrated tool as a personal responsibility, not just an equipment issue."
      },
      {
        id: 102, cat: "Calipers (Nogisu)",
        q: "While using digital Nogisu (ノギス) to measure a shaft, the reading seems inconsistent each time. What should you check first?",
        opts: [
          "Ambient temperature changes affecting thermal expansion of the part",
          "Whether the jaws are clean and the part is measured perpendicular to the jaws",
          "The caliper's serial number sequence",
          "Whether the digital display's battery shows a full charge"
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
          "Adjust the ratchet stop tension before checking zero",
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
          "Surface hardness of the coating"
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
          "The shaft was machined from a different material lot"
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
          "Gloves reduce the grip strength needed for tool changes",
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
        q: "A Booruban (ボール盤), drill press, is capable of several real operations. Which of the following is NOT something it is normally used for?",
        opts: [
          "Turning a cylindrical workpiece down to a smaller outer diameter",
          "Drilling precise vertical holes into a clamped workpiece",
          "Counterboring or spot-facing a hole for a bolt head",
          "Light tapping using a tapping attachment in the spindle"
        ],
        a: 0, xp: 20,
        exp: "Booruban (ボール盤), a drill press, holds a rotating drill bit in a fixed vertical position to bore accurate holes, counterbore, spot-face, or even tap with the right attachment — but turning down an outer diameter is lathe work, where the WORKPIECE rotates against a fixed tool, the opposite setup. 🇯🇵 TIP: Always clamp small parts rather than holding them by hand on a Booruban (ボール盤) — a spinning drill can grab and spin a loose part violently, a common cause of hand injuries."
      },
      {
        id: 114, cat: "Drill Press (Booruban)",
        q: "Before drilling a hole with a Booruban (ボール盤), why should you mark the center point with a center punch first?",
        opts: [
          "It increases the hardness of the surrounding material",
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
          "To reduce the hole back toward the original drill diameter",
          "To apply a corrosion-resistant coating inside the hole",
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
          "The reamer was run without sufficient cutting oil, increasing friction-driven wear"
        ],
        a: 1, xp: 25,
        exp: "Reaming requires steady, controlled feed and the correct speed; excessive force or incorrect RPM can cause the reamer to wander or chatter, removing more material than intended and producing an oversized, rough hole. Reamers are precision finishing tools, not rough cutting tools. 🇯🇵 TIP: Always check the recommended speed and feed chart posted near Japanese machine stations — these reference sheets exist specifically to prevent this kind of mistake."
      },
      {
        id: 119, cat: "Torque Wrench (Toruku-renchi)",
        q: "A Toruku-renchi (トルクレンチ), torque wrench, gives several real advantages over a regular wrench for tightening fixture bolts. Which of the following is NOT a real reason to use one?",
        opts: [
          "It tightens bolts to a precise, specified torque value",
          "It helps prevent over-tightening that strips threads",
          "It automatically compensates for an incorrectly sized bolt",
          "It helps prevent under-tightening that lets joints loosen during operation"
        ],
        a: 2, xp: 25,
        exp: "Toruku-renchi (トルクレンチ), a torque wrench, lets you tighten a bolt to an exact specified torque value, preventing both over-tightening (stripped threads) and under-tightening (loosening in service) — but it has no way to detect or compensate for a wrong-sized bolt being used in the first place. Regular wrenches give no torque control at all. 🇯🇵 TIP: Always return a torque wrench to its lowest setting after use and store it in its case — Japanese tool rooms inspect torque wrenches carefully since incorrect storage can throw off calibration."
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
          "Apply a localized heat-treatment hardening to that edge only"
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
          "It reduces the shaft's rotational mass for balancing",
          "It prevents the sharp edge from damaging the bearing or operator's hands during assembly"
        ],
        a: 3, xp: 20,
        exp: "A sharp, unchamfered edge on a shaft can scrape or gouge the inner surface of a bearing during insertion, damaging both parts, and can also cut an assembler's hands. A small chamfer guides the shaft in smoothly. 🇯🇵 TIP: If you find a part missing its required Mentori (面取り), flag it before it reaches assembly — catching this kind of omission early is valued more than fixing it after a customer complaint."
      },
      {
        id: 205, cat: "Bending (Mage)",
        q: "Mage (曲げ), bending, has several real characteristics in sheet metal work. Which of the following is NOT true about it?",
        opts: [
          "It always returns exactly to its original flat angle once removed from the die",
          "It is performed using a press brake along a straight bend line",
          "The bend direction and angle are specified on the drawing",
          "The material undergoes plastic deformation at the bend line"
        ],
        a: 0, xp: 20,
        exp: "Mage (曲げ), bending, is the process of deforming sheet metal along a straight line using a press brake to create angles, flanges, or box shapes — the deformation is plastic (permanent), not elastic, so it does NOT spring back to its original flat shape; it only springs back PARTIALLY toward the die angle (springback), never all the way flat. The bend line and angle are specified precisely on the drawing. 🇯🇵 TIP: Always check the bend direction arrow on the drawing carefully — a part bent the wrong direction (上下逆, upside down) is a common and costly mistake for new operators."
      },
      {
        id: 206, cat: "Bending (Mage)",
        q: "After Mage (曲げ) forming, a part's final angle is slightly more open than the die angle used to form it. What phenomenon causes this?",
        opts: [
          "Thermal expansion from punching heat",
          "Supuringu-bakku (スプリングバック), springback, where the metal partially returns toward its original shape",
          "The metal melting slightly during bending",
          "Strain hardening increasing the material's yield strength during the bend"
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
          "It only requires extra cleaning time at the end of the shift",
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
          "To reduce the cycle time of the press stroke",
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
        q: "Kanagata (金型), die/mold tooling, has several real characteristics in a press shop. Which of the following is NOT true about it?",
        opts: [
          "It is consumed and replaced after every production batch, like a cutting fluid",
          "It is mounted in the press and shapes or cuts the material as the press cycles",
          "A single die set can be extremely expensive and is treated as a critical company asset",
          "It should be inspected for cleanliness and damage before installation"
        ],
        a: 0, xp: 20,
        exp: "Kanagata (金型), die or mold, refers to precision tooling that is reused for thousands or millions of cycles, often for years, NOT consumed per batch like a cutting fluid or coolant. It is mounted in the press and shapes, cuts, or forms the sheet metal as the press cycles, and a single die set can be extremely expensive and is treated as a critical company asset. 🇯🇵 TIP: Always handle Kanagata (金型) according to the storage and lifting procedure posted nearby — dropping or scratching die tooling can cost far more than a damaged part."
      },
      {
        id: 214, cat: "Die/Mold (Kanagata)",
        q: "Before installing a Kanagata (金型) into the press, what should be checked first?",
        opts: [
          "The color of the die set",
          "That the die is clean, undamaged, and matches the correct part number for the job",
          "The brand of the press machine",
          "The die's most recent maintenance log entry date only"
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
          "The punch will automatically resize itself to compensate",
          "Only the surface roughness value will be affected",
          "Incorrect clearance for the thicker material, leading to excessive burr or part damage"
        ],
        a: 3, xp: 25,
        exp: "Die clearance is calculated based on material type and thickness, so using a die designed for thinner material on thicker stock creates incorrect clearance, often resulting in excessive burr, tearing, or accelerated tool wear. Material thickness changes generally require a different die or clearance adjustment. 🇯🇵 TIP: Always confirm material thickness against the work order before running a job, since visually similar coils can have different gauges that are easy to mix up."
      },
      {
        id: 217, cat: "Shearing (Sendan)",
        q: "Sendan (せん断), shearing, has several real characteristics in metal cutting. Which of the following is NOT true about it?",
        opts: [
          "It works by melting a thin layer of metal along the cut line",
          "It uses two opposing forces or blades that cut through metal, like scissors",
          "Most punching, blanking, and trimming operations rely on this shearing action",
          "Fingers must stay clear of the shear line even on hand-operated shears"
        ],
        a: 0, xp: 20,
        exp: "Sendan (せん断), shearing, is a purely mechanical cutting process — two opposing forces, like the punch and die or shear blades, cut through the metal similar to how scissors cut paper. No melting is involved at all, which is what separates shearing from thermal cutting processes like laser or plasma. Most punching, blanking, and trimming operations rely on this shearing action. 🇯🇵 TIP: Keep fingers well clear of any Sendan (せん断) shear line, even on hand-operated shears — these blades close with enough force to cause amputation injuries instantly."
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
          "The press cycle time will automatically decrease",
          "The press will need to run at a higher tonnage setting",
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
        q: "Senshoku (旋削), turning, has several real characteristics in machining. Which of the following is NOT true about it?",
        opts: [
          "The cutting tool rotates while the workpiece stays stationary",
          "The workpiece rotates while a stationary tool removes material",
          "It can create cylindrical, conical, and threaded features",
          "It is typically performed on a Senban (旋盤), lathe"
        ],
        a: 0, xp: 20,
        exp: "Senshoku (旋削), turning, is the machining process performed on a lathe where the ROTATING WORKPIECE is shaped by a stationary cutting tool — the exact opposite setup from milling, where the tool rotates and the workpiece typically stays still. It is used to create cylindrical, conical, and threaded features. 🇯🇵 TIP: When learning Senshoku (旋削) terms, note that many machining words pair a kanji term with a katakana loanword for the same concept — both are commonly used interchangeably on the shop floor."
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
          "The coolant concentration ratio is slightly too low",
          "The part is too small to mill",
          "The spindle is running in the wrong rotation direction",
          "Insufficient rigidity in setup, excessive cutting depth, or wrong speed causing tool chatter"
        ],
        a: 3, xp: 25,
        exp: "Chatter during milling typically results from insufficient workholding rigidity, too aggressive a cutting depth, or running at the wrong spindle speed for the tool and material combination, causing vibration that leaves a wavy surface finish. Adjusting these parameters or improving the setup usually solves it. 🇯🇵 TIP: If chatter appears suddenly on a previously stable job, check tool wear first — Japanese machinists often say a tool 'getting tired' (刃が弱ってきた) is a common hidden cause."
      },
      {
        id: 305, cat: "Cutting Speed (Sessoku-sokudo)",
        q: "A lathe is turning a 40mm diameter shaft at a spindle speed of 1000 RPM. Using Vc = π × D × n / 1000, what is the cutting speed (Sessoku Sokudo, 切削速度)?",
        opts: [
          "≈126 m/min",
          "≈40 m/min (forgetting to multiply by π)",
          "≈63 m/min (using the radius instead of the diameter)",
          "≈251 m/min (mistakenly doubling the diameter)"
        ],
        a: 0, xp: 25,
        exp: "Vc = π × D × n / 1000 = π × 40 × 1000 / 1000 ≈ 126 m/min. Sessoku Sokudo (切削速度), cutting speed, is the surface speed at which the cutting edge passes over the workpiece, and it is a key factor in tool life and finish quality. The wrong answers come from real beginner mistakes: dropping π entirely, using the 20mm radius instead of the 40mm diameter, or accidentally doubling the diameter value. 🇯🇵 TIP: Keep a copy of the recommended Sessoku Sokudo (切削速度) chart for common materials at your station — referring to it instead of guessing is standard practice among experienced Japanese machinists."
      },
      {
        id: 306, cat: "Cutting Speed (Sessoku-sokudo)",
        q: "You want a cutting speed of 100 m/min while turning a 25mm diameter bar. Using n = Vc × 1000 / (π × D), what spindle speed should you set?",
        opts: [
          "≈4000 RPM (forgetting to include π in the calculation)",
          "≈1273 RPM",
          "≈2547 RPM (using the radius instead of the diameter)",
          "≈1.3 RPM (forgetting to convert meters to millimeters)"
        ],
        a: 1, xp: 25,
        exp: "n = Vc × 1000 / (π × D) = 100 × 1000 / (π × 25) ≈ 1273 RPM. Running the spindle far above the correct value (such as the 4000 RPM or 2547 RPM distractors here) generates excessive heat at the cutting edge for the intended Vc, accelerating tool wear and risking tool failure or part discoloration — this is exactly why getting the formula right matters, not just running 'fast.' 🇯🇵 TIP: When in doubt about the right speed for an unfamiliar material, ask a senior operator (先輩, senpai) rather than guessing — asking questions is viewed as responsible, not as a weakness."
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
        q: "Kirikomi (切り込み), depth of cut, has several real characteristics in machining. Which of the following is NOT true about it?",
        opts: [
          "It is determined by the brand of the cutting tool being used",
          "It directly affects cutting force and tool load on each pass",
          "Roughing passes typically use a larger depth of cut than finishing passes",
          "It must be balanced with speed and feed for safe, efficient machining"
        ],
        a: 0, xp: 20,
        exp: "Kirikomi (切り込み), depth of cut, is how deep the tool bites into the material during each pass — it is set by the operator/process plan, not by tool brand. It directly affects cutting force, tool load, and how many passes are needed to reach final dimension, and must be balanced with speed and feed. 🇯🇵 TIP: For roughing passes, Japanese training often emphasizes a larger Kirikomi (切り込み) with conservative speed, then a light finishing pass — learning this pass strategy early will make your parts more consistent."
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
          "To pre-treat the workpiece surface for better paint adhesion",
          "To clean the floor around the machine",
          "To balance the rotating spindle"
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
          "A note specifying which supplier machined the part",
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
        q: "On a Japanese drawing, the material is specified as 'SS400'. Which of the following correctly identifies this code, without confusing it with a similar-looking grade?",
        opts: [
          "General structural rolled steel (JIS G3101), not the higher-strength SS490",
          "SM490 — a higher-strength weldable structural steel grade, not SS400",
          "SN400 — a steel grade specifically certified for building/architectural structures",
          "SUS400 — a martensitic stainless steel series"
        ],
        a: 0, xp: 25,
        exp: "SS400 is a JIS code for general structural rolled steel with a minimum tensile strength around 400 N/mm². It is easy to confuse with SM490 (a higher-strength weldable structural steel), SN400 (a related but separately certified grade for building structures with tighter weldability/ductility requirements), or SUS400-series (martensitic stainless, an entirely different family). SS400 itself is commonly used for frames, brackets, and general fabrication where high corrosion resistance is not required. 🇯🇵 TIP: Always double check material codes like SS400 against the actual stock tag on the material rack — mixing up similar-looking steel grades is a common and costly shop floor error."
      },
      {
        id: 410, cat: "Material Codes",
        q: "A drawing calls for 'SUS304' instead of 'SS400'. What is the main reason a designer would choose SUS304?",
        opts: [
          "It is always cheaper than SS400",
          "SUS304 is a stainless steel offering much better corrosion resistance than plain carbon steel",
          "SUS304 is lighter than aluminum",
          "It is the same alloy as SUS316, just an older lot designation"
        ],
        a: 1, xp: 20,
        exp: "SUS304 is an austenitic stainless steel known for strong corrosion resistance, making it preferred for parts exposed to moisture, chemicals, or food contact, unlike plain carbon steel such as SS400 which rusts without protective coating. It is NOT the same as SUS316 — SUS316 adds molybdenum for extra resistance to chlorides and marine/chemical environments, a genuinely different (and more expensive) grade, not just a different lot of SUS304. The trade-off for SUS304 is usually higher cost and different machining behavior. 🇯🇵 TIP: SUS304 tends to work-harden and gall more than mild steel, so ask about the recommended cutting speed and coolant for stainless before machining it for the first time."
      },
      {
        id: 411, cat: "Material Codes",
        q: "A drawing specifies 'A5052' for a sheet metal bracket. What general category of material is this?",
        opts: [
          "A high-carbon tool steel",
          "The same alloy as A5083, just a regional naming variant",
          "An aluminum alloy known for good corrosion resistance and formability",
          "A ceramic coating material"
        ],
        a: 2, xp: 20,
        exp: "A5052 is a JIS code for an aluminum-magnesium alloy valued for good corrosion resistance, weldability, and formability, frequently used in sheet metal enclosures and brackets where light weight matters. It is NOT the same as A5083 — A5083 carries a higher magnesium content for greater strength and is the grade typically chosen for marine and structural welding, a genuinely different alloy, not a regional rename of A5052. It behaves quite differently from steel under bending and cutting. 🇯🇵 TIP: Aluminum alloys like A5052 can react badly if mixed with certain coolants or contaminated with steel chips — keep aluminum and steel scrap and tooling separated where your shop requires it."
      },
      {
        id: 412, cat: "Third Angle Projection (Daisankakuhou)",
        q: "Daisankakuhou (第三角法), third angle projection, has several real characteristics on Japanese engineering drawings. Which of the following is NOT true about it?",
        opts: [
          "It is the standard convention used in Japan, much of Asia, and North America",
          "The top view is placed above the front view under this system",
          "A small truncated-cone symbol in the title block identifies which projection system is used",
          "It is the only projection system recognized internationally, with no alternative anywhere"
        ],
        a: 3, xp: 25,
        exp: "Daisankakuhou (第三角法), third angle projection, is the standard drawing convention used in Japan and much of Asia and North America, with the top view placed above the front view and a small truncated-cone symbol in the title block identifying it — but it is NOT the only system in use. First angle projection (第一角法) remains the standard in much of Europe, so misreading the projection system can cause a worker to misinterpret which side of a part a feature belongs on. 🇯🇵 TIP: If you trained in a country using first angle projection, double check the projection symbol box on Japanese drawings before reading dimensions, since view placement differs from what you may be used to."
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
          "The dimension automatically defaults to IT12, the loosest standard tolerance grade",
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
        q: "For the same nominal size, which of these IT Toukyuu (IT等級) grades represents the TIGHTEST (smallest) tolerance band?",
        opts: [
          "IT7",
          "IT5",
          "IT9",
          "IT11"
        ],
        a: 1, xp: 25,
        exp: "IT Toukyuu (IT等級), IT grade, is part of a standardized international tolerance system where a LOWER IT number means a TIGHTER tolerance band for a given nominal size — IT5 is tighter than IT7, which is tighter than IT9, which is tighter than IT11. This system lets engineers specify precision levels in a consistent, comparable way across many dimensions. 🇯🇵 TIP: If a customer requests a tighter IT grade than your shop normally holds, raise it with your supervisor early rather than after parts fail inspection, since process or tooling changes may be needed."
      },
      {
        id: 419, cat: "Basic Hole/Shaft System",
        q: "The 'Kijun Ana (基準穴)', basic hole system, has several real characteristics. Which of the following is NOT true about it?",
        opts: [
          "Holes are manufactured to a fixed standard tolerance class",
          "Shaft tolerance is varied to achieve the desired type of fit",
          "Shafts must always be manufactured oversized, regardless of the desired fit",
          "This approach is common because holes are generally harder to resize than shafts in production"
        ],
        a: 2, xp: 25,
        exp: "In the Kijun Ana (基準穴), basic hole system, the hole's tolerance is fixed as a standard reference, and the SHAFT is manufactured to different tolerance classes to achieve the desired type of fit — clearance, transition, OR interference, not always oversized. Whether the shaft ends up undersized (clearance) or oversized (interference) depends entirely on which fit is specified. This approach is common because holes are often harder to adjust in size than shafts during production. 🇯🇵 TIP: When you see fit codes like H7/g6 on a drawing, recognize the H as referring to the basic hole system, a notation worth memorizing early since it appears constantly on Japanese mechanical drawings."
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
          "Whether the caliper's resolution setting is set to 0.01mm"
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
        q: "QC Nanatsu Dougu (QC7つ道具), the 7 QC tools, include several real analytical tools. Which of the following is NOT actually one of them?",
        opts: [
          "Failure Mode and Effects Analysis (FMEA) worksheet",
          "Pareto chart",
          "Control chart",
          "Cause-and-effect (fishbone) diagram"
        ],
        a: 0, xp: 30,
        exp: "QC Nanatsu Dougu (QC7つ道具), the 7 QC tools, are: Pareto chart, cause-and-effect (fishbone) diagram, histogram, control chart, scatter diagram, check sheet, and stratification. FMEA is a real and valuable quality method, but it belongs to a different toolset entirely (often grouped with the '7 new QC tools' or reliability engineering methods), not the classic QC7 tools. These seven basic statistical tools are taught widely in Japanese quality training programs as the foundation of practical problem solving. 🇯🇵 TIP: Even if your role is mostly hands-on production, learning to read a basic Pareto chart will help you understand quality meetings at a Japanese factory much better."
      },
      {
        id: 510, cat: "7 QC Tools",
        q: "Which of the QC Nanatsu Dougu (QC7つ道具) is most useful for visually identifying the most frequent causes of defects in a batch of data?",
        opts: [
          "A histogram, which shows the distribution shape of a data set",
          "A Pareto chart, which ranks causes by frequency to highlight the most significant ones",
          "A fishbone (cause-and-effect) diagram, which maps potential causes of a problem",
          "A scatter diagram, which shows correlation between two variables"
        ],
        a: 1, xp: 25,
        exp: "A Pareto chart, one of the QC Nanatsu Dougu (QC7つ道具), visually ranks defect causes from most to least frequent, helping teams focus improvement efforts on the few causes responsible for the majority of problems, following the 80/20 principle. The other three options are also real QC7 tools, but each answers a different question: a histogram shows how data is distributed, a fishbone diagram maps possible causes without ranking them, and a scatter diagram shows whether two variables move together — none of them rank causes by frequency the way a Pareto chart does. 🇯🇵 TIP: In Japanese quality meetings, you will often hear the phrase 'juuten kanri (重点管理)', meaning focusing on the most important few items first, which is exactly the philosophy behind Pareto analysis."
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
          "To reduce the number of workers needed per shift",
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
          "To determine optimal machine maintenance schedules only",
          "To calculate shipping costs only",
          "To be able to trace a part back through its production history, material lot, and process steps if a problem is found later",
          "To set production line staffing levels"
        ],
        a: 2, xp: 20,
        exp: "Toresabiriti (トレーサビリティ), traceability, allows a company to trace any part back to its specific material lot, machine, operator, and date, which becomes critical if a defect is discovered after shipment, allowing the affected scope to be identified precisely. Without good traceability records, a single defect could force recalling far more parts than necessary. 🇯🇵 TIP: Always fill in batch numbers, dates, and your operator stamp accurately on production records, even when it feels like routine paperwork — this data is exactly what gets used during a traceability investigation."
      },
      {
        id: 516, cat: "Traceability",
        q: "A customer reports a defect found in the field and asks which production lot it came from. What allows the factory to answer this quickly?",
        opts: [
          "Guessing based on when the complaint arrived",
          "Cross-referencing the customer's purchase order date only",
          "There is no way to know after shipment",
          "Toresabiriti (トレーサビリティ) records that link the part's serial or lot number to its specific production history"
        ],
        a: 3, xp: 25,
        exp: "With proper Toresabiriti (トレーサビリティ) records, a factory can look up a part's serial or lot number and immediately find which machine, operator, material lot, and date produced it, enabling a fast, accurate response to the customer. Without this system, the investigation would be slow, imprecise, and could require recalling unnecessarily large quantities of product. 🇯🇵 TIP: Treat lot numbers and traceability labels on bins and parts as critical information, never remove or mix them casually, since doing so can break the entire traceability chain."
      },
      {
        id: 517, cat: "Self-Inspection (Jishu-kensa)",
        q: "Jishu Kensa (自主検査), self-inspection, has several real characteristics for a machine operator. Which of the following is NOT true about it?",
        opts: [
          "It is performed only by a separate quality department, never by the operator themselves",
          "The operator personally checks their own work for defects and dimensional accuracy during production",
          "It is expected even in shops that also have dedicated quality inspectors",
          "It helps catch problems early, often before a large quantity of defective parts accumulates"
        ],
        a: 0, xp: 25,
        exp: "Jishu Kensa (自主検査), self-inspection, means the OPERATOR regularly checks their own output for defects and correct dimensions during production, rather than relying solely on a separate inspector found later — the opposite of the first statement here. This catches problems early, often before a large quantity of bad parts accumulates. 🇯🇵 TIP: Even in shops with dedicated inspectors, performing honest Jishu Kensa (自主検査) on your own work is expected and shows professionalism, not a lack of trust in the inspection department."
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

// ============================================================
// 資格道場 (SHIKAKU DOJO) — National certification exam prep
// 3 mock exams · 20 questions each · 60% pass threshold
// exp fields use <ruby> tags for furigana on Japanese terms
// ============================================================
export const SHIKAKU_EXAMS = [
  {
    examId: 1,
    label: "機械加工技能士 3級",
    subtitle: "Machining Skills Test Lv.3",
    color: "#1E90FF",
    icon: "🥉",
    examiner: "見習い試験官 (Minarai Shikenkan)",
    questions: [
      {
        id: 6001, cat: "Measuring Tools",
        q: "When reading a 'Nogisu (ノギス)', vernier caliper, what two scales do you compare to get a precise reading?",
        opts: ["The main scale and the vernier (sliding) scale", "Only the main scale, read by eye", "The thimble scale and the sleeve scale", "The dial face and the bezel ring"],
        a: 0, xp: 15,
        exp: "A <ruby>ノギス<rt>ノギス</rt></ruby> (Nogisu, vernier caliper) has a fixed main scale in millimeters and a sliding vernier scale; you find where a line on the vernier scale aligns exactly with a line on the main scale to read the decimal portion. 🇯🇵 TIP: Modern digital calipers (デジタルノギス) are common in shops now, but the 3rd-grade exam often still tests the analog vernier-scale reading skill directly."
      },
      {
        id: 6002, cat: "Measuring Tools",
        q: "A 'Maikurometa (マイクロメータ)', micrometer, typically measures to what level of precision?",
        opts: ["1mm", "0.01mm", "0.5mm", "10mm"],
        a: 1, xp: 15,
        exp: "A standard <ruby>マイクロメータ<rt>マイクロメータ</rt></ruby> (Maikurometa, micrometer) reads to 0.01mm using the sleeve and thimble scales, making it more precise than a vernier caliper for critical dimensions like shaft diameters. 🇯🇵 TIP: Always check the micrometer's zero point (零点, reiten) before use — a worn or misadjusted anvil throws off every reading you take that day."
      },
      {
        id: 6003, cat: "Lathe Basics",
        q: "On a lathe, what is the 'Chakku (チャック)' used for?",
        opts: ["Cooling the cutting tool", "Measuring the finished diameter", "Holding and rotating the workpiece", "Lubricating the lead screw"],
        a: 2, xp: 15,
        exp: "The <ruby>チャック<rt>チャック</rt></ruby> (Chakku, chuck) is the clamping device mounted on the spindle that grips the workpiece so it can be rotated against the cutting tool. A 3-jaw chuck self-centers round stock; a 4-jaw chuck allows offset or irregular shapes. 🇯🇵 TIP: Never leave the chuck key in the chuck after tightening — it can be thrown out violently the instant the spindle starts."
      },
      {
        id: 6004, cat: "Lathe Basics",
        q: "'Sessoku Sokudo (切削速度)', cutting speed, on a lathe is typically expressed in what unit?",
        opts: ["kg/cm² (kilograms per square centimeter)", "rpm only, with no distance unit", "liters per minute", "m/min (meters per minute)"],
        a: 3, xp: 15,
        exp: "<ruby>切削速度<rt>せっさくそくど</rt></ruby> (Sessoku Sokudo, cutting speed) is the surface speed of the workpiece relative to the tool, measured in meters per minute (m/min). Spindle RPM is then calculated from this speed and the workpiece diameter. 🇯🇵 TIP: Going over the recommended cutting speed for a material is one of the fastest ways to dull a tool or burn a finish in the 3rd-grade practical test."
      },
      {
        id: 6005, cat: "Drilling",
        q: "When drilling, what does 'Okuri (送り)', feed, refer to?",
        opts: ["How far the drill advances into the material per revolution", "The spindle's rotational speed", "The diameter of the drill bit", "The angle of the drill point"],
        a: 0, xp: 15,
        exp: "<ruby>送り<rt>おくり</rt></ruby> (Okuri, feed) is the linear distance the drill (or any cutting tool) advances into the workpiece per revolution or per minute. Too fast a feed can snap a small drill; too slow can cause excessive heat and wear. 🇯🇵 TIP: For deep holes, periodically retracting the drill to clear chips (called 'pecking') is standard practice and is often checked in practical exams."
      },
      {
        id: 6006, cat: "Milling Basics",
        q: "What is the main difference between an 'Endo Miru (エンドミル)', end mill, and a 'Feisu Miru (フェイスミル)', face mill?",
        opts: ["They are two names for the exact same tool", "End mills cut with their side and bottom for slots/profiles; face mills cut wide flat surfaces with edge-mounted inserts", "Face mills are only used on lathes, not mills", "End mills can only drill round holes"],
        a: 1, xp: 20,
        exp: "An <ruby>エンドミル<rt>エンドミル</rt></ruby> (Endo Miru, end mill) is a smaller rotating tool used for slotting, profiling, and pocketing, cutting with both its bottom and side edges. A <ruby>フェイスミル<rt>フェイスミル</rt></ruby> (Feisu Miru, face mill) is a larger tool with replaceable inserts around its face, designed to quickly flatten wide surfaces. 🇯🇵 TIP: Knowing which tool to select for a given drawing feature is a core judgment skill tested in the practical exam, not just a vocabulary question."
      },
      {
        id: 6007, cat: "Hand Tools",
        q: "What is 'Yasuri-gake (やすり掛け)', filing, typically used for in a machining workshop?",
        opts: ["Cutting threads on a lathe", "Measuring surface roughness electronically", "Manually removing burrs and small amounts of material for a smooth finish", "Cooling a hot workpiece quickly"],
        a: 2, xp: 15,
        exp: "<ruby>やすり掛け<rt>やすりがけ</rt></ruby> (Yasuri-gake, filing) uses a hand file to remove sharp edges, burrs, or small high spots after machining, when a hand-finished feel or fine adjustment is needed that a machine can't easily achieve. 🇯🇵 TIP: The 3rd-grade practical exam often grades how evenly and squarely you can file a flat surface by hand — practice steady, full-length strokes."
      },
      {
        id: 6008, cat: "Blueprint Reading",
        q: "In Japan, 'Daisankakuhou (第三角法)', third-angle projection, places which view directly above the front view?",
        opts: ["The bottom view", "The rear view", "The left side view", "The top view"],
        a: 3, xp: 20,
        exp: "<ruby>第三角法<rt>だいさんかくほう</rt></ruby> (Daisankakuhou, third-angle projection) is the standard used in most modern Japanese (JIS) drawings; the top view is placed directly above the front view, as if looking through a glass box toward each face. 🇯🇵 TIP: Some older or imported drawings use first-angle projection instead, so always check the drawing's title block for the projection symbol before reading dimensions."
      },
      {
        id: 6009, cat: "Tolerances",
        q: "What does 'Kousa (公差)', tolerance, define on a dimensioned drawing?",
        opts: ["The allowable range of variation for a dimension between its maximum and minimum limits", "The exact theoretical size with zero variation allowed", "The surface roughness value only", "The material hardness requirement"],
        a: 0, xp: 20,
        exp: "<ruby>公差<rt>こうさ</rt></ruby> (Kousa, tolerance) is the permitted range between the upper and lower limit of a dimension, acknowledging that no part can be manufactured to a perfectly exact size. A part is acceptable as long as it falls within this stated range. 🇯🇵 TIP: Always check whether a tolerance is unilateral (one direction only) or bilateral (both directions) before machining to that dimension."
      },
      {
        id: 6010, cat: "Surface Finish",
        q: "On a drawing, a checkmark-style symbol with a number next to it (e.g., Ra 1.6) indicates what?",
        opts: ["The required hardness after heat treatment", "The required surface roughness value after machining", "The total weight of the finished part", "The recommended cutting fluid type"],
        a: 1, xp: 15,
        exp: "The surface finish symbol with a value like Ra 1.6 specifies the maximum allowable <ruby>表面粗さ<rt>ひょうめんあらさ</rt></ruby> (Hyoumen Arasa, surface roughness) for that face after machining; a lower Ra number means a smoother, more polished surface. 🇯🇵 TIP: Achieving a tight Ra value often requires slower feeds and finishing passes, not just one rough cut — plan your machining sequence accordingly."
      },
      {
        id: 6011, cat: "Materials",
        q: "Compared to mild carbon steel, what is a key practical difference when machining aluminum, 'Aruminiumu (アルミニウム)'?",
        opts: ["Aluminum is always harder than steel and requires slower cutting speeds", "Aluminum cannot be cut with any rotating tool", "Aluminum is much softer and machines faster but tends to gum up on cutting edges if speeds/tools aren't suited to it", "Aluminum requires the exact same speeds and feeds as steel"],
        a: 2, xp: 20,
        exp: "<ruby>アルミニウム<rt>アルミニウム</rt></ruby> (Aruminiumu, aluminum) is much softer than steel and can generally be machined at higher speeds, but its tendency to build up on cutting edges (built-up edge) means tool geometry and coolant choice matter a lot for a clean finish. 🇯🇵 TIP: Sharp tools with proper rake angles and good chip evacuation prevent the gummy buildup that ruins aluminum surface finish."
      },
      {
        id: 6012, cat: "Heat Treatment",
        q: "What does 'Yakiire (焼き入れ)', quenching, do to a steel part?",
        opts: ["Slowly cools heated steel to make it as soft as possible", "Coats the surface with a protective paint layer", "Removes all carbon content from the steel", "Rapidly cools heated steel to greatly increase its hardness"],
        a: 3, xp: 20,
        exp: "<ruby>焼き入れ<rt>やきいれ</rt></ruby> (Yakiire, quenching) involves heating steel to a high temperature and then rapidly cooling it (often in oil or water), which locks in a hard but brittle microstructure. This is usually followed by tempering to reduce brittleness while keeping most of the hardness. 🇯🇵 TIP: Quenched-only parts are often too brittle for direct use — expect a tempering step right after in real production."
      },
      {
        id: 6013, cat: "Safety Basics",
        q: "Why must you wear 'Hogo Megane (保護メガネ)', safety glasses, when machining?",
        opts: ["To protect your eyes from flying chips, sparks, and coolant splashes", "Because they are required only for paperwork compliance, not real protection", "To improve your vision while reading blueprints", "Only required when operating CNC machines, never manual machines"],
        a: 0, xp: 15,
        exp: "<ruby>保護メガネ<rt>ほごめがね</rt></ruby> (Hogo Megane, safety glasses) shield your eyes from metal chips, abrasive particles, and coolant mist that fly off at high speed during cutting operations — an eye injury from a single chip can be permanent. 🇯🇵 TIP: Wear safety glasses even when 'just watching' a machine run near you, since flying debris doesn't care whose hands are on the controls."
      },
      {
        id: 6014, cat: "Safety Basics",
        q: "What is the purpose of a machine's 'Anzen Souchi (安全装置)', safety guard or device?",
        opts: ["To make the machine look more professional", "To physically block access to moving or dangerous parts during operation", "To increase the machine's cutting speed", "To reduce electricity costs"],
        a: 1, xp: 15,
        exp: "<ruby>安全装置<rt>あんぜんそうち</rt></ruby> (Anzen Souchi, safety device/guard) is engineered specifically to prevent hands, clothing, or hair from reaching rotating spindles, chucks, or cutting zones while the machine is running. 🇯🇵 TIP: Removing or propping open a safety guard 'to work faster' is treated as a serious violation in any certified workshop, exam or otherwise."
      },
      {
        id: 6015, cat: "Cutting Tools",
        q: "What does 'Hai-su (ハイス)', HSS (High Speed Steel), describe?",
        opts: ["A type of coolant additive", "A measuring instrument for hardness", "A common cutting tool material known for toughness and heat resistance, used for drills and end mills", "A surface coating applied only to aluminum parts"],
        a: 2, xp: 15,
        exp: "<ruby>ハイス<rt>ハイス</rt></ruby> (Hai-su, HSS) is a tool steel alloy that retains hardness at higher temperatures than plain carbon tool steel, making it a common, tough, relatively affordable choice for drills, taps, and end mills in general shop work. 🇯🇵 TIP: Carbide tools cut faster and last longer than HSS at high speed, but HSS is more forgiving of vibration and interrupted cuts, which is why it's still widely used."
      },
      {
        id: 6016, cat: "Cutting Fluid",
        q: "What is the main purpose of 'Sessakuyu (切削油)', cutting fluid/coolant, during machining?",
        opts: ["To make the finished part shinier with no functional purpose", "To replace the need for any tool changes", "To increase the hardness of the workpiece", "To cool the tool and workpiece while reducing friction and washing away chips"],
        a: 3, xp: 15,
        exp: "<ruby>切削油<rt>せっさくゆ</rt></ruby> (Sessakuyu, cutting fluid) reduces heat buildup and friction at the cutting edge, helps clear chips from the cut zone, and can improve surface finish and tool life. 🇯🇵 TIP: Using the wrong coolant type, or none at all, for a given material is a common cause of premature tool wear in the practical exam."
      },
      {
        id: 6017, cat: "Measuring Tools",
        q: "A 'Daiyaru Geji (ダイヤルゲージ)', dial gauge/dial indicator, is mainly used to measure what?",
        opts: ["Small relative movements, runout, or flatness deviations", "Absolute room temperature", "The exact chemical composition of a metal", "Spindle RPM directly"],
        a: 0, xp: 15,
        exp: "A <ruby>ダイヤルゲージ<rt>ダイヤルゲージ</rt></ruby> (Daiyaru Geji, dial gauge) has a spring-loaded plunger connected to a needle that shows small deviations in position, commonly used to check a workpiece's runout on a lathe or the flatness of a surface. 🇯🇵 TIP: Always mount the dial gauge securely on a stable stand — a loose gauge gives readings that look precise but are completely unreliable."
      },
      {
        id: 6018, cat: "Shop Math",
        q: "If a workpiece diameter is larger and the desired cutting speed (m/min) stays the same, what happens to the required spindle RPM?",
        opts: ["The RPM must increase no matter what", "The RPM must decrease, since the same surface speed is achieved with fewer rotations on a larger diameter", "The RPM stays exactly the same regardless of diameter", "RPM has no relationship to diameter at all"],
        a: 1, xp: 20,
        exp: "Spindle <ruby>回転数<rt>かいてんすう</rt></ruby> (Kaitensuu, RPM) is calculated from cutting speed divided by the workpiece circumference; since circumference grows with diameter, a larger diameter needs fewer revolutions per minute to maintain the same surface (cutting) speed. 🇯🇵 TIP: Forgetting to adjust RPM down when switching to a larger-diameter stock is a classic mistake that overheats the tool almost immediately."
      },
      {
        id: 6019, cat: "Drilling",
        q: "What is the typical 'Sentankaku (先端角)', point angle, of a standard general-purpose twist drill?",
        opts: ["30 degrees", "180 degrees", "118 degrees", "45 degrees"],
        a: 2, xp: 20,
        exp: "The standard <ruby>先端角<rt>せんたんかく</rt></ruby> (Sentankaku, point angle) for a general-purpose twist drill is 118 degrees, a balance that works reasonably well across many common materials. Harder materials may use a steeper angle for a more durable cutting edge. 🇯🇵 TIP: Resharpening a drill point unevenly causes it to drill an oversized or off-center hole — symmetry of the two cutting lips matters as much as the angle itself."
      },
      {
        id: 6020, cat: "Finishing",
        q: "Why is 'Bari-tori (バリ取り)', deburring, an important final step after machining a part?",
        opts: ["Burrs always improve a part's strength so removing them is optional", "Deburring is only done for decorative purposes", "Burrs only appear on plastic parts, never on metal", "Sharp burrs left from cutting can cause injury, assembly problems, or measurement errors if not removed"],
        a: 3, xp: 15,
        exp: "<ruby>バリ取り<rt>バリとり</rt></ruby> (Bari-tori, deburring) removes the thin, sharp edges of displaced material left behind after cutting, drilling, or shearing. Leftover burrs can cut hands, prevent mating parts from fitting correctly, or throw off precise measurements. 🇯🇵 TIP: Inspectors in Japanese shops routinely run a finger along edges (carefully) to feel for missed burrs before a part is approved."
      }
    ]
  },
  {
    examId: 2,
    label: "機械加工技能士 2級",
    subtitle: "Machining Skills Test Lv.2",
    color: "#FFB800",
    icon: "🥈",
    examiner: "上級試験官 (Joukyuu Shikenkan)",
    questions: [
      {
        id: 6101, cat: "Lathe Advanced",
        q: "What is the most common method for cutting a precise 'Teipa (テーパー)', taper, on a lathe?",
        opts: ["Offsetting the tailstock or using a taper attachment/compound slide angle", "Increasing spindle speed only, with the tool held straight", "Using a face mill instead of a lathe tool", "Quenching the workpiece before cutting"],
        a: 0, xp: 25,
        exp: "Cutting a precise <ruby>テーパー<rt>テーパー</rt></ruby> (Teipa, taper) typically uses tailstock offset for shallow, long tapers, a taper attachment for repeatable production tapers, or angling the compound slide for steep, short tapers cut manually. 🇯🇵 TIP: Tailstock offset changes the centers' alignment, so it's unsuitable for parts that also need center-drilled holes machined afterward."
      },
      {
        id: 6102, cat: "Lathe Advanced",
        q: "When cutting threads on a lathe, what does the 'Pitchi (ピッチ)', pitch, of the thread specify?",
        opts: ["The total length of the threaded section", "The distance between adjacent thread crests, which sets the lead screw/gear ratio needed", "The diameter of the minor thread root only", "The hardness required for the finished thread"],
        a: 1, xp: 25,
        exp: "<ruby>ピッチ<rt>ピッチ</rt></ruby> (Pitchi, pitch) is the axial distance from one thread crest to the next; the lathe's gear train or electronic lead screw must be set to match this pitch exactly so the single-point tool advances the correct amount per spindle revolution. 🇯🇵 TIP: Always cut a trial pass and check thread pitch with a thread gauge before committing to full depth — a wrong gear setting ruins the part instantly."
      },
      {
        id: 6103, cat: "CNC Basics",
        q: "In CNC programming, what is the key difference between a 'G00' and a 'G01' command?",
        opts: ["G00 and G01 are identical commands with different names", "G00 only works on lathes; G01 only works on mills", "G00 is rapid positioning (non-cutting move); G01 is a controlled linear feed move used for cutting", "G01 always moves faster than G00"],
        a: 2, xp: 25,
        exp: "G00 commands rapid traverse movement at the machine's maximum non-cutting speed to reposition the tool quickly, while G01 commands a linear feed move at a programmed feed rate, used for actual cutting passes. 🇯🇵 TIP: Accidentally leaving a G01 feed rate active for a positioning move (or vice versa) is a common simulation error caught during 2nd-grade CNC practical checks."
      },
      {
        id: 6104, cat: "Milling Advanced",
        q: "What does a 'Bunkatsudai (分割台)', dividing head/indexing head, allow you to do on a milling machine?",
        opts: ["Measure the surface roughness of a finished part", "Automatically change cutting tools", "Cool the workpiece during heavy cuts", "Rotate a workpiece by precise, repeatable angular increments for features like gear teeth or hex flats"],
        a: 3, xp: 25,
        exp: "A <ruby>分割台<rt>ぶんかつだい</rt></ruby> (Bunkatsudai, dividing/indexing head) holds a workpiece and rotates it through exact angular steps, letting a machinist mill evenly spaced features such as gear teeth, splines, or hexagonal flats. 🇯🇵 TIP: Always double-check the index plate hole count and crank ratio calculation before cutting — an error here repeats across every single division."
      },
      {
        id: 6105, cat: "GD&T",
        q: "On a drawing, what does a 'flatness' GD&T symbol (a parallelogram) control?",
        opts: ["How much a single surface is allowed to deviate from a perfectly flat plane", "The angle between two separate surfaces", "The roundness of a cylindrical feature", "The exact location of a hole relative to a datum"],
        a: 0, xp: 25,
        exp: "The flatness symbol is a form tolerance that limits how much an individual surface can vary from being perfectly flat, independent of any other feature or datum. 🇯🇵 TIP: Flatness call-outs often appear on sealing surfaces or mounting faces where even a tiny bow can cause a leak or rocking assembly."
      },
      {
        id: 6106, cat: "GD&T",
        q: "What does 'Ichido (位置度)', position tolerance, control in geometric dimensioning?",
        opts: ["The maximum allowable surface roughness", "How precisely a feature's true location must fall relative to specified datums, within a cylindrical or 2D tolerance zone", "The required heat treatment hardness", "The recommended cutting fluid for that feature"],
        a: 1, xp: 25,
        exp: "<ruby>位置度<rt>いちど</rt></ruby> (Ichido, position tolerance) defines a tolerance zone, often cylindrical for a hole, within which the feature's actual center must lie relative to datum references, rather than dimensioning location with simple plus/minus coordinates. 🇯🇵 TIP: Position tolerance is commonly paired with a Maximum Material Condition (MMC) modifier, which can effectively loosen the tolerance as the feature size departs from its limit — know this relationship for the written exam."
      },
      {
        id: 6107, cat: "Fits & Tolerances",
        q: "What does the 'IT Touukyuu (IT等級)', IT grade, system define in JIS tolerancing?",
        opts: ["The hardness rating of a finished part", "The color-coding scheme for different metals", "A standardized tolerance band width that gets tighter (smaller) as the IT number decreases", "The required cutting fluid pressure"],
        a: 2, xp: 25,
        exp: "The <ruby>IT等級<rt>アイティーとうきゅう</rt></ruby> (IT Touukyuu, IT grade) system, standardized under JIS/ISO, assigns a tolerance band width for a given nominal size; lower IT numbers (like IT5) mean tighter, more precise tolerances, while higher numbers (like IT12) allow looser tolerances. 🇯🇵 TIP: Precision fits like bearing seats commonly call for low IT grades (IT5–IT7), while general clearance holes can use much looser grades."
      },
      {
        id: 6108, cat: "Fits & Tolerances",
        q: "What is the difference between 'Sukima-bame (すきまばめ)', clearance fit, and 'Shimari-bame (しまりばめ)', interference fit?",
        opts: ["They describe the exact same fit condition with different names", "Clearance fit always requires heating the part; interference fit never does", "Interference fit is only used for plastic parts", "Clearance fit leaves a gap so parts move/assemble freely; interference fit makes the shaft larger than the hole so the parts must be pressed together"],
        a: 3, xp: 25,
        exp: "<ruby>すきまばめ<rt>すきまばめ</rt></ruby> (Sukima-bame, clearance fit) leaves a small gap between shaft and hole so parts can rotate or slide; <ruby>しまりばめ<rt>しまりばめ</rt></ruby> (Shimari-bame, interference fit) makes the shaft slightly larger than the hole, requiring press-fitting or thermal assembly to create a permanently tight joint. 🇯🇵 TIP: Bearings are a classic example where the outer race often uses a transition or interference fit, while the rotating shaft inside uses a clearance fit."
      },
      {
        id: 6109, cat: "Precision Measurement",
        q: "What is a 'Sain Baa (サインバー)', sine bar, used to measure or set up?",
        opts: ["Precise angles, by combining the bar's known length with gauge block stacks and trigonometry", "Surface roughness values directly", "Spindle vibration frequency", "Coolant flow rate"],
        a: 0, xp: 25,
        exp: "A <ruby>サインバー<rt>サインバー</rt></ruby> (Sain Baa, sine bar) is a precision bar with two cylinders of known, equal diameter set a fixed distance apart; by raising one end with stacked gauge blocks of a calculated height, you can set up or verify a precise angle using sine trigonometry. 🇯🇵 TIP: Sine bars are most accurate for angles up to about 45 degrees — beyond that, small height errors translate into larger angular errors."
      },
      {
        id: 6110, cat: "Precision Measurement",
        q: "What is a 'Sanjigen Sokuteiki (三次元測定機)', CMM (coordinate measuring machine), primarily used for?",
        opts: ["Cutting complex 3D shapes directly from raw stock", "Precisely measuring the 3D geometry of a part by probing points in X, Y, and Z coordinates", "Heat-treating parts to exact hardness specifications", "Cleaning oil and debris off finished parts"],
        a: 1, xp: 25,
        exp: "A <ruby>三次元測定機<rt>さんじげんそくていき</rt></ruby> (Sanjigen Sokuteiki, CMM) uses a precision probe to capture exact X, Y, Z coordinates of points on a part's surface, allowing comprehensive verification of complex geometry, GD&T callouts, and hole locations against the CAD model. 🇯🇵 TIP: CMM results are only as good as the part's fixturing — an unstable or contaminated setup surface will introduce measurement error no matter how good the machine is."
      },
      {
        id: 6111, cat: "Precision Measurement",
        q: "What does a 'Touei-ki (投影機)', optical comparator/profile projector, allow an inspector to do?",
        opts: ["Measure the internal hardness of a part non-destructively", "Weigh a part to a precision of micrograms", "Magnify and project a part's silhouette onto a screen to compare it against an overlay chart or measure features optically", "Detect internal cracks using ultrasonic waves"],
        a: 2, xp: 20,
        exp: "A <ruby>投影機<rt>とうえいき</rt></ruby> (Touei-ki, optical comparator) shines light through or onto a part and projects a magnified silhouette onto a screen, where the operator can compare the profile to an overlay chart or take precise edge-to-edge measurements, especially useful for small or delicate parts like gears and threads. 🇯🇵 TIP: Because it measures silhouette/edge position, it's especially good for checking profiles like thread forms or gear tooth shapes that are awkward to probe mechanically."
      },
      {
        id: 6112, cat: "Heat Treatment",
        q: "What is the purpose of 'Yakimodoshi (焼き戻し)', tempering, after quenching a steel part?",
        opts: ["To make the part as soft as the original unhardened steel", "To add carbon to the surface layer only", "To clean oil residue off the part's surface", "To reduce brittleness and relieve internal stress while retaining most of the hardness gained from quenching"],
        a: 3, xp: 25,
        exp: "<ruby>焼き戻し<rt>やきもどし</rt></ruby> (Yakimodoshi, tempering) reheats a quenched part to a lower, controlled temperature, which relieves internal stresses and reduces brittleness while sacrificing only a modest amount of the hardness achieved during quenching. 🇯🇵 TIP: Skipping tempering after quenching is a common cause of parts cracking unexpectedly in service, even though they tested 'hard enough' right after the quench."
      },
      {
        id: 6113, cat: "Heat Treatment",
        q: "What does 'Yakinamashi (焼きなまし)', annealing, do to a metal part?",
        opts: ["Heats and slowly cools the metal to soften it, relieve internal stress, and improve machinability", "Rapidly cools the metal to maximize hardness", "Coats the surface in a hard ceramic layer", "Permanently magnetizes the part"],
        a: 0, xp: 20,
        exp: "<ruby>焼きなまし<rt>やきなまし</rt></ruby> (Yakinamashi, annealing) heats metal to a specific temperature and then cools it slowly, typically in the furnace or in still air, softening the material, relieving stresses from prior cold-working, and making it easier to machine or form. 🇯🇵 TIP: Stock that has been heavily cold-worked or welded is often annealed before final machining so it doesn't warp as internal stresses release during cutting."
      },
      {
        id: 6114, cat: "Heat Treatment",
        q: "What is 'Shintan (浸炭)', case hardening/carburizing, designed to achieve?",
        opts: ["Uniform hardness all the way through the entire part", "A hard, wear-resistant outer surface while keeping a tough, ductile core underneath", "Removal of carbon from the part's surface", "A mirror-polished cosmetic finish only"],
        a: 1, xp: 25,
        exp: "<ruby>浸炭<rt>しんたん</rt></ruby> (Shintan, carburizing/case hardening) diffuses extra carbon into the surface layer of low-carbon steel at high temperature, then quenches it so the outer 'case' becomes very hard and wear-resistant while the core remains tougher and less brittle. 🇯🇵 TIP: Gears and shafts that need both surface wear resistance and impact toughness, like transmission gears, are classic carburizing applications."
      },
      {
        id: 6115, cat: "Materials",
        q: "What does the grade name 'SUS304' generally indicate about a material?",
        opts: ["A type of cast iron used only for engine blocks", "A grade of aluminum alloy used in aerospace", "An austenitic stainless steel widely used for general corrosion resistance", "A low-carbon mild steel with no corrosion resistance"],
        a: 2, xp: 20,
        exp: "SUS304 is a JIS-designated austenitic stainless steel (roughly equivalent to AISI 304), prized for good general corrosion resistance, formability, and weldability, making it one of the most common stainless grades in food equipment, fittings, and general fabrication. 🇯🇵 TIP: SUS304 work-hardens noticeably during machining, so cutting tools and feeds suited for mild steel often need adjustment to avoid rapid tool wear."
      },
      {
        id: 6116, cat: "Cutting Fluid",
        q: "Why might a machinist choose a water-soluble cutting fluid over straight cutting oil for a high-speed steel-cutting operation?",
        opts: ["Straight oil and water-soluble fluid always perform identically", "Water-soluble fluid is only used for plastic machining", "Straight oil is always required by JIS regardless of operation", "Water-soluble fluids generally cool better at high speed, while straight oils lubricate better at lower speed, heavy-duty cuts"],
        a: 3, xp: 20,
        exp: "Water-soluble (emulsion/synthetic) cutting fluids carry heat away efficiently due to water's high heat capacity, making them well suited to higher-speed operations where heat is the main concern, while straight cutting oils provide stronger lubrication for slower, heavy-duty, or low-speed cuts where friction and tool wear dominate. 🇯🇵 TIP: Mixing ratios for water-soluble coolant matter a lot — too weak invites rust and poor lubrication, too strong can cause skin irritation and residue buildup."
      },
      {
        id: 6117, cat: "Blueprint Reading",
        q: "What is the purpose of a 'Danmenzu (断面図)', sectional view, on a drawing?",
        opts: ["To reveal internal features that would otherwise be hidden, by showing the part as if cut along a plane", "To show the part rotated 360 degrees as an animation", "To indicate the part's surface roughness only", "To list the bill of materials for an assembly"],
        a: 0, xp: 20,
        exp: "A <ruby>断面図<rt>だんめんず</rt></ruby> (Danmenzu, sectional view) imagines the part sliced along a defined cutting plane, exposing internal features like holes, ribs, or wall thickness that would be invisible or confusing in a normal exterior view. 🇯🇵 TIP: Always check the cutting-plane line and arrow direction in the original view — it tells you exactly where the 'slice' was taken from and which way you're looking."
      },
      {
        id: 6118, cat: "Quality Control",
        q: "In statistical process control (SPC), what does a low 'Koutei Nouryoku (工程能力)', process capability, value generally indicate?",
        opts: ["The process is producing parts perfectly every single time", "The process variation is wide relative to the tolerance, so more parts risk falling outside specification", "The measuring instrument needs recalibration only, with no process issue", "The tolerance band on the drawing is too wide"],
        a: 1, xp: 25,
        exp: "<ruby>工程能力<rt>こうていのうりょく</rt></ruby> (Koutei Nouryoku, process capability), often expressed as Cp or Cpk, compares the spread of a process's natural variation to the width of the specification tolerance; a low value means the process variation is large relative to that tolerance, raising the risk of out-of-spec parts even without an obvious single defect cause. 🇯🇵 TIP: Improving a low Cpk usually means reducing variation in the process itself (tooling, fixturing, machine condition), not just tightening inspection after the fact."
      },
      {
        id: 6119, cat: "Tooling",
        q: "What is the main purpose of a 'Jigu (治具)', jig, in a machining setup?",
        opts: ["To replace the need for a chuck on every machine", "To automatically sharpen cutting tools", "To hold and/or guide a tool or workpiece consistently, improving accuracy and repeatability across multiple parts", "To measure final part hardness after machining"],
        a: 2, xp: 20,
        exp: "A <ruby>治具<rt>じぐ</rt></ruby> (Jigu, jig) holds a workpiece in a fixed, repeatable position and often also guides the cutting tool (such as a drill jig with bushings), dramatically improving consistency and speed when many identical parts must be made. 🇯🇵 TIP: A 'fixture' technically only holds the part, while a true 'jig' also guides the tool — but in everyday shop talk the two terms are frequently used interchangeably."
      },
      {
        id: 6120, cat: "Surface Finish",
        q: "If a drawing specifies Ra 0.4 on a critical bearing surface versus Ra 6.3 on a non-critical cast surface, what does this difference primarily reflect?",
        opts: ["Ra values have no real effect on part function, only appearance", "Both values actually call for the identical surface condition", "Ra 6.3 always indicates a tighter requirement than Ra 0.4", "The bearing surface requires a much smoother, finer finish than the rough cast surface"],
        a: 3, xp: 25,
        exp: "A smaller Ra number means a smoother surface; Ra 0.4 demands a fine, almost polish-like finish appropriate for a precision bearing surface, while Ra 6.3 allows a much rougher texture acceptable on a non-critical, as-cast or rough-machined area. 🇯🇵 TIP: Chasing an unnecessarily fine Ra value on a non-critical surface wastes machining time and cost — match your finishing effort to the functional requirement on the drawing."
      }
    ]
  },
  {
    examId: 3,
    label: "安全衛生・特定技能",
    subtitle: "Safety & Tokutei Ginou",
    color: "#22c55e",
    icon: "🛡️",
    examiner: "安全管理官 (Anzen Kanrikan)",
    questions: [
      {
        id: 6201, cat: "Tokutei Ginou Basics",
        q: "What is the 'Tokutei Ginou (特定技能)', Specific Skilled Worker, visa status primarily designed for?",
        opts: ["Foreign workers with a certain level of skill and Japanese ability working directly in designated labor-shortage industries", "Tourists visiting Japan for short stays", "Foreign students enrolled full-time at a Japanese university", "Foreign executives transferring within their own company's overseas branch"],
        a: 0, xp: 20,
        exp: "<ruby>特定技能<rt>とくていぎのう</rt></ruby> (Tokutei Ginou, Specific Skilled Worker) is a visa category created to bring foreign workers with verified skill and Japanese language ability directly into specific industries facing labor shortages, such as manufacturing, construction, and caregiving. 🇯🇵 TIP: Unlike a tourist or student visa, Tokutei Ginou explicitly authorizes full-time paid work in the designated field from the start."
      },
      {
        id: 6202, cat: "Tokutei Ginou Basics",
        q: "How does 'Tokutei Ginou (特定技能)' generally differ from 'Ginou Jisshu (技能実習)', the Technical Intern Training program?",
        opts: ["They are exactly the same visa with two different names", "Tokutei Ginou is primarily an employment status for skilled work, while Ginou Jisshu is framed around training and technology transfer", "Ginou Jisshu allows changing employers freely, while Tokutei Ginou never does", "Tokutei Ginou is only available to university graduates"],
        a: 1, xp: 25,
        exp: "<ruby>技能実習<rt>ぎのうじっしゅう</rt></ruby> (Ginou Jisshu, Technical Intern Training) is officially framed as international skills transfer and training, while <ruby>特定技能<rt>とくていぎのう</rt></ruby> (Tokutei Ginou) is an employment-focused status for workers who have already demonstrated a defined skill level. In practice, many workers move from Ginou Jisshu into Tokutei Ginou after completing their training and passing required exams. 🇯🇵 TIP: Job-change flexibility differs between the two statuses, so always confirm your specific visa's actual rules with your employer or a qualified advisor rather than assuming."
      },
      {
        id: 6203, cat: "Tokutei Ginou Basics",
        q: "Besides a skills test in your field, what other type of test is generally also required to qualify for Tokutei Ginou (特定技能)?",
        opts: ["A physical fitness exam with no language component", "A driving test for a Japanese license", "A Japanese language proficiency test (such as the JFT-Basic or JLPT)", "A separate exam on Japanese history and literature"],
        a: 2, xp: 20,
        exp: "Most Tokutei Ginou (特定技能) routes require passing both a field-specific skills test and a Japanese language proficiency check, such as the JFT-Basic or an equivalent JLPT level, to confirm the worker can communicate adequately on the job and in daily life. 🇯🇵 TIP: Workers who completed Ginou Jisshu (技能実習) satisfactorily are often exempted from retaking these tests when transitioning to Tokutei Ginou."
      },
      {
        id: 6204, cat: "Labor Law",
        q: "Under Japan's 'Roudou Kijun Hou (労働基準法)', Labor Standards Act, what is the standard maximum working time before overtime rules apply?",
        opts: ["10 hours per day with no weekly limit", "12 hours per day, 6 days per week", "There is no legal limit at all", "8 hours per day and 40 hours per week"],
        a: 3, xp: 20,
        exp: "<ruby>労働基準法<rt>ろうどうきじゅんほう</rt></ruby> (Roudou Kijun Hou, Labor Standards Act) sets the standard working hours at 8 hours per day and 40 hours per week; work beyond this generally requires overtime agreements and overtime pay premiums. 🇯🇵 TIP: This law applies to foreign workers exactly the same as Japanese employees — know your rights regarding overtime pay and rest breaks."
      },
      {
        id: 6205, cat: "Labor Law",
        q: "What does Japan's 'Saitei Chingin Hou (最低賃金法)', Minimum Wage Act, guarantee to workers?",
        opts: ["A legally mandated minimum hourly wage that varies by region and industry", "A fixed national salary identical in every prefecture", "Free housing provided by every employer", "Automatic yearly raises regardless of performance"],
        a: 0, xp: 20,
        exp: "<ruby>最低賃金法<rt>さいていちんぎんほう</rt></ruby> (Saitei Chingin Hou, Minimum Wage Act) sets a legally required minimum hourly wage that differs by prefecture and sometimes by industry; paying below this rate is illegal, including for foreign workers under any visa status. 🇯🇵 TIP: Always check the current minimum wage for your specific prefecture, since it's reviewed and adjusted annually and varies significantly between regions."
      },
      {
        id: 6206, cat: "Tokutei Ginou Basics",
        q: "Under Tokutei Ginou Type 1 (特定技能1号), can a worker generally change employers within the same designated industry field?",
        opts: ["No, changing employers is completely forbidden under any circumstance", "Yes, changing employers within the same field is generally permitted, unlike the older Ginou Jisshu framework", "Only if they switch to a completely unrelated industry", "Only after first returning to their home country permanently"],
        a: 1, xp: 25,
        exp: "One key design feature of <ruby>特定技能<rt>とくていぎのう</rt></ruby> 1号 (Tokutei Ginou Type 1) is that workers can generally change employers within the same designated field, offering more flexibility than the older Ginou Jisshu (技能実習) structure, which was much more restrictive about transfers. 🇯🇵 TIP: Even with this flexibility, proper visa and paperwork procedures must still be followed when changing employers — it isn't automatic or paperwork-free."
      },
      {
        id: 6207, cat: "Risk Prevention",
        q: "What is the purpose of 'Kiken Yochi Katsudou (危険予知活動)', KY activity / risk prediction activity, done before starting work?",
        opts: ["A formal investigation conducted only after an accident has already happened", "A once-a-year company safety lecture", "A short team discussion to identify potential hazards in the day's task and plan how to avoid them", "A test given only to new hires, never repeated"],
        a: 2, xp: 20,
        exp: "<ruby>危険予知活動<rt>きけんよちかつどう</rt></ruby> (Kiken Yochi Katsudou, KY activity) is a brief, proactive team discussion held before starting work, where everyone identifies what could go wrong with the day's specific task and agrees on countermeasures in advance. 🇯🇵 TIP: KY activity is meant to be quick and routine, often done as a standing huddle each morning — treat it as a real safety tool, not just a formality to rush through."
      },
      {
        id: 6208, cat: "Chemical Safety",
        q: "What information does an 'Anzen Deeta Shiito (安全データシート)', SDS (Safety Data Sheet), provide for a chemical product?",
        opts: ["Only the purchase price and supplier contact information", "The exact machining parameters for cutting fluid", "A list of unrelated company holiday schedules", "Hazards, safe handling instructions, storage requirements, and emergency response measures for that chemical"],
        a: 3, xp: 20,
        exp: "An <ruby>安全データシート<rt>あんぜんデータシート</rt></ruby> (Anzen Deeta Shiito, SDS) details a chemical's hazards, required PPE, safe handling and storage procedures, and what to do in case of spills, fire, or exposure. 🇯🇵 TIP: SDS sheets for chemicals you handle, such as cutting fluids or solvents, should be readily accessible in the workplace, not locked away in an office file."
      },
      {
        id: 6209, cat: "Fire Safety",
        q: "Why is it important to know the different types of 'Shoukaki (消火器)', fire extinguishers, available in your workplace?",
        opts: ["Different extinguisher types are designed for different fire classes, and using the wrong type can be ineffective or dangerous", "All fire extinguishers work identically on every type of fire", "Fire extinguishers are only decorative and rarely actually usable", "Only trained firefighters are ever permitted to touch any extinguisher"],
        a: 0, xp: 20,
        exp: "<ruby>消火器<rt>しょうかき</rt></ruby> (Shoukaki, fire extinguishers) come in types suited to different fire classes — for example, using water on an electrical or oil fire can make things worse, while a CO2 or powder extinguisher may be appropriate instead. 🇯🇵 TIP: Learn the location and type of the nearest extinguisher to your workstation during orientation, before you ever need it in an emergency."
      },
      {
        id: 6210, cat: "First Aid",
        q: "What is the generally recommended first step after witnessing a coworker's injury at the worksite?",
        opts: ["Immediately move the injured person regardless of the injury type", "Ensure the immediate area is safe, then call for help and provide basic first aid within your training level", "Wait silently for someone else to notice and react first", "Continue working and report it only at the end of the shift"],
        a: 1, xp: 20,
        exp: "<ruby>応急処置<rt>おうきゅうしょち</rt></ruby> (Oukyuu Shochi, first aid) response should start by checking that the surrounding area is safe for both you and the victim, then promptly calling for trained help while providing only the basic first aid appropriate to your training — moving an injured person carelessly can worsen certain injuries, like suspected spinal trauma. 🇯🇵 TIP: Know your factory's emergency contact procedure and the location of the nearest first aid kit and AED before an emergency happens, not during one."
      },
      {
        id: 6211, cat: "Accident Reporting",
        q: "What is 'Rousai (労災)', short for Roudou Saigai (労働災害), workplace accident/injury?",
        opts: ["A type of annual bonus payment", "A voluntary overtime work arrangement", "A work-related injury, illness, or accident that is generally covered by workers' compensation insurance", "A penalty fee charged to workers for safety violations"],
        a: 2, xp: 20,
        exp: "<ruby>労災<rt>ろうさい</rt></ruby> (Rousai), short for <ruby>労働災害<rt>ろうどうさいがい</rt></ruby> (Roudou Saigai, workplace accident), refers to injuries or illnesses arising from work, which are generally covered under Japan's workers' compensation insurance system regardless of the worker's nationality or visa status. 🇯🇵 TIP: Always report even minor workplace injuries promptly through the proper channel — delayed reporting can complicate insurance claims later."
      },
      {
        id: 6212, cat: "Workplace Organization",
        q: "What do the principles behind '5S (整理・整頓・清掃・清潔・しつけ)' aim to improve in a workshop?",
        opts: ["Only the visual appearance of the shop for customer tours", "The legal minimum wage calculation", "The company's annual tax filing process", "Organization, cleanliness, and standardized habits that reduce hazards and improve efficiency"],
        a: 3, xp: 20,
        exp: "5S, covering <ruby>整理<rt>せいり</rt></ruby> (sort), <ruby>整頓<rt>せいとん</rt></ruby> (set in order), <ruby>清掃<rt>せいそう</rt></ruby> (shine), <ruby>清潔<rt>せいけつ</rt></ruby> (standardize), and しつけ (sustain), is a workplace organization system aimed at reducing clutter and hazards, making tools easy to find, and building consistent habits that improve both safety and productivity. 🇯🇵 TIP: A genuinely well-run 5S floor makes hazards like spilled coolant or blocked walkways immediately obvious, because anything out of place stands out."
      },
      {
        id: 6213, cat: "Noise & Hearing",
        q: "Why are 'Bouon Hogo Guzu (防音保護具)', hearing protection devices, important in a loud machining shop?",
        opts: ["Prolonged exposure to high noise levels can cause permanent hearing damage over time", "Loud noise only causes temporary headaches with no lasting effect", "Hearing protection is purely a comfort item with no real health benefit", "Only office workers are ever at risk from workshop noise"],
        a: 0, xp: 20,
        exp: "<ruby>防音保護具<rt>ぼうおんほごぐ</rt></ruby> (Bouon Hogo Guzu, hearing protection equipment) such as earplugs or earmuffs reduce exposure to harmful noise levels; repeated exposure to loud machinery over months or years can cause gradual, permanent hearing loss that often isn't noticed until it's already significant. 🇯🇵 TIP: If you have to raise your voice to be heard by someone an arm's length away, that area's noise level likely calls for hearing protection."
      },
      {
        id: 6214, cat: "Chemical Safety",
        q: "What precaution is especially important when handling 'Yuuki Youzai (有機溶剤)', organic solvents, such as degreasers or thinners?",
        opts: ["No precautions are needed since organic solvents are completely harmless", "Use proper ventilation and PPE, since vapors can be toxic, flammable, or cause long-term health effects with repeated exposure", "Only eye protection is required; skin and lung exposure don't matter", "Organic solvents may be safely mixed together without checking compatibility"],
        a: 1, xp: 25,
        exp: "<ruby>有機溶剤<rt>ゆうきようざい</rt></ruby> (Yuuki Youzai, organic solvents) often produce vapors that are flammable and can be harmful to the nervous system or other organs with repeated exposure, so proper ventilation, suitable gloves, and respiratory protection where specified are essential, and mixing unknown chemicals can create unexpected hazardous reactions. 🇯🇵 TIP: Workers regularly handling certain organic solvents in Japan may legally require specific special education (特別教育) or a qualified operator license, similar to other hazardous-equipment training."
      },
      {
        id: 6215, cat: "Heat Illness",
        q: "What is 'Necchuushou (熱中症)', heat stroke/heat illness, a serious risk for in summer factory work?",
        opts: ["A minor skin irritation with no other symptoms", "An allergic reaction limited to outdoor workers only", "Dangerous overheating and dehydration of the body, which can be fatal if not treated quickly", "A condition that only affects machines, not people"],
        a: 2, xp: 20,
        exp: "<ruby>熱中症<rt>ねっちゅうしょう</rt></ruby> (Necchuushou, heat illness/heat stroke) occurs when the body can't regulate its temperature in hot, often humid conditions, leading to symptoms ranging from cramps and dizziness to life-threatening organ failure if untreated. 🇯🇵 TIP: Regular hydration breaks, monitoring for early symptoms like dizziness or confusion in coworkers, and adjusting work pace on extremely hot days are standard summer safety practices in Japanese workshops."
      },
      {
        id: 6216, cat: "Machine Safety",
        q: "What is the purpose of an 'Hijou Teishi Botan (非常停止ボタン)', emergency stop button, on a machine?",
        opts: ["To pause the machine for a scheduled lunch break only", "To adjust the machine's cutting speed gradually", "To restart the machine automatically after a power outage", "To immediately halt all hazardous motion the instant a dangerous situation is detected"],
        a: 3, xp: 20,
        exp: "An <ruby>非常停止ボタン<rt>ひじょうていしボタン</rt></ruby> (Hijou Teishi Botan, emergency stop button) is designed to cut power to hazardous motion instantly when pressed, intended for genuine emergencies where any delay could cause injury. 🇯🇵 TIP: Know the exact location of every emergency stop near your workstation before you start a shift, not after something goes wrong."
      },
      {
        id: 6217, cat: "Machine Safety",
        q: "What is the core idea behind a 'lockout/tagout' style procedure when servicing a machine?",
        opts: ["Physically isolate the machine's energy source and clearly tag it so it cannot be accidentally re-energized while someone is working on it", "Simply turning off the main room lights before maintenance", "Posting a sign only, with the machine left fully powered and ready to run", "Allowing only the newest employee to perform the lockout"],
        a: 0, xp: 25,
        exp: "A lockout/tagout style procedure physically isolates and locks a machine's energy source (electrical, hydraulic, pneumatic, etc.) and attaches a clear tag identifying who is working on it, preventing the machine from being unexpectedly started or energized while maintenance is in progress. 🇯🇵 TIP: Never remove someone else's lockout tag or lock, even if the machine 'looks finished' — only the person who applied it should remove it after confirming the work is truly complete."
      },
      {
        id: 6218, cat: "Personal Protective Equipment",
        q: "When selecting 'Hogo-gu (保護具)', personal protective equipment, for a specific task, what should primarily guide your choice?",
        opts: ["Whichever equipment looks the newest in the supply locker", "The specific hazards present in that task, such as flying debris, chemicals, noise, or heavy loads", "Cost alone, regardless of the actual hazard", "Personal preference for color or style only"],
        a: 1, xp: 20,
        exp: "<ruby>保護具<rt>ほごぐ</rt></ruby> (Hogo-gu, PPE) selection should match the actual hazards of the task at hand — for example, cut-resistant gloves for sharp metal handling, a respirator for solvent fumes, or hearing protection in loud areas — rather than wearing generic gear that may not address the real risk. 🇯🇵 TIP: Wearing the wrong PPE, such as loose gloves near a rotating chuck, can sometimes create a new hazard instead of preventing one — always think through fit and task compatibility."
      },
      {
        id: 6219, cat: "Near-Miss Reporting",
        q: "What is the value of reporting a 'Hiyari Hatto (ヒヤリハット)', near-miss incident, even when no one was actually injured?",
        opts: ["Near-misses have no practical value since nothing bad actually happened", "Only incidents resulting in injury are ever worth discussing", "It identifies a hazard before it causes a real injury, allowing preventive action to be taken", "Reporting near-misses is solely for punishing the worker involved"],
        a: 2, xp: 20,
        exp: "A <ruby>ヒヤリハット<rt>ヒヤリハット</rt></ruby> (Hiyari Hatto, near-miss) report captures a situation that almost caused harm, giving the workplace a chance to fix the underlying hazard before it actually injures someone. Japanese safety culture treats near-miss reporting as proactive and valuable, not as an admission of fault to be hidden. 🇯🇵 TIP: Reporting your own near-miss honestly is generally viewed positively in Japanese workplaces — it helps protect the next person, including yourself."
      },
      {
        id: 6220, cat: "Tokutei Ginou Basics",
        q: "What is generally required to renew or maintain valid Tokutei Ginou (特定技能) residence status over time?",
        opts: ["No action is ever needed once the visa is first issued", "Only a one-time renewal fee with no further requirements", "Switching employers every year is mandatory by law", "Continuing to meet the conditions of the status, such as employment in the designated field and timely renewal procedures with immigration authorities"],
        a: 3, xp: 20,
        exp: "Maintaining valid <ruby>特定技能<rt>とくていぎのう</rt></ruby> (Tokutei Ginou) status generally requires continuing to satisfy the conditions tied to that status, such as remaining employed in the designated field, and completing renewal procedures with immigration authorities before the current period of stay expires. 🇯🇵 TIP: Always track your visa expiration date well in advance and confirm renewal requirements with your employer or an immigration specialist — letting status lapse can create serious legal problems."
      }
    ]
  },
  {
    examId: 4, label: "CAD技能検定", subtitle: "CAD Proficiency Certification",
    color: "#9932CC", icon: "🖥️", examiner: "図面審査官 (Zuumen Shinsakan)",
    questions: [
      {
        id: 7001, cat: "JIS Drawing Standards",
        q: "What is the primary purpose of 'JIS B 0001 (JIS B 0001)', the Japanese Industrial Standard for engineering drawings?",
        opts: ["To set minimum wages for CAD operators in Japan", "To standardize rules for engineering drawing creation so drawings are universally readable across Japan", "To define the maximum file size for CAD software", "To certify individual CAD operators as nationally licensed professionals"],
        a: 1, xp: 15,
        exp: "<ruby>JIS B 0001<rt>ジェイアイエスビーれいれいれいいち</rt></ruby> establishes rules for creating engineering drawings — line types, dimensioning, symbols, views — so that any trained person reading the drawing gets the same information regardless of which company or software created it. 🇯🇵 TIP: JIS stands for <ruby>日本産業規格<rt>にほんさんぎょうきかく</rt></ruby> (Nihon Sangyo Kikaku), Japan Industrial Standards."
      },
      {
        id: 7002, cat: "CAD Layers",
        q: "In CAD drawings, why are 'layers (レイヤー)' used to organize different types of drawing information?",
        opts: ["To make the file size larger so it is easier to share", "To randomly assign colors to different lines for visual variety", "To separate different types of information (dimensions, centerlines, hidden lines) so each can be controlled, displayed, or printed independently", "Layers are only used in 3D modeling, never in 2D drafting"],
        a: 2, xp: 15,
        exp: "<ruby>レイヤー<rt>れいやー</rt></ruby> (Layer) organization in CAD allows, for example, dimensions to be on one layer that can be hidden during review, while visible outlines remain on another. This makes drawings easier to manage, modify, and control when printing. 🇯🇵 TIP: A common JIS-compliant layer scheme separates outlines, hidden lines, centerlines, dimensions, and annotation into distinct layers."
      },
      {
        id: 7003, cat: "Projection Method",
        q: "In 'Daisan-kakuhou (第三角法)', third-angle projection used in Japanese JIS drawings, where is the right-side view placed relative to the front view?",
        opts: ["Directly below the front view", "To the left of the front view", "Directly above the front view", "To the right of the front view"],
        a: 3, xp: 15,
        exp: "In <ruby>第三角法<rt>だいさんかくほう</rt></ruby> (Daisan-kakuhou, third-angle projection), the view is placed on the side from which it was seen — so the right-side view goes to the right of the front view. Japan uses third-angle projection per JIS B 0001. 🇯🇵 TIP: The ISO/European first-angle projection places views on the opposite side — always check the drawing symbol in the title block to confirm which method is used."
      },
      {
        id: 7004, cat: "Line Types",
        q: "On a JIS engineering drawing, what does a 'kakusen (破線)', dashed line, represent?",
        opts: ["A visible edge of the part that is clearly seen from the viewing direction", "A centerline showing the axis of a circular feature", "A hidden edge or surface that cannot be seen from the current viewing direction", "A phantom line showing an alternate position of a moving part"],
        a: 2, xp: 15,
        exp: "<ruby>破線<rt>はせん</rt></ruby> (Kakusen, dashed/hidden line) represents edges or surfaces that exist inside or behind the visible surface — you know they are there but cannot see them from that viewpoint. Distinguishing visible from hidden lines is fundamental to reading multi-view drawings. 🇯🇵 TIP: Overusing hidden lines in complex drawings can make them very hard to read; section views are often a cleaner alternative for showing internal features."
      },
      {
        id: 7005, cat: "Dimensioning",
        q: "What is the key advantage of 'baseline dimensioning (基点寸法記入法)' over chain dimensioning for manufactured parts?",
        opts: ["It requires fewer dimension lines, making the drawing look cleaner", "It is only used for circular holes and never for flat surfaces", "All measurements originate from a single reference point, so tolerances do not accumulate (stack up) from feature to feature", "It automatically adjusts tolerances based on the material used"],
        a: 2, xp: 15,
        exp: "<ruby>基点寸法記入法<rt>きてんすんぽうきにゅうほう</rt></ruby> (Kiten Sunpou Kirnyuuhou, baseline/datum dimensioning) measures each feature from a single datum. In chain dimensioning, each tolerance adds to the next, potentially causing large cumulative error at the last feature. Baseline dimensioning avoids this tolerance stack-up. 🇯🇵 TIP: For precision assemblies, baseline dimensioning combined with GD&T datums gives the tightest control over functional requirements."
      },
      {
        id: 7006, cat: "Section Views",
        q: "What is the purpose of a 'danmen-zu (断面図)', section view, in an engineering drawing?",
        opts: ["To show only the external outline of a part for quick identification", "To imaginary cut the part along a cutting plane to reveal internal features that would otherwise be hidden", "To display the part from an isometric 3D perspective", "To indicate the part's material composition using color coding"],
        a: 1, xp: 15,
        exp: "<ruby>断面図<rt>だんめんず</rt></ruby> (Danmen-zu, section view) is created by imagining a cutting plane slicing through the part, then showing the internal cross-section as if the front portion were removed. Interior features that would require many hidden lines in a standard view become clearly visible. 🇯🇵 TIP: The cut surface is indicated by section lines (hatch lines at 45°), and the cutting-plane line in the other view shows exactly where the cut was made."
      },
      {
        id: 7007, cat: "GD&T Datums",
        q: "In 'kikagaku koucha (幾何公差)', geometric dimensioning and tolerancing, what is a 'datum (データム)'?",
        opts: ["A type of tolerance symbol used only for surface finish", "A theoretically exact reference point, axis, or plane from which geometric measurements are made", "The maximum allowable deviation for a dimension, expressed in millimeters", "A CAD file format used for sharing drawings between different software packages"],
        a: 1, xp: 15,
        exp: "A <ruby>データム<rt>でーたむ</rt></ruby> (Datum) in GD&T is a theoretically perfect reference — a flat surface (plane), a bore axis, or a center point — from which all geometric tolerances on that part are measured. Real part surfaces are imperfect, so we simulate datums by contacting them with precision tooling or a CMM. 🇯🇵 TIP: Datums are labeled with capital letters (A, B, C) in a square frame and referenced in feature control frames to establish measurement direction and order of precedence."
      },
      {
        id: 7008, cat: "GD&T Symbols",
        q: "In a GD&T feature control frame, what does the symbol '⌀' (circle with a diagonal line) indicate when it appears before a tolerance value?",
        opts: ["That the tolerance applies to a flat surface only", "That the tolerance zone is a sphere", "That the tolerance zone is cylindrical (a diametral zone) rather than a linear width zone", "That the feature must be measured at room temperature only"],
        a: 2, xp: 15,
        exp: "The ⌀ symbol in a feature control frame means the tolerance zone is a <ruby>円筒形<rt>えんとうけい</rt></ruby> (Entou-kei, cylindrical) zone with that diameter, not two parallel planes. For a position tolerance on a hole axis, ⌀0.05 means the axis must fall within a cylinder 0.05mm in diameter — not within ±0.025mm in two separate directions. 🇯🇵 TIP: Cylindrical tolerance zones are larger than equivalent bilateral zones, giving manufacturers slightly more usable tolerance while still controlling function."
      },
      {
        id: 7009, cat: "Parametric Modeling",
        q: "What does 'parametric modeling (パラメトリックモデリング)' in 3D CAD allow a designer to do that traditional drawing methods do not?",
        opts: ["Create drawings by hand-sketching and scanning them into the computer", "Change a design dimension and have the 3D model and related drawings update automatically throughout", "Only view parts from a single fixed angle without rotation", "Convert raster images directly into machined parts without further design work"],
        a: 1, xp: 15,
        exp: "<ruby>パラメトリックモデリング<rt>ぱらめとりっくもでりんぐ</rt></ruby> (Parametric Modeling) links dimensions, features, and constraints so that changing one parameter — say, a hole diameter — cascades through the model and all associated drawings automatically. This dramatically reduces rework when design changes occur. 🇯🇵 TIP: The parametric relationships are stored as a history tree (feature tree); deleting a base feature can break downstream features, so understanding the modeling sequence is important."
      },
      {
        id: 7010, cat: "Assembly Drawings",
        q: "What is the main purpose of a 'sou-kumitate-zu (総組立図)', assembly drawing, compared to an individual 'buhin-zu (部品図)', part drawing?",
        opts: ["An assembly drawing shows all the internal dimensions of every single component in detail", "An assembly drawing shows how multiple parts fit together and their relative positions, while part drawings provide detailed dimensions of individual components", "Assembly drawings are only used for artistic presentation and have no manufacturing function", "An assembly drawing replaces the need for individual part drawings by combining all details into one sheet"],
        a: 1, xp: 15,
        exp: "<ruby>総組立図<rt>そうくみたてず</rt></ruby> (Sou-kumitate-zu, assembly drawing) communicates how parts are assembled — which hole aligns with which pin, what is the fit relationship, which direction a bearing is pressed — while individual <ruby>部品図<rt>ぶひんず</rt></ruby> (Buhin-zu) provide the dimensions needed to actually manufacture each part. 🇯🇵 TIP: Assembly drawings often use part numbers (品番) that link to a parts list (部品表, BOM) identifying quantity, material, and part name."
      },
      {
        id: 7011, cat: "Line Types",
        q: "What is the correct JIS line type for a 'chuu-shin-sen (中心線)', centerline indicating the axis of a cylindrical feature or hole?",
        opts: ["A thick solid line, same as visible outlines", "A thin dashed line, same as hidden edges", "A thin chain line (alternating long and short dashes)", "A thick wavy line indicating a break in the drawing"],
        a: 2, xp: 15,
        exp: "<ruby>中心線<rt>ちゅうしんせん</rt></ruby> (Chuu-shin-sen, centerline) is a thin chain line — alternating long dash, short dash — per JIS B 0001. It passes through the center of holes, cylinders, and symmetric features to show the axis without being confused with a visible edge or a hidden line. 🇯🇵 TIP: Centerlines should extend slightly beyond the feature outline on both sides, and crossing centerlines at hole centers should cross at the short dashes, not the spaces."
      },
      {
        id: 7012, cat: "Drawing Scale",
        q: "A drawing is labeled 'scale 2:1'. What does this mean?",
        opts: ["The part is drawn at actual size", "The drawing is twice as large as the real part — the drawn object is enlarged", "The part is half the size shown in the drawing", "The drawing shows only half of the part, with the other half implied by symmetry"],
        a: 1, xp: 15,
        exp: "Scale 2:1 means 2 drawing units equal 1 real unit — the drawing is drawn twice the actual size (enlarged). This is used for very small parts to improve readability. Conversely, 1:2 means the drawing is half actual size (reduced). 🇯🇵 TIP: Always dimension to the actual part size regardless of drawing scale — the numbers represent the real part, not the drawing measurement."
      },
      {
        id: 7013, cat: "GD&T Tolerances",
        q: "The GD&T symbol for 'heimen-do (平面度)', flatness, appears in a feature control frame. What does this tolerance control?",
        opts: ["The parallelism of a surface relative to a datum plane", "The deviation of a surface from a theoretically perfect flat plane — it controls how much the surface can vary from perfectly flat", "The perpendicularity of a surface to a datum axis", "The position of a surface relative to other features on the part"],
        a: 1, xp: 15,
        exp: "<ruby>平面度<rt>へいめんど</rt></ruby> (Heimen-do, Flatness) in GD&T controls how much the surface deviates from a perfect theoretical plane, without reference to any datum. All points on the surface must fall within two parallel planes separated by the tolerance value. 🇯🇵 TIP: Flatness is different from parallelism — parallelism compares the surface to a datum, but flatness only looks at the surface itself. A surface can be perfectly flat but still tilted relative to a datum."
      },
      {
        id: 7014, cat: "Parts List",
        q: "What information is typically found in a 'buhin-hyou (部品表)', bill of materials or parts list, on an assembly drawing?",
        opts: ["Only the total weight of the finished assembly", "Part numbers, part names, quantity required, material specification, and sometimes finish or supplier information for each component", "Only the part numbers, with all other information kept in a separate secret document", "Only the drawing scale and title, with no component-specific information"],
        a: 1, xp: 15,
        exp: "<ruby>部品表<rt>ぶひんひょう</rt></ruby> (Buhin-hyou, BOM/Parts List) is the structured table on or associated with an assembly drawing that lists each component: its part number (<ruby>品番<rt>ひんばん</rt></ruby>), name (<ruby>品名<rt>ひんめい</rt></ruby>), quantity (<ruby>数量<rt>すうりょう</rt></ruby>), and material (<ruby>材料<rt>ざいりょう</rt></ruby>). It links the numbered balloons on the assembly view to actual component information. 🇯🇵 TIP: BOM accuracy is critical for purchasing and production — a wrong quantity or material in the BOM creates real procurement and manufacturing problems."
      },
      {
        id: 7015, cat: "Tolerance Stack-up",
        q: "In an assembly where Part A has a length tolerance of ±0.1mm and Part B has ±0.2mm, what is the worst-case total variation if they are placed end-to-end?",
        opts: ["±0.1mm, because tolerances cancel out in assemblies", "±0.2mm, only the largest single tolerance matters", "±0.3mm, because worst-case stack-up adds the maximum variations directly", "±0.05mm, because tolerances always average out in practice"],
        a: 2, xp: 15,
        exp: "Worst-case <ruby>公差積み重ね<rt>こうさつみかさね</rt></ruby> (Kousa Tsumikasane, tolerance stack-up) adds the maximum individual tolerances: ±0.1 + ±0.2 = ±0.3mm total variation. This means the assembly could be 0.3mm shorter or longer than nominal in the worst case. 🇯🇵 TIP: Statistical tolerance analysis (RSS method) gives a more realistic (less conservative) estimate when many parts are involved, but worst-case is safest for critical assemblies."
      },
      {
        id: 7016, cat: "GD&T Tolerances",
        q: "What does the GD&T symbol for 'chokakudo (直角度)', perpendicularity, control?",
        opts: ["How flat a surface is compared to a theoretical perfect plane", "How round a circular feature is in a 2D cross-section", "The angular deviation of a surface or axis from 90 degrees relative to a datum", "The location of a feature's center relative to its true position"],
        a: 2, xp: 15,
        exp: "<ruby>直角度<rt>ちょっかくど</rt></ruby> (Chokakudo, Perpendicularity) is an orientation GD&T tolerance that controls how much a surface or axis deviates from being exactly 90° to a specified datum. The tolerance zone is two parallel planes (or a cylinder for an axis) perpendicular to the datum within which the controlled feature must fall. 🇯🇵 TIP: Perpendicularity always requires a datum reference — unlike flatness, which is self-referential. A tall bore in a plate needs perpendicularity to ensure it does not tilt and cause misalignment in assembly."
      },
      {
        id: 7017, cat: "3D CAD Features",
        q: "In 3D parametric CAD, what does the 'extrude (押し出し)' feature do to a 2D sketch profile?",
        opts: ["It rotates the sketch around an axis to create a surface of revolution", "It projects the sketch onto another surface to create a pattern", "It pushes the sketch profile along a straight path to create a 3D solid volume", "It mirrors the sketch about a plane to create a symmetric feature"],
        a: 2, xp: 15,
        exp: "<ruby>押し出し<rt>おしだし</rt></ruby> (Oshidashi, Extrude) takes a 2D sketch and sweeps it a defined distance perpendicular to the sketch plane, creating solid material. A rectangular sketch extruded 20mm becomes a rectangular block. It is the most fundamental 3D feature operation. 🇯🇵 TIP: Many other operations — cuts, bosses, holes — are also based on extrusion logic (adding or removing material by pushing a profile through space)."
      },
      {
        id: 7018, cat: "Title Block",
        q: "Which information is standardly included in the 'hyoudai-ran (標題欄)', title block, of a JIS engineering drawing?",
        opts: ["Only the part number and nothing else", "Only the name of the CAD software used", "Part name, part number, drawing scale, material, tolerance class, revision level, and approval signatures", "The manufacturing process sequence and machine settings for production"],
        a: 2, xp: 15,
        exp: "<ruby>標題欄<rt>ひょうだいらん</rt></ruby> (Hyoudai-ran, Title Block) per JIS B 0001 typically includes: part name (<ruby>品名<rt>ひんめい</rt></ruby>), drawing number (<ruby>図番<rt>ずばん</rt></ruby>), scale, material (<ruby>材料<rt>ざいりょう</rt></ruby>), drawing revision (<ruby>改訂<rt>かいてい</rt></ruby>), projection method symbol, and approval/signature columns. 🇯🇵 TIP: The title block is the first place to look to understand a drawing — it tells you what the part is, what it is made of, how big it is relative to the drawing, and whether it is current."
      },
      {
        id: 7019, cat: "GD&T Tolerances",
        q: "A position tolerance of ⌀0.05mm is specified for a hole relative to datums A, B, and C. What does this mean for the hole's axis?",
        opts: ["The hole diameter must be within 0.05mm of the nominal diameter", "The hole surface roughness must not exceed Ra 0.05", "The axis of the hole must fall within a cylindrical zone 0.05mm in diameter located at the true (theoretically exact) position defined by the datums", "The hole must be drilled within 0.05mm of the nearest edge of the part"],
        a: 2, xp: 15,
        exp: "<ruby>位置度<rt>いちど</rt></ruby> (Ichido, Position) GD&T tolerance defines where the axis of a feature (hole, boss, slot) must be located. The ⌀0.05 means the axis must fall inside a cylinder 0.05mm in diameter centered on the theoretically exact position relative to datums A, B, C. This controls all positional error in one tolerance. 🇯🇵 TIP: Position tolerance with a cylindrical zone (⌀) gives about 57% more usable tolerance than ±0.025mm in X and Y separately, because the circular zone corner region is relaxed."
      },
      {
        id: 7020, cat: "CAD File Formats",
        q: "What are 'STEP (STEP)' and 'IGES (IGES)' file formats used for in CAD work?",
        opts: ["They are proprietary formats that can only be opened by the same brand of software that created them", "They are raster image formats for scanning hand-drawn sketches into CAD", "They are neutral/open exchange formats that allow 3D CAD model data to be transferred between different CAD software systems", "They are numerical control (NC) programs used directly to control CNC machine tools"],
        a: 2, xp: 15,
        exp: "<ruby>STEP<rt>すてっぷ</rt></ruby> (Standard for the Exchange of Product model data, ISO 10303) and <ruby>IGES<rt>あいじゅず</rt></ruby> (Initial Graphics Exchange Specification) are neutral file formats that allow 3D geometry to be shared between different CAD systems — for example, from CATIA to SolidWorks without losing the model geometry. STEP is the more modern and preferred standard. 🇯🇵 TIP: Even with STEP, complex parametric features and design intent (feature tree history) are often lost in translation — you receive the shape but not the construction history."
      }
    ]
  },
  {
    examId: 5, label: "品質管理検定 QC", subtitle: "Quality Control Certification",
    color: "#FF8C00", icon: "📊", examiner: "品質管理官 (Hinshitsu Kanrikan)",
    questions: [
      {
        id: 7101, cat: "Process Capability",
        q: "The process capability index 'Cp (工程能力指数)' is calculated as (USL - LSL) / (6σ). What does a Cp value of 1.33 or greater indicate?",
        opts: ["The process is barely capable and needs immediate attention", "The process spread is exactly equal to the specification range, with no safety margin", "The process is considered capable with an adequate safety margin, producing very few defects when centered", "The process has too much variation and is completely out of control"],
        a: 2, xp: 15,
        exp: "<ruby>工程能力指数<rt>こうていのうりょくしすう</rt></ruby> (Koutei Nouryoku Shisuu, Process Capability Index) Cp ≥ 1.33 means the process natural spread (6σ) fits within 75% of the specification width, leaving 12.5% margin on each side. This is the typical Japanese automotive and JIS target for capable processes. 🇯🇵 TIP: Cp only measures spread — it says nothing about centering. A process can have Cp = 2.0 but still produce defects if it is shifted far to one side of the specification."
      },
      {
        id: 7102, cat: "Process Capability",
        q: "What is the key difference between 'Cpk (工程能力指数Cpk)' and 'Cp (Cp)'?",
        opts: ["Cpk uses the full specification range while Cp uses only half of it", "Cpk accounts for how centered the process mean is within the specification, while Cp only measures the spread relative to the total tolerance", "Cp and Cpk are identical formulas with no practical difference", "Cpk is used only for one-sided specifications while Cp is used for two-sided specifications"],
        a: 1, xp: 15,
        exp: "<ruby>Cpk<rt>しーぴーけー</rt></ruby> = min[(USL - mean)/(3σ), (mean - LSL)/(3σ)]. It takes the smaller of the two sides, so if the mean is shifted toward one limit, Cpk drops below Cp. A process can have Cp = 1.5 (good spread) but Cpk = 0.8 (bad centering), producing many defects near one limit. 🇯🇵 TIP: Always report both Cp and Cpk together — Cp tells you the potential capability, Cpk tells you the actual performance including centering."
      },
      {
        id: 7103, cat: "Control Charts",
        q: "What is the primary purpose of a 'kanri-zu (管理図)', control chart, in statistical process control?",
        opts: ["To calculate the final average quality level for a completed production batch", "To distinguish between natural (common cause) process variation and special cause variation that signals something has changed in the process", "To set the specification limits (tolerance) for a part dimension", "To count and categorize all defects found during a final inspection"],
        a: 1, xp: 15,
        exp: "<ruby>管理図<rt>かんりず</rt></ruby> (Kanri-zu, Control Chart) was developed by Walter Shewhart and adopted deeply in Japanese manufacturing. It plots process measurements over time with control limits (UCL/LCL) set at ±3σ. Points beyond the limits or showing non-random patterns signal a special cause — something has actually changed and should be investigated. 🇯🇵 TIP: Control limits are NOT the same as specification limits. Control limits describe what the process actually does; specifications describe what the customer needs."
      },
      {
        id: 7104, cat: "Control Charts",
        q: "On an X-bar control chart, what does the 'UCL (上方管理限界)', upper control limit, represent?",
        opts: ["The maximum specification limit set by the customer drawing", "The highest value ever observed in the process history", "A statistical boundary (typically mean + 3σ) beyond which a point is unlikely to occur by chance alone, signaling a possible special cause", "The target value the process should aim for on every cycle"],
        a: 2, xp: 15,
        exp: "<ruby>上方管理限界<rt>じょうほうかんりげんかい</rt></ruby> (UCL, Upper Control Limit) is set at process mean + 3 standard deviations of the subgroup averages. Statistically, only ~0.27% of points should fall outside ±3σ by random chance. A point above UCL is a strong signal (>99% confidence) that something has changed. 🇯🇵 TIP: The famous Western Electric (and JIS) rules provide additional pattern-based signals — eight consecutive points on one side of the centerline, for example — even when no single point breaks the control limits."
      },
      {
        id: 7105, cat: "QC7 Tools",
        q: "In a 'Pareto chart (パレート図)', what principle does it visually demonstrate?",
        opts: ["That all defect types contribute equally to total quality problems", "That approximately 80% of problems come from approximately 20% of causes, helping prioritize improvement efforts", "That defects follow a normal distribution pattern across all categories", "That defect rates always increase over time without intervention"],
        a: 1, xp: 15,
        exp: "<ruby>パレート図<rt>ぱれーとず</rt></ruby> (Pareto Chart) arranges defect categories from highest to lowest frequency, with a cumulative line showing the running total percentage. The 80/20 rule (Pareto Principle) means attacking the top 2-3 categories often resolves 80% of the problem. 🇯🇵 TIP: Pareto charts are one of the QC7 tools (<ruby>QC七つ道具<rt>きゅーしーななつどうぐ</rt></ruby>). The chart focuses limited resources on where they will have the biggest impact — working on the last 20% of causes typically takes much more effort for much less return."
      },
      {
        id: 7106, cat: "QC7 Tools",
        q: "A 'fishbone diagram (特性要因図)' — also called an Ishikawa or cause-and-effect diagram — organizes potential causes of a problem into what typical main categories?",
        opts: ["Plan, Do, Check, Act (the PDCA cycle phases)", "Customer, Company, Country, Cost (the 4C framework)", "Man, Machine, Material, Method (and often Measurement, Environment)", "Input, Process, Output, Feedback (system diagram categories)"],
        a: 2, xp: 15,
        exp: "<ruby>特性要因図<rt>とくせいよういんず</rt></ruby> (Tokusei Youin Zu, Fishbone/Ishikawa Diagram) organizes possible causes into branches: <ruby>人<rt>ひと</rt></ruby> (Man), <ruby>機械<rt>きかい</rt></ruby> (Machine), <ruby>材料<rt>ざいりょう</rt></ruby> (Material), <ruby>方法<rt>ほうほう</rt></ruby> (Method) — and often <ruby>測定<rt>そくてい</rt></ruby> (Measurement) and <ruby>環境<rt>かんきょう</rt></ruby> (Environment) — the 4M/6M categories. 🇯🇵 TIP: The fishbone was developed by Prof. Kaoru Ishikawa at the University of Tokyo. It prevents the team from jumping to conclusions by systematically exploring all possible cause categories before selecting the most likely root cause."
      },
      {
        id: 7107, cat: "QC7 Tools",
        q: "What does the shape and spread of a 'histogram (ヒストグラム)' reveal about a manufacturing process?",
        opts: ["Only the single most common value (mode) in the data set", "The order in which measurements were made during the shift", "The distribution shape, center, and spread of a set of measurements, showing whether the process is normally distributed and centered within specifications", "Only whether any individual measurement exceeded the specification limit"],
        a: 2, xp: 15,
        exp: "<ruby>ヒストグラム<rt>ひすとぐらむ</rt></ruby> (Histogram) groups measurements into bars showing frequency. A bell-shaped histogram centered between spec limits suggests a capable, centered process. A bimodal (two-humped) shape may suggest two different machines or shifts being mixed. A skewed shape shows asymmetric variation. 🇯🇵 TIP: Adding specification limit lines to the histogram immediately shows how much of the distribution falls outside the limits, giving a visual estimate of defect rate before calculating Cp/Cpk."
      },
      {
        id: 7108, cat: "ISO 9001",
        q: "What is the core requirement of 'ISO 9001 (ISO 9001)' that organizations must fulfill?",
        opts: ["They must achieve zero defects in all products shipped to customers", "They must establish, document, implement, and continually improve a quality management system (QMS) that consistently meets customer and applicable statutory requirements", "They must use specific QC tools such as SPC and Pareto charts in all production processes", "They must be certified by the Japanese government, not an international body"],
        a: 1, xp: 15,
        exp: "<ruby>ISO 9001<rt>あいえすおーきゅうぜろぜろいち</rt></ruby> is the international standard for Quality Management Systems (<ruby>品質管理システム<rt>ひんしつかんりしすてむ</rt></ruby>). It does not specify what quality level you must achieve, but it does require that you have a documented, systematic approach and that you continually improve it. 🇯🇵 TIP: ISO 9001:2015 introduced risk-based thinking — organizations must identify quality risks and plan actions to address them, not just document procedures reactively."
      },
      {
        id: 7109, cat: "PDCA Cycle",
        q: "What are the four steps of the 'PDCA cycle (PDCAサイクル)', also known as the Deming Cycle?",
        opts: ["Produce, Deliver, Count, Archive", "Plan, Do, Check, Act", "Prepare, Design, Confirm, Adjust", "Process, Document, Control, Audit"],
        a: 1, xp: 15,
        exp: "<ruby>PDCAサイクル<rt>ぴーでぃーしーえーさいくる</rt></ruby>: <ruby>計画<rt>けいかく</rt></ruby> (Plan) → <ruby>実行<rt>じっこう</rt></ruby> (Do) → <ruby>確認<rt>かくにん</rt></ruby> (Check) → <ruby>処置<rt>しょち</rt></ruby> (Act). This continuous improvement cycle was promoted by W. Edwards Deming, who greatly influenced Japanese post-war manufacturing quality. 🇯🇵 TIP: The 'Act' step is often the most important and most neglected — it means standardizing what worked and preventing backsliding, not just moving to the next problem. Without Act, the cycle becomes a loop that repeats the same errors."
      },
      {
        id: 7110, cat: "Sampling",
        q: "What does 'AQL (合格品質水準)', Acceptable Quality Level, represent in sampling inspection?",
        opts: ["The maximum percentage of defectives in a batch that will cause automatic rejection with zero exceptions", "The worst quality level that is still considered acceptable as a process average; lots at this level have a high probability of acceptance", "The average quality level actually achieved in the most recent production month", "The minimum number of samples that must be inspected from every production lot"],
        a: 1, xp: 15,
        exp: "<ruby>合格品質水準<rt>ごうかくひんしつすいじゅん</rt></ruby> (AQL, Acceptable Quality Level) is the worst tolerable process average defective percentage for routine acceptance. At the AQL, the sampling plan is designed to accept the lot with high probability (typically ~95%). It is NOT the target — the target should be far better. 🇯🇵 TIP: AQL tables (JIS Z 9015 / ISO 2859) specify sample sizes and acceptance/rejection numbers based on lot size and the chosen AQL level. Tighter AQL (smaller number like 0.065%) means more stringent inspection."
      },
      {
        id: 7111, cat: "Measurement Systems",
        q: "What is the purpose of 'Gage Repeatability and Reproducibility (GR&R / ゲージR&R)' study?",
        opts: ["To calibrate measurement instruments to a national standard reference", "To evaluate how much of the observed measurement variation comes from the measurement system itself (gauge and operators) versus actual part-to-part variation", "To set the upper and lower control limits for a production SPC chart", "To determine the sample size needed for acceptance sampling of incoming material"],
        a: 1, xp: 15,
        exp: "<ruby>ゲージR&R<rt>げーじあーるあんどあーる</rt></ruby> (Gage R&R) separates total observed variation into: part variation, repeatability (same operator re-measuring same part), and reproducibility (different operators measuring same part). If the gauge system variation is too large relative to the part variation or tolerance, you cannot trust the measurements to make good decisions. 🇯🇵 TIP: A Gage R&R %GRR below 10% is generally acceptable; 10-30% may be acceptable depending on application; above 30% usually requires improvement."
      },
      {
        id: 7112, cat: "FMEA",
        q: "What is the primary purpose of 'FMEA (故障モード影響解析)', Failure Mode and Effects Analysis?",
        opts: ["To document all defects that occurred during the previous production month for the quality record", "To proactively identify potential failure modes in a design or process, assess their risk, and prioritize actions to prevent them before production begins", "To perform root cause analysis after a major customer complaint is received", "To calculate the cost of quality for all products in the current product line"],
        a: 1, xp: 15,
        exp: "<ruby>故障モード影響解析<rt>こしょうもーどえいきょうかいせき</rt></ruby> (FMEA) is a proactive risk tool — identify what could go wrong (<ruby>故障モード<rt>こしょうもーど</rt></ruby>), what effect it has on the customer (<ruby>影響<rt>えいきょう</rt></ruby>), and what the cause is (<ruby>原因<rt>げんいん</rt></ruby>). Risk Priority Number (RPN) = Severity × Occurrence × Detection guides which risks to address first. 🇯🇵 TIP: FMEA is most valuable when done early in design or process planning — finding a failure mode on paper costs a fraction of finding it in production or at the customer."
      },
      {
        id: 7113, cat: "QC7 Tools",
        q: "In quality work, what is a 'check sheet (チェックシート)' primarily used for?",
        opts: ["To create 3D charts for presentation to management", "To systematically collect and record data in real time on the production floor, making data collection easy and organized", "To analyze the correlation between two different process variables", "To calculate the process capability index from measurement data"],
        a: 1, xp: 15,
        exp: "<ruby>チェックシート<rt>ちぇっくしーと</rt></ruby> (Check Sheet) is a simple, structured form for collecting data as events happen, usually with tally marks. Because it is designed around the specific data being collected, it minimizes recording errors and makes patterns immediately visible. 🇯🇵 TIP: The key to a good check sheet is design before deployment — think carefully about what categories matter and build the sheet to capture that data easily, so operators on the floor are not guessing what to write."
      },
      {
        id: 7114, cat: "QC7 Tools",
        q: "A 'scatter diagram (散布図)' is plotted with two variables (e.g., cutting speed and surface roughness). What does it show?",
        opts: ["The time sequence in which individual measurements were taken during the shift", "The frequency distribution of a single measurement variable in a production batch", "The potential correlation or relationship between two variables — whether they tend to move together or independently", "The cumulative percentage of defects by category, from most to least frequent"],
        a: 2, xp: 15,
        exp: "<ruby>散布図<rt>さんぷず</rt></ruby> (Sanpu-zu, Scatter Diagram) plots pairs of data points (X, Y) to reveal whether a relationship exists between two variables. A tight upward-sloping pattern suggests strong positive correlation. No pattern suggests no correlation. This helps identify which process input variables most affect the output quality characteristic. 🇯🇵 TIP: Correlation is not causation — a scatter diagram shows a relationship exists but cannot prove one variable causes the other. Designed experiments (DOE) are needed to establish causal relationships."
      },
      {
        id: 7115, cat: "Variation",
        q: "In SPC, what is the distinction between 'common cause variation (偶然原因)' and 'special cause variation (異常原因)'?",
        opts: ["Common cause variation only occurs in manual operations; special cause only occurs with automated machines", "Common cause variation is the inherent, random background noise of a stable process; special cause variation is due to a specific, identifiable event or change that is not part of the normal process", "Common cause variation always produces defects while special cause variation is harmless", "They are two different names for the same concept in SPC"],
        a: 1, xp: 15,
        exp: "<ruby>偶然原因<rt>ぐうぜんげんいん</rt></ruby> (Common Cause, also called chance/random variation) is the sum of many small, uncontrollable factors in a stable process — tool wear rate, ambient temperature changes, raw material variation within spec. It can only be reduced by changing the process system. <ruby>異常原因<rt>いじょうげんいん</rt></ruby> (Special Cause) is a specific, identifiable event — a broken tool, a new operator mistake, a bad batch of material. 🇯🇵 TIP: Reacting to common cause variation as if it were special cause (over-adjustment) actually increases total variation — this is the key lesson of Deming's funnel experiment."
      },
      {
        id: 7116, cat: "Sampling",
        q: "When conducting sampling inspection per 'JIS Z 9015 (JIS Z 9015)' (equivalent to ISO 2859), what three inputs determine the required sample size?",
        opts: ["The part weight, material cost, and production speed", "Lot size, inspection level (IL), and the chosen AQL", "The number of machine operators, shift duration, and plant size", "The part drawing tolerance, surface finish specification, and material hardness"],
        a: 1, xp: 15,
        exp: "<ruby>JIS Z 9015<rt>ジェイアイエスゼットきゅうぜろいちご</rt></ruby> attribute sampling tables require three inputs: (1) lot size (batch quantity), (2) inspection level (typically General Level II), and (3) AQL (the acceptable quality level). These three determine the sample letter code and thus the actual sample size and accept/reject numbers from the table. 🇯🇵 TIP: Tighter (smaller) AQL and larger lot sizes generally require larger sample sizes. Switching from General Level II to Level S-1 dramatically reduces sample size but also reduces discriminating power."
      },
      {
        id: 7117, cat: "Problem Solving",
        q: "In the '8D problem-solving (8Dほうほう)' process, what is the purpose of 'Step D3 (D3ステップ)', containment action?",
        opts: ["To identify and verify the root cause of the problem through data analysis", "To implement and verify permanent corrective actions that eliminate the root cause", "To immediately protect the customer from receiving further defective product while the root cause investigation is underway", "To celebrate the team's success after the problem has been permanently resolved"],
        a: 2, xp: 15,
        exp: "8D Step D3 is containment — emergency actions like sorting all existing inventory, adding 100% inspection, or holding shipments to prevent the defective product from reaching the customer while the team investigates the true root cause. D3 buys time for D4 (root cause analysis) without abandoning the customer. 🇯🇵 TIP: Containment is temporary by definition — it must be replaced by permanent corrective action (D5/D6) once the root cause is confirmed. Leaving containment in place indefinitely means the root cause was never truly fixed."
      },
      {
        id: 7118, cat: "Problem Solving",
        q: "What is the purpose of 'Naze Naze Bunseki (なぜなぜ分析)', the 5-Why analysis technique?",
        opts: ["To count the total number of defects in a production batch using a structured tally method", "To continuously ask 'Why?' (typically five times) about a problem to drill down from the symptom to the true underlying root cause", "To rank potential causes in order of severity using a numerical scoring system", "To select which quality tool to apply to a given problem based on available data types"],
        a: 1, xp: 15,
        exp: "<ruby>なぜなぜ分析<rt>なぜなぜぶんせき</rt></ruby> (Naze Naze Bunseki, 5-Why) repeatedly asks 'Why did this happen?' to each previous answer until reaching a root cause — typically a systemic issue like missing standards, insufficient training, or flawed process design — rather than stopping at a symptom like 'the operator made a mistake.' 🇯🇵 TIP: The number 5 is a guideline, not a rule. Some problems need 3 Whys; complex ones might need 7. Stop when you reach a cause you can actually fix that will prevent recurrence, not just the immediate symptom."
      },
      {
        id: 7119, cat: "Kaizen",
        q: "What is the core meaning of 'Kaizen (改善)' in a manufacturing quality context?",
        opts: ["A radical, technology-driven overhaul of an entire production line requiring large capital investment", "Continuous, incremental improvement involving everyone at all levels, focusing on eliminating waste and improving quality one small step at a time", "A top-down management directive to reduce costs by cutting workforce headcount", "A Japanese word for defect inspection, specifically the final quality check before shipment"],
        a: 1, xp: 15,
        exp: "<ruby>改善<rt>かいぜん</rt></ruby> (Kaizen) literally means 'change for the better.' In the Toyota Production System (TPS) context, it means continuous small improvements involving all workers — not just managers or engineers. Even a small suggestion from a floor operator that saves 30 seconds per shift is valued Kaizen. 🇯🇵 TIP: Kaizen differs from innovation (<ruby>革新<rt>かくしん</rt></ruby>, Kakushin) which is large, disruptive change. Japan's manufacturing strength built on accumulating thousands of small Kaizen improvements, each individually modest but collectively powerful."
      },
      {
        id: 7120, cat: "Measurement Systems",
        q: "What is the purpose of 'MSA (測定システム解析)', Measurement System Analysis, in quality management?",
        opts: ["To calibrate all instruments to traceable national standards only", "To evaluate the entire measurement system — including the gauge, operators, measurement procedure, and environment — to ensure measurement results are reliable and trustworthy for making quality decisions", "To determine the minimum number of measurements required to calculate a valid average value", "To convert analog measurements from manual gauges into digital format for computerized data collection"],
        a: 1, xp: 15,
        exp: "<ruby>測定システム解析<rt>そくていしすてむかいせき</rt></ruby> (MSA, Measurement System Analysis) is broader than Gage R&R — it evaluates all sources of measurement error: bias, linearity, stability over time, repeatability, and reproducibility. If the measurement system is not reliable, all data-driven quality decisions (SPC, capability studies, inspection) are built on a flawed foundation. 🇯🇵 TIP: MSA is a prerequisite in AIAG (automotive) quality systems and is increasingly required by Japanese automotive OEM supplier standards as well. Fix the measurement system before trying to control the process."
      }
    ]
  },
  {
    examId: 6, label: "計測・測定技術", subtitle: "Measurement & Metrology Technology",
    color: "#00CED1", icon: "📏", examiner: "計測技術官 (Keisoku Gijutsukan)",
    questions: [
      {
        id: 7201, cat: "Measurement Fundamentals",
        q: "What does 'bunkai-nou (分解能)', resolution, mean in the context of a measuring instrument?",
        opts: ["The maximum load the instrument can measure before it breaks", "The smallest difference in measured value that the instrument can detect and display", "The maximum distance from a reference datum at which the instrument can be used", "The number of digits displayed on the instrument's readout screen"],
        a: 1, xp: 15,
        exp: "<ruby>分解能<rt>ぶんかいのう</rt></ruby> (Bunkai-nou, Resolution) is the smallest increment that the instrument can distinguish and display. A micrometer with 0.001mm resolution can detect a 0.001mm difference; it cannot reliably detect 0.0005mm. Resolution is not the same as accuracy — a high-resolution instrument can still be inaccurate if not calibrated. 🇯🇵 TIP: For measurement to be meaningful, resolution should be at least 1/10 of the tolerance being measured — so a 0.1mm tolerance feature needs a gauge with at least 0.01mm resolution."
      },
      {
        id: 7202, cat: "Measurement Fundamentals",
        q: "What is the difference between 'seikakusa (正確さ)', accuracy, and 'seido (精度)', precision, in measurement?",
        opts: ["Accuracy and precision are two different words for the same concept in Japanese metrology", "Accuracy describes how close a measurement is to the true value; precision describes how repeatable measurements are when the same part is measured multiple times", "Precision describes how close a measurement is to the true value; accuracy describes how repeatable measurements are", "Accuracy only applies to length measurements; precision only applies to angle measurements"],
        a: 1, xp: 15,
        exp: "<ruby>正確さ<rt>せいかくさ</rt></ruby> (Seikakusa, Accuracy) = closeness to the true/reference value. <ruby>精度<rt>せいど</rt></ruby> (Seido, Precision) = repeatability, how tightly clustered repeated measurements are — regardless of where they cluster. A dartboard analogy: tight cluster near the bullseye = accurate AND precise. Tight cluster away from bullseye = precise but NOT accurate. Scattered near bullseye = accurate on average but not precise. 🇯🇵 TIP: A gauge can be very precise (consistent results) but systematically inaccurate (biased away from true value) due to calibration error or thermal expansion."
      },
      {
        id: 7203, cat: "Micrometer",
        q: "A micrometer reading shows the sleeve at 7.5mm and the thimble scale at 0.22mm. What is the correct measurement?",
        opts: ["7.22mm", "7.50mm", "7.72mm", "8.72mm"],
        a: 2, xp: 15,
        exp: "<ruby>マイクロメーター<rt>まいくろめーたー</rt></ruby> (Micrometer) reading = sleeve reading + thimble reading = 7.5mm + 0.22mm = 7.72mm. The sleeve shows 0.5mm increments; the thimble shows 0.01mm increments per division (one full thimble rotation = 0.5mm). 🇯🇵 TIP: Always use the micrometer ratchet stop (<ruby>ラチェットストップ<rt>らちぇっとすとっぷ</rt></ruby>) to apply consistent measuring force — overtightening introduces error and can damage fine threads."
      },
      {
        id: 7204, cat: "Surface Roughness",
        q: "What does 'Ra (算術平均粗さ)' measure in surface roughness evaluation?",
        opts: ["The maximum single peak height above the mean line within the evaluation length", "The arithmetic mean of the absolute deviations of the surface profile from the mean line over the evaluation length", "The total height from the highest peak to the lowest valley in the evaluation length", "The number of surface peaks per millimeter above a defined threshold height"],
        a: 1, xp: 15,
        exp: "<ruby>算術平均粗さ<rt>さんじゅつへいきんあらさ</rt></ruby> (Ra, Arithmetic Mean Roughness) averages the absolute heights of all peaks and depths of all valleys from the mean line. It is the most widely used surface roughness parameter in Japanese manufacturing (JIS B 0601). A lower Ra means a smoother surface. 🇯🇵 TIP: Ra is insensitive to occasional very high spikes or very deep scratches — a few deep scratches barely change Ra but can critically affect function (sealing, bearing fit). Rz and Rmax are more sensitive to such outliers."
      },
      {
        id: 7205, cat: "Surface Roughness",
        q: "How does 'Rz (最大高さ粗さ)' differ from 'Ra (Ra)' in surface roughness measurement?",
        opts: ["Rz and Ra are identical parameters using different notation conventions", "Rz measures the average roughness while Ra measures only the maximum peak height", "Rz measures the average of the five highest peaks plus five deepest valleys in the evaluation length, making it more sensitive to extreme surface events than Ra", "Rz is used only for grinding operations while Ra is used for turning and milling"],
        a: 2, xp: 15,
        exp: "<ruby>最大高さ粗さ<rt>さいだいたかさあらさ</rt></ruby> (Rz) measures the sum of the five highest peak heights and five deepest valley depths averaged over the evaluation length — making it much more sensitive to scratches, burrs, or extreme surface events that Ra would mask by averaging. 🇯🇵 TIP: For sealing surfaces and critical contact surfaces, Rz or Rmax is specified alongside Ra because a single deep scratch that doesn't affect Ra much could still prevent a proper seal."
      },
      {
        id: 7206, cat: "Gauge Blocks",
        q: "What are 'gauge blocks (ゲージブロック)', also called Johansson blocks or Jo blocks, primarily used for in a precision measurement environment?",
        opts: ["To grind parts to a final accurate dimension directly on the machine tool", "To provide a set of precision-ground reference blocks that can be wrung together to create a specific reference length for calibrating instruments or setting comparators", "To check surface roughness Ra values of machined parts on the production floor", "To measure the roundness of turned cylindrical parts using the V-block method"],
        a: 1, xp: 15,
        exp: "<ruby>ゲージブロック<rt>げーじぶろっく</rt></ruby> (Gauge Block / Jo Block) are precisely ground steel or ceramic blocks with flatness and parallelism in the sub-micron range. They 'wring' together (adhere by molecular attraction and surface tension) to create a desired reference length. Used to calibrate micrometers, set dial gauges, and verify measurement instruments. 🇯🇵 TIP: Gauge blocks must be wrung — not bolted or forced — and handled with care to avoid thermal changes from hand heat. Store in a temperature-controlled room at 20°C and handle with clean leather gloves."
      },
      {
        id: 7207, cat: "Dial Gauge",
        q: "When using a dial gauge (dial indicator) to measure part dimensions, why must it be mounted on a rigid stand?",
        opts: ["To allow the dial gauge needle to rotate freely without friction from the contact point", "To prevent the gauge from accidentally measuring the stand's temperature instead of the part", "To eliminate movement of the gauge body itself, ensuring that all needle deflection represents actual part feature variation and not gauge body movement", "To comply with a mandatory JIS regulation that all dial gauges must be stand-mounted in Japan"],
        a: 2, xp: 15,
        exp: "<ruby>ダイヤルゲージ<rt>だいやるげーじ</rt></ruby> (Dial Gauge/Indicator) measures relative displacement at its contact point. If the gauge body itself moves during measurement, that movement is indistinguishable from part feature variation, creating measurement error. A rigid magnetic stand on a granite surface plate ensures only the part surface variation is measured. 🇯🇵 TIP: Always re-zero the dial gauge after final tightening of all clamp knobs, not before — tightening can shift the zero."
      },
      {
        id: 7208, cat: "CMM",
        q: "What is a key advantage of using a 'CMM (三次元測定機)', Coordinate Measuring Machine, over traditional manual gauge measurement?",
        opts: ["CMMs are always faster than manual gauges for every type of measurement", "CMMs can only measure flat surfaces and cannot handle curved or complex 3D geometry", "A CMM can measure complex 3D geometry, multiple features, and GD&T characteristics in a single setup with high accuracy and traceability, replacing multiple specialized gauges", "CMMs do not require calibration because they use laser technology"],
        a: 2, xp: 15,
        exp: "<ruby>三次元測定機<rt>さんじげんそくていき</rt></ruby> (CMM, Coordinate Measuring Machine) moves a ruby-tipped probe in X, Y, and Z to collect 3D point data. It can measure position, diameter, flatness, perpendicularity, and complex free-form surfaces — replacing dozens of specialized gauges with one instrument. Results are fully traceable and can be directly compared to CAD models. 🇯🇵 TIP: CMM accuracy depends heavily on part clamping, probe qualification, temperature (reference 20°C per ISO 1), and vibration isolation."
      },
      {
        id: 7209, cat: "GD&T Measurement",
        q: "When measuring 'heimen-do (平面度)', flatness, what exactly is being evaluated?",
        opts: ["Whether the surface is parallel to a reference datum plane", "How smooth the surface finish is, measured as Ra roughness value", "How much the surface deviates from a theoretically perfect flat plane — the minimum zone between two parallel planes that contain all surface points", "The angle between two adjacent surfaces on the part"],
        a: 2, xp: 15,
        exp: "<ruby>平面度<rt>へいめんど</rt></ruby> (Heimen-do, Flatness) is measured by finding the minimum separation between two parallel planes that contain all measured points on the surface. No datum is needed — flatness is evaluated purely from the surface itself. 🇯🇵 TIP: Flatness does not control location or orientation relative to anything — a surface can be perfectly flat but still be tilted 45° relative to the part datum. Use parallelism or perpendicularity when the orientation to a datum also matters."
      },
      {
        id: 7210, cat: "Go/No-Go Gauges",
        q: "For a go/no-go gauge (限界ゲージ) set to check a shaft diameter, what is the correct result for an acceptable part?",
        opts: ["The No-Go gauge enters the part and the Go gauge does not", "Both gauges should enter the part with equal ease", "The Go gauge enters the part and the No-Go gauge does not enter", "Neither gauge should enter the part — they should both stop at the surface"],
        a: 2, xp: 15,
        exp: "<ruby>限界ゲージ<rt>げんかいげーじ</rt></ruby> (Limit Gauge / Go/No-Go Gauge): The <ruby>通り<rt>とおり</rt></ruby> (Go) gauge checks the maximum material condition — it must pass freely. The <ruby>止まり<rt>とまり</rt></ruby> (No-Go) gauge checks the minimum material condition — it must NOT enter. Both conditions satisfied = part is within specification. 🇯🇵 TIP: Go/No-Go gauges provide fast, skill-independent go/fail decisions ideal for high-volume production."
      },
      {
        id: 7211, cat: "GD&T Measurement",
        q: "What does 'shinen-do (真円度)', roundness (circularity), measure in GD&T?",
        opts: ["The straightness of a cylindrical part's central axis over its full length", "How consistently round a cross-section of a circular feature is at a single plane — the deviation from a perfect circle in that 2D slice", "The total cylindrical form error of a bore over its full length and across all cross-sections", "The surface roughness Ra of the bore wall in a circular direction"],
        a: 1, xp: 15,
        exp: "<ruby>真円度<rt>しんえんど</rt></ruby> (Shinen-do, Roundness/Circularity) evaluates a single 2D cross-sectional slice of a cylinder or cone — how close that ring-shaped slice is to a perfect circle. It is measured by the radial distance between the smallest circumscribed circle and the largest inscribed circle that fit the profile. 🇯🇵 TIP: Roundness is checked one cross-section at a time. If you need to control the entire cylinder surface, you need cylindricity (<ruby>円筒度<rt>えんとうど</rt></ruby>) instead."
      },
      {
        id: 7212, cat: "GD&T Measurement",
        q: "How does 'entou-do (円筒度)', cylindricity, differ from roundness (真円度)?",
        opts: ["Cylindricity is evaluated at a single cross-section; roundness evaluates the full 3D cylinder surface", "Cylindricity controls the entire 3D surface of a cylinder — both the roundness of every cross-section and the straightness of the axis — simultaneously", "Cylindricity is the GD&T symbol for internal bores only; roundness applies to external shafts only", "Cylindricity and roundness are equivalent GD&T controls with no practical difference between them"],
        a: 1, xp: 15,
        exp: "<ruby>円筒度<rt>えんとうど</rt></ruby> (Entou-do, Cylindricity) simultaneously controls: roundness at every cross-section AND straightness of the axis AND taper (constant diameter along the length). All surface points must fall within a tolerance zone between two coaxial cylinders. 🇯🇵 TIP: Cylindricity is difficult and expensive to measure — a CMM or dedicated cylindricity measuring instrument is needed. Separate roundness and straightness callouts may be more practical for most manufacturing applications."
      },
      {
        id: 7213, cat: "GD&T Measurement",
        q: "What does 'circular runout (振れ)', a GD&T runout tolerance, measure when a part is rotated about a datum axis?",
        opts: ["The total accumulated form error of the entire cylindrical surface during one full rotation about the datum axis", "The variation in the indicator reading at a single cross-sectional circle as the part makes one complete rotation about the datum axis", "The wobble of the datum axis itself during rotation", "The surface finish Ra value in the circumferential direction of a rotating part"],
        a: 1, xp: 15,
        exp: "<ruby>振れ<rt>ふれ</rt></ruby> (Fure, Circular Runout) is measured by holding a dial indicator at one radial cross-section while rotating the part one full revolution about the datum axis. The total indicator reading (TIR) at that slice must not exceed the runout tolerance. It combines effects of roundness error and axis offset at that single slice. 🇯🇵 TIP: Circular runout is checked slice by slice. Total runout (<ruby>全振れ<rt>ぜんふれ</rt></ruby>) keeps the indicator in contact across the full surface simultaneously, controlling both runout and taper at once."
      },
      {
        id: 7214, cat: "GD&T Measurement",
        q: "What is the key difference between 'total runout (全振れ)' and 'circular runout (振れ)' in GD&T?",
        opts: ["Total runout is only for flat surfaces; circular runout is only for cylindrical surfaces", "Total runout sweeps the indicator across the entire surface during rotation, controlling all surface errors simultaneously; circular runout only captures variation at individual cross-sectional slices independently", "Circular runout requires two datum references; total runout requires only one", "Total runout and circular runout are identical in their measurement and meaning"],
        a: 1, xp: 15,
        exp: "<ruby>全振れ<rt>ぜんふれ</rt></ruby> (Zen-fure, Total Runout) holds the indicator in contact and traverses the full length of the surface during rotation — simultaneously capturing roundness error, taper, straightness deviation, and coaxiality error in a single measurement. Circular runout only captures the worst slice independently. Total runout is the stricter, more complete control. 🇯🇵 TIP: Specify total runout when the functional requirement truly requires the entire surface to run true — it is more difficult to achieve and verify than circular runout."
      },
      {
        id: 7215, cat: "Fits and Tolerances",
        q: "In the JIS/ISO hole-based fit system, what does the capital letter 'H' in 'H7/g6' signify about the hole tolerance?",
        opts: ["The hole tolerance is centered symmetrically about the nominal diameter", "The lower deviation (EI) of the hole is zero — the hole tolerance zone starts exactly at the nominal size and extends upward only", "The hole tolerance class is the tightest available in the JIS standard", "The letter H indicates the hole must be machined by honing only, not by boring or reaming"],
        a: 1, xp: 15,
        exp: "In the ISO/JIS hole tolerance system, capital letter H always means the lower deviation (EI) = 0. The hole is never smaller than nominal; it is at or above nominal. This is the basis of the hole-based system (<ruby>穴基準<rt>あなきじゅん</rt></ruby>) — the hole is the fixed reference, and shaft tolerances vary to achieve clearance, transition, or interference fits. 🇯🇵 TIP: Using a hole-based system simplifies tooling: you can use a standard reamer or bore to the H tolerance, then grind shafts to various fits."
      },
      {
        id: 7216, cat: "Calibration",
        q: "What is the purpose of 'kousei (校正)', calibration, of a measuring instrument?",
        opts: ["To physically clean and lubricate the instrument's internal mechanism to reduce friction", "To compare the instrument's readings against a traceable reference standard and determine (and possibly correct) any systematic error (bias)", "To replace worn measuring surfaces with new precision-ground components", "To certify the instrument as legally approved for use in commercial transactions"],
        a: 1, xp: 15,
        exp: "<ruby>校正<rt>こうせい</rt></ruby> (Kousei, Calibration) establishes the relationship between the instrument's output and a traceable reference — determining any bias. Calibration may include adjustment (correcting the bias) or may simply document the error for use as a correction factor. Traceability to national/international standards (NITE in Japan) is essential. 🇯🇵 TIP: Calibration records must document: instrument ID, calibration date, standard used, results, calibration interval, and who performed it."
      },
      {
        id: 7217, cat: "Reference Temperature",
        q: "According to 'ISO 1 (ISO 1)' and JIS B 0680, at what reference temperature are precision length measurements defined?",
        opts: ["0°C (ice point)", "25°C (typical laboratory temperature)", "20°C", "37°C (human body temperature)"],
        a: 2, xp: 15,
        exp: "ISO 1 (and JIS B 0680) establishes <ruby>基準温度<rt>きじゅんおんど</rt></ruby> (Kijun Ondo, Reference Temperature) as 20°C for all precision length measurements. Gauge blocks, instruments, and parts should all be at 20°C when taking precision measurements. Steel expands ~12 ppm/°C — a 100mm part at 25°C is about 0.006mm longer than at 20°C. 🇯🇵 TIP: Allow adequate thermal soak time before measuring precision parts — large castings or freshly machined parts can take hours to stabilize to room temperature."
      },
      {
        id: 7218, cat: "Vernier Caliper",
        q: "What is the correct technique for holding a vernier caliper when measuring an external dimension?",
        opts: ["Hold the caliper vertically with the scale facing down so gravity assists in closing the jaws", "Grip both jaws firmly and squeeze to apply high force to ensure the jaws contact the part", "Hold the fixed jaw against a reference surface and move only the sliding jaw with the thumb wheel", "Hold the caliper with the main scale horizontal, close the jaws gently onto the part using the thumb, then read the scale at eye level to avoid parallax error"],
        a: 3, xp: 15,
        exp: "<ruby>ノギス<rt>のぎす</rt></ruby> (Vernier Caliper) technique: close jaws gently onto the part (no heavy squeezing), hold scale horizontal, read at eye level perpendicular to the scale to avoid <ruby>視差<rt>しさ</rt></ruby> (parallax) error. 🇯🇵 TIP: When measuring a bore with a vernier caliper's inside jaws, rock the caliper gently to find the maximum reading — that is the true diameter. Always verify zero on a closed caliper before measuring."
      },
      {
        id: 7219, cat: "Surface Roughness",
        q: "What method does a contact-type surface roughness tester use to measure surface texture?",
        opts: ["A laser beam that reflects off the surface and measures the scattered light intensity", "A pneumatic nozzle that measures back-pressure changes as it moves over the surface", "A diamond-tipped stylus that physically traces the surface profile, and the vertical stylus displacement is recorded and converted to roughness parameters", "An electrical current that flows through the surface and measures conductivity variations"],
        a: 2, xp: 15,
        exp: "Contact-type surface roughness testers (<ruby>触針式<rt>しょくしんしき</rt></ruby>) use a diamond stylus with a tip radius of typically 2μm or 5μm that physically drags along the surface. The up-and-down movement is measured and converted to the surface profile, from which Ra, Rz, and other parameters are calculated. 🇯🇵 TIP: The stylus must move perpendicular to the machining lay (cutting direction) for meaningful roughness data. Measuring parallel to tool marks gives falsely low roughness readings."
      },
      {
        id: 7220, cat: "Measurement Uncertainty",
        q: "What does 'sokutei-fukakujitsu-sa (測定不確かさ)', measurement uncertainty, express about a measurement result?",
        opts: ["That the measurement is wrong and must be repeated until a consistent value is obtained", "A quantified range that characterizes the dispersion of values that could reasonably be attributed to the measurand — expressing doubt about how well the true value is known", "The maximum specification tolerance for the part being measured", "That the measuring instrument is out of calibration and cannot be trusted"],
        a: 1, xp: 15,
        exp: "<ruby>測定不確かさ<rt>そくていふかくじつさ</rt></ruby> (Measurement Uncertainty) is not a mistake — it quantifies the range of doubt inherent in any measurement. A result stated as 25.003mm ± 0.002mm means the true value is estimated to lie between 25.001mm and 25.005mm with a defined confidence level (typically 95%). 🇯🇵 TIP: When a part dimension is close to a tolerance limit, measurement uncertainty becomes critical — if your gauge uncertainty is ±0.002mm and the part is 0.001mm over the limit, you cannot reliably determine if the part truly fails."
      }
    ]
  }
];
