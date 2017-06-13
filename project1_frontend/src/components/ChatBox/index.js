import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import UserList from '../UserList';
import { connect } from 'react-redux';

import defaultprofile from '../../img/defaultprofile.png'
import icons from "react-morph-material-icons/build/shapes";
import MorphIcon from "react-morph-material-icons";
import ChatBubble from 'react-chat-bubble';

import { PostChatRequest, GetChatRequest } from '../../actions';

var newchat = "";
var chatlog = [];

class ChatBox extends Component {
  constructor() {
    super();
    this.onText = this.onText.bind(this)
    this.onChat = this.onChat.bind(this)
    this.getChatlog = this.getChatlog.bind(this)
  }

  getChatlog() {
    if (this.props.loginStatus == 1)
      this.props.getChat(this.props.ubase64)
  }

  updateChatlog() {
    if (this.props.loginStatus == 1) {
      this.getChatlog();
      chatlog = this.props.chatlog
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateChatlog(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  onText(e) {
    newchat = e.target.value
  }

  onChat() {
    if (this.props.valid)
      this.props.postChat(this.props.uname, this.props.ubase64, this.props.receiver, newchat)
  }

  render() {
    var chatlist = []
    var sender = this.props.uname
    var receiver = (this.props.valid) ? this.props.receiver : ""
    var len = chatlog.length

    if (this.props.valid) {
      for (var i = 0; i < len; i++) {
        if ((chatlog[i].sender === sender && chatlog[i].receiver === receiver) ||
            (chatlog[i].sender === receiver && chatlog[i].receiver === sender)) {
          chatlist.push(chatlog[i])
        }
      }
    }

    if (this.props.loginStatus === 1) {
      let messages = []
      return (
        <div>
          <UserList/>
          {Array.apply(null, Array(chatlist.length)).map(function(item, i){
            var type = (chatlist[i].sender == this.props.uname) ? 0 : 1;
            var image = defaultprofile
            for (var index in this.props.avatar) {
              if (this.props.avatar[index].username === chatlist[i].sender)
                image = (this.props.avatar[index].avatar === null) ? defaultprofile : this.props.avatar[index].avatar
            }
            var message = { "type": type, "text": chatlist[i].chat, "image": image }
            messages.push(message)
          }, this)}
          <div className="chatBox">
          <ChatBubble messages={messages} />
          </div>
          <textarea cols="25" rows="2" style={{resize: "none"}} id="chat_box" onChange={this.onText} placeholder="Send a message to your friend!" />
          <button id="chat_send" onClick={this.onChat}>
            <MorphIcon shapes={icons.communication.chat} size="30" />
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p> 로그인이 필요합니다. </p>
        </div>
      );
    }
  }
}

let mapStateToProps=(state)=>{
  return {
    avatar: state.userlist_reducer.avatar,
    chatlog: state.chat_reducer.chatlog,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    valid: state.chat_reducer.valid, // receiver is valid - True, o.w. - False
    receiver: state.chat_reducer.receiver,
    loginStatus: state.login_reducer.loginStatus
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    postChat: (sender, ubase64, receiver, chat)=>dispatch(PostChatRequest(sender, ubase64, receiver, chat)),
    getChat: (ubase64)=>dispatch(GetChatRequest(ubase64))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
