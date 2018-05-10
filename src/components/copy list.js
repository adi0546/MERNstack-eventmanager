import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions, { deleteEvent , updateEvent } from '../actions/actions'
import index from '../reducers';
import { Grid, Col, Row, Button, Form,Table } from 'react-bootstrap';
import Modal from 'react-responsive-modal'
// import {BootstrapTable} from 'reactjs-bootstrap-table'
class EventsList extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.delEvent = this.delEvent.bind(this);
        this.state={
            open1: false,
            _id:undefined,
            title:undefined,
            desc:undefined,
            date:undefined,
            time:undefined,
            people:undefined
        }
    }
    onChange(e,name) {
        // console.log('2222222222222222222222222222222',e)
        this.setState({
            newEvent: { 
                ...this.state.newEvent,
                [name]:e
        }});
    }
    onSubmit(e){
        this.setState(() => ({
            open1: false,
         }))
        // console.log('ADD UER:' + JSON.stringify(event))
        // console.log('newEvent=============>',this.state.newEvent);
        this.props.update(this.state.newEvent);
        // this.props.displayEvents();
    }
    
    componentDidMount() {
        this.props.displayEvents();
      }

    delEvent(e) {
        //console.log('?>>>>>>>>>>>>>>>>>.',id)
        // console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDD',e);
        this.props.deleteEvent(e);
    }
    // update(e) {
    
    //     return(<div>
    //         {alert("Hello")}
    //     </div>)
    //    // this.props.updateEvent(e);
    // }
    update = (event) => {

        // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',event);
        // newEvent._id = e._id,
        this.setState(() => ({
           open1: true,
           newEvent: event
        }))
        };
     
      onCloseModal = () => {
        this.setState({ open1: false });
      };
    
    render() {
        const {open1} =this.state;
        const { newEvent} = this.state;
        // console.log('newEvent',newEvent)
        const { eventsList } = this.props;
        // console.log('dffffffffffffffffff', eventsList);
        // const eventItems = eventsList.map(event => (
        //     <div key={event.id}>

        // </div>
        // ));
        return (
            <Grid>
                <h2>Events</h2>
                <Table>
               <tbody> <tr>
                    <th style={{textAlign:"center"}}>Title</th>
                    <th style={{textAlign:"center"}}>Description</th>
                    <th style={{textAlign:"center"}}>Date</th>
                    <th style={{textAlign:"center"}}>Time</th>
                    <th style={{textAlign:"center"}}>People</th>
                    <th  style={{textAlign:"center"}}>Delete</th>
                    <th  style={{textAlign:"center"}}>Update</th>
                    </tr>
                {eventsList.map((event => 
                    <tr key= {event._id}>
                        <td >{event.title}</td>
                        <td >{event.desc} </td>
                        <td >{event.date} </td>
                        <td >{event.time} </td>
                        <td >{event.people}</td>
                        <td  style={{textAlign:"center"}}> {<Button bsStyle='primary' onClick={this.delEvent.bind(null, event)} value="delete">Delete</Button>}</td>
                        <td style={{textAlign:"center"}}> {<Button bsStyle='primary' onClick={this.update.bind(null,event)} value="update">Update</Button>}</td>
                    </tr>
               ))
                }</tbody>
                 </Table>
                {open1 ?
                 <Modal open={open1} onClose={this.onCloseModal} center>
                 <Form  style={{ padding:'20px 100px 20px 100px', border:'2px solid blue'}}class={"navbar-form navbar left"} onSubmit={this.onSubmit}>
                    <div>
                        <label>Event Title:</label><br />
                        <input required={true} style={{textAlign:'center'}} class= {"form-control"}type="text" name="title" 
                        onChange={( {target:{value}}) => {
                            // console.log('===>', value)
                            this.onChange(value, 'title')
                        }
                        } 
                        value={ newEvent.title}/>
                    </div>
                    <br />
                    <div>
                        <label>Event Description:</label><br />
                        <input required={true} style={{textAlign:'center'}} class= {"form-control"} type="text" name="desc" 
                        onChange={( {target:{value}}) => {
                            // console.log('===>', value)
                            this.onChange(value, 'desc')
                        }
                        } 
                        value={ newEvent.desc} />
                    </div>
                    <br />
                    <div>
                        <label>Event Date</label><br />
                        <input required={true} style={{textAlign:'center'}} class= {"form-control"} type="date" name="date" 
                        onChange={( {target:{value}}) => {
                            // console.log('===>', value)
                            this.onChange(value, 'date')
                        }
                        } 
                        value={newEvent.date} />
                    </div>
                    <br />
                    <div>
                        <label>Event Time</label><br />
                        <input required={true} style={{textAlign:'center'}} class= {"form-control"} type="time" name="time" min="08:40" max="23:00" 
                        onChange={( {target:{value}}) => {
                            // console.log('===>', value)
                            this.onChange(value, 'time')
                        }
                        } 
                        value={newEvent.time} />
                    </div>
                    <br />
                    <div>
                        <label>Number of people attending Event:</label><br />
                        <input required={true} style={{textAlign:'center'}} class= {"form-control"} type="number" min="1" name="people" 
                        onChange={( {target:{value}}) => {
                            // console.log('===>', value)
                            this.onChange(value, 'people')
                        }
                        } 
                        value={newEvent.people} />
                    </div>
                    <br />
                    <Button bsStyle={"primary"} type="submit">Submit</Button>
                    <br />
                </Form>
             </Modal> : null
                }
               
                </Grid>
        );
        
    }
}

EventsList.propTypes = {
    eventsList: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    eventsList: state.events.event,
    // props: state    
});
const dispatchToProps = (dispatch) => {
    return {
        deleteEvent: (id) => dispatch(actions.deleteEvent(id)),
       displayEvents: () => dispatch(actions.displayEvents()),
       update: (newEvent)  => dispatch(actions.updateEvent(newEvent)) ,  }
}

export default connect(mapStateToProps, dispatchToProps)(EventsList);
