let canvas = document.getElementById("theCanvas");
let ctx = canvas.getContext("2d");
let square = 15;
let gameEnd = document.getElementById("background");
let theRetry = document.getElementById("retry");
let overGame = document.getElementById("gameOver");
let apple = new Image();
apple.src = "IMG_1236.JPG";
const canvasWidth = 300;
const canvasHeight = 270;
let snake = [];
let direction = "nodirection";
const buttons = document.querySelectorAll(".b");
let Score = 0;
let highScore = 0;
let theScore = document.querySelector(".score");
snake[0] = {x: square * 5, y: canvasHeight / 2};
for(let i = 1; i<3; i++){
	snake[i] = {x: snake[0].x + square * i, y: canvasHeight / 2};
}
let game = setInterval(draw, 100);
let fruit = {x: Math.floor(Math.random() * 20) * square, y: Math.floor(Math.random() * 17) * square};
function restart(){
gameEnd.style.top = "";
gameEnd.style.left = "";
overGame.style.top = "";
overGame.style.left = "";
snake = [];
direction = "nodirection";
Score = 0;
snake[0] = {x: square * 5, y: canvasHeight / 2};
for(let i = 1; i<3; i++){
	snake[i] = {x: snake[0].x + square * i, y: canvasHeight / 2};
}
fruit = {x: Math.floor(Math.random() * 20) * square, y: Math.floor(Math.random() * 17) * square};
}
buttons[0].addEventListener("click", function(){
	if(direction !== "right" && !draw()) direction = "left";
})
buttons[1].addEventListener("click", function(){
	if(direction !== "down" && !draw()) direction = "up";
})
buttons[2].addEventListener("click", function(){
	if(direction !== "up" && !draw()) direction = "down";
})
buttons[3].addEventListener("click", function(){
	if(direction!== "left" && !draw()) if(direction !== "nodirection") direction = "right";
})
function draw(){
ctx.clearRect(0, 0, canvasWidth, canvasHeight);
ctx.fillStyle = "grey";
for(let j = 0; j<canvasHeight; j += square){
if(j % 2 !== 0){
for(let i = 0; i<canvasWidth; i+= square * 2){
	ctx.fillRect(i, j, square, square);
}
}
else{
for(let i = square; i<canvasWidth; i+= square * 2){
	ctx.fillRect(i, j, square, square);
}
}
}
theScore.innerText = `Score: ${Score}`;
 ctx.drawImage(apple, fruit.x, fruit.y, square, square);
 ctx.fillStyle = "black";
 ctx.fillRect(snake[0].x, snake[0].y, square, square);
ctx.fillStyle = "green";
for(let i = 1; i<snake.length; i++){
ctx.fillRect(snake[i].x, snake[i].y, square, square);
}
let snakeX = snake[0].x;
let snakeY = snake[0].y;
if(direction === "left") snakeX -= square;
else if(direction === "up") snakeY -= square;
else if(direction === "down") snakeY += square;
else if(direction === "right") snakeX += square;
let newHead = {x: snakeX, y: snakeY};
if(direction === "left" || direction === "right" || direction === "up" || direction === "down"){
if(snake[0].x !== fruit.x || snake[0].y !== fruit.y) snake.pop();
else{
	fruit.x = Math.floor(Math.random() * 20) * square;
	fruit.y = Math.floor(Math.random() * 17) * square;
	Score++;

}
snake.unshift(newHead);
}

 if(collision(snake, snakeX, snakeY) || snakeX <= -square|| snakeX >= canvasWidth|| snakeY<= -square || snakeY >= canvasHeight){
 	direction = "nodirection";
 	if(Score > highScore) highScore = Score;
  gameEnd.style.top = "calc(50% - 350px / 2)";
 	gameEnd.style.left = "calc(50% - 300px / 2)";
 	overGame.style.top = "calc(40% - 150px / 2)";
 	overGame.style.left = "calc(50% - 300px / 2)";
 	theRetry.addEventListener("click", restart);
 	return true;
}
return false;
 }
function collision(theSnake, x, y){
	for(let i = 1; i<theSnake.length; i++){
		if(x === snake[i].x && y === snake[i].y) return true;
	}
	return false;
}




