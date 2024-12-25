import updateInitView from "../views/updateInitView";

class initBoardController {
  constructor(playerBoard, botBoard) {
    this.direction = false;
    this.playerBoard = playerBoard;
    this.botBoard = botBoard;
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  botInitShips() {
    let i = 5;
    while (i >= 2) {
      const randX = this.getRandomInt(0, 9);
      const randY = this.getRandomInt(0, 9);
      const direction = this.getRandomInt(0, 1) == 0 ? "horz" : "vert";

      const isShipPlaced = this.botBoard.placeShip(randX, randY, i, direction);
      if (isShipPlaced) {
        i -= 1;
      }
    }
  }
  async playerInitShips() {
    for (let i = 5; i >= 2; i--) {
      updateInitView(this.playerBoard, this.direction, i);
      await this.handleUserPlacement(i);
    }
  }

  async handleUserPlacement(length) {
    await new Promise((resolve) => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const id = i.toString() + ", " + j.toString();
          const cellBtn = document.getElementById(id);

          cellBtn.addEventListener("click", () => {
            const shipPlaced = this.playerBoard.placeShip(
              i,
              j,
              length,
              this.direction
            );
            if (shipPlaced) {
              resolve("user chose ship");
            }
          });
        }
      }
    });
  }
}

export default initBoardController;
