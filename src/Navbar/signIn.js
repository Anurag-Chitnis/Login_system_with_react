import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

var firebase = require('firebase');
var uuid = require('uuid');

class signIn extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid:uuid.v1(),
      firstName:'',
      lastName:'',
      email:'',
      password:''
    };
    this.signIn = this.signIn.bind(this);
  }


  signIn(e){
    var firstName = this.refs.firstName.value;
    var lastName = this.refs.lastName.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;



    this.setState({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    },()=>{
      this.props.phone(firstName.charAt(0) + lastName.charAt(0));
    })

    if(firstName===''){
      swal ( "Invalid" ,`Please Enter First Name`,  "error" );
      return;
    }else if(lastName ===''){
      swal ( "Invalid" ,`Please Enter Last Name`,  "error" );
      return;
    }else if(firstName==='' && lastName===''){
      swal ( "Invalid" ,`Please Enter First Name Last Name`,  "error" );
      return;
    }

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email , password);

    promise.then(res=>{
      firebase.database().ref('newUser/'+this.state.uid).set({
        userData:this.state
      })
      swal ( "Congratulations" ,`You Successfully Created Account Please Login Now`,  "success" )
    })

    promise
    .catch(res=>{
      var msg = res.message;
      swal ( "Oops" ,`${msg}`,  "error" );
    })

  }

  render(){
    return(
      <div className="container">
          <form className="white">
            <h4 className="grey-text">Sign Up</h4>
            <div className="row">
              <div className="input-field col s12 m6 l6">
                <input type="text" ref='firstName' id="firstName"/>
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s12 m6 l6">
                <input type="text" ref='lastName' id="lastName"/>
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="input-field col s12 l12">
                <input type="email" ref='email' id="email"/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12 l12">
                <input type="password" ref='password' id="password"/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button onClick={this.signIn} type='button' className="btn waves-effect waves-light pink">Sign Up</button>
          </form>
      </div>
    );
  }
}

export default signIn;
