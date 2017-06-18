import React from 'react';
import * as types from '../actions';
import * as reducers from './index.js';


describe('music reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.music_reducer(reducers.initialMusicState, {})
    ).toEqual(
      {
        music_list: []
      }
    )
  })
  it('should handle SET_MUSIC_REQUEST', () => {
    expect(
      reducers.music_reducer([], {
        type: types.SET_MUSIC_REQUEST,
        music_list: ['test']
      })
    ).toEqual(
      {
        music_list: ['test']
      }
    )
  })
})

describe('dietgraph reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.dietgrpah_reducer(reducers.initialDietGraphState, {})
    ).toEqual(
      {
        dietdatalist:[]
      }
    )
  })
  it('should handle SET_DIET_GRAPH_REQUEST', () => {
    expect(
      reducers.dietgrpah_reducer([], {
        type: types.SET_DIET_GRAPH_REQUEST,
        dietdatalist: ['test']
      })
    ).toEqual(
      {
        dietdatalist: ['test']
      }
    )
  })
})

describe('wall reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.wall_reducer(reducers.initialWallState, {})
    ).toEqual(
      {
        article_list: []
      }
    )
  })
  it('should handle SET_WALL_REQUEST', () => {
    expect(
      reducers.wall_reducer([], {
        type: types.SET_WALL_REQUEST,
        article_list: ['test']
      })
    ).toEqual(
      {
        article_list: ['test']
      }
    )
  })
})

