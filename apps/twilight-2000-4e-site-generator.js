// Dice helpers
function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollD3() {
  return Math.ceil(roll(6) / 2);
}

function rollD100() {
  return roll(100);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatD100(n) {
  if (n === 100) return "00";
  return String(n).padStart(2, "0");
}

function lookupTable(table, rolled) {
  for (const row of table) {
    if (rolled >= row.min && rolled <= row.max) return row;
  }
  return table[table.length - 1];
}

// ─── TABLE DATA ───

const RURAL_SITES = [
  { min: 1, max: 9, value: "Village" },
  { min: 10, max: 14, value: "Roadblock" },
  { min: 15, max: 20, value: "Outpost" },
  { min: 21, max: 24, value: "Military base" },
  { min: 25, max: 27, value: "Factory" },
  { min: 28, max: 36, value: "Farmstead" },
  { min: 37, max: 40, value: "Camping site" },
  { min: 41, max: 44, value: "Gas station" },
  { min: 45, max: 50, value: "Estate" },
  { min: 51, max: 54, value: "School" },
  { min: 55, max: 58, value: "Supermarket" },
  { min: 59, max: 60, value: "Radio tower" },
  { min: 61, max: 62, value: "Field hospital" },
  { min: 63, max: 67, value: "Church" },
  { min: 68, max: 68, value: "Castle" },
  { min: 69, max: 73, value: "Caravan park" },
  { min: 74, max: 77, value: "Trading post" },
  { min: 78, max: 79, value: "Airfield" },
  { min: 80, max: 80, value: "Prison" },
  { min: 81, max: 90, value: "Camp" },
  { min: 91, max: 100, value: null }, // Roll twice
];

const URBAN_SITES = [
  { min: 1, max: 3, value: "Police station" },
  { min: 4, max: 10, value: "Grocery store" },
  { min: 11, max: 15, value: "Mall" },
  { min: 16, max: 18, value: "Garage" },
  { min: 19, max: 21, value: "Restaurant" },
  { min: 22, max: 24, value: "Hospital" },
  { min: 25, max: 26, value: "Jail" },
  { min: 27, max: 33, value: "School" },
  { min: 34, max: 37, value: "Military base" },
  { min: 38, max: 41, value: "Night club" },
  { min: 42, max: 47, value: "Gated community" },
  { min: 48, max: 50, value: "Movie theater" },
  { min: 51, max: 53, value: "Museum" },
  { min: 54, max: 60, value: "Office complex" },
  { min: 61, max: 64, value: "Park" },
  { min: 65, max: 66, value: "Amusement park" },
  { min: 67, max: 69, value: "Road tunnel" },
  { min: 70, max: 73, value: "Sports hall" },
  { min: 74, max: 75, value: "Stadium" },
  { min: 76, max: 79, value: "Theater" },
  { min: 80, max: 84, value: "Church" },
  { min: 85, max: 88, value: "Train station" },
  { min: 89, max: 94, value: "Bomb shelter" },
  { min: 95, max: 100, value: null }, // Roll twice
];

const CONDITIONS = [
  { min: 1, max: 2, value: "Ruin" },
  { min: 3, max: 4, value: "Decrepit" },
  { min: 5, max: 7, value: "Patched up" },
  { min: 8, max: 9, value: "Well kept" },
  { min: 10, max: 10, value: "Pristine" },
];

const FACTIONS = [
  { min: 1, max: 10, value: "Civilian (locals)", rollAllegiance: false },
  { min: 11, max: 17, value: "Civilian (criminals)", rollAllegiance: false },
  { min: 18, max: 23, value: "Civilian (refugees)", rollAllegiance: false },
  { min: 24, max: 27, value: "Civilian (police)", rollAllegiance: false },
  { min: 28, max: 34, value: "Marauder (thugs)", rollAllegiance: false },
  { min: 35, max: 40, value: "Marauder (militia)", rollAllegiance: false },
  {
    min: 41,
    max: 43,
    value: "Marauder (revolutionaries)",
    rollAllegiance: true,
  },
  { min: 44, max: 52, value: "Marauder (warlord)", rollAllegiance: false },
  { min: 53, max: 70, value: "Military (soldiers)", rollAllegiance: true },
  { min: 71, max: 80, value: "Military (deserters)", rollAllegiance: false },
  { min: 81, max: 85, value: "Special forces", rollAllegiance: true },
  { min: 86, max: 89, value: "Intelligence agency", rollAllegiance: true },
  { min: 90, max: 100, value: null }, // Roll twice
];

const ALLEGIANCES = [
  { min: 1, max: 33, value: "National" },
  { min: 34, max: 65, value: "US" },
  { min: 66, max: 90, value: "Soviet" },
  { min: 91, max: 100, value: "Other nation" },
];

const POPULATIONS = [
  { min: 1, max: 1, value: "A single individual", detail: null },
  { min: 2, max: 3, value: "Handful", detail: "D6+1" },
  { min: 4, max: 7, value: "Group", detail: "1D10+8" },
  { min: 8, max: 9, value: "Band", detail: "2D10+10" },
  { min: 10, max: 10, value: "Colony/unit", detail: "D100+20" },
];

const CHARACTERISTICS = [
  { min: 1, max: 2, value: "Strong smell" },
  { min: 3, max: 4, value: "Burning fires" },
  { min: 5, max: 7, value: "Reinforced barricades" },
  { min: 8, max: 9, value: "Traps" },
  { min: 10, max: 11, value: "Graffiti" },
  { min: 12, max: 13, value: "Mural paintings" },
  { min: 14, max: 15, value: "Graves" },
  { min: 16, max: 17, value: "Dogs" },
  { min: 18, max: 19, value: "Windy" },
  { min: 20, max: 21, value: "Muddy" },
  { min: 22, max: 23, value: "Lots of birds" },
  { min: 24, max: 25, value: "Roaming cattle" },
  { min: 26, max: 27, value: "Loud music" },
  { min: 28, max: 29, value: "Propaganda leaflets" },
  { min: 30, max: 33, value: "Boarded windows" },
  { min: 34, max: 35, value: "Minefield" },
  { min: 36, max: 39, value: "Car wrecks" },
  { min: 40, max: 40, value: "Crashed aircraft" },
  { min: 41, max: 42, value: "Prisoners on display" },
  { min: 43, max: 45, value: "Sandbags" },
  { min: 46, max: 47, value: "Trenches" },
  { min: 48, max: 49, value: "Signs of recent battle" },
  { min: 50, max: 51, value: "Funeral pyre" },
  { min: 52, max: 53, value: "Religious symbol" },
  { min: 54, max: 55, value: "Statue" },
  { min: 56, max: 57, value: "Covered in dust" },
  { min: 58, max: 59, value: "Shell holes" },
  { min: 60, max: 61, value: "Tank wreck" },
  { min: 62, max: 64, value: "Barbed wire" },
  { min: 65, max: 68, value: "Trickling rain" },
  { min: 69, max: 70, value: "Charred trees" },
  { min: 71, max: 72, value: "Tattered flag" },
  { min: 73, max: 74, value: "Mirrors" },
  { min: 75, max: 76, value: "Floodlight" },
  { min: 77, max: 78, value: "Covered in soot" },
  { min: 79, max: 80, value: "Warning signs" },
  { min: 81, max: 82, value: "Abandoned toys" },
  { min: 83, max: 84, value: "Droning sound" },
  { min: 85, max: 86, value: "Fallen power line" },
  { min: 87, max: 88, value: "Burned bodies" },
  { min: 89, max: 90, value: "Dead animals" },
  { min: 91, max: 92, value: "Bus wreck" },
  { min: 93, max: 94, value: "Container" },
  { min: 95, max: 96, value: "Broken fountain" },
  { min: 97, max: 98, value: "Broken glass" },
  { min: 99, max: 100, value: "Smoke" },
];

const SITUATIONS = [
  { min: 1, max: 8, value: "Power struggle" },
  { min: 9, max: 14, value: "Famine" },
  { min: 15, max: 20, value: "Lack of resources" },
  { min: 21, max: 24, value: "Disease" },
  {
    min: 25,
    max: 32,
    value: "Harassed by (roll faction)",
    rollFaction: true,
  },
  { min: 33, max: 36, value: "Escape" },
  { min: 37, max: 41, value: "Spy hunt" },
  { min: 42, max: 45, value: "Diplomatic meeting" },
  { min: 46, max: 55, value: "Feud" },
  { min: 56, max: 61, value: "Besieged (roll faction)", rollFaction: true },
  { min: 62, max: 65, value: "Missing people" },
  { min: 66, max: 71, value: "Internal strife" },
  { min: 72, max: 75, value: "Important prisoner" },
  { min: 76, max: 79, value: "Sniper" },
  { min: 80, max: 83, value: "Missing leader" },
  { min: 84, max: 88, value: "Bad water" },
  { min: 89, max: 92, value: "Valuable find" },
  { min: 93, max: 95, value: "Killer on the loose" },
  { min: 96, max: 98, value: "Theft of stockpiles" },
  { min: 99, max: 100, value: "Forbidden love" },
];

const NPCS = [
  { min: 1, max: 2, npc: "Priest", motivation: "Status" },
  { min: 3, max: 4, npc: "Artist", motivation: "Work" },
  { min: 5, max: 7, npc: "Officer", motivation: "Duty" },
  { min: 8, max: 10, npc: "Scout", motivation: "Money" },
  { min: 11, max: 13, npc: "Thief", motivation: "Leisure" },
  { min: 14, max: 16, npc: "Prisoner", motivation: "Friendship" },
  { min: 17, max: 19, npc: "POW", motivation: "Secret mission" },
  { min: 20, max: 26, npc: "Refugee", motivation: "Safety" },
  { min: 27, max: 29, npc: "Police", motivation: "Might" },
  { min: 30, max: 31, npc: "Pilot", motivation: "Freedom" },
  { min: 32, max: 33, npc: "Driver", motivation: "Passion" },
  { min: 34, max: 35, npc: "Sniper", motivation: "Faith" },
  { min: 36, max: 40, npc: "Guard", motivation: "Protect someone" },
  { min: 41, max: 44, npc: "Cook", motivation: "Vengeance" },
  { min: 45, max: 48, npc: "Medic", motivation: "Debt" },
  { min: 49, max: 50, npc: "Politician", motivation: "Lust" },
  { min: 51, max: 55, npc: "Worker", motivation: "Greed" },
  { min: 56, max: 65, npc: "Soldier", motivation: "Survival" },
  { min: 66, max: 74, npc: "Civilian", motivation: "Pride" },
  { min: 75, max: 78, npc: "Child", motivation: "Sloth" },
  { min: 79, max: 80, npc: "Mechanic", motivation: "Justice" },
  { min: 81, max: 83, npc: "Messenger", motivation: "Love" },
  { min: 84, max: 87, npc: "Hunter", motivation: "Hate" },
  { min: 88, max: 89, npc: "Scientist", motivation: "Revenge" },
  { min: 90, max: 95, npc: "Farmer", motivation: "Family" },
  { min: 96, max: 100, npc: "Deserter", motivation: "Secret" },
];

const EVENTS = [
  { min: 1, max: 4, value: "Murder" },
  { min: 5, max: 8, value: "Attack" },
  { min: 9, max: 13, value: "Bad weather" },
  { min: 14, max: 18, value: "Passing convoy" },
  { min: 19, max: 20, value: "Aircraft overhead" },
  { min: 21, max: 22, value: "Psy ops" },
  { min: 23, max: 26, value: "Celebration" },
  { min: 27, max: 28, value: "Coup" },
  { min: 29, max: 32, value: "Hard choice" },
  { min: 33, max: 36, value: "False information" },
  { min: 37, max: 41, value: "Nearby battle" },
  { min: 42, max: 46, value: "Unexpected find" },
  { min: 47, max: 52, value: "Refugees" },
  { min: 53, max: 56, value: "Trade" },
  { min: 57, max: 62, value: "Wildlife" },
  { min: 63, max: 66, value: "Love triangle" },
  { min: 67, max: 70, value: "Storm" },
  { min: 71, max: 74, value: "Infiltration" },
  { min: 75, max: 79, value: "Ambush" },
  { min: 80, max: 84, value: "Shelling" },
  { min: 85, max: 87, value: "Trial" },
  { min: 88, max: 92, value: "Theft" },
  { min: 93, max: 95, value: "Sabotage" },
  { min: 96, max: 100, value: "Marauders" },
];

// ─── ROLL FUNCTIONS ───

function rollSiteType(setting) {
  const table = setting === "rural" ? RURAL_SITES : URBAN_SITES;
  const rolled = rollD100();
  const row = lookupTable(table, rolled);
  if (row.value === null) {
    // Roll twice and combine
    const r1 = rollSiteTypeSingle(table);
    const r2 = rollSiteTypeSingle(table);
    return { display: r1 + " + " + r2, note: "Rolled twice and combined" };
  }
  return { display: row.value, note: null };
}

function rollSiteTypeSingle(table) {
  let rolled, row;
  do {
    rolled = rollD100();
    row = lookupTable(table, rolled);
  } while (row.value === null); // Re-roll if we hit "roll twice" again
  return row.value;
}

function rollCondition() {
  const rolled = roll(10);
  const row = lookupTable(CONDITIONS, rolled);
  return row.value;
}

function rollSingleFaction() {
  const rolled = rollD100();
  const row = lookupTable(FACTIONS, rolled);
  if (row.value === null) {
    // Roll twice - two factions vie for dominance
    const f1 = rollSingleFactionOnce();
    const f2 = rollSingleFactionOnce();
    return { factions: [f1, f2], vying: true };
  }
  let allegiance = null;
  if (row.rollAllegiance) {
    const aRoll = rollD100();
    allegiance = lookupTable(ALLEGIANCES, aRoll).value;
  }
  return { factions: [{ type: row.value, allegiance }], vying: false };
}

function rollSingleFactionOnce() {
  let rolled, row;
  do {
    rolled = rollD100();
    row = lookupTable(FACTIONS, rolled);
  } while (row.value === null);
  let allegiance = null;
  if (row.rollAllegiance) {
    const aRoll = rollD100();
    allegiance = lookupTable(ALLEGIANCES, aRoll).value;
  }
  return { type: row.value, allegiance };
}

function formatFaction(f) {
  return f.allegiance ? f.type + " \u2014 " + f.allegiance : f.type;
}

function rollPopulation() {
  const rolled = roll(10);
  const row = lookupTable(POPULATIONS, rolled);
  let count = null;
  if (row.detail) {
    count = rollDiceExpr(row.detail);
  }
  return { category: row.value, count };
}

function rollDiceExpr(expr) {
  // Handles: D6+1, 1D10+8, 2D10+10, D100+20
  const match = expr.match(/^(\d*)D(\d+)([+-]\d+)?$/i);
  if (!match) return 0;
  const count = match[1] ? parseInt(match[1]) : 1;
  const sides = parseInt(match[2]);
  const mod = match[3] ? parseInt(match[3]) : 0;
  let total = mod;
  for (let i = 0; i < count; i++) {
    total += roll(sides);
  }
  return total;
}

function rollCharacteristics() {
  const count = rollD3();
  const results = [];
  for (let i = 0; i < count; i++) {
    const rolled = rollD100();
    const row = lookupTable(CHARACTERISTICS, rolled);
    results.push(row.value);
  }
  return results;
}

function rollSituation() {
  const rolled = rollD100();
  const row = lookupTable(SITUATIONS, rolled);
  let extra = null;
  if (row.rollFaction) {
    const f = rollSingleFactionOnce();
    extra = formatFaction(f);
  }
  const base = row.value.replace(" (roll faction)", "");
  return { situation: base, faction: extra };
}

function rollNPCList() {
  const count = rollD3() + 1;
  const results = [];
  for (let i = 0; i < count; i++) {
    // "Roll twice and combine the result" per the book header
    const r1 = rollD100();
    const r2 = rollD100();
    const row1 = lookupTable(NPCS, r1);
    const row2 = lookupTable(NPCS, r2);
    results.push({ npc: row1.npc, motivation: row2.motivation });
  }
  return results;
}

function rollEventList() {
  const count = rollD3() + 2;
  const results = [];
  for (let i = 0; i < count; i++) {
    const rolled = rollD100();
    const row = lookupTable(EVENTS, rolled);
    results.push(row.value);
  }
  return results;
}

// ─── STATE ───
let currentSetting = "rural";

// ─── RENDERING ───

function renderSiteType(data) {
  let html = '<span class="primary">' + escapeHtml(data.display) + "</span>";
  if (data.note) html += ' <span class="dice-note">(' + escapeHtml(data.note) + ")</span>";
  document.getElementById("site-type-result").innerHTML = html;
}

function renderCondition(value) {
  document.getElementById("condition-result").innerHTML =
    '<span class="primary">' + escapeHtml(value) + "</span>";
}

function renderFaction(data) {
  let html = "";
  if (data.vying) {
    html += '<span class="primary">' + escapeHtml(formatFaction(data.factions[0])) + "</span>";
    html += ' <span class="dice-note">and</span> ';
    html += '<span class="primary">' + escapeHtml(formatFaction(data.factions[1])) + "</span>";
    html += '<br><span class="dice-note">These two factions vie for dominance</span>';
  } else {
    html += '<span class="primary">' + escapeHtml(formatFaction(data.factions[0])) + "</span>";
  }
  document.getElementById("faction-result").innerHTML = html;
}

function renderPopulation(data) {
  let html = '<span class="primary">' + escapeHtml(data.category) + "</span>";
  if (data.count !== null) {
    html += ' <span class="dice-note">(' + data.count + " people)</span>";
  }
  document.getElementById("population-result").innerHTML = html;
}

function renderCharacteristics(items) {
  let html =
    '<span class="dice-note">D3 = ' +
    items.length +
    " characteristic" +
    (items.length !== 1 ? "s" : "") +
    "</span>";
  html += '<ul class="result-list">';
  for (const item of items) {
    html += '<li><span class="primary">' + escapeHtml(item) + "</span></li>";
  }
  html += "</ul>";
  document.getElementById("characteristics-result").innerHTML = html;
}

function renderSituation(data) {
  let html = '<span class="primary">' + escapeHtml(data.situation) + "</span>";
  if (data.faction) {
    html +=
      ' <span class="dice-note">by</span> <span class="primary">' +
      escapeHtml(data.faction) +
      "</span>";
  }
  document.getElementById("situation-result").innerHTML = html;
}

function renderNPCs(items) {
  let html =
    '<span class="dice-note">D3+1 = ' +
    items.length +
    " NPC" +
    (items.length !== 1 ? "s" : "") +
    " (each rolled twice and combined)</span>";
  html += '<ul class="result-list">';
  for (const item of items) {
    html +=
      '<li><span class="primary">' +
      escapeHtml(item.npc) +
      '</span> &mdash; motivated by <span class="primary">' +
      escapeHtml(item.motivation) +
      "</span></li>";
  }
  html += "</ul>";
  document.getElementById("npcs-result").innerHTML = html;
}

function renderEvents(items) {
  let html =
    '<span class="dice-note">D3+2 = ' +
    items.length +
    " event" +
    (items.length !== 1 ? "s" : "") +
    "</span>";
  html += '<ul class="result-list">';
  for (let i = 0; i < items.length; i++) {
    html += '<li><span class="primary">' + escapeHtml(items[i]) + "</span></li>";
  }
  html += "</ul>";
  document.getElementById("events-result").innerHTML = html;
}

// ─── GENERATE / RE-ROLL ───

let siteTypeData,
  conditionData,
  factionData,
  populationData,
  characteristicsData,
  situationData,
  npcsData,
  eventsData;

function generate() {
  currentSetting = document.getElementById("setting-select").value;

  siteTypeData = rollSiteType(currentSetting);
  conditionData = rollCondition();
  factionData = rollSingleFaction();
  populationData = rollPopulation();
  characteristicsData = rollCharacteristics();
  situationData = rollSituation();
  npcsData = rollNPCList();
  eventsData = rollEventList();

  renderSiteType(siteTypeData);
  renderCondition(conditionData);
  renderFaction(factionData);
  renderPopulation(populationData);
  renderCharacteristics(characteristicsData);
  renderSituation(situationData);
  renderNPCs(npcsData);
  renderEvents(eventsData);

  document.getElementById("results").classList.add("visible");
  document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function rerollSiteType() {
  currentSetting = document.getElementById("setting-select").value;
  siteTypeData = rollSiteType(currentSetting);
  renderSiteType(siteTypeData);
}

function rerollCondition() {
  conditionData = rollCondition();
  renderCondition(conditionData);
}

function rerollFaction() {
  factionData = rollSingleFaction();
  renderFaction(factionData);
}

function rerollPopulation() {
  populationData = rollPopulation();
  renderPopulation(populationData);
}

function rerollCharacteristics() {
  characteristicsData = rollCharacteristics();
  renderCharacteristics(characteristicsData);
}

function rerollSituation() {
  situationData = rollSituation();
  renderSituation(situationData);
}

function rerollNPCs() {
  npcsData = rollNPCList();
  renderNPCs(npcsData);
}

function rerollEvents() {
  eventsData = rollEventList();
  renderEvents(eventsData);
}
