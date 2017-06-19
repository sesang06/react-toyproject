import {spawn, take, put, call, fork} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {LoginSuccess, LoginFail, postLoginRequest, RegisterSuccess,RegisterFail, postRegisterRequest, IdSuccess, IdFail,postIdRequest} from '../actions'

import {SetUserAvatar, SetUserList, SetChatLog, SetArticleList, SetCommentList, SetLikeList} from '../actions'

import {SetArticleList_WITH_ID} from '../actions'

import { SetGroupListRequest, SetGroupNoticeRequest, SetGroupForumRequest } from '../actions'

import {SetProfileReqeust} from '../actions'

import {SetFollowRequest, SetFollowArticleRequest} from '../actions'

import {SetImageRequest} from '../actions'

import {SetDietGraphRequest} from '../actions'

import {SetWallRequest} from '../actions'

import {SetMusicRequest} from '../actions'

import {SetLocationRequest} from '../actions'
////////////////////////////////////////////


//const url='http://localhost:8000/'
//const url='http://13.124.72.170:8000/'
const url='http://13.124.72.170:8888/'
const user_dup_url = url+'users/duplication/'
const user_url=url+'users/'
const user_login_url= url+'users/login/'
const chat_url=url+'chatting/'
const chat_userlist_url=url+'chatting/userlist/'
const article_url=url+'article/'
const image_url=url+'image/'
const profile_url= url+'profile/'
const music_url=url+'music/'
const location_url=url+'location/'
const route_url= url+'route/'
const dietdata_url=url+'dietdata/'

function location_id_url(id){
  return location_url+id+'/'
}
function location_uname_url(uname){
  return location_url+'user/'+uname+'/'
}


function route_id_url(id){
  return route_url+id+'/'
}
function route_uname_url(uname){
  return route_url+'user/'+uname+'/'
}

function image_id_url(id){
  return image_url+id+'/'
}
function article_url_WITH_ID(id){
  return article_url+id+'/'}
function comment_url(id){
  return article_url + id + '/comment/'}
  function comment_url_WITH_ID(id1,id2){
    return article_url + id1 + '/comment/'+id2+'/'}

function like_url(id){
  return article_url + id + '/like/'}
function like_comment_url(id1, id2){
  return article_url + id1 + '/comment/' + id2 + '/like/'}

const group_list_url = url+'group/'
function group_member_url(id){
  return group_list_url + id + '/member/'}
function group_notice_url(id){
  return group_list_url + id + '/notice/'}
function group_forum_url(id){
  return group_list_url + id + '/forum/'}

const follow_url = url+'follow/'
function follow_retrieve_url(id){
  return follow_url + id + '/'}
function follow_article_url(id){
  return follow_url + id + '/article/'}

function wall_url(uname){
  return url+'wall/'+uname+'/'}



function dietgraph_url(uname){
    return url+'dietgraph/'+uname+'/'}


//////////////////////////////////



export function * watchRegister(){
  while(true){
    const data= yield take('POST_REGISTER_REQUEST')
    yield call(postRegister,data)
  }
}
export function * postRegister(data){
  let uname=data.uname
  let upwd=data.upwd
  let uemail=data.uemail
  console.log(uname)
  console.log(upwd)
  console.log(uemail)
  const response= yield call(fetch,user_url,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'username':uname,'password':upwd, 'email':uemail })
  })
  if(!response.ok){
    yield put(RegisterFail());
  }else{
    yield put(RegisterSuccess(uname,uemail));
  }
}
export function * watchId(){
  while(true){
    const data = yield take('POST_ID_REQUEST')
    yield call(postId, data)
  }
}
export function * postId(data){
  console.log("postId is called!")
  console.log(data.uname)
  let uname= data.uname
  const response= yield call(fetch,user_dup_url,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'username':uname})
  })
 if(!response.ok){
   yield put(IdFail());
 }else{
   yield put(IdSuccess());
 }
}

export function* watchLogin(){
  while(true){
    const data = yield take('POST_LOGIN_REQUEST')
    yield call(postLogin, data)
  }
}

export function* postLogin(data){
//  console.log("postLogin is called!")
//  console.log(data.uname)
//  console.log(data.upwd)
  let uname = data.uname
  let upwd = data.upwd

  const hash = new Buffer(`${uname}:${upwd}`).toString('base64')
  const response= yield call(fetch, user_login_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok){
//    console.log('fail')
  deleteCookie("uname");
  deleteCookie("upwd");

    yield put(LoginFail());
  }else{
//    console.log('success')
    setCookie("uname",uname,60);
    setCookie("upwd",upwd,60);
    yield put(LoginSuccess(uname, hash));
  }
}
function setCookie(cname, cvalue,exdays){
  var d= new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires="expires="+d.toUTCString();
  document.cookie= cname+"="+btoa(JSON.stringify(cvalue))+";"+expires+";path=/";

}
function deleteCookie(cname){
  document.cookie=cname+"=;path=/";
}
function getCookie(cname){
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';');
  for (var i=0; i< ca.length; i++){
    var c= ca[i];
    while (c.charAt(0)==' '){
      c= c.substring(1);
      }
      if (c.indexOf(name)==0){
        return c.substring(name.length, c.length);
      }
  }
  return "";
}