describe('image reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.image_reducer(reducers.initialImageState, {})
    ).toEqual(
      {
        imagelist: []
      }
    )
  })
  it('should handle SET_IMAGE_REQUEST', () => {
    expect(
      reducers.image_reducer([], {
        type: types.SET_IMAGE_REQUEST,
        imagelist: ['test']
      })
    ).toEqual(
      {
        imagelist: ['test']
      }
    )
  })
})

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.login_reducer(reducers.initialLoginState, {})
    ).toEqual(
      {
        login_entered: false,
        login_fail: false,
        uname: "",
        ubase64: "",
        loginStatus: 0
      }
    )
  })
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducers.login_reducer([], {
        type: types.LOGIN_SUCCESS,
        login_entered: true,
        login_fail: false,
        uname: 'test1',
        ubase64: 'auth',
        loginStatus: 1
      })
    ).toEqual(
      {
        login_entered: true,
        login_fail: false,
        uname: 'test1',
        ubase64: 'auth',
        loginStatus: 1
      }
    )
  })
  it('should handle LOGIN_FAIL', () => {
    expect(
      reducers.login_reducer([], {
        type: types.LOGIN_FAIL,
        login_entered: false,
        login_fail: true,
        loginStatus: -1
      })
    ).toEqual(
      {
        login_entered: false,
        login_fail: true,
        loginStatus: -1
      }
    )
  })
  it('should handle LOGOUT', () => {
    expect(
      reducers.login_reducer([], {
        type: types.LOGOUT,
        login_entered: false,
        login_fail: false,
        uname: "",
        ubase64: "",
        loginStatus: 0
      })
    ).toEqual(
      {
        login_entered: false,
        login_fail: false,
        uname: "",
        ubase64: "",
        loginStatus: 0
      }
    )
  })
})

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.register_reducer(reducers.initialRegisterState, {})
    ).toEqual(
      {
        register_entered: false,
        register_fail: false,
        id_entered: false,
        id_fail: false,
        uname: "",
        uemail: "",
        idValid: 0, 
        passwordValid: 0,
        passwordCheckValid: 0,
        emailValid: 0,
        registerValid: 0
      }
    )
  })
  it('should handle RESET_REGISTER', () => {
    expect(
      reducers.register_reducer([], {
        type: types.RESET_REGISTER,
        register_entered: false,
        register_fail: false,
        id_entered: false,
        id_fail: false,
        uname: "",
        uemail: "",
        idValid: 0, 
        passwordValid: 0,
        passwordCheckValid: 0,
        emailValid: 0,
        registerValid: 0
      })
    ).toEqual(
      {
        register_entered: false,
        register_fail: false,
        id_entered: false,
        id_fail: false,
        uname: "",
        uemail: "",
        idValid: 0, 
        passwordValid: 0,
        passwordCheckValid: 0,
        emailValid: 0,
        registerValid: 0
      }
    )
  })
  it('should handle REGISTER_SUCCESS', () => {
    expect(
      reducers.register_reducer([], {
        type: types.REGISTER_SUCCESS,
        register_entered: true,
        register_fail: false,
        registerValid: 2,
        uname: 'test1',
        uemail: 'test1@test.com'
      })
    ).toEqual(
      {
        register_entered: true,
        register_fail: false,
        registerValid: 2,
        uname: 'test1',
        uemail: 'test1@test.com'
      }
    )
  })
  it('should handle REGISTER_FAIL', () => {
    expect(
      reducers.register_reducer([], {
        type: types.REGISTER_FAIL,
        register_entered: false,
        register_fail: true,
        registerValid: 1
      })
    ).toEqual(
      {
        register_entered: false,
        register_fail: true,
        registerValid: 1
      }
    )
  })
  it('should handle ID_SUCCESS', () => {
    expect(
      reducers.register_reducer([], {
        type: types.ID_SUCCESS,
        id_entered: true,
        id_fail: false,
        idValid: 4
      })
    ).toEqual(
      {
        id_entered: true,
        id_fail: false,
        idValid: 4
      }
    )
  })
  it('should handle ID_FAIL', () => {
    expect(
      reducers.register_reducer([], {
        type: types.ID_FAIL,
        id_entered: false,
        id_fail: true,
        idValid: 3
      })
    ).toEqual(
      {
        id_entered: false,
        id_fail: true,
        idValid: 3
      }
    )
  })
  it('should handle SET_ID_VALID', () => {
    expect(
      reducers.register_reducer([], {
        type: types.SET_ID_VALID,
        idValid: true
      })
    ).toEqual(
      {
        idValid: true
      }
    )
  })
  it('should handle SET_PASSWORD_VALID', () => {
    expect(
      reducers.register_reducer([], {
        type: types.SET_PASSWORD_VALID,
        passwordValid: true
      })
    ).toEqual(
      {
        passwordValid: true
      }
    )
  })
  it('should handle SET_PASSWORD_CHECK_VALID', () => {
    expect(
      reducers.register_reducer([], {
        type: types.SET_PASSWORD_CHECK_VALID,
        passwordCheckValid: true
      })
    ).toEqual(
      {
        passwordCheckValid: true
      }
    )
  })
  it('should handle SET_EMAIL_VALID', () => {
    expect(
      reducers.register_reducer([], {
        type: types.SET_EMAIL_VALID,
        emailValid: true
      })
    ).toEqual(
      {
        emailValid: true
      }
    )
  })
})

describe('userlist reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.userlist_reducer(reducers.initialUserListState, {})
    ).toEqual(
      {
        uname: "",
        ubase64: "",
        usernames: [],
        avatar: []
      }
    )
  })
  it('should handle GET_USER_REQUEST', () => {
    expect(
      reducers.userlist_reducer([], {
        type: types.GET_USER_REQUEST,
        uname: 'test1',
        ubase64: 'auth'
      })
    ).toEqual(
      {
        uname: 'test1',
        ubase64: 'auth'
      }
    )
  })
  it('should handle SET_USER_LIST', () => {
    expect(
      reducers.userlist_reducer([], {
        type: types.SET_USER_LIST,
        usernames: ['test2']
      })
    ).toEqual(
      {
        usernames: ['test2']
      }
    )
  })
  it('should handle SET_USER_AVATAR', () => {
    expect(
      reducers.userlist_reducer([], {
        type: types.SET_USER_AVATAR,
        avatars: ['test2']
      })
    ).toEqual(
      {
        avatar: ['test2']
      }
    )
  })
})

