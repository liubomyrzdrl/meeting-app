import Participant from './Participant';

export const participants = [];
const Maria = new Participant('Maria');
const Bob = new Participant('Bob');
const Aleks = new Participant('Aleks');

participants.push(Maria);
participants.push(Bob);
participants.push(Aleks);

export const useParticipants = () => participants.map((item) => item.name);