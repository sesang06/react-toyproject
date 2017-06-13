import React, { Component } from 'react';
import './index.css';
import Group from '../Group';
import { connect } from 'react-redux';

import icons from "react-morph-material-icons/build/shapes";
import MorphIcon from "react-morph-material-icons";
import { PlusButton } from 'react-svg-buttons';

import { GetGroupListRequest, PostGroupListRequest, SetGroupNoticeRequest, SetGroupForumRequest } from '../../actions';

class GroupList extends Component {
  constructor() {
    super();
    this.onGet = this.onGet.bind(this)
    this.onPost = this.onPost.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onGet() {
    this.props.getGroupList(this.props.ubase64)
  }

  onPost() {
    this.props.postGroupList(this.props.ubase64, this.group_name.value);
  }

  onClick(e) {
    var group_id = e.target.id
    var id = group_id.split('_')[0]
    var content_id = id + "_content"
    var tablinks = document.getElementsByClassName("tablinks")
    for (var i = 0; i < tablinks.length; i++)
      tablinks[i].className = tablinks[i].className.replace(" active", "");

    document.getElementById(group_id).style.display = "block";
    e.target.className += " active";

    var tabcontent = document.getElementsByClassName("tabcontent")
    for (var i = 0; i < tabcontent.length; i++)
      tabcontent[i].style.display = "none"
    document.getElementById(content_id).style.display = "block"
 
    this.props.setGroupNotice([])
    this.props.setGroupForum([])
  }

  render() {
    if (this.props.loginStatus == 1) {
      let len = this.props.group_list.length
      return (
        <div>
        <div className="tab">
          <button id="get_group_list" className="tablinks" onClick={this.onGet}>Get Group List</button>
          {Array.apply(null, Array(len)).map(function(item, i){
            return (
              <button id={this.props.group_list[i].id+'_group'} className="tablinks" onClick={this.onClick}>{this.props.group_list[i].group_name}</button>
            );
          }, this)}
          <textarea cols="20" rows="2" style={{resize: "none"}} id="group_name_field" className="tablinks" ref={ref=>this.group_name=ref} placeholder="Group Name"/>
        <PlusButton size="33" id="add_group" onClick={this.onPost} />
        </div>
        <div>
          {Array.apply(null, Array(len)).map(function(item, i){
            return (
              <Group id={this.props.group_list[i].id+'_content'} member_list={this.props.group_list[i].member_list} admin={this.props.group_list[i].admin} member={this.props.group_list[i].member}/>
            );
          }, this)}
        </div>
      </div>
      );
    } else {
      return (
        <div>
          <p>로그인이 필요합니다.</p>
        </div>
      );
    }
  }
}
          

let mapStateToProps = (state) => {
  return {
    loginStatus: state.login_reducer.loginStatus,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    group_list: state.group_list_reducer.group_list
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    setGroupForum: (forum_list)=>dispatch(SetGroupForumRequest(forum_list)),
    setGroupNotice: (notice_list)=>dispatch(SetGroupNoticeRequest(notice_list)),
    getGroupList: (ubase64)=>dispatch(GetGroupListRequest(ubase64)),
    postGroupList: (ubase64, group_name)=>dispatch(PostGroupListRequest(ubase64, group_name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
