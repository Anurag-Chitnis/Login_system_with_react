import React, { Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import swal from 'sweetalert';

var firebase = require('firebase');
var uuid = require('uuid');

class Login extends Component {

    login(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    const auth = firebase.auth();
    // const promise = auth.signInWithEmailAndPassword(email ,password);
    const promise = auth.signInWithEmailAndPassword(email ,password);
    promise.then(res=>{
      swal("success");
      this.setState({
        loggedIn:true,
      },()=>{
        this.props.phone(email.charAt(0).toUpperCase());
      })
    })

    promise.catch(res=>{
      swal("OOps","incorrect email or password","error");
    })
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        localStorage.setItem("id",user.uid);
      }else{
        localStorage.removeItem('id');
        console.log("no");
      }
    });
  }

  constructor(props){
    super(props);

    this.state = {
      loggedIn:false
    };
    this.login = this.login.bind(this);
  }
  render(){
    if(this.state.loggedIn){
      return <Redirect to="/" />
    }

    return(
      <div className="container">
        <form className="white">
          <h4 className="grey-text">Login</h4>
          <div className="input-field">
            <input type="email" ref='email' id="email"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="password" ref='password' id="password"/>
            <label htmlFor="password">password</label>
          </div>
          <button onClick={this.login} className="btn pink waves-effect waves-light">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
