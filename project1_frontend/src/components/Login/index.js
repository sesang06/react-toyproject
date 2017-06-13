import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Input from '../Input';
import {connect} from 'react-redux';

import {postLoginRequest, Logout} from '../../actions';
/*
export const Login=({onLogin,loginStatus, uname, onLogout})=>{
  let newuname, newpwd;


  const onSubmit=()=>{
    if (newuname!= undefined && newpwd!= undefined){
      onLogin(newuname.input.value, newpwd.input.value).then(
        ()=>{
          if(loginStatus===1)
          alert("login sucess")
          console.log(uname);
        }
      );
    }
  }
  const onLogoutButton=()=>{
      onLogout();
  }
  if(loginStatus===1)
  return (
    <div>
    <p id="login_welcome">{uname}님, 환영합니다!</p>
    <Button id="logout" onClick={onLogoutButton} text="로그아웃"/>
    </div>
  )
  else
  return (
    <div>
      <div className="Id">
      <Input type="text" id="login_id" ref={n=>{newuname=n;}} placeholder="아이디" />
      </div>
      <div className="Password">
      <Input type="password" id="login_pwd" ref={n=>{newpwd=n;}} placeholder="비밀번호"/>
      </div>
      <div className="Submit">
      <Button onClick={onSubmit} id="login_submit" text="로그인"/>
      </div>
      <div>
      <label id="login_submitmessage">
      {loginStatus===0?"":(loginStatus===1?"로그인에 성공했습니다.":"아이디나 비밀번호가 일치하지 않습니다.")}
      </label>
      </div>
    </div>
  );
}*/
class Login extends Component{

    onSubmit(){
      if (this.newuname!= undefined && this.newpwd!= undefined){

         this.props.onLogin(this.newuname.input.value, this.newpwd.input.value)
      }
    }
    onLogoutButton(){

      function deleteCookie(cname){
        document.cookie=cname+"=;path=/";
      }
      deleteCookie("uname");
      deleteCookie("upwd");

        this.props.onLogout();
    }
    render(){
      if(this.props.loginStatus===1)
      return (
        <div>
        <p id="login_welcome">{this.props.uname}님, 환영합니다!</p>
        <Button id="logout" onClick={this.onLogoutButton.bind(this)} text="로그아웃"/>
        </div>
      )
      else
      return (
        <div>
          <div className="Id">
          <Input type="text" id="login_id" ref={n=>{this.newuname=n;}} placeholder="아이디" />
          </div>
          <div className="Password">
          <Input type="password" id="login_pwd" ref={n=>{this.newpwd=n;}} placeholder="비밀번호"/>
          </div>
          <div className="Submit">
          <Button onClick={this.onSubmit.bind(this)} id="login_submit" text="로그인"/>
          </div>
          <div>
          <label id="login_submitmessage">
          {this.props.loginStatus===0?"":(this.props.loginStatus===1?"로그인에 성공했습니다.":"아이디나 비밀번호가 일치하지 않습니다.")}
          </label>
          </div>
        </div>
      );
    }
}

let mapStateToProps=(state)=>{
  return {
    login_entered: state.login_reducer.login_entered,
    login_fail: state.login_reducer.login_fail,
    uname: state.login_reducer.uname,
    loginStatus:state.login_reducer.loginStatus
    //ubase64: state.login_reducer.ubase64
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    onLogin:(uname, upwd)=>dispatch(postLoginRequest(uname, upwd)),
    onLogout:()=>dispatch(Logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
