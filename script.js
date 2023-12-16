let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//Draw Condition Check
const checkDraw = () => {
  // Check if all boxes are filled
  let allBoxesFilled = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      allBoxesFilled = false;
      break;
    }
  }

  // If all boxes are filled and there's no winner, it's a draw
  if (allBoxesFilled) {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

//Reset Game Button
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";//playerO
      box.style.color = "#8A8A4D";
      turnO = false;
    } else {
      box.innerText = "X";//playerX
      box.style.color = "#2D3142";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  });
});

//Disable Boxes after Winner is declared
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinnner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinnner(pos1Val);
      }
    }
  }
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
