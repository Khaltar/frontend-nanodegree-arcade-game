// Function to create random ints. Thanks to MDN for the code
// Returns a random integer between min (included) and max (excluded)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Constants
var CANVAS_HEIGHT = 707;
var CANVAS_WIDTH = 505;
var Y_STONE_VALUES = [43,126, 209, 292]; // (707 - (83 * 8)) = 43 which is then incremented by 83 each time
var X_VALUES = [0, 100, 200, 300, 400];

// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > CANVAS_WIDTH) {
        this.x = -115;
        this.randomSpeed();
    }
};

// Enemy Random Speed Generator method
Enemy.prototype.randomSpeed = function() {
    this.speed = 50 * Math.floor(Math.random() * 20); 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x_start = 300;
    this.y_start = 6;
    this.x = this.x_start;
    this.y = this.y_start;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 4; i++) {
    var initialSpeed = Math.floor(Math.random()*100) + 60;
    allEnemies.push(new Enemy(-115, Y_STONE_VALUES[i], initialSpeed));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});