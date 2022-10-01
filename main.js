// setup canvas.

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor
// This is function to define the location of a ball
// function Ball(x, y, velX, velY, color, size) {
//   this.x = x;
//   this.y = y;
//   this.velX = velX;
//   this.velY = velY;
//   this.color = color;
//   this.size = size;
// }

// define ball draw method
function Shape(x, y, velX, velY,exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists= true;
}
function Ball( x, y, velX, velY,exists,color,size){
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Object.defineProperty(Ball.prototype, 'constructor', {
  value: Ball,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
  
function EvilCircle(x,y,velX,velY,exists,color,size){
  Shape.call(this, x, y, 20, 20, exists);
  this.color = color = 'white';
  this.size = size = 10;
} 
EvilCircle.prototype = Object.create(Shape.prototype);
Object.defineProperty(EvilCircle.prototype,'constructor',{
  value:EvilCircle,
  enumerable:false,
  writable:true}) ;

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth=3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}
EvilCircle.prototype.checkBounds = function(){
  if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x +=(this.size);
  }

  if((this.y + this.size) >= height) {
    this.y -=(this.size);
  }

  if((this.y - this.size) <= 0) {
    this.y +=(this.size);
  }
}

EvilCircle.prototype.setControls= function(){
  let _this = this;
window.onkeydown = function(e) {
    if (e.key === 'ArrowLeft') {
      _this.x -= _this.velX; 
    } else if (e.key === 'ArrowRight') {
      _this.x += _this.velX;
    } else if (e.key === 'ArrowUp') {
      _this.y -= _this.velY;
    } else if (e.key === 'ArrowDown') {
      _this.y += _this.velY;
    }
  }
}

function moveLeft() {
 ec.x -= 20;
}

function moveRight() {
 ec.x += 20;
}

function moveUp() {
 ec.y -= 20;
}

function moveDown() {
 ec.y += 20;
}


EvilCircle.prototype.collisonDetect = function(){
  for(let j = 0; j < balls.length; j++) {
    if(  balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }

}
// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j]) && balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store balls and populate it

let balls = [];

while(balls.length < 30) {
  const size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);
}
let ec = new EvilCircle(random(0+10,width-10),random(0+10,width-10),20,20,true,'white',10);

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
ec.setControls();
let para = document.querySelector('p');
let c =0;
for(let i = 0; i < balls.length; i++) {
    if (balls[i].exists){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();

    ec.draw();
    ec.checkBounds();
    ec.collisonDetect();
   
  

  }
  else{
    c+=10;
  }
  para.textContent = 'Your Score:' +c;
    }

  requestAnimationFrame(loop);  
  let win = document.querySelector('h2');
  let button = document.querySelector('button');
  button.style.display = 'none';
  win.style.display = 'none';

  if(c === 300){

    button.style.display= 'block';
    win.style.display= 'block';

  }
}

loop();
