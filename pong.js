/**
 * Paul J
 * 8/25/15: Pong
 * 8/28/15 1:30am: 99.9% complete (except for keyboard controls)
 * 8/28/15: COMPLETE
 * 2/25/16: converted from Khan Academy's JavaScript sandbox to P5.js (Processing)
*/

var bg;
var halfColor;
var borderColor;
var paddleColor;
var scoreColor;
var ballColor;
var ballStroke; // flag for whether there is a stroke or not
var ballStrokeSize; // if flag is true, set strokeWeight
var ballStrokeColor; // if flag is true, set stroke color
var ballSize;
var ballDirX; // X-direction of ball (neg/pos) -1 or 1 -- set randomly in draw function
var ballDirY; // Y-direction of ball (neg/pos) -1 or 1 -- set randomly in draw function
var ballSpeedX; /** X-direction speed of ball [main] */
var ballInc; // how much to increment every 5 rounds
var ballSpeedY; // Y-direction speed of ball (set based on where ball hits paddle) | random at start
var y0; // paddle Y reflect zone | center <-> 5%
var y10; // paddle Y reflect zone | center -> 10%
var y20; // paddle Y reflect zone | center -> 20%
var y40; // paddle Y reflect zone | center -> 40%
var y50; // paddle Y reflect zone | center -> 50%
var paddleW; // paddle thickness
var paddleH; // paddle size
var paddleR; // paddle roundness
var paddleS; // paddle movement speed
var progStart; // only run this once, at start of program
var playGame; // game starts when screen is clicked
var introMsg; // message display before beginning of first game
var mX;// = constrain(mouseX, 0, width); // so the paddles don't follow off screen
var mY;// = constrain(mouseY, 0, height); // so the paddles don't follow off screen
var ballSound; // ricochet sound
var loseSoundL;
var loseSoundR;
var scoreL; // left side score, start at 0
var scoreR; // right side score, start at 0
var roundFlag;

var keys = new Array(); // holder for the keyCodes for controlling paddles - void 2 opposite presses

var leftPaddle;
var rightPaddle;

// {
function setup()
{
  createCanvas(windowWidth, windowHeight);
  bg = color(92, 92, 92);
  halfColor = color(138, 138, 138);
  borderColor = color(255, 0, 0);
  paddleColor = color(0, 255, 0);
  scoreColor = color(23, 23, 23);
  ballColor = color(255, 0, 255);
  ballStroke = false; // flag for whether there is a stroke or not
  ballStrokeSize = 1; // if flag is true, set strokeWeight
  ballStrokeColor = color(255, 255, 255); // if flag is true, set stroke color
  ballSize = 10;
  //ballDirX; // X-direction of ball (neg/pos) -1 or 1 -- set randomly in draw function
  //ballDirY; // Y-direction of ball (neg/pos) -1 or 1 -- set randomly in draw function
  ballSpeedX = 3; /** X-direction speed of ball [main] */
  ballInc = 2; // how much to increment every 5 rounds
  //ballSpeedY; // Y-direction speed of ball (set based on where ball hits paddle) | random at start
  y0 = 0.5; // paddle Y reflect zone | center <-> 5%
  y10 = 2; // paddle Y reflect zone | center -> 10%
  y20 = 3; // paddle Y reflect zone | center -> 20%
  y40 = 4.5; // paddle Y reflect zone | center -> 40%
  y50 = 6; // paddle Y reflect zone | center -> 50%
  paddleW = 10; // paddle thickness
  paddleH = 100; // paddle size
  paddleR = 5; // paddle roundness
  paddleS = 10  ; // paddle movement speed
  progStart = true; // only run this once, at start of program
  playGame = false; // game starts when screen is clicked
  introMsg = true; // message display before beginning of first game
  //mX;// = constrain(mouseX, 0, width); // so the paddles don't follow off screen
  //mY;// = constrain(mouseY, 0, height); // so the paddles don't follow off screen
  //ballSound = getSound("rpg/hit-whack"); // ricochet sound
  //loseSoundL = getSound("retro/boom1");
  //loseSoundR = getSound("rpg/battle-magic");
  scoreL = 0; // left side score, start at 0
  scoreR = 0; // right side score, start at 0
  roundFlag = false;
  textFont("monospace");
  
  //keys = []; // holder for the keyCodes for controlling paddles - void 2 opposite presses
  
  rectMode(CENTER);
  textAlign(CENTER,CENTER);

  /**paddle Object definitions */ // {
    leftPaddle = new Paddle();
    leftPaddle.posX = 0 + paddleW/2;
    leftPaddle.posY = windowHeight/2; // starting position
    leftPaddle.up = 16; // SHIFT - move paddle up
    leftPaddle.down = 17; // CTRL - move paddle down

    rightPaddle = new Paddle();
    rightPaddle.posX = windowWidth - paddleW/2;
    rightPaddle.posY = windowHeight/2; // starting position
    rightPaddle.up = 38; // UP ARROW - move paddle up
    rightPaddle.down = 40; // DOWN ARROW - move paddle down
    // }
}
// } Variables



