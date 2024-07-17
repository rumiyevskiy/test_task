'use strict'

import { data_reserv } from './data.js';


// identify device
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('_touch');
  } else {
    document.body.classList.add('pc');
}

const listItems = document.querySelectorAll('.list__item');
const pageElementHeader = document.querySelector('.field__header');
const pageElementHeaderItem = document.querySelector('.field__header__title__name');


const tempElem = document.createElement('div');
                tempElem.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aspernatur iste dolore dignissimos optio iure maxime, labore, molestiae ducimus laborum voluptatum consequuntur non ad exercitationem id alias, debitis illo. Odit excepturi nisi dolores dolorem. Itaque dignissimos, libero ullam deserunt, hic cum dolore deleniti magnam optio esse voluptate voluptatem ipsa cumque, mollitia similique exercitationem aliquam nam reprehenderit. Reprehenderit autem reiciendis adipisci impedit ipsam animi odio laborum labore ';
                tempElem.style.padding = "20px";



listItems.forEach(element => {
    element.addEventListener('click', (event) => {
            event.preventDefault();
            const hrefValue = element.getAttribute('href');
            
            if (hrefValue == '1') {
              
              document.querySelector('.field__header__title__name').innerText = 'Dashboard';
              document.querySelector('.field__header__title__description').innerText = 'Active Dashboards';
              document.querySelector('.field__footer__content__description').innerText = '';
              document.querySelector('.field__footer__content__pagination__content').innerText = '';
              document.querySelector('.field__body__table').innerText = '';
              

            }else

              if (hrefValue == '2') {

                document.querySelector('.field__header__title__name').innerText = 'All Products';
                document.querySelector('.field__header__title__description').innerText = 'Product';
                document.querySelector('.field__footer__content__description').innerText = '';
                document.querySelector('.field__footer__content__pagination__content').innerText = '';
                document.querySelector('.field__body__table').innerText = '';
                document.querySelector('.field__body__table').appendChild(tempElem);

            }else

              if (hrefValue == '3') {

                document.querySelector('.field__header__title__name').innerText = 'All Customers';
                document.querySelector('.field__header__title__description').innerText = 'Active Members';
                

                main();

              }else 

                if (hrefValue == '4') {

                  document.querySelector('.field__header__title__name').innerText = 'Income';
                  document.querySelector('.field__header__title__description').innerText = 'Income';
                  document.querySelector('.field__footer__content__description').innerText = '';
                  document.querySelector('.field__footer__content__pagination__content').innerText = '';
                  document.querySelector('.field__body__table').innerText = '';
                  document.querySelector('.field__body__table').appendChild(tempElem);
  
              }else 

              if (hrefValue == '5') {

                document.querySelector('.field__header__title__name').innerText = 'Promote';
                document.querySelector('.field__header__title__description').innerText = 'Promote';
                document.querySelector('.field__footer__content__description').innerText = '';
                document.querySelector('.field__footer__content__pagination__content').innerText = '';
                document.querySelector('.field__body__table').innerText = '';
                document.querySelector('.field__body__table').appendChild(tempElem);

            }else

            if (hrefValue == '6') {

              document.querySelector('.field__header__title__name').innerText = 'Help';
              document.querySelector('.field__header__title__description').innerText = 'Help';
              document.querySelector('.field__footer__content__description').innerText = '';
              document.querySelector('.field__footer__content__pagination__content').innerText = '';
              document.querySelector('.field__body__table').innerText = '';
              document.querySelector('.field__body__table').appendChild(tempElem);

          };
            
    }
);
});

async function getData() {
  let data;
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
  } catch (error) {
    console.error('Fetching data failed:', error);
    data = data_reserv;
  }
  return data;
};


