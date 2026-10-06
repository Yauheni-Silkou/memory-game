# RS School: Memory Game — "The Naturalist's Log"

An elegant, minimalist 4x4 Memory Match browser game styled like a 19th-century naturalist’s field journal. The UI delivers a tactile, academic, and deeply organic experience, contrasting a dark antique book cloth resting canvas with bright, custom-drawn vintage botanical illustration pages when cards flip smoothly on their Y-axis.

This application is engineered with an advanced ES6 modular architecture and fully compliant with zero-HTML-body platform restrictions.

## Features & Architectural Pillars

*   **Zero-HTML Body Layout:** The entry `index.html` file maintains an completely blank `<body>` element (containing only the primary script hook). Every structural container, scorecard, header control, card layout, and popup layer is compiled dynamically on runtime via secure node factories.
*   **No String Injection Vulnerabilities:** To protect application security and meet strict grading limitations, the codebase strictly avoids `innerHTML`, `outerHTML`, or `insertAdjacentHTML`. All text layers and element branches use safe node manipulations (`document.createElement`, `.textContent`, and `.appendChild`).
*   **Height-Dependent Responsive Scaling:** Employs advanced adaptive viewport height styling equations (`min(75vh, 90vw)`) to ensure that the 4x4 grid board scales gracefully to remain prominently visible while guaranteeing the header text and controllers never clip or force a vertical scrollbar on compact displays.
*   **Polymorphic Reusable Modals:** Implements a central, native HTML5 `<dialog>` component frame that intercepts user keyboard escapes and background overlay backdrops. The manager cleanly reuses layout shells while dynamically swapping content nodes to render either Victory metrics or Top-10 score registries.
*   **Persistent LocalStorage Tracking:** Incorporates high-precision browser record serialization. When all 8 pairs match, score outcomes save safely without duplications. Standings sort dynamically by minimal tries, using sequential creation timestamps as a secondary fallback if scores match.

---

## Game Rules

1.  **Objective:** Flip over face-down field notes to discover matching pairs of botanical illustrations using the fewest number of tries.
2.  **Tries Calculation:** Flipping any two separate cards face-up sequentially increments the dynamic attempts ledger tally by 1.
3.  **Matching Pairs:** Discovering identical illustrations anchors them open permanently. The global matching scoreboard increments by 1 out of 8.
4.  **Mismatched Pairs:** If illustrations vary, the board locks interactions for exactly `1000ms`, displaying both drawings before utilizing a cubic-bezier ease profile to turn them face-down.
5.  **The Code Freeze Reset:** Clicking "New Game" instantly halts active timeout queues, reshuffles the card grid using clean randomized Fisher-Yates permutations, and resets ledger metrics without visual lag or broken logic loops.

---

## Project Directory Tree

```text
memory-game/
├── index.html        # Entry root (pristine head and single module script loading tag)
├── css/
│   └── style.css     # CSS variable palettes, 3D transform layers, and modal overrides
├── js/
│   ├── main.js       # Static application layout builder and framework orchestrator
│   ├── dom.js        # Safe element compilation wrapper framework
│   ├── data.js       # App runtime structures, tracking states, and asset indexes
│   ├── game.js       # Fisher-Yates randomizers, event loops, and scoreboard logic
│   └── modal.js      # Native HTML5 polymorphic dialog modal component manager
└── assets/
    ├── logo.png      # Hand-drawn green maple leaves symmetrical emblem header asset
    └── img/
        └── cards/
            ├── card-back.webp   # Antique charcoal pencil woven ivy vines backdrop asset
            ├── card-1.webp      # Botanical pencil drawing asset 1
            ├── ...
            └── card-8.webp      # Botanical pencil drawing asset 8
```

---

## How to Run Locally

### System Prerequisites
No backend compilers, runtime execution engines (like Node.js), or static servers are required. The project parses out-of-the-box in any modern desktop or mobile browser.

### Local Execution Steps
1.  **Extract the files** or switch into your active repository workspace:
    ```bash
    cd memory-game
    ```
2.  **Verify that you are testing the development branch:**
    ```bash
    git checkout memory-game
    ```
3.  **Launch the Game:**
    *   Open your system file browser, navigate to the folder, and double-click `index.html` to execute it directly inside your default web browser.
    *   *Alternative:* Right-click `index.html`, select **Open With**, and choose Google Chrome or Mozilla Firefox.
    *   *Alternative (VS Code Extension):* If using Visual Studio Code, right-click `index.html` and click **Open with Live Server** to view edits update in real time.
