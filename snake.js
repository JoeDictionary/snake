console.log('SNAKE');

class Segment {
  constructor(x, y, facing) {
    this.x = x;
    this.y = y;
    this.facing = facing;
  }
  show() {
    fill(0, 255, 0);
    rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
  }
}

class Snake {
  constructor() {
    this.length = 3;
    this.headPos = { x: 2, y: 1 };
    this.facing = [1, 0];
    this.foodPos;
    this.segments = [
      new Segment(this.headPos.x, this.headPos.y, [1, 0]),
      new Segment(this.headPos.x - 1, this.headPos.y, [1, 0]),
      new Segment(this.headPos.x - 2, this.headPos.y, [1, 0]),
    ];
    this.generateFood();
	}
	
	reset() {
		this.length = 3;
    this.headPos = { x: 2, y: 1 };
    this.facing = [1, 0];
    this.foodPos;
    this.segments = [
      new Segment(this.headPos.x, this.headPos.y, [1, 0]),
      new Segment(this.headPos.x - 1, this.headPos.y, [1, 0]),
      new Segment(this.headPos.x - 2, this.headPos.y, [1, 0]),
    ];
    this.generateFood();
	}

  isPosConflict(x, y, withHead = true) {
		let start = 0 ? withHead : 1;
    for (let index = start; index < this.segments.length; index++) {
      let segX = this.segments[index].x;
      let segY = this.segments[index].y;
      if (x === segX && y === segY) {
        return true;
      }
    }
    return false;
  }

  generateFood() {
    let randX, randY;
    do {
      randX = floor(random(0, COLS));
      randY = floor(random(0, ROWS));
    } while (this.isPosConflict(randX, randY));

    this.foodPos = { x: randX, y: randY };
  }

  addSegment() {
    let lastSeg = this.segments[this.segments.length - 1];
    let newLastSeg = new Segment(
      lastSeg.x - lastSeg.facing[0],
      lastSeg.y - lastSeg.facing[1],
      lastSeg.facing
    );
    this.segments.push(newLastSeg);
    length += 1;
  }

  checkFood() {
    if (
      this.headPos.x === this.foodPos.x &&
      this.headPos.y === this.foodPos.y
    ) {
      this.addSegment();
      this.generateFood();
    }
  }

  advance() {
    this.headPos.x += this.facing[0];
		this.headPos.y += this.facing[1];
    this.segments.pop();
    let newHead = new Segment(this.headPos.x, this.headPos.y, this.facing);
		this.segments.unshift(newHead);
		if (this.isPosConflict(this.headPos.x, this.headPos.y, false)) {
			this.reset()
		}
		this.checkFood()
  }

  show() {
    this.segments.forEach((segment) => {
      segment.show();
    });

    fill(255, 0, 0);
    rect(this.foodPos.x * SIZE, this.foodPos.y * SIZE, SIZE, SIZE);
  }
}
