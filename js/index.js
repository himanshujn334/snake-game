let inputDir = {x:0, y:0};
const foodSound = new Audio('../food.mp3');
const gmaeOver = new Audio('../gameover.mp3')
const moveSound = new Audio('../move.mp3');
const musicSound = new Audio('../music.mp3');
let speed = 8;
let score = 0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];
food = {x:6,y:8};
// let hiscoreval = 0;
//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x == snakeArr[0].x && snake[i].y == snakeArr[0].y) {
            return true;
        }
    }
    //if you bump into wall
    if (snake[0].x >=18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0 ) {
        return true;
    }
}
function gameEngine() {
    //part 1: updating the snke and food array
    if (isCollide(snakeArr)) {
        gmaeOver.play();
        musicSound.pause();
        inputDir = { x:0, y:0 };
        alert('Game Over Press Any key to Play again!');
        snakeArr = [{x:13,y:15}];
        // musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }
    //sanke eats food
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        score += 1;
        if (score>hiscoreval) {
        // hiscoreVal = score;    
        hiscoreval = score;    
        localStorage.setItem('hiscore' , JSON.stringify(hiscoreval));   
        hiscoreBox.innerHTML = "High score: " + hiscoreval; 
        }
        scoreBox.innerHTML = 'Score: ' + score;
        let a = 2;
        let b = 17;
        food = {x : Math.round(a + (b-a)*Math.random()),y : Math.round(a + (b-a)*Math.random())};
    }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: displaying the snake and food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    })
    //displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
//main logic start here
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore' , JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High score: " + hiscore; 
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0,y:1};
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;    
    
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;                
        default:
            break;
    }
})
