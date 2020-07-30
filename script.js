class MemoryGame {
  constructor(cols, rows, boardId) {
    this.cols = cols;
    this.rows = rows;
    this.game = document.getElementById(boardId);
    this.selection = [];
    this.correct = [];
    this.lockBoard = false;

    this.setBoard();

    this.msgTimer = document.getElementById("timer");
    this.msgAttempts = document.getElementById("attempts");
    this.msgAlert = document.getElementById("messages");
    this.buttons = this.game.querySelectorAll("button");
    this.handler = this.handlerClick.bind(this);
  }
  start(options) {
    this.reset();
    this.squares = options.squares;
    this.count = options.time;
    this.attempts = 0;
    this.msgAttempts.textContent = this.attempts;
    this.msgTimer.textContent = this.count;
    this.shuffleBoard();
    this.addCards();
    this.timer();
  }
  reset() {
    this.buttons.forEach((button) => {
      button.removeAttribute("id");
      button.removeAttribute("data-name");
      button.removeAttribute("class");
      button.removeAttribute("disabled");
      button.removeEventListener("click", this.handler);
      button.firstElementChild.textContent = "";
    });
    this.squares = [];
    this.count = 0;
    this.lockBoard = false;
    this.selection = [];
    this.correct = [];
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
    parent.setAttribute("class", "active");
    this.selection.push({ id: parent.id, name: parent.dataset.name });
    this.checkMatch();
  }
  checkMatch() {
    if (this.selection.length === 2) {
      this.attempts++;
      this.msgAttempts.textContent = this.attempts;
      this.selection[0].name === this.selection[1].name
        ? this.scored()
        : this.lose();
    }
  }
  scored() {
    // update
    let el;
    for (let item of this.selection) {
      el = document.getElementById(item.id);
      el.setAttribute("disabled", "true");
      el.removeEventListener("click", this.handlerClick);
    }
    this.correct.push(this.selection[0], this.selection[1]);
    this.selection.length = 0;
    if (this.correct.length === this.squares.length) {
      this.winner();
    }
  }
  lose() {
    this.lockBoard = true;
    let el;

    for (let item of this.selection) {
      el = document.getElementById(item.id);
      el.classList.add("failed");
    }
    setTimeout(() => {
      this.lockBoard = false;
      for (let item of this.selection) {
        el = document.getElementById(item.id);
        el.removeAttribute("class");
      }
      this.selection.length = 0;
    }, 1000);
  }
  winner() {
    alert("Game won");
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
    const clock = setInterval(doCountDown.bind(this), 1000);
    function doCountDown() {
      this.count--;
      this.msgTimer.textContent = this.count.toString();
      if (this.count < 1) {
        clearInterval(clock);
        this.gameOver();
      }
    }
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
  gameOver() {
    this.lockBoard = true;
    alert("game over" + this.lockBoard);
  }
}
// function makeTable(cols, rows) {
//   const table = document.createElement("table");
//   const tbody = document.createElement("tbody");
//   table.setAttribute("role", "grid");
//   tbody.setAttribute("role", "rowgroup");
//   let row;
//   let count = 1;

//   for (let i = 0; i < rows; i++) {
//     row = tbody.insertRow(i);
//     row.setAttribute("data-row", i);
//     row.setAttribute("role", "row");

//     for (let j = 0; j < cols; j++) {
//       let cell = document.createElement("td");
//       cell.setAttribute("data-col", j);
//       cell.setAttribute("role", "gridcell");
//       let button = document.createElement("button");
//       let span = document.createElement("span");
//       button.textContent = count++;
//       button.appendChild(span);
//       cell.appendChild(button);
//       tbody.rows[i].appendChild(cell);
//     }
//   }
//   table.appendChild(tbody);
//   return table;
// }
// document.getElementById("game").appendChild(makeTable(4, 4));

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
    .addEventListener("click", () => game.start({ squares: data, time: 15 }));
}
memoryGame();
