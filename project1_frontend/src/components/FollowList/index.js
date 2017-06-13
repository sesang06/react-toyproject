import React, { Component } from 'react';
import './index.css';
import Follow from '../Follow';
import { connect } from 'react-redux';

import { SetFollowArticleRequest, GetUserRequest, GetFollowRequest, SetFollowRequest } from '../../actions';

class FollowList extends Component {
  constructor() {
    super();
    this.filterStr = ""
    this.onChange = this.onChange.bind(this)
    this.getUser = this.getUser.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(e) {
    this.filterStr = e.target.value
  }

  getUser() {
    this.props.getUser(this.props.uname, this.props.ubase64)
  }

  onClick(e) {
    this.props.getFollow(this.props.ubase64)

    var id = e.target.id.split('_')[1]
    var follow_id = e.target.id
    var content_id = 'follow_content_' + id
    var name = e.target.value

    var tablinks = document.getElementsByClassName("tablinks")
    for (var i = 0; i < tablinks.length; i++)
      tablinks[i].className = tablinks[i].className.replace(" active", "");

    document.getElementById(follow_id).style.display = "block";
    e.target.className += " active";

    var tabcontent = document.getElementsByClassName("tabcontent")
    for (var i = 0; i < tabcontent.length; i++)
      tabcontent[i].style.display = "none"
    document.getElementById(content_id).style.display = "block"
    
    this.props.setFollow([])
    this.props.setFollowArticle([])
  }
    
  render() {
    if (this.props.loginStatus == 1) {
      let id = 0
      let len = this.props.usernames.filter(e => e.includes(this.filterStr)).length
      return (
        <div>
        <div className="tab">
          <textarea cols="20" rows="2" style={{resize: "none"}} id='search_user_field' onChange={this.onChange} placeholder="Find User" />
          <button id='search_user' onClick={this.getUser}>Search</button>
          {Array.apply(null, Array(len)).map(function(item, i){
            return (
              <button value={this.props.usernames.filter(e => e.includes(this.filterStr))[i]} id={'follow_'+i} className="tablinks" onClick={this.onClick}>{this.props.usernames.filter(e => e.includes(this.filterStr))[i]}</button>
            );
          }, this)}
        </div>
        <div>
          {Array.apply(null, Array(len)).map(function(item, i){
            return (
              <Follow name={this.props.usernames.filter(e => e.includes(this.filterStr))[i]} id={'follow_content_'+i} follow_list={this.props.follow_list}/>
            );
          }, this)}
        </div>
        </div>
      )
    } else {
      return (
        <div>
          <p>로그인이 필요합니다.</p>
        </div>
      )
    }
  }
}

let mapStateToProps = (state) => {
  return {
    follow_list: state.follow_reducer.follow_list,
    usernames: state.userlist_reducer.usernames,
    loginStatus: state.login_reducer.loginStatus,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    setFollowArticle: (follow_article_list)=>dispatch(SetFollowArticleRequest(follow_article_list)),
    setFollow: (follow_list)=>dispatch(SetFollowRequest(follow_list)),
    getFollow: (ubase64)=>dispatch(GetFollowRequest(ubase64)),
    getUser: (uname, ubase64)=>dispatch(GetUserRequest(uname, ubase64))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowList);
