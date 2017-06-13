import {LOGOUT,LOGIN_SUCCESS, LOGIN_FAIL, POST_LOGIN_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, POST_REGISTER_REQUEST, ID_SUCCESS, ID_FAIL, POST_ID_REQUEST ,SET_ID_VALID ,SET_PASSWORD_VALID,SET_PASSWORD_CHECK_VALID,SET_EMAIL_VALID, RESET_REGISTER} from '../actions'
import {SET_USER_AVATAR, GET_USER_REQUEST, SET_USER_LIST, SET_SENDER, SET_RECEIVER, SET_CHAT_LOG} from '../actions'

import {GET_COMMENT_REQUEST, SET_COMMENT_ID, SET_COMMENT_LIST} from '../actions'
import {GET_ARTICLE_REQUEST, SET_ARTICLE_LIST} from '../actions'
import {GET_LIKE_REQUEST, SET_LIKE_LIST} from '../actions'

import {GET_ARTICLE_REQUEST_WITH_ID, SET_ARTICLE_LIST_WITH_ID} from '../actions'

import {SET_GROUP_LIST_REQUEST, SET_GROUP_NOTICE_REQUEST, SET_GROUP_FORUM_REQUEST} from '../actions'
import {SET_PROFILE_REQUEST} from '../actions'
import {SET_FOLLOW_REQUEST, SET_FOLLOW_ARTICLE_REQUEST} from '../actions'
////////////////
import {SET_IMAGE_REQUEST} from '../actions'

///////////////
import {GET_DIET_GRAPH_REQUEST, SET_DIET_GRAPH_REQUEST} from '../actions'
/////////////////
import {SET_WALL_REQUEST} from '../actions'
/////////////////////////////////////////
import {combineReducers} from 'redux';
//////////////////////////////////////
export const createNewDietGraphState=()=>{
  return {
    dietdatalist:[]
  }
}
export const initialDietGraphState=createNewDietGraphState()
export const dietgrpah_reducer=(state=initialDietGraphState, action)=>{
  switch(action.type){
    case SET_DIET_GRAPH_REQUEST:
    console.log(action.dietdatalist)
      return {
        ...state,
        dietdatalist: action.dietdatalist,
        uname: action.uname
      };
    default:
      return state
  }

}

/////////////////////////////////////

export const createNewWallState=()=>{
  return {
    article_list: []
  }
}

export const initialWallState=createNewWallState()

export const wall_reducer=(state=initialWallState, action)=>{
  switch(action.type){
    case SET_WALL_REQUEST:
      return {
        ...state,
        article_list: action.article_list
      };
    default:
      return state
  }
}

/////////////////////////////////////
export const createNewImageState=()=>{
  return {
    imagelist:[]
  }
}
export const initialImageState=createNewImageState()
export const image_reducer=(state=initialImageState, action)=>{
  switch(action.type){
    case SET_IMAGE_REQUEST:
    console.log(action.imagelist)
      return {
        ...state,
        imagelist: action.imagelist
      };
    default:
      return state
  }

}

export const createNewFollowState=()=>{
  return {
    follow_list: [],
    follow_article_list: []
  }
}

export const initialFollowState = createNewFollowState()

export const follow_reducer=(state=initialFollowState, action)=>{
  switch(action.type){
    case SET_FOLLOW_REQUEST:
      return {
        ...state,
        follow_list: action.follow_list
      };
    case SET_FOLLOW_ARTICLE_REQUEST:
      return {
        ...state,
        follow_article_list: action.follow_article_list
      };
    default:
      return state
  }
}

//////////////////////////////////////
export const createNewProfileState=()=>{
  return{
    email:null,
    nickname:null,
    avatar: null,
    first_name:null,
    last_name:null,
    last_login:null,
    date_joined: null

  }
}
export const initialProfileState=createNewProfileState()

export const profile_reducer=(state=initialProfileState, action)=>{
  switch(action.type){
    case SET_PROFILE_REQUEST:
      return {
        ...state,
        email:action.email,
        nickname:action.nickname,
        avatar:action.avatar,
        first_name:action.first_name,
        last_name:action.last_name,
        last_login:action.last_login,
        date_joined:action.date_joined

        };
    default:
      return state
  }
}
/*"id": 26,
   "username": "sesang08",
   "email": "sssqasss@naver.com",
   "userprofile": {
       "nickname": "11",
       "avatar": null
   },
   "first_name": "dd",
   "last_name": "",
   "groups": [],
   "is_staff": true,
   "is_active": true,
   "last_login": "2017-05-27T15:01:49.517841Z",
   "date_joined": "2017-05-27T09:07:06.884121Z",
   "is_superuser": true,
   "user_permissions": []
*/

//////////////////////////

export const createNewGroupForumState=()=>{
  return {
    forum_list: []
  }
}

export const initialGroupForumState = createNewGroupForumState()

