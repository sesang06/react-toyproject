import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Article from '../Article';
import Search from '../Search';
import { connect } from 'react-redux';

import { GetWallRequest, GetArticleRequest, GetUserRequest } from '../../actions';

class WallList extends Component {
  constructor() {
    super();
    this.onGet = this.onGet.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    console.log(e.target.id)
    this.props.getWall(e.target.id, this.props.ubase64)
  }

  onGet() {
    this.props.getWall(this.props.uname, this.props.ubase64)
    //this.props.getArticle(this.props.ubase64)
  }

  render() {
    this.props.getUser(this.props.uname, this.props.ubase64)

    if (this.props.loginStatus === 1) {
      let article_list = []
      for (var index in this.props.article_list) {
        let author = this.props.article_list[index].author
        if (this.props.uname === author) article_list.push(this.props.article_list[index])
      }

      return (
        <div>
          <div>
            <Search onClick={this.onClick} list={this.props.usernames} />
            <Button id="get_my_wall" onClick={this.onGet} text="내 담벼락 불러오기"/>
          </div>
          <div>
            {article_list.slice(0).reverse().map(function(item, i) {
              return (
                <div>
                  <Article id={item.id} author={item.author} content={item.content} created_time={item.created_time} updated_time={item.updated_time} comment_list={item.comment_list} like_list={item.like_list} likes_count={item.likes_count} comments_count={item.comments_count} nickname={item.nickname} avatar={item.avatar}/>
                </div>
              )
            })}
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

let mapStateToProps = (state) => {
  return {    
    usernames: state.userlist_reducer.usernames,
    article_list: state.article_list_reducer.article_list,
    //article_list: state.wall_reducer.article_list, 
    loginStatus: state.login_reducer.loginStatus,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    getUser: (uname, ubase64)=>dispatch(GetUserRequest(uname, ubase64)),
    getArticle: (ubase64)=>dispatch(GetArticleRequest(ubase64)),
    getWall: (uname, ubase64)=>dispatch(GetWallRequest(uname, ubase64)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WallList);