export function* watchGetUser(){
  while(true){
    const data = yield take('GET_USER_REQUEST')
    yield call(getUser, data)
  }
}

const getApi=(url, settings)=>{
  return fetch(url, settings)
  .then(response=>{
    if (response.ok)
    return response
  const error = new Error(`${response.status} ${response.statusText}`)
  error.response = response
  throw error
  })
  .then(response=>response.json())
  .then(data=>{
    return data
  })
}

export function* getUser(data){
  let uname = data.uname

  const response = yield call(getApi, chat_userlist_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let userlist = response
  let len = userlist.length;
  let usernames = []

  for (var i = 0; i < len; i++) {
    var name = userlist[i].username;
    if (name != uname)
      usernames.push(name);
  }

  const response2 = yield call(getApi, user_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let avatar_list = []
  for (var index in response2) {
    let item = {
      username: "",
      avatar: null,
      email: "",
      nickname: ""
    }
    let username = response2[index]["username"]
    let avatar = null
    let email = response2[index]["email"]
    let nickname = null

    if (response2[index]['userprofile'] !== null) {
      avatar = response2[index]['userprofile']['avatar']
      nickname = response2[index]['userprofile']['nickname']
    }
    item.username = username
    item.avatar = avatar
    item.email = email
    item.nickname = nickname
    avatar_list.push(item)
  }

  yield put(SetUserList(usernames))
  yield put(SetUserAvatar(avatar_list))
}


export function* watchChat(){
  while(true){
    const data = yield take('POST_CHAT_REQUEST')
    yield call(postChat, data)
  }
}

export function* postChat(data){
  let receiver = data.receiver
  let chat = data.chat

  const hash = data.ubase64
  const response = yield call(fetch, chat_url, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${hash}`, 'Content-Type': `application/json` },
    body: JSON.stringify({ receiver: receiver, chat: chat })
  })

  if (response.ok) {
    console.log('chat_success')
  } else {
    console.log('chat_fail')
  }
}

export function* watchGetChat(){
  while(true){
    const data = yield take('GET_CHAT_REQUEST')
    yield call(getChat, data)
  }
}

export function* getChat(data){
  const hash = data.ubase64

  const response = yield call(getApi, chat_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let chatlog = response
  yield put(SetChatLog(chatlog))
}

export function* watchArticle(){
  while(true){
    const data = yield take('POST_ARTICLE_REQUEST')
    yield call(postArticle, data)
  }
}

export function* postArticle(data){
  const hash = data.ubase64
  const text = data.text

  const response = yield call(fetch, article_url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: text })
  })

//  console.log(response)

  if (response.ok) {
    console.log('success')
  } else {
    console.log('fail')
  }
  yield call(getArticle,data)
}
export function* watchGetArticle_WITH_ID(){
  while(true){
    const data = yield take('GET_ARTICLE_REQUEST_WITH_ID')
    yield call(getArticle_WITH_ID, data)
  }
}

export function* getArticle_WITH_ID(data){

  const hash = data.ubase64
  const url = article_url_WITH_ID(data.id)
  const response = yield call(getApi, url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

    let article={
      id: 0,
      author:"",
      content:"",
      created_time:new Date(),
      updated_time:new Date(),
      like_list:[],
      comment_list:[],
      likes_count:0,
      comments_count:0,
      nickname:null,
      avatar:null
    }
    let id=response["id"]
    let author=response["author"]
    let created= response["created"]
    let updated= response["updated"]
    let content = response["content"]
    let comments_count= response["comments_count"]
    let likes_count= response["likes_count"]
    article.id=id
    article.author=author
    article.content=content
    article.created_time=new Date(created)
    article.updated_time=new Date(updated)
    article.likes_count=likes_count
    article.comments_count=comments_count
    let nickname=null
    let avatar=null
    if (response['userprofile']===null){
      nickname= null
       avatar=null
    }else{
      nickname=response['userprofile']['nickname'] || null
      avatar=  response['userprofile']['avatar'] || null
  }
    article.nickname=nickname
    article.avatar=avatar
  yield put(SetArticleList_WITH_ID(article, parseInt(id)))

    let newData= {ubase64:"", id:0}
    newData.ubase64=hash
    newData.id= article.id
    yield call(getComment, newData)
    newData= {ubase64:"", id:""}
    newData.ubase64=hash
  newData.id= data.id+"_0"
    yield call(getLike, newData)


}


export function* watchGetArticle(){
  while(true){
    const data = yield take('GET_ARTICLE_REQUEST')
    yield call(getArticle, data)
  }
}

export function* getArticle(data){
  const hash = data.ubase64

  const response = yield call(getApi, article_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let articlelist=[]

  for (var index in response){

    let article={
      id: 0,
      author:"",
      content:"",
      created_time:new Date(),
      updated_time:new Date(),
      like_list:[],
      comment_list:[],
      likes_count:0,
      comments_count:0,
      nickname:null,
      avatar:null
    }

    let id=response[index]["id"]
    let author=response[index]["author"]
    let created= response[index]["created"]
    let updated= response[index]["updated"]
    let content = response[index]["content"]
    let comments_count= response[index]["comments_count"]
    let likes_count= response[index]["likes_count"]
    article.id=id
    article.author=author
    article.content=content
    article.created_time=new Date(created)
    article.updated_time=new Date(updated)
    article.likes_count=likes_count
    article.comments_count=comments_count
    let nickname=null
    let avatar=null
    if (response[index]['userprofile']===null){
      nickname= null
       avatar=null
    }else{
      nickname=response[index]['userprofile']['nickname'] || null
      avatar=  response[index]['userprofile']['avatar'] || null
  }
    article.nickname=nickname
    article.avatar=avatar

    articlelist.push(article)
  }

  yield put(SetArticleList(articlelist))
  for (var index in articlelist){
    let data= {ubase64:"", id:0}
    data.ubase64=hash
    data.id= articlelist[index].id
    yield call(getComment, data)
  }
  for (var index in articlelist){
    let data= {ubase64:"", id:""}
    data.ubase64=hash
    data.id= articlelist[index].id+"_0"
    yield call(getLike, data)
  }

}

export function* watchGetDietGraph(){
  while(true){
    const data = yield take('GET_DIET_GRAPH_REQUEST')
    yield call(getDietGraph, data)
  }
}

export function* getDietGraph(data){
  const hash = data.ubase64
  const uname= data.uname
  const response = yield call(getApi, dietgraph_url(uname), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(response)

  let dietdatalist=[]


  for (var index in response){

    let dietdata={
          id: 0,
          author: "",
          created: new Date(),
          height: 0,
          weight: 0,
          bmi: 0,
          step: 0,
          calorie: 0
      }

    let id=response[index]["id"]
    let author=response[index]["author"]
    let created= response[index]["created"]
    let height = response[index]["height"]
    let weight = response[index]["weight"]
    let bmi = response[index]["bmi"]
    let step = response[index]["step"]
    let calorie = response[index]["calorie"]
    dietdata.id=id
    dietdata.author=author
    dietdata.created=new Date(created)
    dietdata.height=height
    dietdata.weight=weight
    dietdata.bmi=bmi
    dietdata.step=step
    dietdata.calorie=calorie

  dietdatalist.push(dietdata)
  }

  yield put(SetDietGraphRequest(uname,dietdatalist))

}

export function* watchDeleteImage(){
  while(true){
    const data = yield take('DELETE_IMAGE_REQUEST')
    yield call(deleteImage, data)
  }
}

export function* deleteImage(data){
  const hash = data.ubase64
  const idlist= data.idlist
  for (var index in idlist){
  const response = yield call(fetch, image_id_url(idlist[index]), {
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  }
)

console.log(response)
}
yield call(getImage,data)

}
export function* watchGetImage(){
  while(true){
    const data = yield take('GET_IMAGE_REQUEST')
    yield call(getImage, data)
  }
}

export function* getImage(data){
  const hash = data.ubase64

  const response = yield call(getApi, image_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let imagelist=[]

  for (var index in response){

    let image={
      id: 0,
      author:"",
      created: new Date(),
      updated: new Date(),
      image:""
    }

    let id=response[index]["id"]
    let author=response[index]["author"]
    let created= new Date(response[index]["created"])
    let updated= new Date(response[index]["updated"])
    let image_= response[index]["image"]
    image.id=id
    image.author=author
    image.created=created
    image.updated=updated
    image.image=image_
    imagelist.push(image)
  }
  yield put(SetImageRequest(imagelist))

}

export function* watchComment(){
  while(true){
    const data = yield take('POST_COMMENT_REQUEST')
    const hash = data.ubase64
    const id = data.id
    yield call(postComment, data)
  }
}

export function* postComment(data){
  console.log(data)

  const hash = data.ubase64
  const text = data.text
  const id = data.id
  //console.log(comment_url(id))
  const response = yield call(fetch, comment_url(id), {
    method: 'POST',
    headers: { 'Authorization': `Basic ${hash}`, 'Content-Type': `application/json` },
    body: JSON.stringify({ content: text })
  })

  if (response.ok) {
    console.log('comment_success')
  } else {
    console.log('comment_fail')
  }
  let newData={ubase64:"", id:0}
  newData.ubase64=hash
  newData.id=id
  yield call(getArticle_WITH_ID,newData)
}

export function* watchGetComment(){
  while(true){
    const data = yield take('GET_COMMENT_REQUEST')
    yield call(getComment, data)
  }
}

export function* getComment(data){
    const hash = data.ubase64
    const id = data.id

    const response = yield call(getApi, comment_url(id), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
      }
    })

    let commentlist=[]

    for (var index in response){
      let comment={
        id :0,
        article_id: 0,
        author: "",
        content: "",
        created: new Date(),
        updated:new Date(),
        like_list: [],
        likes_count: 0,
    }
      let id = response[index]["id"]

      let article_id = response[index]["article"]
      let author = response[index]["author"]
      let content = response[index]["content"]
      let created = response[index]["created"]
      let updated= response[index]["updated"]
      let likes_count = response[index]["likes_count"]

      comment.id= id
      comment.article_id = article_id
      comment.author = author
      comment.content = content
      comment.updated= new Date(updated)
      comment.created = new Date(created)
      comment.likes_count = likes_count
      commentlist.push(comment)
    }
    //console.log(commentlist)

    yield put(SetCommentList(commentlist, parseInt(id)))

    for (var index in commentlist){
      let data= {ubase64:"", id:""}
      data.ubase64=hash
      data.id= commentlist[index].article_id+"_"+commentlist[index].id
      yield call(getLike, data)
    }
  }

export function* watchLike(){
  while(true){
    const data = yield take('POST_LIKE_REQUEST')
    yield call(postLike, data)
    //console.log(data)
  }
}

export function* postLike(data){
  //console.log(data.id)
  const hash = data.ubase64
  const id = data.id
  const id1 = id.split('_')[0]
  const id2 = id.split('_')[1]

  const url = (id2 == 0) ? like_url(id1) : like_comment_url(id1, id2);

  //console.log(url)

  const response = yield call(fetch, url, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${hash}`, 'Content-Type': `application/json` }
  })

  if (response.ok) {
    console.log('like_success')
  } else {
    console.log('like_fail')
  }
  yield call(getLike,data)
}

