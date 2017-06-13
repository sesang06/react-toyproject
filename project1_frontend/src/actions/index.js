export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const LOGIN_FAIL='LOGIN_FAIL';
export const POST_LOGIN_REQUEST='POST_LOGIN_REQUEST';
export const REGISTER_SUCCESS='REGISTER_SUCCESS';
export const REGISTER_FAIL='REGISTER_FAIL';
export const POST_REGISTER_REQUEST='POST_REGISTER_REQUEST';
export const ID_SUCCESS='ID_SUCCESS'
export const ID_FAIL='ID_FAIL'
export const POST_ID_REQUEST='POST_ID_REQUEST'
////////////////////////////////////////////////////////////////////////////
export const SET_ID_VALID='SET_ID_VALID'
export const SET_PASSWORD_VALID='SET_PASSWORD_VALID'
export const SET_PASSWORD_CHECK_VALID='SET_PASSWORD_CHECK_VALID'
export const SET_EMAIL_VALID='SET_EMAIL_VALID'
export const RESET_REGISTER='RESET_REGISTER'
export const LOGOUT='LOGOUT'
///////////////////////////////////////////////////////
export const GET_USER_REQUEST='GET_USER_REQUEST';
export const SET_USER_LIST='SET_USER_LIST';
export const SET_SENDER='SET_SENDER';
export const SET_RECEIVER='SET_RECEIVER';
export const POST_CHAT_REQUEST='POST_CHAT_REQUEST';
export const GET_CHAT_REQUEST='GET_CHAT_REQUEST';
export const SET_CHAT_LOG="SET_CHAT_LOG";
export const SET_USER_AVATAR="SET_USER_AVATAR";
////////////////////////////////////////////////////////////

export const POST_ARTICLE_REQUEST='POST_ARTICLE_REQUEST'
export const UPDATE_ARTICLE_REQUEST='UPDATE_ARTICLE_REQUEST'
export const DELETE_ARTICLE_REQUEST='DELETE_ARTICLE_REQUEST'
export const GET_ARTICLE_REQUEST='GET_ARTICLE_REQUEST'
export const SET_ARTICLE_LIST='SET_ARTICLE_LIST'
export const GET_ARTICLE_REQUEST_WITH_ID= 'GET_ARTICLE_REQUEST_WITH_ID'
export const SET_ARTICLE_LIST_WITH_ID='SET_ARTICLE_LIST_WITH_ID'
////////////////////////////////////

export const POST_COMMENT_REQUEST='POST_COMMENT_REQUEST'
export const UPDATE_COMMENT_REQUEST='UPDATE_COMMENT_REQUEST'
export const DELETE_COMMENT_REQUEST='DELETE_COMMENT_REQUEST'
export const GET_COMMENT_REQUEST='GET_COMMENT_REQUEST'
export const GET_COMMENT_REQUEST_WITH_ID='GET_COMMENT_REQUEST_WITH_ID'

export const SET_COMMENT_ID='SET_COMMENT_ID'
export const SET_COMMENT_LIST='SET_COMMENT_LIST'
export const SET_COMMENT_LIST_WITH_ID= 'SET_COMMENT_LIST_WITH_ID'
///////////////////////////////
export const POST_LIKE_REQUEST='POST_LIKE_REQUEST'
export const DELETE_LIKE_REQUEST='DELETE_LIKE_REQUEST'
export const GET_LIKE_REQUEST='GET_LIKE_REQUEST'
export const SET_LIKE_LIST='SET_LIKE_LIST'
///////////////////////////////////////
export const GET_GROUP_LIST_REQUEST='GET_GROUP_LIST_REQUEST'
export const SET_GROUP_LIST_REQUEST='SET_GROUP_LIST_REQUEST'
export const POST_GROUP_LIST_REQUEST='POST_GROUP_LIST_REQUEST'
///////////////////////////////////////
export const GET_GROUP_MEMBER_REQUEST='GET_GROUP_MEMBER_REQUEST'
export const POST_GROUP_MEMBER_REQUEST='POST_GROUP_MEMBER_REQUEST'
export const DELETE_GROUP_MEMBER_REQUEST='DELETE_GROUP_MEMBER_REQUEST'
///////////////////////////////////////
export const GET_GROUP_NOTICE_REQUEST='GET_GROUP_NOTICE_REQUEST'
export const POST_GROUP_NOTICE_REQUEST='POST_GROUP_NOTICE_REQUEST'
export const SET_GROUP_NOTICE_REQUEST='SET_GROUP_NOTICE_REQUEST'
///////////////////////////////////////
export const GET_GROUP_FORUM_REQUEST='GET_GROUP_FORUM_REQUEST'
export const POST_GROUP_FORUM_REQUEST='POST_GROUP_FORUM_REQUEST'
export const SET_GROUP_FORUM_REQUEST='SET_GROUP_FORUM_REQUEST'
///////////////////////////////////////
export const POST_IMAGE_REQUEST='POST_IMAGE_REQUEST'

