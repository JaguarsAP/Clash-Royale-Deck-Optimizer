const axios = require('axios');

const BASE_URL = 'https://api.clashroyale.com/v1';
const HEADERS = {
  Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`
};

/**
 * Fetches a player's unlocked cards using their player tag.
 */
async function getPlayerUnlockedCards(playerTag) {
  try {
    // Clash Royale API requires URL-safe encoding for # symbol
    const encodedTag = encodeURIComponent(playerTag.replace('#', ''));
    const url = `${BASE_URL}/players/%23${encodedTag}`;

    const response = await axios.get(url, { headers: HEADERS });

    const cardList = response.data.cards || [];

    // Return just the card names
    const unlockedCards = cardList.map(card => card.name);

    return unlockedCards;
  } catch (error) {
    console.error('Failed to fetch unlocked cards:', error.response?.data || error.message);
    throw new Error('Unable to retrieve player card data');
  }
}

module.exports = {
  getPlayerUnlockedCards
};