export function* watchGetLike(){
  while(true){
    const data = yield take('GET_LIKE_REQUEST')
    yield call(getLike, data)
  }
}

export function* getLike(data) {
  //console.log(data)
  const hash = data.ubase64
  const id = data.id
  const id1 = id.split('_')[0]
  const id2 = id.split('_')[1]

  const url = (id2 == 0) ? like_url(id1) : like_comment_url(id1, id2);
  console.log(data)
  const response = yield call(getApi, url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  console.log(response)

  let likelist=[]

  for (var index in response){
    let like={
      article_id: 0,
      comment_id: 0,
      author: "",
      created: new Date(),
      id: 0,
      updated: new Date()
    }
    let article_id = (id2 == 0) ? response[index]["article"] : id1
    let comment_id = (id2 == 0) ? 0 : response[index]["comment"]
    let author = response[index]["author"]
    let created = response[index]["created"]
    let id = response[index]["id"]
    let updated = response[index]["updated"]

    like.article_id = article_id
    like.comment_id = comment_id
    like.author = author
    like.created = new Date(created)
    like.id = id
    like.updated = new Date(updated)

    likelist.push(like)
  }
  yield put(SetLikeList(likelist, parseInt(id1), parseInt(id2)))
  //console.log(likelist)
}

export function* watchDeleteLike(){
  while(true){
    const data = yield take('DELETE_LIKE_REQUEST')
    yield call(deleteLike, data)
  }
}

export function* deleteLike(data){
  const hash = data.ubase64
  const id = data.id
  const id1 = id.split('_')[0]
  const id2 = id.split('_')[1]

  const url = (id2 == 0) ? like_url(id1) : like_comment_url(id1, id2);

  const response = yield call(fetch, url, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${hash}` }
  })

  if (response.ok) {
    console.log('like_delete_success')
  } else {
    console.log('like_delete_fail')
  }
  yield call(getLike,data)

}



export function* watchDeleteComment(){
  while(true){
    const data = yield take('DELETE_COMMENT_REQUEST')
    yield call(deleteComment, data)
  }
}

export function* deleteComment(data){

  const hash = data.ubase64
  const article_id = data.article_id
  const comment_id= data.comment_id

  const response = yield call(fetch, comment_url_WITH_ID(article_id, comment_id), {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${hash}` }
  })

  if (response.ok) {
    console.log('article_delete_success')
  } else {
    console.log('article_delete_fail')
  }
