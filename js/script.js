'use strict'

// identify device
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('_touch');
  } else {
    document.body.classList.add('pc');
}

const listItems = document.querySelectorAll('.list__item');

const pageElement = document.querySelector('.page__body');

listItems.forEach(element => {
    element.addEventListener('click', (event) => {
            event.preventDefault();
            const hrefValue = element.getAttribute('href');
            
            pageElement.innerHTML = hrefValue;
    }
);
});