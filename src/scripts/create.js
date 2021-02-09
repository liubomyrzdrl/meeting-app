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

const form = document.createElement('form');
form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    nameOfEvent = form.elements['nameOfEvent'].value;
    nameOfParticipant = form.elements['nameOfParticipant'].value;
    nameOfDay = form.elements['nameOfDay'].value;
    nameOfTime = form.elements['nameOfTime'].value; 
    let metings = meetingStorage.getItem('metings');
    if(nameOfEvent === "") { 
        labelName.appendChild(error);
        return
    }
    if(!metings) {
        meetingStorage.setItem('metings', JSON.stringify([{
           nameOfEvent,
           nameOfDay,
           nameOfTime,
           nameOfParticipant, 
        }]));
    } else {
        let parseJsonStorage = JSON.parse(metings);
        result = checkEventMeeting(parseJsonStorage, nameOfDay, nameOfTime);
        if(!result) {        
            const errorMessage = document.createElement('div');
            const cancelError = document.createElement('span');
            cancelError.innerText = "X";
            cancelError.style = `
                color: red; 
                cursor: pointer;
                position: absolute;
                top: -20%;
                left: 391px;
            `;

            errorMessage.innerText = "Failed to create an event. This slot is alredy booked";
            errorMessage.style = `
                color: red;
                cursor: pointer;
                position: absolute;
                top: -20%;
            `;
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
labelName.setAttribute("class", "form-label");
labelName.style = `margin-right: 2.5%; margin-bottom: 2%; font-size: 1.6rem;`;
const input = document.createElement('input');
input.style = `display: inline-block; width: 15%;`
input.setAttribute("type", "text");
input.setAttribute("class", "form-control");
input.setAttribute("type", "text");
input.setAttribute("name", "nameOfEvent");
const error = document.createElement('div');
error.innerText = "Name of event is required";
error.style = "color: red;"
error.setAttribute("class", "error-input");
labelName.append(input);

const selectParticipants = document.createElement('select');
selectParticipants.setAttribute("name", "nameOfParticipant");
selectParticipants.style = `font-size: 1rem; margin-left: 4%;`;
const labeSelectParticipant = document.createElement('label');
labeSelectParticipant.style = `display: block; font-size: 1.6rem; margin-bottom: 2%;`; 
labeSelectParticipant.innerText = "Participants:";
labeSelectParticipant.appendChild(selectParticipants);
const options =  [];

const allParticipant = useParticipants().toString();
let optionAll = document.createElement('option');
optionAll.innerHTML = allParticipant;
optionAll.setAttribute('value', 'all' );
selectParticipants.append(optionAll);
participants.map(item => {
    let option = document.createElement('option');
    option.setAttribute('value', item.name);
    option.innerText = item.name;
    options.push(option);
});
options.forEach(item => {
    selectParticipants.append(item);
});    


const labelDayOfWeek = document.createElement('label');
labelDayOfWeek.innerText = "Day:";
labelDayOfWeek.style = `display: block; font-size: 1.6rem; margin-bottom: 2%;`; 
const selectDay = document.createElement('select');
selectDay.style = `font-size: 1rem; margin-left: 8.5%;`;
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
labelTime.innerText = "Time:";
labelTime.style = `display: block; font-size: 1.6rem; margin-bottom: 2%;`; 
const selectTime = document.createElement('select');
selectTime.setAttribute("name", "nameOfTime");
selectTime.style = `font-size: 1rem; margin-left: 7.5%;`;
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

const btnBlock = document.createElement('div');
btnBlock.style = "margin-left: 20%; display: flex; justify-content: space-between; width: 10%;";
const btnCreate = document.createElement('button');
btnCreate.innerText ="Create";
btnCreate.setAttribute("class", "btn btn-success");
btnCreate.setAttribute("type", "submit");
const btnCancel = document.createElement('button');
btnCancel.setAttribute("class", "btn btn-warning");
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


