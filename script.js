let canvas = document.getElementById("theCanvas");
let speed = 2;
let intervalTime = 10;
let snake = document.getElementById("snake");
let snakeSquares = document.getElementsByClassName("squares");
let direction = "nodirection";
let score = 0;
let highScore = 0;
let xPos = parseFloat(getComputedStyle(snake).getPropertyValue("left"));
let yPos = parseFloat(getComputedStyle(snake).getPropertyValue("top"));
const apple = document.getElementById("apple");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
let positions = [];
let pause = false;
// DRAWING THE SNAKE BOARD
apple.style.left = Math.floor(Math.random() * 0.8 * (canvas.clientWidth)) + "px";
apple.style.top = Math.floor(Math.random() * 0.8 * (canvas.clientHeight)) + "px";
snake.style.left = xPos + "px";
snake.style.top = yPos + "px";
let storedHighscore = parseInt(localStorage.getItem('myNumber'));
if(Number.isNaN(storedHighscore)) {
	localStorage.setItem("myNumber", 0);
}
highScoreText.innerHTML = `HighScore: ${storedHighscore}`;
for(let i = 0; i < (30 / speed) * 3; i++) {
	positions.push({x: parseFloat(snake.style.left) + speed * i, y: parseFloat(snake.style.top)});
}
for(let i = 0; i < snakeSquares.length; i++) {
	snakeSquares[i].style.left = positions[(i+1) * (30 / speed) - 1].x + "px";
	snakeSquares[i].style.top = positions[(i+1) * (30 / speed) - 1].y + "px";
}
let game = setInterval(draw, intervalTime);

// KEYBOARD AND SWIPE EVENT LISTENERS 
document.addEventListener("keydown", function(){
	if(event.key === "ArrowLeft") {
		if(direction !== "right") direction = "left";

	}
	if(event.key === "ArrowUp") {
		if(direction !== "down") 
			direction = "up";
	}
	if(event.key === "ArrowDown") {
		if(direction !== "up") direction = "down";
	}
	if(event.key === "ArrowRight") {
		if(direction!== "left") 
			if(direction !== "nodirection") direction = "right";
	}
})
// SWIPE EVENTS
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
		if(direction !== "right") direction = "left";
        } else {
		if(direction!== "left") 
			if(direction !== "nodirection") direction = "right";
        }                       
    } else {
        if ( yDiff > 0 ) {
		if(direction !== "down") 
			direction = "up";
        } else { 
		if(direction !== "up") direction = "down";
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

// PAUSE EVENT 
document.addEventListener("keydown", function(event) {
	if(event.key === "Esc" || event.key === "Escape") {
		if(!pause) {
			clearInterval(game);
			pause = true;
			document.getElementById("pause").style.display = "flex";
		}
		else {
			game = setInterval(draw, intervalTime);
			pause = false;
			document.getElementById("pause").style.display = "none";
		}
	}
});
// DRAWING FUNCTION
function draw(){
	if(direction === "left") {
		// MOVING THE HEAD
		xPos -= speed;
		snake.style.left = xPos + "px";
		if(parseFloat(snakeSquares[2].style.left) < 0) {
			xPos = canvas.clientWidth;
		}
	}
	else if(direction === "up") {
		// MOVING THE HEAD
		yPos -= speed;
		snake.style.top = yPos + "px";
		if(parseFloat(snakeSquares[2].style.top) < 0) {
			yPos = canvas.clientHeight;
		}
	}
	else if(direction === "down") {
		// MOVING THE HEAD
		yPos += speed;
		snake.style.top = yPos + "px";
		if(parseFloat(snakeSquares[2].style.top) > canvas.clientHeight) {
			yPos = 0;
		}
		
	}
	else if(direction === "right") {
		//MOVING THE HEAD
		xPos += speed;
		snake.style.left = xPos + "px";
		if(parseFloat(snakeSquares[2].style.left) > canvas.clientWidth) {
			xPos = 0;
		}
		
	}
	
	



	// INCREASE WHEN GETTING THE APPLE
	if(collision(parseFloat(snake.style.left), parseFloat(snake.style.top), parseFloat(apple.style.left), parseFloat(apple.style.top), 30)) {
		score++;
		scoreText.innerHTML = `Score: ${score}`;
		apple.style.left = Math.floor(Math.random() * 0.8 * (canvas.clientWidth)) + "px";
		apple.style.top = Math.floor(Math.random() * 0.8 * (canvas.clientHeight)) + "px";
		const newSquare = document.createElement("div");
		newSquare.classList.add("squares");
		canvas.appendChild(newSquare);
		newSquare.style.left = snakeSquares[snakeSquares.length - 2].style.left;
		newSquare.style.top = snakeSquares[snakeSquares.length - 2].style.top;
		document.getElementById("audio").play();
		storedHighscore = parseInt(localStorage.getItem('myNumber'));
		if(score > storedHighscore) {
			storedHighscore = score;
		}
		localStorage.setItem("myNumber", storedHighscore);
		highScoreText.innerHTML = `HighScore: ${storedHighscore}`;
		clearInterval(game);
		intervalTime-= 0.01;
		game = setInterval(draw, intervalTime);

		
	}
	if(direction != "nodirection") {
		positions.unshift({x: parseFloat(snake.style.left), y: parseFloat(snake.style.top)});
		for(let i = 0; i < snakeSquares.length; i++) {
			snakeSquares[i].style.left = positions[(i+1) * (30 / speed) - 1].x + "px";
			snakeSquares[i].style.top = positions[(i+1) * (30 / speed) - 1].y + "px";
		}
	}
	// MAKING COLLISION WITH ITSELF
	for(let i = 2; i < snakeSquares.length; i++) {
		if(collision(parseFloat(snake.style.left), parseFloat(snake.style.top), parseFloat(snakeSquares[i].style.left), parseFloat(snakeSquares[i].style.top), 30)) {
			clearInterval(game);
			window.location.href = 'menu.html';

		}
	}
	
}

function collision(snakeX, snakeY, appleX, appleY, size) {
	if(snakeX > appleX && snakeX < appleX + size) {
		if(snakeY > appleY && snakeY < appleY + size) return true;
	}
	if(snakeX + size > appleX && snakeX + size < appleX + size) {
		if(snakeY + size > appleY && snakeY + size < appleY + size) return true;
	}
	return false;
}