async function main() {

  // *****************************************
  let countRows;
  const customersData = await getData();
 
  function getElementSize() {
    return new Promise((resolve) => {
      const element = document.querySelector('.field__body');
      const rect = element.getBoundingClientRect();
      let rectWidth = rect.width;
      let rectHeight = rect.height;
      countRows = Math.ceil((rectHeight - 110) / 70);
      resolve();
    });
  }

  await getElementSize();

  window.addEventListener('load', async () => {
    await getElementSize();
    displayData(customersData, countRows, currentPage);
    displayPagination(customersData, countRows);
    console.log('countRows: ', countRows);
  });

// *****************************************

    let currentPage = 1;
    let rows = countRows;

    function displayData (arrData, rowPerPage, page) {

      const tableDataEl = document.querySelector('.field__body__table');
      tableDataEl.innerHTML = '';
      page--;

      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);

      // *********************************************

      let paginationDescription = document.querySelector('.field__footer__content__description');
      let paggDescText = `Showing data ${start+1} to ${start + paginatedData.length} of ${arrData.length} entries`;
      paginationDescription.innerText = paggDescText;

      // *********************************************

      const tableKeys = ['name', 'company.name', 'phone', 'email', 'country', 'status'];
      const tableHeaderContent = ['Customer Name', 'Company', 'Phone Number', 'Email', 'Country', 'Status'];
      

      const tableData = document.createElement('table');
      tableData.setAttribute('class', 'table__data');
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      tableHeaderContent.forEach(key => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(`${key}`));
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      tableData.appendChild(thead);
      const tbody = document.createElement('tbody');
      tableData.appendChild(tbody);

      // *********************************************

      paginatedData.forEach((el) => {

        const tableDataRowEl = tableData.getElementsByTagName('tbody')[0];
        const newRow = tableDataRowEl.insertRow();

        tableKeys.forEach(key => {

          let keys = key.split('.');
          let value = keys.reduce((obj, k) => obj && obj[k], el);
          value = value !== undefined ? value : key;
          const newCell = newRow.insertCell();
          const cellBox = document.createElement('div');

          if (key == 'status') {
            let statusBtn = document.createElement('span');
            statusBtn.classList.add('status__btn');

            let rndNumber = Math.random() < 0.5 ? 1 : 2;

            if (rndNumber == 2) {
              statusBtn.classList.add('status__btn--inactive');
              statusBtn.innerText = 'Inactive';
            } else {
              statusBtn.innerText = 'Active';
            }

            cellBox.appendChild(statusBtn);

          } else {
            cellBox.appendChild(document.createTextNode(value));
          };
          
          newCell.appendChild(cellBox);
          
        });

        tableDataEl.appendChild(tableData);

      });      

    };

    function displayPagination (arrData, rowPerPage) {

      const itemLeft = document.querySelector('.item__left');
      itemLeft.addEventListener('mousedown', () => {

        itemLeft.classList.add('field__footer__content__pagination__item--active');

        if(currentPage !== 1) {

          currentPage--;
          displayData(customersData, rows, currentPage);
          let currentItemLi = document.querySelector('li.field__footer__content__pagination__item--active');

          if (currentItemLi) {
            currentItemLi.classList.remove('field__footer__content__pagination__item--active');
          }
          const arrLiEl = document.querySelectorAll('.field__footer__content__pagination__item');
          arrLiEl[currentPage].classList.add('field__footer__content__pagination__item--active');
        }

      });

      itemLeft.addEventListener('mouseup', () => {
        itemLeft.classList.remove('field__footer__content__pagination__item--active');
      });
        
      const itemRight = document.querySelector('.item__right');
      itemRight.addEventListener('mousedown', () => {

        itemRight.classList.add('field__footer__content__pagination__item--active');

        if(currentPage !== pagesCount) {

          currentPage++;

          console.log('currentPage: ', currentPage);

          displayData(customersData, rows, currentPage);

          let currentItemLi = document.querySelector('li.field__footer__content__pagination__item--active');

          if (currentItemLi) {
            currentItemLi.classList.remove('field__footer__content__pagination__item--active');
          }

          const arrLiEl = document.querySelectorAll('.field__footer__content__pagination__item');
          arrLiEl[currentPage].classList.add('field__footer__content__pagination__item--active');
        }



      });

      itemRight.addEventListener('mouseup', () => {
        itemRight.classList.remove('field__footer__content__pagination__item--active');
      });

      const paginationEl = document.querySelector('.field__footer__content__pagination__content');
      const pagesCount = Math.ceil(arrData.length / rowPerPage);
      const ulEl = document.createElement('ul');
      ulEl.classList.add('field__footer__content__pagination__list');

      paginationEl.innerHTML = '';

      // *****************************************************
     

      // *****************************************************
      

      for (let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
      }

      paginationEl.appendChild(ulEl);

    };

    function displayPaginationBtn (page) {

        const liEl = document.createElement('li');
        liEl.classList.add('field__footer__content__pagination__item');
        liEl.innerText = page;

        if (currentPage == page) {
          liEl.classList.add('field__footer__content__pagination__item--active');
        }


        liEl.addEventListener('click', () => {

          if(currentPage !== page) {

            currentPage = page;    
            

 
            let currentItemLi = document.querySelector('li.field__footer__content__pagination__item--active');

            if (currentItemLi) {
              currentItemLi.classList.remove('field__footer__content__pagination__item--active');
            }            

            liEl.classList.add('field__footer__content__pagination__item--active');

            console.log('currentPageLiClick: ', currentPage);

            displayData(customersData, rows, currentPage);

          }          

        });

      return liEl;
    };

    displayData(customersData, rows, currentPage);
    displayPagination(customersData, rows);

    // *****************************************

}

const burgerBtn = document.querySelector('.burger__menu');
burgerBtn.addEventListener('click', () => {
  const menuField = document.querySelector('.wrapper__menu');
  menuField.classList.add('open');
})

const burgerBtnCls = document.querySelector('.burger__menu--close');
burgerBtnCls.addEventListener('click', () => {
  const menuField = document.querySelector('.wrapper__menu');
  menuField.classList.remove('open');
})

