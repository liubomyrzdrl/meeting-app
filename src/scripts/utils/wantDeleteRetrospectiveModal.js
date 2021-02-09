export function wantDeleteRetrospectiveModal(eventTableCell, eventBlock, day, time) {
    let result;
    const eventTableCellClass = eventTableCell.className;
    const storage = window.localStorage.getItem("metings");
    const parseJsonStorage = JSON.parse(storage);
    const filteredMeetings = parseJsonStorage.filter(item => {
        let sliceTimeSelector = String(item.nameOfTime).slice(0, 2);
        let sliceDaySelector = String(item.nameOfDay).slice(0, 3).toLocaleLowerCase();
        return String(eventTableCellClass) !==  `${sliceDaySelector}${sliceTimeSelector}`

    });
   console.log('filteredMeetings', filteredMeetings );
   window.localStorage.setItem("metings", JSON.stringify(filteredMeetings));

    const modalWrapper = document.createElement('div');
    const modal = document.createElement('div');
    const btnBlock = document.createElement('div');
    btnBlock.style = `
        display: flex;
        justify-content: space-between;
        margin-right: 3%;  
        margin-left: 10%; 
        margin-bottom: 3%; 
        width: 80%;
    `
    const btnYes = document.createElement('button');
    btnYes.addEventListener('click', function() {
        console.log('eventTableCell',eventTableCell)
        eventTableCell.removeChild(eventBlock);
        wrapper.removeChild(modalWrapper);
        wrapper.removeChild(modal);
    });
    btnYes.innerText = "Yes";
    btnYes.style = `
        padding: 3% 16%;
        border-radius: 12px;
    `;
    const btnNo = document.createElement('button');
    btnNo.addEventListener('click', function() {
        wrapper.removeChild(modalWrapper);
        wrapper.removeChild(modal);
        result = false;
    });
    btnNo.innerText = "No";

    btnNo.style = `
        padding: 3% 16%;
        border-radius: 12px;
    `;
    btnBlock.appendChild(btnNo);
    btnBlock.appendChild(btnYes);
    modalWrapper.style = `
        position: absolute;
        background-color: #b5b5b5;
        opacity: 0.3;
        width: 100%;
        height: 100%; 
        bottom: 0;
        z-index: 1;
    `
    const text = document.createElement('div');
    text.style = `
        margin-top: 5%;
        margin-bottom: 13%; 
        margin-right: 3%;  
        margin-left: 3%; 
        font-size: 1.3rem;
        text-align: center;

    `;
    text.innerText = 'Are you sure you wand to delete "Retrospective event"?';
    modal.appendChild(text);
    modal.style = `
        margin: 0 auto;
        position: fixed;
        width: 465px;
        height: 233px;
        border: 1px solid;
        background-color: aliceblue;
        border-radius: 12px;
        z-index: 3;
        top: 18%;
        right: 37%;
    `;
    modal.appendChild(btnBlock);
  
  
    const wrapper = document.querySelector('.wrapper');
    wrapper.appendChild(modalWrapper);
    wrapper.appendChild(modal);
    
    return result;
}