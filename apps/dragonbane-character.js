// ─── DICE & UTILITY HELPERS ───

function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollDropLowest(count, sides) {
  const rolls = [];
  for (let i = 0; i < count; i++) rolls.push(roll(sides));
  rolls.sort((a, b) => a - b);
  rolls.shift();
  return rolls.reduce((a, b) => a + b, 0);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = String(text);
  return div.innerHTML.replace(/"/g, "&quot;");
}

// ─── STATIC DATA ───

const KIN = [
  {
    name: "Human",
    roll: "1–4",
    movement: 10,
    abilities: [
      {
        name: "Adaptive",
        wp: 3,
        desc: "When rolling for a skill, you can choose to make the roll using another skill of your choice. You must be able to justify how you use the selected skill instead of the normal one. The GM has the final word, but should be lenient.",
      },
    ],
  },
  {
    name: "Halfling",
    roll: "5–7",
    movement: 8,
    abilities: [
      {
        name: "Hard to Catch",
        wp: 3,
        desc: "You can activate this ability when dodging an attack, getting a boon to the EVADE roll.",
      },
    ],
  },
  {
    name: "Dwarf",
    roll: "8–9",
    movement: 8,
    abilities: [
      {
        name: "Unforgiving",
        wp: 3,
        desc: "You can activate this ability when attacking someone who harmed you in the past (at least 1 point of damage) and get a boon to the roll. It does not matter when the damage was inflicted. It may be wise to write down the names of everyone who harms you, so you do not forget them.",
      },
    ],
  },
  {
    name: "Elf",
    roll: "10",
    movement: 10,
    abilities: [
      {
        name: "Inner Peace",
        wp: null,
        desc: "As an elf, you can meditate deeply during a stretch rest. You heal an additional D6 HP and a D6 extra WP, and can recover from an additional condition. You are completely unresponsive during your meditation and cannot be awakened.",
      },
    ],
  },
  {
    name: "Mallard",
    roll: "11",
    movement: 8,
    abilities: [
      {
        name: "Ill-Tempered",
        wp: 3,
        desc: "Mallards tend to have a choleric temper. You can activate this ability (no action) when making a skill roll and get a boon to the roll. You also become Angry, if you're not already. This ability cannot be used for rolls against INT or INT-based skills.",
      },
      {
        name: "Webbed Feet",
        wp: null,
        desc: "As a mallard you also get a boon to all SWIMMING rolls. You always move at full speed in or under water.",
      },
    ],
  },
  {
    name: "Wolfkin",
    roll: "12",
    movement: 12,
    abilities: [
      {
        name: "Hunting Instincts",
        wp: 3,
        desc: "You can use this ability to designate a creature in sight, or a creature you can catch the scent of, as your prey. This counts as an action in combat. You can follow the scent of your prey for a full day, and you can spend 1 further WP (not an action) to gain a boon for an attack against your prey.",
      },
    ],
  },
];

// D12 roll → kin index
function kinFromRoll(r) {
  if (r <= 4) return "Human";
  if (r <= 7) return "Halfling";
  if (r <= 9) return "Dwarf";
  if (r === 10) return "Elf";
  if (r === 11) return "Mallard";
  return "Wolfkin";
}

const KIN_NAMES = {
  Human: ["Joruna", "Tym", "Halvelda", "Garmander", "Verolun", "Lothar"],
  Halfling: ["Snappy", "Brine", "Cottar", "Bumble", "Perrywick", "Theoline"],
  Dwarf: ["Tinderrock", "Halwyld", "Tymolana", "Traut", "Urd", "Fermer"],
  Elf: ["Arasin", "Illyriana", "Galvander", "Tyrindelia", "Erwilnor", "Andremone"],
  Mallard: ["Qwucksum", "Splats", "Moggee", "Groddy", "Blisandina", "Hackleswell"],
  Wolfkin: ["Wyld", "Wolfshadow", "Lunariem", "Obdurian", "Frostbite", "Wuldenhall"],
};

const PROFESSIONS = [
  {
    name: "Artisan",
    roll: "1",
    keyAttr: "STR",
    heroicAbility: null, // sub-choice
    heroicOptions: ["Master Blacksmith", "Master Carpenter", "Master Tanner"],
    skills: [
      "Axes",
      "Brawling",
      "Crafting",
      "Hammers",
      "Knives",
      "Sleight of Hand",
      "Spot Hidden",
      "Swords",
    ],
    gear: [
      "Warhammer (small), leather armor, blacksmith's tools, torch, flint & tinder, D8 food rations, D8 silver",
      "Handaxe, leather armor, carpentry tools, torch, rope (hemp), flint & tinder, D8 food rations, D8 silver",
      "Knife, leather armor, tanner's tools, lantern, lamp oil, flint & tinder, D8 food rations, D8 silver",
    ],
    nicknames: [
      "Stonehammer",
      "Woodcleaver",
      "Strongfist",
      "Barrelmaker",
      "Bridgebuilder",
      "Ironmaster",
    ],
  },
  {
    name: "Bard",
    roll: "2",
    keyAttr: "CHA",
    heroicAbility: "Musician",
    heroicOptions: null,
    skills: [
      "Acrobatics",
      "Bluffing",
      "Evade",
      "Knives",
      "Languages",
      "Myths & Legends",
      "Performance",
      "Persuasion",
    ],
    gear: [
      "Lyre, knife, oil lamp, lamp oil, flint & tinder, D6 food rations, D8 silver",
      "Flute, dagger, rope (hemp), torch, flint & tinder, D6 food rations, D8 silver",
      "Horn, knife, torch, flint & tinder, D6 food rations, D8 silver",
    ],
    nicknames: [
      "Odemaker",
      "Talespinner",
      "Silvervoice",
      "Gildenclef",
      "Honeytongue",
      "Rhymesmith",
    ],
  },
  {
    name: "Fighter",
    roll: "3",
    keyAttr: "STR",
    heroicAbility: "Veteran",
    heroicOptions: null,
    skills: ["Axes", "Bows", "Brawling", "Crossbows", "Evade", "Hammers", "Spears", "Swords"],
    gear: [
      "Broadsword/battle axe/morning star, small shield, chainmail, torch, flint & tinder, D6 food rations, D6 silver",
      "Short sword/handaxe/short spear, light crossbow, quiver, leather armor, torch, flint & tinder, D6 food rations, D6 silver",
      "Long spear, studded leather armor, open helmet, torch, flint & tinder, D6 food rations, D6 silver",
    ],
    nicknames: ["Gravemaker", "Grimjaw", "Windthaw", "Coldsteel", "The Fearless", "The Butcher"],
  },
  {
    name: "Hunter",
    roll: "4",
    keyAttr: "AGL",
    heroicAbility: "Companion",
    heroicOptions: null,
    skills: [
      "Acrobatics",
      "Awareness",
      "Bows",
      "Bushcraft",
      "Hunting & Fishing",
      "Knives",
      "Slings",
      "Sneaking",
    ],
    gear: [
      "Dagger, short bow, quiver, leather armor, sleeping pelt, torch, flint & tinder, rope (hemp), snare, D8 food rations, D6 silver",
      "Knife, longbow, quiver, leather armor, sleeping pelt, torch, flint & tinder, rope (hemp), fishing rod, D8 food rations, D6 silver",
      "Dagger, sling, traps, leather armor, sleeping pelt, torch, flint & tinder, rope (hemp), snare, D8 food rations, D6 silver",
    ],
    nicknames: [
      "Forest Fox",
      "Wolfbane",
      "Pathfinder",
      "The Weathered",
      "Bloodhunger",
      "Shadowbolt",
    ],
  },
  {
    name: "Knight",
    roll: "5",
    keyAttr: "STR",
    heroicAbility: "Guardian",
    heroicOptions: null,
    skills: [
      "Beast Lore",
      "Hammers",
      "Myths & Legends",
      "Performance",
      "Persuasion",
      "Riding",
      "Spears",
      "Swords",
    ],
    gear: [
      "Broadsword/morning star, shield (small), plate armor, great helm, torch, flint & tinder, D6 food rations, D12 silver",
      "Flail/warhammer (small), shield (small), chainmail, open helmet, torch, flint & tinder, D6 food rations, D12 silver",
      "Short sword, lance, shield (small), chainmail, open helmet, combat trained horse, D6 food rations, D12 silver",
    ],
    nicknames: [
      "Dragonheart",
      "Goldlance",
      "Griffinclaw",
      "The Noble",
      "Gleamhelm",
      "Mourningcloak",
    ],
  },
  {
    name: "Mage",
    roll: "6",
    keyAttr: "WIL",
    heroicAbility: null, // gets magic instead
    heroicOptions: null,
    schools: {
      Animism: [
        "Animism",
        "Beast Lore",
        "Bushcraft",
        "Evade",
        "Healing",
        "Hunting & Fishing",
        "Sneaking",
        "Staves",
      ],
      Elementalism: [
        "Elementalism",
        "Awareness",
        "Evade",
        "Healing",
        "Languages",
        "Myths & Legends",
        "Spot Hidden",
        "Staves",
      ],
      Mentalism: [
        "Mentalism",
        "Acrobatics",
        "Awareness",
        "Brawling",
        "Evade",
        "Healing",
        "Languages",
        "Myths & Legends",
      ],
    },
    skills: [], // populated from chosen school
    gear: [
      "Staff, orbuculum, grimoire, torch, flint & tinder, D6 food rations, D8 silver",
      "Knife, wand, grimoire, torch, flint & tinder, D6 food rations, D8 silver",
      "Amulet, grimoire, sleeping pelt, torch, flint & tinder, D6 food rations, D8 silver",
    ],
    nicknames: ["Rootheart", "Crookback", "Graycape", "Stormhand", "Stafflimper", "Shadowbringer"],
  },
  {
    name: "Mariner",
    roll: "7",
    keyAttr: "AGL",
    heroicAbility: "Sea Legs",
    heroicOptions: null,
    skills: [
      "Acrobatics",
      "Awareness",
      "Hunting & Fishing",
      "Knives",
      "Languages",
      "Seamanship",
      "Swimming",
      "Swords",
    ],
    gear: [
      "Dagger, short bow, rope (hemp), grappling hook, sleeping pelt, torch, flint & tinder, D8 food rations, D10 silver",
      "Scimitar, leather armor, rope (hemp), grappling hook, torch, flint & tinder, D8 food rations, D10 silver",
      "Trident, spyglass, rope (hemp), grappling hook, torch, flint & tinder, D8 food rations, D10 silver",
    ],
    nicknames: ["Whitewater", "Waverider", "Foamborn", "Saltsplash", "Seadog", "Stormfarer"],
  },
  {
    name: "Merchant",
    roll: "8",
    keyAttr: "CHA",
    heroicAbility: "Treasure Hunter",
    heroicOptions: null,
    skills: [
      "Awareness",
      "Bartering",
      "Bluffing",
      "Evade",
      "Knives",
      "Persuasion",
      "Sleight of Hand",
      "Spot Hidden",
    ],
    gear: [
      "Dagger, sleeping pelt, torch, flint & tinder, rope (hemp), donkey, D6 food rations, D12 silver",
      "Knife, sleeping pelt, lantern, lamp oil, flint & tinder, field kitchen, donkey, cart, D6 food rations, D12 silver",
      "Dagger, sleeping pelt, large tent, oil lamp, lamp oil, flint & tinder, backpack, D6 food rations, D12 silver",
    ],
    nicknames: [
      "Silvergrin",
      "Goldtooth",
      "Silktongue",
      "The Lisping and Truthful",
      "Lardbelly",
      "Skinflint",
    ],
  },
  {
    name: "Scholar",
    roll: "9",
    keyAttr: "INT",
    heroicAbility: "Intuition",
    heroicOptions: null,
    skills: [
      "Awareness",
      "Beast Lore",
      "Bushcraft",
      "Evade",
      "Healing",
      "Languages",
      "Myths & Legends",
      "Spot Hidden",
    ],
    gear: [
      "Staff, notebook, quill, sleeping pelt, torch, flint & tinder, D6 food rations, D10 silver",
      "Knife, book (any subject), sleeping pelt, oil lamp, lamp oil, flint & tinder, D6 food rations, D10 silver",
      "Short sword, bandages, sleeping poison (one dose), sleeping pelt, lantern, lamp oil, flint & tinder, D6 food rations, D10 silver",
    ],
    nicknames: [
      "Clearmind",
      "Dustlung",
      "Farsight",
      "The Lettered",
      "The All-Knowing",
      "The Plump and Learned",
    ],
  },
  {
    name: "Thief",
    roll: "10",
    keyAttr: "AGL",
    heroicAbility: "Backstabbing",
    heroicOptions: null,
    skills: [
      "Acrobatics",
      "Awareness",
      "Bluffing",
      "Evade",
      "Knives",
      "Sleight of Hand",
      "Sneaking",
      "Spot Hidden",
    ],
    gear: [
      "Dagger, sling, rope (hemp), grappling hook, torch, flint & tinder, D6 food rations, D10 silver",
      "Knife, lockpicks (simple), torch, flint & tinder, D6 food rations, D10 silver",
      "Two daggers, marbles, rope (hemp), torch, flint & tinder, D6 food rations, D10 silver",
    ],
    nicknames: ["Halffinger", "Blackrat", "Redeye", "Quickfoot", "Doubletongue", "Nightstabber"],
  },
];

const HEROIC_ABILITIES = [
  {
    name: "Assassin",
    req: "Knives 12",
    wp: "3",
    desc: "Your sneak attack deals an extra D8 damage. This heroic ability can be combined with Backstabbing. You activate it after you roll to hit, but before you roll for damage.",
  },
  {
    name: "Backstabbing",
    req: "Knives 12",
    wp: "3",
    desc: "You can activate this ability when making a melee attack against an enemy that is also within 2 meters of another player character. Your attack counts as a sneak attack — it cannot be dodged or parried, you get a boon to the roll, and the number of damage dice increases by one (e.g. 2D8 instead of D8). Only usable with a subtle weapon. Activating does not count as an action.",
  },
  {
    name: "Battle Cry",
    req: "—",
    wp: "3",
    desc: "As an action in combat, let out a battle cry that inspires your friends. All other player characters within earshot immediately heal a condition of their choice. Only usable in combat.",
  },
  {
    name: "Berserker",
    req: "Any melee weapon skill 12",
    wp: "3",
    desc: "You gain the Angry condition and immediately attack the nearest opponent in melee combat. If already Angry, gain another condition of your choice. You must keep fighting until all opponents within sight are defeated or you reach 0 HP. You gain a boon to melee attacks but cannot parry or dodge. After the fight you become Exhausted.",
  },
  {
    name: "Catlike",
    req: "Acrobatics 12",
    wp: "Varies",
    desc: "The number of D6 rolled for fall damage decreases by one for each WP spent. You can first make an ACROBATICS roll and then activate this ability.",
  },
  {
    name: "Companion",
    req: "Hunting & Fishing 12",
    wp: "3",
    desc: "Turn an animal (not a monster) into your companion. This takes a stretch of time and you can only have one at a time. The GM decides which animals are nearby. The animal follows you in its natural environment and can scout for you at no WP cost. For 3 additional WP you can command it to attack an enemy (free action).",
  },
  {
    name: "Contortionist",
    req: "Evade 12",
    wp: "1",
    desc: "Escape from shackles or squeeze through a narrow space without rolling for any skill.",
  },
  {
    name: "Defensive",
    req: "Any melee weapon skill 12",
    wp: "3",
    desc: "Attempt to parry an attack without consuming your action for the round. The bonus parry can be used at any time during the round. You may only try to parry the same attack once. Can be used multiple times per round as long as you have enough WP.",
  },
  {
    name: "Deflect Arrow",
    req: "Any melee weapon skill 12",
    wp: "1",
    desc: "Parry a ranged attack with a melee weapon instead of a shield.",
  },
  {
    name: "Disguise",
    req: "Bluffing 12",
    wp: "2",
    desc: "After working for a stretch of time, assume another person's looks, voice, and demeanor. The person must be of the same kin. Anyone who knows the person and sees you from up to 10 meters away can make an AWARENESS roll to see through your disguise.",
  },
  {
    name: "Double Slash",
    req: "Axes or Swords 12",
    wp: "3",
    desc: "When wielding a slashing weapon, attack two enemies within 2 meters with a single slash. Roll once — if it succeeds, both are hit. Each enemy can parry or dodge individually. Damage is rolled separately. Can be combined with Dual Wield.",
  },
  {
    name: "Dragonslayer",
    req: "Any weapon skill 12",
    wp: "3",
    desc: "An attack aimed at a monster (not a normal NPC) deals an additional D8 damage. Activate after rolling to hit, before rolling damage.",
  },
  {
    name: "Dual Wield",
    req: "Any melee weapon skill 12",
    wp: "3",
    desc: "Wield a one-handed weapon in each hand. The STR requirement of your off-hand weapon increases by 3. On your turn, perform an extra attack with your second weapon (with a bane). Finish the first attack including damage before rolling the second. Can be combined with Double Slash.",
  },
  {
    name: "Eagle Eye",
    req: "Awareness 12",
    wp: "2",
    desc: "See a person or object up to 200 meters away in great detail for one stretch. In combat, shoot beyond a weapon's effective range without a bane. Must be activated for each new target.",
  },
  {
    name: "Fast Footwork",
    req: "Evade 12",
    wp: "3",
    desc: "Attempt to dodge an attack without consuming your action for the round. The bonus dodge can be performed at any time. You may only try to dodge the same attack once. Can be used multiple times per round as long as you have enough WP.",
  },
  {
    name: "Fast Healer",
    req: "—",
    wp: "2",
    desc: "Heal an extra D6 HP during a stretch rest. Does not affect WP or conditions.",
  },
  {
    name: "Fearless",
    req: "—",
    wp: "2",
    desc: "Automatically resist fear without a WIL roll.",
  },
  {
    name: "Focused",
    req: "—",
    wp: "—",
    desc: "Your maximum Willpower Points is permanently increased by 2. Can be selected multiple times without limit.",
  },
  {
    name: "Guardian",
    req: "Axes, Hammers, or Swords 12",
    wp: "2",
    desc: "When you and another player character are both within 2 meters of the same enemy and it tries to attack the other character, force the enemy to attack you instead. Can be done out of turn; does not count as an action.",
  },
  {
    name: "Insight",
    req: "Persuasion 12",
    wp: "2",
    desc: "After talking a while with a person, roll AWARENESS to determine whether they are telling the truth. You cannot tell exactly what a person is lying about.",
  },
  {
    name: "Intuition",
    req: "Myths & Legends 12",
    wp: "3",
    desc: "When faced with a difficult decision, ask the GM a question and receive a helpful answer. The answer represents your vast general knowledge and should only aid your decision-making, not reveal everything.",
  },
  {
    name: "Iron Fist",
    req: "Brawling 12",
    wp: "1",
    desc: "The damage of an unarmed attack increases to 2D6. Activate as a free action after rolling the attack.",
  },
  {
    name: "Iron Grip",
    req: "Brawling 12",
    wp: "1",
    desc: "Get a boon to your BRAWLING roll when trying to grapple another person or prevent them from breaking free.",
  },
  {
    name: "Lightning Fast",
    req: "Evade 12",
    wp: "2",
    desc: "When drawing an initiative card at the start of a combat round, draw two cards instead of one and choose which to keep. Can only be activated once per round.",
  },
  {
    name: "Lone Wolf",
    req: "Bushcraft 12",
    wp: "—",
    desc: "Take a shift rest in the wilderness without rolling BUSHCRAFT to make camp. The effect only applies to you, even if you have a tent.",
  },
  {
    name: "Magic Talent",
    req: "—",
    wp: "—",
    desc: "Learn a new school of magic (whether you already know any or not). Spells must be learned separately. Can be selected multiple times — once for each new school.",
  },
  {
    name: "Massive Blow",
    req: "Any STR-based melee weapon skill 12",
    wp: "3",
    desc: "A strike with a two-handed melee weapon inflicts D8 additional damage, but you cannot move in the same round. Activate after the roll to hit, but not if you moved.",
  },
  {
    name: "Master Blacksmith",
    req: "Crafting 12",
    wp: "Varies",
    desc: "Requires blacksmithing tools. Spend 3 WP in one stretch to sharpen a bladed or pointed weapon (enemy armor counts one step lower for one encounter). In one shift, craft a metal weapon or armor from the gear lists — requires a forge, anvil, and iron (weight 1). WP cost equals the item's price in silver. Work can be spread across multiple shifts.",
  },
  {
    name: "Master Carpenter",
    req: "Crafting 12",
    wp: "Varies",
    desc: "Requires carpentry tools. As an action, inflict D12 damage per WP spent on a door, wall, or inanimate object, ignoring armor. In one shift, craft a wooden item (club, staff, shield, etc.) from the gear lists — requires wood and WP equal to the item's price in gold. The GM decides cost for unlisted items.",
  },
  {
    name: "Master Chef",
    req: "—",
    wp: "1",
    desc: "Automatically succeed at cooking food without rolling BUSHCRAFT.",
  },
  {
    name: "Master Spellcaster",
    req: "Any magic school 12",
    wp: "3",
    desc: "On your turn in combat, cast two different spells as a single action. Roll for the first spell, then activate this ability.",
  },
  {
    name: "Master Tanner",
    req: "Crafting 12",
    wp: "Varies",
    desc: "Requires leatherworking tools. Craft one set of leather armor from the skin of an animal or monster. The armor gets half the beast's armor rating (rounded up, minimum 1). Takes one shift; WP cost equals the item's armor rating.",
  },
  {
    name: "Monster Hunter",
    req: "Beast Lore 12",
    wp: "3",
    desc: "At a crossroads, activate this ability to learn the direction of the most dangerous enemies.",
  },
  {
    name: "Musician",
    req: "Performance 12",
    wp: "3",
    desc: "As an action in combat, give all allies within 10 meters a boon to all rolls, or give all enemies within the same range a bane — choose one. The effect lasts until your turn in the next round. Musical instruments can increase the ability's range or reduce the WP cost.",
  },
  {
    name: "Pathfinder",
    req: "Bushcraft 12",
    wp: "1",
    desc: "Get a boon to your BUSHCRAFT roll when trying to find the right direction in the wilderness.",
  },
  {
    name: "Quartermaster",
    req: "Bushcraft 12",
    wp: "1",
    desc: "Automatically succeed at making camp during journeys.",
  },
  {
    name: "Robust",
    req: "—",
    wp: "—",
    desc: "Your maximum HP increases by 2. Can be selected multiple times without limit.",
  },
  {
    name: "Sea Legs",
    req: "Swimming 12",
    wp: "1",
    desc: "Activate when performing an action in water (even waist-deep). You are safe from all negative effects of being in water for one round, including the risk of drowning.",
  },
  {
    name: "Shield Block",
    req: "Any STR-based melee weapon skill 12",
    wp: "2",
    desc: "When parrying with a shield, roll with a boon. Also allows you to parry physical monster attacks that normally cannot be parried. Requires a shield. Can be combined with Defensive.",
  },
  {
    name: "Throwing Arm",
    req: "Any melee weapon skill 12",
    wp: "2",
    desc: "Throw a one-handed melee weapon at an enemy within STR meters. Roll the attack as normal; the enemy can parry or dodge. The weapon lands at the enemy's feet.",
  },
  {
    name: "Treasure Hunter",
    req: "Bartering 12",
    wp: "3",
    desc: "At a crossroads, activate this ability to learn the direction of the greatest treasures.",
  },
  {
    name: "Twin Shot",
    req: "Bows 12",
    wp: "3",
    desc: "When attacking with a bow (not crossbow), shoot two arrows instead of one. Roll once to hit with a bane. Damage is rolled separately. Arrows can target the same or different enemies.",
  },
  {
    name: "Veteran",
    req: "Any weapon skill 12",
    wp: "1",
    desc: "At the start of a combat round, retain your initiative card from the previous round instead of drawing a new one. Does not count as an action.",
  },
  {
    name: "Weasel",
    req: "Evade 12",
    wp: "3",
    desc: "If you are attacked and have another player character within 2 meters, let the attack hit that character instead of you. Has no effect against area attacks.",
  },
];

const AGES = [
  {
    name: "Young",
    roll: "1–3",
    totalSkills: 8,
    freeSkills: 2,
    attrMods: { AGL: 1, CON: 1 },
    desc: "+1 AGL, +1 CON (max 18); 8 trained skills (6 profession + 2 free)",
  },
  {
    name: "Adult",
    roll: "4–5",
    totalSkills: 10,
    freeSkills: 4,
    attrMods: {},
    desc: "No attribute changes; 10 trained skills (6 profession + 4 free)",
  },
  {
    name: "Old",
    roll: "6",
    totalSkills: 12,
    freeSkills: 6,
    attrMods: { STR: -2, AGL: -2, CON: -2, INT: 1, WIL: 1 },
    desc: "−2 STR, −2 AGL, −2 CON, +1 INT, +1 WIL; 12 trained skills (6 profession + 6 free)",
  },
];

function ageFromRoll(r) {
  if (r <= 3) return 0;
  if (r <= 5) return 1;
  return 2;
}

const CORE_SKILLS = [
  { name: "Acrobatics", attr: "AGL" },
  { name: "Animism", attr: "WIL" },
  { name: "Awareness", attr: "INT" },
  { name: "Bartering", attr: "CHA" },
  { name: "Beast Lore", attr: "INT" },
  { name: "Bluffing", attr: "CHA" },
  { name: "Brawling", attr: "STR" },
  { name: "Bushcraft", attr: "INT" },
  { name: "Crafting", attr: "STR" },
  { name: "Elementalism", attr: "WIL" },
  { name: "Evade", attr: "AGL" },
  { name: "Healing", attr: "INT" },
  { name: "Hunting & Fishing", attr: "AGL" },
  { name: "Languages", attr: "INT" },
  { name: "Mentalism", attr: "WIL" },
  { name: "Myths & Legends", attr: "INT" },
  { name: "Performance", attr: "CHA" },
  { name: "Persuasion", attr: "CHA" },
  { name: "Riding", attr: "AGL" },
  { name: "Seamanship", attr: "INT" },
  { name: "Sleight of Hand", attr: "AGL" },
  { name: "Sneaking", attr: "AGL" },
  { name: "Spot Hidden", attr: "INT" },
  { name: "Swimming", attr: "AGL" },
  { name: "Axes", attr: "STR" },
  { name: "Bows", attr: "AGL" },
  { name: "Crossbows", attr: "AGL" },
  { name: "Hammers", attr: "STR" },
  { name: "Knives", attr: "AGL" },
  { name: "Slings", attr: "AGL" },
  { name: "Spears", attr: "STR" },
  { name: "Staves", attr: "AGL" },
  { name: "Swords", attr: "STR" },
];

const WEAKNESSES = [
  { name: "Gullible", desc: "I believe everything that others tell me." },
  { name: "Greedy", desc: "I want a bigger share of all treasure." },
  { name: "Thin-skinned", desc: "I never tolerate a provocation." },
  { name: "Foolhardy", desc: "I always go first into danger." },
  { name: "Fainthearted", desc: "I always stay at the back of the group." },
  { name: "Monster Slayer", desc: "All monsters are evil and must be slain." },
  {
    name: "Intolerant",
    desc: "Nightkin such as orcs and goblins are evil and need to be fought.",
  },
  { name: "Slothful", desc: "I take every chance to rest." },
  {
    name: "Gluttonous",
    desc: "I take every chance I get to eat something tasty.",
  },
  {
    name: "Kleptomaniac",
    desc: "I can't stop myself from stealing valuables.",
  },
  {
    name: "Vain",
    desc: "I'll help anyone who gives me praise or compliments.",
  },
  {
    name: "Reckless",
    desc: "I always take big risks without thought of the consequences.",
  },
  {
    name: "Fearful of Magic",
    desc: "Magic is an evil force and mages cannot be trusted.",
  },
  {
    name: "Craving Knowledge",
    desc: "The hunt for knowledge is more important than my friends.",
  },
  { name: "Child of the Wild", desc: "I never sleep indoors." },
  { name: "Boastful", desc: "I always exaggerate my accomplishments." },
  { name: "Violent", desc: "I resort to violence to overcome every obstacle." },
  { name: "Overbearing", desc: "I always tell others what to do." },
  { name: "Cynic", desc: "I always think things will turn out for the worst." },
  { name: "Haughty", desc: "I look down on everyone I meet." },
];

const MEMENTOS = [
  "Your trusty old shoes",
  "A simple silver medallion",
  "A letter from an old friend",
  "A ragged old journal",
  "A bracelet passed down in family",
  "A wooden figurine from childhood",
  "A strangely shaped stone",
  "A copper coin from family legend",
  "An old pewter tankard",
  "A horn taken as trophy from monster",
  "A fang taken as a trophy from a beast",
  "A couple of simple dice made of bone",
  "A locket containing a lock of hair",
  "An ornate key",
  "A hand-drawn map you inherited",
  "A ring with an inscription",
  "A bone whistle",
  "Your mother's or father's ragged old hat",
  "A griffin feather",
  "A beautifully carved pipe",
];

const APPEARANCES = [
  "Ugly scar across your cheek",
  "Strange headgear",
  "Abnormally pale and pasty",
  "A constant smile on your lips",
  "Icy, penetrating gaze",
  "A bit of extra weight",
  "Thin and wiry",
  "Abnormal amounts of body hair",
  "Balding (depending on kin)",
  "Prominent tattoo",
  "Foul body odor",
  "Glorious hairstyle",
  "Limp",
  "Filthy",
  "Honest blue eyes",
  "Silver tooth",
  "Heavily perfumed",
  "Different-colored eyes",
  "Hissing voice",
  "Weathered face",
];

// ─── DERIVED RATINGS HELPERS ───

function baseChance(attrVal) {
  if (attrVal <= 5) return 3;
  if (attrVal <= 8) return 4;
  if (attrVal <= 12) return 5;
  if (attrVal <= 15) return 6;
  return 7;
}

function trainedValue(attrVal) {
  return baseChance(attrVal) * 2;
}

function aglMoveMod(agl) {
  if (agl <= 6) return -4;
  if (agl <= 9) return -2;
  if (agl <= 12) return 0;
  if (agl <= 15) return 2;
  return 4;
}

function damageBonus(val) {
  if (val <= 12) return "—";
  if (val <= 16) return "+D4";
  return "+D6";
}

function skillAttr(skillName) {
  const s = CORE_SKILLS.find((sk) => sk.name === skillName);
  return s ? s.attr : null;
}

// ─── STATE ───

let char = {
  kin: null,
  profession: null,
  magicSchool: null,
  age: null,
  name: "",
  nickname: "",
  attributes: { STR: 0, CON: 0, AGL: 0, INT: 0, WIL: 0, CHA: 0 },
  trainedSkills: [],
  heroicAbility: null,
  weakness: null,
  weaknessDesc: null,
  gear: [],
  memento: null,
  appearance: [],
};

let wizard = {
  step: "intro",
  kinRoll: null,
  professionRoll: null,
  ageRoll: null,
  nameRoll: null,
  nicknameRoll: null,
  gearRoll: null,
  gearBundleIdx: null,
  weaknessRoll: null,
  mementoRoll: null,
  appearanceRolls: [],
  profSkillsChosen: [],
  freeSkillsChosen: [],
  heroicShowAll: false,
  attrAssigned: {
    STR: null,
    CON: null,
    AGL: null,
    INT: null,
    WIL: null,
    CHA: null,
  },
  attrRollIdx: 0,
  swapAttrA: null,
  swapDone: false,
  attrManualMode: false,
};

// ─── WIZARD DISPATCH ───

function renderWizard() {
  const card = document.getElementById("wizard-card");
  const content = document.getElementById("wizard-content");
  card.classList.add("visible");

  // Each step maps to a function name; looked up at call time so future
  // sessions can define them without modifying this dispatch table.
  const stepFnMap = {
    intro: "renderIntro",
    kin: "renderKin",
    profession: "renderProfession",
    magicSchool: "renderMagicSchool",
    age: "renderAge",
    name: "renderNameStep",
    attributes: "renderAttributes",
    derivedRatings: "renderDerivedRatings",
    trainedSkills: "renderTrainedSkills",
    heroicAbility: "renderHeroicAbility",
    weakness: "renderWeakness",
    gear: "renderGear",
    memento: "renderMemento",
    appearance: "renderAppearance",
    summary: "renderFinalSummary",
  };

  const fnName = stepFnMap[wizard.step];
  const renderer = fnName ? window[fnName] : null;
  if (typeof renderer === "function") {
    renderer(content);
  }

  renderSummary();
}

// ─── LIVE SUMMARY ───

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
    const fullName = char.nickname ? `${char.name} "${char.nickname}"` : char.name;
    html += `<div><span class="label">Name</span><br><span class="value">${escapeHtml(fullName)}</span></div>`;
  }
  if (char.kin) {
    html += `<div><span class="label">Kin</span><br><span class="value">${escapeHtml(char.kin)}</span></div>`;
  }
  if (char.profession) {
    const profDisplay = char.magicSchool
      ? `${char.profession} (${char.magicSchool})`
      : char.profession;
    html += `<div><span class="label">Profession</span><br><span class="value">${escapeHtml(profDisplay)}</span></div>`;
  }
  if (char.age) {
    html += `<div><span class="label">Age</span><br><span class="value">${escapeHtml(char.age)}</span></div>`;
  }

  const anyAttr = Object.values(char.attributes).some((v) => v > 0);
  if (anyAttr) {
    for (const attr of ["STR", "CON", "AGL", "INT", "WIL", "CHA"]) {
      const v = char.attributes[attr];
      html += `<div><span class="label">${attr}</span><br><span class="value">${v} <span style="font-weight:normal;font-size:0.8rem;color:var(--text-muted)">(${baseChance(v)}/${trainedValue(v)})</span></span></div>`;
    }
    const hp = char.attributes.CON;
    const wp = char.attributes.WIL;
    const kinData = KIN.find((k) => k.name === char.kin);
    const baseMove = kinData ? kinData.movement : 10;
    const mov = baseMove + aglMoveMod(char.attributes.AGL);
    html += `<div><span class="label">HP / WP / Move</span><br><span class="value">${hp} / ${wp} / ${mov}</span></div>`;
  }

  html += "</div>";

  if (char.kin) {
    const kinData = KIN.find((k) => k.name === char.kin);
    if (kinData) {
      html += '<div class="summary-skills"><h4>Innate Abilities</h4><div class="skill-list">';
      for (const ab of kinData.abilities) {
        const wpText = ab.wp !== null ? ` (WP ${ab.wp})` : "";
        html += `<span class="skill-item">${escapeHtml(ab.name)}${escapeHtml(wpText)}: ${escapeHtml(ab.desc)}</span>`;
      }
      html += "</div></div>";
    }
  }

  if (char.heroicAbility) {
    const heroicData = HEROIC_ABILITIES.find((a) => a.name === char.heroicAbility);
    const heroicDisplay = heroicData
      ? `${char.heroicAbility} (WP ${heroicData.wp})`
      : char.heroicAbility;
    html += `<div class="summary-skills"><h4>Heroic Ability</h4><div class="skill-list"><span class="skill-item">${escapeHtml(heroicDisplay)}</span></div></div>`;
  }

  if (char.trainedSkills.length > 0) {
    html += '<div class="summary-skills"><h4>Trained Skills</h4><div class="skill-list">';
    for (const sk of char.trainedSkills) {
      const attr = skillAttr(sk);
      const attrVal = char.attributes[attr] || 0;
      const tv = attrVal > 0 ? ` <span class="skill-die">${trainedValue(attrVal)}</span>` : "";
      html += `<span class="skill-item">${escapeHtml(sk)}${tv}</span>`;
    }
    html += "</div></div>";
  }

  if (char.weakness) {
    const weaknessDisplay = char.weaknessDesc
      ? `${char.weakness} — ${char.weaknessDesc}`
      : char.weakness;
    html += `<div class="summary-skills"><h4>Weakness</h4><div class="skill-list"><span class="skill-item">${escapeHtml(weaknessDisplay)}</span></div></div>`;
  }

  if (char.memento) {
    html += `<div class="summary-skills"><h4>Memento</h4><div class="skill-list"><span class="skill-item">${escapeHtml(char.memento)}</span></div></div>`;
  }

  if (char.gear.length > 0) {
    html += '<div class="summary-skills"><h4>Gear</h4><div class="skill-list">';
    for (const item of char.gear) {
      html += `<span class="skill-item">${escapeHtml(item)}</span>`;
    }
    html += "</div></div>";
  }

  if (char.appearance.length > 0) {
    html += '<div class="summary-skills"><h4>Appearance</h4><div class="skill-list">';
    for (const trait of char.appearance) {
      html += `<span class="skill-item">${escapeHtml(trait)}</span>`;
    }
    html += "</div></div>";
  }

  content.innerHTML = html;
}

