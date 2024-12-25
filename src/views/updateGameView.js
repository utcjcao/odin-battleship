function updateGameView(playerBoard, botBoard) {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  const botBoardContainer = renderBotBoard(botBoard);
  const playerBoardContainer = renderPlayerBoard(playerBoard);

  gameContainer.appendChild(playerBoardContainer);
  gameContainer.appendChild(botBoardContainer);
}

function renderPlayerBoard(playerBoard) {
  const playerBoardContainer = document.createElement("div");
  playerBoardContainer.id = "player-board";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellBtn = document.createElement("button");
      cellBtn.id = i.toString() + ", " + j.toString() + ", player";
      // board attacked and hit
      if (
        playerBoard.cells[i][j].attacked &&
        playerBoard.cells[i][j].ship != null
      ) {
        cellBtn.classList.add("ship-struck");
      } else if (
        playerBoard.cells[i][j].attacked &&
        playerBoard.cells[i][j].ship == null
      ) {
        // board attacked but no hits
        cellBtn.classList.add("nothing-struck");
      } else if (playerBoard.cells[i][j].ship != null) {
        // shows that a ship is present
        cellBtn.classList.add("ship-present");
      } else {
        // do nothing
      }
      playerBoardContainer.appendChild(cellBtn);
    }
  }

  return playerBoardContainer;
}

function renderBotBoard(botBoard) {
  const botBoardContainer = document.createElement("div");
  botBoardContainer.id = "bot-board";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellBtn = document.createElement("button");
      cellBtn.id = i.toString() + ", " + j.toString() + ", bot";
      // board attacked and hit
      if (botBoard.cells[i][j].attacked && botBoard.cells[i][j].ship != null) {
        cellBtn.classList.add("ship-struck");
      } else if (
        botBoard.cells[i][j].attacked &&
        botBoard.cells[i][j].ship == null
      ) {
        // board attacked but no hits
        cellBtn.classList.add("nothing-struck");
      } else {
        // do nothing
      }
      botBoardContainer.appendChild(cellBtn);
    }
  }
  return botBoardContainer;
}
export default updateGameView;
