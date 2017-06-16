import React, { Component } from 'react';
//import './index.css';
import { connect } from 'react-redux';

import { GetMusicRequest, PostMusicRequest } from '../../actions';

class Music extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this)
    this.upload = this.upload.bind(this)
  }

  onClick() {
    this.props.getMusic(this.props.uname, this.props.ubase64)
  }

  upload() {
    let title = null;
    let artist = null;
    let source = null;

    if (this.title.value !== "") title = this.title.value
    if (this.artist.value !== "") artist = this.artist.value
    if (this.source.files.length !== 0) source = this.source.files[0]

    if ((title !== null) && (artist !== null) && (source !== null))  
      this.props.postMusic(this.props.uname, this.props.ubase64, title, artist, source)
  }

  render() {
    if (this.props.loginStatus === 1) {
      return (
        <div>
          <button id="get_music" onClick={this.onClick}>Get</button>
          <input type="text" ref={ref=>this.title=ref} placeholder="title" />
          <input type="text" ref={ref=>this.artist=ref} placeholder="artist" />
          <input type="file" ref={ref=>this.source=ref} />
          <button id="post_music" onClick={this.upload}>Upload</button>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    music_list: state.music_reducer.music_list,
    loginStatus: state.login_reducer.loginStatus,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    postMusic: (uname, ubase64, title, artist, source)=>dispatch(PostMusicRequest(uname, ubase64, title, artist, source)),
    getMusic: (uname, ubase64)=>dispatch(GetMusicRequest(uname, ubase64)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
