import {useParticipants, participants } from './store'; 
import { initMeetings } from './utils/initMeetings';
import { removeEventsFromTable } from './utils/removeEvensFromTable';

let parseJsonStorage;
let storage = window.localStorage.getItem('meetings');
if(storage === null) {
    parseJsonStorage = [];
    } else {
    parseJsonStorage = JSON.parse(storage);
}

const selectParticipants = document.createElement('select');
selectParticipants.setAttribute("name", "nameOfParticipant");
selectParticipants.setAttribute("class", "form-select");
selectParticipants.addEventListener('change', (evt) => {
    let filteredEvents = parseJsonStorage.filter(item => item.nameOfParticipant === evt.target.value);   
    if(evt.target.value === "all") { 
    removeEventsFromTable(parseJsonStorage);
     initMeetings(parseJsonStorage);
    return
   }
   removeEventsFromTable(parseJsonStorage);  
    if (filteredEvents.length !== 0) {
        initMeetings(filteredEvents);
    } 
});

const options = [];
const allParticipant = useParticipants().toString();
let optionAll = document.createElement('option');
optionAll.innerHTML = "All members";
optionAll.setAttribute('value', 'all');

selectParticipants.append(optionAll);

participants.map(item => {
    let option = document.createElement('option');
    option.setAttribute('value', item.name);
    option.innerText = item.name;
    options.push(option)
});

options.forEach(item => {
    selectParticipants.append(item);
});  

const nav = document.querySelector('.nav__members');
nav.appendChild(selectParticipants); 
initMeetings(parseJsonStorage);


