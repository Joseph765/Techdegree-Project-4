/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {

   constructor() {
     this.missed = 0;
     this.phrases = [
       {phrase: 'you win'},
       {phrase: 'guess this phrase'},
       {phrase: 'programming is cool'},
       {phrase: 'i like the zoo'},
       {phrase: 'chinese buffet'}
     ];
     this.activePhrase = null;
     this.phraseClass = null;
     this.qwertyDiv = document.querySelector('div#qwerty');
     this.overlayDiv = document.querySelector('div#overlay');
     this.phraseDiv = document.querySelector('div#phrase');
     this.scoreboardDiv = document.querySelector('div#scoreboard');
   }


   getRandomPhrase() {
     let randomNumber = Math.floor( Math.random() * this.phrases.length);
     return this.phrases[randomNumber].phrase;
   }

   startGame() {

     this.resetGame();

     // undisables keyboardButtons
     for (let i = 0; i < this.qwertyDiv.length; i += 1) {
       this.qwertyDiv[i].disabled = false;
     }


     this.qwertyDiv.style.display = 'block';
     this.overlayDiv.style.display = 'none';
     this.phraseDiv.style.display = 'block';
     this.scoreboardDiv.style.display = 'block';

     let phrase = this.getRandomPhrase();
     this.activePhrase = phrase;

     this.phraseClass = new Phrase(phrase);
     this.phraseClass.addPhraseToDisplay(phrase);
   }

   handleInteraction(keyPressed) {
     if (keyPressed.tagName === 'BUTTON') {
       keyPressed.disabled = true;
       keyPressed.style.opacity = 0.5;

       const letters = document.querySelectorAll('div#phrase li');
       let counter = 0;
       for ( let i = 0; i < letters.length; i += 1 ) {
         if (letters[i].textContent === keyPressed.textContent) {
           keyPressed.className = 'chosen';
           this.phraseClass.showMatchedLetter(keyPressed, letters[i]);
         } else {
           counter += 1;
         }
       }
       if (counter === letters.length) {
         keyPressed.classList.add('wrong');
         this.removeLife();
         this.missed += 1;
       }
       if (this.checkForWin() === true) {
         this.gameOver(true, false);
       }
       if (this.missed === 5) {
         this.gameOver(false, true)
       }
      }

     }

   removeLife() {
     const lifeImage = document.querySelectorAll('li.tries img[src="images/liveHeart.png"]');
     const lifeImageArray = Array.prototype.slice.call(lifeImage);
     if (lifeImage) {
       lifeImageArray[0].setAttribute('src', 'images/lostHeart.png');
     }
   }

   checkForWin() {
     const phraseList = document.querySelectorAll('div#phrase li');
     const phraseListArray = Array.prototype.slice.call(phraseList); //https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
     const newPhraseList = phraseListArray.filter( li => li.textContent !== ' ');
     let letterCounter = 0;

     for (let i = 0; i < newPhraseList.length; i += 1) {
       if (newPhraseList[i].classList.contains('show')) {
         letterCounter += 1;
       }
     }

     if (letterCounter === newPhraseList.length) {
       return true;
     } else {
       return false;
     }

   }

   gameOver(gameWin, gameLose) {

     const h1 = document.querySelector('div#overlay h1');

     this.qwertyDiv.style.display = 'none';
     this.overlayDiv.style.display = 'flex';
     this.phraseDiv.style.display = 'none';
     this.scoreboardDiv.style.display = 'none';

     //diabling keyboard keyboard buttons
     const keyboardButtons = document.querySelectorAll('div#qwerty button');
     const keyboardButtonsArray = Array.prototype.slice.call(keyboardButtons);

     for (let i = 0; i < keyboardButtonsArray.length; i += 1) {
       keyboardButtonsArray[i].disabled = true;
     }

     if (gameWin === true) {
       h1.textContent = 'You won! Play again!';
       this.overlayDiv.className = 'win';
     }

     if (gameLose === true) {
       h1.textContent = 'You lost. Play again.';
       this.overlayDiv.className = 'lose';
     }

   }

   resetGame() {

     //resetting life images
     const lifeImage = document.querySelectorAll('li.tries img');
     const lifeImageArray = Array.prototype.slice.call(lifeImage);

     for (let i = 0; i < lifeImageArray.length; i += 1) {
       lifeImageArray[i].setAttribute('src', 'images/liveHeart.png');
     }

     //resetting keyboard keyboard buttons
     const keyboardButtons = document.querySelectorAll('div#qwerty button');
     const keyboardButtonsArray = Array.prototype.slice.call(keyboardButtons);

     for (let i = 0; i < keyboardButtonsArray.length; i += 1) {
       keyboardButtonsArray[i].className = 'key';
       keyboardButtonsArray[i].style.opacity = 1.0;
       keyboardButtonsArray[i].disabled = false;
     }

     //resetting phrase
     this.activePhrase = null;
     this.phraseClass = null;
     this.phraseDiv.innerHTML = '<ul></ul>';
     this.missed = 0;
     this.overlayDiv.className = '';


   }

 }