export const group_forum_reducer=(state=initialGroupForumState, action)=>{
  switch(action.type){
    case SET_GROUP_FORUM_REQUEST:
      return {
        ...state,
        forum_list: action.forum_list
      };
    default:
      return state
  }
}

//////////////////////////////////////

export const createNewGroupNoticeState=()=>{
  return {
    notice_list: []
  }
}

export const initialGroupNoticeState = createNewGroupNoticeState()

export const group_notice_reducer=(state=initialGroupNoticeState, action)=>{
  switch(action.type){
    case SET_GROUP_NOTICE_REQUEST:
      return {
        ...state,
        notice_list: action.notice_list
      };
    default:
      return state
  }
}

//////////////////////////////////////

export const createNewGroupListState=()=>{
  return {
    group_list: []
  }
}

export const initialGroupListState=createNewGroupListState()

export const group_list_reducer=(state=initialGroupListState, action)=>{
  switch(action.type){
    case SET_GROUP_LIST_REQUEST:
      return {
        ...state,
        group_list: action.group_list
      };
    default:
      return state
  }
}

///////////////////////////////////////////
export const createNewArticleState=()=>{
  let article={
    id: 0,
    author:"",
    content:"",
    created_time:new Date(),
    updated_time:new Date(),
    like_list:[],
    comment_list:[],
    likes_count:0,
    comments_count:0
  }
}
export const initialArticleState=createNewArticleState()

export const createNewArticleListState=()=>{
  return{
/*
    article_list:[{ubase64:"",
    author:"d",
    text:"ss",
    created_time:"aa",
    comment_list:[{author:"댓글1",text:"댓글내용",    created_time:"모월모일", like_list:[{author:"좋아요댓글"}] }],
    like_list:[{author:"좋아요포스트"}]
  },
  {ubase64:"",
  author:"d꾸앙",
  text:"ssㄴㄴ",
  created_time:"aa",
  like_list:[],
  comment_list:[{author:"댓글2",text:"댓글내용", created_time:"모월모일", like_list:[]}],
  },
],
*/
  article_list: []
  }
}

export const initialArticleListState=createNewArticleListState()

/////////////////////////////////////

export const addCommentlistToArticle= (article, action)=>{


  if (article.id!== action.article_id){
    return article
  }
  return{
    ...article,
    comment_list:action.comment_list
  }

}

export const addLikelistToArticle= (article, action)=> {

    if (article.id!== action.id1){
      return article
    }
    return{
      ...article,
      like_list:action.like_list
    }

}
export const addLikelistToComment = (comment, action) =>{
  if (comment.id !== action.id2){
    return comment
  }
  return {
    ...comment,
    like_list:action.like_list
  }
}
export const addLikelistToComment_with_article = (article, action) =>{
  if (article.id !== action.id1){
    return article
  }
  return {
    ...article,
    comment_list : article.comment_list.map(t=>
      addLikelistToComment(t, action)
  )}
}
export const getArticlelistToArticle=(article, action)=>{
  if (article.id !== action.id){
    return article
  }
  return action.article
}
export const article_list_reducer=(state=initialArticleListState, action)=>{
  switch(action.type){
    case LOGOUT:
      return{
        ...state,
        article_list:[]
      }
    case GET_ARTICLE_REQUEST:
      return {
        ...state,
        ubase64: action.ubase64
      };
    case SET_ARTICLE_LIST:
      console.log(action.article_list)
      return {
        ...state,
        article_list: action.article_list
      };
    case SET_COMMENT_LIST:
      return{
       ...state,
       article_list:  state.article_list.map(t=>
        addCommentlistToArticle(t,action)
      )}
    case SET_LIKE_LIST:
      if (action.id2 === 0)
      return {
        ...state,
        article_list:  state.article_list.map(t=>
         addLikelistToArticle(t,action)
       )}
      return {
        ...state,
        article_list:  state.article_list.map(t=>
         addLikelistToComment_with_article(t,action)
       )}
    case SET_ARTICLE_LIST_WITH_ID:
       return {
         ...state,
         article_list: state.article_list.map(t =>
           getArticlelistToArticle(t,action)
         )
       }
    default:
      return state
  }
}

export const article_reducer=(state=initialArticleState, action)=>{
  switch(action.type){
    default:
      return state
  }
}

///////////////////////


////////////////////////////
export const createNewCommentState=()=>{
  return{
    article_id: "",
    ubase64: "",
    author:"",
    text:"",
    created_time:"",
    comment_list: [],
    like_list:[]
  }
}


export const initialCommentState=createNewCommentState()

export const comment_reducer=(state=initialCommentState, action)=>{
  switch(action.type){
    case GET_COMMENT_REQUEST:
      return {
        ...state,
        ubase64: action.ubase64
      }
    case SET_COMMENT_ID:
      return {
        ...state,
        article_id: action.article_id
      }
    case SET_COMMENT_LIST:
      return{
        ...state,
        comment_list: action.comment_list
      }
    default:
      return state
  }
}
/////////////////////////////////
export const createNewLikeState=()=>{
  return{
    author:"",
    like_list: []
  }
}

