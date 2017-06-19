import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts'

//import './index.css';
import { connect } from 'react-redux';

//import {GetDietGraphRequest} from '../../actions'
class Chart extends Component {

  render(){
    var config={
      title:{
        text : this.props.title
      },
      yAxis: {
        title:{
          text: this.props.ytitle
        }
      },
      legend:{
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions:{
        series:{
          color: '#343a40'
        }
      },
      xAxis: {
        type: 'datetime',
        title:{
          enabled: true,
              text: "날짜"
            },
          },

      series: [{
        data: this.props.data
      }]
    };
    return (
    <div>
    <ReactHighcharts config={config}/>
    </div>
  )
  }
}
///{this.props.match.params.username}dd

/*let mapStateToProps=(state)=>{
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
*/
//export default connect(mapStateToProps, mapDispatchToProps)(DietGraph);
export default Chart;
