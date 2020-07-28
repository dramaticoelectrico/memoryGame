class MemoryGame {
  constructor(options) {
    this.squares = options.squares;
    this.selection = [];
    this.correct = [];
    this.attempts = 0;
    this.lockBoard = false;
    this.timer = options.time;
    this.msgTimer = document.getElementById("timer");
    this.msgAttempts = document.getElementById("attempts");
    this.msgAlert = document.getElementById("messages");
    this.game = document.getElementById("game");
    this.buildBoard();
  }
  buildBoard() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button, i) => {
      button.setAttribute("data-name", this.squares[i].name);
      button.setAttribute("id", "item-" + i);
      button.addEventListener("click", this.handlerClick.bind(this), true);
      button.firstElementChild.append(this.squares[i].img);
    });
  }
  handlerClick(e) {
    if (this.lockBoard) return;
    const parent = e.target.parentNode;
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
    }, 2000);
  }
  winner() {
    console.log("Game won");
  }
  shuffleBoard() {}
}
function makeTable(cols, rows) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.setAttribute("role", "grid");
  tbody.setAttribute("role", "rowgroup");
  let row;
  let count = 1;

  for (let i = 0; i < rows; i++) {
    row = tbody.insertRow(i);
    row.setAttribute("data-row", i);
    row.setAttribute("role", "row");

    for (let j = 0; j < cols; j++) {
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
document.getElementById("game").appendChild(makeTable(4, 4));

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

const game = new MemoryGame({ squares: data, time: 25 });
