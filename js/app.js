// Constants
var CANVAS_HEIGHT = 707;
var CANVAS_WIDTH = 505;
var Y_STONE_VALUES = [43,126, 209, 292]; // (707 - (83 * 8)) = 43 which is then incremented by 83 each time
var CHAR_WIDTH = 171;
var CHAR_HEIGHT = 101;
var BUG_WIDTH = 171;
var BUG_HEIGHT = 101;

//Key press booleans

var upPressed = false; var downPressed = false; var rightPressed = false; var leftPressed = false; 

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
Enemy.prototype.update = function(dt, player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > CANVAS_WIDTH) {
        this.x = -115;
        this.randomSpeed();
    }
    this.checkCollision(player);
};

// Enemy Random Speed Generator method
Enemy.prototype.randomSpeed = function() {
    this.speed = 90 + Math.floor(Math.random() * 200); 
};

/* Enemy Check Collision Method - Algorithm is the Axis-Aligned Bounding Box from MDN and the post from Udayan here at https://discussions.udacity.com/t/trying-to-identify-collisions-but-how-do-i-compare-enemy-x-with-player-x/29930/8 */

Enemy.prototype.checkCollision = function(player) {
    if (this.x < player.x + 75 &&
       this.x + 65 > player.x &&
       this.y < player.y + 50 &&
       this.y + 70 > player.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x_start = 202;
    this.y_start = 458;
    this.x = this.x_start;
    this.y = this.y_start;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};

Player.prototype.update = function() {
    if (rightPressed && this.x < CANVAS_WIDTH - CHAR_WIDTH) {
        this.x += 101;
        rightPressed = false;
    } else if (leftPressed && this.x > 0) {
        this.x -= 101;
        leftPressed = false;
    } else if (downPressed && this.y < 458) {
        this.y += 83;
        downPressed = false;
    } else if (upPressed && this.y > 0) {
        this.y -= 83;
        upPressed = false;
    } else if (this.y < 43) {
        player.win();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        leftPressed = true;
    } else if (key === 'up') {
        upPressed = true;
    } else if (key === 'right') {
        rightPressed = true;
    } else if (key === 'down') {
        downPressed = true;
        }
};

//Player reset method to remove half of the score and reset position when collisions happen
Player.prototype.reset = function() {
    this.score /= 2;
    this.x = this.x_start;
    this.y = this.y_start;
};

// Player reset method for wins when it touches the water at the other side of the field
Player.prototype.win = function() {
    this.score += 100;
    this.x = this.x_start;
    this.y = this.y_start;
}


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