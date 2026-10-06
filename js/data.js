export const CARD_IMAGES = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh'];

export let state = {
  cards: [],
  flippedCards: [],
  moves: 0,
  matchedPairs: 0,
  isLockBoard: false,
  unmatchTimeoutId: null
};