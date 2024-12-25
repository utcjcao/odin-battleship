import updateGameView from "../views/updateGameView";

class gameLoopController {
  constructor(playerBoard, botBoard) {
    this.playerBoard = playerBoard;
    this.botBoard = botBoard;
  }

  init() {
    updateGameView(this.playerBoard, this.botBoard);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleBotPlacement() {
    const randX = this.getRandomInt(0, 9);
    const randY = this.getRandomInt(0, 9);
    const validAttack = this.playerBoard.destroy(randX, randY);
    if (validAttack) {
      updateGameView(this.playerBoard, this.botBoard);
      console.log("valid attack", randX, randY);
    } else {
      this.handleBotPlacement(); // rerun
    }
  }

  async handleUserPlacement() {
    await new Promise((resolve) => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const id = i.toString() + ", " + j.toString() + ", bot";
          const cellBtn = document.getElementById(id);

          cellBtn.addEventListener("click", () => {
            const validAttack = this.botBoard.destroy(i, j);
            if (validAttack) {
              resolve("user shot a cell");
              console.log("valid");
              updateGameView(this.playerBoard, this.botBoard);
            }
          });
        }
      }
    });
  }
}

export default gameLoopController;
