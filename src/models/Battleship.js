class Battleship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }
  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits >= this.length;
  }
}

export default Battleship;
