const FRAMERATE = 0;
const ROWS = 15;
const COLS = 17;
const SIZE = 40;

let snake;

function setup() {
  createCanvas(COLS * SIZE, ROWS * SIZE);
  background(51);
	snake = new Snake();
  frameRate(FRAMERATE);
}

function draw() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let xCoord = x * SIZE;
      let yCorod = y * SIZE;
      fill(51);
      stroke('white');
      rect(xCoord, yCorod, SIZE, SIZE);
    }
  }
  snake.advance();
  snake.show();
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      if (snake.facing[0] !== -1) {
        snake.facing = [1, 0];
      }
      break;
    case LEFT_ARROW:
      if (snake.facing[0] !== 1) {
        snake.facing = [-1, 0];
      }
      break;
    case UP_ARROW:
			if (snake.facing[1] !== 1) {
      	snake.facing = [0, -1];
			}
      break;
    case DOWN_ARROW:
			if (snake.facing[1] !== -1) {
				snake.facing = [0, 1];
			}
      break;
    default:
      break;
  }
}
