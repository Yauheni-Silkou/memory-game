import { CARD_DATASET, state } from './data.js';
import { el } from './dom.js';
import { Modal } from './modal.js';

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

  const doubleDataset = [...CARD_DATASET, ...CARD_DATASET];
  const shuffledItems = shuffle(doubleDataset);

  state.cards = shuffledItems.map((num, index) => ({
    id: index,
    imageNumber: num,
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
  if (state.isLockBoard || cardData.isFlipped || cardData.isMatched) return;
  if (state.flippedCards.length >= 2) return;

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

  if (first.data.imageNumber === second.data.imageNumber) {
    first.data.isMatched = true;
    second.data.isMatched = true;
    state.matchedPairs++;
    state.flippedCards = [];
    
    updateStatsDOM();

    if (state.matchedPairs === CARD_DATASET.length) {
      setTimeout(handleVictory, 300);
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

function saveResult(moves) {
  const leaderboard = JSON.parse(localStorage.getItem('memory_leaderboard')) || [];
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const newRecord = {
    moves: moves,
    date: formattedDate,
    timestamp: Date.now()
  };

  leaderboard.push(newRecord);
  
  leaderboard.sort((a, b) => {
    if (a.moves !== b.moves) return a.moves - b.moves;
    return a.timestamp - b.timestamp;
  });

  localStorage.setItem('memory_leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
}

function handleVictory() {
  saveResult(state.moves);

  const content = el('div', { className: 'modal-inner' },
    el('h2', {}, 'Log Closed'),
    el('p', {}, `Journal entry completed in ${state.moves} tries.`),
    el('div', { className: 'modal-buttons' },
      el('button', { className: 'btn', onClick: () => { Modal.close(); initGame(); } }, 'New Game'),
      el('button', { className: 'btn', onClick: Modal.close }, 'Close')
    )
  );

  Modal.open(content);
}

export function showLeaderboardModal() {
  const leaderboard = JSON.parse(localStorage.getItem('memory_leaderboard')) || [];
  const container = el('div', { className: 'modal-inner' }, el('h2', {}, 'Leaderboard logs'));

  if (leaderboard.length === 0) {
    container.appendChild(el('p', {}, 'No logged records found'));
  } else {
    const tbody = el('tbody');
    
    leaderboard.forEach((item, index) => {
      const row = el('tr', {},
        el('td', {}, el('strong', {}, index + 1)),
        el('td', {}, item.moves),
        el('td', {}, item.date)
      );
      tbody.appendChild(row);
    });

    const table = el('table', { className: 'leaderboard-table' },
      el('thead', {},
        el('tr', {},
          el('th', {}, 'Rank'),
          el('th', {}, 'Tries'),
          el('th', {}, 'Date')
        )
      ),
      tbody
    );
    container.appendChild(table);
  }

  container.appendChild(
    el('div', { className: 'modal-buttons' },
      el('button', { className: 'btn', onClick: Modal.close }, 'Close')
    )
  );

  Modal.open(container);
}

export function renderBoard() {
  while (window.boardContainerRef.firstChild) {
    window.boardContainerRef.removeChild(window.boardContainerRef.firstChild);
  }

  state.cards.forEach(cardData => {
    const cardBack = el('div', { className: 'card__back' });
    
    const cardImg = el('img', { 
      className: 'card__img', 
      src: `assets/img/cards/card-${cardData.imageNumber}.webp`,
      alt: 'Botanical Illustration Field Asset'
    });
    const cardFront = el('div', { className: 'card__front' }, cardImg);
    
    const cardInner = el('div', { className: 'card__inner' }, cardBack, cardFront);
    
    const cardElement = el('div', { className: 'card' }, cardInner);
    
    cardElement.addEventListener('click', () => handleCardClick(cardData, cardElement));

    window.boardContainerRef.appendChild(cardElement);
  });
}
