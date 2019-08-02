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
   }


   getRandomPhrase() {
     let randomNumber = Math.floor( Math.random() * this.phrases.length);
     return this.phrases[randomNumber].phrase;
   }

   startGame() {
     //displays startGame screen
     const screenOverlay = document.querySelector('div#overlay');
     screenOverlay.removeAttribute('id');
     const startGameScreen = document.querySelector('div.start');
     startGameScreen.style.display = 'none';

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
     let lifeImage = document.querySelectorAll('div#scoreboard img[src="images/liveHeart.png"]');
     const lifeImageArray = Array.prototype.slice.call(lifeImage);
     if (lifeImage) {
       lifeImageArray[0].setAttribute('src', 'images/lostHeart.png');
     }
   }

   checkForWin() {
     const lifeImage = document.querySelectorAll('div#scoreboard img[src="images/liveHeart.png"]');
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

     if (gameWin === true) {
       alert('you won!');
     }

     if (gameLose === true) {
       alert('you lose!')
     }



   }

 }
