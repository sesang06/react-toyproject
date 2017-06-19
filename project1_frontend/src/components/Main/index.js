import React, { Component } from 'react';
import { connect } from 'react-redux';

import RabbiTur_Rabbit_logo from '../../img/RabbiTur_Rabbit_logo.png'
import RabbiTur_Rabbit from '../../img/RabbiTur_Rabbit.png'
import RabbiTur_Turtle_logo from '../../img/RabbiTur_Turtle_logo.png'
import RabbiTur_Turtle from '../../img/RabbiTur_Turtle_logo.png'

class Main extends Component{

  render() {

      return (
        <div>
        <img src={RabbiTur_Turtle_logo}  style={{height:'200px'}} />

          <h1>Team 7조 - RabbiTur</h1>
          <h3>조원 : 조세상, 손혜원, 오용석, 선민준</h3>
        </div>
      );

  }
}

export default Main;
