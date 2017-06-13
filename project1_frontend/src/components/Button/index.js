import React, { Component } from 'react';
import './index.css';

class Button extends Component {
  render() {
    return (
      <div>
        <button className="Button" onClick={this.props.onClick} id={this.props.id}>{this.props.text}</button>
      </div>
    );
  }
}

export default Button;
