// Success Roll State
let successBaseDice = 2;
let successPlusD = 0;
let successMinusD = 0;

// Injury Roll State
let injuryBaseDice = 2;
let injuryPlusD = 0;
let injuryMinusD = 0;
let injuryModifier = 0;
let injuryDeadly = 0;

// Initialize button states on page load
document.addEventListener("DOMContentLoaded", () => {
  // All minus buttons should be disabled initially since values start at 0
  document.getElementById("successPlusDMinusBtn").disabled = true;
  document.getElementById("successMinusDMinusBtn").disabled = true;
  document.getElementById("injuryPlusDMinusBtn").disabled = true;
  document.getElementById("injuryMinusDMinusBtn").disabled = true;

  // Initialize injury modifier buttons (starts at 0, so can go down to -3)
  const injuryModifierMinusBtn = document.querySelector(
    ".injury-modifier-controls button:first-child",
  );
  if (injuryModifierMinusBtn) {
    injuryModifierMinusBtn.disabled = false;
  }

  // Initialize deadly minus button (starts at 0, so minus should be disabled)
  document.getElementById("injuryDeadlyMinusBtn").disabled = true;
});

// Dice selection
document.querySelectorAll(".dice-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const roller = btn.dataset.roller;
    // Only deactivate buttons in the same roller
    document
      .querySelectorAll(`.dice-btn[data-roller="${roller}"]`)
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (roller === "success") {
      successBaseDice = parseInt(btn.dataset.dice);
      updateEffectiveModifier("success");
    } else {
      injuryBaseDice = parseInt(btn.dataset.dice);
      updateEffectiveModifier("injury");
    }
  });
});

function adjustModifier(roller, type, delta) {
  if (roller === "success") {
    if (type === "plus") {
      successPlusD = Math.max(0, successPlusD + delta);
      document.getElementById("successPlusD").textContent = `+${successPlusD}D`;
      // Enable/disable the minus button based on value
      const minusBtn = document.getElementById("successPlusDMinusBtn");
      minusBtn.disabled = successPlusD === 0;
    } else {
      successMinusD = Math.max(0, successMinusD + delta);
      document.getElementById("successMinusD").textContent = `-${successMinusD}D`;
      // Enable/disable the minus button based on value
      const minusBtn = document.getElementById("successMinusDMinusBtn");
      minusBtn.disabled = successMinusD === 0;
    }
  } else if (roller === "injury") {
    if (type === "plus") {
      injuryPlusD = Math.max(0, injuryPlusD + delta);
      document.getElementById("injuryPlusD").textContent = `+${injuryPlusD}D`;
      // Enable/disable the minus button based on value
      const minusBtn = document.getElementById("injuryPlusDMinusBtn");
      minusBtn.disabled = injuryPlusD === 0;
    } else {
      injuryMinusD = Math.max(0, injuryMinusD + delta);
      document.getElementById("injuryMinusD").textContent = `-${injuryMinusD}D`;
      // Enable/disable the minus button based on value
      const minusBtn = document.getElementById("injuryMinusDMinusBtn");
      minusBtn.disabled = injuryMinusD === 0;
    }
  }
  updateEffectiveModifier(roller);
}

function adjustInjuryModifier(delta) {
  injuryModifier = Math.max(-3, Math.min(99, injuryModifier + delta));
  document.getElementById("injuryModifierValue").textContent = injuryModifier;

  // Enable/disable buttons based on injury modifier value
  const minusBtn = document.querySelector(".injury-modifier-controls button:first-child");
  const plusBtn = document.getElementById("injuryModifierPlusBtn");
  minusBtn.disabled = injuryModifier === -3;
  plusBtn.disabled = injuryModifier === 99;

  updateEffectiveModifier("injury");
}

function adjustInjuryDeadly(delta) {
  injuryDeadly = Math.max(0, Math.min(10, injuryDeadly + delta));
  document.getElementById("injuryDeadlyValue").textContent = injuryDeadly;

  document.getElementById("injuryDeadlyMinusBtn").disabled = injuryDeadly === 0;
  document.getElementById("injuryDeadlyPlusBtn").disabled = injuryDeadly === 10;

  updateEffectiveModifier("injury");
}

