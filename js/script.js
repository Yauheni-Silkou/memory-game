const CARD_IMAGES = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh'];

let state = {
  cards: []
};

function el(tagName, attributes = {}, ...children) {
  const element = document.createElement(tagName);
  
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className') {
      element.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.toLowerCase().substring(2);
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  }
  
  children.forEach(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });
  
  return element;
}

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function initGame() {
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

function initStaticLayout() {
  window.movesCountRef = el('span', {}, '0');
  window.pairsCountRef = el('span', {}, '0');
  window.boardContainerRef = el('div', { className: 'board' });
  
  window.modalContentRef = el('div', { className: 'modal__content' });
  window.modalComponentRef = el('dialog', { className: 'modal' }, 
    el('div', { className: 'modal__wrapper' }, window.modalContentRef)
  );

  const header = el('header', { className: 'header' },
    el('div', { className: 'header__container' },
      el('h1', { className: 'header__title' }, 'Memory Game'),
      el('div', { className: 'header__controls' },
        el('button', { className: 'btn' }, 'New Game'),
        el('button', { className: 'btn' }, 'Leaderboard')
      )
    )
  );

  const mainContent = el('main', { className: 'main-content' },
    el('div', { className: 'stats' },
      el('div', { className: 'stats__item' }, 'Moves: ', window.movesCountRef),
      el('div', { className: 'stats__item' }, 'Pairs: ', window.pairsCountRef, ' / 8')
    ),
    window.boardContainerRef
  );

  document.body.appendChild(header);
  document.body.appendChild(mainContent);
  document.body.appendChild(window.modalComponentRef);

  initGame();
}

document.addEventListener('DOMContentLoaded', initStaticLayout);
