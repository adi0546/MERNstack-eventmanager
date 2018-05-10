import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions, { createEvent, displayEvents } from '../actions/actions';
import { Grid, Col, Row, Button, Form, } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
// import eventslist from './eventslist';
class EventsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            _id: '',
            title: '',
            desc: '',
            date: '',
            time: '',
            title: '',
            people: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({
            open: false,
            _id: '',
            title: '',
            desc: '',
            date: '',
            time: '',
            title: '',
            people: ''
        });
    };
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const event = {
            title: this.state.title,
            desc: this.state.desc,
            date: this.state.date,
            time: this.state.time,
            people: this.state.people
        };
        this.setState({
            open: false,
            _id: '',
            title: '',
            desc: '',
            date: '',
            time: '',
            title: '',
            people: ''
        });

        // console.log('ADD UER:' + JSON.stringify(event))
        this.props.createEvent(event);
        this.props.displayEvents();
    }

    render() {
        // console.log('EREFEFGFD')
        const { open } = this.state;
        return (
            <div style={{ textAlign: 'center', margin: '70px' }}>
                <Modal open={open} onClose={this.onCloseModal} center>

                    <Form style={{ padding: '20px 100px 20px 100px', border: '2px solid blue' }} onSubmit={this.onSubmit}>
                        <div>
                            <label>Event Title:</label><br />
                            <input required={true} style={{ textAlign: 'center' }} class={"form-control"} type="text" name="title" onChange={this.onChange} value={this.state.title} />
                        </div>
                        <br />
                        <div>
                            <label>Event Description:</label><br />
                            <input required={true} style={{ textAlign: 'center' }} class={"form-control"} type="text" name="desc" onChange={this.onChange} value={this.state.desc} />
                        </div>
                        <br />
                        <div>
                            <label>Event Date</label><br />
                            <input required={true} style={{ textAlign: 'center' }} class={"form-control"} type="date" name="date" onChange={this.onChange} value={this.state.date} />
                        </div>
                        <br />
                        <div>
                            <label>Event Time(24 hour format)</label><br />
                            <input required={true} style={{ textAlign: 'center' }} class={"form-control"} type="time" name="time" min="08:40" max="23:59" onChange={this.onChange} value={this.state.time}/>
                        </div>
                        <br />
                        <div>
                            <label>Number of people attending Event:</label><br />
                            <input required={true} style={{ textAlign: 'center' }} class={"form-control"} type="number" min="1" max="50" name="people" onChange={this.onChange} value={this.state.people} />
                        </div>
                        <br />
                        <Button bsStyle={"primary"} type="submit">Submit</Button>
                        <br />
                    </Form>
                </Modal>
                <Button bsStyle={'primary'} onClick={this.onOpenModal}>Add event to list</Button>





            </div>
        );
    }
}
// EventsForm.propTypes = {
//     createEvent: PropTypes.func.isRequired
//   };
const stateToProps = (state) => {
    return {
        event: state.event
    }
}

const dispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(actions.createEvent(event)),
        displayEvents: () => dispatch(actions.displayEvents()),
    }
}
export default connect(stateToProps, dispatchToProps)(EventsForm);