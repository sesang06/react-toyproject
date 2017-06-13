import React, { Component } from 'react';
//import './index.css';
import { connect } from 'react-redux';

import Chart from '../Chart'
import {GetDietGraphRequest} from '../../actions'
class DietGraph extends Component {
  onGet(){
    if (this.props.loginStatus === 1) {
      this.props.getDietGraph(this.props.match.params.username,this.props.ubase64)
    }
    console.log(this.props.dietdatalist)
  }

  render(){

    return (
    <div>

    <button onClick={this.onGet.bind(this)}>{this.props.match.params.username}님의 그래프 불러오기</button>

{this.props.match.params.username===this.props.others_username?  <div>
  <tabel>
    <tr>
      <td><Chart data={ this.props.dietdatalist.map(({created, bmi})=>(

        [created.getTime(), bmi]
      )
      )}
      title = {this.props.others_username+"님의 bmi 지수 변화 그래프"}
      ytitle= "bmi"
      />  </td>
          <td>
              <Chart data={ this.props.dietdatalist.map(({created, weight})=>(

                [created.getTime(), weight]
              )
              )}
              title = {this.props.others_username+"님의 체중 변화 그래프"}
              ytitle= "체중"
              />  </td>
    </tr>
    <tr>
        <td>     <Chart data={ this.props.dietdatalist.map(({created, calorie})=>(

              [created.getTime(), calorie]
            )
            )}
            title = {this.props.others_username+"님의 칼로리 소모 그래프"}
            ytitle= "칼로리"
            /> </td>
            <td>
                <Chart data={ this.props.dietdatalist.map(({created, step})=>(

                  [created.getTime(), step]
                )
                )}
                title = {this.props.others_username+"님의 걸음 수 기록그래프"}
                ytitle= "걸음 수 "
                /></td>
    </tr>
</tabel>

</div>
:null}
        </div>
  )
  }
}
///{this.props.match.params.username}dd

let mapStateToProps=(state)=>{
  return {
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DietGraph);