///////////////////////////////////////////////////
export const GET_PROFILE_REQUEST='GET_PROFILE_REQUEST'
export const UPDATE_PROFILE_REQUEST='UPDATE_PROFILE_REQUEST'
export const SET_PROFILE_REQUEST='SET_PROFILE_REQUEST'

////////////////////////////////////////
export const GET_FOLLOW_REQUEST='GET_FOLLOW_REQUEST'
export const POST_FOLLOW_REQUEST='POST_FOLLOW_REQUEST'
export const DELETE_FOLLOW_REQUEST='DELETE_FOLLOW_REQUEST'
export const SET_FOLLOW_REQUEST='SET_FOLLOW_REQUEST'
export const GET_FOLLOW_ARTICLE_REQUEST='GET_FOLLOW_ARTICLE_REQUEST'
export const SET_FOLLOW_ARTICLE_REQUEST='SET_FOLLOW_ARTICLE_REQUEST'
////////////////////////////////////////
export const GET_IMAGE_REQUEST='GET_IMAGE_REQUEST'
export const SET_IMAGE_REQUEST='SET_IMAGE_REQUEST'
export const DELETE_IMAGE_REQUEST='DELETE_IMAGE_REQUEST'
////////////////////////////////////////
export const SET_DIET_GRAPH_REQUEST= "SET_DIET_GRPAH_REQUEST"
export const GET_DIET_GRAPH_REQUEST= "GET_DIET_GRAPH_REQUEST"
///////////////////////////////////////
export const GET_WALL_REQUEST='GET_WALL_REQUEST'
export const SET_WALL_REQUEST='SET_WALL_REQUEST'

export const GetDietGraphRequest=(uname, ubase64)=>{
  return{
    type: GET_DIET_GRAPH_REQUEST,
    uname,
    ubase64
  }
}


export const SetDietGraphRequest=(uname, dietdatalist)=>{
  return{
    type: SET_DIET_GRAPH_REQUEST,
    uname,
    dietdatalist
    }
}


//////////////////////////////////////////
export const GetWallRequest=(uname, ubase64)=>{
  return {
    type: GET_WALL_REQUEST,
    uname,
    ubase64
  }
}

export const SetWallRequest=(article_list)=>{
  return {
    type: SET_WALL_REQUEST,
    article_list
  }
}

////////////////////////////////////////

export const DeleteImageRequest=(ubase64,idlist)=>{
  return{
    type: DELETE_IMAGE_REQUEST,ubase64,idlist

  }
}

export const GetImageRequest=(ubase64)=>{
  return{
    type: GET_IMAGE_REQUEST,ubase64

  }
}

export const SetImageRequest=(imagelist)=>{
  return{
    type: SET_IMAGE_REQUEST,imagelist

  }
}

export const PostImageRequest=(ubase64,files)=>{
  return{
    type: POST_IMAGE_REQUEST,
    ubase64,
    files
  }
}

export const GetFollowArticleRequest=(ubase64, id)=>{
  return {
    type: GET_FOLLOW_ARTICLE_REQUEST,
    ubase64,
    id
  }
}

export const SetFollowArticleRequest=(follow_article_list)=>{
  return {
    type: SET_FOLLOW_ARTICLE_REQUEST,
    follow_article_list
  }
}

export const GetFollowRequest=(ubase64)=>{
  return {
    type: GET_FOLLOW_REQUEST,
    ubase64
  }
}

export const PostFollowRequest=(ubase64, follow)=>{
  return {
    type: POST_FOLLOW_REQUEST,
    ubase64,
    follow
  }
}

export const DeleteFollowRequest=(ubase64, id)=>{
  return {
    type: DELETE_FOLLOW_REQUEST,
    ubase64,
    id
  }
}

export const SetFollowRequest=(follow_list)=>{
  return {
    type: SET_FOLLOW_REQUEST,
    follow_list
  }
}

////////////////////////////////////////

export const GetProfileRequest=(ubase64)=>{
  return {
    type: GET_PROFILE_REQUEST,
    ubase64
  }
}
/*
email:state.profile_reducer.email,
nickname:state.profile_reducer.nickname,
avatar: state.profile_reducer.avatar,
first_name:state.profile_reducer.first_name,
last_name:state.profile_reducer.last_name,
last_login:state.profile_reducer.last_login,
date_joined: state.profile_reducer.date_joined
*/
export const UpdateProfileReqeust=(ubase64, nickname, avatar, first_name, last_name)=>{
  return{
    type: UPDATE_PROFILE_REQUEST,
    ubase64, nickname, avatar, first_name, last_name,
  }
}


