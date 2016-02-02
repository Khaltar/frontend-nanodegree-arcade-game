// Constants for use in game
var CANVAS_WIDTH = 505;
var Y_STONE_VALUES = [43, 126, 209, 292]; // (707 - (83 * 8)) = 43 which is then incremented by 83 each time
var CHAR_WIDTH = 171;


//Game object for counting lives and scores and defining gender
var Game = function () {
    this.lives = 3;
    this.score = 0;
    this.gender = undefined;
};

// Starting the game variable
var game = new Game();

// Game method for gender selection at the start of the game
Game.prototype.genderSelection = function () {
    var gender = prompt('Are you a boy or a girl?');
    if (gender.toLowerCase() === 'boy') {
        this.gender = true;
    } else {
        this.gender = false;
    }
};

game.genderSelection();

// Method for increasing the score everytime the player gets to the other side of the field
Game.prototype.scoreIncrease = function () {
    this.score += 100;
    game.updateScore();
};

// Method for decreasing the score everytime the player hits an enemy
Game.prototype.scoreDecrease = function () {
    this.score = Math.round(this.score / 2);
    game.updateScore();
};

// Method for decreasing one live everytime the player hits an enemy
Game.prototype.livesDecrease = function () {
    this.lives -= 1;
    game.updateLives();
};

// Methods to update the scoreboard and the lives in html
Game.prototype.updateScore = function () {
    //jQuery to change the score variable in the scoreboard
    $('.score').html(game.score);
};

Game.prototype.updateLives = function () {
    //jQuery to change the lives variable in the scoreboard
    $('.lives').html(game.lives);
};

// Method for resetting the game when the player loses all lives
Game.prototype.resetGame = function () {
    this.lives = 3;
    this.score = 0;
    this.updateLives();
    this.updateScore();
    player.x = player.x_start;
    player.y = player.y_start;
};


//Key press booleans for keyboard control
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
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
Enemy.prototype.update = function (dt, player) {
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
Enemy.prototype.randomSpeed = function () {
    this.speed = 90 + Math.floor(Math.random() * 200);
};

/* Enemy Check Collision Method - Algorithm is the Axis-Aligned Bounding Box from MDN and the post from Udayan here at https://discussions.udacity.com/t/trying-to-identify-collisions-but-how-do-i-compare-enemy-x-with-player-x/29930/8 */

Enemy.prototype.checkCollision = function (player) {
    if (this.x < player.x + 75 &&
        this.x + 65 > player.x &&
        this.y < player.y + 50 &&
        this.y + 70 > player.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x_start = 202;
    this.y_start = 458;
    this.x = this.x_start;
    this.y = this.y_start;
    this.score = 0;
    this.lives = 3;
    if (game.gender === true) {
        this.sprite = 'images/char-boy.png';
    } else {
        this.sprite = 'images/char-horn-girl.png';
    }
};

// Method for updating the player position when he moves. Also configured to not allow out of boundaries movement.
Player.prototype.update = function () {
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
        this.win();
    }
};

// Method for rendering the player sprite
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Method for controlling the player with the keyboard
Player.prototype.handleInput = function (key) {
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
Player.prototype.reset = function () {
    game.scoreDecrease();
    game.livesDecrease();
    if (game.lives > 0) {
        this.x = this.x_start;
        this.y = this.y_start;
    } else {
        alert('Game Over, you were devoured by the bugs!');
        game.resetGame();
    }
};

// Player reset method for resetting the player position in wins when he touches the water at the other side of the field
Player.prototype.win = function () {
    game.scoreIncrease();
    this.x = this.x_start;
    this.y = this.y_start;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiating enemies
var allEnemies = [];
for (var i = 0; i < 4; i++) {
    var initialSpeed = Math.floor(Math.random() * 100) + 60;
    allEnemies.push(new Enemy(-115, Y_STONE_VALUES[i], initialSpeed));
}

// Instantiating the player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});