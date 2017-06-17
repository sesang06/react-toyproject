import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';

import { GetMusicRequest, PostMusicRequest } from '../../actions';

class Music extends Component {
  constructor() {
    super();
    this.state = { upload: false, play: false, index: 0 }
    this.audio = new Audio();
    this.onClick = this.onClick.bind(this)
    this.upload = this.upload.bind(this)
    this.play = this.play.bind(this)
    this.onUpload = this.onUpload.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.stop = this.stop.bind(this)
    this.setMusic = this.setMusic.bind(this)
    this.next = this.next.bind(this)
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
    if ((this.audio.src !== "") && (this.state.index !== -1)) {
      this.audio.play()
      this.setState({ play: true })
      this.audio.addEventListener('ended', this.next)
      console.log('play: ' + this.audio.src)
    }
  }

  next() {
    var index = this.state.index + 1;
    if (index === this.props.music_list.length) index = 0;

    this.setState({ index: index })
    this.audio.src = this.props.music_list[index].source;
    this.audio.load()
    this.audio.play()
    console.log('next: ' + this.audio.src)
  }

  stop() {
    this.audio.pause()
    this.setState({ play: false })

    console.log('stop: ' + this.audio.src)
  }
    
  onUpload() {
    this.setState({ upload: true })
  }

  onPlay() {
    this.setState({ upload: false })
  }

  setMusic(e) {
    var index = e.nativeEvent.target.selectedIndex;
    var selected = e.nativeEvent.target[index].text;
    var src = null;

    if (index !== 0) this.audio.src = this.props.music_list[index-1].source
    else this.audio.src = src;
    this.setState({ index: index-1 })
  }

  render() {
    let music_list = this.props.music_list
    let len = music_list.length
    const uploadForm=(
      <div>
        <input id="music_title" className="music_input1" type="text" ref={ref=>this.title=ref} placeholder="title" />
        <input id="music_artist" className="music_input1" type="text" ref={ref=>this.artist=ref} placeholder="artist" />
        <input accept=".mp3" id="music_source" className="music_input2" type="file" ref={ref=>this.source=ref} />
        <button className="music_btn" id="upload_music" onClick={this.upload}>Upload</button>
        <button className="music_btn" id="play_music" onClick={this.onPlay}>Play</button>
      </div>
    );

    const playForm=(
      <div>
        <button className="music_btn" id="get_music" onClick={this.onClick}>Get</button>
        <select className="music_select" id="music_list" onChange={this.setMusic}>
          <option value="music_0">music</option>
          {Array.apply(null, Array(len)).map(function(item, i) {
            return (
              <option id={"music_"+music_list[i].id} key={i+1}>
                {music_list[i].title+' - '+music_list[i].artist}
              </option>
            );
          }, this)}
        </select>
        <button className="music_btn" id="play_music" onClick={(this.state.play) ? this.stop : this.play}>
          {this.state.play ? 'Stop' : 'Play'}
        </button>
        <button className="music_btn" id="upload_music" onClick={this.onUpload}>Upload</button>
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
