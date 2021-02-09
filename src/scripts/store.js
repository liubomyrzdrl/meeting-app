import Participant  from './Participant';

export const store = [];
export const participants = [];
export const eventMeeting = [];



const Maria = new Participant('Maria');
const Bob = new Participant('Bob');
const Aleks = new Participant('Aleks');

participants.push(Maria);
participants.push(Bob);
participants.push(Aleks);

export const useParticipants = () => {
    return participants.map(item => item.name);
}