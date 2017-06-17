import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupForum extends Component {
  constructor() {
    super();
  }

  render() {
    let month = this.props.created.getMonth() + 1;
    let date = this.props.created.getDate();
    return (
      <div>
        <p>{'(' + month + ' / ' + date + ') ' + this.props.author + ' : ' + this.props.text}</p>
      </div>
    )
  }
}

export default GroupForum