function updateEffectiveModifier(roller) {
  if (roller === "success") {
    const netModifier = successPlusD - successMinusD;
    const totalDice = successBaseDice + Math.abs(netModifier);
    const effectiveEl = document.getElementById("successEffectiveModifier");

    if (netModifier === 0) {
      effectiveEl.textContent = `Rolling ${successBaseDice}d6`;
    } else if (netModifier > 0) {
      effectiveEl.textContent = `Rolling ${totalDice}d6, keeping highest ${successBaseDice}`;
    } else {
      effectiveEl.textContent = `Rolling ${totalDice}d6, keeping lowest ${successBaseDice}`;
    }

    updateProbability("success");
  } else {
    const netModifier = injuryPlusD - injuryMinusD;
    const keptCount = injuryBaseDice + injuryDeadly;
    const totalDice = keptCount + Math.abs(netModifier);
    const effectiveEl = document.getElementById("injuryEffectiveModifier");

    let text = "";
    if (netModifier === 0) {
      text = `Rolling ${keptCount}d6`;
    } else if (netModifier > 0) {
      text = `Rolling ${totalDice}d6, keeping highest ${keptCount}`;
    } else {
      text = `Rolling ${totalDice}d6, keeping lowest ${keptCount}`;
    }

    if (injuryModifier !== 0) {
      text += `, ${injuryModifier > 0 ? "+" : ""}${injuryModifier} injury modifier`;
    }

    effectiveEl.textContent = text;

    updateProbability("injury");
  }
}

function formatProbability(probability) {
  if (probability >= 99.95) {
    return "99.9%+";
  }
  return probability.toFixed(1) + "%";
}

function updateProbability(roller) {
  if (roller === "success") {
    const netModifier = successPlusD - successMinusD;
    const totalDiceToRoll = successBaseDice + Math.abs(netModifier);

    // Monte Carlo simulation with 100,000 trials
    const trials = 100000;
    let successCount = 0;

    for (let i = 0; i < trials; i++) {
      const rolls = [];
      for (let j = 0; j < totalDiceToRoll; j++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
      }

      let keptRolls;
      if (netModifier > 0) {
        keptRolls = rolls.sort((a, b) => b - a).slice(0, successBaseDice);
      } else if (netModifier < 0) {
        keptRolls = rolls.sort((a, b) => a - b).slice(0, successBaseDice);
      } else {
        keptRolls = rolls;
      }

      const total = keptRolls.reduce((sum, val) => sum + val, 0);

      if (total >= 7) {
        successCount++;
      }
    }

    const probability = (successCount / trials) * 100;
    document.getElementById("successProbabilityValue").textContent = formatProbability(probability);
    document.getElementById("successProbabilityBar").style.width = probability + "%";
  } else {
    // Injury roll probabilities
    const netModifier = injuryPlusD - injuryMinusD;
    const keptCount = injuryBaseDice + injuryDeadly;
    const totalDiceToRoll = keptCount + Math.abs(netModifier);
    const trials = 100000;
    let noEffect = 0;
    let minor = 0;
    let down = 0;
    let out = 0;

    for (let i = 0; i < trials; i++) {
      const rolls = [];
      for (let j = 0; j < totalDiceToRoll; j++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
      }

      let keptRolls;
      if (netModifier > 0) {
        keptRolls = rolls.sort((a, b) => b - a).slice(0, keptCount);
      } else if (netModifier < 0) {
        keptRolls = rolls.sort((a, b) => a - b).slice(0, keptCount);
      } else {
        keptRolls = rolls;
      }

      let total = keptRolls.reduce((sum, val) => sum + val, 0);
      total += injuryModifier;

      if (total <= 1) {
        noEffect++;
      } else if (total <= 6) {
        minor++;
      } else if (total <= 8) {
        down++;
      } else {
        out++;
      }
    }

    document.getElementById("injuryNoEffect").textContent = formatProbability(
      (noEffect / trials) * 100,
    );
    document.getElementById("injuryMinor").textContent = formatProbability((minor / trials) * 100);
    document.getElementById("injuryDown").textContent = formatProbability((down / trials) * 100);
    document.getElementById("injuryOut").textContent = formatProbability((out / trials) * 100);
  }
}

