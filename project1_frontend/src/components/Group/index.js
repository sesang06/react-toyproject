import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';

import GroupNotice from '../GroupNotice';
import GroupForum from '../GroupForum';

import { PostGroupNoticeRequest, PostGroupForumRequest, GetGroupNoticeRequest, GetGroupForumRequest, PostGroupMemberRequest, DeleteGroupMemberRequest } from '../../actions';

class Group extends Component {
  constructor() {
    super();
    this.notice = ""
    this.forum = ""
    this.join = false
    this.admin = false
    this.member_list = ""
    this.check = this.check.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onPost = this.onPost.bind(this)
    this.getNotice = this.getNotice.bind(this)
    this.getForum = this.getForum.bind(this)
    this.postNotice = this.postNotice.bind(this)
    this.postForum = this.postForum.bind(this)
  }

  postNotice() {
    this.props.postGroupNotice(this.props.ubase64, this.props.id.split('_')[0], this.notice.value)
  }

  postForum() {
    this.props.postGroupForum(this.props.ubase64, this.props.id.split('_')[0], this.forum.value)
  }

  check() {
    this.member_list = ""
    var member_list = this.props.member_list
    for (var i = 0; i < member_list.length; i++) {
      this.member_list += member_list[i]
      if (i != member_list.length-1)
        this.member_list += ', '
      if (member_list[i] === this.props.uname)
        this.join = true
    }
    if (this.props.uname == this.props.admin)
      this.admin = this.join
  }

  onDelete() {
    this.props.deleteGroupMember(this.props.ubase64, this.props.id.split('_')[0])
    this.join = false
  }

  onPost() {
    this.props.postGroupMember(this.props.ubase64, this.props.id.split('_')[0])
  }

  getNotice() {
    this.props.getGroupNotice(this.props.ubase64, this.props.id.split('_')[0])
  }

  getForum() {
    this.props.getGroupForum(this.props.ubase64, this.props.id.split('_')[0])
  }

  render() {
    this.check()
    let len = this.props.notice_list.length
    let len2 = this.props.forum_list.length
    return (
      <div id={this.props.id} className="tabcontent">
        <h4>관리자 : {this.props.admin} / 회원수 : {this.props.member} / 회원 : {this.member_list}</h4>
        <button id='join_leave' onClick={(this.join) ? this.onDelete : this.onPost}>{(this.join) ? 'LEAVE' : 'JOIN'}</button>
        <h3>NOTICE<button id='get_notice' disabled={!this.join} onClick={this.getNotice}>Get Notice</button></h3>
        {Array.apply(null, Array(len)).map(function(item, i){
          return ( 
            <GroupNotice created={this.props.notice_list[i].created} text={this.props.notice_list[i].text} />
          );
        }, this)}
        <textarea cols="20" rows="2" style={{resize: "none"}} id="notice_field" disabled={!this.admin} ref={ref=>this.notice=ref} placeholder="Notice" />
        <button id="post_notice" disabled={!this.admin} onClick={this.postNotice}>POST NOTICE</button>
        <h3>FORUM<button id='get_forum' disabled={!this.join} onClick={this.getForum}>Get Forum</button></h3>
        {Array.apply(null, Array(len2)).map(function(item, i){
          return (
            <GroupForum created={this.props.forum_list[i].created} author={this.props.forum_list[i].author} text={this.props.forum_list[i].text} />
          );
        }, this)}
        <textarea cols="20" rows="2" style={{resize: "none"}} id="forum_field" disabled={!this.join} ref={ref=>this.forum=ref} placeholder="Forum" />
        <button id="post_forum" disabled={!this.join} onClick={this.postForum}>POST FORUM</button>
      </div>
    );
  }
}

let mapStateToProps=(state)=>{
  return {
    notice_list: state.group_notice_reducer.notice_list,
    forum_list: state.group_forum_reducer.forum_list,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    postGroupNotice: (ubase64, group_id, text)=>dispatch(PostGroupNoticeRequest(ubase64, group_id, text)),
    postGroupForum: (ubase64, group_id, text)=>dispatch(PostGroupForumRequest(ubase64, group_id, text)),
    getGroupNotice: (ubase64, group_id)=>dispatch(GetGroupNoticeRequest(ubase64, group_id)),
    getGroupForum: (ubase64, group_id)=>dispatch(GetGroupForumRequest(ubase64, group_id)),
    postGroupMember: (ubase64, group_id)=>dispatch(PostGroupMemberRequest(ubase64, group_id)),
    deleteGroupMember: (ubase64, group_id)=>dispatch(DeleteGroupMemberRequest(ubase64, group_id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
