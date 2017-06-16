from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from facebook import views

urlpatterns = [
  url(r'^dietdata/$', views.DietdataList.as_view()),
  url(r'^dietdata/(?P<pk>[0-9]+)/$', views.DietdataDetail.as_view()),

  url(r'^users/$', views.UserList.as_view()),
  url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
  url(r'^users/duplication/$', views.UserDuplicationCheck.as_view()),
  url(r'^users/login/$', views.UserLogin.as_view()),

  url(r'^chatting/$', views.ChattingList.as_view()),
  url(r'^chatting/userlist/$', views.ChattingUserList.as_view()),
  url(r'^article/$', views.ArticleList.as_view()),
  url(r'^article/(?P<pk>[0-9]+)/$', views.ArticleDetail.as_view()),
  url(r'^article/(?P<pk>[0-9]+)/comment/$', views.comment_list),
  url(r'^article/(?P<article_pk>[0-9]+)/comment/(?P<comment_pk>[0-9]+)/$', views.comment_detail),
  url(r'^article/(?P<pk>[0-9]+)/like/$',views.article_like_list),
  url(r'^article/(?P<article_pk>[0-9]+)/comment/(?P<comment_pk>[0-9]+)/like/$', views.comment_like_list),

  url(r'^group/$', views.GroupList.as_view()),
  url(r'^group/(?P<pk>[0-9]+)/$', views.GroupDetail.as_view()),
  url(r'^group/(?P<pk>[0-9]+)/member/$', views.member_list),
  url(r'^group/(?P<pk>[0-9]+)/notice/$', views.GroupNoticeList.as_view()),
  url(r'^group/(?P<group_pk>[0-9]+)/notice/(?P<pk>[0-9]+)/$', views.GroupNoticeDetail.as_view()),
  url(r'^group/(?P<pk>[0-9]+)/forum/$', views.GroupForumList.as_view()),
  url(r'^group/(?P<group_pk>[0-9]+)/forum/(?P<pk>[0-9]+)/$', views.GroupForumDetail.as_view()),
  url(r'profile/$', views.ProfileDetail.as_view()),
  url(r'^image/$', views.ImageList.as_view()),
    url(r'^image/(?P<pk>[0-9]+)/$', views.ImageDetail.as_view()),

  url(r'^follow/$', views.FollowList.as_view()),
  url(r'^follow/(?P<pk>[0-9]+)/$', views.FollowDetail.as_view()),
  url(r'^follow/(?P<pk>[0-9]+)/article/$', views.FollowArticleList.as_view()),
  url(r'^wall/(?P<pk>[\w.@+-]+)/$',views.WallList.as_view()),


  url(r'^dietgraph/(?P<pk>[\w.@+-]+)/$',views.DietGraphList.as_view()),

  url(r'^music/$', views.MusicList.as_view()),
  url(r'^music/(?P<pk>[0-9]+)/$', views.MusicList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
