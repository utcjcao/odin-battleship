class Cell {
  constructor() {
    this.ship = null;
    this.attacked = false;
  }
  destroy() {
    this.attacked = true;
    if (this.ship != null) {
      this.ship.hit();
      if (this.ship.isSunk()) {
        return true;
      }
    }

    return false;
  }
}

export default Cell;
