

const initialState = {
    event: []
}

export default function (state = initialState, action) {
    // console.log('actio===============>', action);
    let newState = Object.assign([], state)
    
    switch (action.type) {
        case "DISPLAY_EVENTS":
            return{...newState, event:[...action.payload]}
            // console.log('returmnnnnnnnnnnnnnn',newState);
            break;
        
        
        
        case "CREATE_EVENT":

            //  console.log('<<<<<<<>>>>>>>>>><<<<'+JSON.stringify(action.payload))
            return {
                event: [...newState.event, ...action.payload]
            };
            // console.log('asdffffffffff', newState)
            break;

        case "DELETE_EVENT":
            // let deleteIndex=newState.event.find(function(event){
            //     return event.id===action.payload;
            // })
            let currentEventDelete = [...newState.event];
            // console.log(currentEventDelete);

            const indexDelete = currentEventDelete.findIndex(
                function (event) {
                    return event._id === action.payload._id;
                }
            )
        
            return {
                event: [...currentEventDelete.slice(0, indexDelete),
                ...currentEventDelete.slice(indexDelete + 1)]
            }
            break;

        case "UPDATE_EVENT":
            let currentEventUpdate = [...newState.event];
            // console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb',currentEventUpdate);

            const indexUpdate = currentEventUpdate.findIndex(
                function (event) {
                    return event._id === action.payload._id;
                }
            )
            // console.log('indexxxxxxxxxxxxxx',indexUpdate)
            const newEventToUpdate = {
                ...action.payload
            }
            // console.log('NEW EVENT TO UPDATE IS',newEventToUpdate );
            return {
                event: [...currentEventUpdate.slice(0, indexUpdate),newEventToUpdate,
                ...currentEventUpdate.slice(indexUpdate + 1)]
            }
            break;

        default:
            return state;
    }
}