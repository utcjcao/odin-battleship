function updateInitView(board, direction, length) {
  const boardContainer = document.getElementById("game-container");
  boardContainer.innerHTML = ""; // clear prev board

  const titleDiv = document.getElementById("messages");
  titleDiv.innerText = "place your ships. use L to rotate";

  const initBoardContainer = document.createElement("div");
  initBoardContainer.id = "init-board"; // clear prev board

  //  add the hover effect and the ids to each button
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellBtn = document.createElement("button");
      cellBtn.id = i.toString() + ", " + j.toString();
      if (board.cells[i][j].ship != null) {
        cellBtn.classList.add("ship-present");
      }
      shipPreviewHover(cellBtn, i, j, direction, length);
      initBoardContainer.appendChild(cellBtn);
    }
  }

  boardContainer.appendChild(initBoardContainer);
}

function shipPreviewHover(cellBtn, x, y, direction, length) {
  cellBtn.addEventListener("mouseover", () => {
    for (let i = 0; i < length; i++) {
      if (direction == "horz") {
        if (y + i >= 10) {
          break;
        }
        let id = x.toString() + ", " + (y + i).toString();
        const hoverCellBtn = document.getElementById(id);
        hoverCellBtn.classList.add("hover");
      } else {
        if (x + i >= 10) {
          break;
        }
        let id = (x + i).toString() + ", " + y.toString();
        const hoverCellBtn = document.getElementById(id);
        hoverCellBtn.classList.add("hover");
      }
    }
  });

  cellBtn.addEventListener("mouseout", () => {
    for (let i = 0; i < length; i++) {
      if (direction == "horz") {
        if (y + i >= 10) {
          break;
        }
        let id = x.toString() + ", " + (y + i).toString();
        const hoverCellBtn = document.getElementById(id);
        hoverCellBtn.classList.remove("hover");
      } else {
        if (x + i >= 10) {
          break;
        }
        let id = (x + i).toString() + ", " + y.toString();
        const hoverCellBtn = document.getElementById(id);
        hoverCellBtn.classList.remove("hover");
      }
    }
  });
}

export default updateInitView;
