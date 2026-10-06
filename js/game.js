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
  const doubleImages = [...CARD_IMAGES, ...CARD_IMAGES];
  const shuffledImages = shuffle(doubleImages);

  state.cards = shuffledImages.map((img, index) => ({
    id: index,
    image: img,
    isFlipped: false,
    isMatched: false
  }));

  renderBoard();
}

function renderBoard() {
  while (window.boardContainerRef.firstChild) {
    window.boardContainerRef.removeChild(window.boardContainerRef.firstChild);
  }

  state.cards.forEach(cardData => {
    const cardBack = el('div', { className: 'card__back' }, '?');
    const cardFront = el('div', { className: 'card__front' }, cardData.image);
    const cardInner = el('div', { className: 'card__inner' }, cardBack, cardFront);
    
    const cardElement = el('div', { 
      className: 'card',
      'data-id': cardData.id,
      onClick: () => console.log(`Card index ${cardData.id} clicked`)
    }, cardInner);

    window.boardContainerRef.appendChild(cardElement);
  });
}