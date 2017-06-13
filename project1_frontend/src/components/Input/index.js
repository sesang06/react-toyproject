import React, { Component } from 'react';
import './index.css';

class Input extends Component {
  render() {
    return (
      <div>
        <input onBlur={this.props.onBlur} ref={ref=>this.input=ref} type={this.props.type} placeholder={this.props.placeholder} id={this.props.id} className="Input"/>
      </div>
    );
  }
}

export default Input;
