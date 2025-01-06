let  score=JSON.parse(localStorage.getItem('score'))||{
  wins:0,
    losses:0,
    ties:0
  };

 updateScoreElement();
  /*


if(!score){
  score={
    wins:0,
    losses:0,
    ties:0
  }
}
  */
 let isAutoPlaying=false;
 let intervalId;
 
 //const autoPlay=()=>{

 //};


 function autoPlay(){
  if(!isAutoPlaying){
  intervalId=setInterval(()=>{
    const playerMove=pickComputerMove();
    playGame(playerMove);},1000);
    isAutoPlaying=true;
    document.querySelector('.js-auto-play-button').innerHTML= 'Stop Playing';
  } else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    document.querySelector('.js-auto-play-button').innerHTML='Auto Play';

  }
}

document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
  autoPlay();
 });

document.querySelector('.js-rock-button')
.addEventListener('click',()=>{
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click',()=>{
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click',()=>{
  playGame('scissors');
});

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playGame('rock');
  }
  else if(event.key==='p'){
    playGame('paper');
  }
  else if(event.key='s'){
    playGame('scissors');
  }
  else if(event.key==='a'){
    autoPlay();
  }
  else if(event.key==='Backspace'){
   showResetConfirmation();
  }
});

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
   showResetConfirmation();
  });

function showResetConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML=`
  Are you sure you want to reset the score?
  <button class="js-reset-confirm-yes reset-confirm-button">
  Yes
  </button>
  <button class="js-reset-confirm-no reset-confirm-button">
    No
   </button>
      `;

document.querySelector('.js-reset-confirm-yes')
.addEventListener('click', () => {
  resetScore();
  hideResetConfirmation();
});

document.querySelector('.js-reset-confirm-no')
.addEventListener('click', () => {
  hideResetConfirmation();
});

}

function hideResetConfirmation() {
document.querySelector('.js-reset-confirmation')
.innerHTML = '';
}


function resetScore(){
    score.wins=0,
    score.losses=0,
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();
}


  function playGame(playerMove){

  const computerMove= pickComputerMove();
  let result='';

  if(playerMove==='rock'){
      if(computerMove==='rock'){
      result='tie';
      }
      else if(computerMove==='paper'){
        result='lose';
      }
      else if(computerMove==='scissors'){
      result='win';
      }
  }

  else if(playerMove==='paper'){
      if(computerMove==='rock'){
      result='win';
      }
      else if(computerMove==='paper'){
      result='tie';
      }
      else if(computerMove==='scissors'){
      result='lose';
      }
  }

  else if(playerMove==='scissors'){
      if(computerMove==='rock'){
      result='lose';
      }
      else if(computerMove==='paper'){
      result='win';
      }
      else if(computerMove==='scissors'){
      result='tie';
      }
  }

  if (result === 'win') {
    score.wins++;
     }
     else if(result=== 'lose'){
      score.losses++;
     }
     else if(result==='tie'){
      score.ties++;
     }

     localStorage.setItem('score',JSON.stringify(score));

     updateScoreElement();

     document.querySelector('.js-result').innerHTML= result

     document.querySelector('.js-moves').innerHTML= `you
        <img src="images/${playerMove}-emoji.png"class="move-icon">-
        <img src="images/${computerMove}-emoji.png"class="move-icon">
        computer`;
    }

  function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
            
  function pickComputerMove(){
     const randomNumber= Math.random();
     let computerMove=''; 
        if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove='rock';
        }
        else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove='paper';
        }
        else if (randomNumber >=2/3 && randomNumber < 1){
        computerMove='scissors';
        }
        return computerMove;
  }
        

