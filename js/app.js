
let openCards = []; // number of cards opened
let matchedCards = 0; // count of total matched cards
let timerFlag = true; //timer flag
let moves = 0; // keeps the count of total moves
let restart = document.querySelector(".restart"); //restart button selector
let replay = document.querySelector(".replay"); // modal replay button selector
let starsCount = document.querySelector(".stars"); //select the stars
let deck = document.querySelector(".deck"); // deck that holds the card
let modal = document.querySelector("#myModal"); // modal selector 

/*
 * Create a list that holds all of your cards
 */
let cardsArray = ["fa fa-diamond", 
"fa fa-paper-plane-o", 
"fa fa-anchor", 
"fa fa-bolt", 
"fa fa-cube", 
"fa fa-leaf", 
"fa fa-bicycle", 
"fa fa-bomb", 
"fa fa-diamond", 
"fa fa-paper-plane-o", 
"fa fa-anchor", 
"fa fa-bolt", 
"fa fa-cube", 
"fa fa-leaf", 
"fa fa-bicycle", 
"fa fa-bomb"];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// puts cards on the deck
shuffleCards();

// event listener to restart button
restart.addEventListener('click', function(evt){
  resetGame();
});


//reset the game function
function resetGame() {
  moves = 0;
  matchedCards = 0;
  openCards = [];
  deck.innerHTML = " ";
  document.querySelector(".moves").innerHTML = 0;
  resetTimer();
  resetStars();
  shuffleCards();
};

//shuffles the cards and appends to deck
function shuffleCards() {
  const shuffledCardsArray = shuffle(cardsArray);
  for (let i = 0; i< shuffledCardsArray.length; i++){
    let card = document.createElement("li");
    card.classList.add("card");
    deck.appendChild(card);
    card.innerHTML = `<i class='${shuffledCardsArray[i]}'></i>`;
  }
}

//timer start function
function startTimer() {
   if(timerFlag) {
     let timer = document.querySelector(".timer").innerHTML;
     let timeArray = timer.split(":");
     let min = parseInt(timeArray[0]);
     let sec = parseInt(timeArray[1]);
     if (sec === 59){
       min++;
       sec = 0;
     }
     else {
       sec++;
     }
     if(sec < 10){
       sec = "0" + sec;
     }    
    document.querySelector(".timer").innerHTML = min + ":" + sec;
    setTimeout(startTimer, 1000);
   }
}

// resets the timer
function resetTimer() {
  document.querySelector(".timer").innerHTML = "00:00";
}

// pause and plays the timer
function changeStateTimer() {
  if(timerFlag == false) {
    timerFlag = true;
    startTimer();
  }
  else {
    timerFlag = false; 
  }
}

// listens to the mouse clicks                   
deck.addEventListener("click", function(event) {
  let target = event.target;
  if(target.classList.contains("card") && openCards.length < 2) {
    toggleClass(target);
    openCards.push(target);
    if(openCards.length === 2){
      incrementMove();
      matchStatus();      
    }
  }
});


// toggle the class on clicked card
function toggleClass(target) { 
  target.classList.toggle("show");
  target.classList.toggle("open");
}

// checks the card similarity in opencards array.
function matchStatus(){
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].classList.toggle("match");
    openCards[1].classList.toggle("match");
    openCards = [];
    matchedCards++;
    if (matchedCards === 8) {
      myModal();
    }
  } 
  else {
    setTimeout(function() {
      toggleClass(openCards[0]);
      toggleClass(openCards[1]);
      openCards = [];
    }, 400);
  }
}

// increment moves after clicks on card
function incrementMove() {
  moves++;
  let movesCount = document.querySelector(".moves");
  movesCount.innerHTML = moves;
  if(moves > 12) {
     starRating();
  }
}

// display the number of stars as per number moves
function starRating(){
  if(moves >= 12 && moves < 16){
    starsCount.innerHTML = " ";
    starsCount.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  }
  if(moves >= 16 ){
    starsCount.innerHTML = " ";
    starsCount.innerHTML = `<li><i class="fa fa-star"></i></li>`; 
  }
}

// resets the number of stars
function resetStars() {
  starsCount.innerHTML = " ";
  starsCount.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li`;
}

// for displaying modal
function myModal() {
  changeStateTimer();
  let totTime = document.querySelector(".timer").innerHTML;
  document.querySelector(".noOfMoves").innerHTML = `Moves Taken : ${moves}`;
  document.querySelector(".totalStars").innerHTML = `Star Rating : ${document.querySelector(".stars").outerHTML}`;
  document.querySelector(".totalTime").innerHTML = `Time Taken : ${totTime}`;
  modal.classList.toggle("modal-display");
}


// listens to the Modal replay button
replay.addEventListener("click", function(evt){
  modal.classList.toggle("modal-display");
  changeStateTimer();
  resetTimer();
  resetGame();
});

//listen to the Modal close button
document.querySelector(".close-modal").addEventListener("click", function(evt){
  changeStateTimer();
  modal.classList.toggle("modal-display");
});

//starts timer
startTimer();
