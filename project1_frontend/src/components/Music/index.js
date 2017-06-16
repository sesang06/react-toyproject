import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';

import { GetMusicRequest, PostMusicRequest } from '../../actions';

class Music extends Component {
  constructor() {
    super();
    this.state = { upload: false, play: false }
    this.audio = new Audio();
    this.onClick = this.onClick.bind(this)
    this.upload = this.upload.bind(this)
    this.play = this.play.bind(this)
    this.onUpload = this.onUpload.bind(this)
    this.onPlay = this.onPlay.bind(this)
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
    
    this.setState({ upload: false })
  }

  play() {
    let src = null;
    if (this.props.music_list.length !== 0) src = this.props.music_list[0].source
    if (src !== null) {
      this.audio.src = src.toString();
      this.audio.play();
    }
  }
    
  onUpload() {
    this.setState({ upload: true })
  }

  onPlay() {
    this.setState({ upload: false })
  }

  render() {
    const uploadForm=(
      <div>
        <input className="input" type="text" ref={ref=>this.title=ref} placeholder="title" />
        <input className="input" type="text" ref={ref=>this.artist=ref} placeholder="artist" />
        <input className="input" type="file" ref={ref=>this.source=ref} />
        <button id="upload_music" onClick={this.upload}>Upload</button>
        <button id="play_music" onClick={this.onPlay}>Play</button>
      </div>
    );

    const playForm=(
      <div>
        <button id="get_music" onClick={this.onClick}>Get</button>
        <button id="play_music" onClick={this.play}>Play</button>
        <button id="upload_music" onClick={this.onUpload}>Upload</button>
      </div>
    );

    if (this.props.loginStatus === 1) {
      return (
        <div>
          {(this.state.upload) ? uploadForm : playForm}
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