export const SetProfileReqeust=( email, nickname, avatar, first_name, last_name, last_login, date_joined)=>{
console.log(email)
console.log(nickname)
console.log(avatar)
console.log(first_name)
console.log(last_name)
console.log(last_login)
console.log(date_joined)
  return{
    type: SET_PROFILE_REQUEST,
    email, nickname, avatar, first_name, last_name, last_login, date_joined
  }
}



//////////////////////////////////////////////////
export const GetGroupForumRequest=(ubase64, group_id)=>{
  return {
    type: GET_GROUP_FORUM_REQUEST,
    ubase64,
    group_id
  }
}

export const PostGroupForumRequest=(ubase64, group_id, text)=>{
  return {
    type: POST_GROUP_FORUM_REQUEST,
    ubase64,
    group_id,
    text
  }
}

export const SetGroupForumRequest=(forum_list)=>{
  return {
    type: SET_GROUP_FORUM_REQUEST,
    forum_list
  }
}

///////////////////////////////////////

export const GetGroupNoticeRequest=(ubase64, group_id)=>{
  return {
    type: GET_GROUP_NOTICE_REQUEST,
    ubase64,
    group_id
  }
}

export const PostGroupNoticeRequest=(ubase64, group_id, text)=>{
  return {
    type: POST_GROUP_NOTICE_REQUEST,
    ubase64,
    group_id,
    text
  }
}

export const SetGroupNoticeRequest=(notice_list)=>{
  return {
    type: SET_GROUP_NOTICE_REQUEST,
    notice_list
  }
}

///////////////////////////////////////

export const GetGroupMemberRequest=(ubase64, group_id)=>{
  return {
    type: GET_GROUP_MEMBER_REQUEST,
    ubase64,
    group_id
  }
}

export const PostGroupMemberRequest=(ubase64, group_id)=>{
  return {
    type: POST_GROUP_MEMBER_REQUEST,
    ubase64,
    group_id
  }
}

export const DeleteGroupMemberRequest=(ubase64, group_id)=>{
  return {
    type: DELETE_GROUP_MEMBER_REQUEST,
    ubase64,
    group_id
  }
}

///////////////////////////////////////

export const PostGroupListRequest=(ubase64, group_name)=>{
  return {
    type: POST_GROUP_LIST_REQUEST,
    ubase64,
    group_name
  }
}

export const SetGroupListRequest=(group_list)=>{
  return {
    type: SET_GROUP_LIST_REQUEST,
    group_list
  }
}

export const GetGroupListRequest=(ubase64)=>{
  return {
    type: GET_GROUP_LIST_REQUEST,
    ubase64
  }
}

/////////////////////////////////////////////////////////

export const PostArticleRequest=(ubase64,author,text)=>{
  return{
    type: POST_ARTICLE_REQUEST,
    ubase64,
    author,
    text
  }
}

export const DeleteArticleRequest=(ubase64,id)=>{
  return {
    type: DELETE_ARTICLE_REQUEST,
    ubase64,
    id
  }
}

export const UpdateArticleRequest=(ubase64, id, content)=>{
  return {
    type: UPDATE_ARTICLE_REQUEST,
    ubase64,
    id,
    content
  }
}

export const GetArticleRequest=(ubase64)=>{
  return{
    type: GET_ARTICLE_REQUEST,
    ubase64
  }
}
export const GetArticleRequest_WITH_ID=(ubase64,id)=>{
  return{
    type: GET_ARTICLE_REQUEST_WITH_ID,
    ubase64, id
  }
}

export const SetArticleList=(article_list)=>{
  return{
    type: SET_ARTICLE_LIST,
    article_list
  }
}

export const SetArticleList_WITH_ID=(article, id)=>{
  return {
    type: SET_ARTICLE_LIST_WITH_ID,
    article,
    id
  }
}
///////////////////////////
export const PostCommentRequest=(id, ubase64,author,text)=>{
  return{
    type: POST_COMMENT_REQUEST,
    id,
    ubase64,
    author,
    text
  }
}

export const DeleteCommentRequest=(ubase64,article_id, comment_id)=>{
  return {
    type: DELETE_COMMENT_REQUEST,
    ubase64,
    article_id, comment_id
  }
}

export const UpdateCommentRequest=(ubase64,article_id, comment_id, text)=>{
  return {
    type: UPDATE_COMMENT_REQUEST,
    ubase64,
    article_id, comment_id,
    text
  }
}