// to register keyCode, so that opposite keys can cancel out and not make a movement
keyPressed = function() {
    keys[keyCode] = true;
};
keyReleased = function() {
    keys[keyCode] = false;
};


// <---------------------------------------------------------

//{ paddle

var Paddle = function() {
    // blank
};

Paddle.prototype.draw = function() {
    noStroke();
    fill(paddleColor);
    rect(this.posX, this.posY, paddleW, paddleH, paddleR);
    
    /*
    // for debugging the ricochet action off Y-position of paddle
    // paddleH = 100
    stroke(255, 0, 0);
    line(this.posX - 50, this.posY, this.posX + 50, this.posY);
    stroke(255, 255, 255);
    line(this.posX - 50, this.posY - paddleH/20, this.posX + 50, this.posY - paddleH/20); // +- 5
    stroke(0, 255, 0);
    line(this.posX - 50, this.posY - paddleH/10, this.posX + 50, this.posY - paddleH/10); // +- 10
    stroke(221, 0, 255);
    line(this.posX - 50, this.posY - paddleH/5, this.posX + 50, this.posY - paddleH/5); // +- 20
    stroke(255, 255, 255);
    line(this.posX - 50, this.posY - paddleH/2.5, this.posX + 50, this.posY - paddleH/2.5); // +- 40
    stroke(0, 255, 30);
    line(this.posX - 50, this.posY - paddleH/2, this.posX + 50, this.posY - paddleH/2); // +- 50
    */
};

/* mouse motion control
Paddle.prototype.motion = function() {
    
    // Problem: if (mY = 100 & this.posY = 101 & paddleS = 2), mY ALWAYS < this.posY
    
    if (mY < this.posY) { // if mouseY is above paddle
        if (this.posY - paddleS < mY) { // PROBLEM SOLVED
            this.posY = mY;
        }
        else {
            this.posY = floor(this.posY - paddleS); // paddleSpeed
        }
        this.posY = constrain(this.posY, 0 + paddleH/2, height - paddleH/2);
    }
    
    // Problem: if (mY = 100 & this.posY = 99 & paddleS = 2), mY ALWAYS > this.posY
    
    else if (mY > this.posY) { // if mouseY is below paddle
        if (this.posY + paddleS > mY) { // PROBLEM SOLVED
            this.posY = mY;
        }
        else {
            this.posY = this.posY + paddleS;
        }
        this.posY = constrain(this.posY, 0 + paddleH/2, height - paddleH/2);
    }
};
*/

Paddle.prototype.move = function() {
    // SHIFT/CTRL & UP/DOWN negate each other with opposite speed-Y
    if (keyIsPressed && keys[this.up]) { // SHIFT
        this.posY -= paddleS;
    }
    
    else if (keyIsPressed && keys[this.down]) { // CTRL
        this.posY += paddleS;
    }
    
    this.posY = constrain(this.posY, 0 + paddleH/2, height - paddleH/2);
};






//} Paddle

// <---------------------------------------------------------

// { ball

var Ball = function() {
    // blank
};

Ball.prototype.draw = function() {
    if (ballStroke) {
        strokeWeight(ballStrokeSize);
        stroke(ballStrokeColor);
    }
    else {
        noStroke();
    }
    fill(ballColor);
    ellipse(this.posX, this.posY, ballSize, ballSize);
};

