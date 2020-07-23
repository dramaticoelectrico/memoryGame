class MemoryGame {
    constructor(options) {
        this.squares = options.squares;
        this.selection = [];
        this.buildBoard();
        // this.handlerClick = this.handlerClick.bind(this);
    }
    buildBoard() {
        let buttons = document.querySelectorAll('button');
        buttons.forEach( (button, i) => {
            button.setAttribute('data-name', this.squares[i].name);
            button.setAttribute('id', 'item-' + i);
            button.setAttribute("style", "background:" + this.squares[i].img + " no-repeat; background-size: cover;");
            button.addEventListener("click", this.handlerClick.bind(this));
        })
    }
    handlerClick(e) {
        this.selection.push({id: e.target.id, name: e.target.dataset.name})
        this.checkMatch();
    }
    checkMatch() {
        if (this.selection.length === 2) {
            this.selection[0].name === this.selection[1].name
            ? this.scored(this.selection)
            : this.lose(this.selection);
        }
    }
    scored() {
        // update
        document.getElementById(this.selection[0].id).removeEventListener("click", this.handlerClick);
        document.getElementById(this.selection[1].id).removeEventListener("click", this.handlerClick);
        this.selection.length = 0;
    }
    lose() {
        this.selection.length = 0;
    }
    shuffleBoard() {}
}
function makeTable(cols, rows) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.setAttribute("role", "grid");
    tbody.setAttribute("role", "rowgroup")
    let row;
    let count = 1;
  
    for ( let i = 0; i < rows; i++ ) {
        row = tbody.insertRow(i);
        row.setAttribute("data-row", i);
        row.setAttribute("role", "row");
  
        for (let j = 0; j < cols; j++) {
          let cell = document.createElement('td');
          cell.setAttribute("data-col", j);
          cell.setAttribute("role", "gridcell");
          let button = document.createElement('button');
          button.textContent = count++;
          cell.appendChild(button);
          tbody.rows[i].appendChild(cell)
        }
    }
    table.appendChild(tbody);
    return table;
  }
  document.getElementById("game").appendChild(makeTable(4, 4));

  const data = [
      {name: "blue", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "blue", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "red", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "red", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "green", img: "https://via.placeholder.com/150/0000FF/008000"},
      {name: "green", img: "https://via.placeholder.com/150/0000FF/008000"},
      {name: "yellow", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "yellow", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "black", img: "https://via.placeholder.com/150/0000FF/000000"},
      {name: "black", img: "https://via.placeholder.com/150/0000FF/000000"},
      {name: "white", img: "https://via.placeholder.com/150/0000FF/FFFFFF"},
      {name: "white", img: "https://via.placeholder.com/150/0000FF/FFFFFF"},
      {name: "pink", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "pink", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "purple", img: "https://via.placeholder.com/150/0000FF/808080"},
      {name: "purple", img: "https://via.placeholder.com/150/0000FF/808080"}
  ];

  const game = new MemoryGame({squares: data});