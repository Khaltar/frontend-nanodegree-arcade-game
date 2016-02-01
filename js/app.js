// Constants for Canvas
CANVAS_HEIGHT = 606;
CANVAS_WIDTH = 505;

//Based on the terrain png dimensions
ROWS_Y = [50, 125, 200, 275]

// Function that randomly returns a number (between 0 and 104) to add some randomness to the game
var randomNumber = function() {
    return Math.floor(Math.random() * 25) + 80;
}

var randomArrayNumber = function(num) {
    return Math.floor(Math.random() * num);
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.speed = Math.floor(Math.random() * 25) + 80;
    this.y = ROWS_Y[randomArrayNumber(4)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = 0;
        this.y = ROWS_Y[randomArrayNumber(4)];
        this.speed = Math.floor(Math.random() * 25) + 80;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function(dt) {
    this.x += 3 * dt;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function() {}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var player = new Player(30,30);

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
