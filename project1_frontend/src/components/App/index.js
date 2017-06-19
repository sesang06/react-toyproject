import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import RabbiTur_Rabbit_logo from '../../img/RabbiTur_Rabbit_logo.png'
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
import DietGraphMain from '../DietGraphMain'
import WallMain from '../WallMain';
import MapMain from '../MapMain';
import Music from '../Music';
import Map from '../Map'
import DietGraphPost from '../DietGraphPost';
import Main from '../Main';
class App extends Component {
  constructor() {
    super();
    this.url = 'http://13.124.72.170:3333';
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    //document.getElementById("main").style.marginLeft = "0px";
    document.getElementById("open_btn").style.display = "none";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("open_btn").style.display = "block";
  }

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
    <div>
      <div id="mySidenav" className="sidenav">
        <a id="close_btn" href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
        <h3 className="info">{(this.props.loginStatus === 1) ? 'Music' : 'Welcome!'}</h3>
        <Music />
        <h3 className="info">{(this.props.loginStatus === 1) ? 'Chat' : ''}</h3>
        <ChatBox />
      </div>
      <div>
        <span id="open_btn" className="open_btn" onClick={this.openNav}>&#9776;</span>
      </div>
      <div id="main" className="App">
        <div className="App-header">
          <a href={this.url}>
            <img src={RabbiTur_Rabbit_logo}  className="App-logo" />
          </a>
        </div>
        <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Main}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/timeline" component={ArticleList}/>
          <Route path="/group" component={GroupList}/>
          <Route path="/image" component={Image}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/follow" component={FollowList}/>
          <Route path="/wall/:username" component={WallList}/>
          <Route path="/dietgraph/:username" component={DietGraph}/>
          <Route exact path="/dietgraph/" component={DietGraphMain}/>
          <Route exact path="/wall/" component={WallMain}/>
          <Route exact path="/map/" component={MapMain}/>
          <Route exact path="/map/:username" component={Map}/>
          <Route exact path="/postdietgraph" component={DietGraphPost}/>
         </div>
        </Router>
      </div>
    </div>
    );
  }
}

let mapStateToProps=(state)=>{
  return {
    loginStatus: state.login_reducer.loginStatus,
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    onLogin:(uname, upwd)=>dispatch(postLoginRequest(uname, upwd)),
    onLogout:()=>dispatch(Logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
