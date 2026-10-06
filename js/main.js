import { el } from './dom.js';
import { initGame } from './game.js';

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
        el('button', { className: 'btn', onClick: initGame }, 'New Game'),
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
