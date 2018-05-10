import React, { Component } from 'react';
import EventsList from './components/eventslist';
import EventsForm from './components/eventsform';
import {Provider} from 'react-redux';
import store from './store';


// import mongoose, { connect, Schema, model } from "mongoose";
// var mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;


class App extends Component {
  render() {
    const divStyle = {
      margin: 'auto',
      border: '2px black',
      padding:'30px'
    };
    return (
      <Provider store={store}>
      <div style={{textAlign:'center'}}>
       <EventsForm/>
       <hr/>
       <EventsList />
      </div>
      </Provider>
    ); 
  //   store.dispatch(createEvent(
  //     [{
  //         id:1,
  //         title:'title of event 1',
  //         desc:'about event 1'
  //     },
  // {
  //     id: 2,
  //     title:'title of 2nd event',
  //     desc:'about event 2'
  // }]
  // ));
  }
}

export default App;
