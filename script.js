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
  document.body.appendChild(makeTable(4, 4));