//  yield call(getArticle,data)

let newData={ubase64:"", id:0}
newData.ubase64=hash
newData.id=article_id
yield call(getArticle_WITH_ID,newData)

}

export function* watchUpdateComment(){
  while(true){
    const data = yield take('UPDATE_COMMENT_REQUEST')
    yield call(updateComment, data)
  }
}

export function* updateComment(data){

  const hash = data.ubase64
  const article_id = data.article_id
  const comment_id= data.comment_id
  const content= data.text
  console.log(content)

  var form = new FormData();
  form.append("content", content);


  const response = yield call(fetch, comment_url_WITH_ID(article_id, comment_id), {
    "async": true,
    "crossDomain": true,
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${hash}`,
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    body: form
  })
  console.log(response)

  if (response.ok) {
    console.log('like_delete_success')
  } else {
    console.log('like_delete_fail')
  }
  let newData={ubase64:"", id:0}
  newData.ubase64=hash
  newData.id=article_id
  yield call(getArticle_WITH_ID,newData)

}


export function* watchDeleteArticle(){
  while(true){
    const data = yield take('DELETE_ARTICLE_REQUEST')
    yield call(deleteArticle, data)
  }
}

export function* deleteArticle(data){

  const hash = data.ubase64
  const id = data.id

  const response = yield call(fetch, article_url_WITH_ID(id), {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${hash}` }
  })

  if (response.ok) {
    console.log('article_delete_success')
  } else {
    console.log('article_delete_fail')
  }
  yield call(getArticle,data)

}

