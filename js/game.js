import { CARD_IMAGES, state } from './data.js';
import { el } from './dom.js';

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function initGame() {
  if (state.unmatchTimeoutId) {
    clearTimeout(state.unmatchTimeoutId);
    state.unmatchTimeoutId = null;
  }

  state.moves = 0;
  state.matchedPairs = 0;
  state.flippedCards = [];
  state.isLockBoard = false;

  const doubleImages = [...CARD_IMAGES, ...CARD_IMAGES];
  const shuffledImages = shuffle(doubleImages);

  state.cards = shuffledImages.map((img, index) => ({
    id: index,
    image: img,
    isFlipped: false,
    isMatched: false
  }));

  updateStatsDOM();
  renderBoard();
}

function updateStatsDOM() {
  window.movesCountRef.textContent = state.moves;
  window.pairsCountRef.textContent = state.matchedPairs;
}

function handleCardClick(cardData, cardElement) {
  if (state.isLockBoard) return;
  if (cardData.isFlipped || cardData.isMatched || state.flippedCards.length >= 2) return;

  cardData.isFlipped = true;
  cardElement.classList.add('is-flipped');
  state.flippedCards.push({ data: cardData, element: cardElement });

  if (state.flippedCards.length === 1) return;

  state.moves++;
  updateStatsDOM();
  checkMatch();
}

function checkMatch() {
  const [first, second] = state.flippedCards;

  if (first.data.image === second.data.image) {
    first.data.isMatched = true;
    second.data.isMatched = true;
    state.matchedPairs++;
    state.flippedCards = [];
    
    updateStatsDOM();

    if (state.matchedPairs === CARD_IMAGES.length) {
      console.log('Victory achieved!');
    }
  } else {
    state.isLockBoard = true;

    state.unmatchTimeoutId = setTimeout(() => {
      first.data.isFlipped = false;
      second.data.isFlipped = false;
      first.element.classList.remove('is-flipped');
      second.element.classList.remove('is-flipped');

      state.isLockBoard = false;
      state.flippedCards = [];
      state.unmatchTimeoutId = null;
    }, 1000);
  }
}

function renderBoard() {
  while (window.boardContainerRef.firstChild) {
    window.boardContainerRef.removeChild(window.boardContainerRef.firstChild);
  }

  state.cards.forEach(cardData => {
    const cardBack = el('div', { className: 'card__back' }, '?');
    const cardFront = el('div', { className: 'card__front' }, cardData.image);
    const cardInner = el('div', { className: 'card__inner' }, cardBack, cardFront);
    
    const cardElement = el('div', { className: 'card' }, cardInner);
    cardElement.addEventListener('click', () => handleCardClick(cardData, cardElement));

    window.boardContainerRef.appendChild(cardElement);
  });
}
