import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Like from '../Like';
import { connect } from 'react-redux';

import { PostLikeRequest, DeleteLikeRequest, GetLikeRequest } from '../../actions';

class LikeList extends Component {
  constructor() {
    super();
  }
  onGet(e){
    //console.log(e.target.id)
    var tmp = e.target.id
    this.props.getComment(tmp.split('-')[1], this.props.ubase64)
  }

  onSubmit(e){
    var tmp = e.target.id
    this.props.postComment(tmp.split('-')[1], this.props.ubase64, this.props.uname);
    //this.props.onGet();
  }

  onDelete(e){
    var tmp = e.target.id
    this.props.deleteLike(tmp.split('-')[1], this.props.ubase64);
  }

  render() {
   var comment_id = (this.props.comment_id) ? this.props.comment_id : 0;
   var like_list = []
   var target = this.props.article_id

   if (this.props.loginStatus === 1) {
      let like = false;
      for (var i = 0; i < this.props.like_list.length; i++) {
          like_list.push(like_list[i])
          if (this.props.like_list[i].author === this.props.uname)
            like = true;

      }
      //console.log(target + '_' + comment_id)
      //console.log(like_list)

      if (like_list.length === 0) {
        return (
          <div className="Like">
            <div>
             아직 아무도 좋아요한 사람이 없습니다.
            </div>
            <div>
              <button className="Like-button" id={"like-"+this.props.article_id+'_'+comment_id} onClick={this.onSubmit.bind(this)}>좋아요</button>
              <button className="Like-button" id={"update_like-"+this.props.article_id+'_'+comment_id} onClick={this.onGet.bind(this)}>좋아요 불러오기</button>
            </div>
          </div>
        );
      } else if (!like) {
        return (
          <div className="Like">
            <div>
              {this.props.like_list.map(function(item,i){
                return (
                  <div>
                    <Like author={item.author}/>
                  </div>
                )
              })}
            님이 좋아합니다.
            </div>
            <div>
              <button className="Like-button" id={"like-"+this.props.article_id+'_'+comment_id} onClick={this.onSubmit.bind(this)}>좋아요</button>
              <button className="Like-button" id={"update_like-"+this.props.article_id+'_'+comment_id} onClick={this.onGet.bind(this)}>좋아요 불러오기</button>
            </div>
          </div>
        );
      } else if (like) {
        return (
          <div className="Like">
            <div>
              {this.props.uname}님 외 {like_list.length-1}명이 좋아합니다.
            </div>
            <div>
              <button className="Like-button" id={"like-"+this.props.article_id+'_'+comment_id} onClick={this.onDelete.bind(this)}>좋아요 취소</button>
              <button className="Like-button" id={"update_like-"+this.props.article_id+'_'+comment_id} onClick={this.onGet.bind(this)}>좋아요 불러오기</button>
            </div>
          </div>
        );
     }

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
    deleteLike: (id, ubase64)=>dispatch(DeleteLikeRequest(id, ubase64)),
    postComment: (id, ubase64, author)=>dispatch(PostLikeRequest(id, ubase64, author)),
    getComment: (id, ubase64)=>dispatch(GetLikeRequest(id, ubase64))
  };
}
//export default ArticleList
export default connect(mapStateToProps, mapDispatchToProps)(LikeList);
