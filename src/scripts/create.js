import { participants, useParticipants } from './store';
import { daysOfWeek, timeOfMeeting } from './utils/data';
import {  checkEventMeeting } from './utils/checkEventMeeting';

const createWrapper = document.querySelector('.create-wrapper');
let nameOfEvent;
let nameOfParticipant;
let nameOfDay;
let nameOfTime;
let result;
const meetingStorage =  window.localStorage;


// function testSubmit(evt) {
//     evt.preventDefault();
//     console.log('testSubmit', evt.target)
// }

const form = document.createElement('form');
form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    nameOfEvent = form.elements['nameOfEvent'].value;
    nameOfParticipant = form.elements['nameOfParticipant'].value;
    nameOfDay = form.elements['nameOfDay'].value;
    nameOfTime = form.elements['nameOfTime'].value;
 
    let metings = meetingStorage.getItem('metings');
    
    if(!metings) {
        console.log('STTT', metings);
        meetingStorage.setItem('metings', JSON.stringify([{
           nameOfEvent,
           nameOfDay,
           nameOfTime,
           nameOfParticipant, 
        }]))

    } else {

    let parseJsonStorage = JSON.parse(metings);
    result = checkEventMeeting(parseJsonStorage, nameOfDay, nameOfTime);
    if(!result) {        
        const errorMessage = document.createElement('div');
        const cancelError = document.createElement('span');
        errorMessage.style = `color: red; cursor: pointer;`;
        cancelError.innerText = "X";
        cancelError.style = `color: red; cursor: pointer;`;

        errorMessage.innerText = "Failed to create an event. This slot is alredy booked";
        errorMessage.style = `color: red;`;
        createWrapper.appendChild(errorMessage);
        createWrapper.appendChild(cancelError);

        cancelError.addEventListener("click", function() {
            createWrapper.removeChild(errorMessage);
            createWrapper.removeChild(cancelError);
        });
        return
    }
    meetingStorage.setItem('metings', JSON.stringify([
        ...parseJsonStorage,
        {nameOfEvent, nameOfDay, nameOfTime, nameOfParticipant }
    ]));
    }
    form.elements['nameOfEvent'].value = "";
    window.history.go(-1);
});

const labelName = document.createElement('label');
const input = document.createElement('input');
input.setAttribute("type", "text");
input.setAttribute("name", "nameOfEvent");
labelName.append(input);

console.log('input', input);

const selectParticipants = document.createElement('select');
selectParticipants.setAttribute("name", "nameOfParticipant");
const labeSelectParticipant = document.createElement('label');
labeSelectParticipant.style = `display: block`; 
labeSelectParticipant.innerText = "Participants";
labeSelectParticipant.appendChild(selectParticipants);
const opt =  [];

const allParticipant = useParticipants().toString();
let optionAll = document.createElement('option');
optionAll.innerHTML = allParticipant;
optionAll.setAttribute('value', 'all' );

selectParticipants.append(optionAll);

participants.map(item => {
    let option = document.createElement('option');
    console.log('options', option);
    option.setAttribute('value', item.name);
    option.innerText = item.name;
    opt.push(option)
});

opt.forEach(item => {
    selectParticipants.append(item);
});    


const labelDayOfWeek = document.createElement('label');
labelDayOfWeek.innerText = "Day";
labelDayOfWeek.style = `display: block`; 
const selectDay = document.createElement('select');
selectDay.setAttribute("name", "nameOfDay");
let optionSelectedDay = []; 

daysOfWeek.forEach(item => {
    let option = document.createElement('option');
    option.setAttribute('value', item);
    option.innerText = item;
    optionSelectedDay.push(option);
});

optionSelectedDay.forEach(item => {
    selectDay.append(item);
});
labelDayOfWeek.appendChild(selectDay);

const labelTime = document.createElement('label');
labelTime.innerText = "Time";
labelTime.style = `display: block`; 
const selectTime = document.createElement('select');
selectTime.setAttribute("name", "nameOfTime");
let optionSelectedTime = []; 

timeOfMeeting.forEach(item => {
    let option = document.createElement('option');
    option.setAttribute('value', item);
    option.innerText = item;
    optionSelectedTime.push(option);
});

optionSelectedTime.forEach(item => {
    selectTime.append(item);
});
labelTime.appendChild(selectTime);

console.log('optionSelectedDay',optionSelectedDay)

const btnBlock = document.createElement('div');
const btnCreate = document.createElement('button');
btnCreate.innerText ="Create";
btnCreate.setAttribute("type", "submit");

// btnCreate.addEventListener('click', function(evt) {
//     console.log('Click', evt.target.value);
// });
const btnCancel = document.createElement('button');
btnCancel.setAttribute("type", "button");
btnCancel.innerText ="Cancel";
btnCancel.addEventListener('click', function(evt) {
    console.log('btnCancel', evt.target.value);
    window.history.back();
});

labelName.innerText = "Name of event";
btnBlock.appendChild(btnCancel);
btnBlock.appendChild(btnCreate);
form.appendChild(labelName);
form.appendChild(input);
form.appendChild(labeSelectParticipant);
form.appendChild(labelDayOfWeek);
form.appendChild(labelTime);
form.appendChild(btnBlock);

createWrapper.appendChild(form);


