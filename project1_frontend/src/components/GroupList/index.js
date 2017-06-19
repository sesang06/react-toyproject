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
        <div>
          <ul>
            <li>그룹을 생성하고 가입하세요!</li>
            <li>그리고 다양한 사람들과 이야기를 나누어보세요!</li>
            <li>왼쪽 사이드바에서 그룹을 생성할 수 있습니다.</li> 
            <li>적당한 이름을 적은 뒤, + 버튼을 누르면 당신이 관리자인 그룹이 생성됩니다.</li>
            <li>그룹을 생성했다면 들어가서 NOTICE를 작성해보세요.</li>
            <li>그룹 만들기가 귀찮다면 이미 있는 그룹에 들어가세요!</li>
            <li>왼쪽 사이드바에서 Get Group List 버튼을 누르고 다양한 그룹 목록을 불러오세요.</li>
            <li>목록에서 끌리는 그룹에 들어가 JOIN 버튼을 눌러 가입하세요!</li>  
            <li>당싱이 가입한 그룹에서는 FORUM을 작성해 다양한 사람들과 이야기를 나눌 수 있습니다.</li>
          </ul>
        </div>


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
