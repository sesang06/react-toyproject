import React, { Component } from 'react';
import { connect } from 'react-redux';

import RabbiTur_Rabbit_logo from '../../img/RabbiTur_Rabbit_logo.png'
import RabbiTur_Rabbit from '../../img/RabbiTur_Rabbit.png'
import RabbiTur_Turtle_logo from '../../img/RabbiTur_Turtle_logo.png'
import RabbiTur_Turtle from '../../img/RabbiTur_Turtle.png'

import { Link } from 'react-router-dom';

class Main extends Component{

  render() {

      return (
        <div>
          <h1 style={{fontSize: '200%'}}>Team 8조 - RabbiTur</h1>
          <h2 style={{fontSize: '180%'}}>조원 : 조세상, 손혜원, 오용석, 선민준</h2>
          <h3 style={{fontSize: '170%'}}>RabbiTur란?</h3>
          <h4 style={{fontSize: '160%'}}><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} />
          </div><strong>거북이</strong></div>가 힘을 합쳐 만든 운동 SNS에요!</h4>
          <p style={{fontSize: '150%'}}>동화 속에서는 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>거북이</strong></div>가 서로 경쟁하지만,<br/>경주는 결국 <strong>패자</strong>가 있기 마련인 게임이죠.</p>
          <p style={{fontSize: '150%'}}><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div>
          <strong>거북이</strong></div>가 <strong>서로 도우며 함께 나아갔다면,<br/><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>모두</strong></div>가 이길수 있었겠죠.</strong></p>
          <p style={{fontSize: '150%'}}>그래서 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>거북이</strong></div>는 SNS 사이트를 만들어,<br/><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>서로</strong></div>를 챙기며 달리기를 하기로 결심했어요.</p>
          <p style={{fontSize: '150%'}}><strong>여러분도 RabbiTur와 함께 친구와 운동을 해 보세요!</strong></p>
          <Link to={'/timeline/'}><p style={{fontSize: '150%'}}>이미 로그인하셨나요? 이곳을 눌러 타임라인으로 가세요!</p></Link>
          <Link to={'/login/'}><p style={{fontSize: '150%'}}>아이디가 있으신가요? 이곳을 눌러 로그인하세요!</p></Link>
          <Link to={'/register'}><p style={{fontSize: '150%'}}>아직 아이디가 없으신가요? 이곳을 눌러 회원가입하세요!</p></Link>
          <p style={{fontSize: '150%'}}><img src={RabbiTur_Turtle_logo}  style={{height:'200px'}} /></p>

        </div>
      );

  }
}

export default Main;
