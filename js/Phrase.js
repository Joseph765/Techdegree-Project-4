/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {

   constructor(phrase) {
     this.phrase = phrase.toLowerCase();
   }

   addPhraseToDisplay(phrase) {

     //Deletes before creating new phrase to display
     function removeList() {
       if (document.querySelector('li.h')) {
         const div = document.querySelector('div#phrase');
         let li = document.querySelectorAll('div#phrase li');
         let ul = document.querySelector('div#phrase ul')

          if (document.querySelector('div#phrase ul:first-child')) {
            for (let i = 0; i < li.length; i += 1) {
              ul.removeChild(li[i]);
            }
          }
         }
       }


     function appendLi(key) {
       const div = document.querySelector('div#phrase');
       const ul = document.querySelector('div#phrase ul')
       const letter = document.createElement('li');
       ul.appendChild(letter)
       if (key === ' ') {
         letter.className = 'space';
         letter.textContent = ' ';
       } else {
         letter.classList.add('hide', 'letter', key);
         letter.textContent = key;
       }
     }

     removeList(); //Line 14
     for (let i = 0; i < phrase.length; i += 1) {
       appendLi(phrase.charAt(i));
     }

   }

   checkLetter(keyPressed) {
     const liPhrase = document.querySelectorAll('div#phrase li');
       for (let i = 0; i < liPhrase; i += 1) {
         if (keyPressed === liPhrase[i].textContent) {
           return true;
         } else {
           return false;
         }
       }
     }

    showMatchedLetter(keyPressed) {
      const liPhrase = document.querySelectorAll('div#phrase li');
        for (let i = 0; i < liPhrase; i += 1) {
          if (keyPressed === liPhrase[i].textContent) {
            liPhrase[i].classList.remove('hide');
            liPhrase[i].classList.add('show');
          } else {
            liPhrase[i].classList.remove('show');
            liPhrase[i].classList.add('hide');
          }
      }
    }



 }
