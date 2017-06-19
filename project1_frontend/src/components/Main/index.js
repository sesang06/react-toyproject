import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';

import RabbiTur_Rabbit_logo from '../../img/RabbiTur_Rabbit_logo.png'
import RabbiTur_Rabbit from '../../img/RabbiTur_Rabbit.png'
import RabbiTur_Turtle_logo from '../../img/RabbiTur_Turtle_logo.png'
import RabbiTur_Turtle from '../../img/RabbiTur_Turtle.png'

import { Link } from 'react-router-dom';

class Main extends Component{

  render() {

      return (
        <div>
          <h1>Team 8조 - RabbiTur</h1>
          <h2>조원 : 조세상, 손혜원, 오용석, 선민준</h2>
          <h3>RabbiTur란?</h3>
          <h4><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>거북이</strong></div>가 힘을 합쳐 만든 운동 SNS 서비스에요!</h4>
          <p>동화 속에서는 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>거북이</strong></div>가 서로 경쟁하지만,<br/>경주는 결국 <strong>패자</strong>가 있기 마련인 게임이죠.</p>
          <p><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>거북이</strong></div>가 <strong>서로 도우며 함께 나아갔다면,<br/><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>모두</strong></div>가 이길수 있었겠죠.</strong></p>
          <p>그래서 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /></div><strong>토끼</strong></div>와 <div style={{display:'inline-block'}}><div><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>거북이</strong></div>는 SNS 사이트를 만들어,<br/><div style={{display:'inline-block'}}><div><img src={RabbiTur_Rabbit}  style={{width:'100px'}} /><img src={RabbiTur_Turtle}  style={{width:'100px'}} /></div><strong>서로</strong></div>를 챙기며 달리기를 하기로 결심했어요.</p>
          <p><strong>여러분도 RabbiTur와 함께 친구와 운동을 해 보세요!</strong></p>
          <Link to={'/login/'}>아이디가 있으신가요? 이곳을 눌러 로그인하세요!</Link><br/>
          <Link to={'/register'}>아직 아이디가 없으신가요? 이곳을 눌러 회원가입하세요!</Link>
          <p><img src={RabbiTur_Turtle_logo}  style={{height:'200px'}} /></p>

        </div>
      );

  }
}

export default Main;
