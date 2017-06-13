import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Input from '../Input';
import {connect} from 'react-redux';

import {RegisterSuccess, RegisterFail, postRegisterRequest,IdSuccess,IdFail,postIdRequest, SetIdValid,SetPasswordValid,SetPasswordCheckValid,SetEmailValid, ResetRegister } from '../../actions';

class Register extends Component {
  onIdValid(){
    if (this.newuname.input.value===""){
      this.props.onSetIdValid(1)
    }else{
        this.props.onId(this.newuname.input.value);
    }
  }
  onPasswordValid(){

    if (this.newpwd.input.value=== ""){
        this.props.onSetPasswordValid(1)
    }else{
          if( this.newpwd.input.value===this.newuname.input.value)
                this.props.onSetPasswordValid(4)
          else{
                const regdigits=/^(?=.*?[A-Za-z]).{8,}$/;
                if(!this.newpwd.input.value.match(regdigits))
                    this.props.onSetPasswordValid(2)
                else{
                    this.props.onSetPasswordValid(3)
                    if (this.newpwdcheck.input.value!== "")
                        this.onPasswordCheckValid();
                }
      }
    }
  }
  onPasswordCheckValid(){
    if (this.newpwdcheck.input.value=== ""){
      this.props.onSetPasswordCheckValid(1)
    }else if(this.newpwd.input.value!==this.newpwdcheck.input.value){
      this.props.onSetPasswordCheckValid(2)
    }else{
      this.props.onSetPasswordCheckValid(3)
    }
  }
  onEmailValid(){
      console.log("hello email")
    if (this.newemail.input.value===""){
      this.props.onSetEmailValid(1)
    }else{
        const regExp=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!this.newemail.input.value.match(regExp)){
          this.props.onSetEmailValid(2)
        }else{
          this.props.onSetEmailValid(3)
        }

    }
  }
  onSubmit(){
    this.onIdValid();
    this.onPasswordValid();
    this.onPasswordCheckValid();
    this.onEmailValid();
    if( this.props.idValid===4 && this.props.passwordValid===3 & this.props.passwordCheckValid===3 && this.props.emailValid===3){
        this.props.onRegister(this.newuname.input.value,this.newpwd.input.value,this.newemail.input.value);
    }
  }
  onClickReset(){
    this.props.onReset();
  }
  render() {
    const passwordMessage={0:"",1:"필수 입력 항목입니다.",2:"영문자가 반드시 하나 이상 포함된 8자 이상의 비밀번호여야 합니다.",3:"확인되었습니다!", 4: "비밀번호는 아이디와 같을 수 없습니다."}

    if (this.props.registerValid!==2)
    return (
      <div>
        <div>
        </div>

        <div className="Inputblock">
        <Input id="register_id" type="text" onBlur={this.onIdValid.bind(this)} ref={ref=>this.newuname=ref} placeholder="아이디" />
        </div>
        <div className="Inputblock">
          <label id="register_idmessage">{this.props.idValid===0?"":(this.props.idValid===1?"필수 입력 항목입니다.":(this.props.idValid===2?"적절하지 않은 아이디입니다.":(this.props.idValid===3?"이미 존재하는 아이디입니다.":"확인되었습니다!")))}
          </label>
        </div>
        <div className="Inputblock">
        <Input id="register_pwd" type="password" onBlur={this.onPasswordValid.bind(this)} ref={ref=>this.newpwd=ref} placeholder="비밀번호"/>
        </div>
        <div className="Inputblock">
         <label id="register_pwdmessage"> {passwordMessage[this.props.passwordValid]}
         </label>
        </div>
        <div className="Inputblock">
        <Input id="register_pwdcheck" type="password" onBlur={this.onPasswordCheckValid.bind(this)} ref={ref=>this.newpwdcheck=ref} placeholder="비밀번호 확인"/>
        </div>
        <div className="Inputblock">
          <label id="register_pwdcheckmessage">
        {this.props.passwordCheckValid===0?"":(this.props.passwordCheckValid===1?"필수 입력 항목입니다.":(this.props.passwordCheckValid===2?"비밀번호와 일치하지 않습니다.":"확인되었습니다!"))}
          </label>
        </div>
        <div className="Inputblock">
        <Input id="register_email" type="text" onBlur={this.onEmailValid.bind(this)} ref={ref=>this.newemail=ref} placeholder="이메일"/>
        </div>
        <div className="Inputblock">
          <label id="register_emailmessage">
        {this.props.emailValid===0?"":(this.props.emailValid===1?"필수 입력 항목입니다.":(this.props.emailValid===2?"적절하지 않은 이메일 형식입니다.":"확인되었습니다!"))}
          </label>
        </div>
        <div className="Submit">
        <Button id="register_submit" onClick={this.onSubmit.bind(this)} text="회원 가입"/>
        </div>
        <div>
          <label id="register_submitmessage">
        {this.props.registerValid===0?"":(this.props.registerValid===1?"회원 가입에 실패했습니다. 다시 시도해 주세요.":"회원이 되신 것을 축하합니다!")}
          </label>
        </div>
      </div>
    );
    else return(
      <div className="Inputblock">
      <p id="register_welcome">회원이 되신 것을 축하드립니다!</p>
      <p id="register_welcome_id">ID : {this.props.uname}</p>
      <p id="register_welcome_email">Email : {this.props.uemail}</p>
      <Button id="register_back" onClick={this.onClickReset.bind(this)} text="처음 화면으로 돌아가기"/>
      </div>
    );
  }
}
let mapStateToProps=(state)=>{

  return {
  register_entered: state.register_reducer.register_entered,
  register_fail: state.register_reducer.register_fail,
  id_entered: state.register_reducer.id_entered,
  id_fail: state.register_reducer.id_fail,
  uname: state.register_reducer.uname,
  uemail: state.register_reducer.uemail,
  idValid:state.register_reducer.idValid,
  passwordValid:state.register_reducer.passwordValid,
  passwordCheckValid:state.register_reducer.passwordCheckValid,
  emailValid:state.register_reducer.emailValid,
  registerValid:state.register_reducer.registerValid

    };
}
let mapDispatchToProps= (dispatch) =>{
  return{
    onRegister:(uname, upwd, uemail)=> dispatch(postRegisterRequest(uname, upwd, uemail)),
    onId:(uname)=> dispatch(postIdRequest(uname)),
    onSetIdValid:(idValid)=> dispatch(SetIdValid(idValid)),
    onSetPasswordValid:(passwordValid)=> dispatch(SetPasswordValid(passwordValid)),
    onSetPasswordCheckValid:(passwordCheckValid)=> dispatch(SetPasswordCheckValid(passwordCheckValid)),
    onSetEmailValid:(emailValid)=> dispatch(SetEmailValid(emailValid)),
    onReset:()=>dispatch(ResetRegister())

  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);
