import React, { Component } from 'react';
//import './index.css';
import { Link } from 'react-router-dom';
import Button from '../Button';

import { connect } from 'react-redux';
import Search from '../Search';
import Chart from '../Chart'
import {GetDietGraphRequest} from '../../actions'
import defaultprofile from '../../img/defaultprofile.png'

import { GetUserRequest, } from '../../actions';


 class DietGraphMain extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this)

    this.state={
    owner:""
    }
    this.onGet = this.onGet.bind(this)
  }

  onGet() {
    this.setState({ owner: this.props.uname });
    var profile = document.getElementsByClassName("profile");
    profile[0].style.display = "block";

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


  render() {
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
              <li>DIET 정보를 보러갈 수 있습니다.</li>
              <li>아래 검색창에서 친구의 아이디를 검색해보세요.</li>
              <li>그러면 친구의 프로필이 뜨고 그의 DIET 그래프를 볼 수 있는 링크가 나타납니다.</li>
              <li>당신의 DIET 그래프를 보고싶다면, 내 프로필 불러오기 버튼을 누르세요.</li>
              <li>그러면 당신의 프로필이 뜨고 DIET 그래프를 보러가는 링크가 나타날겁니다.</li>
              <li>새로운 DIET 정보를 올리고 싶다면, DIET 정보 포스트하기 링크를 통해 정보 포스트 창으로 가세요!</li>
            </ul>
          </div>
          <div>
            <Search onClick={this.onClick} list={this.props.usernames} />
            <Button id="get_my_graph" onClick={this.onGet} text="내 프로필 불러오기"/>
            <Link to={'/dietgraph/'+this.props.uname}>내 DietGraph 보러가기</Link>
            <Link to={'/postdietgraph'}>Diet 정보 포스트하기</Link>
          </div>
          <div className="profile">
            <h3>{(wall_owner !== null) ? wall_owner.username + '님의 프로필' : ''}</h3>
            {(wall_owner !== null && wall_owner.avatar !== null) ? <Link to={'/wall/'+wall_owner.username}><img src={wall_owner.avatar} width="200" height="200"/> </Link>:
             (wall_owner !== null && wall_owner.avatar === null) ? <Link to={'/wall/'+wall_owner.username}><img src={defaultprofile} width="200" height="200"/> </Link>:
             null}
            <h4>{(wall_owner !== null && wall_owner.nickname !== null) ? '닉네임: ' + wall_owner.nickname :
                 (wall_owner !== null && wall_owner.nickname === null) ? '닉네임: (없음)' : ''}</h4>
            <h4>{(wall_owner !== null && wall_owner.email !== null) ? '이메일: ' + wall_owner.email :
                 (wall_owner !== null && wall_owner.email === null) ? '이메일: (없음)' : ''}</h4>
            {(wall_owner!==null)?    <Link to={'/dietgraph/'+wall_owner.username}>DietGraph 보러가기</Link>:null}
            <br></br>
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

let mapStateToProps=(state)=>{
  return {
    avatar: state.userlist_reducer.avatar,
    usernames: state.userlist_reducer.usernames,

    loginStatus : state.login_reducer.loginStatus,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    others_username: state.dietgrpah_reducer.uname,
    dietdatalist: state.dietgrpah_reducer.dietdatalist
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    getDietGraph: (uname, ubase64)=>dispatch(GetDietGraphRequest(uname, ubase64)),

    getUser: (uname, ubase64)=>dispatch(GetUserRequest(uname, ubase64)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DietGraphMain);