export function* watchUpdateArticle(){
  while(true){
    const data = yield take('UPDATE_ARTICLE_REQUEST')
    yield call(updateArticle, data)
  }
}

export function* updateArticle(data){

  const hash = data.ubase64
  const id = data.id
  const content= data.content
  console.log(content)

  var form = new FormData();
  form.append("content", content);


  const response = yield call(fetch, article_url_WITH_ID(id), {
    "async": true,
    "crossDomain": true,
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${hash}`,
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    body: form
  })
  console.log(response)

  if (response.ok) {
    console.log('like_delete_success')
  } else {
    console.log('like_delete_fail')
  }
  let newData={ubase64:"", id:0}
  newData.ubase64=hash
  newData.id=id
  yield call(getArticle_WITH_ID,newData)

}




export function* watchGetGroupList() {
  while(true) {
    const data = yield take('GET_GROUP_LIST_REQUEST')
    yield call(getGroupList, data)
  }
}

export function* getGroupList(data) {
  //console.log(data)
  const hash = data.ubase64

  const response = yield call(getApi, group_list_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let group_list = []

  for (var index in response) {
    let group = {
      id: 0,
      group_name: "",
      admin: "",
      member: 0,
      member_list: []
    }

    let id = response[index]["id"]
    let group_name = response[index]["group_name"]
    let admin = response[index]["admin"]
    let member = response[index]["member"]
    let member_list = response[index]["member_list"]

    //console.log(member_list)

    group.id = id
    group.group_name = group_name
    group.admin = admin
    group.member = member
    group.member_list = member_list

    group_list.push(group)
  }

  //console.log(group_list)
  yield put(SetGroupListRequest(group_list))
}

export function* watchPostGroupList(){
  while(true){
    const data = yield take('POST_GROUP_LIST_REQUEST')
    yield call(postGroupList, data)
  }
}

export function* postGroupList(data){
  const hash = data.ubase64
  const name = data.group_name
  //console.log(data)

  const response = yield call(fetch, group_list_url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ group_name: name })
  })

  if (response.ok) {
    console.log('post_group_list_success')
    const response2 = yield call(getApi, group_list_url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
      }
    })
    const data2 = { ubase64: hash, group_id: response2[response2.length-1]['id'] }
    yield call(postGroupMember, data2)
    const data3 = { ubase64: hash }
    yield call(getGroupList, data3)
  } else {
    console.log('post_group_list_fail')
  }
}

export function* watchPostGroupMember(){
  while(true){
    const data = yield take('POST_GROUP_MEMBER_REQUEST')
    yield call(postGroupMember, data)
  }
}

export function* postGroupMember(data){
  const hash = data.ubase64
  const id   = data.group_id
  //console.log(data)

  const response = yield call(fetch, group_member_url(id), {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    console.log('post_group_member_success')
    const data2 = { ubase64: hash }
    yield call(getGroupList, data2)
  } else {
    console.log('post_group_member_fail')
  }
}

export function* watchDeleteGroupMember(){
  while(true){
    const data = yield take('DELETE_GROUP_MEMBER_REQUEST')
    yield call(deleteGroupMember, data)
  }
}

export function* deleteGroupMember(data){
  const hash = data.ubase64
  const id   = data.group_id

  const response = yield call(fetch, group_member_url(id), {
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    console.log('delete_group_member_success')
    const data2 = { ubase64: hash }
    yield call(getGroupList, data2)
  } else {
    console.log('delete_group_member_fail')
  }
}

export function* watchGetGroupNotice(){
  while(true){
    const data = yield take('GET_GROUP_NOTICE_REQUEST')
    yield call(getGroupNotice, data)
  }
}

export function* getGroupNotice(data){
  const hash = data.ubase64
  const id   = data.group_id

  const response = yield call(getApi, group_notice_url(id), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })
  //console.log(response)

  let notice_list = []
  for (var index in response){
    let notice = {
      id: 0,
      created: new Date(),
      group: 0,
      text: ""
    }

    let id = response[index]["id"]
    let created = response[index]["created"]
    let group = response[index]["group"]
    let text = response[index]["notice"]

    notice.id = id
    notice.created = new Date(created)
    notice.group = group
    notice.text = text

    notice_list.push(notice)
  }

  //console.log(notice_list)
  yield put(SetGroupNoticeRequest(notice_list))
}

export function* watchGetGroupForum(){
  while(true){
    const data = yield take('GET_GROUP_FORUM_REQUEST')
    yield call(getGroupForum, data)
  }
}

export function* getGroupForum(data){
  const hash = data.ubase64
  const id   = data.group_id

  const response = yield call(getApi, group_forum_url(id), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let forum_list = []
  for (var index in response){
    let forum = {
      id: 0,
      created: new Date(),
      group: 0,
      author: "",
      text: ""
    }
    let id = response[index]["id"]
    let created = response[index]["created"]
    let group = response[index]["group"]
    let author = response[index]["author"]
    let text = response[index]["text"]

    forum.id = id
    forum.created = new Date(created)
    forum.group = group
    forum.author = author
    forum.text = text

    forum_list.push(forum)
  }

  yield put(SetGroupForumRequest(forum_list))

}

export function* watchPostGroupNotice(){
  while(true){
    const data = yield take('POST_GROUP_NOTICE_REQUEST')
    yield call(postGroupNotice, data)
  }
}

export function* postGroupNotice(data){
  const hash = data.ubase64
  const id   = data.group_id
  const text = data.text

  const response = yield call(fetch, group_notice_url(id), {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'notice': text })
  })

  if (response.ok) {
    console.log('post_group_notice_success')
    yield call(getGroupNotice, data)
  } else {
    console.log('post_group_notice_fail')
  }
}

export function* watchPostGroupForum(){
  while(true){
    const data = yield take('POST_GROUP_FORUM_REQUEST')
    yield call(postGroupForum, data)
  }
}

export function* postGroupForum(data){
  const hash = data.ubase64
  const id   = data.group_id
  const text = data.text

  const response = yield call(fetch, group_forum_url(id), {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'text': text })
  })

  if (response.ok) {
    console.log('post_group_forum_success')
    yield call(getGroupForum, data)
  } else {
    console.log('post_group_forum_fail')
  }
}

export function* watchImage(){
  while(true){
    const data = yield take('POST_IMAGE_REQUEST')
    yield call(postImage, data)
  }
}

export function* postImage(data){
   const hash = data.ubase64
  const files =data.files
  console.log(files)
for (var index in files){
  let form = new FormData();
  form.append("image",files[index]);
  let response = yield call(fetch, image_url, {
    "async": true,
    "crossDomain": true,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    body: form
  })
  console.log(response)
  if (response.ok) {
    console.log('success')
  } else {
    console.log('fail')
  }
}
yield call(getImage,data)
}


export function* watchGetProfile(){
  while(true){
    const data = yield take('GET_PROFILE_REQUEST')
    yield call(getProfile, data)
  }
}

export function* getProfile(data){
  const hash = data.ubase64

  const response = yield call(getApi, profile_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(response)


  /*
  email:state.profile_reducer.email,
  nickname:state.profile_reducer.nickname,
  avatar: state.profile_reducer.avatar,
  first_name:state.profile_reducer.first_name,
  last_name:state.profile_reducer.last_name,
  last_login:state.profile_reducer.last_login,
  date_joined: state.profile_reducer.date_joined
  */

  const email= response['email']
  let nickname=null
  let avatar=null
  if (response['userprofile']===null){
    nickname= null
     avatar=null
  }else{
    nickname=response['userprofile']['nickname'] || null
    avatar=  response['userprofile']['avatar'] || null
}
  const first_name= response['first_name'] || null
  const last_name=response['last_name'] || null
  const last_login= new Date(response['last_login']) || null
  const date_joined= new Date(response['date_joined']) || null
console.log(last_login)
console.log(email)
console.log(nickname)
console.log(avatar)
console.log(first_name)
console.log(last_name)
console.log(last_login)
console.log(date_joined)
  yield put(SetProfileReqeust(email, nickname, avatar, first_name, last_name,last_login, date_joined))
}


export function* watchUpdateProfile(){
  while(true){
    const data = yield take('UPDATE_PROFILE_REQUEST')
    yield call(updateProfile, data)
  }
}

export function* updateProfile(data){
  const hash = data.ubase64

  const nickname = data.nickname
  const first_name =data.first_name
  const last_name= data.last_name
  const avatar= data.avatar
  console.log('saga')
  var form = new FormData();
  if (nickname!== null)
  form.append('userprofile.nickname',nickname)
  if(first_name!==null)
  form.append('first_name',first_name)
  if(last_name!==null)
  form.append('last_name',last_name)
  if (avatar!== null)
  form.append('userprofile.avatar',avatar)


  const response = yield call(fetch, profile_url, {
    "async": true,
    "crossDomain": true,
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${hash}`,
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    body: form
  })


  console.log(response)

  if (response.ok) {
    console.log('success')
  } else {
    console.log('fail')
  }
  yield call(getProfile,data)
}

