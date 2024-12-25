const Gameboard = require("../src/models/Gameboard");
const Cell = require("../src/models/Cell");
const Battleship = require("../src/models/Battleship");

describe("Gameboard", () => {
  let gameboard;

  // test init
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.initBoard();
  });

  // check board size
  test("should initialize a 10x10 board", () => {
    expect(gameboard.cells.length).toBe(10);
    expect(gameboard.cells[0].length).toBe(10);
    expect(gameboard.cells[0][0]).toBeInstanceOf(Cell);
  });

  // check that ship placement works
  test("should validate ship placement correctly", () => {
    // Test horizontal placement at (0, 0)
    expect(gameboard.validateShipPlacement(0, 0, 3, "horz")).toBe(true); // Valid position

    // Test out of bounds placement
    expect(gameboard.validateShipPlacement(0, 9, 3, "horz")).toBe(false); // Exceeds grid
    expect(gameboard.validateShipPlacement(9, 0, 3, "vert")).toBe(false); // Exceeds grid vertically

    // Test vertical placement at (0, 0)
    expect(gameboard.validateShipPlacement(0, 0, 3, "vert")).toBe(true); // Valid position

    // Test invalid placement (already occupied)
    gameboard.placeShip(0, 0, 3, "horz");
    expect(gameboard.validateShipPlacement(0, 1, 3, "horz")).toBe(false); // Cells are occupied
  });

  test("should place ship correctly", () => {
    expect(gameboard.placeShip(0, 0, 3, "horz")).toBe(true); // Place horizontally
    expect(gameboard.cells[0][0].ship).toBeInstanceOf(Battleship); // Ship should be placed at [0][0]
    expect(gameboard.cells[0][1].ship).toBeInstanceOf(Battleship); // Ship should be placed at [0][1]
    expect(gameboard.cells[0][2].ship).toBeInstanceOf(Battleship); // Ship should be placed at [0][2]

    // Trying to place ship in an invalid location
    expect(gameboard.placeShip(9, 9, 3, "horz")).toBe(false); // Out of bounds, should fail
  });

  test("should destroy cell correctly", () => {
    // Place a ship on the board
    gameboard.placeShip(0, 0, 3, "horz");

    // Check initial state
    expect(gameboard.cells[0][0].attacked).toBe(false); // Cell at [0][0] has not been attacked yet

    // Destroy the cell
    expect(gameboard.destroy(0, 0)).toBe(true); // Attack at [0][0] should succeed
    expect(gameboard.cells[0][0].attacked).toBe(true); // Cell at [0][0] should now be marked as attacked

    // Try to destroy the same cell again
    expect(gameboard.destroy(0, 0)).toBe(false); // Attack at [0][0] should fail since it's already attacked
  });

  test("should correctly track game over condition", () => {
    expect(gameboard.isGameOver()).toBe(false); // No ships sunk yet

    // Simulate sinking ships
    gameboard.shipsSunk = 4; // Force the shipsSunk counter to 4
    expect(gameboard.isGameOver()).toBe(true); // Game should be over after 4 ships are sunk
  });
});
