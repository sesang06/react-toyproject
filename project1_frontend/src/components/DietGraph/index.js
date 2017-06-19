import React, { Component } from 'react';
//import './index.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../Search';
import Chart from '../Chart'
import {GetDietGraphRequest} from '../../actions'
import defaultprofile from '../../img/defaultprofile.png'

import { GetUserRequest, } from '../../actions';


class DietGraph extends Component {
  onGet(){
    if (this.props.loginStatus === 1) {
      this.props.getDietGraph(this.props.match.params.username,this.props.ubase64)
    }
}

  componentDidMount(){
    this.onGet()
  }

     componentWillReceiveProps(nextProps){
       if(this.props.loginStatus===0 && nextProps.loginStatus===1)
       this.props.getDietGraph(nextProps.match.params.username,nextProps.ubase64)

     }

  render(){

    return (
    <div>
    <h1>{this.props.others_username+"님의 운동 그래프"}</h1>
<p><Link to={'/dietgraph/'}>DietGraph 메인으로 돌아가기</Link></p>
<p><Link to={'/wall/'+this.props.others_username}>{this.props.others_username}님의 담벼락 보러가기</Link></p>
<p><Link to={'/map/'+this.props.others_username}>{this.props.others_username}님의 지도 보러가기</Link></p>
     <div>
        <div>
          <div style={{display:'inline-block', width:'50%'}}>
          <Chart data={ this.props.dietdatalist.map(({created, bmi})=>(
            [created.getTime(), bmi]))}
          title = {this.props.others_username+"님의 bmi 지수 변화 그래프"}
          ytitle= "bmi"
          />
          </div>
          <div style={{display:'inline-block', width:'50%'}}>
              <Chart data={ this.props.dietdatalist.map(({created, weight})=>(
                    [created.getTime(), weight]))}
                  title = {this.props.others_username+"님의 체중 변화 그래프"}
                  ytitle= "체중"
                  />
          </div>
      </div>
    <div>
            <div style={{display:'inline-block', width:'50%'}}>
               <Chart data={ this.props.dietdatalist.map(({created, calorie})=>(
                    [created.getTime(), calorie] )
                  )}
                  title = {this.props.others_username+"님의 칼로리 소모 그래프"}
                  ytitle= "칼로리"
                  />
            </div>
            <div style={{display:'inline-block', width:'50%'}}>
              <Chart data={ this.props.dietdatalist.map(({created, step})=>(
                        [created.getTime(), step]   )
                    )}
                      title = {this.props.others_username+"님의 걸음 수 기록그래프"}
                      ytitle= "걸음 수 "
                      />
            </div>
  </div>


</div>
      </div>
  )
  }
}
///{this.props.match.params.username}dd

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

export default connect(mapStateToProps, mapDispatchToProps)(DietGraph);
