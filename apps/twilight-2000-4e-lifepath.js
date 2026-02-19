// ─── DICE & UTILITY HELPERS ───

function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollD3() {
  return Math.ceil(roll(6) / 2);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ─── CONSTANTS ───

const DIE_LEVELS = ["F", "D", "C", "B", "A"];
const DIE_SIZES = { F: 0, D: 6, C: 8, B: 10, A: 12 };
const DIE_LABELS = { F: "\u2014", D: "D6", C: "D8", B: "D10", A: "D12" };
const LEVEL_LABELS = { F: "F", D: "D", C: "C", B: "B", A: "A" };

const ATTRIBUTES = ["STR", "AGL", "INT", "EMP"];
const ATTR_NAMES = {
  STR: "Strength",
  AGL: "Agility",
  INT: "Intelligence",
  EMP: "Empathy",
};

const SKILLS = [
  { name: "Close Combat", attr: "STR" },
  { name: "Heavy Weapons", attr: "STR" },
  { name: "Stamina", attr: "STR" },
  { name: "Driving", attr: "AGL" },
  { name: "Ranged Combat", attr: "AGL" },
  { name: "Mobility", attr: "AGL" },
  { name: "Recon", attr: "INT" },
  { name: "Survival", attr: "INT" },
  { name: "Tech", attr: "INT" },
  { name: "Command", attr: "EMP" },
  { name: "Medical Aid", attr: "EMP" },
  { name: "Persuasion", attr: "EMP" },
];

const UNIVERSAL_SKILLS = ["Stamina", "Mobility", "Driving"];

const MILITARY_BRANCHES = {
  "United States Army/Marine Corps": {
    enlisted: [
      "Private",
      "Private First Class",
      "Corporal",
      "Sergeant",
      "Staff Sergeant",
      "Sergeant First Class",
      "Master Sergeant",
      "First Sergeant",
      "Sergeant Major",
    ],
    officer: [
      "2nd Lieutenant",
      "1st Lieutenant",
      "Captain",
      "Major",
      "Lieutenant Colonel",
      "Colonel",
    ],
  },
  "Russian Armed Forces": {
    enlisted: [
      "Ryadovoy",
      "Ryadovoy",
      "Efreitor",
      "Mladshiy Serzhant",
      "Serzhant",
      "Starshiy Serzhant",
      "Starshiy Serzhant",
      "Starshina",
      "Starshina",
    ],
    officer: [
      "Mladshiy Leytenant",
      "Starshiy Leytenant",
      "Kapitan",
      "Mayor",
      "Podpolkovnik",
      "Polkovnik",
    ],
  },
  "Polish Armed Forces": {
    enlisted: [
      "Szeregowy",
      "Starszy szeregowy",
      "Kapral",
      "Starszy kapral",
      "Sier\u017cant",
      "Starszy sier\u017cant",
      "M\u0142odszy chor\u0105\u017cy",
      "Chor\u0105\u017cy",
      "Starszy chor\u0105\u017cy",
    ],
    officer: [
      "Podporucznik",
      "Porucznik",
      "Kapitan",
      "Major",
      "Podpu\u0142kownik",
      "Pu\u0142kownik",
    ],
  },
  "Swedish Armed Forces": {
    enlisted: [
      "Menig",
      "Menig",
      "Korpral",
      "Furir",
      "Sergeant",
      "Sergeant",
      "Sergeant",
      "Sergeant",
      "Sergeant",
    ],
    officer: [
      "F\u00e4nrik",
      "L\u00f6jtnant",
      "Kapten",
      "Major",
      "\u00d6verstel\u00f6jtnant",
      "\u00d6verste",
    ],
  },
};

// ─── SPECIALTIES BY SKILL ───

const SPECIALTIES = {
  "Close Combat": ["Brawler", "Melee", "Killer", "Martial Artist"],
  "Heavy Weapons": ["Machinegunner", "Launcher Crew", "Redleg", "Vehicle Gunner"],
  Stamina: ["Builder", "Load Carrier", "NBC Specialist", "Ranger", "SERE"],
  Driving: ["Biker", "Boatman", "Pilot", "Racer", "Tanker"],
  Mobility: ["Diver", "Mountaineer", "Paratrooper", "Pitcher", "Rider", "Runner"],
  "Ranged Combat": ["Archer", "Reloader", "Rifleman", "Sidearms", "Sniper"],
  Recon: [
    "Combat Awareness",
    "Forward Observer",
    "Historian",
    "Infiltrator",
    "Intelligence Analyst",
    "Investigator",
    "Scout",
  ],
  Survival: [
    "Cook",
    "Farmer",
    "Fisher",
    "Forager",
    "Hunter",
    "Navigator",
    "Quartermaster",
    "Scrounger",
  ],
  Tech: [
    "Blacksmith",
    "Chemist",
    "Combat Engineer",
    "Communications",
    "Computers",
    "Electrician",
    "Gunsmith",
    "Improvised Munitions",
    "Locksmith",
    "Mechanic",
    "Scientist",
  ],
  Command: ["Frontline Leader", "Logistician", "Tactician"],
  "Medical Aid": [
    "Combat Medic",
    "Counselor",
    "Field Surgeon",
    "General Practitioner",
    "Veterinarian",
  ],
  Persuasion: ["Interrogator", "Linguist", "Musician", "Psy Ops", "Teacher", "Trader"],
};

// ─── CHILDHOOD DATA ───

const CHILDHOODS = [
  {
    roll: 1,
    name: "Rural",
    desc: "You grew up on a farm or in a small rural community.",
    skill: "Survival",
    specialtyTable: ["Farmer", "Fisher", "Forager", "Hunter", "Navigator", "Rider"],
  },
  {
    roll: 2,
    name: "Suburban",
    desc: "You grew up in a quiet suburb.",
    skill: "Persuasion",
    specialtyTable: ["Linguist", "Musician", "Teacher", "Trader", "Counselor", "Cook"],
  },
  {
    roll: 3,
    name: "Urban",
    desc: "You grew up in the heart of a big city.",
    skill: "Recon",
    specialtyTable: ["Investigator", "Scout", "Infiltrator", "Computers", "Locksmith", "Brawler"],
  },
  {
    roll: 4,
    name: "Immigrant",
    desc: "Your family moved to a new country when you were young.",
    skill: "Persuasion",
    specialtyTable: ["Linguist", "Cook", "Trader", "Musician", "Teacher", "Scrounger"],
  },
  {
    roll: 5,
    name: "Military Brat",
    desc: "You grew up on military bases around the world.",
    skill: "Mobility",
    specialtyTable: ["Runner", "Pitcher", "Rider", "Combat Awareness", "Brawler", "Linguist"],
  },
  {
    roll: 6,
    name: "Privileged",
    desc: "You grew up in a wealthy family with every advantage.",
    skill: "Driving",
    specialtyTable: ["Racer", "Pilot", "Boatman", "Computers", "Musician", "Rider"],
  },
];

// ─── CAREER DATA (22 careers) ───

const CAREERS = [
  // MILITARY
  {
    name: "Combat Arms",
    category: "Military",
    subcategory: "Enlisted",
    startingRankIndex: 0,
    rankTrack: "enlisted",
    reqText: "None",
    reqCheck: () => true,
    skills: ["Ranged Combat", "Close Combat", "Recon"],
    specialtyTable: ["Rifleman", "Machinegunner", "Combat Awareness", "Brawler", "Scout", "Sniper"],
    gear: [
      "Assault rifle with 2 extra magazines",
      "Body armor",
      "Helmet",
      "Backpack",
      "2 hand grenades",
    ],
  },
  {
    name: "Combat Support",
    category: "Military",
    subcategory: "Enlisted",
    startingRankIndex: 1,
    rankTrack: "enlisted",
    reqText: "None",
    reqCheck: () => true,
    skills: ["Heavy Weapons", "Tech", "Driving"],
    specialtyTable: [
      "Vehicle Gunner",
      "Launcher Crew",
      "Combat Engineer",
      "Communications",
      "Tanker",
      "Forward Observer",
    ],
    gear: [
      "Assault rifle with 2 extra magazines",
      "Body armor",
      "Helmet",
      "Backpack",
      "Binoculars",
    ],
  },
  {
    name: "Combat Service Support",
    category: "Military",
    subcategory: "Enlisted",
    startingRankIndex: 1,
    rankTrack: "enlisted",
    reqText: "None",
    reqCheck: () => true,
    skills: ["Tech", "Medical Aid", "Survival"],
    specialtyTable: [
      "Mechanic",
      "Combat Medic",
      "Quartermaster",
      "Cook",
      "Gunsmith",
      "Electrician",
    ],
    gear: ["Pistol with 2 extra magazines", "Backpack", "Toolbox", "First aid kit"],
  },
  {
    name: "Special Operations",
    category: "Military",
    subcategory: "Enlisted",
    startingRankIndex: 3,
    rankTrack: "enlisted",
    reqText: "At least one Military term",
    reqCheck: () => countMilitaryTerms() >= 1,
    skills: ["Ranged Combat", "Close Combat", "Survival"],
    specialtyTable: ["Sniper", "Paratrooper", "Diver", "Killer", "SERE", "Infiltrator"],
    gear: [
      "Assault rifle with suppressor and 3 extra magazines",
      "Pistol with 2 extra magazines",
      "Body armor",
      "Night vision goggles",
      "Knife",
    ],
  },
  {
    name: "Officer",
    category: "Military",
    subcategory: "Officer",
    startingRankIndex: 0,
    rankTrack: "officer",
    reqText: "INT B+ and at least one Education term",
    reqCheck: () => dieIndex(char.attributes.INT) >= 3 && countEducationTerms() >= 1,
    skills: ["Ranged Combat", "Command", "Persuasion"],
    specialtyTable: [
      "Frontline Leader",
      "Tactician",
      "Logistician",
      "Intelligence Analyst",
      "Psy Ops",
      "Sidearms",
    ],
    gear: ["Pistol with 2 extra magazines", "Binoculars", "Map and compass", "Backpack"],
  },
  // POLICE
  {
    name: "Police Officer",
    category: "Police",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "No prison record",
    reqCheck: () => !hasPrisonTerm(),
    skills: ["Ranged Combat", "Persuasion", "Recon"],
    specialtyTable: [
      "Sidearms",
      "Investigator",
      "Interrogator",
      "Combat Awareness",
      "Scout",
      "Rifleman",
    ],
    gear: ["Pistol with 2 extra magazines", "Body armor", "Flashlight", "Handcuffs"],
  },
  {
    name: "Detective",
    category: "Police",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "At least one Police term and EMP C+",
    reqCheck: () => countCareerTerms("Police") >= 1 && dieIndex(char.attributes.EMP) >= 2,
    skills: ["Recon", "Persuasion", "Tech"],
    specialtyTable: [
      "Investigator",
      "Interrogator",
      "Intelligence Analyst",
      "Locksmith",
      "Computers",
      "Linguist",
    ],
    gear: ["Pistol with 2 extra magazines", "Flashlight", "Lock picks"],
  },
  {
    name: "SWAT",
    category: "Police",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "At least one Police term, STR B+ and AGL B+",
    reqCheck: () =>
      countCareerTerms("Police") >= 1 &&
      dieIndex(char.attributes.STR) >= 3 &&
      dieIndex(char.attributes.AGL) >= 3,
    skills: ["Ranged Combat", "Close Combat", "Mobility"],
    specialtyTable: ["Rifleman", "Sniper", "Brawler", "Combat Awareness", "Diver", "Mountaineer"],
    gear: [
      "Assault rifle with 3 extra magazines",
      "Pistol with 2 extra magazines",
      "Body armor",
      "Helmet",
      "Flashbang grenades x2",
    ],
  },
  // CRIME
  {
    name: "Gang Member",
    category: "Crime",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "No attribute at A",
    reqCheck: () => ATTRIBUTES.every((a) => dieIndex(char.attributes[a]) < 4),
    skills: ["Close Combat", "Ranged Combat", "Persuasion"],
    specialtyTable: ["Brawler", "Sidearms", "Melee", "Interrogator", "Scrounger", "Rifleman"],
    gear: ["Pistol with 1 extra magazine", "Knife", "Leather jacket"],
  },
  {
    name: "Burglar",
    category: "Crime",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "AGL C+ and INT C+",
    reqCheck: () => dieIndex(char.attributes.AGL) >= 2 && dieIndex(char.attributes.INT) >= 2,
    skills: ["Recon", "Tech", "Mobility"],
    specialtyTable: ["Locksmith", "Infiltrator", "Electrician", "Scout", "Runner", "Computers"],
    gear: ["Lock picks", "Flashlight", "Backpack", "Knife"],
  },
  {
    name: "Hustler",
    category: "Crime",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "INT C+ and EMP C+",
    reqCheck: () => dieIndex(char.attributes.INT) >= 2 && dieIndex(char.attributes.EMP) >= 2,
    skills: ["Persuasion", "Recon", "Survival"],
    specialtyTable: ["Trader", "Interrogator", "Linguist", "Scrounger", "Investigator", "Psy Ops"],
    gear: ["Pistol with 1 extra magazine", "Flashy clothing", "Cash stash"],
  },
  {
    name: "Prisoner",
    category: "Crime",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "Forced entry after Crime career (D6 odd)",
    reqCheck: () => false, // Never voluntarily chosen
    skills: ["Close Combat", "Stamina", "Survival"],
    specialtyTable: ["Brawler", "Load Carrier", "Scrounger", "Cook", "Melee", "Killer"],
    gear: ["Shiv"],
  },
  // INTELLIGENCE
  {
    name: "Agent",
    category: "Intelligence",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "INT B+ and at least one Education term",
    reqCheck: () => dieIndex(char.attributes.INT) >= 3 && countEducationTerms() >= 1,
    skills: ["Recon", "Persuasion", "Tech"],
    specialtyTable: [
      "Intelligence Analyst",
      "Linguist",
      "Computers",
      "Infiltrator",
      "Investigator",
      "Communications",
    ],
    gear: ["Pistol with 2 extra magazines", "Forged documents", "Radio", "Disguise kit"],
  },
  {
    name: "Assassin",
    category: "Intelligence",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "AGL B+ and at least one Intelligence term",
    reqCheck: () => dieIndex(char.attributes.AGL) >= 3 && countCareerTerms("Intelligence") >= 1,
    skills: ["Ranged Combat", "Close Combat", "Recon"],
    specialtyTable: ["Sniper", "Killer", "Sidearms", "Infiltrator", "Locksmith", "Martial Artist"],
    gear: ["Pistol with suppressor and 2 extra magazines", "Knife", "Garrote", "Disguise kit"],
  },
  {
    name: "Paramilitary",
    category: "Intelligence",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "STR B+, AGL B+, and at least one Military term",
    reqCheck: () =>
      dieIndex(char.attributes.STR) >= 3 &&
      dieIndex(char.attributes.AGL) >= 3 &&
      countMilitaryTerms() >= 1,
    skills: ["Heavy Weapons", "Ranged Combat", "Close Combat"],
    specialtyTable: [
      "Machinegunner",
      "Launcher Crew",
      "Rifleman",
      "Brawler",
      "Combat Engineer",
      "Sniper",
    ],
    gear: [
      "Assault rifle with 3 extra magazines",
      "Pistol with 2 extra magazines",
      "Body armor",
      "2 hand grenades",
    ],
  },
  // BLUE COLLAR
  {
    name: "Driver",
    category: "Blue Collar",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "AGL C+",
    reqCheck: () => dieIndex(char.attributes.AGL) >= 2,
    skills: ["Driving", "Tech", "Recon"],
    specialtyTable: ["Biker", "Boatman", "Pilot", "Racer", "Tanker", "Mechanic"],
    gear: ["Personal vehicle", "Toolbox", "Road map"],
  },
  {
    name: "Farmer",
    category: "Blue Collar",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "None",
    reqCheck: () => true,
    skills: ["Survival", "Tech", "Stamina"],
    specialtyTable: ["Farmer", "Hunter", "Forager", "Mechanic", "Veterinarian", "Cook"],
    gear: ["Hunting rifle with 20 rounds", "Knife", "Rope (30m)"],
  },
  {
    name: "Mechanic",
    category: "Blue Collar",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "None",
    reqCheck: () => true,
    skills: ["Tech", "Driving", "Heavy Weapons"],
    specialtyTable: [
      "Mechanic",
      "Electrician",
      "Blacksmith",
      "Gunsmith",
      "Combat Engineer",
      "Communications",
    ],
    gear: ["Toolbox", "Personal vehicle", "Spare parts"],
  },
  {
    name: "Construction",
    category: "Blue Collar",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "STR C+",
    reqCheck: () => dieIndex(char.attributes.STR) >= 2,
    skills: ["Tech", "Stamina", "Heavy Weapons"],
    specialtyTable: [
      "Builder",
      "Electrician",
      "Combat Engineer",
      "Load Carrier",
      "Mechanic",
      "Blacksmith",
    ],
    gear: ["Hard hat", "Toolbox", "Work boots"],
  },
  // EDUCATION
  {
    name: "Liberal Arts",
    category: "Education",
    subcategory: "Liberal Arts",
    startingRankIndex: null,
    rankTrack: null,
    reqText: "INT C+ and EMP C+",
    reqCheck: () => dieIndex(char.attributes.INT) >= 2 && dieIndex(char.attributes.EMP) >= 2,
    skills: ["Persuasion", "Recon", "Command"],
    specialtyTable: ["Teacher", "Historian", "Linguist", "Musician", "Counselor", "Trader"],
    gear: ["Reference books", "Notebook"],
  },
  {
    name: "Sciences",
    category: "Education",
    subcategory: "Sciences",
    startingRankIndex: null,
    rankTrack: null,
    reqText: "INT B+",
    reqCheck: () => dieIndex(char.attributes.INT) >= 3,
    skills: ["Tech", "Survival", "Medical Aid"],
    specialtyTable: [
      "Chemist",
      "Scientist",
      "Computers",
      "Combat Medic",
      "General Practitioner",
      "Electrician",
    ],
    gear: ["Scientific calculator", "Reference books", "Notebook"],
  },
  // WHITE COLLAR
  {
    name: "Doctor",
    category: "White Collar",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "Two Sciences terms and EMP B+",
    reqCheck: () => countEducationSubTerms("Sciences") >= 2 && dieIndex(char.attributes.EMP) >= 3,
    skills: ["Medical Aid", "Persuasion", "Tech"],
    specialtyTable: [
      "Field Surgeon",
      "General Practitioner",
      "Combat Medic",
      "Counselor",
      "Veterinarian",
      "Chemist",
    ],
    gear: ["Medical kit", "Surgical instruments", "Reference books"],
  },
  {
    name: "Professor",
    category: "White Collar",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "Two Liberal Arts terms and INT B+",
    reqCheck: () =>
      countEducationSubTerms("Liberal Arts") >= 2 && dieIndex(char.attributes.INT) >= 3,
    skills: ["Persuasion", "Recon", "Command"],
    specialtyTable: [
      "Teacher",
      "Historian",
      "Linguist",
      "Psy Ops",
      "Intelligence Analyst",
      "Musician",
    ],
    gear: ["Reference books", "Notebook", "Briefcase"],
  },
  {
    name: "Manager",
    category: "White Collar",
    subcategory: null,
    startingRankIndex: null,
    rankTrack: null,
    reqText: "At least one Education term and EMP C+",
    reqCheck: () => countEducationTerms() >= 1 && dieIndex(char.attributes.EMP) >= 2,
    skills: ["Command", "Persuasion", "Tech"],
    specialtyTable: [
      "Logistician",
      "Quartermaster",
      "Frontline Leader",
      "Trader",
      "Teacher",
      "Tactician",
    ],
    gear: ["Briefcase", "Notebook", "Personal vehicle"],
  },
];

// At War specialty tables by category
const AT_WAR_SPECIALTIES = {
  Military: ["Rifleman", "Combat Awareness", "Scrounger", "Combat Medic", "Mechanic", "Scout"],
  "Blue Collar": ["Mechanic", "Scrounger", "Builder", "Rifleman", "Combat Awareness", "Cook"],
  "White Collar": [
    "Combat Medic",
    "Quartermaster",
    "Communications",
    "Rifleman",
    "Scrounger",
    "Logistician",
  ],
  Other: ["Rifleman", "Scrounger", "Scout", "Brawler", "Combat Awareness", "Infiltrator"],
};

// ─── STATE ───

let char = {};
let wizard = {};

function initChar() {
  char = {
    name: "",
    nationality: "",
    appearance: "",
    moralCode: "",
    bigDream: "",
    buddy: "",
    age: 18,
    attributes: { STR: "C", AGL: "C", INT: "C", EMP: "C" },
    skills: {},
    specialties: [],
    cuf: "D",
    rankIndex: null,
    rankTrack: null,
    militaryBranch: null,
    careerHistory: [],
    completedTerms: 0,
    localMilitia: false,
    warBrokenOut: false,
    drafted: false,
    radiation: 0,
    hitCapacity: 0,
    stressCapacity: 0,
    gear: [],
    lastPreWarCareer: null,
  };
}

function initWizard() {
  wizard = {
    step: "intro",
    attrIncreases: 0,
    attrDistributed: 0,
    attrDecreased: false,
    attrDecreasedAttr: null,
    attrIncreasedAttrs: {},
    selectedChildhood: null,
    selectedCareer: null,
    selectedSkills: [],
    promotionSkill: null,
    prisonForced: false,
    currentTermCareer: null,
    isFirstMilitaryTerm: false,
    atWarDraftApplied: false,
  };
}

// ─── HELPER FUNCTIONS ───

function dieIndex(level) {
  return DIE_LEVELS.indexOf(level);
}

function canIncrease(level) {
  return dieIndex(level) < 4;
}

function canDecreaseAttr(level) {
  return dieIndex(level) > 1; // Attributes cannot go below D
}

function increaseLevel(level) {
  const i = dieIndex(level);
  return i < 4 ? DIE_LEVELS[i + 1] : level;
}

function decreaseLevel(level) {
  const i = dieIndex(level);
  return i > 0 ? DIE_LEVELS[i - 1] : level;
}

function getSkillLevel(name) {
  return char.skills[name] || "F";
}

function setSkillLevel(name, level) {
  if (level === "F") {
    delete char.skills[name];
  } else {
    char.skills[name] = level;
  }
}

function increaseSkill(name) {
  const current = getSkillLevel(name);
  if (canIncrease(current)) {
    setSkillLevel(name, increaseLevel(current));
    return true;
  }
  return false;
}

function hasSpecialty(name) {
  return char.specialties.includes(name);
}

function addSpecialty(name) {
  if (!hasSpecialty(name)) {
    char.specialties.push(name);
  }
}

function countMilitaryTerms() {
  return char.careerHistory.filter(
    (h) => CAREERS.find((c) => c.name === h.career)?.category === "Military",
  ).length;
}

function countEducationTerms() {
  return char.careerHistory.filter(
    (h) => CAREERS.find((c) => c.name === h.career)?.category === "Education",
  ).length;
}

function countEducationSubTerms(sub) {
  return char.careerHistory.filter(
    (h) => CAREERS.find((c) => c.name === h.career)?.subcategory === sub,
  ).length;
}

function countCareerTerms(category) {
  return char.careerHistory.filter(
    (h) => CAREERS.find((c) => c.name === h.career)?.category === category,
  ).length;
}

function hasPrisonTerm() {
  return char.careerHistory.some((h) => h.career === "Prisoner");
}

function isFirstMilitaryTerm() {
  return countMilitaryTerms() === 0;
}

function isMilitaryOrIntelCareer(career) {
  return career.category === "Military" || career.category === "Intelligence";
}

function isNCO() {
  if (char.rankIndex === null || char.rankTrack !== "enlisted") return false;
  return char.rankIndex >= 2; // Corporal or above
}

function getRankName() {
  if (char.rankIndex === null || !char.militaryBranch) return null;
  const branch = MILITARY_BRANCHES[char.militaryBranch];
  const track = char.rankTrack === "officer" ? branch.officer : branch.enlisted;
  return track[Math.min(char.rankIndex, track.length - 1)];
}

function getAtWarSpecialtyCategory(career) {
  if (career.category === "Military") return "Military";
  if (career.category === "Blue Collar") return "Blue Collar";
  if (career.category === "Education" || career.category === "White Collar") return "White Collar";
  return "Other";
}

function rollDie(level) {
  const size = DIE_SIZES[level];
  if (size === 0) return 0;
  return roll(size);
}

function rollSkillCheck(attrLevel, skillLevel) {
  const attrRoll = rollDie(attrLevel);
  const skillRoll = rollDie(skillLevel);
  const attrSuccess = attrRoll >= 6;
  const skillSuccess = skillRoll >= 6;
  return {
    attrRoll,
    skillRoll,
    attrSuccess,
    skillSuccess,
    success: attrSuccess || skillSuccess,
  };
}

// ─── RENDERING ───

function renderSummary() {
  const el = document.getElementById("summary-card");
  const content = document.getElementById("summary-content");
  if (wizard.step === "intro") {
    el.classList.remove("visible");
    return;
  }
  el.classList.add("visible");

  let html = '<div class="summary-grid">';
  if (char.name) {
    html +=
      '<div><span class="label">Name</span><br><span class="value">' +
      escapeHtml(char.name) +
      "</span></div>";
  }
  if (char.nationality) {
    html +=
      '<div><span class="label">Nationality</span><br><span class="value">' +
      escapeHtml(char.nationality) +
      "</span></div>";
  }
  html +=
    '<div><span class="label">Age</span><br><span class="value">' + char.age + "</span></div>";
  for (const attr of ATTRIBUTES) {
    html +=
      '<div><span class="label">' +
      ATTR_NAMES[attr] +
      '</span><br><span class="value">' +
      LEVEL_LABELS[char.attributes[attr]] +
      "</span></div>";
  }
  html +=
    '<div><span class="label">Coolness Under Fire</span><br><span class="value">' +
    LEVEL_LABELS[char.cuf] +
    "</span></div>";
  if (char.rankIndex !== null) {
    const rankName = getRankName();
    if (rankName) {
      html +=
        '<div><span class="label">Rank</span><br><span class="value">' +
        escapeHtml(rankName) +
        "</span></div>";
    }
  }
  html += "</div>";

  // Skills
  const skillEntries = Object.entries(char.skills);
  if (skillEntries.length > 0) {
    html += '<div class="summary-skills"><h4>Skills</h4><div class="skill-list">';
    for (const [name, level] of skillEntries.sort((a, b) => a[0].localeCompare(b[0]))) {
      html +=
        '<span class="skill-item">' +
        escapeHtml(name) +
        ' <span class="skill-die">' +
        LEVEL_LABELS[level] +
        "</span></span>";
    }
    html += "</div></div>";
  }

  // Specialties
  if (char.specialties.length > 0) {
    html += '<div class="summary-skills"><h4>Specialties</h4><div class="skill-list">';
    for (const s of [...char.specialties].sort()) {
      html += '<span class="skill-item">' + escapeHtml(s) + "</span>";
    }
    html += "</div></div>";
  }

  content.innerHTML = html;
}

function renderWizard() {
  const card = document.getElementById("wizard-card");
  const content = document.getElementById("wizard-content");
  card.classList.add("visible");

  const renderers = {
    intro: renderIntro,
    nationality: renderNationality,
    attributes: renderAttributes,
    childhood: renderChildhood,
    childhoodSpecialty: renderChildhoodSpecialty,
    careerChoice: renderCareerChoice,
    careerSkills: renderCareerSkills,
    promotion: renderPromotion,
    promotionResult: renderPromotionResult,
    aging: renderAging,
    warCheck: renderWarCheck,
    prisonCheck: renderPrisonCheck,
    atWar: renderAtWar,
    atWarSpecialty: renderAtWarSpecialty,
    finishing: renderFinishing,
    gear: renderGear,
    radiation: renderRadiation,
    summary: renderFinalSummary,
  };

  const renderer = renderers[wizard.step];
  if (renderer) {
    renderer(content);
  }

  renderSummary();
}

// ─── STEP RENDERERS ───

function renderIntro(el) {
  el.innerHTML =
    "<h3>Life Path Character Generation</h3>" +
    "<p>This tool walks you through the Twilight: 2000 4th Edition life path character generation method. " +
    "You will build your character's backstory term by term, gaining skills and specialties along the way.</p>" +
    "<p>You start at age 18 with all attributes at C (D8). Through childhood, career terms, and the outbreak of war, " +
    "your character will develop into a unique survivor of World War III.</p>" +
    '<div class="btn-row"><button class="btn" onclick="startGeneration()">Begin</button></div>';
}

function renderNationality(el) {
  el.innerHTML =
    '<div class="step-title">Step 1: Nationality</div>' +
    "<h3>Where are you from?</h3>" +
    "<p>Choose your character's nationality and name.</p>" +
    '<div class="form-group">' +
    '<label for="nationality-input">Nationality</label>' +
    '<input type="text" class="text-input" id="nationality-input" placeholder="e.g. American, Swedish, Polish..." value="' +
    escapeHtml(char.nationality) +
    '">' +
    "</div>" +
    '<div class="form-group">' +
    '<label for="char-name">Name</label>' +
    '<input type="text" class="text-input" id="char-name" placeholder="Character name" value="' +
    escapeHtml(char.name) +
    '">' +
    "</div>" +
    (wizard.nationalityError
      ? '<p class="note-text">Please enter both a nationality and a name.</p>'
      : "") +
    '<div class="btn-row"><button class="btn" onclick="submitNationality()">Continue</button></div>';
}

function renderAttributes(el) {
  const remaining = wizard.attrIncreases - wizard.attrDistributed;
  let html =
    '<div class="step-title">Step 2: Attributes</div>' +
    "<h3>Distribute Attribute Increases</h3>" +
    "<p>You rolled <strong>" +
    wizard.attrIncreases +
    "</strong> increases (2D3). Distribute them among your attributes.</p>";

  if (!wizard.attrDecreased) {
    html +=
      '<p class="note-text">You may optionally decrease one attribute from C to D to gain +1 additional increase.</p>';
  }

  html += '<div class="remaining-display">Remaining increases: ' + remaining + "</div>";

  for (const attr of ATTRIBUTES) {
    const level = char.attributes[attr];
    const canUp = canIncrease(level) && remaining > 0;
    // C→D trade: only once, only from C
    const canDownTrade =
      level === "C" && !wizard.attrDecreased && wizard.attrDistributed <= wizard.attrIncreases;
    // Refund: can undo a previous increase
    const canDownRefund = (wizard.attrIncreasedAttrs[attr] || 0) > 0;
    const canDown = canDownTrade || canDownRefund;

    html += '<div class="attr-row">';
    html += '<span class="attr-name">' + ATTR_NAMES[attr] + "</span>";
    html += '<span class="attr-die">' + LEVEL_LABELS[level] + "</span>";
    html +=
      '<button class="attr-btn" onclick="attrDecrease(\'' +
      attr +
      "')\" " +
      (canDown ? "" : "disabled") +
      ">\u2212</button>";
    html +=
      '<button class="attr-btn" onclick="attrIncrease(\'' +
      attr +
      "')\" " +
      (canUp ? "" : "disabled") +
      ">+</button>";
    html += "</div>";
  }

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitAttributes()" ' +
    (remaining === 0 ? "" : "disabled") +
    ">Continue</button></div>";
  el.innerHTML = html;
}

function renderChildhood(el) {
  const rolled = wizard.childhoodRoll || null;
  let html =
    '<div class="step-title">Step 3: Childhood</div>' +
    "<h3>Where did you grow up?</h3>" +
    "<p>Roll D6 or choose your childhood background. This grants one skill at D.</p>";

  if (!rolled) {
    html +=
      '<div class="btn-row"><button class="btn" onclick="rollChildhood()">Roll D6</button></div>';
  } else {
    html +=
      '<div class="dice-result"><span class="dice-label">D6 =</span> <span class="dice-value">' +
      rolled +
      "</span></div>";
  }

  html += '<ul class="d6-table">';
  for (const ch of CHILDHOODS) {
    const selected = wizard.selectedChildhood === ch.roll;
    html +=
      '<li class="' +
      (selected ? "selected" : "") +
      '" onclick="selectChildhood(' +
      ch.roll +
      ')">';
    html += '<span class="d6-num">' + ch.roll + "</span>";
    html +=
      "<span><strong>" +
      escapeHtml(ch.name) +
      "</strong> \u2014 " +
      escapeHtml(ch.desc) +
      " (Skill: " +
      escapeHtml(ch.skill) +
      ")</span>";
    html += "</li>";
  }
  html += "</ul>";

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitChildhood()" ' +
    (wizard.selectedChildhood ? "" : "disabled") +
    ">Continue</button></div>";
  el.innerHTML = html;
}

function renderChildhoodSpecialty(el) {
  const ch = CHILDHOODS[wizard.selectedChildhood - 1];
  const rolled = wizard.childhoodSpecialtyRoll || null;
  let html =
    '<div class="step-title">Step 3: Childhood Specialty</div>' +
    "<h3>Childhood Specialty</h3>" +
    "<p>Roll D6 or choose a specialty from your " +
    escapeHtml(ch.name) +
    " childhood.</p>";

  if (!rolled) {
    html +=
      '<div class="btn-row"><button class="btn" onclick="rollChildhoodSpecialty()">Roll D6</button></div>';
  } else {
    html +=
      '<div class="dice-result"><span class="dice-label">D6 =</span> <span class="dice-value">' +
      rolled +
      "</span></div>";
  }

  html += '<ul class="d6-table">';
  for (let i = 0; i < 6; i++) {
    const spec = ch.specialtyTable[i];
    const selected = wizard.selectedChildhoodSpecialty === i;
    const owned = hasSpecialty(spec);
    html +=
      '<li class="' +
      (selected ? "selected" : "") +
      (owned ? " disabled" : "") +
      '" onclick="' +
      (owned ? "" : "selectChildhoodSpecialty(" + i + ")") +
      '">';
    html += '<span class="d6-num">' + (i + 1) + "</span>";
    html += "<span>" + escapeHtml(spec) + (owned ? " (already have)" : "") + "</span>";
    html += "</li>";
  }
  html += "</ul>";

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitChildhoodSpecialty()" ' +
    (wizard.selectedChildhoodSpecialty !== undefined && wizard.selectedChildhoodSpecialty !== null
      ? ""
      : "disabled") +
    ">Continue</button></div>";
  el.innerHTML = html;
}

function renderCareerChoice(el) {
  let html =
    '<div class="step-title">Step 4: Career (Term ' +
    (char.completedTerms + 1) +
    ")</div>" +
    "<h3>Choose a Career</h3>";

  if (wizard.prisonForced) {
    html +=
      '<p class="note-text">You rolled odd on the prison check. You must serve a term as a Prisoner.</p>';
    // Auto-select prisoner
    wizard.selectedCareer = CAREERS.findIndex((c) => c.name === "Prisoner");
    html += '<div class="dice-result">Forced into <strong>Prisoner</strong></div>';
    html +=
      '<div class="btn-row"><button class="btn" onclick="submitCareerChoice()">Continue</button></div>';
    el.innerHTML = html;
    return;
  }

  const categories = [
    "Military",
    "Police",
    "Crime",
    "Intelligence",
    "Blue Collar",
    "Education",
    "White Collar",
  ];

  for (const cat of categories) {
    const careersInCat = CAREERS.map((c, i) => ({ ...c, index: i })).filter(
      (c) => c.category === cat && c.name !== "Prisoner",
    );
    if (careersInCat.length === 0) continue;

    html += '<div class="career-group">';
    html += '<div class="career-group-title">' + escapeHtml(cat) + "</div>";

    for (const career of careersInCat) {
      const meetsReq = career.reqCheck();
      const selected = wizard.selectedCareer === career.index;
      const cls = "career-option" + (selected ? " selected" : "") + (!meetsReq ? " disabled" : "");

      html +=
        '<div class="' +
        cls +
        '" onclick="' +
        (meetsReq ? "selectCareer(" + career.index + ")" : "") +
        '">';
      html += '<span class="career-name">' + escapeHtml(career.name) + "</span>";
      if (career.reqText !== "None") {
        html += '<span class="career-req">(Requires: ' + escapeHtml(career.reqText) + ")</span>";
      }
      html += "</div>";
    }

    // Branch selector inside the Military group
    if (cat === "Military" && !char.militaryBranch) {
      html +=
        '<div class="form-group">' +
        '<label for="military-branch">Armed Forces Branch</label>' +
        '<select class="text-input" id="military-branch" onchange="selectMilitaryBranch()">' +
        "<option value=''>-- Select Branch --</option>";
      for (const branch of Object.keys(MILITARY_BRANCHES)) {
        const selected = wizard.selectedBranch === branch ? " selected" : "";
        html +=
          "<option value='" + branch + "'" + selected + ">" + escapeHtml(branch) + "</option>";
      }
      html += "</select></div>";
    }

    html += "</div>";
  }

  // Local militia checkbox for military careers
  if (wizard.selectedCareer !== null && CAREERS[wizard.selectedCareer]?.category === "Military") {
    html +=
      '<div class="checkbox-row">' +
      '<input type="checkbox" id="local-militia" ' +
      (char.localMilitia ? "checked" : "") +
      ' onchange="toggleLocalMilitia()">' +
      '<label for="local-militia">Local Militia (war breaks out automatically after first term)</label>' +
      "</div>";
  }

  const needsBranch =
    wizard.selectedCareer !== null &&
    CAREERS[wizard.selectedCareer]?.category === "Military" &&
    !char.militaryBranch &&
    !wizard.selectedBranch;
  const canContinue = wizard.selectedCareer !== null && !needsBranch;

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitCareerChoice()" ' +
    (canContinue ? "" : "disabled") +
    ">Continue</button></div>";
  el.innerHTML = html;
}

function renderCareerSkills(el) {
  const career = CAREERS[wizard.currentTermCareer];
  const allSkills = [...new Set([...career.skills, ...UNIVERSAL_SKILLS])];

  // NCO can also choose Command in military careers
  if (isNCO() && career.category === "Military" && !allSkills.includes("Command")) {
    allSkills.push("Command");
  }

  const mustPickRanged =
    wizard.isFirstMilitaryTerm &&
    career.category === "Military" &&
    getSkillLevel("Ranged Combat") === "F";

  // If Ranged Combat is required but not in career skills, auto-select it
  const rangedAutoSelected = mustPickRanged && !allSkills.includes("Ranged Combat");
  if (rangedAutoSelected && !wizard.selectedSkills.includes("Ranged Combat")) {
    wizard.selectedSkills = ["Ranged Combat"];
  }
  if (rangedAutoSelected && !allSkills.includes("Ranged Combat")) {
    allSkills.unshift("Ranged Combat");
  }

  let html =
    '<div class="step-title">Career: ' +
    escapeHtml(career.name) +
    "</div>" +
    "<h3>Choose Skill Increases</h3>" +
    "<p>Choose 2 skills to increase by one step each.</p>";

  if (rangedAutoSelected) {
    html +=
      '<p class="note-text">First military term: Ranged Combat has been automatically selected as your first increase. Choose 1 more skill.</p>';
  } else if (mustPickRanged && !wizard.selectedSkills.includes("Ranged Combat")) {
    html += '<p class="note-text">First military term: one increase must be Ranged Combat.</p>';
  }

  if (isNCO() && career.category === "Military") {
    html +=
      '<p class="note-text">As an NCO, Command is available as an additional skill choice.</p>';
  }

  const selectedCount = wizard.selectedSkills.length;

  for (const skillName of allSkills) {
    const currentLevel = getSkillLevel(skillName);
    const isSelected = wizard.selectedSkills.includes(skillName);
    const isLocked = rangedAutoSelected && skillName === "Ranged Combat";
    const isFull = selectedCount >= 2 && !isSelected;
    const isMaxed = !canIncrease(currentLevel);
    const disabled = isFull || isMaxed || isLocked;

    const cls =
      "skill-choice" + (isSelected ? " selected" : "") + (disabled && !isLocked ? " disabled" : "");

    html +=
      '<div class="' +
      cls +
      '" onclick="' +
      (!isLocked && (!disabled || isSelected)
        ? "toggleSkillChoice('" + escapeHtml(skillName) + "')"
        : "") +
      '">';
    html +=
      '<span class="skill-name">' +
      escapeHtml(skillName) +
      (isLocked ? " (required)" : "") +
      "</span>";
    html +=
      '<span class="skill-current">' +
      LEVEL_LABELS[currentLevel] +
      " \u2192 " +
      LEVEL_LABELS[increaseLevel(currentLevel)] +
      "</span>";
    html += "</div>";
  }

  const canContinue =
    selectedCount === 2 && (!mustPickRanged || wizard.selectedSkills.includes("Ranged Combat"));

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitCareerSkills()" ' +
    (canContinue ? "" : "disabled") +
    ">Continue</button></div>";
  el.innerHTML = html;
}

function renderPromotion(el) {
  const career = CAREERS[wizard.currentTermCareer];
  const allSkills = [...new Set([...career.skills, ...UNIVERSAL_SKILLS])];
  if (isNCO() && career.category === "Military" && !allSkills.includes("Command")) {
    allSkills.push("Command");
  }

  // Only skills that were just increased are eligible for promotion roll
  const eligibleSkills = wizard.selectedSkills.filter((s) => getSkillLevel(s) !== "F");

  let html =
    '<div class="step-title">Promotion Roll</div>' +
    "<h3>Try for Promotion</h3>" +
    "<p>Promotion represents recognition and advancement in your career. " +
    "Choose one of the skills you just improved and roll it along with its linked attribute. " +
    "A result of 6 or higher on either die means success.</p>";

  for (const skillName of eligibleSkills) {
    const skillDef = SKILLS.find((s) => s.name === skillName);
    const attrLevel = char.attributes[skillDef.attr];
    const skillLevel = getSkillLevel(skillName);
    const isSelected = wizard.promotionSkill === skillName;

    // Calculate promotion probability
    const attrSize = DIE_SIZES[attrLevel];
    const skSize = DIE_SIZES[skillLevel];
    const pAttrFail = attrSize >= 6 ? Math.min(5, attrSize - 1) / attrSize : 1.0;
    const pSkFail = skSize >= 6 ? Math.min(5, skSize - 1) / skSize : 1.0;
    const pSuccess = Math.round((1 - pAttrFail * pSkFail) * 100);

    html +=
      '<div class="skill-choice' +
      (isSelected ? " selected" : "") +
      '" onclick="selectPromotionSkill(\'' +
      escapeHtml(skillName) +
      "')\">";
    html += '<span class="skill-name">' + escapeHtml(skillName) + "</span>";
    html +=
      '<span class="skill-current">' +
      LEVEL_LABELS[attrLevel] +
      " + " +
      LEVEL_LABELS[skillLevel] +
      " \u2014 " +
      DIE_LABELS[attrLevel] +
      " + " +
      DIE_LABELS[skillLevel] +
      " (" +
      pSuccess +
      "% chance)" +
      "</span>";
    html += "</div>";
  }

  html +=
    '<div class="btn-row"><button class="btn" onclick="rollPromotion()" ' +
    (wizard.promotionSkill ? "" : "disabled") +
    ">Roll</button></div>";
  el.innerHTML = html;
}

function renderPromotionResult(el) {
  const result = wizard.promotionResult;
  const career = CAREERS[wizard.currentTermCareer];
  const isMilOrIntel = isMilitaryOrIntelCareer(career);

  const skillDef = SKILLS.find((s) => s.name === wizard.promotionSkill);
  const attrDie = DIE_LABELS[char.attributes[skillDef.attr]];
  const skillDie = DIE_LABELS[getSkillLevel(wizard.promotionSkill)];

  let html =
    '<div class="step-title">Promotion Result</div>' +
    "<h3>Promotion Roll</h3>" +
    '<div class="dice-result">';
  html +=
    "<div>Attribute die (" +
    attrDie +
    "): rolled <strong>" +
    result.attrRoll +
    "</strong> \u2014 " +
    (result.attrSuccess
      ? '<span class="success">Success!</span>'
      : '<span class="failure">Fail</span>') +
    "</div>";
  html +=
    "<div>Skill die (" +
    skillDie +
    "): rolled <strong>" +
    result.skillRoll +
    "</strong> \u2014 " +
    (result.skillSuccess
      ? '<span class="success">Success!</span>'
      : '<span class="failure">Fail</span>') +
    "</div>";
  html += "</div>";

  if (result.success) {
    html += '<p class="success"><strong>Promoted!</strong></p>';
    if (isMilOrIntel) {
      html += "<p>Coolness Under Fire increased to " + LEVEL_LABELS[char.cuf] + ".</p>";
      if (career.category === "Military" && char.rankIndex !== null) {
        const rankName = getRankName();
        if (rankName) {
          html += "<p>Rank: " + escapeHtml(rankName) + "</p>";
        }
      }
    }
    // Specialty selection
    html += "<p>Roll or choose a promotion specialty:</p>";

    if (!wizard.promotionSpecialtyRoll) {
      html +=
        '<div class="btn-row"><button class="btn" onclick="rollPromotionSpecialty()">Roll D6</button></div>';
    } else {
      html +=
        '<div class="dice-result"><span class="dice-label">D6 =</span> <span class="dice-value">' +
        wizard.promotionSpecialtyRoll +
        "</span></div>";
    }

    html += '<ul class="d6-table">';
    for (let i = 0; i < 6; i++) {
      const spec = career.specialtyTable[i];
      const selected = wizard.selectedPromotionSpecialty === i;
      const owned = hasSpecialty(spec);
      html +=
        '<li class="' +
        (selected ? "selected" : "") +
        (owned ? " disabled" : "") +
        '" onclick="' +
        (owned ? "" : "selectPromotionSpecialty(" + i + ")") +
        '">';
      html += '<span class="d6-num">' + (i + 1) + "</span>";
      html += "<span>" + escapeHtml(spec) + (owned ? " (already have)" : "") + "</span>";
      html += "</li>";
    }
    html += "</ul>";

    const canContinue =
      wizard.selectedPromotionSpecialty !== null && wizard.selectedPromotionSpecialty !== undefined;
    html +=
      '<div class="btn-row"><button class="btn" onclick="submitPromotionResult()" ' +
      (canContinue ? "" : "disabled") +
      ">Continue</button></div>";
  } else {
    html += '<p class="failure"><strong>Not promoted.</strong></p>';
    html +=
      '<div class="btn-row"><button class="btn" onclick="submitPromotionResult()">Continue</button></div>';
  }

  el.innerHTML = html;
}

function renderAging(el) {
  if (!wizard.agingRolled) {
    // Auto-roll
    wizard.agingYears = roll(6);
    wizard.preAgingAge = char.age;
    char.age += wizard.agingYears;

    // Age effect
    wizard.agingEffectRoll = null;
    wizard.agingEffectNeeded = char.completedTerms > 0;
    if (wizard.agingEffectNeeded) {
      wizard.agingEffectRoll = roll(8);
      wizard.agingEffectHit = wizard.agingEffectRoll < char.completedTerms;
    }
    wizard.agingRolled = true;
    wizard.agingAttrDecreased = false;
  }

  let html =
    '<div class="step-title">Aging</div>' +
    "<h3>Time Passes</h3>" +
    '<div class="dice-result">' +
    "<div>You rolled a D6 and got <strong>" +
    wizard.agingYears +
    "</strong>. " +
    wizard.agingYears +
    " years pass.</div>" +
    "<div>You age from " +
    wizard.preAgingAge +
    " to " +
    char.age +
    ".</div>" +
    "</div>";

  if (wizard.agingEffectNeeded) {
    html +=
      '<div class="dice-result">' +
      "<div>You rolled a D8 and got <strong>" +
      wizard.agingEffectRoll +
      "</strong> vs. " +
      char.completedTerms +
      " completed terms.</div>";
    if (wizard.agingEffectHit) {
      html += '<div class="failure">Age takes its toll! Decrease one attribute by one step.</div>';
    } else {
      html += '<div class="success">No age effects.</div>';
    }
    html += "</div>";
  }

  if (wizard.agingEffectHit && !wizard.agingAttrDecreased) {
    html += "<p>Choose an attribute to decrease:</p>";
    for (const attr of ATTRIBUTES) {
      const level = char.attributes[attr];
      const canDown = canDecreaseAttr(level);
      html += '<div class="attr-row">';
      html += '<span class="attr-name">' + ATTR_NAMES[attr] + "</span>";
      html += '<span class="attr-die">' + LEVEL_LABELS[level] + "</span>";
      html +=
        '<button class="attr-btn" onclick="agingDecreaseAttr(\'' +
        attr +
        "')\" " +
        (canDown ? "" : "disabled") +
        ">\u2212</button>";
      html += "</div>";
    }
  } else {
    html +=
      '<div class="btn-row"><button class="btn" onclick="submitAging()">Continue</button></div>';
  }

  el.innerHTML = html;
}

function renderWarCheck(el) {
  if (!wizard.warCheckRolled) {
    if (char.localMilitia && char.completedTerms === 1) {
      // Local militia: war breaks out after first term
      wizard.warRoll = 0;
      wizard.warBrokenOut = true;
    } else {
      wizard.warRoll = roll(8);
      wizard.warBrokenOut = wizard.warRoll < char.completedTerms;
    }
    wizard.warCheckRolled = true;
  }

  let html = '<div class="step-title">War Check</div>' + "<h3>Does War Break Out?</h3>";

  if (char.localMilitia && char.completedTerms === 1) {
    html +=
      '<div class="dice-result">' +
      '<div class="failure">As local militia, war breaks out automatically after your first term!</div>' +
      "</div>";
  } else {
    html +=
      '<div class="dice-result">' +
      "<div>You rolled a D8 and got <strong>" +
      wizard.warRoll +
      "</strong> vs. " +
      char.completedTerms +
      " completed terms.</div>";
    if (wizard.warBrokenOut) {
      html += '<div class="failure">War breaks out!</div>';
    } else {
      html += '<div class="success">Life continues under the shadow of the Cold War.</div>';
    }
    html += "</div>";
  }

  if (wizard.warBrokenOut) {
    char.warBrokenOut = true;
    html +=
      '<div class="btn-row"><button class="btn" onclick="goToAtWar()">Proceed to War</button></div>';
  } else {
    html +=
      '<div class="btn-row"><button class="btn" onclick="nextTerm()">Next Career Term</button></div>';
  }

  el.innerHTML = html;
}

function renderPrisonCheck(el) {
  if (!wizard.prisonCheckRolled) {
    wizard.prisonRoll = roll(6);
    wizard.prisonForced = wizard.prisonRoll % 2 === 1; // Odd = prison
    wizard.prisonCheckRolled = true;
  }

  let html =
    '<div class="step-title">Prison Check</div>' +
    "<h3>Prison Check</h3>" +
    "<p>After a crime career, roll D6. Odd result means prison next term.</p>" +
    '<div class="dice-result">' +
    "<div>You rolled a D6 and got <strong>" +
    wizard.prisonRoll +
    "</strong> (odd = prison).</div>";

  if (wizard.prisonForced) {
    html += '<div class="failure">Sent to prison.</div>';
  } else {
    html += '<div class="success">Avoided prison.</div>';
  }
  html += "</div>";

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitPrisonCheck()">Continue</button></div>';
  el.innerHTML = html;
}

function renderAtWar(el) {
  const lastCareer = char.lastPreWarCareer
    ? CAREERS.find((c) => c.name === char.lastPreWarCareer)
    : null;

  // Check draft rule
  const isDrafted =
    lastCareer &&
    lastCareer.category !== "Military" &&
    lastCareer.category !== "Intelligence" &&
    !char.localMilitia;

  if (isDrafted && !wizard.atWarDraftApplied) {
    char.drafted = true;
    wizard.atWarDraftApplied = true;
  }

  const mustPickRanged = char.drafted && getSkillLevel("Ranged Combat") === "F";

  let html =
    '<div class="step-title">At War</div>' +
    "<h3>The War</h3>" +
    "<p>Choose 2 different skills to increase by one step each.</p>";

  if (char.drafted) {
    html += '<p class="note-text">You were drafted! You receive Combat Arms gear.</p>';
    if (mustPickRanged) {
      html +=
        '<p class="note-text">As a draftee, Ranged Combat has been automatically selected as your first increase. Choose 1 more skill.</p>';
    }
  }

  // Auto-select Ranged Combat for draftees (like first military term)
  if (mustPickRanged && !wizard.selectedSkills.includes("Ranged Combat")) {
    wizard.selectedSkills = ["Ranged Combat"];
  }

  // At War: any skill is available
  const allSkillNames = SKILLS.map((s) => s.name);
  const selectedCount = wizard.selectedSkills.length;

  for (const skillName of allSkillNames) {
    const currentLevel = getSkillLevel(skillName);
    const isSelected = wizard.selectedSkills.includes(skillName);
    const isLocked = mustPickRanged && skillName === "Ranged Combat";
    const isFull = selectedCount >= 2 && !isSelected;
    const isMaxed = !canIncrease(currentLevel);
    const disabled = isFull || isMaxed || isLocked;

    const cls =
      "skill-choice" + (isSelected ? " selected" : "") + (disabled && !isLocked ? " disabled" : "");

    html +=
      '<div class="' +
      cls +
      '" onclick="' +
      (!isLocked && (!disabled || isSelected)
        ? "toggleSkillChoice('" + escapeHtml(skillName) + "')"
        : "") +
      '">';
    html +=
      '<span class="skill-name">' +
      escapeHtml(skillName) +
      (isLocked ? " (required)" : "") +
      "</span>";
    html +=
      '<span class="skill-current">' +
      LEVEL_LABELS[currentLevel] +
      " \u2192 " +
      LEVEL_LABELS[increaseLevel(currentLevel)] +
      "</span>";
    html += "</div>";
  }

  const canContinue =
    selectedCount === 2 && (!mustPickRanged || wizard.selectedSkills.includes("Ranged Combat"));

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitAtWarSkills()" ' +
    (canContinue ? "" : "disabled") +
    ">Continue</button></div>";
  el.innerHTML = html;
}

function renderAtWarSpecialty(el) {
  const lastCareer = char.lastPreWarCareer
    ? CAREERS.find((c) => c.name === char.lastPreWarCareer)
    : null;
  const cat = lastCareer ? getAtWarSpecialtyCategory(lastCareer) : "Other";
  const table = AT_WAR_SPECIALTIES[cat];

  let html =
    '<div class="step-title">At War Specialty</div>' +
    "<h3>War Specialty</h3>" +
    "<p>Roll or choose a specialty from the " +
    escapeHtml(cat) +
    " column.</p>";

  if (!wizard.atWarSpecialtyRoll) {
    html +=
      '<div class="btn-row"><button class="btn" onclick="rollAtWarSpecialty()">Roll D6</button></div>';
  } else {
    html +=
      '<div class="dice-result"><span class="dice-label">D6 =</span> <span class="dice-value">' +
      wizard.atWarSpecialtyRoll +
      "</span></div>";
  }

  html += '<ul class="d6-table">';
  for (let i = 0; i < 6; i++) {
    const spec = table[i];
    const selected = wizard.selectedAtWarSpecialty === i;
    const owned = hasSpecialty(spec);
    html +=
      '<li class="' +
      (selected ? "selected" : "") +
      (owned ? " disabled" : "") +
      '" onclick="' +
      (owned ? "" : "selectAtWarSpecialty(" + i + ")") +
      '">';
    html += '<span class="d6-num">' + (i + 1) + "</span>";
    html += "<span>" + escapeHtml(spec) + (owned ? " (already have)" : "") + "</span>";
    html += "</li>";
  }
  html += "</ul>";

  const canContinue =
    wizard.selectedAtWarSpecialty !== null && wizard.selectedAtWarSpecialty !== undefined;
  html +=
    '<div class="btn-row"><button class="btn" onclick="submitAtWarSpecialty()" ' +
    (canContinue ? "" : "disabled") +
    ">Continue</button></div>";
  el.innerHTML = html;
}

function renderFinishing(el) {
  // Calculate capacities
  char.hitCapacity = Math.ceil(
    (DIE_SIZES[char.attributes.STR] + DIE_SIZES[char.attributes.AGL]) / 4,
  );
  char.stressCapacity = Math.ceil(
    (DIE_SIZES[char.attributes.INT] + DIE_SIZES[char.attributes.EMP]) / 4,
  );

  let html =
    '<div class="step-title">Step 5: Finishing Touches</div>' +
    "<h3>Finishing Touches</h3>" +
    '<div class="dice-result">' +
    "<div>Hit Capacity: <strong>" +
    char.hitCapacity +
    "</strong> (STR " +
    LEVEL_LABELS[char.attributes.STR] +
    " + AGL " +
    LEVEL_LABELS[char.attributes.AGL] +
    " / 4, rounded up)</div>" +
    "<div>Stress Capacity: <strong>" +
    char.stressCapacity +
    "</strong> (INT " +
    LEVEL_LABELS[char.attributes.INT] +
    " + EMP " +
    LEVEL_LABELS[char.attributes.EMP] +
    " / 4, rounded up)</div>" +
    "</div>" +
    '<div class="form-group">' +
    '<label for="char-appearance">Appearance</label>' +
    '<textarea class="text-input" id="char-appearance" placeholder="What does your character look like?">' +
    escapeHtml(char.appearance) +
    "</textarea>" +
    "</div>" +
    '<div class="form-group">' +
    '<label for="char-moral">Moral Code</label>' +
    '<input type="text" class="text-input" id="char-moral" placeholder="What does your character believe in?" value="' +
    escapeHtml(char.moralCode) +
    '">' +
    "</div>" +
    '<div class="form-group">' +
    '<label for="char-dream">Big Dream</label>' +
    '<input type="text" class="text-input" id="char-dream" placeholder="What does your character want more than anything?" value="' +
    escapeHtml(char.bigDream) +
    '">' +
    "</div>" +
    '<div class="form-group">' +
    '<label for="char-buddy">Buddy (another PC)</label>' +
    '<input type="text" class="text-input" id="char-buddy" placeholder="Who does your character feel closest to?" value="' +
    escapeHtml(char.buddy) +
    '">' +
    "</div>" +
    '<div class="btn-row"><button class="btn" onclick="submitFinishing()">Continue</button></div>';
  el.innerHTML = html;
}

function renderGear(el) {
  // Determine gear from last pre-war career
  let gearSource = char.lastPreWarCareer || "Combat Arms";
  const career = CAREERS.find((c) => c.name === gearSource);
  let gearList = career ? career.gear : [];

  // If drafted, use Combat Arms gear
  if (char.drafted) {
    const combatArms = CAREERS.find((c) => c.name === "Combat Arms");
    gearList = combatArms.gear;
    gearSource = "Combat Arms (drafted)";
  }

  char.gear = gearList;

  let html =
    '<div class="step-title">Step 6: Gear</div>' +
    "<h3>Starting Gear</h3>" +
    "<p>From your final career: <strong>" +
    escapeHtml(gearSource) +
    "</strong></p>" +
    '<ul class="gear-list">';
  for (const item of gearList) {
    html += "<li>" + escapeHtml(item) + "</li>";
  }
  html += "</ul>";

  html +=
    '<div class="btn-row"><button class="btn" onclick="goToRadiation()">Continue</button></div>';
  el.innerHTML = html;
}

function renderRadiation(el) {
  if (!wizard.radiationRolled) {
    char.radiation = roll(6);
    wizard.radiationRolled = true;
  }

  let html =
    '<div class="step-title">Step 7: Radiation</div>' +
    "<h3>Radiation Dose</h3>" +
    "<p>Roll D6 for your starting radiation dose.</p>" +
    '<div class="dice-result">' +
    "<div>You rolled a D6 and got <strong>" +
    char.radiation +
    "</strong>. Starting radiation: " +
    char.radiation +
    " rads.</div>" +
    "</div>" +
    '<div class="btn-row"><button class="btn" onclick="goToFinalSummary()">View Character Sheet</button></div>';
  el.innerHTML = html;
}

function renderFinalSummary(el) {
  let html =
    '<div class="step-title">Character Sheet</div>' +
    "<h3>" +
    escapeHtml(char.name || "Unnamed Character") +
    "</h3>";

  // Basic info
  html += '<div class="sheet-section">';
  html += "<h4>Personal Details</h4>";
  html += '<div class="summary-grid">';
  if (char.nationality)
    html +=
      "<div><span class='label'>Nationality</span><br>" + escapeHtml(char.nationality) + "</div>";
  html += "<div><span class='label'>Age</span><br>" + char.age + "</div>";
  if (char.rankIndex !== null) {
    const rankName = getRankName();
    if (rankName)
      html += "<div><span class='label'>Rank</span><br>" + escapeHtml(rankName) + "</div>";
  }
  if (char.moralCode)
    html +=
      "<div><span class='label'>Moral Code</span><br>" + escapeHtml(char.moralCode) + "</div>";
  if (char.bigDream)
    html += "<div><span class='label'>Big Dream</span><br>" + escapeHtml(char.bigDream) + "</div>";
  if (char.buddy)
    html += "<div><span class='label'>Buddy</span><br>" + escapeHtml(char.buddy) + "</div>";
  html += "</div>";
  if (char.appearance) {
    html += "<p><span class='label'>Appearance:</span> " + escapeHtml(char.appearance) + "</p>";
  }
  html += "</div>";

  // Attributes
  html += '<div class="sheet-section">';
  html += "<h4>Attributes</h4>";
  html += '<div class="sheet-attrs">';
  for (const attr of ATTRIBUTES) {
    html +=
      '<div class="sheet-attr"><div class="attr-label">' +
      attr +
      '</div><div class="attr-val">' +
      LEVEL_LABELS[char.attributes[attr]] +
      "</div></div>";
  }
  html += "</div>";
  html += "</div>";

  // Derived stats
  html += '<div class="sheet-section">';
  html += "<h4>Derived Stats</h4>";
  html += '<div class="sheet-attrs">';
  html +=
    '<div class="sheet-attr"><div class="attr-label">Hit Cap.</div><div class="attr-val">' +
    char.hitCapacity +
    "</div></div>";
  html +=
    '<div class="sheet-attr"><div class="attr-label">Stress Cap.</div><div class="attr-val">' +
    char.stressCapacity +
    "</div></div>";
  html +=
    '<div class="sheet-attr"><div class="attr-label">Coolness Under Fire</div><div class="attr-val">' +
    LEVEL_LABELS[char.cuf] +
    "</div></div>";
  html +=
    '<div class="sheet-attr"><div class="attr-label">Radiation</div><div class="attr-val">' +
    char.radiation +
    "</div></div>";
  html += "</div>";
  html += "</div>";

  // Skills
  html += '<div class="sheet-section">';
  html += "<h4>Skills</h4>";
  html += '<div class="sheet-skills-grid">';
  for (const skill of SKILLS) {
    const level = getSkillLevel(skill.name);
    if (level !== "F") {
      html +=
        '<div class="sheet-skill"><span class="sk-name">' +
        escapeHtml(skill.name) +
        ' <span style="color:var(--text-muted);font-size:0.8rem">(' +
        skill.attr +
        ')</span></span><span class="sk-die">' +
        LEVEL_LABELS[level] +
        "</span></div>";
    }
  }
  html += "</div>";
  html += "</div>";

  // Specialties
  if (char.specialties.length > 0) {
    html += '<div class="sheet-section">';
    html += "<h4>Specialties</h4>";
    html += '<div class="skill-list">';
    for (const s of [...char.specialties].sort()) {
      html += '<span class="skill-item">' + escapeHtml(s) + "</span>";
    }
    html += "</div>";
    html += "</div>";
  }

  // Gear
  if (char.gear.length > 0) {
    html += '<div class="sheet-section">';
    html += "<h4>Gear</h4>";
    html += '<ul class="gear-list">';
    for (const item of char.gear) {
      html += "<li>" + escapeHtml(item) + "</li>";
    }
    html += "</ul>";
    html += "</div>";
  }

  html += '<p class="note-text">To create a new character, refresh the page.</p>';
  el.innerHTML = html;
}

// ─── WIZARD ACTIONS ───

function startGeneration() {
  initChar();
  initWizard();
  wizard.step = "nationality";
  renderWizard();
}

function submitNationality() {
  const input = document.getElementById("nationality-input");
  char.nationality = input.value.trim();
  const nameInput = document.getElementById("char-name");
  if (nameInput) {
    char.name = nameInput.value.trim();
  }
  if (!char.nationality || !char.name) {
    wizard.nationalityError = true;
    renderWizard();
    return;
  }
  wizard.nationalityError = false;
  wizard.step = "attributes";
  wizard.attrIncreases = rollD3() + rollD3();
  wizard.attrDistributed = 0;
  wizard.attrDecreased = false;
  wizard.attrDecreasedAttr = null;
  wizard.attrIncreasedAttrs = {};
  // Reset attributes to C
  for (const attr of ATTRIBUTES) {
    char.attributes[attr] = "C";
  }
  renderWizard();
}

function attrIncrease(attr) {
  const remaining = wizard.attrIncreases - wizard.attrDistributed;
  if (remaining <= 0) return;
  if (!canIncrease(char.attributes[attr])) return;
  char.attributes[attr] = increaseLevel(char.attributes[attr]);
  wizard.attrDistributed++;
  wizard.attrIncreasedAttrs[attr] = (wizard.attrIncreasedAttrs[attr] || 0) + 1;
  // Auto-undo C→D trade if the traded attr is back to C
  if (attr === wizard.attrDecreasedAttr && char.attributes[attr] === "C") {
    wizard.attrDistributed--;
    wizard.attrIncreasedAttrs[attr]--;
    wizard.attrDecreased = false;
    wizard.attrIncreases--;
    wizard.attrDecreasedAttr = null;
  }
  renderWizard();
}

function attrDecrease(attr) {
  // Refund: undo a previous increase
  if ((wizard.attrIncreasedAttrs[attr] || 0) > 0) {
    char.attributes[attr] = decreaseLevel(char.attributes[attr]);
    wizard.attrDistributed--;
    wizard.attrIncreasedAttrs[attr]--;
    // If this fully reverses the C→D trade, undo it and restore to C
    if (attr === wizard.attrDecreasedAttr && wizard.attrIncreasedAttrs[attr] === 0) {
      char.attributes[attr] = "C";
      wizard.attrDecreased = false;
      wizard.attrIncreases--;
      wizard.attrDecreasedAttr = null;
    }
    renderWizard();
    return;
  }
  // C→D trade: only allow decreasing from C to D for the optional trade
  if (char.attributes[attr] !== "C" || wizard.attrDecreased) return;
  char.attributes[attr] = "D";
  wizard.attrIncreases++;
  wizard.attrDecreased = true;
  wizard.attrDecreasedAttr = attr;
  renderWizard();
}

function submitAttributes() {
  if (wizard.attrIncreases - wizard.attrDistributed !== 0) return;
  wizard.step = "childhood";
  wizard.childhoodRoll = null;
  wizard.selectedChildhood = null;
  renderWizard();
}

function rollChildhood() {
  wizard.childhoodRoll = roll(6);
  wizard.selectedChildhood = wizard.childhoodRoll;
  renderWizard();
}

function selectChildhood(n) {
  wizard.selectedChildhood = n;
  renderWizard();
}

function submitChildhood() {
  if (!wizard.selectedChildhood) return;
  const ch = CHILDHOODS[wizard.selectedChildhood - 1];
  // Grant skill at D
  if (getSkillLevel(ch.skill) === "F") {
    setSkillLevel(ch.skill, "D");
  } else {
    // If already have it, increase by one step
    increaseSkill(ch.skill);
  }

  wizard.step = "childhoodSpecialty";
  wizard.childhoodSpecialtyRoll = null;
  wizard.selectedChildhoodSpecialty = null;
  renderWizard();
}

function rollChildhoodSpecialty() {
  const ch = CHILDHOODS[wizard.selectedChildhood - 1];
  wizard.childhoodSpecialtyRoll = roll(6);
  const idx = wizard.childhoodSpecialtyRoll - 1;
  wizard.selectedChildhoodSpecialty = hasSpecialty(ch.specialtyTable[idx]) ? null : idx;
  renderWizard();
}

function selectChildhoodSpecialty(i) {
  wizard.selectedChildhoodSpecialty = i;
  renderWizard();
}

function submitChildhoodSpecialty() {
  if (wizard.selectedChildhoodSpecialty === null || wizard.selectedChildhoodSpecialty === undefined)
    return;
  const ch = CHILDHOODS[wizard.selectedChildhood - 1];
  const spec = ch.specialtyTable[wizard.selectedChildhoodSpecialty];
  addSpecialty(spec);

  // Move to first career
  wizard.step = "careerChoice";
  wizard.selectedCareer = null;
  wizard.prisonForced = false;
  renderWizard();
}

function selectCareer(index) {
  wizard.selectedCareer = index;
  renderWizard();
}

function toggleLocalMilitia() {
  char.localMilitia = document.getElementById("local-militia").checked;
}

function selectMilitaryBranch() {
  const sel = document.getElementById("military-branch");
  wizard.selectedBranch = sel.value || null;
  renderWizard();
}

function submitCareerChoice() {
  if (wizard.selectedCareer === null) return;
  const career = CAREERS[wizard.selectedCareer];
  wizard.currentTermCareer = wizard.selectedCareer;
  wizard.isFirstMilitaryTerm = career.category === "Military" && isFirstMilitaryTerm();

  // Commit military branch selection
  if (wizard.selectedBranch && !char.militaryBranch) {
    char.militaryBranch = wizard.selectedBranch;
    wizard.selectedBranch = null;
  }

  // Set rank if this is first time in this rank track
  if (career.rankTrack && char.rankIndex === null) {
    char.rankIndex = career.startingRankIndex;
    char.rankTrack = career.rankTrack;
  } else if (career.rankTrack && career.rankTrack !== char.rankTrack) {
    // Switching track (e.g., enlisted to officer)
    char.rankIndex = career.startingRankIndex;
    char.rankTrack = career.rankTrack;
  }

  // Track last pre-war career
  char.lastPreWarCareer = career.name;

  wizard.step = "careerSkills";
  wizard.selectedSkills = [];
  renderWizard();
}

function toggleSkillChoice(skillName) {
  const idx = wizard.selectedSkills.indexOf(skillName);
  if (idx >= 0) {
    wizard.selectedSkills.splice(idx, 1);
  } else if (wizard.selectedSkills.length < 2) {
    wizard.selectedSkills.push(skillName);
  }
  renderWizard();
}

function submitCareerSkills() {
  if (wizard.selectedSkills.length !== 2) return;

  // Apply skill increases
  for (const skillName of wizard.selectedSkills) {
    increaseSkill(skillName);
  }

  // Go to promotion
  wizard.step = "promotion";
  wizard.promotionSkill = null;
  wizard.promotionResult = null;
  wizard.promotionSpecialtyRoll = null;
  wizard.selectedPromotionSpecialty = null;

  renderWizard();
}

function selectPromotionSkill(skillName) {
  wizard.promotionSkill = skillName;
  renderWizard();
}

function rollPromotion() {
  if (!wizard.promotionSkill) return;
  const skillDef = SKILLS.find((s) => s.name === wizard.promotionSkill);
  const attrLevel = char.attributes[skillDef.attr];
  const skillLevel = getSkillLevel(wizard.promotionSkill);

  const result = rollSkillCheck(attrLevel, skillLevel);
  wizard.promotionResult = result;

  if (result.success) {
    const career = CAREERS[wizard.currentTermCareer];
    // CUF increase for military/intelligence
    if (isMilitaryOrIntelCareer(career)) {
      if (canIncrease(char.cuf)) {
        char.cuf = increaseLevel(char.cuf);
      }
    }
    // Rank increase for military
    if (career.category === "Military" && char.rankIndex !== null && char.militaryBranch) {
      const branch = MILITARY_BRANCHES[char.militaryBranch];
      const track = char.rankTrack === "officer" ? branch.officer : branch.enlisted;
      if (char.rankIndex < track.length - 1) {
        char.rankIndex++;
      }
    }
  }

  wizard.step = "promotionResult";
  renderWizard();
}

function rollPromotionSpecialty() {
  const career = CAREERS[wizard.currentTermCareer];
  wizard.promotionSpecialtyRoll = roll(6);
  const idx = wizard.promotionSpecialtyRoll - 1;
  wizard.selectedPromotionSpecialty = hasSpecialty(career.specialtyTable[idx]) ? null : idx;
  renderWizard();
}

function selectPromotionSpecialty(i) {
  wizard.selectedPromotionSpecialty = i;

  renderWizard();
}

function submitPromotionResult() {
  const result = wizard.promotionResult;
  const career = CAREERS[wizard.currentTermCareer];
  let specialty = null;

  if (result.success) {
    specialty = career.specialtyTable[wizard.selectedPromotionSpecialty];
    addSpecialty(specialty);
  }

  // Record career history
  char.completedTerms++;
  char.careerHistory.push({
    term: char.completedTerms,
    career: career.name,
    promoted: result.success,
    specialty: specialty,
    yearsAdded: 0, // Will be filled in aging step
  });

  // Go to aging
  wizard.step = "aging";
  wizard.agingRolled = false;
  renderWizard();
}

function agingDecreaseAttr(attr) {
  char.attributes[attr] = decreaseLevel(char.attributes[attr]);
  wizard.agingAttrDecreased = true;
  // Update the career history with years
  if (char.careerHistory.length > 0) {
    char.careerHistory[char.careerHistory.length - 1].yearsAdded = wizard.agingYears;
  }
  renderWizard();
}

function submitAging() {
  // Update years in career history
  if (char.careerHistory.length > 0) {
    char.careerHistory[char.careerHistory.length - 1].yearsAdded = wizard.agingYears;
  }

  // Check if last career was crime → prison check
  const lastCareer = CAREERS[wizard.currentTermCareer];
  if (lastCareer.category === "Crime" && lastCareer.name !== "Prisoner") {
    wizard.step = "prisonCheck";
    wizard.prisonCheckRolled = false;
  } else {
    wizard.step = "warCheck";
    wizard.warCheckRolled = false;
  }
  renderWizard();
}

function submitPrisonCheck() {
  if (wizard.prisonForced) {
    // Force prison career next
    wizard.step = "careerChoice";
    wizard.selectedCareer = null;
    wizard.prisonForced = true;
  } else {
    wizard.step = "warCheck";
    wizard.warCheckRolled = false;
  }
  renderWizard();
}

function nextTerm() {
  wizard.step = "careerChoice";
  wizard.selectedCareer = null;
  wizard.prisonForced = false;
  renderWizard();
}

function goToAtWar() {
  wizard.step = "atWar";
  wizard.selectedSkills = [];
  wizard.atWarDraftApplied = false;
  renderWizard();
}

function submitAtWarSkills() {
  if (wizard.selectedSkills.length !== 2) return;

  // Apply skill increases
  for (const skillName of wizard.selectedSkills) {
    increaseSkill(skillName);
  }

  // Record At War in history
  char.careerHistory.push({
    term: char.completedTerms + 1,
    career: "At War" + (char.drafted ? " (Drafted)" : ""),
    promoted: false,
    specialty: null,
    yearsAdded: 0,
  });

  wizard.step = "atWarSpecialty";
  wizard.atWarSpecialtyRoll = null;
  wizard.selectedAtWarSpecialty = null;
  renderWizard();
}

function rollAtWarSpecialty() {
  const lastCareer = char.lastPreWarCareer
    ? CAREERS.find((c) => c.name === char.lastPreWarCareer)
    : null;
  const cat = lastCareer ? getAtWarSpecialtyCategory(lastCareer) : "Other";
  const table = AT_WAR_SPECIALTIES[cat];
  wizard.atWarSpecialtyRoll = roll(6);
  const idx = wizard.atWarSpecialtyRoll - 1;
  wizard.selectedAtWarSpecialty = hasSpecialty(table[idx]) ? null : idx;
  renderWizard();
}

function selectAtWarSpecialty(i) {
  wizard.selectedAtWarSpecialty = i;
  renderWizard();
}

function submitAtWarSpecialty() {
  if (wizard.selectedAtWarSpecialty === null || wizard.selectedAtWarSpecialty === undefined) return;

  const lastCareer = char.lastPreWarCareer
    ? CAREERS.find((c) => c.name === char.lastPreWarCareer)
    : null;
  const cat = lastCareer ? getAtWarSpecialtyCategory(lastCareer) : "Other";
  const table = AT_WAR_SPECIALTIES[cat];
  const spec = table[wizard.selectedAtWarSpecialty];
  addSpecialty(spec);

  // Update history
  if (char.careerHistory.length > 0) {
    char.careerHistory[char.careerHistory.length - 1].specialty = spec;
  }

  wizard.step = "finishing";
  renderWizard();
}

function submitFinishing() {
  char.appearance = document.getElementById("char-appearance").value.trim();
  char.moralCode = document.getElementById("char-moral").value.trim();
  char.bigDream = document.getElementById("char-dream").value.trim();
  char.buddy = document.getElementById("char-buddy").value.trim();

  wizard.step = "gear";
  renderWizard();
}

function goToRadiation() {
  wizard.step = "radiation";
  wizard.radiationRolled = false;
  renderWizard();
}

function goToFinalSummary() {
  wizard.step = "summary";
  // Hide summary card since it's part of the final sheet now
  document.getElementById("summary-card").classList.remove("visible");
  renderWizard();
}

// ─── INIT ───

initChar();
initWizard();
renderWizard();
