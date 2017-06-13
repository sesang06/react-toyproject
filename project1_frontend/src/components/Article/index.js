import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import CommentList from '../CommentList'
import LikeList from '../LikeList'
import Editor from '../Editor'
import defaultprofile from '../../img/defaultprofile.png'
//import defaultprofile from '../../../img/defaultprofile.png'
import { DeleteArticleRequest, UpdateArticleRequest, GetArticleRequest_WITH_ID } from '../../actions/';

class Article extends Component{
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
     this.props.deleteArticle(this.props.ubase64, this.props.id)
  }

  onUpdate() {
    this.setState({update:!this.state.update, });
    console.log(this.state.update)
    // this.props.updateArticle(this.props.ubase64, newtext)
  }
  onGet(){
    this.props.getArticle(this.props.ubase64, this.props.id)
  }
/*  <button onClick={this.onDelete.bind(this)} className="Article-button">수정</button>
  <button onClick={this.onUpdate.bind(this)} className="Article-button">삭제</button>
*/
  onPostUpdate(){
    if(this.state.editorHtml!=="" && this.state.editorHtml!== "<p><br></p>" && this.state.editorHtml!== "<p></p>")
    this.props.updateArticle(this.props.ubase64, this.props.id,this.state.editorHtml)
  }
  handleChange(e){
    let nextState={}
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);

  }
  handleHtmlChange(html){
    this.setState({ editorHtml: html });

  }
  //    <textarea className="Article-post" cols="120" rows="4" id="text_timeline" name="content" onChange={this.handleChange} value={this.state.content} />
  //    <p>{this.props.content}</p>

  render(){
    const updateform=(
      <div>
        <Editor id="Article-post" readOnly={false} defaultValue={this.props.content} onChange={this.handleHtmlChange.bind(this)}/>

        <button className="Article-button"  id="post_timeline" onClick={this.onPostUpdate.bind(this)} >수정하기</button>
      </div>
    )
    const deletebutton=(<div>
      <button onClick={this.onDelete.bind(this)} className="Article-button">삭제</button>
      <button onClick={this.onUpdate.bind(this)} className="Article-button">수정</button>
        </div>
    )

    const contentform=(
      <div>
      <div className="Article-author">
      <ProfileLabel src={this.props.avatar}/>
      {this.props.nickname!==null?"닉네임: ":"글쓴이: "}<label>{this.props.nickname!==null?this.props.nickname:this.props.author}</label>
      </div>
      <div className="Article-date">
      작성일: <label>{this.props.created_time.getMonth()+1}-{this.props.created_time.getDate()}</label>&nbsp;
      수정일: <label>{this.props.updated_time.getMonth()+1}-{this.props.updated_time.getDate()}</label>
      </div>

      <div className="Article-content">
      <Editor readOnly={true} onChange={this.handleHtmlChange.bind(this)} defaultValue={this.props.content} />

      </div>
      </div>
    )
    return (
      <div className="Article">

              {(this.state.update)?updateform:contentform}
              <div>
              <button id={"update_article-"+this.props.id} onClick={this.onGet.bind(this)} className="Article-button">글 다시 불러오기</button>
              </div>
              <div className="Article-like">
              <LikeList article_id={this.props.id} like_list={this.props.like_list}/>
              </div>

              {(this.props.author===this.props.uname)?deletebutton:""}
              <div>
              좋아요 수: <label>{this.props.likes_count}</label>&nbsp;
              댓글 수 : <label>{this.props.comments_count}</label>&nbsp;
              게시글 id: <label>{this.props.id}</label>
              </div>

              <div className="Article-comment">
              <CommentList article_id={this.props.id} comment_list={this.props.comment_list}/>
              </div>
      </div>
    )
  }
}

class ProfileLabel extends Component{
  render(){
    if (this.props.src===null){
    return (
      <div>
      <img src={defaultprofile} width="100" height="100"/>

      </div>
    );
  }else{
     return(
      <div>
      <img src={this.props.src} width="100" height="100"/>
      </div>
    );
  }
}
}
let mapStateToProps=(state)=>{
  return {
    ubase64: state.login_reducer.ubase64,
    uname: state.login_reducer.uname,

  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    deleteArticle: (ubase64,id)=>dispatch(DeleteArticleRequest(ubase64,id)),
    updateArticle: (ubase64,id, content)=>dispatch(UpdateArticleRequest(ubase64,id,content)),
    getArticle: (ubase64, id) =>  dispatch(GetArticleRequest_WITH_ID(ubase64, id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
