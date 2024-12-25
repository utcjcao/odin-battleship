import gameLoopController from "./controllers/gameLoopController";
import initBoardController from "./controllers/initBoardController";
import Gameboard from "./models/Gameboard";
import "./template.css";

const playerBoard = new Gameboard();
const botBoard = new Gameboard();

async function init(playerBoard, botBoard) {
  // set up empty board
  playerBoard.initBoard();
  botBoard.initBoard();

  // set up init controller, creates ships for bot and player
  const initController = new initBoardController(playerBoard, botBoard);
  initController.botInitShips();
  try {
    await initController.playerInitShips();
  } catch (err) {
    console.log(err);
  }
}

async function gameLoop(playerBoard, botBoard, controller) {
  await controller.handleUserPlacement();
  controller.handleBotPlacement();
  if (playerBoard.isGameOver() || botBoard.isGameOver()) {
    console.log("game over");
    return true;
  } else {
    return false;
  }
  return false;
}

async function main() {
  await init(playerBoard, botBoard);

  const controller = new gameLoopController(playerBoard, botBoard);
  controller.init();
  let gameFinished = await gameLoop(playerBoard, botBoard, controller);
  while (!gameFinished) {
    gameFinished = await gameLoop(playerBoard, botBoard, controller);
  }
  console.log("finished");
}

main();
