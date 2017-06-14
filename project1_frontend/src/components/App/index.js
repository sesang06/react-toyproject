import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {connect} from 'react-redux';

import {postLoginRequest, Logout} from '../../actions';

import logo from './logo.svg';
import './index.css';
import Login from '../Login';
import Register from '../Register';
import ChatBox from '../ChatBox';
import ArticleList from '../ArticleList';
import GroupList from '../GroupList';
import Header from '../Header';
import Image from '../Image';
import Profile from '../Profile';
import FollowList from '../FollowList';
import WallList from '../WallList';
import DietGraph from '../DietGraph'

import sound from '../../music/Beenzino-Break.mp3';

class App extends Component {
  componentDidMount(){
    function getCookie(cname){
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie)
      var ca = decodedCookie.split(';');
      for (var i=0; i< ca.length; i++){
        var c= ca[i];
        while (c.charAt(0)==' '){
          c= c.substring(1);
          }
          if (c.indexOf(name)==0){
            return JSON.parse(atob(c.substring(name.length, c.length)));
          }
      }
      return "";
    }
    var uname= getCookie("uname");
    var upwd= getCookie("upwd");
    if (uname!== "" && upwd!== ""){

       this.props.onLogin(uname, upwd)
    }

  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <audio controls className="App-music">
            <source src={sound} type="audio/mpeg" />
          </audio>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Project 2 - Team 8</h2>          
        </div>
        <Router>
        <div>
          <Header/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/timeline" component={ArticleList}/>
          <Route path="/chat" component={ChatBox}/>
          <Route path="/group" component={GroupList}/>
          <Route path="/image" component={Image}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/follow" component={FollowList}/>
          <Route path="/wall" component={WallList}/>
          <Route path="/dietgraph/:username" component={DietGraph}/>

        </div>
        </Router>
      </div>
    );
  }
}
// <Route path="/chat" component={ChatBox}/>

let mapDispatchToProps=(dispatch)=>{
  return {
    onLogin:(uname, upwd)=>dispatch(postLoginRequest(uname, upwd)),
    onLogout:()=>dispatch(Logout())
  };
}

export default connect(undefined, mapDispatchToProps)(App);