// ─── STEP RENDERERS ───

function renderIntro(el) {
  el.innerHTML =
    "<h3>Dragonbane Character Generator</h3>" +
    "<p>This tool walks you through Dragonbane character creation step by step, following the method from pp. 9–29 of the rulebook. At each step you can roll on the table or choose freely.</p>" +
    "<p>You'll choose your Kin, Profession, Age, Name, Attributes, Skills, Heroic Ability, and more — building a complete adventurer ready for the world of Dragonbane.</p>" +
    '<div class="btn-row"><button class="btn" onclick="startWizard()">Begin</button></div>';
}

function startWizard() {
  wizard.step = "kin";
  renderWizard();
}

// ─── KIN STEP ───

function renderKin(el) {
  const selectedKin = char.kin;

  let html = '<div class="step-title">Step 1 of 12 — Kin</div>';
  html += "<h3>Choose Your Kin</h3>";
  html +=
    "<p>Roll a D12 or choose from the table below. Your kin determines your innate abilities and base movement speed.</p>";

  if (wizard.kinRoll !== null) {
    html += `<div class="dice-result">You rolled <span class="dice-value">${wizard.kinRoll}</span> on a D12</div>`;
  }

  html += '<div class="career-group">';
  for (const [i, kin] of KIN.entries()) {
    const isSelected = selectedKin === kin.name;
    const abilitySummary = kin.abilities.map((a) => a.name).join(", ");
    html += `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectKin(${i})">
      <span class="career-req roll-num-wide">${escapeHtml(kin.roll)}</span>
      <div>
        <span class="career-name">${escapeHtml(kin.name)}</span>
        <span class="career-req"> — Move ${kin.movement} — ${escapeHtml(abilitySummary)}</span>
      </div>
    </div>`;
  }
  html += "</div>";

  if (selectedKin) {
    const kinData = KIN.find((k) => k.name === selectedKin);
    html += '<div class="career-group"><div class="career-group-title">Innate Abilities</div>';
    for (const ab of kinData.abilities) {
      const wpText = ab.wp !== null ? ` — WP cost: ${ab.wp}` : " — No WP cost";
      html += `<div class="career-option disabled"><div>
        <span class="career-name">${escapeHtml(ab.name)}</span>
        <span class="career-req">${escapeHtml(wpText)}: ${escapeHtml(ab.desc)}</span>
      </div></div>`;
    }
    html += "</div>";
  }

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollKin()">Roll D12</button>';
  html += `<button class="btn" onclick="submitKin()"${!selectedKin ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function rollKin() {
  const r = roll(12);
  wizard.kinRoll = r;
  char.kin = kinFromRoll(r);
  renderWizard();
}

function selectKin(idx) {
  char.kin = KIN[idx].name;
  wizard.kinRoll = null;
  renderWizard();
}

function submitKin() {
  if (!char.kin) return;
  wizard.step = "profession";
  renderWizard();
}

// ─── PROFESSION STEP ───

function renderProfession(el) {
  const selectedProf = char.profession;

  let html = '<div class="step-title">Step 2 of 12 — Profession</div>';
  html += "<h3>Choose Your Profession</h3>";
  html +=
    "<p>Roll a D10 or choose from the table. Your profession gives you a skill list, starting gear, and a heroic ability.</p>";

  if (wizard.professionRoll !== null) {
    html += `<div class="dice-result">You rolled <span class="dice-value">${wizard.professionRoll}</span> on a D10</div>`;
  }

  html += '<div class="career-group">';
  for (const [i, prof] of PROFESSIONS.entries()) {
    const isSelected = selectedProf === prof.name;
    let heroicText;
    if (prof.heroicOptions) {
      heroicText = prof.heroicOptions.join(" / ");
    } else if (prof.heroicAbility) {
      heroicText = prof.heroicAbility;
    } else {
      heroicText = "Magic (no heroic ability)";
    }
    html += `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectProfession(${i})">
      <span class="career-req roll-num-wide">${escapeHtml(prof.roll)}</span>
      <div>
        <span class="career-name">${escapeHtml(prof.name)}</span>
        <span class="career-req"> — Key: ${escapeHtml(prof.keyAttr)} — ${escapeHtml(heroicText)}</span>
      </div>
    </div>`;
  }
  html += "</div>";

  if (selectedProf) {
    const profData = PROFESSIONS.find((p) => p.name === selectedProf);
    html += '<div class="career-group"><div class="career-group-title">Profession Skills</div>';
    if (profData.name === "Mage") {
      html +=
        '<div class="skill-list skill-list-padded"><span class="skill-item note-text">Select a magic school on the next screen to see profession skills.</span></div>';
    } else {
      html += '<div class="skill-list skill-list-padded">';
      for (const sk of profData.skills) {
        html += `<span class="skill-item">${escapeHtml(sk)}</span>`;
      }
      html += "</div>";
    }
    html += "</div>";
  }

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollProfession()">Roll D10</button>';
  html += `<button class="btn" onclick="submitProfession()"${!selectedProf ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function rollProfession() {
  const r = roll(10);
  wizard.professionRoll = r;
  char.profession = PROFESSIONS[r - 1].name;
  if (char.profession !== "Mage") char.magicSchool = null;
  renderWizard();
}

function selectProfession(idx) {
  char.profession = PROFESSIONS[idx].name;
  if (char.profession !== "Mage") char.magicSchool = null;
  wizard.professionRoll = null;
  renderWizard();
}

function submitProfession() {
  if (!char.profession) return;
  if (char.profession === "Mage" && !char.magicSchool) {
    wizard.step = "magicSchool";
  } else {
    wizard.step = "age";
  }
  renderWizard();
}

// ─── MAGIC SCHOOL SUB-STEP ───

function renderMagicSchool(el) {
  const profData = PROFESSIONS.find((p) => p.name === "Mage");
  const selected = char.magicSchool;

  let html = '<div class="step-title">Step 2b — Magic School</div>';
  html += "<h3>Choose Your School of Magic</h3>";
  html +=
    "<p>As a Mage, choose your school. Each school provides a unique magic discipline and determines your profession skills.</p>";

  html += '<div class="career-group">';
  const SCHOOLS = ["Animism", "Elementalism", "Mentalism"];
  for (const [i, school] of SCHOOLS.entries()) {
    const isSelected = selected === school;
    const skillList = profData.schools[school].join(", ");
    html += `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectMagicSchool(${i})">
      <div>
        <span class="career-name">${escapeHtml(school)}</span>
        <span class="career-req"> — Skills: ${escapeHtml(skillList)}</span>
      </div>
    </div>`;
  }
  html += "</div>";

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="backToProfession()">Back</button>';
  html += `<button class="btn" onclick="submitMagicSchool()"${!selected ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function selectMagicSchool(idx) {
  char.magicSchool = ["Animism", "Elementalism", "Mentalism"][idx];
  renderWizard();
}

function backToProfession() {
  wizard.step = "profession";
  renderWizard();
}

function submitMagicSchool() {
  if (!char.magicSchool) return;
  wizard.step = "age";
  renderWizard();
}

// ─── AGE STEP ───

function renderAge(el) {
  const selectedAge = char.age;

  let html = '<div class="step-title">Step 3 of 12 — Age</div>';
  html += "<h3>Determine Your Age</h3>";
  html +=
    "<p>Roll a D6 or choose freely. Your age affects your starting attribute modifiers and how many skills you can train.</p>";

  if (wizard.ageRoll !== null) {
    html += `<div class="dice-result">You rolled <span class="dice-value">${wizard.ageRoll}</span> on a D6</div>`;
  }

  html += '<div class="career-group">';
  for (const [i, age] of AGES.entries()) {
    const isSelected = selectedAge === age.name;
    html += `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectAge(${i})">
      <span class="career-req roll-num-wide">${escapeHtml(age.roll)}</span>
      <div>
        <span class="career-name">${escapeHtml(age.name)}</span>
        <span class="career-req"> — ${escapeHtml(age.desc)}</span>
      </div>
    </div>`;
  }
  html += "</div>";

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollAge()">Roll D6</button>';
  html += `<button class="btn" onclick="submitAge()"${!selectedAge ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function rollAge() {
  const r = roll(6);
  wizard.ageRoll = r;
  char.age = AGES[ageFromRoll(r)].name;
  renderWizard();
}

function selectAge(idx) {
  char.age = AGES[idx].name;
  wizard.ageRoll = null;
  renderWizard();
}

function submitAge() {
  if (!char.age) return;
  wizard.step = "name";
  renderWizard();
}

// ─── NAME STEP ───

function renderNameStep(el) {
  const kinNames = KIN_NAMES[char.kin] || [];
  const profData = PROFESSIONS.find((p) => p.name === char.profession);
  const profNicknames = profData ? profData.nicknames : [];

  let html = '<div class="step-title">Step 4 of 12 — Name</div>';
  html += "<h3>Choose Your Name</h3>";
  html += `<p>Roll a D6 to choose a ${escapeHtml(char.kin)} name, or choose a name freely. OPTIONAL: You may also a roll a nickname from your profession's list, or choose one freely.</p>`;

  html += '<div class="career-group"><div class="career-group-title">Name Table (D6)</div>';
  html += '<ul class="d6-table">';
  for (const [i, name] of kinNames.entries()) {
    const isSelected = char.name === name;
    html += `<li class="${isSelected ? "selected" : ""}" role="button" tabindex="0" onclick="selectNameFromTable(${i})">
      <span class="d6-num">${i + 1}</span>
      <span>${escapeHtml(name)}</span>
    </li>`;
  }
  html += "</ul></div>";

  html += '<div class="form-group">';
  html += '<label for="name-input">Name (type to override):</label>';
  html += `<input class="text-input" id="name-input" type="text" value="${escapeHtml(char.name)}" placeholder="Enter a name..." oninput="nameInputChanged(this.value)">`;
  html += "</div>";

  html +=
    '<div class="career-group"><div class="career-group-title">Nickname — optional (D6 from profession table)</div>';
  html += '<ul class="d6-table">';
  for (const [i, nick] of profNicknames.entries()) {
    const isSelected = char.nickname === nick;
    html += `<li class="${isSelected ? "selected" : ""}" role="button" tabindex="0" onclick="selectNicknameFromTable(${i})">
      <span class="d6-num">${i + 1}</span>
      <span>${escapeHtml(nick)}</span>
    </li>`;
  }
  html += "</ul></div>";

  html += '<div class="form-group">';
  html +=
    '<label for="nickname-input">Nickname (type to override, or leave blank to skip):</label>';
  html += `<input class="text-input" id="nickname-input" type="text" value="${escapeHtml(char.nickname)}" placeholder="(optional)" oninput="nicknameInputChanged(this.value)">`;
  html += "</div>";

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollName()">Roll D6 Name</button>';
  html += '<button class="btn btn-secondary" onclick="rollNickname()">Roll D6 Nickname</button>';
  html += `<button class="btn" id="name-continue-btn" onclick="submitNameStep()"${!char.name ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function nameInputChanged(val) {
  char.name = val;
  const btn = document.getElementById("name-continue-btn");
  if (btn) btn.disabled = !val.trim();
}

function nicknameInputChanged(val) {
  char.nickname = val;
}

function selectNameFromTable(idx) {
  char.name = KIN_NAMES[char.kin][idx];
  renderWizard();
}

function selectNicknameFromTable(idx) {
  const profData = PROFESSIONS.find((p) => p.name === char.profession);
  char.nickname = profData ? profData.nicknames[idx] : "";
  renderWizard();
}

function rollName() {
  const r = roll(6);
  wizard.nameRoll = r;
  char.name = KIN_NAMES[char.kin][r - 1];
  renderWizard();
}

function rollNickname() {
  const r = roll(6);
  wizard.nicknameRoll = r;
  const profData = PROFESSIONS.find((p) => p.name === char.profession);
  char.nickname = profData ? profData.nicknames[r - 1] : "";
  renderWizard();
}

function submitNameStep() {
  const nameInput = document.getElementById("name-input");
  if (nameInput) {
    const v = nameInput.value.trim();
    if (v) char.name = v;
  }
  const nicknameInput = document.getElementById("nickname-input");
  if (nicknameInput) {
    char.nickname = nicknameInput.value.trim();
  }
  if (!char.name) return;
  wizard.step = "attributes";
  renderWizard();
}

// ─── ATTRIBUTES STEP ───

const ATTRS = ["STR", "CON", "AGL", "INT", "WIL", "CHA"];

function rollNextAttr() {
  const idx = wizard.attrRollIdx;
  if (idx >= ATTRS.length) return;
  wizard.attrAssigned[ATTRS[idx]] = rollDropLowest(4, 6);
  wizard.attrRollIdx = idx + 1;
  renderWizard();
}

function resetAttrRolls() {
  wizard.attrAssigned = {
    STR: null,
    CON: null,
    AGL: null,
    INT: null,
    WIL: null,
    CHA: null,
  };
  wizard.attrRollIdx = 0;
  wizard.swapAttrA = null;
  wizard.swapDone = false;
  renderWizard();
}

function switchToManual() {
  wizard.attrManualMode = true;
  wizard.attrAssigned = {
    STR: null,
    CON: null,
    AGL: null,
    INT: null,
    WIL: null,
    CHA: null,
  };
  wizard.attrRollIdx = 0;
  wizard.swapAttrA = null;
  wizard.swapDone = false;
  renderWizard();
}

function switchToRolling() {
  wizard.attrManualMode = false;
  wizard.attrAssigned = {
    STR: null,
    CON: null,
    AGL: null,
    INT: null,
    WIL: null,
    CHA: null,
  };
  wizard.attrRollIdx = 0;
  wizard.swapAttrA = null;
  wizard.swapDone = false;
  renderWizard();
}

function setManualAttr(attr, rawVal) {
  const n = parseInt(rawVal, 10);
  wizard.attrAssigned[attr] = !isNaN(n) && n >= 1 && n <= 18 ? n : null;
  const allAssigned = ATTRS.every((a) => wizard.attrAssigned[a] != null);
  const btn = document.getElementById("attr-continue-btn");
  if (btn) btn.disabled = !allAssigned;
}

function clickAttrSlot(attrName) {
  const allAssigned = ATTRS.every((a) => wizard.attrAssigned[a] != null);
  if (!allAssigned || wizard.swapDone) return;
  if (!wizard.swapAttrA) {
    wizard.swapAttrA = attrName;
  } else if (wizard.swapAttrA === attrName) {
    wizard.swapAttrA = null;
  } else {
    const tmp = wizard.attrAssigned[wizard.swapAttrA];
    wizard.attrAssigned[wizard.swapAttrA] = wizard.attrAssigned[attrName];
    wizard.attrAssigned[attrName] = tmp;
    wizard.swapAttrA = null;
    wizard.swapDone = true;
  }
  renderWizard();
}

function submitAttributes() {
  if (!ATTRS.every((a) => wizard.attrAssigned[a] != null)) return;

  for (const attr of ATTRS) {
    char.attributes[attr] = wizard.attrAssigned[attr];
  }

  const ageData = AGES.find((a) => a.name === char.age);
  if (ageData) {
    for (const [attr, mod] of Object.entries(ageData.attrMods)) {
      char.attributes[attr] = Math.max(1, Math.min(18, char.attributes[attr] + mod));
    }
  }

  wizard.step = "derivedRatings";
  renderWizard();
}

function renderAttributes(el) {
  const allAssigned = ATTRS.every((a) => wizard.attrAssigned[a] != null);

  let html = '<div class="step-title">Step 5 of 12 — Attributes</div>';
  html += "<h3>Roll Your Attributes</h3>";

  if (char.age) {
    const ageData = AGES.find((a) => a.name === char.age);
    if (ageData && Object.keys(ageData.attrMods).length > 0) {
      const modDesc = Object.entries(ageData.attrMods)
        .map(([a, v]) => `${v > 0 ? "+" : ""}${v} ${a}`)
        .join(", ");
      html += `<p class="note-text">Age modifiers (${escapeHtml(char.age)}) applied on Continue: ${escapeHtml(modDesc)}</p>`;
    }
  }

  if (wizard.attrManualMode) {
    html +=
      "<p>Enter your scores directly (e.g. using physical dice or an alternate method). Values must be 1–18.</p>";
    html += "<div>";
    for (const attr of ATTRS) {
      const val = wizard.attrAssigned[attr];
      html += `<div class="attr-row">`;
      html += `<span class="attr-name">${attr}</span>`;
      html += `<input type="number" min="1" max="18" value="${val !== null ? val : ""}" class="text-input" style="width:70px;padding:4px 8px;font-size:1.1rem;text-align:center;" oninput="setManualAttr('${attr}', this.value)">`;
      html += "</div>";
    }
    html += "</div>";
    html += '<div class="btn-row" style="margin-top:14px;">';
    html += '<button class="btn btn-secondary" onclick="switchToRolling()">Roll Instead</button>';
    html += `<button class="btn" id="attr-continue-btn" onclick="submitAttributes()"${!allAssigned ? " disabled" : ""}>Continue</button>`;
    html += "</div>";
  } else {
    html +=
      "<p>Roll 4D6, keeping the highest 3, for each attribute. After all attributes are rolled, you may swap any two attribute scores.</p>";

    html += "<div>";
    for (let i = 0; i < ATTRS.length; i++) {
      const attr = ATTRS[i];
      const val = wizard.attrAssigned[attr];
      const isCurrent = i === wizard.attrRollIdx;
      const isSwapA = wizard.swapAttrA === attr;
      const canSwap = allAssigned && !wizard.swapDone;
      const swapClass = isSwapA ? " attr-swap-selected" : "";

      html += `<div class="attr-row${swapClass}"${canSwap ? ` role="button" tabindex="0" style="cursor:pointer;" onclick="clickAttrSlot('${attr}')"` : ""}>`;
      html += `<span class="attr-name">${attr}</span>`;
      if (val !== null) {
        html += `<span class="attr-die">${val}</span>`;
      } else if (isCurrent) {
        html += `<button class="btn btn-secondary btn-small" onclick="event.stopPropagation();rollNextAttr()">Roll 4D6, keep highest 3</button>`;
      } else {
        html += `<span style="color:var(--text-muted);font-size:0.95rem;">—</span>`;
      }
      html += "</div>";
    }
    html += "</div>";

    if (allAssigned) {
      html += '<div class="swap-status">';
      if (wizard.swapDone) {
        html += '<div class="note-text">Swap done. Click Continue when ready.</div>';
      } else if (wizard.swapAttrA) {
        html += `<div class="note-text"><strong>${wizard.swapAttrA}</strong> selected — click another attribute to swap, or click <strong>${wizard.swapAttrA}</strong> again to cancel.</div>`;
      } else {
        html +=
          '<div class="note-text">Optional: click two attributes to swap their values once.</div>';
      }
      html += "</div>";
    }

    html += '<div class="btn-row" style="margin-top:14px;">';
    if (wizard.attrRollIdx > 0) {
      html += '<button class="btn btn-secondary" onclick="resetAttrRolls()">Start Over</button>';
    }
    html += '<button class="btn btn-secondary" onclick="switchToManual()">Enter Manually</button>';
    html += `<button class="btn" id="attr-continue-btn" onclick="submitAttributes()"${!allAssigned ? " disabled" : ""}>Continue</button>`;
    html += "</div>";
  }

  el.innerHTML = html;
}

// ─── DERIVED RATINGS STEP ───

function renderDerivedRatings(el) {
  const a = char.attributes;
  const kinData = KIN.find((k) => k.name === char.kin);
  const baseMove = kinData ? kinData.movement : 10;
  const movMod = aglMoveMod(a.AGL);
  const mov = baseMove + movMod;
  const movModStr = movMod >= 0 ? `+${movMod}` : `${movMod}`;

  let html = '<div class="step-title">Step 6 of 12 — Derived Ratings</div>';
  html += "<h3>Derived Ratings</h3>";
  html += "<p>These values are computed automatically from your attributes and kin.</p>";

  html += "<div>";
  html += `<div class="attr-row">
    <span class="attr-name">HP</span>
    <span class="attr-die">${a.CON}</span>
    <span class="attr-formula">= CON (${a.CON})</span>
  </div>`;
  html += `<div class="attr-row">
    <span class="attr-name">WP</span>
    <span class="attr-die">${a.WIL}</span>
    <span class="attr-formula">= WIL (${a.WIL})</span>
  </div>`;
  html += `<div class="attr-row">
    <span class="attr-name">Movement</span>
    <span class="attr-die">${mov}</span>
    <span class="attr-formula">= ${escapeHtml(char.kin)} base (${baseMove}) ${movModStr} AGL modifier (AGL ${a.AGL})</span>
  </div>`;
  html += `<div class="attr-row">
    <span class="attr-name attr-name-wide">Dmg Bonus (STR)</span>
    <span class="attr-die">${escapeHtml(damageBonus(a.STR))}</span>
    <span class="attr-formula">STR ${a.STR}</span>
  </div>`;
  html += `<div class="attr-row">
    <span class="attr-name attr-name-wide">Dmg Bonus (AGL)</span>
    <span class="attr-die">${escapeHtml(damageBonus(a.AGL))}</span>
    <span class="attr-formula">AGL ${a.AGL}</span>
  </div>`;
  html += "</div>";

  html +=
    '<div class="btn-row"><button class="btn" onclick="submitDerivedRatings()">Continue</button></div>';
  el.innerHTML = html;
}

function submitDerivedRatings() {
  wizard.step = "trainedSkills";
  renderWizard();
}

// ─── TRAINED SKILLS STEP ───

function _getSkillStepData() {
  const profData = PROFESSIONS.find((p) => p.name === char.profession);
  const ageData = AGES.find((a) => a.name === char.age);
  const freeSkillCount = ageData ? ageData.freeSkills : 2;

  let autoAdded = [];
  let profPool = [];
  let profNeeded = 6;

  if (char.profession === "Mage" && char.magicSchool && profData) {
    const schoolSkills = profData.schools[char.magicSchool];
    autoAdded = [schoolSkills[0]]; // magic discipline skill auto-fills one profession slot
    profPool = schoolSkills.slice(1);
    profNeeded = 5;
  } else if (profData) {
    profPool = profData.skills;
  }

  return { autoAdded, profPool, profNeeded, freeSkillCount };
}

function renderTrainedSkills(el) {
  const { autoAdded, profPool, profNeeded, freeSkillCount } = _getSkillStepData();
  const profChosen = wizard.profSkillsChosen;
  const allChosenProf = [...autoAdded, ...profChosen];

  const freeChosen = wizard.freeSkillsChosen;

  const profOk = profChosen.length === profNeeded;
  const freeOk = freeChosen.length === freeSkillCount;

  let html = '<div class="step-title">Step 7 of 12 — Trained Skills</div>';
  html += "<h3>Choose Your Trained Skills</h3>";
  html += `<p>Pick <strong>${profNeeded}</strong> skills from your profession list and <strong>${freeSkillCount}</strong> free skills from any skill. Trained value = 2× base chance of the linked attribute.</p>`;

  // Auto-added profession skill (Mage only)
  if (autoAdded.length > 0) {
    html +=
      '<div class="career-group"><div class="career-group-title">Auto-Added (Magic School)</div>';
    for (const sk of autoAdded) {
      const attr = skillAttr(sk);
      const av = char.attributes[attr] || 0;
      html += `<div class="career-option disabled">
        <div><span class="career-name">${escapeHtml(sk)}</span><span class="career-req"> (${attr}) — Base: ${baseChance(av)} — Trained: ${trainedValue(av)}</span></div>
      </div>`;
    }
    html += "</div>";
  }

  // Profession skills
  html += `<div class="career-group"><div class="career-group-title">Profession Skills — pick ${profNeeded} (${profChosen.length}/${profNeeded} chosen)</div>`;
  for (const [i, sk] of profPool.entries()) {
    const isChosen = profChosen.includes(sk);
    const attr = skillAttr(sk);
    const av = char.attributes[attr] || 0;
    html += `<div class="career-option${isChosen ? " selected" : ""}" role="button" tabindex="0" onclick="toggleProfSkill(${i})">
      <div><span class="career-name">${escapeHtml(sk)}</span><span class="career-req"> (${attr}) — Base: ${baseChance(av)} — Trained: ${trainedValue(av)}</span></div>
    </div>`;
  }
  html += "</div>";

  // Free skills — all core skills except those already committed to profession slots
  html += `<div class="career-group"><div class="career-group-title">Free Skills — pick any ${freeSkillCount} (${freeChosen.length}/${freeSkillCount} chosen)</div>`;
  for (const [i, sk] of CORE_SKILLS.entries()) {
    if (allChosenProf.includes(sk.name)) continue;
    const isChosen = freeChosen.includes(sk.name);
    const av = char.attributes[sk.attr] || 0;
    html += `<div class="career-option${isChosen ? " selected" : ""}" role="button" tabindex="0" onclick="toggleFreeSkill(${i})">
      <div><span class="career-name">${escapeHtml(sk.name)}</span><span class="career-req"> (${sk.attr}) — Base: ${baseChance(av)} — Trained: ${trainedValue(av)}</span></div>
    </div>`;
  }
  html += "</div>";

  html += `<div class="btn-row"><button class="btn" onclick="submitTrainedSkills()"${!(profOk && freeOk) ? " disabled" : ""}>Continue</button></div>`;
  el.innerHTML = html;
}

function toggleProfSkill(poolIdx) {
  const { profPool, profNeeded } = _getSkillStepData();
  const sk = profPool[poolIdx];
  const idx = wizard.profSkillsChosen.indexOf(sk);
  if (idx >= 0) {
    wizard.profSkillsChosen.splice(idx, 1);
  } else if (wizard.profSkillsChosen.length < profNeeded) {
    wizard.profSkillsChosen.push(sk);
    wizard.freeSkillsChosen = wizard.freeSkillsChosen.filter((s) => s !== sk);
  }
  renderWizard();
}

function toggleFreeSkill(coreIdx) {
  const { freeSkillCount, autoAdded } = _getSkillStepData();
  const sk = CORE_SKILLS[coreIdx].name;
  const allChosenProf = [...autoAdded, ...wizard.profSkillsChosen];
  if (allChosenProf.includes(sk)) return;

  const idx = wizard.freeSkillsChosen.indexOf(sk);
  if (idx >= 0) {
    wizard.freeSkillsChosen.splice(idx, 1);
  } else if (wizard.freeSkillsChosen.length < freeSkillCount) {
    wizard.freeSkillsChosen.push(sk);
  }
  renderWizard();
}

function submitTrainedSkills() {
  const { autoAdded, profNeeded, freeSkillCount } = _getSkillStepData();
  if (wizard.profSkillsChosen.length !== profNeeded) return;
  if (wizard.freeSkillsChosen.length !== freeSkillCount) return;

  char.trainedSkills = [...autoAdded, ...wizard.profSkillsChosen, ...wizard.freeSkillsChosen];
  wizard.step = "heroicAbility";
  renderWizard();
}

// ─── HEROIC ABILITY STEP ───

function _heroicAbilityCard(abilityName, showReq) {
  const data = HEROIC_ABILITIES.find((a) => a.name === abilityName);
  const isSelected = char.heroicAbility === abilityName;
  const idx = HEROIC_ABILITIES.findIndex((a) => a.name === abilityName);
  let meta = data ? ` — WP: ${escapeHtml(data.wp)}` : "";
  if (showReq && data) meta += ` — Req: ${escapeHtml(data.req)}`;
  return (
    `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectHeroicAbility(${idx})">` +
    '<div style="min-width:0;overflow-wrap:break-word;">' +
    `<span class="career-name">${escapeHtml(abilityName)}</span>` +
    `<span class="career-req">${meta}</span>` +
    (data ? `<div class="note-text" style="margin-top:4px;">${escapeHtml(data.desc)}</div>` : "") +
    "</div></div>"
  );
}

function renderHeroicAbility(el) {
  const profData = PROFESSIONS.find((p) => p.name === char.profession);
  const isMage = char.profession === "Mage";
  const isArtisan = char.profession === "Artisan";

  // Auto-select profession default on first entry
  if (!isMage && !isArtisan && !char.heroicAbility && profData && profData.heroicAbility) {
    char.heroicAbility = profData.heroicAbility;
  }

  let html = '<div class="step-title">Step 8 of 12 — Heroic Ability</div>';
  html += "<h3>Heroic Ability</h3>";

  if (isMage) {
    html +=
      "<p>As a Mage, you don't have a heroic ability — instead you have access to magic through your chosen school of " +
      escapeHtml(char.magicSchool || "") +
      ".</p>";
    html +=
      '<div class="career-group"><div class="career-option disabled"><div>' +
      '<span class="career-name">Magic (' +
      escapeHtml(char.magicSchool || "") +
      ")</span>" +
      '<span class="career-req"> — No heroic ability; magic replaces it</span>' +
      "</div></div></div>";
    html +=
      '<div class="btn-row"><button class="btn" onclick="submitHeroicAbility()">Continue</button></div>';
    el.innerHTML = html;
    return;
  }

  html +=
    "<p>Your profession grants you one starting heroic ability. With GM approval you may choose a different one.</p>";
  html +=
    '<p class="note-text">Skill requirements are for learning new heroic abilities during the campaign — they do not apply to your starting heroic ability.</p>';

  if (!wizard.heroicShowAll) {
    const defaultList = isArtisan
      ? ["Master Blacksmith", "Master Carpenter", "Master Tanner"]
      : profData && profData.heroicAbility
        ? [profData.heroicAbility]
        : [];

    if (isArtisan) {
      html += "<p>Artisans choose one of three heroic abilities reflecting their craft:</p>";
    }
    html += '<div class="career-group">';
    for (const name of defaultList) {
      html += _heroicAbilityCard(name, false);
    }
    html += "</div>";
    html += '<div class="btn-row">';
    html +=
      '<button class="btn btn-secondary" onclick="toggleHeroicShowAll()">Choose a different ability (GM approval required)</button>';
  } else {
    html += '<div class="career-group"><div class="career-group-title">All Heroic Abilities</div>';
    for (const ability of HEROIC_ABILITIES) {
      html += _heroicAbilityCard(ability.name, true);
    }
    html += "</div>";
    html += '<div class="btn-row">';
    html +=
      '<button class="btn btn-secondary" onclick="toggleHeroicShowAll()">Show profession default only</button>';
  }

  html += `<button class="btn" onclick="submitHeroicAbility()"${!char.heroicAbility ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function selectHeroicAbility(idx) {
  char.heroicAbility = HEROIC_ABILITIES[idx].name;
  wizard.heroicShowAll = false;
  renderWizard();
}

function toggleHeroicShowAll() {
  wizard.heroicShowAll = !wizard.heroicShowAll;
  renderWizard();
}

function submitHeroicAbility() {
  if (char.profession === "Mage") {
    char.heroicAbility = null;
  } else if (!char.heroicAbility) {
    return;
  }
  wizard.step = "weakness";
  renderWizard();
}

// ─── WEAKNESS STEP ───

function renderWeakness(el) {
  const selected = char.weakness;

  let html = '<div class="step-title">Step 9 of 12 — Weakness</div>';
  html += "<h3>Choose a Weakness</h3>";
  html +=
    "<p>Optional: Roll a D20 to choose a weakness, or choose one freely. Weaknesses aren't required, but can be fun for roleplaying.</p>";

  if (wizard.weaknessRoll !== null) {
    html += `<div class="dice-result">You rolled <span class="dice-value">${wizard.weaknessRoll}</span> on a D20</div>`;
  }

  html += '<div class="career-group">';
  for (const [i, w] of WEAKNESSES.entries()) {
    const isSelected = selected === w.name;
    html +=
      `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectWeakness(${i})">` +
      "<div>" +
      `<span class="career-req roll-num-wide">${i + 1}</span>` +
      `<span class="career-name">${escapeHtml(w.name)}</span>` +
      `<span class="career-req"> — ${escapeHtml(w.desc)}</span>` +
      "</div></div>";
  }
  html += "</div>";

  html += '<div class="form-group" style="margin-top:12px;">';
  html += '<label for="weakness-name-input">Custom weakness name:</label>';
  html += `<input class="text-input" id="weakness-name-input" type="text" value="${escapeHtml(selected || "")}" placeholder="e.g. Stubborn" oninput="weaknessNameChanged(this.value)">`;
  html += "</div>";
  html += '<div class="form-group">';
  html += '<label for="weakness-desc-input">Custom weakness description (optional):</label>';
  html += `<input class="text-input" id="weakness-desc-input" type="text" value="${escapeHtml(char.weaknessDesc || "")}" placeholder="e.g. I never admit when I am wrong." oninput="weaknessDescChanged(this.value)">`;
  html += "</div>";

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollWeakness()">Roll D20</button>';
  html += '<button class="btn btn-secondary" onclick="skipWeakness()">Skip</button>';
  html += `<button class="btn" id="weakness-continue-btn" onclick="submitWeakness()"${!selected ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function weaknessNameChanged(val) {
  char.weakness = val.trim() || null;
  const btn = document.getElementById("weakness-continue-btn");
  if (btn) btn.disabled = !char.weakness;
}

function weaknessDescChanged(val) {
  char.weaknessDesc = val.trim() || null;
}

function rollWeakness() {
  const r = roll(20);
  wizard.weaknessRoll = r;
  char.weakness = WEAKNESSES[r - 1].name;
  char.weaknessDesc = WEAKNESSES[r - 1].desc;
  renderWizard();
}

function selectWeakness(idx) {
  char.weakness = WEAKNESSES[idx].name;
  char.weaknessDesc = WEAKNESSES[idx].desc;
  wizard.weaknessRoll = null;
  renderWizard();
}

function skipWeakness() {
  char.weakness = null;
  char.weaknessDesc = null;
  wizard.weaknessRoll = null;
  wizard.step = "gear";
  renderWizard();
}

function submitWeakness() {
  if (!char.weakness) return;
  wizard.step = "gear";
  renderWizard();
}

// ─── GEAR STEP ───

function _gearBundles(profData) {
  return profData.gear;
}

function renderGear(el) {
  const profData = PROFESSIONS.find((p) => p.name === char.profession);
  const bundles = _gearBundles(profData);

  let html = '<div class="step-title">Step 10 of 12 — Gear</div>';
  html += "<h3>Starting Gear</h3>";
  html +=
    "<p>Roll a D6 or pick one of the three gear bundles for your " +
    escapeHtml(char.profession) +
    ".</p>";

  if (wizard.gearRoll !== null) {
    html += `<div class="dice-result">You rolled <span class="dice-value">${wizard.gearRoll}</span> on a D6 → Bundle ${wizard.gearBundleIdx + 1}</div>`;
  }

  html += '<div class="career-group">';
  for (const [i, bundle] of bundles.entries()) {
    const isSelected = wizard.gearBundleIdx === i;
    const items = bundle.split(", ");
    html +=
      `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectGear(${i})">` +
      "<div>" +
      `<span class="career-name">Bundle ${i + 1}</span>` +
      '<div class="skill-list" style="margin-top:4px;">';
    for (const item of items) {
      html += `<span class="skill-item">${escapeHtml(item.trim())}</span>`;
    }
    html += "</div></div></div>";
  }
  html += "</div>";

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollGear()">Roll D6</button>';
  html += `<button class="btn" onclick="submitGear()"${wizard.gearBundleIdx === null ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function rollGear() {
  const r = roll(6);
  wizard.gearRoll = r;
  wizard.gearBundleIdx = Math.floor((r - 1) / 2);
  renderWizard();
}

function selectGear(bundleIdx) {
  wizard.gearBundleIdx = bundleIdx;
  wizard.gearRoll = null;
  renderWizard();
}

function submitGear() {
  if (wizard.gearBundleIdx === null) return;
  const profData = PROFESSIONS.find((p) => p.name === char.profession);
  const bundles = _gearBundles(profData);
  char.gear = bundles[wizard.gearBundleIdx].split(", ").map((s) => s.trim());
  wizard.step = "memento";
  renderWizard();
}

// ─── MEMENTO STEP ───

function renderMemento(el) {
  const selected = char.memento;

  let html = '<div class="step-title">Step 11 of 12 — Memento</div>';
  html += "<h3>Choose a Memento</h3>";
  html +=
    "<p>Optional: Roll a D20 to choose a memento, or choose one freely. Mementos are small personal items that tell a story about your character.</p>";

  if (wizard.mementoRoll !== null) {
    html += `<div class="dice-result">You rolled <span class="dice-value">${wizard.mementoRoll}</span> on a D20</div>`;
  }

  html += '<div class="career-group">';
  for (const [i, m] of MEMENTOS.entries()) {
    const isSelected = selected === m;
    html +=
      `<div class="career-option${isSelected ? " selected" : ""}" role="button" tabindex="0" onclick="selectMemento(${i})">` +
      "<div>" +
      `<span class="career-req roll-num-wide">${i + 1}</span>` +
      `<span class="career-name">${escapeHtml(m)}</span>` +
      "</div></div>";
  }
  html += "</div>";

  html += '<div class="form-group" style="margin-top:12px;">';
  html += '<label for="memento-input">Type your own memento (optional):</label>';
  html += `<input class="text-input" id="memento-input" type="text" value="${escapeHtml(selected || "")}" placeholder="Describe your memento..." oninput="mementoInputChanged(this.value)">`;
  html += "</div>";

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollMemento()">Roll D20</button>';
  html += '<button class="btn btn-secondary" onclick="skipMemento()">Skip</button>';
  html += `<button class="btn" id="memento-continue-btn" onclick="submitMemento()"${!selected ? " disabled" : ""}>Continue</button>`;
  html += "</div>";

  el.innerHTML = html;
}

function mementoInputChanged(val) {
  char.memento = val.trim() || null;
  const btn = document.getElementById("memento-continue-btn");
  if (btn) btn.disabled = !char.memento;
}

function rollMemento() {
  const r = roll(20);
  wizard.mementoRoll = r;
  char.memento = MEMENTOS[r - 1];
  renderWizard();
}

function selectMemento(idx) {
  char.memento = MEMENTOS[idx];
  wizard.mementoRoll = null;
  renderWizard();
}

function skipMemento() {
  char.memento = null;
  wizard.mementoRoll = null;
  wizard.step = "appearance";
  renderWizard();
}

function submitMemento() {
  if (!char.memento) return;
  wizard.step = "appearance";
  renderWizard();
}

// ─── APPEARANCE STEP ───

function renderAppearance(el) {
  let html = '<div class="step-title">Step 12 of 12 — Appearance</div>';
  html += "<h3>Describe Your Appearance</h3>";
  html +=
    "<p>Optional: Roll a D20 for a random appearance trait — you can roll multiple times. Click a table entry to toggle it. Click an active trait to remove it. You can also add custom traits.</p>";

  if (wizard.appearanceRolls.length > 0) {
    const lastRoll = wizard.appearanceRolls[wizard.appearanceRolls.length - 1];
    html += `<div class="dice-result">Last rolled <span class="dice-value">${lastRoll}</span> on a D20</div>`;
  }

  if (char.appearance.length > 0) {
    html +=
      '<div class="career-group"><div class="career-group-title">Selected Traits (click to remove)</div>';
    html += '<div class="skill-list skill-list-padded">';
    for (const [i, trait] of char.appearance.entries()) {
      html += `<span class="skill-item removable" role="button" tabindex="0" onclick="removeAppearance(${i})">✕ ${escapeHtml(trait)}</span>`;
    }
    html += "</div></div>";
  }

  html += '<div class="career-group"><div class="career-group-title">Appearance Table (D20)</div>';
  for (const [i, a] of APPEARANCES.entries()) {
    const alreadyAdded = char.appearance.includes(a);
    html +=
      `<div class="career-option${alreadyAdded ? " selected" : ""}" role="button" tabindex="0" onclick="toggleAppearanceTrait(${i})">` +
      "<div>" +
      `<span class="career-req roll-num-wide">${i + 1}</span>` +
      `<span class="career-name">${escapeHtml(a)}</span>` +
      "</div></div>";
  }
  html += "</div>";

  html += '<div class="form-group">';
  html += '<label for="appearance-input">Add custom text (optional):</label>';
  html += '<div style="display:flex;gap:8px;align-items:center;">';
  html +=
    '<input class="text-input input-grow" id="appearance-input" type="text" placeholder="Describe a feature...">';
  html += '<button class="btn btn-secondary" onclick="addCustomAppearance()">Add</button>';
  html += "</div></div>";

  html += '<div class="btn-row">';
  html += '<button class="btn btn-secondary" onclick="rollAppearance()">Roll D20</button>';
  html += '<button class="btn" onclick="submitAppearance()">Continue</button>';
  html += "</div>";

  el.innerHTML = html;
}

function rollAppearance() {
  const r = roll(20);
  wizard.appearanceRolls.push(r);
  const trait = APPEARANCES[r - 1];
  if (!char.appearance.includes(trait)) {
    char.appearance.push(trait);
  }
  renderWizard();
}

function toggleAppearanceTrait(idx) {
  const trait = APPEARANCES[idx];
  const pos = char.appearance.indexOf(trait);
  if (pos >= 0) {
    char.appearance.splice(pos, 1);
  } else {
    char.appearance.push(trait);
  }
  renderWizard();
}

function removeAppearance(idx) {
  char.appearance.splice(idx, 1);
  renderWizard();
}

function addCustomAppearance() {
  const input = document.getElementById("appearance-input");
  if (!input) return;
  const val = input.value.trim();
  if (!val || char.appearance.includes(val)) return;
  char.appearance.push(val);
  input.value = "";
  renderWizard();
}

function submitAppearance() {
  wizard.step = "summary";
  renderWizard();
}

// ─── FINAL SUMMARY ───

function renderFinalSummary(el) {
  const kinData = KIN.find((k) => k.name === char.kin);
  const a = char.attributes;
  const baseMove = kinData ? kinData.movement : 10;
  const mov = baseMove + aglMoveMod(a.AGL);

  const fullName = char.nickname ? `${char.name} "${char.nickname}"` : char.name;
  const profDisplay = char.magicSchool
    ? `${char.profession} (${char.magicSchool})`
    : char.profession;

  let html = `<h2 style="margin-top:0;">${escapeHtml(fullName || "Your Character")}</h2>`;
  html += `<div style="color:var(--text-muted);margin-bottom:16px;">${escapeHtml(char.age)} ${escapeHtml(char.kin)} ${escapeHtml(profDisplay)}</div>`;

  html += "<h4>Attributes</h4>";
  html += '<div class="summary-grid" style="margin-bottom:16px;">';
  for (const attr of ATTRS) {
    const v = a[attr];
    html +=
      `<div><span class="label">${attr}</span><br><span class="value">${v}</span><br>` +
      `<span style="font-size:0.75rem;color:var(--text-muted)">Base ${baseChance(v)} / Trained ${trainedValue(v)}</span></div>`;
  }
  html += "</div>";

  html += "<h4>Derived Ratings</h4>";
  html += '<div class="summary-grid" style="margin-bottom:16px;">';
  html += `<div><span class="label">HP</span><br><span class="value">${a.CON}</span></div>`;
  html += `<div><span class="label">WP</span><br><span class="value">${a.WIL}</span></div>`;
  html += `<div><span class="label">Movement</span><br><span class="value">${mov}</span></div>`;
  html += `<div><span class="label">Dmg Bonus (STR)</span><br><span class="value">${escapeHtml(damageBonus(a.STR))}</span></div>`;
  html += `<div><span class="label">Dmg Bonus (AGL)</span><br><span class="value">${escapeHtml(damageBonus(a.AGL))}</span></div>`;
  html += "</div>";

  if (kinData) {
    html += "<h4>Innate Abilities</h4>";
    html += '<div class="skill-list" style="margin-bottom:16px;">';
    for (const ab of kinData.abilities) {
      const wpText = ab.wp !== null ? ` (WP ${ab.wp})` : "";
      html += `<span class="skill-item"><strong>${escapeHtml(ab.name)}${escapeHtml(wpText)}:</strong> ${escapeHtml(ab.desc)}</span>`;
    }
    html += "</div>";
  }

  if (char.heroicAbility) {
    const heroicData = HEROIC_ABILITIES.find((a) => a.name === char.heroicAbility);
    html += "<h4>Heroic Ability</h4>";
    html += '<div class="skill-list" style="margin-bottom:16px;">';
    html += `<span class="skill-item"><strong>${escapeHtml(char.heroicAbility)}</strong>`;
    if (heroicData) html += ` (WP ${escapeHtml(heroicData.wp)}) — ${escapeHtml(heroicData.desc)}`;
    html += "</span></div>";
  } else if (char.profession === "Mage") {
    html += "<h4>Magic School</h4>";
    html += `<div class="skill-list" style="margin-bottom:16px;"><span class="skill-item">${escapeHtml(char.magicSchool || "")} (replaces heroic ability)</span></div>`;
  }

  if (char.trainedSkills.length > 0) {
    html += "<h4>Trained Skills</h4>";
    html += '<div class="skill-list" style="margin-bottom:16px;">';
    for (const sk of char.trainedSkills) {
      const attr = skillAttr(sk);
      const av = a[attr] || 0;
      html += `<span class="skill-item"><strong>${escapeHtml(sk)}</strong> (${attr}) — Trained: ${trainedValue(av)}</span>`;
    }
    html += "</div>";
  }

  if (char.weakness) {
    html += "<h4>Weakness</h4>";
    html += '<div class="skill-list" style="margin-bottom:16px;">';
    html += `<span class="skill-item"><strong>${escapeHtml(char.weakness)}</strong>`;
    if (char.weaknessDesc) html += ` — ${escapeHtml(char.weaknessDesc)}`;
    html += "</span></div>";
  }

  if (char.gear.length > 0) {
    html += "<h4>Starting Gear</h4>";
    html += '<div class="skill-list" style="margin-bottom:16px;">';
    for (const item of char.gear) {
      html += `<span class="skill-item">${escapeHtml(item)}</span>`;
    }
    html += "</div>";
  }

  if (char.memento) {
    html += "<h4>Memento</h4>";
    html += `<div class="skill-list" style="margin-bottom:16px;"><span class="skill-item">${escapeHtml(char.memento)}</span></div>`;
  }

  if (char.appearance.length > 0) {
    html += "<h4>Appearance</h4>";
    html += '<div class="skill-list" style="margin-bottom:16px;">';
    for (const trait of char.appearance) {
      html += `<span class="skill-item">${escapeHtml(trait)}</span>`;
    }
    html += "</div>";
  }

  html +=
    '<div class="btn-row"><button class="btn btn-secondary" onclick="restartWizard()">Start Over</button></div>';

  el.innerHTML = html;
}

function restartWizard() {
  char = {
    kin: null,
    profession: null,
    magicSchool: null,
    age: null,
    name: "",
    nickname: "",
    attributes: { STR: 0, CON: 0, AGL: 0, INT: 0, WIL: 0, CHA: 0 },
    trainedSkills: [],
    heroicAbility: null,
    weakness: null,
    weaknessDesc: null,
    gear: [],
    memento: null,
    appearance: [],
  };
  wizard = {
    step: "intro",
    kinRoll: null,
    professionRoll: null,
    ageRoll: null,
    nameRoll: null,
    nicknameRoll: null,
    gearRoll: null,
    gearBundleIdx: null,
    weaknessRoll: null,
    mementoRoll: null,
    appearanceRolls: [],
    profSkillsChosen: [],
    freeSkillsChosen: [],
    heroicShowAll: false,
    attrAssigned: {
      STR: null,
      CON: null,
      AGL: null,
      INT: null,
      WIL: null,
      CHA: null,
    },
    attrRollIdx: 0,
    swapAttrA: null,
    swapDone: false,
    attrManualMode: false,
  };
  window.scrollTo(0, 0);
  renderWizard();
}

// ─── ENTRY POINT ───

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target;
  if (el.getAttribute("role") === "button") {
    e.preventDefault();
    el.click();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderWizard();
});
