import React, { Component } from 'react';
import {BrowserRouter as Router , Route , Link} from 'react-router-dom';
import login from './login';
import signIn from './signIn';
import swal from 'sweetalert';
var firebase = require('firebase');
var uuid = require('uuid');
var navLink;

class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn:false,
    };
    this.logout = this.logout.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  logout(){
    firebase.auth().signOut();
    swal("Thanks for logging In","you are Successfully Logged Out","success");
    localStorage.clear();
    this.setState({loggedIn:false});
  }

  loggedIn(){
    this.setState({loggedIn:true})
  }


  render(){
    if(this.state.loggedIn===true){
      navLink =  <li><a onClick={this.logout} className="grey-text">Logout</a></li>
    }else if(this.state.loggedIn===false){
      navLink = <li><Link to="/login" onClick={this.loggedIn} className="grey-text">Login</Link></li>
    }
    return(
      <div className="navbar-fixed">
        <nav className='white'>
          <div className="container">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo grey-text">Logo</Link>
              <ul className="right hide-on-med-and-down">
                <li><Link to="/" className="grey-text">Home</Link></li>
                {navLink}
                <li><Link to="/signIn" className="grey-text">SignIn</Link></li>
                <li><button className="btn-floating white pink-text">{this.props.xyz}</button></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
