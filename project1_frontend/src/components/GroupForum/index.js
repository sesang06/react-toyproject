import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupForum extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>{'(' + this.props.created.getMonth() + ' / ' + this.props.created.getDate() + ') ' + this.props.author + ' : ' + this.props.text}</p>
      </div>
    )
  }
}

export default GroupForum
