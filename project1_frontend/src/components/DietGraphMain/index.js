import React, { Component } from 'react';
//import './index.css';
import { Link } from 'react-router-dom';

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
         this.setState({owner : e.target.id});
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
            <Search onClick={this.onClick} list={this.props.usernames} />
          </div>
          <div className="profile">
            <h3>{(wall_owner !== null) ? wall_owner.username + '님의 프로필' : ''}</h3>
            {(wall_owner !== null && wall_owner.avatar !== null) ? <img src={wall_owner.avatar} width="200" height="200"/> :
             (wall_owner !== null && wall_owner.avatar === null) ? <img src={defaultprofile} width="200" height="200"/> :
             null}
            <h4>{(wall_owner !== null && wall_owner.nickname !== null) ? '닉네임: ' + wall_owner.nickname :
                 (wall_owner !== null && wall_owner.nickname === null) ? '닉네임: (없음)' : ''}</h4>
            <h4>{(wall_owner !== null && wall_owner.email !== null) ? '이메일: ' + wall_owner.email :
                 (wall_owner !== null && wall_owner.email === null) ? '이메일: (없음)' : ''}</h4>
            {(wall_owner!==null)?    <Link to={'/dietgraph/'+wall_owner.username}>DietGraph 보러가기</Link>:null}

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
