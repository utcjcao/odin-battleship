import updateGameView from "../views/updateGameView";

class gameLoopController {
  constructor(playerBoard, botBoard) {
    this.playerBoard = playerBoard;
    this.botBoard = botBoard;
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleBotPlacement() {
    const randX = this.getRandomInt(0, 9);
    const randY = this.getRandomInt(0, 9);
    const validAttack = this.playerBoard.destroy(randX, randY);
    if (validAttack) {
      updateGameView(this.playerBoard, this.botBoard);
    } else {
      this.botPlacement(); // rerun
    }
  }

  async handleUserPlacement() {
    await new Promise((resolve) => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const id = i.toString() + ", " + j.toString();
          const cellBtn = document.getElementById(id);

          cellBtn.addEventListener("click", () => {
            const validAttack = this.playerBoard.destroy(i, j);
            if (validAttack) {
              resolve("user shot a cell");
              updateGameView(this.playerBoard, this.botBoard);
            }
          });
        }
      }
    });
  }
}

export default gameLoopController;
