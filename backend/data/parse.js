const cardData = require('./cardData');

/**
 * Parses a given input deck and returns detailed info.
 * @param {string[]} inputDeck - Array of 8 card names.
 * @returns {Object[]} Parsed deck details or errors.
 */
function parseInputDeck(inputDeck) {
  if (inputDeck.length !== 8) {
    throw new Error('Deck must contain exactly 8 cards.');
  }

  return inputDeck.map(cardName => {
    const data = cardData[cardName];
    if (!data) {
      throw new Error(`Card "${cardName}" not found in cardData.`);
    }

    // Split into roles and elixir cost
    const roles = data.slice(0, -1); // All except last
    const elixir = typeof data[data.length - 1] === 'number' ? data[data.length - 1] : null;

    return {
      name: cardName,
      roles,
      elixir
    };
  });
}

const inputDeck = [
  "Hog Rider",
  "Musketeer",
  "Cannon",
  "Ice Spirit",
  "Skeletons",
  "Fireball",
  "Log",
  "Knight"
];

try {
  const parsedDeck = parseInputDeck(inputDeck);
  console.log(parsedDeck);
} catch (err) {
  console.error(err.message);
}

/** Counts the number of times each role appears in the deck.
 * @param {Object[]} parsedDeck - Array of parsed card objects.
 * @returns {Object} Map of role → count.
 */
function countRoles(parsedDeck) {
  const roleCounts = {};

  parsedDeck.forEach(card => {
    card.roles.forEach(role => {
      if (role in roleCounts) {
        roleCounts[role]++;
      } else {
        roleCounts[role] = 1;
      }
    });
  });

  return roleCounts;
}
const roleCounters = require('./roleCounters');
const cardData = require('./cardData');

function sortRoleCounts(roleCounts) {
  return Object.entries(roleCounts)
    .sort((a, b) => b[1] - a[1]) // descending
    .reduce((acc, [role, count]) => {
      acc[role] = count;
      return acc;
    }, {});
}
/*
 * @param {Object} roleCounts - Map of roles in the enemy deck (e.g., {Swarm: 3, Tank: 2})
 * @param {Object} roleCounters - Map of role → counter roles
 * @returns {Object} counterRolesNeeded - Map of counter roles → priority weight
 */
function getDesiredCounterRoles(roleCounts, roleCounters) {
  const counterRolesNeeded = {};

  for (const role in roleCounts) {
    const roleFreq = roleCounts[role];
    const counters = roleCounters[role] || [];

    counters.forEach(counterRole => {
      if (!counterRolesNeeded[counterRole]) {
        counterRolesNeeded[counterRole] = 0;
      }
      counterRolesNeeded[counterRole] += roleFreq;
    });
  }

  return counterRolesNeeded;
}

function scoreCard(cardName, cardRoles, counterRolesNeeded) {
  const [roles, elixir] = [
    cardRoles.slice(0, -1),
    typeof cardRoles[cardRoles.length - 1] === 'number' ? cardRoles[cardRoles.length - 1] : null
  ];

  const score = roles.reduce((sum, role) => {
    return sum + (counterRolesNeeded[role] || 0);
  }, 0);

  return { name: cardName, roles, elixir, score };
}

function buildCounterDeck(counterRolesNeeded, cardData, maxAvgElixir = 4) {
  const scoredCards = Object.entries(cardData)
    .map(([name, data]) => scoreCard(name, data, counterRolesNeeded))
    .filter(card => card.elixir !== null) // filter out unplayable cards
    .sort((a, b) => b.score - a.score); // highest score first

  const selected = [];
  let totalElixir = 0;

  for (const card of scoredCards) {
    if (selected.length >= 8) break;

    // Tentative new average
    const newTotalElixir = totalElixir + card.elixir;
    const newAvg = newTotalElixir / (selected.length + 1);

    if (newAvg <= maxAvgElixir) {
      selected.push(card);
      totalElixir = newTotalElixir;
    }
  }

  return {
    deck: selected.map(c => c.name),
    avgElixir: (totalElixir / selected.length).toFixed(2)
  };
}


function scoreCard(cardName, cardRoles, counterRolesNeeded) {
  const [roles, elixir] = [
    cardRoles.slice(0, -1),
    typeof cardRoles[cardRoles.length - 1] === 'number' ? cardRoles[cardRoles.length - 1] : null
  ];

  const score = roles.reduce((sum, role) => {
    return sum + (counterRolesNeeded[role] || 0);
  }, 0);

  return { name: cardName, roles, elixir, score };
}
