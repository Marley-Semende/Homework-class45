'use strict';

let isDancing = false;
let currentLeft = 0;
const imageElement = document.querySelector('img');

imageElement.style.left = '0px';

function catWalk() {
  if (!isDancing) {
    currentLeft += 10;
    imageElement.style.left = currentLeft + 'px';
  }

  if (currentLeft >= window.innerWidth) {
    currentLeft = 0;
    imageElement.style.left = currentLeft + 'px';
  }

  if (currentLeft >= window.innerWidth / 2 && currentLeft < window.innerWidth / 2 + 10) {
    
    if (!isDancing) {
      isDancing = true;
      imageElement.src = 'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

      // After 5 seconds, resume walking
      setTimeout(() => {
        imageElement.src = 'http://www.anniemation.com/clip_art/images/cat-walk.gif';
        isDancing = false;
      }, 5000);
    }
  }
}

setInterval(catWalk, 50);