describe('chat reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.chat_reducer(reducers.initialChatState, {})
    ).toEqual(
      {
        uname: "",
        ubase64: "",
        valid: false,
        receiver: "",
        chatlog: []
      }
    )
  })
  it('should handle SET_SENDER', () => {
    expect(
      reducers.chat_reducer([], {
        type: types.SET_SENDER,
        uname: 'test1',
        ubase64: 'auth'
      })
    ).toEqual(
      {
        uname: 'test1',
        ubase64: 'auth'
      }
    )
  })
  it('should handle SET_RECEIVER', () => {
    expect(
      reducers.chat_reducer([], {
        type: types.SET_RECEIVER,
        valid: true,
        receiver: 'test2'
      })
    ).toEqual(
      {
        valid: true,
        receiver: 'test2'
      }
    )
  })
  it('should handle SET_CHAT_LOG', () => {
    expect(
      reducers.chat_reducer([], {
        type: types.SET_CHAT_LOG,
        chatlog: ['hi']
      })
    ).toEqual(
      {
        chatlog: ['hi']
      }
    )
  })
})

describe('comment reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.comment_reducer(reducers.initialCommentState, {})
    ).toEqual(
      {
        article_id: "",
        ubase64: "",
        author:"",
        text:"",
        created_time:"",
        comment_list: [],
        like_list:[]
      }
    )
  })
  it('should handle GET_COMMENT_REQUEST', () => {
    expect(
      reducers.comment_reducer([], {
        type: types.GET_COMMENT_REQUEST,
        ubase64: 'auth'
      })
    ).toEqual(
      {
        ubase64: 'auth'
      }
    )
  })
  it('should handle SET_COMMENT_ID', () => {
    expect(
      reducers.comment_reducer([], {
        type: types.SET_COMMENT_ID,
        article_id: 1
      })
    ).toEqual(
      {
        article_id: 1
      }
    )
  })
  it('should handle SET_COMMENT_LIST', () => {
    expect(
      reducers.comment_reducer([], {
        type: types.SET_COMMENT_LIST,
        comment_list: ['hi']
      })
    ).toEqual(
      {
        comment_list: ['hi']
      }
    )
  })
})

describe('like reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.like_reducer(reducers.initialLikeState, {})
    ).toEqual(
      {
        author: "",
        like_list: []
      }
    )
  })
  it('should handle GET_LIKE_REQUEST', () => {
    expect(
      reducers.like_reducer([], {
        type: types.GET_LIKE_REQUEST
      })
    ).toEqual(
      {
      }
    )
  })
  it('should handle SET_LIKE_LIST', () => {
    expect(
      reducers.like_reducer([], {
        type: types.SET_LIKE_LIST,
        like_list: [1]
      })
    ).toEqual(
      {
        like_list: [1]
      }
    )
  })
})

describe('article list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.article_list_reducer(reducers.initialArticleListState, {})
    ).toEqual(
      {
        article_list: []
      }
    )
  })
  it('should handle LOGOUT', () => {
    expect(
      reducers.article_list_reducer([], {
        type: types.LOGOUT,
        article_list: []
      })
    ).toEqual(
      {
        article_list: []
      }
    )
  })
  it('should handle GET_ARTICLE_REQUEST', () => {
    expect(
      reducers.article_list_reducer([], {
        type: types.GET_ARTICLE_REQUEST,
        ubase64: 'auth'
      })
    ).toEqual(
      {
        ubase64: 'auth'
      }
    )
  })
  it('should handle SET_ARTICLE_LIST', () => {
    expect(
      reducers.article_list_reducer([], {
        type: types.SET_ARTICLE_LIST,
        article_list: ['hi']
      })
    ).toEqual(
      {
        article_list: ['hi']
      }
    )
  })
