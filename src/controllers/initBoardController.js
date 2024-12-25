import updateInitView from "../views/updateInitView";

class initBoardController {
  constructor(playerBoard, botBoard) {
    this.direction = "horz";
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
    let i = 5;
    while (i >= 2) {
      try {
        updateInitView(this.playerBoard, this.direction, i);
        await this.handleUserPlacement(i);
        i -= 1;
      } catch {
        this.direction = this.direction == "vert" ? "horz" : "vert";
        updateInitView(this.playerBoard, this.direction, i);
      }
    }
  }

  async handleUserPlacement(length) {
    await new Promise((resolve, reject) => {
      document.addEventListener("keydown", (event) => {
        if (event.key === "L" || event.key === "l") {
          reject("rotated");
        }
      });
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
