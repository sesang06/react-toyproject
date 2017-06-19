import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Editor from '../Editor'

import { GetFollowArticleRequest, PostFollowRequest, DeleteFollowRequest } from '../../actions';

class Follow extends Component {
  constructor() {
    super();
    //this.onGet = this.onGet.bind(this)
    this.follow = false
    this.follow_id = 0
    this.follow_name = ""
    this.check = this.check.bind(this)
    this.onPost = this.onPost.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  //onGet() {
  //  this.props.getFollowArticle(this.props.ubase64, this.follow_id)
  //}
  //handleHtmlChange(html){

  //}
  check() {
    this.follow_name = ""
    for (var i = 0; i < this.props.follow_list.length; i++) {
      this.follow_name += this.props.follow_list[i].follow
      if (i != this.props.follow_list.length-1)
        this.follow_name += ', '
    }

    for (var i = 0; i < this.props.follow_list.length; i++) {
      if (this.props.follow_list[i].follow === this.props.name) {
        this.follow = true
        this.follow_id = this.props.follow_list[i].id
      }
    }
  }

  onPost() {
    this.props.postFollow(this.props.ubase64, this.props.name)
  }

  onDelete() {
    this.props.deleteFollow(this.props.ubase64, this.follow_id)
    this.follow = false
    this.follow_id = 0
  }

  render() {
    this.check()
    let len = this.props.follow_article_list.length
    return (
      <div id={this.props.id} className="tabcontent">
        <h5><u>Follow List : {this.follow_name}</u></h5>
        <h4>User Name : {this.props.name}</h4>
        <button id='follow_button' onClick={this.follow ? this.onDelete : this.onPost}>{this.follow ? '팔로우 취소' : '팔로우'}</button>
        <p>
          <Link to={'/wall/'+this.props.name}>담벼락 보러가기</Link>
        </p>
      </div>
    )
  }
}

let mapStateToProps=(state)=>{
  return {
    follow_article_list: state.follow_reducer.follow_article_list,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    getFollowArticle: (ubase64, id)=>dispatch(GetFollowArticleRequest(ubase64, id)),
    postFollow: (ubase64, follow)=>dispatch(PostFollowRequest(ubase64, follow)),
    deleteFollow: (ubase64, id)=>dispatch(DeleteFollowRequest(ubase64, id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow);
