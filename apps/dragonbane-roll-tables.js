const TABLES = [
  {
    name: "Treasure – Common",
    dice: "1d20",
    columns: ["Roll", "Result"],
    rows: [
      { min: 1, max: 1, values: ["1", "D6 copper coins"] },
      { min: 2, max: 2, values: ["2", "2D6 copper coins"] },
      { min: 3, max: 3, values: ["3", "4D6 copper coins"] },
      { min: 4, max: 4, values: ["4", "2D6 × 10 copper coins"] },
      { min: 5, max: 5, values: ["5", "4D6 × 10 copper coins"] },
      { min: 6, max: 6, values: ["6", "D6 silver coins"] },
      { min: 7, max: 7, values: ["7", "3D6 silver coins"] },
      { min: 8, max: 8, values: ["8", "D6 × 5 silver coins"] },
      { min: 9, max: 9, values: ["9", "D6 × 10 silver coins"] },
      { min: 10, max: 10, values: ["10", "2D6 × 10 silver coins"] },
      { min: 11, max: 11, values: ["11", "3D6 × 10 silver coins"] },
      { min: 12, max: 12, values: ["12", "D6 gold coins"] },
      { min: 13, max: 13, values: ["13", "2D6 gold coins"] },
      { min: 14, max: 14, values: ["14", "4D6 gold coins"] },
      { min: 15, max: 15, values: ["15", "D6 × 10 gold coins"] },
      { min: 16, max: 16, values: ["16", "2D6 × 10 gold coins"] },
      { min: 17, max: 17, values: ["17", "Chalice (2D6 × 5 gold)"] },
      { min: 18, max: 18, values: ["18", "Silver bracelet (2D6 × 10 silver)"] },
      { min: 19, max: 19, values: ["19", "Gold bracelet (2D6 × 10 gold)"] },
      { min: 20, max: 20, values: ["20", "Silver necklace (2D6 × 5 silver)"] },
    ],
  },
  {
    name: "Treasure – Rare",
    dice: "1d20",
    columns: ["Roll", "Result"],
    rows: [
      { min: 1, max: 1, values: ["1", "Silver jewelry. Roll D6. 1: earring (D6 silver), 2: ring (2D6 silver), 3: brooch (D6 × 5 silver), 4: bracelet (2D6 × 5 silver), 5: necklace (2D6 × 10 silver), 6: tiara (D6 × 5 gold)."] },
      { min: 2, max: 2, values: ["2", "Gold jewelry. Roll D6. 1: earring (D6 gold), 2: ring (2D6 gold), 3: brooch (D6 × 5 gold), 4: bracelet (2D6 × 5 gold), 5: necklace (2D6 × 10 gold), 6: crown (D6 × 50 gold)."] },
      { min: 3, max: 3, values: ["3", "Drinking vessel. Roll D6. 1: battered iron tankard (D6 copper), 2: drinking horn (2D6 copper), 3: painted pewter goblet (D6 × 5 copper), 4: engraved silver goblet (D6 × 5 silver), 5: silver chalice with filigree (2D6 × 5 silver), 6: gem-set gold chalice (D6 × 5 gold)."] },
      {
        min: 4,
        max: 4,
        values: [
          "4",
          "Gemstone. Roll D6. 1: glass (2 copper), 2: crystal (10 silver), 3: emerald (10 gold), 4: sapphire (15 gold), 5: ruby (25 gold), 6: diamond (100 gold).",
        ],
      },
      { min: 5, max: 5, values: ["5", "Glass art. Roll D6. 1: glass bottle (D6 copper), 2: colored glass cup (D6 × 5 copper), 3: etched glass vase (D6 silver), 4: stained glass panel (D6 × 5 silver), 5: glass sculpture (2D6 × 5 silver), 6: masterwork glass mosaic (D6 × 5 gold)."] },
      { min: 6, max: 6, values: ["6", "Bolt of fabric. Roll D6. 1: rough linen (D6 silver), 2: fine linen (2D6 silver), 3: wool cloth (D6 × 5 silver), 4: damask (2D6 × 5 silver), 5: velvet (D6 × 5 gold), 6: silk (2D6 × 5 gold)."] },
      {
        min: 7,
        max: 7,
        values: ["7", "Fine clothing. Roll D6. 1: silk scarf (D6 silver), 2: fine gloves (2D6 silver), 3: fine boots (D6 × 5 silver), 4: embroidered doublet (2D6 × 5 silver), 5: fur-lined cloak (2D6 × 10 silver), 6: silk robe (D6 × 5 gold)."],
      },
      {
        min: 8,
        max: 8,
        values: [
          "8",
          "Melee weapon. Roll D6. 1: dagger, 2: short sword, 3: short spear, 4: broadsword, 5: long spear, 6: longsword.",
        ],
      },
      {
        min: 9,
        max: 9,
        values: [
          "9",
          "Melee weapon. Roll D6. 1: handaxe, 2: scimitar, 3: morningstar, 4: parrying dagger, 5: light warhammer, 6: flail.",
        ],
      },
      {
        min: 10,
        max: 10,
        values: [
          "10",
          "Ranged weapon. Roll D6. 1: sling, 2: short bow, 3: longbow, 4: light crossbow, 5: heavy crossbow, 6: hand crossbow.",
        ],
      },
      {
        min: 11,
        max: 11,
        values: [
          "11",
          "Mastercrafted weapon. Roll D6. 1: dagger, 2: short sword, 3: battleaxe, 4: broadsword, 5: heavy warhammer, 6: longsword.",
        ],
      },
      {
        min: 12,
        max: 12,
        values: [
          "12",
          "Armor/shield. Roll D6. 1: small shield, 2: large shield, 3: open helmet, 4: great helm, 5: studded leather, 6: chainmail.",
        ],
      },
      {
        min: 13,
        max: 13,
        values: [
          "13",
          "Carved figurine. Roll D8 for material. 1: stone (2D6 copper), 2: bone (D6 silver), 3: bronze (D6 × 5 silver), 4: crystal (2D6 × 5 silver), 5: ivory (D6 × 5 gold), 6: jade (2D6 × 5 gold), 7: silver (D6 × 10 gold), 8: gold (2D6 × 10 gold).",
        ],
      },
      { min: 14, max: 14, values: ["14", "Nautical instrument. Roll D6. 1: illuminated vellum sea chart in a leather case (D6 × 5 silver), 2: engraved brass compass in a fitted case (D6 × 10 silver), 3: silver-framed navigator's hourglass (D6 × 5 gold), 4: brass spyglass with a leather-wrapped grip (D6 × 10 gold), 5: ivory-and-brass quadrant (2D6 × 10 gold), 6: gold-cased clock-watch (D6 × 50 gold)."] },
      {
        min: 15,
        max: 15,
        values: [
          "15",
          "Grimoire. Roll D4 for the school. 1: animism, 2: elementalism, 3: mentalism, 4: general magic. Roll D4−1 for the spell rank (0 means magic tricks) and D4 for the number. The GM chooses or randomizes the exact spells.",
        ],
      },
      {
        min: 16,
        max: 16,
        values: [
          "16",
          "Bottle. A HEALING roll reveals the contents. On a failure, the GM rolls in secret. Roll D6. 1: lethal poison (Potency 12), 2: sleeping poison (Potency 14), 3: booze, 4: herbal concoction, 5: healing potion (2D6 HP), 6: healing potion (3D6 HP).",
        ],
      },
      {
        min: 17,
        max: 17,
        values: [
          "17",
          "Book. Roll D6 for the title. 1: Eat or Be Eaten – Plants of the Forest, 2: Grammar of the Dragon Tongue, 3: Ancient Heroes and Villains, 4: Handbook of the Master Carpenter, 5: Beasts of the Cave – An Encyclopedia, 6: Blood, Phlegm and Bile – Master Your Bodily Fluids.",
        ],
      },
      {
        min: 18,
        max: 18,
        values: [
          "18",
          "Instrument. Roll D6. 1: horn, 2: flute, 3: harp, 4: lyre, 5: bagpipe, 6: drum.",
        ],
      },
      {
        min: 19,
        max: 19,
        values: [
          "19",
          "Game. Roll D6. 1: knucklebones (D6 copper), 2: finely finished wooden fox and geese set (D6 silver), 3: carved wooden nine men's morris board with brass pieces (D6 × 5 silver), 4: pair of golden dice (2D6 gold), 5: backgammon set with ivory pieces (D6 × 5 gold), 6: chess set with carved ivory and jet pieces (D6 × 10 gold).",
        ],
      },
      {
        min: 20,
        max: 20,
        values: [
          "20",
          "Spider. Roll for EVADE. If you fail, you suffer D4 damage from the bite. Armor has no effect.",
        ],
      },
    ],
  },
];

