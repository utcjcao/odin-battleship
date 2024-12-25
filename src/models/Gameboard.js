import Battleship from "./Battleship";
import Cell from "./Cell";

class Gameboard {
  constructor() {
    this.cells = [];
    this.shipsSunk = 0;
    this.directionPlacement = "horz";
  }

  initBoard() {
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        const cell = new Cell();
        row.push(cell);
      }
      this.cells.push(row);
    }
  }

  validateShipPlacement(x, y, length, direction) {
    if (x < 0 || y < 0 || x >= 10 || y >= 10) {
      return false;
    }
    if (direction == "horz") {
      if (y + length >= 10) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (this.cells[x][y + i].ship != null) {
          return false;
        }
      }
    } else {
      if (x + length >= 10) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (this.cells[x + i][y].ship != null) {
          return false;
        }
      }
    }
    return true;
  }

  placeShip(x, y, length, direction) {
    if (this.validateShipPlacement(x, y, length, direction)) {
      const newShip = new Battleship(length);
      if (direction == "horz") {
        for (let i = 0; i < length; i++) {
          this.cells[x][y + i].ship = newShip;
        }
      } else {
        for (let i = 0; i < length; i++) {
          this.cells[x + i][y].ship = newShip;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  destroy(x, y) {
    if (this.cells[x][y].attacked == false) {
      const shipDestroyed = this.cells[x][y].destroy();
      if (shipDestroyed) {
        this.shipsSunk += 1;
        console.log("ship sinks");
      }
      return true; // return if the hit was successful (no previous hit)
    } else {
      return false; // return if the destroy was not successful (already previously hit)
    }
  }

  isGameOver() {
    return this.shipsSunk >= 4;
    // put game over here
  }
}

export default Gameboard;
