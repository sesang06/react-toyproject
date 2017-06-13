import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Comment from '../Comment';
import { connect } from 'react-redux';
import Editor from '../Editor'

import { PostCommentRequest, DeleteCommentRequest, UpdateCommentRequest, GetCommentRequest } from '../../actions';


class CommentList extends Component {
  constructor() {
    super();
    this.state = { editorHtml: ''}

  }
  handleHtmlChange(html){
    this.setState({ editorHtml: html });

  }
  onGet(e){
    //console.log(e.target.id)
    var tmp = e.target.id
    this.props.getComment(tmp.split('-')[1], this.props.ubase64)
   // console.log(this.props.comment_list)
  }
/*
  onSubmit(e){
    if(this.newtext.value!==""){
        //console.log(e.target.id)
        var tmp = e.target.id
        this.props.postComment(tmp.split('-')[1], this.props.ubase64, this.props.uname, this.newtext.value);
        //this.props.getComment(e.target.id, this.props.ubase64)
    }
  }*/

  onSubmit(e){
    if(this.state.editorHtml!=="" && this.state.editorHtml!== "<p><br></p>" && this.state.editorHtml!== "<p></p>"){
    //    console.log(this.newtext.value)
    var tmp = e.target.id
    this.props.postComment(tmp.split('-')[1], this.props.ubase64, this.props.uname, this.state.editorHtml);

    }
  }

//    <textarea cols="100" rows="3" className="Comment-post"  ref={ref=>this.newtext=ref} placeholder="댓글을 입력하세요." />

  render() {
   if (this.props.loginStatus === 1) {
      var target = this.props.article_id
      return (
        <div>
            <div>
              {this.props.comment_list.map(function(item,i){

                return (
                  <div>
                    <div>
                      <Comment author={item.author} article_id={item.article_id} id={item.id} content={item.content} created_time={item.created} updated_time={item.updated} like_list={item.like_list} likes_count={item.likes_count}/>
                    </div>
                  </div>
                )}
              )}
            </div>
                <div>
                <Editor id="Article-post" placeholder="당신의 생각을 댓글로 표현하세요!" id={"text_comment-"+this.props.article_id} readOnly={false} onChange={this.handleHtmlChange.bind(this)}/>

                </div>
                <div>
                <button className="Comment-button" id={'post_comment-'+this.props.article_id} onClick={this.onSubmit.bind(this)}>댓글 달기</button>
                <button className="Comment-button" id={'update_comment-'+this.props.article_id} onClick={this.onGet.bind(this)}>댓글 불러오기</button>
                </div>
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


let mapStateToProps=(state)=>{
  return {
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    loginStatus: state.login_reducer.loginStatus,
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    postComment: (id, ubase64, author, text)=>dispatch(PostCommentRequest(id, ubase64, author, text)),
    getComment: (id, ubase64)=>dispatch(GetCommentRequest(id, ubase64))
  };
}
//export default ArticleList
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
