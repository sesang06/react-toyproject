import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Article from '../Article';
import { connect } from 'react-redux';

import { PostImageRequest, GetArticleRequest } from '../../actions';

import {GetProfileRequest, UpdateProfileReqeust} from '../../actions';


class Profile extends Component {

  onGet(){
    if (this.props.loginStatus === 1) {
      this.props.getProfile(this.props.ubase64)
    }
  }

   onSubmit(){
     console.log(this.newfile)
     console.log(this.newnickname)
     console.log(this.newfile.files)
     console.log(this.newnickname.value)
      let nickname;
      let first_name;
      let last_name;
      let avatar;
      if (this.newnickname.value==="")
      nickname=null
      else
      nickname=this.newnickname.value

      if (this.newfirst_name.value==="")
      first_name=null
      else
      first_name=this.newfirst_name.value
      if (this.newlast_name.value==="")
      last_name=null
      else
      last_name=this.newlast_name.value
      if (this.newfile.files.length===0)
      avatar=null
      else {
        avatar=this.newfile.files[0]
      }
       this.props.updateProfile(this.props.ubase64,nickname, avatar, first_name, last_name);

     /*
         const file= this.newfile.files[0]
        console.log(file)
    //    this.props.updateProfile(this.props.ubase64, this.props.author, this.newtext.value, file);
        //this.onGet();
    }*/
  }
  render() {
   if (this.props.loginStatus === 1) {
      return (
        <div>

            <div>
            <Button  onClick={this.onGet.bind(this)} text="프로필 불러오기"/>
            </div>
            <div>
              <div>이메일 : {this.props.email===null?"없거나 아직 불러오지 못함":this.props.email}</div>
              <div>별명 : {this.props.nickname===null?"없거나 아직 불러오지 못함":this.props.nickname}</div>
              <ImageLabel text="프로필 사진" src={this.props.avatar}/>
              <div>이름 : {this.props.first_name===null?"없거나 아직 불러오지 못함":this.props.first_name}</div>
              <div>성 : {this.props.last_name===null?"없거나 아직 불러오지 못함":this.props.last_name}</div>
              <DateLabel text="마지막으로 로그인한 날짜" date={this.props.last_login}/>
              <DateLabel text="가입 날짜" date={this.props.date_joined}/>

            </div>

            <div>

              <div>
              별명 수정: <input  type="text" ref={ref=>this.newnickname=ref}/>
              </div>
              <div>
              이름 수정 : <input  type="text" ref={ref=>this.newfirst_name=ref}/>
              </div>
              <div>
              성 수정 : <input  type="text" ref={ref=>this.newlast_name=ref}/>
              </div>
              <div>
              프로필 사진 수정 : <input type="file" ref={ref=>this.newfile=ref} />
              </div>
              <Button onClick={this.onSubmit.bind(this)} text="프로필 수정하기"/>

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


class ImageLabel extends Component{
  render(){
    if (this.props.src===null){
    return (
      <div>
      {this.props.text}: 없거나 아직 불러오지 못함
      </div>
    );
  }else{
     return(
      <div>
      {this.props.text}: <img src={this.props.src} width="100" height="100"/>
      </div>
    );
  }
}
}

class DateLabel extends Component {

  render(){
    if (this.props.date===null){
    return (
      <div>
      {this.props.text}: 없거나 아직 불러오지 못함
      </div>
    );
  }else{
     return(
      <div>
      {this.props.text}: {this.props.date.getFullYear()}년 {this.props.date.getMonth()}월 {this.props.date.getDate()}일
      </div>
    );
  }
}
}

let mapStateToProps=(state)=>{
  return {
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    loginStatus: state.login_reducer.loginStatus,

    email:state.profile_reducer.email,
    nickname:state.profile_reducer.nickname,
    avatar: state.profile_reducer.avatar,
    first_name:state.profile_reducer.first_name,
    last_name:state.profile_reducer.last_name,
    last_login:state.profile_reducer.last_login,
    date_joined: state.profile_reducer.date_joined

  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    updateProfile: (ubase64, nickname, avatar, first_name, last_name)=>dispatch(UpdateProfileReqeust(ubase64, nickname, avatar, first_name, last_name)),
    getProfile: (ubase64)=>dispatch(GetProfileRequest(ubase64))

  };
}

//  getArticle: (ubase64)=>dispatch(GetArticleRequest(ubase64))

//export default ArticleList
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