function rollDice(roller) {
  if (roller === "success") {
    const netModifier = successPlusD - successMinusD;
    const totalDiceToRoll = successBaseDice + Math.abs(netModifier);

    const rolls = [];
    for (let i = 0; i < totalDiceToRoll; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }

    let keptIndices;
    if (netModifier > 0) {
      keptIndices = rolls
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value)
        .slice(0, successBaseDice)
        .map((item) => item.index);
    } else if (netModifier < 0) {
      keptIndices = rolls
        .map((value, index) => ({ value, index }))
        .sort((a, b) => a.value - b.value)
        .slice(0, successBaseDice)
        .map((item) => item.index);
    } else {
      keptIndices = rolls.map((_, index) => index);
    }

    const keptRolls = keptIndices.map((i) => rolls[i]);
    const total = keptRolls.reduce((sum, val) => sum + val, 0);

    displayResults("success", rolls, keptIndices, total, netModifier);
  } else {
    const netModifier = injuryPlusD - injuryMinusD;
    const keptCount = injuryBaseDice + injuryDeadly;
    const totalDiceToRoll = keptCount + Math.abs(netModifier);

    const rolls = [];
    for (let i = 0; i < totalDiceToRoll; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }

    let keptIndices;
    if (netModifier > 0) {
      keptIndices = rolls
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value)
        .slice(0, keptCount)
        .map((item) => item.index);
    } else if (netModifier < 0) {
      keptIndices = rolls
        .map((value, index) => ({ value, index }))
        .sort((a, b) => a.value - b.value)
        .slice(0, keptCount)
        .map((item) => item.index);
    } else {
      keptIndices = rolls.map((_, index) => index);
    }

    const keptRolls = keptIndices.map((i) => rolls[i]);
    const baseTotal = keptRolls.reduce((sum, val) => sum + val, 0);
    const total = baseTotal + injuryModifier;

    displayResults("injury", rolls, keptIndices, total, netModifier);
  }
}

function displayResults(roller, rolls, keptIndices, total, netModifier) {
  const resultsEl = document.getElementById(`${roller}Results`);
  const diceVisualEl = document.getElementById(`${roller}DiceVisual`);
  const summaryEl = document.getElementById(`${roller}ResultSummary`);
  const finalResultEl = document.getElementById(`${roller}FinalResult`);

  diceVisualEl.innerHTML = "";

  rolls.forEach((value, index) => {
    const die = document.createElement("div");
    die.className = "die";
    if (keptIndices.includes(index)) {
      die.classList.add("kept");
    } else {
      die.classList.add("discarded");
    }
    die.textContent = value;
    die.style.animationDelay = `${index * 0.1}s`;
    diceVisualEl.appendChild(die);
  });

  if (roller === "success") {
    const baseDice = successBaseDice;
    let summaryText = `${baseDice}d6`;
    if (netModifier > 0) {
      summaryText += ` +${netModifier}D (rolled ${rolls.length}, kept highest ${baseDice})`;
    } else if (netModifier < 0) {
      summaryText += ` ${netModifier}D (rolled ${rolls.length}, kept lowest ${baseDice})`;
    }
    summaryEl.textContent = summaryText;

    let outcomeText = "";
    if (total >= 12) {
      outcomeText = "CRITICAL";
    } else if (total >= 7) {
      outcomeText = "SUCCESS";
    } else {
      outcomeText = "FAILURE";
    }
    finalResultEl.innerHTML = `<span class="result-number">${total}</span><span class="result-separator"> - </span><span class="result-outcome">${outcomeText}</span>`;
  } else {
    const keptRolls = keptIndices.map((i) => rolls[i]);
    const baseTotal = keptRolls.reduce((sum, val) => sum + val, 0);
    const keptCount = injuryBaseDice + injuryDeadly;
    let summaryText = `${injuryBaseDice}d6`;
    if (injuryDeadly > 0) {
      summaryText += ` Deadly ${injuryDeadly}`;
    }
    if (netModifier > 0) {
      summaryText += ` +${netModifier}D (rolled ${rolls.length}, kept highest ${keptCount})`;
    } else if (netModifier < 0) {
      summaryText += ` ${netModifier}D (rolled ${rolls.length}, kept lowest ${keptCount})`;
    }
    if (injuryModifier !== 0) {
      summaryText += ` (${baseTotal} ${injuryModifier > 0 ? "+" : ""}${injuryModifier} modifier = ${total})`;
    }
    summaryEl.textContent = summaryText;

    let outcomeText = "";
    if (total <= 1) {
      outcomeText = "No Effect";
    } else if (total <= 6) {
      outcomeText = "Minor Hit";
    } else if (total <= 8) {
      outcomeText = "Down";
    } else {
      outcomeText = '<span style="font-size: 0.7em;">Out of Action</span>';
    }
    finalResultEl.innerHTML = `<span class="result-number">${total}</span><span class="result-separator"> - </span><span class="result-outcome">${outcomeText}</span>`;
  }

  resultsEl.classList.remove("hidden");

  setTimeout(() => {
    resultsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 100);
}

// Initialize
updateEffectiveModifier("success");
updateProbability("success");
updateEffectiveModifier("injury");
updateProbability("injury");
