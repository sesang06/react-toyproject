import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Article from '../Article';
import Search from '../Search';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Map from '../Map';
import defaultprofile from '../../img/defaultprofile.png'
//import sound from '../../music/Beenzino-Break.mp3'

import { GetWallRequest, GetArticleRequest, GetUserRequest, PostArticleRequest } from '../../actions';

class MapMain extends Component {

  constructor() {
    super();
    this.state={
    owner:""
    }
  this.onGet = this.onGet.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    if(this.props.loginStatus===1)
    this.props.getUser(this.props.uname, this.props.ubase64)
  }

     componentWillReceiveProps(nextProps){
       if(this.props.loginStatus===0 && nextProps.loginStatus===1)
       this.props.getUser(nextProps.uname, nextProps.ubase64)
     }

       onClick(e) {
        var profile = document.getElementsByClassName("profile");
        profile[0].style.display = "block";

         this.setState({owner : e.target.id});

         var table = document.getElementById("usertable");
         var tr = table.getElementsByTagName("tr");
         for (var i = 0; i < tr.length; i++) {
           tr[i].style.display = "none";
         }
       }
  onGet() {
    var profile = document.getElementsByClassName("profile");
    profile[0].style.display = "block";

    this.setState({owner : this.props.uname});
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
        <div>
          <ul>
            <li>친구의 운동 지도를 보러갈 수 있습니다.</li>
            <li>아래 검색창에서 친구의 아이디를 검색해보세요.</li>
            <li>그러면 친구의 프로필이 뜨고 친구의 운동 지도를 볼 수 있는 링크가 나타납니다.</li>
            <li>회원님과 친구들의 운동 지도를 모두 보고싶다면, 내 프로필 불러오기 버튼을 누르세요.</li>
            <li>그러면 당신의 프로필이 뜨고 내 지도를 보러가는 링크가 나타날겁니다.</li>
          </ul>
        </div>

          <div>
            <Search onClick={this.onClick} list={this.props.usernames} />
            <Button id="get_my_wall" onClick={this.onGet} text="내 프로필 불러오기"/>
            <Link className="Button" to={'/map/'+this.props.uname}>내 지도 보러가기</Link>

          </div>
          <div className="profile">
            <h3>{(wall_owner !== null) ? wall_owner.username + '님의 프로필' : ''}</h3>
            {(wall_owner !== null && wall_owner.avatar !== null) ?<Link to={'/wall/'+wall_owner.username}><img src={wall_owner.avatar} width="200" height="200"/></Link> :
             (wall_owner !== null && wall_owner.avatar === null) ?<Link to={'/wall/'+wall_owner.username}><img src={defaultprofile} width="200" height="200"/></Link>:
             null}
            <h4>{(wall_owner !== null && wall_owner.nickname !== null) ? '닉네임: ' + wall_owner.nickname :
                 (wall_owner !== null && wall_owner.nickname === null) ? '닉네임: (없음)' : ''}</h4>
            <h4>{(wall_owner !== null && wall_owner.email !== null) ? '이메일: ' + wall_owner.email :
                 (wall_owner !== null && wall_owner.email === null) ? '이메일: (없음)' : ''}</h4>
                 {(wall_owner!==null)?    <Link className="Button" to={'/map/'+wall_owner.username}>지도 보러가기</Link>:null}
                 <br/>
                 {(wall_owner!==null)?    <Link className="Button" to={'/wall/'+wall_owner.username}>담벼락 보러가기</Link>:null}
                 <br/>
                 {(wall_owner!==null)?    <Link className="Button" to={'/dietgraph/'+wall_owner.username}>그래프 보러가기</Link>:null}

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

export default connect(mapStateToProps, mapDispatchToProps)(MapMain);
