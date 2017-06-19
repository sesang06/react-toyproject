import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import LikeList from '../LikeList'
import Editor from '../Editor'

import { Link } from 'react-router-dom';

import defaultprofile from '../../img/defaultprofile.png'
import {  DeleteCommentRequest, UpdateCommentRequest,  } from '../../actions';


class Comment extends Component{

  constructor(props) {
    super(props);
    this.state={
      update: false,
       editorHtml: ''

    }
    this.handleChange=this.handleChange.bind(this)
  };

  componentWillReceiveProps(){
    this.state={
      update: false,
      editorHtml: ''
    }

  }
  onDelete() {
    console.log("DeleteArticle")
     this.props.deleteComment(this.props.ubase64,this.props.article_id, this.props.id)
  }

  onUpdate() {
    this.setState({update:!this.state.update, });
    console.log(this.state.update)
  }
  onPostUpdate(){
    if(this.state.editorHtml!=="" && this.state.editorHtml!== "<p><br></p>" && this.state.editorHtml!== "<p></p>")
    this.props.updateComment(this.props.ubase64,this.props.article_id ,this.props.id,this.state.editorHtml)
  }
  handleChange(e){
    let nextState={}
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);

  }
  handleHtmlChange(html){
    this.setState({ editorHtml: html });

  }
  render(){

    const updateform=(
      <div>
        <Editor id="Comment-post" readOnly={false} defaultValue={this.props.content} onChange={this.handleHtmlChange.bind(this)}/>

        <button className="Comment-button"  id="modify_comment" onClick={this.onPostUpdate.bind(this)} >수정하기</button>
      </div>
    )
const deletebutton=(<div>
  <button onClick={this.onDelete.bind(this)} className="Comment-button">삭제</button>
  <button onClick={this.onUpdate.bind(this)} className="Comment-button">수정</button>
    </div>
)

const contentform=(
  <div>

  <div className="Comment-author">
  <div style={{display:'inline-block'}}>
  {(this.props.avatar) ? <div><Link to={'/wall/'+this.props.author}><img src={this.props.avatar} width="100" height="100"/></Link></div>:
  <div><Link to={'/wall/'+this.props.author}><img src={defaultprofile} width="100" height="100"/></Link></div>}
  {this.props.nickname?"닉네임 ":"글쓴이 "}<label>{this.props.nickname?this.props.nickname:this.props.author}</label>
  </div>
 </div>
  <div className="Comment-date">
  작성일 <label id={this.props.created_time_id}>{this.props.created_time.getMonth()+1}월 {this.props.created_time.getDate()}일</label>&nbsp;
  수정일 <label>{this.props.updated_time.getMonth()+1}월 {this.props.updated_time.getDate()}일</label>&nbsp;
  id <label>{this.props.id}</label>
  </div>
  <div className="Comment-content">
  <Editor readOnly={true} id={this.props.text_id} onChange={this.handleHtmlChange.bind(this)} defaultValue={this.props.content}/>

  </div>
  <div>
  좋아요 <label>{this.props.likes_count}</label>개
  </div>

</div>
)

    return (
      <div className="Comment">
      {(this.state.update)?updateform:contentform}
      {(this.props.author===this.props.uname)?deletebutton:""}

          <div>
        <LikeList article_id={this.props.article_id} comment_id={this.props.id} like_list={this.props.like_list}/>
        </div>
      </div>
    )
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
    updateComment: (ubase64,article_id, comment_id, text)=> dispatch(UpdateCommentRequest(ubase64,article_id, comment_id, text)),
    deleteComment: (ubase64,article_id, comment_id)=>dispatch(DeleteCommentRequest(ubase64,article_id, comment_id)),
  };
}
//export default ArticleList
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