export function* watchGetFollow() {
  while(true) {
    const data = yield take('GET_FOLLOW_REQUEST')
    yield call(getFollow, data)
  }
}

export function* getFollow(data) {
  const hash = data.ubase64

  const response = yield call(getApi, follow_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let follow_list = []

  for (var index in response) {
    let item = {
      id: 0,
      user: "",
      follow: ""
    }

    let id = response[index]["id"]
    let user = response[index]["user"]
    let follow = response[index]["follow"]

    item.id = id
    item.user = user
    item.follow = follow
    follow_list.push(item)
  }
  //console.log(follow_list)
  yield put(SetFollowRequest(follow_list))
}

export function* watchPostFollow() {
  while(true){
    const data = yield take('POST_FOLLOW_REQUEST')
    yield call(postFollow, data)
  }
}

export function* postFollow(data){
  const hash = data.ubase64
  const follow = data.follow

  const response = yield call(fetch, follow_url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'follow': follow})
  })

  if (response.ok){
    console.log('post_follow_success')
    const data2 = { ubase64: hash }
    yield call(getFollow, data2)
  } else {
    console.log('post_follow_fail')
  }
}

export function* watchDeleteFollow() {
  while(true) {
    const data = yield take('DELETE_FOLLOW_REQUEST')
    yield call(deleteFollow, data)
  }
}

