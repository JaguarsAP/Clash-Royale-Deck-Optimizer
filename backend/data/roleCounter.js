// roleCounters.js

const roleCounters = {
  "Swarm": ["Splash", "Spell"],
  "Air": ["Antiair"],
  "Tank": ["Antitank", "DPS", "Swarm"],
  "Minitank": ["DPS", "Swarm"],
  "Melee": ["Ranged"],
  "Ranged": ["Spell"],
  "DPS": ["Swarm", "Minitank"],
  "Splash": ["Melee", "DPS"],
  "Antitank": ["Tank", "Wincon"],
  "Support": ["Spell", "Melee"],
  "Wincon": ["Building", "DPS", "Swarm"],
};

module.exports = roleCounters;