Ball.prototype.reflect = function(bY, pY) {
    
    // center +/- 5%
    if ((bY >= pY - paddleH/20) && (bY <= pY + paddleH/20)) { // center <-> 5%
        ballSpeedY = y0;
    }
    
    // ABOVE mid [lower Y value]
    else if ((bY >= pY - paddleH/10) && (bY <= pY)) { // center -> 10%
        ballSpeedY = y10;
        ballDirY = -1;  // send it UP on canvas [lower Y value]
    }
    else if ((bY >= pY - paddleH/5) && (bY <= pY)) { // center -> 20%
        ballSpeedY = y20;
        ballDirY = -1;  // send it UP on canvas [lower Y value]
    }
    else if ((bY >= pY - paddleH/2.5) && (bY <= pY)) { // center -> 40%
        ballSpeedY = y40;
        ballDirY = -1;  // send it UP on canvas [lower Y value]
    }
    else if ((bY >= pY - paddleH/2) && (bY <= pY)) { // center -> 50% : last 10% of edge
        ballSpeedY = y50;
        ballDirY = -1;  // send it UP on canvas [lower Y value]
    }
    
    // BELOW mid [higher Y value]
        else if ((bY <= pY + paddleH/10) && (bY >= pY)) { // center -> 10%
        ballSpeedY = y10;
        ballDirY = 1;  // send it DOWN on canvas [higher Y value]
    }
    else if ((bY <= pY + paddleH/5) && (bY >= pY)) { // center -> 20%
        ballSpeedY = y20;
        ballDirY = 1;  // send it DOWN on canvas [higher Y value]
    }
    else if ((bY <= pY + paddleH/2.5) && (bY >= pY)) { // center -> 40%
        ballSpeedY = y40;
        ballDirY = 1;  // send it DOWN on canvas [higher Y value]
    }
    else if ((bY <= pY + paddleH/2) && (bY >= pY)) { // center -> 50% : last 10% of edge
        ballSpeedY = y50;
        ballDirY = 1;  // send it DOWN on canvas [higher Y value]
    }
};


Ball.prototype.motion = function() {
    
    // right paddle
    if (
        (this.posX + ballSpeedX >= width - paddleW - ballSize/2) && 
        (this.posY > rightPaddle.posY - paddleH/2) && 
        (this.posY < rightPaddle.posY + paddleH/2)) { // right paddle
        
        this.reflect(this.posY, rightPaddle.posY);
        ballDirX = -1;
        //playSound(ballSound);
    }
    
    // left paddle
    else if ((this.posX - ballSpeedX <= 0 + paddleW + ballSize/2) && 
        (this.posY > leftPaddle.posY - paddleH/2) &&
        (this.posY < leftPaddle.posY + paddleH/2)) { // left paddle
        
        this.reflect(this.posY, leftPaddle.posY);
        ballDirX = 1;
        //playSound(ballSound);
    }
    
    /** lose game [out the left side] */
    else if (this.posX < 0 + paddleW + ballSize/2) { // lose game
        playGame = false; // paddle missed the ball
        progStart = true;
        //playSound(loseSoundL);
        scoreR += 1;
        
        /** at every 5th round, increment ballSpeedX */
        if ((scoreL + scoreR) % 5 === 0 ) {
            roundFlag = true;
        }
    }
    /** lose game [out the right side] */
    else if (this.posX > width - paddleW - ballSize/2) { // lose game
        playGame = false; // paddle missed the ball
        progStart = true;
        //playSound(loseSoundR);
        scoreL += 1;
        
        /** at every 5th round, increment ballSpeedX */
        if ((scoreL + scoreR) % 5 === 0 ) {
            roundFlag = true;
        }
    }
    
    
    
    // keeping it within the bottom bounds
    if (this.posY + ballSpeedX >= height - paddleW - ballSize/2) {
       ballDirY = -1;
    }
    // keeping it within the top bounds
    else if (this.posY - ballSpeedX <= 0 + paddleW + ballSize/2) {
        ballDirY = 1;
    }
    
    
    this.posX += ballSpeedX * ballDirX;
    this.posY += ballSpeedY * ballDirY;
};


var ball = new Ball();

// } Ball

// <---------------------------------------------------------

// { functions

// draws the field lines
var drawField = function() {
    stroke(halfColor);
    strokeWeight(1);
    line(windowWidth/2, 0, windowWidth/2, windowHeight);
    noStroke();
    fill(borderColor);
    rect(windowWidth/2, 0, windowWidth, 5);
    rect(windowWidth/2, windowHeight, windowWidth, 5);
};

