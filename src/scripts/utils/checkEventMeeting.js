export function checkEventMeeting (storage, day, time ) {    
    let result;
    storage.forEach(item => {
        if(item.nameOfDay === day && item.nameOfTime === time) {
            result = false
        } else {
          result = true
        }  
    })
    return result

}