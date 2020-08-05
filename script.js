class MemoryGame {
  constructor(cols, rows, boardId) {
    this.cols = cols;
    this.rows = rows;
    this.game = document.getElementById(boardId);
    this.selection = [];
    this.matches = [];
    this.ALERT = {
      ERROR: "No match!",
      SUCCESS: "Match!",
      LOSE: "You Lose! Tuff luck.",
      WIN: "You Win! Now try again.",
    };
    this.lockBoard = true;

    this.setBoard();

    this.msgTimer = document.getElementById("timer");
    this.msgAttempts = document.getElementById("attempts");
    this.msgAlert = document.getElementById("messages");
    this.msgMatches = document.getElementById("matches");
    this.buttons = this.game.querySelectorAll("button");

    this.handler = this.handlerClick.bind(this);
    this.keyHandler = this.handleKeypress.bind(this);

    this.game.addEventListener("keydown", this.keyHandler);
    this.promptTimer = null;
    this.showHintTimer = null;
    this.countDownClock = null;
  }
  newGame(options) {
    // New Game btn
    this.reset();
    this.squares = options.squares;
    this.count = options.time;
    this.attempts = 0;
    this.msgAttempts.textContent = this.attempts;
    this.msgTimer.textContent = this.count;
    this.shuffleBoard();
    this.addCards();
  }
  startGame() {
    // Start btn
    this.buttons[0].focus();
    this.lockBoard = false;
    this.timer();
    console.log("GAME BEGINS - disable button");
  }
  reset() {
    this.buttons.forEach((button) => {
      button.removeAttribute("id");
      button.removeAttribute("data-name");
      button.removeAttribute("tabindex");
      button.removeAttribute("class");
      button.removeEventListener("click", this.handler);
      button.firstElementChild.textContent = "";
    });
    this.squares = [];
    this.count = 0;
    this.lockBoard = true;
    this.selection = [];
    this.matches = [];
    this.msgAlert.textContent = "";
    this.msgAttempts.textContent = "0";
    this.msgMatches.textContent = "0";
    clearTimeout(this.promptTimer);
    clearTimeout(this.showHintTimer);
    clearInterval(this.countDownClock);
  }
  addCards() {
    this.buttons.forEach((button, i) => {
      button.dataset.name = this.squares[i].name;
      button.setAttribute("id", "item-" + i);
      button.addEventListener("click", this.handler);
      button.firstElementChild.append(this.squares[i].img);
    });
  }
  handlerClick(e) {
    if (this.lockBoard) return;
    const parent = e.currentTarget;
    if (e.currentTarget.getAttribute("class") === "active") {
      return;
    }
    parent.setAttribute("class", "active");
    this.selection.push({ id: parent.id, name: parent.dataset.name });
    this.checkMatch();
  }
  getNextSquare(col, row) {
    let el = document.querySelector(`[data-row="${row}"] [data-col="${col}"]`);
    return el ? el.firstChild.focus() : false;
  }
  handleKeypress(e) {
    let row, col;
    switch (e.code) {
      case "ArrowDown":
        col = e.target.parentNode.dataset.col;
        row = parseInt(e.target.parentNode.parentNode.dataset.row) + 1;

        this.getNextSquare(col, row);
        break;
      case "ArrowUp":
        col = e.target.parentNode.dataset.col;
        row = parseInt(e.target.parentNode.parentNode.dataset.row) - 1;

        this.getNextSquare(col, row);
        break;
      case "ArrowRight":
        col = parseInt(e.target.parentNode.dataset.col) + 1;
        row = e.target.parentNode.parentNode.dataset.row;

        this.getNextSquare(col, row);
        break;
      case "ArrowLeft":
        col = parseInt(e.target.parentNode.dataset.col) - 1;
        row = e.target.parentNode.parentNode.dataset.row;

        this.getNextSquare(col, row);
        break;
      case "Escape":
        console.log("Esc freeze game");
        break;
      case "Tab":
        console.log("tab keys");
        break;
      default:
        return false;
    }
  }
  prompt(status) {
    this.msgAlert.classList.add(status.toLowerCase());
    this.msgAlert.textContent = this.ALERT[status];

    if (status === "LOSE" || status === "WIN") return;

    this.promptTimer = setTimeout(() => {
      this.msgAlert.textContent = "";
      this.msgAlert.classList.remove(status.toLowerCase());
    }, 1000);
  }
  checkMatch() {
    if (this.selection.length === 2) {
      this.attempts++;
      this.msgAttempts.textContent = this.attempts;
      this.selection[0].name === this.selection[1].name
        ? this.match()
        : this.noMatch();
    }
  }
  match() {
    let el;
    for (let item of this.selection) {
      el = document.getElementById(item.id);
      el.setAttribute("tabindex", "-1");
      el.classList.add("match");
    }
    this.prompt("SUCCESS");
    this.matches.push(this.selection[0], this.selection[1]);
    this.msgMatches.textContent = String(this.matches.length / 2);
    this.selection.length = 0;
    if (this.matches.length === this.squares.length) {
      this.winner();
    }
  }
  noMatch() {
    this.lockBoard = true;
    let el;
    this.prompt("ERROR");
    for (let item of this.selection) {
      el = document.getElementById(item.id);
      el.classList.add("failed");
    }
    this.showHintTimer = setTimeout(() => {
      for (let item of this.selection) {
        el = document.getElementById(item.id);
        el.removeAttribute("class");
      }
      this.selection.length = 0;
      this.lockBoard = false;
    }, 1000);
  }
  winner() {
    this.prompt("WIN");
  }
  flipBoard() {
    this.buttons.forEach((button) => {
      if (!button.getAttribute("class")) {
        button.setAttribute("class", "active failed");
      } else if (!(button.getAttribute("class").indexOf("match") > -1)) {
        button.removeAttribute("class");
        button.setAttribute("class", "active failed");
      }
    });
  }
  shuffleBoard() {
    for (var i = 0; i < this.squares.length; i++) {
      let swapIndex = Math.floor(Math.random() * this.squares.length);
      let currSquare = this.squares[i];
      let squareSwap = this.squares[swapIndex];
      this.squares[i] = squareSwap;
      this.squares[swapIndex] = currSquare;
    }
    return this.squares;
  }
  timer() {
    this.msgTimer.textContent = this.count.toString();
    this.countDownClock = setInterval(doCountDown.bind(this), 1000);
    function doCountDown() {
      this.count--;
      this.msgTimer.textContent = this.count.toString();
      if (this.count < 1) {
        clearInterval(this.countDownClock);
        this.gameOver();
      }
    }
  }
  gameOver() {
    this.lockBoard = true;
    clearTimeout(this.promptTimer);
    clearTimeout(this.showHintTimer);
    this.prompt("LOSE");
    setTimeout(this.flipBoard(), 500);
  }
  makeBoard() {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.setAttribute("role", "grid");
    tbody.setAttribute("role", "rowgroup");
    let row;
    let count = 1;

    for (let i = 0; i < this.rows; i++) {
      row = tbody.insertRow(i);
      row.setAttribute("data-row", i);
      row.setAttribute("role", "row");

      for (let j = 0; j < this.cols; j++) {
        let cell = document.createElement("td");
        cell.setAttribute("data-col", j);
        cell.setAttribute("role", "gridcell");
        let button = document.createElement("button");
        let span = document.createElement("span");
        button.textContent = count++;
        button.appendChild(span);
        cell.appendChild(button);
        tbody.rows[i].appendChild(cell);
      }
    }
    table.appendChild(tbody);
    return table;
  }
  setBoard() {
    this.game.appendChild(this.makeBoard());
  }
}

const data = [
  { name: "blue", img: "\u2663" },
  { name: "blue", img: "\u2663" },
  { name: "red", img: "\u2664" },
  { name: "red", img: "\u2664 " },
  { name: "green", img: "\u2665" },
  { name: "green", img: "\u2665" },
  { name: "yellow", img: "\u2666" },
  { name: "yellow", img: "\u2666" },
  { name: "black", img: "\u2667" },
  { name: "black", img: "\u2667" },
  { name: "white", img: "\u2668" },
  { name: "white", img: "\u2668" },
  { name: "pink", img: "\u2744" },
  { name: "pink", img: "\u2744" },
  { name: "purple", img: "\u272E" },
  { name: "purple", img: "\u272E" },
];
function memoryGame() {
  const game = new MemoryGame(4, 4, "game");

  document
    .getElementById("reset")
    .addEventListener("click", () => game.newGame({ squares: data, time: 15 }));
  document
    .getElementById("start")
    .addEventListener("click", () => game.startGame());
}
memoryGame();