/*
  it('should handle SET_COMMENT_LIST', () => {
    expect(
      reducers.article_list_reducer([], {
        type: types.SET_COMMENT_LIST,
        article_list: []
      })
    ).toEqual(
      {
        article_list: []
      }
    )
  })
  it('should handle SET_LIKE_LIST', () => {
    expect(
      reducers.article_list_reducer([], {
        type: types.SET_LIKE_LIST,
        article_list: []
      })
    ).toEqual(
      {
        article_list: []
      }
    )
  })
  it('should handle SET_ARTICLE_LIST_WITH_ID', () => {
    expect(
      reducers.article_list_reducer([], {
        type: types.SET_COMMENT_LIST,
        article_list: []
      })
    ).toEqual(
      {
        article_list: []
      }
    )
  })
*/
})

describe('group list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.group_list_reducer(reducers.initialGroupListState, {})
    ).toEqual(
      {
        group_list: []
      }
    )
  })
  it('should handle SET_GROUP_LIST_REQUEST', () => {
    expect(
      reducers.group_list_reducer([], {
        type: types.SET_GROUP_LIST_REQUEST,
        group_list: ['test group']
      })
    ).toEqual(
      {
        group_list: ['test group']
      }
    )
  })
})

describe('group notice reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.group_notice_reducer(reducers.initialGroupNoticeState, {})
    ).toEqual(
      {
        notice_list: []
      }
    )
  })
  it('should handle SET_GROUP_NOTICE_REQUEST', () => {
    expect(
      reducers.group_notice_reducer([], {
        type: types.SET_GROUP_NOTICE_REQUEST,
        notice_list: ['for test']
      })
    ).toEqual(
      {
        notice_list: ['for test']
      }
    )
  })
})

describe('group forum reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.group_forum_reducer(reducers.initialGroupForumState, {})
    ).toEqual(
      {
        forum_list: []
      }
    )
  })
  it('should handle SET_GROUP_FORUM_REQUEST', () => {
    expect(
      reducers.group_forum_reducer([], {
        type: types.SET_GROUP_FORUM_REQUEST,
        forum_list: ['for test']
      })
    ).toEqual(
      {
        forum_list: ['for test']
      }
    )
  })
})

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.profile_reducer(reducers.initialProfileState, {})
    ).toEqual(
      {
        email: null,
        nickname: null,
        avatar: null,
        first_name: null,
        last_name: null,
        last_login: null,
        date_joined: null
      }
    )
  })
  it('should handle SET_PROFILE_REQUEST', () => {
    expect(
      reducers.profile_reducer([], {
        type: types.SET_PROFILE_REQUEST,
        email: 'test@test.com',
        nickname: 'test',
        avatar: 'test',
        first_name: 'test',
        last_name: 'test',
        last_login: 'test',
        date_joined: 'test'
      })
    ).toEqual(
      {
        email: 'test@test.com',
        nickname: 'test',
        avatar: 'test',
        first_name: 'test',
        last_name: 'test', 
        last_login: 'test',
        date_joined: 'test'
      }
    )
  })
})

describe('follow reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.follow_reducer(reducers.initialFollowState, {})
    ).toEqual(
      {
        follow_list: [],
        follow_article_list: []
      }
    )
  })
  it('should handle SET_FOLLOW_REQUEST', () => {
    expect(
      reducers.follow_reducer([], {
        type: types.SET_FOLLOW_REQUEST,
        follow_list: ['test1']
      })
    ).toEqual(
      {
        follow_list: ['test1']
      }
    )
  })
  it('should handle SET_FOLLOW_ARTICLE_REQUEST', () => {
    expect(
      reducers.follow_reducer([], {
        type: types.SET_FOLLOW_ARTICLE_REQUEST,
        follow_article_list: ['Run the tests']
      })
    ).toEqual(
      {
        follow_article_list: ['Run the tests']
      }
    )
  })
})

