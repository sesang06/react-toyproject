import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Article from '../Article';
import { connect } from 'react-redux';
import Editor from '../Editor'
import { PostArticleRequest, GetArticleRequest, GetFollowRequest } from '../../actions';

class ArticleList extends Component {
  constructor() {
    super();
    this.state = { editorHtml: ''}

    //this.onGet = this.onGet.bind(this)
  }
  onGet(){
    if (this.props.loginStatus === 1) {
      this.props.getArticle(this.props.ubase64)
    }
  }

  componentDidMount(){
    this.onGet()
  }

     componentWillReceiveProps(nextProps){
       if(this.props.loginStatus===0 && nextProps.loginStatus===1)
       this.props.getArticle(nextProps.ubase64)

     }

handleHtmlChange(html){
  this.setState({ editorHtml: html });

}
  onSubmit(){
    if(this.state.editorHtml!=="" && this.state.editorHtml!== "<p><br></p>" && this.state.editorHtml!== "<p></p>"){
    //    console.log(this.newtext.value)
        this.props.postArticle(this.props.ubase64, this.props.author, this.state.editorHtml);
        //this.onGet();
    }
  }

  render() {
   if (this.props.loginStatus === 1) {
      let article_list = this.props.article_list
      /*
      this.props.getFollow(this.props.ubase64)
      let follow_list = this.props.follow_list
      let article_list = []
      for (var index in this.props.article_list) {
        let author = this.props.article_list[index].author
        for (var index2 in follow_list) {
          if (follow_list[index2].follow === author)
            article_list.push(this.props.article_list[index])
        }
        if (this.props.uname === author) article_list.push(this.props.article_list[index])
      }
      */
//      <textarea className="Article-post" cols="120" rows="4" id="text_timeline" ref={ref=>this.newtext=ref} placeholder="Post your status!" />

      return (
        <div>
          <div>
            <ul>
              <li>당신의 타임라인입니다.</li>
              <li>당신의 글은 물론, 팔로우한 사람의 글도 보여줍니다.</li>
              <li>아래 에디터를 이용해 다양한 게시글을 작성해보세요!</li>
            </ul>
          </div>
            <div>
              <Editor id="Article-post" placeholder="당신의 생각을 포스트하세요!" readOnly={false} onChange={this.handleHtmlChange.bind(this)}/>
            </div>
            <div>
              <Button id="post_timeline" onClick={this.onSubmit.bind(this)} text="포스트하기"/>
            </div>
            <div>
              {article_list.slice(0).reverse().map(function(item,i){
                return (
                  <div>
                  <Article id={item.id} author={item.author} content={item.content} created_time={item.created_time} updated_time={item.updated_time} comment_list={item.comment_list} like_list={item.like_list} likes_count={item.likes_count} comments_count={item.comments_count} nickname={item.nickname} avatar={item.avatar}/>

                    </div>
                )
              })}
            </div>

        </div>
      );
    } else {
      return (
        <div>
          <p>로그인이 필요합니다.</p>
        </div>
      );
    }
  }
}


let mapStateToProps=(state)=>{
  return {
    follow_list: state.follow_reducer.follow_list,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    loginStatus: state.login_reducer.loginStatus,
    article_list: state.article_list_reducer.article_list
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    getFollow: (ubase64)=>dispatch(GetFollowRequest(ubase64)),
    postArticle: (ubase64, author, text)=>dispatch(PostArticleRequest(ubase64, author, text)),
    getArticle: (ubase64)=>dispatch(GetArticleRequest(ubase64))
  };
}
//export default ArticleList
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