export const initialLikeState=createNewLikeState()

export const like_reducer=(state=initialLikeState,action)=>{
  switch(action.type){
    case GET_LIKE_REQUEST:
      return {
        ...state
      }
    case SET_LIKE_LIST:
      return {
        ...state,
        like_list: action.like_list
      }
    default:
      return state
  }
}

/////////////////////////////



///////////////////////////////////////////////
export const createNewChatState=()=>{
  return {
    uname: "",
    ubase64: "",
    valid: false,
    receiver: "",
    chatlog: []
  };
}

export const initialChatState=createNewChatState()

export const chat_reducer=(state=initialChatState, action)=>{
  switch(action.type){
    case SET_SENDER:
      return {
        ...state,
        uname: action.uname,
        ubase64: action.ubase64
      };
    case SET_RECEIVER:
      return {
        ...state,
        valid: true,
        receiver: action.receiver
      };
    case SET_CHAT_LOG:
      return {
        ...state,
        chatlog: action.chatlog
      };
    default:
      return state
  }
}

export const createNewUserListState=()=>{
  return {
    uname: "",
    ubase64: "",
    usernames: [],
    avatar: []
  };
}

export const initialUserListState=createNewUserListState()

export const userlist_reducer=(state=initialUserListState, action)=>{
  switch(action.type){
    case GET_USER_REQUEST:
      return {
        ...state,
        uname: action.uname,
        ubase64: action.ubase64
      }
    case SET_USER_LIST:
      return {
        ...state,
        usernames: action.usernames
      }
    case SET_USER_AVATAR:
      return {
        ...state,
        avatar: action.avatars
      }
    default:
      return state
  }
}


export const createNewLoginState=()=>{
  return {
    login_entered: false,
    login_fail: false,
    uname: "",
    ubase64: "",
    loginStatus: 0
  };
}

export const initialLoginState=createNewLoginState()

export const createNewRegisterState=()=>{
  return {
  register_entered: false,
  register_fail: false,
  id_entered: false,
  id_fail: false,
  uname:"",
  uemail: "",
  idValid: 0, //0: default, 1: id is empty 2: id is not valid 3: id is valid, but it already exists in database 4: id is valid and it doesn't exist in database
  passwordValid: 0, //0: default, 1: password is empty 2: password is not valid 3: password is valid
  passwordCheckValid: 0, //0: default, 1:passwordValid is empty 2: passwordcheck is not same as password  3: passwordcheck is valid
  emailValid:0, //0 : default, 1: email is empty 2: email is not valid 3: email is valid
  registerValid:0 //0 : default, 1: fail register 2: succeed register
};
}
export const initialRegisterState=createNewRegisterState()
export const login_reducer=(state=initialLoginState, action)=>{
  switch(action.type){
    case LOGIN_SUCCESS:
    return {
      ...state,
      login_entered: true,
      login_fail:false,
      uname: action.uname,
      ubase64: action.ubase64,
      loginStatus: 1
    }
    case LOGIN_FAIL:
    return {
        ...state,
        login_entered:false,
        login_fail:true,
        loginStatus:-1
    }
    case LOGOUT:
    return initialLoginState;
    default:
      return state
  }
}
export const register_reducer=(state=initialRegisterState, action)=>{
  switch (action.type) {
    case RESET_REGISTER:
    return initialRegisterState;

    case REGISTER_SUCCESS:
    return {
      ...state,
      register_entered: true,
      register_fail: false,
      registerValid: 2,
      uname:action.uname,
      uemail:action.uemail
    }
    case REGISTER_FAIL:
    return {
      ...state,
      register_entered: false,
      register_fail: true,
      registerValid: 1
    }
    case ID_SUCCESS:
    return {
      ...state,
      id_entered: true,
      id_fail: false,
      idValid: 4
    }
    case ID_FAIL:
    return {
      ...state,
      id_entered: false,
      id_fail: true,
      idValid: 3
    }
    case SET_ID_VALID:
    return{
      ...state,
      idValid: action.idValid
    }
    case SET_PASSWORD_VALID:
    return{
      ...state,
      passwordValid: action.passwordValid
    }
    case SET_PASSWORD_CHECK_VALID:
    return{
      ...state,
      passwordCheckValid: action.passwordCheckValid
    }
    case SET_EMAIL_VALID:
    return{
      ...state,
      emailValid: action.emailValid
    }
    default:
    return state

  }
}

export const app_reducer=combineReducers({
  login_reducer,
  register_reducer,
  userlist_reducer,
  chat_reducer,
  article_list_reducer,
  comment_reducer,
  like_reducer,
  group_list_reducer,
  group_notice_reducer,
  group_forum_reducer,
  profile_reducer,
  follow_reducer,
  image_reducer,
  wall_reducer,
  dietgrpah_reducer,
});
export default app_reducer;
