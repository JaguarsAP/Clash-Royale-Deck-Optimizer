

function optimize(unlockedCards, targetDeck) {
  // Step 1: Filter only available cards
  // Step 2: Evaluate best counters (basic logic for now)
  // Step 3: Return 8-card optimized deck

  // Placeholder: Just return 8 random unlocked cards that are not in the target deck
  const available = unlockedCards.filter(c => !targetDeck.includes(c));
   


  return shuffled.slice(0, 8);
}