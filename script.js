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
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button, i) => {
      button.setAttribute("data-name", this.squares[i].name);
      button.setAttribute("id", "item-" + i);
      button.setAttribute(
        "style",
        "background: url(" +
          this.squares[i].img +
          ") no-repeat; background-size: cover;"
      );
      button.addEventListener("click", this.handlerClick.bind(this));
    });
  }
  handlerClick(e) {
    if (this.lockBoard) return;
    this.selection.push({ id: e.target.id, name: e.target.dataset.name });
    this.checkMatch();
  }
  checkMatch() {
    if (this.selection.length === 2) {
      this.attempts++;
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
      el.setAttribute("data-match", "true");
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
      el.setAttribute("data-match", "false");
    }
    setTimeout(() => {
      this.lockBoard = false;
      for (let item of this.selection) {
        el = document.getElementById(item.id);
        el.removeAttribute("data-match");
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
      button.textContent = count++;
      cell.appendChild(button);
      tbody.rows[i].appendChild(cell);
    }
  }
  table.appendChild(tbody);
  return table;
}
document.getElementById("game").appendChild(makeTable(4, 4));

const data = [
  { name: "blue", img: "https://via.placeholder.com/150/808080" },
  { name: "blue", img: "https://via.placeholder.com/150/FF0000" },
  { name: "red", img: "https://via.placeholder.com/150/FF0000" },
  { name: "red", img: "https://via.placeholder.com/150/808080" },
  { name: "green", img: "https://via.placeholder.com/150/008000" },
  { name: "green", img: "https://via.placeholder.com/150/008000" },
  { name: "yellow", img: "https://via.placeholder.com/150/808080" },
  { name: "yellow", img: "https://via.placeholder.com/150/808080" },
  { name: "black", img: "https://via.placeholder.com/150/000000" },
  { name: "black", img: "https://via.placeholder.com/150/000000" },
  { name: "white", img: "https://via.placeholder.com/150/FFFFFF" },
  { name: "white", img: "https://via.placeholder.com/150/FFFFFF" },
  { name: "pink", img: "https://via.placeholder.com/150/0000FF" },
  { name: "pink", img: "https://via.placeholder.com/150/0000FF" },
  { name: "purple", img: "https://via.placeholder.com/150/808080" },
  { name: "purple", img: "https://via.placeholder.com/150/808080" },
];

const game = new MemoryGame({ squares: data, time: 25 });
