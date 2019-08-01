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

     const phraseObject = new Phrase(phrase);
     phraseObject.addPhraseToDisplay(phrase);
   }

   handleInteraction(keyPressed) {
     if (keyPressed.tagName === 'BUTTON') {
       keyPressed.disabled = true;
       keyPressed.style.opacity = 0.5;

       const letters = document.querySelectorAll('div#phrase li');

       for ( let i = 0; i < letters.length; i += 1 ) {
         if (letters[i].textContent === keyPressed.textContent) {
           keyPressed.className = 'chosen';
           const phraseObject = new Phrase(phrase);
           phraseObject.showMatchedLetter();
           let win = checkForWin();
           if (win === true) {
             gameOver();
           }
         } else {
           keyPressed.className = 'wrong';
           removeLife();
         }
       }

     }
   }

   removeLife() {

   }

 }
