import React, { Component } from 'react';
//import './index.css';
import { connect } from 'react-redux';

class Like extends Component{
  render(){
    return (
      <div>
        <label>{this.props.author}</label>
      </div>
    )
  }
}

export default Like;
