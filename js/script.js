/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const ulStudent = document.querySelector('ul.student-list');
const ulPagination = document.querySelector('ul.link-list');

const itemsPerPage = 9;

//const createStudentHtml = (list)

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   ulStudent.innerHTML = '';
   let html = '';

   for (let i = startIndex; i < endIndex && i < list.length; i++) {
      // for (let i = 0; i < data.length; i++) {
      let student = data[i];
      html += `
      <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src=${student.picture.large} alt="Profile Picture">
        <h3>${student.name.first} ${student.name.last}</h3>
        <span class="email">${student.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${student.registered.date}</span>
      </div>
      </li>
      `;
   }

   ulStudent.insertAdjacentHTML('beforeend', html);
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) => {
   let numOfButtons = Math.ceil(list.length / 9);
   ulPagination.innerHTML = '';
   let html = '';

   for (let i = 1; i <= numOfButtons; i++) {
      html += `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
   }

   ulPagination.insertAdjacentHTML('beforeend', html);

   //grab fist li and add active class
   ulPagination.firstElementChild.firstElementChild.className = 'active';
}

//Event Listner for clicks
ulPagination.addEventListener('click', (e) => {
   const selectedElement = e.target;
   if (selectedElement.tagName === 'BUTTON' && selectedElement.className != 'active') {
      liList = ulPagination.children;
      console.log(liList);
      //remove class from all other buttons.
      for (let i = 0; i < liList.length; i++) {
         const element = liList[i];
         console.log(element);
         element.firstElementChild.className = '';
      }

      selectedElement.className = 'active';
      //load the clicked pages students
      showPage(data, selectedElement.textContent);
   }
})


// Call functions the first time
showPage(data, 1);
addPagination(data);
