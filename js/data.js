export const CARD_DATASET = [1, 2, 3, 4, 5, 6, 7, 8];

export let state = {
  cards: [],
  flippedCards: [],
  moves: 0,
  matchedPairs: 0,
  isLockBoard: false,
  unmatchTimeoutId: null
};