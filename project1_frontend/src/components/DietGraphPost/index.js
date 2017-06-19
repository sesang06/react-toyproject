import React, { Component } from 'react';
import './index.css';
import Button from '../Button';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PostDietDataRequest } from '../../actions';

class DietGraphPost extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.valid = false
    this.state = { valid: false }
  }

  onSubmit() {
    let height = -1;
    let weight = -1;
    let step = -1;
    let calorie = -1;

    if (this.height.value !== "") height = this.height.value
    if (this.weight.value !== "") weight = this.weight.value
    if (this.step.value !== "") step = this.step.value
    if (this.calorie.value !== "") calorie = this.calorie.value

    if ((height >= 0) && (weight >= 0) && (step >= 0) && (calorie >= 0))
      this.valid = true
    else
      this.valid = false

    if (this.valid) {
      this.setState({ valid: true })
      this.props.postData(this.props.uname, this.props.ubase64, height, weight, step, calorie)
    } else {
      this.setState({ valid: false })
    }
  }

  render() {
    if (this.props.loginStatus === 1) {
      return (
        <div>
          <Link to={'/dietgraph'}>그래프 메인으로 돌아가기</Link>
          <table className="diet-table">
            <tr className="diet-tr">
              <td className="diet-td">신장</td>
              <td className="diet-td"><input min="0" className="diet-input" type="number" step="1" ref={ref=>this.height=ref}/></td>
            </tr>
            <tr className="diet-tr">
              <td className="diet-td">몸무게</td>
              <td className="diet-td"><input min="0" className="diet-input" type="number" step="1" ref={ref=>this.weight=ref}/></td>
            </tr>
            <tr className="diet-tr">
              <td className="diet-td">걸음수</td>
              <td className="diet-td"><input min="0" className="diet-input" type="number" step="1" ref={ref=>this.step=ref}/></td>
            </tr>
            <tr className="diet-tr">
              <td className="diet-td">칼로리</td>
              <td className="diet-td"><input min="0" className="diet-input" type="number" step="1" ref={ref=>this.calorie=ref}/></td>
            </tr>
          </table>
          {(this.state.valid) ? '' : '0 이상의 정수를 입력해주세요'}
          <Button onClick={this.onSubmit} text="포스트하기"/>
       </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

let mapStateToProps=(state)=>{
  return {
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    loginStatus: state.login_reducer.loginStatus,

  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    postData: (uname, ubase64, height, weight, step, calorie) => dispatch(PostDietDataRequest(uname, ubase64, height, weight, step, calorie))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DietGraphPost);
