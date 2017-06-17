import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Article from '../Article';
import Search from '../Search';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import defaultprofile from '../../img/defaultprofile.png'
//import sound from '../../music/Beenzino-Break.mp3'

import { GetWallRequest, GetArticleRequest, GetUserRequest, PostArticleRequest } from '../../actions';

class WallList extends Component {
  constructor(props) {
    super(props);
    this.state={
    owner:this.props.match.params.username
    }
    this.onGet = this.onGet.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    if(this.props.loginStatus===1){
      this.props.getWall(this.props.match.params.username, this.props.ubase64)

    this.props.getUser(this.props.uname, this.props.ubase64)

  }
  }

     componentWillReceiveProps(nextProps){
       if(this.props.loginStatus===0 && nextProps.loginStatus===1){
       this.props.getUser(nextProps.uname, nextProps.ubase64)
       this.props.getWall(this.props.match.params.username, nextProps.ubase64)
     }

     }

  onClick(e) {
    this.setState({owner : e.target.id});
    this.props.getWall(e.target.id, this.props.ubase64)

    var table = document.getElementById("usertable");
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
      tr[i].style.display = "none";
    }
  }

  onGet() {
    this.setState({owner : this.props.uname});
this.props.getWall(this.props.uname, this.props.ubase64)
    //this.props.getArticle(this.props.ubase64)
  }



  render() {
    let article_list = this.props.article_list
    let avatar = this.props.avatar
    let wall_owner = null;
    for (var i = 0; i < avatar.length; i++) {
      if (this.state.owner === "") wall_owner = null;
      else if (this.state.owner === avatar[i].username) wall_owner = avatar[i];
    }

    if (this.props.loginStatus === 1) {
      return (
        <div>
        <Link to={'/wall/'}>담벼락 메인으로 돌아가기</Link>

          <div className="profile">
            <h3>{(wall_owner !== null) ? wall_owner.username + '님의 프로필' : ''}</h3>
            {(wall_owner !== null && wall_owner.avatar !== null) ?<Link to={'/wall/'+wall_owner.username}><img src={wall_owner.avatar} width="200" height="200"/></Link>:
             (wall_owner !== null && wall_owner.avatar === null) ?<Link to={'/wall/'+wall_owner.username}><img src={defaultprofile} width="200" height="200"/></Link>:
             null}
            <h4>{(wall_owner !== null && wall_owner.nickname !== null) ? '닉네임: ' + wall_owner.nickname :
                 (wall_owner !== null && wall_owner.nickname === null) ? '닉네임: (없음)' : ''}</h4>
            <h4>{(wall_owner !== null && wall_owner.email !== null) ? '이메일: ' + wall_owner.email :
                 (wall_owner !== null && wall_owner.email === null) ? '이메일: (없음)' : ''}</h4>
          </div>
          <div>
            {article_list.slice(0).reverse().map(function(item, i) {
              return (
                <div>
                  <Article id={item.id} author={item.author} content={item.content} created_time={item.created_time} updated_time={item.updated_time} comment_list={item.comment_list} like_list={item.like_list} likes_count={item.likes_count} comments_count={item.comments_count} nickname={item.nickname} avatar={item.avatar}/>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p>로그인이 필요합니다.</p>
        </div>
      )
    }
  }
}

let mapStateToProps = (state) => {
  return {
    avatar: state.userlist_reducer.avatar,
    usernames: state.userlist_reducer.usernames,
    article_list: state.article_list_reducer.article_list,
    //article_list: state.wall_reducer.article_list,
    loginStatus: state.login_reducer.loginStatus,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (ubase64, author, text)=>dispatch(PostArticleRequest(ubase64, author, text)),
    getUser: (uname, ubase64)=>dispatch(GetUserRequest(uname, ubase64)),
    getArticle: (ubase64)=>dispatch(GetArticleRequest(ubase64)),
    getWall: (uname, ubase64)=>dispatch(GetWallRequest(uname, ubase64)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WallList);
