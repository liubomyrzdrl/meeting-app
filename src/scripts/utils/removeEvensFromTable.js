/* eslint-disable no-undef */
function removeEventsFromTable(storage) {
  storage.forEach((item) => {
    const sliceDaySelector = String(item.nameOfDay).slice(0, 3).toLocaleLowerCase();
    const sliceTimeSelector = String(item.nameOfTime).slice(0, 2);
    const eventTableCell = document.querySelector(`.${sliceDaySelector}${sliceTimeSelector}`);
    if (eventTableCell.hasChildNodes()) {
      eventTableCell.removeChild(eventTableCell.firstChild);
    }
  });
}

export default removeEventsFromTable;