export const GetCommentRequest=(id, ubase64)=>{
  return{
    type: GET_COMMENT_REQUEST,
    id,
    ubase64
  }
}

export const GetCommentRequest_WITH_ID = (id, ubase64,comment_id)=>{
  return{
    type: GET_COMMENT_REQUEST_WITH_ID,
    id,
    ubase64,
    comment_id
  }

}


export const SetCommentId=(article_id)=>{
  return{
    type: SET_COMMENT_ID,
    article_id
  }
}

export const SetCommentList=(comment_list, article_id)=>{
  console.log('comment_list')
  console.log(comment_list)
  console.log('article_id')
  console.log(article_id)
  return{
    type: SET_COMMENT_LIST,
    comment_list,
    article_id

  }
}

export const SetCommentList_WITH_ID = (comment, article_id, comment_id)=> {
  return {
    type: SET_COMMENT_LIST_WITH_ID,
    comment,
    article_id,
    comment_id
  }
}

///////////////////////////////
export const PostLikeRequest=(id,ubase64,author)=>{
  return{
    type:  POST_LIKE_REQUEST,
    id,
    ubase64,
    author
  }
}

export const DeleteLikeRequest=(id, ubase64)=>{
  return{
    type: DELETE_LIKE_REQUEST,
    id,
    ubase64
  }
}

export const GetLikeRequest=(id, ubase64)=>{
  return{
    type: GET_LIKE_REQUEST,
    id,
    ubase64
  }
}
export const SetLikeList=(like_list,id1,id2)=>{
  return{
    type: SET_LIKE_LIST,
    like_list,
    id1,
    id2
  }
}

//////////////////////////////////////////////////////////////////////
export const SetChatLog=(chatlog)=>{
  return {
    type: SET_CHAT_LOG,
    chatlog
  }
}

export const GetChatRequest=(ubase64)=>{
  return {
    type: GET_CHAT_REQUEST,
    ubase64
  }
}

export const PostChatRequest=(sender, ubase64, receiver, chat)=>{
  return {
    type: POST_CHAT_REQUEST,
    sender,
    ubase64,
    receiver,
    chat
  }
}

export const SetReceiver=(receiver)=>{
  return {
    type: SET_RECEIVER,
    receiver
  }
}

export const SetSender=(uname, ubase64)=>{
  return {
    type: SET_SENDER,
    uname,
    ubase64
  }
}

export const SetUserList=(usernames)=>{
  return {
    type: SET_USER_LIST,
    usernames
  }
}

export const SetUserAvatar=(avatars)=>{
  return {
    type: SET_USER_AVATAR,
    avatars
  }
}

export const GetUserRequest=(uname, ubase64)=>{
  return{
    type: GET_USER_REQUEST,
    uname,
    ubase64
  }
}

export const ResetRegister=()=>{
  return{
    type:RESET_REGISTER
  }
}
export const SetIdValid=(idValid)=>{
  return{
    type:SET_ID_VALID,
    idValid
  }
}
export const SetPasswordValid=(passwordValid)=>{
  return{
    type:SET_PASSWORD_VALID,
    passwordValid
  }
}
export const SetPasswordCheckValid=(passwordCheckValid)=>{
  return{
    type:SET_PASSWORD_CHECK_VALID,
    passwordCheckValid
  }
}
export const SetEmailValid=(emailValid)=>{
  return {
    type:SET_EMAIL_VALID,
    emailValid
  }
}
export const Logout=()=>{
  return{
    type : LOGOUT
  }
}
export const LoginSuccess= (uname, ubase64)=>{
  return{
    type : LOGIN_SUCCESS,
    uname,
    ubase64
  }
}
export const LoginFail=()=>{
  return{
    type : LOGIN_FAIL
  }
}
export const postLoginRequest=(uname, upwd)=>{
  return{
    type : POST_LOGIN_REQUEST,
    uname,
    upwd
  }
}

export const RegisterSuccess=(uname, uemail)=>{
  return{
    type : REGISTER_SUCCESS,
    uname,
    uemail
  }
}
export const RegisterFail=()=>{
  return{
    type : REGISTER_FAIL
  }
}

export const postRegisterRequest=(uname, upwd, uemail)=>{
  return{
    type : POST_REGISTER_REQUEST,
    uname,
    upwd,
    uemail
  }
}
export const IdSuccess=()=>{
  return{
    type : ID_SUCCESS
  }
}
export const IdFail=()=>{
  return{
    type : ID_FAIL
  }
}
export const postIdRequest=(uname)=>{
  return{
    type : POST_ID_REQUEST
    ,uname
  }
}
