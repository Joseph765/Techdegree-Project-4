/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startButton = document.querySelector('#btn__reset');
const game = new Game();
const keyButtonDiv = document.querySelector('div#qwerty');
const keyButtons = document.querySelectorAll('div#qwerty button');

startButton.addEventListener('click', () => {

  game.startGame();
  animateKeyboard();


document.addEventListener('keyup', (e) => {
  for (let i = 0; i < keyButtons.length; i += 1) {
    const keyKeyboard = String.fromCharCode(e.which).toLowerCase();
    const keyButton = keyButtons[i].textContent;
    if (keyKeyboard === keyButton) {
      keyButtons[i].click();
    }
  }
});

});

keyButtonDiv.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    game.handleInteraction(e.target);
  }
});
