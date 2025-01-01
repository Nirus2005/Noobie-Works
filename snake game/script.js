import { update as updateSnake, draw as drawSnake,SNAKE_SPEED, getSnakehead,snakeIntersection, resetSnake } from './snake.js'
import {update as updateFood, draw as drawFood, resetFood} from './food.js'
import { outsideGrid } from './grid.js'
import { resetInputs } from './input.js'
let gameOver = false
let lastRenderTime=0
const gameBoard = document.getElementById('game-board')

function main(currentTime){
    do {if (gameOver){
            if (confirm('You Lost. Press ok to restart. ')){
                restartGame()
                }
            }
        } while (gameOver);

    window.requestAnimationFrame(main)
    const secondsSinceLastRender= (currentTime- lastRenderTime)/1000
    if (secondsSinceLastRender < 1/ SNAKE_SPEED) return 
    
    lastRenderTime = currentTime

    update()
    draw()

}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}


function checkDeath() {
    gameOver = outsideGrid(getSnakehead()) || snakeIntersection()
}

function restartGame() {
    gameOver = false;
    resetSnake();
    resetFood();
    resetInputs();
    
    lastRenderTime = 0;
    window.requestAnimationFrame(main);
}


