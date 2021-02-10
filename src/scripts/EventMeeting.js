import { wantDeleteRetrospectiveModal } from './utils/wantDeleteRetrospectiveModal';

class EventMeeting {
    constructor(nameEvent, day, time, ...participants) {
      this.nameEvent = nameEvent;
      this.participants =  participants;
      this.day = day;
      this.time = time;
    }

    injectInToTable() {
      let eventBlock = document.createElement('div');
      eventBlock.style = `display: flex;
      justify-content: space-between; 
      align-items: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 1px;
      left: 1px;
      padding-left: 8%;
      padding-right: 8%;
      `; 
      const closeBlock = document.createElement('div');
      closeBlock.style = 'cursor: pointer;'       
      const titleBlock = document.createElement('div');             
      titleBlock.innerText = `${this.nameEvent}`;
      closeBlock.innerText = 'x';       
      eventBlock.style.backgroundColor = '#9dedb2';       
      eventBlock.appendChild(titleBlock);
      eventBlock.appendChild(closeBlock);       
      const sliceTimeSelector = String(this.time).slice(0,2);
      const sliceDaySelector = String(this.day).slice(0,3).toLocaleLowerCase();       
      const eventTableCell = document.querySelector(`.${sliceDaySelector}${sliceTimeSelector}`);
      eventTableCell.append(eventBlock); 
      closeBlock.addEventListener('click', function() {
        wantDeleteRetrospectiveModal(eventTableCell, eventBlock, this.day, this.time);
      });       
    }     
}

export default EventMeeting;
