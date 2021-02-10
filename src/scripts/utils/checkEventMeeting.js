export function checkEventMeeting (storage, day, time ) {    
    let result;
    storage.forEach(item => {
        if(item.nameOfDay === day && item.nameOfTime === time) {
            console.log('TestcheckEventMeeting', item.nameOfDay, day,item.nameOfTime, time);
            result = true;
        } else {
          result = false;
        }  
    })
    return result;
}