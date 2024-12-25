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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setMessage(message) {
  const messageDiv = document.getElementById("messages");
  messageDiv.innerText = message;
}

async function gameLoop(playerBoard, botBoard, controller) {
  await controller.handleUserPlacement();
  setMessage("robot thinking...");
  await delay(600);
  controller.handleBotPlacement();
  if (playerBoard.isGameOver()) {
    setMessage("you lost :(");
    return true;
  } else if (botBoard.isGameOver()) {
    setMessage("you won :)");
    return true;
  } else {
    return false;
  }
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