var drawScore = function() {
    fill(scoreColor);
    textSize(75);
    text(scoreL, windowWidth/2 - windowWidth/4, windowHeight*0.875);
    text(scoreR, windowWidth/2 + windowWidth/4, windowHeight*0.875);
    textSize(25);
    
    push();
    translate(20, 60);
    rotate(PI/2);
    text("Paul J", 0, 0);
    pop();
    push();
    translate(windowWidth - 20, windowHeight - 60);
    rotate(-PI/2);
    text("Paul J", 0, 0);
    pop();
};

// increment ballSpeedX every 5 rounds
var roundSpeed = function() {
    if (roundFlag) {
        ballSpeedX += ballInc;
        roundFlag = false;
    }
};

var instructions = function() {
    stroke(255, 0, 0);
    strokeWeight(5);
    fill(56, 56, 56);
    rect(windowWidth/2, windowHeight*0.1875, windowWidth*0.875, 125); // top box
    rect(windowWidth/2, windowHeight*0.8125, windowWidth*0.875, 100); // bottom box
    
    strokeWeight(2);
    line(windowWidth/2, windowHeight*0.7125, windowWidth/2, windowHeight*0.9125); // seperate controls box
    
    fill(255, 0, 0); // font color
    
    // instructions
    textSize(45);
    text("Press [SPACE]\nto Start", windowWidth/2, 75);
    
    // controls
    textSize(20);
    text("LEFT CONTROLS", windowWidth/2 - windowWidth/4.5, windowHeight*0.75);
    text("RIGHT CONTROLS", windowWidth/2 + windowWidth/4.5, windowHeight*0.75);
    textSize(15);
    text("up = SHIFT\ndown = CTRL", windowWidth/2 - windowWidth/5, windowHeight*0.85);
    text("up = UP ARROW\ndown = DOWN ARROW", windowWidth/2 + windowWidth/5, windowHeight*0.85);
};

// } functions

// <---------------------------------------------------------


function draw()
{
    /*
    mX = mouseX;
    mY = mouseY;
    */
    
    background(bg);
    drawField();
    drawScore();
    
    if (progStart) { // only run once when program starts
        progStart = false;
        ball.posX = windowWidth/2;
        //ball.posY = round(random(ballSize/2, height - ballSize/2)); // random Y-position start
        ball.posY = windowHeight/2; // start in the center
        //mouseY = 200; // start the paddles in the middle based on mouseY
        ballDirX = round(random(-1, 1)); // ball X-direction pos/neg
        while (ballDirX === 0) {
            ballDirX = round(random(-1, 1));
        }
        
        ballDirY = round(random(-1, 1)); // ball Y-direction pos/neg
        while (ballDirY === 0) {
            ballDirY = round(random(-1, 1));
        }
        ballSpeedY = round(random(1, 2)); // ball Y-direction SPEED
        
        //println("Program Start");
    }
    
    
    if (introMsg) { // only display before first game
        instructions();
    }
    
    
    roundSpeed(); // check roundFlag, increment ballSpeedX
    
    
    if (playGame) {
        ball.motion();
    }
    
    
    leftPaddle.draw();
    rightPaddle.draw();
    
    leftPaddle.move();
    rightPaddle.move();
    
    /*
    if (mouseX < width/2) { // left of center
        leftPaddle.motion();
    }
    else { // right of center
        rightPaddle.motion();
    }
    */

    
    ball.draw();
    
    if (keyIsPressed && keyCode == 32) {
        playGame = true;
        introMsg = false; // only to be displayed before 1st game
    }
    
    /* mouse motion control
    if (mouseIsPressed) {
        playGame = true;
        introMsg = false; // only to be displayed before 1st game
    }
    */
    
    
    // { for debugging
    /*
    textSize(20);
    text("ballSpeedX=" + ballSpeedX, 200, 250);
    text("roundFlag | " + roundFlag, 200, 300);
    */
    
    /*
    // for debugging
    text("leftPaddle.posY=" + leftPaddle.posY, 100, 100);
    text("rightPaddle.posY=" + rightPaddle.posY, 300, 300);
    //text("mX, mY: (" + mX + ", " + mY + ")", 200, 150);
    
    
    text("ball.posX=" + ball.posX + " | ball.posY=" + ball.posY, 200, 150);
    text("ballDirX=" + ballDirX + " | ballDirY=" + ballDirY, 200, 279);
    text("ballSpeedY=" + ballSpeedY, 200, 250);
    */
    
    // } for debugging
};

