import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupNotice extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h4>{this.props.created.getMonth() + ' / ' + this.props.created.getDate() + ' : ' + this.props.text}</h4>
      </div>
    )
  }
}

export default GroupNotice
