/******************************************
Treehouse FSJS Techdegree:
project 2 - Data Pagination and Filtering
******************************************/

/********  global variables  *****************************/
const ulPagination = document.querySelector('ul.link-list');
const header = document.querySelector('header.header');
const itemsPerPage = 9;
let currentStudentList = data;

/***
 * `showPage` function
 * Create and insert/append the elements needed to display a "page" of nine students
 * 1) create start and end index from page #
 * 2) clear unordered list's html
 * 3) create the html from the list's students and insert in unordered list
 * @param {array} list - array of student objects
 * @param {integer} page - the page # to display
 ***/
const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const ulStudent = document.querySelector('ul.student-list');
   ulStudent.innerHTML = '';
   let html = '';

   for (let i = startIndex; i < endIndex && i < list.length; i++) {
      let student = list[i];
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

/***
 * `addPagination` function
 * Create and insert/append the elements needed for the pagination buttons
 * 1) calculate the number of buttons needed
 * 2) create buttons with index and insert into unordered list
 * 3) set the first list item button to active
 * @param {array} list - array of student objects
 ***/
const addPagination = list => {
   let numOfButtons = Math.ceil(list.length / itemsPerPage);
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

/***
 * pagination event listener - click events
 * listen to click events on the pagnination UL
 * 1) if selected is not active then remove active class from all buttons
 * 2) set selected element class to active
 * 3) call showPage function with the index value of the selected element
 * @param {event} e - object/interface representing the click event
 ***/
ulPagination.addEventListener('click', e => {
   const selectedElement = e.target;
   if (selectedElement.tagName === 'BUTTON' && selectedElement.className != 'active') {
      liList = ulPagination.children;

      for (let i = 0; i < liList.length; i++) {
         const element = liList[i];
         element.firstElementChild.className = '';
      }

      selectedElement.className = 'active';
      //load the clicked pages students
      showPage(currentStudentList, selectedElement.textContent);
   }
})


/***
 * `createSearchBar` function
 * Create SearchBar for finding students
 * 1) create html for search and insert at the end of header
 * 2) create a paragraph elment for displaying message for no matching records
 *    hide until needed, add below the search bar
 ***/
createSearchBar = () => {
   const html = `
   <div>
      <label for="search" class="student-search">
          <input id="search" placeholder="Search by name...">
          <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   </div>
 `;
   header.insertAdjacentHTML('beforeend', html);

   const paragraphForMessage = document.createElement('p');
   paragraphForMessage.id = "message";
   paragraphForMessage.textContent = "No Student Found!";
   paragraphForMessage.style.display = 'none';
   header.appendChild(paragraphForMessage);
}

/***
 * `displayNoStudentMessage` function
 * Display a No Matching Records Found Message
 * 1) find paragraph element for messages
 * 2) hide or unhide when called
 * @param {boolean} display - display students = true
 ***/
displayNoStudentMessage = (display) => {
   console.log(display);
   const paragraphForMessage = document.querySelector("p#message");
   if (display) {
      paragraphForMessage.style.display = 'block';
   } else {
      paragraphForMessage.style.display = 'none';
   }
}

/***
 * `updateStudentArrow` function
 * Update the array of students based on the input box's value - called from an input event listener
 *    (created one function to use for both click and keyup then found input and it seems to take care of both)
 * 1) get input element and input current value
 * 2) search for students in the master array for matches to the input's value
 * 3) display the new list in the page OR
 *    the original master list if no matches & display a message that no matches were found
 * @param {event} e - object/interface representing the click event
 ***/
const updateStudentArrow = e => {
   //if statement code from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event
   if (event.isComposing || event.keyCode === 229) {
      return;
   }
   e.preventDefault();

   const input = document.querySelector('input#search');
   let currentInputValue = input.value.toLowerCase();

   //Searchs first and last name for a match - Inorder to be able to enter both first AND last name in the search,
   //                                        - I would have to add a new property to name, combining first and last names and then search that property below
   let students = data.filter(student => (student.name.first.toLowerCase().includes(currentInputValue) || student.name.last.toLowerCase().includes(currentInputValue)));
   if (students.length > 0) {
      currentStudentList = students;
      displayNoStudentMessage(false);
      showPage(currentStudentList, 1);
      addPagination(students);
   } else {
      currentStudentList = data;
      displayNoStudentMessage(true);
      showPage(currentStudentList, 1);
      addPagination(currentStudentList);
   }
}

//when the input box values change fire this event
/***
 * header event listener - input events - (seems to encapsulate both click and keyup, etc...)
 * 1) call updateStudentArrow when the input value changes
 ***/
header.addEventListener('input', updateStudentArrow);


// Call functions the first time
createSearchBar();
showPage(currentStudentList, 1);
addPagination(currentStudentList);
