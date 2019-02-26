import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import Login from './Navbar/login';
import SignIn from './Navbar/signIn';
import {BrowserRouter as Router , Link ,Route} from 'react-router-dom';

var firebase = require('firebase');
var uuid = require('uuid');
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBes5neNbt02Sj4w1539xucII75KuDbdj0",
    authDomain: "login-system-654e9.firebaseapp.com",
    databaseURL: "https://login-system-654e9.firebaseio.com",
    projectId: "login-system-654e9",
    storageBucket: "login-system-654e9.appspot.com",
    messagingSenderId: "87838410656"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      initial:'RR'
    };
  }
  phone=(abc)=>{
    this.setState({
      initial:abc,
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar xyz={this.state.initial}/>
          <Route path="/" exact strict component={Dashboard}></Route>
          <Route path="/login" exact strict   render={()=>(<Login phone={this.phone}/>)}></Route>
          <Route path="/signIn" exact strict  render={()=>(<SignIn phone={this.phone}/>)}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