let currentTableIndex = -1;

function parseDice(notation) {
  const match = notation.match(/^(\d+)d(\d+)$/i);
  if (!match) return null;
  return {
    count: parseInt(match[1]),
    sides: parseInt(match[2]),
  };
}

function rollDice(notation) {
  const dice = parseDice(notation);
  if (!dice) return 0;
  let total = 0;
  for (let i = 0; i < dice.count; i++) {
    total += Math.floor(Math.random() * dice.sides) + 1;
  }
  return total;
}

function populateDropdown() {
  const select = document.getElementById("table-select");
  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a table…";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  TABLES.forEach((table, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = table.name;
    select.appendChild(opt);
  });
}

function selectTable() {
  const select = document.getElementById("table-select");
  const val = select.value;
  currentTableIndex = val === "" ? -1 : parseInt(val);
  renderTable();
  document.getElementById("roll-result").textContent = "";
}

function renderTable() {
  const container = document.getElementById("table-container");
  if (currentTableIndex < 0) {
    container.innerHTML = '<div class="empty-state">Select a table above to get started.</div>';
    document.getElementById("roll-btn").textContent = "Roll";
    document.getElementById("roll-btn").disabled = true;
    return;
  }

  const table = TABLES[currentTableIndex];
  document.getElementById("roll-btn").textContent = "Roll " + table.dice.toUpperCase();
  document.getElementById("roll-btn").disabled = false;

  let html = '<table class="roll-table"><thead><tr>';
  for (const col of table.columns) {
    html += "<th>" + escapeHtml(col) + "</th>";
  }
  html += "</tr></thead><tbody>";

  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    html += '<tr data-row-index="' + i + '">';
    for (const val of row.values) {
      html += "<td>" + escapeHtml(val) + "</td>";
    }
    html += "</tr>";
  }

  html += "</tbody></table>";

  if (table.notes && table.notes.length > 0) {
    html += '<div class="table-notes"><dl>';
    for (const [term, desc] of table.notes) {
      html += "<dt>" + escapeHtml(term) + "</dt>";
      html += "<dd>" + escapeHtml(desc) + "</dd>";
    }
    html += "</dl></div>";
  }

  container.innerHTML = html;
}

function findRowForRoll(total) {
  const table = TABLES[currentTableIndex];
  for (let i = 0; i < table.rows.length; i++) {
    if (total >= table.rows[i].min && total <= table.rows[i].max) {
      return i;
    }
  }
  return -1;
}

function roll() {
  if (currentTableIndex < 0) return;

  const table = TABLES[currentTableIndex];
  const total = rollDice(table.dice);

  document.getElementById("roll-result").textContent = total;

  const rows = document.querySelectorAll(".roll-table tbody tr");
  rows.forEach((r) => r.classList.remove("highlighted"));

  const rowIndex = findRowForRoll(total);
  if (rowIndex >= 0) {
    const targetRow = document.querySelector('[data-row-index="' + rowIndex + '"]');
    if (targetRow) {
      targetRow.classList.add("highlighted");
      targetRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  populateDropdown();
  renderTable();
});
