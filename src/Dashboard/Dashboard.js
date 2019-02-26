import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      todoList:[
        {id:1,todo:"go to gym"},
        {id:2,todo:"go to shopping"},
      ],
      uid:uuid.v1()
    };
  }

  todoCreate = (e) => {
    e.preventDefault();
    var newTodo = this.refs.text.value;
    var newTodoList = this.state.todoList;
    newTodoList.push({id:newTodoList.length + 1 , todo:newTodo});
    this.setState({todoList:newTodoList});
    firebase.database().ref('newTodo/'+this.state.uid).set({
      todo:newTodo,
    })
  }

  componentWillMount(){
    var ref = firebase.database().ref('newTodo');
    ref.on('value',(data)=>{
      var newList = this.state.todoList;
      var firebaseObject = data.val();
      var array = Object.values(firebaseObject);
      array.map(item=>{
        newList.push(item);
      })
      this.setState({todoList:newList})
    })
  }

  render(){
    return(
      <div className="container">
        <form className="white">
          <h5 className="grey-text">Todo List</h5>
          <div className="input-field">
            <input type="text" ref="text" id="text"/>
            <label htmlFor="text">Enter Your Todo</label>
          </div>
          <button onClick={this.todoCreate} className="btn pink">Add Todo</button>
        </form>
        {this.state.todoList.map((item,i)=>{
          return <div className="card">
            <div className="card-content">
              <h6 key={item.id}>{item.todo}</h6>
            </div>
          </div>
        })}
      </div>
    );
  }
}

export default Dashboard;
