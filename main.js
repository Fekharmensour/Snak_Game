const play_board =document.querySelector(".play-board")
const span_score=document.querySelector(".score")
const span_high_score=document.querySelector(".high-score")
const game_overElement=document.querySelector(".game_over .box")
const button_replay=document.querySelector(".button_replay ")


let FoodX ,FoodY, GameOver =false ;
let SnakeX = 15,SnakeY =15;
let velocityX=0,velocityY =0;
let SnakBody = [];
let setIntervalValid , score =0;
let highScore = localStorage.getItem("high_score") || 0;
span_high_score.innerHTML=`High Score ${highScore}`;


const ChangeFood_Posistions = () =>{
    FoodX = Math.floor(Math.random() * 30) +1;
    FoodY = Math.floor(Math.random() * 30) +1;
}



const handelGameOver = ()=>{
    // Clearing timr and reload page if the game is over
    clearInterval(setIntervalValid)
    game_overElement.style.display="block"
}


const initGame =()=>{
    if (GameOver) return handelGameOver();
    let html_Markup =   `<div class="food" style="grid-area: ${FoodX} / ${FoodY} ; "></div>`

    if(SnakeX == FoodY && SnakeY == FoodX){
        ChangeFood_Posistions()
        SnakBody.push([FoodY , FoodX])
        score++;
        let testvalue = score >= highScore? score:highScore;
        localStorage.setItem("high_score",testvalue)
        // change value Score
        span_score.innerHTML=`Score : ${score}`
        span_high_score.innerHTML=`High Score ${testvalue}`;
    }
    

    for (let i = SnakBody.length - 1; i > 0; i--) {
        SnakBody[i]=SnakBody[i-1]
    }

    SnakBody[0]=[SnakeX,SnakeY]
    

    SnakeX += velocityY;
    SnakeY += velocityX;

    if(SnakeX <= 0 || SnakeX > 30 || SnakeY <=0 || SnakeY >30){
        GameOver=true
        console.log(GameOver);
    }

    for (let i = 0; i < SnakBody.length; i++) {
        html_Markup +=   `<div class="head" style="grid-area: ${SnakBody[i][1]} / ${SnakBody[i][0]} ; "></div>`
        // checking if snak head hit the body 
        if(i !== 0 && SnakBody[0][1] === SnakBody[i][1] && SnakBody[0][0] === SnakBody[i][0]){
            GameOver =true
        }
    }
    // html_Markup +=   `<div class="head" style="grid-area: ${SnakeX} / ${SnakeY} ; "></div>`
    play_board.innerHTML = html_Markup
}

const Change_directions =(e)=>{
    if(e.key === "ArrowUp" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }else if(e.key === "ArrowDown" && velocityX!=-1){
        velocityX = 1;
        velocityY = 0;
    }else if(e.key === "ArrowLeft" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }else if(e.key === "ArrowRight" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }

}



ChangeFood_Posistions();
setIntervalValid=setInterval(initGame ,125)

if(!GameOver){document.addEventListener("keydown",Change_directions)}

button_replay.addEventListener("click" , ()=>{
    location.reload()
})