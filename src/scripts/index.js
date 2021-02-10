/* eslint-disable no-undef */
import initMeetings from './utils/initMeetings';
import removeEventsFromTable from './utils/removeEvensFromTable';
import { useParticipants } from './store';

let parseJsonStorage;
const storage = window.localStorage.getItem('meetings');
if (storage === null) {
  parseJsonStorage = [];
} else {
  parseJsonStorage = JSON.parse(storage);
}

const selectParticipants = document.createElement('select');
selectParticipants.setAttribute('name', 'nameOfParticipant');
selectParticipants.setAttribute('class', 'form-select');
selectParticipants.addEventListener('change', (evt) => {
  // eslint-disable-next-line max-len
  const filteredEvents = parseJsonStorage.filter((item) => item.nameOfParticipant === evt.target.value);
  if (evt.target.value === 'all') {
    removeEventsFromTable(parseJsonStorage);
    initMeetings(parseJsonStorage);
    return;
  }
  removeEventsFromTable(parseJsonStorage);
  if (filteredEvents.length !== 0) {
    initMeetings(filteredEvents);
  }
});

const options = [];
const optionAll = document.createElement('option');
optionAll.innerHTML = 'All members';
optionAll.setAttribute('value', 'all');

selectParticipants.append(optionAll);
const participants = useParticipants();

participants.forEach((item) => {
  const option = document.createElement('option');
  option.setAttribute('value', item.name);
  option.innerText = item.name;
  options.push(option);
});

options.forEach((item) => {
  selectParticipants.append(item);
});

const nav = document.querySelector('.nav__members');
nav.appendChild(selectParticipants);
initMeetings(parseJsonStorage);