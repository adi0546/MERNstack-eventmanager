import { CREATE_EVENT, DISPLAY_EVENTS, UPDATE_EVENT, DELETE_EVENT } from '../actions/actiontypes';
import axios from 'axios';
export default {

    displayEvents: () => {
        return function (dispatch) {
            axios.get("/events")
                .then(function (response) {
                    dispatch({ type: DISPLAY_EVENTS, payload: response.data })
                })
                .catch(function (err) {
                    dispatch({ type: "DISPLAY_EVENTS_REJECTED", payload: err })
                })

        }
    },
    deleteEvent: (event) => {
        return function (dispatch) {
            axios.delete("/events/" + event._id)
                .then(function (response) {
                    dispatch({ type: DELETE_EVENT, payload: event })
                })
                .catch(function (err) {
                    dispatch({
                        type: "DELETE_EVENT_REJECTED",
                        payload: err
                    })
                })
        }
    },
    createEvent: (event) => {
        // return{
        //     type: CREATE_EVENT,
        //     payload:event
        // }
        return function (dispatch) {

            axios.post("/events", event)
                .then(function (response) {
                    dispatch({
                        type: CREATE_EVENT, payload: event
                    })
                        // .catch(function (err) {
                        //     dispatch({
                        //         type: "CREATE_EVENT_REJECTED", payload: "There was an error."
                        //     })
                        // })
                })
        }
    },
    updateEvent: (event) => {
        // console.log("actoinnnnnnnnnnnnn",event);
        return function (dispatch) {
            axios.put("/events/" + event._id, event)
                .then(function (response) {
                    dispatch({ type: UPDATE_EVENT , payload : event})
                })
                .catch(function (err) {
                    dispatch({
                        type: "UPDATE_EVENT_REJECTED",payload:"error"
                    })
                })
        }
    }
}