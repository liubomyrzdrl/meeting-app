import EventMeeting from '../EventMeeting';

export function initMeetings (store) {      
    store.forEach(item => {
       new EventMeeting(item.nameOfEvent, item.nameOfDay, item.nameOfTime, item.nameOfParticipant).injectInToTable();
    });  
}