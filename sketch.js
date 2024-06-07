let player;
let trashCans = [];
let score = 0;

function setup() {
  createCanvas(400, 400);
  player = new Player();
  for (let i = 0; i < 5; i++) {
    trashCans.push(new TrashCan());
  }
}

function draw() {
  background(220);
  
  player.show();
  player.update();
  
  for (let trashCan of trashCans) {
    trashCan.show();
    trashCan.update();
    
    if (player.hits(trashCan)) {
      trashCan.respawn();
      score++;
    }
  }
  
  textSize(20);
  fill(0);
  text('Score: ' + score, 10, 30);
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.width = 20;
    this.height = 30;
  }
  
  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  hits(trashCan) {
    return (
      this.x < trashCan.x + trashCan.width &&
      this.x + this.width > trashCan.x &&
      this.y < trashCan.y + trashCan.height &&
      this.y + this.height > trashCan.y
    );
  }
}

class TrashCan {
  constructor() {
    this.x = random(width);
    this.y = random(-200, -100);
    this.width = 30;
    this.height = 40;
    this.speed = random(1, 3);
  }
  
  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
  
  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.respawn();
    }
  }
  
  respawn() {
    this.x = random(width);
    this.y = random(-200, -100);
  }
}
