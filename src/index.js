import gameLoopController from "./controllers/gameLoopController";
import initBoardController from "./controllers/initBoardController";
import Gameboard from "./models/Gameboard";
import "./template.css";

const playerBoard = new Gameboard();
const botBoard = new Gameboard();

function init(playerBoard, botBoard) {
  // set up empty board
  playerBoard.initBoard();
  botBoard.initBoard();

  // set up init controller, creates ships for bot and player
  const initController = new initBoardController(playerBoard, botBoard);
  initController.botInitShips();
  initController.playerInitShips();
}

function gameLoop(playerBoard, botBoard, controller) {
  controller.handleUserPlacement();
  controller.handleBotPlacement();
  if (playerBoard.isGameOver() || botBoard.isGameOver()) {
    console.log("game over");
  } else {
    gameLoop();
  }
}

init(playerBoard, botBoard);

const controller = new gameLoopController(playerBoard, botBoard);

gameLoop(playerBoard, botBoard, controller);
