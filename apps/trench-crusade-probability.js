let baseDice = 2;
let flatBonus = 0;

function adjustBonus(delta) {
  flatBonus += delta;
  document.getElementById("bonusValue").textContent =
    flatBonus === 0 ? "0" : flatBonus > 0 ? `+${flatBonus}` : `${flatBonus}`;
  generateTable();
}

function calculateDiceDistribution(n, k, keepHighest = true) {
  if (n === k) return convolveSimpleDice(n);
  let states = new Map();
  states.set("", 1.0);
  for (let i = 0; i < n; i++) {
    const newStates = new Map();
    for (const [key, prob] of states) {
      const dice = key === "" ? [] : key.split(",").map(Number);
      for (let face = 1; face <= 6; face++) {
        const allDice = [...dice, face];
        allDice.sort((a, b) => (keepHighest ? b - a : a - b));
        const kept = allDice.slice(0, Math.min(k, allDice.length));
        kept.sort((a, b) => a - b);
        const newKey = kept.join(",");
        const newProb = prob / 6;
        newStates.set(newKey, (newStates.get(newKey) || 0) + newProb);
      }
    }
    states = newStates;
  }
  const dist = {};
  for (const [key, prob] of states) {
    const dice = key.split(",").map(Number);
    const sum = dice.reduce((a, b) => a + b, 0);
    dist[sum] = (dist[sum] || 0) + prob * 100;
  }
  return dist;
}

function convolveSimpleDice(n) {
  let dist = {};
  for (let i = 1; i <= 6; i++) dist[i] = 100 / 6;
  for (let d = 1; d < n; d++) {
    const newDist = {};
    for (const [sum, prob] of Object.entries(dist)) {
      for (let face = 1; face <= 6; face++) {
        const newSum = parseInt(sum) + face;
        newDist[newSum] = (newDist[newSum] || 0) + prob / 6;
      }
    }
    dist = newDist;
  }
  return dist;
}

function formatProbability(probability) {
  if (probability >= 99.95) {
    return "99.9%+";
  }
  return probability.toFixed(1) + "%";
}

function generateTable() {
  const table = document.getElementById("outcomesTable");
  table.innerHTML = "";
  const mods = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4];
  const minTotal = baseDice;
  const maxTotal = Math.min(baseDice * 6, 12 - Math.min(flatBonus, 0));
  const headerRow = document.createElement("tr");
  const corner = document.createElement("th");
  corner.textContent = "";
  corner.className = "total-header";
  headerRow.appendChild(corner);
  let lastDisplayed = null;
  for (let total = minTotal; total <= maxTotal; total++) {
    const modifiedTotal = Math.max(0, Math.min(total + flatBonus, 12));
    if (modifiedTotal === lastDisplayed) continue;
    const th = document.createElement("th");
    th.className = "modifier-header";
    th.textContent = modifiedTotal;
    headerRow.appendChild(th);
    lastDisplayed = modifiedTotal;
  }
  table.appendChild(headerRow);
  const dists = {};
  mods.forEach((mod) => {
    const totalDice = baseDice + Math.abs(mod);
    if (mod > 0) dists[mod] = calculateDiceDistribution(totalDice, baseDice, true);
    else if (mod < 0) dists[mod] = calculateDiceDistribution(totalDice, baseDice, false);
    else dists[mod] = calculateDiceDistribution(baseDice, baseDice, true);
  });
  mods.forEach((mod) => {
    const row = document.createElement("tr");
    const modCell = document.createElement("td");
    if (mod > 0) modCell.textContent = `+${mod}D`;
    else if (mod < 0) modCell.textContent = `${mod}D`;
    else modCell.textContent = "0D";
    modCell.className = "total-cell";
    row.appendChild(modCell);
    let lastDisplayed = null;
    for (let total = minTotal; total <= maxTotal; total++) {
      const modifiedTotal = Math.max(0, Math.min(total + flatBonus, 12));
      if (modifiedTotal === lastDisplayed) continue;
      const cell = document.createElement("td");
      let cumProb = 0;
      for (let t = total; t <= 100; t++) cumProb += dists[mod][t] || 0;
      if (cumProb > 0) {
        cell.textContent = formatProbability(cumProb);
        cell.className = "prob-cell";
        const intensity = Math.min(cumProb / 100, 1);
        const r = Math.round(255 - intensity * 100);
        const g = Math.round(180 - intensity * 30);
        const b = Math.round(180 + intensity * 75);
        cell.style.backgroundColor = `rgb(${r},${g},${b})`;
        cell.style.color = "#000000";
      } else {
        cell.textContent = "-";
        cell.style.opacity = "0.3";
      }
      row.appendChild(cell);
      lastDisplayed = modifiedTotal;
    }
    table.appendChild(row);
  });
}

document.querySelectorAll(".dice-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".dice-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    baseDice = parseInt(btn.dataset.dice);
    generateTable();
  });
});

generateTable();
