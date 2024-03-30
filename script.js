let canvas = document.getElementById("theCanvas");
let ctx = canvas.getContext("2d");
let square = 15;
let gameEnd = document.getElementById("background");
let theRetry = document.getElementById("retry");
let overGame = document.getElementById("gameOver");
let apple = new Image();
let snake = [];
let direction = "nodirection";
let Score = 0;
let highScore = 0;
let theScore = document.querySelector(".score");

canvas.height = canvas.width;
// DRAWING THE SNAKE BOARD

setInterval(draw, 200);
let fruit = {x: Math.floor(Math.random() * 20) * square, y: Math.floor(Math.random() * 20) * square};
snake[0] = {x: square * 5, y: canvas.height / 2};
for(let i = 1; i < 3; i++){
	snake[i] = {x: snake[0].x + square * i, y: canvas.height / 2};
}
apple.src = "icons8-red-apple-48.png";
function restart() {
	if (Score > highScore) highScore = Score
	gameEnd.style.top = "";
	gameEnd.style.left = "";
	overGame.style.top = "";
	overGame.style.left = "";
	snake = [];
	direction = "nodirection";
	Score = 0;
	snake[0] = {x: square * 5, y: canvas.height / 2};
	for(let i = 1; i<3; i++){
		snake[i] = {x: snake[0].x + square * i, y: canvas.height / 2};
	}
	fruit = {
		x: Math.floor(Math.random() * 20) * square, 
		y: Math.floor(Math.random() * 20) * square
	};
}
document.addEventListener("keydown", function(){
	if(event.key === "ArrowLeft") {
		if(direction !== "right" && !draw()) direction = "left";
	}
	if(event.key === "ArrowUp") {
		if(direction !== "down" && !draw()) direction = "up";
	}
	if(event.key === "ArrowDown") {
		if(direction !== "up" && !draw()) direction = "down";
	}
	if(event.key === "ArrowRight") {
		if(direction!== "left" && !draw()) if(direction !== "nodirection") direction = "right";
	}
})

// DRAWING FUNCTION
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	theScore.innerText = `Score: ${Score}`;
	document.getElementById("highScore").innerHTML = `Highscore: ${highScore}`;
	ctx.drawImage(apple, fruit.x, fruit.y, square, square);
	ctx.fillStyle = "black";
	ctx.fillRect(snake[0].x, snake[0].y, square, square);
	ctx.fillStyle = "brown";
	for(let i = 1; i < snake.length; i++){
		ctx.fillRect(snake[i].x, snake[i].y, square, square);
	}
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if(direction === "left") snakeX -= square;
	else if(direction === "up") snakeY -= square;
	else if(direction === "down") snakeY += square;
	else if(direction === "right") snakeX += square;
	let newHead = {x: snakeX, y: snakeY};
	if(direction !== "nodirection"){
		if(snake[0].x !== fruit.x || snake[0].y !== fruit.y) 
			snake.pop();
		else{
			fruit.x = Math.floor(Math.random() * 20) * square;
			fruit.y = Math.floor(Math.random() * 17) * square;
			Score++;

		}
		snake.unshift(newHead);
	}

	if(collision(snake, snakeX, snakeY) || snakeX < 0 || snakeX >= canvas.width|| snakeY < 0 || snakeY >= canvas.height) {
		direction = "nodirection";
		gameEnd.style.top = "calc(50% - 350px / 2)";
		gameEnd.style.left = "calc(50% - 300px / 2)";
		overGame.style.top = "calc(40% - 150px / 2)";
		overGame.style.left = "calc(50% - 300px / 2)";
		theRetry.addEventListener("click", restart);
	}
}
function collision(theSnake, x, y){
	for(let i = 1; i<theSnake.length; i++){
		if(x === snake[i].x && y === snake[i].y) return true;
	}
	return false;
}