export function* deleteFollow(data) {
  const hash = data.ubase64
  const id   = data.id

  const response = yield call(fetch, follow_retrieve_url(id), {
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    console.log('delete_follow_success')
    const data2 = { ubase64: hash }
    yield call(getFollow, data2)
  } else {
    console.log('delete_follow_fail')
  }
}

export function* watchGetFollowArticle() {
  while(true) {
    const data = yield take('GET_FOLLOW_ARTICLE_REQUEST')
    yield call(getFollowArticle, data)
  }
}

export function* getFollowArticle(data) {
  const hash = data.ubase64
  const id   = data.id

  const response = yield call(getApi, follow_article_url(id), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let follow_article_list = []
  for (var index in response) {
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
    let id=response[index]["id"]
    let author=response[index]["author"]
    let created= response[index]["created"]
    let updated= response[index]["updated"]
    let content = response[index]["content"]
    let comments_count= response[index]["comments_count"]
    let likes_count= response[index]["likes_count"]
    article.id=id
    article.author=author
    article.content=content
    article.created_time=new Date(created)
    article.updated_time=new Date(updated)
    article.likes_count=likes_count
    article.comments_count=comments_count
    follow_article_list.push(article)
  }

  yield put(SetFollowArticleRequest(follow_article_list))
}

export function* watchPostLocation(){
  while(true){
    const data = yield take('POST_LOCATION_REQUEST')
    yield call(postLocation, data)
  }
}

export function* postLocation(data){
   const hash = data.ubase64
  const location_list =data.location_list
  const route= data.route
  console.log("hh")
for (var index in location_list){
  let form = new FormData();
  form.append('longitude', location_list[index].longitude)
  form.append('latitude',  location_list[index].latitude)
  form.append('content', location_list[index].content)

  let response = yield call(fetch, location_url, {
    "async": true,
    "crossDomain": true,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    body: form
  })
  console.log(response)
  if (response.ok) {
    console.log('success')
  } else {
    console.log('fail')
  }
}
console.log(route)
if (route!==null){
let form = new FormData();
form.append('distance', route.distance)
form.append('duration', route.duration)
form.append('start_address', route.start_address)
form.append('end_address', route.end_address)

let response = yield call(fetch, route_url, {
  "async": true,
  "crossDomain": true,
  method: 'POST',
  headers: {
    'Authorization': `Basic ${hash}`,
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  body: form
})
console.log(response)
if (response.ok) {
  console.log('success')
} else {
  console.log('fail')
}
}
yield call(getLocation,data)
}


export function* watchGetLocation(){
  while(true){
    const data= yield take('GET_LOCATION_REQUEST')
    yield call(getLocation, data)
  }
}
export function* getLocation(data){
  const uname = data.uname
  const hash = data.ubase64

  const response = yield call(getApi, location_uname_url(uname), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(response)
  let location_list = []

  for (var index in response) {
    let location = {
      id: 0,
      author: "",
      content: "",
      created: new Date(),
      longitude : 0,
      latitude : 0
      }

    let id = response[index]["id"]
    let author = response[index]["author"]
    let created = response[index]["created"]
    let content = response[index]["content"]
    let longitude= response[index]["longitude"]
    let latitude= response[index]["latitude"]
      location.id = id
      location.author = author
      location.content = content
      location.created = new Date(created)
      location.longitude = longitude
      location.latitude =latitude
      location_list.push(location)

  }

  const response2 = yield call(getApi, route_uname_url(uname), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(response2)
  let route_list = []

  for (var index in response2) {
    let route = {
      id: 0,
      author: "",
      created: new Date(),
      distance : 0,
      duration: 0,
      start_address:"",
      end_address:""
      }

    let id = response2[index]["id"]
    let author = response2[index]["author"]
    let created = response2[index]["created"]
    let distance= response2[index]["distance"]
    let duration= response2[index]["duration"]
    let start_address=response2[index]["start_address"]
    let end_address=response2[index]["end_address"]
    route.id = id
    route.author = author
    route.created = new Date(created)
      route.distance = distance
      route.duration = duration
      route.start_address=start_address
      route.end_address=end_address
      route_list.push(route)

  }


  yield put(SetLocationRequest(location_list,route_list))

}

export function* watchGetWall() {
  while(true) {
    const data = yield take('GET_WALL_REQUEST')
    yield call(getWall, data)
  }
}

export function* getWall(data) {
  const uname = data.uname
  const hash = data.ubase64

  const response = yield call(getApi, wall_url(uname), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let article_list = []

  for (var index in response) {
    let article = {
      id: 0,
      author: "",
      content: "",
      created_time: new Date(),
      updated_time: new Date(),
      like_list: [],
      comment_list: [],
      likes_count: 0,
      comments_count: 0,
      nickname: null,
      avatar: null
    }

    let id = response[index]["id"]
    let author = response[index]["author"]
    let created = response[index]["created"]
    let updated = response[index]["updated"]
    let content = response[index]["content"]
    let comments_count = response[index]["comments_count"]
    let likes_count = response[index]["likes_count"]
//    let like_list = response[index]["likes"]
//    let comment_list = response[index]["comments"]

//    if (author === uname) {
    if (true) {
      article.id = id
      article.author = author
      article.content = content
      article.created_time = new Date(created)
      article.updated_time = new Date(updated)
      article.likes_count = likes_count
      article.comments_count = comments_count
//    article.like_list = like_list
//    article.comment_list = comment_list

      let nickname = null
      let avatar = null

      if (response[index]['userprofile'] === null) {
        nickname = null
        avatar = null
      } else {
        nickname = response[index]['userprofile']['nickname'] || null
        avatar = response[index]['userprofile']['avatar'] || null
      }

      article.nickname = nickname
      article.avatar = avatar

      article_list.push(article)
    }
  }
  yield put(SetArticleList(article_list))
  //yield put(SetWallRequest(article_list))

  for (var index in article_list) {
    let data = {ubase64: "", id: 0}
    data.ubase64 = hash
    data.id = article_list[index].id
    yield call(getComment, data)
  }
  for (var index in article_list) {
    let data= {ubase64: "", id: 0}
    data.ubase64 = hash
    data.id = article_list[index].id+"_0"
    yield call(getLike, data)
  }
}

export function* watchGetMusic() {
  while(true) {
    const data = yield take('GET_MUSIC_REQUEST')
    yield call(getMusic, data)
  }
}

export function* getMusic(data) {
  const hash = data.ubase64

  const response = yield call(getApi, music_url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    }
  })

  let music_list = []

  for (var index in response) {
    let music = {
      id: 0,
      title: "",
      artist: "",
      source: ""
    }

    let id = response[index]["id"]
    let title = response[index]["title"]
    let artist = response[index]["artist"]
    let source = response[index]["music"]

    music.id = id
    music.title = title
    music.artist = artist
    music.source = source

    music_list.push(music)
  }

  yield put(SetMusicRequest(music_list))
}

export function* watchPostMusic() {
  while(true) {
    const data = yield take('POST_MUSIC_REQUEST')
    yield call(postMusic, data)
  }
}

export function* postMusic(data) {
  const hash = data.ubase64
  const uname = data.uname
  const title = data.title
  const artist = data.artist
  const source = data.source

  var form = new FormData();
  form.append('title', title)
  form.append('artist', artist)
  form.append('music', source)

  const response = yield call(fetch, music_url, {
    "async": true,
    "crossDomain": true,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    body: form
    //body: JSON.stringify({'title': title, 'artist': artist, 'music': source})
  })

  if (response.ok) {
    console.log('music_success')
    const data2 = { uname: uname, ubase64: hash }
    yield call(getMusic, data2)
  } else {
    console.log('music_fail')
  }
}

export function* watchDietData(){
  while(true){
    const data = yield take('POST_DIET_DATA_REQUEST')
    yield call(postDietData, data)
  }
}

export function* postDietData(data){
  console.log(data)

  const uname = data.uname
  const hash = data.ubase64
  //const id = data.id
  const height = data.height
  const weight = data.weight
  const step = data.step
  const calorie = data.calorie
  

  const response = yield call(fetch, dietdata_url, {
    //"async": true,
    //"crossDomain": true,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ height:height, weight: weight, step: step, calorie: calorie })
  })

  if (response.ok) {
    console.log('dietdata_success')
  } else {
    console.log('dietdata_fail')
  }

  //const data2 = { ubase64: hash, uname: uname }
  //yield call(getDietGraph, data2)
}

export function* Saga(){
  yield spawn(watchRegister)
  yield spawn(watchId)

  yield spawn(watchLogin)
  yield spawn(watchGetUser)
  yield spawn(watchChat)
  yield spawn(watchGetChat)
  yield spawn(watchArticle)
  yield spawn(watchGetArticle)
  yield spawn(watchDeleteArticle)
  yield spawn(watchDeleteComment)
  yield spawn(watchUpdateComment)
  yield spawn(watchGetDietGraph)

  yield spawn(watchUpdateArticle)
  yield spawn(watchGetImage)
  yield spawn(watchDeleteImage)
  yield spawn(watchComment)
  yield spawn(watchGetComment)
  yield spawn(watchLike)
  yield spawn(watchGetLike)
  yield spawn(watchDeleteLike)
  yield spawn(watchGetArticle_WITH_ID)
  yield spawn(watchGetGroupList)
  yield spawn(watchPostGroupList)
  yield spawn(watchPostGroupMember)
  yield spawn(watchDeleteGroupMember)
  yield spawn(watchGetGroupNotice)
  yield spawn(watchGetGroupForum)
  yield spawn(watchPostGroupNotice)
  yield spawn(watchPostGroupForum)
  yield spawn(watchImage)
  yield spawn(watchGetProfile)
  yield spawn(watchUpdateProfile)
  yield spawn(watchGetFollow)
  yield spawn(watchPostFollow)
  yield spawn(watchDeleteFollow)
  yield spawn(watchGetFollowArticle)

  yield spawn(watchGetWall)
  yield spawn(watchGetMusic)
  yield spawn(watchPostMusic)

  yield spawn(watchPostLocation)
  yield spawn(watchGetLocation)

  yield spawn(watchDietData)
}
