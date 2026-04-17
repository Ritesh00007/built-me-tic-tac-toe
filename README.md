# built-me-tic-tac-toe

A modern two-player Tic-Tac-Toe web app built with HTML, CSS, and vanilla JavaScript. Features a sleek dark theme, smooth animations, score tracking, win/draw detection, and a fully responsive layout.

## Features

- ✅ 3×3 game board
- ✅ Two-player mode (X and O)
- ✅ Win detection with highlighted winning cells
- ✅ Draw detection
- ✅ Score tracking across rounds
- ✅ Reset game button
- ✅ Clear scores button
- ✅ Dark modern theme
- ✅ Responsive layout (mobile-friendly)
- ✅ Smooth animations (pop-in, win pulse, fade)

## Getting Started

### Run Locally

No build step required! Just open `index.html` in any modern browser:

```bash
git clone https://github.com/your-username/built-me-tic-tac-toe.git
cd built-me-tic-tac-toe
open index.html
```

Or use a simple local server:

```bash
# With Python
python3 -m http.server 8080

# With Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Add New Project**
4. Import your repository
5. Click **Deploy** — done!

## Project Structure

```
built-me-tic-tac-toe/
├── index.html    # App structure & markup
├── style.css     # Dark theme, animations, responsive styles
├── app.js        # Game logic, state management
├── vercel.json   # Vercel deployment config
├── .gitignore
└── README.md
```

## How to Play

1. Player **X** always goes first.
2. Take turns clicking empty cells to place your mark.
3. First player to get **3 in a row** (horizontal, vertical, or diagonal) wins!
4. If all 9 squares are filled with no winner, it's a **draw**.
5. Click **Reset Game** to start a new round (scores are kept).
6. Click **Clear Scores** to reset scores and start fresh.

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — ES6+, DOM API
- **Vercel** — Static site hosting
