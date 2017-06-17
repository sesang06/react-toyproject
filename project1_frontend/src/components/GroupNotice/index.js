import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupNotice extends Component {
  constructor() {
    super();
  }

  render() {
    let month = this.props.created.getMonth() + 1;
    let date = this.props.created.getDate();
    return (
      <div>
        <h4>{month + ' / ' + date + ' : ' + this.props.text}</h4>
      </div>
    )
  }
}

export default GroupNotice
