import React, { Component } from 'react';
//import './index.css';
import { connect } from 'react-redux';

import { GetUserRequest, SetUserList, SetSender, SetReceiver } from '../../actions';

var usernames = []

class UserList extends Component {
  constructor() {
    super();
    this.setReceiver = this.setReceiver.bind(this)
    this.getUserList = this.getUserList.bind(this)
  }

  getUserList() {
    if (this.props.loginStatus == 1) {
      this.props.getUser(this.props.uname, this.props.ubase64)
    }
  }

  setReceiver(e) {
    var index = e.nativeEvent.target.selectedIndex;
    var selected = e.nativeEvent.target[index].text;
    this.props.setSender(this.props.uname, this.props.ubase64)
    this.props.setReceiver(selected)
  }
/*
  updateUsernames() {
    this.getUserList();
    usernames = this.props.usernames
  }    

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateUsernames(), 1000
    );
  }

  componentWillUmount() {
    clearInterval(this.timerID)
  }
*/
  render() {
    if (this.props.loginStatus == 1) {
      usernames = this.props.usernames
      let len = usernames.length
      return (
        <div>
        <button id="chat_get_userlist" onClick={this.getUserList}>Get</button>
        <select className="select" id="chat_userlist" onChange={this.setReceiver}>
          <option value="chat_user_0" disabled="true">receiver</option>
          {Array.apply(null, Array(len)).map(function(item, i){
            return (
              <option id={"chat_user_"+(i+1)} key={i+1} value={i+1}>{usernames[i]}</option>
            );
          }, this)}
        </select>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

let mapStateToProps=(state)=>{
  return {
    usernames: state.userlist_reducer.usernames,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    loginStatus: state.login_reducer.loginStatus
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    setReceiver: (receiver)=>dispatch(SetReceiver(receiver)),
    setSender: (uname, ubase64)=>dispatch(SetSender(uname, ubase64)),
    getUser: (uname, upwd)=>dispatch(GetUserRequest(uname, upwd))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
