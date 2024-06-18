'use strict'

// identify device
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('_touch');
  } else {
    document.body.classList.add('pc');
}

const listItems = document.querySelectorAll('.list__item');

const pageElement = document.querySelector('.page__field');

listItems.forEach(element => {
    element.addEventListener('click', (event) => {
            event.preventDefault();
            const hrefValue = element.getAttribute('href');
            
            // pageElement.innerHTML = hrefValue;
    }
);
});

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log('data: ', data);
  return data;
};


async function main() {

    const customersData = await getData();
    let currentPage = 1;
    let rows = 10;

    function displayData (arrData, rowPerPage, page) {
      
    };

    function displayPagination () {};

    function displayPaginationBtn () {};

}

main();