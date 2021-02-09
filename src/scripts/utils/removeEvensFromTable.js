export function removeEventsFromTable (storage) {
    storage.forEach(item =>  {
        const sliceDaySelector = String(item.nameOfDay).slice(0,3).toLocaleLowerCase();
        const sliceTimeSelector = String(item.nameOfTime).slice(0,2);
        let eventTableCell = document.querySelector(`.${sliceDaySelector}${sliceTimeSelector}`);
        console.log('eventTableCell', eventTableCell.hasChildNodes());
        if(eventTableCell.hasChildNodes()) {
            console.log('eventTableCell', eventTableCell, eventTableCell.firstChild);
            eventTableCell.removeChild(eventTableCell.firstChild);
        }
    });
}